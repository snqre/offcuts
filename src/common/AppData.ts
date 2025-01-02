import { z as ZodValidator } from "zod";
import { UserDataSchema } from "@common";
import { ProductDataSchema } from "@common";
import { require } from "reliq";

export const AppDataSchema = ZodValidator.object({
    users: ZodValidator.array(UserDataSchema),
    products: ZodValidator.array(ProductDataSchema)
});

export type AppDataError = "APP_DATA.ERR_SCHEMA_VALIDATION_FAILED";

export type AppData = typeof AppDataSchema._type;

export function AppData(_instance: AppData): AppData {
    /** @constructor */ {
        require<AppDataError>(isAppData(_instance), "APP_DATA.ERR_SCHEMA_VALIDATION_FAILED");
        return _instance;
    }
}

export function isAppData(unknown: unknown): unknown is AppData {
    return AppDataSchema.safeParse(unknown).success;
}