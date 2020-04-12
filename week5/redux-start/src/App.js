// App.js

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { completeTodo } from "./actions";
import TodoForm from "./components/TodoForm";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TodoForm />
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
                      dispatch(completeTodo(index));
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
};

// const mapStateToProps = (state) => ({
//   todos: state.todos,
// });

// const mapDispatchToProps = (dispatch) => ({
//   completeTodo: (index) => {
//     dispatch(completeTodo(index));
//   },
// });

export default App;
