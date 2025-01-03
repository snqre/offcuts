"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/server/server.ts
var server_exports = {};
__export(server_exports, {
  Server: () => Server
});
module.exports = __toCommonJS(server_exports);
var import_express4 = __toESM(require("express"), 1);

// src/server/auth/auth.ts
var import_bcrypt = require("bcrypt");
var import_bcrypt2 = require("bcrypt");
var import_reliq = require("reliq");

// src/common/admin_data_schema.ts
var import_zod = require("zod");
var AdminDataSchema = import_zod.z.object({
  username: import_zod.z.string().min(1),
  hash: import_zod.z.string().min(1)
});

// src/common/admin_data.ts
var import_reliq2 = require("reliq");

// src/common/app_data_schema.ts
var import_zod2 = require("zod");
var AppDataSchema = import_zod2.z.object({
  admins: import_zod2.z.array(AdminDataSchema),
  users: import_zod2.z.array(UserDataSchema),
  products: import_zod2.z.array(ProductDataSchema)
});

// src/common/app_data.ts
var import_reliq3 = require("reliq");
function isAppData(unknown) {
  return AppDataSchema.safeParse(unknown).success;
}

// src/common/loop.ts
var import_reliq4 = require("reliq");
var _MAX_ITER = 2000000n;
var Loop = (() => {
  {
    return { checkMaxIter };
  }
  function checkMaxIter(...[length]) {
    (0, import_reliq4.require)(length <= _MAX_ITER, "LOOP.ERR_LENGTH_ABOVE_MAX_ITER");
    (0, import_reliq4.require)(length >= 0, "LOOP.ERR_LENGTH_BELOW_ZERO");
    return;
  }
})();

// src/common/order_data_schema.ts
var import_zod3 = require("zod");
var OrderDataSchema = import_zod3.z.object({
  product: ProductDataSchema,
  amount: import_zod3.z.number().min(1).int()
});

// src/common/order_data.ts
var import_reliq5 = require("reliq");

// src/common/product_data_schema.ts
var import_zod4 = require("zod");
var ProductDataSchema = import_zod4.z.object({
  name: import_zod4.z.string().min(1).refine((x) => x.trim().length > 0),
  price: import_zod4.z.number().min(0).finite(),
  stock: import_zod4.z.number().min(0).finite().int(),
  tags: import_zod4.z.array(import_zod4.z.string().min(1))
});

// src/common/product_data.ts
var import_reliq6 = require("reliq");

// src/common/user_data_schema.ts
var import_validator = __toESM(require("validator"), 1);
var import_zod5 = require("zod");
var UserDataSchema = import_zod5.z.object({
  username: import_zod5.z.string().min(1),
  hash: import_zod5.z.string().min(1),
  orders: import_zod5.z.array(OrderDataSchema),
  email: import_zod5.z.string().optional().refine((x) => x ? import_validator.default.isEmail(x) : true),
  phoneNumber: import_zod5.z.string().optional().refine((x) => x ? import_validator.default.isMobilePhone(x) : true),
  address: import_zod5.z.string().optional().refine((x) => x ? x.trim().length > 0 : true)
});

// src/common/user_data.ts
var import_validator2 = __toESM(require("validator"), 1);
var import_reliq7 = require("reliq");

// src/server/db/redis/redis_socket_adaptor.ts
var import_redis = require("redis");
var import_reliq8 = require("reliq");
function RedisSocketAdaptor(_host, _password, _port) {
  {
    (0, import_reliq8.require)(_host.trim().length !== 0, "REDIS_SOCKET_ADAPTOR.ERR_INVALID_HOST");
    (0, import_reliq8.require)(_port >= 0n, "REDIS_SOCKET_ADAPTOR.ERR_INVALID_PORT");
    (0, import_reliq8.require)(_port <= 9e4, "REDIS_SOCKET_ADAPTOR.ERR_INVALID_PORT");
    (0, import_reliq8.require)(_password.trim().length !== 0, "REDIS_SOCKET_ADAPTOR.ERR_INVALID_PASSWORD");
    let n = _port;
    return (0, import_redis.createClient)({
      password: _password,
      socket: {
        host: _host,
        port: Number(n)
      }
    });
  }
}

