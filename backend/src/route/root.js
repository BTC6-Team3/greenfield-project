const express = require("express");
const router = express.Router();

const rootRouter = () => {
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });

  return router;
};

module.exports = rootRouter;
