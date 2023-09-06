// import styled from 'styled-components'
import styled from "styled-components"
import Users from "./Users/Users"
import Header from "./Header"


const Box = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    `

const Card = styled.div `
    background-color: white;
    border-radius: 10px;
    justify-content: space-between;
    margin: 12px;
    padding: 5px;
    flex: 1;
    `
function MainContent () {
    return (
        <Box>
            <Header isActive={true}>
                <p>SOU PARAGRAFO</p>
            </Header>
            <Card>
                <Users/>
            </Card>
        </Box>
    )
}

export default MainContent