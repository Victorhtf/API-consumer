// SessionCheck.js
//React
import { useEffect, useState } from "react";

//Libs
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Dependencies
import { routes } from "../env";
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

      if (refresh_token === undefined) {
        throw error("Token indefinido"); //Não está funcionando
      }

      setIsLogged(true);
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