// src/server/db/redis/redis.ts
var import_reliq9 = require("reliq");
async function Redis(_socket, _key) {
  {
    (0, import_reliq9.require)(_key.trim().length !== 0, "REDIS.ERR_INVALID_KEY");
    return { get, set, disconnect };
  }
  async function get(...[]) {
    let response = await _socket.get(_key);
    (0, import_reliq9.require)(response !== null, "REDIS.ERR_INVALID_RESPONSE");
    (0, import_reliq9.require)(response !== void 0, "REDIS.ERR_INVALID_RESPONSE");
    let data = JSON.parse(response);
    (0, import_reliq9.require)(isAppData(data), "REDIS.ERR_INVALID_RESPONSE");
    return data;
  }
  async function set(...[data]) {
    let cargo = JSON.stringify(data);
    await _socket.set(_key, cargo);
    return;
  }
  async function disconnect(...[]) {
    await _socket.quit();
    return;
  }
}

// src/server/misc/store.ts
var import_reliq10 = require("reliq");
function Store(_db) {
  {
    return { products, productsByName };
  }
  async function products(...[]) {
    return (await _db.get()).products;
  }
  async function productsByName(...[name]) {
    let app = await _db.get();
    let result = [];
    let i = 0n;
    while (i < app.products.length) {
      let product = app.products[Number(i)];
      if (product.name === name) result.push(product);
      i++;
    }
    return result;
  }
  async function setStock(...[name, amount]) {
    (0, import_reliq10.require)(name.trim().length !== 0, "STORE.ERR_INVALID_NAME");
    (0, import_reliq10.require)(amount >= 0, "STORE.ERR_AMOUNT_BELOW_ZERO");
    let app = await _db.get();
    let i = 0n;
    while (i < app.products.length) {
      let product = app.products[Number(i)];
      if (product.name === name) product.stock = Number(amount);
      i++;
    }
    return;
  }
}

// src/server/payment/stripe/stripe_checkout_session_line_item.ts
var import_stripe = require("stripe");

// src/server/payment/stripe/stripe_checkout_session.ts
var import_stripe2 = require("stripe");

// src/server/payment/stripe/stripe_socket_adaptor.ts
var import_stripe3 = __toESM(require("stripe"), 1);
var import_reliq11 = require("reliq");

