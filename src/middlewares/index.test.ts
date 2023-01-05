import "dotenv/config";
import { test, expect, describe } from "@jest/globals";
import { getToken } from "./index";

describe("getToken", () => {
  test("getToken successful", () => {
    const req: any = {
      headers: {
        authorization: "Bearer c1cddea6-f4e1-4fc8-b9cf-71d09280fdf2"
      }
    };

    const token = getToken(req);

    expect(token).toBe("c1cddea6-f4e1-4fc8-b9cf-71d09280fdf2");
  });  

  test("getToken unsuccessful", () => {
    const req: any = {
      headers: {
        authorization: "Bearer"
      }
    };

    const token = getToken(req);

    expect(token).toBe("");
  });
});
