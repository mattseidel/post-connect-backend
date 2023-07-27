import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../services/jwt.service";

export const authenticationMioddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  const tokenWithoutBearer = token.split(" ")[1];
  try {
    const user = verifyJWT(tokenWithoutBearer);
    req.body["userDecoded"] = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
