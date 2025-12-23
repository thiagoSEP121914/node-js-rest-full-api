import { AppError } from "@/common/domain/errors/AppError";
import "dotenv/config";
import { object, z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(8080),
  API_URL: z.string().default("http://localhost:8080"),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  throw new AppError("Invalid environment variables");
}

export const env = _env.data;
