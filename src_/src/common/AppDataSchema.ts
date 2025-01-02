import { z as ZodValidator } from "zod";
import { UserDataSchema } from "src_/src/common/_";
import { ProductDataSchema } from "src_/src/common/_";

export const AppDataSchema = ZodValidator.object({
    users: ZodValidator.array(UserDataSchema),
    products: ZodValidator.array(ProductDataSchema)
});