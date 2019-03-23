import React, { Component } from "react";
import { database } from "../firebase";
import GameAddScore from "./GameAddScore";

class GameScoreBoard extends Component {
  constructor() {
    super();
    this.gameroomsRef = database.ref("/gamerooms");
    this.state = {
      isLoaded: false,
      modalShow: false
    };
  }
  componentDidMount() {
    const gid = window.location.pathname.split("/")[2];
    this.gameroomsRef.child(gid).on("value", snapshot => {
      this.setState({
        players: snapshot.val().players,
        isLoaded: true
      });
    });
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    if (this.state.isLoaded) {
      const { players } = this.state;
      let playersKeys = Object.keys(players);
      let renderPlayerList = () => {
        let playerList = [];
        playersKeys.forEach(playerKey => {
          playerList.push(
            <th key={playerKey}>{players[playerKey].displayName} </th>
          );
        });
        return playerList;
      };
      return (
        <div>
          <h1>GameScoreBoard</h1>
          <table className="table">
            <thead>
              <tr>{renderPlayerList()}</tr>
            </thead>
            <tbody />
          </table>
          <div className="container">
            <div className="row">
              <button
                className="btn btn-primary"
                onClick={() => this.setState({ modalShow: true })}
              >
                Add score
              </button>
            </div>
          </div>
          <GameAddScore show={this.state.modalShow} onHide={modalClose} />
        </div>
      );
    }
    return <div>loading scoreboard...</div>;
  }
}

export default GameScoreBoard;
