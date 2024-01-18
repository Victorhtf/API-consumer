import { toast } from "react-toastify";

//React
import { useEffect, useState } from "react";

//Libs
import { MenuItem, Chip, Select, FormControl, InputLabel, TextField, Autocomplete } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useFormik } from "formik";
import styled from "styled-components";
import axios from "axios";

//Dependencies
import { routes } from "../../routes/routes.js";
import { getToken } from "../../auth/useAuth";

//Styles
import "../../Globals.css";

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

const LinkUserXAmbientsModal = (props) => {
  const { openLinkUserXAmbientsModal, setOpenLinkUserXAmbientsModal, fetchUserXAmbient } = props;
  const [usersList, setUsersList] = useState([]);
  const [ambientsList, setAmbientsList] = useState([]);
  const [data, setData] = useState(false);
  const [value, setValue] = useState(null);

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

  function handleData() {
    handleAmbientsList();
    handleUserList();
  }

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

      await axios.post(userRoutes.linkAmbient, body, {
        headers: {
          auth: token,
        },
      });

      setSubmitting(false);

      setOpenLinkUserXAmbientsModal(false);

      toast.success(`Vinculo atualizado com sucesso!`, {
        position: "bottom-right",
      });

      fetchUserXAmbient();

      resetForm();
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
                  <FormControl size="medium">
                    <InputLabel id="user_id">Usuário</InputLabel>
                    <Select
                      sx={{ width: "200px" }}
                      size="medium"
                      id="user_id"
                      name="user_id"
                      variant="outlined"
                      label="Usuário"
                      value={formik.values.user_id}
                      onChange={formik.handleChange}
                    >
                      {usersList
                        .sort((a, b) => a.username.localeCompare(b.username))
                        .map((users) => {
                          return <MenuItem value={users.id}>{users.username}</MenuItem>;
                        })}
                    </Select>
                  </FormControl>
                  <FormControl size="medium" sx={{ width: 300, maxHeight: "300px" }}>
                    <Autocomplete
                      multiple
                      fullWidth
                      size="medium"
                      filterOptions={(x) => x}
                      id="customerList"
                      options={ambientsList}
                      sx={{
                        display: "flex",
                        margin: "dence",
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                      onChange={(event, options) => {
                        const selectedIds = options.map((option) => option.id);
                        formik.setFieldValue("ambient_id", selectedIds);
                      }}
                      getOptionLabel={(option) => option.display_name}
                      variant="outlined"
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => <Chip variant="outlined" label={option.display_name} {...getTagProps({ index })} />)
                      }
                      renderInput={(params) => <TextField {...params} label="ID de cliente" />}
                    />
                  </FormControl>
                  {/* <FormControl size="medium" sx={{ width: 300, maxHeight: "300px" }}>
                    <Autocomplete
                      disablePortal
                      size="medium"
                      id="ambientsList"
                      // filterOptions={(options, { inputValue }) => options.filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()))}
                      options={ambientsList}
                      onChange={(value) => formik.setFieldValue("ambient_id", value.id)}
                      getOptionLabel={(option) => option.display_name}
                      variant="outlined"
                      sx={{
                        display: "flex",
                        margin: "dence",
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                      renderInput={(params) => <TextField {...params} label="Ambiente" />}
                    />
                  </FormControl> */}
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
};

export default LinkUserXAmbientsModal;
