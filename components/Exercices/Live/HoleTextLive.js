import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useQuery, useMutation, useSubscription } from "@apollo/client";
import HOLE_TEXT_GET from "../../../GraphQl/Queries/HOLE_TEXT_GET";
import LIVE_HOLE_TEXT_RESPOND from "../../../GraphQl/Mutations/LIVE_HOLE_TEXT_RESPOND";
import LIVE_HOLE_TEXT_GET from "../../../GraphQl/Subscriptions/LIVE_HOLE_TEXT_GET";

import HoleTextEx from "../../Exercices/Creator/HoleText/HoleTextEx";
import omitTypename from "./omitTypeName";

function Live({ exData, course_id, ex_id }) {
  const [holes, holesChange] = useState(null);
  const [id, idChange] = useState(null);
  const { error } = useSubscription(LIVE_HOLE_TEXT_GET, {
    variables: { course_id: course_id },
    onSubscriptionData: (ev) => {
      console.log(ev);
      let holes = JSON.parse(
        JSON.stringify(ev.subscriptionData.data.liveHoleTextGet.holes),
        omitTypename
      );
      holesChange(holes);
    },
  });
  const [responseDisplayed, displayResponses] = useState(false);
  const [score, scoreChange] = useState(0);
  const [liveModify] = useMutation(LIVE_HOLE_TEXT_RESPOND);

  const handleUserKeyPress = (event) => {
    if (event.key === "Enter") {
      liveModify({
        variables: {
          course_id: course_id,
          holes: holes,
        },
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  });

  if (ex_id !== id) {
    holesChange(JSON.parse(JSON.stringify(exData.holes), omitTypename));
    idChange(ex_id);
    return null;
  }

  if (error) {
    console.log(error);
  }

  const { parsedText, title, description } = exData;
  return (
    <LiveEx>
      <Title>{title ? title : "No title"}</Title>
      <Description>{description ? description : "No description"}</Description>
      <LiveExExplain>
        Pour partager vos réponses,{" "}
        <span
          onClick={() => {
            liveModify({
              variables: {
                course_id: course_id,
                holes: holes,
              },
            });
          }}
        >
          cliquez ici{" "}
        </span>{" "}
        ou appuyez sur la touche <span>⏎</span>
      </LiveExExplain>
      <Wrapper>
        <HoleTextEx
          responseDisplayed={responseDisplayed}
          displayResponses={displayResponses}
          score={score}
          scoreChange={scoreChange}
          parsedText={parsedText}
          selectedWords={holes}
          responseChange={(value) => {
            holesChange(value);
          }}
        />
      </Wrapper>
    </LiveEx>
  );
}

export default function ({ course_id, ex_id }) {
  const { loading, error, data } = useQuery(HOLE_TEXT_GET, {
    variables: { ex_id: ex_id },
  });
  if (loading) {
    return "Loading";
  }
  if (error) {
    return console.log(error);
  }
  return <Live exData={data.holeTextGet} course_id={course_id} />;
}

const LiveEx = styled.div`
  position: relative;
`;

const Title = styled.h3`
  margin-top: 12px;
  margin-bottom: 6px;
`;

const Description = styled.div`
  margin-bottom: 6px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const LiveExExplain = styled.div`
  width: 100%;
  text-align: center;
  font-size: 0.8em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
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
