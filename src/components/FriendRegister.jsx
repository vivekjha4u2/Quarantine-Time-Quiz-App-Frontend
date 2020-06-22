import React from "react";
import FriendAnswering from "./FriendAnswering";

import { Button, Form } from "react-bootstrap";

export default class FriendRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pName: "",
      isSubmitted: false,
      qid: this.props.match.params.quizId,
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
        {!this.state.isSubmitted ? (
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name: </Form.Label>
              <Form.Control
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
