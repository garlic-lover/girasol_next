import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import DS from "../../../../DS/DS";

import linkedPropsEvaluate from "./linkedPropsEvaluate";

export default function LPE({ theWords, links, linksChange }) {
  const [selected, select] = useState(null);
  const [pos, posSet] = useState({ x: null, y: null });
  const [responseDisplayed, displayResponses] = useState(false);
  const [score, scoreChange] = useState(0);

  const arrowPosition = (part, arg, index) => {
    let id;
    if (index !== "") {
      id = part + index.toString();
    } else {
      id = part + selected;
    }
    let div = document.getElementById(id);
    if (!div) {
      return;
    }
    let param = "";
    div = div.offsetParent;
    if (arg === "x") {
      if (part === "left") {
        param = div.offsetLeft + div.offsetWidth;
      } else {
        param = div.offsetLeft;
      }
    } else if (arg === "y") {
      param = div.offsetTop + div.offsetHeight / 2;
    }
    return param;
  };

  function getOffsetSum(elem) {
    var top = 0,
      left = 0;
    let counter = 0;
    while (elem) {
      if (counter > 1) {
        top = top + parseInt(elem.offsetTop);
        left = left + parseInt(elem.offsetLeft);
      }

      elem = elem.offsetParent;
      counter++;
    }
    return { top: top, left: left };
  }

  const handleMouseMove = (ev) => {
    if (selected === null) {
      return null;
    } else {
      let ex = document.getElementById("left" + selected);
      const { top, left } = getOffsetSum(ex);
      posSet({
        x: ev.clientX - left,
        y: ev.clientY - top,
      });
    }
  };

  const handleMouseLeave = async () => {
    await select(null);
    await posSet({ x: null, y: null });
    return;
  };

  const handleMouseClick = async (ev) => {
    if (
      (ev.target.nodeName === "svg" || ev.target.nodeName === "line") &&
      pos.x
    ) {
      posSet({ x: null, y: null });
      select(null);
    }
    return;
  };

  useEffect(() => {
    let ex = document.getElementById("linkedEx");
    let exContent = document.getElementById("exContent");
    ex.addEventListener("mousemove", handleMouseMove);
    exContent.addEventListener("mouseleave", handleMouseLeave);
    exContent.addEventListener("mousedown", handleMouseClick);
    return () => {
      ex.removeEventListener("mousemove", handleMouseMove);
      exContent.removeEventListener("mouseleave", handleMouseLeave);
      ex.removeEventListener("mousedown", handleMouseClick);
    };
  });

  return (
    <LinkedPropsEx id="linkedEx">
      {responseDisplayed === true && (
        <Score>
          {score} / {theWords.leftTab.length}
        </Score>
      )}
      <Wrapper id="exContent">
        <Line id="svg" width="600" height={"100%"}>
          {pos.x && (
            <line
              id={"line"}
              x1={arrowPosition("left", "x", "")}
              y1={arrowPosition("left", "y", "")}
              x2={pos.x}
              y2={pos.y}
              stroke="#596e79"
            />
          )}
        </Line>
        {links.map((link, index) => {
          let isGood = false;
          if (link.left.match === link.rightIndex) {
            isGood = true;
          }
          return (
            <Line key={index} width="600" height={"100%"}>
              <line
                id={"line"}
                x1={arrowPosition("left", "x", link.leftIndex)}
                y1={arrowPosition("left", "y", link.leftIndex)}
                x2={arrowPosition("right", "x", link.rightIndex)}
                y2={arrowPosition("right", "y", link.rightIndex)}
                stroke={
                  !responseDisplayed ? "#c7b198" : isGood ? "green" : "red"
                }
              />
            </Line>
          );
        })}

        <Column>
          {theWords.leftTab.map((word, index) => {
            let isSelected = links.findIndex((el) => el.leftIndex === index);
            return (
              <Word key={index}>
                <p>{word.value}</p>
                <div
                  id={"left" + index}
                  onClick={() => {
                    if (isSelected !== -1) {
                      let tab = [...links];
                      tab.splice(isSelected, 1);
                      linksChange(tab);
                    }
                    select(index);
                  }}
                >
                  {" "}
                  {selected === index || (isSelected !== -1 && <span />)}
                </div>
              </Word>
            );
          })}
        </Column>
        <Column>
          {theWords.rightTab.map((word, index) => {
            let isSelected = links.findIndex((el) => el.rightIndex === index);
            return (
              <Word key={index} right>
                <div
                  id={"right" + index}
                  onClick={async () => {
                    if (isSelected !== -1 && selected !== null) {
                      let tab = [...links];
                      tab.splice(isSelected, 1, {
                        left: theWords.leftTab[selected],
                        leftIndex: selected,
                        right: word,
                        rightIndex: index,
                      });
                      await linksChange(tab);
                      select(null);
                      posSet({ x: null, y: null });
                    } else if (selected !== null) {
                      let tab = [...links];
                      tab.push({
                        left: theWords.leftTab[selected],
                        leftIndex: selected,
                        right: word,
                        rightIndex: index,
                      });
                      await linksChange(tab);
                      select(null);
                      posSet({ x: null, y: null });
                    } else if (isSelected !== -1) {
                      let tab = [...links];
                      tab.splice(isSelected, 1);
                      await linksChange(tab);
                    }
                  }}
                >
                  {isSelected !== -1 && <span />}
                </div>
                <p>{word.value}</p>
              </Word>
            );
          })}
        </Column>
      </Wrapper>
      <SubmitButton>
        <DS.Button
          name={
            responseDisplayed === false ? "Valider mes réponses" : "Ré-essayer"
          }
          click={() => {
            displayResponses(!responseDisplayed);
            scoreChange(linkedPropsEvaluate(links));
          }}
        />
      </SubmitButton>
    </LinkedPropsEx>
  );
}

const LinkedPropsEx = styled.div`
  margin: auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 12px 12px 12px;
  background-color: ${(props) => props.theme.color5};
  border-radius: 4px;
  position: relative;
`;

const Score = styled.div`
  position: absolute;
  top: -20px;
  right: 0px;
`;

const Wrapper = styled.div`
  width: 90%;
  background-color: white;
  padding: 24px 12px;
  border-radius: 4px;
  display: flex;
  justify-content: space-around;
  position: relative;
  & svg {
    position: absolute;
    z-index: 0;
  }
`;

const Column = styled.div``;

const onSelect = keyframes`
    0%{
        height : 0px;
        width : 0px;
    }
    50%{
        height : 15px;
        width : 15px;
    }
    100%{
        height : 4px;
        width : 4px;
    }
`;

const Word = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => !props.right && "space-between"};
  margin-bottom: 12px;
  position: relative;
  & p {
    margin-right: ${(props) => !props.right && "18px"};
    margin-left: ${(props) => props.right && "18px"};
  }
  & div {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: solid 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 99;
    cursor: pointer;
  }
  & div span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 4px;
    width: 4px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.color1};
    animation: ${onSelect} 0.8s;
  }
`;

const Line = styled.svg`
  top: 0px;
  left: 0px;
`;

const SubmitButton = styled.div`
  width: calc(90% + 24px);
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;
