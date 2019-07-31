import React from "react";
import GameScores from "../components/GameScores";

export default function gameDetails(props) {
  let gid = props.match.params.gid;

  return (
    <div>
      <p>Game: {gid}</p>
      <GameScores gid={gid} />
    </div>
  );
}
