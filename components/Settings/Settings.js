import React, { useContext } from "react";
import { store } from "../../store";
import styled from "styled-components";

import DS from "../../DS/DS";

export default function () {
  const { state, dispatch } = useContext(store);
  return (
    <div>
      <Title>Paramètres</Title>
      {state.connectedStatus && (
        <div>
          <DS.Button
            name={state.t("deconnect")}
            click={async () => {
              localStorage.removeItem("token");
              dispatch({
                type: "connect",
                connectedStatus: false,
                myLanguage: state.myLanguage,
                learnedLanguage: "",
              });
              // client.clearStore();
              // window.location.reload(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

const Title = styled.h2`
  margin-bottom: 24px;
`;

/* const UserName = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  & select {
    margin-left: 6px;
    padding: 3px;
  }
`; */
