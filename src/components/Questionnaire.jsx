import React from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import SelectQuestion from "./SelectQuestion";

const usersBackendURL = "http://localhost:5564/user/register";

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      gender: "",
      isSubmitted: false,
      //successMsg has response.data which has quizid
      successMsg: "",
      errMsg: "",
    };
  }

  componentDidMount() {}

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };
  handleGenderChange = (e) => {
    this.setState({ gender: e.target.value });
  };

  // selectQuestions() {
  //   <SelectQuestion></SelectQuestion>;
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    // alert(`${this.state.name} ${this.state.gender}`);
    this.setState({ isSubmitted: true });
    console.log("handle submit", `${this.state.name} ${this.state.gender}`);
    const registrationData = {
      userName: this.state.name,
      gender: this.state.gender,
    };

    axios
      .post(usersBackendURL, registrationData)
      .then((response) => {
        console.log("response: ", response.data);
        this.setState({ successMsg: response.data, errMsg: "" });
        // console.log("quizid: ", this.state.successMsg.slice(-7));
        // selectQuestions();
      })
      .catch((error) => {
        this.setState({
          errMsg: error.response
            ? error.response.data.message
            : "Internal Server Error",
          successMsg: "",
        });
      });
    //save username in db and create questionaire for him
    // <SelectQuestion />;
  };
  render() {
    return (
      <div className="container-fluid">
        {!this.state.isSubmitted ? (
          <div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                />
              </Form.Group>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioOpt"
                  id="inlineRadio1"
                  value="m"
                  onChange={this.handleGenderChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioOpt"
                  id="inlineRadio2"
                  value="f"
                  onChange={this.handleGenderChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Female
                </label>
              </div>
              <br></br>
              <br></br>

              <Button variant="primary" type="submit">
                Create Questionaire
              </Button>
            </Form>
          </div>
        ) : (
          <SelectQuestion
            categ={this.state.gender}
            quizId={this.state.successMsg.slice(-7)}
          />
        )}
      </div>
    );
  }
}
