import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styled from "styled-components";
import "../../Globals.css";
import { useFormik } from "formik";
import axios from "axios";

import { routes } from "../../env";

import { toast } from "react-toastify";

import { getToken } from "../../auth/authentications";

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
    width: 400px;
    height: auto;
    border-radius: 7px;
    background-color: white;
    padding: 2rem;
  }

  .top-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
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

  .form-group {
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

  .btn-reset-form {
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

function CreateCustomerGroupModal({
  openCreateModal,
  setOpenCreateModal,
  fetchCustomerGroup,
}) {
  //Set up the submit function
  async function handleSubmit(values, props) {
    const { resetForm } = props;
    try {
      const token = getToken();

      const { display_name, fantasy_name } = values;
      const customerGroupRoutes = routes.customerGroup;

      const body = {
        display_name: display_name,
        fantasy_name: fantasy_name,
      };

      await axios.post(customerGroupRoutes.create, body, {
        headers: {
          auth: token,
        },
      });

      setOpenCreateModal(false);

      toast.success(`Usuário '${values.display_name}' adicionado com sucesso!`);

      resetForm();

      fetchCustomerGroup();
    } catch (error) {
      console.debug(error);
      toast.error("Ops, algo deu errado. Por favor, tente novamente");
    }
  }

  const formik = useFormik({
    initialValues: {
      display_name: "",
      fantasy_name: "",
    },

    onSubmit: handleSubmit,
    resetForm: () => {
      formik.resetForm();
    },
  });

  if (!openCreateModal) return null;
  return (
    <ModalFade
      onClick={(e) => {
        if (e.target.classList.contains("modal-container")) {
          setOpenCreateModal(false);
        }
      }}
      className="modal-container"
    >
      <div className="modal-card">
        <div className="top-label">
          <h2>Criar customer group</h2>
          <AiOutlineCloseCircle
            style={{ color: "#171717" }}
            className="close-icon"
            onClick={() => {
              setOpenCreateModal(false);
            }}
          />
        </div>
        <div className="form-box">
          <form onSubmit={formik.handleSubmit}>
            <div className="content">
              <div className="form">
                <div className="form-group">
                  <TextField
                    fullWidth
                    size="small"
                    id="display_name"
                    label="Nome"
                    variant="outlined"
                    name="display_name"
                    value={formik.values.display_name}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    fullWidth
                    size="small"
                    id="fantasy_name"
                    label="Nome fantasia"
                    variant="outlined"
                    name="fantasy_name"
                    value={formik.values.fantasy_name}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="form-group"></div>
              <div className="buttons">
                <button onClick={formik.handleReset} className="btn-reset-form">
                  Limpar
                </button>
                <button
                  disabled={formik.isSubmitting}
                  type="submit"
                  className="blue-btn"
                >
                  Criar usuário
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ModalFade>
  );
}

export default CreateCustomerGroupModal;
