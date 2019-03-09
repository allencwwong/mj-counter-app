import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { database } from "../firebase";
import "./dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.gameroomsRef = database.ref("/gamerooms");
  }

  createGameRoom = () => {
    const { user } = this.props;
    // set host info
    let host = {};
    host[user.uid] = {
      email: user.email,
      displayName: user.displayName
    };
    console.log(host);
    // push host info and create new game room in db
    const gid = this.gameroomsRef.push({ players: host, status: "open" }).key;
    console.log(gid);
    // set states for new game room
    this.gameroomsRef.child(gid).on("value", snapshot => {
      // set host as in game user
      database
        .ref("/ingameusers")
        .child(user.uid)
        .set({ gid: gid, user: user.displayName });
      // redirect to create page
      this.props.history.push(`/create/${gid}?uid=${user.uid}`);
    });
  };

  render() {
    const { user } = this.props;
    console.log(user.email, user.displayName, user.uid);
    return (
      <div>
        welcome,
        {user.displayName}
        <div className="row">
          <button onClick={this.createGameRoom} className="btn btn-primary">
            Create new game
          </button>
          <Link
            to={{
              pathname: "/join",
              state: {
                user: {
                  email: user.email,
                  uid: user.uid,
                  displayName: user.displayName
                }
              }
            }}
          >
            <button className="btn btn-primary">Join game</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
