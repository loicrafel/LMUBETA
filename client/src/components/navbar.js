import React, { useState } from "react";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import Logout from "./Log/Logout";
import { IconButton } from "@mui/material";

const Navbar = () => {
  const uid = useSelector((state) => state.authReducer.user);
  const [openModal, setOpenModal] = useState(false);
  const [findMessage, setFindMessage] = useState("");
  const pathname = window.location.pathname;
  return (
    <div>
      <div className="navigation">
        <div>
          <NavLink exact to="/" className="logo">
            <img src="../img/logo1.svg" alt="logo_LightMeUp" />
            <img
              className="heartbeat"
              src="../img/logo2.svg"
              alt="logo_LightMeUp"
            />
          </NavLink>
        </div>

        <div className="search">
          <IconButton onClick={() => window.find(findMessage)}>
            <SearchIcon />
          </IconButton>

          <input
            placeholder="search in LightMeUp"
            type="text"
            value={findMessage}
            onChange={(e) => setFindMessage(e.target.value)}
          />
        </div>

        <div className="flag-container">
          <div className="icons">
            <NavLink exact to="/" title="Home">
              <HomeIcon
                fontSize="large"
                className={pathname === "/" ? " icon active-icon" : "icon"}
              />
            </NavLink>
            <NavLink exact to="/game" title="Help">
              <CreateIcon
                fontSize="large"
                className={pathname === "/game" ? " icon active-icon" : "icon"}
              />
            </NavLink>

            <NavLink exact to="/user" title="Get Helped">
              <PersonIcon
                fontSize="large"
                className={pathname === "/user" ? " icon active-icon" : "icon"}
              />
            </NavLink>
          </div>
          <div className="menu">
            <img
              onClick={() => setOpenModal(!openModal)}
              src="../img/menu.svg"
              alt="menu"
              height="30px"
            />
          </div>

          <div className="reste">
            <div className="autre">
              {uid.id ? (
                <Logout />
              ) : (
                <NavLink exact to="/user">
                  <IconButton>
                    <img src="../img/login.svg" alt="login" height="30px" />
                  </IconButton>
                </NavLink>
              )}
            </div>

            <div className="flag">
              <img src="../img/fr.svg" alt="drapeau-français" />

              <img src="../img/gb.svg" alt="drapeau-gb" />
            </div>
          </div>
        </div>
      </div>
      {openModal ? (
        <div className="responsive">
          <NavLink exact to="/" title="Home">
            <HomeIcon
              fontSize="large"
              className={pathname === "/" ? " icon active-resp" : "icon"}
            />
          </NavLink>
          <NavLink exact to="/game" title="Help">
            <CreateIcon
              fontSize="large"
              className={pathname === "/game" ? " icon active-resp" : "icon"}
            />
          </NavLink>

          <NavLink exact to="/user" title="Get Helped">
            <PersonIcon
              fontSize="large"
              className={pathname === "/user" ? " icon active-resp" : "icon"}
            />
          </NavLink>

          <div className="reste">
            {uid.id ? (
              <Logout />
            ) : (
              <NavLink exact to="/user">
                <img src="../img/login.svg" alt="login" height="30px" />
              </NavLink>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
