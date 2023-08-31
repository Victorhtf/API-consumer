import styled from 'styled-components'
import Sidebar from "../Sidebar"
import UsersContent from "./UsersContent"

const Box = styled.div `
  display: flex;
  `

const Users = () => {
  return (
    <Box>
        <Sidebar/>
        <UsersContent/>
    </Box>
  )
}

export default Users