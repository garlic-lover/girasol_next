import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

import useInterval from "../../Hooks/useInterval";

export default function ({ timer, timerChange }) {
  const [isRunning, pause] = useState(true);

  useInterval(
    () => {
      // Your custom logic here
      timerChange(timer + 1);
      if (timer === 3) {
        timerChange("Start !");
      }
      if (timer === "Start !") {
        pause(null);
        timerChange(null);
      }
    },
    isRunning ? 1000 : null
  );
  if (timer === "Start !" || timer === null) {
    return <TimerBis>{timer}</TimerBis>;
  }
  return <Timer>{timer}</Timer>;
}

const Anim = keyframes`
    0%{
        font-size: 24px;    
    }
    50%{
        font-size: 36px;    
    }
    100%{
        font-size: 24px;    
    }
`;

const AnimBis = keyframes`
    0%{
        font-size: 24px;    
    }
    100%{
        font-size: 34px;    
    }
`;

const Timer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 34px;
  animation: ${Anim} 1s infinite;
`;

const TimerBis = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 34px;
  animation: ${AnimBis} 1s;
`;
