import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors";

const privateController = (req: Request, res: Response, next: NextFunction) => {
  res.send("Private endpoint");
  next();
};

const publicController = (req: Request, res: Response, next: NextFunction) => {
  res.send("Public endpoint");
  next();
};

const errorController = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error({ stack: err.stack, body: req.body });

  res.status(err.statusCode).send({ code: err.code, message: err.message });
  next();
};

export { privateController, publicController, errorController };
