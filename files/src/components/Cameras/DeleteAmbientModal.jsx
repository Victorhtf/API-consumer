//Libs
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";

//Dependencies
import { getToken } from "../../auth/useAuth";
import { routes } from "../../routes/routes.js";

const ModalFade = styled.div`
  background-color: rgb(0, 0, 0, 0.7);
  position: fixed;
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

const DeleteCustomerModal = (props) => {
  const { openDeleteModal, setOpenDeleteModal, row, fetchWatchlistAmbients } = props;

  async function handleDelete(row) {
    const ambientRoutes = routes.ambient;

    const token = getToken();

    try {
      await axios.delete(ambientRoutes.deleteById + row.id, {
        headers: {
          auth: token,
        },
      });

      toast.success(`Ambiente "${row.display_name}" deletado com sucesso`, {
        position: "bottom-right",
      });

      setOpenDeleteModal(false);

      fetchWatchlistAmbients();
    } catch (error) {
      toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
    }
  }

  if (!openDeleteModal) return null;
  return (
    <ModalFade
      onClick={(e) => {
        if (e.target.classList.contains("modal-container")) {
          setOpenDeleteModal(false);
        }
      }}
      className="modal-container"
    >
      <div className="modal-card">
        <div className="top-label">
          <h2>Deletar ambiente</h2>
        </div>
        <div className="warn-text">
          Tem certeza que deseja deletar o ambiente
          <p className="highlight">{row.display_name}</p>?
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              setOpenDeleteModal(false);
            }}
            className="cancel-btn"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              handleDelete(row);
            }}
            className="delete-btn"
          >
            Deletar
          </button>
        </div>
      </div>
    </ModalFade>
  );
};

export default DeleteCustomerModal;
