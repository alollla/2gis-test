import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return "You liked this.";
    }

    return React.createElement(
      "button",
      { onClick: () => this.setState({ liked: true }) },
      "Like"
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
