import type { Maybe } from "reliq";
import { UserData } from "@common";
import { ReadonlyAuthenticator } from "@server";
import { require } from "reliq";

export type UserError = "USER.ERR_INCORRECT_PASSWORD";

export type User = {
    username(): string;
    hash(): string;
    email(): Maybe<string>;
    phoneNumber(): Maybe<string>;
    address(): Maybe<string>;
    signIn(password: string): Promise<UserData>;
};

export function User(_data: Readonly<UserData>): User {
    let _authenticator: ReadonlyAuthenticator;
    let _username: string;
    let _hash: string;
    let _email: Maybe<string>;
    let _phoneNumber: Maybe<string>;
    let _address: Maybe<string>;

    /** @constructor */ {
        _username = _data.username;
        _hash = _data.hash;
        _email = _data.email;
        _phoneNumber = _data.phoneNumber;
        _address = _data.address;
        _authenticator = ReadonlyAuthenticator(_hash);
        return {
            username,
            hash,
            email,
            phoneNumber,
            address,
            signIn
        };
    }

    function username(): ReturnType<User["username"]> {
        return _username;
    }

    function hash(): ReturnType<User["hash"]> {
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
        require<UserError>(await _authenticator.decrypt(password), "USER.ERR_INCORRECT_PASSWORD");
        return UserData({
            username: username(),
            hash: hash(),
            email: email() ?? undefined,
            phoneNumber: phoneNumber() ?? undefined,
            address: address() ?? undefined
        });
    }
}