import styled from "styled-components";

export default function CB({ options, isVertical }) {
  return (
    <CheckBoxes isVertical={isVertical}>
      {options.map((checkbox, index) => {
        return (
          <CheckBoxRow key={index}>
            <CheckBox
              onClick={() => {
                checkbox.function();
              }}
            >
              {checkbox.value === true && <Checked>✓</Checked>}
            </CheckBox>
            <div>{checkbox.name}</div>
          </CheckBoxRow>
        );
      })}
    </CheckBoxes>
  );
}

const CheckBoxes = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isVertical ? "row" : "column")};
  align-items: ${(props) => (props.isVertical ? "align" : "")};
`;

const CheckBoxRow = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
  margin-bottom: 12px;
`;

const CheckBox = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px ${(props) => props.theme.color1};
  cursor: pointer;
  margin-right: 4px;
`;

const Checked = styled.div``;
