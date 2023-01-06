const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  console.log("PASSPORT 시작@@@@@@@@@@@@@@");
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  //로그인 하고 id로 지정해놓음

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });
  //req.user 에 값 저장해서 이걸로 사용함

  local();
};
