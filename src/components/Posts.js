import React from "react";
import { Link } from "react-router-dom";
import Moment from "moment";

import { fetchRecentPosts } from "../utils/api";
import Loading from "./Loading";

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
        {posts.map((post, index) => (
          <li key={index}>
            <ul>
              <li>
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  {post.title}
                </a>
              </li>
              <li>
                by{" "}
                <Link className="littleLink" to={`/user?username=${post.by}`}>
                  {post.by}
                </Link>
                {" on " +
                  Moment.unix(post.time).format("L") +
                  ", " +
                  Moment.unix(post.time).format("LT")}
                {" with "}
                {post.kids ? (
                  <Link
                    className="littleLink"
                    to={`/comments?postid=${post.id}`}
                  >
                    {post.kids.length} comments
                  </Link>
                ) : (
                  "0 comments"
                )}
              </li>
            </ul>
          </li>
        ))}
      </>
    );
  }
}
