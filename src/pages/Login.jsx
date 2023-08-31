import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from 'styled-components'
import loginbg1 from '../assets/system_pages/login-bg1.jpg'
import loginbg2 from '../assets/system_pages/login-bg2.jpg'
import loginbg3 from '../assets/system_pages/login-bg3.jpg'




const Box = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-image: url(${loginbg3});
    background-size: cover;
    `

const ModalBox = styled.div `
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 1rem 3rem 1rem 3rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.36);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10.1px);
    -webkit-backdrop-filter: blur(10.1px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    gap: 15px;
    
    
    h3 {
        color: #171717;
        font-weight: 700;
        font-size: 20px;
    }

    p {
        color: #171717;
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 5px;
    }

    input {
        border: none;
        border-radius: 20px;
        height: 25px;
        padding-left: 10px;
        font-size: 12px;

    }
    `

const ButtonBox = styled.div `
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    align-items: align-items;
    margin: 1rem 0 1rem 0;
    width: 100%;


    button {
        border: none;
        padding: 0.6rem;
        border-radius: 15px;
        background: linear-gradient(to right, rgb(173, 83, 137), rgb(60, 16, 83));
        color: white;
        font-weight: 500;
        cursor: pointer;
        font-size: 12px;

        &:hover {
            background: #171717;
            color: white;
            transform: scale(1.1);
            transition: 0.8s;
        }
    }

`


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    return (
        <Box>
            <ModalBox>
                <h3>LOGIN</h3>
                <div className="username">
                    <p>Type your username</p>
                    <input type='text' placeholder='Username' value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                </div>
                <div className="password">
                    <p>Type your password</p>
                    <input type="password" placeholder='Password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <ButtonBox>
                    <button onClick={()=> {navigate('/crud')}}>Login</button>
                    <button>Cadastre-se</button>
                </ButtonBox>
            </ModalBox>
        </Box>
    )
}

export default Login