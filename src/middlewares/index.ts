import { Request, Response, NextFunction } from "express";
import { Unauthorized, RequestSuspended } from "../errors";

const TOKEN_LIMIT = process.env.TOKEN_LIMIT;
const IP_LIMIT = process.env.IP_LIMIT;

const antifraudCheck = (type: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    switch (type) {
      case "token":
        if (TOKEN_LIMIT === "200") throw RequestSuspended("Try after 1 hour");
        break;
      default:
        if (IP_LIMIT === "100") throw RequestSuspended("Try after 1 hour");
    }

    next();
  };
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const TOKEN = process.env.TOKEN;
  const token = req.headers.authorization?.split(" ") ?? [];
  
  if (token[1] !== TOKEN) {
    throw Unauthorized("Invalid token");
  }

  next();
}

export {
  antifraudCheck,
  validateToken
};
