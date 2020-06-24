import React, { Fragment } from "react";
import "./App.css";
import Questionnaire from "./components/Questionnaire";
import { Navbar,Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./components/Homepage";
import FriendRegister from "./components/FriendRegister";
import Answers from "./components/Answers";
import About from "./components/About";
import Contact from "./components/Contact";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar expand="lg" style={{ backgroundColor: "#f54275" }}>
        <Navbar.Brand
          href="/"
          id="sol"
          style={{
            color: "white",
            fontWeight: "bold",
            fontFamly: "Sofia",
          }}
        >
          Q-Time
        </Navbar.Brand>
        <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
  <Nav.Link href="/about">About</Nav.Link>
      <Nav.Link href="/contact">Contact</Nav.Link>
  </Navbar.Collapse>
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
              component={() => <Answers quizId="Q-14100" />}
            />
            <Route
              exact
              path="/about"
              component={() => <About />}
            />
            <Route
              exact
              path="/contact"
              component={() => <Contact />}
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
