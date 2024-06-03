const express = require("express");
const router = express.Router();

const authenticatedRouter = knex => {
  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      console.log("だめだめだめだめ");
      res.send("でぇめ");
    }
  }

  router.get("/", isAuthenticated, (req, res) => {
    res.send("こんにちはぁぁぁ");
  });

  return router;
};

module.exports = authenticatedRouter;