//Libs
import { MenuItem, Select, FormControl, InputLabel, TextField } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styled from "styled-components";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

//Dependencies
import { routes } from "../../routes/routes.js";
import { getToken } from "../../auth/useAuth.js";

// Components
import { ModalFade } from "../StyledComponents/ModalFade.jsx";

//Styles
import "../../Globals.css";

function EditUserModal({ openEditModal, setOpenEditModal, fetchUsers, rowState }) {
  const rolesList = [
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

  async function handleEdit(values, { setSubmitting, resetForm }) {
    const { username, password, email, roles } = values;
    try {
      setSubmitting(true);

      const token = getToken();

      const userRoutes = routes.user;

      const body = {
        username: username,
        password: password,
        email: email,
        role_names: roles,
      };

      const response = await axios.patch(`${userRoutes.updateById}${rowState.id}`, body, {
        headers: {
          auth: token,
        },
      });

      setSubmitting(false);

      setOpenEditModal(false);

      toast.success(`Usuário '${values.username}' atualizado com sucesso!`, {
        position: "bottom-right",
      });

      resetForm();

      fetchUsers();
    } catch (error) {
      toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
    }
  }

  const formik = useFormik({
    initialValues: {
      username: rowState.username,
      password: "",
      email: rowState.email,
      roles: rowState.roles.map((item) => item.name),
    },
    onSubmit: handleEdit,
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

  if (!openEditModal) return null;
  return (
    <ModalFade
      onClick={(e) => {
        if (e.target.classList.contains("modal-container")) {
          setOpenEditModal(false);
        }
      }}
      className="modal-container"
    >
      <div className="modal-card">
        <div className="top-label">
          <h2>Editar usuário</h2>
          <AiOutlineCloseCircle
            style={{ color: "#171717" }}
            className="close-icon"
            onClick={() => {
              setOpenEditModal(false);
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
                    size="large"
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
                    size="large"
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
                    size="large"
                    id="email"
                    label="E-mail"
                    variant="outlined"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <FormControl size="large" fullWidth>
                    <InputLabel id="roles">Papéis</InputLabel>
                    <Select multiple MenuProps={MenuProps} id="roles" name="roles" label="roles" value={formik.values.roles} onChange={formik.handleChange}>
                      {rolesList.map((item, rolesEditIndex) => (
                        <MenuItem key={rolesEditIndex} value={item}>
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
                <button disabled={formik.isSubmitting} type="submit" className="btn-submit-form">
                  Editar usuário
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ModalFade>
  );
}

export default EditUserModal;
