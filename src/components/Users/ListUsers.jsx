import styled from "styled-components"
import "../../Globals.css"
import { MdDeleteSweep } from 'react-icons/md'
import{ FiEdit3 } from "react-icons/fi"

function ListUsers () {
  const Users = [
    {name: 'John', surname: 'Doe', username: 'Doefull', email:'doe@example.com', edit_icon: FiEdit3, delete_icon: MdDeleteSweep},


  ]

  const Box = styled.div `
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: var(--primary-font-color);

  .box {
    width: 70%;
    display: flex;
    flex-direction: column;
  }

  
  .btn-add-user {
    background: var(--btn-primary-color);
    color: white;
    align-self: flex-end;
    justify-content: flex-start;
    border: none;
    padding: 7px;
    margin-bottom: 10px;
    border-radius: var(--btn-border-radius);

    &:hover {
      transform: scale(1.01)
    }
  }

  .label {
    display: flex;
    gap: 40px;

  }
  `
  const List = styled.div `
  width: 100%;
  display: flex;
  padding: 10px 20px 10px 20px;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  `
  const ListLabel = styled.div `
    width: 100%;
    display: grid;
    font-size: var(--h4-font-size);
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    font-weight: 600;
    margin: 7px 0 12px 0;



  `
  const ListItem = styled.div `

    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    font-size: var(--h4-font-size);
    font-weight: 500;

    .container-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
     
    }

    .label-actions {
      display: flex;
      justify-content: flex-end;
      align-self: center;
    }


    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      border-radius: 4px;
      height: 30px;
      width: 30px;
      font-size: 18px;
      color: var(--primary-font-color);
      border: 1px solid #dadada;
      box-shadow: -1px 1px 5px 0px rgba(0,0,0,0.75);
      -webkit-box-shadow: -1px 1px 5px 0px rgba(0,0,0,0.75);
      -moz-box-shadow: -1px 1px 5px 0px rgba(0,0,0,0.75);
    }
    `

  async function fetchUsers() {
      try {
        const response = await axios.get('https://localhost:8000')
        console.log(response)
        
      } catch (error) {
        console.error(error)
        
      }
    }
    
  return (
    <Box>
      <div className='box'>
        <button className='btn-add-user'>Novo usuário</button>
        <List>
          <ListLabel>
            <p>Nome</p>
            <p>Sobrenome</p>
            <p>Username</p>
            <p>E-mail</p>
            <p className="label-actions">Ações</p>
          </ListLabel>
          <ListItem>
          {Users.map((user, index) => {
            return (
              <>
                <p key={index}>{user.name}</p>
                <p key={index}>{user.surname}</p>
                <p key={index}>{user.username}</p>
                <p key={index}>{user.email}</p>
                <div className="container-icon"> 
                  <div key={index} className="icon">{user.delete_icon()}</div>
                  <div key={index} className="icon">{user.edit_icon()}</div>
                </div>
              </>
            )
          })}
          </ListItem>
        </List>

      </div>
    </Box>
  )
}


export default ListUsers