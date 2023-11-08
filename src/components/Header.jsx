import styled from "styled-components";
import { BiLogOut } from "react-icons/bi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Box = styled.div`
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
    margin-right: 30px;
  }

  .icon {
    padding: 10px;
    color: white;
    font-size: 22px;
    justify-content: center;
    align-items: center;
    display: flex;
    cursor: pointer;

    :hover {
    }
  }

  .text {
    font-size: 0.89rem;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    color: white;
    margin: 1rem;
  }

  .name {
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
  }
`;

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    toast.error("Usuário desconectado.", {
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Box>
      <div className="logout">
        <div className="text">
          <p>Seja bem vindo</p>
          <p className="name">Victor</p>
        </div>
        <div
          onClick={() => {
            handleLogout();
          }}
          className="icon"
        >
          <BiLogOut />
        </div>
      </div>
    </Box>
  );
}

export default Header;
