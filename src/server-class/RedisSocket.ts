import type { RedisClientType } from "redis";
import { createClient as RedisClient } from "redis";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";

export type RedisSocketR = Result<RedisSocketT, RedisSocketE>;
export type RedisSocketT = RedisSocket;
export type RedisSocketE =
    | "REDIS_SOCKET.ERR_INVALID_HOST"
    | "REDIS_SOCKET.ERR_INVALID_PORT"
    | "REDIS_SOCKET.ERR_INVALID_PASSWORD"
    | [unknown];
export type RedisSocket = 
    & RedisClientType
    & {};
export function RedisSocket(_host: string, _password: string, _port: bigint): RedisSocketR {
    /** @constructor */ {
        if (_host.trim().length === 0) return Err("REDIS_SOCKET.ERR_INVALID_HOST");
        if (_port < 0) return Err("REDIS_SOCKET.ERR_INVALID_PORT");
        if (_password.trim().length === 0) return Err("REDIS_SOCKET.ERR_INVALID_PASSWORD");
        let socketR = Result.wrap(() => RedisClient({
            password: _password,
            socket: {
                host: _host,
                port: Number(_port)
            }
        }));
        if (socketR.err()) return Err([socketR.val()]);
        let socket = socketR.unwrapSafely();
        return Ok((socket as RedisSocket));
    }
}