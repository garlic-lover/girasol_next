import React from "react";
import styled from "styled-components";

export default function ({ alphabet, selectedLetter, letterSelect }) {
  return (
    <Row>
      {alphabet.map((letter, index) => {
        return (
          <LetterWrapper key={index}>
            <Letter
              selected={selectedLetter === index}
              onClick={() => {
                letterSelect(index);
              }}
            >
              {letter}
            </Letter>
          </LetterWrapper>
        );
      })}
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 12px;
  justify-content: space-between;
`;

const LetterWrapper = styled.div`
  flex: 1;
`;

const Letter = styled.p`
  width: 12px;
  cursor: pointer;
  color: ${(props) =>
    props.selected ? props.theme.color1 : props.theme.color2};
  font-size: ${(props) => props.selected && "16px"};
`;
