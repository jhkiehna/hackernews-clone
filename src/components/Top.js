import React from "react";
import { fetchTopPosts } from "../utils/api";

import Posts from "./Posts";
import Loading from "./Loading";

export default class Top extends React.Component {
  state = {
    posts: null,
    error: null,
    loading: true
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
          error: null,
          loading: false
        })
      )
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false
        });
      });
  }

  render() {
    const { posts, loading, error } = this.state;

    if (loading === true) {
      return <Loading />;
    }

    if (error) {
      throw new Error(error);
    }

    return (
      <>
        <h2>Top Stories</h2>

        <ul>{posts && <Posts posts={posts} />}</ul>
      </>
    );
  }
}
