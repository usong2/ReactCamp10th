

## Ducks Pattern

+ 리덕스 사용 시 파일 분산으로 인해 같은 관심사로 작업이 힘들어 해결하기 위해 나옴
+ Ducks Pattern: [https://github.com/erikras/ducks-modular-redux](https://github.com/erikras/ducks-modular-redux)

<br>

### 구성

+ src/redux
  + create.js
+ src/redux/modules
  + module1.js
  + module2.js
  + ...
  + reducer.js (or index.js)

### 폴더 만들기

+ ./src에 redux 폴더 생성 후 redux 폴더 내에 modules 폴더 생성
+ ./src/redux에 create.js 생성
+ ./src/redux/modules에 books.js 생성
+ ./src/redux/modules에 auth.js 생성
+ ./src/redux/modules에 redux.js 생성

### 실습

+ ./src/redux/modules/redux.js 수정

  ```jsx
  // ./src/redux/modules/redux.js 
  
  import { combineReducers } from "redux";
  import { connectRouter } from "connected-react-router";
  import books from "./books";
  import auth from "./auth";
  
  const reducer = (history) =>
    combineReducers({
      books,
      auth,
      router: connectRouter(history),
    });
  
  export default reducer;
  ```

+ ./src/redux/modules/books.js 수정

  ```jsx
  // ./src/redux/modules/books.js
  
  // 액션 타입
  const GET_BOOKS_PENDING = "reactjs-books-review/books/GET_BOOKS_PENDING";
  const GET_BOOKS_SUCCESS = "reactjs-books-review/books/GET_BOOKS_SUCCESS";
  const GET_BOOKS_FAIL = "reactjs-books-review/books/GET_BOOKS_FAIL";
  
  // 액션 생성자 함수
  export const getBooksPending = () => ({
    type: GET_BOOKS_PENDING,
  });
  export const getBooksSucess = (books) => ({
    type: GET_BOOKS_SUCCESS,
    books,
  });
  export const getBooksFail = (error) => ({
    type: GET_BOOKS_FAIL,
    error,
  });
  
  // 초기값
  const initialState = {
    books: [],
    loading: false,
    error: null,
  };
  
  // 리듀서
  const books = (state = initialState, action) => {
    switch (action.type) {
      case GET_BOOKS_PENDING:
        return {
          books: [],
          loading: true,
          error: null,
        };
      case GET_BOOKS_SUCCESS:
        return {
          books: action.books,
          loading: false,
          error: null,
        };
      case GET_BOOKS_FAIL:
        return {
          books: [],
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default books;
  ```

+ ./src/redux/modules/auth.js 수정

  ```jsx
  // ./src/redux/modules/auth.js
  
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
  ```

+ ./src/redux/create.js 수정

  ```jsx
  // ./src/redux/create.js 
  
  import { createStore, applyMiddleware } from "redux";
  import reducer from "./modules/reducer";
  import { composeWithDevTools } from "redux-devtools-extension";
  import { routerMiddleware } from "connected-react-router";
  import { createBrowserHistory } from "history";
  import createSagaMiddleware from "redux-saga";
  
  export const history = createBrowserHistory();
  export const sagaMiddleware = createSagaMiddleware();
  
  const create = (token) =>
    createStore(
      reducer(history),
      {
        auth: { token, loading: false, error: null },
      },
      composeWithDevTools(
        applyMiddleware(routerMiddleware(history), sagaMiddleware)
      )
    );
  
  export default create;
  ```

+ ./src/index.js 수정

  ```jsx
  // ./src/index.js
  
  import React from "react";
  import ReactDOM from "react-dom";
  import "./index.css";
  import App from "./App";
  import * as serviceWorker from "./serviceWorker";
  import "antd/dist/antd.css";
  import create, { sagaMiddleware } from "./redux/create";
  import { Provider } from "react-redux";
  import mySagas from "./sagas";
  
  const token = localStorage.getItem("token");
  const store = create(token);
  sagaMiddleware.run(mySagas);
  
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

+ ./src/containers/SigninFormContainer.jsx 수정

  ```jsx
  // ./src/containers/SigninFormContainer.jsx
  
  import SigninForm from "../components/SigninForm";
  import { connect } from "react-redux";
  import { loginSaga } from "../redux/modules/auth";
  
  const mapStateToPRops = (state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => {
      dispatch(loginSaga(email, password));
    },
  });
  
  export default connect(mapStateToPRops, mapDispatchToProps)(SigninForm);
  ```

+ ./src/redux/modules/auth.js 수정

  ```jsx
  // ./src/redux/modules/auth.js
  
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
  
  // start saga action
  export const loginSaga = (email, password) => ({
    type: START_LOGIN_SAGA,
    payload: {
      email,
      password,
    },
  });
  ```

+ ./src/services/LoginService.js 수정

  ```jsx
  // ./src/services/LoginService
  
  import axios from "axios";
  
  export default class LoginService {
    static login = (user) => axios.post("https://api.marktube.tv/v1/me", user);
  
    static logout = (token) =>
      axios.delete("https://api.marktube.tv/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
  }
  ```

+ ./src/redux/modules/auth.js 수정

  ```jsx
  // ./src/redux/modules/auth.js
  
  import { put, call, takeEvery } from "redux-saga/effects";
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
  
  // start saga action
  export const loginSaga = (email, password) => ({
    type: START_LOGIN_SAGA,
    payload: {
      email,
      password,
    },
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
  
  export function* authSaga() {
    yield takeEvery(START_LOGIN_SAGA, login);
  }
  ```

+ ./src/redux/modules에 saga.js 생성

  ```jsx
  // ./src/redux/modules/saga.js
  
  import { all } from "redux-saga/effects";
  import { authSaga } from "./auth";
  import { booksSaga } from "./books";
  
  export default function* rootSaga() {
    yield all([authSaga(), booksSaga()]);
  }
  ```

+ ./src/index.js 수정

  ```jsx
  // ./src/index.js
  
  import React from "react";
  import ReactDOM from "react-dom";
  import "./index.css";
  import App from "./App";
  import * as serviceWorker from "./serviceWorker";
  import "antd/dist/antd.css";
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

+ ./src/redux/modules/books.js 수정

  ```jsx
  // ./src/redux/modules/books.js
  
  // 액션 타입
  const GET_BOOKS_PENDING = "reactjs-books-review/books/GET_BOOKS_PENDING";
  const GET_BOOKS_SUCCESS = "reactjs-books-review/books/GET_BOOKS_SUCCESS";
  const GET_BOOKS_FAIL = "reactjs-books-review/books/GET_BOOKS_FAIL";
  
  // 액션 생성자 함수
  export const getBooksPending = () => ({
    type: GET_BOOKS_PENDING,
  });
  export const getBooksSucess = (books) => ({
    type: GET_BOOKS_SUCCESS,
    books,
  });
  export const getBooksFail = (error) => ({
    type: GET_BOOKS_FAIL,
    error,
  });
  
  // 초기값
  const initialState = {
    books: [],
    loading: false,
    error: null,
  };
  
  // 리듀서
  const books = (state = initialState, action) => {
    switch (action.type) {
      case GET_BOOKS_PENDING:
        return {
          books: [],
          loading: true,
          error: null,
        };
      case GET_BOOKS_SUCCESS:
        return {
          books: action.books,
          loading: false,
          error: null,
        };
      case GET_BOOKS_FAIL:
        return {
          books: [],
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default books;
  
  export function* booksSaga() {}
  ```

+ ./src/hocs/withAuth.js 수정

  ```jsx
  // ./src/hocs/withAuth.js
  
  import React from "react";
  import { Redirect } from "react-router-dom";
  import { useSelector } from "react-redux";
  
  export default function withAuth(Component) {
    function WrapperComponent(props) {
      const token = useSelector((state) => state.auth.token);
  
      if (token === null) {
        return <Redirect to="/signin" />;
      }
      return <Component {...props} token={token} />;
    }
  
    WrapperComponent.displayName = `withAuth(${Component.name});`;
  
    return WrapperComponent;
  }
  ```

+ ./src/containers/BooksContainer.jsx 수정

  ```jsx
  // ./src/containers/BooksContainer.jsx
  
  import { connect } from "react-redux";
  import Books from "../components/Books";
  import { setBooksSaga } from "../actions";
  
  const mapStateToProps = (state) => ({
    books: state.books.books,
    loading: state.books.loading,
    error: state.books.error,
  });
  
  const mapDispatchProps = (dispatch) => ({
    requestBooksSaga: (token) => {
      // dispatch(setBooksSaga(token));
    },
  });
  
  export default connect(mapStateToProps, mapDispatchProps)(Books);
  ```

+ ./src/components/Books.jsx 수정

  ```jsx
  // ./src/components/Books.jsx
  
  import React, { useEffect } from "react";
  
  const Book = (props) => <div>title: {props.title}</div>;
  
  const Books = ({ books, loading, error, requestBooksSaga }) => {
    useEffect(() => {
      // requestBooksSaga();
    }, []);
  
    return (
      <div>
        {loading && "<p>loading...</p>"}
        {error !== null && <p>{error.message}</p>}
        {books.map((book) => (
          <Book title={book.title} key={book.bookId} />
        ))}
      </div>
    );
  };
  
  export default Books;
  ```

+ ./src/store.js 삭제

+ ./src/reducer 폴더 삭제

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import { Route, Switch } from "react-router-dom";
  import Signin from "./pages/Signin";
  import Home from "./pages/Home";
  import NotFound from "./pages/NotFound";
  import withAuth from "./hocs/withAuth";
  import { ConnectedRouter } from "connected-react-router";
  import { history } from "./redux/create";
  
  function App() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/" component={withAuth(Home)} />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
    );
  }
  
  export default App;
  ```

+ ./src/components/Books.jsx 수정

  ```jsx
  // ./src/components/Books.jsx
  
  import React, { useEffect } from "react";
  
  const Book = (props) => <div>title: {props.title}</div>;
  
  const Books = ({ books, loading, error, requestBooks }) => {
    useEffect(() => {
      requestBooks();
    }, [requestBooks]);
  
    return (
      <div>
        {loading && "<p>loading...</p>"}
        {error !== null && <p>{error.message}</p>}
        {books.map((book) => (
          <Book title={book.title} key={book.bookId} />
        ))}
      </div>
    );
  };
  
  export default Books;
  ```

+ ./src/containers/BooksContainer.jsx

  ```jsx
  // ./src/containers/BooksContainer.jsx
  
  import { connect } from "react-redux";
  import Books from "../components/Books";
  import { requestBooksSaga } from "../redux/modules/books";
  
  const mapStateToProps = (state) => ({
    books: state.books.books,
    loading: state.books.loading,
    error: state.books.error,
  });
  
  const mapDispatchProps = (dispatch) => ({
    requestBooks: () => {
      dispatch(requestBooksSaga());
    },
  });
  
  export default connect(mapStateToProps, mapDispatchProps)(Books);
  ```

+ ./src/redux/modules/books.js 수정

  ```jsx
  // ./src/redux/modules/books.js
  
  import { takeEvery, put, call, select } from "redux-saga/effects";
  import BookService from "../../services/BookService";
  
  // 액션 타입
  const GET_BOOKS_PENDING = "reactjs-books-review/books/GET_BOOKS_PENDING";
  const GET_BOOKS_SUCCESS = "reactjs-books-review/books/GET_BOOKS_SUCCESS";
  const GET_BOOKS_FAIL = "reactjs-books-review/books/GET_BOOKS_FAIL";
  
  // 액션 생성자 함수
  export const getBooksPending = () => ({
    type: GET_BOOKS_PENDING,
  });
  export const getBooksSucess = (books) => ({
    type: GET_BOOKS_SUCCESS,
    books,
  });
  export const getBooksFail = (error) => ({
    type: GET_BOOKS_FAIL,
    error,
  });
  
  // 초기값
  const initialState = {
    books: [],
    loading: false,
    error: null,
  };
  
  // 리듀서
  const books = (state = initialState, action) => {
    switch (action.type) {
      case GET_BOOKS_PENDING:
        return {
          books: [],
          loading: true,
          error: null,
        };
      case GET_BOOKS_SUCCESS:
        return {
          books: action.books,
          loading: false,
          error: null,
        };
      case GET_BOOKS_FAIL:
        return {
          books: [],
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default books;
  
  // saga action type
  const START_REQUEST_BOOKS_SAGA =
    "reactjs-books-review/books/START_REQUEST_BOOKS_SAGA";
  
  // start saga action
  export const requestBooksSaga = (email, password) => ({
    type: START_REQUEST_BOOKS_SAGA,
  });
  
  function* requestBooks() {
    const token = yield select((state) => state.auth.token);
    try {
      yield put(getBooksPending());
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

+ ./src/sagas.js 삭제

+ ./src/actions 폴더 삭제

<br>

## Connect with Hooks

리덕스에서 Hook으로 connect 하는 방법

+ ./src/containers/BooksContainer.jsx 수정

  ```jsx
  // ./src/containers/BooksContainer.jsx
  
  import React, { useCallback } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import Books from "../components/Books";
  import { requestBooksSaga } from "../redux/modules/books";
  
  const BooksContainer = (props) => {
    const books = useSelector((state) => state.books.books);
    const loading = useSelector((state) => state.books.loading);
    const error = useSelector((state) => state.books.error);
  
    const dispatch = useDispatch();
  
    const requestBooks = useCallback(() => {
      dispatch(requestBooksSaga());
    }, [dispatch]);
  
    return (
      <Books
        {...props}
        books={books}
        loading={loading}
        error={error}
        requestBooks={requestBooks}
      />
    );
  };
  
  export default BooksContainer;
  ```

<br>

## redux-actions

redux-actions: [https://github.com/redux-utilities/redux-actions](https://github.com/redux-utilities/redux-actions)

```bash
$ npm i redux-actions
```

### API

+ createAction, createActions
+ handleAction, handleActions
+ combineActions

#### createAction

+ ./src/redux/modules/books.js 수정

  ```jsx
  // ./src/redux/modules/books.js
  
  import { takeEvery, put, call, select } from "redux-saga/effects";
  import BookService from "../../services/BookService";
  import { createAction } from "redux-actions";
  
  // 액션 타입
  const GET_BOOKS_PENDING = "reactjs-books-review/books/GET_BOOKS_PENDING";
  const GET_BOOKS_SUCCESS = "reactjs-books-review/books/GET_BOOKS_SUCCESS";
  const GET_BOOKS_FAIL = "reactjs-books-review/books/GET_BOOKS_FAIL";
  
  // 액션 생성자 함수
  // export const getBooksPending = () => ({
  //   type: GET_BOOKS_PENDING,
  // });
  // export const getBooksSucess = (books) => ({
  //   type: GET_BOOKS_SUCCESS,
  //   books,
  // });
  // export const getBooksFail = (error) => ({
  //   type: GET_BOOKS_FAIL,
  //   error,
  // });
  
  const getBooksPending = createAction(
    "reactjs-books-review/books/GET_BOOKS_PENDING"
  );
  console.log(getBooksPending());
  const getBooksSuccess = createAction(
    "reactjs-books-review/books/GET_BOOKS_SUCCESS",
    (books) => ({ books })
  );
  console.log(getBooksSuccess([]));
  const getBooksFail = createAction("reactjs-books-review/books/GET_BOOKS_FAIL");
  console.log(getBooksFail(new Error()));
  
  // 초기값
  const initialState = {
    books: [],
    loading: false,
    error: null,
  };
  
  // 리듀서
  const books = (state = initialState, action) => {
    switch (action.type) {
      case GET_BOOKS_PENDING:
        return {
          books: [],
          loading: true,
          error: null,
        };
      case GET_BOOKS_SUCCESS:
        return {
          books: action.books,
          loading: false,
          error: null,
        };
      case GET_BOOKS_FAIL:
        return {
          books: [],
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default books;
  
  // saga action type
  const START_REQUEST_BOOKS_SAGA =
    "reactjs-books-review/books/START_REQUEST_BOOKS_SAGA";
  
  // start saga action
  export const requestBooksSaga = (email, password) => ({
    type: START_REQUEST_BOOKS_SAGA,
  });
  
  function* requestBooks() {
    const token = yield select((state) => state.auth.token);
    try {
      yield put(getBooksPending());
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

  