import React, { Component } from "react";
import { Link } from "react-router-dom";
import { database } from "../firebase";
import "./dashboard.css";
import CurrentUser from "../components/CurrentUser";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: null
    };
    this.dataRef = null;
  }
  componentDidMount() {
    this.dataRef = database.ref("/gamerooms");

    this.dataRef.on("value", snapshot => {
      this.setState({
        data: snapshot.val()
      });
    });
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <CurrentUser user={user} />
        <div className="row">
          <Link
            to={{
              pathname: "/create",
              state: {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName
              }
            }}
          >
            <button className="btn btn-primary">Create new game</button>
          </Link>
          <Link
            to={{
              pathname: "/join",
              state: {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName
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

export default Dashboard;
