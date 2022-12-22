const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  console.log("PASSPORT 시작@@@@@@@@@@@@@@");
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
