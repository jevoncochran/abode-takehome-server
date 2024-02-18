import express from "express";
import { createInvite } from "../controllers/inviteController";

const router = express.Router();

router.post("/", createInvite);

export default router;
