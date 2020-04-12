import React from "react";
import { addTodo } from "../actions";
import { useDispatch } from "react-redux";

const TodoForm = () => {
  const dispatch = useDispatch();
  const inputRef = React.createRef();
  function click() {
    const text = inputRef.current.value;
    console.log(text);
    dispatch(addTodo(text));
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

export default TodoForm;
