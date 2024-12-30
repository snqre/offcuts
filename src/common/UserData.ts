import { default as Validator } from "validator";
import { UserDataSchema } from "src/common/_";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Result } from "reliq";

export type UserDataR = Result<UserDataT, UserDataE>;
export type UserDataT = UserData;
export type UserDataE =
    | "USER_DATA.ERR_INVALID_USERNAME"
    | "USER_DATA.ERR_INVALID_HASH"
    | "USER_DATA.ERR_INVALID_EMAIL"
    | "USER_DATA.ERR_INVALID_PHONE_NUMBER"
    | "USER_DATA.ERR_INVALID_ADDRESS"
    | "USER_DATA.ERR_SCHEMA_VALIDATION_FAILED";
export type UserData = {
    username: string;
    hash: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
};
export function UserData({
    username, 
    hash, 
    email, 
    phoneNumber, 
    address 
}: UserData): UserDataR {
    /** @constructor */ {
        let instance = {
            username,
            hash,
            email,
            phoneNumber,
            address
        };
        if (username.trim().length === 0) return Err("USER_DATA.ERR_INVALID_USERNAME");
        if (hash.trim().length === 0) return Err("USER_DATA.ERR_INVALID_HASH");
        if (email && Validator.isEmail(email) === false) return Err("USER_DATA.ERR_INVALID_EMAIL");
        if (phoneNumber && Validator.isMobilePhone(phoneNumber) === false) return Err("USER_DATA.ERR_INVALID_PHONE_NUMBER");
        if (address && address.trim().length === 0) return Err("USER_DATA.ERR_INVALID_ADDRESS");
        let match = UserDataSchema.safeParse(instance).success;
        if (match === false) return Err("USER_DATA.ERR_SCHEMA_VALIDATION_FAILED");
        return Ok(instance);
    }
}