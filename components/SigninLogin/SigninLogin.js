import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

import Signin from "./Signin/Signin";
import Login from "./Login";

export default function SL({ displaySigninChange }) {
  const [alreadyAccount, change] = useState(false);
  return (
    <SigninLogin>
      <CloseIcon
        onClick={() => {
          displaySigninChange(false);
        }}
      >
        ✕
      </CloseIcon>
      <div>
        {alreadyAccount === false ? (
          <Signin displaySigninChange={displaySigninChange} />
        ) : (
          <Login displaySigninChange={displaySigninChange} />
        )}
      </div>
      <SwitchLine>
        {alreadyAccount === false ? "Déjà un compte ?" : "Pas de compte ?"}{" "}
        <Switch
          onClick={() => {
            change(!alreadyAccount);
          }}
        >
          {alreadyAccount === false ? "Connectez vous" : "Inscrivez vous"}
        </Switch>
      </SwitchLine>
    </SigninLogin>
  );
}

const onAppear = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

const SigninLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1);
  /* border: solid 1px ${(props) => props.theme.color2}; */
  padding: 24px;
  padding-bottom: 12px;
  border-radius: 3px;
  z-index: 150;
  opacity: 1;
  animation: ${onAppear} 1s;
`;

const SwitchLine = styled.div`
  margin-top: 12px;
  color: ${(props) => props.theme.color2};
`;

const Switch = styled.span`
  color: ${(props) => props.theme.color1};
  cursor: pointer;
  margin-left: 3px;
`;

const CloseIcon = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  font-size: 0.7rem;
`;
