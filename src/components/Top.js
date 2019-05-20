import React from "react";
import { fetchTopPosts } from "../utils/api";

export default class Top extends React.Component {
  state = {
    posts: null,
    error: null
  };

  componentDidMount() {
    this.handleFetch();
  }

  componentDidUpdate() {
    console.log(this.state.posts);
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
          error: null
        })
      )
      .catch(({ message }) =>
        this.setState({
          error: message
        })
      );
  }

  render() {
    return (
      <>
        <h1>Top News Component</h1>

        <ul>
          {this.state.posts &&
            this.state.posts.map((story, index) => {
              return <li key={index}>{story}</li>;
            })}
        </ul>
      </>
    );
  }
}
