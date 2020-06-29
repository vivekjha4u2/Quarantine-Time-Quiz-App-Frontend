import React from "react";

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div className="container-fluid">
        {/* {this.state.success.length>0?<Redirect to="/order"></Redirect>:""} */}

        <button style={{ margin: 2 + "rem" }}>
          <a href="/quiz">
            <div className="card" style={{ width: 18 + "rem" }}>
              <img
                style={{ height: 14 + "rem" }}
                className="card-img-top"
                src="https://nie-images.s3.amazonaws.com/gall_content/2017/8/2017_8$largeimg24_Aug_2017_154906303.jpg"
                alt="Card image cap"
              />
              <div className="card-body">
                <p className="card-text">Interesting Questionaire</p>
              </div>
            </div>
          </a>
        </button>
        <br></br>

        <button>
          <div className="card" style={{ width: 18 + "rem" }}>
            <img
              style={{ height: 14 + "rem" }}
              className="card-img-top"
              src="https://www.astrologysoftware.com/personal_reports/images/st_lifepath.jpg"
              alt="Card image ca"
            />
            <div className="card-body">
              <p className="card-text">Trace My Life Path</p>
            </div>
          </div>
        </button>
      </div>
    );
  }
}
