import styled from "styled-components";
import BaseLayout from "../../../pages/BaseLayout.jsx";
import UsersTable from "../usersTable.jsx";
import { useState } from "react";
import CreateUserModal from "../CreateUserModal/CreateUserModal.jsx";
// import CreateUserContent from "../CreateUser/CreateUserContent.jsx";
import "../../../Globals.css";

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  .box {
    width: 70%;
    display: flex;
    flex-direction: column;
  }

  .add-user-btn {
    background: var(--btn-bg-color);
    color: white;
    align-self: flex-end;
    justify-content: flex-start;
    border: none;
    padding: 7px 15px 7px 15px;
    margin-bottom: 10px;
    border-radius: var(--btn-border-radius);
    cursor: pointer;
    height: 40px;
    text-transform: uppercase;
  }

  .label {
    display: flex;
    gap: 40px;
  }
`;

function ListUsers() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CreateUserModal open={open} setOpen={setOpen}></CreateUserModal>
      <BaseLayout>
        <Box>
          <button
            className="add-user-btn"
            onClick={() => {
              setOpen(true);
            }}
          >
            Adicionar usuário
          </button>
          <UsersTable />
        </Box>
      </BaseLayout>
    </>
  );
}

export default ListUsers;
