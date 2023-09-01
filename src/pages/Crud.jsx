import MainContent from "../components/MainContent";
import styled from 'styled-components';
import Sidebar from "../components/Sidebar";

const Box = styled.div `
  display: flex;
    `

function Crud() {
    return (
        <Box>
            <Sidebar/>
            <MainContent/>
        </Box>
    )
}

export default Crud