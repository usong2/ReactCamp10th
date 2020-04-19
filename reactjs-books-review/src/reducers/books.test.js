import books from "./books";
import { setBooks } from "../actions";

describe("books reducer", () => {
  it("should return the initialState", () => {
    const state = books(undefined, {});

    const initialState = [];

    expect(state).toEqual(initialState);
  });

  it("setBooks action should return the newState", () => {
    const state = books(undefined, {});

    const booksMock = [
      {
        bookId: 1,
        ownerId: "7d26db27-168c-4c6a-bd9a-9e20677b60b8",
        title: "모던 자바스크립트 입문",
        message: "모던하군요",
      },
      {
        bookId: 2,
        ownerId: "7d26db27-168c-4c6a-bd9a-9e20677b60b8",
        title: "책 Mock",
        message: "메세지 Mock",
      },
    ];

    const action = setBooks(booksMock);

    const newState = books(state, action);

    expect(newState).toEqual(booksMock);
  });
});
