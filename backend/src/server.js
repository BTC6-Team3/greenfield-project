const express = require("express");
const cors = require("cors");
const knex = require("./config/knex");
const session = require("express-session");
const path = require("path");

const signInRouter = require("./route/signIn");
const signUpRouter = require("./route/signUp");
const logoutRouter = require("./route/logout");
const githubAuth = require("./route/github");
const api = require("./api");
const passport = require("passport");

const createServer = () => {
  const app = express();
  app.use(
    session({
      secret: "some secret",
      saveUninitialized: false,
      resave: true,
      cookie: { maxAge: 30000 },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "../../frontend", "dist")));
  app.use("/signIn", signInRouter());
  app.use("/signUp", signUpRouter(knex));
  app.use("/logout", logoutRouter());

  app.use("/auth/github", githubAuth(knex));
  app.use("/api", api(knex));
  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
  });

  return app;
};

module.exports = createServer;
