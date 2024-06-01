const express = require("express");
const cors = require("cors");
const knex = require("./config/knex");
const session = require("express-session");
const path = require("path");

const signInRouter = require("./route/signIn");
const signUpRouter = require("./route/signUp");
const api = require("./api");
const githubRouter = require("./config/githubAuth");
const passport = require("passport");
const githubAuth = require("./route/github");

const createServer = () => {
  const app = express();
  app.use(session({ secret: "554cd84a960b371d06a38405003593bbe259d6cc" }));
  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "../../frontend", "dist")));
  app.use("/signIn", signInRouter());
  app.use("/signUp", signUpRouter(knex));
  app.use("/api", api(knex));
  app.use("/auth/github", githubAuth(knex));
  // app.use("/auth/github", githubRouter);
  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
  });

  return app;
};

module.exports = createServer;
