//React
import { useState } from "react";

//Libs
import styled from "styled-components";
import { Table } from "antd";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { HiXCircle } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik } from "formik";

//Styles
import "../../Globals.css";

//Dependencies
import { routes } from "../../routes/routes.js";
import { getToken } from "../../auth/useAuth.js";
import Loading from "../Loading/Loading.jsx";

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

  .box {
    width: 70%;
    display: flex;
    flex-direction: column;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
  }
`;

function RegistryPage() {
  const bordered = false;
  const showTitle = false;
  const showHeader = true;
  const [tableLayout, setTableLayout] = useState();
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [ellipsis, setEllipsis] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  //Input props
  async function handleSubmit(values, { resetForm, setSubmitting }) {
    const customerRoutes = routes.customer;

    setLoading(true);
    setSubmitting(true);

    let historyEntry = [];

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

        if (id_xfaces.length > 0) {
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
          } catch (error) {
            toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
            const statusIcon = (
              <div style={{ width: "100%", height: "100%" }}>
                <HiXCircle style={{ color: "red" }} />
              </div>
            );

            const historyEntry = new History(date, statusIcon, id_xfaces);
            setTableData((prevState) => [...prevState, historyEntry]);
          }
        }
      }

      setLoading(false);

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

  //Table props
  const columns = [
    {
      title: "Nome",
      key: "display_name",
      dataIndex: "display_name",
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record) => {
        return String(record.display_name).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.display_name.localeCompare(b.display_name);
      },
    },
    {
      title: "Horário",
      key: "deleted_at",
      align: "center",
      dataIndex: "deleted_at",
      width: 120,
    },
    {
      title: "Status",
      key: "statusIcon",
      align: "center",
      width: 60,
      dataIndex: "statusIcon",
    },
  ];

  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));

  const tableProps = {
    bordered,
    size: "extra-small",
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    tableLayout,
  };

  return (
    <Box>
      <div className="top-label">
        <h1> Registros X-Faces </h1>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          marginTop: "60px",
          alignSelf: "flex-start",
          justifySelf: "flex-start",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div className="grid">
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
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <h2 style={{ display: "flex" }}>Deletados nesta sessão</h2>
            <Table
              {...tableProps}
              pagination={{
                position: [top, bottom],
                pageSize: 15,
              }}
              columns={tableColumns}
              dataSource={tableData.length > 0 ? tableData : []}
              style={{ width: "100%", height: "100%" }}
              rowKey={"deleted_at"}
            />
          </div>
        </div>
      </div>
    </Box>
  );
}

export default RegistryPage;
