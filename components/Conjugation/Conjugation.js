import React, { useState, useContext } from "react";
import { store } from "../../store";
import styled from "styled-components";

import DS from "../../DS/DS";

import RegularesTab from "./RegularesTab";
import Irregulares from "./IrregularesStandardes";

const verbTypes = [{ name: "-ar" }, { name: "-er" }, { name: "-ir" }];

export default function () {
  const {
    state: { t },
  } = useContext(store);
  const [page, pageSelect] = useState({ part: "left", index: 0 });

  return (
    <Conjugation>
      <Title>{t("conj", "title")}</Title>
      <DS.TopBarMenu
        itemsLeft={verbTypes}
        itemsRight={[
          { name: "Irregulares standardes" },
          { name: "Irregulares unicos" },
        ]}
        selection={page}
        select={(selectedPage) => {
          pageSelect(selectedPage);
        }}
      />
      {page.part === "left" ? (
        <RegularesTab verbType={verbTypes[page.index].name} />
      ) : page.index === 0 ? (
        <Irregulares />
      ) : (
        ""
      )}
    </Conjugation>
  );
}

const Conjugation = styled.div``;

const Title = styled.h2`
  margin-bottom: 24px;
`;
