import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ errMsg: "Invalid token" });
  }

  const result = verifyAccessToken(token);
  req.user = result.data;

  if (!result.success) {
    return res.status(403).json({ error: result.error });
  }

  next();
};

const verifyAccessToken = (token: string) => {
  const secret = process.env.JWT_SECRET_KEY;

  try {
    const decoded = jwt.verify(token, secret as string);

    return { success: true, data: decoded };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export default authenticateToken;
