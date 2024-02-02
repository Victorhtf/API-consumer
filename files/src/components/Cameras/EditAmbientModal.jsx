//React
import { useState, useEffect } from "react";

//Libs
import { MenuItem, Select, FormControl, InputLabel, CircularProgress, TextField, Autocomplete } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import axios from "axios";

//Dependencies
import { routes } from "../../routes/routes.js";
import { getToken } from "../../auth/useAuth";

// Components
import { ModalFade } from "../StyledComponents/ModalFade.jsx";

//Styles
import "../../Globals.css";

function EditCustomerModal({ openEditModal, setOpenEditModal, fetchWatchlistAmbients, rowState }) {
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

      setCustomerList(response);
    } catch (error) {
      setCustomerList([]);
    }
  }

  useEffect(() => {
    if (openEditModal) {
      handleCustomerList();
    }
  }, []);

  useEffect(() => {
    const delayDebounceFunction = setTimeout(() => {
      setCitiesList(citiesListAux.length === 0 ? undefined : citiesListAux);
    }, 1000);
    return () => clearTimeout(delayDebounceFunction);
  }, [citiesListAux]);

  useEffect(() => {
    if (citiesListAux && citiesListAux.length > 0) {
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

      resetForm();

      fetchWatchlistAmbients();

      toast.success(`Ambiente '${values.display_name}' atualizado com sucesso!`, { position: "bottom-right" });
    } catch (error) {
      toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
    }
  }

  const formik = useFormik({
    initialValues: {
      external_id: rowState.external_id && rowState.external_id > 0 ? rowState.external_id : "",
      display_name: rowState.display_name && rowState.display_name.length > 0 ? rowState.display_name : "",
      customer_id: rowState.customer.id && rowState.customer.id > 0 ? rowState.customer.id : "",
      address: rowState.address[0].address && rowState.address[0].address.length > 0 ? rowState.address[0].address : "",
      address_complement:
        rowState.address[0].address_complement && rowState.address[0].address_complement.length > 0 ? rowState.address[0].address_complement : "",
      postal_code: rowState.address[0].postal_code && rowState.address[0].postal_code.length > 0 ? rowState.address[0].postal_code : "",
      city: rowState.address[0].city.city && rowState.address[0].city.city.length > 0 ? rowState.address[0].city : "",
      city_id: rowState.address[0].city.city && rowState.address[0].city.city.length > 0 ? rowState.address[0].city.id : "",
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
                    size="large"
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
                    size="large"
                    id="display_name"
                    label="Nome"
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
                      required
                      maxMenuHeight="200"
                      size="large"
                      id="customer_id"
                      name="customer_id"
                      label="customer_id"
                      value={customerList.find((option) => option.id === formik.values.customer_id) || null}
                      options={customerList}
                      onChange={(event, options) => {
                        formik.setFieldValue("customer_id", options.id);
                      }}
                      filterOptions={(options, { inputValue }) => {
                        return options.filter((option) => option.display_name.toLowerCase().includes(inputValue.toLowerCase()));
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
                    size="large"
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
                    size="large"
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
                    size="large"
                    id="postal_code"
                    label="CEP"
                    variant="outlined"
                    name="postal_code"
                    value={formik.values.postal_code}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <FormControl size="large" fullWidth>
                    <Autocomplete
                      isOptionEqualToValue={(option, value) => option.city_id === value.city_id}
                      size="large"
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
