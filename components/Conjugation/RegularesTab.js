import React, { useState } from "react";
import styled from "styled-components";

import DS from "../../DS/DS";
import conjugArrayGen from "./conjugArrayGen";
import radicalCheck from "./radicalCheck";

export default function ({ verbType }) {
  const [form, formChange] = useState("indicativo");
  const [radical, radicalChange] = useState("");

  let conjugArray = conjugArrayGen(
    verbType,
    form,
    radical !== "" && radicalCheck(radical, verbType) === true
      ? radical
          .split("")
          .splice(0, radical.length - 2)
          .join("")
      : ""
  );

  return (
    <RegularesTab>
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
      <Row bigRow>
        <Row>
          <Input
            placeholder="verbe"
            value={radical}
            onChange={(ev) => {
              radicalChange(ev.target.value);
            }}
          />
          {radical !== "" && radicalCheck(radical, verbType) === false && (
            <ErrorMessage role="img" aria-label="wrong verb type">
              ⚠ Erreur : veuillez entrer un verbe finissant en "{verbType}"
            </ErrorMessage>
          )}
        </Row>
        <FormSelect
          value={form}
          onChange={(ev) => {
            formChange(ev.target.value);
          }}
        >
          <option value="indicativo">Indicativo</option>
          <option value="subjonctivo">Subjonctivo</option>
        </FormSelect>
      </Row>
      <DS.Tab array={conjugArray} isHeader />
    </RegularesTab>
  );
}

const RegularesTab = styled.div`
  margin-top: 12px;
  position: relative;
`;

const DescriptionBloc = styled.div`
  margin-bottom: 12px;
  line-height: 16px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.bigRow && "12px"};
  justify-content: space-between;
`;

const FormSelect = styled.select``;

const Input = styled.input``;

const ErrorMessage = styled.p`
  color: red;
  font-size: 9px;
  margin-left: 6px;
`;
