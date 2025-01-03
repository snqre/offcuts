import { AppData } from "@common";

export type Database = {
    get(): Promise<AppData>;
    set(data: AppData): Promise<void>;
};