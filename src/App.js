import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Top from "./components/Top";
import New from "./components/New";
import Nav from "./components/Nav";
import User from "./components/User";

function App() {
  return (
    <Router>
      <div className="container">
        <Nav />

        <Switch>
          <Route exact path="/" component={Top} />
          <Route exact path="/new" component={New} />
          <Route path="/user" component={User} />
          <Route render={() => <h1>404 not Found</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
