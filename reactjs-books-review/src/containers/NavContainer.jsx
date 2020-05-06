import React, { useCallback } from "react";
import Nav from "../components/Nav";
import { useDispatch } from "react-redux";
import { logoutSaga } from "../redux/modules/auth";

const NavContainer = () => {
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);
  return <Nav logout={logout} />;
};

export default NavContainer;
