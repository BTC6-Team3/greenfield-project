const express = require("express");
const router = express.Router();

const authenticatedRouter = knex => {
  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.send("ログインしていません");
    }
  }

  router.get("/", isAuthenticated, (req, res) => {
    console.log("req:", req.user);
    res.send(req.user);
  });

  return router;
};

module.exports = authenticatedRouter;
