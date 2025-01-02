import { z as ZodValidator } from "zod";
import { require } from "reliq";

export const AdminDataSchema = ZodValidator.object({
    username: ZodValidator.string().min(1),
    hash: ZodValidator.string().min(1)
});

export type AdminDataError =
    | "ADMIN_DATA.ERR_INVALID_USERNAME"
    | "ADMIN_DATA.ERR_INVALID_HASH";

export type AdminData = typeof AdminDataSchema._type;

export function AdminData(_instance: AdminData): AdminData {
    /** @constructor */ {
        require<AdminDataError>(_instance.username.trim().length !== 0, "ADMIN_DATA.ERR_INVALID_USERNAME");
        require<AdminDataError>(_instance.hash.trim().length !== 0, "ADMIN_DATA.ERR_INVALID_HASH");
        return _instance;
    }
}

export function isAdminData(unknown: unknown): unknown is AdminData {
    return AdminDataSchema.safeParse(unknown).success;
}