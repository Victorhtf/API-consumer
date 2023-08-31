import { BrowserRouter, Routes, Route  } from "react-router-dom"
import Login from './pages/Login.jsx'
import Crud from "./pages/Crud.jsx";
import Users from "./components/Users/Users.jsx";
import Permissions from "./components/Permissions/Permissions.jsx";
import Cameras from "./components/Cameras/Cameras.jsx";


function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/crud' element={<Crud/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/permissions' element={<Permissions/>}/>
        <Route path='/cameras' element={<Cameras/>}/>
        <Route path='/business-units' element={<Crud/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;