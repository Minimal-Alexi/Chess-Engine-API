import jwt from 'jsonwebtoken';
import { SECRET } from '../config/constants';
import { Request, Response, NextFunction } from "express";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const {_id}  = jwt.verify(token, SECRET) as { _id: number };
    req.body.userID = { _id };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid authorization token" });
  }
}