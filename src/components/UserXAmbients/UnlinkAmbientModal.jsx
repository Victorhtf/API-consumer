import styled from "styled-components";
import { routes } from "../../env";
import { getToken } from "../../auth/authentications";
import { toast } from "react-toastify";
import axios from "axios";

const ModalFade = styled.div`
  background-color: rgb(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 1s;

  .modal-card {
    width: auto;
    height: auto;
    border-radius: 7px;
    background-color: white;
    padding: 2rem;
    display: flex;
    flex-direction: column;
  }

  .close-icon {
    font-size: 25px;
    cursor: pointer;
  }

  .content {
  }

  .form {
    gap: 1rem;
    display: flex;
    flex-direction: column;
  }

  .warn-text {
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: 1rem;
  }

  label {
    font-weight: 300px;
    font-size: 15px;
  }

  .input {
    width: 100%;
    border-radius: var(--btn-border-radius);
    height: 30px;
    padding: 10px;
    border: var(--input-border-color);
  }

  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 20px;
  }

  .btn-submit-form {
    background-color: var(--btn-bg-color);
    border: none;
    padding: 7px 14px 7px 14px;
    border-radius: var(--btn-border-radius);
    font-size: var(--btn-font-size);
    color: var(--primary-text-color);
    cursor: pointer;
  }
`;

const UnlinkAmbientModal = (props) => {
  const { openUnlinkModal, setOpenUnlinkModal, row, fetchUserXAmbient } = props;

  async function handleUnlink(row) {
    const usersRoutes = routes.user;

    const body = {
      user_id: row.id,
    };

    try {
      await axios.post(usersRoutes.unlinkAmbient, body, {
        headers: {
          auth: getToken(),
        },
      });
      fetchUserXAmbient();

      setOpenUnlinkModal(false);
    } catch (error) {
      toast.error("Ops, algo deu errado. Tente novamente");
    }
  }

  if (!openUnlinkModal) return null;
  return (
    <ModalFade
      onClick={(e) => {
        if (e.target.classList.contains("modal-container")) {
          setOpenUnlinkModal(false);
        }
      }}
      className="modal-container"
    >
      <div className="modal-card">
        <div className="top-label">
          <h2>Desvincular ambiente</h2>
        </div>
        <div className="warn-text">
          Tem certeza que deseja desvincular os ambientes do usuário
          <p className="highlight">{row.username}</p>?
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              setOpenUnlinkModal(false);
            }}
            className="cancel-btn"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              handleUnlink(row);
            }}
            className="delete-btn"
          >
            Desvincular
          </button>
        </div>
      </div>
    </ModalFade>
  );
};

export default UnlinkAmbientModal;
