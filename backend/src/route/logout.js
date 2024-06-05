const express = require("express");
const router = express.Router();

const logout = () => {
  const app = express();

  router.post("/", function (req, res, next) {
    req.logout(err => {
      if (err) {
        return next(err);
      }
      req.session.destroy(err => {
        if (err) {
          return next(err);
        }
        res.clearCookie("connect.sid");
        console.log("ログアウト成功");
        res.redirect("/");
      });
    });
  });

  return router;
};
module.exports = logout;
