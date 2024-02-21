//React
import React, { useState, useEffect } from "react";

//Libs
import { Input, Form, Space, Table, Tag } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

//Components
import UnlinkAmbientModal from "./UnlinkAmbientModal.jsx";
import LinkUserXAmbientsModal from "./LinkUserXAmbientsModal";

//Dependencies
import { routes } from "../../routes/routes.js";
import { getToken } from "../../auth/useAuth";

function Index({ openLinkUserXAmbientsModal, setOpenLinkUserXAmbientsModal, fetchAmbients }) {
  const [userxambient, setUserxambient] = useState([]);
  const bordered = false;
  const [size, setSize] = useState("large");
  const showTitle = false;
  const showHeader = true;
  const [tableLayout, setTableLayout] = useState();
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [ellipsis, setEllipsis] = useState(false);
  const [rowState, setRowState] = useState(null);
  const [tableState, setTableState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openUnlinkModal, setOpenUnlinkModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const userXAmbientRoutes = routes.userxambient;

  async function handleUserList() {
    const usersRoutes = routes.user;

    try {
      const { data: response } = await axios.get(usersRoutes.listAll, {
        headers: {
          auth: getToken(),
        },
      });

      setUsersList(response);
    } catch (error) {}
  }

  useEffect(() => {
    fetchUserXAmbient();
    toast.info("Base de dados atualizada!", {
      position: "bottom-right",
    });
  }, []);

  async function fetchUserXAmbient() {
    try {
      const { data: response } = await axios.get(userXAmbientRoutes.listAllArray, {
        headers: {
          auth: getToken(),
        },
      });

      const userXAmbient = response;

      setUserxambient(userXAmbient);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
    }
  }

  async function handleUnlinkModal(row) {
    setRowState(row);
    setOpenUnlinkModal(true);
  }

  const columns = [
    {
      title: "Nome de usuário",
      key: "username",
      align: "center",
      dataIndex: "username",
      width: 300,
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record) => {
        return String(record.username).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.username.localeCompare(b.username);
      },
    },
    {
      title: "Ambiente vinculado",
      key: "ambients",
      dataIndex: "ambients",
      render: (ambients) => {
        return ambients.length > 0 ? (
          <div>
            {ambients.map((ambient, ambientIndex) => (
              <Tag color="blue" key={ambientIndex}>
                {ambient.display_name.toUpperCase()}
              </Tag>
            ))}
          </div>
        ) : (
          <Tag color="red">SEM AMBIENTES VINCULADOS</Tag>
        );
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
              handleUnlinkModal(row);
            }}
          >
            Desvincular
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
      {openLinkUserXAmbientsModal ? (
        <LinkUserXAmbientsModal
          fetchUserXAmbient={fetchUserXAmbient}
          tableState={userxambient}
          openLinkUserXAmbientsModal={openLinkUserXAmbientsModal}
          setOpenLinkUserXAmbientsModal={setOpenLinkUserXAmbientsModal}
        />
      ) : null}
      {openUnlinkModal && userxambient != undefined && userxambient.length > 0 ? (
        <UnlinkAmbientModal fetchUserXAmbient={fetchUserXAmbient} row={rowState} openUnlinkModal={openUnlinkModal} setOpenUnlinkModal={setOpenUnlinkModal} />
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
        dataSource={userxambient.length > 0 ? userxambient : []}
        style={{ width: "100%", height: "100%" }}
        rowKey={"id"}
      />
    </>
  );
}

export default Index;
