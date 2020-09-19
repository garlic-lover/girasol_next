import React, { useContext } from "react";
import { store } from "../../../store";
import styled from "styled-components";

export default function () {
  const {
    state: { t },
  } = useContext(store);
  return (
    <Row>
      <span>{t("stud", "ressourceType")} : </span>
      <select>
        <option>Live Math</option>
        <option>Saved ressources</option>
      </select>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
`;
