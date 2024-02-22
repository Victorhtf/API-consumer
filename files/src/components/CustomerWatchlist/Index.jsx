//React
import React, { useState, useEffect } from "react";

//Libs
import { Input, Form, Space, Table, Tag } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

//Components
import CreateCustomerWatchlistModal from "./CreateCustomerWatchlistModal.jsx";
import DeleteCustomerWatchlistModal from "./DeleteCustomerWatchlistModal.jsx";
import EditCustomerWatchlistModal from "./EditCustomerWatchlistModal.jsx";

//Dependencies
import { routes } from "../../routes/routes.js";
import { getToken } from "../../auth/useAuth";

function Index({ openCreateModal, setOpenCreateModal }) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [watchlistCustomer, setWatchlistCustomer] = useState([]);
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

  const watchlistRoutes = routes.watchlists.customer;

  useEffect(() => {
    fetchWatchlistCustomer();
    toast.info("Base de dados atualizada!", {
      position: "bottom-right",
    });
  }, []);

  async function fetchWatchlistCustomer() {
    try {
      const { data: response } = await axios.get(watchlistRoutes.listAll, {
        headers: {
          auth: getToken(),
        },
      });

      const watchlistresponse = response;

      setWatchlistCustomer(watchlistresponse);

      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
    }
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
      onFilter: (value, record) => {
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
      key: "watchlist_customer_type",
      align: "center",
      dataIndex: "watchlist_customer_type",
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record, watchlist_customer_type) => {
        return String(record.watchlist_customer_type.type).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.watchlist_customer_type.type.localeCompare(b.watchlist_customer_type.type);
      },
      render: (watchlist_customer_type) => {
        return (
          <>
            <Tag style={{ marginBottom: "2px" }} color={watchlist_customer_type.type == "RISK" ? "red" : "orange"}>
              {watchlist_customer_type.type}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Clientes",
      key: "customer",
      align: "center",
      dataIndex: "customer",
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record, customer) => {
        return String(record.customer.display_name).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.customer.display_name.localeCompare(b.customer.display_name);
      },
      render: (customer) => {
        return (
          <>
            <Tag style={{ marginBottom: "2px" }} color="blue">
              {customer.display_name}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Data da criação",
      key: "created_date",
      dataIndex: "created_date",
      defaultSortOrder: "descend",
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
      align: "center",
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
        <CreateCustomerWatchlistModal
          fetchWatchlistCustomer={fetchWatchlistCustomer}
          openCreateModal={openCreateModal}
          setOpenCreateModal={setOpenCreateModal}
        />
      ) : null}
      {openEditModal && watchlistCustomer != undefined && watchlistCustomer.length > 0 ? (
        <EditCustomerWatchlistModal
          fetchWatchlistCustomer={fetchWatchlistCustomer}
          rowState={rowState}
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
        />
      ) : null}
      {openDeleteModal && watchlistCustomer != undefined && watchlistCustomer.length > 0 ? (
        <DeleteCustomerWatchlistModal
          fetchWatchlistCustomer={fetchWatchlistCustomer}
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
        dataSource={watchlistCustomer.length > 0 ? watchlistCustomer : []}
        style={{ width: "100%", height: "100%" }}
        rowKey={"id"}
        scroll={{ y: "calc(100vh - 4em)" }}
      />
    </>
  );
}

export default Index;
