import styled from "styled-components";

import Button from "./Button";

const FileUploadBloc = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color4};
  color: black;
  width: 520px;
  height: 192px;
`;

const Icon = styled.img`
  width: 32px;
  height: 40px;
  margin-bottom: 20px;
`;

const ButtonsRow = styled.div`
  display: flex;
  margin-top: 10px;
`;

export default function FUB({ action1, action2 }) {
  return (
    <FileUploadBloc>
      <Icon src="/assets/file.svg" />
      <p>No documents are listed for this customer</p>
      <ButtonsRow>
        <Button
          name={action1.name}
          click={() => {
            action1.function();
          }}
        />
        {action2 && (
          <Button
            name={action2.name}
            click={() => {
              action2.function();
            }}
            borders
          />
        )}
      </ButtonsRow>
    </FileUploadBloc>
  );
}
