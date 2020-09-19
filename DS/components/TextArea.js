import styled from "styled-components";

import Button from "./Button";

export default function TA({
  title,
  value,
  change,
  placeholder,
  submitButton,
}) {
  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      <TextArea
        style={{ resize: "none" }}
        value={value}
        placeholder={placeholder}
        onChange={(ev) => {
          change(ev.target.value);
        }}
      />
      {submitButton && (
        <SubmitButton>
          <Button
            name={submitButton.name}
            click={() => {
              submitButton.function();
            }}
          />
        </SubmitButton>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: calc(100%-40px);
  padding: 16px 20px 8px 16px;
  background-color: ${(props) => props.theme.color5};
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 8px 8px 16px hsla(30, 21%, 81%, 0.15);
  position: relative;
`;

const Title = styled.div`
  font-size: 15px;
  margin-bottom: 12px;
`;

const TextArea = styled.textarea`
  min-height: 70px;
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-size: 14px;
  line-height: 23px;
`;

const SubmitButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;
