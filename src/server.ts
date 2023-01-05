import express, { Express } from "express";
import cors from "cors";
import { antifraudCheck, validateToken } from "./middlewares";
import {
  privateController,
  publicController,
  errorController,
} from "./controllers";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.post(
  "/private/login",
  validateToken,
  antifraudCheck("token"),
  privateController
);

app.post("/login", antifraudCheck("ip"), publicController);

app.use(errorController);

export { app as server };
