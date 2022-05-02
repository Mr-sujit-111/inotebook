import React, { useState, useEffect, useRef } from 'react';
import noteContext from '../../context/noteContext';
import { useContext } from 'react';
import Note from './Note';
import ScrollToTop from "react-scroll-to-top";
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

function AllNotes(){
    const path = useNavigate();
    const allNotesData = useContext(noteContext);
    const { notes, getAllNotes, editNote } = allNotesData;
    const [note, setNote] = useState(notes);
    const [data, setData] = useState({ editId: " ", editTitle: "", editDescription: "", editTag: "", editSubmit: false });
    const [loader] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllNotes();
            setNote(notes);
        } else {
            path('/');
        }
    }, [notes.length, notes.length, getAllNotes.length, path.length]);

    const updateData = (current) => {
        ref.current.click();
        setData({ editId: current._id, editTitle: current.title, editDescription: current.description, editTag: current.tag })
    }

    //change the value of title and description //
    const onChangeInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const updateNote = (e) => {
        e.preventDefault();
        editNote(data.editId, data.editTitle, data.editDescription, data.editTag);
        refClose.current.click();
    }

    const ref = useRef(null);
    const refClose = useRef(null);

    return (
        <>
            <div className="container" > { /* <!-- Button trigger modal --> */}
                <button ref={ref}
                    type="button"
                    className="btn btn-primary btn-lg d-none "
                    data- bs-toggle="modal"
                    data-bs-target="#modelId">

                </button>

                { /* <!-- Modal --> */}
                <div className="modal fade" id="modelId" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"> Modal title </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" > <button>
                                </div>
                                    <div className="modal-body" >
                                        <form action="/"
                                            method="get" >
                                            <input type="hidden"
                                                name="editId"
                                                id="editId"
                                                className="form-control"
                                                aria - describedby = "helpId"
                                            value = {data.editId}
        />
                                            <div className="mb-3" >
                                                <label htmlFor="editTitle"
                                                    className="form-label" > title: </label>
                                                <input type="text"
                                                    name="editTitle"
                                                    id="editTitle"
                                                    className="form-control"
                                                    placeholder="Enter your title"
                                                    aria-describedby="helpId"
                                                    value={data.editTitle}
                                                    onChange={onChangeInput}
                                                    required />
                                            </div>
                                            <div className="mb-3" >
                                                <label htmlFor="editTag"
                                                    className="form-label" > tag: </label>
                                                <input type="text"
                                                    name="editTag"
                                                    id="editTag"
                                                    className="form-control"
                                                    placeholder="Enter your tag"
                                                    aria-describedby="helpId"
                                                    value={data.editTag}
                                                    onChange={onChangeInput}
                                                    required />
                                            </div>

                                            <div className="mb-3" >
                                                <label htmlFor="editDescription"
                                                    className="form-label" > description: </label>
                                                <input type="text"
                                                    name="editDescription"
                                                    id="editDescription"
                                                    className="form-control"
                                                    placeholder="Enter your description"
                                                    value={data.editDescription}
                                                    aria-describedby="helpId"
                                                    onChange={onChangeInput}
                                                    required />
                                            </div>
                                        </form >
                                    </div>
                                    <div className="modal-footer" >
                                        <button type="button"
                                            className="btn btn-secondary"
                                            ref={refClose}
                                            data- bs-dismiss="modal" > Close </button> <button type="button"
                                                className="btn btn-primary"
                                                onClick={updateNote} > Update Note </button>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <ScrollToTop smooth color="#6f00ff" />
                    <div className='row' >
                        {loader && < Loader />}
                        {note.length === 0 ? < h5 style={{ color: 'white' }}> no notes to display </h5> :
                            note.map((note) => {
                                return <Note key={note._id}
                                    note={note}
                                    updateData={updateData}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllNotes