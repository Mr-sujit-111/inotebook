import React from 'react'
import AllNotes from './notes/AllNotes';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';


function List() {
    const style = {
        position: "absolute",
        marginLeft:"43%",
        marginTop: "1%"
    };

    return (
        <div>
             <Link to="/Operations">
            <IconButton style={style}> 
                <KeyboardBackspaceIcon/>
            </IconButton>
              </Link>
            <div className='container' >
                <div className="text-start" >
                    <h2>All Notes: </h2>
                    <AllNotes />
                </div>
            </div>
        </div >
    )
}

export default List