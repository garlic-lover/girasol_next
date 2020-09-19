import React, { useState, useContext } from "react";
import { store } from "../store";
import styled from "styled-components";

import HoleText from "../components/Exercices/Creator/HoleText/HoleText";
import LinkedProps from "../components/Exercices/Creator/LinkedProps/LinkedProps";

import DS from "../DS/DS";

const options = ["Texte à trou", "Questions liées"];

export default function ExStudio() {
  const {
    state: { t },
  } = useContext(store);
  const [ex, exChange] = useState("Texte à trou");
  const [page, select] = useState({ part: "left", index: 0 });
  const [exTitle, titleChange] = useState("");
  const [exDescription, descriptionChange] = useState("");

  return (
    <ExCreator>
      <Row>
        <Title>{t("exCre", "title")}</Title>
        <div>
          <ExSelecter
            value={ex}
            onChange={(ev) => {
              exChange(ev.target.value);
            }}
          >
            {options.map((op, index) => {
              return <option key={index}>{op}</option>;
            })}
          </ExSelecter>
        </div>
      </Row>
      <Menu>
        <DS.TopBarMenu
          itemsLeft={[
            { name: t("exCre", "create") },
            { name: t("exCre", "preview") },
          ]}
          selection={page}
          select={(page) => {
            select(page);
          }}
        />
      </Menu>
      <ChoiceRow>
        <ExHeader>
          <TitleInput
            placeholder={t("exCre", "theTitle")}
            value={exTitle}
            onChange={(ev) => {
              titleChange(ev.target.value);
            }}
          />
          <Description
            placeholder={t("exCre", "descr")}
            value={exDescription}
            onChange={(ev) => {
              descriptionChange(ev.target.value);
            }}
          />
        </ExHeader>
      </ChoiceRow>
      {ex === "Texte à trou" ? (
        <HoleText
          mode={page.index === 0 ? "create" : "preview"}
          title={exTitle}
          description={exDescription}
        />
      ) : (
        <LinkedProps
          mode={page.index === 0 ? "create" : "preview"}
          title={exTitle}
          description={exDescription}
        />
      )}
    </ExCreator>
  );
}

const ExCreator = styled.div``;

const Row = styled.div`
  margin-bottom: 12px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin-bottom: 12px;
`;

const Menu = styled.div`
  margin-bottom: 12px;
`;

const ExSelecter = styled.select`
  padding: 6px;
`;

const ChoiceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const ExHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  margin-bottom: 2px;
  border: inherit;
  font-size: 24px;
  padding: inherit;
`;

const Description = styled.input`
  border: inherit;
  padding: inherit;
`;
