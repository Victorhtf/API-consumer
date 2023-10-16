import styled from "styled-components";
import "../../../Globals.css";
import BaseLayout from "../../../layouts/BaseLayout.jsx";
import CreateUserContent from "./CreateUserContent.jsx";

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: var(--primary-font-color);

  .box {
    width: 70%;
    display: flex;
    flex-direction: column;
  }

  .btn-add-user {
    background: var(--btn-primary-color);
    color: white;
    align-self: flex-end;
    justify-content: flex-start;
    border: none;
    padding: 7px;
    margin-bottom: 10px;
    border-radius: var(--btn-border-radius);

    &:hover {
      transform: scale(1.01);
    }
  }

  .label {
    display: flex;
    gap: 40px;
  }
`;
function CreateUser() {
  return (
    <BaseLayout>
      <Box>
        <CreateUserContent />
      </Box>
    </BaseLayout>
  );
}

export default CreateUser;
