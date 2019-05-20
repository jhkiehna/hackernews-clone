import React from "react";
import { fetchUser, fetchPost } from "../utils/api";
import queryString from "query-string";
import Moment from "moment";

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
        Promise.all(user.submitted.slice(0, 50).map(fetchPost))
          .then(posts =>
            this.setState({
              posts: posts,
              error: null
            })
          )
          .catch(({ message }) =>
            this.setState({
              error: this.state.error + message
            })
          );
        this.setState({
          user,
          error: null
        });
      })
      .catch(({ message }) =>
        this.setState({
          error: message
        })
      );
  }

  render() {
    const { user, posts } = this.state;

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

            <h3>Posts</h3>

            <ul className="postList">
              {posts &&
                posts.map((post, index) => {
                  return (
                    <li key={index}>
                      <ul className="postList">
                        <li>
                          <a
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {post.title}
                          </a>
                        </li>

                        <li>
                          {" " +
                            Moment.unix(post.time).format("L") +
                            ", " +
                            Moment.unix(post.time).format("LT")}{" "}
                          with {post.kids ? post.kids.length : "0"} comments
                        </li>
                      </ul>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </>
    );
  }
}
