import styled from "styled-components";

export default function SB({ options, selection, select }) {
  return (
    <SelectButtons>
      {options.map((option, index) => {
        return (
          <Button
            key={index}
            selected={selection === index}
            onClick={() => {
              select(index);
            }}
          >
            {option.name}
          </Button>
        );
      })}
    </SelectButtons>
  );
}

const SelectButtons = styled.div`
  display: flex;
`;

const Button = styled.div`
  cursor: pointer;
  color: ${(props) => (props.selected ? "white" : props.theme.color1)};
  background-color: ${(props) =>
    props.selected ? props.theme.color1 : props.theme.color4};
  padding: 12.5px;
  /*   border-right: solid 1px ${(props) => props.theme.color1}; */
  &:first-child {
    border-radius: 4px 0px 0px 4px;
  }
  &:last-child {
    border-radius: 0px 4px 4px 0px;
    border-right: none;
  }
`;
