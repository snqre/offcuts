import { z as ZodValidator } from "zod";
import { UserDataSchema } from "src/common/_";
import { ProductDataSchema } from "src/common/_";

export const AppDataSchema = ZodValidator.object({
    users: ZodValidator.array(UserDataSchema),
    products: ZodValidator.array(ProductDataSchema)
});