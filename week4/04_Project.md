# Project

## Login 요청하기

```bash
$ git clone -b 10th https://github.com/2woongjae/reactjs-books-review.git
```

<br>

### SigninForm 구조

+ ./src/components에 SigninForm.jsx 생성

  ```jsx
  /* src/components/SignForm.jsx */
  
  import React from "react";
  import { Input, Button, Divider, Col } from "antd";
  import styled from "styled-components";
  import { Link } from "react-router-dom";
  
  const Title = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    text-transform: uppercase;
    font-family: Roboto;
    font-size: 24px;
    font-weight: bold;
    margin-top: 60px;
    text-align: center;
  `;
  
  const InputTitle = styled.div`
    font-family: Roboto;
    font-size: 12px;
    font-weight: bold;
    margin-top: ${(props) => props.top || "40"}px;
    text-align: left;
    padding-left: 40px;
  `;
  
  const InputArea = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 40px;
    padding-right: 40px;
  `;
  
  const StyledInput = styled(Input)`
    width: 100%;
    border-radius: 1px;
    border-width: 1px;
    font-family: Roboto;
  `;
  
  const ButtonArea = styled.div`
    text-align: left;
    padding-left: 40px;
    margin-top: 20px;
  `;
  
  const StyledButton = styled(Button)`
    border-color: #28546a;
    background-color: #28546a;
    text-transform: uppercase;
    border-radius: 1px;
    border-width: 2px;
    color: white;
    width: 120px;
    &:hover {
      background-color: #28546a;
      color: white;
    }
  `;
  
  const DividerArea = styled.div`
    font-family: Roboto;
    font-size: 12px;
    font-weight: bold;
    margin-top: 30px;
    text-align: left;
    padding-left: 40px;
    padding-right: 40px;
  `;
  
  const LinkArea = styled.div`
    padding-left: 40px;
    padding-right: 40px;
    margin-top: 15px;
    overflow: hidden;
  `;
  
  const LinkTitle = styled.div`
    float: left;
    padding-top: 5px;
  `;
  
  const StyledSpan = styled.span.attrs(() => ({
    children: "*",
  }))`
    color: #971931;
  `;
  
  const LinkButtonArea = styled.div`
    float: right;
  `;
  
  const LinkButton = styled(Button)`
    background-color: #f3f7f8;
    border-color: #28546a;
    color: #28546a;
    text-transform: uppercase;
    border-radius: 1px;
    border-width: 2px;
    &:hover {
      background-color: #28546a;
      color: white;
    }
  `;
  
  export default function SigninForm() {
    const emailInput = React.createRef();
    const passwordInput = React.createRef();
  
    function click() {
      console.log(
        emailInput.current.state.value,
        passwordInput.current.state.value
      );
    }
  
    return (
      <Col
        span={12}
        style={{
          verticalAlign: "top",
        }}
      >
        <form>
          <Title>Log In. Start Searching.</Title>
          <InputTitle>
            Email
            <StyledSpan />
          </InputTitle>
          <InputArea>
            <StyledInput
              placeholder="Email"
              autoComplete="email"
              name="email"
              ref={emailInput}
            />
          </InputArea>
          <InputTitle top={10}>
            Password
            <StyledSpan />
          </InputTitle>
          <InputArea>
            <StyledInput
              type="password"
              autoComplete="current-password"
              ref={passwordInput}
            />
          </InputArea>
          <ButtonArea>
            <StyledButton size="large" loading={false} onClick={click}>
              Sign In
            </StyledButton>
          </ButtonArea>
          <DividerArea>
            <Divider />
          </DividerArea>
          <LinkArea>
            <LinkTitle>Need to create an account?</LinkTitle>
            <LinkButtonArea>
              <Link to="/signup">
                <LinkButton>Sign up</LinkButton>
              </Link>
            </LinkButtonArea>
          </LinkArea>
          <LinkArea>
            <LinkTitle>Forgot your password?</LinkTitle>
            <LinkButtonArea>
              <Link to="/forgot">
                <LinkButton>Recovery</LinkButton>
              </Link>
            </LinkButtonArea>
          </LinkArea>
        </form>
      </Col>
    );
  }
  ```

