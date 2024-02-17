import { RegisterUserInput } from "../types/custom";
import * as Users from "../models/userModel";
import bcrypt from "bcryptjs";

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

export { registerUser, findUserBy };
