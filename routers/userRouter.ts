import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
} from "../controllers/userController";
import authenticate from "../middleware/authenticationMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", authenticate, getAllUsers);

export default router;
