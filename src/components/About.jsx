import React from "react";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div className="container-fluid">
        <h3 className="my-2">Built by ST and VJ</h3>
      </div>
    );
  }
}
