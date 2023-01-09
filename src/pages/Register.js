import React from 'react';
import {useStores} from '../stores';
import {Form, Input, Button, Checkbox} from 'antd';
import styled from 'styled-components';

const Wraper = styled.div`
  max-width: 600px;
  margin: auto;
  //box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
  //border-radius: 4px;
  padding: 20px;
  //background-color: white;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

const StyleButton =styled(Button)`
  background-color: #42b983;
`


const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 18,
  },
};


const Component = () => {

  const {AuthStore} = useStores();

  // 登录成功
  const onFinish = values => {
    console.log('Success:', values);
  };

  // 登录失败
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const validateUsername = (rule, value) => {
    if(/\W/.test(value)) return Promise.reject('只能是字母数字下划线');
    if(value.length < 1 || value.length > 4) return Promise.reject('长度为1～4个字符');
    return Promise.resolve();
  };

  const validateConfirm = ({getFieldValue}) => ({
    validator(rule, value) {
      if (getFieldValue('password') === value) return Promise.resolve();
      return Promise.reject('两次密码不一致');
    }
  });

  return (
    <Wraper>
      <Title>用户注册</Title>
      <Form
        {...layout}
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
          label="密码"
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

        <Form.Item {...tailLayout}>
          <StyleButton type="primary" htmlType="submit">
            提交
          </StyleButton>
        </Form.Item>
      </Form>
    </Wraper>
  );
};

export default Component;