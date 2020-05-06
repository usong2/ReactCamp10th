import React from "react";
import { StyledDiv, StyledLink } from "./FooterColumnLink.style";

const FooterColumnLink = ({ to, children }) => (
  <StyledDiv>
    <StyledLink to={to}>{children}</StyledLink>
  </StyledDiv>
);

export default FooterColumnLink;
