/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema
        .createTable("users", (table) => {
            table.increments("userId").primary();
            table.string("name").notNullable();
            table.string("username").notNullable().unique();
            table.string("password").notNullable();
            table.string("avatar").defaultTo("https://www.svg.com/img/gallery/the-most-terrible-things-master-chief-has-ever-done/intro-1556227104.webp");
            table.timestamp("registeredAt").defaultTo(knex.fn.now());
        })
        .createTable("posts", (table) => {
            table.increments("postId").primary();
            table.string("postContent").notNullable();
            table.string("postImage");
            table.timestamp("postedAt").defaultTo(knex.fn.now());
            table.integer('likeCount').defaultTo(0);
            table
                .integer('post_user_id')
                .unsigned()
                .references('userId')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable("comments", (table) => {
            table.increments("commentId").primary();
            table.string("commentContent").notNullable();
            table.timestamp("commentedAt").defaultTo(knex.fn.now());
            table.integer('likeCount').defaultTo(0);
            table
                .integer('comment_post_id')
                .unsigned()
                .references('postId')
                .inTable('posts')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table
                .integer('comment_user_id')
                .unsigned()
                .references('userId')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable("user_game_data", table => {
            table.increments("dataId").primary();
            table.string("origin_username");
            table.string("discord_username");
            table.string("psn_username");
            table.string("nintendo_username");
            table.string("steam_username");
            table.string("division_username");
            table.string("xbox_username");
            table.string("wow_username");
            table.string("osrs_username");
            table.string("splitgate_username");
            table.string("bio");
            table.string("avatarURL");
            table
                .integer('game_data_user_id')
                .unsigned()
                .references('userId')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("users");
};
