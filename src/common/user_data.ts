import { default as Validator } from "validator";
import { UserDataSchema } from "@common";
import { require } from "reliq";

export type UserData = typeof UserDataSchema._type;

export function UserData(_instance: UserData): UserData {
    /** @constructor */ {
        require(_instance.username.trim().length !== 0, "USER_DATA.ERR_INVALID_USERNAME");
        require(_instance.hash.trim().length !== 0, "USER_DATA.ERR_INVALID_HASH");
        require(_instance.email ? Validator.isEmail(_instance.email) : true, "USER_DATA.ERR_INVALID_EMAIL");
        require(_instance.phoneNumber ? Validator.isMobilePhone(_instance.phoneNumber) : true, "USER_DATA.ERR_INVALID_PHONE_NUMBER");
        require(_instance.address ? _instance.address.trim().length !== 0 : true, "USER_DATA.ERR_INVALID_ADDRESS");
        require(isUserData(_instance), "USER_DATA.ERR_SCHEMA_VALIDATION_FAILED");
        return _instance;
    }
}

export function isUserData(unknown: unknown): unknown is UserData {
    return UserDataSchema.safeParse(unknown).success;
}