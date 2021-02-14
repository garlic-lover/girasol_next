import React from "react";
import styled from "styled-components";

export default function ToP({ addEl }) {
  return (
    <TextOrPic>
      <div
        onClick={() => {
          addEl("text");
        }}
      >
        + Text
      </div>
      <div
        onClick={() => {
          addEl("pic");
        }}
      >
        + Pic
      </div>
      <div
        onClick={() => {
          addEl("audio");
        }}
      >
        + Audio
      </div>
      <div>+ Math</div>
    </TextOrPic>
  );
}

const TextOrPic = styled.div`
  width: 60%;
  display: flex;
  margin: auto;
  margin-top: 48px;
  justify-content: space-around;
  & div {
    width: 80px;
    padding: 6px 12px;
    border: solid 1px;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
  }
  & div:hover {
    transform: translateY(1px);
  }
  & div:active {
    transform: translateY(2px);
  }
`;
