import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();

    tbl.string("firstName", 24).notNullable();

    tbl.string("lastName", 24).notNullable();

    tbl.string("email", 50).notNullable();

    tbl.string("password", 50).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users");
}
