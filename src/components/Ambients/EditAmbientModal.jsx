import { MenuItem, Select, FormControl, InputLabel, CircularProgress, TextField, Autocomplete } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styled from "styled-components";
import "../../Globals.css";
import { useFormik } from "formik";
import axios from "axios";

import { useState, useEffect } from "react";

import { routes } from "../../env";

import { toast } from "react-toastify";

import { getToken } from "../../auth/authentications";

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

function EditCustomerModal({ openEditModal, setOpenEditModal, fetchAmbients, rowState }) {
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
    if (openEditModal) {
      handleCustomerList();
    }
  }, [openEditModal]); //Revisar para tirar esse array de dependência

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

  async function handleEdit(values, { setSubmitting, resetForm }) {
    const { external_id, display_name, customer_id, address, address_complement, postal_code, city_id } = values;

    const ambientRoutes = routes.ambient;

    try {
      setSubmitting(true);

      const token = getToken();

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

      await axios.patch(ambientRoutes.updateById + rowState.id, body, {
        headers: {
          auth: token,
        },
      });

      setSubmitting(false);

      setOpenEditModal(false);

      toast.success(`Ambiente '${values.display_name}' atualizado com sucesso!`, { position: "bottom-right" });

      resetForm();

      fetchAmbients();
    } catch (error) {
      toast.error("Ops, algo deu errado. Por favor, tente novamente");
    }
  }

  const formik = useFormik({
    initialValues: {
      external_id: rowState.external_id > 0 ? rowState.external_id : "",
      display_name: rowState.display_name ? rowState.display_name : "",
      customer_id: rowState.customer.id,
      address: rowState.address[0].address && rowState.address[0].address.length > 0 ? rowState.address[0].address : "",
      address_complement:
        rowState.address[0].address_complement && rowState.address[0].address_complement.length > 0 ? rowState.address[0].address_complement : "",
      postal_code: rowState.address[0].postal_code && rowState.address[0].postal_code.length > 0 ? rowState.address[0].postal_code : "Vazio",
      city: rowState.address[0].city.city && rowState.address[0].city.city.length > 0 ? rowState.address[0].city : undefined,
    },
    onSubmit: handleEdit,
    resetForm: () => {
      formik.resetForm();
    },
  });

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
          <h2>Editar ambiente</h2>
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
                    size="small"
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
                    size="small"
                    id="display_name"
                    label="Nome"
                    variant="outlined"
                    name="display_name"
                    value={formik.values.display_name}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <FormControl size="small" fullWidth>
                    <InputLabel id="customer_groups">ID de cliente</InputLabel>
                    <Select
                      maxMenuHeight="200"
                      fullWidth
                      required
                      id="customer_id"
                      name="customer_id"
                      label="customer_id"
                      value={formik.values.customer_id}
                      onChange={formik.handleChange}
                    >
                      {customerList.map((customerList, index) => (
                        <MenuItem key={index} value={customerList.id}>
                          {customerList.display_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="form-group">
                  <TextField
                    fullWidth
                    size="small"
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
                    size="small"
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
                    fullWidth
                    size="small"
                    id="postal_code"
                    label="CEP"
                    variant="outlined"
                    name="postal_code"
                    value={formik.values.postal_code}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <FormControl size="small" fullWidth>
                    <Autocomplete
                      isOptionEqualToValue={(option, value) => option.city_id === value.city_id}
                      size="small"
                      filterOptions={(x) => x}
                      fullWidth
                      options={filteredCities}
                      getOptionLabel={(option) => option.city + " - " + option.state.state}
                      defaultValue={formik.values.city}
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
                <button disabled={formik.isSubmitting} type="submit" className="btn-submit-form">
                  Editar ambiente
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ModalFade>
  );
}

export default EditCustomerModal;
