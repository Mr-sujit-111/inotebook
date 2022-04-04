import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';


export default function Navbar(props) {
    let location = useLocation();
    useEffect(() => {
    }, [location]);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">{props.navbarTitle}</Link>
                    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <Link className={`nav-link ${location.pathname === "/Home" ? "active" : ""}`} to="/Home">Home <span className="visually-hidden">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                                <Link className={`nav-link ${location.pathname === "/Operations" ? "active" : ""}`} to="/Operations">Operations <span className="visually-hidden">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                                <Link className={`nav-link ${location.pathname === "/Notes" ? "active" : ""}`} to="/Notes">Notes <span className="visually-hidden">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                                <Link className={`nav-link ${location.pathname === "/About" ? "active" : ""}`} to="/About">About <span className="visually-hidden">(current)</span></Link>
                            </li>
                        </ul>
                        <form className="d-flex my-2 my-lg-0">
                            <input className="form-control me-sm-2" type="text" placeholder="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}
