import React, { useState, useCallback, useEffect } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import Head from "next/head";

import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";

import { useDispatch, useSelector } from "react-redux";
import { signupAction } from "../reducers/user";

const Signup = () => {
  const [passwordCheck, setPasswordCheck] = useState("");
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const [id, onChangeId] = useInput("");
  const [nickname, onChangeNick] = useInput("");
  const [password, onChangePassword] = useInput("");

  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(id, password);
    dispatch(signupAction({ id, password, nickname }));
  }, [id, password, passwordCheck, term]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>MYreact</title>
      </Head>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 6 }}
        layout="horizontal"
        onFinish={onSubmit}
      >
        <Form.Item
          label="Username"
          name="user-id"
          rules={[
            {
              required: true,
              message: "Please input your id!",
            },
          ]}
        >
          <Input name="user-id" value={id} required onChange={onChangeId} />
        </Form.Item>
        <Form.Item
          label="Nickname"
          name="nickname"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
            },
          ]}
        >
          <Input
            name="nickname"
            value={nickname}
            required
            onChange={onChangeNick}
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
          <Input.Password value={password} onChange={onChangePassword} />
        </Form.Item>
        <Form.Item
          label="Password-check"
          name="passwordCheck"
          rules={[
            {
              required: true,
              message: "Please input your password again to check",
            },
          ]}
        >
          <Input.Password
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
        </Form.Item>
        <div style={{ marginLeft: 300, marginBottom: 10 }}>
          {passwordError && (
            <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
          )}
        </div>
        <Form.Item
          wrapperCol={{
            offset: 7,
            span: 16,
          }}
        >
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            개인정보 제공 동의에 동의합니다.
          </Checkbox>
          {termError && (
            <div style={{ color: "red" }}>약관에 동의하셔야 합니다.</div>
          )}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 9,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            가입하기
          </Button>
        </Form.Item>
      </Form>
    </AppLayout>
  );
};

export default Signup;
