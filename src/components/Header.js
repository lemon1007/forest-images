import React from 'react';
import Logo from '../icon/logo.svg';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <div>
      <img src={Logo} alt="forest"/>
      <nav>
        <Link to="/">首页</Link>
        <Link to="/history">历史</Link>
        <Link to="/about">关于我</Link>
      </nav>
    </div>
  );
}

export default Header;