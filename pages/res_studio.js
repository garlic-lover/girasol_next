import { useState } from "react";
import styled from "styled-components";

import DS from "../DS/DS";

import ResourceBuilder from "../components/Resources/ResourceBuilder";

export default function RS() {
  const [page, pageSelect] = useState({ part: "left", index: 0 });

  return (
    <Resources>
      <h2>Ressources</h2>
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
