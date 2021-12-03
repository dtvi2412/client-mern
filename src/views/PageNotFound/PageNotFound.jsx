import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  const style = {
    backgroundImage:
      'url("https://www.totolink.vn/public/uploads/img_post/truy-tim-nguyen-nhan-va-cach-sua-chua-loi-tra-cuu-404-not-found-1.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: '0',
    left: '0',
    bottom: '0',
  };
  return (
    <div style={style}>
      <div>
        <Link
          style={{
            color: '#fff',
            textDecoration: 'none',
            margin: '40px',
            background: '#4c4545',
            display: 'inline-block',
            padding: '20px',
            boxShadow: '2px 2px 3px #707070',
          }}
          to="/"
        >
          Trở lại trang chủ
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
