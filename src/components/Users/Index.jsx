//React
import React, { useState, useEffect } from "react";

//Libs
import { Input, Form, Space, Table, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

//Components
import CreateUserModal from "./CreateUserModal.jsx";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";

//Dependencies
import { routes } from "../../routes/routes.js";
import { getToken } from "../../auth/useAuth";

function Index({ openCreateModal, setOpenCreateModal }) {
  // const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [users, setUsers] = useState([]);
  const bordered = false;
  // const [size, setSize] = useState("large");
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
  const [openModalDeleteUsers, setOpenModalDeleteUsers] = useState(false);
  const [openModalEditUsers, setOpenModalEditUsers] = useState(false);
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const rolesList = [
    "SYS_ADMIN",
    "ADMIN",
    "PHYSICAL_WORLD_READER",
    "PHYSICAL_WORLD_MANAGER",
    "META_WORLD_READER",
    "META_WORLD_MANAGER",
    "PHYSICAL_NOTIFICATIONS_READER",
    "PHYSICAL_NOTIFICATIONS_MANAGER",
    "CALENDAR_EVENTS_DETAILS_READER",
    "CALENDAR_EVENTS_MANAGER",
  ];

  useEffect(() => {
    fetchUsers();
    toast.info("Base de dados atualizada!", {
      position: "bottom-right",
    });
  }, []);

  async function fetchUsers() {
    const userRoutes = routes.user;
    toast.dismiss();
    try {
      const response = await axios.get(userRoutes.listAll, {
        headers: {
          auth: getToken(),
        },
      });

      const usersData = response.data;

      setUsers(usersData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
    }
  }

  function handleEditModal(row) {
    setRowState(row);
    setOpenEditModal(true);
  }

  async function handleDeleteModal(row) {
    setRowState(row);
    setOpenDeleteModal(true);
  }

  const scroll = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = "100vw";
  }
  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
      filteredValue: null,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Nome de usuário",
      dataIndex: "username",
      filteredValue: searchValue !== null ? [searchValue] : null,

      onFilter: (value, record) => {
        return String(record.username).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.username.localeCompare(b.username);
      },
    },
    {
      title: "E-mail",
      dataIndex: "email",
      filteredValue: null,
    },
    {
      title: "Papéis",
      key: "tags",
      dataIndex: "roles",
      filters: rolesList.map((item, rolesListIndex) => {
        return {
          text: item,
          value: rolesListIndex,
        };
      }),
      onFilter: (value, record) => {
        return String(record.roles).toLowerCase().includes(value.toLowerCase());
      },
      render: (roles) => (
        <>
          {roles.map((role) => (
            <Tag style={{ marginBottom: "2px" }} color="blue" key={role}>
              {role.name.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
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
    scroll,
    size: "extra-small",
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    tableLayout,
  };

  return (
    <>
      {openCreateModal && users != undefined && users.length > 0 ? (
        <CreateUserModal fetchUsers={fetchUsers} openCreateModal={openCreateModal} setOpenCreateModal={setOpenCreateModal} />
      ) : null}
      {openEditModal && users != undefined && users.length > 0 ? (
        <EditUserModal fetchUsers={fetchUsers} rowState={rowState} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} />
      ) : null}
      {openDeleteModal && users != undefined && users.length > 0 ? (
        <DeleteUserModal fetchUsers={fetchUsers} row={rowState} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} />
      ) : null}
      <Form
        layout="inline"
        className="components-table-demo-control-bar"
        style={{
          marginBottom: 16,
        }}
      ></Form>
      <Input.Search
        placeholder="Nome de usuário"
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
        dataSource={users.length > 0 ? users : []}
        style={{ width: "100%", height: "100%" }}
        scroll={{ y: 395 }}
      />
    </>
  );
}

export default Index;
