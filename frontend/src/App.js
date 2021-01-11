import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./main.scss";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import CultivarsList from "./components/CultivarsList";
import AddCultivar from "./components/AddCultivar";
import Cultivar from "./components/Cultivar";
import Offer from "./components/Offer";
import Want from "./components/Want";
import Trade from "./components/Trade";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isActive, setIsActive] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand title is-3">
          <div
            onClick={() => {
              setActiveTab("Home");
            }}
          >
            <Link to={"/"} className="navbar-item">
              Scion Exchange
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

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/cultivars" component={CultivarsList} />
          <Route exact path="/add-cultivar" component={AddCultivar} />
          <Route exact path="/offer" component={Offer} />
          <Route exact path="/want" component={Want} />
          <Route exact path="/trade" component={Trade} />
          <Route path="/cultivars/:id" component={Cultivar} />
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
