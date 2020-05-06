import React from "react";
import { StyledAnchor } from "./FooterColumnAnchor.style";

const FooterColumnAnchor = ({ href, children }) => (
  <div
    style={{
      paddingTop: 3,
      paddingBottom: 3,
    }}
  >
    <StyledAnchor href={href} target="_BLANK">
      {children}
    </StyledAnchor>
  </div>
);

export default FooterColumnAnchor;
