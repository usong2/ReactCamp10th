import {
  setBooks,
  SET_BOOKS,
  startLoading,
  START_LOADING,
  endLoading,
  END_LOADING,
  setError,
  SET_ERROR,
  clearError,
  CLEAR_ERROR,
} from ".";

describe("actions", () => {
  describe("books", () => {
    it("setBooks(books) should create action", () => {
      const booksMock = ["hello", "world"];
      const action = setBooks(booksMock);
      expect(action).toEqual({ type: SET_BOOKS, books: booksMock });
    });
  });
  describe("loading", () => {
    it("startLoading() should create action", () => {
      const action = startLoading();
      expect(action).toEqual({ type: START_LOADING });
    });
    it("endLoading() should create action", () => {
      const action = endLoading();
      expect(action).toEqual({ type: END_LOADING });
    });
  });
  describe("error", () => {
    it("setError() should create action", () => {
      const error = new Error();
      expect(setError(error)).toEqual({ type: SET_ERROR, error });
    });

    it("clearError should create action", () => {
      expect(clearError()).toEqual({ type: CLEAR_ERROR });
    });
  });
});
