import React, { useState } from "react";
import styled from "styled-components";

import MathCreator from "./MathCreator";

export default function Math({ mode }) {
  const [content, contentChange] = useState([]);

  return (
    <MathWrapper>
      {mode === "create" ? (
        <MathCreator content={content} contentChange={contentChange} />
      ) : (
        <MathEx />
      )}
    </MathWrapper>
  );
}

const MathWrapper = styled.div``;
