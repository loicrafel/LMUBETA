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
    <img
      src="../img/logout.svg"
      alt="login"
      height="30px"
      color="grey"
      onClick={(e) => logout(e)}
    />
  );
};

export default Logout;
