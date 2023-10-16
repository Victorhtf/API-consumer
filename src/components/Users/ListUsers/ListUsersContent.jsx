// import styled from "styled-components";
// import "../../Globals.css";
// import Modal from "../../Modal";
// import UsersTable from "../usersTable";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import CreateUserContent from "../CreateUserContent";
// import { Card } from "../../../pages/BaseLayout.jsx";

// const Box = styled.div`
//   height: 100%;
//   width: 100%
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   justify-content: center;
//   color: var(--primary-font-color);

//   .box {
//     width: 70%;
//     display: flex;
//     flex-direction: column;
//   }

//   .add-user-btn {
//     background: var(--btn-bg-color);
//     color: white;
//     align-self: flex-end;
//     justify-content: flex-start;
//     border: none;
//     padding: 7px;
//     margin-bottom: 10px;
//     border-radius: var(--btn-border-radius);
//     cursor: pointer;
//   }
// `;

// function ListUsersContent() {
//   const [open, setOpen] = useState(false);
//   console.log(open);
//   const navigate = useNavigate();

//   return (
//     <>
//       <Card>
//         {/* <Modal open={open} title={"Título 1"} setOpen={setOpen}>
//           <CreateUserContent />
//         </Modal>
//         <button
//           className="add-user-btn"
//           onClick={() => {
//             setOpen(true);
//           }}
//         >
//           Adicionar usuário
//         </button>
//         <UsersTable /> */}
//       </Card>
//     </>
//   );
// }

// export default ListUsersContent;
