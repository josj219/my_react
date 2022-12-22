import React, { useState, useCallback } from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List, Space, Comment } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

import CommentForm from "./CommentForm";

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: "https://ant.design",
  title: `ant design part ${i}`,
  avatar: "https://joeschmoe.io/api/v1/random",
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const CardWrapper = styled.div`
  margin-bottom: 10px;
`;

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  return (
    <CardWrapper>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={post}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
        }}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <MessageOutlined
                key="list-vertical-message"
                onClick={onToggleComment}
              />,
            ]}
            style={{ textAlign: "center" }}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={item.avatar}
                  style={{ width: "45px", height: "45px" }}
                />
              }
              title={item.User.nickname}
              description={item.description}
            />
            <div style={{ width: "500px", height: "500px", display: "flex" }}>
              <img
                width="100%"
                height="100%"
                style={{ objectFit: "cover", justifyContent: "center" }}
                alt="logo"
                src={item.imagePaths}
              />
            </div>
            <br />
            <div style={{ fontSize: "18px", fontWeight: "500" }}>
              {item.content}
            </div>
            <div style={{ width: "400px" }}></div>
            {commentFormOpened && (
              <div>
                <CommentForm post={item} />
                <List
                  //header={`${post ? post.Comments.length : 0} 댓글`}
                  itemLayout="horizontal"
                  dataSource={item.Comments}
                  rederItem={(a) => (
                    <li>
                      {a}
                      <Comment
                        author={item.User.nickname}
                        avatar={
                          <Link>
                            <a>item.User.nickname</a>
                          </Link>
                        }
                        content={item.content}
                      />
                    </li>
                  )}
                />
              </div>
            )}
          </List.Item>
        )}
      />
    </CardWrapper>
  );
};

PostCard.propTypes = {
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

export default PostCard;
