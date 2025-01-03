import { AdminDataSchema } from "@common";
import { require } from "reliq";

export type AdminData = typeof AdminDataSchema._type;

export function AdminData(_instance: AdminData): AdminData {
    /** @constructor */ {
        require(_instance.username.trim().length !== 0, "ADMIN_DATA.ERR_INVALID_USERNAME");
        require(_instance.hash.trim().length !== 0, "ADMIN_DATA.ERR_INVALID_HASH");
        return _instance;
    }
}

export function isAdminData(unknown: unknown): unknown is AdminData {
    return AdminDataSchema.safeParse(unknown).success;
}