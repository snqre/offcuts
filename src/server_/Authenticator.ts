import { Unsafe } from "@common";

import { compare } from "bcrypt";
import { hash } from "bcrypt";

export const AUTHENTICATOR_DEFAULT_SALT: number = 64;
export const AUTHENTICATOR_DEFAULT_MIN_SALT: number = 0;
export const AUTHENTICATOR_DEFAULT_MAX_SALT: number = 256;

(() => {
    assert(AUTHENTICATOR_DEFAULT_SALT > AUTHENTICATOR_DEFAULT_MIN_SALT, "AUTHENTICATOR.ERR_DEFAULT_SALT_CANNOT_BE_BELOW_MIN_SALT_CONSTANT");
    assert(AUTHENTICATOR_DEFAULT_SALT < AUTHENTICATOR_DEFAULT_MAX_SALT, "AUTHENTICATOR.ERR_DEFAULT_SALT_CANNOT_BE_ABOVE_MAX_SALT_CONSTANT");
    return;
})();

export type AuthenticatorError =
    | Unsafe
    | "AUTHENTICATOR.ERR_ASSIGNED_SALT_CANNOT_BE_BELOW_THE_CONSTANT_MINIMUM"
    | "AUTHENTICATOR.ERR_ASSIGNED_SALT_CANNOT_BE_ABOVE_THE_CONSTANT_MAXIMUM"
    | "AUTHENTICATOR.ERR_UNASSIGNED_HASH"
    | "AUTHENTICATOR.ERR_INVALID_HASH"
    | "AUTHENTICATOR.ERR_INVALID_PASSWORD";

export type Authenticator = {
    salt(): number;
    get(): Result<string, AuthenticatorError>;
    set(hash: string): Result<void, AuthenticatorError>;
    setByEncryption(password: string): Promise<Result<void, AuthenticatorError>>;
    decrypt(password: string): Promise<Result<boolean, AuthenticatorError>>;
};

export function Authenticator(_salt: number = AUTHENTICATOR_DEFAULT_SALT): Result<Authenticator, AuthenticatorError> {
    let _hash: string;

    /** @constructor */ {
        if (_salt < AUTHENTICATOR_DEFAULT_MIN_SALT) return Err("AUTHENTICATOR.ERR_ASSIGNED_SALT_CANNOT_BE_BELOW_THE_CONSTANT_MINIMUM");
        if (_salt > AUTHENTICATOR_DEFAULT_MAX_SALT) return Err("AUTHENTICATOR.ERR_ASSIGNED_SALT_CANNOT_BE_ABOVE_THE_CONSTANT_MAXIMUM");
        return Ok({
            salt,
            get,
            set,
            setByEncryption,
            decrypt
        });
    }

    function salt(): ReturnType<Authenticator["salt"]> {
        return _salt;
    }

    function get(): ReturnType<Authenticator["get"]> {
        if (_hash! === undefined) return Err("AUTHENTICATOR.ERR_UNASSIGNED_HASH");
        return Ok(_hash);
    }

    function set(... [hash]: Parameters<Authenticator["set"]>): ReturnType<Authenticator["set"]> {
        if (hash.trim().length === 0) return Err("AUTHENTICATOR.ERR_INVALID_HASH");
        _hash = hash;
        return Ok(undefined);
    }

    async function setByEncryption(... [password]: Parameters<Authenticator["setByEncryption"]>): ReturnType<Authenticator["setByEncryption"]> {
        if (password.trim().length === 0) return Err("AUTHENTICATOR.ERR_INVALID_PASSWORD");
        return (await wrapAsyncR(async () => await hash(password, _salt)))
            .mapErr(e => Unsafe(e))
            .andThen(hash => {
                _hash = hash;
                return Ok(undefined);
            });
    }

    async function decrypt(... [password]: Parameters<Authenticator["decrypt"]>): ReturnType<Authenticator["decrypt"]> {
        return (await wrapAsyncR(async () => await compare(password, _hash))).mapErr(e => Unsafe(e));
    }
}

export function AuthenticatorFromHash(_hash: string, _salt: number = AUTHENTICATOR_DEFAULT_SALT): Result<Authenticator, AuthenticatorError> {
    let _authenticator: Authenticator;

    /** @constructor */ {
        let authenticatorR: Result<Authenticator, AuthenticatorError> = Authenticator(_salt);
        if (authenticatorR.err()) return authenticatorR;
        _authenticator = authenticatorR.unwrapSafely();
        let authenticatorSetR: Result<void, AuthenticatorError> = _authenticator.set(_hash);
        if (authenticatorSetR.err()) return authenticatorSetR;
        return Ok({
            salt,
            get,
            set,
            setByEncryption,
            decrypt
        });
    }

    function salt(): ReturnType<Authenticator["salt"]> {
        return _authenticator.salt();
    }

    function get(): ReturnType<Authenticator["get"]> {
        return _authenticator.get();
    }

    function set(... [hash]: Parameters<Authenticator["set"]>): ReturnType<Authenticator["set"]> {
        return _authenticator.set(hash);
    }

    function setByEncryption(... [password]: Parameters<Authenticator["setByEncryption"]>): ReturnType<Authenticator["setByEncryption"]> {
        return _authenticator.setByEncryption(password);
    }

    function decrypt(... [password]: Parameters<Authenticator["decrypt"]>): ReturnType<Authenticator["decrypt"]> {
        return _authenticator.decrypt(password);
    }
}

export async function AuthenticatorFromPassword(_password: string, _salt: number = AUTHENTICATOR_DEFAULT_SALT): Promise<Result<Authenticator, AuthenticatorError>> {
    let _authenticator: Authenticator;

    /** @constructor */ {
        let authenticatorR: Result<Authenticator, AuthenticatorError> = Authenticator(_salt);
        if (authenticatorR.err()) return authenticatorR;
        _authenticator = authenticatorR.unwrapSafely();
        let authenticatorSetByEncryptionR: Result<void, AuthenticatorError> = await _authenticator.setByEncryption(_password);
        if (authenticatorSetByEncryptionR.err()) return authenticatorSetByEncryptionR;
        return Ok({
            salt,
            get,
            set,
            setByEncryption,
            decrypt
        });
    }

    function salt(): ReturnType<Authenticator["salt"]> {
        return _authenticator.salt();
    }

    function get(): ReturnType<Authenticator["get"]> {
        return _authenticator.get();
    }

    function set(... [hash]: Parameters<Authenticator["set"]>): ReturnType<Authenticator["set"]> {
        return _authenticator.set(hash);
    }

    function setByEncryption(... [password]: Parameters<Authenticator["setByEncryption"]>): ReturnType<Authenticator["setByEncryption"]> {
        return _authenticator.setByEncryption(password);
    }

    function decrypt(... [password]: Parameters<Authenticator["decrypt"]>): ReturnType<Authenticator["decrypt"]> {
        return _authenticator.decrypt(password);
    }
}