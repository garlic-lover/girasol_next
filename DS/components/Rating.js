import { useState, useEffect } from "react";
import styled from "styled-components";

const Rating = styled.ul`
  display: flex;
`;

const Star = styled.li`
  color: ${(props) => (props.rated ? "#fad161" : "#F0FAFA")};
  cursor: pointer;
  font-size: 1.25em;
`;

export default function RT({ max, value, change }) {
  const [tab, tabLoad] = useState([]);

  useEffect(() => {
    let newTab = [];
    for (let i = 0; i < max; i++) {
      newTab.push("");
    }
    tabLoad(newTab);
  }, [max]);

  return (
    <Rating>
      {tab.map((star, index) => {
        return (
          <Star
            key={index}
            rated={index <= value}
            onClick={() => {
              change(index);
            }}
          >
            ★
          </Star>
        );
      })}
    </Rating>
  );
}
