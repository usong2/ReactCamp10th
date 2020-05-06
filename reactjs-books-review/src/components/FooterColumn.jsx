import React from "react";
import { StyledDiv, StyledTitle } from "./FooterColumn.style";
import { Col } from "antd";

const FooterColumn = ({ title, children }) => (
  <Col span={6}>
    <StyledDiv>
      <StyledTitle>{title}</StyledTitle>
      {children}
    </StyledDiv>
  </Col>
);

export default FooterColumn;
