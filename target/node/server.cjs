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
var import_express3 = __toESM(require("express"), 1);

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
  tags: import_zod4.z.array(import_zod4.z.string().min(1)),
  imageUrl: import_zod4.z.string().min(1).optional()
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
async function RedisSocketAdaptor(_host, _password, _port) {
  let _instance;
  {
    (0, import_reliq8.require)(_host.trim().length !== 0, "REDIS_SOCKET_ADAPTOR.ERR_INVALID_HOST");
    (0, import_reliq8.require)(_port >= 0n, "REDIS_SOCKET_ADAPTOR.ERR_INVALID_PORT");
    (0, import_reliq8.require)(_port <= 9e4, "REDIS_SOCKET_ADAPTOR.ERR_INVALID_PORT");
    (0, import_reliq8.require)(_password.trim().length !== 0, "REDIS_SOCKET_ADAPTOR.ERR_INVALID_PASSWORD");
    let n = _port;
    _instance = (0, import_redis.createClient)({
      password: _password,
      socket: {
        host: _host,
        port: Number(n)
      }
    });
    await _instance.connect();
    return _instance;
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
    if (response === null || response === void 0) {
      response = JSON.stringify(_empty());
    }
    let data = JSON.parse(response);
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
  function _empty() {
    return {
      admins: [],
      users: [],
      products: []
    };
  }
}

// src/server/misc/store.ts
var import_reliq10 = require("reliq");
function Store(_db) {
  {
    return {
      products,
      setStock,
      increaseStock,
      decreaseStock,
      setPrice,
      increasePrice,
      decreasePrice,
      listProduct,
      delistProduct
    };
  }
  async function products(name) {
    let app = await _db.get();
    if (name) {
      let result = [];
      let i = 0n;
      while (i < app.products.length) {
        let product = app.products[Number(i)];
        if (product.name === name) result.push(product);
        i++;
      }
      return result;
    }
    return app.products;
  }
  async function setStock(name, amount) {
    (0, import_reliq10.require)(name.trim().length !== 0, "STORE.ERR_INVALID_NAME");
    (0, import_reliq10.require)(amount >= 0n, "STORE.ERR_AMOUNT_BELOW_ZERO");
    let app = await _db.get();
    let i = 0n;
    while (i < app.products.length) {
      let product = app.products[Number(i)];
      if (product.name === name) product.stock = Number(amount);
      i++;
    }
    await _db.set(app);
    return;
  }
  async function increaseStock(name, amount) {
    (0, import_reliq10.require)(name.trim().length !== 0, "STORE.ERR_INVALID_NAME");
    (0, import_reliq10.require)(amount >= 0n, "STORE.ERR_AMOUNT_BELOW_ZERO");
    let app = await _db.get();
    let i = 0n;
    while (i < app.products.length) {
      let product = app.products[Number(i)];
      if (product.name === name) product.stock += Number(amount);
      i++;
    }
    await _db.set(app);
    return;
  }
  async function decreaseStock(name, amount) {
    (0, import_reliq10.require)(name.trim().length !== 0, "STORE.ERR_INVALID_NAME");
    (0, import_reliq10.require)(amount >= 0n, "STORE.ERR_AMOUNT_BELOW_ZERO");
    let app = await _db.get();
    let i = 0n;
    while (i < app.products.length) {
      let product = app.products[Number(i)];
      if (product.name === name) {
        (0, import_reliq10.require)(product.stock - Number(amount) > 0, "STORE.ERR_INSUFFICIENT_STOCK");
        product.stock -= Number(amount);
      }
      i++;
    }
    await _db.set(app);
    return;
  }
  async function setPrice(name, amount) {
    (0, import_reliq10.require)(name.trim().length !== 0, "STORE.ERR_INVALID_NAME");
    (0, import_reliq10.require)(amount >= 0, "STORE.ERR_AMOUNT_BELOW_ZERO");
    (0, import_reliq10.require)(amount <= Number.MAX_SAFE_INTEGER, "STORE.ERR_AMOUNT_ABOVE_MAX_SAFE_INTEGER");
    let app = await _db.get();
    let i = 0n;
    while (i < app.products.length) {
      let product = app.products[Number(i)];
      if (product.name === name) product.stock = amount;
      i++;
    }
    await _db.set(app);
    return;
  }
  async function increasePrice(name, amount) {
    (0, import_reliq10.require)(name.trim().length !== 0, "STORE.ERR_INVALID_NAME");
    (0, import_reliq10.require)(amount >= 0, "STORE.ERR_AMOUNT_BELOW_ZERO");
    (0, import_reliq10.require)(amount <= Number.MAX_SAFE_INTEGER, "STORE.ERR_AMOUNT_ABOVE_MAX_SAFE_INTEGER");
    let app = await _db.get();
    let i = 0n;
    while (i < app.products.length) {
      let product = app.products[Number(i)];
      if (product.name === name) {
        (0, import_reliq10.require)(product.price + amount <= Number.MAX_SAFE_INTEGER, "STORE.ERR_PRICE_ABOVE_MAX_SAFE_INTEGER");
        product.price += amount;
      }
      i++;
    }
    await _db.set(app);
    return;
  }
  async function decreasePrice(name, amount) {
    (0, import_reliq10.require)(name.trim().length !== 0, "STORE.ERR_INVALID_NAME");
    (0, import_reliq10.require)(amount >= 0, "STORE.ERR_AMOUNT_BELOW_ZERO");
    (0, import_reliq10.require)(amount <= Number.MAX_SAFE_INTEGER, "STORE.ERR_AMOUNT_ABOVE_MAX_SAFE_INTEGER");
    let app = await _db.get();
    let i = 0n;
    while (i < app.products.length) {
      let product = app.products[Number(i)];
      if (product.name === name) {
        (0, import_reliq10.require)(product.price - amount >= 0, "STORE.ERR_PRICE_BELOW_ZERO");
        product.price -= amount;
      }
      i++;
    }
    await _db.set(app);
    return;
  }
  async function listProduct(product) {
    let app = await _db.get();
    app.products.push(product);
    await _db.set(app);
    return;
  }
  async function delistProduct(args) {
    let name;
    if (typeof args === "string") name = args;
    else name = args.name;
    let app = await _db.get();
    let i = 0n;
    while (i < app.products.length) {
      let product = app.products[Number(i)];
      if (product.name === name) app.products.splice(Number(i), 1);
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

// src/server/router/react_router.ts
var import_express = require("express");
var import_reliq12 = require("reliq");
function ReactRouter(route, htmlFilePath) {
  {
    (0, import_reliq12.require)(route.trim().length !== 0, "REACT_ROUTER.ERR_INVALID_ROUTE");
    (0, import_reliq12.require)(route.startsWith("/"), "REACT_ROUTER.ERR_INVALID_ROUTE");
    return (0, import_express.Router)().get(route, (__, rs) => rs.sendFile(htmlFilePath));
  }
}

// src/server/router/store_router.ts
var import_express2 = require("express");
var import_zod6 = require("zod");
var import_reliq13 = require("reliq");
function StoreRouter(_store) {
  {
    return (0, import_express2.Router)().get("/store/products", async (__, rs) => {
      try {
        rs.send({ products: await _store.products() });
        return;
      } catch (e) {
        console.error(e);
        rs.send({ e });
        return;
      }
    }).get("/store/products-by-name", async (rq, rs) => {
      try {
        let { name } = rq.body;
        if (!(name !== null && name !== void 0 && typeof name === "string")) {
          rs.send({ message: "STORE_ROUTER.ERR_INVALID_REQUEST" });
          return;
        }
        rs.send({ products: await _store.products(name) });
        return;
      } catch (e) {
        console.error(e);
        rs.send({ e });
        return;
      }
    }).post("/store/set-stock", async (rq, rs) => {
      try {
        let payload = import_zod6.z.object({
          password: import_zod6.z.string().refine((v) => _hasPermission(v)),
          name: import_zod6.z.string(),
          amount: import_zod6.z.number()
        }).parse(rq.body);
        let { name, amount } = payload;
        await _store.setStock(name, BigInt(amount));
        rs.send({ message: "OK" });
        return;
      } catch (e) {
        console.error(e);
        rs.send({ e });
        return;
      }
    }).post("/store/increase-stock", async (rq, rs) => {
      try {
        let payload = import_zod6.z.object({
          password: import_zod6.z.string().refine((v) => _hasPermission(v)),
          name: import_zod6.z.string(),
          amount: import_zod6.z.number()
        }).parse(rq.body);
        let { name, amount } = payload;
        await _store.increaseStock(name, BigInt(amount));
        rs.send({ message: "OK" });
        return;
      } catch (e) {
        console.error(e);
        rs.send({ e });
        return;
      }
    }).post("/store/decrease-stock", async (rq, rs) => {
      try {
        let { password, name, amount } = rq.body;
        if (!(password !== null && password !== void 0 && typeof password === "string" && _hasPermission(password) && name !== null && name !== void 0 && typeof name === "string" && amount !== null && amount !== void 0 && typeof amount === "number" && amount >= 0 && amount <= Number.MAX_SAFE_INTEGER && Number.isSafeInteger(amount))) {
          rs.send({ message: "STORE_ROUTER.ERR_INVALID_REQUEST" });
          return;
        }
        await _store.decreaseStock(name, BigInt(amount));
        rs.send({ message: "OK" });
        return;
      } catch (e) {
        console.error(e);
        rs.send({ e });
        return;
      }
    }).post("/store/set-price", async (rq, rs) => {
      try {
        let { password, name, amount } = rq.body;
        if (!(password !== null && password !== void 0 && typeof password === "string" && _hasPermission(password) && name !== null && name !== void 0 && typeof name === "string" && amount !== null && amount !== void 0 && typeof amount === "number" && amount >= 0 && amount <= Number.MAX_SAFE_INTEGER && Number.isSafeInteger(amount))) {
          rs.send({ message: "STORE_ROUTER.ERR_INVALID_REQUEST" });
          return;
        }
        await _store.setPrice(name, amount);
        rs.send({ message: "OK" });
        return;
      } catch (e) {
        console.error(e);
        rs.send({ e });
        return;
      }
    }).post("/store/increase-price", async (rq, rs) => {
      try {
        let { password, name, amount } = rq.body;
        if (!(password !== null && password !== void 0 && typeof password === "string" && _hasPermission(password) && name !== null && name !== void 0 && typeof name === "string" && amount !== null && amount !== void 0 && typeof amount === "number" && amount >= 0 && amount <= Number.MAX_SAFE_INTEGER && Number.isSafeInteger(amount))) {
          rs.send({ message: "STORE_ROUTER.ERR_INVALID_REQUEST" });
          return;
        }
        await _store.increasePrice(name, amount);
        rs.send({ message: "OK" });
        return;
      } catch (e) {
        console.error(e);
        rs.send({ e });
        return;
      }
    }).post("/store/decrease-price", async (rq, rs) => {
      try {
        let { password, name, amount } = rq.body;
        if (!(password !== null && password !== void 0 && typeof password === "string" && _hasPermission(password) && name !== null && name !== void 0 && typeof name === "string" && amount !== null && amount !== void 0 && typeof amount === "number" && amount >= 0 && amount <= Number.MAX_SAFE_INTEGER && Number.isSafeInteger(amount))) {
          rs.send({ message: "STORE_ROUTER.ERR_INVALID_REQUEST" });
          return;
        }
        await _store.decreasePrice(name, amount);
        rs.send({ message: "OK" });
        return;
      } catch (e) {
        console.error(e);
        rs.send({ e });
        return;
      }
    }).post("/store/list-product", async (rq, rs) => {
      try {
        let { password, product } = rq.body;
        if (!(password !== null && password !== void 0 && typeof password === "string" && _hasPermission(password) && ProductDataSchema.safeParse(product).success)) {
          rs.send({ message: "STORE_ROUTER.ERR_INVALID_REQUEST" });
          return;
        }
        await _store.listProduct(product);
        rs.send({ message: "OK" });
        return;
      } catch (e) {
        console.error(e);
        rs.send({ e });
        return;
      }
    }).post("/store/delist-product-by-name", async (rq, rs) => {
      try {
        let { password, name } = rq.body;
        if (!(password !== null && password !== void 0 && typeof password === "string" && _hasPermission(password) && name !== null && name !== void 0 && typeof name === "string")) {
          rs.send({ message: "STORE_ROUTER.ERR_INVALID_REQUEST" });
          return;
        }
        await _store.delistProduct(name);
        rs.send({ message: "OK" });
        return;
      } catch (e) {
        console.error(e);
        rs.send({ e });
        return;
      }
    }).post("/store/delist-product-by-product", async (rq, rs) => {
      try {
        let { password, product } = rq.body;
        if (!(password !== null && password !== void 0 && typeof password === "string" && _hasPermission(password) && ProductDataSchema.safeParse(product).success)) {
          rs.send({ message: "STORE_ROUTER.ERR_INVALID_REQUEST" });
          return;
        }
        await _store.delistProduct(product);
        rs.send({ message: "OK" });
        return;
      } catch (e) {
        console.error(e);
        rs.send({ e });
        return;
      }
    });
  }
  function _hasPermission(password) {
    let correctPassword = process.env?.["ADMIN_PASSWORD"];
    if (correctPassword === void 0) return false;
    if (correctPassword.trim().length === 0) return false;
    if (correctPassword === password) return true;
    return false;
  }
}

// src/server/server.ts
var import_reliq14 = require("reliq");
var import_path = require("path");
function Server() {
  {
    return { run };
  }
  async function run(...[]) {
    let redisPassword = process.env?.["REDIS_INT_KEY"];
    (0, import_reliq14.require)(redisPassword !== void 0, "SERVER.ERR_REDIS_INT_KEY_REQUIRED");
    let redisSocketAdaptor = await RedisSocketAdaptor("redis-15540.c85.us-east-1-2.ec2.redns.redis-cloud.com", redisPassword, 15540n);
    let redis = await Redis(redisSocketAdaptor, "*");
    let store = Store(redis);
    let port = 8080;
    let socket = (0, import_express3.default)().use(import_express3.default.static((0, import_path.join)(__dirname, "web"))).use(import_express3.default.json()).use(ReactRouter("/", (0, import_path.join)(__dirname, "web/app.html"))).use(StoreRouter(store)).listen(port);
    console.log("SERVER.RUNNING", __dirname, port);
    return;
  }
}
Server().run();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Server
});
