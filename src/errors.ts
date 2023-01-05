export class CustomError extends Error {
  constructor(
    readonly code: string,
    readonly statusCode: number,
    readonly message: string
  ) {
    super(message);
  }
}

export const Unauthorized = (message: string) => {
  return new CustomError("Unauthorized", 401, message);
};

export const RequestSuspended = (message: string) => {
  return new CustomError("RequestSuspended", 403, message);
};
