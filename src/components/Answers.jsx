import React from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

export default class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersQNA: [],
      qid: this.props.quizId,
      userName: localStorage.getItem(this.props.quizId + "userName"),
      friendName: localStorage.getItem(this.props.quizId + "friendName"),
      copySuccess: false,
    };
  }

  componentDidMount() {
    // this.setState({ usersQNA: [] });
    console.log(this.state.userName);
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
  copyCodeToClipboard = () => {
    const el = this.textArea;
    el.select();
    document.execCommand("copy");
    this.setState({ copySuccess: true });
  };
  //user ho to sharable link v dikhana
  render() {
    return (
      <div className="container-fluid">
        <img
          width="150"
          height="150"
          alt="emoji"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRrwAuvkij2bUllzBd3phxeyLMiqCabl8mgZA&usqp=CAU"
        />
        <div>
          {this.state.userName !== null ? (
            <div>
              <h4 id="sol" className="mt-3 ">
                Your Questionnaire is ready!!!
              </h4>
              <textarea
                className="mt-3 shadow"
                ref={(textarea) => (this.textArea = textarea)}
                rows="1"
                cols="42"
                type="url"
                value={"https://localhost:3000/quiz/" + this.state.qid}
              ></textarea>
              <div>
                <Button
                  className="mt-2 shadow"
                  onClick={() => this.copyCodeToClipboard()}
                >
                  Copy Link
                </Button>
                {this.state.copySuccess ? (
                  <div style={{ color: "green" }}>Link Copied!</div>
                ) : null}
              </div>
              <br></br>

              <div>
                <Button
                  className="btn-success "
                  href={
                    "whatsapp://send?text=https://localhost:3000/quiz/" +
                    this.state.qid
                  }
                  data-action="share/whatsapp/share"
                  target="_blank"
                >
                  <img
                    src="https://dare2020.site/images/common/whatsapp.svg"
                    alt="ds"
                  />
                  <span style={{ color: "white" }}> Share in Whatsapp</span>
                </Button>
              </div>
            </div>
          ) : this.state.friendName !== null ? (
            <div>
              <h4 id="sol" className="mt-3 ">
                Create Your
                <button className="btn-warning">
                  <a href="/Questionnaire">Questionnaire</a>
                </button>
              </h4>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <h5 className="btn btn-block btn-info mt-3">View Answers:</h5>
        {this.state.usersQNA.map((item, index) => {
          if (index < 20) {
            return (
              <Card className="card shadow mt-2" key={index}>
                <div>
                  <Card.Img variant="top" src={item.url} />
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
                  if (item.question === ansItem.question) {
                    return (
                      <Card.Text
                        className="card shadow"
                        style={{ backgroundColor: "#ed840c", color: "white" }}
                        key={ansIndex}
                      >
                        {ansItem.answer}
                        <strong
                          style={{
                            // backgroundImage:
                            //   "url( https://jono21.files.wordpress.com/2012/07/pattern-03.jpg)",
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
                  }
                })}
              </Card>
            );
          }
        })}
      </div>
    );
  }
}
