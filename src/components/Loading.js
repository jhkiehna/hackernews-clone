import React from "react";

export default class Loading extends React.Component {
  state = {
    count: 0
  };

  componentDidMount() {
    this.interval = window.setInterval(() => {
      let { count } = this.state;

      if (count <= 5) {
        this.setState({ count: (count += 1) });
      } else {
        this.setState({ count: 0 });
      }
    }, 50);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    const { count } = this.state;

    return <div className="loading">LOADING {".".repeat(count)}</div>;
  }
}
