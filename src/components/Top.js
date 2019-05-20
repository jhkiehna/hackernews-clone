import React from "react";
import { Link } from "react-router-dom";
import { fetchTopPosts } from "../utils/api";
import Moment from "moment";

export default class Top extends React.Component {
  state = {
    posts: null,
    error: null
  };

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch() {
    this.setState({
      posts: null,
      error: null
    });

    fetchTopPosts()
      .then(posts =>
        this.setState({
          posts,
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
        <h2>Top Stories</h2>

        <ul className="postList">
          {this.state.posts &&
            this.state.posts.map((post, index) => {
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
                      by <Link to={`/user?username=${post.by}`}>{post.by}</Link>{" "}
                      on
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
      </>
    );
  }
}
