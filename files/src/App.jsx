import React from "react";

//Libs

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//Components
import Login from "./pages/Login.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import BaseLayout from "./pages/BaseLayout.jsx";

import CrudPage from "./components/Crud/CrudPage.jsx";
import UsersPage from "./components/Users/UsersPage.jsx";
import CustomerPage from "./components/Customer/CustomerPage.jsx";
import CustomerGroupPage from "./components/CustomerGroup/CustomerGroupPage.jsx";
import AmbientPage from "./components/Ambients/AmbientPage.jsx";
import UserXAmbientPage from "./components/UserXAmbients/UserXAmbientPage.jsx";
import AmbientWatchlistPage from "./components/AmbientWatchlist/AmbientWatchlistPage.jsx";
import GlobalWatchlistPage from "./components/GlobalWatchlist/GlobalWatchlistPage.jsx";
import CustomerWatchlistPage from "./components/CustomerWatchlist/CustomerWatchlistPage.jsx";
import CameraPage from "./components/Cameras/CameraPage.jsx";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/crud" element={<CrudPage />} />
          </Route>

          <Route element={<BaseLayout />}>
            <Route path="/users" element={<UsersPage />} />
          </Route>

          <Route element={<BaseLayout />}>
            <Route path="/customer" element={<CustomerPage />} />
          </Route>

          <Route element={<BaseLayout />}>
            <Route path="/customer" element={<CustomerPage />} />
          </Route>

          <Route element={<BaseLayout />}>
            <Route path="/customer-groups" element={<CustomerGroupPage />} />
          </Route>

          <Route element={<BaseLayout />}>
            <Route path="/ambients" element={<AmbientPage />} />
          </Route>

          <Route element={<BaseLayout />}>
            <Route path="/userxambients" element={<UserXAmbientPage />} />
          </Route>

          <Route element={<BaseLayout />}>
            <Route path="/cameras" element={<CameraPage />} />
          </Route>

          <Route element={<BaseLayout />}>
            <Route path="/watchlist/global" element={<GlobalWatchlistPage />} />
          </Route>

          <Route element={<BaseLayout />}>
            <Route path="/watchlist/ambient" element={<AmbientWatchlistPage />} />
          </Route>

          <Route element={<BaseLayout />}>
            <Route path="/watchlist/customer" element={<CustomerWatchlistPage />} />
          </Route>

          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer autoClose={3000} />
    </React.Fragment>
  );
}

export default App;
