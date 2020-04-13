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
