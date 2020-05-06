import React, { useEffect } from "react";
import Book from "./Book";
import { Table } from "antd";

const Books = ({ books, loading, error, requestBooks, deleteBook }) => {
  useEffect(() => {
    if (books === null) requestBooks();
  }, [books, requestBooks]);

  if (error !== null) {
    return <p>{error.message}</p>;
  }
  return (
    <div>
      <Table
        dataSource={books}
        columns={[
          {
            title: "Book",
            dataIndex: "book",
            key: "book",
            render: (text, record, index) => (
              <Book {...record} deleteBook={deleteBook} key={index} />
            ),
          },
        ]}
        showHeader={false}
        pagination={{
          size: "small",
          pageSize: 10,
          align: "center",
        }}
        bodyStyle={{
          borderTop: "1px solid #e8e8e8",
        }}
        style={{
          marginTop: 30,
        }}
        rowKey="bookId"
        loading={loading}
      />
    </div>
  );
};

export default Books;
