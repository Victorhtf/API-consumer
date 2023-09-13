import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
// import Crud from "./pages/Crud.jsx";
import ListUsers from "./components/Users/ListUsers.jsx";
import Permissions from "./components/Permissions/Permissions.jsx";
import Cameras from "./components/Cameras/Cameras.jsx";
import BaseLayout from "./layouts/BaseLayout.jsx";

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
          path="/permissions"
          element={<Permissions />}
        />
        <Route
          path="/cameras"
          element={<Cameras />}
        />
        {/* <Route
          path="/business-units"
          element={<Crud />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
