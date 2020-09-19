import styled from "styled-components";

const Button = styled.button`
  display: flex;
  align-self: start;
  font-size: 10px;
  padding: 9px;
  border-radius: 5px;
  color: ${(props) => (props.borders ? props.theme.color1 : "white")};
  cursor: pointer;
  border: solid 1px ${(props) => props.theme.color1};
  background-color: ${(props) => !props.borders && props.theme.color1};
  /*  &:hover {
    color: ${(props) =>
    props.borders ? props.theme.color3 : "white"};
    background-color: ${(
    props
  ) => !props.borders && props.theme.color3};
    border-color: ${(props) =>
    props.theme.color3};
  } */
  &:active {
    color: ${(props) => (props.borders ? props.theme.color2 : "white")};
    background-color: ${(props) => !props.borders && props.theme.color2};
    transform: translateY(1px);
    border-color: ${(props) => props.theme.color2};
  }
`;

export default function Bt({ name, click, borders, submit }) {
  return (
    <Button
      type={submit && "submit"}
      borders={borders}
      onClick={() => {
        click();
      }}
    >
      {name}
    </Button>
  );
}
