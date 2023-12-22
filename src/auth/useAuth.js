// import { getToken } from "./authentications";
// import axios from "axios";
// import { routes } from "../env";

// export const SessionCheck = () => {
//   if (refresh_token === undefined) {
//     refresh_token();
//   }

//   return null;
// };

// const token = getToken();

// export async function refresh_token(token) {
//   const loginRoutes = routes.login;

//   try {
//     const myInformation = await axios.get(loginRoutes.me, {
//       headers: {
//         auth: token,
//       },
//     });

//     console.log(myInformation);
//   } catch (err) {}
// }
