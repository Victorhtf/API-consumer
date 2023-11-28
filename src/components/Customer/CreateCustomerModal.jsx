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
`;

function CreateCustomerModal({
  openCreateModal,
  setOpenCreateModal,
  fetchCustomers,
}) {
  const [groupList, setGroupList] = useState([]);

  //Get the customer groups list
  async function handleCustomerGroup() {
    const customerGroupRoutes = routes.customerGroup;
    try {
      const { data: response } = await axios.get(customerGroupRoutes.listAll, {
        headers: {
          auth: getToken(),
        },
      });

      const customerGroupData = response;

      setGroupList(customerGroupData);

      setLoading(false);

      toast.success("Base de dados atualizada com sucesso!");
    } catch (error) {
      const message = error.response.data.detail
        ? error.response.data.detail
        : "Algo deu errado.";
      console.log(message);
    }
  }

  useEffect(() => {
    if (openCreateModal) {
      handleCustomerGroup();
    }
  }, [openCreateModal]);

  //Set up the submit function
  async function handleSubmit(values, props) {
    const { resetForm } = props;
    try {
      const token = getToken();

      const { display_name, fantasy_name, customer_groups } = values;
      const customerRoutes = routes.customer;

      const body = {
        display_name: display_name,
        fantasy_name: fantasy_name,
        customer_group_id: customer_groups,
      };

      await axios.post(customerRoutes.create, body, {
        headers: {
          auth: token,
        },
      });

      setOpenCreateModal(false);

      toast.success(`Cliente '${values.username}' adicionado com sucesso!`);

      resetForm();

      fetchCustomers();
    } catch (error) {
      console.debug(error);
      toast.error("Ops, algo deu errado. Por favor, tente novamente");
    }
  }

  const formik = useFormik({
    initialValues: {
      display_name: "",
      fantasy_name: "",
      customer_groups: "",
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
          <h2>Criar cliente</h2>
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
                    id="display_name"
                    label="Nome"
                    variant="outlined"
                    name="display_name"
                    value={formik.values.display_name}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    fullWidth
                    size="small"
                    id="fantasy_name"
                    label="Nome fantasia"
                    variant="outlined"
                    name="fantasy_name"
                    value={formik.values.fantasy_name}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <FormControl size="small" fullWidth>
                    <InputLabel id="customer_groups">
                      Grupos de cliente
                    </InputLabel>
                    <Select
                      maxMenuHeight="200"
                      fullWidth
                      id="customer_groups"
                      name="customer_groups"
                      label="customer_groups"
                      value={formik.values.customer_groups}
                      onChange={formik.handleChange}
                    >
                      {groupList.map((groupList, index) => (
                        <MenuItem key={index} value={groupList.id}>
                          {groupList.display_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="buttons">
                <button onClick={formik.handleReset} className="cancel-btn">
                  Limpar
                </button>
                <button
                  disabled={formik.isSubmitting}
                  type="submit"
                  className="blue-btn"
                >
                  Criar cliente
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ModalFade>
  );
}

export default CreateCustomerModal;
