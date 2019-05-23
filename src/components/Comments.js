import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { fetchComments, fetchItem } from "../utils/api";
import Loading from "./Loading";

export default class Comments extends React.Component {
  state = {
    postId: this.props.postId || null,
    post: null,
    comments: null,
    error: null,
    loading: true
  };

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch() {
    let { postId } = this.state;

    this.setState({
      post: null,
      comments: null,
      error: null
    });

    if (postId) {
      this.getPost(postId);
    } else {
      postId = queryString.parse(this.props.location.search).postid;
      this.getPost(postId);
    }
  }

  getPost(postId) {
    fetchItem(postId)
      .then(post => {
        this.setState({
          post,
          error: null,
          loading: false
        });
        if (post.kids) {
          this.getComments(post);
        }
      })
      .catch(({ message }) =>
        this.setState({
          error: message,
          loading: false
        })
      );
  }

  getComments(post) {
    console.log(post.kids.length);

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
  }

  getTotalComments() {}

  render() {
    const { postId, post, comments, loading, error } = this.state;

    if (loading === true) {
      return <Loading />;
    }

    if (error) {
      throw new Error(error);
    }

    return (
      <>
        {comments && postId === null ? (
          <>
            <h3>Comments</h3>
            <p>
              {comments.length} comments on{" "}
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                {post.title}
              </a>
            </p>
          </>
        ) : (
          <></>
        )}

        <ul>
          {comments &&
            comments.map((comment, index) => (
              <li
                className={`comment ${postId && "nestedComment"}`}
                key={index}
              >
                <Link to={`/user?username=${comment.by}`}>{comment.by}</Link>
                <p dangerouslySetInnerHTML={{ __html: comment.text }} />

                {comment.kids && <Comments postId={comment.id} />}
              </li>
            ))}
        </ul>
      </>
    );
  }
}
