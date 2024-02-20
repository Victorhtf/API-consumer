//React
import React, { useState } from "react";

//Libs
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { RiLinkM } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { MdOutlineKeyboardArrowDown, MdOutlinePhotoSizeSelectActual } from "react-icons/md";

import { BsCameraVideo } from "react-icons/bs";

import { LuUserSquare } from "react-icons/lu";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { AiOutlineEnvironment } from "react-icons/ai";

//Assets
import img1logo from "../assets/logo/logo-primary.png";
import img2logo from "../assets/logo/logo-text.png";

const Aside = styled.div`
  background-color: #182136;
  height: 100%;
  max-width: 15%;
  min-width: 15%;
  color: #f0eff4;
  padding: 1rem;
  position: sticky;

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

  .side-box {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 10px 0px;
  }

  .columns-content {
    display: flex;
    flex-direction: column;
  }

  .row-content {
    gap: 15px;
    width: 100%;
    height: 100%;
    display: flex;
    align-content: center;
    align-items: center;
    justify-items: center;
    justify-self: center;
  }

  .p-cathegories {
    font-size: 16px;
    width: auto;
    letter-spacing: 0.05rem;
  }

  .menu {
    padding: 15px 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.25s ease;
    transform: translateX(-5px);
    cursor: pointer;

    &:hover {
      transform: translateX(5px);
      background: linear-gradient(118deg, #4ec3ee, rgba(78, 195, 238, 0.7));
      box-shadow: 0 0 10px 1px rgba(78, 195, 238, 0.7);
      transition: 0.25s ease;
    }

    .arrow-icon {
      opacity: 100%;
      transition: ease, 0.5s;
      -webkit-transition: ease, 0.5s;
    }
  }

  .menu.selected {
    padding: 15px 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.25s ease;
    background: linear-gradient(118deg, #4ec3ee, rgba(78, 195, 238, 0.7));
    box-shadow: 0 0 10px 1px rgba(78, 195, 238, 0.7);
    transition: 0.5s ease;
    transform: translateX(5px);
    height: auto;
    -webkit-transition: ease, 0.5s;
  }

  .items {
    border-radius: 10px;
    display: flex;
    align-items: center;
  }

  .items.open {
    padding: 15px 60px 15px 60px;
    margin-top: 5px;
    font-size: 242px;
    letter-spacing: 0.05rem;
    transition: 0.5s;
    transform: translateX(8px);
    cursor: pointer;

    &:hover {
      background: linear-gradient(118deg, #713d90, rgb(113, 61, 144, 0.7));
      box-shadow: 0 0 10px 1px rgb(113, 61, 144, 0.7);
      transform: translateX(10px);
    }

    .arrow-icon {
      opacity: 50%;
    }
  }

  .items.closed {
    opacity: 0;
    height: 0;
    transition: 0.5s;
  }

  .arrow-icon.down {
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 0px;
  }

  .arrow-icon.up {
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 0px;
    rotate: -180deg;
  }

  .p-items {
    font-size: 14px;
    width: auto;
    letter-spacing: 0.05rem;
  }

  .icon {
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .menu:hover {
    opacity: 100%;
  }

  p {
    cursor: pointer;
  }
`;

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState();
  const navigate = useNavigate();

  const routes = [
    {
      route: "users",
      name: "Usuários",
      icon: <LuUserSquare />,
      children: [],
    },
    {
      route: "customer-groups",
      name: "Grupos de clientes",
      icon: <MdGroups />,
      children: [],
    },
    {
      route: "customer",
      name: "Clientes",
      icon: <HiOutlineBuildingStorefront />,
      children: [],
    },
    {
      route: "ambients",
      name: "Ambientes",
      icon: <AiOutlineEnvironment />,
      children: [],
    },
    {
      route: "userxambients",
      name: "Vínculos",
      icon: <RiLinkM />,
      children: [],
    },
    {
      route: "cameras",
      name: "Câmeras",
      icon: <BsCameraVideo />,
      children: [],
    },
    {
      route: "watchlist",
      name: "Watchlists",
      icon: <AiOutlineEnvironment />,
      children: [
        {
          name: "Global",
          subroute: "global",
        },
        {
          name: "Ambiente",
          subroute: "ambient",
        },
        {
          name: "Clientes",
          subroute: "customer",
        },
      ],
    },
    {
      route: "registry",
      name: "Registros",
      icon: <MdOutlinePhotoSizeSelectActual />,
      children: [],
    },
  ];

  function handleNavigate(item, route) {
    if (!item.children.length > 0) {
      navigate(item.route);
    } else {
      handleContent(item);
      navigate(item.route + "/" + route.subroute);
    }
  }

  function handleContent(item, route) {
    setCurrentPage(route && route.length > 0 ? route.name : item.name);
    if (!item.children.length > 0 && open == false) {
      handleNavigate(item);
    } else {
      setOpen(!open);
    }
  }

  return (
    <>
      <Aside>
        <div className="trademark" onClick={() => handleNavigate("crud")}>
          <div className="logo">
            <img className="img1-logo" src={img1logo} alt="Logo 1" />
            <img className="img2-logo" src={img2logo} alt="Logo 2" />
          </div>
        </div>
        <div className="side-box">
          {routes.map((item, itemIndex) => (
            <div key={itemIndex}>
              <div
                className={`menu ${currentPage === item.name ? "selected" : ""}`}
                onClick={() => {
                  handleContent(item);
                }}
              >
                <div>
                  <div className="row-content">
                    <div className="row-content">
                      <div className="icon">{item.icon}</div>
                      <p className="p-cathegories">{item.name}</p>
                    </div>
                    {item.children.length > 0 ? (
                      <div>
                        <MdOutlineKeyboardArrowDown className={`arrow-icon ${open ? "up" : "down"}`} />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div>
                {item.children.map((route, routeIndex) => (
                  <div
                    className={`items ${open ? "open" : "closed"}`}
                    key={routeIndex}
                    onClick={() => {
                      handleNavigate(item, route);
                    }}
                  >
                    <p className="p-items" key={routeIndex}>
                      {route.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Aside>
    </>
  );
}

export default Sidebar;
