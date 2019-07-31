import React, { Component } from "react";
import { database } from "../firebase";

export default class history extends Component {
  state = {
    pastGames: []
  };
  async componentDidMount() {
    let pastGames = database.ref("gamerooms");

    pastGames.on(
      "value",
      snapshot => {
        console.log(snapshot.val());
        this.setState({
          pastGames: snapshot.val()
        });
      },
      error => {
        console.log("Error: " + error.code);
      }
    );

    let singleGame = database.ref("gamerooms").child("-LctmFOCGsQvvQ4rpqne");
    singleGame.on(
      "value",
      snapshot => {
        console.log(snapshot.val());
      },
      error => {
        console.log("Error: " + error.code);
      }
    );
  }
  renderPastGames() {
    if (this.state.pastGames) {
      return Object.keys(this.state.pastGames).map(game => {
        return (
          <a href={"/history/" + game} key={game} style={{ display: "block" }}>
            {game}
          </a>
        );
      });
    }
  }
  render() {
    return <div>{this.renderPastGames()}</div>;
  }
}
