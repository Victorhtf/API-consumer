import styled from "styled-components"
import {BiLogOut} from 'react-icons/bi'

const Box = styled.div `
    width: 100%;
    background-color: #182136;
    height: 60px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: flex-end;


    .logout {
        justify-self: flex-end;
        display: flex;
        align-items: center;
    }

    .icon {
        padding: 3px;
    }
`




function Header(props) {
    return (
        console.log(props),
        <Box>
            <div className="logout">
                <div>
                    <p>Seja bem vindo</p>
                    <p>Victor</p>
                </div>
                <div className="icon">
                    <BiLogOut/>
                </div>
            </div>
        </Box>
    )
}

export default Header