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
import { useState } from "react";

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

function LinkUserXAmbientsModal({
  openLinkUserXAmbientsModal,
  setOpenLinkUserXAmbientsModal,
  fetchUserXAmbient,
  // tableState,
  usersList,
  ambientsList,
}) {
  const tableState = [
    {
      user_id: 1,
      username: "admin",
      ambient_id: 1,
      ambient_name: "TESTE AMBIENTE - EXTERNAL ID",
    },
    {
      user_id: 12,
      username: "Americanas - ADM",
      ambient_id: null,
      ambient_name: null,
    },
    {
      user_id: 13,
      username: "Bild - ADM",
      ambient_id: null,
      ambient_name: null,
    },
    {
      user_id: 14,
      username: "Somativa_admin",
      ambient_id: null,
      ambient_name: null,
    },
  ];
  //Set up the submit function
  async function handleSubmitLinkUserXAmbient(
    values,
    { setSubmitting, resetForm }
  ) {
    const linkUserXAmbientRoutes = routes.user;
    const { user_id, ambient_id } = values;
    console.log("ok");
    // try {
    //   setSubmitting(true);

    //   const token = getToken();

    //   const body = {
    //     user_id: user_id,
    //     ambient_id: ambient_id,
    //   };

    //   const response = await axios.patch(
    //     linkUserXAmbientRoutes.linkAmbient,
    //     body,
    //     {
    //       headers: {
    //         auth: token,
    //       },
    //     }
    //   );

    //   setSubmitting(false);

    //   setOpenLinkUserXAmbientsModal(false);

    //   toast.success(`Vinculo atualizado com sucesso!`);

    //   resetForm();

    //   fetchUserXAmbient();
    // } catch (error) {
    //   toast.error("Ops, algo deu errado. Por favor, tente novamente");
    // }
  }

  const formik = useFormik({
    initialValues: {
      user_id: [],
      ambient_id: "rowState.ambient_id",
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
                  <FormControl size="small" fullWidth>
                    <InputLabel id="user_id">User ID</InputLabel>
                    <Select
                      multiple
                      id="user_id"
                      name="user_id"
                      label="user_id"
                      value={formik.values.user_id}
                      onChange={formik.handleChange}
                    >
                      {tableState.map((content, content_index) => (
                        <MenuItem key={content_index} value={content.user_id}>
                          {content.username}
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
