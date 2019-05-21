import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { fetchComments, fetchItem } from "../utils/api";
import Loading from "./Loading";

export default class Comments extends React.Component {
  state = {
    nested: this.props.nested || false,
    post: null,
    comments: null,
    error: null,
    loading: true
  };

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch() {
    const { postid } =
      this.props.location != null
        ? queryString.parse(this.props.location.search)
        : {
            postid: this.props.postId
          };

    this.setState({
      post: null,
      comments: null,
      error: null
    });

    fetchItem(postid)
      .then(post => {
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
                error: this.state.error + message,
                loading: false
              })
            );
        } else {
          this.setState({
            post: post,
            error: null,
            loading: false
          });
        }
      })
      .catch(({ message }) =>
        this.setState({
          error: this.state.error + message,
          loading: false
        })
      );
  }

  render() {
    const { comments, post, loading, nested } = this.state;

    if (loading === true) {
      return <Loading />;
    }

    return (
      <>
        {nested === true ? <></> : <h3>Comments</h3>}
        {comments && nested === false ? (
          <p>
            {comments.length} comments on{" "}
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              {post.title}
            </a>
          </p>
        ) : (
          <></>
        )}

        <ul>
          {comments &&
            comments.map((comment, index) => (
              <li
                className={`comment ${
                  nested === true ? "nestedComment" : null
                }`}
                key={index}
              >
                <Link to={`/user?username=${comment.by}`}>{comment.by}</Link>
                <p dangerouslySetInnerHTML={{ __html: comment.text }} />

                {comment.kids && (
                  <Comments postId={comment.id} location={null} nested={true} />
                )}
              </li>
            ))}
        </ul>
      </>
    );
  }
}
