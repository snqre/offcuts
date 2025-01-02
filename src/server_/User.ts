import { Ok } from "reliq";
import { Err } from "reliq";
import { Result } from "reliq";
import { Option } from "reliq";
import { Some } from "reliq";
import { None } from "reliq";
import { UserData } from "@common";
import { ReadonlyAuthenticator } from "src/server_/Module";
import { ReadonlyAuthenticatorError } from "src/server_/Module";

export type UserError = ReadonlyAuthenticatorError | "USER.ERR_INVALID_PASSWORD";

export type User = {
    username(): string;
    hash(): string;
    email(): Option<string>;
    phoneNumber(): Option<string>;
    address(): Option<string>;
    signIn(password: string): Promise<Result<UserData, UserError>>;
};

export function User(_data: Readonly<UserData>): Result<User, UserError> {
    let _authenticator: ReadonlyAuthenticator;
    let _username: string;
    let _hash: string;
    let _email: Option<string>;
    let _phoneNumber: Option<string>;
    let _address: Option<string>;

    /** @constructor */ {
        _username = _data.username;
        _hash = _data.hash;
        _email = _data.email ? Some(_data.email) : None;
        _phoneNumber = _data.phoneNumber ? Some(_data.phoneNumber) : None;
        _address = _data.address ? Some(_data.address) : None;
        let authenticatorR: Result<ReadonlyAuthenticator, UserError> = ReadonlyAuthenticator(_hash);
        if (authenticatorR.err()) return authenticatorR;
        _authenticator = authenticatorR.unwrapSafely();
        return Ok({
            username,
            hash,
            email,
            phoneNumber,
            address,
            signIn
        });
    }

    function username(): string {
        return _username
    }

    function hash(): string {
        return _hash;
    }

    function email(): ReturnType<User["email"]> {
        return _email;
    }

    function phoneNumber(): ReturnType<User["phoneNumber"]> {
        return _phoneNumber;
    }

    function address(): ReturnType<User["address"]> {
        return _address;
    }

    async function signIn(... [password]: Parameters<User["signIn"]>): ReturnType<User["signIn"]> {
        let matchR: Result<boolean, UserError> = await _authenticator.decrypt(password);
        if (matchR.err()) return matchR;
        let match: boolean = matchR.unwrapSafely();
        if (match === false) return Err("USER.ERR_INVALID_PASSWORD");
        return Ok({
            username: username(),
            hash: hash(),
            email: email().none() ? undefined : email().unwrap(),
            phoneNumber: phoneNumber().none() ? undefined : phoneNumber().unwrap(),
            address: address().none() ? undefined : address().unwrap()
        });
    }
}