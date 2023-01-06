import React, { useState, useCallback, useEffect, useRef } from "react";
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
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from "../reducers/post";

const PostForm = () => {
  const { addPostDone } = useSelector((state) => state.post);

  const [text, onChangeText, setText] = useInput("");
  const dispatch = useDispatch();

  const [uploading, setUploading] = useState(false);

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
  const newimageFormData = null;

  const onSubmit = useCallback(() => {
    console.log("##############ADD_POST_REQUEST#############");

    if (!text || !text.trim()) {
      return alert("게시글을 작성하세요.");
    }

    const formData = new FormData();
    formData.append("image", newimageFormData);
    formData.append("content", text);

    console.log(formData);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text]);

  const imageInput = useRef();

  // const onClickImageUpload = useCallback(() => {
  //   imageInput.current.click();
  // }, [imageInput.current]);

  const [fileList, setFileList] = useState([""]);

  const onChangeImages = useCallback((e) => {
    console.log("image", e.target.files);
    //setFileList(newFileList);
    const imageFormData = new FormData();
    //imageFormData.append("image");
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });
    newimageFormData = imageFormData;
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onChangeImg = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    console.log("PREVIEW");
    console.log("PREVIEW");
    console.log("PREVIEW");
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    //console.log(file);
    //console.log(src);

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
      <Form
        style={{ width: "550px" }}
        onFinish={onSubmit}
        encType="multipart/form-data"
      >
        <Row gutter={8}>
          <Col span={10} gutter={4}>
            <Row>
              <ImgCrop rotate>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  filelist={fileList}
                  onChange={onChangeImg}
                  onPreview={onPreview}
                  style={{ width: "100%" }}
                >
                  {fileList.length < 1 && "+ Img Upload"}
                </Upload>
                {/* <Button
                type="primary"
                onClick={ImgUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{
                  marginTop: 16,
                }}
                >
                {uploading ? "Uploading" : "Start Upload"}
              </Button> */}
              </ImgCrop>
            </Row>
            <Row>
              <input
                type="file"
                name="image"
                ref={imageInput}
                onChange={onChangeImages}
              />
            </Row>
          </Col>

          <Col span={14}>
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
