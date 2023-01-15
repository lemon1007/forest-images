import React from 'react';
import {useStores} from '../stores';
import {Form, Input, Button} from 'antd';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';


const Wrapper = styled.div`
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

// const layout = {
//   labelCol: {
//     span: 4,
//   },
//   wrapperCol: {
//     span: 18,
//   },
// };
// const tailLayout = {
//   wrapperCol: {
//     offset: 11,
//     span: 18,
//   },
// };


const Component = () => {

  const navigate = useNavigate();
  const {AuthStore} = useStores();

  // 注册成功
  const onFinish = values => {
    AuthStore.setUsername(values.username);
    AuthStore.setPassword(values.password);
    AuthStore.register()
      .then(() => {navigate('/');})
      .catch(() => {console.log('注册失败');});
  };

  // 注册失败
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const validateUsername = (rule, value) => {
    if (/\W/.test(value)) return Promise.reject('只能是字母数字下划线');
    if (value.length < 1 || value.length > 4) return Promise.reject('长度为1～4个字符');
    return Promise.resolve();
  };

  const validateConfirm = ({getFieldValue}) => ({
    validator(rule, value) {
      if (getFieldValue('password') === value) return Promise.resolve();
      return Promise.reject('两次密码不一致');
    }
  });

  return (
    <Wrapper>
      <Title>用户注册</Title>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用&nbsp;&nbsp;户&nbsp;名"
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
          label="密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码"
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

        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: '再次确认密码',
            },
            validateConfirm
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item>
          <StyleButton type="primary" htmlType="submit">
            提交
          </StyleButton>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default Component;