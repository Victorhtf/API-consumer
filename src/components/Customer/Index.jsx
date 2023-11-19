//React
import React, { useState, useEffect } from "react";

//Libs
import { Input, Form, Space, Table, Tag } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

//Components
import CreateCustomerModal from "./CreateCustomerModal";
import EditCustomerModal from "./EditCustomerModal";
import DeleteCustomerModal from "./DeleteCustomerModal";

//User configs
import { routes } from "../../env";
import { getToken } from "../../auth/authentications";

function Index({ openCreateModal, setOpenCreateModal }) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [customer, setCustomer] = useState([]);
  const bordered = false;
  const [size, setSize] = useState("large");
  const showTitle = false;
  const showHeader = true;
  const [tableLayout, setTableLayout] = useState();
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState();
  const [rowState, setRowState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModalDeleteCustomer, setOpenModalDeleteCustomer] = useState(false);
  const [openModalEditCustomer, setOpenModalEditCustomer] = useState(false);
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const customerRoutes = routes.customer;
  //Load table
  useEffect(() => {
    fetchCustomers();
  }, []);

  //Load customer
  async function fetchCustomers() {
    try {
      const response = await axios.get(customerRoutes.listAll, {
        headers: {
          auth: getToken(),
        },
      });

      const customerData = response.data;
      setCustomer(customerData);

      setLoading(false);

      toast.success("Base de dados atualizada com sucesso!");
    } catch (error) {
      setLoading(false);
      const message = error.response.data.detail
        ? error.response.data.detail
        : "Algo deu errado.";

      console.log(error);

      toast.error(message);
    }
  }

  //Handle EditCustomer
  function handleEditModal(row) {
    setOpenEditModal(true);
    setRowState(row);
  }

  // Handle DeleteCustomer
  async function handleDeleteModal(row) {
    setRowState(row);
    setOpenDeleteModal(true);
  }

  // Handle CreateCustomer
  function handleCreateModal() {
    setOpenCreateModal(true);
  }

  //Set the table props
  const columns = [
    {
      title: "Customer ID",
      dataIndex: "id",
      key: "id",
      filteredValue: null,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Nome",
      dataIndex: "display_name",
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record) => {
        return String(record.display_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.display_name.localeCompare(b.display_name);
      },
    },
    {
      title: "Nome fantasia",
      key: "fantasy_name",
      dataIndex: "fantasy_name",
      filteredValue: null,
    },
    {
      title: "Grupo de cliente",
      key: "customer_group",
      dataIndex: "customer_group",
      filteredValue: null,
      render: (value) => {
        return (
          <>
            <Tag color="red" key={value}>
              {value.display_name.toUpperCase()}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Data da criação",
      key: "created_date",
      dataIndex: "created_date",
      filteredValue: null,
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
  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
  }
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
      {openCreateModal && customer != undefined && customer.length > 0 ? (
        <CreateCustomerModal
          fetchCustomers={fetchCustomers}
          openCreateModal={openCreateModal}
          setOpenCreateModal={setOpenCreateModal}
        />
      ) : null}
      {openEditModal && customer != undefined && customer.length > 0 ? (
        <EditCustomerModal
          fetchCustomers={fetchCustomers}
          rowState={rowState}
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
        />
      ) : null}
      {openDeleteModal && customer != undefined && customer.length > 0 ? (
        <DeleteCustomerModal
          fetchCustomers={fetchCustomers}
          row={rowState}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      ) : null}
      <Form
        layout="inline"
        className="components-table-demo-control-bar"
        style={{
          marginBottom: 16,
        }}
      ></Form>
      <Input.Search
        placeholder="Nome"
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
        dataSource={customer.length > 0 ? customer : []}
        style={{ width: "100%" }}
      />
    </>
  );
}

export default Index;
