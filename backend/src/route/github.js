const express = require("express");
const router = express.Router();
const passport = require("../config/githubAuth");

const githubAuth = knex => {
  //githubで認証しますよ~って宣言
  router.get("/", passport.authenticate("github", { session: true, scope: ["user:email"] }));

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  router.get(
    "/callback",
    //失敗したときに行く画面
    passport.authenticate("github", { failureRedirect: "/github/error" }),
    function (req, res) {
      //認証成功したときの画面
      res.redirect("/input");
    }
  );

  router.get("/signout", (req, res) => {
    try {
      req.session.destroy(function (err) {
        console.log("session destroyed.");
      });
      res.send("ok");
    } catch (err) {
      res.status(400).send({ message: "failed to sign out fb user" });
    }
  });

  return router;
};

module.exports = githubAuth;
