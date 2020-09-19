import { useState, useEffect } from "react";
import styled from "styled-components";

export default function DS({ minimum, maximum, value, change }) {
  const [isdragged, drag] = useState(false);

  useEffect(() => {
    let el = document.getElementById("point");
    el.addEventListener("mousedown", () => {
      drag(true);
    });
    el.addEventListener("mouseup", (ev) => {
      drag(false);
      console.log(ev);
    });
    el.addEventListener("mousemove", (ev) => {
      if (isdragged === true) {
        // let newValue = value + (ev.offsetX / 150) * (maximum - minimum);
      }
    });
  });

  return (
    <DraggableScale>
      <p>{minimum}</p>
      {/*       <p>{isdragged ? "Yes" : "No"}</p> */}
      <Line>
        <Point id="point" value={(value / (maximum - minimum)) * 100} />
      </Line>
      <p>{maximum}</p>
    </DraggableScale>
  );
}

const DraggableScale = styled.div`
  display: flex;
  align-items: center;
`;

const Line = styled.div`
  height: 0px;
  width: 150px;
  border-bottom: solid 1px ${(props) => props.theme.color1};
  margin-left: 8px;
  margin-right: 8px;
  position: relative;
`;

const Point = styled.div`
  cursor: pointer;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  border: solid 1px ${(props) => props.theme.color1};
  background-color: white;
  position: absolute;
  top: 0px;
  left: ${(props) => props.value}%;
  transform: translate(-50%, -50%);
`;
