const express = require("express");
const cors = require("cors");
const knex = require("./config/knex");
const path = require("path");
const session = require("express-session");

const signInRouter = require("./route/signIn");
const signUpRouter = require("./route/signUp");
const logoutRouter = require("./route/logout");
const githubAuth = require("./route/github");
const api = require("./api");
const passport = require("passport");

const createServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60 * 60 * 1000 },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(path.join(__dirname, "../../frontend", "dist")));
  app.use("/signIn", signInRouter());
  app.use("/signUp", signUpRouter(knex));
  app.use("/logout", logoutRouter());

  app.use("/auth/github", githubAuth(knex));
  app.use("/api", api(knex));

  // app.use("/auth/github", githubRouter);

  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
  });

  passport.serializeUser((user, done) => {
    console.log(user[0]);
    done(null, user[0]);
  });
  passport.deserializeUser(async (email, done) => {
    try {
      done(null, email);
    } catch (err) {
      done(err);
    }
  });

  return app;
};

module.exports = createServer;
