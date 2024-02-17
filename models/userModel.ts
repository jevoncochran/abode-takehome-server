import { RegisterUserInput } from "../types/custom";

const db = require("../data/dbConfig.ts");

const registerUser = async (user: RegisterUserInput) => {
  return db("users")
    .insert(user, "id")
    .then((ids: string[]) => {
      const [id] = ids;
      return findUserBy(id);
    });
};

// TODO: Remove "any" and provide type for filter
const findUserBy = async (filter: any) => {
  return db("users").where(filter).first();
};

module.exports = { registerUser, findUserBy };
