import { AppError } from "@/common/domain/errors/AppError";
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  if (error instanceof AppError) {
    return res.status(400).json({ status: "error", message: error.message });
  }
  console.log(error);

  return res
    .status(500)
    .json({ status: "error", message: "Internal Server Error" });
}
