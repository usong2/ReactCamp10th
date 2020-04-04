import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MyButton from "./StyledButton";
import StyledA from "./StyledA";

function App() {
  const inputRef = React.createRef();

  function mouseEnter() {
    if (inputRef.current !== null) {
      const inputEle = inputRef.current;
      inputEle.focus();
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <MyButton primary>버튼</MyButton>
        </p>
        <p>
          <StyledA href="https://github.com">링크</StyledA>
        </p>
        <p>
          <input type="text" onMouseEnter={mouseEnter} ref={inputRef} />
        </p>
      </header>
    </div>
  );
}

export default App;
