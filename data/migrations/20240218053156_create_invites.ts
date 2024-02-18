import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("invites", (tbl) => {
    tbl.increments();

    tbl
      .integer("eventId")
      .notNullable()
      .references("id")
      .inTable("events")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl
      .integer("guestId")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl.boolean("accepted");

    tbl.boolean("declined");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("invites");
}
