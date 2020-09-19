import React from "react";
import styled from "styled-components";

import DS from "../../../DS/DS";

export default function SPI({
  email,
  emailChange,
  password,
  passwordChange,
  passwordConfirm,
  passwordConfirmChange,
  firstName,
  firstNameChange,
  lastName,
  lastNameChange,
}) {
  return (
    <Wrapper>
      <DS.Input value={email} change={emailChange} placeholder="email" />
      <DS.Input
        password
        value={password}
        change={passwordChange}
        placeholder="password"
      />
      <DS.Input
        password
        value={passwordConfirm}
        change={passwordConfirmChange}
        placeholder="password confirmation"
      />
      <DS.Input
        value={firstName}
        change={firstNameChange}
        placeholder="first name"
      />
      <DS.Input
        value={lastName}
        change={lastNameChange}
        placeholder="last name"
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 240px;
`;
