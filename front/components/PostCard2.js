import React, { useState, useCallback, useEffect } from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List, Space, Comment } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

import CommentForm from "./CommentForm";

import PostCardContent from "./PostCardContent";
import { LOAD_POSTS_REQUEST } from "../reducers/post";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const CardWrapper = styled.div`
  margin-bottom: 10px;
`;

const PostCard2 = () => {
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log("제발제발제발제발제발제발제발제발제발제발제발제발제발제발제발");
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      {mainPosts.map((c) => {
        //console.log("ccccccccccccccccccccccccccccc");
        //console.log(c);
        return <PostCardContent key={c.id} post={c} />;
      })}
    </List>
  );
};

PostCard2.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    nickname: PropTypes.string,
    description: PropTypes.string,
    avatar: PropTypes.any,
    Comments: PropTypes.arrayOf(PropTypes.any),
  }),
};

export default PostCard2;
