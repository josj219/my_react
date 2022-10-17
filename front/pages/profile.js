import React from "react";
import Head from "next/head";

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NickNameEditForm";
import FollowList from "../components/FollowList";

import { useSelector } from "react-redux";

const Profile = () => {
  const { logInDone, EditNickname, IsProfilepage } = useSelector(
    (state) => state.user
  );

  return (
    <>
      <Head>
        <title>MYreact</title>
      </Head>
      <AppLayout>
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
