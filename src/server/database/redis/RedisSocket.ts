import type { RedisClientType } from "redis";
import { createClient as Client } from "redis";
import { require } from "reliq";

export type RedisSocketError =
    | "REDIS_SOCKET.ERR_INVALID_HOST"
    | "REDIS_SOCKET.ERR_INVALID_PORT"
    | "REDIS_SOCKET.ERR_INVALID_PASSWORD";

export type RedisSocket =
    & RedisClientType
    & {};

export function RedisSocket(_host: string, _password: string, _port: bigint): RedisSocket {
    /** @constructor */ {
        require<RedisSocketError>(_host.trim().length !== 0, "REDIS_SOCKET.ERR_INVALID_HOST");
        require<RedisSocketError>(_port >= 0, "REDIS_SOCKET.ERR_INVALID_PORT");
        require<RedisSocketError>(_port <= 90000, "REDIS_SOCKET.ERR_INVALID_PORT");
        require<RedisSocketError>(_password.trim().length !== 0, "REDIS_SOCKET.ERR_INVALID_PASSWORD");
        return Client({
            password: _password,
            socket: {
                host: _host,
                port: Number(_port)
            }
        });
    }
}