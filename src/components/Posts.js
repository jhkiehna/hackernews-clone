import React from "react";

import { fetchRecentPosts } from "../utils/api";
import Loading from "./Loading";
import PostDetails from "./PostDetails";

export default class Posts extends React.Component {
  state = {
    type: this.props.type,
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

    fetchRecentPosts(this.state.type)
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
        {posts.map(post => (
          <li key={post.id}>
            <PostDetails post={post} />
          </li>
        ))}
      </>
    );
  }
}
