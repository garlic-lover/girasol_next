import React, { useContext } from "react";
import { store } from "../../../store";
import styled from "styled-components";

export default function ({
  exType,
  exTypeChange,
  exSelect,
  selectedEx,
  exChange,
  data,
  loading,
  error,
  onOffChange,
  isOn,
  course_id,
}) {
  const {
    state: { t },
  } = useContext(store);
  return (
    <Row>
      <div>
        <span>{t("stud", "exType")} </span>
        <select
          value={exType}
          onChange={(ev) => {
            exTypeChange(ev.target.value);
            exSelect("-");
          }}
        >
          <option value="holeText">Hole text</option>
          <option value="linkedProps">Linked props</option>
        </select>
      </div>
      <div>
        <span>Exercice : </span>
        <select
          value={selectedEx}
          onChange={(ev) => {
            let ex_id = ev.target.value;
            exSelect(ev.target.value);
            if (ex_id !== "") {
              exChange({
                variables: {
                  course_id: course_id,
                  ex_id: ex_id,
                  isOn: isOn,
                  type: exType,
                },
              });
            }
          }}
        >
          <option>-</option>
          {!loading &&
            !error &&
            data.exercicesGet.map((ex, index) => {
              if (ex.type !== exType) {
                return null;
              }
              return (
                <option value={ex._id} key={index}>
                  {ex.title} ({ex.type})
                </option>
              );
            })}
        </select>
      </div>
      <div>
        <ActivateButton
          onClick={() => {
            if (selectedEx !== "") {
              exChange({
                variables: {
                  course_id: course_id,
                  ex_id: selectedEx,
                  isOn: !isOn,
                  type: exType,
                },
              });
            }
            onOffChange(!isOn);
          }}
          selected={isOn}
        >
          Mode : {isOn ? "on" : "off"}
        </ActivateButton>
      </div>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  width: 70%;
  align-items: center;
  justify-content: space-between;
  & select {
    max-width: 100px;
  }
`;

const ActivateButton = styled.button`
  width : 75px;
  background-color: ${(props) =>
    props.selected ? props.theme.color2 : props.theme.color3};
  padding : 6px;
  border-radius: 3px;
  color: white;
  font-size: 13px;
  cursor: pointer;
  transition : 0.15s ease-in-out;
  box-shadow: 0 2px 6px #e5dbce,
    inset 0 10px 20px ${(props) => props.theme.color4};
  &:hover {
    background-color: ${(props) => props.theme.color2};
`;
