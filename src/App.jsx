import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import ListUsers from "./components/Users/ListUsers/ListUsers.jsx";
import BaseLayout from "./pages/BaseLayout.jsx";
import { ToastContainer } from "react-toastify";
import CrudPage from "./components/Crud/CrudPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/crud" element={<CrudPage />} />
          <Route path="/users" element={<ListUsers />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
