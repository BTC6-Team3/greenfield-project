const express = require("express");
const cors = require("cors");
const path = require("path");
const knex = require("./config/knex");
const signInRouter = require("./route/signIn");
const signUpRouter = require("./route/signUp");
const api = require("./api");
const path = require("path");

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(express.static(path.join(__dirname, "../../frontend", "dist")));
  app.use("/signIn", signInRouter());
  app.use("/signUp", signUpRouter(knex));
  app.use("/api", api(knex));
  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
  });

  return app;
};

module.exports = createServer;
