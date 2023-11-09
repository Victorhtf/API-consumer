import styled from "styled-components";
import BaseLayout from "../../../pages/BaseLayout.jsx";
import CreateUserModal from "../CreateUser/CreateUserModal.jsx";
import "../../../Globals.css";
import { useState } from "react";
import Index from "../Index.jsx";

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
`;

function ListUsers() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <>
      <BaseLayout>
        <Box>
          <div className="top-label">
            <h1> Listar usuários </h1>
            <button
              className="blue-btn"
              onClick={() => {
                setOpenCreateModal(true);
              }}
            >
              Adicionar usuário
            </button>
          </div>
          <Index
            openCreateModal={openCreateModal}
            setOpenCreateModal={setOpenCreateModal}
          />
        </Box>
      </BaseLayout>
    </>
  );
}

export default ListUsers;
