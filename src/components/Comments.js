import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import Moment from "moment";

import { fetchComments, fetchItem } from "../utils/api";
import Loading from "./Loading";

export default class Comments extends React.Component {
  state = {
    post: this.props.post || null,
    comments: null,
    error: null,
    loading: true
  };

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch() {
    const { post } = this.state;
    let postId = post ? post.id : null;

    this.setState({
      post: null,
      comments: null,
      error: null
    });

    if (!postId) {
      postId = queryString.parse(this.props.location.search).postid;
      fetchItem(postId)
        .then(post => {
          this.setState({
            post: post
          });

          this.getComments();
        })
        .catch(({ message }) =>
          this.setState({
            error: message,
            loading: false
          })
        );
    } else {
      this.getComments();
    }
  }

  getComments() {
    const { post } = this.state;

    if (post.kids) {
      fetchComments(post.kids)
        .then(comments =>
          this.setState({
            post: post,
            comments,
            error: null,
            loading: false
          })
        )
        .catch(({ message }) =>
          this.setState({
            error: message,
            loading: false
          })
        );
    } else {
      this.setState({
        error: null,
        loading: false
      });
    }
  }

  getTimeAgo(unixTimeStamp) {
    return Moment.duration(
      Moment().format("X") - unixTimeStamp,
      "seconds"
    ).humanize();
  }

  render() {
    const { comments, post, loading, error } = this.state;

    if (loading === true) {
      return <Loading />;
    }

    if (error) {
      throw new Error(error);
    }

    return (
      <>
        {post.type === "story" ? (
          <p>
            {post.descendants} comments on{" "}
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              {post.title}
            </a>
          </p>
        ) : (
          <></>
        )}
        <ul>
          {comments &&
            comments.map(comment => (
              <li
                className={`comment ${
                  post.type === "comment" ? "nestedComment" : ""
                }`}
                key={comment.id}
              >
                <Link to={`/user?username=${comment.by}`}>{comment.by}</Link>
                {` ${this.getTimeAgo(comment.time)} ago`}

                <p dangerouslySetInnerHTML={{ __html: comment.text }} />

                {comment.kids && <Comments post={comment} />}
              </li>
            ))}
        </ul>
      </>
    );
  }
}
