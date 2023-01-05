import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { antifraudCheck, validateToken } from "./middlewares";
import { CustomError } from "./errors";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.post("/private/login", validateToken,  antifraudCheck("token"), (req: Request, res: Response, next: NextFunction) => {
  console.log("HERE", req.body);

  res.send();
  next();
});

app.post("/login", antifraudCheck("ip"), (req: Request, res: Response, next: NextFunction) => {
  console.log("HERE", req.body);

  res.send();
  next();
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error({ stack: err.stack, body: req.body });

  res.status(err.statusCode).send({ code: err.code, message: err.message });
  next();
});

export { app as server };
