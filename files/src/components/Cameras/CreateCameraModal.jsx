//React
import * as React from "react";
import { useState, useEffect } from "react";

//Libs
import { MenuItem, Select, InputLabel, TextField, Switch, Autocomplete, Chip } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";

//Dependencies
import { getToken } from "../../auth/useAuth.js";
import { routes } from "../../routes/routes.js";
import { ModalFade } from "../StyledComponents/ModalFade.jsx";

//Styles
import "../../Globals.css";

function CreateCameraModal({ openCreateModal, setOpenCreateModal, fetchCameras }) {
  const [cameraTypes, setCameraTypes] = useState([]);
  const [ambientsList, setAmbientsList] = useState([]);

  async function handleAmbientsList() {
    const ambientRoutes = routes.ambient;
    try {
      const { data: response } = await axios.get(ambientRoutes.listAll, {
        headers: {
          auth: getToken(),
        },
      });

      const ambientData = response;

      const ambientesOrdenados = ambientData.sort((a, b) => {
        const comparacaoCustomer = a.customer.display_name.localeCompare(b.customer.display_name);

        if (comparacaoCustomer === 0) {
          return a.display_name.localeCompare(b.display_name);
        }

        return comparacaoCustomer;
      });

      setAmbientsList(ambientesOrdenados);
    } catch (error) {}
  }

  async function handleCameraTypes() {
    const cameraRoutes = routes.camera;
    try {
      const { data: response } = await axios.get(cameraRoutes.listTypes, {
        headers: {
          auth: getToken(),
        },
      });

      setCameraTypes(response);
    } catch (error) {}
  }

  useEffect(() => {
    if (openCreateModal) {
      handleCameraTypes();
      handleAmbientsList();
    }
  }, [openCreateModal]);

  async function handleSubmit(values, props) {
    const { resetForm } = props;

    const cameraRoutes = routes.camera;

    try {
      const token = getToken();

      const { ambient_id, type_id, display_name, video_source, active } = values;

      if (ambient_id && type_id && display_name && display_name.length > 0 && video_source && video_source.length > 0) {
        const body = {
          ambient_id: ambient_id,
          type_id: type_id,
          display_name: display_name,
          video_source: video_source,
          active: active == undefined || active == "off" ? false : true,
        };

        await axios.post(cameraRoutes.create, body, {
          headers: {
            auth: token,
          },
        });

        setOpenCreateModal(false);

        resetForm();

        fetchCameras();

        toast.success(`Ambiente '${values.display_name}' adicionado com sucesso!`);
      }
    } catch (error) {
      toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
    }
  }

  const formik = useFormik({
    initialValues: {
      ambient_id: "",
      type_id: "",
      display_name: "",
      video_source: "",
      active: undefined,
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
          <h2>Criar câmera</h2>
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
                  <FormControl size="large" fullWidth>
                    <Autocomplete
                      fullWidth
                      size="large"
                      filterOptions={(options, { inputValue }) => {
                        return options.filter((option) => option.display_name.toLowerCase().includes(inputValue.toLowerCase()));
                      }}
                      id="customerList"
                      options={ambientsList}
                      sx={{
                        display: "flex",
                        margin: "dence",
                        flexWrap: "wrap",
                        gap: 0.625,
                      }}
                      onChange={(event, options) => {
                        console.log(options);
                        const selectedId = [options.id];
                        console.log(selectedId);
                        formik.setFieldValue("ambient_id", selectedId);
                      }}
                      getOptionLabel={(option) => {
                        return option.customer.display_name.toUpperCase() + " - " + option.display_name;
                      }}
                      renderInput={(params) => <TextField {...params} label="Ambiente" />}
                    />
                  </FormControl>
                </div>

                <div className="form-group">
                  <FormControl size="large" fullWidth>
                    <TextField
                      fullWidth
                      required
                      placeholder="String de conexão"
                      label="URL stream"
                      size="large"
                      id="video_source"
                      variant="outlined"
                      name="video_source"
                      value={formik.values.video_source}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                </div>

                <div>
                  <FormControl style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    <div>
                      <FormLabel id="type_id">Tipo de câmera</FormLabel>
                      <RadioGroup
                        style={{ display: "flex" }}
                        value={formik.values.type_id}
                        onChange={(event, value) => {
                          formik.setFieldValue("type_id", value);
                        }}
                        id="type_id"
                        label="Tipo de watchlist"
                        name="type_id"
                      >
                        {cameraTypes.map((listTypes, listTypeIndex) => (
                          <FormControlLabel key={listTypeIndex} value={listTypes.id} control={<Radio />} label={listTypes.type} />
                        ))}
                      </RadioGroup>
                    </div>
                    <div style={{ justifyItems: "flex-end" }}>
                      <FormGroup>
                        <FormLabel id="type_id" className="form-group">
                          Status
                        </FormLabel>
                        <FormControlLabel
                          onChange={(event) => {
                            formik.setFieldValue("active", event.target.value);
                          }}
                          control={<Switch />}
                          label="Ativo"
                        />
                      </FormGroup>
                    </div>
                  </FormControl>
                </div>

                <div className="form-group"></div>
              </div>
              <div className="buttons">
                <button onClick={formik.handleReset} className="cancel-btn">
                  Limpar
                </button>
                <button disabled={formik.isSubmitting} type="submit" className="blue-btn">
                  Criar câmera
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ModalFade>
  );
}

export default CreateCameraModal;
