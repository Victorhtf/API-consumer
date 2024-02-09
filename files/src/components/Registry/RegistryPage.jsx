//React
import { useState } from "react";

//Libs
import styled from "styled-components";

//Styles
import "../../Globals.css";
import DeleteRegistry from "./DeleteRegistry";
import HistoryRegistry from "./HistoryRegistry";

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

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
  }
`;

function RegistryPage() {
  const [deletedData, setDeletedData] = useState([]);

  const handleSetDeleteHistory = (data) => {
    setDeletedData(data);
  };

  return (
    <Box>
      <div className="top-label">
        <h1> Registros X-Faces </h1>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          marginTop: "60px",
          alignSelf: "flex-start",
          justifySelf: "flex-start",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div className="grid">
          <DeleteRegistry handleSetDeleteHistory={handleSetDeleteHistory} />
          <HistoryRegistry deletedData={deletedData} />
        </div>
      </div>
    </Box>
  );
}

export default RegistryPage;
