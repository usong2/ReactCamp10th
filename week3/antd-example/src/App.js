import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { DatePicker, Button, Row, Col } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const colStyle = () => ({
  height: 50,
  backgroundColor: "red",
  opacity: Math.round(Math.random() * 10) / 10,
});

function MyCol({ span, offset }) {
  const opacity = Math.round(Math.random() * 10) / 10;
  return (
    <Col span={span} offset={offset}>
      <div style={{ height: 50, backgroundColor: "red", opacity }} />
    </Col>
  );
}

function App() {
  return (
    <div className="App">
      <Row
        style={{
          height: 300,
        }}
        type="flex"
        justify="center"
        align="middle"
      >
        <MyCol span={4} />
        <MyCol span={4} />
        <MyCol span={4} />
        <MyCol span={4} />
      </Row>

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
