import React from "react";

const Index = () => <div>Hello World</div>;

Index.getInitialProps = () => {
  console.log("getInitialProps");
  return {};
};

export default Index;
