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
