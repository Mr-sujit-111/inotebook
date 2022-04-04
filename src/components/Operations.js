import React from 'react';
import './css/Operations.css';
import { Link } from 'react-router-dom';
// import Button from '@material-ui/core/Button';

export default function () {
    return (
        <div>
            <div className="container">
                <div className="hover-box">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <Link className="dedcription-btn operation-btn" to="/AddNote">
                                <span className="name-descripeion"> Add Note</span>
                                <div className="btn-icon">
                                    <i className="far fa-lightbulb"></i>
                                </div>
                            </Link>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <Link className="dedcription-btn operation-btn" to="/List">
                                <span className="name-descripeion">Show Note</span>
                                <div className="btn-icon heart">
                                    <i className="fas fa-heartbeat"></i>
                                </div>
                            </Link>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <a className="dedcription-btn operation-btn" href="#">
                                <span className="name-descripeion">Remove Note</span>
                                <div className="btn-icon book">
                                    <i className="fas fa-book-reader"></i>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <a className="dedcription-btn operation-btn" href="#">
                                <span className="name-descripeion">Other</span>
                                <div className="btn-icon brain">
                                    <i className="fas fa-brain"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
