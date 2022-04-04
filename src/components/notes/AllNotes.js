import React, { useState } from 'react';
import noteContext from '../../context/noteContext';
import { useContext } from 'react';
import Note from './Note';
import ScrollToTop from "react-scroll-to-top";

function AllNotes() {
    const allNotesData = useContext(noteContext);
    const {notes} = allNotesData;
    const [note, setNotes] = useState(notes);
    return (
        <div className="container">
            <ScrollToTop smooth color="#6f00ff"/>
            <div className='row'>
                {note.map((note) => {
                    return <Note note={note} />
                })}
            </div>
        </div>
    )
}

export default AllNotes