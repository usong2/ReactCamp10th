import React from "react";
import { addTodo } from "../actions";
import { connect } from "react-redux";

const TodoForm = ({ addTodo }) => {
  const inputRef = React.createRef();
  function click() {
    const text = inputRef.current.value;
    console.log(text);
    addTodo(text);
  }
  return (
    <div
      style={{
        border: "1px solid red",
      }}
    >
      <input ref={inputRef} />
      <button onClick={click}>add</button>
    </div>
  );
};

export default connect(
  () => ({}),
  (dispatch) => ({
    addTodo: (text) => {
      dispatch(addTodo(text));
    },
  })
)(TodoForm);
