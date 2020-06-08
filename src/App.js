import React, { Fragment } from "react";
import "./App.css";
import Questionnaire from "./components/Questionnaire";
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./components/Homepage";
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
            {/* <Route exact path="/product/Men" component={()=><Product value="Men"></Product>}/> */}

            <Route path="/" component={Homepage} />
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
