import styled from "styled-components";
import "../../Globals.css";
// import { MdDeleteSweep } from 'react-icons/md'
// import{ FiEdit3 } from "react-icons/fi"
import BaseLayout from "../../layouts/BaseLayout";
// import { useEffect } from "react"
// import axios from "axios"
// import { intradataConfig } from "../../env"
// import { useState } from "react"
// import { getToken } from "../../auth/authentications"
import Modal from "../../components/Modal";
// import React from "react"
import UsersTable from "./usersTable";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CreateUserContent from "./CreateUserContent";

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

  .add-user-btn {
    background: var(--btn-bg-color);
    color: white;
    align-self: flex-end;
    justify-content: flex-start;
    border: none;
    padding: 7px;
    margin-bottom: 10px;
    border-radius: var(--btn-border-radius);
    cursor: pointer;
  }

  .label {
    display: flex;
    gap: 40px;
  }
`;

function ListUsers() {
  const [open, setOpen] = useState(false);
  console.log(open);
  const navigate = useNavigate();

  return (
    <>
      <Modal open={open} title={"Título 1"} setOpen={setOpen}>
        <CreateUserContent />
      </Modal>
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
