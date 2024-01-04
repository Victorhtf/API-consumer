//Libs
import styled from "styled-components";

//Components
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import SessionCheck from "../auth/useAuth.js";

//Styles
import "../Globals.css";

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
`;

const ColumnBox = styled.div`
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const Card = styled.div`
  height: calc(100vh - 90px);
  background-color: white;
  margin: 15px;
  padding: 30px;
  border-radius: 7px;
`;

function BaseLayout(props) {
  return (
    <>
      <SessionCheck>
        <RowBox>
          <Sidebar />
          <ColumnBox>
            <Header />
            <Card>{props.children}</Card>
          </ColumnBox>
        </RowBox>
      </SessionCheck>
    </>
  );
}

export default BaseLayout;
