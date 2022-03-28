/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('users', (table) => {
    table.increments('id');
    table.string('username').notNullable();
    table.timestamp('registeredAt').defaultTo(knex.fn.now());
  })
  .createTable('posts', (table) => {
      table.increments('id');
      table.string('conent').notNullable();
      table.timestamp('postedAt').defaultTo(knex.fn.now());
      table.integer('likeCount').defaultTo(0);
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
  })
  .createTable('comments', (table) => {
      table.increments('id');
      table.string('conent').notNullable();
      table.timestamp('postedAt').defaultTo(knex.fn.now());
      table.integer('likeCount').defaultTo(0);
      table
        .integer('post_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('posts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable('users').droptable('posts').dropTable('comments');
};
