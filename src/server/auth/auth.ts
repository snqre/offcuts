import { hash } from "bcrypt";
import { compare } from "bcrypt";
import { require } from "reliq";

const _SALT: number = 64;
const _MIN_SALT: number = 0;
const _MAX_SALT: number = 256;


// #region Auth

export type Auth = {
    get(): string;
    set(hash: string): void;
    setByEncryption(password: string): Promise<void>;
    decrypt(password: string): Promise<boolean>;
};

export function Auth(_salt: number = _SALT): Auth {
    let _hash: string;
    
    /** @constructor */ {
        require(_salt >= _MIN_SALT, "AUTH.ERR_ASSIGNED_SALT_CANNOT_BE_BELOW_THE_CONSTANT_MINIMUM");
        require(_salt <= _MAX_SALT, "AUTH.ERR_ASSIGNED_SALT_CANNOT_BE_ABOVE_THE_CONSTANT_MAXIMUM");
        return { get, set, setByEncryption, decrypt };
    }

    function get(... []: Parameters<Auth["get"]>): ReturnType<Auth["get"]> {
        require(_hash! !== undefined, "AUTH.ERR_UNASSIGNED_HASH");
        return _hash;
    }

    function set(... [hash]: Parameters<Auth["set"]>): ReturnType<Auth["set"]> {
        require(hash.trim().length !== 0, "AUTH.ERR_INVALID_HASH");
        _hash = hash;
        return;
    }

    async function setByEncryption(... [password]: Parameters<Auth["setByEncryption"]>): ReturnType<Auth["setByEncryption"]> {
        require(password.trim().length !== 0, "AUTH.ERR_INVALID_PASSWORD");
        _hash = await hash(password, _salt);
        return;
    }

    async function decrypt(... [password]: Parameters<Auth["decrypt"]>): ReturnType<Auth["decrypt"]> {
        return await compare(password, _hash);
    }
}

export function AuthFromHash(_hash: string, _salt: number = _SALT): Auth {
    let _auth: Auth;

    /** @constructor */ {
        _auth = Auth(_salt);
        _auth.set(_hash);
        return { ... _auth };
    }
}

export async function AuthFromPassword(_password: string, _salt: number = _SALT): Promise<Auth> {
    let _auth: Auth;

    /** @constructor */ {
        _auth = Auth(_salt);
        await _auth.setByEncryption(_password);
        return { ... _auth };
    }
}


// #region Readonly Auth

export type ReadonlyAuth = 
    & Pick<Auth,
        | "get"
        | "decrypt">
    & {};

export function ReadonlyAuth(_hash: string, _salt: number = _SALT): ReadonlyAuth {
    let _auth: Auth;

    /** @constructor */ {
        _auth = AuthFromHash(_hash, _salt);
        let { get, decrypt } = _auth;
        return { get, decrypt };
    }
}

export async function ReadonlyAuthFromPassword(_password: string, _salt: number = _SALT): Promise<ReadonlyAuth> {
    let _auth: Auth;

    /** @constructor */ {
        _auth = await AuthFromPassword(_password, _salt);
        let { get, decrypt } = _auth;
        return { get, decrypt };
    }
}