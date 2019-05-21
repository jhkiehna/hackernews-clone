import React from "react";
import { fetchNewPosts } from "../utils/api";

import Posts from "./Posts";

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
    const { posts } = this.state;

    return (
      <>
        <h2>New Stories</h2>
        <ul>{posts && <Posts posts={posts} />}</ul>
      </>
    );
  }
}
