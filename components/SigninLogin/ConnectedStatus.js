import React, { useContext } from "react";
import { store } from "../../store";
import styled from "styled-components";

import { useQuery } from "@apollo/client";

import CONNECT from "../../GraphQl/Queries/CONNECT";

const langOptions = ["es", "fr", "en"];

function getLocale() {
  if (!process.browser) {
    return "fr";
  }
  let browserLocales =
    navigator.languages === undefined
      ? [navigator.language]
      : navigator.languages;

  if (!browserLocales) {
    return undefined;
  }
  let splitted = browserLocales[0].split("-")[0];
  if (splitted === "en" || splitted === "fr" || splitted === "es") {
    return splitted;
  } else {
    return "es";
  }
}

export default function CS({ themes }) {
  let { state, dispatch } = useContext(store);
  getLocale();

  const { loading, error } = useQuery(CONNECT, {
    onCompleted: (ev) => {
      if (ev.connect.myLanguage) {
        dispatch({
          type: "connect",
          connectedStatus: true,
          myLanguage: ev.connect.myLanguage,
          learnedLanguage: ev.connect.learnedLanguage,
          firstName: ev.connect.firstName,
          lastName: ev.connect.lastName,
          isProf: ev.connect.isProf,
          courses: ev.connect.courses,
          students: ev.connect.students,
        });
      } else {
        dispatch({
          type: "connect",
          connectedStatus: false,
          myLanguage: getLocale(),
        });
      }
    },
  });
  if (loading) {
    return <ConnectedStatus>Loading</ConnectedStatus>;
  }
  if (error) {
    return <ConnectedStatus>Erreur de connexion au serveur</ConnectedStatus>;
  }
  return null;

  return (
    <ConnectedStatus>
      <UserName>
        Language :{" "}
        <span>
          <select
            value={state.myLanguage}
            onChange={(ev) => {
              dispatch({ type: "langChange", lang: ev.target.value });
            }}
          >
            {langOptions.map((lang, index) => {
              return (
                <option value={lang} key={index}>
                  {lang}
                </option>
              );
            })}
          </select>
        </span>
      </UserName>
      <UserName>
        Theme :{" "}
        <ThemeRow>
          {themes.map((theme, index) => {
            return (
              <Theme
                key={index}
                color={theme.color1}
                selected={index === state.themeIndex}
                onClick={() => {
                  dispatch({ type: "themeChange", themeIndex: index });
                }}
              />
            );
          })}
        </ThemeRow>
      </UserName>
    </ConnectedStatus>
  );
}

const ConnectedStatus = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  margin-bottom: 8px;
  width: 150px;
  display: flex;
  justify-content: space-between;
  & select {
    margin-left: 6px;
    padding: 3px;
  }
`;

const ThemeRow = styled.div`
  display: flex;
  width: 56px;
  justify-content: space-between;
  margin-right: 16px;
`;

const Theme = styled.span`
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;
