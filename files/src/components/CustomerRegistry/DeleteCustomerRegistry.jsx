//React
import * as React from "react";
import { useState } from "react";

//Libs
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { HiXCircle } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";

//Dependencies
import { routes } from "../../routes/routes.js";
import { getToken } from "../../auth/useAuth.js";
import Loading from "../Loading/Loading.jsx";

function DeleteCustomerRegistry({ handleSetDeleteHistory }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values, { resetForm, setSubmitting }) {
    const customerRoutes = routes.customer;

    setLoading(true);
    setSubmitting(true);

    const deletedData = [];

    class History {
      constructor(deleted_at, statusIcon, display_name) {
        this.deleted_at = deleted_at;
        this.statusIcon = statusIcon;
        this.display_name = display_name;
      }
    }

    try {
      const splittedValues = values.display_name.split("\n");

      const token = getToken();

      const date = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

      for (const id_xfaces of splittedValues) {
        let statusIcon;

        try {
          const body = {
            display_name: id_xfaces,
          };

          const response = await axios.post(customerRoutes.deleteByDisplayName, body, {
            headers: {
              auth: token,
            },
          });

          if (response.status == 200 && response.data.msg === "WatchlistMember Not Excluded - Not Found") {
            statusIcon = (
              <div style={{ width: "100%", height: "100%" }}>
                <IoIosWarning style={{ color: "orange" }} />
              </div>
            );

            toast.warn(`Registro '${id_xfaces}' não encontrado!`);
          } else {
            statusIcon = (
              <div style={{ width: "100%", height: "100%" }}>
                <FaCheckCircle style={{ color: "green" }} />
              </div>
            );

            toast.success(`Registro '${id_xfaces}' deletado com sucesso!`);
          }

          const historyEntry = new History(date, statusIcon, id_xfaces);

          deletedData.push(historyEntry);
        } catch (error) {
          toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
          const statusIcon = (
            <div style={{ width: "100%", height: "100%" }}>
              <HiXCircle style={{ color: "red" }} />
            </div>
          );

          const historyEntry = new History(date, statusIcon, id_xfaces);
          deletedData.push(historyEntry);
        }
      }

      setLoading(false);
      handleSetDeleteHistory(deletedData);

      resetForm();
    } catch (error) {
      toast.error("Separe os ID's por quebras de linhas");
    }
  }

  const formik = useFormik({
    initialValues: {
      display_name: "",
    },
    onSubmit: handleSubmit,
    resetForm: () => {
      formik.resetForm();
    },
  });

  return (
    <>
      <div style={{ height: "100%" }} className="form-box">
        <form onSubmit={formik.handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              height: "100%",
            }}
          >
            <FormControl style={{ height: "80%" }} fullWidth>
              <TextField
                placeholder={`Digite um ou mais id's separados por quebras de linha`}
                multiline
                helperText="Para excluir os registros, insira um id no campo acima."
                rows={15}
                variant="outlined"
                id="display_name"
                value={formik.values.display_name}
                label="Display name"
                onChange={formik.handleChange}
              />
            </FormControl>
            <button
              style={{
                display: "flex",
                alignSelf: "flex-end",
              }}
              disabled={formik.isSubmitting}
              type="submit"
              className="blue-btn"
            >
              {loading == false ? "Excluir registros" : <Loading />}{" "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default DeleteCustomerRegistry;
