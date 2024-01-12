//Libs
import styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlinePoweroff } from "react-icons/ai";

const ModalFade = styled.div`
  background-color: rgb(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  transition: 1s;
  justify-content: flex-end;
  align-items: flex-start;

  .modal-card {
    position: relative;
    margin: 3.8% 1.6%;
    padding: 30px;
    border-radius: 7px;
    background-color: white;
    padding: 10px 0px;
    transition: 1;
  }

  .modal-items {
    transition: 0.4s;

    &:hover {
      background-color: #b6b6b6;
    }
  }

  .logout-container {
    padding: 10px 20px;
    gap: 10px;
    justify-content: center;
    align-items: center;
    display: flex;
    min-width: 100%;
    min-height: 100%;
  }

  p {
    font-size: 14px;
  }
`;

function SettingsModal({ openSettingsModal, setOpenSettingsModal }) {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("roles");
    sessionStorage.removeItem("meta_integrations");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("permissions");

    navigate("/");

    toast.error("Usuário desconectado.", {
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return openSettingsModal ? (
    <ModalFade
      onClick={(e) => {
        if (e.target.classList.contains("modal-container")) {
          setOpenSettingsModal(false);
        }
      }}
      className="modal-container"
    >
      <div className="modal-card">
        <div className="modal-items">
          <div
            onClick={() => {
              handleLogout();
            }}
            className="logout-container"
          >
            <AiOutlinePoweroff className="self-center" />
            <p className="self-center">Logout</p>
          </div>
        </div>
      </div>
    </ModalFade>
  ) : null;
}

export default SettingsModal;
