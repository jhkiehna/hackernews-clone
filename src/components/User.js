import React from "react";
import { fetchUser } from "../utils/api";

export default class User extends React.Component {
  state = {
    username: "test",
    user: null,
    error: null
  };

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch() {
    this.setState({
      user: null,
      error: null
    });

    fetchUser(this.state.username)
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
    return (
      <>
        <h2>User</h2>
        <p>{console.log(this.state.username && this.state.username)}</p>
      </>
    );
  }
}
