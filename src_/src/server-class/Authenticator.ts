import { default as Hash } from "bcrypt";
import { UserData } from "src_/src/common/_";
import { Result } from "reliq";
import { Err } from "reliq";

export type AuthenticatorT = Authenticator;
export type AuthenticatorE = [unknown];
export type Authenticator = {
    checkPermission(user: UserData, password: string): Result<boolean, AuthenticatorE>;
    checkPassword(hash: string, password: string): Result<boolean, AuthenticatorE>;
    hash(password: string): Result<string, AuthenticatorE>;
};
export function Authenticator(): Authenticator {
    /** @constructor */ {
        return {
            checkPermission,
            checkPassword,
            hash
        };
    }

    function checkPermission(... [user, password]: Parameters<Authenticator["checkPermission"]>): ReturnType<Authenticator["checkPermission"]> {
        return checkPassword(user.hash, password);
    }

    function checkPassword(... [hash, password]: Parameters<Authenticator["checkPassword"]>): ReturnType<Authenticator["checkPassword"]> {
        let compareSyncR = Result.wrap(() => Hash.compareSync(password, hash));
        if (compareSyncR.err()) return Err([compareSyncR.val()]);
        return compareSyncR;
    }

    function hash(... [password]: Parameters<Authenticator["hash"]>): ReturnType<Authenticator["hash"]> {
        let hashSyncR = Result.wrap(() => Hash.hashSync(password, 32));
        if (hashSyncR.err()) return Err([hashSyncR.val()]);
        return hashSyncR;
    }
}