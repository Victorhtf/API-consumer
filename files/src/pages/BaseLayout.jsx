//Libs
import styled from "styled-components";

//Components
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import SessionCheck from "../auth/useAuth.js";

//Styles
import "../Globals.css";
import { Outlet } from "react-router-dom";

const Box = styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const Card = styled.div`
  background-color: #ffffff;
  width: auto;
  height: auto;
  margin: 18.75px;
  padding: 37.5px;
  border-radius: 8.75px;
  flex: 1;
`;

window.addEventListener("resize", () => {
  const larguraDaTela = window.innerWidth;
  return larguraDaTela;
  //Variavel setada, agr só utilizar
});

window.dispatchEvent(new Event("resize"));

function BaseLayout(props) {
  return (
    <>
      <SessionCheck>
        <Box>
          <Sidebar />
          <RowBox>
            <Header />
            <Card>
              <Outlet />
            </Card>
          </RowBox>
        </Box>
      </SessionCheck>
    </>
  );
}

export default BaseLayout;
