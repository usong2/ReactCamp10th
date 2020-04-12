import React from "react";
import BooksContainer from "../containers/BooksContainer";

const Home = ({ token }) => (
  <div>
    <h1>Home</h1>
    <BooksContainer token={token} />
  </div>
);

export default Home;
