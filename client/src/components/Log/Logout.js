import { IconButton } from "@mui/material";
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
    <IconButton onClick={(e) => logout(e)}>
      <img src="../img/logout.svg" alt="login" height="30px" color="grey" />
    </IconButton>
  );
};

export default Logout;