+ ./src/App.js 수정

  ```jsx
   /* ./src/App.js */
    
    import React from "react";
    import { BrowserRouter, Route, Switch } from "react-router-dom";
    import Signin from "./pages/Signin";
    import Home from "./pages/Home";
    import NotFound from "./pages/NotFound";
    
    function App() {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/signin" component={Signin} />
            <Route path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      );
    }
    
    export default App;
  ```

### axios

```bash
$ npm i axios
```

#### Promise

+ ./src/components/SigninForm.jsx 수정

  ```jsx
  /* ./src/components/SigninForm.jsx */
  
  import React from "react";
  import { Input, Button, Divider, Col } from "antd";
import styled from "styled-components";
  import { Link } from "react-router-dom";
  import axios from "axios";
  
  const Title = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    text-transform: uppercase;
    font-family: Roboto;
    font-size: 24px;
    font-weight: bold;
    margin-top: 60px;
    text-align: center;
  `;
  
  const InputTitle = styled.div`
    font-family: Roboto;
    font-size: 12px;
    font-weight: bold;
    margin-top: ${(props) => props.top || "40"}px;
    text-align: left;
    padding-left: 40px;
  `;
  
  const InputArea = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 40px;
    padding-right: 40px;
  `;
  
  const StyledInput = styled(Input)`
    width: 100%;
    border-radius: 1px;
    border-width: 1px;
    font-family: Roboto;
  `;
  
  const ButtonArea = styled.div`
    text-align: left;
    padding-left: 40px;
    margin-top: 20px;
  `;
  
  const StyledButton = styled(Button)`
    border-color: #28546a;
    background-color: #28546a;
    text-transform: uppercase;
    border-radius: 1px;
    border-width: 2px;
    color: white;
    width: 120px;
    &:hover {
      background-color: #28546a;
      color: white;
    }
  `;
  
  const DividerArea = styled.div`
    font-family: Roboto;
    font-size: 12px;
    font-weight: bold;
    margin-top: 30px;
    text-align: left;
    padding-left: 40px;
    padding-right: 40px;
  `;
  
  const LinkArea = styled.div`
    padding-left: 40px;
    padding-right: 40px;
    margin-top: 15px;
    overflow: hidden;
  `;
  
  const LinkTitle = styled.div`
    float: left;
    padding-top: 5px;
  `;
  
  const StyledSpan = styled.span.attrs(() => ({
    children: "*",
  }))`
    color: #971931;
  `;
  
  const LinkButtonArea = styled.div`
    float: right;
  `;
  
  const LinkButton = styled(Button)`
    background-color: #f3f7f8;
    border-color: #28546a;
    color: #28546a;
    text-transform: uppercase;
    border-radius: 1px;
    border-width: 2px;
    &:hover {
      background-color: #28546a;
      color: white;
    }
  `;
  
  export default function SigninForm() {
    const emailInput = React.createRef();
    const passwordInput = React.createRef();
  
    function click() {
      const email = emailInput.current.state.value;
      const password = passwordInput.current.state.value;
  
      axios
        .post("https://api.marktube.tv/v1/me", {
          email,
          password,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
    return (
      <Col
        span={12}
        style={{
          verticalAlign: "top",
        }}
      >
        <form>
          <Title>Log In. Start Searching.</Title>
          <InputTitle>
            Email
            <StyledSpan />
          </InputTitle>
          <InputArea>
            <StyledInput
              placeholder="Email"
              autoComplete="email"
              name="email"
              ref={emailInput}
            />
          </InputArea>
          <InputTitle top={10}>
            Password
            <StyledSpan />
          </InputTitle>
          <InputArea>
            <StyledInput
              type="password"
              autoComplete="current-password"
              ref={passwordInput}
            />
          </InputArea>
          <ButtonArea>
            <StyledButton size="large" loading={false} onClick={click}>
              Sign In
            </StyledButton>
          </ButtonArea>
          <DividerArea>
            <Divider />
          </DividerArea>
          <LinkArea>
            <LinkTitle>Need to create an account?</LinkTitle>
            <LinkButtonArea>
              <Link to="/signup">
                <LinkButton>Sign up</LinkButton>
              </Link>
            </LinkButtonArea>
          </LinkArea>
          <LinkArea>
            <LinkTitle>Forgot your password?</LinkTitle>
            <LinkButtonArea>
              <Link to="/forgot">
                <LinkButton>Recovery</LinkButton>
              </Link>
            </LinkButtonArea>
          </LinkArea>
        </form>
      </Col>
    );
  }
  ```
  

#### async await

+ ./src/components/SigninForm.jsx 수정

  ```jsx
  /* ./src/components/SigninForm.jsx */
  
  import React from "react";
  import { Input, Button, Divider, Col } from "antd";
  import styled from "styled-components";
  import { Link } from "react-router-dom";
  import axios from "axios";
  
  const Title = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    text-transform: uppercase;
    font-family: Roboto;
    font-size: 24px;
    font-weight: bold;
    margin-top: 60px;
    text-align: center;
  `;
  
  const InputTitle = styled.div`
    font-family: Roboto;
    font-size: 12px;
    font-weight: bold;
    margin-top: ${(props) => props.top || "40"}px;
    text-align: left;
    padding-left: 40px;
  `;
  
  const InputArea = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 40px;
    padding-right: 40px;
  `;
  
  const StyledInput = styled(Input)`
    width: 100%;
    border-radius: 1px;
    border-width: 1px;
    font-family: Roboto;
  `;
  
  const ButtonArea = styled.div`
    text-align: left;
    padding-left: 40px;
    margin-top: 20px;
  `;
  
  const StyledButton = styled(Button)`
    border-color: #28546a;
    background-color: #28546a;
    text-transform: uppercase;
    border-radius: 1px;
    border-width: 2px;
    color: white;
    width: 120px;
    &:hover {
      background-color: #28546a;
      color: white;
    }
  `;
  
  const DividerArea = styled.div`
    font-family: Roboto;
    font-size: 12px;
    font-weight: bold;
    margin-top: 30px;
    text-align: left;
    padding-left: 40px;
    padding-right: 40px;
  `;
  
  const LinkArea = styled.div`
    padding-left: 40px;
    padding-right: 40px;
    margin-top: 15px;
    overflow: hidden;
  `;
  
  const LinkTitle = styled.div`
    float: left;
    padding-top: 5px;
  `;
  
  const StyledSpan = styled.span.attrs(() => ({
    children: "*",
  }))`
    color: #971931;
  `;
  
  const LinkButtonArea = styled.div`
    float: right;
  `;
  
  const LinkButton = styled(Button)`
    background-color: #f3f7f8;
    border-color: #28546a;
    color: #28546a;
    text-transform: uppercase;
    border-radius: 1px;
    border-width: 2px;
    &:hover {
      background-color: #28546a;
      color: white;
    }
  `;
  
  export default function SigninForm() {
    const emailInput = React.createRef();
    const passwordInput = React.createRef();
  
    async function click() {
      const email = emailInput.current.state.value;
      const password = passwordInput.current.state.value;
  
      try {
        const res = await axios.post("https://api.marktube.tv/v1/me", {
          email,
          password,
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <Col
        span={12}
        style={{
          verticalAlign: "top",
        }}
      >
        <form>
          <Title>Log In. Start Searching.</Title>
          <InputTitle>
            Email
            <StyledSpan />
          </InputTitle>
          <InputArea>
            <StyledInput
              placeholder="Email"
              autoComplete="email"
              name="email"
              ref={emailInput}
            />
          </InputArea>
          <InputTitle top={10}>
            Password
            <StyledSpan />
          </InputTitle>
          <InputArea>
            <StyledInput
              type="password"
              autoComplete="current-password"
              ref={passwordInput}
            />
          </InputArea>
          <ButtonArea>
            <StyledButton size="large" loading={false} onClick={click}>
              Sign In
            </StyledButton>
          </ButtonArea>
          <DividerArea>
            <Divider />
          </DividerArea>
          <LinkArea>
            <LinkTitle>Need to create an account?</LinkTitle>
            <LinkButtonArea>
              <Link to="/signup">
                <LinkButton>Sign up</LinkButton>
              </Link>
            </LinkButtonArea>
          </LinkArea>
          <LinkArea>
            <LinkTitle>Forgot your password?</LinkTitle>
            <LinkButtonArea>
              <Link to="/forgot">
                <LinkButton>Recovery</LinkButton>
              </Link>
            </LinkButtonArea>
          </LinkArea>
        </form>
      </Col>
    );
  }
  ```

### withRouter

+ ./src/components/SigninForm.jsx 수정

  ```jsx
  /* ./src/components/SigninForm.jsx */
  
  import React from "react";
  import { Input, Button, Divider, Col } from "antd";
  import styled from "styled-components";
  import { Link, withRouter } from "react-router-dom";
  import axios from "axios";
  
  const Title = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    text-transform: uppercase;
    font-family: Roboto;
    font-size: 24px;
    font-weight: bold;
    margin-top: 60px;
    text-align: center;
  `;
  
  const InputTitle = styled.div`
    font-family: Roboto;
    font-size: 12px;
    font-weight: bold;
    margin-top: ${(props) => props.top || "40"}px;
    text-align: left;
    padding-left: 40px;
  `;
  
  const InputArea = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 40px;
    padding-right: 40px;
  `;
  
  const StyledInput = styled(Input)`
    width: 100%;
    border-radius: 1px;
    border-width: 1px;
    font-family: Roboto;
  `;
  
  const ButtonArea = styled.div`
    text-align: left;
    padding-left: 40px;
    margin-top: 20px;
  `;
  
  const StyledButton = styled(Button)`
    border-color: #28546a;
    background-color: #28546a;
    text-transform: uppercase;
    border-radius: 1px;
    border-width: 2px;
    color: white;
    width: 120px;
    &:hover {
      background-color: #28546a;
      color: white;
    }
  `;
  
  const DividerArea = styled.div`
    font-family: Roboto;
    font-size: 12px;
    font-weight: bold;
    margin-top: 30px;
    text-align: left;
    padding-left: 40px;
    padding-right: 40px;
  `;
  
  const LinkArea = styled.div`
    padding-left: 40px;
    padding-right: 40px;
    margin-top: 15px;
    overflow: hidden;
  `;
  
  const LinkTitle = styled.div`
    float: left;
    padding-top: 5px;
  `;
  
  const StyledSpan = styled.span.attrs(() => ({
    children: "*",
  }))`
    color: #971931;
  `;
  
  const LinkButtonArea = styled.div`
    float: right;
  `;
  
  const LinkButton = styled(Button)`
    background-color: #f3f7f8;
    border-color: #28546a;
    color: #28546a;
    text-transform: uppercase;
    border-radius: 1px;
    border-width: 2px;
    &:hover {
      background-color: #28546a;
      color: white;
    }
  `;
  
  function SigninForm({ history }) {
    const emailInput = React.createRef();
    const passwordInput = React.createRef();
  
    async function click() {
      const email = emailInput.current.state.value;
      const password = passwordInput.current.state.value;
  
      try {
        const res = await axios.post("https://api.marktube.tv/v1/me", {
          email,
          password,
        });
        console.log(res.data);
        // 로그인 성공
        history.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <Col
        span={12}
        style={{
          verticalAlign: "top",
        }}
      >
        <form>
          <Title>Log In. Start Searching.</Title>
          <InputTitle>
            Email
            <StyledSpan />
          </InputTitle>
          <InputArea>
            <StyledInput
              placeholder="Email"
              autoComplete="email"
              name="email"
              ref={emailInput}
            />
          </InputArea>
          <InputTitle top={10}>
            Password
            <StyledSpan />
          </InputTitle>
          <InputArea>
            <StyledInput
              type="password"
              autoComplete="current-password"
              ref={passwordInput}
            />
          </InputArea>
          <ButtonArea>
            <StyledButton size="large" loading={false} onClick={click}>
              Sign In
            </StyledButton>
          </ButtonArea>
          <DividerArea>
            <Divider />
          </DividerArea>
          <LinkArea>
            <LinkTitle>Need to create an account?</LinkTitle>
            <LinkButtonArea>
              <Link to="/signup">
                <LinkButton>Sign up</LinkButton>
              </Link>
            </LinkButtonArea>
          </LinkArea>
          <LinkArea>
            <LinkTitle>Forgot your password?</LinkTitle>
            <LinkButtonArea>
              <Link to="/forgot">
                <LinkButton>Recovery</LinkButton>
              </Link>
            </LinkButtonArea>
          </LinkArea>
        </form>
      </Col>
    );
  }
  
  export default withRouter(SigninForm);
  ```

