import styled from "styled-components";

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

  .cancel-btn {
    background-color: var(--btn-2bg-color);
    border: var(--btn-border-color);
    padding: 7px 14px 7px 14px;
    border-radius: var(--btn-border-radius);
    font-size: var(--btn-font-size);
    color: var(--secondary-text-color);
    font-size: var(--btn-font-size);
    cursor: pointer;
  }
`;

const DeleteUserModal = (props) => {
  const { openDeleteModal, setOpenDeleteModal, row } = props;

  // Delete user from database
  async function handleDelete(row) {
    console.log(row.id);

    // setOpenDeleteModal(true);
    // const token = getToken();
    console.log("handleDelete ok");
    // const finalUrl = `${baseServiceUrl}:${intradataConfig["port"]}/${intradataConfig["basePath"]}/user`;
    // try {
    //   const deletedUser = await axios.delete(`${finalUrl}/${id}`, {
    //     headers: {
    //       auth: token,
    //     },
    //   });
    //   fetchUsers(token);
    //     alert(`Usuário deletado com sucesso: ${deletedUser}`);
    //   } catch (error) {
    //     console.log("erro");
    //   }
  }

  if (!openDeleteModal) return null;
  return (
    <ModalFade
      onClick={() => {
        setOpenDeleteModal(false);
      }}
    >
      <div className="modal-card">
        <div className="top-label">
          <h2>Deletar usuário</h2>
        </div>
        <div className="warn-text">
          Tem certeza que deseja deletar o usuário
          <p className="highlight">{row.username}</p>?
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

export default DeleteUserModal;
