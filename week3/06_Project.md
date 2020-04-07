# Project

## 개발 서적 평가 서비스 로그인 디자인

```bash
$ npx create-react-app reactjs-books-review
$ cd reactjs-books-review
$ npm i react-router-dom
$ npm i styled-components
$ npm i antd
```

### npm ci

개발 환경과 배포 환경의 노드 모듈이 같아야할 때

+ npm i *: package.json으로부터 dependencies 트리를 만들어냄
+ npm ci: 이미 있는 버전을 되살리고 싶을 경우

```bash
$ npm ci
```

### 기본 구조

+ ./src/index.js 수정

  ```jsx
  /* ./src/index.js */
  
  import React from "react";
  import ReactDOM from "react-dom";
  import "./index.css";
  import App from "./App";
  import * as serviceWorker from "./serviceWorker";
  import "antd/dist/antd.css";
  
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  ```

+ ./src에 pages 폴더 생성

+ ./src/pages에 Home.jsx 생성

  ```jsx
  /* ./src/pages/Home.jsx */
  
  import React from "react";
  
  const Home = () => <div>Home</div>;
  
  export default Home;
  ```

+ ./src/pages에 Signin.jsx 생성

  ```jsx
  /* ./src/pages/Signin.jsx */
  
  import React from "react";
  
  const Signin = () => <div>Signin</div>;
  
  export default Signin;
  ```

+ ./src/NotFound.jsx 생성

  ```jsx
  /* ./src/pages/NotFound.jsx */
  
  import React from "react";
  
  const NotFound = () => <div>NotFound</div>;
  
  export default NotFound;
  ```

+ ./src/App.js 수정

  ```jsx
  /* ./src/App.js */
  
  import React from "react";
  import "./App.css";
  import { BrowserRouter, Route } from "react-router-dom";
  
  function App() {
    return (
      <BrowserRouter>
        <Route path="/signin" component={Signin} />
        <Route path="/" component={home} />
        <Route component={Error} />
      </BrowserRouter>
    );
  }
  
  export default App;
  ```

### 로그인 구조

+ ./src/pages/Signin.jsx 수정

  ```jsx
  /* ./src/pages/Signin.jsx */
  
  import React from "react";
  import styled from "styled-components";
  import { Row, Col } from "antd";
  
  const Page = styled(Row).attrs(() => ({
    type: "flex",
    align: "middle",
  }))`
    height: 100vh;
  `;
  
  const Title = styled.div`
    text-align: center;
    font-family: Roboto;
    font-size: 40px;
    font-weight: bold;
    color: palevioletred;
    text-transform: uppercase;
  `;
  
  const SubTitle = styled.div`
    text-align: center;
    font-family: Roboto;
    font-size: 27px;
    font-weight: bold;
    text-transform: uppercase;
  `;
  
  const Underline = styled.div`
    width: 200px;
    height: 8px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 20px;
    background: linear-gradient(to right, palevioletred, #ddb49b);
  `;
  
  const Contents = styled(Row).attrs(() => ({
    type: "flex",
  }))`
    margin-top: 50px;
    background-color: #f3f7f8;
    margin-left: auto;
    margin-right: auto;
    width: 800px;
  `;
  
  const SigninBg = styled.div``;
  
  const SigninForm = styled.div``;
  
  const Signin = () => (
    <Page>
      <Col span={24}>
        <Title>USONG REVIEW SERVICE FOR BOOKS</Title>
        <SubTitle>PLEASE SHARE YOUR OPINION ON WEB DEVELOPMENT BOOKS.</SubTitle>
        <Underline />
        <Contents></Contents>
      </Col>
    </Page>
  );
  
  export default Signin;
  ```

+ ./src에 components 폴더 생성

+ ./src/components에 SigninBg.jsx 생성

  ```jsx
  /* ./src/components/SigninBg.jsx */
  
  import React from "react";
  import { Col } from "antd";
  import bg from "../images/bg_signin.png";
  
  const SigninBg = () => (
    <Col span={12}>
      <img src={bg} style={{ width: "100%" }} alt="Signin" />
    </Col>
  );
  
  export default SigninBg;
  ```

+ ./src/pages/Signin.jsx 수정

  ```jsx
  /* ./src/pages/*/
  import React from "react";
  import styled from "styled-components";
  import { Row, Col } from "antd";
  import SigninBg from "../components/SigninBg";
  
  const Page = styled(Row).attrs(() => ({
    type: "flex",
    align: "middle",
  }))`
    height: 100vh;
  `;
  
  const Title = styled.div`
    text-align: center;
    font-family: Roboto;
    font-size: 40px;
    font-weight: bold;
    color: #27ae60;
    text-transform: uppercase;
  `;
  
  const SubTitle = styled.div`
    text-align: center;
    font-family: Roboto;
    font-size: 27px;
    font-weight: bold;
    text-transform: uppercase;
  `;
  
  const Underline = styled.div`
    width: 200px;
    height: 8px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 20px;
    background: linear-gradient(to right, #27ae60, #f9e79f);
  `;
  
  const Contents = styled(Row).attrs(() => ({
    type: "flex",
  }))`
    margin-top: 50px;
    background-color: #f3f7f8;
    margin-left: auto;
    margin-right: auto;
    width: 800px;
  `;
  
  const Signin = () => (
    <Page>
      <Col span={24}>
        <Title>USONG REVIEW SERVICE FOR BOOKS</Title>
        <SubTitle>PLEASE SHARE YOUR OPINION ON WEB DEVELOPMENT BOOKS.</SubTitle>
        <Underline />
        <Contents>
          <SigninBg />
        </Contents>
      </Col>
    </Page>
  );
  
  export default Signin;
  ```

  