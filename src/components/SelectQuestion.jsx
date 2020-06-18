import React from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

export default class SelectQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.categ,
      quesList: [],
    };
  }
  componentDidMount() {
    console.log("this.state.category: ", this.state.category);
    this.fetchQuestions();
  }

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
        {this.state.quesList.map((item, index) => {
          console.log(item);
          return (
            <div className="col-md-3 mt-2" key={index}>
              <Card className="card shadow ">
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Question {index}
                  </Card.Subtitle>
                  <Card.Text>{item.question}</Card.Text>

                  <Button className="btn-info">Add this question</Button>
                  {/* <Card.Link href="#">Add</Card.Link> */}
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }
}
