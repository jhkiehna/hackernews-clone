import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { fetchComments, fetchItem } from "../utils/api";

export default class Comments extends React.Component {
  state = {
    post: null,
    comments: null,
    error: null
  };

  componentDidMount() {
    this.handleFetch();
  }

  componentDidUpdate() {
    this.state.comments && console.log(this.state.comments);
  }

  handleFetch() {
    const { postid } = queryString.parse(this.props.location.search);

    this.setState({
      post: null,
      comments: null,
      error: null
    });

    fetchItem(postid)
      .then(post => {
        fetchComments(post.kids)
          .then(comments =>
            this.setState({
              post: post,
              comments,
              error: null
            })
          )
          .catch(({ message }) =>
            this.setState({
              error: this.state.error + message
            })
          );
      })
      .catch(({ message }) =>
        this.setState({
          error: this.state.error + message
        })
      );
  }

  render() {
    const { comments, post } = this.state;

    return (
      <>
        <h3>Comments</h3>

        {comments && (
          <p>
            {comments.length} comments on{" "}
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              {post.title}
            </a>
          </p>
        )}

        <ul>
          {comments &&
            comments.map((comment, index) => (
              <li className="comment" key={index}>
                <Link to={`/user?username=${comment.by}`}>{comment.by}</Link>
                <p dangerouslySetInnerHTML={{ __html: comment.text }} />
              </li>
            ))}
        </ul>
      </>
    );
  }
}
