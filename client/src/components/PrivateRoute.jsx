import React, { useContext } from "react";
import { UserContext } from "../context/user.context";
import { Navigate } from "react-router-dom";
import { routerLink } from "../routes";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  return <>{user ? children : <Navigate replace to={routerLink.login} />}</>;
};

export default PrivateRoute;
