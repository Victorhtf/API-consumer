import React from "react";
import axios from "axios";
import { intradataConfig } from "../../../env";
import { getToken } from "../../../auth/authentications";
import { UserContext } from "./userContext";
import { useContext } from "react";

const baseServiceUrl = `${intradataConfig["protocol"]}://${intradataConfig["url"]}`;
const finalUrl = `${baseServiceUrl}:${intradataConfig["port"]}/${intradataConfig["basePath"]}/user`;

const fetchUsers = () => {
  try {
    const { setUsersData } = useContext(UserContext);
    const { data: usersData } = axios.get(finalUrl, {
      headers: {
        auth: getToken(),
      },
    });
    setUsersData(usersData);
  } catch (error) {
    return null;
  }
};

export default fetchUsers;
