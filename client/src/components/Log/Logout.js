import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../actions/auth.actions";

const Logout = () => {
  const dispatch = useDispatch();
  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <img onClick={(e) => logout(e)} src="../img/logout.svg" alt="logout" />
  );
};

export default Logout;
