import { useContext } from 'react';
import './Auth.css';
import LoginForm from '../../Components/LoginForm/LoginForm';
import RegisterForm from '../../Components/RegisterForm/RegisterForm';
import { AuthContext } from '../../Context/AuthContext';
import { Navigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

function Auth({ authRoute }) {
  //Get context from Authcontext
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;

  if (authLoading) {
    body = (
      <>
        <div className="d-flex justify-content-center mt-2">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </>
    );
  } else if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  } else
    body = (
      <>
        {authRoute === 'login' && <LoginForm />}
        {authRoute === 'register' && <RegisterForm />}
      </>
    );
  return (
    <div className="auth">
      <div className="auth__content">{body}</div>
    </div>
  );
}

export default Auth;
