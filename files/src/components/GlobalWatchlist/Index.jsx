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

function Index({ openCreateModal, setOpenCreateModal, fetchGlobalWatchlist }) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [watchlistGlobal, setwatchlistGlobal] = useState([]);
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

  const watchlistRoutes = routes.watchlists.global;

  useEffect(() => {
    fetchGlobalWatchlist();
    toast.info("Base de dados atualizada!", {
      position: "bottom-right",
    });
  }, []);

  async function fetchGlobalWatchlist() {
    try {
      const { data: response } = await axios.get(watchlistRoutes.listAll, {
        headers: {
          auth: getToken(),
        },
      });

      setwatchlistGlobal(response);

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
      align: "center",
      key: "id",
      dataIndex: "id",
      width: 75,
      filteredValue: null,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "xFaces ID",
      key: "xfaces_watchlist_id",
      dataIndex: "xfaces_watchlist_id",
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record) => {
        return String(record.type).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.type.localeCompare(b.type);
      },
    },
    {
      title: "Nome",
      key: "display_name",
      dataIndex: "display_name",
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record) => {
        return String(record.type).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.type.localeCompare(b.type);
      },
    },
    {
      title: "Tipo",
      align: "center",
      key: "watchlist_global_type",
      dataIndex: "watchlist_global_type",
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record) => {
        return String(record.type).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.type.localeCompare(b.type);
      },
      render: (watchlist_global_type) => {
        return (
          <>
            <Tag style={{ marginBottom: "2px" }} color={watchlist_global_type.type == "EXTERNAL" ? "red" : "green"}>
              {watchlist_global_type.type}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Data da criação",
      key: "created_date",
      dataIndex: "created_date",
      align: "center",
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
        <CreateAmbientModal fetchGlobalWatchlist={fetchGlobalWatchlist} openCreateModal={openCreateModal} setOpenCreateModal={setOpenCreateModal} />
      ) : null}
      {openEditModal && watchlistGlobal != undefined && watchlistGlobal.length > 0 ? (
        <EditAmbientModal fetchGlobalWatchlist={fetchGlobalWatchlist} rowState={rowState} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} />
      ) : null}
      {openDeleteModal && watchlistGlobal != undefined && watchlistGlobal.length > 0 ? (
        <DeleteAmbientModal
          fetchGlobalWatchlist={fetchGlobalWatchlist}
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
          pageSize: 6,
        }}
        columns={tableColumns}
        dataSource={watchlistGlobal.length > 0 ? watchlistGlobal : []}
        style={{ width: "100%", height: "100%" }}
        rowKey={"id"}
        scroll={{ y: "calc(100vh - 4em)" }}
      />
    </>
  );
}

export default Index;
