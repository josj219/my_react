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
  message,
} from "antd";
import ImgCrop from "antd-img-crop";

const { TextArea } = Input;
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from "../reducers/post";

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);

  const [text, onChangeText, setText] = useInput("");
  const [imageData, onChangeimageData, setimageData] = useInput("");

  const dispatch = useDispatch();

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const { me } = useSelector((state) => state.user);

  const onSubmit = useCallback(() => {
    console.log("##############ADD_POST_REQUEST#############");

    if (!text || !text.trim()) {
      return alert("게시글을 작성하세요.");
    }

    const formData = new FormData();

    formData.append("image", imagePaths);

    formData.append("content", text);

    console.log(
      "ADDPOST REQUEST %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"
    );
    console.log(formData);

    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const imageInput = useRef();

  // const onClickImageUpload = useCallback(() => {
  //   imageInput.current.click();
  // }, [imageInput.current]);

  const [fileList, setFileList] = useState([]);

  const onChangeImages = useCallback((e) => {
    console.log("image normal", e);
    console.log("image normal", e.target);
    console.log("image normal", e.target.files);
    console.log("image normal", e.target.files[0]);
    console.log("fileList", e.target.fileList);
    const imageFormData = new FormData();
    const img = e.target.files[0];
    imageFormData.append("image", img);
    console.log(imageFormData);

    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onChangeImg = useCallback((e) => {
    console.log("imagebeforeupload", e);
    console.log("imagebeforeupload", e.file);
    console.log("imagebeforeupload", e.file.originFileObj);
    //setFileList(newFileList);
    //{ file, fileList: newFileList }
    console.log("fileList", e.file.fileList);
    //setFileList(e.file.fileList);
    const img = e.file.originFileObj;
    const imageFormData = new FormData();

    imageFormData.append("image", img);
    console.log(imageFormData);

    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

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
          <Col span={6} gutter={4}>
            <Row>
              <ImgCrop rotate>
                <Upload
                  type="file"
                  name="image"
                  action="/upload.do"
                  listType="picture-card"
                  onChange={onChangeImg}
                  fileList={fileList}
                  //beforeUpload={beforeUpload}
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

          <Col span={18}>
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
