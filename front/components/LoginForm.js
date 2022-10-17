import React, { useCallback, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import useInput from "../hooks/useInput";
import { useDispatch } from "react-redux";

import { LOG_IN_REQUEST } from "../reducers/user";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, onChangeUsername] = useInput("");
  const [password, setPassword] = useState("");

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmitForm = useCallback(
    (e) => {
      console.log(username, password);
      dispatch({
        type: LOG_IN_REQUEST,
        data: { username, password },
      });
    },
    [username, password]
  );

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 12,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onSubmitForm}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input
          name="user-name"
          value={username}
          onChange={onChangeUsername}
          required
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          name="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
        style={{ margin: 4.5 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 7,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
