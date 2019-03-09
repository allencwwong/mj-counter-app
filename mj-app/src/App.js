import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Join from "./pages/join";
import Create from "./pages/create";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Navigation />
        </header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/join" component={Join} />
          <Route path="/create/:gid" component={Create} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;