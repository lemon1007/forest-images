import React from 'react';
import LogoUrl from '../icon/logo.svg';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  align-items: center;
  padding-left: 30px;
  background-color: #42b983;
  color: white;
`;
const Logo = styled.img`
  height: 37px;
`;
const StyledLink = styled(NavLink)`
  color: white;
  margin-left: 15px;

  &.active {
    border-bottom: 1px solid white;
  }
`;

function Component() {
  return (
    <Header>
      <Logo src={LogoUrl} alt="forest"/>
      <nav>
        <StyledLink to="/" activeclassname="active" exact="true">首页</StyledLink>
        <StyledLink to="/history" activeclassname="active">上传历史</StyledLink>
        <StyledLink to="/about" activeclassname="active">关于我</StyledLink>
        <StyledLink to="/login" activeclassname="active">登录</StyledLink>
        <StyledLink to="/register" activeclassname="active">注册</StyledLink>
      </nav>
    </Header>
  );
}

export default Component;