import { AppDataSchema } from "@common";
import { require } from "reliq";

export type AppData = typeof AppDataSchema._type;

export function AppData(_instance: AppData): AppData {
    /** @constructor */ {
        require(isAppData(_instance), "APP_DATA.ERR_SCHEMA_VALIDATION_FAILED");
        return _instance;
    }
}

export function isAppData(unknown: unknown): unknown is AppData {
    return AppDataSchema.safeParse(unknown).success;
}