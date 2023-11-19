//React
import React, { useState, useEffect } from "react";

//Libs
import { Input, Form, Space, Table, Tag } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

//Components
import DeleteAmbientModal from "./DeleteAmbientModal";
import LinkUserXAmbientsModal from "./LinkUserXAmbientsModal";

//User configs
import { routes } from "../../env";
import { getToken } from "../../auth/authentications";

function Index({ openCreateModal, setOpenCreateModal, fetchAmbients }) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [userxambient, setUserxambient] = useState([]);
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
  const [tableState, setTableState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModalDeleteAmbient, setOpenModalDeleteAmbient] = useState(false);
  const [openLinkUserXAmbientsModal, setOpenLinkUserXAmbientsModal] =
    useState(false);
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [ambientsList, setAmbientsList] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const userXAmbientRoutes = routes.userxambient;

  // Get the UserList
  async function handleUserList() {
    const usersRoutes = routes.user;
    try {
      const { data: response } = await axios.get(usersRoutes.listAll, {
        headers: {
          auth: getToken(),
        },
      });

      const usersData = response;

      setUsersList(usersData);
    } catch (error) {
      const message = error.response.data.detail
        ? error.response.data.detail
        : "Algo deu errado.";
      console.log(message);
    }
  }

  //Get the AmbientsList
  async function handleAmbientsList() {
    const ambientRoutes = routes.ambient;
    try {
      const { data: response } = await axios.get(ambientRoutes.listAll, {
        headers: {
          auth: getToken(),
        },
      });
      console.log("fetchAmbiente");

      const ambientData = response;

      setAmbientsList(ambientData);
    } catch (error) {
      const message = error.response.data.detail
        ? error.response.data.detail
        : "Algo deu errado.";
      console.log(message);
    }
  }

  // Load table
  useEffect(() => {
    handleAmbientsList();
    handleUserList();
    fetchUserXAmbient();
  }, []);

  //Load Ambient
  async function fetchUserXAmbient() {
    try {
      const { data: response } = await axios.get(userXAmbientRoutes.listAll, {
        headers: {
          auth: getToken(),
        },
      });

      const userXAmbient = response;

      setUserxambient(userXAmbient);

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

  //Handle LinkUserXAmbientModal
  function handleLinkUserXAmbientModal(row) {
    setOpenLinkUserXAmbientsModal(true);
    setRowState(row);
  }

  // //Handle EditAmbient
  // function handleEditModal(row) {
  //   setOpenEditModal(true);
  //   setRowState(row);
  // }

  // Handle DeleteAmbient
  async function handleDeleteModal(row) {
    setRowState(row);
    setOpenDeleteModal(true);
  }

  // Handle CreateAmbient
  function handleCreateModal() {
    setOpenCreateModal(true);
  }

  //Set the table props
  const columns = [
    {
      title: "ID de usuário",
      key: "user_id",
      dataIndex: "user_id",
      filteredValue: null,
    },
    {
      title: "Nome de usuário",
      key: "username",
      dataIndex: "username",
      //   filters: userxambient.map((item) => ({
      //     text: String(item.username),
      //     value: String(item.username),
      //   })),
      //   onFilter: (value, record) => {
      //     return record.userxambient.includes(value);
      //   },
      // },
    },
    {
      title: "ID de ambiente",
      key: "ambient_id",
      dataIndex: "ambient_id",
      filteredValue: null,
    },
    {
      title: "Nome de usuário",
      key: "username",
      dataIndex: "username",
      filteredValue: null,
      render: (userxambient) => {
        <>
          {userxambient.map((ambient) => (
            <Tag color="red" key={ambient}>
              {ambient.ambient_name}
            </Tag>
          ))}
        </>;
      },
    },
    // filters: rolesList.map((item) => ({
    //   text: String(item),
    //   value: String(item),
    // })),
    // onFilter: (value, record) => {
    //   return record.roles.includes(value);
    // },
    // },
    // {
    //   title: "Nome de ambiente",
    //   key: "ambient_name",
    //   dataIndex: "ambient_name",
    //   filters: userxambient.map((item) => ({
    //     text: String(item.display_name),
    //     value: String(item.display_name),
    //   })),
    //   onFilter: (value, record) => {
    //     return record.username.includes(value.user_name);
    //   },
    // },
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
                handleLinkUserXAmbientModal(row);
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
      {/* {setOpenModalEditAmbient &&
      userxambient != undefined &&
      userxambient.length > 0 ? (
        <CreateAmbientModal
          fetchUserXAmbient={fetchUserXAmbient}
          openCreateModal={openCreateModal}
          setOpenCreateModal={setOpenCreateModal}
        />
      ) : null} */}
      {openLinkUserXAmbientsModal &&
      userxambient != undefined &&
      userxambient.length > 0 ? (
        <LinkUserXAmbientsModal
          fetchUserXAmbient={fetchUserXAmbient}
          tableState={userxambient}
          openLinkUserXAmbientsModal={openLinkUserXAmbientsModal}
          setOpenLinkUserXAmbientsModal={setOpenLinkUserXAmbientsModal}
          usersList={usersList}
          ambientsList={ambientsList}
        />
      ) : null}
      {openDeleteModal &&
      userxambient != undefined &&
      userxambient.length > 0 ? (
        <DeleteAmbientModal
          fetchUserXAmbient={fetchUserXAmbient}
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
        placeholder="Ambient ID"
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
        dataSource={userxambient.length > 0 ? userxambient : []}
        style={{ width: "100%" }}
      />
    </>
  );
}

export default Index;
