import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Top from "./components/Top";
import New from "./components/New";
import Nav from "./components/Nav";
import User from "./components/User";
import Comments from "./components/Comments";
import Loading from "./components/Loading";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Router>
      <div className="container">
        <Nav />
        <React.Suspense fallback={<Loading />}>
          <ErrorBoundary>
            <Switch>
              <Route exact path="/" component={Top} />
              <Route exact path="/new" component={New} />
              <Route path="/user" component={User} />
              <Route path="/comments" component={Comments} />
              <Route render={() => <h1>404 not Found</h1>} />
            </Switch>
          </ErrorBoundary>
        </React.Suspense>
      </div>
    </Router>
  );
}

export default App;
