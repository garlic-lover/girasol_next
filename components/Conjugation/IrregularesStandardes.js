import React, { useState } from "react";
import styled from "styled-components";

import DS from "../../DS/DS";

export default function ({ verbType }) {
  const [selection, select] = useState(0);

  return (
    <Irregulares>
      <DescriptionBloc>
        Amet Lorem commodo excepteur voluptate nostrud anim fugiat et nulla
        commodo. Reprehenderit ut adipisicing officia consequat ex laborum
        excepteur. Incididunt elit eiusmod cupidatat in eiusmod aute amet sunt
        fugiat do veniam anim.
      </DescriptionBloc>
      <DescriptionBloc>
        Amet Lorem commodo excepteur voluptate nostrud anim fugiat et nulla
        commodo. Reprehenderit ut adipisicing officia consequat ex laborum
        excepteur. Incididunt elit eiusmod cupidatat in eiusmod aute amet sunt
        fugiat do veniam anim.
      </DescriptionBloc>
      <Row>
        <DS.SelectButtons
          options={[
            { name: "e → ie" },
            { name: "o → ue" },
            { name: "e → i" },
            { name: "i → y" },
            { name: "c → zc" },
          ]}
          selection={selection}
          select={(index) => {
            select(index);
          }}
        />
        <Input placeholder="verbe" />
      </Row>
    </Irregulares>
  );
}

const Irregulares = styled.div`
  margin-top: 12px;
  position: relative;
`;

const DescriptionBloc = styled.div`
  margin-bottom: 12px;
  line-height: 16px;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 12px;
  justify-content: space-between;
`;

const Input = styled.input``;
