import React from 'react';
import LogoUrl from '../icon/logo.svg';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {useStores} from '../stores/index';
import {observer} from 'mobx-react';


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
const NavWrapper =styled.nav`
  margin-top: -2px;
`

const StyledLink = styled(NavLink)`
  color: white;
  margin-left: 12px;
  padding-bottom: 2px;

  &.active {
    border-bottom: 2px solid white;
  }
`;

const Login = styled.span``;

const LoginName = styled.span`
  margin-left: 12px;
`;
const LogOutLink = styled(Link)`
  margin-left: 12px;
`;

const Component = observer(() => {

  const navigate = useNavigate();
  const {UserStore, AuthStore} = useStores();

  const handleLogout = () => {
    AuthStore.logout();
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (<Header>
    <Logo src={LogoUrl} alt="forest"/>
    <NavWrapper>
      <StyledLink to="/" activeclassname="active" exact="true">首页</StyledLink>
      <StyledLink to="/history" activeclassname="active">上传历史</StyledLink>
      <StyledLink to="/about" activeclassname="active">关于</StyledLink>
      <Login>
        {UserStore.currentUser ? <>
          <LoginName>
            {UserStore.currentUser.attributes.username}
            <LogOutLink onClick={handleLogout}>注销</LogOutLink>
          </LoginName>

        </> : <>
          <StyledLink to="/login" activeclassname="active" onClick={handleLogin}>登录</StyledLink>
          <StyledLink to="/register" activeclassname="active" onClick={handleRegister}>注册</StyledLink>
        </>}
      </Login>
    </NavWrapper>
  </Header>);
});

export default Component;