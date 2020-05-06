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
