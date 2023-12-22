import { MenuItem, Select, FormControl, InputLabel, TextField } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styled from "styled-components";
import "../../Globals.css";
import { useFormik } from "formik";
import axios from "axios";

import { routes } from "../../env";

import { toast } from "react-toastify";

import { getToken } from "../../auth/authentications";

import { useState, useEffect } from "react";

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

function EditCustomerModal({ openEditModal, setOpenEditModal, fetchCustomers, rowState }) {
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    if (openEditModal) {
      handleCustomerGroup();
    }
  }, [openEditModal]);

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
    } catch (error) {
      toast.error("Ops, algo deu errado. Recarregue a página e tente novamente.");
    }
  }

  //Set up the submit function
  async function handleEdit(values, { setSubmitting, resetForm }) {
    const { display_name, fantasy_name, customer_group } = values;

    try {
      setSubmitting(true);

      const token = getToken();

      const customerRoutes = routes.customer;

      const body = {
        display_name: display_name,
        fantasy_name: fantasy_name,
        customer_group: customer_group,
      };

      await axios.patch(customerRoutes.updateById + rowState.id, body, {
        headers: {
          auth: token,
        },
      });

      setSubmitting(false);

      setOpenEditModal(false);

      toast.success(`Cliente '${values.display_name}' atualizado com sucesso!`, { position: "bottom-right" });

      resetForm();

      fetchCustomers();
    } catch (error) {
      toast.error("Ops, algo deu errado. Por favor, tente novamente");
    }
  }

  const formik = useFormik({
    initialValues: {
      display_name: rowState.display_name,
      fantasy_name: rowState.fantasy_name,
      customer_group: rowState.customer_group.id,
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
          <h2>Editar cliente</h2>
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
                    <InputLabel id="customer_group">Grupos de cliente</InputLabel>
                    <Select
                      maxMenuHeight="200"
                      fullWidth
                      id="customer_group"
                      name="customer_group"
                      label="customer_group"
                      value={formik.values.customer_group}
                      onChange={formik.handleChange}
                    >
                      {groupList.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.display_name}
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
                <button disabled={formik.isSubmitting} type="submit" className="btn-submit-form">
                  Editar Client
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
