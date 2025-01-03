import type { RedisClientType } from "redis";
import { createClient as Socket } from "redis";
import { require } from "reliq";

export type RedisSocketAdaptor =
    & RedisClientType
    & {};

export function RedisSocketAdaptor(_host: string, _password: string, _port: bigint): RedisSocketAdaptor {
    /** @constructor */ {
        require(_host.trim().length !== 0, "REDIS_SOCKET_ADAPTOR.ERR_INVALID_HOST");
        require(_port >= 0n, "REDIS_SOCKET_ADAPTOR.ERR_INVALID_PORT");
        require(_port <= 90000, "REDIS_SOCKET_ADAPTOR.ERR_INVALID_PORT");
        require(_password.trim().length !== 0, "REDIS_SOCKET_ADAPTOR.ERR_INVALID_PASSWORD");
        let n: bigint = _port;
        return Socket({
            password: _password,
            socket: {
                host: _host,
                port: Number(n)
            }
        });
    }
}