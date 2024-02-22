import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("events", (tbl) => {
    tbl.increments();

    tbl.string("title", 100).notNullable();

    tbl.date("date").notNullable();

    tbl.dateTime("startTime");

    tbl.dateTime("endTime");

    tbl
      .uuid("userId")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl.boolean("isAllDay");

    tbl.text("description");

    tbl.string("image");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("events");
}
