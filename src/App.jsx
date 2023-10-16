import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import ListUsers from "./components/Users/ListUsers/ListUsers.jsx";
import BaseLayout from "./pages/BaseLayout.jsx";
import CreateUser from "./components/Users/CreateUser/createUser.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/crud" element={<BaseLayout />} />
        <Route path="/users" element={<ListUsers />} />
        <Route path="/users/create" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
