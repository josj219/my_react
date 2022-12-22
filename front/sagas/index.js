import { all, fork } from "redux-saga/effects";

import axios from "axios";

import postSaga from "./post";
import userSaga from "./user";

axios.defaults.baseURL = "http://localhost:3065";
axios.defaults.withCredentials = true;
// // api 쪽에 , {
//     withCredentials: true,
//   }
//이거 추가 안해도 됨  (data 뒤에)

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
