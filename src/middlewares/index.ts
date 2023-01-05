import { Request, Response, NextFunction } from "express";
import { Unauthorized, RequestSuspended } from "../errors";
import { redis } from "../db/redis";

const TOKEN_LIMIT = Number.parseInt(process.env.TOKEN_LIMIT!);
const IP_LIMIT = Number.parseInt(process.env.IP_LIMIT!);

const getToken = (req: Request) =>
  req.headers.authorization?.split(" ")[1] ?? "";

const antifraudCheck = (type: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = getToken(req);
    let attemptCount: number;

    switch (type) {
      case "token":
        attemptCount = await redis.incrementBy(`${token}_token`, 1);

        if (attemptCount > TOKEN_LIMIT)
          throw RequestSuspended("Try after 1 hour");
        break;
      default:
        attemptCount = await redis.incrementBy(`${token}_ip`, 1);
        if (attemptCount > IP_LIMIT) throw RequestSuspended("Try after 1 hour");
    }

    next();
  };
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const TOKEN = process.env.TOKEN;
  const token = getToken(req);

  if (token !== TOKEN) {
    throw Unauthorized("Invalid token");
  }

  next();
};

export { antifraudCheck, validateToken };
