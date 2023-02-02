import React, { useState } from "react";
import Head from "next/head";

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NickNameEditForm";
import FollowList from "../components/FollowList";

import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const Profile = () => {
  const { logInDone } = useSelector((state) => state.user);
  const [EditNickname, setEditNickname] = useState(false);

  const onChangeEditNickname = () => {
    setEditNickname(!EditNickname);
  };
  return (
    <>
      <Head>
        <title>MYreact</title>
      </Head>
      <AppLayout>
        <button
          type="button"
          onClick={onChangeEditNickname}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          <EditOutlined />
        </button>
        {logInDone && EditNickname ? (
          <NicknameEditForm />
        ) : (
          <div style={{ height: "94px" }}></div>
        )}
        {logInDone ? <FollowList /> : <br />}
      </AppLayout>
    </>
  );
};

export default Profile;
