import React from "react";
import { fetchTopPosts } from "../utils/api";

import Posts from "./Posts";

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
    const { posts } = this.state;

    return (
      <>
        <h2>Top Stories</h2>

        <ul>{posts && <Posts posts={posts} />}</ul>
      </>
    );
  }
}
