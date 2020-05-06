import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { BookOutlined } from "@ant-design/icons";
import moment from "moment";

const Book = ({ bookId, title, author, createdAt, deleteBook }) => {
  function click() {
    deleteBook(bookId);
  }
  return (
    <div
      style={{
        display: "table",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "table-cell",
          verticalAlign: "middle",
          fontSize: 14,
          fontWeight: "bold",
          paddingLeft: 10,
        }}
      >
        <Link
          to={`/book/${bookId}`}
          style={{
            color: "#0a222e",
          }}
        >
          <BookOutlined /> {title}
        </Link>
      </div>
      <div
        style={{
          display: "table-cell",
          verticalAlign: "middle",
          fontSize: 14,
          fontWeight: "bold",
          paddingLeft: 10,
        }}
      >
        <Link to={`/book/${bookId}`}>{author}</Link>
      </div>
      <div
        style={{
          color: "#999999",
          display: "table-cell",
          verticalAlign: "middle",
          fontSize: 14,
          paddingLeft: 10,
        }}
      >
        {moment(createdAt).format("MM-DD-YYYY hh:mm a")}
      </div>
      <div
        style={{
          color: "#999999",
          display: "table-cell",
          verticalAlign: "middle",
          fontSize: 14,
          paddingLeft: 10,
        }}
      >
        <Button size="small" type="danger" ghost onClick={click}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Book;
