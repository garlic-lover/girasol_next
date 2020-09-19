import React, { useState, useContext } from "react";
import { store } from "../../../store";
import styled from "styled-components";

import { useQuery, useMutation } from "@apollo/client";
import EX_LIST_GET from "../../../GraphQl/Queries/EX_LIST_GET";
import LIVE_EXERCICE_CHANGE from "../../../GraphQl/Mutations/LIVE_EXERCICE_CHANGE";

import ExOptions from "./LiveProfExOptions";
import ResOptions from "./LiveResOptions";
import HoleTextLive from "../../Exercices/Live/HoleTextLive";
import LinkedPropsLive from "../../Exercices/Live/LinkedPropsLive";
import LiveMath from "./LiveMath";

export default function ({ course_id, mathString }) {
  const {
    state: { t },
  } = useContext(store);
  const [shareType, shareTypeChange] = useState("Resource");
  const [exType, exTypeChange] = useState("holeText");
  const [selectedEx, exSelect] = useState("-");
  const [isOn, onOffChange] = useState(false);
  const [exChange] = useMutation(LIVE_EXERCICE_CHANGE);
  const { loading, error, data } = useQuery(EX_LIST_GET);

  return (
    <LiveExProf>
      <Row>
        <div>
          <span>{t("stud", "share")} : </span>
          <select
            value={shareType}
            onChange={(ev) => {
              shareTypeChange(ev.target.value);
              exSelect("-");
              exChange({
                variables: {
                  course_id: course_id,
                  mathLive: ev.target.value === "Resource",
                  isOn: isOn,
                },
              });
            }}
          >
            <option value="Exercice">Exercice</option>
            <option value="Resource">Ressources</option>
          </select>
        </div>
        {shareType === "Exercice" ? (
          <ExOptions
            exType={exType}
            exTypeChange={exTypeChange}
            selectedEx={selectedEx}
            exSelect={exSelect}
            exChange={exChange}
            loading={loading}
            error={error}
            data={data}
            isOn={isOn}
            onOffChange={onOffChange}
            course_id={course_id}
          />
        ) : (
          <ResOptions />
        )}
      </Row>
      {selectedEx === "-" && shareType === "Exercice" && (
        <NoEx>No exercice selected</NoEx>
      )}
      {shareType === "Resource" && (
        <LiveMath course_id={course_id} mathString={mathString} />
      )}
      {selectedEx !== "-" && exType === "holeText" && (
        <HoleTextLive course_id={course_id} ex_id={selectedEx} />
      )}
      {selectedEx !== "-" && exType === "linkedProps" && (
        <LinkedPropsLive course_id={course_id} ex_id={selectedEx} isProf />
      )}
    </LiveExProf>
  );
}

const LiveExProf = styled.div`
  width: 100%;
  & select {
    padding: 3px;
    margin-left: 3px;
  }
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  margin-bottom: 12px;
  line-height: 30px;
`;

const NoEx = styled.h4`
  text-align: center;
  margin-top: 48px;
`;
