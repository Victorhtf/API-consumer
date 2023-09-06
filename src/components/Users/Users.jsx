import styled from 'styled-components'
// import Sidebar from "../Sidebar"
import UsersContent from "./UsersContent"

const Box = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  `

const Users = () => {
  return (
    <Box>
        <UsersContent/>
    </Box>
  )
}

export default Users