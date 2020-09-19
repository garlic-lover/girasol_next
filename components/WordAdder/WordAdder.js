import React, { useState, useContext } from "react";
import { store } from "../../store";
import styled, { keyframes } from "styled-components";

import { useMutation } from "@apollo/client";
import WORD_ADD from "../../GraphQl/Mutations/WORD_ADD";

import DS from "../../DS/DS";
import typeOptions from "./typeOptions.json";

export default function ({ close }) {
  const [word, wordChange] = useState("");
  const [trads, tradsChange] = useState([""]);
  const [type, typeSelect] = useState(0);
  const [gender, genderChange] = useState(0);
  const [tags, tagsChange] = useState([]);

  const [wordAdd] = useMutation(WORD_ADD, {
    onCompleted: (res) => {
      alert(res.wordAdd);
    },
  });

  let { state } = useContext(store);

  const genderOptions = [{ name: "f" }, { name: "m" }, { name: "n" }];

  return (
    <WordAdder>
      <CloseButton
        onClick={() => {
          close();
        }}
      >
        ✕
      </CloseButton>
      <Title>Add a word</Title>
      <Row>
        <div>
          <SubTitle>Word</SubTitle>
          <Input
            value={word}
            onChange={(ev) => {
              wordChange(ev.target.value);
            }}
          />
        </div>
        <TradBloc>
          <SubTitle>Trad</SubTitle>
          {trads.map((trad, index) => {
            if (index + 1 === trads.length) {
              return null;
            }
            return (
              <Trad key={index}>
                {trad}{" "}
                <DeleteTrad
                  role="img"
                  aria-label="delete trad"
                  onClick={() => {
                    let newTrads = [...trads];
                    newTrads.splice(index, 1);
                    tradsChange(newTrads);
                  }}
                >
                  🗑
                </DeleteTrad>
              </Trad>
            );
          })}
          <Input
            value={trads[trads.length - 1]}
            onChange={(ev) => {
              let newTrads = [...trads];
              newTrads[trads.length - 1] = ev.target.value;
              tradsChange(newTrads);
            }}
          />
          <MoreTrad
            onClick={() => {
              if (trads[trads.length - 1] !== "") {
                let newTrads = [...trads];
                newTrads.push("");
                tradsChange(newTrads);
              }
            }}
          >
            + Add a traduction
          </MoreTrad>
        </TradBloc>
      </Row>
      <SubTitle>Type</SubTitle>
      <DS.RadioButtons
        options={typeOptions}
        selection={type}
        select={(index) => {
          typeSelect(index);
        }}
        isVertical={false}
      />
      {type === 0 && (
        <div>
          <SubTitle>Gender</SubTitle>
          <DS.RadioButtons
            options={genderOptions}
            selection={gender}
            select={(index) => {
              genderChange(index);
            }}
            isVertical={false}
          />
        </div>
      )}
      <SubTitle>Tags</SubTitle>
      <TagsBloc>
        {tags.length === 0
          ? "There's no selectionned tag"
          : tags.map((tag, index) => {
              return <SelectedTag key={index}>{tag.name}</SelectedTag>;
            })}
      </TagsBloc>
      <Row>
        {state.tags.map((tag, index) => {
          let theTag = tags.findIndex((ev) => ev.name === tag.name);
          return (
            <Tag
              key={index}
              selected={theTag !== -1}
              onClick={() => {
                let newTags = [...tags];

                if (theTag === -1) {
                  newTags.push(tag);
                } else {
                  newTags.splice(theTag, 1);
                }
                tagsChange(newTags);
              }}
            >
              {theTag === -1 ? "+" : "-"} {tag.name}
            </Tag>
          );
        })}
      </Row>
      <ValidateButton>
        <DS.Button
          name="Validate"
          click={() => {
            let theTags = [];
            tags.map((tag) => {
              return theTags.push(tag._id);
            });
            wordAdd({
              variables: {
                word: {
                  lang: state.learnedLanguage,
                  type: typeOptions[type].name,
                  gender: type === 0 ? genderOptions[gender].name : null,
                  value: word,
                  trads: {
                    lang: state.myLanguage,
                    value: trads,
                  },
                  tags: theTags,
                },
              },
            });
            wordChange("");
            tradsChange([""]);
          }}
        />
      </ValidateButton>
    </WordAdder>
  );
}

const SlideIn = keyframes`
from{
    margin-right : -100%;
} to{
    margin-right : 0
}
`;

const WordAdder = styled.div`
  color: white;
  height: calc(100vh - 40px);
  overflow: auto;
  width: 40%;
  background-color: ${(props) => props.theme.color3};
  position: fixed;
  right: 0px;
  top: 0px;
  padding: 20px 20px;
  animation: ${SlideIn} 0.3s;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  color: white;
`;

const Title = styled.h2`
  margin: auto;
  margin-bottom: 20px;
`;

const SubTitle = styled.h3`
  margin: 16px 0px;
`;

const Input = styled.input`
  color: white;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TradBloc = styled.div`
  margin-left: 16px;
`;

const Trad = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 26px;
  margin-left: 6px;
`;

const DeleteTrad = styled.span`
  cursor: pointer;
`;

const MoreTrad = styled.div`
  margin-top: 12px;
  cursor: pointer;
  &:active {
    transform: translateY(1px);
  }
`;

const Tag = styled.div`
  margin-right: 12px;
  margin-bottom: 12px;
  padding: 6px 14px;
  border: solid 1px white;
  background-color: ${(props) => props.selected && "white"};
  color: ${(props) => props.selected && props.theme.color3};
  border-radius: 12px;
  cursor: pointer;
`;

const TagsBloc = styled.div`
  display: flex;
  padding: 6px;
  /*   border: solid 1px ${(props) =>
    props.theme.color2};
  border-radius: 4px; */
  margin-bottom: 12px;
`;

const SelectedTag = styled.p`
  margin-right: 12px;
`;

const ValidateButton = styled.div`
  margin-top: 12px;
`;
