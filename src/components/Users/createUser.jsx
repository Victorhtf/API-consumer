// import { useEffect } from "react"
import styled from 'styled-components'
import axios from "axios"
import "../../Globals.css"

function CreateUser () {
  const Form = styled.div`
    border: 1px solid #ccc;
    border-radius: 10px;
    height: 100%;
    padding: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
      font-size: 17px;
      margin-bottom: 40px;
      text-transform: uppercase;
    }

    .questions{
        display: flex;
        gap: 20px;
        color: var(--primary-font-color);
    }

    p {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 5px;

    }

    `
  return (
    <Form>
      <h2>Criar usuários</h2>
      <div className="questions">
        <div className="username-label">
            <p>Username</p>
            <input type="text" placeholder="Username"/>
        </div>
        <div className="username-label">
            <p>Password</p>
            <input type="text" placeholder="Password"/>
        </div>
        <div className="username-label">
            <p>E-mail</p>
            <input type="text" placeholder="E-mail"/>
        </div>
        <div className="username-label">
            <p>Roles names</p>
            <input type="text" placeholder="Roles"/>
        </div>
      </div>
      <div className="buttons">
        <input type="submit" placeholder='Enviar'/>
      </div>
    </Form>

  )
}

export default CreateUser;