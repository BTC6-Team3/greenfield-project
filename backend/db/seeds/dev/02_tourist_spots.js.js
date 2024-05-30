const data = require("./02_tourist_spots.json");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tourist_spots").del();
  await knex("tourist_spots").insert(data);
};
