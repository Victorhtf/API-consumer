/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Form,  Space, Table, Tag } from 'antd';
import { intradataConfig } from '../../env';


const baseServiceUrl = `${intradataConfig['protocol']}://${intradataConfig['url']}`


const defaultTitle = () => 'Listar usuários.';
function UsersTable () {
  const bordered = false
  const [size, setSize] = useState('large')
  const showTitle = false
  const showHeader = true
  const rowSelection = {}
  const [tableLayout, setTableLayout] = useState();
  const [top, setTop] = useState('none');
  const [bottom, setBottom] = useState('bottomRight');
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState();
  const [loading, setLoading] = useState(true)

  const [users, setUsers] = useState([])
  // const [roleFilters, setRoleFilters] = useState([])


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key:'id'
    },
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: true,
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
          // onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: 'Roles',
      key: 'tags',
      dataIndex: 'roles',
      render: roles => (
        <>
          {roles.map(role => (
            <Tag color='red' key={role}>
                {role.name.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Data da criação',
      key: 'created_date',
      dataIndex: 'created_date',
      sorter: true,
      render: (date) => {
        return new Date(date).toLocaleDateString('pt-BR');
    },
  },
    {
      title: 'Ações',
      key: 'ações',
      render: (row) => (
        <Space size="middle">
          <a onClick={ () => {handleDelete(row.id)}}>Delete</a>
          <a>
            <Space>
              Editar
              <DownOutlined />
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
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = 'right';
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



  // Cancel the loading animation
  const handleLoadingChange = (enable) => {
    setLoading(enable);
  };


  // Fetch all users from database
  async function fetchUsers (token) {
    const finalUrl = `${baseServiceUrl}:${intradataConfig['port']}/${intradataConfig['basePath']}/user`;

    try {
      const response = await axios.get(finalUrl, {
        headers: {
            auth: token
      }
  })
      const usersData = response.data;
      setUsers(usersData) 
      handleLoadingChange()
    } catch (error) {
      console.log('erro')
    }
  }


  // Delete user from database
  async function handleDelete(id) {
    console.log(id)
    const token = sessionStorage.getItem('token')
    const finalUrl = `${baseServiceUrl}:${intradataConfig['port']}/${intradataConfig['basePath']}/user`;
    try {
      const deletedUser = await axios.delete(`${finalUrl}/${id}`, {
        headers: {
          auth: token
        }
      })
      fetchUsers(token)
      alert(`Usuário deletado com sucesso: ${deletedUser}`)
      
    } catch (error) {
      console.log('erro')
    }
  }


  useEffect(() => {
    async function callFetchUsers() {
      const token = sessionStorage.getItem('token')
      await fetchUsers(token)
    }
  callFetchUsers()
  }, [])


  return (
    <>
      <Form
        layout="inline"
        className="components-table-demo-control-bar"
        style={{
          marginBottom: 16,
        }}
      >
      </Form>
      <Table
        {...tableProps}
        pagination={{
          position: [top, bottom],
        }}
        columns={tableColumns}
        dataSource={users.length > 0 ? users : []}
        scroll={scroll}
      />
    </>
  );
}

export default UsersTable;