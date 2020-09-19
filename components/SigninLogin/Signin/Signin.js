import React, { useState, useContext } from "react";
import { store } from "../../../store";
import styled from "styled-components";

import { useMutation } from "@apollo/client";

import SIGNIN_CALL from "../../../GraphQl/Mutations/SIGNIN_CALL";

import SigninPersonalInfo from "./SigninPersonalInfo";
import SigninProforStud from "./SigninProfOrStud";
import SigninCourseInfo from "./SigninCourseInfo";

const advancement = [0, 1, 2];

export default function Sig({ displaySigninChange }) {
  const [step, stepChange] = useState(0);

  const [isProf, isProfChange] = useState(null);
  const [email, emailChange] = useState("");
  const [password, passwordChange] = useState("");
  const [passwordConfirm, passwordConfirmChange] = useState("");
  const [firstName, firstNameChange] = useState("");
  const [lastName, lastNameChange] = useState("");
  const [myLanguage, myLanguageChange] = useState("es");
  const [learnedLanguage, learnedLanguageChange] = useState("fr");
  const [courseName, courseNameChange] = useState("");
  const [code, codeChange] = useState("");

  const { dispatch } = useContext(store);

  const [signin] = useMutation(SIGNIN_CALL, {
    onCompleted: async (res) => {
      if (res.signin.status !== "victory") {
        alert(res.signin.status);
      } else {
        await localStorage.setItem("token", res.signin.token);
        alert("Account created");
        dispatch({
          type: "connect",
          connectedStatus: true,
          myLanguage: res.signin.user.myLanguage,
          learnedLanguage: res.signin.user.learnedLanguage,
          firstName: res.signin.user.firstName,
          lastName: res.signin.user.lastName,
          isProf: res.signin.user.isProf,
          courses: res.signin.user.courses,
          students: res.signin.user.students,
        });
        displaySigninChange(false);
      }
    },
  });

  return (
    <Signin
      onSubmit={(ev) => {
        ev.preventDefault();
        if (step === 0) {
          return stepChange(1);
        }
        if (step === 1) {
          return stepChange(2);
        }
        if (password.value !== passwordConfirm.value) {
          return alert("The password and password confirmation don't match");
        }
        signin({
          variables: {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            myLanguage: myLanguage,
            learnedLanguage: learnedLanguage,
            courseName: courseName,
            isProf: isProf,
            code: code,
          },
        });
      }}
    >
      <Title>Inscription</Title>
      <AdvancementBar>
        {advancement.map((ad, index) => {
          return (
            <AdvancementBloc
              key={index}
              selected={index === step}
              onClick={() => {
                stepChange(index);
              }}
            />
          );
        })}
      </AdvancementBar>
      <Wrapper>
        <FirstStepWrapper selected={step === 0}>
          <SigninProforStud
            isProf={isProf}
            isProfChange={isProfChange}
            stepChange={stepChange}
          />
        </FirstStepWrapper>
        <SecondStepWrapper step={step}>
          <SigninCourseInfo
            isProf={isProf}
            myLanguage={myLanguage}
            learnedLanguage={learnedLanguage}
            myLanguageChange={myLanguageChange}
            learnedLanguageChange={learnedLanguageChange}
            courseName={courseName}
            courseNameChange={courseNameChange}
            code={code}
            codeChange={codeChange}
          />
        </SecondStepWrapper>
        <ThirdStepWrapper selected={step === 2}>
          <SigninPersonalInfo
            email={email}
            emailChange={emailChange}
            password={password}
            passwordChange={passwordChange}
            passwordConfirm={passwordConfirm}
            passwordConfirmChange={passwordConfirmChange}
            firstName={firstName}
            firstNameChange={firstNameChange}
            lastName={lastName}
            lastNameChange={lastNameChange}
          />
        </ThirdStepWrapper>
      </Wrapper>
      <ValButton type="submit">{step === 2 ? "Validate" : "Next →"}</ValButton>
    </Signin>
  );
}

const Signin = styled.form`
  width: 240px;
  padding: 0 24px;
  padding-bottom: 6px;
  border-radius: 3px;
  /* border: solid 1px ${(props) => props.theme.color2}; */
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  text-align: center;
`;

const AdvancementBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const AdvancementBloc = styled.div`
  width: 32%;
  height: 3px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected ? props.theme.color1 : props.theme.color3};
`;

const ValButton = styled.button`
  margin: auto;
  width: 100%;
  background-color: ${(props) => props.theme.color3};
  line-height: 28px;
  border-radius: 3px;
  color: white;
  font-size: 13px;
  cursor: pointer;
  transition : 0.15s ease-in-out;
  box-shadow: 0 2px 6px #e5dbce,
    inset 0 10px 20px ${(props) => props.theme.color4};
  &:hover {
    background-color: ${(props) => props.theme.color2};
`;

const Wrapper = styled.div`
  position: relative;
  height: 240px;
  width: 100%;
`;

const FirstStepWrapper = styled.div`
  position: absolute;
  width: 100%;
  transition: 0.5s ease-in-out;
  left: ${(props) => (props.selected ? "0" : "-400px")};
`;

const SecondStepWrapper = styled.div`
  position: absolute;
  width: 100%;
  transition: 0.5s ease;
  right: ${(props) =>
    props.step === 0 ? "-400px" : props.step === 1 ? "0" : "400px"};
`;

const ThirdStepWrapper = styled.div`
  position: absolute;
  width: 100%;
  transition: 0.5s ease-in-out;
  right: ${(props) => (props.selected ? "0" : "-400px")};
`;
