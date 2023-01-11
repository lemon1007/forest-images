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
const StyledLink = styled(NavLink)`
  color: white;
  margin-left: 12px;

  &.active {
    border-bottom: 1px solid white;
  }
`;
const Login = styled.span``;

const LoginName = styled.span`
  margin-left: 12px;
`;
const LogOutLink = styled(Link)`
  margin-left: 5px;
`;

const Component = observer(() => {

  const navigate = useNavigate();
  const {UserStore, AuthStore} = useStores();

  const handleLogout = () => {
    AuthStore.logout();
  };

  const handleLogin = () => {
    console.log('跳转到登录页面');
    navigate('/login');
  };

  const handleRegister = () => {
    console.log('跳转到注册页面');
    navigate('/register');
  };

  return (
    <Header>
      <Logo src={LogoUrl} alt="forest"/>
      <nav>
        <StyledLink to="/" activeclassname="active" exact="true">首页</StyledLink>
        <StyledLink to="/history" activeclassname="active">上传历史</StyledLink>
        <StyledLink to="/about" activeclassname="active">关于我</StyledLink>
        <Login>
          {
            UserStore.currentUser ? <>
              <LoginName>
                {UserStore.currentUser.attributes.username}
                <LogOutLink to="/login" onClick={handleLogout}>注销</LogOutLink>
              </LoginName>

            </> : <>
              <StyledLink to="/login" activeclassname="active" onClick={handleLogin}>登录</StyledLink>
              <StyledLink to="/register" activeclassname="active" onClick={handleRegister}>注册</StyledLink>
            </>
          }
        </Login>
      </nav>
    </Header>
  );
});

export default Component;