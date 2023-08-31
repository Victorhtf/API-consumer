import Sidebar from "../Sidebar";
import CamerasContent from "./CamerasContent";
import styled from 'styled-components'

const Box = styled.div `
    display: flex;
    `

function Cameras () {
    return (
        <Box>
            <Sidebar/>
            <CamerasContent/>
        </Box>
    )
}

export default Cameras;