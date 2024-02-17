const express = require("express");
const { registerUser } = require("../controllers/userController.ts");

const router = express.Router();

router.post("/register", registerUser);

module.exports = router;

export {};
