import React, { useState, useContext } from 'react';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import IconButton from '@material-ui/core/IconButton';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import noteContext from '../../context/noteContext';
import Checkbox from '@material-ui/core/Checkbox'


function Note(props) {
    const [checked, setChecked] = React.useState(false);
    const { note, updateData } = props;

    //get notes context data
    const noteContextData = useContext(noteContext);
    const { deleteNote } = noteContextData;

    // for copy description of note //
    const alert = () => {
        var text = document.getElementById("text");
        console.log(text.innerText)
        navigator.clipboard.writeText(text.innerText);
        setChecked(false);
    }

    const deletenotebtn = () => {
        console.log("deleting..");
        deleteNote(note._id);
    }

    return (
        <div className="card text-white bg-light col-lg-3 m-4">
            <div className="card-body">
                <div className="card-title text-center text-dark">{note.title}
                    <span className='text-end'>
                        <Checkbox
                            color="secondary"
                            icon={<FileCopyRoundedIcon color="primary" />}
                            checkedIcon={<CheckBoxRoundedIcon color="primary" />}
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                            onClick={alert}
                        />
                    </span>
                </div>
                <p className="card-text text-dark" id="text">{note.description}</p>
                <div className="text-center">
                    <span onClick={() => { updateData(note) }}>
                        <IconButton aria-label="delete">
                            <BorderColorRoundedIcon color="primary" />
                        </IconButton>
                    </span>
                    <span onClick={deletenotebtn}>
                        <IconButton aria-label="delete">
                            <DeleteRoundedIcon color="secondary" />
                        </IconButton>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Note