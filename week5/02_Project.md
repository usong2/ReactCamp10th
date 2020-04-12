# Project

## 개발 서적 평가 서비스에 상태 관리 매니저 적용하기

<br>

```bash
$ npm i redux react-redux
```

<br>

### API에 서버에 넣은 데이터 추가하기

#### store 만들기

+ ./src에 store.js 생성

  ```jsx
  // ./src/store.js
  
  import { createStore } from "redux";
  import reducers from "./reducers";
  
  const store = createStore(reducers);
  
  export default store;
  ```

#### reducers 만들기

+ ./src에 reducers 폴더 생성

+ ./src/reducers에 index.js 생성

  ```jsx
  // ./src/reducers/index.js 
  
  import { combineReducers } from "redux";
  import books from "./books";
  
  const reducers = combineReducers({
    books,
  });
  
  export default reducers;
  ```

+ ./src/reducers에 books.js 생성

  ```jsx
  // ./src/reducers/books.js
  
  const initialState = [];
  
  const books = (state = initialState, action) => {
    return state;
  };
  
  export default books;
  ```

#### actions 만들기

+ ./src에 actions 폴더 생성

+ ./src/actions에 index.js 생성

  ```jsx
  // ./src/actions/index.js
  
  export const ADD_BOOKS = "ADD_BOOKS";
  
  export function addBooks(books) {
    return {
      type: ADD_BOOKS,
      books,
    };
  }
  ```

#### actions 사용 확인

+ ./src/reducers/books.js 수정

  ```jsx
  // ./src/reducers/books.js
  
  import { ADD_BOOKS } from "../actions";
  
  const initialState = [];
  
  const books = (state = initialState, action) => {
    console.log("books reducers", action);
    if (action.type === ADD_BOOKS) {
      return [...action.books];
    }
    return state;
  };
  
  export default books;
  ```

#### 전체적인 사용 설정

