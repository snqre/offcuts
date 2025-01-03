import { z as ZodValidator } from "zod";

export const AdminDataSchema = ZodValidator.object({
    username: ZodValidator.string().min(1),
    hash: ZodValidator.string().min(1)
});