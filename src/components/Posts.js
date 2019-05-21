import React from "react";
import { Link } from "react-router-dom";
import Moment from "moment";

export default class Posts extends React.Component {
  state = {
    posts: this.props.posts
  };

  render() {
    const { posts } = this.state;

    return (
      <>
        {posts &&
          posts.map((post, index) => (
            <li key={index}>
              <ul>
                <li>
                  <a href={post.url} target="_blank" rel="noopener noreferrer">
                    {post.title}
                  </a>
                </li>
                <li>
                  by <Link to={`/user?username=${post.by}`}>{post.by}</Link>
                  {" on " +
                    Moment.unix(post.time).format("L") +
                    ", " +
                    Moment.unix(post.time).format("LT")}
                  {" with "}
                  {post.kids ? (
                    <Link to={`/comments?postid=${post.id}`}>
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
