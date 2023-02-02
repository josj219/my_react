import React, { useState, useCallback } from "react";
import {
  LikeOutlined,
  LikeTwoTone,
  MessageOutlined,
  StarOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Avatar, List, Space, Comment, Popover, Button } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import PostImages from "./PostImages";

import CommentForm from "./CommentForm";
import {
  REMOVE_POST_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
} from "../reducers/post.js";

const PostCardContent = ({ post }) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);
  const id = useSelector((state) => state.user.me?.id);
  const { me } = useSelector((state) => state.user);

  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onLike = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다.");
    }
    console.log("onLIKE 의 post.id는");
    console.log(post.id);
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onUnLike = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다.");
    }
    console.log("unLIKE 의 post.id는");
    console.log(post.id);
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다.");
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const IconText = ({ icon, text, cb }) => (
    <Space>
      <div onClick={cb} style={{ cursor: "pointer" }}>
        {React.createElement(icon)} {text}
      </div>
    </Space>
  );

  const CardWrapper = styled.div`
    margin-bottom: 10px;
    background-color: white;
    padding: 40px;
    width: 700px;
  `;

  const liked = post.Likers.find((v) => v.id === id);
  console.log("@@@@@@@@ POST IMAGES @@@@@@@@");
  if (post.Images[0]) console.log(post.Images[0]);

  return (
    <CardWrapper>
      <List.Item
        key={post.id}
        actions={[
          liked ? (
            <IconText
              icon={LikeTwoTone}
              text={post.Likers.length}
              key="list-vertical-like-o"
              cb={onUnLike}
            />
          ) : (
            <IconText
              icon={LikeOutlined}
              text={post.Likers.length}
              key="list-vertical-like-o"
              cb={onLike}
            />
          ),
          <IconText
            icon={MessageOutlined}
            key="list-vertical-message"
            text={post.Comments.length}
            cb={onToggleComment}
          />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button
                      type="danger"
                      loading={removePostLoading}
                      onClick={onRemovePost}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        style={{
          textAlign: "center",
        }}
      >
        <List.Item.Meta
          avatar={
            <Avatar
              src={post.User.ava}
              style={{ width: "45px", height: "45px" }}
            />
          }
          title={post.User.nickname}
          description={post.description}
        />
        <div
          style={{
            width: "575px",
            height: "575px",
            display: "flex",
            margin: "0 auto",
          }}
        >
          {post.Images[0] && <PostImages images={post.Images} />}
        </div>
        <br />
        <div style={{ fontSize: "18px", fontWeight: "500" }}>
          {post.content}
        </div>
        <div style={{ width: "400px" }}></div>
      </List.Item>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
        </>
      )}
    </CardWrapper>
  );
};

PostCardContent.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    nickname: PropTypes.string,
    description: PropTypes.string,
    avatar: PropTypes.any,
    Images: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.any),
  }),
};

export default PostCardContent;
