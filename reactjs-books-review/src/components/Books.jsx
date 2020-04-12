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
