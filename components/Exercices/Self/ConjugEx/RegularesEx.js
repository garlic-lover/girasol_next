import React, { useState } from "react";
import styled from "styled-components";

import DS from "../../../../DS/DS";
import evaluateFunction from "./evaluate";

export default function ({ exVerbs, finish }) {
  const [qIndex, qIndexChange] = useState(0);
  const [response, responseChange] = useState("");
  const [responseDisplay, responseDisplayChange] = useState(false);
  const [isGood, evaluate] = useState(null);
  const [score, scoreChange] = useState(0);

  let question = exVerbs[qIndex];
  console.log(question);

  return (
    <RegularesEx>
      <Row justify>
        <div>
          <ExVerb>{question.verb}</ExVerb>
          <ExTiempo>
            {question.verbForm} del {question.verbFamily}
          </ExTiempo>
        </div>
        <Score>
          Score : {score} / {responseDisplay === true ? qIndex + 1 : qIndex}
        </Score>
      </Row>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          if (responseDisplay === false) {
            responseDisplayChange(true);
            let isGood = evaluateFunction(question, response);
            evaluate(isGood);
            if (isGood === true) {
              scoreChange(score + 1);
            }
          } else {
            if (qIndex === exVerbs.length - 1) {
              finish();
            } else {
              qIndexChange(qIndex + 1);
              responseDisplayChange(false);
              responseChange("");
            }
          }
        }}
      >
        <Row align>
          <p>{question.person}</p>
          {responseDisplay === false ? (
            <Input
              placeholder="Response"
              value={response}
              onChange={(ev) => {
                responseChange(ev.target.value);
              }}
            />
          ) : (
            <Response isGood={isGood}>
              {question.radical + question.solution}
            </Response>
          )}
          <Button>
            <DS.Button
              name={responseDisplay ? "Next question" : "Validate"}
              click={() => {}}
              submit
            />
          </Button>
        </Row>
      </form>
    </RegularesEx>
  );
}

const RegularesEx = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 100px;
`;

const Score = styled.h5`
  margin-top: 4px;
`;

const Row = styled.div`
  display: flex;
  align-items: ${(props) => props.align && "center"};
  justify-content: ${(props) => props.justify && "space-between"};
`;

const Input = styled.input`
  margin: 0px 12px;
  width: 72px;
`;

const Response = styled.p`
  margin: 0px 12px;
  width: 72px;
  padding: 8px 16px;
  color: ${(props) => (props.isGood ? "green" : "red")};
  border-bottom: solid 1px ${(props) => (props.isGood ? "green" : "red")};
`;

const ExVerb = styled.h3`
  margin-bottom: 6px;
`;

const ExTiempo = styled.h4`
  margin-bottom: 12px;
`;

const Button = styled.div`
  width: 100px;
`;
