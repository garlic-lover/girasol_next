import styled from "styled-components";

export default function RB({ options, selection, select, isVertical }) {
  return (
    <RadioButtons isVertical={isVertical}>
      {options.map((option, index) => {
        return (
          <SelectsRow key={index}>
            <Select
              onClick={() => {
                select(index);
              }}
            >
              {selection === index && <Selected />}
            </Select>
            <div>{option.name}</div>
          </SelectsRow>
        );
      })}
    </RadioButtons>
  );
}

const RadioButtons = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isVertical ? "column" : "row")};
  align-items: ${(props) => (props.isVertical ? "align" : "")};
  flex-wrap: wrap;
`;

const SelectsRow = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
  margin-bottom: 12px;
`;

const Select = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 4px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px ${(props) => props.theme.color1};
  cursor: pointer;
  margin-right: 4px;
`;

const Selected = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${(props) => props.theme.color1};
  border-radius: 50%;
`;
