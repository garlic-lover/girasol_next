import React, { useState } from "react";
import styled from "styled-components";

import { EditableMathField } from "react-mathquill";

export default function MC() {
  const [value, valueChange] = useState("1+1=11");

  return (
    <MathEx>
      <EditableMathField
        latex={value} // latex value for the input field
        onChange={(mathField) => {
          console.log(mathField.latex());
          valueChange(mathField.latex());
        }}
      />
    </MathEx>
  );
}

const MathEx = styled.div`
  display: flex;
  justify-content: center;
  & .mq-editable-field {
    margin-top: 24px;
  }
`;
