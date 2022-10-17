const dummyUser = {
  nickname: "테스트 용도",
  id: 1,
  description: "Description about me",
  Avatar: "https://joeschmoe.io/api/v1/jerry",
  Posts: [{ id: 1 }],
  Followings: [
    { nickname: "부기초" },
    { nickname: "Chanho Lee" },
    { nickname: "neue zeal" },
  ],
  Followers: [
    { nickname: "부기초" },
    { nickname: "Chanho Lee" },
    { nickname: "neue zeal" },
  ],
};

export const initialState = {
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false, // 닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,
  me: null,
  signUpData: {},
  loginData: {},
  IsProfilepage: false,
};

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const EDIT_NICKNAME = "EDIT_NICKNAME";
export const EDIT_NICKNAME_SUCCES = "EDIT_NICKNAME_SUCCESS";
export const EDIT_NICKNAME_FAILURE = "EDIT_NICKNAME_FAILURE";
export const MODIFY_NICKNAME = "MODIFY_NICKNAME";
export const MODIFY_NICKNAME_SUCCES = "MODIFY_NICKNAME_SUCCESS";
export const MODIFY_NICKNAME_FAILURE = "MODIFY_NICKNAME_FAILURE";

export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";
export const ADD_POST_TO_ME = "ADD_POST_TO_ME";

//동적으로 액션 생성하는 action creator! data 로 동적으로 받을 수 있음
export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

export const editnicknameAction = () => {
  console.log("EDIT NICKNAME ACTION");
  return {
    type: EDIT_NICKNAME,
  };
};
export const modifynickAction = (data) => {
  return {
    type: MODIFY_NICKNAME,
    data,
  };
};
export const signupAction = (data) => {
  return {
    type: SIGN_UP,
    data,
  };
};

// (이전상태,액션) => 다음상태
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      return {
        ...state,
        logInDone: false,
        logInLoading: true,
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        logInDone: true,
        logInLoading: false,
        me: dummyUser,
        loginData: action.data,
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        logInDone: true,
        logInLoading: false,
      };
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        logInDone: false,
        user: null,
      };
    }
    case SIGN_UP_REQUEST: {
      console.log(action.data);
      return {
        ...state,
        signUpData: action.data,
      };
    }
    case EDIT_NICKNAME: {
      return {
        ...state,
        EditNickname: !state.EditNickname,
      };
    }
    case MODIFY_NICKNAME: {
      console.log("MODIFY NICKNAME");
      console.log(action.data);
      return {
        ...state,
        nickname: action.data,
      };
    }
    case ADD_POST_TO_ME: {
      return {
        ...state,
        me: {
          ...state.me,
          Posts: [{ id: action.data }, ...state.me.Posts],
        },
      };
    }
    case REMOVE_POST_OF_ME: {
      return {
        ...state,
        me: {
          ...state.me,
          Posts: state.me.Posts.filter((v) => v.id !== action.data),
        },
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
