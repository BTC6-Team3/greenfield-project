const express = require("express");
const cors = require("cors");
const path = require("path");
const knex = require("./config/knex");
const session = require("express-session");
const passport = require("passport");

const signInRouter = require("./route/signIn");
const signUpRouter = require("./route/signUp");
const logoutRouter = require("./route/logout");
const authenticatedRouter = require("./route/authenticated");
const api = require("./api");

const createServer = () => {
  const app = express();
  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60 * 60 * 1000 },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  //---------------------------------------------------------------------------------
  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "../../frontend", "dist")));
  app.use("/signIn", signInRouter());
  app.use("/signUp", signUpRouter(knex));
  app.use("/logout", logoutRouter());
  app.use("/api", api(knex));
  app.use("/authenticated", authenticatedRouter(knex));
  // app.use("/", (req, res) => {
  //   res.redirect("/authenticated");
  // });
  //---------------------------------------------------------------------------------

  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
  });

  //---------------------------------------------------------------------------------
  passport.serializeUser((user, done) => {
    // console.log("<2.serializeUser>", user);
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    // console.log("<3(リロードの度).deserializeUser>", user);
    done(null, user);
  });
  //---------------------------------------------------------------------------------

  return app;
};

module.exports = createServer;
