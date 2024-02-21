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

function GlobalWatchlistPage() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <Box>
      <div className="top-label">
        <h1> Watchlists - Global </h1>
        <button
          className="blue-btn"
          onClick={() => {
            setOpenCreateModal(true);
          }}
        >
          Criar watchlist
        </button>
      </div>
      <Index openCreateModal={openCreateModal} setOpenCreateModal={setOpenCreateModal} />
    </Box>
  );
}

export default GlobalWatchlistPage;
