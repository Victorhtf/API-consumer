//React
import * as React from "react";
import { useState, useEffect } from "react";

//Libs
import { MenuItem, Chip, Select, InputLabel, TextField, Slider } from "@mui/material";
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

function CreateCustomerWatchlistModal({ openCreateModal, setOpenCreateModal, fetchWatchlistCustomer }) {
  const [watchlistTypes, setWatchlistTypes] = useState([]);
  const [customerList, setCustomerList] = useState([]);

  async function handleCustomerList() {
    const watchlistCustomer = routes.customer;
    try {
      const { data: response } = await axios.get(watchlistCustomer.listAll, {
        headers: {
          auth: getToken(),
        },
      });

      setCustomerList(response);
    } catch (error) {}
  }

  async function handleWatchlistTypes() {
    const watchlistCustomer = routes.watchlists.customer;

    try {
      const { data: response } = await axios.get(watchlistCustomer.listTypes, {
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
      handleCustomerList();
    }
  }, [openCreateModal]);

  async function handleSubmit(values, props) {
    const { resetForm } = props;

    const watchlistCustomer = routes.watchlists.customer;

    try {
      const token = getToken();

      const { customer_id, type_id, display_name, full_name, threshold } = values;

      if (customer_id && type_id && full_name && full_name.length > 0 && display_name && display_name.length > 0 && threshold) {
        const body = {
          customer_id: customer_id,
          type_id: type_id,
          display_name: display_name,
          full_name: full_name,
          threshold: threshold,
        };

        await axios.post(watchlistCustomer.create, body, {
          headers: {
            auth: token,
          },
        });

        setOpenCreateModal(false);

        resetForm();

        fetchWatchlistCustomer();

        toast.success(`Watchlist '${values.display_name}' adicionada com sucesso!`);
      }
    } catch (error) {
      toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
    }
  }

  const formik = useFormik({
    initialValues: {
      customer_id: "",
      type_id: "",
      display_name: "",
      full_name: "",
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
          <h2>Criar watchlist de cliente</h2>
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
                  <FormControl size="large" fullWidth>
                    <InputLabel id="roles">Clientes</InputLabel>
                    <Select
                      fullWidth
                      required
                      label="Cliente"
                      size="large"
                      id="customer_id"
                      variant="outlined"
                      name="customer_id"
                      value={formik.values.customer_id}
                      onChange={formik.handleChange}
                    >
                      {customerList.map((customer, customerIndex) => (
                        <MenuItem key={customerIndex} value={customer.id}>
                          {customer.display_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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

export default CreateCustomerWatchlistModal;
