//Libs
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//Components
import Login from "./pages/Login.jsx";
import UsersPage from "./components/Users/UsersPage.jsx";
import CrudPage from "./components/Crud/CrudPage.jsx";
import CustomerPage from "./components/Customer/CustomerPage.jsx";
import CustomerGroupPage from "./components/CustomerGroup/CustomerGroupPage.jsx";
import AmbientPage from "./components/Ambients/AmbientPage.jsx";
import UserXAmbientPage from "./components/UserXAmbients/UserXAmbientPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/crud" element={<CrudPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/customer-groups" element={<CustomerGroupPage />} />
          <Route path="/ambients" element={<AmbientPage />} />
          <Route path="/userxambients" element={<UserXAmbientPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
