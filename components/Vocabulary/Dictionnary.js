import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import WORDS_GET from "../../GraphQl/Queries/WORDS_GET";

import dicoFormater from "./functions/dicoFormater";

import DS from "../../DS/DS";

export default function Dico({
  state,
  page,
  tags,
  selectedTag,
  alphabet,
  selectedLetter,
}) {
  let [words, wordsLoad] = useState([{ Dictionnary: "loading" }]);

  const { loading, error, data } = useQuery(WORDS_GET, {
    variables: {
      lang: state.learnedLanguage,
      tag:
        page.index === 1
          ? {
              _id: tags[selectedTag]._id,
            }
          : { _id: undefined },
    },
  });

  useEffect(() => {
    if (data) {
      let words = dicoFormater(
        state.learnedLanguage,
        state.myLanguage,
        data.wordsGet,
        alphabet[selectedLetter]
      );
      wordsLoad(words);
    }
  }, [data, state, selectedLetter, alphabet]);

  if (loading) {
    return null;
  }
  if (error) {
    alert(error);
    return null;
  }
  return (
    <Dictionnary>
      <DS.Tab array={words} isHeader />
    </Dictionnary>
  );
}

const Dictionnary = styled.div`
  margin-top: 12px;
`;
