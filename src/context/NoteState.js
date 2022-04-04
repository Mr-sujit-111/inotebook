import NoteContext from "./noteContext";
import { useState } from 'react';
const NoteState = (props) => {

    const allNotes = [
        {
            "_id": "6246ce5fdddf9ae69160c2",
            "user": "6246a86d9ddbfc962954d040",
            "title": "title1",
            "description": "title56",
            "tag": "tag",
            "date": "2022-04-01T10:05:19.440Z",
            "__v": 0
        },
        {
            "_id": "624686d348ff0fcc8f28fb",
            "user": "6246a86d9ddbfc962954d040",
            "title": "title2",
            "description": "discription2",
            "tag": "tag2",
            "date": "2022-04-01T10:14:30.707Z",
            "__v": 0
        },
        {
            "_id": "6246d086d348fc8f28fb",
            "user": "6246a86d9ddbfc962954d040",
            "title": "title2",
            "description": "discription2",
            "tag": "tag2",
            "date": "2022-04-01T10:14:30.707Z",
            "__v": 0
        },
        {
            "_id": "6246d086d348ff0fcc8b",
            "user": "6246a86d9ddbfc962954d040",
            "title": "title2",
            "description": "discription2",
            "tag": "tag2",
            "date": "2022-04-01T10:14:30.707Z",
            "__v": 0
        },
        ]
    const [notes, setNotes] = useState(allNotes);

    // Add note //
    const addNewNote = (title, description,tag) => {
        console.log("adding");
        const note = {
            "_id": "6246d086d348ff0fcc8f28fb",
            "user": "6246a86d9ddbfc962954d040",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-04-01T10:14:30.707Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
    }

    // Delete note using its id //
    const deleteNote = (id)=>{
        console.log("id:::"+id)
        const newNote = notes.filter( (note)=>{return !note._id == id })
        setNotes(newNote);
    }

    // Edit existing note //
    // const editNote = (id,title,description){

    // }

    return (
        <NoteContext.Provider value={{ notes, addNewNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;