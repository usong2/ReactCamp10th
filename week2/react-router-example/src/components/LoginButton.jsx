import React from "react";
import { withRouter } from "react-router-dom";

export function LoginButton({ history }) {
  function click() {
    setTimeout(() => {
      // 이동
      history.push("/");
    }, 1000);
  }
  return (
    <>
      {/* <Redirect to="/" /> */}
      <button onClick={click}>로그인</button>
    </>
  );
}

export default withRouter(LoginButton);
