import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { antifraudCheck } from "./middlewares";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.post("/private/login", antifraudCheck("token"), (req: Request, res: Response) => {
  console.log("HERE", req.body);
});

app.post("/login", antifraudCheck("ip"), (req: Request, res: Response) => {
  console.log("HERE", req.body);
});

export { app as server };
