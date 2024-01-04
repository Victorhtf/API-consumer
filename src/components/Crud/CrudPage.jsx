//React
import { useState } from "react";

//Libs
import styled from "styled-components";

//Components
import BaseLayout from "../../pages/BaseLayout";

//Styles
import "../../Globals.css";

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex;

  .box {
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      display: flex;
      align-items: center;
      align-self: center;
      justify-content: center;
    }
  }
`;

function CrudPage() {
  return (
    <>
      <BaseLayout>
        <Box>
          <div>
            <h1>Intradata - CRUD</h1>
          </div>
        </Box>
      </BaseLayout>
    </>
  );
}

export default CrudPage;
