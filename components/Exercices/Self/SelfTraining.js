import React, { useState, useContext } from "react";
import { store } from "../../../store";
import styled from "styled-components";

import DS from "../../../DS/DS";
import ConjugEx from "./ConjugEx/ConjugEx";
import VocabEx from "./VocabEx/VocabEx";

export default function () {
  const {
    state: { t },
  } = useContext(store);
  const [page, select] = useState({ part: "left", index: 0 });
  return (
    <Exercices>
      <Title>{t("self", "title")}</Title>
      <Menu>
        <DS.TopBarMenu
          itemsLeft={[{ name: t("self", "voc") }, { name: t("self", "verbs") }]}
          selection={page}
          select={(page) => {
            select(page);
          }}
        />
      </Menu>
      {page.index === 0 && <VocabEx />}
      {page.index === 1 && <ConjugEx />}
    </Exercices>
  );
}

const Exercices = styled.div``;

const Title = styled.h2`
  margin-bottom: 24px;
`;

const Menu = styled.div`
  margin-bottom: 12px;
`;
