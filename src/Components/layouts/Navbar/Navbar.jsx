import React, { useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { SiCodersrank } from 'react-icons/si';
import { AiOutlineMenu } from 'react-icons/ai';
import { AuthContext } from '../../../Context/AuthContext';
import MenuMobile from '../MenuMobile/MenuMobile';
const Navbar = () => {
  const {
    logoutUser,
    authState: {
      user: { username },
    },
    menuMobile,
    setMenuMobile,
  } = useContext(AuthContext);

  const logout = () => logoutUser();
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Link to="/dashboard" className="navbar__logo__brand">
          <SiCodersrank />
          <span className="navbar__logo__title">LEARN MERN</span>
        </Link>

        {/* <Link to="/dashboard">
          <img src={logo} alt={logo} />
        </Link> */}
        <Link className="navbar__logo__link" to="/dashboard">
          Dashboard
        </Link>
        <Link className="navbar__logo__link" to="/about">
          About
        </Link>
      </div>
      <div className="navbar__user">
        <span>Welcome </span>
        <span className="navbar__user__name">{username}</span>
        <button onClick={logout}>Đăng xuất</button>
      </div>
      <div className="navbar__mobileMenu__icon">
        <AiOutlineMenu onClick={() => setMenuMobile(true)} />
        {menuMobile && (
          <MenuMobile
            username={username}
            logout={logout}
            setMenuMobile={setMenuMobile}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
