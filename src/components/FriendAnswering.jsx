import React from "react";
import axios from "axios";
import { Card, Button, Form } from "react-bootstrap";
import Answers from "./Answers";

const friendBackendURL = "http://localhost:5564/quizreply/add";

export default class FriendAnswering extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pName: this.props.friendName,
      usersQuestions: [],
      temp: 0,
      answer: "",
      qid: this.props.quid,
    };
  }
  componentDidMount() {
    this.fetchQuestions();
  }
  handleAnswerChange = (e) => {
    this.setState({ answer: e.target.value });
  };
  handleSubmit = (e) => {
    this.setState({
      temp: this.state.temp + 1,
    });
    const answerData = {
      quizId: this.state.qid,
      question: this.state.usersQuestions[this.state.temp].question,
      p_name: this.state.pName,
      answer: this.state.answer,
    };
    // this.setState({ answer: "" });

    axios
      .post(friendBackendURL, answerData)
      .then((response) => {
        console.log("response friendAnswering subbmit answer: ", response.data);
        this.setState({ successMsg: response.data, errMsg: "" });
      })
      .catch((error) => {
        console.log("response friendAnswering subbmit answer error ");
        this.setState({
          errMsg: error.response
            ? error.response.data.message
            : "Internal Server Error",
          successMsg: "",
        });
      });
    localStorage.setItem("friendName", this.state.pName);
  };
  fetchQuestions = () => {
    // {qid}

    const url = "http://localhost:5564/quiz/" + this.state.qid;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        this.setState({
          usersQuestions: response.data,
          errorMessage: "",
        });
      })
      .catch((error) => {
        console.log("quesByquizId frnd answering axios get error");
        if (error.status === 404) {
          console.log(error.response.data.message);
          this.setState({
            errorMessage: error.response.data.message,
            usersQuestions: [],
          });
        } else {
          console.log("other error");
          this.setState({
            errorMessage: "Could not fetch questions",
            usersQuestions: [],
          });
        }
      });
  };

  render() {
    return (
      <div className="container-fluid">
        {this.state.usersQuestions.map((item, index) => {
          // console.log(index);
          if (this.state.temp === this.state.usersQuestions.length / 2) {
            return <Answers key={index} quizId={this.state.qid} />;
          } else if (index === this.state.temp) {
            return (
              <div key={index}>
                <h6 className="mt-1">Try Answering and give reasons too</h6>
                <Card className="card shadow  mt-2 ">
                  <Card.Img
                    variant="top"
                    src={item.url}
                  />
                  <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                      Question
                      <span className="badge badge-warning"> {index + 1}</span>
                    </Card.Subtitle>
                    <Card.Text>{item.question}</Card.Text>

                    <div>
                      <Form onSubmit={this.handleSubmit} id={index}>
                        <Form.Group controlId="formBasicName">
                          <Form.Control
                            type="text"
                            placeholder="Answer here.."
                            value={this.state.answer}
                            onChange={this.handleAnswerChange}
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          id={index}
                          className="btn-info"
                        >
                          Submit
                        </Button>
                      </Form>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          }
        })}
      </div>
    );
  }
}
