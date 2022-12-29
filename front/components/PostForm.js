import React, { useState, useCallback, useEffect } from "react";
import {
  Card,
  Form,
  Button,
  Avatar,
  Popover,
  List,
  Comment,
  Input,
  Upload,
  Row,
  Col,
} from "antd";
import ImgCrop from "antd-img-crop";

const { TextArea } = Input;
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { ADD_POST_REQUEST } from "../reducers/post";

const PostForm = () => {
  const { addPostDone } = useSelector((state) => state.post);

  const [text, onChangeText, setText] = useInput("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  // const onSubmit = useCallback(() => {
  //   if (!text || !text.trim()) {
  //     return alert("게시글을 작성하세요.");
  //   }
  //   const formData = new FormData();

  //   formData.append("content", text);
  //   return dispatch({
  //     type: ADD_POST_REQUEST,
  //     data: formData,
  //   });
  // }, [text]);
  // // content, Avatar
  const { me } = useSelector((state) => state.user);

  const onSubmit = useCallback(() => {
    console.log("##############ADD_POST_REQUEST#############");

    return dispatch({
      type: ADD_POST_REQUEST,
      data: { content: text },
    });
  }, [text]);

  const [fileList, setFileList] = useState([""]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "25px",
      }}
    >
      <Form style={{ width: "550px" }} onFinish={onSubmit}>
        <Row gutter={8}>
          <Col span={5} gutter={4}>
            <ImgCrop rotate>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                style={{ width: "100%" }}
              >
                {fileList.length < 1 && "+ Img Upload"}
              </Upload>
            </ImgCrop>
          </Col>

          <Col span={19}>
            <TextArea
              showCount
              value={text}
              onChange={onChangeText}
              maxLength={100}
              style={{
                height: 86,
                paddingRight: 5,
                paddingLeft: 0,
              }}
            />
          </Col>
          <Col span={24}>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ padding: "0 10px" }}
            >
              POST
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PostForm;
