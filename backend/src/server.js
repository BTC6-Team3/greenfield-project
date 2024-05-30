const express = require("express");
const cors = require("cors");
const knex = require("./config/knex");
const signInRouter = require("./route/signIn");
const signUpRouter = require("./route/signUp");

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + "../../frontend/dist"));
  app.use("/signIn", signInRouter());
  app.use("/signUp", signUpRouter(knex));
  return app;
};

module.exports = createServer;
