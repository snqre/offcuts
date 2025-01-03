import type { Maybe } from "reliq";
import type { DatabaseError } from "@server";
import type { Database } from "@server";
import { RedisSocket } from "@server";
import { AppDataSchema } from "@common";
import { AppData } from "@common";
import { require } from "reliq";
import { some } from "reliq";

export type RedisError = DatabaseError | "REDIS.ERR_INVALID_KEY";

export type Redis =
    & Database
    & {
    disconnect(): Promise<void>;
};

export async function Redis(_socket: RedisSocket, _key: string): Promise<Redis> {
    /** @constructor */ {
        require<RedisError>(_key.trim().length !== 0, "REDIS.ERR_INVALID_KEY");
        return {
            get,
            set,
            disconnect
        };
    }

    async function get(): ReturnType<Redis["get"]> {
        let response: Maybe<string> = await _socket.get(_key)!;
        require<RedisError>(some(response), "DATABASE.ERR_INVALID_RESPONSE");
        let data: unknown = JSON.parse(response);
        require<RedisError>(AppDataSchema.safeParse(data).success, "DATABASE.ERR_INVALID_RESPONSE");
        return data as AppData;
    }

    async function set(... [data]: Parameters<Redis["set"]>): ReturnType<Redis["set"]> {
        let response: string = JSON.stringify(data);
        await _socket.set(_key, response);
        return;
    }

    async function disconnect(): ReturnType<Redis["disconnect"]> {
        await _socket.quit();
        return;
    }
}