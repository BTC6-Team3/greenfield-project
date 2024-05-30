const bcrypt = require("bcrypt");
const express = require("express");

const router = express.Router();

const signUpRouter = (knex) => {
  router.post("/", async (req, res) => {
    const { email, name, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);
    // NOTE:本来は一つのクエリで実装するべき
    const foundUser = await knex("users").select("email").where("email", email);
    if (foundUser.length === 0) {
      await knex("users").insert({
        name: name,
        email: email,
        salt: salt,
        password: hashed,
      });
      res.status(200).end();
    } else {
      res.status(409).end();
    }
  });

  return router;
};

module.exports = signUpRouter;
