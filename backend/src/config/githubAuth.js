const GitHubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const knex = require("./knex");
const express = require("express");
const router = express.Router();

passport.use(
  new GitHubStrategy(
    {
      //本当は、.envにかく↓
      clientID: "Ov23liqu4XFxOrqTHItR",
      clientSecret: "554cd84a960b371d06a38405003593bbe259d6cc",
      callbackURL: "http://localhost:8080/auth/github/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      const user = await knex("users")
        .select("email", "password")
        .where({ email: profile.id, password: profile.provider });

      console.log("user:", user);

      if (user.length === 0) {
        console.log("新規登録");
        //一時的に、適当なカラムに保存している
        await knex("users").insert({
          name: profile.username,
          email: profile.id,
          salt: "",
          password: profile.provider,
        });
        res.status(200);
        return done(null, profile);
      } else {
        console.log("DB登録済み");
        return done(null, profile);
      }
    }
  )
);
module.exports = passport;
