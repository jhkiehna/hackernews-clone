import React from "react";
import { fetchUser, fetchPosts } from "../utils/api";
import queryString from "query-string";
import Moment from "moment";

import Posts from "./Posts";

export default class User extends React.Component {
  state = {
    user: null,
    posts: null,
    error: null
  };

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch() {
    const { username } = queryString.parse(this.props.location.search);

    this.setState({
      user: null,
      posts: null,
      error: null
    });

    fetchUser(username)
      .then(user => {
        this.setState({
          user,
          error: null
        });

        fetchPosts(user.submitted.slice(0, 50))
          .then(posts => {
            if (posts.length === 0) {
              posts = null;
            }

            this.setState({
              posts: posts,
              error: null
            });
          })
          .catch(({ message }) =>
            this.setState({
              error: this.state.error + message
            })
          );
      })
      .catch(({ message }) =>
        this.setState({
          error: this.state.error + message
        })
      );
  }

  render() {
    const { user, posts } = this.state;

    return (
      <>
        <h2>User</h2>
        {user && (
          <>
            <p>Name: {user.id}</p>
            <p>Joined: {Moment.unix(user.created).format("LLLL")}</p>
            <p>Karma: {user.karma}</p>

            {user.about && (
              <>
                <h3>About</h3>
                <p dangerouslySetInnerHTML={{ __html: user.about }} />
              </>
            )}

            {posts && (
              <>
                <h3>Posts</h3>
                <ul>{posts && <Posts posts={posts} />}</ul>
              </>
            )}
          </>
        )}
      </>
    );
  }
}
