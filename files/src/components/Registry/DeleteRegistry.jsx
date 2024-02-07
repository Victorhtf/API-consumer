//React
import * as React from "react";
import { useState, useEffect } from "react";

//Libs
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";
import { toast } from "react-toastify";

//Dependencies
import { routes } from "../../routes/routes.js";
import { getToken } from "../../auth/useAuth.js";

function DeleteRegistry() {
  async function handleSubmit(values, props) {
    const { resetForm } = props;
    const customerRoutes = routes.customer;

    try {
      const splittedValues = values.display_name.split("\n");

      const token = getToken();

      splittedValues.forEach((id_xfaces) => {
        try {
          const body = {
            display_name: id_xfaces,
          };

          // await axios.post(customerRoutes.deleteByDisplayName, body, {
          //   headers: {
          //     auth: token,
          //   },
          // });

          toast.success(`Registro '${id_xfaces}' deletado com sucesso!`);
        } catch (error) {
          toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
        }
      });

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
                placeholder={`Digite um ou mais ID's de registro separados por quebras de linha`}
                multiline
                rows={15}
                variant="outlined"
                id="display_name"
                value={formik.values.display_name}
                label="ID do registro"
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
              Excluir registros
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default DeleteRegistry;
