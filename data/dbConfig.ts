const knex = require("knex");
const config = require("../knexfile.ts");

const env = process.env.DB_ENV || "development";

module.exports = knex(config[env]);
