import { default as Validator } from "validator";
import { z as ZodValidator } from "zod";
import { OrderDataSchema } from "@common";
import { require } from "reliq";

export const UserDataSchema = ZodValidator.object({
    username: ZodValidator.string().min(1),
    hash: ZodValidator.string().min(1),
    orders: ZodValidator.array(OrderDataSchema),
    email: ZodValidator.string().optional().refine(x => x ? Validator.isEmail(x) : true),
    phoneNumber: ZodValidator.string().optional().refine(x => x ? Validator.isMobilePhone(x) : true),
    address: ZodValidator.string().optional().refine(x => x ? x.trim().length > 0 : true)
});

export type UserDataError =
    | "USER_DATA.ERR_INVALID_USERNAME"
    | "USER_DATA.ERR_INVALID_HASH"
    | "USER_DATA.ERR_INVALID_EMAIL"
    | "USER_DATA.ERR_INVALID_PHONE_NUMBER"
    | "USER_DATA.ERR_INVALID_ADDRESS"
    | "USER_DATA.ERR_SCHEMA_VALIDATION_FAILED";

export type UserData = typeof UserDataSchema._type;

export function UserData(_instance: UserData): UserData {
    /** @constructor */ {
        require<UserDataError>(_instance.username.trim().length !== 0, "USER_DATA.ERR_INVALID_USERNAME");
        require<UserDataError>(_instance.hash.trim().length !== 0, "USER_DATA.ERR_INVALID_HASH");
        require<UserDataError>(_instance.email ? Validator.isEmail(_instance.email) : true, "USER_DATA.ERR_INVALID_EMAIL");
        require<UserDataError>(_instance.phoneNumber ? Validator.isMobilePhone(_instance.phoneNumber) : true, "USER_DATA.ERR_INVALID_PHONE_NUMBER");
        require<UserDataError>(_instance.address ? _instance.address.trim().length !== 0 : true, "USER_DATA.ERR_INVALID_ADDRESS");
        require<UserDataError>(isUserData(_instance), "USER_DATA.ERR_SCHEMA_VALIDATION_FAILED");
        return _instance;
    }
}

export function isUserData(unknown: unknown): unknown is UserData {
    return UserDataSchema.safeParse(unknown).success;
}