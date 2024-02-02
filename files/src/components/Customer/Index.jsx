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

//Dependencies
import { routes } from "../../routes/routes.js";
import { getToken } from "../../auth/useAuth";

function Index({ openCreateModal, setOpenCreateModal }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [customer, setCustomer] = useState([]);
  const bordered = false;
  const showTitle = false;
  const showHeader = true;
  const [tableLayout, setTableLayout] = useState();
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [ellipsis, setEllipsis] = useState(false);
  const [rowState, setRowState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const customerRoutes = routes.customer;

  useEffect(() => {
    fetchCustomers();
    toast.info("Base de dados atualizada!", {
      position: "bottom-right",
    });
  }, []);

  async function fetchCustomers() {
    try {
      const { data: response } = await axios.get(customerRoutes.listAll, {
        headers: {
          auth: getToken(),
        },
      });

      setCustomer(response);
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
      title: "Customer ID",
      dataIndex: "id",
      align: "center",
      key: "id",
      width: 120,
      filteredValue: null,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Nome",
      dataIndex: "display_name",
      render: (display_name) => (display_name && display_name.length > 0 ? display_name : "N/A"),
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record) => {
        return String(record.display_name).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.display_name.localeCompare(b.display_name);
      },
    },
    {
      title: "Nome fantasia",
      key: "fantasy_name",
      dataIndex: "fantasy_name",
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record) => {
        return String(record.fantasy_name).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.fantasy_name.localeCompare(b.fantasy_name);
      },
    },
    {
      title: "Grupo de cliente",
      key: "customer_group",
      dataIndex: "customer_group",
      filteredValue: null,
      render: (value) =>
        value && value.display_name.length > 0 ? (
          <>
            <Tag color="blue" key={value}>
              {value.display_name.toUpperCase()}
            </Tag>
          </>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Data da criação",
      key: "created_date",
      align: "center",
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
      align: "center",
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
    tableLayout,
  };

  return (
    <>
      {openCreateModal ? (
        <CreateCustomerModal fetchCustomers={fetchCustomers} openCreateModal={openCreateModal} setOpenCreateModal={setOpenCreateModal} />
      ) : null}
      {openEditModal && customer != undefined && customer.length > 0 ? (
        <EditCustomerModal fetchCustomers={fetchCustomers} rowState={rowState} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} />
      ) : null}
      {openDeleteModal && customer != undefined && customer.length > 0 ? (
        <DeleteCustomerModal fetchCustomers={fetchCustomers} row={rowState} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} />
      ) : null}
      <Form
        layout="inline"
        className="components-table-demo-control-bar"
        style={{
          marginBottom: 16,
        }}
      ></Form>
      <Input.Search
        placeholder="Cliente"
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
        style={{ width: "100%", height: "100%" }}
        rowKey={"id"}
      />
    </>
  );
}

export default Index;
