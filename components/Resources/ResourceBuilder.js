import React, { useState } from "react";
import styled from "styled-components";

import TextOrPic from "./TextOrPic";
// import AudioAdd from "./AudioAdd";

export default function RB() {
  const [exTitle, titleChange] = useState("");
  const [exDescription, descriptionChange] = useState("");

  return (
    <ResourceBuilder>
      <BuilderHeader>
        <TitleInput
          placeholder="Title"
          value={exTitle}
          onChange={(ev) => {
            titleChange(ev.target.value);
          }}
        />
        <Description
          placeholder="Description"
          value={exDescription}
          onChange={(ev) => {
            descriptionChange(ev.target.value);
          }}
        />
      </BuilderHeader>
      <TextOrPic />
      {/* <AudioAdd /> */}
    </ResourceBuilder>
  );
}

const ResourceBuilder = styled.div`
  margin-top: 12px;
`;

const BuilderHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const TitleInput = styled.input`
  margin-bottom: 2px;
  border: inherit;
  font-size: 24px;
  padding: inherit;
  margin-bottom: 3px;
`;

const Description = styled.input`
  border: inherit;
  padding: inherit;
`;
