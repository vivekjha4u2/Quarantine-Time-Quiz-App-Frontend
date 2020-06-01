import React from "react";
import { Navbar, Button, Form } from "react-bootstrap";
import SelectQuestion from "./SelectQuestion";

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  handleSubmit = (e) => {
    this.setState({ name: "name" });
    //save username in db and create questionaire for him
    // <SelectQuestion />;
  };
  render() {
    return (
      <div className="container-fluid">
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="#home">Q-Time</Navbar.Brand>
        </Navbar>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name: </Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Questionaire
          </Button>
        </Form>
      </div>
    );
  }
}
