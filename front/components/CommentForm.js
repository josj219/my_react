import {
  UserOutlined,
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  List,
  Comment,
  Avatar,
  Badge,
  Tooltip,
} from "antd";

import React, { useCallback, useEffect, useState, createElement } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import useInput from "../hooks/useInput";
import { ADD_COMMENT_REQUEST } from "../reducers/post";

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const { addCommentDone, addCommentLoading } = useSelector(
    (state) => state.post
  );

  const [commentText, onChangeCommentText, setCommentText] = useInput("");
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (addCommentDone) {
      setCommentText("");
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    console.log(
      "CLIKEDCLIKEDCLIKEDCLIKEDCLIKEDCLIKEDCLIKEDCLIKEDCLIKEDCLIKEDCLIKEDCLIKEDCLIKEDCLIKEDCLIKED"
    );

    return dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        content: commentText,
        userId: me.id,
        postId: post.id,
      },
    });
  }, [commentText]);

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };
  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };
  const deleteComment = () => {
    console.log("delete Comment액션 처리");
  };

  return (
    <>
      <List
        header={`${post ? post.Comments.length : 0} 댓글`}
        itemLayout="horizontal"
        dataSource={post.Comments}
        renderItem={(item) => (
          <li>
            <Comment
              author={item.User.nickname}
              avatar={item.User.ava}
              content={item.content}
            />
          </li>
        )}
      />
      <Comment
        style={{
          flexDirection: "row",
          display: "flex",
          width: "100%",
        }}
        avatar={
          <div>
            {me && (
              <Badge dot>
                <Avatar
                  src={me.Avatar}
                  icon={<UserOutlined />}
                  //src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="loggedin User"
                />
              </Badge>
            )}
          </div>
        }
        content={
          <div>
            {me && (
              <Form.Item>
                <Input
                  rows={2}
                  onChange={onChangeCommentText}
                  value={commentText}
                />
                <Button
                  htmlType="submit"
                  // loading={submitting}
                  onClick={onSubmitComment}
                  type="primary"
                >
                  Add Comment
                </Button>
              </Form.Item>
            )}
          </div>
        }
      />
      {/* 
      <Form onFinish={onSubmitComment}>
        <Form.Item style={{ position: "relative", margin: 0 }}>
          <Input.TextArea
            rows={4}
            value={commentText}
            onChange={onChangeCommentText}
          />
          <Button
            style={{ position: "absolute", right: 0, bottom: -40 }}
            type="primary"
            htmlType="submit"
          >
            댓글 달기
          </Button>
        </Form.Item>
      </Form> */}
    </>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
