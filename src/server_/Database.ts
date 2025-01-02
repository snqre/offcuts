import { Result } from "reliq";
import { Option } from "reliq";
import { AppData } from "@common";
import { Unsafe } from "@common";

export type DatabaseError = Unsafe | "DATABASE.ERR_INVALID_RESPONSE";

export type Database = {
    get(): Promise<Result<Option<AppData>, DatabaseError>>;
    set(data: AppData): Promise<Result<void, DatabaseError>>;
};