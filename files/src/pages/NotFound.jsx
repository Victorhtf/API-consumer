import styled from "styled-components";
import IntradataWhiteLogo from "../assets/logo/intradata-white.png";
import { useNavigate } from "react-router-dom";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
`;

export function NotFound() {
  const navigate = useNavigate();
  return (
    <Box>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <h2 style={{ fontSize: "52px", fontWeight: "800" }}>404</h2>
          <img style={{ width: "250px", marginBottom: "20px" }} src={IntradataWhiteLogo} />
        </div>
        <btn
          className="blue-btn"
          onClick={() => {
            navigate("/crud");
          }}
        >
          Início
        </btn>
      </div>
    </Box>
  );
}
