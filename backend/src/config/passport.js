const passport = require("passport");
const localStrategy = require("passport-local");
const bcrypt = require("bcrypt");

const knex = require("./knex");
passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      const userInfo = await knex.select("email", "password").from("users").where({ email: email });
      if (userInfo.length === 0) {
        return done(null, false, { message: "Incorrect email." });
      }
      if (bcrypt.compareSync(password, userInfo[0].password)) {
        const returnUser = await knex("users")
          .select("name", "email")
          .where({ email: userInfo[0].email });

        return done(null, returnUser[0]);
      } else {
        return done(null, false, { message: "Incorrect password." });
      }
    }
  )
);

module.exports = passport;
