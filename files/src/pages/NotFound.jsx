import styled from "styled-components";
import NotFoundSVG from "../assets/svg/undraw_no_data_re_kwbl.svg";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export function NotFound() {
  return (
    <Box>
      <img style={{ width: "200px", marginBottom: "20px" }} src={NotFoundSVG} />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white", flexDirection: "column", gap: "10px" }}>
        <h2>404</h2>
        <p>Ops. Essa página não foi encontrada.</p>
      </div>
    </Box>
  );
}
