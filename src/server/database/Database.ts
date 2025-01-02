import { AppData } from "@common";

export type DatabaseError = "DATABASE.ERR_INVALID_RESPONSE";

export type Database = {
    get(): Promise<AppData>;
    set(data: AppData): Promise<void>;
};