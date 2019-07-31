import React from "react";

export default function gameDetails(props) {
  let gid = props.match.params.gid;

  return <div>Game: {gid}</div>;
}
