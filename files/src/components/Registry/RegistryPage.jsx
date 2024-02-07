//React

//Libs
import styled from "styled-components";

//Styles
import "../../Globals.css";
import DeleteRegistry from "./DeleteRegistry";

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

function RegistryPage() {
  return (
    <Box>
      <div className="top-label">
        <h1> Registros X-Faces </h1>
      </div>
      <div
        style={{
          display: "flex",
          width: "40%",
          height: "100%",
          marginTop: "60px",
          alignSelf: "flex-start",
          justifySelf: "flex-start",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div>
          <DeleteRegistry />
        </div>
      </div>
    </Box>
  );
}

export default RegistryPage;
