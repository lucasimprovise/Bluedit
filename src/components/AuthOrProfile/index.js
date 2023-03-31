import React from "react";
import { useSelector } from "react-redux";
import Authentication from "./../../screens/Authentication";
import MyProfile from "./../../screens/MyProfile";

const AuthOrProfile = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <MyProfile /> : <Authentication />;
};

export default AuthOrProfile;
