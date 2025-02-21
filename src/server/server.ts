import {
    Redis,
    RedisSocketAdaptor,
    Store,
    StoreRouter,
    CheckoutRouter,
    ReactRouter,
    UserRouter,
    Firebase,
    type Database,
} from "@server";

import { 
    default as Express 
} from "express";

import { 
    type Server as HttpServer 
} from "http";

import { 
    require 
} from "reliq";

import { 
    join 
} from "path";

async function main(): Promise<void> {
    // # Connect to redis.
    let redisPassword:
        | string
        | null
        = process.env?.["REDIS_INT_KEY"] || null;
    require(redisPassword !== null, "MAIN.ERR_REDIS_PRIVATE_KEY_REQUIRED");
    let redis: Redis | null = null;
    try {
        redis = (await Redis((await RedisSocketAdaptor("redis-13928.c338.eu-west-2-1.ec2.redns.redis-cloud.com", redisPassword, 13928n)), "*"));
    }
    catch (error) {
        redis = null;
        console.error("Unable to connect to Redis. The application will work but some features will be compromised.", error);
    }

    // # Boot without a database connection.
    if (!redis) {
        let socket: HttpServer = Express()
            .use(Express.static(join(__dirname, "web")))
            .use(Express.json())
            .use(ReactRouter("/", join(__dirname, "web/app.html")))
            .listen(3000);
        console.log("MAIN.SERVER_RUNNING_WITHOUT_CONNECTION", __dirname, 3000);
        return;
    }

    // # Boot with a database connection.
    let store: Store = Store(redis!);
    let checkoutApiKey:
        | string
        | null
        = process.env?.["STRIPE_INT_TEST_KEY"] || null;
    require(checkoutApiKey !== null, "MAIN.ERR_STRIPE_PRIVATE_KEY_REQUIRED");
    let socket: HttpServer = Express()
        .use(Express.static(join(__dirname, "web")))
        .use(Express.json())
        .use(ReactRouter("/", join(__dirname, "web/app.html")))
        .use(StoreRouter(store))
        .use(CheckoutRouter(checkoutApiKey, store))
        .use(UserRouter(redis!))
        .listen(3000);
    console.log("MAIN.SERVER_RUNNING", __dirname, 3000);
    return;
}

main();