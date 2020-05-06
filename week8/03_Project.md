# Project

## 개발 서적 평가 서비스 마무리 하기

```bash
$ git clone -b 10th https://github.com/2woongjae/reactjs-books-review.git
$ cd reactjs-books-review
$ nvm use
$ npm ci
$ npm start
```

+ ./.nvmrc

  ```jsx
  12.16.0
  ```

### src 확인

+ **components**: presentational component가 있음(props에 의해 정해진 모습이 나타남)
+ **containers**: component의 prop로 전달될 요소들을 정리
+ **hocs**: 직접 만든 hocs들이 정리
+ **hooks**: 직접 만든 hooks들이 정리
+ **images**: 번들링에 포함될 이미지들(번들링되지 않은 이미지들은 public 폴더)
+ **pages**: 라우팅이 처음 닿는 곳
+ **redux**: 모듈을 ducks 패턴 상태로 사용할 때 모든 내용을 넣어둠
+ **services**: 부수 효과를 다룸

### 레이아웃

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import { Route, Switch } from "react-router-dom";
  import Signin from "./pages/Signin";
  import Home from "./pages/Home";
  import Add from "./pages/Add";
  import NotFound from "./pages/NotFound";
  import { ConnectedRouter } from "connected-react-router";
  import { history } from "./redux/create";
  
  function App() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/add" component={Add} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
    );
  }
  
  export default App;
  ```

+ ./src/pages/Home.jsx 수정

  ```jsx
  // ./src/pages/Home.jsx
  
  import React from "react";
  import BooksContainer from "../containers/BooksContainer";
  import { Link, Redirect } from "react-router-dom";
  import useToken from "../hooks/useToken";
  
  const Home = () => {
    const token = useToken();
    if (token === null) {
      return <Redirect to="/signin" />;
    }
  
    return (
      <div>
        <h1>Home</h1>
        <ul>
          <li>
            <Link to="/signin">로그인</Link>
          </li>
        </ul>
        <BooksContainer />
      </div>
    );
  };
  
  export default Home;
  ```

+ ./src/hooks/useToken.js 생성

  ```jsx
  // ./src/hooks/useToken.js
  
  import { useSelector } from "react-redux";
  
  export default function useToken() {
    const token = useSelector((state) => state.auth.token);
  
    return token;
  }
  ```

+ ./src/pages/Signin.jsx 수정

  ```jsx
  // ./src/pages/Signin.jsx
  
  import React from "react";
  import styled from "styled-components";
  import { Row, Col } from "antd";
  import SigninBg from "../components/SigninBg";
  import SigninFormContainer from "../containers/SigninFormContainer";
  import useToken from "../hooks/useToken";
  import { Redirect } from "react-router-dom";
  
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
  
  const Signin = () => {
    const token = useToken();
    if (token !== null) {
      return <Redirect to="/" />;
    }
  
    return (
      <Page>
        <Col span={24}>
          <Title>USONG REVIEW SERVICE FOR BOOKS</Title>
          <SubTitle>PLEASE SHARE YOUR OPINION ON WEB DEVELOPMENT BOOKS.</SubTitle>
          <Underline />
          <Contents>
            <SigninBg />
            <SigninFormContainer />
          </Contents>
        </Col>
      </Page>
    );
  };
  
  export default Signin;
  ```

+ ./src/pages/Add.jsx 생성

  ```jsx
  // ./src/pages/Add.jsx
  
  import React from "react";
  import BooksContainer from "../containers/BooksContainer";
  import { Link, Redirect } from "react-router-dom";
  import useToken from "../hooks/useToken";
  
  const Add = () => {
    const token = useToken();
    if (token === null) {
      return <Redirect to="/signin" />;
    }
  
    return (
      <div>
        <h1>Home</h1>
        <ul>
          <li>
            <Link to="/signin">로그인</Link>
          </li>
        </ul>
        <BooksContainer />
      </div>
    );
  };
  
  export default Add;
  ```

+ react-helmet 설치

  ```bash
  $ npm install --save react-helmet
  ```

+ ./src/components/Layout.jsx 생성

  ```jsx
  // ./src/components/Layout.jsx
  
  import React from "react";
  import { StyledDiv } from "./Layout.style";
  
  import Head from "./Head";
  import Header from "./Header";
  import Footer from "./Footer";
  
  const Layout = ({ children }) => (
    <div>
      <Head />
      <Header />
      <StyledDiv>{children}</StyledDiv>
      <Footer />
    </div>
  );
  
  export default Layout;
  ```

+ ./src/components/Layout.style.jsx 생성

  ```jsx
  // ./src/components/Layout.style.jsx
  
  import styled from "styled-components";
  
  export const StyledDiv = styled.div`
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 30px;
    margin-bottom: 50px;
  `;
  ```

+ ./src/pages/Home.jsx 수정

  ```jsx
  // ./src/pages/Home.jsx
  
  import React from "react";
  import BooksContainer from "../containers/BooksContainer";
  import { Redirect } from "react-router-dom";
  import useToken from "../hooks/useToken";
  import Layout from "../components/Layout";
  
  const Home = () => {
    const token = useToken();
    if (token === null) {
      return <Redirect to="/signin" />;
    }
  
    return (
      <Layout>
        <BooksContainer />
      </Layout>
    );
  };
  
  export default Home;
  ```

+ ./src/components/Head.jsx 생성

  ```jsx
  // ./src/components/Head.jsx 
  
  import React from "react";
  import { Helmet } from "react-helmet";
  
  const Head = () => (
    <Helmet>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <meta charSet="utf-8" />
      <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
      <title>USONG REVIEW SERVICE FOR BOOKS</title>
      <meta name="description" content="description" />
      <meta name="keyword" content="marktube" />
      <meta property="og:url" content="https://" />
      <meta property="og:title" content="title" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content="description" />
      <meta property="og:image" content="" />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="315" />
    </Helmet>
  );
  
  export default Head;
  ```

+ ./src/components/Header.jsx 생성

  ```jsx
  // ./src/components/Header.jsx
  
  import React from "react";
  import { StyledHeader, StyledHome, StyledLink } from "./Header.style";
  
  import NavContainer from "../containers/NavContainer";
  
  const Header = () => (
    <StyledHeader>
      <StyledHome>
        <StyledLink to="/">MARKTUBE</StyledLink>
      </StyledHome>
      <NavContainer />
    </StyledHeader>
  );
  
  export default Header;
  ```

+ ./src/components/Header.style.jsx 생성

  ```jsx
  // ./src/components/Header.style.jsx 
  
  import styled from "styled-components";
  import { Layout } from "antd";
  import { Link } from "react-router-dom";
  
  export const StyledHeader = styled(Layout.Header)`
    background-color: white;
  `;
  
  export const StyledLink = styled(Link)`
    font-family: Roboto;
    font-size: 18px;
    color: #642828;
    text-transform: uppercase;
    text-align: center;
    &:hover {
      color: #642828;
    }
  `;
  
  export const StyledHome = styled.div`
    width: 120px;
    height: 64px;
    float: left;
    margin-right: 20px;
  `;
  ```

+ ./src/containers/NavContainer.jsx

  ```jsx
  // ./src/containers/NavContainer.jsx
  
  import React from "react";
  import Nav from "../components/Nav";
  
  const NavContainer = () => {
    return <Nav />;
  };
  
  export default NavContainer;
  ```

+ ./src/components/Nav.jsx 생성

  ```jsx
  // ./src/components/Nav.jsx
  
  import React from "react";
  import {
    StyledMenu,
    MenuItem,
    StyledLink,
    StyledMenuSubMenu,
    StyledLogoutButton,
    StyledUser,
  } from "./Nav.style";
  
  const Navs = ({ logout }) => (
    <StyledMenu>
      <MenuItem key="1">
        <StyledLink to="/add">Add Book</StyledLink>
      </MenuItem>
      <StyledMenuSubMenu key="2" title={<StyledUser>{"User"}</StyledUser>}>
        <MenuItem key="3">
          <StyledLink to="/profile">My Profile</StyledLink>
        </MenuItem>
        <MenuItem key="4">
          <StyledLogoutButton onClick={logout}>SIGN OUT</StyledLogoutButton>
        </MenuItem>
      </StyledMenuSubMenu>
    </StyledMenu>
  );
  
  export default Navs;
  ```

+ ./src/components/Nav.style.jsx 생성

  ```jsx
  // ./src/components/Nav.style.jsx
  
  import styled from "styled-components";
  import { Link } from "react-router-dom";
  import { Menu } from "antd";
  
  export const StyledMenu = styled(Menu).attrs(() => ({
    theme: "light",
    mode: "horizontal"
  }))`
    line-height: 64px;
    height: 64px;
  `;
  
  export const MenuItem = styled(Menu.Item)``;
  
  export const StyledLink = styled(Link)`
    font-family: Roboto;
    font-size: 18px;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.65);
    text-transform: uppercase;
    text-align: center;
  `;
  
  export const StyledLogoutButton = styled.div`
    font-family: Roboto;
    font-size: 18px;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.65);
    text-align: center;
    &:hover {
      color: #1890ff;
    }
  `;
  
  export const StyledMenuSubMenu = styled(Menu.SubMenu)`
    width: 200px;
    float: right;
    text-align: center;
  `;
  
  export const StyledUser = styled.div`
    font-family: Roboto;
    font-size: 18px;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.65);
  `;
  ```

+ ./src/components/Footer.jsx 생성

  ```jsx
  // ./src/components/Footer.jsx
  
  import React from "react";
  import { StyledFooter } from "./Footer.style";
  
  import FooterRow from "./FooterRow";
  import FooterBottom from "./FooterBottom";
  
  const Footer = () => (
    <StyledFooter>
      <FooterRow />
      <FooterBottom />
    </StyledFooter>
  );
  
  export default Footer;
  ```

+ ./src/components/Footer.style.jsx 생성

  ```jsx
  // ./src/components/Footer.style.jsx
  
  import styled from "styled-components";
  import { Layout } from "antd";
  
  export const StyledFooter = styled(Layout.Footer)`
    width: 100%;
    padding-top: 60px;
    padding-left: 100px;
    padding-right: 100px;
    padding-bottom: 60px;
    background-color: #0a222e;
  `;
  ```

+ ./src/components/FooterRow.jsx 생성

  ```jsx
  // ./src/components/FooterRow.jsx
  
  import React from "react";
  import { Row } from "antd";
  import FooterColumn from "./FooterColumn";
  import FooterColumnLink from "./FooterColumnLink";
  import FooterColumnAnchor from "./FooterColumnAnchor";
  
  const FooterRow = () => (
    <Row>
      <FooterColumn title="MARKTUBE">
        <FooterColumnLink to="/pricing">PRICING</FooterColumnLink>
        <FooterColumnLink to="/faq">FAQ</FooterColumnLink>
        <FooterColumnLink to="/contactus">Contact Us</FooterColumnLink>
      </FooterColumn>
      <FooterColumn title="POLICIES">
        <FooterColumnLink to="/terms-and-conditions">
          TERMS & CONDITIONS
        </FooterColumnLink>
        <FooterColumnLink to="/privacy-policy">PRIVACY POLICY</FooterColumnLink>
        <FooterColumnLink to="/refund-policy">REFUND POLICY</FooterColumnLink>
      </FooterColumn>
      <FooterColumn title="OUR SERVICES">
        <FooterColumnLink to="/our-services?scroll=advanced-search">
          SEARCH
        </FooterColumnLink>
      </FooterColumn>
      <FooterColumn title="Additional">
        <FooterColumnAnchor href="https://medium.com/@2woongjae">
          MY BLOG
        </FooterColumnAnchor>
      </FooterColumn>
    </Row>
  );
  
  export default FooterRow;
  ```

+ ./src/components/FooterBottom.jsx 생성

  ```jsx
  // ./src/components/FooterBottom.jsx
  
  import styled from "styled-components";
  
  export const StyledDiv = styled.div`
    width: 200px;
    margin-left: auto;
    margin-right: auto;
  `;
  
  export const StyledTitle = styled.h3`
    font-family: Roboto;
    font-weight: bold;
    font-size: 20px;
    line-height: 1.79;
    color: white;
  `;
  ```

+ ./src/components/FooterColumn.jsx 생성

  ```jsx
  // ./src/components/FooterColumn.jsx
  
  import React from "react";
  import { StyledDiv, StyledTitle } from "./FooterColumn.style";
  import { Col } from "antd";
  
  const FooterColumn = ({ title, children }) => (
    <Col span={6}>
      <StyledDiv>
        <StyledTitle>{title}</StyledTitle>
        {children}
      </StyledDiv>
    </Col>
  );
  
  export default FooterColumn;
  ```

+ ./src/components/FooterColumn.style.jsx 생성

  ```jsx
  // ./src/components/FooterColumn.style.jsx
  
  import styled from "styled-components";
  
  export const StyledDiv = styled.div`
    width: 200px;
    margin-left: auto;
    margin-right: auto;
  `;
  
  export const StyledTitle = styled.h3`
    font-family: Roboto;
    font-weight: bold;
    font-size: 20px;
    line-height: 1.79;
    color: white;
  `;
  ```

+ ./src/components/FooterColumnLink.jsx 생성

  ```jsx
  // ./src/components/FooterColumnLink.jsx 
  
  import React from "react";
  import {
    StyledDiv,
    StyledLink
  } from "./FooterColumnLink.style";
  
  const FooterColumnLink = ({ to, children }) => (
    <StyledDiv>
      <StyledLink to={to}>{children}</StyledLink>
    </StyledDiv>
  );
  
  export default FooterColumnLink;
  ```

+ ./src/components/FooterColumnLink.style.jsx 생성

  ```jsx
  // ./src/components/FooterColumnLink.style.jsx
  
  import styled from "styled-components";
  import { Link } from "react-router-dom";
  
  export const StyledDiv = styled.div`
    padding-top: 3px;
    padding-bottom: 3px;
  `;
  
  export const StyledLink = styled(Link)`
    font-family: Roboto;
    font-weight: 300;
    font-size: 16px;
    line-height: 2.03;
    color: white;
    text-transform: uppercase;
  `;
  ```

+ ./src/components/FooterColumnAnchor.jsx 생성

  ```jsx
  // ./src/components/FooterColumnAnchor.jsx 
  
  import React from "react";
  import { StyledAnchor } from "./FooterColumnAnchor.style";
  
  const FooterColumnAnchor = ({ href, children }) => (
    <div
      style={{
        paddingTop: 3,
        paddingBottom: 3,
      }}
    >
      <StyledAnchor href={href} target="_BLANK">
        {children}
      </StyledAnchor>
    </div>
  );
  
  export default FooterColumnAnchor;
  ```

+ ./src/components/FooterColumnAnchor.style.jsx 생성

  ```jsx
  // ./src/components/FooterColumnAnchor.style.jsx
  
  import styled from "styled-components";
  
  export const StyledAnchor = styled.a`
    font-family: Roboto;
    font-weight: 300;
    font-size: 16px;
    line-height: 2.03;
    color: white;
    text-transform: uppercase;
  `;
  ```

+ ./src/components/FooterBottom.jsx 생성

  ```jsx
  // ./src/components/FooterBottom.jsx
  
  import React from "react";
  import {
    StyledCopyrightDiv,
    StyledFacebookDiv,
    StyledLinkedInDiv,
  } from "./FooterBottom.style";
  
  import FooterSocialLink from "./FooterSocialLink";
  import facebook from "../images/footer_facebook.png";
  import linkedin from "../images/footer_linkedin.png";
  
  const FooterBottom = () => (
    <div
      style={{
        height: 60,
        marginTop: 30,
        overflow: "hidden",
      }}
    >
      <StyledCopyrightDiv>© 2019 MARKTUBE RIGHTS RESERVED.</StyledCopyrightDiv>
      <StyledFacebookDiv>
        <FooterSocialLink
          href="https://www.facebook.com/2woongjae"
          src={facebook}
          alt="Facebook"
        />
      </StyledFacebookDiv>
      <StyledLinkedInDiv>
        <FooterSocialLink
          href="https://www.linkedin.com/in/2woongjae"
          src={linkedin}
          alt="LinkedIn"
        />
      </StyledLinkedInDiv>
    </div>
  );
  
  export default FooterBottom;
  ```

+ ./src/components/FooterBottom.style.jsx 생성

  ```jsx
  // ./src/components/FooterBottom.style.jsx
  
  import styled from "styled-components";
  
  export const StyledCopyrightDiv = styled.div`
    float: left;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 300;
    text-align: left;
    color: #ffffff;
    margin-top: 40px;
  `;
  
  export const StyledFacebookDiv = styled.div`
    float: left;
    margin-top: 30px;
    margin-left: 50px;
  `;
  
  export const StyledLinkedInDiv = styled.div`
    float: left;
    margin-top: 30px;
    margin-left: 30px;
  `;
  ```

+ ./src/components/FooterSocialLink.jsx 생성

  ```jsx
  // ./src/components/FooterSocialLink.jsx 
  
  import React from "react";
  import { StyledImg } from "./FooterSocialLink.style";
  
  const FooterSocialLink = ({ href, src, alt }) => (
    <a href={href} target="_BLANK" rel="noopener noreferrer">
      <StyledImg src={src} alt={alt} />
    </a>
  );
  
  export default FooterSocialLink;
  ```

+ ./src/components/FooterSocialLink.style.jsx 생성

  ```jsx
  // ./src/components/FooterSocialLink.style.jsx 
  
  import styled from "styled-components";
  
  export const StyledImg = styled.img`
    height: 30px;
  `;
  ```

+ ./src/index.js 수정(antd를 상위로)

  ```jsx
  // ./src/index.js
  
  import "antd/dist/antd.css";
  import React from "react";
  import ReactDOM from "react-dom";
  import "./index.css";
  import App from "./App";
  import * as serviceWorker from "./serviceWorker";
  import create, { sagaMiddleware } from "./redux/create";
  import { Provider } from "react-redux";
  import rootSaga from "./redux/modules/saga";
  
  const token = localStorage.getItem("token");
  const store = create(token);
  sagaMiddleware.run(rootSaga);
  
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  ```

### 로그아웃

+ ./src/containers/NavContainer.jsx 수정

  ```jsx
  // ./src/containers/NavContainer.jsx
  
  import React, { useCallback } from "react";
  import Nav from "../components/Nav";
  import { useDispatch } from "react-redux";
  import { logoutSaga } from "../redux/modules/auth";
  
  const NavContainer = () => {
    const dispatch = useDispatch();
  
    const logout = useCallback(() => {
      dispatch(logoutSaga());
    }, [dispatch]);
    return <Nav logout={logout} />;
  };
  
  export default NavContainer;
  ```

+ ./src/redux/modules/auth.js 수정

  ```jsx
  // ./src/redux/modules/auth.js
  
  import { put, call, takeEvery, select } from "redux-saga/effects";
  import LoginService from "../../services/LoginService";
  import { push } from "connected-react-router";
  
  // 액션 타입
  const LOGIN_PENDING = "reactjs-books-review/books/LOGIN_PENDING";
  const LOGIN_SUCCESS = "reactjs-books-review/books/LOGIN_SUCCESS";
  const LOGIN_FAIL = "reactjs-books-review/books/LOGIN_FAIL";
  
  // 액션 생성자 함수
  export const loginPending = () => ({
    type: LOGIN_PENDING,
  });
  export const loginSucess = (token) => ({
    type: LOGIN_SUCCESS,
    token,
  });
  export const loginFail = (error) => ({
    type: LOGIN_FAIL,
    error,
  });
  
  // 초기값
  const initialState = {
    token: null,
    loading: false,
    error: null,
  };
  
  // 리듀서
  const auth = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_PENDING:
        return {
          token: null,
          loading: true,
          error: null,
        };
      case LOGIN_SUCCESS:
        return {
          token: action.token,
          loading: false,
          error: null,
        };
      case LOGIN_FAIL:
        return {
          token: null,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default auth;
  
  // saga action type
  const START_LOGIN_SAGA = "reactjs-books-review/books/START_LOGIN_SAGA";
  const START_LOGOUT_SAGA = "reactjs-books-review/books/START_LOGOUT_SAGA";
  
  // start saga action
  export const loginSaga = (email, password) => ({
    type: START_LOGIN_SAGA,
    payload: {
      email,
      password,
    },
  });
  
  export const logoutSaga = () => ({
    type: START_LOGOUT_SAGA,
  });
  
  export function* login(action) {
    try {
      yield put(loginPending());
      const response = yield call(LoginService.login, action.payload);
      const token = response.data.token;
      // localStorage
      localStorage.setItem("token", token);
      // to Redux
      yield put(loginSucess(token));
      yield put(push("/"));
    } catch (error) {
      yield put(loginFail(error));
    }
  }
  
  export function* logout(action) {
    try {
      const token = yield select((state) => state.auth.token);
      yield call(LoginService.logout, token);
    } catch (error) {
      console.log(error);
    }
  
    // localStorage
    localStorage.removeItem("token");
  
    // to Redux
    yield put(loginSucess(null));
  }
  
  export function* authSaga() {
    yield takeEvery(START_LOGIN_SAGA, login);
    yield takeEvery(START_LOGOUT_SAGA, logout);
  }
  ```

### Book 레이아웃

+ ./src/components/Book.jsx 생성

  ```jsx
  // ./src/components/Book.jsx
  
  import React from "react";
  
  const Book = (props) => <div>title: {props.title}</div>;
  
  export default Book;
  ```

+ ./src/components/Books.jsx 수정

  ```jsx
  // ./src/components/Books.jsx
  
  import React, { useEffect } from "react";
  import Book from "./Book";
  import { Table } from "antd";
  
  const Books = ({ books, loading, error, requestBooks }) => {
    useEffect(() => {
      requestBooks();
    }, [requestBooks]);
  
    if (error !== null) {
      return <p>{error.message}</p>;
    }
    return (
      <div>
        <Table
          dataSource={books}
          columns={[
            {
              title: "Book",
              dataIndex: "book",
              key: "book",
              render: (text, record, index) => (
                <Book {...record} key={index} />
                // <Book {...record} deleteBook={deleteBook} key={index} />
              ),
            },
          ]}
          showHeader={false}
          pagination={{
            size: "small",
            pageSize: 10,
            align: "center",
          }}
          bodyStyle={{
            borderTop: "1px solid #e8e8e8",
          }}
          style={{
            marginTop: 30,
          }}
          rowKey="bookId"
          loading={loading}
        />
      </div>
    );
  };
  
  export default Books;
  ```

+ ./src/redux/modules/books.js 수정

  ```jsx
  // ./src/redux/modules/books.js 
  
  import { takeEvery, put, call, select, delay } from &quot;redux-saga/effects&quot;;
  import BookService from &quot;../../services/BookService&quot;;
  import { createActions, handleActions } from &quot;redux-actions&quot;;
  
  // 액션 생성자 함수
  const { getBooksPending, getBooksSuccess, getBooksFail } = createActions(
    {
      GET_BOOKS_SUCCESS: (books) =&gt; ({ books }),
    },
    &quot;GET_BOOKS_PENDING&quot;,
    &quot;GET_BOOKS_FAIL&quot;,
    {
      prefix: &quot;reactjs-books-review/books&quot;,
    }
  );
  
  // 초기값
  const initialState = {
    books: [],
    loading: false,
    error: null,
  };
  
  // 리듀서
  const books = handleActions(
    {
      GET_BOOKS_PENDING: (state, action) =&gt; ({
        books: [],
        loading: true,
        error: null,
      }),
      GET_BOOKS_SUCCESS: (state, action) =&gt; ({
        books: action.payload.books,
        loading: false,
        error: null,
      }),
      GET_BOOKS_FAIL: (state, action) =&gt; ({
        books: [],
        loading: false,
        error: action.payload,
      }),
    },
    initialState,
    {
      prefix: &quot;reactjs-books-review/books&quot;,
    }
  );
  
  export default books;
  
  // 사가
  
  // saga action type
  const START_REQUEST_BOOKS_SAGA =
    &quot;reactjs-books-review/books/START_REQUEST_BOOKS_SAGA&quot;;
  
  // start saga action
  export const requestBooksSaga = (email, password) =&gt; ({
    type: START_REQUEST_BOOKS_SAGA,
  });
  
  function* requestBooks() {
    const token = yield select((state) =&gt; state.auth.token);
    try {
      yield put(getBooksPending());
      yield delay(2000);
      const response = yield call(BookService.getBooks, token);
      const books = response.data;
      yield put(getBooksSuccess(books));
    } catch (error) {
      yield put(getBooksFail(error));
    }
  }
  
  export function* booksSaga() {
    yield takeEvery(START_REQUEST_BOOKS_SAGA, requestBooks);
  }
  ```

+ moment 라이브러리 설치(날짜와 시간을 자유자재로 변경 가능)

  ```bash
  $ npm i moment
  ```

+ ./src/components/Book.jsx

  ```jsx
  // ./src/components/Book.jsx
  
  import React from "react";
  import { Link } from "react-router-dom";
  import { Button } from "antd";
  import { BookOutlined } from "@ant-design/icons";
  import moment from "moment";
  
  const Book = ({ bookId, title, author, createdAt }) => {
    function click() {}
    return (
      <div
        style={{
          display: "table",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "table-cell",
            verticalAlign: "middle",
            fontSize: 14,
            fontWeight: "bold",
            paddingLeft: 10,
          }}
        >
          <Link
            to={`/book/${bookId}`}
            style={{
              color: "#0a222e",
            }}
          >
            <BookOutlined /> {title}
          </Link>
        </div>
        <div
          style={{
            display: "table-cell",
            verticalAlign: "middle",
            fontSize: 14,
            fontWeight: "bold",
            paddingLeft: 10,
          }}
        >
          <Link to={`/book/${bookId}`}>{author}</Link>
        </div>
        <div
          style={{
            color: "#999999",
            display: "table-cell",
            verticalAlign: "middle",
            fontSize: 14,
            paddingLeft: 10,
          }}
        >
          {moment(createdAt).format("MM-DD-YYYY hh:mm a")}
        </div>
        <div
          style={{
            color: "#999999",
            display: "table-cell",
            verticalAlign: "middle",
            fontSize: 14,
            paddingLeft: 10,
          }}
        >
          <Button size="small" type="danger" ghost onClick={click}>
            Delete
          </Button>
        </div>
      </div>
    );
  };
  
  export default Book;
  ```

### Book 삭제

+ ./src/components/Book.jsx 수정

  ```jsx
  // ./src/components/Book.jsx
  
  import React from "react";
  import { Link } from "react-router-dom";
  import { Button } from "antd";
  import { BookOutlined } from "@ant-design/icons";
  import moment from "moment";
  
  const Book = ({ bookId, title, author, createdAt, deleteBook }) => {
    function click() {
      deleteBook(bookId);
    }
    return (
      <div
        style={{
          display: "table",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "table-cell",
            verticalAlign: "middle",
            fontSize: 14,
            fontWeight: "bold",
            paddingLeft: 10,
          }}
        >
          <Link
            to={`/book/${bookId}`}
            style={{
              color: "#0a222e",
            }}
          >
            <BookOutlined /> {title}
          </Link>
        </div>
        <div
          style={{
            display: "table-cell",
            verticalAlign: "middle",
            fontSize: 14,
            fontWeight: "bold",
            paddingLeft: 10,
          }}
        >
          <Link to={`/book/${bookId}`}>{author}</Link>
        </div>
        <div
          style={{
            color: "#999999",
            display: "table-cell",
            verticalAlign: "middle",
            fontSize: 14,
            paddingLeft: 10,
          }}
        >
          {moment(createdAt).format("MM-DD-YYYY hh:mm a")}
        </div>
        <div
          style={{
            color: "#999999",
            display: "table-cell",
            verticalAlign: "middle",
            fontSize: 14,
            paddingLeft: 10,
          }}
        >
          <Button size="small" type="danger" ghost onClick={click}>
            Delete
          </Button>
        </div>
      </div>
    );
  };
  
  export default Book;
  ```

+ ./src/components/Books.jsx 수정

  ```jsx
  // ./src/components/Books.jsx
  
  import React, { useEffect } from "react";
  import Book from "./Book";
  import { Table } from "antd";
  
  const Books = ({ books, loading, error, requestBooks, deleteBook }) => {
    useEffect(() => {
      requestBooks();
    }, [requestBooks]);
  
    if (error !== null) {
      return <p>{error.message}</p>;
    }
    return (
      <div>
        <Table
          dataSource={books}
          columns={[
            {
              title: "Book",
              dataIndex: "book",
              key: "book",
              render: (text, record, index) => (
                <Book {...record} deleteBook={deleteBook} key={index} />
              ),
            },
          ]}
          showHeader={false}
          pagination={{
            size: "small",
            pageSize: 10,
            align: "center",
          }}
          bodyStyle={{
            borderTop: "1px solid #e8e8e8",
          }}
          style={{
            marginTop: 30,
          }}
          rowKey="bookId"
          loading={loading}
        />
      </div>
    );
  };
  
  export default Books;
  ```

+ ./src/containers/BooksContainer.jsx 수정

  ```jsx
  // ./src/containers/BooksContainer.jsx
  
  import React, { useCallback } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import Books from "../components/Books";
  import { requestBooksSaga, deleteBookSaga } from "../redux/modules/books";
  
  const BooksContainer = (props) => {
    const books = useSelector((state) => state.books.books);
    const loading = useSelector((state) => state.books.loading);
    const error = useSelector((state) => state.books.error);
  
    const dispatch = useDispatch();
  
    const requestBooks = useCallback(() => {
      dispatch(requestBooksSaga());
    }, [dispatch]);
  
    const deleteBook = useCallback(
      (bookId) => {
        dispatch(deleteBookSaga(bookId));
      },
      [dispatch]
    );
  
    return (
      <Books
        {...props}
        books={books}
        loading={loading}
        error={error}
        requestBooks={requestBooks}
        deleteBook={deleteBook}
      />
    );
  };
  
  export default BooksContainer;
  ```

+ ./src/redux/modules/books.js 수정

  ```jsx
  // ./src/redux/modules/books.js
  
  import { takeEvery, put, call, select, delay } from "redux-saga/effects";
  import BookService from "../../services/BookService";
  import { createActions, handleActions } from "redux-actions";
  
  // 액션 생성자 함수
  const { getBooksPending, getBooksSuccess, getBooksFail } = createActions(
    {
      GET_BOOKS_SUCCESS: (books) => ({ books }),
    },
    "GET_BOOKS_PENDING",
    "GET_BOOKS_FAIL",
    {
      prefix: "reactjs-books-review/books",
    }
  );
  
  // 초기값
  const initialState = {
    books: [],
    loading: false,
    error: null,
  };
  
  // 리듀서
  const books = handleActions(
    {
      GET_BOOKS_PENDING: (state, action) => ({
        ...state,
        loading: true,
        error: null,
      }),
      GET_BOOKS_SUCCESS: (state, action) => ({
        books: action.payload.books,
        loading: false,
        error: null,
      }),
      GET_BOOKS_FAIL: (state, action) => ({
        books: [],
        loading: false,
        error: action.payload,
      }),
    },
    initialState,
    {
      prefix: "reactjs-books-review/books",
    }
  );
  
  export default books;
  
  // 사가
  
  // saga action type
  const START_REQUEST_BOOKS_SAGA =
    "reactjs-books-review/books/START_REQUEST_BOOKS_SAGA";
  
  const START_DELETE_BOOK_SAGA =
    "reactjs-books-review/books/START_DELETE_BOOK_SAGA";
  
  // start saga action
  export const requestBooksSaga = (email, password) => ({
    type: START_REQUEST_BOOKS_SAGA,
  });
  
  export const deleteBookSaga = (bookId) => ({
    type: START_DELETE_BOOK_SAGA,
    payload: {
      bookId,
    },
  });
  
  function* requestBooks() {
    const token = yield select((state) => state.auth.token);
    try {
      yield put(getBooksPending());
      yield delay(2000);
      const response = yield call(BookService.getBooks, token);
      const books = response.data;
      yield put(getBooksSuccess(books));
    } catch (error) {
      yield put(getBooksFail(error));
    }
  }
  
  function* deleteBook(action) {
    const bookId = action.payload.bookId;
    const token = yield select((state) => state.auth.token);
    try {
      yield put(getBooksPending());
      yield delay(2000);
      yield call(BookService.deleteBook, token, bookId);
  
      const books = yield select((state) => state.books.books);
      yield put(getBooksSuccess(books.filter((book) => book.bookId !== bookId)));
    } catch (error) {
      yield put(getBooksFail(error));
    }
  }
  
  export function* booksSaga() {
    yield takeEvery(START_REQUEST_BOOKS_SAGA, requestBooks);
    yield takeEvery(START_DELETE_BOOK_SAGA, deleteBook);
  }
  ```

+ ./src/services/BookService.js 수정

  ```jsx
  // ./src/services/BookService.js
  
  import axios from "axios";
  
  export default class BookService {
    static getBooks = (token) =>
      axios.get("https://api.marktube.tv/v1/book", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
    static getBook = (token) =>
      axios.get("https://api.marktube.tv/v1/book", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
    static deleteBook = (token, id) =>
      axios.delete("https://api.marktube.tv/v1/book/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
    static editBook = (token, id) =>
      axios.patch("https://api.marktube.tv/v1/book", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
    static addBook = (token, book) =>
      axios.post("https://api.marktube.tv/v1/book", book, {
        headers: { Authorization: `Bearer ${token}` },
      });
  }
  ```

### Book 추가

+ ./src/pages/Add.jsx 수정

  ```jsx
  // ./src/pages/Add.jsx
  
  import React from "react";
  import BookAddContainer from "../containers/BookAddContainer";
  import { Redirect } from "react-router-dom";
  import useToken from "../hooks/useToken";
  import Layout from "../components/Layout";
  
  const Add = () => {
    const token = useToken();
    if (token === null) {
      return <Redirect to="/signin" />;
    }
  
    return (
      <Layout>
        <BookAddContainer />
      </Layout>
    );
  };
  
  export default Add;
  ```

+ ./src/containers/BookAddContainer.jsx 생성

  ```jsx
  // ./src/containers/BookAddContainer.jsx 
  
  import React from "react";
  import BookAdd from "../components/BookAdd";
  import { useCallback } from "react";
  import { useDispatch } from "react-redux";
  import { addBookSaga } from "../redux/modules/books";
  
  const BookAddContainer = () => {
    const dispatch = useDispatch();
    const addBook = useCallback(
      (book) => {
        dispatch(addBookSaga(book));
      },
      [dispatch]
    );
    return <BookAdd addBook={addBook} />;
  };
  
  export default BookAddContainer;
  ```

+ ./src/components/BookAdd.jsx 생성

  ```jsx
  // ./src/components/BookAdd.jsx
  
  import React from "react";
  
  const BookAdd = () => <div>BookAdd</div>;
  
  export default BookAdd;
  ```

+ ./src/redux/modules/books.js 수정

  ```jsx
  // ./src/redux/modules/books.js
  
  import { takeEvery, put, call, select, delay } from "redux-saga/effects";
  import BookService from "../../services/BookService";
  import { createActions, handleActions } from "redux-actions";
  import { push } from "connected-react-router";
  
  // 액션 생성자 함수
  const { getBooksPending, getBooksSuccess, getBooksFail } = createActions(
    {
      GET_BOOKS_SUCCESS: (books) => ({ books }),
    },
    "GET_BOOKS_PENDING",
    "GET_BOOKS_FAIL",
    {
      prefix: "reactjs-books-review/books",
    }
  );
  
  // 초기값
  const initialState = {
    books: [],
    loading: false,
    error: null,
  };
  
  // 리듀서
  const books = handleActions(
    {
      GET_BOOKS_PENDING: (state, action) => ({
        ...state,
        loading: true,
        error: null,
      }),
      GET_BOOKS_SUCCESS: (state, action) => ({
        books: action.payload.books,
        loading: false,
        error: null,
      }),
      GET_BOOKS_FAIL: (state, action) => ({
        books: [],
        loading: false,
        error: action.payload,
      }),
    },
    initialState,
    {
      prefix: "reactjs-books-review/books",
    }
  );
  
  export default books;
  
  // 사가
  
  // saga action type
  const START_REQUEST_BOOKS_SAGA =
    "reactjs-books-review/books/START_REQUEST_BOOKS_SAGA";
  
  const START_DELETE_BOOK_SAGA =
    "reactjs-books-review/books/START_DELETE_BOOK_SAGA";
  
  const START_ADD_BOOK_SAGA = "reactjs-books-review/books/START_ADD_BOOK_SAGA";
  
  // start saga action
  export const requestBooksSaga = (email, password) => ({
    type: START_REQUEST_BOOKS_SAGA,
  });
  
  export const deleteBookSaga = (bookId) => ({
    type: START_DELETE_BOOK_SAGA,
    payload: {
      bookId,
    },
  });
  
  export const addBookSaga = (book) => ({
    type: START_ADD_BOOK_SAGA,
    payload: {
      book,
    },
  });
  
  function* requestBooks() {
    const token = yield select((state) => state.auth.token);
    try {
      yield put(getBooksPending());
      yield delay(2000);
      const response = yield call(BookService.getBooks, token);
      const books = response.data;
      yield put(getBooksSuccess(books));
    } catch (error) {
      yield put(getBooksFail(error));
    }
  }
  
  function* deleteBook(action) {
    const bookId = action.payload.bookId;
    const token = yield select((state) => state.auth.token);
    try {
      yield put(getBooksPending());
      yield delay(2000);
      yield call(BookService.deleteBook, token, bookId);
  
      const books = yield select((state) => state.books.books);
      yield put(getBooksSuccess(books.filter((book) => book.bookId !== bookId)));
    } catch (error) {
      yield put(getBooksFail(error));
    }
  }
  
  function* addBook(action) {
    const book = action.payload.book;
    const token = yield select((state) => state.auth.token);
    try {
      yield put(getBooksPending());
      yield delay(2000);
      const response = yield call(BookService.addBook, token, book);
      const books = yield select((state) => state.books.books);
      yield put(getBooksSuccess([...books, response.data]));
      yield put(push("/"));
    } catch (error) {
      yield put(getBooksFail(error));
    }
  }
  
  export function* booksSaga() {
    yield takeEvery(START_REQUEST_BOOKS_SAGA, requestBooks);
    yield takeEvery(START_DELETE_BOOK_SAGA, deleteBook);
    yield takeEvery(START_ADD_BOOK_SAGA, addBook);
  }
  ```

+ ./src/components/BookAdd.jsx 수정

  ```jsx
  // ./src/components/BookAdd.jsx
  
  import React from "react";
  
  const BookAdd = ({ addBook }) => {
    function click() {
      addBook({
        title: "타이틀",
        message: "코멘트",
        author: "Mark Lee",
        url: "Test",
      });
    }
    return (
      <div>
        <h2>BookAdd</h2>
        <button onClick={click}>추가</button>
      </div>
    );
  };
  
  export default BookAdd;
  ```

+ ./src/components/Books.jsx 수정

  ```jsx
  // ./src/components/Books.jsx
  
  import React, { useEffect } from "react";
  import Book from "./Book";
  import { Table } from "antd";
  
  const Books = ({ books, loading, error, requestBooks, deleteBook }) => {
    useEffect(() => {
      if (books === null) requestBooks();
    }, [books, requestBooks]);
  
    if (error !== null) {
      return <p>{error.message}</p>;
    }
    return (
      <div>
        <Table
          dataSource={books}
          columns={[
            {
              title: "Book",
              dataIndex: "book",
              key: "book",
              render: (text, record, index) => (
                <Book {...record} deleteBook={deleteBook} key={index} />
              ),
            },
          ]}
          showHeader={false}
          pagination={{
            size: "small",
            pageSize: 10,
            align: "center",
          }}
          bodyStyle={{
            borderTop: "1px solid #e8e8e8",
          }}
          style={{
            marginTop: 30,
          }}
          rowKey="bookId"
          loading={loading}
        />
      </div>
    );
  };
  
  export default Books;
  ```

+ ./src/redux/modules/books.js 수정

  ```jsx
  // ./src/redux/modules/books.js 
  
  import { takeEvery, put, call, select, delay } from "redux-saga/effects";
  import BookService from "../../services/BookService";
  import { createActions, handleActions } from "redux-actions";
  import { push } from "connected-react-router";
  
  // 액션 생성자 함수
  const { getBooksPending, getBooksSuccess, getBooksFail } = createActions(
    {
      GET_BOOKS_SUCCESS: (books) => ({ books }),
    },
    "GET_BOOKS_PENDING",
    "GET_BOOKS_FAIL",
    {
      prefix: "reactjs-books-review/books",
    }
  );
  
  // 초기값
  const initialState = {
    books: null,
    loading: false,
    error: null,
  };
  
  // 리듀서
  const books = handleActions(
    {
      GET_BOOKS_PENDING: (state, action) => ({
        ...state,
        loading: true,
        error: null,
      }),
      GET_BOOKS_SUCCESS: (state, action) => ({
        books: action.payload.books,
        loading: false,
        error: null,
      }),
      GET_BOOKS_FAIL: (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }),
    },
    initialState,
    {
      prefix: "reactjs-books-review/books",
    }
  );
  
  export default books;
  
  // 사가
  
  // saga action type
  const START_REQUEST_BOOKS_SAGA =
    "reactjs-books-review/books/START_REQUEST_BOOKS_SAGA";
  
  const START_DELETE_BOOK_SAGA =
    "reactjs-books-review/books/START_DELETE_BOOK_SAGA";
  
  const START_ADD_BOOK_SAGA = "reactjs-books-review/books/START_ADD_BOOK_SAGA";
  
  // start saga action
  export const requestBooksSaga = (email, password) => ({
    type: START_REQUEST_BOOKS_SAGA,
  });
  
  export const deleteBookSaga = (bookId) => ({
    type: START_DELETE_BOOK_SAGA,
    payload: {
      bookId,
    },
  });
  
  export const addBookSaga = (book) => ({
    type: START_ADD_BOOK_SAGA,
    payload: {
      book,
    },
  });
  
  function* requestBooks() {
    const token = yield select((state) => state.auth.token);
    try {
      yield put(getBooksPending());
      yield delay(2000);
      const response = yield call(BookService.getBooks, token);
      const books = response.data;
      yield put(getBooksSuccess(books));
    } catch (error) {
      yield put(getBooksFail(error));
    }
  }
  
  function* deleteBook(action) {
    const bookId = action.payload.bookId;
    const token = yield select((state) => state.auth.token);
    try {
      yield put(getBooksPending());
      yield delay(2000);
      yield call(BookService.deleteBook, token, bookId);
  
      const books = yield select((state) => state.books.books);
      yield put(getBooksSuccess(books.filter((book) => book.bookId !== bookId)));
    } catch (error) {
      yield put(getBooksFail(error));
    }
  }
  
  function* addBook(action) {
    const book = action.payload.book;
    const token = yield select((state) => state.auth.token);
    try {
      yield put(getBooksPending());
      yield delay(2000);
      const response = yield call(BookService.addBook, token, book);
      const books = yield select((state) => state.books.books);
      yield put(getBooksSuccess([...books, response.data]));
      yield put(push("/"));
    } catch (error) {
      yield put(getBooksFail(error));
    }
  }
  
  export function* booksSaga() {
    yield takeEvery(START_REQUEST_BOOKS_SAGA, requestBooks);
    yield takeEvery(START_DELETE_BOOK_SAGA, deleteBook);
    yield takeEvery(START_ADD_BOOK_SAGA, addBook);
  }
  ```

### Input 만들어 등록

+ ./src/components/BookAdd.jsx 수정

  ```jsx
  // ./src/components/BookAdd.jsx
  
  import React, { useRef } from "react";
  
  const BookAdd = ({ addBook }) => {
    const titleRef = useRef(null);
    const messageRef = useRef(null);
    const authorRef = useRef(null);
    const urlRef = useRef(null);
  
    function click() {
      const title = titleRef.current.value;
      const message = messageRef.current.value;
      const author = authorRef.current.value;
      const url = urlRef.current.value;
  
      if (title === "" || message === "" || author === "" || url === "") return;
  
      addBook({
        title,
        message,
        author,
        url,
      });
    }
    return (
      <div>
        <h2>BookAdd</h2>
        <p>
          title: <input type="text" ref={titleRef} />
        </p>
        <p>
          comment: <input type="text" ref={messageRef} />
        </p>
        <p>
          author: <input type="text" ref={authorRef} />
        </p>
        <p>
          url: <input type="text" ref={urlRef} />
        </p>
        <button onClick={click}>추가</button>
      </div>
    );
  };
  
  export default BookAdd;
  ```

### addBook 디자인

+ ./src/components/BookAdd.jsx 수정

  ```jsx
  // ./src/components/BookAdd.jsx 
  
  import React, { useRef } from "react";
  import {
    StyledDiv,
    InputTitle,
    StyledSpan,
    InputArea,
    StyledInput,
    ButtonArea,
    StyledButton,
  } from "./BookAdd.style";
  import { message as MessageDialog, PageHeader } from "antd";
  import { FormOutlined } from "@ant-design/icons";
  
  const BookAdd = ({ addBook, back, loading }) => {
    const titleInput = useRef(null);
    const messageInput = useRef(null);
    const authorInput = useRef(null);
    const urlInput = useRef(null);
  
    const click = async () => {
      const title = titleInput.current.state.value;
      const message = messageInput.current.state.value;
      const author = authorInput.current.state.value;
      const url = urlInput.current.state.value;
      if (title === "" || message === "" || author === "" || url === "") {
        MessageDialog.error("모든 입력을 완료해주세요");
        return;
      }
  
      addBook({
        title,
        message,
        author,
        url,
      });
    };
  
    return (
      <>
        <PageHeader
          onBack={back}
          title={
            <div>
              <FormOutlined /> Add Book
            </div>
          }
          subTitle="Add Your Faborite Book"
        />
        <StyledDiv>
          <InputTitle>
            Title
            <StyledSpan />
          </InputTitle>
          <InputArea>
            <StyledInput placeholder="Title" ref={titleInput} />
          </InputArea>
          <InputTitle top={10}>
            Comment
            <StyledSpan />
          </InputTitle>
          <InputArea>
            <StyledInput placeholder="Comment" ref={messageInput} />
          </InputArea>
          <InputTitle top={10}>Author</InputTitle>
          <InputArea>
            <StyledInput placeholder="Author" ref={authorInput} />
          </InputArea>
          <InputTitle top={10}>URL</InputTitle>
          <InputArea>
            <StyledInput placeholder="URL" ref={urlInput} />
          </InputArea>
          <ButtonArea>
            <StyledButton size="large" loading={loading} onClick={click}>
              추가하기
            </StyledButton>
          </ButtonArea>
        </StyledDiv>
      </>
    );
  };
  
  export default BookAdd;
  ```

+ ./src/components/BookAdd.style.jsx 생성

  ```jsx
  // ./src/components/BookAdd.style.jsx
  
  import styled from "styled-components";
  import { Input, Button } from "antd";
  
  export const StyledDiv = styled.div`
    width: 600px;
    margin-left: auto;
    margin-right: auto;
  `;
  
  export const InputTitle = styled.div`
    font-family: Roboto;
    font-size: 12px;
    font-weight: bold;
    margin-top: ${(props) => props.top || "40"}px;
    text-align: left;
    padding-left: 40px;
  `;
  
  export const InputArea = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
  `;
  
  export const StyledInput = styled(Input)`
    width: 520px;
    border-radius: 1px;
    border-width: 1px;
    font-family: Roboto;
    margin-left: 40px;
    margin-right: 40px;
  `;
  
  export const ButtonArea = styled.div`
    text-align: right;
    padding-right: 40px;
    margin-top: 20px;
  `;
  
  export const StyledButton = styled(Button)`
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
  
  export const StyledSpan = styled.span.attrs(() => ({
    children: "*",
  }))`
    color: #971931;
  `;
  ```

+ ./src/containers/BookAddContainer.jsx 수정

  ```jsx
  // ./src/containers/BookAddContainer.jsx 
  
  import React from "react";
  import BookAdd from "../components/BookAdd";
  import { useCallback } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { addBookSaga } from "../redux/modules/books";
  import { goBack } from "connected-react-router";
  
  const BookAddContainer = () => {
    const loading = useSelector((state) => state.books.loading);
    const dispatch = useDispatch();
    const addBook = useCallback(
      (book) => {
        dispatch(addBookSaga(book));
      },
      [dispatch]
    );
  
    const back = useCallback(() => {
      dispatch(goBack());
    }, [dispatch]);
  
    return <BookAdd addBook={addBook} loading={loading} back={back} />;
  };
  
  export default BookAddContainer;
  ```

  



