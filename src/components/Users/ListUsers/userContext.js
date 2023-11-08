import React from "react";
import { createContext } from "react";
import { useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);

  return (
    <UserContext.Provider value={{ usersData, setUsersData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
