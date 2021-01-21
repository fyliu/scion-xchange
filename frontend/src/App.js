import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "./main.scss";

import NavBar from "./components/NavBar";
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
