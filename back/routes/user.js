const express = require("express");
const bcrypt = require("bcrypt");

const { User } = require("../models");

const router = express.Router();

router.post("/", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await User.create({
    username: req.body.username,
    nickname: req.body.nickname,
    password: hashedPassword,
  });
  res.send("ok");
});

module.exports = router;
