import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styled from "styled-components";
import "../../../Globals.css";
import { useFormik } from "formik";
import axios from "axios";

import { routes } from "../../../env";

import { toast } from "react-toastify";

import { getToken } from "../../../auth/authentications";

const ModalFade = styled.div`
  background-color: rgb(0, 0, 0, 0.7);
  position: absolute;
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

function CreateUserModal(props) {
  const roles = [
    "SYS_ADMIN",
    "ADMIN",
    "PHYSICAL_WORLD_READER",
    "PHYSICAL_WORLD_MANAGER",
    "META_WORLD_READER",
    "META_WORLD_MANAGER",
    "PHYSICAL_NOTIFICATIONS_READER",
    "PHYSICAL_NOTIFICATIONS_MANAGER",
    "CALENDAR_EVENTS_DETAILS_READER",
    "CALENDAR_EVENTS_MANAGER",
  ];

  //Set up the submit function
  async function handleSubmit(values, { setSubmitting, resetForm }) {
    try {
      setSubmitting(true);

      const token = getToken();

      const { username, email, roles, password } = values;
      const userRoutes = routes.user;

      const body = {
        username: username,
        password: password,
        email: email,
        role_names: roles,
      };

      console.log(body);
      console.log(userRoutes.create);

      await axios.post(userRoutes.create, body, {
        headers: {
          auth: token,
        },
      });
      setSubmitting(false);

      setOpenCreateModal(false);

      toast.success(`Usuário '${values.username}' adicionado com sucesso!`);

      resetForm();
    } catch (error) {
      alert("a");
      toast.error("Ops, algo deu errado. Por favor, tente novamente");
    }
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      roles: [],
    },

    onSubmit: handleSubmit,
    resetForm: () => {
      formik.resetForm();
    },
  });

  const { openCreateModal, setOpenCreateModal } = props;
  if (!openCreateModal) return null;
  return (
    <ModalFade>
      <div className="modal-card">
        <div className="top-label">
          <h2>Criar usuário</h2>
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
                    id="username"
                    label="Nome de usuário"
                    variant="outlined"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    fullWidth
                    size="small"
                    id="password"
                    label="Senha"
                    variant="outlined"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    fullWidth
                    size="small"
                    id="email"
                    label="E-mail"
                    variant="outlined"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <FormControl size="small" fullWidth>
                    <InputLabel id="roles">Papéis</InputLabel>
                    <Select
                      multiple
                      fullWidth
                      id="roles"
                      name="roles"
                      label="roles"
                      value={formik.values.roles}
                      onChange={formik.handleChange}
                    >
                      {roles.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="buttons">
                <button onClick={formik.handleReset} className="btn-reset-form">
                  Limpar
                </button>
                <button
                  disabled={formik.isSubmitting}
                  type="submit"
                  className="btn-submit-form"
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

export default CreateUserModal;
