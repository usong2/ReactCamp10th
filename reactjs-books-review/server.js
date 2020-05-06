const express = require("express");
const { join } = require("path");
const fs = require("fs");

const ReactDOMServer = require("react-dom/server");
const React = require("react");

const app = express();

// 어떤 요청에 어떤 응답을 할지 설정

// API 서버를 만든다.
app.get("/api/books", (req, res) => {
  res.json(["hello", "world"]);
});

// 1. static 파일이 있으면 그걸 준다.
app.use(express.static(join(__dirname, "build")));

// 2. 나머지 모든 요청에 index.html을 준다.
// app.get('/', function(req, res) {
app.get("*", (req, res) => {
  const state = {
    books: { books: [], loading: false, error: null },
    auth: { token: null, loading: false, error: null },
  };

  const string = ReactDOMServer.renderToString(
    React.createElement("div", null, "Hello World")
  );

  const html = fs
    .readFileSync(join(__dirname, "build", "index.html"))
    .toString();

  res.send(
    html.replace(
      `<div id="root"></div>`,
      `<div id="root">${string}<div><script>window.INITIAL_STATE = ${JSON.stringify(
        state
      )}</script>`
    )
  );
});

app.listen(9000, () => {
  console.log("server started...");
});
