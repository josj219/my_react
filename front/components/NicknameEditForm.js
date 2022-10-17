import React, { useCallback, useMemo } from "react";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";

import { modifynickAction } from "../reducers/user";
import useInput from "../hooks/useInput";

const NicknameEditForm = () => {
  const [modifynick, onChangeModifynick] = useInput("");

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (e) => {
      console.log("modifynick");
      dispatch(modifynickAction({ modifynick }));
    },
    [modifynick]
  );

  return (
    <>
      <Form
        style={{
          marginBottom: "20px",
          border: "1px solid #d9d9d9",
          padding: "20px",
          width: "280px",
        }}
        name="modifynick"
      >
        <Input.Search
          addonBefore="닉네임"
          enterButton="수정"
          value={modifynick}
          onChange={onChangeModifynick}
          onSearch={onSubmit}
        />
      </Form>
    </>
  );
};

export default NicknameEditForm;