### Loading 기능

+ ./src/components/SigninForm.jsx 수정

  ```jsx
  /* ./src/components/SigninForm.jsx */
  
  import React, { useState } from "react";
  import { Input, Button, Divider, Col } from "antd";
  import styled from "styled-components";
  import { Link, withRouter } from "react-router-dom";
  import axios from "axios";
  
  const Title = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    text-transform: uppercase;
    font-family: Roboto;
    font-size: 24px;
    font-weight: bold;
    margin-top: 60px;
    text-align: center;
  `;
  
  const InputTitle = styled.div`
    font-family: Roboto;
    font-size: 12px;
    font-weight: bold;
    margin-top: ${(props) => props.top || "40"}px;
    text-align: left;
    padding-left: 40px;
  `;
  
  const InputArea = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 40px;
    padding-right: 40px;
  `;
  
  const StyledInput = styled(Input)`
    width: 100%;
    border-radius: 1px;
    border-width: 1px;
    font-family: Roboto;
  `;
  
  const ButtonArea = styled.div`
    text-align: left;
    padding-left: 40px;
    margin-top: 20px;
  `;
  
  const StyledButton = styled(Button)`
    border-color: #28546a;
    background-color: #28546a;
    text-transform: uppercase;
    border-radius: 1px;
    border-width: 2px;
    color: white;
    width: 120px;
    &:hover {
      background-color: #28546a;
      color: white;
    }
  `;
  
  const DividerArea = styled.div`
    font-family: Roboto;
    font-size: 12px;
    font-weight: bold;
    margin-top: 30px;
    text-align: left;
    padding-left: 40px;
    padding-right: 40px;
  `;
  
  const LinkArea = styled.div`
    padding-left: 40px;
    padding-right: 40px;
    margin-top: 15px;
    overflow: hidden;
  `;
  
  const LinkTitle = styled.div`
    float: left;
    padding-top: 5px;
  `;
  
  const StyledSpan = styled.span.attrs(() => ({
    children: "*",
  }))`
    color: #971931;
  `;
  
  const LinkButtonArea = styled.div`
    float: right;
  `;
  
  const LinkButton = styled(Button)`
    background-color: #f3f7f8;
    border-color: #28546a;
    color: #28546a;
    text-transform: uppercase;
    border-radius: 1px;
    border-width: 2px;
    &:hover {
      background-color: #28546a;
      color: white;
    }
  `;
  
  function SigninForm({ history }) {
    const [isLoading, setIsLoading] = useState(false);
  
    const emailInput = React.createRef();
    const passwordInput = React.createRef();
  
    async function click() {
      const email = emailInput.current.state.value;
      const password = passwordInput.current.state.value;
  
      try {
        setIsLoading(true);
        const res = await axios.post("https://api.marktube.tv/v1/me", {
          email,
          password,
        });
        console.log(res.data);
        setIsLoading(false);
  
        // 로그인 성공
        history.push("/");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  
    return (
      <Col
        span={12}
        style={{
          verticalAlign: "top",
        }}
      >
        <form>
          <Title>Log In. Start Searching.</Title>
          <InputTitle>
            Email
            <StyledSpan />
          </InputTitle>
          <InputArea>
            <StyledInput
              placeholder="Email"
              autoComplete="email"
              name="email"
              ref={emailInput}
            />
          </InputArea>
          <InputTitle top={10}>
            Password
            <StyledSpan />
          </InputTitle>
          <InputArea>
            <StyledInput
              type="password"
              autoComplete="current-password"
              ref={passwordInput}
            />
          </InputArea>
          <ButtonArea>
            <StyledButton size="large" loading={isLoading} onClick={click}>
              Sign In
            </StyledButton>
          </ButtonArea>
          <DividerArea>
            <Divider />
          </DividerArea>
          <LinkArea>
            <LinkTitle>Need to create an account?</LinkTitle>
            <LinkButtonArea>
              <Link to="/signup">
                <LinkButton>Sign up</LinkButton>
              </Link>
            </LinkButtonArea>
          </LinkArea>
          <LinkArea>
            <LinkTitle>Forgot your password?</LinkTitle>
            <LinkButtonArea>
              <Link to="/forgot">
                <LinkButton>Recovery</LinkButton>
              </Link>
            </LinkButtonArea>
          </LinkArea>
        </form>
      </Col>
    );
  }
  
  export default withRouter(SigninForm);
  ```

