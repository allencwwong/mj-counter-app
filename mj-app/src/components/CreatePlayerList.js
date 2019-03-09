import React, { Component } from "react";

class CreatePlayList extends Component {
  render() {
    const { players } = this.props;
    let playersKeys = Object.keys(players);
    let renderPlayerList = () => {
      let playerList = [];
      playersKeys.forEach(playerKey => {
        playerList.push(
          <li key={playerKey}>{players[playerKey].displayName} </li>
        );
      });
      return playerList;
    };

    return (
      <div>
        <ul>{renderPlayerList()}</ul>
      </div>
    );
  }
}

export default CreatePlayList;
