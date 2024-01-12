//React
import { useEffect, useState } from "react";

//Libs
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Dependencies
import { routes } from "../routes/routes";
import { toast } from "react-toastify";

export function getToken() {
  const token = sessionStorage.getItem("token");
  return token;
}

const SessionCheck = (props) => {
  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();

  async function checkUserSession() {
    const loginRoutes = routes.login;
    const token = getToken();

    try {
      const loginData = await axios.get(loginRoutes.me, {
        headers: {
          auth: token,
        },
      });

      const refresh_token = loginData.headers.token;

      const userReqPermissions = loginData.data.permissions;
      const userSessionPermissions = sessionStorage.getItem("permissions");

      if (userReqPermissions.includes("ALL") && userSessionPermissions.includes("ALL")) {
        setIsLogged(true);
      } else {
        throw error("401 - Unauthorized");
      }

      if (refresh_token === undefined) {
        throw error("401 - Unauthorized");
      }
    } catch (error) {
      navigate("/");
      toast.error("Usuário não autenticado");
      setIsLogged(false);
    }
  }

  useEffect(() => {
    checkUserSession();
  }, []);

  return isLogged ? props.children : null;
};

export default SessionCheck;
