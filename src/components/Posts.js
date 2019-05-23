import React from "react";

import { fetchRecentPosts, fetchPosts } from "../utils/api";
import Loading from "./Loading";
import PostDetails from "./PostDetails";

export default class Posts extends React.Component {
  state = {
    type: this.props.type || null,
    user: this.props.user || null,
    error: null,
    loading: true
  };

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch() {
    const { user, type } = this.state;

    this.setState({
      posts: null,
      error: null
    });

    if (type) {
      fetchRecentPosts(type)
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

    if (user) {
      fetchPosts(user.submitted.slice(0, 50))
        .then(posts => {
          if (posts.length === 0) {
            posts = null;
          }

          this.setState({
            posts,
            error: null,
            loading: false
          });
        })
        .catch(({ message }) =>
          this.setState({
            error: message,
            loading: false
          })
        );
    }
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
        {posts ? (
          posts.map(post => (
            <li key={post.id}>
              <PostDetails post={post} />
            </li>
          ))
        ) : (
          <li>Couldn't find any posts by this user</li>
        )}
      </>
    );
  }
}
