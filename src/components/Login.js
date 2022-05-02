import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Login.css';
import NoteImage from './image/notes.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import noteContext from '../context/noteContext';

function Login() {
    const context = useContext(noteContext);
    const {loginUser} = context;
    const alert = (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    };

    // define states for value of login form //
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' })
    
    // const newalert = useAlert();
    let history = useNavigate();

    const submitLoginForm = async (e) => {
        e.preventDefault();
        // Api call for Login User //
        let url = "http://localhost:5000/api/auth/login";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: loginInfo.email, password: loginInfo.password })
        });
        const note = await response.json();

        if (note.status) {
            localStorage.setItem('token', note.token);
            history("/Operations");
        }
        else if (note.error) {
            alert(note.error);
        } else {
            alert(note.errors[0].msg);
        }

        loginUser(note)
    };
    const onChangeInput = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
    }
    return (
        <section>
            <div className="container">
                <div className="user signinBx">
                    <div className="imgBx"><img src={NoteImage} alt="notes " /></div>
                    <div className="formBx">
                        <form onSubmit={submitLoginForm} >
                            <h2>Sign In</h2>
                            <input type="email" value={loginInfo.email} onChange={onChangeInput} name="email" placeholder="Email id" autoComplete='off' required />
                            <input type="password" value={loginInfo.password} onChange={onChangeInput} name="password" placeholder="Password" autoComplete='off' required />
                            <input type="submit" name="submit" value="Login" autoComplete='off' />
                            <p className="signup">
                                Don't have an account ?
                                <Link to="/Register" className="active" role="button" aria-pressed="true">Register here!</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
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
        </section>
    )
}

export default Login