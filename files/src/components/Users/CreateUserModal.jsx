//Libs
import { MenuItem, Select, FormControl, InputLabel, TextField } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import styled from "styled-components";
import axios from "axios";
import * as Yup from "yup";

//Dependencies
import { routes } from "../../routes/routes.js";
import { getToken } from "../../auth/useAuth.js";

//Styles
import "../../Globals.css";

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
`;

function CreateUserModal({ openCreateModal, setOpenCreateModal, fetchUsers }) {
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

  async function handleSubmit(values, props) {
    const { resetForm } = props;
    try {
      const token = getToken();

      const { username, email, roles, password } = values;
      const userRoutes = routes.user;

      await validateschema.validate(values, { abortEarly: false });

      const body = {
        username: username,
        password: password,
        email: email,
        role_names: roles,
      };

      await axios.post(userRoutes.create, body, {
        headers: {
          auth: token,
        },
      });

      setOpenCreateModal(false);

      toast.success(`Usuário '${values.username}' adicionado com sucesso!`, {
        position: "bottom-right",
      });

      resetForm();

      fetchUsers();
    } catch (error) {
      if (error.inner) {
        error.inner.forEach((err) => {
          toast.error(err.message);
        });
        return;
      }
      console.debug(error);
      toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
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

  const item_height = 48;
  const item_padding_top = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: item_height * 4.5 + item_padding_top,
      },
    },
  };

  const validateschema = Yup.object().shape({
    username: Yup.string().required("Campo obrigatório").min(4, "O usuário precisa ter no mínimo 4 caracteres."),
    password: Yup.string().required("Campo obrigatório").min(4, "A senha precisa ter no mínimo 4 caracteres."),
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
                    validationSchema={validateschema}
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
                      MenuProps={MenuProps}
                      id="roles"
                      name="roles"
                      label="roles"
                      value={formik.values.roles}
                      onChange={formik.handleChange}
                    >
                      {roles.map((item, rolesIndex) => (
                        <MenuItem key={rolesIndex} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="buttons">
                <button onClick={formik.handleReset} className="cancel-btn">
                  Limpar
                </button>
                <button disabled={formik.isSubmitting} type="submit" className="blue-btn">
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
