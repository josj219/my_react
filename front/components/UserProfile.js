import React, { useCallback, useState, useMemo, Fragment } from "react";
import { Avatar, Card, Button, Form } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
import Link from "next/link";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { editnicknameAction, logoutRequestAction } from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const gridStyle = (React.CSSProperties = {
    width: "33.333%",
    textAlign: "center",
  });

  const TitleWrapper = styled.span`
    padding-right: 10px;
  `;
  console.log("USERPROFILE의 me");
  console.log(me);

  const changeNickname = useCallback((e) => {
    console.log("Chnage Nickname");
    dispatch(editnicknameAction());
  }, []);

  const onSubmitForm = useCallback((e) => {
    console.log("LOGOUT");
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Fragment>
      <Card
        style={{
          width: 300,
        }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <div key="twit">
            <Link href={`/user/`}>
              <a>
                Post
                <br />
                {/* {me.Posts.length} */}
              </a>
            </Link>
          </div>,
          <div key="followings">
            <Link href="/profile">
              <a>
                Followings
                <br />
                {/* {me.Followings.length} */}
              </a>
            </Link>
          </div>,
          <div key="followings">
            <Link href="/profile">
              <a>
                Followers
                <br />
                {/* {me.Followers.length} */}
              </a>
            </Link>
          </div>,
        ]}
      >
        <Meta
          avatar={<Avatar src={me.Avatar} />}
          title={
            <>
              <TitleWrapper>{me.nickname}</TitleWrapper>

              <button
                type="button"
                onClick={changeNickname}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <EditOutlined />
              </button>
            </>
          }
          description={me.description}
          style={{ paddingBottom: "10px" }}
        />
        <div
          className="ant-card-meta"
          style={{
            //   display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "45px",
            //   padding: "10px 0",
          }}
        >
          <Button onClick={onSubmitForm}>로그아웃</Button>
        </div>
      </Card>
    </Fragment>
  );
};

export default UserProfile;
