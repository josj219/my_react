const express = require("express");

const router = express.Router();

const { Post, Image, Comment, User, Hashtag } = require("../models");
const { isLoggedIn } = require("./middlewares");

router.post("/", async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
      // 이놈은 passport 의 deserialize 하면 user 로 남아서 넘어온다!!
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          //   model: Image,
          // }, {
          //   model: Comment,
          //   include: [{
          //     model: User, // 댓글 작성자
          //     attributes: ['id', 'nickname'],
          //   }],
          // },

          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/:postId/comment", async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/", (req, res) => {
  // DELETE /post
  res.json({ id: 1, content: "hello" });
});

module.exports = router;