+ ./src/index.js 수정

  ```jsx
  // ./src/index.js 
  
  import React from "react";
  import ReactDOM from "react-dom";
  import "./index.css";
  import App from "./App";
  import * as serviceWorker from "./serviceWorker";
  import "antd/dist/antd.css";
  import store from "./store";
  import { Provider } from "react-redux";
  
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

#### API 출력 확인

+ ./src/pages/Home.jsx 수정

  ```jsx
  // ./src/pages/Home.jsx
  
  import React, { useEffect } from "react";
  import axios from "axios";
  import { connect } from "react-redux";
  import { addBooks } from "../actions/index";
  
  function Book(props) {
    return <div>title: {props.title}</div>;
  }
  
  const Home = ({ books, addBooks, token }) => {
    useEffect(() => {
      console.log(token);
      axios
        .get("https://api.marktube.tv/v1/book", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log(res.data);
          // setBooks(res.data);
          addBooks(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [token]);
  
    return (
      <div>
        <h1>Home</h1>
        {books.map((book) => (
          <Book title={book.title} key={book.bookId} />
        ))}
      </div>
    );
  };
  
  const mapStateToProps = (state) => ({
    books: state.books,
  });
  
  const mapDispatchProps = (dispatch) => ({
    addBooks: (books) => {
      dispatch(addBooks(books));
    },
  });
  
  export default connect(mapStateToProps, mapDispatchProps)(Home);
  ```

+ 출력 확인

<br>

### 일반적인 사용 패턴

+ request를 요청하면 받고 끝나는 것이 아니라 loading 시작과 끝을 관리

+ ./src/actions/index.js 수정

  ```jsx
  // ./src/actions/index.js
  
  export const ADD_BOOKS = "ADD_BOOKS";
  
  export function addBooks(books) {
    return {
      type: ADD_BOOKS,
      books,
    };
  }
  
  export const START_LOADING = "START_LOADING";
  export const END_LOADING = "END_LOADING";
  
  export function startLoading() {
    return {
      type: START_LOADING,
    };
  }
  
  export function endLoading() {
    return {
      type: END_LOADING,
    };
  }
  ```

+ ./src/reducers에 loading.js 생성

  ```jsx
  // ./src/reducers/loading.js
  
  import { START_LOADING, END_LOADING } from "../actions";
  
  const initialState = false;
  
  const loading = (state = initialState, action) => {
    console.log("loading reducers", action);
    if (action.type === START_LOADING) {
      return true;
    } else if (action.type === END_LOADING) {
      return false;
    }
    return state;
  };
  
  export default loading;
  ```

+ ./src/reducers/index.js 수정

  ```jsx
  // ./src/reducers/index.js
  
  import { combineReducers } from "redux";
  import books from "./books";
  import loading from "./loading";
  
  const reducers = combineReducers({
    books,
    loading,
  });
  
  export default reducers;
  ```

#### 적용

+ ./src/pages/Home.jsx 수정

  ```jsx
  // ./src/pages/Home.jsx
  
  import React, { useEffect } from "react";
  import axios from "axios";
  import { connect } from "react-redux";
  import { addBooks, startLoading, endLoading } from "../actions/index";
  
  function Book(props) {
    return <div>title: {props.title}</div>;
  }
  
  const Home = ({
    token,
    books,
    addBooks,
    loading,
    startLoading,
    endLoading,
  }) => {
    useEffect(() => {
      startLoading();
      axios
        .get("https://api.marktube.tv/v1/book", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          addBooks(res.data);
          endLoading();
        })
        .catch((error) => {
          console.log(error);
          endLoading();
        });
    }, [token]);
  
    return (
      <div>
        <h1>Home {loading && "(loading...)"}</h1>
        {books.map((book) => (
          <Book title={book.title} key={book.bookId} />
        ))}
      </div>
    );
  };
  
  const mapStateToProps = (state) => ({
    books: state.books,
    loading: state.loading,
  });
  
  const mapDispatchProps = (dispatch) => ({
    addBooks: (books) => {
      dispatch(addBooks(books));
    },
    startLoading: () => {
      dispatch(startLoading());
    },
    endLoading: () => {
      dispatch(endLoading());
    },
  });
  
  export default connect(mapStateToProps, mapDispatchProps)(Home);
  ```

#### 에러

+ ./src/actions/index.js 수정

  ```jsx
  // ./src/actions/index.js
  
  export const ADD_BOOKS = "ADD_BOOKS";
  
  export function addBooks(books) {
    return {
      type: ADD_BOOKS,
      books,
    };
  }
  
  export const START_LOADING = "START_LOADING";
  export const END_LOADING = "END_LOADING";
  
  export function startLoading() {
    return {
      type: START_LOADING,
    };
  }
  
  export function endLoading() {
    return {
      type: END_LOADING,
    };
  }
  
  export const SET_ERROR = "SET_ERROR";
  export const CLEAR_ERROR = "CLEAR_ERROR";
  
  export function setError(error) {
    return {
      type: SET_ERROR,
      error,
    };
  }
  
  export function clearError() {
    return {
      type: CLEAR_ERROR,
    };
  }
  ```

+ ./src/reducers에 error.js 생성

  ```jsx
  // ./src/reducers/error.js
  
  import { SET_ERROR, CLEAR_ERROR } from "../actions";
  
  const initialState = null;
  
  const error = (state = initialState, action) => {
    console.log("error reducers", action);
    if (action.type === SET_ERROR) {
      return action.error;
    } else if (action.type === CLEAR_ERROR) {
      return null;
    }
    return state;
  };
  
  export default error;
  
  ```

+ ./src/reducers/index.js 수정

  ```jsx
  // ./src/reducers/index.js 
  
  import { combineReducers } from "redux";
  import books from "./books";
  import loading from "./loading";
  import error from "./error";
  
  const reducers = combineReducers({
    books,
    loading,
    error,
  });
  
  export default reducers;
  ```

+ ./src/pages/Home.jsx 수정

  ```jsx
  // ./src/pages/Home.jsx
  
  import React, { useEffect } from "react";
  import axios from "axios";
  import { connect } from "react-redux";
  import {
    addBooks,
    startLoading,
    endLoading,
    setError,
    clearError,
  } from "../actions/index";
  
  function Book(props) {
    return <div>title: {props.title}</div>;
  }
  
  const Home = ({
    token,
    books,
    addBooks,
    loading,
    startLoading,
    endLoading,
    error,
    setError,
    clearError,
  }) => {
    useEffect(() => {
      startLoading();
      clearError();
      axios
        .get("https://api.marktube.tv/v1/book", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          addBooks(res.data);
          endLoading();
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          endLoading();
        });
    }, [token]);
  
    return (
      <div>
        <h1>Home {loading && "(loading...)"}</h1>
        {error !== null && <p>{error.message}</p>}
        {books.map((book) => (
          <Book title={book.title} key={book.bookId} />
        ))}
      </div>
    );
  };
  
  const mapStateToProps = (state) => ({
    books: state.books,
    loading: state.loading,
    error: state.error,
  });
  
  const mapDispatchProps = (dispatch) => ({
    addBooks: (books) => {
      dispatch(addBooks(books));
    },
    startLoading: () => {
      dispatch(startLoading());
    },
    endLoading: () => {
      dispatch(endLoading());
    },
    setError: (error) => {
      dispatch(setError(error));
    },
    clearError: () => {
      dispatch(clearError());
    },
  });
  
  export default connect(mapStateToProps, mapDispatchProps)(Home);
  ```

#### 액션 옮기기

*동일한 결과*

+ ./src/pages/Home.jsx 수정

  ```jsx
  // ./src/pages/Home.jsx
  
  import React, { useEffect } from "react";
  import axios from "axios";
  import { connect } from "react-redux";
  import {
    addBooks,
    startLoading,
    endLoading,
    setError,
    clearError,
  } from "../actions/index";
  
  function Book(props) {
    return <div>title: {props.title}</div>;
  }
  
  const Home = ({ token, books, loading, error, requestBooks }) => {
    useEffect(() => {
      requestBooks(token);
    }, [token]);
  
    return (
      <div>
        <h1>Home {loading && "(loading...)"}</h1>
        {error !== null && <p>{error.message}</p>}
        {books.map((book) => (
          <Book title={book.title} key={book.bookId} />
        ))}
      </div>
    );
  };
  
  const mapStateToProps = (state) => ({
    books: state.books,
    loading: state.loading,
    error: state.error,
  });
  
  const mapDispatchProps = (dispatch) => ({
    requestBooks: (token) => {
      dispatch(startLoading());
      dispatch(clearError());
      axios
        .get("https://api.marktube.tv/v1/book", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(addBooks(res.data));
          dispatch(endLoading());
        })
        .catch((error) => {
          console.log(error);
          dispatch(setError(error));
          dispatch(endLoading());
        });
    },
  });
  
  export default connect(mapStateToProps, mapDispatchProps)(Home);
  ```

  