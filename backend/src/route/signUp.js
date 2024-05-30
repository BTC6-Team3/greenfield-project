const bcrypt = require("bcrypt");
const express = require("express");

const router = express.Router();

const signUpRouter = (knex) => {
  router.post("/", async (req, res) => {
    const { email, name, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);
    await knex("users").insert({
      name: name,
      email: email,
      salt: salt,
      password: hashed,
    });
    res.status(200).end();
  });

  return router;
};

module.exports = signUpRouter;
