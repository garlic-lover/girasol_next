import React, { useState, useEffect } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { EditableMathField } from "react-mathquill";
import styled from "styled-components";

import LIVE_MATH_CHANGE from "../../../GraphQl/Mutations/LIVE_MATH_CHANGE";
import LIVE_MATH_GET from "../../../GraphQl/Subscriptions/LIVE_MATH_GET";

import omitTypename from "../../Exercices/Live/omitTypeName";

export default function ({ course_id, mathString }) {
  const [value, valueChange] = useState("");
  const [liveChange] = useMutation(LIVE_MATH_CHANGE);

  useEffect(() => {
    if (mathString) {
      valueChange(mathString);
    }
  }, [mathString]);

  const handleUserKeyPress = (event) => {
    if (event.key === "Enter") {
      liveChange({ variables: { course_id: course_id, string: value } });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  });

  const { error } = useSubscription(LIVE_MATH_GET, {
    variables: { course_id: course_id },
    onSubscriptionData: (ev) => {
      let newString = JSON.parse(
        JSON.stringify(ev.subscriptionData.data.liveMathGet),
        omitTypename
      );
      valueChange(newString);
    },
  });

  if (error) {
    return error;
  }

  return (
    <Wrapper>
      <LiveExExplain>
        Pour mettre à jour vos réponses,{" "}
        <span
          onClick={() => {
            liveChange({ variables: { course_id: course_id, string: value } });
          }}
        >
          {" "}
          cliquez ici{" "}
        </span>{" "}
        ou appuyez sur la touche <span>⏎</span>
      </LiveExExplain>
      <EditableMathField
        latex={value}
        onChange={(mathField) => {
          valueChange(mathField.latex());
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & .mq-editable-field {
  }
`;

const LiveExExplain = styled.div`
  width: 100%;
  text-align: center;
  font-size: 0.8em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  margin-bottom: 36px;
  position: relative;
  & span:first-child {
    padding: 1px 0px;
    cursor: pointer;
    border-bottom: solid 1px;
    position: relative;
    margin-right: 3px;
    top: 1px;
  }
  & span:first-child:hover {
    transform: translateY(1px);
  }
  & span:last-child {
    font-size: 1.8em;
    margin-left: 3px;
  }
`;
