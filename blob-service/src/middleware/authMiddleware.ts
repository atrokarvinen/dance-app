import { NextFunction, Request, Response } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    console.log("No auth token provided in header");
    return res.status(401).json({ error: "Unauthorized" });
  }
  const authTokenEnv = process.env.AUTH_TOKEN;
  const expectedHeader = `Bearer ${authTokenEnv}`;
  if (authToken !== expectedHeader) {
    console.log("Auth tokens do not match");
    return res.status(401).json({ error: "Unauthorized" });
  }
  return next();
};
