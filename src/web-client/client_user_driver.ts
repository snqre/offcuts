import type { AxiosResponse } from "axios";
import { default as Axios } from "axios";
import { UserDataSchema } from "@common";
import { UserData } from "@common";
import { z as ZodValidator } from "zod";
import { require } from "reliq";
import { panic } from "reliq";
import { toString } from "reliq";

export type ClientUserDriver = {
    empty(): boolean;
    cache(): UserData | null;
    signIn(): Promise<UserData>;
    signIn(username: string, password: string): Promise<UserData>;
    signUp(user: UserData): Promise<void>;
};

export function ClientUserDriver(): ClientUserDriver;
export function ClientUserDriver(_cache: UserData | null): ClientUserDriver;
export function ClientUserDriver(
    _args0?: UserData | null
): ClientUserDriver {
    let _cache: UserData | null;
    let _password: string | null;

    /** @constructor */ {
        _cache = _args0 ?? null;
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
        args0?: string,
        args1?: string
    ): Promise<UserData> {
        let username: string;
        let password: string;
        if (args0 && args1) {
            username = args0;
            password = args1;
        }
        else {
            require(!empty(), "CLIENT_USER_DRIVER.SIGN_IN_DATA_NOT_PROVIDED_AND_CACHE_IS_UNFILLED");
            username = cache()!.username;
            password = _password!;
        }
        let { user, message, e } = ZodValidator.object({
            user: UserDataSchema.optional(),
            message: ZodValidator.string().optional(),
            e: ZodValidator.unknown().optional()
        }).parse((await Axios.post("/sign-in", { username, password })).data);
        if (user) {
            _cache = user;
            _password = password;
            return user;
        }
        else if (message) panic(message);
        else panic(toString(e));
    }

    async function signUp(user: UserData): Promise<void> {
        let { message, e } = ZodValidator.object({
            message: ZodValidator.string().optional(),
            e: ZodValidator.unknown().optional()
        }).parse((await Axios.post("/sign-up", { user })).data);
        if (message) require(message === "OK", message);
        else if (e) panic(toString(e));
        _cache = user;
    }
}