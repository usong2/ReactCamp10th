import React from "react";
import LoginButton from "../components/LoginButton";

export default function Login({ history }) {
  return (
    <div>
      <h2>Login</h2>
      <LoginButton history={history} />
    </div>
  );
}
