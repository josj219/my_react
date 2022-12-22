import shortId from "shortid";
import faker from "faker";
import { fa } from "faker/lib/locales";

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  Liked: null,
};

// mainPosts: [
//   {
//     id: 1,
//     User: {
//       id: 1,
//       nickname: "제로초",
//     },
//     content: "첫 번째 게시글",
//     avatar: "https://joeschmoe.io/api/v1/random",
//     description: "설명글입니다.",
//     imagePaths: "https://picsum.photos/500/500",
//     Comments: [
//       {
//         User: {
//           id: 2,
//           nickname: "nero",
//           avatar: "https://joeschmoe.io/api/v1/random",
//         },
//         content: "우와 개정판이 나왔군요~",
//       },
//       {
//         User: {
//           id: 3,
//           nickname: "hero",
//           avatar: "https://joeschmoe.io/api/v1/random",
//         },
//         content: "얼른 사고싶어요~",
//       },
//     ],
//   },

export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      avatar: "https://joeschmoe.io/api/v1/random",
      imagePaths: "https://random.imagecdn.app/500/500",
      Comments: [
        {
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
            avatar: "https://joeschmoe.io/api/v1/julie",
          },
          content: faker.lorem.sentence(),
        },
        {
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
            avatar: "https://joeschmoe.io/api/v1/jon",
          },
          content: faker.lorem.sentence(),
        },
      ],
    }));

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

const dummyPost = (data) => ({
  id: data.id,
  content: data.post.content,
  User: data.post.User,
  avatar: data.post.User.Avatar,
  imagePaths: "https://random.imagecdn.app/500/500",
  Comments: [
    {
      User: {
        id: 2,
        nickname: "jane",
        avatar: "https://joeschmoe.io/api/v1/jane",
      },
      content: "jane 의 댓글입니다",
    },
    {
      User: {
        id: 3,
        nickname: "jake",
        avatar: "https://joeschmoe.io/api/v1/jake",
      },
      content: "jake의 댓글입니다",
    },
  ],
  Liked: 0,
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data.content,
  User: {
    id: data.user.id,
    nickname: data.user.nickname,
    avatar: data.user.Avatar,
  },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_REQUEST: {
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    }
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.data.postId
      );
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [action.data, ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;

      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
    // case REMOVE_COMMENT_FAILURE: {
    //   return {
    //     ...state,
    //     removeCommentLoading: false,
    //     removePostError: action.error,
    //   };
    // }
    case REMOVE_POST_REQUEST: {
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    }
    case REMOVE_POST_SUCCESS: {
      return {
        ...state,
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
        removePostLoading: false,
        removePostDone: true,
      };
    }
    case REMOVE_POST_FAILURE: {
      return {
        ...state,
        addPostError: null,
      };
    }
    case ADD_POST_REQUEST: {
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    }
    case ADD_POST_SUCCESS: {
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        mainPosts: [action.data, ...state.mainPosts],
      };
    }
    case ADD_POST_FAILURE: {
      return {
        ...state,
        addPostError: null,
      };
    }
    case LOAD_POSTS_REQUEST: {
      return {
        ...state,
        loadPostsLoading: true,
        loadPostsDone: false,
        loadPostsError: null,
      };
    }
    case LOAD_POSTS_SUCCESS: {
      return {
        ...state,
        loadPostsLoading: false,
        loadPostsDone: true,
        mainPosts: action.data,
        hasMorePosts: action.data.length === 10,
        // mainPosts: [dummyPost, ...state.mainPosts],
      };
    }
    case LOAD_POSTS_FAILURE: {
      return {
        ...state,
        loadPostsLoading: false,
        loadPostsDone: true,
        loadPostsError: action.error,
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
