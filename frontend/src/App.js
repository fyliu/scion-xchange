import React from "react";
import { Switch, Route } from "react-router-dom";
import "App.css";
import "main.scss";

import CultivarsList from "./components/CultivarsList";
import Cultivar from "./components/Cultivar";
import NavBar from "components/NavBar";
import Login from "components/Pages/Login";
import Register from "components/Pages/Register";
import Home from "components/Pages/Home";
import Profile from "components/Pages/Profile";
import BoardUser from "components/Pages/BoardUser";
import BoardModerator from "components/Pages/BoardModerator";
import BoardAdmin from "components/Pages/BoardAdmin";
import Offer from "components/Pages/Offers/Offer";
import Want from "components/Pages/Wants/Want";
import Trade from "components/Pages/Exchange/Trade";

const App = () => {
  return (
    <div>
      <NavBar />
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/cultivars" component={CultivarsList} />
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
