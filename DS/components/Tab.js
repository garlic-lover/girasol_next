import { useState, useEffect } from "react";
import styled from "styled-components";

export default function Tb({ array, isHeader }) {
  const [header, headerLoad] = useState([]);
  useEffect(() => {
    if (array.length !== 0) {
      headerLoad(Object.keys(array[0]));
    }
  }, [array]);
  if (array.length === 0) {
    return null;
  }
  return (
    <Tab>
      <Row>
        {isHeader &&
          header.map((item, index) => {
            return (
              <Case key={index} isHeader>
                {item}
              </Case>
            );
          })}
      </Row>
      <div>
        {array.map((row, index) => {
          return (
            <Row key={index} odd={index % 2 === 0}>
              {header.map((item, theIndex) => {
                return <Case key={theIndex}>{row[item]}</Case>;
              })}
            </Row>
          );
        })}
      </div>
    </Tab>
  );
}

const Tab = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  background-color: ${(props) => (props.odd ? "white" : props.theme.color5)};
`;

const Case = styled.div`
  flex: 1;
  text-align: center;
  color: ${(props) => props.isHeader && "white"};
  background-color: ${(props) => props.isHeader && props.theme.color1};
  line-height: 32px;
`;
