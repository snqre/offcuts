import type { Database } from "@server";
import { RedisSocketAdaptor } from "@server";
import { AppData } from "@common";
import { isAppData } from "@common";
import { require } from "reliq";

export type Redis =
    & Database
    & {
    disconnect(): Promise<void>;
};

export async function Redis(_socket: RedisSocketAdaptor, _key: string): Promise<Redis> {
    /** @constructor */ {
        require(_key.trim().length !== 0, "REDIS.ERR_INVALID_KEY");
        return { get, set, disconnect };
    }

    async function get(... []: Parameters<Redis["get"]>): ReturnType<Redis["get"]> {
        let response: string | null = await _socket.get(_key);
        require(response !== null, "REDIS.ERR_INVALID_RESPONSE");
        require(response !== undefined, "REDIS.ERR_INVALID_RESPONSE");
        let data: unknown = JSON.parse(response);
        require(isAppData(data), "REDIS.ERR_INVALID_RESPONSE");
        return (data as AppData);
    }

    async function set(... [data]: Parameters<Redis["set"]>): ReturnType<Redis["set"]> {
        let cargo: string = JSON.stringify(data);
        await _socket.set(_key, cargo);
        return;
    }

    async function disconnect(... []: Parameters<Redis["disconnect"]>): ReturnType<Redis["disconnect"]> {
        await _socket.quit();
        return;
    }
}