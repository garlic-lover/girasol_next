import React from "react";
import styled from "styled-components";

export default function ({ tags, selectedTag, tagSelect }) {
  let theTags = [...tags];
  return (
    <Row>
      {theTags.map((tag, index) => {
        return (
          <Tag
            key={index}
            selected={index === selectedTag}
            onClick={() => {
              tagSelect(index);
            }}
          >
            {tag.name}
          </Tag>
        );
      })}
      {/* <select
        value={selectedTag}
        onChange={(ev) => {
          console.log(ev.target.value);
          tagSelect(ev.target.value);
        }}
      >
        <option value={undefined} />
        {theTags.map((tag, index) => {
          return (
            <option value={tag._id} key={index}>
              {tag.name}
            </option>
          );
        })}
      </select> */}
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  margin-top: 12px;
  align-items: center;
`;

const Tag = styled.p`
  margin-right: 6px;
  cursor: pointer;
  color: ${(props) =>
    props.selected ? props.theme.color1 : props.theme.color2};
  font-size: ${(props) => props.selected && "16px"};
`;
