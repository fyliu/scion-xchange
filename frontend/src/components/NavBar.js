import React, { useState, useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import EventBus from "common/EventBus";

import AuthService from "services/auth.service";

const NavBar = () => {
  const history = useHistory();
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isActive, setIsActive] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const logOut = useCallback(() => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
    history.push("/login");
  }, [history]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [logOut]);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand title is-3">
        <div
          onClick={() => {
            setActiveTab("Home");
          }}
        >
          <Link to={"/"} className="navbar-item">
            Foothill Chapter Scion Exchange
          </Link>
        </div>
        <a
          onClick={() => {
            setIsActive(!isActive);
          }}
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          {/*             <div className="navbar-item is-tab">
              <Link to={"/home"}>Home</Link>
            </div> */}

          {showModeratorBoard && (
            <div
              className="navbar-item is-tab"
              onClick={() => {
                setIsActive(false);
              }}
            >
              <Link to={"/mod"}>Moderator Board</Link>
            </div>
          )}

          {showAdminBoard && (
            <div
              className="navbar-item is-tab"
              onClick={() => {
                setIsActive(false);
              }}
            >
              <Link to={"/admin"}>Admin Board</Link>
            </div>
          )}

          {currentUser && (
            <>
              {/* <div className="navbar-item">
                <Link to={"/user"}>
                  User
                </Link>
              </div> */}

              <div
                className={`navbar-item is-tab ${
                  activeTab === "Offers" ? "is-active" : ""
                }`}
                onClick={() => {
                  setIsActive(false);
                  setActiveTab("Offers");
                }}
              >
                <Link to={"/offer"}>Offers</Link>
              </div>
              <div
                className={`navbar-item is-tab ${
                  activeTab === "Wants" ? "is-active" : ""
                }`}
                onClick={() => {
                  setIsActive(false);
                  setActiveTab("Wants");
                }}
              >
                <Link to={"/want"}>Wants</Link>
              </div>
              <div
                className={`navbar-item is-tab ${
                  activeTab === "Exchange" ? "is-active" : ""
                }`}
                onClick={() => {
                  setIsActive(false);
                  setActiveTab("Exchange");
                }}
              >
                <Link to={"/trade"}>Exchange</Link>
              </div>
              {/*                 <div
                  className={`navbar-item is-tab ${
                    activeTab === "Cultivars" ? "is-active" : ""
                  }`}
                  onClick={() => {
                    setIsActive(false);
                    setActiveTab("Cultivars");
                  }}
                >
                  <Link to={"/cultivars"}>Cultivars</Link>
                </div>
                <div
                  className={`navbar-item is-tab ${
                    activeTab === "Add Cultivar" ? "is-active" : ""
                  }`}
                  onClick={() => {
                    setIsActive(false);
                    setActiveTab("Add Cultivar");
                  }}
                >
                  <Link to={"/add-cultivar"}>Add Cultivar</Link>
                </div> */}
            </>
          )}
        </div>

        <div className="navbar-end">
          {currentUser ? (
            <>
              <div
                className={`navbar-item is-tab ${
                  activeTab === "Profile" ? "is-active" : ""
                }`}
                onClick={() => {
                  setIsActive(false);
                  setActiveTab("Profile");
                }}
              >
                <Link to={"/profile"}>{currentUser.username}</Link>
              </div>
              <div
                className={`navbar-item is-tab ${
                  activeTab === "Logout" ? "is-active" : ""
                }`}
                onClick={() => {
                  setIsActive(false);
                  setActiveTab("Logout");
                }}
              >
                <a href="/login" onClick={logOut}>
                  LogOut
                </a>
              </div>
            </>
          ) : (
            <>
              <div
                className={`navbar-item is-tab ${
                  activeTab === "Login" ? "is-active" : ""
                }`}
                onClick={() => {
                  setIsActive(false);
                  setActiveTab("Login");
                }}
              >
                <Link to={"/login"}>Login</Link>
              </div>
              <div
                className={`navbar-item is-tab ${
                  activeTab === "Sign Up" ? "is-active" : ""
                }`}
                onClick={() => {
                  setIsActive(false);
                  setActiveTab("Sign Up");
                }}
              >
                <Link to={"/register"}>Sign Up</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
