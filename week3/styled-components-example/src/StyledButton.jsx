import styled, { css } from "styled-components";

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

const PrimaryStyledButton = styled(StyledButton)`
  background: palevioletred;
  color: white;
`;
export { PrimaryStyledButton };

export default StyledButton;
