import express, { Express, Request, Response } from "express";

const app: Express = express();

app.post("", (req: Request, res: Response) => {
  console.log("HERE");
});

export { app as server };
