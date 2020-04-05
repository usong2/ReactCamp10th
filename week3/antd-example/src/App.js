import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { DatePicker, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <DatePicker />
        <p>
          <Button disabled>
            <SmileOutlined />
          </Button>
        </p>
      </header>
    </div>
  );
}

export default App;
