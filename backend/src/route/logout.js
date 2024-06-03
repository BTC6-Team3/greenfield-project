const express = require("express");
const router = express.Router();
// const passport = require("../config/passport");

const logout = () => {
  router.post("/", function (req, res, next) {
    console.log("kita");
    req.logout(err => {
      if (err) {
        return next(err);
      }
      req.session.destroy(console.log("destroy"));
      res.redirect("/");
    });
  });

  return router;
};
module.exports = logout;
