import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("events", (tbl) => {
    tbl.uuid("id").primary().defaultTo(knex.raw("(UUID())"));

    tbl.string("title", 100).notNullable();

    tbl.date("date").notNullable();

    tbl.dateTime("startTime").notNullable();

    tbl.dateTime("endTime").notNullable();

    tbl
      .uuid("userId")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl.boolean("isAllDay");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("events");
}
