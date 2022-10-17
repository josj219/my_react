const express = require("express");
const postRouter = require("./routes/post");
const app = express();

app.get("/", (req, res) => {
  res.send("hello Express");
});

app.get("/api", (req, res) => {
  res.send("hello API");
});

app.get("/api/posts", (req, res) => {
  res.json([
    { id: 1, content: "hello" },
    { id: 2, content: "hello2" },
    { id: 3, content: "hello3" },
  ]);
});

app.use("/post", postRouter);
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
