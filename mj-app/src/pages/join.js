import React, { Component } from "react";

class Join extends Component {
  render() {
    const { email, uid } = this.props.location.state;
    return (
      <div>
        <h1>Join page</h1>
      </div>
    );
  }
}

export default Join;
