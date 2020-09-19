import React from "react";
import styled from "styled-components";

import DS from "../../../DS/DS";

const languages = [
  { label: "Spanish", value: "es" },
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
];

function LangOptions({ title, value, change }) {
  return (
    <SelectBloc>
      <Title>{title}</Title>
      <Select
        value={value}
        onChange={(ev) => {
          change(ev.target.value);
        }}
      >
        {languages.map((lang, index) => {
          return (
            <option key={index} value={lang.value}>
              {lang.label}
            </option>
          );
        })}
      </Select>
    </SelectBloc>
  );
}

export default function SCI({
  isProf,
  myLanguage,
  myLanguageChange,
  learnedLanguage,
  learnedLanguageChange,
  courseName,
  courseNameChange,
  code,
  codeChange,
}) {
  return (
    <Wrapper>
      {isProf ? (
        <DS.Input
          value={courseName}
          change={courseNameChange}
          placeholder="Nom de mon cours"
        />
      ) : (
        <DS.Input value={code} change={codeChange} placeholder="Course code" />
      )}
      <SelectRow>
        <LangOptions
          title="My language"
          value={myLanguage}
          change={myLanguageChange}
        />
        <LangOptions
          title="Learned language"
          value={learnedLanguage}
          change={learnedLanguageChange}
        />
      </SelectRow>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SelectRow = styled.div`
  display: flex;
  width: 100%;
  margin-top: 24px;
`;

const SelectBloc = styled.div`
  flex: 1;
  /*   display: flex;
  flex-direction: column;
  align-items: center; */
`;

const Title = styled.h5`
  margin-bottom: 18px;
`;

const Select = styled.select`
  margin-bottom: 12px;
  padding: 6px;
`;
