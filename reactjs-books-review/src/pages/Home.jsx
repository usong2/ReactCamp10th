import React from "react";
import BooksContainer from "../containers/BooksContainer";
import { Redirect } from "react-router-dom";
import useToken from "../hooks/useToken";
import Layout from "../components/Layout";

const Home = () => {
  const token = useToken();
  if (token === null) {
    return <Redirect to="/signin" />;
  }

  return (
    <Layout>
      <BooksContainer />
    </Layout>
  );
};

export default Home;
