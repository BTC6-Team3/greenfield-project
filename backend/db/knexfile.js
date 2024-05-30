// Update with your config settings.
require("dotenv").config();

if (process.env.DB_NAME === undefined) {
  require("dotenv").config({ path: "./db/.env" });
}

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds/dev",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DB_URL,

    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: './seeds/prod',
    },
  },
};
