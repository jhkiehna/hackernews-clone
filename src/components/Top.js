import React from "react";
import { getTopStories } from "../utils/api";

export default class Top extends React.Component {
  state = {
    stories: []
  };

  componentDidMount() {
    this.setState({ stories: getTopStories() });
  }

  render() {
    console.log(this.state);

    return (
      <>
        <h1>Top News Component</h1>

        <ul>
          {this.state.stories.map((story, index) => {
            const { title, author, date } = story;

            return (
              <li key={index}>
                <ul>
                  <li>{title}</li>
                  <li>{author}</li>
                  <li>{date}</li>
                </ul>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}
