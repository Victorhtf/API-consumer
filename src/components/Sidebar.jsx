import styled from 'styled-components'; 
import { useNavigate } from 'react-router-dom';
import { BsFillShieldLockFill, BsFillBuildingsFill} from 'react-icons/bs'
import { FaUsers } from 'react-icons/fa'
import { BiSolidCameraHome, BiTestTube }  from  'react-icons/bi'
import {VscServerEnvironment } from 'react-icons/vsc'
import { RiCustomerService2Fill } from 'react-icons/ri'
import img1logo from '../assets/logo/logo-primary.png'
import img2logo from '../assets/logo/logo-text.png'


const Aside = styled.div`
  background-color: #182136;
  max-width: 20%;
  color: #f0eff4;
  height: 100vh;
  padding: 1rem;
  background: #182136;

  
  .main {
    width: 30%;
    align-self: center;
    justify-self: center;
    background-color:white;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    margin-bottom:2rem;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex: 1;
  }
  .title {
    justify-content: center;
    align-self: center;
    padding: 0px 10px 0px 10px;
    margin-bottom: 4px;
  }
  .img-logo {
    background-color: white;
    padding: 4px 8px 4px 8px;
    border-radius: 10px;
  }
  .icon {
    font-size: 22px;
  }
  .items {
    border-radius: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    gap: 20px;

    &:hover {
      background-color: #3498db;
      
    }
  }
  .icon {
    justify-content: center;
    align-items: center;
    display: flex;
  }
  p {
    font-size: 13px;
    cursor: pointer;
  }
  `

function Sidebar() {
  const routes = [
    {route: 'users', name:'Usuários', icon: FaUsers},
    {route: 'permissions', name:'Permissões', icon: BsFillShieldLockFill},
    {route: 'cameras', name:'Câmeras', icon: BiSolidCameraHome},
    {route: 'ambients', name:'Ambientes', icon: VscServerEnvironment},
    {route: 'business_units', name:'Unidades de negócio', icon: BsFillBuildingsFill},
    {route: 'customer', name:'Customer', icon: RiCustomerService2Fill},
    {route: 'test', name:'Experimentar', icon: BiTestTube}];

  const navigate = useNavigate();

  function handleNavigate(routes) {
    navigate(`/${routes}`)
  }
  return (
    <>
      <Aside>
        <div className="main">
          <h1 className='title'> CRUD</h1>
          <div className="logo">
            <img className="img1-logo" src={img1logo}/>
            <img className="img2-logo" src={img2logo}/>
          </div>
        </div>
        <div>
          {
            routes.map((routes, index) => {
              return (
                <div key={index} className='items'>
                  <div className='icon'>{routes.icon()}</div>
                  <p onClick={() => {handleNavigate(routes.route)}} key={index}>{routes.name}</p>
                </div>
              )
            })
          }
        </div>
      </Aside>
      
    </>
  )
}

export default Sidebar
