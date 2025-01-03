import { z as ZodValidator } from "zod";
import { UserDataSchema } from "@common";
import { AdminDataSchema } from "@common";
import { ProductDataSchema } from "@common";

export const AppDataSchema = ZodValidator.object({
    admins: ZodValidator.array(AdminDataSchema),
    users: ZodValidator.array(UserDataSchema),
    products: ZodValidator.array(ProductDataSchema)
});
