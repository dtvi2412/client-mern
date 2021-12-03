import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '../Components/layouts/Navbar/Navbar';

const ProtectedRoute = ({ children }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) return <div>Loading...</div>;

  //   Element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
  return isAuthenticated ? (
    <>
      <Navbar />
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
