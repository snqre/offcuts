import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Some } from "reliq";
import { Unsafe } from "@common";
import { Database } from "src/server_/Module";
import { DatabaseError } from "src/server_/Module";
import { RedisSocket } from "src/server_/Module";
import { AppData } from "@common";
import { AppDataSchema } from "@common";
import { wrapAsyncR } from "reliq";
import { wrapR } from "reliq";

export type RedisError = Unsafe | DatabaseError | "REDIS.ERR_INVALID_KEY";

export type Redis =
    & Database
    & {
    disconnect(): Promise<Result<void, RedisError>>;
};

export async function Redis(_socket: RedisSocket, _key: string): Promise<Result<Redis, RedisError>> {
    /** @constructor */ {
        if (_key.trim().length === 0) return Err("REDIS.ERR_INVALID_KEY");
        let connectR: Result<RedisSocket, Unsafe> = (await wrapAsyncR(async () => await _socket.connect())).mapErr(e => Unsafe(e));
        if (connectR.err()) return connectR;
        return Ok({
            get,
            set,
            disconnect
        });
    }

    async function get(): ReturnType<Redis["get"]> {
        let responseR: Result<string | null, Unsafe> = (await wrapAsyncR(async () => await _socket.get(_key))).mapErr(e => Unsafe(e));
        if (responseR.err()) return responseR;
        let response: string | null = responseR.unwrapSafely();
        if (response === null) return Err("DATABASE.ERR_INVALID_RESPONSE");
        if (response === undefined) return Err("DATABASE.ERR_INVALID_RESPONSE");
        let dataR: Result<unknown, Unsafe> = wrapR(() => JSON.parse(response)).mapErr(e => Unsafe(e));
        if (dataR.err()) return dataR;
        let data: unknown = dataR.unwrapSafely();
        let match: boolean = AppDataSchema.safeParse(data).success;
        if (match === false) return Err("DATABASE.ERR_INVALID_RESPONSE");
        return Ok(Some((data as AppData)));
    }

    async function set(... [data]: Parameters<Redis["set"]>): ReturnType<Redis["set"]> {
        let responseR: Result<string, Unsafe> = wrapR(() => JSON.stringify(data)).mapErr(e => Unsafe(e));
        if (responseR.err()) return responseR;
        let response: string = responseR.unwrapSafely();
        let setR: Result<string | null, Unsafe> = (await wrapAsyncR(async () => await _socket.set(_key, response))).mapErr(e => Unsafe(e));
        if (setR.err()) return setR;
        return Ok(undefined);
    }

    async function disconnect(): ReturnType<Redis["disconnect"]> {
        let quitR: Result<string, Unsafe> = (await wrapAsyncR(async () => await _socket.quit())).mapErr(e => Unsafe(e));
        if (quitR.err()) return quitR;
        return Ok(undefined);
    }
}