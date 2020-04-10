// App.js

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { addTodo, completeTodo } from "./actions";

function App({ store }) {
  const inputRef = React.createRef();
  function click() {
    const text = inputRef.current.value;
    console.log(text);
    store.dispatch(addTodo(text));
  }
  const todos = store.getState().todos;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <input ref={inputRef} />
          <button onClick={click}>add</button>
        </p>
        <ul>
          {todos.map((todo, index) => (
            <div key={index}>
              <h2>
                {todo.text}{" "}
                {todo.done ? (
                  "(완료)"
                ) : (
                  <button
                    onClick={() => {
                      console.log(index);
                      store.dispatch(completeTodo(index));
                    }}
                  >
                    끝!
                  </button>
                )}
              </h2>
            </div>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
