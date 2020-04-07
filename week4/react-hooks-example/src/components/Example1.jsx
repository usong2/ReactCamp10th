import React from "react";

export default class Example1 extends React.Component {
  state = {
    count: 0,
  };

  render() {
    const { count } = this.state;

    return (
      <div>
        <p>You clicked {count} times</p>
        <button
          onClick={() => {
            this.setState({ count: count + 1 });
          }}
        >
          Click me
        </button>
      </div>
    );
  }
}
