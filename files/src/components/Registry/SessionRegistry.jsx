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
  const showTitle = false;
  const showHeader = true;
  const [tableLayout, setTableLayout] = useState();
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [ellipsis, setEllipsis] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    toast.info("Base de dados atualizada!", {
      position: "bottom-right",
    });
  }, []);

  const columns = [
    {
      title: "X-faces ID",
      key: "x_faces_id",
      align: "center",
      dataIndex: "x_faces_id",
      filteredValue: searchValue !== null ? [searchValue] : null,
      onFilter: (value, record, x_faces_id) => {
        return String(record.x_faces_id).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.x_faces_id.localeCompare(b.x_faces_id);
      },
    },
    {
      title: "Data da deleção",
      key: "deleted_at",
      align: "center",
      dataIndex: "deleted_at",
      onFilter: (value, record, deleted_at) => {
        return String(record.deleted_at).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => {
        return a.deleted_at.localeCompare(b.deleted_at);
      },
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
