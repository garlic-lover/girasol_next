import React, { useState } from "react";
import styled from "styled-components";

import DS from "../../DS/DS";

import ResourceBuilder from "./ResourceBuilder";

export default function () {
  const [page, pageSelect] = useState({ part: "left", index: 0 });

  return (
    <Resources>
      <Title>Ressources</Title>
      <DS.TopBarMenu
        itemsLeft={[
          { name: "Créer une ressource" },
          { name: "Mes ressources" },
        ]}
        selection={page}
        select={(selectedPage) => {
          pageSelect(selectedPage);
        }}
      />
      {page.index === 0 && <ResourceBuilder />}
    </Resources>
  );
}

const Resources = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 24px;
`;
