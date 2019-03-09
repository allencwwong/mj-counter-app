import React, { Component } from "react";
import { database } from "../firebase";
import CreatePlayerList from "../components/CreatePlayerList";
import queryString from "query-string";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      gid: null,
      players: null,
      status: false
    };
    this.gameroomsRef = database.ref("/gamerooms");
    this.ingameUsers = database.ref("/ingameusers");
  }

  handleRemoveGameRoomClick = () => {
    let { gid, player } = this.state;
    this.gameroomsRef.child(gid).on("value", snapshot => {
      var playersKey = Object.keys(snapshot.val().players);

      // remove from ingameuser

      // remove name for current game room

      if (playersKey === 0) {
        this.gameroomsRef.child(gid).remove();
        // redirect to home
      }
    });
  };

  handleStartGameRoomClick = () => {};

  componentDidMount() {
    console.log(this.props.location.search);
    const gid = window.location.pathname.split("/")[2];
    // set states for new game room
    this.gameroomsRef.child(gid).on("value", snapshot => {
      this.setState({
        gid: gid,
        players: snapshot.val().players,
        status: true
      });
    });
  }

  render() {
    const { players, status } = this.state;

    return (
      <div>
        <h1>Game Room#{this.state.gid}</h1>
        <h2>Players</h2>
        {status ? <CreatePlayerList players={players} /> : "loading"}
        <div className="row">
          <div className="col-lg-6">
            <button className="col-lg-10">Start</button>
          </div>
          <div className="col-lg-6">
            <button
              onClick={this.handleRemoveGameRoomClick}
              className="col-lg-10"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
