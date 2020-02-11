import React from "react";
import logo from "./logo.svg";
import "./App.css";
import StyledButton, { PrimaryStyledButton } from "./StyledButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <StyledButton as="a" href="/">
            버튼
          </StyledButton>
          <PrimaryStyledButton primary>버튼</PrimaryStyledButton>
        </p>
      </header>
    </div>
  );
}

export default App;
