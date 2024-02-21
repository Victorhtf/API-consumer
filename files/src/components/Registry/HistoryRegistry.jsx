//React
import React, { useState, useEffect } from "react";

//Libs
import { Table } from "antd";

function HistoryRegistry({ deletedData }) {
  const bordered = false;
  const showTitle = false;
  const showHeader = true;
  const [tableLayout, setTableLayout] = useState();
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [ellipsis, setEllipsis] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (Array.isArray(deletedData) && deletedData.length > 0) {
      setDataSource(deletedData);
    }
    console.log(dataSource);
  }, [deletedData]);

  const columns = [
    {
      title: "Nome",
      key: "display_name",
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
      title: "Horário",
      key: "deleted_at",
      align: "center",
      dataIndex: "deleted_at",
      width: 120,
    },
    {
      title: "Status",
      key: "status",
      align: "center",
      width: 60,
      dataIndex: "status",
    },
  ];

  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));

  const tableProps = {
    bordered,
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
        dataSource={dataSource.length > 0 ? dataSource : []}
        style={{ width: "100%", height: "100%" }}
        rowKey={"deleted_at"}
      />
    </>
  );
}

export default HistoryRegistry;
