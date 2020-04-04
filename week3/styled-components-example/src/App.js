import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MyButton from "./StyledButton";
import StyledA from "./StyledA";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <MyButton primary>버튼</MyButton>
          <StyledA href="https://github.com">링크</StyledA>
        </p>
      </header>
    </div>
  );
}

export default App;
