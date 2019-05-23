import React from "react";
import { fetchUser } from "../utils/api";
import queryString from "query-string";
import Moment from "moment";

import Posts from "./Posts";
import Loading from "./Loading";

export default class User extends React.Component {
  state = {
    username: null,
    user: null,
    error: null,
    loading: true
  };

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch() {
    const { username } = queryString.parse(this.props.location.search);

    this.setState({
      username: username,
      user: null,
      error: null
    });

    fetchUser(username)
      .then(user =>
        this.setState({
          user: user,
          error: null,
          loading: false
        })
      )
      .catch(({ message }) =>
        this.setState({
          error: message,
          loading: false
        })
      );
  }

  render() {
    const { user, username, loading, error } = this.state;

    if (error) {
      throw new Error(error);
    }

    if (loading) {
      return <Loading />;
    }

    if (!user) {
      return <h2>User {username} not found</h2>;
    }

    return (
      <>
        {user && (
          <>
            <h2>User {user.id}</h2>
            <p>Joined: {Moment.unix(user.created).format("LLLL")}</p>
            <p>Karma: {user.karma}</p>

            {user.about && (
              <>
                <h3>About</h3>
                <p dangerouslySetInnerHTML={{ __html: user.about }} />
              </>
            )}
            <h3>Posts by this user</h3>
            <ul>
              <Posts user={user} />
            </ul>
          </>
        )}
      </>
    );
  }
}
