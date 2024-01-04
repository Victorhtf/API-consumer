import { toast } from "react-toastify";

//React
import { useEffect, useState } from "react";

//Libs
import { MenuItem, Select, FormControl, InputLabel, TextField } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useFormik } from "formik";
import styled from "styled-components";
import axios from "axios";

//Dependencies
import { routes } from "../../env";
import { getToken } from "../../auth/useAuth";

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
    width: auto;
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

function LinkUserXAmbientsModal({ row, openLinkUserXAmbientsModal, setOpenLinkUserXAmbientsModal, fetchUserXAmbient }) {
  const [usersList, setUsersList] = useState([]);
  const [ambientsList, setAmbientsList] = useState([]);
  const [data, setData] = useState(false);

  async function handleUserList() {
    const usersRoutes = routes.user;
    try {
      const { data: response } = await axios.get(usersRoutes.listAll, {
        headers: {
          auth: getToken(),
        },
      });

      const usersData = response;

      setUsersList(usersData);
    } catch (error) {}
  }

  //Handle data
  function handleData() {
    handleAmbientsList();
    handleUserList();
  }

  //Get thEDe AmbientsList
  async function handleAmbientsList() {
    const ambientRoutes = routes.ambient;
    try {
      const { data: response } = await axios.get(ambientRoutes.listAll, {
        headers: {
          auth: getToken(),
        },
      });

      const ambientData = response;

      setAmbientsList(ambientData);
    } catch (error) {}
  }

  useEffect(() => {
    setData(true);
    if (!data) {
      handleData();
    }
  }, [data]);

  async function handleSubmitLinkUserXAmbient(values, { setSubmitting, resetForm }) {
    try {
      setSubmitting(true);
      const token = getToken();

      const userRoutes = routes.user;
      const { ambient_id, user_id } = values;

      const body = {
        ambient_ids: ambient_id,
        user_id: user_id,
      };

      axios.post(userRoutes.linkAmbient, body, {
        headers: {
          auth: token,
        },
      });

      setSubmitting(false);

      setOpenLinkUserXAmbientsModal(false);

      toast.success(`Vinculo atualizado com sucesso!`, {
        position: "bottom-right",
      });

      resetForm();

      fetchUserXAmbient();
    } catch (error) {
      toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
    }
  }

  const formik = useFormik({
    initialValues: {
      user_id: undefined,
      ambient_id: [],
    },
    onSubmit: handleSubmitLinkUserXAmbient,
    resetForm: () => {
      formik.resetForm();
    },
  });

  if (!openLinkUserXAmbientsModal) return null;
  return (
    <ModalFade
      onClick={(e) => {
        if (e.target.classList.contains("modal-container")) {
          setOpenLinkUserXAmbientsModal(false);
        }
      }}
      className="modal-container"
    >
      <div className="modal-card">
        <div className="top-label">
          <h2>Alterar vínculo</h2>
          <AiOutlineCloseCircle
            style={{ color: "#171717" }}
            className="close-icon"
            onClick={() => {
              setOpenLinkUserXAmbientsModal(false);
            }}
          />
        </div>
        <div className="form-box">
          <form onSubmit={formik.handleSubmit}>
            <div className="content">
              <div className="form">
                <div className="form-group">
                  <FormControl size="small">
                    <InputLabel id="user_id">Usuário</InputLabel>
                    <Select
                      sx={{ width: "200px" }}
                      size="small"
                      id="user_id"
                      name="user_id"
                      variant="outlined"
                      label="Usuário"
                      value={formik.values.user_id}
                      onChange={formik.handleChange}
                    >
                      {usersList.map((users) => {
                        return <MenuItem value={users.id}>{users.username}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ width: 300 }}>
                    <InputLabel id="ambient">Ambiente</InputLabel>
                    <Select
                      multiple
                      sx={{
                        display: "flex",
                        margin: "dence",
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                      id="ambient_id"
                      variant="outlined"
                      name="ambient_id"
                      label="Ambiente"
                      value={formik.values.ambient_id}
                      onChange={formik.handleChange}
                    >
                      {ambientsList.map((ambient) => {
                        return <MenuItem value={ambient.id}>{ambient.display_name}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="buttons">
                <button onClick={formik.handleReset} className="cancel-btn">
                  Limpar
                </button>
                <button disabled={formik.isSubmitting} type="submit" className="btn-submit-form">
                  Alterar vínculo
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ModalFade>
  );
}

export default LinkUserXAmbientsModal;
