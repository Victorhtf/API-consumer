//React
import React, { useState, useEffect } from "react";

//Libs
import { Input, Form, Space, Table, Tag } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

//Components
import CreateAmbientWatchlistModal from "./CreateAmbientWatchlistModal.jsx";
import DeleteAmbientWatchlistModal from "./DeleteAmbientWatchlistModal.jsx";
import EditAmbientWatchlistModal from "./EditAmbientWatchlistModal.jsx";

//Dependencies
import { routes } from "../../routes/routes.js";
import { getToken } from "../../auth/useAuth";

function Index({ openCreateModal, setOpenCreateModal }) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [watchlistAmbient, setWatchlistAmbient] = useState([]);
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

  const watchlistRoutes = routes.watchlists.ambient;

  useEffect(() => {
    fetchWatchlistAmbients();
    toast.info("Base de dados atualizada!", {
      position: "bottom-right",
    });
  }, []);

  async function fetchWatchlistAmbients() {
    try {
      const { data: response } = await axios.get(watchlistRoutes.listAll, {
        headers: {
          auth: getToken(),
        },
      });

      const watchlistAmbientData = response;

      setWatchlistAmbient(watchlistAmbientData);

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

  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      width: 75,
      filteredValue: null,
      align: "center",
      sorter: (a, b, id) => a.id - b.id,
    },
    {
      title: "xFaces ID",
      key: "xfaces_watchlist_id",
      dataIndex: "xfaces_watchlist_id",
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record, xfaces_watchlist_id) => {
        return String(record.xfaces_watchlist_id).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.xfaces_watchlist_id.localeCompare(b.xfaces_watchlist_id);
      },
    },
    {
      title: "Nome",
      key: "display_name",
      dataIndex: "display_name",
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record, display_name) => {
        return String(record.display_name).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.display_name.localeCompare(b.display_name);
      },
    },
    {
      title: "Tipo",
      key: "watchlist_ambient_type",
      align: "center",
      dataIndex: "watchlist_ambient_type",
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record, watchlist_ambient_type) => {
        return String(record.watchlist_ambient_type.type).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.watchlist_ambient_type.type.localeCompare(b.watchlist_ambient_type.type);
      },
      render: (watchlist_ambient_type) => {
        return (
          <>
            <Tag style={{ marginBottom: "2px" }} color={watchlist_ambient_type.type == "EXCEPTION" ? "red" : "green"}>
              {watchlist_ambient_type.type}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Ambientes",
      key: "ambient",
      align: "center",
      dataIndex: "ambient",
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record, ambient) => {
        return String(record.ambient.display_name).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.ambient.display_name.localeCompare(b.ambient.display_name);
      },
      render: (ambient) => {
        return (
          <>
            <Tag style={{ marginBottom: "2px" }} color="blue">
              {ambient.display_name}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Data da criação",
      key: "created_date",
      align: "center",
      dataIndex: "created_date",
      filteredValue: null,
      width: 125,
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
      title: "Ações",
      key: "ações",
      width: 150,

      render: (row) => (
        <Space size="middle">
          <a
            disabled
            // onClick={() => {
            //   handleDeleteModal(row);
            // }}
          >
            Delete
          </a>
          <a
            disabled
            // onClick={() => {
            //   handleEditModal(row);
            // }}
          >
            Editar
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
    tableLayout,
  };

  return (
    <>
      {openCreateModal ? (
        <CreateAmbientWatchlistModal
          fetchWatchlistAmbients={fetchWatchlistAmbients}
          openCreateModal={openCreateModal}
          setOpenCreateModal={setOpenCreateModal}
        />
      ) : null}
      {openEditModal && watchlistAmbient != undefined && watchlistAmbient.length > 0 ? (
        <EditAmbientWatchlistModal
          fetchWatchlistAmbients={fetchWatchlistAmbients}
          rowState={rowState}
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
        />
      ) : null}
      {openDeleteModal && watchlistAmbient != undefined && watchlistAmbient.length > 0 ? (
        <DeleteAmbientWatchlistModal
          fetchWatchlistAmbients={fetchWatchlistAmbients}
          row={rowState}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      ) : null}
      <Form
        layout="inline"
        className="components-table-demo-control-bar"
        style={{
          marginBottom: 20,
        }}
      ></Form>
      <Input.Search
        placeholder="Nome"
        style={{
          width: "25%",
          display: "flex",
          alignSelf: "flex-end",
          marginBottom: "7.5px",
        }}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <Table
        {...tableProps}
        pagination={{
          position: [top, bottom],
          pageSize: 15,
        }}
        columns={tableColumns}
        dataSource={watchlistAmbient.length > 0 ? watchlistAmbient : []}
        style={{ width: "100%", height: "100%" }}
        rowKey={"id"}
        scroll={{ y: "calc(100vh - 4em)" }}
      />
    </>
  );
}

export default Index;
