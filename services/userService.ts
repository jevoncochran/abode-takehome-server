import { RegisterUserInput } from "../types/custom";

const Users = require("../models/userModel.ts");
const bcrypt = require("bcryptjs");

const registerUser = async (user: RegisterUserInput) => {
  let { firstName, lastName, email, password } = user;
  const hash = bcrypt.hashSync(password, 8);
  password = hash;

  return Users.registerUser({
    firstName,
    lastName,
    email,
    password,
  });
};

// TODO: Remove "any" and provide type for filter
const findUserBy = async (filter: any) => {
  return Users.findUserBy(filter);
};

module.exports = { registerUser, findUserBy };
