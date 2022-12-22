import React, { useState, useMemo } from "react";
import { Breadcrumb, Layout, Menu, Row, Col, Input } from "antd";
const { Header, Content, Footer } = Layout;
import "antd/dist/antd.css";
import styled from "styled-components";
import Link from "next/link";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";

const ImageBox = styled.img`
  marginbottom: 30px;
  vertica-align: baesline;
`;

const BreadcrumbStyle = styled(Breadcrumb)`
  padding: 10px;
`;

const ContentsWrapper = styled.div`
  minheight: 280px;
  margintop: 50px;
  padding-right: 20px;
`;

const FooterWrapper = styled.div`
  text-align: center;
`;

const AppLayout = ({ children }) => {
  const { EditNickname, logInDone, me } = useSelector((state) => state.user);

  console.log("APPLAYOUT");
  console.log(logInDone);
  console.log(EditNickname);
  console.log(me);
  return (
    <Layout>
      <Header>
        <div
          style={{
            float: "left",
            width: "120px",
            height: "31px",
            marginbottom: "30px",
          }}
        >
          <ImageBox src="/images/logo2.png" width="120px" height="31px" />
        </div>

        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="home">
            <Link href="/">
              <a>HOME</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="profile">
            <Link href="/profile">
              <a>PROFILE</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="search">
            <Input.Search
              enterButton
              allowClear
              style={{ verticalAlign: "middle", width: "304" }}
            />
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb style={{ padding: "10px" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          {/* {/* <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item> */}
        </Breadcrumb>

        <ContentsWrapper>
          <Row gutter={12}>
            <Col xs={24} md={5}>
              {/* {me ? <UserProfile /> : <LoginForm />} */}

              {logInDone ? <UserProfile /> : <LoginForm />}
            </Col>
            <Col xs={24} md={19}>
              {children}
            </Col>
          </Row>
        </ContentsWrapper>
      </Content>
      <FooterWrapper>
        <Footer>©2022 Created by Jo</Footer>
      </FooterWrapper>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
