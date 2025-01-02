import type { RedisSocketE } from "src_/src/server-class/_";
import type { RedisE } from "src_/src/server-class/_";
import type { ReactRouterE } from "src_/src/server-router/_";
import type { CheckoutRouterE } from "src_/src/server-router/_";
import type { AdminRouterE } from "src_/src/server-router/_";
import { default as Express } from "express";
import { Redis } from "src_/src/server-class/_";
import { RedisSocket } from "src_/src/server-class/_";
import { Store } from "src_/src/server-class/_";
import { ReactRouter } from "src_/src/server-router/_";
import { CheckoutRouter } from "src_/src/server-router/_";
import { AdminRouter } from "src_/src/server-router/_";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Result } from "reliq";
import { join } from "path";

export type ServerT = Server;
export type ServerE = 
    | RedisSocketE
    | RedisE
    | ReactRouterE
    | CheckoutRouterE
    | AdminRouterE
    | "SERVER.REDIS_PASSWORD_REQUIRED";
export type Server = {
    run(): Promise<Result<void, ServerE>>;
};
export function Server(): Server {
    /** @constructor */ {
        return {
            run
        };
    }

    async function run(): ReturnType<Server["run"]> {
        let redisPassword = process.env?.["REDIS_PASSWORD"];
        if (redisPassword === undefined) return Err("SERVER.REDIS_PASSWORD_REQUIRED");
        let redisSocketR = RedisSocket("redis-15540.c85.us-east-1-2.ec2.redns.redis-cloud.com", redisPassword, 15540n);
        if (redisSocketR.err()) return redisSocketR;
        let redisSocket = redisSocketR.unwrapSafely();
        let redisR = await Redis(redisSocket, "*");
        if (redisR.err()) return redisR;
        let redis = redisR.unwrapSafely();
        let store = Store(redis);
        let reactRouterR = ReactRouter();
        if (reactRouterR.err()) return reactRouterR;
        let reactRouter = reactRouterR.unwrapSafely();
        let checkoutRouterR = CheckoutRouter(store);
        if (checkoutRouterR.err()) return checkoutRouterR;
        let checkoutRouter = checkoutRouterR.unwrapSafely();
        let adminRouterR = AdminRouter(store);
        if (adminRouterR.err()) return adminRouterR;
        let adminRouter = adminRouterR.unwrapSafely();
        let port = 8080;
        let appR = Result.wrap(() => {
            return Express()
                .use(Express.static(join(__dirname, "web")))
                .use(Express.json())
                .use(reactRouter)
                .use(checkoutRouter)
                .use(adminRouter)
                .listen(port);
        });
        if (appR.err()) return Err([appR.val()]);
        appR.unwrapSafely();
        console.log("SERVER.RUNNING", port)
        return Ok(undefined);
    }
}

let server = Server();
let runR = await server.run();
runR.mapErr(e => {
    if (Array.isArray(e)) console.error(e[0]);
    else console.error(e);
    return;
});