import React from "react";

const Index = () => <div>Hello World</div>;
Index.getInitialProps = () => {
  console.log("getInitialProps");

  // Isomorphism과 Universal javascript: 서버, 클라이언트에서 모두 사용 가능
  return {};
};

export default Index;
