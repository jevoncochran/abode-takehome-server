import {
  AuthenticatedUser,
  LoginUserInput,
  RegisterUserInput,
} from "../types/custom";
import * as userService from "../services/userService";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// @desc Register user
// @route POST /api/users/register
// @access Public
const registerUser = async (req: Request, res: Response) => {
  let { firstName, lastName, email, password }: RegisterUserInput = req.body;

  // Validate that required fields are not empty
  const isRequiredFieldEmpty = !firstName || !lastName || !email || !password;

  if (isRequiredFieldEmpty) {
    return res.status(400).json({ errMsg: "Please add all fields" });
  }

  // Validate that user does not already exist
  const userExists = await userService.findUserBy({ email });

  if (userExists) {
    return res.status(400).json({ errMsg: "User already exists" });
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

    // Generate token for newly created user
    // Essentially, this logs in the newly created user
    const token = generateAccessToken(newUser);
    res.status(201).json({ user: newUser, token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ errMsg: "Unable to create user" });
  }
};

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = async (req: Request, res: Response) => {
  const { email, password }: LoginUserInput = req.body;

  // Validate that required fields are not empty
  const isRequiredFieldEmpty = !email || !password;
  if (isRequiredFieldEmpty) {
    return res.status(400).json({ errMsg: "Missing email or password" });
  }

  // Check to see if user exists
  const user = await userService.findUserBy({ email });
  if (!user) {
    return res.status(401).json({ errMsg: "Incorrect email or password" });
  }

  // Validate password
  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
    return res.status(401).json({ errMsg: "Incorrect email or password" });
  }

  // Remove password from user object
  delete user.password;

  // Generate token
  const token = generateAccessToken(user);
  res.status(200).json({ user, token });
};

const generateAccessToken = (user: AuthenticatedUser) => {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const secret = process.env.JWT_SECRET_KEY;
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret as string, options);
};

export { registerUser, loginUser };
