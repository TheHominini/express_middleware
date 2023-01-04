import dotenv from "dotenv";
import { server } from "./src/server";

dotenv.config();

(async () => {
  const port = process.env.PORT;

  server.listen(port, () => {
    console.log(`Server is running on :${port}`);
  });
})()
