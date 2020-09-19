import React, { useContext } from "react";
import { store } from "../../store";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useQuery, useMutation, gql } from "@apollo/client";

const STUDENT_CREATE = gql`
  mutation studentCreate {
    studentCreate
  }
`;

const STUDENT_DELETE = gql`
  mutation studentDelete($_id: String) {
    studentDelete(_id: $_id)
  }
`;

const STUDENTS_GET = gql`
  query studentsGet {
    studentsGet {
      _id
      code
      studentName
    }
  }
`;

export default function () {
  const {
    state: { t },
  } = useContext(store);
  const { loading, error, data, refetch } = useQuery(STUDENTS_GET);
  const [studentCreate] = useMutation(STUDENT_CREATE, {
    onCompleted: () => {
      refetch();
    },
  });

  const [studentDelete] = useMutation(STUDENT_DELETE, {
    onCompleted: (ev) => {
      refetch();
    },
  });

  return (
    <Students>
      <Title>{t("studs", "title")}</Title>
      <SubTitle>{t("studs", "subTitle")}</SubTitle>
      <Wrapper>
        {!loading &&
          !error &&
          data.studentsGet.map((stud, index) => {
            if (stud.studentName === "pending") {
              return (
                <Student key={index} id={index} unconfirmed>
                  <DeleteIcon
                    onClick={(ev) => {
                      ev.stopPropagation();
                      studentDelete({ variables: { _id: stud._id } });
                    }}
                  >
                    ✕
                  </DeleteIcon>
                  <p>{t("studs", "notConfirmed")}</p>
                  <p>
                    {t("studs", "code")} : <span>{stud.code}</span>
                  </p>
                </Student>
              );
            } else {
              return (
                <Link key={index} to={`student/${stud._id}`}>
                  <Student id={index}>
                    {/* <DeleteIcon
                      onClick={(ev) => {
                        ev.stopPropagation();
                        studentDelete(index);
                      }}
                    >
                      ✕
                    </DeleteIcon> */}
                    <div>{stud.studentName.toUpperCase()}</div>
                  </Student>
                </Link>
              );
            }
          })}
        <Student
          onClick={() => {
            studentCreate();
          }}
        >
          <p>{t("studs", "studentAdd")}</p>
          <AddIcon>
            <span role="img" aria-label="Add a student">
              +
            </span>
          </AddIcon>
        </Student>
      </Wrapper>
    </Students>
  );
}

const Students = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 24px;
`;

const SubTitle = styled.h4`
  margin-bottom: 24px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const Student = styled.div`
  width: 188px;
  height: 90px;
  margin-right: 12px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
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
  & p span {
    font-size: 16px;
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

const DeleteIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 6px;
`;

const AddIcon = styled.p`
  background-color: ${(props) => props.theme.color2};
  height: 28px;
  width: 28px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
  & span {
    color: white;
    font-size: 24px;
  }
`;
