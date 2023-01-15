import React from 'react';
import {useStores} from '../stores';
import {Form, Input, Button} from 'antd';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

const Wraper = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

const StyleButton = styled(Button)`
  background-color: #42b983;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 15px;
`;


const Component = () => {

  const navigate = useNavigate();
  const {AuthStore} = useStores();

  // 登录成功
  const onFinish = values => {
    AuthStore.setUsername(values.username);
    AuthStore.setPassword(values.password);
    AuthStore.login()
      .then(() => {navigate('/');})
      .catch(() => {console.log('fail');});
  };

  // 登录失败
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const validateUsername = (rule, value) => {
    if (/\W/.test(value)) return Promise.reject('只能是字母数字下划线');
    if (value.length < 1 || value.length > 4) return Promise.reject('长度为1～4个字符');
    return Promise.resolve();
  };

  return (
    <Wraper>
      <Title>用户登录</Title>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: '输入用户名',
            },
            {validator: validateUsername}
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="密&nbsp;&nbsp;&nbsp;&nbsp;码"
          name="password"
          rules={[
            {
              required: true,
              message: '输入密码',
            },
            {
              min: 4,
              message: '最少4个字符'
            },
            {
              max: 10,
              message: '最多10个字符'
            }
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item>
          <StyleButton type="primary" htmlType="submit">提交</StyleButton>
        </Form.Item>
      </Form>
    </Wraper>
  );
};

export default Component;