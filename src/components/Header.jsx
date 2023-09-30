import styled from "styled-components";
import { BiLogOut } from "react-icons/bi";
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
    color: white;
    font-size: 20px;
    margin: 0 15px 0 15px;
    justify-content: center;
    align-items: center;
    display: flex;
    cursor: pointer;
  }

  .text {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    color: white;
  }

  .name {
    font-weight: 600;
    text-transform: uppercase;
  }
`;

function Header(props) {
  const navigate = useNavigate();
  return (
    (
      <Box>
        <div className="logout">
          <div className="text">
            <p>Seja bem vindo</p>
            <p className="name">Victor</p>
          </div>
          <div
            onClick={() => {
              navigate("/");
            }}
            className="icon">
            <BiLogOut />
          </div>
        </div>
      </Box>
    )
  );
}

export default Header;
