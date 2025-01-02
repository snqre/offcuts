import { AppDataSchema } from "src_/src/common/_";
import { UserData } from "src_/src/common/_";
import { ProductData } from "src_/src/common/_";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Result } from "reliq";

export type AppDataR = Result<AppDataT, AppDataE>;
export type AppDataT = AppData;
export type AppDataE = "APP_DATA.ERR_SCHEMA_VALIDATION_FAILED";
export type AppData = {
    users: Array<UserData>;
    products: Array<ProductData>;
};
export function AppData({ users, products }: AppData): AppDataR {
    /** @constructor */ {
        let instance = {
            users,
            products
        };
        let match = AppDataSchema.safeParse(instance).success;
        if (match === false) return Err("APP_DATA.ERR_SCHEMA_VALIDATION_FAILED");
        return Ok(instance);
    }
}