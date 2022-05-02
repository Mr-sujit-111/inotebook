import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../context/noteContext';
import './css/About.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function About() {
  const context = useContext(noteContext);
  const { data } = context;
  const token = localStorage.getItem('token');
  const [follow, setFollow] = useState("Follow");
  const [profilePicture, setProfilePicture] = useState(data.user.avatar)
  const image = localStorage.getItem('image');
  const alert = (message) => {
    toast.success(message, {
      position: "bottom-center",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  useEffect(() => {
    if (data.length === 0) {
      setProfilePicture(image);
    } else {
      setProfilePicture(data.user.avatar);
    }
  }, [setProfilePicture, image, data])


  // function for click on follow //
  const followAction = () => {
    if (follow === "Follow") {
      setFollow('Unfollow')
      alert('folowing')
    } else {
      setFollow('Follow')
      alert('unfollow')
    }
  }

  return (
    <div>
      <div className="card">
        <div className="img-name">
          <img className='text-start' src={token && data ? profilePicture : "https://image.shutterstock.com/image-vector/user-login-authenticate-icon-human-600w-1365533969.jpg"} alt="profile" />
          {
            data ? <h2>{data.user.name}</h2> : <h2>Avatar Name</h2>
          }
        </div>
        {
          data ? <div className="followers">
            <h3 className='id'>ID: {data.user._id}</h3>
            <h3 className='email'>Email: {data.user.email}</h3>
          </div> : <div className="followers">
            <h3>ID: avatar id</h3>
            <h3>Email: avatar email</h3>
          </div>
        }

        <div className="button-follow">
          <button onClick={followAction}>{follow}</button>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}
