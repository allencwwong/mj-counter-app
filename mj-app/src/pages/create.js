import React, { Component } from "react";
import { database } from "../firebase";
import { map } from "lodash";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      gid: ""
    };
    this.gameroomRef = database.ref("/gameroom");
  }

  componentDidMount() {
    const { email, uid, displayName } = this.props.location.state;
    let host = {};
    host[uid] = {
      email: email,
      displayName: displayName
    };
    const gid = this.gameroomRef.push({ players: host, status: "open" }).key;
    console.log(gid);
    this.gameroomRef.child(gid).on("value", snapshot => {
      console.log(snapshot.val());
    });

    this.setState({
      gid: gid
    });
  }

  render() {
    return (
      <div>
        <h1>Game Room#{this.state.gid}</h1>
        <h2>Players</h2>
        <ul>
          <li />
        </ul>
      </div>
    );
  }
}

export default Create;
