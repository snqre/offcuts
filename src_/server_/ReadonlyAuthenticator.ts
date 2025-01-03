import { AUTHENTICATOR_DEFAULT_SALT } from "src_/server_/Module";
import { AuthenticatorError } from "src_/server_/Module";
import { Authenticator } from "src_/server_/Module";
import { Result } from "reliq";
import { Ok } from "reliq";

export type ReadonlyAuthenticatorError = AuthenticatorError;

export type ReadonlyAuthenticator =
    & Pick<Authenticator,
        | "salt"
        | "get"
        | "decrypt">
    & {};

export function ReadonlyAuthenticator(_hash: string, _salt: number = AUTHENTICATOR_DEFAULT_SALT): Result<ReadonlyAuthenticator, ReadonlyAuthenticatorError> {
    let _authenticator: Authenticator;
    
    /** @constructor */ {
        let authenticatorR: Result<Authenticator, AuthenticatorError> = Authenticator(_salt);
        if (authenticatorR.err()) return authenticatorR;
        _authenticator = authenticatorR.unwrapSafely();
        let authenticatorSetR: Result<void, AuthenticatorError> = _authenticator.set(_hash);
        if (authenticatorSetR.err()) return authenticatorR;
        return Ok({
            salt,
            get,
            decrypt
        });
    }

    function salt(): ReturnType<ReadonlyAuthenticator["salt"]> {
        return _authenticator.salt();
    }

    function get(): ReturnType<ReadonlyAuthenticator["get"]> {
        return _authenticator.get();
    }

    function decrypt(... [password]: Parameters<ReadonlyAuthenticator["decrypt"]>): ReturnType<ReadonlyAuthenticator["decrypt"]> {
        return _authenticator.decrypt(password);
    }
}

export async function ReadonlyAuthenticatorFromPassword(_password: string, _salt: number = AUTHENTICATOR_DEFAULT_SALT): Promise<Result<ReadonlyAuthenticator, ReadonlyAuthenticatorError>> {
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
            decrypt
        });
    }

    function salt(): ReturnType<ReadonlyAuthenticator["salt"]> {
        return _authenticator.salt();
    }

    function get(): ReturnType<ReadonlyAuthenticator["get"]> {
        return _authenticator.get();
    }

    function decrypt(... [password]: Parameters<ReadonlyAuthenticator["decrypt"]>): ReturnType<ReadonlyAuthenticator["decrypt"]> {
        return _authenticator.decrypt(password);
    }
}