import React from "react";
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

  componentDidUpdate() {
    console.log(this.state.posts);
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

        <ul>
          {this.state.posts &&
            this.state.posts.map((post, index) => {
              return (
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
              );
            })}
        </ul>
      </>
    );
  }
}
