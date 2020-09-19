import React from "react";
import styled from "styled-components";

export default function SP({ isProf, isProfChange, stepChange }) {
  return (
    <Wrapper>
      <Title>I am a... </Title>
      <StatusRow>
        <StatusBloc
          selected={isProf === true}
          onClick={() => {
            if (isProf === true) {
              isProfChange(null);
            } else {
              isProfChange(true);
              stepChange(1);
            }
          }}
        >
          PROFESSOR
        </StatusBloc>
        <StatusBloc
          selected={isProf === false}
          onClick={() => {
            if (isProf === false) {
              isProfChange(null);
            } else {
              isProfChange(false);
              stepChange(1);
            }
          }}
        >
          STUDENT
        </StatusBloc>
      </StatusRow>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h4`
  margin-top: 44px;
  margin-bottom: 30px;
`;

const StatusRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const StatusBloc = styled.div`
  width: 112px;
  height: 64px;
  text-align: center;
  line-height: 60px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.selected ? props.theme.color4 : "white"};
  color: ${(props) => (props.selected ? "white" : "")};
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /*   border: ${(props) =>
    props.selected && "solid 1px " + props.theme.color1}; */
  &:hover {
    transform: translateY(1px);
    box-shadow: 0 24px 38px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1);
  }
  &:active {
    transform: translateY(2px);
  }
`;
