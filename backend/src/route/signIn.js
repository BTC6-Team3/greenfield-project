const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

const signInRouter = () => {
  router.post("/", passport.authenticate("local", { session: true }), (req, res) => {
    res.status(200).send("ok");
  });

  return router;
};

module.exports = signInRouter;
