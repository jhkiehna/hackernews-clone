import React from "react";
import { Link } from "react-router-dom";
import Moment from "moment";

export default class PostDetails extends React.Component {
  state = {
    post: this.props.post
  };

  render() {
    const { post } = this.state;
    let dateTime = Moment.unix(post.time);

    return (
      <ul>
        <li>
          <h3>
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              {post.title}
            </a>
          </h3>
        </li>
        <li>
          {" by "}
          <Link className="littleLink" to={`/user?username=${post.by}`}>
            {post.by}
          </Link>
          {` on ${dateTime.format("L")} at ${dateTime.format("LT")}`}
          {" with "}
          {post.kids ? (
            <Link className="littleLink" to={`/comments?postid=${post.id}`}>
              {`${post.descendants} comments`}
            </Link>
          ) : (
            "0 comments"
          )}
        </li>
      </ul>
    );
  }
}
