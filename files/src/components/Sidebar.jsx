//React
import React, { useState } from "react";

//Libs
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { RiLinkM } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

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

  .menu {
    padding: 15px 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.25s ease;
    transform: translateX(-5px);

    .arrow-icon {
      opacity: 100%;
      transition: ease, 0.5s;
      -webkit-transition: ease, 0.5s;
    }
  }

  .menu:hover {
    background: linear-gradient(118deg, #4ec3ee, rgba(78, 195, 238, 0.7));
    box-shadow: 0 0 10px 1px rgba(78, 195, 238, 0.7);
    cursor: pointer;
    transition: 0.5s ease;
    transform: translateX(5px);
    height: auto;
    -webkit-transition: ease, 0.5s;

    .arrow-icon {
      opacity: 100%;
      transition: ease, 0.5s;
      rotate: -45deg;
      -webkit-transition: ease, 0.5s;
    }
  }

  .arrow-icon {
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 0px;
    opacity: 50%;
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

  .columns-content {
    display: flex;
    flex-direction: column;
  }

  .p-cathegories {
    font-size: 16px;
    width: auto;
    letter-spacing: 0.05rem;
  }

  .items.open {
    padding: 10px 60px 10px 60px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-top: 5px;
    font-size: 242px;
    letter-spacing: 0.05rem;
    transition: ease 0.5s;
  }

  .items.open:hover {
    background: linear-gradient(118deg, #713d90, rgb(113, 61, 144, 0.7));
    box-shadow: 0 0 10px 1px rgb(113, 61, 144, 0.7);
    cursor: pointer;
    padding: 10px 60px 10px 60px;
  }

  .items.closed {
    opacity: 0;
    height: 0;
    left: 0;
    transition: ease 0.5s;
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
  ];

  const navigate = useNavigate();

  function handleNavigate(item, route) {
    if (!item.children.length > 0) {
      navigate(item.route);
    } else {
      navigate(item.route + "/" + route.subroute);
    }
  }

  function handleContent(item) {
    if (!item.children.length > 0) {
      handleNavigate(item);
    } else {
      setOpen(!open);
    }
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
        <div className="side-box">
          {routes.map((item, itemIndex) => {
            return (
              <div>
                <div
                  key={itemIndex}
                  className="menu"
                  onClick={() => {
                    handleContent(item);
                  }}
                >
                  <div className="row-content">
                    <div className="row-content">
                      <div className="icon">{item.icon}</div>
                      <p className="p-cathegories">{item.name}</p>
                    </div>
                    <div className="arrow-icon">
                      <MdOutlineKeyboardArrowDown className="arrow-icon" />
                    </div>
                  </div>
                </div>
                {item.children.map((route, routeIndex) => (
                  <div
                    className={`items ${open ? "open" : "closed"}`}
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
            );
          })}
        </div>
      </Aside>
    </>
  );
}

export default Sidebar;
