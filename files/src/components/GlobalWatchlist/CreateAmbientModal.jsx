//React
import * as React from "react";
import { useState, useEffect } from "react";

//Libs
import { MenuItem, Chip, Select, InputLabel, CircularProgress, TextField, Autocomplete, Slider, Menu } from "@mui/material";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useFormik, validateYupSchema } from "formik";
import { toast } from "react-toastify";
import styled from "styled-components";
import axios from "axios";
import * as Yup from "yup";

//Dependencies
import { getToken } from "../../auth/useAuth";
import { routes } from "../../routes/routes.js";
import { ModalFade } from "../StyledComponents/ModalFade.jsx";

//Styles
import "../../Globals.css";

function CreateAmbientModal({ openCreateModal, setOpenCreateModal, fetchGlobalCustomers }) {
  const [watchlistTypes, setWatchlistTypes] = useState([]);

  async function handleWatchlistTypes() {
    const watchlistRoutes = routes.watchlists.global;
    try {
      const { data: response } = await axios.get(watchlistRoutes.listTypes, {
        headers: {
          auth: getToken(),
        },
      });

      setWatchlistTypes(response);
    } catch (error) {}
  }

  useEffect(() => {
    if (openCreateModal) {
      handleWatchlistTypes();
    }
  }, [openCreateModal]);

  async function handleSubmit(values, props) {
    const { resetForm } = props;
    const ambientRoutes = routes.ambient;
    try {
      const token = getToken();

      const { display_name, full_name, type_id, threshold } = values;

      const body = {
        display_name: display_name,
        full_name: full_name,
        type_id: type_id,
        threshold: threshold,
      };

      // await axios.post(ambientRoutes.create, body, {
      //   headers: {
      //     auth: token,
      //   },
      // });

      setOpenCreateModal(false);

      resetForm();

      fetchGlobalCustomers();

      toast.success(`Ambiente '${values.display_name}' adicionado com sucesso!`);
    } catch (error) {
      toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
    }
  }

  const formik = useFormik({
    initialValues: {
      display_name: "",
      full_name: "",
      type_id: "",
      threshold: "",
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
          <h2>Criar watchlist de ambiente</h2>
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
                    label="Nome"
                    size="large"
                    id="display_name"
                    variant="outlined"
                    name="display_name"
                    value={formik.values.display_name}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="form-group">
                  <TextField
                    fullWidth
                    size="large"
                    id="full_name"
                    label="Nome completo"
                    variant="outlined"
                    name="full_name"
                    value={formik.values.full_name}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <FormControl>
                    <FormLabel id="type_id">Tipo de watchlist</FormLabel>
                    <RadioGroup
                      value={formik.values.type_id}
                      onChange={(event, value) => {
                        formik.setFieldValue("type_id", value);
                      }}
                      row
                      id="type_id"
                      label="Tipo de watchlist"
                      name="type_id"
                    >
                      {watchlistTypes.map((listTypes, listTypeIndex) => (
                        <FormControlLabel key={listTypeIndex} value={listTypes.id} control={<Radio />} label={listTypes.type} />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>

                <div className="form-group">
                  <FormControl fullWidth>
                    <FormLabel id="roles">Threshold</FormLabel>
                    <Slider
                      aria-label="Threshold"
                      defaultValue={60}
                      valueLabelDisplay="auto"
                      marks
                      step={5}
                      min={0}
                      max={100}
                      size="large"
                      id="threshold"
                      label="Threshold"
                      variant="outlined"
                      name="threshold"
                      value={formik.values.threshold}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                </div>

                <div className="form-group"></div>
              </div>
              <div className="buttons">
                <button onClick={formik.handleReset} className="cancel-btn">
                  Limpar
                </button>
                <button disabled={formik.isSubmitting} type="submit" className="blue-btn">
                  Criar ambiente
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ModalFade>
  );
}

export default CreateAmbientModal;
