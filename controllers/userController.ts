import { RegisterUserInput } from "../types/custom";

const userService = require("../services/userService.ts");

// @desc Register user
// @route POST /api/auth/register
// @access Public
// TODO: Remove "any" and provide types for req and res
const registerUser = async (req: any, res: any) => {
  let { firstName, lastName, email, password }: RegisterUserInput = req.body;

  // Validate that required fields are not empty
  const isRequiredFieldEmpty = !firstName || !lastName || !email || !password;

  if (isRequiredFieldEmpty) {
    res.status(400).json({ errMsg: "Please add all fields" });
  }

  // Validate that user does not already exist
  const userExists = await userService.findUserBy({ email });

  if (userExists) {
    res.status(400).json({ errMsg: "User already exists" });
  }

  try {
    const newUser = await userService.registerUser({
      firstName,
      lastName,
      email,
      password,
    });

    // Remove password from user object
    delete newUser.password;
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errMsg: "Unable to create user" });
  }
};

module.exports = { registerUser };
