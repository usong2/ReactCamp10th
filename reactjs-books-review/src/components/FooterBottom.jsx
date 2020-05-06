import React from "react";
import {
  StyledCopyrightDiv,
  StyledFacebookDiv,
  StyledLinkedInDiv,
} from "./FooterBottom.style";

import FooterSocialLink from "./FooterSocialLink";
import facebook from "../images/footer_facebook.png";
import linkedin from "../images/footer_linkedin.png";

const FooterBottom = () => (
  <div
    style={{
      height: 60,
      marginTop: 30,
      overflow: "hidden",
    }}
  >
    <StyledCopyrightDiv>© 2020 USONGBOOK RIGHTS RESERVED.</StyledCopyrightDiv>
    <StyledFacebookDiv>
      <FooterSocialLink
        href="https://www.facebook.com/2woongjae"
        src={facebook}
        alt="Facebook"
      />
    </StyledFacebookDiv>
    <StyledLinkedInDiv>
      <FooterSocialLink
        href="https://www.linkedin.com/in/2woongjae"
        src={linkedin}
        alt="LinkedIn"
      />
    </StyledLinkedInDiv>
  </div>
);

export default FooterBottom;
