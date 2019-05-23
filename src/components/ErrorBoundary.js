import React from "react";

const resetButtonStyle = {
  fontSize: "2em",
  marginTop: "2em",
  padding: "0.5em 2em 0.5em 2em",
  border: "2px solid black",
  borderRadius: "5px",
  cursor: "pointer"
};

export default class ErrorBoundary extends React.Component {
  state = { error: null, errorInfo: null };

  reset() {
    this.setState({
      error: null,
      errorInfo: null
    });
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.log(error, errorInfo);
  }

  render() {
    const { error, errorInfo } = this.state;

    if (error) {
      return (
        <>
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>

          <button style={resetButtonStyle} onClick={() => this.reset()}>
            Reset
          </button>
        </>
      );
    }

    return this.props.children;
  }
}
