import React from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

export default class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersQNA: [],
      qid: this.props.quizId,
    };
  }

  componentDidMount() {
    this.fetchQNA();
  }
  fetchQNA = () => {
    const url = "http://localhost:5564/quizreply/" + this.state.qid;
    axios
      .get(url)
      .then((response) => {
        this.setState({
          usersQNA: response.data,
          errorMessage: "",
        });
      })
      .catch((error) => {
        console.log("quesByquizId frnd answers axios get error");
        if (error.status === 404) {
          console.log(error.response.data.message);
          this.setState({
            errorMessage: error.response.data.message,
            usersQNA: [],
          });
        } else {
          console.log("other error");
          this.setState({
            errorMessage: "Could not fetch qna",
            usersQNA: [],
          });
        }
      });
  };
  //user ho to sharable link v dikhana
  render() {
    return (
      <div className="container-fluid">
        <h6>Answers:</h6>
        <div>
          <a
            href="whatsapp://send?text=https://localhost:3000/quiz/q-28340/"
            data-action="share/whatsapp/share"
          >
            Share in Whatsapp
          </a>
        </div>
        {this.state.usersQNA.map((item, index) => {
          return (
            <Card className="card shadow mt-2" key={index}>
              <div>
                <Card.Img
                  variant="top"
                  src="data:image/jpeg;base64,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"
                />
                <Card.Body
                // style={{
                //   backgroundImage:
                //     "url( https://jono21.files.wordpress.com/2012/07/pattern-03.jpg)",
                // }}
                >
                  <Card.Subtitle className="mb-2 text-muted">
                    Question
                    <span className="badge badge-warning">{index + 1}</span>
                  </Card.Subtitle>
                  <Card.Text>{item.question}</Card.Text>
                </Card.Body>
              </div>

              {this.state.usersQNA.map((ansItem, ansIndex) => {
                if (item.question === ansItem.question)
                  return (
                    <Card.Text
                      className="card shadow"
                      style={{ backgroundColor: "#ed840c", color: "white" }}
                      key={ansIndex}
                    >
                      {ansItem.answer}
                      <strong
                        style={{
                          backgroundImage:
                            "url( https://jono21.files.wordpress.com/2012/07/pattern-03.jpg)",
                          color: "purple",
                          textAlign: "right",
                        }}
                      >
                        <i>
                          <span className="card badge shadow">
                            -{ansItem.p_name}
                          </span>
                        </i>
                      </strong>
                    </Card.Text>
                  );
              })}
            </Card>
          );
        })}
      </div>
    );
  }
}
