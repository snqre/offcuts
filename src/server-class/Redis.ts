import type { Database } from "src/server-class/_";
import { RedisSocket } from "src/server-class/_";
import { AppDataSchema } from "src/common/_";
import { AppData } from "src/common/_";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Some } from "reliq";
import { None } from "reliq";

export type RedisR = Result<RedisT, RedisE>;
export type RedisT = Redis;
export type RedisE =
    | "REDIS.ERR_INVALID_KEY"
    | [unknown];
export type Redis =
    & Database
    & {
    disconnect(): Promise<Result<void, RedisE>>;
};
export async function Redis(_socket: RedisSocket, _key: string): Promise<RedisR> {
    /** @constructor */ {
        let instance = {
            get,
            set,
            disconnect
        };
        if (_key.trim().length === 0) return Err("REDIS.ERR_INVALID_KEY");
        let connectR = await Result.wrapAsync(async () => await _socket.connect());
        if (connectR.err()) return Err([connectR.val()]);
        return Ok(instance);
    }

    async function get(... []: Parameters<Redis["get"]>): ReturnType<Redis["get"]> {
        let responseR = await Result.wrapAsync(async () => await _socket.get(_key));
        if (responseR.err()) return Err([responseR.val()]);
        let response = responseR.unwrapSafely();
        if (response === null) return Ok(None);
        if (response === undefined) return Ok(None);
        let dataR = Result.wrap(() => JSON.parse(response));
        if (dataR.err()) return Err([dataR.val()]);
        let data = dataR.unwrapSafely();
        let match = AppDataSchema.safeParse(data).success;
        if (match === false) return Err("DATABASE.ERR_INVALID_RESPONSE");
        return Ok(Some((data as AppData)));
    }
    
    async function set(... [data]: Parameters<Redis["set"]>): ReturnType<Redis["set"]> {
        let responseR = Result.wrap(() => JSON.stringify(data));
        if (responseR.err()) return Err([responseR.val()]);
        let response = responseR.unwrapSafely();
        let setR = await Result.wrapAsync(async () => await _socket.set(_key, response));
        if (setR.err()) return Err([setR.val()]);
        return Ok(undefined);
    }

    async function disconnect(): ReturnType<Redis["disconnect"]> {
        let quitR = await Result.wrapAsync(async () => await _socket.quit());
        if (quitR.err()) return Err([quitR.val()]);
        return Ok(undefined);
    }
}