import React from "react";

export default class Exmplae4 extends React.Component {
  state = { count: 0 };
  componentDidMount() {
    console.log("componentDidMount", this.state.count);
  }
  componentDidUpdate() {
    console.log("componentDidUpdate", this.state.count);
  }

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
