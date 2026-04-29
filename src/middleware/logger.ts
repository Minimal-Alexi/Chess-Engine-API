import { Request, Response, NextFunction } from "express";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const currentDate = new Date().toISOString();

  console.log(`[${currentDate}] ${req.method} request to ${req.url}`);
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");

  next();
};

export default requestLogger;