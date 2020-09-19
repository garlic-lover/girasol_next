import styled from "styled-components";
import DS from "../../../../DS/DS";

import holeTextEvaluate from "./holeTextEvaluate";

export default function HTE({
  responseDisplayed,
  displayResponses,
  score,
  scoreChange,
  parsedText,
  selectedWords,
  responseChange,
}) {
  return (
    <HoleTextEx>
      {responseDisplayed === true && (
        <Score>
          {score} / {selectedWords.length}
        </Score>
      )}
      <Wrapper>
        <TextSpace>
          {parsedText.map((line, theIndex) => {
            return (
              <ParsedLine key={theIndex}>
                {line.map((word, index) => {
                  let isHidden = selectedWords.findIndex(
                    (val) => val.index === `${theIndex}-${index}`
                  );
                  if (isHidden === -1) {
                    return <Word key={index}>{word}</Word>;
                  } else {
                    let resEval = false;
                    if (
                      selectedWords[isHidden].word.toLowerCase() ===
                      selectedWords[isHidden].response.toLowerCase()
                    ) {
                      resEval = true;
                    }
                    return (
                      <ResponseWrapper key={index}>
                        {responseDisplayed === false ? (
                          <Input
                            value={selectedWords[isHidden].response}
                            onChange={(ev) => {
                              let newTab = [...selectedWords];
                              selectedWords[isHidden].response =
                                ev.target.value;
                              responseChange(newTab);
                            }}
                          />
                        ) : (
                          <Input
                            value={selectedWords[isHidden].response}
                            isGood={resEval === true ? "true" : "false"}
                            onChange={() => {}}
                          />
                        )}
                        {selectedWords[isHidden].tip &&
                          selectedWords[isHidden].tip.length > 0 && (
                            <Hint>({selectedWords[isHidden].tip})</Hint>
                          )}
                      </ResponseWrapper>
                    );
                  }
                })}
              </ParsedLine>
            );
          })}
        </TextSpace>
        <SubmitButton>
          <DS.Button
            name={
              responseDisplayed === false
                ? "Valider mes réponses"
                : "Ré-essayer"
            }
            click={() => {
              scoreChange(holeTextEvaluate(selectedWords));
              displayResponses(!responseDisplayed);
            }}
          />
        </SubmitButton>
      </Wrapper>
    </HoleTextEx>
  );
}

const HoleTextEx = styled.div`
  position: relative;
`;

const Score = styled.div`
  position: absolute;
  top: -20px;
  right: 0px;
`;

const Wrapper = styled.div`
  width: calc(100%-40px);
  padding: 16px 20px 8px 16px;
  background-color: ${(props) => props.theme.color5};
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 8px 8px 16px hsla(30, 21%, 81%, 0.15);
  position: relative;
`;

const TextSpace = styled.div`
  min-height: 70px;
  padding: 12px;
  background-color: white;
  border-radius: 4px;
`;

const ParsedLine = styled.div`
  display: flex;
  border: none;
  flex-wrap: wrap;
  line-height: 23px;
`;

const Word = styled.div`
  position: relative;
  font-size: 14px;
  color: ${(props) => props.selected && "green"};
  padding-right: 3.5px;
  margin-left: ${(props) => props.isPonct === true && "-3.5px"};
  cursor: pointer;
  font-weight: ${(props) => props.selected && "bold"};
  &:hover {
    font-weight: ${(props) => props.isPonct === false && "bold"};
  }
  & p {
    visibility: hidden;
  }
  &:hover p {
    visibility: visible;
  }
`;

const ResponseWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  border: inherit;
  padding: inherit;
  border-bottom: solid 1px ${(props) => props.theme.color1};
  border-radius: inherit;
  font-size: 14px;
  text-align: center;
  margin-right: 3.5px;
  border-color: ${(props) =>
    props.isGood === "true" ? "green" : props.isGood === "false" ? "red" : ""};
  color: ${(props) =>
    props.isGood === "true" ? "green" : props.isGood === "false" ? "red" : ""};
  text-decoration: ${(props) => props.isGood === "false" && "line-through"};
`;

const Hint = styled.span`
  color: orange;
  font-size: 14px;
  margin-right: 3.5px;
`;

const SubmitButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;
