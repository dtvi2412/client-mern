import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../Context/AuthContext';
import AlertMessage from '../layouts/AlertMessage';

function RegisterForm() {
  //Use auth context
  const { registerUser } = useContext(AuthContext);

  //state form
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const { username, password, confirmPassword } = registerForm;

  //Alert message
  const [alert, setAlert] = useState(null);

  //Change Value Form to Name Form
  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  //Handle Submit Login
  const register = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ message: 'Password do not match' });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        //If register false
        setAlert({ message: registerData.message });
        setTimeout(() => setAlert(null), 3000);
        setRegisterForm({
          username: '',
          password: '',
          confirmPassword: '',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="form login" onSubmit={register}>
      <h1 className="form__title">Đăng Ký</h1>
      <AlertMessage info={alert} />
      <div className="form__group">
        <label>Email</label>
        <input
          name="username"
          onChange={onChangeRegisterForm}
          type="text"
          placeholder="Vui lòng nhập email"
          required
          value={username}
        />
      </div>
      <div className="form__group">
        <label>Mật khẩu</label>
        <input
          name="password"
          onChange={onChangeRegisterForm}
          type="password"
          placeholder="Vui lòng nhập password"
          required
          value={password}
        />
      </div>
      <div className="form__group">
        <label>Nhập lại mật khẩu</label>
        <input
          name="confirmPassword"
          onChange={onChangeRegisterForm}
          type="password"
          placeholder="Vui lòng nhập nhập lại password"
          required
          value={confirmPassword}
        />
      </div>
      <div className="form__button">
        <button>Đăng ký</button>
        <p>
          Bạn đã có tài khoản hãy <Link to="/login">đăng nhập</Link> ngay
        </p>
      </div>
    </form>
  );
}

export default RegisterForm;
