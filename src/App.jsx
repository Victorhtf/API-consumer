import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
// import Crud from "./pages/Crud.jsx";
import ListUsers from "./components/Users/ListUsers.jsx";
import Permissions from "./components/Permissions/Permissions.jsx";
import Cameras from "./components/Cameras/Cameras.jsx";
import BaseLayout from "./layouts/BaseLayout.jsx";
import ModalContent from "./components/Users/ModalContent.jsx";
import Main from "./components/Users/Main.jsx";
import Tabela from "./components/Users/usersTable.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route />
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/crud"
          element={<BaseLayout />}
        />
        <Route
          path="/users"
          element={<ListUsers />}
        />
        <Route
          path="/create"
          element={<ModalContent />}
        />
        
        <Route
          path="/permissions"
          element={<Permissions />}
        />
        <Route
          path="/cameras"
          element={<Cameras />}
        />
        <Route
          path="/main"
          element={<Main/>}
        />
        <Route
          path="/table"
          element={<Tabela/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
