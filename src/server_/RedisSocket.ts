import { RedisClientType } from "redis";
import { createClient as RedisClient } from "redis";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Unsafe } from "@common";
import { wrapR } from "reliq";

export type RedisSocketError =
    | Unsafe
    | "REDIS_SOCKET.ERR_INVALID_HOST"
    | "REDIS_SOCKET.ERR_INVALID_PORT"
    | "REDIS_SOCKET.ERR_INVALID_PASSWORD";

export type RedisSocket =
    & RedisClientType
    & {};

export function RedisSocket(_host: string, _password: string, _port: bigint): Result<RedisSocket, RedisSocketError> {
    /** @constructor */ {
        if (_host.trim().length === 0) return Err("REDIS_SOCKET.ERR_INVALID_HOST");
        if (_port < 0) return Err("REDIS_SOCKET.ERR_INVALID_PORT");
        if (_port > 90000) return Err("REDIS_SOCKET.ERR_INVALID_PORT");
        if (_password.trim().length === 0) return Err("REDIS_SOCKET.ERR_INVALID_PASSWORD");
        let socketR: Result<RedisClientType, unknown> = 
            wrapR(() => RedisClient({
                password: _password,
                socket: {
                    host: _host,
                    port: Number(_port)
                }
            }));
        if (socketR.err()) return Err(Unsafe(socketR.val()));
        let socket: RedisClientType = socketR.unwrapSafely();
        return Ok(socket);
    }
}