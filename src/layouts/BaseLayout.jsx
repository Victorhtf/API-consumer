// import MainContent from "../components/MainContent";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../Globals.css";
import ListUsers from "../components/Users/ListUsers";

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Card = styled.div`
  background-color: var(--card-color);
  height: 100%;
  margin: 15px;
  border-radius: var(--card-border-radius);
`;

function BaseLayout(props) {
  return (
    <RowBox>
      <Sidebar />
      <ColumnBox>
        <Header />
        <Card>
          {props.children}
        </Card>
      </ColumnBox>
    </RowBox>
  );
}

export default BaseLayout;
