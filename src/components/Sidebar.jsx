import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsFillShieldLockFill, BsFillBuildingsFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { BiSolidCameraHome, BiTestTube } from "react-icons/bi";
import { VscServerEnvironment } from "react-icons/vsc";
import { RiCustomerService2Fill } from "react-icons/ri";
import img1logo from "../assets/logo/logo-primary.png";
import img2logo from "../assets/logo/logo-text.png";

const Aside = styled.div`
  background-color: #182136;
  max-width: 15%;
  min-width: 15%;
  color: #f0eff4;
  height: 100vh;
  padding: 1rem;
  position: sticky;
  font-size: 100000000000002px;

  .trademark {
    display: flex;
    gap: 50px;
    justify-content: space-around;
    margin-bottom: 4rem;
    margin-top: 1.5rem;
    cursor: pointer;
  }
  .img1-logo {
    width: 25%;
  }
  .img2-logo {
    width: 75%;
  }
  .logo {
    display: flex;
    align-items: center;
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

    .cathegories {
      font-size: 11px;
    }

    &:hover {
      background: linear-gradient(118deg, #4ec3ee, rgba(78, 195, 238, 0.7));
      box-shadow: 0 0 10px 1px rgba(78, 195, 238, 0.7);
      cursor: pointer;
      transition: 0.25s ease;
      transform: translateX(5px);
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
`;

function Sidebar() {
  const routes = [
    { route: "users", name: "Usuários", icon: FaUsers },
    {
      route: "customer-groups",
      name: "Grupos de clientes",
      icon: BsFillBuildingsFill,
    },
    // { route: "permissions", name: "Permissões", icon: BsFillShieldLockFill },
    // { route: "cameras", name: "Câmeras", icon: BiSolidCameraHome },
    { route: "customer", name: "Clientes", icon: RiCustomerService2Fill },
    { route: "ambients", name: "Ambientes", icon: VscServerEnvironment },
    {
      route: "userxambients",
      name: "User X Ambientes",
      icon: BsFillShieldLockFill,
    },
    // {
    //   route: "business_units",
    //   name: "Unidades de negócio",
    //   icon: BsFillBuildingsFill,
    // },
    // { route: "test", name: "Experimentar", icon: BiTestTube },
  ];

  const navigate = useNavigate();

  function handleNavigate(routes) {
    navigate(`/${routes}`);
  }
  return (
    <>
      <Aside>
        <div
          className="trademark"
          onClick={() => {
            {
              handleNavigate("crud");
            }
          }}
        >
          <div className="logo">
            <img className="img1-logo" src={img1logo} />
            <img className="img2-logo" src={img2logo} />
          </div>
        </div>
        <div>
          {routes.map((routes, index) => {
            return (
              <div
                onClick={() => {
                  handleNavigate(routes.route);
                }}
                key={index}
                className="items"
              >
                <div className="icon">{routes.icon()}</div>
                <p className="cathegories" key={index}>
                  {routes.name}
                </p>
              </div>
            );
          })}
        </div>
      </Aside>
    </>
  );
}

export default Sidebar;
