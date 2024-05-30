/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("areas", (table) => {
      table.increments("area_id").primary();
      table.text("area_name");
    })
    .createTable("tourist_spots", (table) => {
      table.increments("tourist_spot_id").primary();
      table.text("name").unique();
      table.text("description");
      table.text("address");
      table.float("latitude");
      table.float("longitude");
      table.integer("required_time");
      table.date("created_at");
      table.date("updated_at");
      table.integer("area_id");
      table.foreign("area_id").references("areas.area_id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("tourist_spots").dropTable("areas");
};
