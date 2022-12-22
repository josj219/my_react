import React, { useState, useCallback, useEffect } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import Head from "next/head";

import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";

import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST } from "../reducers/user";
import Router from "next/router";

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (signUpDone) {
      Router.push("/");
    }
  }, [signUpDone]);

  const [id, onChangeId] = useInput("");
  const [nickname, onChangeNick] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }

    console.log(id, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { id, password, nickname },
    });
  }, [id, password, passwordCheck]);

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
