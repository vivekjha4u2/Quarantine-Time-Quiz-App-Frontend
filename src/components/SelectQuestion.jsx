import React from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

export default class SelectQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.categ,
      quesList: [],
      usersQuestions: [],
      clicked: false,
    };
  }
  componentDidMount() {
    // console.log("this.state.category: ", this.state.category);
    this.fetchQuestions();
  }
  addQuestion = (ques) => {
    this.state.usersQuestions.push(ques);
    console.log(this.state.usersQuestions);
    console.log("bd", this.props.quizId);
  };

  createQuiz = () => {
    this.state.usersQuestions.forEach(this.postQuiz);
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
        console.log("selectquestion axios get error");
        if (error.status === 404) {
          console.log(error.response.data.message);
          this.setState({
            errorMessage: error.response.data.message,
            quesList: [],
          });
        } else {
          console.log("other error");
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
        <h6 className="mt-1">Select 10 questions to create quiz</h6>
        {this.state.quesList.map((item, index) => {
          // console.log(item);
          return (
            <div className="col-md-3 mt-2" key={index}>
              <Card className="card shadow ">
                <Card.Body>
                  <Card.Title> </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Question {index + 1}
                  </Card.Subtitle>
                  <Card.Text>{item.question}</Card.Text>

                  <Button
                    id={index}
                    className="btn-info"
                    onClick={() => {
                      this.addQuestion(item.question);
                      this.setState({ clicked: true });
                    }}
                    // disabled={this.state.clicked}
                  >
                    Add this question
                  </Button>
                  {/* <Card.Link href="#">Add</Card.Link> */}
                </Card.Body>
              </Card>
            </div>
          );
        })}
        {this.state.usersQuestions.length === 10 ? (
          <Button
            onClick={() => {
              this.createQuiz();
            }}
            className="btn-success fixed-bottom float-right"
          >
            Create Quiz
          </Button>
        ) : (
          <Button className="btn-secondary fixed-bottom float-right" disabled>
            Create Quiz
          </Button>
        )}
      </div>
    );
  }
}
