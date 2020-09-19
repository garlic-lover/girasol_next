import React, { useState } from "react";
import styled from "styled-components";
import Timer from "../../Timer";

import DS from "../../../../DS/DS";

import RegularesEx from "./RegularesEx";
import regularExGen from "./regularExGen";

const options = ["Regular", "Exercice 2"];

export default function () {
  const [selectedEx, exSelect] = useState(0);
  const [timer, timerChange] = useState(null);
  const [exOn, exStart] = useState(false);

  const [exVerbs, exVerbsChange] = useState([""]);
  const [exTab, exTabLoad] = useState([]);

  return (
    <ConjugEx>
      {timer && <Timer timer={timer} timerChange={timerChange} />}
      <Row>
        <select
          value={selectedEx}
          onChange={(ev) => {
            exSelect(ev.target.value);
          }}
        >
          {options.map((option, index) => {
            return (
              <option value={index} key={index}>
                {option}
              </option>
            );
          })}
        </select>
      </Row>
      {exOn === false ? (
        <ExBloc
          onSubmit={(ev) => {
            ev.preventDefault();
            timerChange(1);
            exStart(true);
            exTabLoad(regularExGen(exVerbs));
          }}
        >
          <VerbInputBloc>
            {exVerbs.map((verb, index) => {
              if (index === exVerbs.length - 1) {
                return null;
              }
              return (
                <Verb key={index}>
                  {verb}{" "}
                  <DeleteVerb
                    role="img"
                    aria-label="delete Verb"
                    onClick={() => {
                      let newTab = [...exVerbs];
                      newTab.splice(index, 1);
                      exVerbsChange(newTab);
                    }}
                  >
                    🗑
                  </DeleteVerb>
                </Verb>
              );
            })}
            <VerbInput
              placeholder="Verbe de l'exercice"
              value={exVerbs[exVerbs.length - 1]}
              onChange={(ev) => {
                let newTab = [...exVerbs];
                newTab[exVerbs.length - 1] = ev.target.value;
                exVerbsChange(newTab);
              }}
            />
            <MoreVerbs
              onClick={() => {
                if (exVerbs[exVerbs.length - 1] !== "") {
                  let newexVerbs = [...exVerbs];
                  newexVerbs.push("");
                  exVerbsChange(newexVerbs);
                }
              }}
            >
              + Add a verb
            </MoreVerbs>
          </VerbInputBloc>
          <div>
            <DS.Button name="Start exercice" submit click={() => {}} />
          </div>
        </ExBloc>
      ) : (
        timer === null && (
          <RegularesEx
            exVerbs={exTab}
            finish={() => {
              exStart(false);
            }}
          />
        )
      )}
    </ConjugEx>
  );
}

const ConjugEx = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const ExBloc = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const VerbInputBloc = styled.div`
  margin-right: 24px;
`;

const VerbInput = styled.input``;

const MoreVerbs = styled.div`
  margin-top: 12px;
  cursor: pointer;
  &:active {
    transform: translateY(1px);
  }
`;

const Verb = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 26px;
  margin-left: 6px;
`;

const DeleteVerb = styled.span`
  cursor: pointer;
`;
