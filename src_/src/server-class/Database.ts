import { AppData } from "src_/src/common/_";
import { Result } from "reliq";
import { Option } from "reliq";

export type DatabaseT = Database;
export type DatabaseE = "DATABASE.ERR_INVALID_RESPONSE" | [unknown];
export type Database = {
    get(): Promise<Result<Option<AppData>, DatabaseE>>;
    set(data: AppData): Promise<Result<void, DatabaseE>>;
};