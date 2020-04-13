# Redux Advanced

## 수정

+ ./src/actions/index.js 수정

  ```jsx
  // ./src/actions/index.js
  
  export const SET_BOOKS = "SET_BOOKS";
  
  export const setBooks = (books) => ({
    type: SET_BOOKS,
    books,
  });
  
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

+ ./src/reducers/books.js 수정

  ```jsx
  // ./src/reducers/books.js
  
  import { SET_BOOKS } from "../actions";
  
  const initialState = [];
  
  const books = (state = initialState, action) => {
    console.log("books reducers", action);
    if (action.type === SET_BOOKS) {
      return [...action.books];
    }
    return state;
  };
  
  export default books;
  ```

+ ./src/pages/Home.jsx 수정

  ```jsx
  // ./src/pages/Home.jsx 
  
  import React from "react";
  import BooksContainer from "../containers/BooksContainer";
  
  const Home = ({ token }) => (
    <div>
      <h1>Home</h1>
      <BooksContainer token={token} />
    </div>
  );
  
  export default Home;
  ```

+ ./src/components에 Books.jsx 생성

  ```jsx
  // ./src/components/Books.jsx
  
  import React, { useEffect } from "react";
  
  const Book = (props) => <div>title: {props.title}</div>;
  
  const Books = ({ token, books, loading, error, requestBooks }) => {
    useEffect(() => {
      requestBooks(token);
    }, [token, requestBooks]);
  
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

+ ./src에 containers 폴더 생성

+ ./src/containers에 BooksContainer.jsx 생성

  ```jsx
  // ./src/containers/BooksContainer.jsx
  
  import { connect } from "react-redux";
  import Books from "../components.Books";
  import axios from "axios";
  import {
    startLoading,
    endLoading,
    setError,
    clearError,
    setBooks,
  } from "../actions/index";
  
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
          dispatch(setBooks(res.data));
          dispatch(endLoading());
        })
        .catch((error) => {
          console.log(error);
          dispatch(setError(error));
          dispatch(endLoading());
        });
    },
  });
  
  export default connect(mapStateToProps, mapDispatchProps)(Books);
  ```


<br>

<hr>

<br>

## Async Action with Redux

### 비동기 작업을 어디서 하느냐? 가 제일 중요

+ 액션을 분리
  + Start
  + Success
  + Fail
  + ... 등등
+ **Dispatch를 할 때** 해줌
  + 당연히 리듀서는 동기적인 것 => Pure
  + dispatch도 동기적인 것

<br>

### 비동기 처리를 위한 액션 추가 (예시)

```jsx
// 액션 정의
export const START_RECEIVE_BOOKS = 'START_RECEIVE_BOOKS';
export const END_RECEIVE_BOOKS = 'END_RECEIVE_BOOKS';
export const ERROR_RECEIVE_BOOKS = 'ERROR_RECEIVE_BOOKS';

// 액션 생성자 함수
export function startReceiveBooks() {
  return {
    type: START_RECEIVE_BOOKS,
  };
}

export function endReceiveBooks(books) {
  return {
    type: END_RECEIVE_BOOKS,
    books,
  };
}

export function errorReceiveBooks() {
  return {
    type: ERROR_RECEIVE_BOOKS,
  };
}
```

### MapDispatchToProps => dispatch

```jsx
const mapDispatchToProps = dispatch => ({
  requestBooks: async token => {
    dispatch(startLoading());
    dispatch(clearError());
    try {
      const res = await axios.get("https://api.marktube.tv/v1/book", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(setBooks(res.data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
      dispatch(endLoading());
    }
  }
});
```

### Books.jsx

```jsx
import React, { useEffect } from "react";

const Book = props => <div>title : {props.title}</div>;

const Books = ({ token, loading, error, books, requestBooks }) => {
  useEffect(() => {
    requestBooks(token); // 컨테이너로 로직을 옮겼음.
  }, [token, requestBooks]);
  return (
    <div>
      {loading && <p>loading...</p>}
      {error !== null && <p>{error.message}</p>}
      {books.map(book => (
        <Book title={book.title} key={book.bookId} />
      ))}
    </div>
  );
};

export default Books;
```

### 실습

+ ./src/containers/BooksContainer.jsx 수정

  ```jsx
  // ./src/containers/BooksContainer.jsx
  
  import { connect } from "react-redux";
  import Books from "../components/Books";
  import axios from "axios";
  import {
    startLoading,
    endLoading,
    setError,
    clearError,
    setBooks,
  } from "../actions/index";
  
  const mapStateToProps = (state) => ({
    books: state.books,
    loading: state.loading,
    error: state.error,
  });
  
  const mapDispatchProps = (dispatch) => ({
    requestBooks: async (token) => {
      dispatch(startLoading());
      dispatch(clearError());
  
      try {
        const res = await axios.get("https://api.marktube.tv/v1/book", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setBooks(res.data));
        dispatch(endLoading());
      } catch (error) {
        console.log(error);
        dispatch(setError(error));
        dispatch(endLoading());
      }
    },
  });
  
  export default connect(mapStateToProps, mapDispatchProps)(Books);
  ```

+ ./src/components/Books.jsx 수정

  ```jsx
  // ./src/components/Books.jsx 
  
  import React, { useEffect, useCallback } from "react";
  
  const Book = (props) => <div>title: {props.title}</div>;
  
  const Books = ({ token, books, loading, error, requestBooks }) => {
    const load = useCallback(async () => {
      await requestBooks(token);
    }, [token, requestBooks]);
  
    useEffect(() => {
      console.log("useEffect");
      load();
    }, [load]);
  
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

<br>

## 리덕스 미들웨어

+ 미들웨어가 **"디스패치"**의 앞뒤에 코드를 추가할 수 있게 해줌
+ 미들웨어가 여러 개면 미들웨어가 "순차적으로" 실행
+ 두 단계가 있음
  + 스토어를 만들 때, 미들웨어를 설정하는 부분
    + {createStore, applyMiddleware} from redux
  + 디스패치가 호출될 때 실제로 미들웨어를 통과하는 부분
+ dispatch 메소드를 통해 store로 가고 있는 액션을 가로채는 코드

<br>

### 리덕스 미들웨어

```jsx
function middleware1(store) {
  return next => {
    console.log('middleware1', 1);
    return action => {
      console.log('middleware1', 2);
      const returnValue = next(action);
      console.log('middleware1', 3);
      return returnValue;
    };
  };
}

function middleware2(store) {
  return next => {
    console.log('middleware2', 1);
    return action => {
      console.log('middleware2', 2);
      const returnValue = next(action);
      console.log('middleware2', 3);
      return returnValue;
    };
  };
}
```

### applyMiddleware(함수1, 함수2, ...)

```jsx
import { createStore, applyMiddleware } from 'redux';

function middleware1(store) {...}

function middleware2(store) {...}

const store = createStore(reducer, applyMiddleware(middleware1, middleware2));
```

### middleware 에서 store 접근

```jsx
function middleware1(store) {
  return next => {
    console.log('middleware1', 1, store.getState());
    return action => {
      console.log('middleware1', 2, store.getState());
      const returnValue = next(action);
      console.log('middleware1', 3, store.getState());
      return returnValue;
    };
  };
}
```



### 실습

+ ./src/store.js 수정

  ```jsx
  // ./src/store.js
  
  import { createStore, applyMiddleware } from "redux";
  import reducers from "./reducers";
  
  const middleware1 = (store) => {
    return (next) => {
      return (action) => {
        console.log("middleware1", 3);
        const returnValue = next(action);
        console.log("middleware1", 4);
      };
    };
  };
  
  const middleware2 = (store) => {
    return (next) => {
      return (action) => {
        console.log("middleware2", 3);
        store.getState();
        const returnValue = next(action);
        console.log("middleware2", 4);
      };
    };
  };
  
  const store = createStore(
    reducers,
    { books: [], loading: false, error: null },
    applyMiddleware(middleware1, middleware2)
  );
  
  export default store;
  ```

<br>

## redux-devtools

참고: [https://github.com/zalmoxisus/redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)

```bash
$ npm install -D redux-devtools-extension
```

+ chrome 웹 스토어에서 확장프로그램 설치: [https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related)

### composeWithDevTools

```jsx
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(reducers, composeWithDevTools(applyMiddleware()));

export default store;
```

### 실습

+ ./src/store.js 수정

  ```jsx
  // ./src/store.js
  
  import { createStore, applyMiddleware } from "redux";
  import reducers from "./reducers";
  import { composeWithDevTools } from "redux-devtools-extension";
  
  const store = createStore(
    reducers,
    { books: [], loading: false, error: null },
    composeWithDevTools(applyMiddleware())
  );
  
  export default store;
  ```

+ 개발자도구 -> Redux 탭 확인

<br>

## redux-thunk

참고: [https://github.com/zalmoxisus/redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)

```bash
$ npm i redux-thunk
```

### redux-thunk

+ 리덕스 미들웨어
+ 리덕스를 만든 사람이 만들었음. (Dan)
+ 리덕스에서 비동기 처리를 위한 라이브러리
+ 액션 생성자를 활용하여 비동기 처리
+ 액션 생성자가 액션을 리턴하지 않고, 함수를 리턴함



### import thunk from 'redux-thunk';

```jsx
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; // import

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)) // 미들웨어 설정
);

