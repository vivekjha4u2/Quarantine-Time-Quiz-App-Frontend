import React, { Fragment } from "react";
import "./App.css";
import Questionnaire from "./components/Questionnaire";
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./components/Homepage";
import FriendRegister from "./components/FriendRegister";
import Answers from "./components/Answers";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import WebFont from "webfontloader";
WebFont.load({
  google: {
    families: ["sans-serif", "Sofia"],
  },
});

function App() {
  return (
    <div className="App">
      <Navbar expand="lg" style={{ backgroundColor: "#f54275" }}>
        <Navbar.Brand
          href="/"
          style={{
            color: "white",
            fontWeight: "bold",
            fontFamly: "Sofia",
          }}
        >
          Q-Time
        </Navbar.Brand>
      </Navbar>

      <Router>
        <Fragment>
          <Switch>
            <Route
              exact
              path="/Questionnaire"
              component={() => <Questionnaire value=""></Questionnaire>}
            />

            <Route
              exact
              path="/ans"
              component={() => <Answers quizId="Q-10270" />}
            />

            <Route exact path="/quiz/:quizId" component={FriendRegister} />

            <Route path="/" component={Homepage} />
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
