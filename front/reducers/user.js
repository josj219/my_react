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
  loadUserLoading: false, // 유저 정보 가져오기 시도중
  loadUserDone: false,
  loadUserError: null,
};

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

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

// (이전상태,액션) => 다음상태
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_REQUEST: {
      return {
        ...state,
        loadUserLoading: true,
        loadUserError: null,
        loadUserDone: false,
      };
    }
    case LOAD_USER_SUCCESS: {
      return {
        ...state,
        loadUserLoading: false,
        me: action.data,
        loadUserDone: true,
      };
    }
    case LOAD_USER_FAILURE: {
      return {
        ...state,
        loadUserLoading: false,
        loadUserError: action.error,
      };
    }
    case LOG_IN_REQUEST: {
      return {
        ...state,
        logInLoading: true,
        logInError: null,
        logInDone: false,
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        logInLoading: false,
        me: action.data,
        logInDone: true,
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
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
        signUpLoading: true,
        signUpDone: false,
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
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
