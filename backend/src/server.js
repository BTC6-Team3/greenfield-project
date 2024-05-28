const express = require("express");
const rootRouter = require("./route/root");
const createServer = () => {
  const app = express();
  app.use("/", rootRouter());
  return app;
};

module.exports = createServer;
