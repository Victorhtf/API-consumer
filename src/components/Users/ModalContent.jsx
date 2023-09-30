import {
  Button,
  Cascader,
  Form,
  Space,

  Input,
  Select,
  Switch,
  TreeSelect,
} from 'antd';

import React from 'react';

// import "antd/dist/antd.css"
{/* <Form.Item>
<Space>
  <Button htmlType="reset">Reset</Button>
</Space>
</Form.Item> */}



// const { Option } = Select;


const ModalContent = () => {

  const roles = [
    "SYS_ADMIN",
    "ADMIN",
    "PHYSICAL_WORLD_READER",
    "PHYSICAL_WORLD_MANAGER",
    "META_WORLD_READER",
    "META_WORLD_MANAGER",
    "PHYSICAL_NOTIFICATIONS_READER",
    "PHYSICAL_NOTIFICATIONS_MANAGER",
    "CALENDAR_EVENTS_DETAILS_READER",
    "CALENDAR_EVENTS_MANAGER"
  ];
  



  async function fetchRoles() {
    alert('fetchRoles')

  }






  // const [form] = Form.useForm();

  function resetFields () {
    form.resetFields()
    alert('o')


  }



  return (
    <Form name="validateOnly" layout="vertical" autoComplete="off">
      <Form.Item name="Username" label="Username" placeholder="Digite o username do usuário" 
      rules={[
        {
          required: true,
          message: 'O nome de usuário é obrigatório',
        },
      ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="E-mail" label="E-mail" placeholder="Digite o e-mail do usuário" 
      rules={[
        {
          required: true,
          message: 'O e-mail é obrigatório',
        },
      ]}>
        <Input/>
      </Form.Item>

      <Form.Item name="Roles" label="Roles"
      rules={[
        {
          required: true,
          message: 'Escolha pelo menos uma role.',
          type: 'array',
        },
      ]}
    >
      <Select mode="multiple" placeholder="Quais as roles do usuário?">
        {roles.map((role, index) => {
          return (
            <Select.Option key={index}>{role}</Select.Option>
          )
        })}
      </Select>
    </Form.Item>
      <Form.Item label="Ativo" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button htmlType="reset">Limpar</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default ModalContent;


