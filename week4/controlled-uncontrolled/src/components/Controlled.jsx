import React from "react";

export default class Controlled extends React.Component {
  state = { value: "" };

  render() {
    const { value } = this.state;
    return (
      <div>
        <input value={this.state.value} onChange={this._change} />
        <button onClick={this._click}>전송</button>
      </div>
    );
  }

  _change = (e) => {
    this.setState({ value: e.target.value });
  };

  _click = () => {
    console.log("최종 결과", this.state.value);
  };
}
