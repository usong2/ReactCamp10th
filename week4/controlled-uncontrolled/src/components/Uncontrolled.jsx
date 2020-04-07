import React from "react";

export default class Uncontrolled extends React.Component {
  inputRef = React.createRef();

  render() {
    return (
      <div>
        <input ref={this.inputRef} />
        <button onClick={this.click}>전송</button>
      </div>
    );
  }
  click = () => {
    console.log(this.inputRef.current.value);
  };
}
