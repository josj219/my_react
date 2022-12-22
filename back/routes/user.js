const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const express = require("express");
const bcrypt = require("bcrypt");

const { User } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(error);
    }
    if (info) {
      // info 가 있다는건 클라이언트 에러가 있다는거
      return res.status(401).send(info.reason);
      //401은 unauthorized 금지 의미임 - 로그인 금지니깐 ㅇㅇ
    }
    return req.login(user, async (loginErr) => {
      // 패스포트 로그인 진행
      if (loginErr) {
        return next(loginErr);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
});

router.post("/", isNotLoggedIn, async (req, res) => {
  try {
    console.log(
      "회원가입 포스트 POST는 일단받음@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
    );
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      username: req.body.id,
      nickname: req.body.nickname,
      password: hashedPassword,
    });

    res.status(201).send("ok");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

module.exports = router;
