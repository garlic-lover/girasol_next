import React, { useState, useContext } from "react";
import { store } from "../../store";
import styled from "styled-components";

import DS from "../../DS/DS";
import AlphabetRow from "./AlphabetRow";
import TagsRow from "./TagsRow";
import Dictionnary from "./Dictionnary";

import alphabet from "./alphabet.json";

function Vocabulary({ page, selectedLetter, letterSelect, state, tags }) {
  const [selectedTag, tagSelect] = useState(0);
  return (
    <Page>
      {page.index === 0 && (
        <AlphabetRow
          alphabet={alphabet}
          selectedLetter={selectedLetter}
          letterSelect={letterSelect}
        />
      )}
      {page.index === 1 && (
        <TagsRow tags={tags} selectedTag={selectedTag} tagSelect={tagSelect} />
      )}
      <Dictionnary
        state={state}
        page={page}
        tags={tags}
        selectedTag={selectedTag}
        alphabet={alphabet}
        selectedLetter={selectedLetter}
      />
    </Page>
  );
}

export default function () {
  let { state } = useContext(store);
  const [page, pageSelect] = useState({ part: "left", index: 0 });
  let [selectedLetter, letterSelect] = useState(0);

  return (
    <Page>
      <Title>{state.t("voc", "title")}</Title>
      <DS.TopBarMenu
        itemsLeft={[
          { name: state.t("voc", "dicionnary") },
          { name: state.t("voc", "perTag") },
          { name: state.t("voc", "myLists") },
        ]}
        selection={page}
        select={async (selectedPage) => {
          await pageSelect(selectedPage);
          if (selectedPage.index === 1) {
            await letterSelect(null);
          } else if (selectedPage.index === 0) {
            await letterSelect(0);
          }
        }}
      />
      <Vocabulary
        page={page}
        pageSelect={pageSelect}
        selectedLetter={selectedLetter}
        letterSelect={letterSelect}
        state={state}
        tags={state.tags}
      />
    </Page>
  );
}

const Page = styled.div``;

const Title = styled.h2`
  margin-bottom: 24px;
`;
