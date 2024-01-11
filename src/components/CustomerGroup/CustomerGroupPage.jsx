//React
import { useState } from "react";

//Libs
import styled from "styled-components";

//Components
import Index from "./Index.jsx";

//Dependencies

//Styles
import "../../Globals.css";

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

function CustomerGroupPage() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <Box>
      <div className="top-label">
        <h1> Listar grupo de cliente </h1>
        <button
          className="blue-btn"
          onClick={() => {
            setOpenCreateModal(true);
          }}
        >
          Adicionar grupo de cliente
        </button>
      </div>
      <Index openCreateModal={openCreateModal} setOpenCreateModal={setOpenCreateModal} />
    </Box>
  );
}

export default CustomerGroupPage;
