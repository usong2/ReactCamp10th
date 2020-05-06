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
