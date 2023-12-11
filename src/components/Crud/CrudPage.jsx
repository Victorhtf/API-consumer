import styled from "styled-components";
import { useState } from "react";
import "../../Globals.css";
import BaseLayout from "../../pages/BaseLayout";

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

const Dashboard = styled.div`
  background-color: blue;
  display: grid;
`;

function CrudPage() {
  return (
    <>
      <BaseLayout>
        <Box>
          <div className="top-label">
            <h1>CRUD - Intradata</h1>
          </div>
          <Dashboard></Dashboard>
        </Box>
      </BaseLayout>
    </>
  );
}

export default CrudPage;
