import { require } from "reliq";
import { hash } from "bcrypt";
import { compare } from "bcrypt";

const _SALT: number = 64;
const _MIN_SALT: number = 0;
const _MAX_SALT: number = 256;

export type AuthenticatorError =
    | "AUTHENTICATOR.ERR_ASSIGNED_SALT_CANNOT_BE_BELOW_THE_CONSTANT_MINIMUM"
    | "AUTHENTICATOR.ERR_ASSIGNED_SALT_CANNOT_BE_ABOVE_THE_CONSTANT_MAXIMUM"
    | "AUTHENTICATOR.ERR_UNASSIGNED_HASH"
    | "AUTHENTICATOR.ERR_INVALID_HASH"
    | "AUTHENTICATOR.ERR_INVALID_PASSWORD";

export type Authenticator = {
    get(): string;
    set(hash: string): void;
    setByEncryption(password: string): Promise<void>;
    decrypt(password: string): Promise<boolean>;
};

export function Authenticator(_salt: number = _SALT): Authenticator {
    let _hash: string;

    /** @constructor */ {
        require<AuthenticatorError>(_salt >= _MIN_SALT, "AUTHENTICATOR.ERR_ASSIGNED_SALT_CANNOT_BE_BELOW_THE_CONSTANT_MINIMUM");
        require<AuthenticatorError>(_salt <= _MAX_SALT, "AUTHENTICATOR.ERR_ASSIGNED_SALT_CANNOT_BE_ABOVE_THE_CONSTANT_MAXIMUM");
        return {
            get,
            set,
            setByEncryption,
            decrypt
        };
    }

    function get(): ReturnType<Authenticator["get"]> {
        require<AuthenticatorError>(_hash! !== undefined, "AUTHENTICATOR.ERR_UNASSIGNED_HASH");
        return _hash;
    }

    function set(... [hash]: Parameters<Authenticator["set"]>): ReturnType<Authenticator["set"]> {
        require<AuthenticatorError>(hash.trim().length !== 0, "AUTHENTICATOR.ERR_INVALID_HASH");
        _hash = hash;
        return;
    }

    async function setByEncryption(... [password]: Parameters<Authenticator["setByEncryption"]>): ReturnType<Authenticator["setByEncryption"]> {
        require<AuthenticatorError>(password.trim().length !== 0, "AUTHENTICATOR.ERR_INVALID_PASSWORD");
        _hash = await hash(password, _salt);
        return;
    }

    async function decrypt(... [password]: Parameters<Authenticator["decrypt"]>): ReturnType<Authenticator["decrypt"]> {
        return await compare(password, get());
    }
}

export function AuthenticatorFromHash(_hash: string, _salt: number = _SALT): Authenticator {
    let _authenticator: Authenticator;

    /** @constructor */ {
        _authenticator = Authenticator(_salt);
        _authenticator.set(_hash);
        return {
            get,
            set,
            setByEncryption,
            decrypt
        };
    }

    function get(): ReturnType<Authenticator["get"]> {
        return _authenticator.get();
    }

    function set(... [hash]: Parameters<Authenticator["set"]>): ReturnType<Authenticator["set"]> {
        return _authenticator.set(hash);
    }

    async function setByEncryption(... [password]: Parameters<Authenticator["setByEncryption"]>): ReturnType<Authenticator["setByEncryption"]> {
        return await _authenticator.setByEncryption(password);
    }

    async function decrypt(... [password]: Parameters<Authenticator["decrypt"]>): ReturnType<Authenticator["decrypt"]> {
        return await _authenticator.decrypt(password);
    }
}

export async function AuthenticatorFromPassword(_password: string, _salt: number = _SALT): Promise<Authenticator> {
    let _authenticator: Authenticator;

    /** @constructor */ {
        _authenticator = Authenticator(_salt);
        await _authenticator.setByEncryption(_password);
        return {
            get,
            set,
            setByEncryption,
            decrypt
        };
    }

    function get(): ReturnType<Authenticator["get"]> {
        return _authenticator.get();
    }

    function set(... [hash]: Parameters<Authenticator["set"]>): ReturnType<Authenticator["set"]> {
        return _authenticator.set(hash);
    }

    async function setByEncryption(... [password]: Parameters<Authenticator["setByEncryption"]>): ReturnType<Authenticator["setByEncryption"]> {
        return await _authenticator.setByEncryption(password);
    }

    async function decrypt(... [password]: Parameters<Authenticator["decrypt"]>): ReturnType<Authenticator["decrypt"]> {
        return await _authenticator.decrypt(password);
    }
}

export type ReadonlyAuthenticatorError = AuthenticatorError;

export type ReadonlyAuthenticator =
    & Pick<Authenticator,
        | "get"
        | "decrypt">
    & {};

export function ReadonlyAuthenticator(_hash: string, _salt: number = _SALT): ReadonlyAuthenticator {
    let _authenticator: Authenticator;

    /** @constructor */ {
        _authenticator = AuthenticatorFromHash(_hash, _salt);
        return {
            get,
            decrypt
        };
    }

    function get(): ReturnType<ReadonlyAuthenticator["get"]> {
        return _authenticator.get();
    }

    async function decrypt(... [password]: Parameters<ReadonlyAuthenticator["decrypt"]>): ReturnType<ReadonlyAuthenticator["decrypt"]> {
        return await _authenticator.decrypt(password); 
    }
}

export async function ReadonlyAuthenticatorFromPassword(_password: string, _salt: number = _SALT): Promise<ReadonlyAuthenticator> {
    let _authenticator: Authenticator;

    /** @constructor */ {
        _authenticator = await AuthenticatorFromPassword(_password, _salt);
        return {
            get,
            decrypt
        };
    }

    function get(): ReturnType<ReadonlyAuthenticator["get"]> {
        return _authenticator.get();
    }

    async function decrypt(... [password]: Parameters<ReadonlyAuthenticator["decrypt"]>): ReturnType<ReadonlyAuthenticator["decrypt"]> {
        return await _authenticator.decrypt(password); 
    }
}