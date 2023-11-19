import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styled from "styled-components";
import "../../Globals.css";
import { useFormik } from "formik";
import axios from "axios";

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

function CreateAmbientModal({
  openCreateModal,
  setOpenCreateModal,
  fetchAmbients,
}) {
  const [customerList, setCustomerList] = useState([]);

  //Handle customerList
  async function handleAmbientList() {
    const customerRoutes = routes.customer;
    try {
      const { data: response } = await axios.get(customerRoutes.listAll, {
        headers: {
          auth: getToken(),
        },
      });

      const customerData = response;

      setCustomerList(customerData);

      toast.success("Base de dados atualizada com sucesso!");
    } catch (error) {
      setCustomerList([]);
      console.log(error);
    }
  }

  useEffect(() => {
    if (openCreateModal) {
      handleAmbientList();
    }
  }, [openCreateModal]);

  useEffect(() => {
    console.log(customerList);
  }, [customerList]);

  //Set up the submit function
  async function handleSubmit(values, props) {
    const { resetForm } = props;
    const ambientRoutes = routes.ambient;
    try {
      const token = getToken();

      const {
        external_id,
        display_name,
        customer_id,
        address,
        address_complement,
        postal_code,
        city_id,
      } = values;

      const body = {
        external_id: external_id,
        display_name: display_name,
        customer_id: customer_id,
        address: address,
        address_complement: address_complement,
        postal_code: postal_code,
        city_id: city_id,
      };

      await axios.post(ambientRoutes.create, body, {
        headers: {
          auth: token,
        },
      });

      setOpenCreateModal(false);

      toast.success(
        `Ambiente '${values.display_name}' adicionado com sucesso!`
      );

      resetForm();

      fetchAmbients();
    } catch (error) {
      console.debug(error);
      toast.error("Ops, algo deu errado. Por favor, tente novamente");
    }
  }

  const formik = useFormik({
    initialValues: {
      external_id: "",
      display_name: "",
      customer_id: "",
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
          <h2>Criar Ambient</h2>
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
                      id="customer_id"
                      name="customer_id"
                      label="customer_id"
                      value={formik.values.id}
                      onChange={formik.handleChange}
                    >
                      {console.log(customerList)}
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
                  <TextField
                    maxMenuHeight="200"
                    size="small"
                    fullWidth
                    id="city_id"
                    label="Cidade"
                    name="city_id"
                    value={formik.values.city_id}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="buttons">
                <button onClick={formik.handleReset} className="btn-reset-form">
                  Limpar
                </button>
                <button
                  disabled={formik.isSubmitting}
                  type="submit"
                  className="blue-btn"
                >
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
