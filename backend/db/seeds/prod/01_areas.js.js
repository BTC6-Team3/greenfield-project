const data = require("./01_areas.js.json");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw("TRUNCATE TABLE areas CASCADE");
  await knex.raw("SELECT SETVAL ('areas_area_id_seq', 1, false);");

  await knex("areas").insert(data);
};
