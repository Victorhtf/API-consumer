//React
import { useState, useEffect } from "react";

//Libs
import { MenuItem, Select, FormControl, InputLabel, TextField } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";

// Components
import { ModalFade } from "../StyledComponents/ModalFade.jsx";

//Dependencies
import { routes } from "../../routes/routes.js";
import { getToken } from "../../auth/useAuth";

//Styles
import "../../Globals.css";

function EditCustomerModal({ openEditModal, setOpenEditModal, fetchCustomers, rowState }) {
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    if (openEditModal) {
      handleCustomerGroup();
    }
  }, [openEditModal]);

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
      toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
    }
  }

  async function handleEdit(values, { setSubmitting, resetForm }) {
    const { display_name, fantasy_name, customer_group } = values;

    try {
      setSubmitting(true);

      const token = getToken();

      const customerRoutes = routes.customer;

      const body = {
        display_name: display_name,
        fantasy_name: fantasy_name,
        customer_group_id: customer_group,
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
      toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
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
      <div className="create-modal-card">
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
                      {groupList
                        .sort((a, b) => a.display_name.localeCompare(b.display_name))
                        .map((item, groupListIndex) => (
                          <MenuItem key={groupListIndex} value={item.id}>
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
                  Editar cliente
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