// src/server/router/admin_router.ts
var import_express = require("express");
var import_reliq12 = require("reliq");
function AdminRouter(store) {
  return (0, import_express.Router)().post("/product/stock/set", async (rq, rs) => {
    try {
      let { password, name, amount } = rq.body;
      let match = password !== null && password !== void 0 && typeof password === "string" && password.trim().length !== 0 && name !== null && name !== void 0 && typeof name === "string" && name.trim().length !== 0 && amount !== null && amount !== void 0 && typeof amount === "number" && amount >= 0 && amount <= Number.MAX_SAFE_INTEGER && Number.isSafeInteger(amount);
      (0, import_reliq12.require)(match, "ADMIN_ROUTER.ERR_INVALID_INPUT");
      await store.setStock(name, amount);
      rs.send("ADMIN_ROUTER.OK");
    } catch (e) {
      rs.send(e);
    }
    return;
  }).post("/products/stock/increase", async (rq, rs) => {
    try {
      let { password, name, amount } = rq.body;
      let match = password !== null && password !== void 0 && typeof password === "string" && password.trim().length !== 0 && name !== null && name !== void 0 && typeof name === "string" && name.trim().length !== 0 && amount !== null && amount !== void 0 && typeof amount === "number" && amount >= 0 && amount <= Number.MAX_SAFE_INTEGER && Number.isSafeInteger(amount);
      (0, import_reliq12.require)(match, "ADMIN_ROUTER.ERR_INVALID_INPUT");
      await store.increaseStock(name, amount);
      rs.send("ADMIN_ROUTER.OK");
    } catch (e) {
      rs.send(e);
    }
    return;
  }).post("/product/stock/decrease", async (rq, rs) => {
    try {
      let { password, name, amount } = rq.body;
      let match = password !== null && password !== void 0 && typeof password === "string" && password.trim().length !== 0 && name !== null && name !== void 0 && typeof name === "string" && name.trim().length !== 0 && amount !== null && amount !== void 0 && typeof amount === "number" && amount >= 0 && amount <= Number.MAX_SAFE_INTEGER && Number.isSafeInteger(amount);
      (0, import_reliq12.require)(match, "ADMIN_ROUTER.ERR_INVALID_INPUT");
      await store.decreaseStock(name, amount);
      rs.send("ADMIN_ROUTER.OK");
    } catch (e) {
      rs.send(e);
    }
    return;
  }).post("/product/price/set", async (rq, rs) => {
    try {
      let { password, name, price } = rq.body;
      let match = password !== null && password !== void 0 && typeof password === "string" && password.trim().length !== 0 && name !== null && name !== void 0 && typeof name === "string" && name.trim().length !== 0 && price !== null && price !== void 0 && typeof price === "number" && price >= 0 && price <= Number.MAX_SAFE_INTEGER && Number.isSafeInteger(price);
      (0, import_reliq12.require)(match, "ADMIN_ROUTER.ERR_INVALID_INPUT");
      await store.setPrice(name, price);
      rs.send("ADMIN_ROUTER.OK");
    } catch (e) {
      rs.send(e);
    }
    return;
  });
}

// src/server/router/react_router.ts
var import_express2 = require("express");
var import_reliq13 = require("reliq");
function ReactRouter(route, htmlFilePath) {
  {
    (0, import_reliq13.require)(route.trim().length !== 0, "REACT_ROUTER.ERR_INVALID_ROUTE");
    (0, import_reliq13.require)(route.startsWith("/"), "REACT_ROUTER.ERR_INVALID_ROUTE");
    return (0, import_express2.Router)().get(route, (__, rs) => rs.sendFile(htmlFilePath));
  }
}

// src/server/router/store_router.ts
var import_express3 = require("express");
var import_reliq14 = require("reliq");
function StoreRouter(_store) {
  return (0, import_express3.Router)().get("/products", async (__, rs) => {
    try {
      rs.send(await _store.products());
      return;
    } catch (e) {
      rs.send(e);
      return;
    }
  }).get("/products-by-name", async (rq, rs) => {
    try {
      let { name } = rq.body;
      let match = name !== null && name !== void 0 && typeof name === "string" && name.trim().length !== 0;
      (0, import_reliq14.require)(match, "STORE_ROUTER.ERR_INVALID_REQUEST");
      rs.send(await _store.productsByName(name));
      return;
    } catch (e) {
      rs.send(e);
      return;
    }
  });
}

// src/server/server.ts
var import_reliq15 = require("reliq");
var import_path = require("path");
function Server() {
  {
    return { run };
  }
  async function run(...[]) {
    let redisPassword = process.env?.["REDIS_INT_KEY"];
    (0, import_reliq15.require)(redisPassword !== void 0, "SERVER.ERR_REDIS_INT_KEY_REQUIRED");
    let redisSocketAdaptor = RedisSocketAdaptor("redis-15540.c85.us-east-1-2.ec2.redns.redis-cloud.com", redisPassword, 15540n);
    let redis = await Redis(redisSocketAdaptor, "*");
    let store = Store(redis);
    let port = 8080;
    let socket = (0, import_express4.default)().use(import_express4.default.static((0, import_path.join)(__dirname, "web"))).use(import_express4.default.json()).use(ReactRouter("/", (0, import_path.join)(__dirname, "web/app.html"))).use(StoreRouter(store)).use(AdminRouter(store)).listen(port);
    console.log("SERVER.RUNNING", port);
    return;
  }
}
Server().run();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Server
});
