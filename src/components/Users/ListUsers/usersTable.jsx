/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Space, Table, Tag } from "antd";
import { intradataConfig } from "../../../env";
import { getToken } from "../../../auth/authentications";
import CreateUserModal from "../CreateUser/CreateUserModal";
import DeleteUserModal from "../DeleteUser/DeleteUserModal";
import EditUserModal from "../EditUser/EditUserModal";
import fetchUsers from "./fetchUsers";
import { toast } from "react-toastify";

//Set up the requisition
const baseServiceUrl = `${intradataConfig["protocol"]}://${intradataConfig["url"]}`;
const finalUrl = `${baseServiceUrl}:${intradataConfig["port"]}/${intradataConfig["basePath"]}/user`;

const defaultTitle = () => "Listar usuários.";

function UsersTable() {
  let isSet = false;
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
<<<<<<< HEAD
=======
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [users, setUsers] = useState([]);
>>>>>>> refs/remotes/origin/dev

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Username",
      dataIndex: "username",
      sorter: (a, b) => {
        return a.username.localeCompare(b.username);
      },
    },
    {
      title: "E-mail",
      dataIndex: "email",
    },
    {
      title: "Roles",
      key: "tags",
      dataIndex: "roles",
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
          <a
            onClick={() => {
              handleEdit(row);
            }}
          >
            <Space
              onClick={() => {
                handleEdit(row);
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
    size,
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    rowSelection,
    scroll,
    tableLayout,
  };

  //Edit users
  function handleEdit(row) {
    const { roles } = row;
    const selectedRoles = roles.map((item, index) => {
      return [item];
    });
    console.log(selectedRoles);
    setRowState(row);
    setOpenEditModal(rowState);
    console.log(roles);
  }

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
      toast.success("Base de dados atualizada com sucesso!");
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  }

  // Delete user from database
  async function handleDeleteModal(row) {
    setRowState(row);
    setOpenDeleteModal(true);
  }

  //Reload usersTable
  function ReloadUsersTable() {
    isSet = !isSet;
  }

  // On load
  useEffect(() => {
    async function callFetchUsers() {
      await fetchUsers();
  async function handleUsers() {
    try {
      const usersData = await fetchUsers();
      setUsers(usersData);
      setLoading(false);
      toast.success("Usuários carregados com sucesso");
    } catch (error) {
      toast.error("Ops, ocorreu algum erro. Tente novamente.");
    }
  }
  useEffect(() => {
    handleUsers();
  }, []);

  return (
    <>
      {openEditModal && users != undefined && users.length > 0 ? (
        <EditUserModal
          fetchUsers={fetchUsers}
          ReloadUsersTable={ReloadUsersTable()}
          row={rowState}
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
        />
      ) : null}

      <DeleteUserModal
        fetchUsers={fetchUsers}
        row={rowState}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />

      <Form
        layout="inline"
        className="components-table-demo-control-bar"
        style={{
          marginBottom: 16,
        }}
      ></Form>
      {users != undefined && users.length > 0 ? (
        <Table
          {...tableProps}
          pagination={{
            position: [top, bottom],
          }}
          columns={tableColumns}
          dataSource={users.length > 0 ? users : []}
          style={{ width: "100%" }}
        />
      ) : null}
    </>
  );
}

export default UsersTable;
