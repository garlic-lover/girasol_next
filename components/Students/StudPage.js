import React, { useState, useContext } from "react";
import { store } from "../../store";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import COURSE_GET from "../../GraphQl/Queries/COURSE_GET";

import DS from "../../DS/DS";

import LiveExProf from "./LiveProf/LiveProf";

export default function (props) {
  const {
    state: { t },
  } = useContext(store);
  const [page, select] = useState({ part: "left", index: 3 });
  const { loading, error, data } = useQuery(COURSE_GET, {
    variables: { _id: props.match.params._id },
  });
  if (error) {
    return alert(error);
  }
  return (
    <StudPage>
      <TitleRow>
        <Title>
          {loading
            ? "Chargement"
            : data && data.courseGet.studentName === "pending"
            ? "Student non confirmed"
            : data.courseGet.studentName}
        </Title>
        <Link to="/students">
          <p>
            {t("stud", "back")}
            <span role="img" aria-label="Back to students">
              ↩︎
            </span>
          </p>
        </Link>
      </TitleRow>
      <DS.TopBarMenu
        itemsLeft={t("stud", "leftMenu")}
        selection={page}
        select={(page) => {
          select(page);
        }}
      />
      {data && page.index === 3 && (
        <LiveExProf
          course_id={props.match.params._id}
          mathString={data.courseGet.liveMath}
        />
      )}
    </StudPage>
  );
}

const StudPage = styled.div``;

const TitleRow = styled.div`
  display: flex;
  & p {
    cursor: pointer;
    margin-left: 12px;
    color: ${(props) => props.theme.color3};
  }
  & p:hover {
    transform: translateY(1px);
  }
`;

const Title = styled.h2`
  margin-bottom: 24px;
`;
