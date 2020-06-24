import React from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Answers from "./Answers";

export default class SelectQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.categ,
      quesList: [],
      usersQuestions: [],
      clicked: false,
      temp: 0,
      quesIndexAdded: [],
      goToAnswers: false,
      qAddedWarning: false,
    };
  }
  componentDidMount() {
    this.fetchQuestions();
  }
  addQuestion = (ques) => {
    this.state.usersQuestions.push(ques);
  };

  createQuiz = () => {
    this.state.usersQuestions.forEach(this.postQuiz);
    this.setState({ goToAnswers: true });
  };
  postQuiz = (item, index) => {
    const quizBackendURL = "http://localhost:5564/quiz/create";
    const quizData = {
      quizId: this.props.quizId,
      question: item,
    };
    axios
      .post(quizBackendURL, quizData)
      .then((response) => {
        console.log("response: ", response);
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
  };

  fetchQuestions = () => {
    const url = "http://localhost:5564/question/" + this.state.category;
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data);
        this.setState({
          quesList: response.data,
          errorMessage: "",
        });
      })
      .catch((error) => {
        // console.log("selectquestion axios get error");
        if (error.status === 404) {
          // console.log(error.response.data.message);
          this.setState({
            errorMessage: error.response.data.message,
            quesList: [],
          });
        } else {
          // console.log("other error");
          this.setState({
            errorMessage: "Could not fetch questions",
            quesList: [],
          });
        }
      });
  };

  render() {
    return (
      <div className="container-fluid">
        {/* if quiz is created then show answers Component  */}
        {!this.state.goToAnswers ? (
          <div id="selectQuestionDiv" className="col-sm-1 col-md-3 mx-auto">
            <h6 className="mt-2">Select 10 questions to create quiz</h6>
            {this.state.quesList.map((item, index) => {
              // console.log(item);
              if (index === this.state.temp) {
                return (
                  <div className=" mt-2" key={index}>
                    <Card className="card shadow ">
                      <Card.Img variant="top" src={item.url} />
                      <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                          Question
                          <span className="badge badge-warning">
                            {" "}
                            {index + 1}
                          </span>
                        </Card.Subtitle>
                        <Card.Text>{item.question}</Card.Text>
                        <div className="row mx-auto">
                          {!this.state.qAddedWarning ? (
                            <Button
                              id={index}
                              className="btn-info"
                              onClick={() => {
                                // for loop is to check if index is already added if yes then
                                // just increase temp flag is for
                                //else case means if index is not added then add it.
                                var flag = false;
                                //for(let i=0; i<this.state.quesIndexAdded.length; i++)
                                for (
                                  let i = 0;
                                  i < this.state.quesIndexAdded.length;
                                  i++
                                ) {
                                  if (index === this.state.quesIndexAdded[i]) {
                                    this.disabled = true;
                                    flag = true;
                                    this.setState({ qAddedWarning: true });
                                    break;
                                  }
                                }
                                if (flag === false) {
                                  this.state.quesIndexAdded.push(index);
                                  this.addQuestion(item.question);
                                }
                                this.setState({
                                  clicked: true,
                                  temp:
                                    (this.state.temp + 1) %
                                    this.state.quesList.length,
                                });
                              }}
                            >
                              Add this question
                            </Button>
                          ) : (
                            <Button disabled>Already Added</Button>
                          )}
                          <Button
                            className="btn-danger mx-auto"
                            onClick={() => {
                              for (
                                let i = 0;
                                i < this.state.quesIndexAdded.length;
                                i++
                              ) {
                                if (index === this.state.quesIndexAdded[i]) {
                                  this.setState({ qAddedWarning: false });
                                  break;
                                }
                              }

                              this.setState({
                                temp:
                                  (this.state.temp + 1) %
                                  this.state.quesList.length,
                              });
                            }}
                          >
                            Skip
                          </Button>

                          {this.state.qAddedWarning ? (
                            <div style={{ color: "red" }}>Already added!</div>
                          ) : null}
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                );
              }
            })}
            {this.state.usersQuestions.length === 10 ? (
              this.createQuiz()
            ) : (
              <Button
                className="btn-secondary fixed-bottom float-right"
                disabled
              >
                <span className="badge badge-warning">
                  {10 - this.state.usersQuestions.length}
                </span>
                Questions to go
              </Button>
            )}
          </div>
        ) : (
          <Redirect
            to={{
              pathname: "/quiz/" + this.props.quizId,
              // quizId=this.props.quizId
            }}
          />
          // <Answers quizId={this.props.quizId} />
        )}
      </div>
    );
  }
}
