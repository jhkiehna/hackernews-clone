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
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  reset() {
    this.setState({
      error: null,
      errorInfo: null
    });
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
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
