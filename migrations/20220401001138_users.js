/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("userId").primary();
        table.string("name").notNullable();
        table.string("username").notNullable().unique();
        table.string("password").notNullable();
        table.timestamp("registeredAt").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("users");
};