import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MyButton from "./StyledButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <MyButton primary>버튼</MyButton>
        </p>
      </header>
    </div>
  );
}

export default App;
