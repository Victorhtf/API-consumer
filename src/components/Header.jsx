import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import SettingsModal from "./Header/SettingsModal";
import { useState } from "react";

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
    padding: 6px;
    color: white;
    font-size: 22px;
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
      box-shadow: 0 0 10px 1px rgba(78, 195, 238, 0.7);
      scale: 1.05;
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
  const [openSettingsModal, setOpenSettingsModal] = useState(null);

  return (
    <Box>
      <SettingsModal
        openSettingsModal={openSettingsModal}
        setOpenSettingsModal={setOpenSettingsModal}
      />
      <div className="logout">
        <div className="text">
          <p>Seja bem vindo</p>
          <p className="name">Victor</p>
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
    </Box>
  );
}

export default Header;
