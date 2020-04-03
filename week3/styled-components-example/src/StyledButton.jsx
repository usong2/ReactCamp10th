import React from "react";
import styled, { css } from "styled-components";

// const MyButton = ({ className, children }) => (
//   <button className={className}>{children}</button>
// );
const MyButton = props => <button {...props} />;

const StyledButton = styled(MyButton)`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  :hover {
    background: palevioletred;
    color: #fff;
  }
`;

export default StyledButton;
