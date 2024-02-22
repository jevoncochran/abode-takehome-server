import { RegisterUserInput } from "../types/custom";
import db from "../data/dbConfig";

const registerUser = async (user: RegisterUserInput) => {
  return db("users")
    .insert(user, "id")
    .then((ids: string[]) => {
      const [id] = ids;
      return findUserBy(id);
    });
};

const getAllUsers = async () => {
  return db("users").select("id", "email", "firstName", "lastName");
};

// TODO: Remove "any" and provide type for filter
const findUserBy = async (filter: any) => {
  return db("users").where(filter).first();
};

export { registerUser, getAllUsers, findUserBy };
