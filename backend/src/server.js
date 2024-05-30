const express = require("express");
const environment = process.env.NODE_ENV || "development";
const knexConfig = require("../db/knexfile");
const knex = require("knex")(knexConfig[environment]);
const rootRouter = require("./route/root");
// const signInRouter = require("./route/signIn");
const signUpRouter = require("./route/signUp");
console.log(process.env.DB_NAME);
const createServer = () => {
  const app = express();
  app.use(express.json());
  // app.use("/signIn", signInRouter());
  app.use("/signUp", signUpRouter(knex));
  // app.use("/", rootRouter());
  // app.use("/", rootRouter());
  return app;
};

module.exports = createServer;
