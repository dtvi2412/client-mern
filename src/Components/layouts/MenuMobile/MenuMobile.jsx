import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillCloseSquare } from 'react-icons/ai';
const MenuMobile = ({ username, setMenuMobile, logout }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleSetInnerWidth() {
      setInnerWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleSetInnerWidth);

    if (innerWidth > 739) {
      setMenuMobile(false);
    }

    return () => {
      window.removeEventListener('resize', handleSetInnerWidth);
    };
  }, [innerWidth, setMenuMobile]);

  //Logout Mobile
  const handleLogoutMobile = () => {
    setMenuMobile(false);
    logout();
  };
  return (
    <div className="menuMobile" onClick={setMenuMobile.bind(this, false)}>
      <div
        className="navbar__mobileMenu__list"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="navbar__mobileMenu__list--item">
          <div className="navbar__mobileMenu__list--close">
            <AiFillCloseSquare onClick={() => setMenuMobile(false)} />
          </div>
          <span className="navbar__mobileMenu__name">
            Welcome to {username}
          </span>
          <Link
            className="navbar__mobileMenu__link"
            to="/dashboard"
            onClick={setMenuMobile.bind(this, false)}
          >
            Dashboard
          </Link>
          <Link
            className="navbar__mobileMenu__link"
            to="/about"
            onClick={setMenuMobile.bind(this, false)}
          >
            About
          </Link>
          <button onClick={handleLogoutMobile}>Đăng xuất</button>
        </div>
      </div>
    </div>
  );
};

export default MenuMobile;
