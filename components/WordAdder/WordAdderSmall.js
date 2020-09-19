import React, { useState } from "react";
import styled from "styled-components";

import WordAdder from "./WordAdder";

export default function () {
  const [isDisplayed, display] = useState(false);
  if (isDisplayed === false) {
    return (
      <WordAdderSmall
        onClick={() => {
          display(true);
        }}
      >
        <span role="img" aria-label="word adder small">
          ✒️
        </span>
      </WordAdderSmall>
    );
  } else {
    return (
      <WordAdder
        close={() => {
          display(false);
        }}
      />
    );
  }
}

const WordAdderSmall = styled.span`
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 24px;
`;
