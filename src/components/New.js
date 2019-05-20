import React from "react";
import { fetchNewPosts } from "../utils/api";
import Moment from "moment";

export default class New extends React.Component {
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

    fetchNewPosts()
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
        <h2>New Stories</h2>

        <ul className="postList">
          {this.state.posts &&
            this.state.posts.map((post, index) => {
              return (
                <li key={index}>
                  <ul key={index} className="postList">
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
                      by {post.by} on{" "}
                      {Moment.unix(post.time).format("L") +
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
