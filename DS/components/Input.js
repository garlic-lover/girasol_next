import styled from "styled-components";

export default function In({
  value,
  change,
  placeholder,
  password,
  noBorder,
  size,
}) {
  return (
    <Wrapper>
      <Input
        type={password && "password"}
        value={value}
        onChange={(ev) => {
          change(ev.target.value);
        }}
        noBorder={noBorder}
        size={size}
      />
      <PlaceHolder valueEntered={value.length > 0} size={size}>
        {placeholder}
      </PlaceHolder>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 24px;
  position: relative;
  width: 100%;
  margin-top: 6px;
`;

const Input = styled.input`
  width: 100%;
  border: inherit;
  border-bottom: ${(props) => !props.noBorder && "solid 1px"};
  border-radius: 0px;
  padding: inherit;
  padding-bottom: 3px;
  position : relative;
  z-index: 1;
  font-size : ${(props) => (props.size ? props.size + "px" : "14px")};
  border-color : ${(props) => props.theme.color2};
  &:focus{
    border-color : ${(props) => props.theme.color1};
`;

const PlaceHolder = styled.p`
  position: absolute;
  transition: 0.25s linear;
  font-size: ${(props) =>
    !props.size && props.valueEntered
      ? "10px"
      : !props.size && !props.valueEntered
      ? "14px"
      : props.size && props.valueEntered
      ? props.size * 0.6 + "px"
      : props.size + "px"};
  top: ${(props) =>
    props.valueEntered && !props.size
      ? "-10px"
      : props.valueEntered && props.size
      ? "-" + props.size * 0.4 + "px"
      : "2px"};
  color: ${(props) => props.theme.color2};
  z-index: 0;
`;
