import React from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import SigninBg from "../components/SigninBg";
import SigninFormContainer from "../containers/SigninFormContainer";
import useToken from "../hooks/useToken";
import { Redirect } from "react-router-dom";

const Page = styled(Row).attrs(() => ({
  type: "flex",
  align: "middle",
}))`
  height: 100vh;
`;

const Title = styled.div`
  text-align: center;
  font-family: Roboto;
  font-size: 40px;
  font-weight: bold;
  color: #1890ff;
  text-transform: uppercase;
`;

const SubTitle = styled.div`
  text-align: center;
  font-family: Roboto;
  font-size: 27px;
  font-weight: bold;
  text-transform: uppercase;
`;

const Underline = styled.div`
  width: 200px;
  height: 8px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  background: linear-gradient(to right, #1890ff, #ffb618);
`;

const Contents = styled(Row).attrs(() => ({
  type: "flex",
}))`
  margin-top: 50px;
  background-color: #f3f7f8;
  margin-left: auto;
  margin-right: auto;
  width: 800px;
`;

const Signin = () => {
  const token = useToken();
  if (token !== null) {
    return <Redirect to="/" />;
  }

  return (
    <Page>
      <Col span={24}>
        <Title>USONG REVIEW SERVICE FOR BOOKS</Title>
        <SubTitle>PLEASE SHARE YOUR OPINION ON WEB DEVELOPMENT BOOKS.</SubTitle>
        <Underline />
        <Contents>
          <SigninBg />
          <SigninFormContainer />
        </Contents>
      </Col>
    </Page>
  );
};

export default Signin;
