import React from "react";
import { StyledImg } from "./FooterSocialLink.style";

const FooterSocialLink = ({ href, src, alt }) => (
  <a href={href} target="_BLANK" rel="noopener noreferrer">
    <StyledImg src={src} alt={alt} />
  </a>
);

export default FooterSocialLink;
