import { Request, Response, NextFunction } from "express";
import { Unauthorized, RequestSuspended } from "../errors";
import { calculateAttemptAmount } from "../utils";

const { step: TOKEN_STEP, count: TOKEN_LIMIT } = JSON.parse(
  process.env.TOKEN_LIMIT!
);
const { step: IP_STEP, count: IP_LIMIT } = JSON.parse(process.env.IP_LIMIT!);

const getToken = (req: Request) =>
  req.headers.authorization?.split(" ")[1] ?? "";

const antifraudCheck = (type: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let attemptAmount: number;

    switch (type) {
      case "token":
        const token = getToken(req);

        attemptAmount = await calculateAttemptAmount(
          `${token}_token`,
          TOKEN_STEP
        );
        if (attemptAmount > TOKEN_LIMIT) {
          throw RequestSuspended("You've reached the limit. Try after 1 hour");
        }
        break;
      default:
        const ip = req.headers["x-forwarded-for"] ?? "localhost";

        attemptAmount = await calculateAttemptAmount(`${ip}_ip`, IP_STEP);
        if (attemptAmount > IP_LIMIT) {
          throw RequestSuspended("You've reached the limit. Try after 1 hour");
        }
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

export { antifraudCheck, validateToken, getToken };
