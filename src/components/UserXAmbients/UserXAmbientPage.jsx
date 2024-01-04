//React
import { useState } from "react";

//Libs
import styled from "styled-components";

//Components
import BaseLayout from "../../pages/BaseLayout.jsx";
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

function UserXAmbientPage() {
  const [openLinkUserXAmbientsModal, setOpenLinkUserXAmbientsModal] = useState(false);

  return (
    <>
      <BaseLayout>
        <Box>
          <div className="top-label">
            <h1> Ambientes X Usuários </h1>
            <button
              className="blue-btn"
              onClick={() => {
                setOpenLinkUserXAmbientsModal(true);
              }}
            >
              Criar vínculo
            </button>
          </div>
          <Index openLinkUserXAmbientsModal={openLinkUserXAmbientsModal} setOpenLinkUserXAmbientsModal={setOpenLinkUserXAmbientsModal} />
        </Box>
      </BaseLayout>
    </>
  );
}

export default UserXAmbientPage;
