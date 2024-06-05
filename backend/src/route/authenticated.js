const express = require("express");
const router = express.Router();
const path = require("path");

const authenticatedRouter = knex => {
  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("ろぐいんできました");
      return next();
    } else {
      console.log("ログインしてません。");
      // res.send("ログインしていません");
      res.send(false);
    }
  }

  router.get("/", isAuthenticated, (req, res) => {
    console.log("req:", req.user);
    // res.sendFile(path.join(__dirname, "../../../frontend", "dist", "index.html"));
    // res.redirect("/signup");
    // res.send(req.user);
    res.send(true);
  });

  return router;
};

module.exports = authenticatedRouter;
