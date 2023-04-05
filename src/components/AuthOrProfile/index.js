import React from 'react';
import { useSelector } from 'react-redux';
import Login from '../../screens/Login';
import MyProfile from './../../screens/MyProfile';

const AuthOrProfile = () => {
  const isAuthenticated = useSelector(state => state.auth.user?.uid);

  return isAuthenticated ? <MyProfile /> : <Login />;
};

export default AuthOrProfile;
