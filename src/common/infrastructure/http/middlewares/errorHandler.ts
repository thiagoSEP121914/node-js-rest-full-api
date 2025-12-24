import { AppError } from "@/common/domain/errors/AppError";
import { Request, Response } from "express";
import { logger } from "../logger";

export function errorHandler(error: Error, req: Request, res: Response): Response {
    if (error instanceof AppError) {
        return res.status(400).json({ status: "error", message: error.message });
    }
    logger.error(error);

    return res.status(500).json({ status: "error", message: "Internal Server Error" });
}
