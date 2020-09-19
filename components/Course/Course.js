import React, { useState, useContext } from "react";
import { store } from "../../store";
import styled from "styled-components";

import { useQuery, useSubscription } from "@apollo/client";
import LIVE_EXERCICE_GET from "../../GraphQl/Subscriptions/LIVE_EXERCICE_GET";
import COURSE_GET from "../../GraphQl/Queries/COURSE_GET";

import HoleTextLive from "../Exercices/Live/HoleTextLive";
import LinkedPropsLive from "../Exercices/Live/LinkedPropsLive";
import LiveMath from "../Students/LiveProf/LiveMath";

import DS from "../../DS/DS";

function Menu({ course_id, mathString, mathLive }) {
  const {
    state: { t },
  } = useContext(store);
  const [page, select] = useState({ part: "left", index: 0 });
  const { error, data } = useSubscription(LIVE_EXERCICE_GET, {
    variables: { course_id: course_id },
  });
  if (error) {
    console.log(error);
  }

  return (
    <div>
      <DS.TopBarMenu
        /* itemsLeft={
          !loading && data && data.liveExerciceGet.isOn === true
            ? options
            : shortOptions
        } */
        itemsLeft={t("stud", "leftMenu")}
        selection={page}
        select={(page) => {
          select(page);
        }}
      />
      {((page.index === 3 && !data && mathLive === true) ||
        (data && data.liveExerciceGet.mathLive === true)) && (
        <LiveMath course_id={course_id} mathString={mathString} />
      )}
      {page.index === 3 && data && data.liveExerciceGet.isOn === true && (
        <div>
          {data.liveExerciceGet.type === "holeText" && (
            <HoleTextLive
              course_id={course_id}
              ex_id={data.liveExerciceGet.ex_id}
            />
          )}
          {data.liveExerciceGet.type === "linkedProps" && (
            <LinkedPropsLive
              course_id={course_id}
              ex_id={data.liveExerciceGet.ex_id}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default function (props) {
  const { loading, error, data } = useQuery(COURSE_GET, {
    variables: { _id: props.match.params._id },
  });
  if (error) {
    return alert(error);
  }

  return (
    <Course>
      <Title>{loading ? "Chargement" : data && data.courseGet.name}</Title>
      <Menu
        course_id={props.match.params._id}
        mathString={data && data.courseGet.liveMath}
        mathLive={data && data.courseGet.liveExercice.mathLive}
      />
    </Course>
  );
}

const Course = styled.div``;

const Title = styled.h2`
  margin-bottom: 24px;
`;
