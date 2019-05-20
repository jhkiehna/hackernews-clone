import React from "react";
import { fetchUser } from "../utils/api";
import queryString from "query-string";
import Moment from "moment";

export default class User extends React.Component {
  state = {
    user: null,
    error: null
  };

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch() {
    const { username } = queryString.parse(this.props.location.search);

    this.setState({
      user: null,
      error: null
    });

    fetchUser(username)
      .then(user =>
        this.setState({
          user,
          error: null
        })
      )
      .catch(({ message }) =>
        this.setState({
          error: message
        })
      );
  }

  render() {
    const { user } = this.state;

    return (
      <>
        <h2>User</h2>
        {user && (
          <div>
            <p>Name: {user.id}</p>
            <p>Joined: {Moment.unix(user.created).format("LLLL")}</p>
            <p>Karma: {user.karma}</p>

            <h3>About</h3>

            <p dangerouslySetInnerHTML={{ __html: user.about }} />
          </div>
        )}
      </>
    );
  }
}
