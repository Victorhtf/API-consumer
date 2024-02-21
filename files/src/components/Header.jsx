//React
import { useState } from "react";

//Libs
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";

//Components
import SettingsModal from "./Header/SettingsModal";

const SidebarBox = styled.div`
  width: 100%;
  height: 75px;
  background-color: #182136;
  color: black;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  z-index: 1000;
  -moz-box-shadow: 5px 0 6.25px 0 #000000;
  -webkit-box-shadow: 5px 0 6.25px 0 #000000;
  box-shadow: 5px 0 6.25px 0 #000000;

  .logout {
    justify-self: flex-end;
    display: flex;
    align-items: center;
    margin-right: 37.5px;
  }

  .icon {
    padding: 7.25px;
    color: white;
    font-size: 27.5px;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 50%;
    cursor: pointer;
    align-self: center;
    justify-self: center;
    background: linear-gradient(118deg, #4ec3ee, rgba(78, 195, 238, 0.7));
    transition: 0.25s ease;

    &:hover {
      box-shadow: 0 0 12.5px 1.25px rgba(78, 195, 238, 0.7);
      scale: 1.05;
    }
  }

  .text {
    font-size: 1.0235rem;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    color: white;
    margin: 1.25rem;
  }

  .name {
    font-weight: 750;
    font-size: 1.125rem;
    text-transform: uppercase;
  }
`;

function Header() {
  const [openSettingsModal, setOpenSettingsModal] = useState(null);

  const sessionUsername = sessionStorage.getItem("name");
  let username = null;

  if (sessionUsername != null) {
    username = sessionUsername.replace(/["']/g, "");
  }

  return (
    <>
      <SettingsModal openSettingsModal={openSettingsModal} setOpenSettingsModal={setOpenSettingsModal} />
      <SidebarBox>
        <div className="logout">
          <div className="text">
            <p>Seja bem vindo</p>
            <p className="name">{sessionUsername != null && sessionUsername !== undefined ? username : ""}</p>
          </div>
          <div
            onClick={() => {
              setOpenSettingsModal(true);
            }}
            className="icon"
          >
            <CgProfile className="self-center" />
          </div>
        </div>
      </SidebarBox>
    </>
  );
}

export default Header;
