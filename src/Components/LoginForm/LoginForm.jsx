import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import AlertMessage from '../layouts/AlertMessage';

function LoginForm() {
  //Use auth context
  const { login } = useContext(AuthContext);

  //state form
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const { username, password } = loginForm;

  //Alert message
  const [alert, setAlert] = useState(null);

  //Change Value Form to Name Form
  const onChangeUserForm = (event) =>
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });

  //Handle Submit Login
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const loginData = await login(loginForm);
      if (loginData.success) {
      } else {
        //If login false
        setAlert({ message: loginData.message });
        setTimeout(() => setAlert(null), 3000);
        setLoginForm({
          username: '',
          password: '',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="form login" onSubmit={handleSubmitForm}>
      <h1 className="form__title">Đăng nhập</h1>
      <AlertMessage info={alert} />
      <div className="form__group">
        <label>Email</label>
        <input
          type="text"
          name="username"
          placeholder="Vui lòng nhập email"
          onChange={onChangeUserForm}
          value={username}
          required
        />
      </div>
      <div className="form__group">
        <label>Passoword</label>
        <input
          type="password"
          name="password"
          placeholder="Vui lòng nhập password"
          onChange={onChangeUserForm}
          value={password}
          required
        />
      </div>
      <div className="form__button">
        <button>Đăng nhập</button>
        <p>Bạn chưa có tài khoản hãy tạo ngay</p>
        <Link to="/register">Tạo tài khoản</Link>
      </div>
    </form>
  );
}

export default LoginForm;
