import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

import { useSelector } from "react-redux";

import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import PostCard2 from "../components/PostCard2";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      //<PostCard post={mainPosts} />
      
      
      
      
      {mainPosts.map((c) => {
        return <PostCard2 key={c.id} post={c} />;
      })} 
    </AppLayout>
  );
};
export default Home;
