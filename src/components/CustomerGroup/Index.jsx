//React
import React, { useState, useEffect } from "react";

//Libs
import { Input, Form, Space, Table, Tag } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

//Components
import CreateCustomerGroupModal from "./CreateCustomerGroupModal";
import EditCustomerGroupModal from "./EditCustomerGroupModal";
import DeleteCustomerGroupModal from "./DeleteCustomerGroupModal";

//Dependencies
import { routes } from "../../routes/routes.js";
import { getToken } from "../../auth/useAuth";

function Index({ openCreateModal, setOpenCreateModal }) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [customerGroups, setCustomerGroups] = useState([]);
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
  const [openModalDeleteCustomerGroup, setOpenModalDeleteCustomerGroup] = useState(false);
  const [openModalEditCustomerGroup, setOpenModalEditCustomerGroup] = useState(false);
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchCustomerGroup();
    toast.info("Base de dados atualizada!", {
      position: "bottom-right",
    });
  }, []);

  async function fetchCustomerGroup() {
    const customerGroupsRoutes = routes.customerGroup;
    toast.dismiss();
    try {
      const response = await axios.get(customerGroupsRoutes.listAll, {
        headers: {
          auth: getToken(),
        },
      });

      const customerGroupData = response.data;

      setCustomerGroups(customerGroupData);
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
      title: "CG ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      filteredValue: null,

      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Nome",
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
      title: "Nome fantasia",
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
      title: "Data da criação",
      key: "created_date",
      dataIndex: "created_date",
      filteredValue: null,
      sorter: (a, b) => {
        const dateA = new Date(a.create_date);
        const dateB = new Date(b.create_date);
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
      sorter: (a, b) => {
        const dateA = new Date(a.update_date);
        const dateB = new Date(b.update_date);
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
      {openCreateModal ? (
        <CreateCustomerGroupModal fetchCustomerGroup={fetchCustomerGroup} openCreateModal={openCreateModal} setOpenCreateModal={setOpenCreateModal} />
      ) : null}
      {openEditModal && customerGroups != undefined && customerGroups.length > 0 ? (
        <EditCustomerGroupModal fetchCustomerGroup={fetchCustomerGroup} rowState={rowState} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} />
      ) : null}
      {openDeleteModal && customerGroups != undefined && customerGroups.length > 0 ? (
        <DeleteCustomerGroupModal
          fetchCustomerGroup={fetchCustomerGroup}
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
        dataSource={customerGroups.length > 0 ? customerGroups : []}
        style={{ width: "100%", height: "100%" }}
        scroll={{ y: 395 }}
      />
    </>
  );
}

export default Index;
