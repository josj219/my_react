import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";

import { useSelector, useDispatch } from "react-redux";

import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import PostCard2 from "../components/PostCard2";

import { LOAD_POSTS_REQUEST } from "../reducers/post";

const Home = () => {
  //const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  console.log("MEMEMEMEME @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log(me);
  console.log("MEMEMEMEME @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  return (
    <AppLayout>
      {me && <PostForm />}
      <PostCard2 />
      {/* {mainPosts.map((c) => {
        return <PostCard key={c.id} post={c} />;
      })} */}
    </AppLayout>
  );
};
export default Home;
