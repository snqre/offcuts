import { z as ZodValidator } from "zod";

export const ProductDataSchema = ZodValidator.object({
    key: ZodValidator.string().min(1),
    name: ZodValidator.string().min(1).refine(x => x.trim().length > 0),
    description: ZodValidator.string().min(1).optional(),
    price: ZodValidator.number().min(0).finite(),
    stock: ZodValidator.number().min(0).finite().int(),
    tags: ZodValidator.array(ZodValidator.string().min(1)),
    imageUrl: ZodValidator.string().min(1).optional()
});