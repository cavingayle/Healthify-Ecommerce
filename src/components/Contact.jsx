import React, { useState } from "react";
import ContactEmail from "./ContactEmail";
import ContactTxt from "./ContactTxt";
import Toggle from "react-styled-toggle";
import { PageLayout } from "./PageLayout";
import styled from "styled-components";

function Contact() {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  console.log("TOGGLE", toggle);

  return (
    <PageLayout>
      <Title>Contact</Title>
      <ToggleWrapper>
        <Toggle
          onChange={handleToggle}
          width={40}
          height={20}
          sliderWidth={12}
          sliderHeight={12}
          translate={19}
          labelLeft="Email"
          labelRight="Text"
          backgroundColorChecked="#ccc"
        />
      </ToggleWrapper>

      {toggle === false ? <ContactEmail /> : <ContactTxt />}
    </PageLayout>
  );
}

export default Contact;

const ToggleWrapper = styled.div`
  margin-bottom: 1em;
  font-weight: 700;
`;

const Title = styled.h1`
  text-align: center;
  margin: 0.3em 0;
  font-size: 3em;
`;
