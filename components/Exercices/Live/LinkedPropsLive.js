import React, { useState, useEffect } from "react";
import styled from "styled-components";

import randomizeWords from "../Creator/LinkedProps/randomizeWords";

import { useQuery, useMutation, useSubscription } from "@apollo/client";
import LINKED_PROPS_GET from "../../../GraphQl/Queries/LINKED_PROPS_GET";
import RANDOMED_LINKED_PROPS_GET from "../../../GraphQl/Queries/RANDOMED_LINKED_PROPS_GET";
import LIVE_LINKED_PROPS_RESPOND from "../../../GraphQl/Mutations/LIVE_LINKED_PROPS_RESPOND";
import LIVE_LINKED_PROPS_GET from "../../../GraphQl/Subscriptions/LIVE_LINKED_PROPS_GET";

import LinkedPropsEx from "../../Exercices/Creator/LinkedProps/LinkedPropsEx";
import omitTypename from "./omitTypeName";

function Live({ course_id, exSend }) {
  const [theWords, theWordsChange] = useState(null);
  const { error, loading, data } = useSubscription(LIVE_LINKED_PROPS_GET, {
    variables: { course_id: course_id },
  });
  console.log(data, error, loading);

  useEffect(() => {
    if (!theWords && data) {
      const cleanedLeft = JSON.parse(
        JSON.stringify(data.liveLinkedPropsGet.theWordsLeft),
        omitTypename
      );
      const cleanedRight = JSON.parse(
        JSON.stringify(data.liveLinkedPropsGet.theWordsRight),
        omitTypename
      );
      theWordsChange({
        leftTab: cleanedLeft,
        rightTab: cleanedRight,
      });
    }
  }, [theWords, data]);

  if (error) {
    console.log(error);
    return "Error";
  }

  return (
    <LiveEx>
      <Wrapper>
        {theWords && (
          <LinkedPropsEx
            theWords={theWords}
            links={JSON.parse(
              JSON.stringify(data.liveLinkedPropsGet.links),
              omitTypename
            )}
            linksChange={(value) => {
              console.log(value);
              exSend({
                variables: {
                  course_id: course_id,
                  links: value,
                  theWordsLeft: theWords.leftTab,
                  theWordsRight: theWords.rightTab,
                },
              });
            }}
          />
        )}
      </Wrapper>
    </LiveEx>
  );
}

export default function ({ course_id, ex_id, isProf }) {
  const [exSend] = useMutation(LIVE_LINKED_PROPS_RESPOND);
  const { loading, error, data } = useQuery(
    isProf ? LINKED_PROPS_GET : RANDOMED_LINKED_PROPS_GET,
    {
      variables: isProf ? { ex_id: ex_id } : { course_id: course_id },
      onCompleted: async (res) => {
        if (isProf) {
          let cleanedWords = JSON.parse(
            JSON.stringify(res.linkedPropsGet.words),
            omitTypename
          );
          let theWords = randomizeWords(cleanedWords);
          exSend({
            variables: {
              course_id: course_id,
              theWordsLeft: theWords.leftTab,
              theWordsRight: theWords.rightTab,
              links: [],
            },
          });
        } else {
          let cleanedData = JSON.parse(
            JSON.stringify(res.randomedLinkedPropsGet),
            omitTypename
          );
          console.log(cleanedData);
          exSend({
            variables: {
              course_id: course_id,
              theWordsLeft: cleanedData.theWordsLeft,
              theWordsRight: cleanedData.theWordsRight,
              links: cleanedData.links,
            },
          });
        }
      },
    }
  );
  if (error) {
    return console.log(error);
  }
  let type = "linkedPropsGet";
  if (!isProf) {
    type = "randomedLinkedPropsGet";
  }
  return (
    <LiveEx>
      <Title>
        {loading
          ? "Chargement"
          : data[type].title === ""
          ? "No title"
          : data[type].title}
      </Title>
      <Description>
        {loading
          ? "Chargement"
          : data[type].description === ""
          ? "No description"
          : data[type].description}
      </Description>
      <Live course_id={course_id} exSend={exSend} />
    </LiveEx>
  );
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
