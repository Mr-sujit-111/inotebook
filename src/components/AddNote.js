import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, IconButton, List } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import noteContext from '../context/noteContext';
function AddNote() {
    const style = {
        position: "absolute",
        marginLeft: "43%",
        marginTop: "1%"
    };

    const context = useContext(noteContext);
    const { addNewNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "", submit: false });

    //change the value of title and description //
    const onChangeInput = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    // addNOte function is called when click on Add note //
    const addNote = (e) => {
        e.preventDefault();
        addNewNote(note.title, note.description, note.tag);
        setNote({ description: "", title: "", submit: true });
        setTimeout(() => {
            setNote({ submit: false })
        }, 8000);
    }

    return (
        <div className='container'>
            {note.submit ? <div className="alert alert-info alert-dismissible fade show" role="alert">
                <strong>Note Added</strong> Note is added successfully !
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> : ""}
            <Link to="/Operations">
                <IconButton style={style}>
                    <KeyboardBackspaceIcon />
                </IconButton>
            </Link>
            <form action="/" method="get">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">title:</label>
                    <input type="text" name="title" id="title" className="form-control" placeholder="Enter your title" aria-describedby="helpId" value={note.title} onChange={onChangeInput} required />
                </div>
                <select className="form-select" aria-label="Default select example">
                    <option selected>Please select tag</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description:</label>
                    <input type="text" name="description" id="description" className="form-control" placeholder="Enter your description" value={note.description} aria-describedby="helpId" onChange={onChangeInput} required />
                </div>
                <button type="submit" className="btn btn-primary" onClick={addNote}>Add Note</button>
            </form>
            <div>
                <Link className="dedcription-btn operation-btn" to="/List">
                    <span className="name-descripeion">Show Note</span>
                    <div className="btn-icon heart">
                        <i className="fas fa-heartbeat"></i>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default AddNote