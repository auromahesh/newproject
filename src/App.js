import React, { Component } from "react";
import "./App.css";
import Users from "./components/users";

class App extends Component {
  render() {
    return (
      <main className="container">
        <Users />
      </main>
    );
  }
}

export default App;
