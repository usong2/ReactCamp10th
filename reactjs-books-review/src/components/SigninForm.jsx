import React, { useEffect } from "react";
import { Input, Button, Divider, Col, message } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Title = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  text-transform: uppercase;
  font-family: Roboto;
  font-size: 24px;
  font-weight: bold;
  margin-top: 60px;
  text-align: center;
`;

const InputTitle = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  margin-top: ${(props) => props.top || "40"}px;
  text-align: left;
  padding-left: 40px;
`;

const InputArea = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 40px;
  padding-right: 40px;
`;

const StyledInput = styled(Input)`
  width: 100%;
  border-radius: 1px;
  border-width: 1px;
  font-family: Roboto;
`;

const ButtonArea = styled.div`
  text-align: left;
  padding-left: 40px;
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
  border-color: #28546a;
  background-color: #28546a;
  text-transform: uppercase;
  border-radius: 1px;
  border-width: 2px;
  color: white;
  width: 120px;
  &:hover {
    background-color: #28546a;
    color: white;
  }
`;

const DividerArea = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  margin-top: 30px;
  text-align: left;
  padding-left: 40px;
  padding-right: 40px;
`;

const LinkArea = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  margin-top: 15px;
  overflow: hidden;
`;

const LinkTitle = styled.div`
  float: left;
  padding-top: 5px;
`;

const StyledSpan = styled.span.attrs(() => ({
  children: "*",
}))`
  color: #971931;
`;

const LinkButtonArea = styled.div`
  float: right;
`;

const LinkButton = styled(Button)`
  background-color: #f3f7f8;
  border-color: #28546a;
  color: #28546a;
  text-transform: uppercase;
  border-radius: 1px;
  border-width: 2px;
  &:hover {
    background-color: #28546a;
    color: white;
  }
`;

function SigninForm({ loading, error, login }) {
  const emailInput = React.createRef();
  const passwordInput = React.createRef();

  function click() {
    const email = emailInput.current.state.value;
    const password = passwordInput.current.state.value;

    login(email, password);
  }

  useEffect(() => {
    if (error) {
      message.error(error.response.data.error);
    }
  }, [error]);

  return (
    <Col
      span={12}
      style={{
        verticalAlign: "top",
      }}
    >
      <form>
        <Title>Log In. Start Searching.</Title>
        <InputTitle>
          Email
          <StyledSpan />
        </InputTitle>
        <InputArea>
          <StyledInput
            placeholder="Email"
            autoComplete="email"
            name="email"
            ref={emailInput}
          />
        </InputArea>
        <InputTitle top={10}>
          Password
          <StyledSpan />
        </InputTitle>
        <InputArea>
          <StyledInput
            type="password"
            autoComplete="current-password"
            ref={passwordInput}
          />
        </InputArea>
        <ButtonArea>
          <StyledButton size="large" loading={loading} onClick={click}>
            Sign In
          </StyledButton>
        </ButtonArea>
        <DividerArea>
          <Divider />
        </DividerArea>
        <LinkArea>
          <LinkTitle>Need to create an account?</LinkTitle>
          <LinkButtonArea>
            <Link to="/signup">
              <LinkButton>Sign up</LinkButton>
            </Link>
          </LinkButtonArea>
        </LinkArea>
        <LinkArea>
          <LinkTitle>Forgot your password?</LinkTitle>
          <LinkButtonArea>
            <Link to="/forgot">
              <LinkButton>Recovery</LinkButton>
            </Link>
          </LinkButtonArea>
        </LinkArea>
      </form>
    </Col>
  );
}

export default SigninForm;
