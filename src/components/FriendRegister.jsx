import React from "react";
import FriendAnswering from "./FriendAnswering";

import { Button, Form } from "react-bootstrap";
import Answers from "./Answers";

export default class FriendRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pName: "",
      isSubmitted: false,
      qid: this.props.match.params.quizId,
      userName: localStorage.getItem("userName"),
      isFriendAlreadyAnswered: localStorage.getItem("friendName"),
    };
  }
  componentDidMount() {}

  handlePNameChange = (e) => {
    this.setState({ pName: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmitted: true });
    console.log("handle submit", `${this.state.pName}`);
  };

  render() {
    return (
      <div className="container-fluid">
        {this.state.userName !== null ? (
          <Answers quizId={this.state.qid}></Answers>
        ) : this.state.isFriendAlreadyAnswered !== null ? (
          <Answers quizId={this.state.qid}></Answers>
        ) : !this.state.isSubmitted ? (
          <Form onSubmit={this.handleSubmit}>
            <h6 id="sol" className="mt-3">
              Lets see! How well do you know me?
            </h6>
            <Form.Group controlId="formBasicName">
              {/* <Form.Label>Name: </Form.Label> */}
              <Form.Control
                className="mt-3"
                type="text"
                placeholder="Enter your name"
                value={this.state.pName}
                onChange={this.handlePNameChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Start Answering
            </Button>
          </Form>
        ) : (
          <FriendAnswering
            friendName={this.state.pName}
            quid={this.state.qid}
          />
        )}
      </div>
    );
  }
}
