import React from "react";
import BookAddContainer from "../containers/BookAddContainer";
import { Redirect } from "react-router-dom";
import useToken from "../hooks/useToken";
import Layout from "../components/Layout";

const Add = () => {
  const token = useToken();
  if (token === null) {
    return <Redirect to="/signin" />;
  }

  return (
    <Layout>
      <BookAddContainer />
    </Layout>
  );
};

export default Add;
