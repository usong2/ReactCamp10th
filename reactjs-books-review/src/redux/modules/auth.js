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
