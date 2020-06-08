import React from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const usersBackendURL = "http://localhost:2000";

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      gender: "",
    };
  }

  componentDidMount() {}

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };
  handleGenderChange = (e) => {
    this.setState({ gender: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    alert(`${this.state.name} ${this.state.gender}`);
    const registrationData = {
      uName: this.state.name,
      uGender: this.state.gender,
    };
    axios
      .post(usersBackendURL + "/register", registrationData)
      .then((response) => {
        this.setState({ successMsg: response.data, errMsg: "" });
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
              value="male"
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
              value="female"
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
    );
  }
}
