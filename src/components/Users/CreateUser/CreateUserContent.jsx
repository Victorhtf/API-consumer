// import { Button, Form, Input, Select, Space } from "antd";
// import { routes } from "../../../env";
// import { getToken } from "../../../auth/authentications";
// import axios from "axios";
// import { useState } from "react";

// const CreateUserContent = () => {
//   const [loading, setLoading] = useState(false);
//   const roles = [
//     "SYS_ADMIN",
//     "ADMIN",
//     "PHYSICAL_WORLD_READER",
//     "PHYSICAL_WORLD_MANAGER",
//     "META_WORLD_READER",
//     "META_WORLD_MANAGER",
//     "PHYSICAL_NOTIFICATIONS_READER",
//     "PHYSICAL_NOTIFICATIONS_MANAGER",
//     "CALENDAR_EVENTS_DETAILS_READER",
//     "CALENDAR_EVENTS_MANAGER",
//   ];

//   //Set up the submit function
//   async function handleSubmit({ values }) {
//     try {
//       //Verify if the user already exists on database
//       // const foundedUser = axios

//       const token = getToken();
//       setLoading(true);

//       const { email, username, roles } = values;
//       const userRoutes = routes.user;

//       const body = {
//         username: username,
//         password: "mudar@123",
//         email: email,
//         role_names: roles,
//       };

//       await axios.post(userRoutes.create, body, {
//         headers: {
//           auth: token,
//         },
//       });

//       setLoading(false);
//       console.log(loading);
//     } catch (error) {
//       console.log(loading);
//       alert("erro");
//     }
//   }

//   const formProps = {
//     loading,
//   };

//   return (
//     <Form
//       {...formProps}
//       name="addUser"
//       layout="horizontally"
//       autoComplete="off"
//       onFinish={(values) => {
//         handleSubmit({ values });
//       }}
//     >
//       <Form.Item
//         name="username"
//         label="Username"
//         placeholder="Digite o username do usuário"
//         rules={[
//           {
//             required: true,
//             message: "O nome de usuário é obrigatório",
//             min: 3,
//             type: "string",
//           },
//           { hasFeedback: true },
//           { whitespace: false },
//           {
//             pattern: "^\\S*$",
//             message: "O nome de usuário não pode conter espaços em branco",
//           },
//         ]}
//         //Validation to see if username its avaliable in realtime
//         // hasFeedback
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         name="email"
//         label="E-mail"
//         placeholder="Digite o e-mail do usuário"
//         rules={[
//           {
//             required: true,
//             message: "O e-mail é obrigatório",
//           },
//           {
//             type: "email",
//             message: "Não é um endereço de email válido",
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         name="roles"
//         label="Roles"
//         rules={[
//           {
//             required: true,
//             message: "Escolha pelo menos uma role.",
//             type: "array",
//           },
//         ]}
//       >
//         <Select mode="multiple" placeholder="Quais as roles do usuário?">
//           {roles.map((role, index) => {
//             return (
//               <Select.Option key={index} value={role}>
//                 {role}
//               </Select.Option>
//             );
//           })}
//         </Select>
//       </Form.Item>

//       <Space style={{ display: "flex", justifyContent: "flex-end" }}>
//         <Form.Item>
//           <Button block htmlType="reset">
//             Limpar
//           </Button>
//         </Form.Item>

//         <Form.Item>
//           <Button block type="primary" htmlType="submit">
//             Enviar
//           </Button>
//         </Form.Item>
//       </Space>
//     </Form>
//   );
// };

// export default CreateUserContent;
