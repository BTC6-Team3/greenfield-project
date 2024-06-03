const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

const signInRouter = () => {
  router.post("/", passport.authenticate("local", { session: false }), (req, res) => {
    res.status(200).send("ok");
  });

  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      console.log("だめだめだめだめ");
      res.send("でぇめ");
    }
  }

  router.get("/authenticated", isAuthenticated, (req, res) => {
    res.send("こんにちはぁぁぁ");
  });

  return router;
};

module.exports = signInRouter;
