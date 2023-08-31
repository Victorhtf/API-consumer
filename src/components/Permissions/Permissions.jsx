import Sidebar from "../Sidebar"
import PermissionsContent from "./PermissionsContent.jsx"
import styled from "styled-components"

const Box = styled.div `
  display: flex;
  `

const Permissions = () => {
  return (
    <Box>
        <Sidebar/>
        <PermissionsContent/>
    </Box>
  )
}

export default Permissions