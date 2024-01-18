//React
import { useState, useEffect } from "react";

//Libs
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { MenuItem, Select, FormControl, InputLabel, TextField } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styled from "styled-components";
import axios from "axios";

//Components
import { routes } from "../../routes/routes.js";
import { getToken } from "../../auth/useAuth";
import { ModalFade } from "../StyledComponents/ModalFade.jsx";

//Styles
import "../../Globals.css";

function CreateCustomerModal({ openCreateModal, setOpenCreateModal, fetchCustomers }) {
  const [groupList, setGroupList] = useState([]);

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
    } catch (error) {}
  }

  useEffect(() => {
    if (openCreateModal) {
      handleCustomerGroup();
    }
  }, [openCreateModal]);

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

      toast.success(`Cliente '${values.display_name}' adicionado com sucesso!`, { position: "bottom-right" });

      resetForm();

      fetchCustomers();
    } catch (error) {
      console.debug(error);
      toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
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
                  <TextField
                    fullWidth
                    size="medium"
                    id="fantasy_name"
                    label="Nome fantasia"
                    variant="outlined"
                    name="fantasy_name"
                    value={formik.values.fantasy_name}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <FormControl size="medium" fullWidth>
                    <InputLabel id="customer_groups">Grupos de cliente</InputLabel>
                    <Select
                      maxMenuHeight="200"
                      fullWidth
                      id="customer_groups"
                      name="customer_groups"
                      label="customer_groups"
                      value={formik.values.customer_groups}
                      onChange={formik.handleChange}
                    >
                      {groupList
                        .sort((a, b) => a.display_name.localeCompare(b.display_name))
                        .map((group, groupIndex) => (
                          <MenuItem key={groupIndex} value={group.id}>
                            {group.display_name}
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
                <button disabled={formik.isSubmitting} type="submit" className="blue-btn">
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
