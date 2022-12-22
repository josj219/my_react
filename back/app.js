const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const passport = require("passport");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const db = require("./models");
const passportConfig = require("./passport");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);
passportConfig();

app.use(
  cors({
    origin: "http://localhost:3060",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//세션이랑 쿠키 아래 4개 추가해줘야 함
//로그인 했다고 해서 3060(브라우저-프론트) 3065(백엔드) 같은 정보 가지고 있지 않음
//누가 로그인했는지 다시 브라우저로 보내줘야 한다
//암호화 해서 쿠키에 넣어서 보냄 => 즉 브라우저랑 백엔드가 세션으로 열린 통신(네트워크)에 쿠키로 통신함
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello Express");
});

app.get("/api", (req, res) => {
  res.send("hello API");
});

app.use("/user", userRouter);
app.use("/posts", postsRouter);
app.use("/post", postRouter);

// app.use((err,req,res,next)=>{

// })
// 이런식으로 에러처리 미들웨어 만들어줘도 되는데 사실 이건 원래 들어가있음

app.listen(3065, () => {
  console.log("서버 실행 중");
});

// const http = require("http");
// const server = http.createServer((req, res) => {
//   console.log(req.url, req.method);
//   res.end("hello node");
// });
// server.listen(3065, () => {
//   console.log("서버 실행 중");
// });
