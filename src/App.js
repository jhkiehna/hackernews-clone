import React from "react";
import Top from "./components/Top";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div className="container">
        <Nav />

        <Switch>
          <Route exact path="/" component={Top} />
          <Route exact path="/new" />
          <Route render={() => <h1>404 not Found</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
