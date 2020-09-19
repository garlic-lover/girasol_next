import { useState } from "react";
import styled from "styled-components";

import HoleTextCreator from "./HoleTextCreator";
import HoleTextEx from "./HoleTextEx";

export default function HT({ mode, title, description }) {
  const [parsedText, parsedLoad] = useState([]);
  const [selectedWords, wordSelect] = useState([]);
  const [textValidated, validate] = useState(false);
  const [responseDisplayed, displayResponses] = useState(false);
  const [score, scoreChange] = useState(0);

  return (
    <Holetext>
      {mode === "create" ? (
        <HoleTextCreator
          title={title}
          textValidated={textValidated}
          validate={validate}
          description={description}
          parsedText={parsedText}
          parsedLoad={parsedLoad}
          selectedWords={selectedWords}
          wordSelect={wordSelect}
        />
      ) : (
        <HoleTextEx
          parsedText={parsedText}
          selectedWords={selectedWords}
          responseChange={wordSelect}
          responseDisplayed={responseDisplayed}
          displayResponses={displayResponses}
          score={score}
          scoreChange={scoreChange}
        />
      )}
    </Holetext>
  );
}

const Holetext = styled.div``;
