/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .table("tourist_spots", (table) => {
      table.integer("budget");
      table.string("in_or_out");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .table("tourist_spots", (table) => {
      table.dropColumn("budget");
      table.dropColumn("in_or_out");
    })
};
