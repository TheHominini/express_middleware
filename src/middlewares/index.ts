import { Request, Response, NextFunction } from "express";

const TOKEN_LIMIT = process.env.TOKEN_LIMIT;
const IP_LIMIT = process.env.IP_LIMIT;

console.log(TOKEN_LIMIT);

const antifraudCheck = (type: string) => {
  const limitRequest = async (req: Request, res: Response, next: NextFunction) => {
    console.log("limitRequest", type);

    switch (type) {
      case "token":
        if (TOKEN_LIMIT === "20") throw new Error("Try after 1 hour");
        break;
      default:
        if (IP_LIMIT === "10") throw new Error("Try after 1 hour");
    }

    next();
  };

  return limitRequest;
};

export {
  antifraudCheck
};
