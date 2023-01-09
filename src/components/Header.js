import React, {useState} from 'react';
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
  margin-left: 12px;

  &.active {
    border-bottom: 1px solid white;
  }
`;
const Login = styled.span``;

const LoginName = styled.span`
  margin-left: 12px;
`
const LogOutLink=styled.span`
  margin-left: 5px;
`

function Component() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Header>
      <Logo src={LogoUrl} alt="forest"/>
      <nav>
        <StyledLink to="/" activeclassname="active" exact="true">首页</StyledLink>
        <StyledLink to="/history" activeclassname="active">上传历史</StyledLink>
        <StyledLink to="/about" activeclassname="active">关于我</StyledLink>
        <Login>
          {
            isLogin ? <>
                <LoginName>这是用户<LogOutLink to="/register">注销</LogOutLink></LoginName>

              </> :
              <>
              <StyledLink to="/register" activeclassname="active">注册</StyledLink>
              <StyledLink to="/login" activeclassname="active">登录</StyledLink>
            </>
          }
        </Login>
      </nav>
    </Header>
  );
}

export default Component;