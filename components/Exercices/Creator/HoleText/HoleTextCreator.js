import { useState } from "react";
import { useMutation } from "@apollo/client";

import HOLE_TEXT_ADD from "../../../../GraphQl/Mutations/HOLE_TEXT_ADD";

import styled from "styled-components";

import DS from "../../../../DS/DS";

import parser from "./parser";

export default function HTC({
  textValidated,
  validate,
  parsedText,
  parsedLoad,
  selectedWords,
  wordSelect,
  title,
  description,
}) {
  const [text, textChange] = useState(
    "You can use the CSS3 resize property, to remove or turn-off the default horizontal and vertical, resizable property of the HTML <textarea> element. This property will also hide the resizing handle at the bottom-right corner of the textarea. "
  );

  const [exAdd] = useMutation(HOLE_TEXT_ADD, {
    variables: {
      title: title,
      description: description,
      parsedText: parsedText,
      holes: selectedWords,
    },
    onCompleted: (res) => {
      console.log(res);
      if (res.holeTextAdd === "victory") {
        alert("Exercice ajouté");
      } else {
        alert("Problème d'ajout de l'exercice");
      }
    },
  });

  let reg = /[.,?!;:()]/;

  return (
    <Holetext>
      {textValidated === false ? (
        <DS.TextArea
          placeholder="Enter a text of paste it here"
          value={text}
          change={textChange}
          submitButton={{
            name: "Next →",
            function: () => {
              validate(true);
              let parsedString = parser(text);
              parsedLoad(parsedString);
            },
          }}
        />
      ) : (
        <Wrapper>
          <ParsedText>
            {parsedText.map((line, theIndex) => {
              return (
                <ParsedLine key={theIndex}>
                  {line.map((word, index) => {
                    let exists = selectedWords.findIndex(
                      (val) => val.index === `${theIndex}-${index}`
                    );
                    let isPonct = reg.test(word);
                    return (
                      <Word
                        key={index}
                        isPonct={isPonct}
                        selected={exists !== -1}
                        onClick={() => {
                          if (isPonct) {
                            return;
                          }
                          let newTab = [...selectedWords];
                          if (exists === -1) {
                            newTab.push({
                              word: word,
                              tip: null,
                              index: `${theIndex}-${index}`,
                              response: "",
                            });
                          } else {
                            newTab.splice(exists, 1);
                          }
                          wordSelect(newTab);
                        }}
                      >
                        <MainWord>
                          {word}
                          {exists !== -1 && (
                            <HintWrapper
                              onClick={(ev) => {
                                ev.stopPropagation();
                              }}
                            >
                              <HintIcon
                                onClick={(ev) => {
                                  ev.stopPropagation();
                                  let newTab = [...selectedWords];
                                  if (newTab[exists].tip === null) {
                                    newTab[exists].tip = "";
                                  } else {
                                    newTab[exists].tip = null;
                                  }
                                  wordSelect(newTab);
                                }}
                              >
                                <span role="img" aria-label="indice">
                                  💡
                                </span>
                              </HintIcon>
                              {exists !== -1 &&
                                selectedWords[exists].tip !== null && (
                                  <HintInput
                                    placeholder="indice"
                                    onClick={(ev) => {
                                      ev.stopPropagation();
                                    }}
                                    value={selectedWords[exists].tip}
                                    onChange={(ev) => {
                                      let newTab = [...selectedWords];
                                      newTab[exists].tip = ev.target.value;
                                      wordSelect(newTab);
                                    }}
                                  />
                                )}
                            </HintWrapper>
                          )}{" "}
                        </MainWord>
                        {exists !== -1 &&
                          selectedWords[exists].tip !== null &&
                          selectedWords[exists].tip !== "" && (
                            <Hint
                              onClick={(ev) => {
                                ev.stopPropagation();
                              }}
                            >
                              ({selectedWords[exists].tip})
                            </Hint>
                          )}
                      </Word>
                    );
                  })}
                </ParsedLine>
              );
            })}
          </ParsedText>
          <SubmitButton>
            <DS.Button
              name="Validate"
              click={() => {
                exAdd();
              }}
            />
          </SubmitButton>
        </Wrapper>
      )}
    </Holetext>
  );
}

const Holetext = styled.div``;

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

const ParsedText = styled.div`
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

const MainWord = styled.span`
  position: relative;
`;

const Hint = styled.span`
  color: orange;
`;

const HintInput = styled.input`
  border: inherit;
  width: inherit;
  min-width: 24px;
  margin-left: 6px;
  background-color: ${(props) => props.theme.color4};
`;

const HintWrapper = styled.p`
  position: absolute;
  top: -32px;
  right: -200px;
  width: 200px;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const HintIcon = styled.span`
  font-size: 20px;
  cursor: pointer;
  background-color: ${(props) => props.theme.color4};
  padding: 3px;
  border-radius: 50%;
  z-index: 100;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:active {
    top: -19px;
  }
`;

const SubmitButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;
