import React from "react";

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div className="container-fluid">
        <h3>For any query or suggestion kindly mail us at : </h3>
        <h5>
          <strong>runningdash01@gmail.com</strong>
        </h5>
      </div>
    );
  }
}
