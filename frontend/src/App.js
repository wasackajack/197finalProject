/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import Signup from "./Signup";
import Login from "./Login";
//import Home from "./oldstuff/Home";
import Searchbar from "./Searchbar"

const App = () => (
  <div>
    <h1 style={{ display: "flex", justifyContent: "center",font:"italic bold 60px Georgia,serif" }}>
      Quiz
      <img src="http://www.clipartbest.com/cliparts/4cb/6Lj/4cb6Ljkei.jpg" height="90" width="90" />
      box
    </h1>
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
           <Searchbar />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
