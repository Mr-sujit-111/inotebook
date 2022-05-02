import React from 'react';
import './css/Loader.css'

function Loader() {
    return (
        <div>
            <div className="loader book">
                <figure className="loaderPage"></figure>
                <figure className="loaderPage"></figure>
                <figure className="loaderPage"></figure>
            </div>

            <h1 className='loader'>Reading</h1>
        </div>
    )
}

export default Loader