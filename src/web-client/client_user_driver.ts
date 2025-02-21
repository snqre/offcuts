import { default as Axios } from "axios";
import { z as ZodValidator } from "zod";
import {
    UserDataSchema,
    UserData
} from "@common";
import {
    require,
    panic,
    toString
} from "reliq";

export type ClientUserDriver = {
    empty(): boolean;
    cache(): UserData | null;
    signIn(): Promise<UserData>;
    signIn(username: string, password: string): Promise<UserData>;
    signUp(username: string, password: string): Promise<void>;
};

export function ClientUserDriver(): ClientUserDriver;
export function ClientUserDriver(_cache: UserData | null): ClientUserDriver;
export function ClientUserDriver(_p0?: UserData | null): ClientUserDriver {
    let _cache: UserData | null;
    let _password: string | null;

    /** @constructor */ {
        _cache = _p0 ?? null;
        _password = null;
        return { empty, cache, signIn, signUp };
    }

    function empty(): boolean {
        return _cache === null && _password === null;
    }

    function cache(): UserData | null {
        return _cache;
    }

    async function signIn(): Promise<UserData>;
    async function signIn(username: string, password: string): Promise<UserData>;
    async function signIn(
        p0?: string,
        p1?: string
    ): Promise<UserData> {
        let username: string;
        let password: string;
        if (p0 && p1) {
            username = p0;
            password = p1;
            let { e, message, user } = ZodValidator.object({
                user: UserDataSchema.optional(),
                message: ZodValidator.string().optional(),
                e: ZodValidator.unknown().optional()
            }).parse((await Axios.post("/sign_in", { username, password })).data);
            if (user) {
                _cache = user;
                _password = password;
                return user;
            }
            if (message) panic(message);
            if (e) panic(toString(e));
            panic("CLIENT_USER_DRIVER.ERR_INVALID_RESPONSE");
        }
        require(!empty(), "CLIENT_USER_DRIVER.SIGN_IN_DATA_NOT_PROVIDED_AND_CACHE_IS_UNAVAILABLE");
        username = cache()!.username;
        password = _password!;
        let { e, message, user } = ZodValidator.object({
            user: UserDataSchema.optional(),
            message: ZodValidator.string().optional(),
            e: ZodValidator.unknown().optional()
        }).parse((await Axios.post("/sign_in", { username, password })).data);
        if (user) {
            _cache = user;
            _password = password;
            return user;
        }
        if (message) panic(message);
        if (e) panic(toString(e));
        panic("CLIENT_USER_DRIVER.ERR_INVALID_RESPONSE");
    }

    async function signUp(username: string, password: string): Promise<void> {
        let { e, message } = ZodValidator.object({
            message: ZodValidator.string().optional(),
            e: ZodValidator.unknown().optional()
        }).parse((await Axios.post("/sign_up", { username, password })).data);
        if (e) panic(toString(e));
        if (message) {
            if (message !== "OK") panic(message);
            return;
        }
        _cache = (await signIn(username, password));
        return;
    }
}