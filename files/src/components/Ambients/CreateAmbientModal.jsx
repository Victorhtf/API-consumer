//React
import React from "react";
import { useState, useEffect } from "react";

//Libs
import { MenuItem, Chip, Select, FormControl, InputLabel, CircularProgress, TextField, Autocomplete } from "@mui/material";
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

function CreateAmbientModal({ openCreateModal, setOpenCreateModal, fetchAmbients }) {
  const [loading, setLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [citiesListAux, setCitiesListAux] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  async function handleCustomerList() {
    const customerRoutes = routes.customer;

    try {
      const { data: response } = await axios.get(customerRoutes.listAll, {
        headers: {
          auth: getToken(),
        },
      });

      const customerData = response;

      setCustomerList(customerData);
    } catch (error) {
      setCustomerList([]);
    }
  }

  useEffect(() => {
    if (openCreateModal) {
      handleCustomerList();
    }
  }, [openCreateModal]);

  useEffect(() => {
    const delayDebounceFunction = setTimeout(() => {
      setCitiesList(citiesListAux.length === 0 ? undefined : citiesListAux);
    }, 1000);
    return () => clearTimeout(delayDebounceFunction);
  }, [citiesListAux]);

  useEffect(() => {
    if (citiesList !== undefined) {
      handleCityList(citiesList);
    }
  }, [citiesList]);

  async function handleCityList(citiesList) {
    const ambientRoutes = routes.ambient;

    const body = {
      search: citiesList,
    };
    try {
      const { data: response } = await axios.post(ambientRoutes.listCities, body, {
        headers: {
          auth: getToken(),
        },
      });

      const cityData = response;

      setFilteredCities(cityData);

      setLoading(false);
    } catch (error) {
      setCustomerList([]);
    }
  }

  async function handleSubmit(values, props) {
    const { resetForm } = props;
    const ambientRoutes = routes.ambient;
    try {
      const token = getToken();

      const { external_id, display_name, customer_id, address, address_complement, postal_code, city_id } = values;

      const body = {
        external_id: external_id,
        display_name: display_name,
        customer_id: customer_id,
        address_registration: {
          address: address,
          address_complement: address_complement,
          postal_code: postal_code,
          city_id: city_id.id,
        },
      };

      await axios.post(ambientRoutes.create, body, {
        headers: {
          auth: token,
        },
      });

      setOpenCreateModal(false);

      resetForm();

      fetchAmbients();

      toast.success(`Ambiente '${values.display_name}' adicionado com sucesso!`);
    } catch (error) {
      toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
    }
  }

  const formik = useFormik({
    initialValues: {
      external_id: "",
      display_name: "",
      customer_id: null,
      address: "",
      address_complement: "",
      postal_code: "",
      city_id: "",
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
          <h2>Criar ambiente</h2>
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
                    size="medium"
                    id="external_id"
                    label="External ID"
                    variant="outlined"
                    name="external_id"
                    value={formik.values.external_id}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    fullWidth
                    required
                    size="medium"
                    id="display_name"
                    label="Nome"
                    variant="outlined"
                    name="display_name"
                    value={formik.values.display_name}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <FormControl fullWidth>
                    <Autocomplete
                      fullWidth
                      size="medium"
                      filterOptions={(options, { inputValue }) => {
                        return options.filter((option) => option.display_name.toLowerCase().includes(inputValue.toLowerCase()));
                      }}
                      id="customerList"
                      options={customerList}
                      onChange={(event, options) => {
                        formik.setFieldValue("customer_id", options.id);
                      }}
                      sx={{
                        display: "flex",
                        margin: "dence",
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                      getOptionLabel={(option) => option.display_name}
                      variant="outlined"
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => <Chip variant="outlined" label={option.display_name} {...getTagProps({ index })} />)
                      }
                      renderInput={(params) => <TextField {...params} label="ID de cliente" />}
                    />
                  </FormControl>
                </div>
                <div className="form-group">
                  <TextField
                    fullWidth
                    required
                    size="medium"
                    id="address"
                    label="Endereço"
                    variant="outlined"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    fullWidth
                    size="medium"
                    id="address_complement"
                    label="Complemento"
                    variant="outlined"
                    name="address_complement"
                    value={formik.values.address_complement}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="form-group">
                  <TextField
                    required
                    fullWidth
                    size="medium"
                    id="postal_code"
                    label="CEP"
                    variant="outlined"
                    name="postal_code"
                    value={formik.values.postal_code}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <FormControl size="medium" fullWidth>
                    <Autocomplete
                      isOptionEqualToValue={(option, value) => option.city_id === value.city_id}
                      size="medium"
                      filterOptions={(x) => x}
                      fullWidth
                      options={filteredCities}
                      getOptionLabel={(option) => option.city + " - " + option.state.state}
                      id="city_id"
                      loading={loading}
                      loadingText="Carregando..."
                      onChange={(event, value) => formik.setFieldValue("city_id", value)}
                      renderInput={(params) => {
                        setCitiesListAux(params.inputProps.value);

                        return <TextField {...params} label="Cidade" variant="outlined" fullWidth />;
                      }}
                    />
                  </FormControl>
                </div>
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
