import { useState } from "react";
import styled from "styled-components";

import { useMutation } from "@apollo/client";
import LINKED_PROPS_ADD from "../../../../GraphQl/Mutations/LINKED_PROPS_ADD";

import DS from "../../../../DS/DS";

export default function LPC({ words, wordsChange, title, description }) {
  const [input1, input1Change] = useState("");
  const [input2, input2Change] = useState("");

  const [exUpload] = useMutation(LINKED_PROPS_ADD, {
    onCompleted: (res) => {
      console.log(res);
      if (res.linkedPropsAdd === "victory") {
        alert("Exercice ajouté");
      } else {
        alert("Problème d'ajout de l'exercice");
      }
    },
  });

  return (
    <LinkedPropsCreator>
      <Wrapper>
        <AddRow
          onSubmit={(ev) => {
            ev.preventDefault();
            if (input1 !== "" && input2 !== "") {
              let newTab = [...words];
              newTab.push({ proposition: input1, solution: input2 });
              wordsChange(newTab);
              input1Change("");
              input2Change("");
            }
          }}
        >
          <DS.Input
            placeholder="Proposition"
            value={input1}
            change={(value) => {
              input1Change(value);
            }}
          />
          <DS.Input
            placeholder="Solution"
            value={input2}
            change={(value) => {
              input2Change(value);
            }}
          />
          <AddButton type="submit">
            <span role="img" aria-label="add a pair">
              ➕
            </span>
          </AddButton>
        </AddRow>
        {words.map((word, index) => {
          return (
            <Row key={index}>
              <div>{word.proposition}</div>
              <div>{word.solution}</div>
              <span
                role="img"
                aria-label="delete a pair"
                onClick={() => {
                  let newTab = [...words];
                  newTab.splice(index, 1);
                  wordsChange(newTab);
                }}
              >
                🗑
              </span>
            </Row>
          );
        })}
      </Wrapper>
      <SubmitButton>
        <DS.Button
          name="Valider"
          click={() => {
            exUpload({
              variables: {
                title: title,
                description: description,
                words: words,
              },
            });
          }}
        />
      </SubmitButton>
    </LinkedPropsCreator>
  );
}

const LinkedPropsCreator = styled.div`
  margin: auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 12px 12px 12px;
  background-color: ${(props) => props.theme.color5};
  border-radius: 4px;
`;

const Wrapper = styled.div`
  width: 90%;
  background-color: white;
  padding: 24px 12px;
  border-radius: 4px;
`;

const AddRow = styled.form`
  display: flex;
  margin-top: 12px;
  width: 100%;
  justify-content: center;
  & div {
    width: 35%;
    margin-right: 48px;
  }
`;

const Row = styled.form`
  display: flex;
  margin-top: 12px;
  margin-bottom: 6px;
  width: 100%;
  justify-content: center;
  & div {
    width: 35%;
    margin-right: 48px;
    padding-bottom: 3px;
    border-bottom: solid 1px;
  }

  & span {
    margin-top: 6px;
    cursor: pointer;
  }
  & span:hover {
    transform: translateY(1px);
  }
  & span:active {
    transform: translateY(2px);
  }
`;

const AddButton = styled.button`
  cursor: pointer;
  margin-bottom: 12px;
  &:hover {
    transform: translateY(1px);
  }
  &:active {
    transform: translateY(2px);
  }
`;

const SubmitButton = styled.div`
  width: calc(90% + 24px);
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;