export default store;
```

### Before Using thunk

```jsx
const mapDispatchToProps = dispatch => ({
  requestBooks: async token => {
    dispatch(startLoading());
    dispatch(clearError());
    try {
      const res = await axios.get("https://api.marktube.tv/v1/book", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(setBooks(res.data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
      dispatch(endLoading());
    }
  }
});
```

### Use thunk

```jsx
// BooksContainer.jsx
const mapDispatchToProps = dispatch => ({
  requestBooks: async token => {...},
  requestBooksThunk: token => {
    dispatch(setBooksThunk(token));
  }
});

// actions/index.js
export const setBooksThunk = token => async dispatch => {
  dispatch(startLoading());
  dispatch(clearError());
  try {
    const res = await axios.get("https://api.marktube.tv/v1/book", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(setBooks(res.data));
    dispatch(endLoading());
  } catch (error) {
    console.log(error);
    dispatch(setError(error));
    dispatch(endLoading());
  }
};
```

### 실습

+ ./src/store.js 수정

  ```jsx
  // ./sre/store.js
  
  import { createStore, applyMiddleware } from "redux";
  import reducers from "./reducers";
  import { composeWithDevTools } from "redux-devtools-extension";
  import thunk from "redux-thunk";
  
  const store = createStore(
    reducers,
    { books: [], loading: false, error: null },
    composeWithDevTools(applyMiddleware(thunk))
  );
  
  export default store;
  ```

+ ./src/containers/BooksContainer.jsx 수정

  ```jsx
  // ./src/containers/BooksContainer.jsx
  
  import { connect } from "react-redux";
  import Books from "../components/Books";
  import { setBooksThunk } from "../actions/index";
  
  const mapStateToProps = (state) => ({
    books: state.books,
    loading: state.loading,
    error: state.error,
  });
  
  const mapDispatchProps = (dispatch) => ({
    requestBooksThunk: (token) => {
      dispatch(setBooksThunk(token));
    },
  });
  
  export default connect(mapStateToProps, mapDispatchProps)(Books);
  ```

+ ./src/actions/index.js 수정

  ```jsx
  // ./src/actions/index.js 
  
  import axios from "axios";
  
  export const SET_BOOKS = "SET_BOOKS";
  
  const setBooks = (books) => ({
    type: SET_BOOKS,
    books,
  });
  
  export const START_LOADING = "START_LOADING";
  export const END_LOADING = "END_LOADING";
  
  function startLoading() {
    return {
      type: START_LOADING,
    };
  }
  
  function endLoading() {
    return {
      type: END_LOADING,
    };
  }
  
  export const SET_ERROR = "SET_ERROR";
  export const CLEAR_ERROR = "CLEAR_ERROR";
  
  const setError = (error) => ({
    type: SET_ERROR,
    error,
  });
  
  const clearError = () => ({
    type: CLEAR_ERROR,
  });
  
  // thunk
  export const setBooksThunk = (token) => async (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError());
  
    try {
      const res = await axios.get("https://api.marktube.tv/v1/book", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setBooks(res.data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
      dispatch(endLoading());
    }
  };
  ```

+ ./src/components/Books.jsx 수정

  ```jsx
  // ./src/components/Books.jsx
  
  import React, { useEffect } from "react";
  
  const Book = (props) => <div>title: {props.title}</div>;
  
  const Books = ({ token, books, loading, error, requestBooksThunk }) => {
    useEffect(() => {
      console.log("useEffect");
      requestBooksThunk(token);
    }, [token, requestBooksThunk]);
  
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

<br>

## redux-promise-middleware

+ 참고: [https://pburtchaell.gitbook.io/redux-promise-middleware/](https://pburtchaell.gitbook.io/redux-promise-middleware/)

```bash
$ npm i redux-promise-middleware
```

<br>

### import promise from 'redux-promise-middle-ware'

```jsx
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware"; // import

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, promise)) // 미들웨어 설정
);

export default store;
```

### payload 가 Promise

```jsx
// actions/index.js
export const setBooksPromise = token => ({
  type: BOOKS,
  payload: axios.get("https://api.marktube.tv/v1/book", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
});
```

### 액션 Type에 접미사를 붙인 액션을 자동 생성하고 자동으로 dispatch 시킴

```jsx
// actions/index.js
export const BOOKS = 'BOOKS';
export const BOOKS_PENDING = 'BOOKS_PENDING';
export const BOOKS_FULFILLED = 'BOOKS_FULFILLED';
export const BOOKS_REJECTED = 'BOOKS_REJECTED';

// reducers/loading.js
export default function loading(state = initialState, action) {
  switch (action.type) {
    case BOOKS_PENDING:
      return true;

    case BOOKS_FULFILLED:
      return false;

    case BOOKS_REJECTED:
      return false;

    default:
      return state;
  }
}
```

### payload로 들어오는 데이터를 활용하여 표현

```jsx
{
  type: 'BOOKS_PENDING'
}

{
  type: 'BOOKS_FULFILLED'
  payload: {
    ...
  }
}

{
  type: 'BOOKS_REJECTED'
  error: true,
  payload: {
    ...
  }
}
   

// reducers/books.js

const books = (state = initialState, action) => {
  switch (action.type) {
    case BOOKS_FULFILLED: {
      return [...action.payload.data]
    }

  ...
}
```

### 실습

+ ./src/store.js 수정

  ```jsx
  // ./src/store.js
  
  import { createStore, applyMiddleware } from "redux";
  import reducers from "./reducers";
  import { composeWithDevTools } from "redux-devtools-extension";
  import thunk from "redux-thunk";
  import promise from "redux-promise-middleware";
  
  const store = createStore(
    reducers,
    { books: [], loading: false, error: null },
    composeWithDevTools(applyMiddleware(thunk, promise))
  );
  
  export default store;
  ```

+ ./src/containers/BooksContainers.jsx 수정

  ```jsx
  // ./src/containers/BooksContainers.jsx
  
  import { connect } from "react-redux";
  import Books from "../components/Books";
  import { setBooksThunk, setBooksPromise } from "../actions";
  
  const mapStateToProps = (state) => ({
    books: state.books,
    loading: state.loading,
    error: state.error,
  });
  
  const mapDispatchProps = (dispatch) => ({
    requestBooksThunk: (token) => {
      dispatch(setBooksThunk(token));
    },
  
    requestBooksPromise: (token) => {
      dispatch(setBooksPromise(token));
    },
  });
  
  export default connect(mapStateToProps, mapDispatchProps)(Books);
  ```

+ ./src/actions/index.js 수정

  ```jsx
  // ./src/actions/index.js
  
  import axios from "axios";
  
  export const SET_BOOKS = "SET_BOOKS";
  
  const setBooks = (books) => ({
    type: SET_BOOKS,
    books,
  });
  
  export const START_LOADING = "START_LOADING";
  export const END_LOADING = "END_LOADING";
  
  function startLoading() {
    return {
      type: START_LOADING,
    };
  }
  
  function endLoading() {
    return {
      type: END_LOADING,
    };
  }
  
  export const SET_ERROR = "SET_ERROR";
  export const CLEAR_ERROR = "CLEAR_ERROR";
  
  const setError = (error) => ({
    type: SET_ERROR,
    error,
  });
  
  const clearError = () => ({
    type: CLEAR_ERROR,
  });
  
  // thunk
  export const setBooksThunk = (token) => async (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError());
  
    try {
      const res = await axios.get("https://api.marktube.tv/v1/book", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setBooks(res.data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
      dispatch(endLoading());
    }
  };
  
  export const BOOKS = "BOOKS";
  export const BOOKS_PENDING = "BOOKS_PENDING";
  export const BOOKS_FULFILLED = "BOOKS_FULFILLED";
  export const BOOKS_REJECTED = "BOOKS_REJECTED";
  
  // promise
  export const setBooksPromise = (token) => ({
    type: BOOKS,
    payload: axios.get("https://api.marktube.tv/v1/book", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  });
  ```

+ ./src/components/Books.jsx 수정

  ```jsx
  // ./src/components/Books.jsx
  
  import React, { useEffect } from "react";
  
  const Book = (props) => <div>title: {props.title}</div>;
  
  const Books = ({ token, books, loading, error, requestBooksPromise }) => {
    useEffect(() => {
      requestBooksPromise(token);
    }, [token, requestBooksPromise]);
  
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

+ ./src/reducers/books.js 수정

  ```jsx
  // ./src/reducers/books.js
  
  import { SET_BOOKS, BOOKS_FULFILLED } from "../actions";
  
  const initialState = [];
  
  const books = (state = initialState, action) => {
    switch (action.type) {
      case SET_BOOKS:
        return [...action.books];
      case BOOKS_FULFILLED:
        return [...action.payload.data];
      default:
        return state;
    }
  };
  
  export default books;
  ```

+ ./src/reducers/loading.js 수정

  ```jsx
  // ./src/reducers/loading.js
  
  import {
    START_LOADING,
    END_LOADING,
    BOOKS_PENDING,
    BOOKS_FULFILLED,
    BOOKS_REJECTED,
  } from "../actions";
  
  const initialState = false;
  
  const loading = (state = initialState, action) => {
    switch (action.type) {
      case START_LOADING:
      case BOOKS_PENDING:
        return true;
      case END_LOADING:
      case BOOKS_FULFILLED:
      case BOOKS_REJECTED:
        return false;
      default:
        return state;
    }
  };
  
  export default loading;
  ```

+ ./src/reducers/error.js 수정

  ```jsx
  // ./src/reducers/error.js 
  
  import {
    SET_ERROR,
    CLEAR_ERROR,
    BOOKS_REJECTED,
    BOOKS_PENDING,
  } from "../actions";
  
  const initialState = null;
  
  const error = (state = initialState, action) => {
    switch (action.type) {
      case SET_ERROR:
        return action.error;
      case BOOKS_REJECTED:
        return action.payload;
      case CLEAR_ERROR:
      case BOOKS_PENDING:
        return null;
      default:
        return state;
    }
  };
  
  export default error;
  ```

<br>

## react-router 와 redux 함께 쓰기

참고: [https://github.com/supasate/connected-react-router](https://github.com/supasate/connected-react-router)

<br>

### reducer에 router라는 state를 combine

```jsx
// src/reducers/index.js

import { combineReducers } from "redux";
import books from "./books";
import loading from "./loading";
import error from "./error";
import { connectRouter } from "connected-react-router";

const reducers = history =>
  combineReducers({
    books,
    loading,
    error,
    router: connectRouter(history)
  });

export default reducers;
```

### store에 routerMiddleware를 추가

```jsx
// src/store.js

import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

const store = createStore(
  reducers(history),
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), thunk, promise)
  )
);

export default store;
```

### Router => ConnectedRouter

```jsx
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import withAuth from "./hocs/withAuth";
import { history } from './store';
import { ConnectedRouter } from 'connected-react-router';

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

### history.push() 대신 dispatch(push())

```jsx
const SigninForm = ({ dispatch }) => {
  async function click() {
    const email = emailInput.current.state.value;
    const password = passwordInput.current.state.value;

    try {
      setIsLoading(true);
      const res = await axios.post("https://api.marktube.tv/v1/me", {
        email,
        password
      });
      console.log(res.data);
      setIsLoading(false);
      localStorage.setItem("token", res.data.token);
      // history.push("/");
      dispatch(push("/"));
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      // error feedback
      message.error(error.response.data.error);
    }
  }
  ...
}

export default connect()(SigninForm);
```

### 실습 - token

+ ./src/reducers에 token.js 생성

  ```jsx
  // ./src/reducers/token.js
  
  import { SET_TOKEN, REMOVE_TOKEN } from "../actions";
  
  const initialState = null;
  
  const token = (state = initialState, action) => {
    switch (action.type) {
      case SET_TOKEN:
        return action.token;
      case REMOVE_TOKEN:
        return null;
      default:
        return state;
    }
  };
  
  export default token;
  ```

+ ./src/reducers/index.js 수정

  ```jsx
  // ./src/reducers/index.js 
  
  import { combineReducers } from "redux";
  import books from "./books";
  import loading from "./loading";
  import error from "./error";
  import token from "./token";
  
  const reducers = combineReducers({
    books,
    loading,
    error,
    token,
  });
  
  export default reducers;
  ```

+ ./src/actions/index.js 수정

  ```jsx
  // ./src/actions/index.js 
  
  import axios from "axios";
  
  export const SET_BOOKS = "SET_BOOKS";
  
  const setBooks = (books) => ({
    type: SET_BOOKS,
    books,
  });
  
  export const START_LOADING = "START_LOADING";
  export const END_LOADING = "END_LOADING";
  
  function startLoading() {
    return {
      type: START_LOADING,
    };
  }
  
  function endLoading() {
    return {
      type: END_LOADING,
    };
  }
  
  export const SET_ERROR = "SET_ERROR";
  export const CLEAR_ERROR = "CLEAR_ERROR";
  
  const setError = (error) => ({
    type: SET_ERROR,
    error,
  });
  
  const clearError = () => ({
    type: CLEAR_ERROR,
  });
  
  // thunk
  export const setBooksThunk = (token) => async (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError());
  
    try {
      const res = await axios.get("https://api.marktube.tv/v1/book", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setBooks(res.data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
      dispatch(endLoading());
    }
  };
  
  export const BOOKS = "BOOKS";
  export const BOOKS_PENDING = "BOOKS_PENDING";
  export const BOOKS_FULFILLED = "BOOKS_FULFILLED";
  export const BOOKS_REJECTED = "BOOKS_REJECTED";
  
  // promise
  export const setBooksPromise = (token) => ({
    type: BOOKS,
    payload: axios.get("https://api.marktube.tv/v1/book", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  });
  
  // token
  export const SET_TOKEN = "SET_TOKEN";
  export const REMOVE_TOKEN = "REMOVE_TOKEN";
  
  export const setToken = (token) => ({
    type: SET_TOKEN,
    token,
  });
  
  export const removeToken = () => ({
    type: REMOVE_TOKEN,
  });
  ```

+ ./src/store.js 수정

  ```jsx
  // ./src/store.js
  
  import { createStore, applyMiddleware } from "redux";
  import reducers from "./reducers";
  import { composeWithDevTools } from "redux-devtools-extension";
  import thunk from "redux-thunk";
  import promise from "redux-promise-middleware";
  
  const initStore = (token) =>
    createStore(
      reducers,
      {
        token,
      },
      composeWithDevTools(applyMiddleware(thunk, promise))
    );
  
  export default initStore;
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
  import initStore from "./store";
  import { Provider } from "react-redux";
  
  const token = localStorage.getItem("token");
  const store = initStore(token);
  
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

+ ./src/hocs/withAuth.js 수정

  ```jsx
  // ./src/hocs/withAuth.js
  
  import React from "react";
  import { Redirect } from "react-router-dom";
  import { useSelector } from "react-redux";
  
  export default function withAuth(Component) {
    function WrapperComponent(props) {
      const token = useSelector((state) => state.token);
  
      if (token === null) {
        return <Redirect to="/signin" />;
      }
      return <Component {...props} token={token} />;
    }
  
    WrapperComponent.displayName = `withAuth(${Component.name});`;
  
    return WrapperComponent;
  }
  ```

+ ./src/components/SigninForm.jsx 수정

  ```jsx
  // ./src/components/SigninForm.jsx
  
  import React, { useState } from "react";
  import { Input, Button, Divider, Col, message } from "antd";
  import styled from "styled-components";
  import { Link, withRouter } from "react-router-dom";
  import axios from "axios";
  import { connect } from "react-redux";
  import { setToken } from "../actions";
  
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
  
  function SigninForm({ history, setToken }) {
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
  
        localStorage.setItem("token", res.data.token);
  
        // redux
        setToken(res.data.token);
  
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

+ ./src/containers에 SigninFormContainer.jsx 생성

  ```jsx
  // ./src/containers/SigninFormContainer.jsx 
  
  import SigninForm from "../components/SigninForm";
  import { connect } from "react-redux";
  import { setToken } from "../actions";
  
  const mapStateToPRops = () => ({});
  const mapDispatchToProps = (dispatch) => ({
    setToken: (token) => {
      dispatch(setToken(token));
    },
  });
  
  export default connect(mapStateToPRops, mapDispatchToProps)(SigninForm);
  ```

### 실습

+ ./src/actions/index.js 수정

  ```jsx
  // ./src/actions/index.js 
  
  import axios from "axios";
  
  export const SET_BOOKS = "SET_BOOKS";
  
  const setBooks = (books) => ({
    type: SET_BOOKS,
    books,
  });
  
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
  
  export const setError = (error) => ({
    type: SET_ERROR,
    error,
  });
  
  export const clearError = () => ({
    type: CLEAR_ERROR,
  });
  
  // thunk
  export const setBooksThunk = (token) => async (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError());
  
    try {
      const res = await axios.get("https://api.marktube.tv/v1/book", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setBooks(res.data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
      dispatch(endLoading());
    }
  };
  
  export const BOOKS = "BOOKS";
  export const BOOKS_PENDING = "BOOKS_PENDING";
  export const BOOKS_FULFILLED = "BOOKS_FULFILLED";
  export const BOOKS_REJECTED = "BOOKS_REJECTED";
  
  // promise
  export const setBooksPromise = (token) => ({
    type: BOOKS,
    payload: axios.get("https://api.marktube.tv/v1/book", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  });
  
  // token
  export const SET_TOKEN = "SET_TOKEN";
  export const REMOVE_TOKEN = "REMOVE_TOKEN";
  
  export const setToken = (token) => ({
    type: SET_TOKEN,
    token,
  });
  
  export const removeToken = () => ({
    type: REMOVE_TOKEN,
  });
  ```

+ ./src/containers/SigninFormContainer.jsx 수정

  ```jsx
  // ./src/containers/SigninFormContainer.jsx
  
  import axios from "axios";
  import SigninForm from "../components/SigninForm";
  import { message } from "antd";
  import { connect } from "react-redux";
  import {
    setToken,
    startLoading,
    endLoading,
    setError,
    clearError,
  } from "../actions";
  
  const mapStateToPRops = (state) => ({
    loading: state.loading,
    error: state.error,
  });
  const mapDispatchToProps = (dispatch) => ({
    setToken: (token) => {
      dispatch(setToken(token));
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
    login: async (email, password) => {
      try {
        startLoading();
        clearError();
        const res = await axios.post("https://api.marktube.tv/v1/me", {
          email,
          password,
        });
        console.log(res.data);
        endLoading();
  
        localStorage.setItem("token", res.data.token);
  
        // redux
        setToken(res.data.token);
  
        // 로그인 성공
        message.success("Sucess Login!");
      } catch (error) {
        console.log(error);
        endLoading();
        // error feedback
        setError(error);
      }
    },
  });
  
  export default connect(mapStateToPRops, mapDispatchToProps)(SigninForm);
  
  ```

+ ./src/components/SigninForm.jsx 수정

  ```jsx
  // ./src/components/SigninForm.jsx
  
  import React, { useEffect } from "react";
  import { Input, Button, Divider, Col, message } from "antd";
  import styled from "styled-components";
  import { Link, withRouter } from "react-router-dom";
  
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
  
  function SigninForm({ history, loading, error, login }) {
    const emailInput = React.createRef();
    const passwordInput = React.createRef();
  
    async function click() {
      const email = emailInput.current.state.value;
      const password = passwordInput.current.state.value;
  
      await login(email, password);
      history.push("/");
    }
  
    useEffect(() => {
      if (error) {
        message.error(error.response.data.error);
      }
    }, [error]);
  
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
            <StyledButton size="large" loading={loading} onClick={click}>
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

<br>

### 실습 - connected-react-router

+ 참고: [https://github.com/supasate/connected-react-router](https://github.com/supasate/connected-react-router), [https://reacttraining.com/react-router/web/guides/redux-integration/deep-integration](https://reacttraining.com/react-router/web/guides/redux-integration/deep-integration)

```bash
$ npm i connected-react-router
```

<br>

+ ./src/store.js 수정

  ```jsx
  // ./src/store.js 
  
  import { createStore, applyMiddleware } from "redux";
  import reducers from "./reducers";
  import { composeWithDevTools } from "redux-devtools-extension";
  import thunk from "redux-thunk";
  import promise from "redux-promise-middleware";
  import { routerMiddleware } from "connected-react-router";
  import { createBrowserHistory } from "history";
  
  export const history = createBrowserHistory();
  
  const initStore = (token) =>
    createStore(
      reducers(history),
      {
        token,
      },
      composeWithDevTools(
        applyMiddleware(routerMiddleware(history), thunk, promise)
      )
    );
  
  export default initStore;
  ```

+ ./src/reducers/index.js 수정

  ```jsx
  // ./sre/reducers/index.js
  
  import { combineReducers } from "redux";
  import books from "./books";
  import loading from "./loading";
  import error from "./error";
  import token from "./token";
  import { connectRouter } from "connected-react-router";
  
  const reducers = (history) =>
    combineReducers({
      books,
      loading,
      error,
      token,
      router: connectRouter(history),
    });
  
  export default reducers;
  ```

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
  import { history } from "./store";
  
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

+ ./src/containers/SigninFormContainer.jsx 수정

  ```jsx
  // ./src/containers/SigninFormContainer.jsx 
  
  import SigninForm from "../components/SigninForm";
  import { connect } from "react-redux";
  import { login } from "../actions";
  
  const mapStateToPRops = (state) => ({
    loading: state.loading,
    error: state.error,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => {
      dispatch(login(email, password));
    },
  });
  
  export default connect(mapStateToPRops, mapDispatchToProps)(SigninForm);
  ```

+ ./src/components/SigninForm.jsx 수정

  ```jsx
  // ./src/components/SigninForm.jsx
  
  import React, { useEffect } from "react";
  import { Input, Button, Divider, Col, message } from "antd";
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
  
  function SigninForm({ loading, error, login }) {
    const emailInput = React.createRef();
    const passwordInput = React.createRef();
  
    function click() {
      const email = emailInput.current.state.value;
      const password = passwordInput.current.state.value;
  
      login(email, password);
    }
  
    useEffect(() => {
      if (error) {
        message.error(error.response.data.error);
      }
    }, [error]);
  
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
            <StyledButton size="large" loading={loading} onClick={click}>
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
  
  export default SigninForm;
  ```

+ ./src/actions/index.js 수정

  ```jsx
  // ./src/actions/index.js 
  
  import axios from "axios";
  import { push } from "connected-react-router";
  import { message } from "antd";
  
  export const SET_BOOKS = "SET_BOOKS";
  
  const setBooks = (books) => ({
    type: SET_BOOKS,
    books,
  });
  
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
  
  export const setError = (error) => ({
    type: SET_ERROR,
    error,
  });
  
  export const clearError = () => ({
    type: CLEAR_ERROR,
  });
  
  // thunk
  export const setBooksThunk = (token) => async (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError());
  
    try {
      const res = await axios.get("https://api.marktube.tv/v1/book", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setBooks(res.data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
      dispatch(endLoading());
    }
  };
  
  export const BOOKS = "BOOKS";
  export const BOOKS_PENDING = "BOOKS_PENDING";
  export const BOOKS_FULFILLED = "BOOKS_FULFILLED";
  export const BOOKS_REJECTED = "BOOKS_REJECTED";
  
  // promise
  export const setBooksPromise = (token) => ({
    type: BOOKS,
    payload: axios.get("https://api.marktube.tv/v1/book", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  });
  
  // token
  export const SET_TOKEN = "SET_TOKEN";
  export const REMOVE_TOKEN = "REMOVE_TOKEN";
  
  export const setToken = (token) => ({
    type: SET_TOKEN,
    token,
  });
  
  export const removeToken = () => ({
    type: REMOVE_TOKEN,
  });
  
  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch(startLoading());
      dispatch(clearError());
      const res = await axios.post("https://api.marktube.tv/v1/me", {
        email,
        password,
      });
      console.log(res.data);
      dispatch(endLoading());
  
      localStorage.setItem("token", res.data.token);
  
      // redux
      dispatch(setToken(res.data.token));
      dispatch(push("/"));
  
      // 로그인 성공
      message.success("Sucess Login!");
    } catch (error) {
      console.log(error);
      dispatch(endLoading());
      // error feedback
      dispatch(setError(error));
    }
  };
  ```

+ ./src/pages/Home.jsx 수정

  ```jsx
  // ./src/pages/Home.jsx
  
  import React from "react";
  import BooksContainer from "../containers/BooksContainer";
  import { Link } from "react-router-dom";
  
  const Home = ({ token }) => (
    <div>
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/signin">로그인</Link>
        </li>
      </ul>
      <BooksContainer token={token} />
    </div>
  );
  
  export default Home;
  ```


<br>

### 서비스 로직 분리

+ ./src에 services 폴더 생성

+ ./src/services에 LoginService.js 생성

  ```jsx
  // ./src/services/LoginService.js
  
  
  ```

+ ./src/services에 BookService.js 생성

  ```jsx
  // ./src/services/BookService.js
  
  
  ```

+ ./src/actions/index.js  수정

  ```jsx
  // ./src/actions/index.js 
  
  
  ```

  