import { AppError } from "@/common/domain/errors/AppError";
import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().default(8080),
    API_URL: z.string().default("http://localhost:8080"),
    DB_TYPE: z.literal("postgres").default("postgres"),
    DB_HOST: z.string().default("locahost"),
    DB_PORT: z.coerce.number().default(5432),
    DB_SCHEMA: z.string().default("postgres"),
    DB_NAME: z.string().default("postgres"),
    DB_USER: z.string().default("postgres"),
    DB_PASS: z.string().default("postgres"),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    throw new AppError("Invalid environment variables");
}

export const env = _env.data;
