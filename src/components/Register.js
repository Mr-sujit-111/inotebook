import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import NoteImage from './image/notes.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import noteContext from '../context/noteContext';


function Register() {
    const context = useContext(noteContext);
    const { avatarUrl } = context;
    const data = [];
    const [first, setFirst] = useState(data)


    const alert = (message) => toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    let redirect = useNavigate();

    // set/change value of input fields //
    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // use Register Api  // 
    const submitForm = async (e) => {
        e.preventDefault();
        // API call for add new user //
        const url = "http://localhost:5000/api/auth/data";
        const data = first
        let _formData = new FormData();
        _formData.append("file", data)
        _formData.append("name", formData.name)
        _formData.append("email", formData.email)
        _formData.append("password", formData.password)
        const response = await fetch(url, {
            method: 'POST',
            body: _formData
        });
        const note = await response.json();
        console.log(note.token)
        avatarUrl(note);
        if (note.status) {
            localStorage.setItem('token', note.token);
            redirect('/operations');
        } else if (note.error[0].msg !== undefined) {
            alert(note.error[0].msg);
        } else {
            alert(note.error);
        }
    }

    // onChange file image //
    const ImageChange = (e) => {
        setFirst(e.target.files[0])
    }

    return (
        <div>
            <section>
                <div className="container">
                    <div className="user signinBx">
                        <div className="imgBx"><img src={NoteImage} alt="notes" /></div>
                        <div className="formBx">
                            <form onSubmit={submitForm} encType="multipart/form-data">
                                <h2>Registration Form</h2>
                                <input type="text" name="name" placeholder="Username" autoComplete='off' onChange={onInputChange} value={formData.name} required />
                                <input type="email" name="email" placeholder="Email" autoComplete='off' onChange={onInputChange} value={formData.email} required />
                                <input type="password" name="password" autoComplete='off' placeholder="Password" value={formData.password} required onChange={onInputChange} />
                                <input type="file" id="myFile" name="file" onChange={ImageChange} />
                                {/* <input type="file" id="myFile" name="file" onChange={fileUpload} /> */}
                                <input type="submit" name="" value="submit" />
                                <p className="signup">
                                    Registerd?
                                    <Link to="/login" className="active" role="button" aria-pressed="true">Login here!</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
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

export default Register