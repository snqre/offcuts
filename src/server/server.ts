import { default as Express } from "express";
import { Server as HttpServer } from "http";
import { RedisSocketAdaptor } from "@server";
import { Redis } from "@server";
import { Store } from "@server";
import { AdminRouter } from "@server";
import { ReactRouter } from "@server";
import { StoreRouter } from "@server";
import { require } from "reliq";
import { join } from "path";

export type Server = {
    run(): Promise<void>;
};

export function Server(): Server {
    /** @constructor */ {
        return { run };
    }

    async function run(... []: Parameters<Server["run"]>): ReturnType<Server["run"]> {
        let redisPassword: string | undefined = process.env?.["REDIS_INT_KEY"];
        require(redisPassword !== undefined, "SERVER.ERR_REDIS_INT_KEY_REQUIRED");
        let redisSocketAdaptor: RedisSocketAdaptor = RedisSocketAdaptor("redis-15540.c85.us-east-1-2.ec2.redns.redis-cloud.com", redisPassword, 15540n);
        let redis: Redis = await Redis(redisSocketAdaptor, "*");
        let store: Store = Store(redis);
        let port: number = 8080;
        let socket: HttpServer = Express()
            .use(Express.static(join(__dirname, "web")))
            .use(Express.json())
            .use(ReactRouter("/", join(__dirname, "web/app.html")))
            .use(StoreRouter(store))
            .use(AdminRouter(store))
            .listen(port);
        console.log("SERVER.RUNNING", __dirname, port);
        return;
    }
}

/** @script */
Server().run();