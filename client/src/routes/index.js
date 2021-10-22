import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Accueil from "../pages/Accueil";
import Profil from "../pages/Profil";
import Game from "../pages/Game";
import About from "../pages/About";

const index = () => {
  return (
    <Router>
      <Switch>
        <Route path="/user" exact component={Profil} />
        <Route path="/game" exact component={Game} />
        <Route path="/about" exact component={About} />
        <Route path="/" exact component={Accueil} />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default index;
