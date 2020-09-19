import React from "react";
import styled from "styled-components";

import { useQuery, useMutation, gql } from "@apollo/client";
import EX_LIST_GET from "../../../GraphQl/Queries/EX_LIST_GET";

const EX_DELETE = gql`
  mutation exDelete($_id: String) {
    exDelete(_id: $_id)
  }
`;

export default function () {
  const { loading, error, data, refetch } = useQuery(EX_LIST_GET);
  const [exDelete] = useMutation(EX_DELETE, {
    onCompleted: (ev) => {
      refetch();
    },
  });
  if (loading) {
    return "Loading";
  }
  if (error) {
    return "error";
  }

  return (
    <MyExercices>
      <Title>Mes exercices</Title>
      <Wrapper>
        {data.exercicesGet.map((ex, index) => {
          console.log(ex);
          return (
            <Exercice key={index}>
              <span
                onClick={() => {
                  exDelete({ variables: { _id: ex._id } });
                }}
              >
                ✕
              </span>
              <p>Type : {ex.type}</p>
              {ex.title !== "" ? ex.title : "No title"}
            </Exercice>
          );
        })}
      </Wrapper>
    </MyExercices>
  );
}

const MyExercices = styled.div``;

const Title = styled.h2`
  margin-bottom: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 24px;
  padding-left: 0;
`;

const Exercice = styled.div`
  margin-bottom: 12px;
  margin-bottom: 12px;
  margin-right: 12px;
  justify-content: center;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-self: flex-start;
  width: 150px;
  padding: 6px 12px;
  background-color: ${(props) => (props.unconfirmed ? "white" : "white")};
  color: ${(props) => (props.unconfirmed ? "lightgrey" : "")};
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  & p {
    font-size: 10px;
  }
  & span {
    position: absolute;
    right: 6px;
    top: 3px;
  }
  & p:first-child {
    margin-bottom: 6px;
  }
  &:hover {
    transform: translateY(1px);
    box-shadow: 0 24px 38px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1);
  }
  &:active {
    transform: translateY(2px);
  }
`;
