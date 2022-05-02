import noteContext from '../context/noteContext';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, IconButton, List } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ListData from './List';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddNote() {
    const context = useContext(noteContext);
    const { addNewNote } = context;

    const alert = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const style = {
        position: "absolute",
        marginLeft: "43%",
        marginTop: "1%"
    };

    const [note, setNote] = useState({ title: "", description: "", tag: "", image: "" });
    // const [image, setImage] = useState('')

    //change the value of title and description //
    const onChangeInput = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    // addNOte function is called when click on Add note //
    const addNote = (e) => {
        e.preventDefault();
        addNewNote(note.title, note.description, note.tag);
        setNote({ description: "", title: "", tag: '' });
        alert("note added successfully!");
    }
 

    return (
        <div className='container'>
            {/* {note.submit ? <div className="alert alert-info alert-dismissible fade show" role="alert">
                <strong>Note Added</strong> Note is added successfully !
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> : ""} */}
            <Link to="/Operations">
                <IconButton style={style}>
                    <KeyboardBackspaceIcon />
                </IconButton>
            </Link>
            <form method="get" onSubmit={addNote} >
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">title:</label>
                    <input type="text" name="title" id="title" className="form-control" placeholder="Enter your title" aria-describedby="helpId" value={note.title} onChange={onChangeInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">tag:</label>
                    <input type="text" name="tag" id="tag" className="form-control" placeholder="Enter your tag" aria-describedby="helpId" value={note.tag} onChange={onChangeInput} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description:</label>
                    <input type="text" name="description" id="description" className="form-control" placeholder="Enter your description" value={note.description} aria-describedby="helpId" onChange={onChangeInput} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Note</button>
            </form>
            <div className="list">
                <ListData />
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
        </div>
    )
}

export default AddNote