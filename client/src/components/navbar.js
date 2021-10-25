import React, { useState } from "react";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

import Logout from "./Log/Logout";

const Navbar = () => {
  const uid = useSelector((state) => state.authReducer.user);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div className="nav-container">
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

        <div className="flag-container">
          <div className="icons">
            <NavLink exact to="/">
              <img src="../img/home.svg" alt="home" />
            </NavLink>
            <NavLink exact to="/game">
              <img src="../img/write.svg" alt="game" />
            </NavLink>

            <NavLink exact to="/user">
              <img src="../img/user-in.svg" alt="user" />
            </NavLink>

            {uid.id ? (
              <Logout />
            ) : (
              <NavLink exact to="/user">
                <img src="../img/login.svg" alt="login" />
              </NavLink>
            )}
          </div>

          <div className="menu">
            <img
              onClick={() => setOpenModal(!openModal)}
              src="../img/menu.svg"
              alt="menu"
            />
          </div>
          <div className="flag">
            <img src="../img/fr.svg" alt="drapeau-français" />
          </div>
          <div className="flag">
            <img src="../img/gb.svg" alt="drapeau-gb" />
          </div>
        </div>
      </div>
      <div>
        {openModal ? (
          <div className="responsive">
            <div>
              <NavLink exact to="/">
                <img src="../img/home.svg" alt="home" />
              </NavLink>
            </div>
            <div>
              <NavLink exact to="/game">
                <img src="../img/write.svg" alt="game" />
              </NavLink>
            </div>

            <div>
              <NavLink exact to="/user">
                <img src="../img/user-in.svg" alt="user" />
              </NavLink>
            </div>

            <div>
              {uid.id ? (
                <Logout />
              ) : (
                <NavLink exact to="/user">
                  <img src="../img/login.svg" alt="login" />
                </NavLink>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
