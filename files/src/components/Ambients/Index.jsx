//React
import React, { useState, useEffect } from "react";

//Libs
import { Input, Form, Space, Table, Tag } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

//Components
import CreateAmbientModal from "./CreateAmbientModal";
import EditAmbientModal from "./EditAmbientModal";
import DeleteAmbientModal from "./DeleteAmbientModal";

//Dependencies
import { routes } from "../../routes/routes.js";
import { getToken } from "../../auth/useAuth";

function Index({ openCreateModal, setOpenCreateModal, fetchAmbients }) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [ambient, setAmbient] = useState([]);
  const bordered = false;
  const [size, setSize] = useState("large");
  const showTitle = false;
  const showHeader = true;
  const [tableLayout, setTableLayout] = useState();
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [ellipsis, setEllipsis] = useState(false);
  const [rowState, setRowState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const ambientRoutes = routes.ambient;

  useEffect(() => {
    fetchAmbients();
    toast.info("Base de dados atualizada!", {
      position: "bottom-right",
    });
  }, []);

  async function fetchAmbients() {
    try {
      const { data: response } = await axios.get(ambientRoutes.listAllWithAddress, {
        headers: {
          auth: getToken(),
        },
      });

      const ambientData = response;

      setAmbient(ambientData);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
    }
  }

  function handleEditModal(row) {
    setOpenEditModal(true);
    setRowState(row);
  }

  async function handleDeleteModal(row) {
    setRowState(row);
    setOpenDeleteModal(true);
  }

  //Set the column props
  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      width: 60,
      filteredValue: null,
      sorter: (a, b) => a.id - b.id,
    },
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
      title: "Cliente",
      key: "customer",
      dataIndex: "customer",
      filteredValue: null,
      render: (value) => {
        return value.display_name && value.display_name ? (
          <>
            <Tag color="blue" key={value}>
              {value.display_name.toUpperCase()}
            </Tag>
          </>
        ) : null;
      },
    },
    {
      title: "Endereço",
      key: "address",
      dataIndex: "address",
      filteredValue: null,
      render: (value) => {
        if (value != undefined && value.length > 0) {
          const addressBase = value[0];
          const address =
            addressBase.address +
            (addressBase.address_complement && addressBase.address_complement.length > 0 ? " - " + addressBase.address_complement : "") +
            (addressBase.postal_code && addressBase.postal_code.length > 0 ? " - " + addressBase.postal_code : "");
          return address;
        } else {
          return null;
        }
      },
    },
    {
      title: "Cidade",
      key: "address",
      dataIndex: "address",
      filteredValue: null,
      render: (value) => {
        if (value != undefined && value.length > 0) {
          const addressBase = value[0];
          return addressBase.city.city + " - " + addressBase.city.state.state;
        } else {
          return null;
        }
      },
    },

    {
      title: "ID",
      key: "external_id",
      dataIndex: "external_id",
      filteredValue: null,
      width: 70,
      sorter: (a, b) => a.id - b.id,
      render: (external_id) => {
        return external_id.length > 0 ? <div>{external_id}</div> : <div>N/A</div>;
      },
    },
    {
      title: "Data da criação",
      key: "created_date",
      dataIndex: "created_date",
      filteredValue: null,
      width: 100,
      sorter: (a, b) => {
        const dateA = new Date(a.created_date);
        const dateB = new Date(b.created_date);
        return dateA - dateB;
      },
      render: (date) => {
        return new Date(date).toLocaleDateString("pt-BR");
      },
    },
    {
      title: "Data da atualização",
      key: "updated_date",
      dataIndex: "updated_date",
      filteredValue: null,
      width: 100,
      sorter: (a, b) => {
        const dateA = new Date(a.updated_date);
        const dateB = new Date(b.updated_date);
        return dateA - dateB;
      },
      render: (date) => {
        return new Date(date).toLocaleDateString("pt-BR");
      },
    },
    {
      title: "Ações",
      key: "ações",
      width: 120,

      render: (row) => (
        <Space size="middle">
          <a
            onClick={() => {
              handleDeleteModal(row);
            }}
          >
            Delete
          </a>
          <a>
            <Space
              onClick={() => {
                handleEditModal(row);
              }}
            >
              Editar
            </Space>
          </a>
        </Space>
      ),
    },
  ];

  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));

  const tableProps = {
    bordered,
    loading,
    size: "extra-small",
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    scroll,
    tableLayout,
  };

  return (
    <>
      {openCreateModal ? <CreateAmbientModal fetchAmbients={fetchAmbients} openCreateModal={openCreateModal} setOpenCreateModal={setOpenCreateModal} /> : null}
      {openEditModal && ambient != undefined && ambient.length > 0 ? (
        <EditAmbientModal fetchAmbients={fetchAmbients} rowState={rowState} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} />
      ) : null}
      {openDeleteModal && ambient != undefined && ambient.length > 0 ? (
        <DeleteAmbientModal fetchAmbients={fetchAmbients} row={rowState} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} />
      ) : null}
      <Form
        layout="inline"
        className="components-table-demo-control-bar"
        style={{
          marginBottom: 16,
        }}
      ></Form>
      <Input.Search
        placeholder="Ambiente"
        style={{
          width: "20%",
          display: "flex",
          alignSelf: "flex-end",
          marginBottom: "6px",
        }}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <Table
        {...tableProps}
        pagination={{
          position: [top, bottom],
        }}
        columns={tableColumns}
        dataSource={ambient.length > 0 ? ambient : []}
        style={{ width: "100%", height: "100%" }}
        scroll={{ y: 395 }}
        rowKey={"id"}
      />
    </>
  );
}

export default Index;
