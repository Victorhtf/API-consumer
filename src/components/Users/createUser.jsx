import styled from "styled-components";
import "../../Globals.css";
// import { MdDeleteSweep } from 'react-icons/md'
// import{ FiEdit3 } from "react-icons/fi"
import BaseLayout from "../../layouts/BaseLayout";
import CreateUserContent from "./CreateUserContent";
// import { useEffect } from "react"
// import axios from "axios"
// import { intradataConfig } from "../../env"
// import { useState } from "react"
// import { getToken } from "../../auth/authentications"
// import Modal from "./Modal.jsx"
// import React from "react"
// import UsersTable from "./usersTable"

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
