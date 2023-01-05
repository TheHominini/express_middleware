import "dotenv/config";
import { test, expect, describe } from "@jest/globals";
import { getToken, validateToken } from "./index";

describe("getToken", () => {
  test("getToken successful", () => {
    const req: any = {
      headers: {
        authorization: "Bearer c1cddea6-f4e1-4fc8-b9cf-71d09280fdf2",
      },
    };

    const token = getToken(req);

    expect(token).toBe("c1cddea6-f4e1-4fc8-b9cf-71d09280fdf2");
  });

  test("getToken unsuccessful", () => {
    const req: any = {
      headers: {
        authorization: "Bearer",
      },
    };

    const token = getToken(req);

    expect(token).toBe("");
  });
});

describe("validateToken", () => {
  test("Successful", () => {
    const req: any = {
      headers: {
        authorization: "Bearer c1cddea6-f4e1-4fc8-b9cf-71d09280fdf2",
      },
    };
    const res: any = {};
    const nextMock = jest.fn();

    validateToken(req, res, nextMock)

    expect(nextMock).toBeCalled();
  });

  test("Throw Unauthorized error", () => {
    const req: any = {
      headers: {
        authorization: "Bearer",
      },
    };
    const res: any = {};

    expect(() => { validateToken(req, res, () => {}) }).toThrow("Invalid token");
  });
});
