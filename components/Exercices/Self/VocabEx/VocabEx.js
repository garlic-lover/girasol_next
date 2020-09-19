import React, { useState } from "react";
import styled from "styled-components";

const options = ["Exercice 1", "Exercice 2"];

export default function () {
  const [selectedEx, exSelect] = useState(0);
  return (
    <VocabEx>
      <Row>
        <select
          value={selectedEx}
          onChange={(ev) => {
            exSelect(ev.target.value);
          }}
        >
          {options.map((option, index) => {
            return (
              <option value={index} key={index}>
                {option}
              </option>
            );
          })}
        </select>
      </Row>
    </VocabEx>
  );
}

const VocabEx = styled.div``;

const Row = styled.div`
  display: flex;
  margin-bottom: 12px;
`;