### Error feedback

+ ant design의 message: [https://ant.design/components/message/](https://ant.design/components/message/)

+ ./src/components/SigninForm.jsx 수정

  ```jsx
  /* ./src/components/SigninForm.jsx */
  
  import { Input, Button, Divider, Col, message } from "antd";
  
  ...
  
    async function click() {
      const email = emailInput.current.state.value;
      const password = passwordInput.current.state.value;
  
      try {
        setIsLoading(true);
        const res = await axios.post("https://api.marktube.tv/v1/me", {
          email,
          password,
        });
        console.log(res.data);
        setIsLoading(false);
  
        // 로그인 성공
        message.success("Sucess Login!");
        history.push("/");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        // error feedback
        message.error(error.response.data.error);
      }
    }
  
  ...
  ```

<br>

## Token 보관 - localStorage

참고: [https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)

### localStorage.setItem

+ ./src/components/SigninForm.jsx 수정

  ```jsx
  /* ./src/components/SigninForm.jsx */
  
  ...
  
  async function click() {
      const email = emailInput.current.state.value;
      const password = passwordInput.current.state.value;
  
      try {
        setIsLoading(true);
        const res = await axios.post("https://api.marktube.tv/v1/me", {
          email,
          password,
        });
        console.log(res.data);
        setIsLoading(false);
  
        localStorage.setItem("token", res.data.token);
  
        // 로그인 성공
        message.success("Sucess Login!");
        history.push("/");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        // error feedback
        message.error(error.response.data.error);
      }
    }
  
  ...
  ```
  

### localStorage.getItem

token이 없으면 Signin으로 있으면 home으로 이동

+ ./src/App.js 수정

  ```jsx
  /* ./src/App.js */
  
  import React from "react";
  import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
  import Signin from "./pages/Signin";
  import Home from "./pages/Home";
  import NotFound from "./pages/NotFound";
  
  function App() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route
            path="/"
            render={(props) => {
              const token = localStorage.getItem("token");
  
              if (token === null) {
                return <Redirect to="/signin" />;
              }
              return <Home {...props} />;
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
  
  export default App;
  ```

<br>

## withAuth

+ 모든 페이지의 첫 레벨에 토큰 인증 처리

+ redux에서 token을 넣기 때문에 그렇게 중요하지 않음

+ ./src에 hocs 폴더 생성

+ ./src/hocs에 withAuth.js 생성

  ```jsx
  /* ./src/hocs/withAuth.js */
  
  import React from "react";
  import { Redirect } from "react-router-dom";
  
  export default function withAuth(Component) {
    function WrapperComponent(props) {
      const token = localStorage.getItem("token");
  
      if (token === null) {
        return <Redirect to="/signin" />;
      }
      return <Component {...props} />;
    }
  
    WrapperComponent.displayName = `withAuth(${Component.name});`;
  
    return WrapperComponent;
  }
  ```

+ ./src/App.js 수정

  ```jsx
  /* ./src/App.js */
  
  import React from "react";
  import { BrowserRouter, Route, Switch } from "react-router-dom";
  import Signin from "./pages/Signin";
  import Home from "./pages/Home";
  import NotFound from "./pages/NotFound";
  import withAuth from "./hocs/withAuth";
  
  function App() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/" component={withAuth(Home)} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
  
  export default App;
  ```