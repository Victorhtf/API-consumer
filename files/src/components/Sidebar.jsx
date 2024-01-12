//React
import React from "react";

//Libs
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { RiLinkM } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { LuUserSquare } from "react-icons/lu";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { AiOutlineEnvironment } from "react-icons/ai";

//Assets
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
  font-size: 10px;

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
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    gap: 20px;

    .cathegories {
      font-size: 13px;
      letter-spacing: 0.05rem;
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
    { route: "users", name: "Usuários", icon: LuUserSquare },
    {
      route: "customer-groups",
      name: "Grupos de clientes",
      icon: MdGroups,
    },

    { route: "customer", name: "Clientes", icon: HiOutlineBuildingStorefront },
    { route: "ambients", name: "Ambientes", icon: AiOutlineEnvironment },
    {
      route: "userxambients",
      name: "Vínculos",
      icon: RiLinkM,
    },
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
          {routes.map((routes, routesIndex) => {
            return (
              <div
                onClick={() => {
                  handleNavigate(routes.route);
                }}
                key={routesIndex}
                className="items"
              >
                <div className="icon">{routes.icon()}</div>
                <p className="cathegories" key={routesIndex}>
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
