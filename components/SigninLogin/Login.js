import React, { useState, useContext } from "react";
import { store } from "../../store";
import styled from "styled-components";

import { useMutation } from "@apollo/client";

import DS from "../../DS/DS";

import LOGIN_CALL from "../../GraphQl/Mutations/LOGIN_CALL";

export default function Log({ displaySigninChange }) {
  const { dispatch } = useContext(store);
  const [email, emailChange] = useState("");
  const [password, passwordChange] = useState("");
  const [login] = useMutation(LOGIN_CALL, {
    onCompleted: async (res) => {
      console.log(res);
      if (res.login.status !== "victory") {
        alert(res.login.status);
      } else {
        alert("Connected");
        await localStorage.setItem("token", res.login.token);
        console.log(res.login);
        dispatch({
          type: "connect",
          connectedStatus: true,
          myLanguage: res.login.user.myLanguage,
          learnedLanguage: res.login.user.learnedLanguage,
          firstName: res.login.user.firstName,
          lastName: res.login.user.lastName,
          isProf: res.login.user.isProf,
          courses: res.login.user.courses,
          students: res.login.user.students,
        });
        displaySigninChange(false);
      }
    },
  });

  return (
    <Login
      onSubmit={(ev) => {
        ev.preventDefault();
        login({
          variables: {
            email: email,
            password: password,
          },
        });
        emailChange("");
        passwordChange("");
      }}
    >
      <Title>Connexion</Title>
      <InputsWrapper>
        <DS.Input placeholder="email" value={email} change={emailChange} />
        <DS.Input
          placeholder="password"
          value={password}
          change={passwordChange}
          password
        />
      </InputsWrapper>
      <div>Mot de passe oublié? Cliquez ici</div>
      <div>
        <ValButton type="submit">Login</ValButton>
      </div>
    </Login>
  );
}

const Login = styled.form`
  width: 240px;
  height: 356px;
  padding: 0px 24px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  text-align: center;
`;

const InputsWrapper = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  margin-bottom : 6px;
  transition : 0.15s ease-in-out;
  box-shadow: 0 2px 6px #e5dbce,
    inset 0 10px 20px ${(props) => props.theme.color4};
  &:hover {
    background-color: ${(props) => props.theme.color2};
`;
