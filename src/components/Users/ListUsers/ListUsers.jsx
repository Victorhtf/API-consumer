import styled from "styled-components";
import BaseLayout from "../../../pages/BaseLayout.jsx";
import UsersTable from "./usersTable.jsx";
import { useState } from "react";
import CreateUserModal from "../CreateUser/CreateUserModal.jsx";
import "../../../Globals.css";

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

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
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <>
      <CreateUserModal
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      ></CreateUserModal>
      <BaseLayout>
        <Box>
          <div className="top-label">
            <h1> Listar usuários </h1>
            <button
              className="add-user-btn"
              onClick={() => {
                setOpenCreateModal(true);
              }}
            >
              Adicionar usuário
            </button>
          </div>
          <UsersTable />
        </Box>
      </BaseLayout>
    </>
  );
}

export default ListUsers;
