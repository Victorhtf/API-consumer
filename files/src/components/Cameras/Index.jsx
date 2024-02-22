//React
import React, { useState, useEffect } from "react";

//Libs
import { Input, Form, Space, Table, Tag } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

//Components
import CreateCameraModal from "./CreateCameraModal.jsx";
import EditAmbientModal from "./EditAmbientModal";
import DeleteAmbientModal from "./DeleteAmbientModal";

//Dependencies
import { routes } from "../../routes/routes.js";
import { getToken } from "../../auth/useAuth";

function Index({ openCreateModal, setOpenCreateModal }) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [cameraData, setCameraData] = useState([]);
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

  const camerasRoutes = routes.camera;

  useEffect(() => {
    fetchCameras();
    toast.info("Base de dados atualizada!", {
      position: "bottom-right",
    });
  }, []);

  async function fetchCameras() {
    try {
      const { data: response } = await axios.get(camerasRoutes.listAll, {
        headers: {
          auth: getToken(),
        },
      });

      setCameraData(response);

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
      key: "xfaces_camera_id",
      dataIndex: "xfaces_camera_id",
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record, xfaces_camera_id) => {
        return String(record.xfaces_camera_id).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.xfaces_camera_id.localeCompare(b.xfaces_camera_id);
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
      title: "Fonte",
      key: "video_source",
      dataIndex: "video_source",
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record, video_source) => {
        return String(record.video_source).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.video_source.localeCompare(b.video_source);
      },
    },
    {
      title: "Tipo de câmera",
      key: "camera_type",
      align: "center",
      dataIndex: "camera_type",
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record) => {
        return String(record.type).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b, camera_type) => {
        return a.camera_type.type.localeCompare(b.camera_type.type);
      },
      render: (camera_type) => {
        return (
          <Tag style={{ marginBottom: "2px" }} color={camera_type.type == "ENTRANCE" ? "red" : "green"}>
            {camera_type.type}
          </Tag>
        );
      },
    },
    {
      title: "Ambientes",
      key: "ambient",
      align: "center",
      dataIndex: "ambient",
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record, ambient) => {
        return String(record.ambient.display_name).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.ambient.display_name.localeCompare(b.ambient.display_name);
      },
      render: (ambient) => {
        return (
          <>
            <Tag style={{ marginBottom: "2px" }} color="blue">
              {ambient.display_name}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Ativo",
      key: "active",
      align: "center",
      dataIndex: "active",
      filteredValue: null,
      width: 100,
      render: (active) => (active == true ? "Ativo" : "Inativo"),
      sorter: (a, b) => {
        return String(a.active).localeCompare(String(b.active));
      },
    },
    {
      title: "Data da criação",
      align: "center",
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
      {openCreateModal ? <CreateCameraModal fetchCameras={fetchCameras} openCreateModal={openCreateModal} setOpenCreateModal={setOpenCreateModal} /> : null}
      {openEditModal && cameraData != undefined && cameraData.length > 0 ? (
        <EditAmbientModal fetchCameras={fetchCameras} rowState={rowState} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} />
      ) : null}
      {openDeleteModal && cameraData != undefined && cameraData.length > 0 ? (
        <DeleteAmbientModal fetchCameras={fetchCameras} row={rowState} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} />
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
        dataSource={cameraData.length > 0 ? cameraData : []}
        style={{ width: "100%", height: "100%" }}
        rowKey={"id"}
        scroll={{ y: "calc(100vh - 4em)" }}
      />
    </>
  );
}

export default Index;
