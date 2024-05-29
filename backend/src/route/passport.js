const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "ユーザーIDが間違っています。" });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "パスワードが間違っています。" });
      }
      return done(null, user);
    });
  })
);
export default passport;
