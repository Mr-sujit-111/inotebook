import { Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import noteContext from "../context/noteContext";

export default function Navbar(props) {
  const context = useContext(noteContext);
  const { profileImage } = context;
  const token = localStorage.getItem("token");
  const image = localStorage.getItem("image");
  const [profilePicture, setProfilePicture] = useState(profileImage)

  let path = useNavigate();
  let location = useLocation();
  useEffect(() => { }, [location]);

  useEffect(() => {
    if (profileImage.length > 0) {
      setProfilePicture(profileImage)
    } else {
      setProfilePicture(image)
    }
  }, [setProfilePicture, image, profileImage])


  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profilepic");
    path("/login");
  };
  const login = () => {
    localStorage.removeItem("token");
    path("/login");
  };

  const imgClick = () => {
    path("/About");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            {props.navbarTitle}
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link
                  className={`nav-link ${location.pathname === "/Home" ? "active" : ""
                    }`}
                  to="/Home"
                >
                  Home <span className="visually-hidden">(current)</span>
                </Link>
              </li>
              {localStorage.getItem("token") && (
                <li className="nav-item active">
                  <Link
                    className={`nav-link ${location.pathname === "/Operations" ? "active" : ""
                      }`}
                    to="/Operations"
                  >
                    Operations{" "}
                    <span className="visually-hidden">(current)</span>
                  </Link>
                </li>
              )}
              {localStorage.getItem("token") && (
                <li className="nav-item active">
                  <Link
                    className={`nav-link ${location.pathname === "/Notes" ? "active" : ""
                      }`}
                    to="/Notes"
                  >
                    Notes <span className="visually-hidden">(current)</span>
                  </Link>
                </li>
              )}
              {localStorage.getItem("token") && (
                <li className="nav-item active">
                  <Link
                    className={`nav-link ${location.pathname === "/About" ? "active" : ""
                      }`}
                    to="/About"
                  >
                    About <span className="visually-hidden">(current)</span>
                  </Link>
                </li>
              )}
            </ul>
            <div className="text-end">
              {!localStorage.getItem("token") ? (
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ color: "white" }}
                  onClick={login}
                >
                  <ExitToAppIcon />
                  Log-in
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ color: "white" }}
                  onClick={logOut}
                >
                  <ExitToAppIcon />
                  Log-out
                </Button>
              )}
            </div>
          </div>
          <img
            onClick={imgClick}
            className="text-start"
            src={
              token
                ? profilePicture
                : "https://image.shutterstock.com/image-vector/user-login-authenticate-icon-human-600w-1365533969.jpg"
            }
            alt="profile"
            style={{ height: "50px", width: "50px", borderRadius: "50%" }}
          />
        </div>
      </nav>
    </div>
  );
}
