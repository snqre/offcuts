import { z as ZodValidator } from "zod";

export const ProductDataSchema = ZodValidator.object({
    name: ZodValidator.string().min(1).refine(x => x.trim().length > 0),
    price: ZodValidator.number().min(0).finite(),
    stock: ZodValidator.number().min(0).finite().int(),
    tags: ZodValidator.array(ZodValidator.string().min(1))
});