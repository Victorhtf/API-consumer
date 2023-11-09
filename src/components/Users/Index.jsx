//React
import React, { useState, useEffect, useCallback } from "react";

//Libs
import { Input, Form, Space, Table, Tag } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

//Components
import CreateUserModal from "./CreateUser/CreateUserModal";
import DeleteUserModal from "./DeleteUser/DeleteUserModal";
import EditUserModal from "./EditUser/EditUserModal";
//User configs
import { intradataConfig } from "../../env";
import { getToken } from "../../auth/authentications";

//Set up the requisition
const baseServiceUrl = `${intradataConfig["protocol"]}://${intradataConfig["url"]}`;
const finalUrl = `${baseServiceUrl}:${intradataConfig["port"]}/${intradataConfig["basePath"]}/user`;

function Index({ openCreateModal, setOpenCreateModal }) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [users, setUsers] = useState([]);
  const bordered = false;
  const [size, setSize] = useState("large");
  const showTitle = false;
  const showHeader = true;
  const rowSelection = {};
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

  //Load table
  useEffect(() => {
    fetchUsers();
    toast.success("Base de dados atualizada com sucesso!");
  }, []);

  //Load users
  async function fetchUsers() {
    try {
      const response = await axios.get(finalUrl, {
        headers: {
          auth: getToken(),
        },
      });

      const usersData = response.data;
      setUsers(usersData);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      const message = error.response.data.detail
        ? error.response.data.detail
        : "Algo deu errado.";
      toast.error(message);

      console.log(error);
    }
  }

  //
  function handleEditModal(row) {
    console.log(row);
    setOpenEditModal(true);
    setRowState(row);
    console.log(rowState);
  }

  // Delete user from database
  async function handleDeleteModal(row) {
    setRowState(row);
    setOpenDeleteModal(true);
  }

  // Handle createModal
  function handleCreateModal() {
    setOpenCreateModal(true);
  }

  //Set the table props
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      filteredValue: null,

      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Username",
      dataIndex: "username",
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record) => {
        return String(record.username)
          .toLowerCase()
          .includes(value.toLowerCase());
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
      title: "Roles",
      key: "tags",
      dataIndex: "roles",
      filteredValue: null,
      render: (roles) => (
        <>
          {roles.map((role) => (
            <Tag color="red" key={role}>
              {role.name.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
      onFilter: (value, record) => record.roles.indexOf(value) === 0,
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
    rowSelection,
    scroll,
    tableLayout,
  };

  return (
    <>
      {openCreateModal && users != undefined && users.length > 0 ? (
        <CreateUserModal
          fetchUsers={fetchUsers}
          openCreateModal={openCreateModal}
          setOpenCreateModal={setOpenCreateModal}
        />
      ) : null}
      {openEditModal && users != undefined && users.length > 0 ? (
        <EditUserModal
          fetchUsers={fetchUsers}
          rowState={rowState}
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
        />
      ) : null}
      {openDeleteModal && users != undefined && users.length > 0 ? (
        <DeleteUserModal
          fetchUsers={fetchUsers}
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
        style={{ width: "100%" }}
      />
    </>
  );
}

export default Index;
