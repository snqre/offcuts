// src/server/Server.ts
import { default as Express } from "express";

// src/server-class/Authenticator.ts
import { default as Hash } from "bcrypt";

// node_modules/ts-results/esm/utils.js
function toString(val) {
  var value = String(val);
  if (value === "[object Object]") {
    try {
      value = JSON.stringify(val);
    } catch (_a) {
    }
  }
  return value;
}

// node_modules/ts-results/esm/option.js
var NoneImpl = (
  /** @class */
  function() {
    function NoneImpl2() {
      this.some = false;
      this.none = true;
    }
    NoneImpl2.prototype[Symbol.iterator] = function() {
      return {
        next: function() {
          return { done: true, value: void 0 };
        }
      };
    };
    NoneImpl2.prototype.unwrapOr = function(val) {
      return val;
    };
    NoneImpl2.prototype.expect = function(msg) {
      throw new Error("" + msg);
    };
    NoneImpl2.prototype.unwrap = function() {
      throw new Error("Tried to unwrap None");
    };
    NoneImpl2.prototype.map = function(_mapper) {
      return this;
    };
    NoneImpl2.prototype.andThen = function(op) {
      return this;
    };
    NoneImpl2.prototype.toResult = function(error) {
      return Err(error);
    };
    NoneImpl2.prototype.toString = function() {
      return "None";
    };
    return NoneImpl2;
  }()
);
var None = new NoneImpl();
Object.freeze(None);
var SomeImpl = (
  /** @class */
  function() {
    function SomeImpl2(val) {
      if (!(this instanceof SomeImpl2)) {
        return new SomeImpl2(val);
      }
      this.some = true;
      this.none = false;
      this.val = val;
    }
    SomeImpl2.prototype[Symbol.iterator] = function() {
      var obj = Object(this.val);
      return Symbol.iterator in obj ? obj[Symbol.iterator]() : {
        next: function() {
          return { done: true, value: void 0 };
        }
      };
    };
    SomeImpl2.prototype.unwrapOr = function(_val) {
      return this.val;
    };
    SomeImpl2.prototype.expect = function(_msg) {
      return this.val;
    };
    SomeImpl2.prototype.unwrap = function() {
      return this.val;
    };
    SomeImpl2.prototype.map = function(mapper) {
      return Some(mapper(this.val));
    };
    SomeImpl2.prototype.andThen = function(mapper) {
      return mapper(this.val);
    };
    SomeImpl2.prototype.toResult = function(error) {
      return Ok(this.val);
    };
    SomeImpl2.prototype.safeUnwrap = function() {
      return this.val;
    };
    SomeImpl2.prototype.toString = function() {
      return "Some(" + toString(this.val) + ")";
    };
    SomeImpl2.EMPTY = new SomeImpl2(void 0);
    return SomeImpl2;
  }()
);
var Some = SomeImpl;
var Option;
(function(Option6) {
  function all() {
    var options = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      options[_i] = arguments[_i];
    }
    var someOption = [];
    for (var _a = 0, options_1 = options; _a < options_1.length; _a++) {
      var option = options_1[_a];
      if (option.some) {
        someOption.push(option.val);
      } else {
        return option;
      }
    }
    return Some(someOption);
  }
  Option6.all = all;
  function any() {
    var options = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      options[_i] = arguments[_i];
    }
    for (var _a = 0, options_2 = options; _a < options_2.length; _a++) {
      var option = options_2[_a];
      if (option.some) {
        return option;
      } else {
        return option;
      }
    }
    return None;
  }
  Option6.any = any;
  function isOption(value) {
    return value instanceof Some || value === None;
  }
  Option6.isOption = isOption;
})(Option || (Option = {}));

// node_modules/ts-results/esm/result.js
var ErrImpl = (
  /** @class */
  function() {
    function ErrImpl2(val) {
      if (!(this instanceof ErrImpl2)) {
        return new ErrImpl2(val);
      }
      this.ok = false;
      this.err = true;
      this.val = val;
      var stackLines = new Error().stack.split("\n").slice(2);
      if (stackLines && stackLines.length > 0 && stackLines[0].includes("ErrImpl")) {
        stackLines.shift();
      }
      this._stack = stackLines.join("\n");
    }
    ErrImpl2.prototype[Symbol.iterator] = function() {
      return {
        next: function() {
          return { done: true, value: void 0 };
        }
      };
    };
    ErrImpl2.prototype.else = function(val) {
      return val;
    };
    ErrImpl2.prototype.unwrapOr = function(val) {
      return val;
    };
    ErrImpl2.prototype.expect = function(msg) {
      throw new Error(msg + " - Error: " + toString(this.val) + "\n" + this._stack);
    };
    ErrImpl2.prototype.unwrap = function() {
      throw new Error("Tried to unwrap Error: " + toString(this.val) + "\n" + this._stack);
    };
    ErrImpl2.prototype.map = function(_mapper) {
      return this;
    };
    ErrImpl2.prototype.andThen = function(op) {
      return this;
    };
    ErrImpl2.prototype.mapErr = function(mapper) {
      return new Err(mapper(this.val));
    };
    ErrImpl2.prototype.toOption = function() {
      return None;
    };
    ErrImpl2.prototype.toString = function() {
      return "Err(" + toString(this.val) + ")";
    };
    Object.defineProperty(ErrImpl2.prototype, "stack", {
      get: function() {
        return this + "\n" + this._stack;
      },
      enumerable: false,
      configurable: true
    });
    ErrImpl2.EMPTY = new ErrImpl2(void 0);
    return ErrImpl2;
  }()
);
var Err = ErrImpl;
var OkImpl = (
  /** @class */
  function() {
    function OkImpl2(val) {
      if (!(this instanceof OkImpl2)) {
        return new OkImpl2(val);
      }
      this.ok = true;
      this.err = false;
      this.val = val;
    }
    OkImpl2.prototype[Symbol.iterator] = function() {
      var obj = Object(this.val);
      return Symbol.iterator in obj ? obj[Symbol.iterator]() : {
        next: function() {
          return { done: true, value: void 0 };
        }
      };
    };
    OkImpl2.prototype.else = function(_val) {
      return this.val;
    };
    OkImpl2.prototype.unwrapOr = function(_val) {
      return this.val;
    };
    OkImpl2.prototype.expect = function(_msg) {
      return this.val;
    };
    OkImpl2.prototype.unwrap = function() {
      return this.val;
    };
    OkImpl2.prototype.map = function(mapper) {
      return new Ok(mapper(this.val));
    };
    OkImpl2.prototype.andThen = function(mapper) {
      return mapper(this.val);
    };
    OkImpl2.prototype.mapErr = function(_mapper) {
      return this;
    };
    OkImpl2.prototype.toOption = function() {
      return Some(this.val);
    };
    OkImpl2.prototype.safeUnwrap = function() {
      return this.val;
    };
    OkImpl2.prototype.toString = function() {
      return "Ok(" + toString(this.val) + ")";
    };
    OkImpl2.EMPTY = new OkImpl2(void 0);
    return OkImpl2;
  }()
);
var Ok = OkImpl;
var Result;
(function(Result19) {
  function all() {
    var results = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      results[_i] = arguments[_i];
    }
    var okResult = [];
    for (var _a = 0, results_1 = results; _a < results_1.length; _a++) {
      var result = results_1[_a];
      if (result.ok) {
        okResult.push(result.val);
      } else {
        return result;
      }
    }
    return new Ok(okResult);
  }
  Result19.all = all;
  function any() {
    var results = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      results[_i] = arguments[_i];
    }
    var errResult = [];
    for (var _a = 0, results_2 = results; _a < results_2.length; _a++) {
      var result = results_2[_a];
      if (result.ok) {
        return result;
      } else {
        errResult.push(result.val);
      }
    }
    return new Err(errResult);
  }
  Result19.any = any;
  function wrap(op) {
    try {
      return new Ok(op());
    } catch (e) {
      return new Err(e);
    }
  }
  Result19.wrap = wrap;
  function wrapAsync(op) {
    try {
      return op().then(function(val) {
        return new Ok(val);
      }).catch(function(e) {
        return new Err(e);
      });
    } catch (e) {
      return Promise.resolve(new Err(e));
    }
  }
  Result19.wrapAsync = wrapAsync;
  function isResult(val) {
    return val instanceof Err || val instanceof Ok;
  }
  Result19.isResult = isResult;
})(Result || (Result = {}));

// src/common/Loop.ts
var _MAX_ITER = 2000000n;
var Loop = (() => {
  {
    return {
      checkMaxIter
    };
  }
  function checkMaxIter(...[length]) {
    if (length > _MAX_ITER) return Err("LOOP.ERR_LENGTH_ABOVE_MAX_ITER");
    if (length < 0) return Err("LOOP.ERR_LENGTH_BELOW_ZERO");
    return Ok(void 0);
  }
})();

// src/common/UserDataSchema.ts
import { default as Validator } from "validator";
import { z as ZodValidator } from "zod";
var UserDataSchema = ZodValidator.object({
  username: ZodValidator.string().min(1),
  hash: ZodValidator.string().min(1),
  email: ZodValidator.string().optional().refine((x) => x ? Validator.isEmail(x) : true),
  phoneNumber: ZodValidator.string().optional().refine((x) => x ? Validator.isMobilePhone(x) : true),
  address: ZodValidator.string().optional().refine((x) => x ? x.trim().length > 0 : true)
});

// src/common/ProductDataSchema.ts
import { z as ZodValidator2 } from "zod";
var ProductDataSchema = ZodValidator2.object({
  name: ZodValidator2.string().min(1).refine((x) => x.trim().length > 0),
  price: ZodValidator2.number().min(0).finite(),
  stock: ZodValidator2.number().min(0).finite().int()
});

// src/common/ProductOrderDataSchema.ts
import { z as ZodValidator3 } from "zod";
var ProductOrderDataSchema = ZodValidator3.object({
  product: ProductDataSchema,
  amount: ZodValidator3.number().min(1).int()
});

// src/common/AppDataSchema.ts
import { z as ZodValidator4 } from "zod";
var AppDataSchema = ZodValidator4.object({
  users: ZodValidator4.array(UserDataSchema),
  products: ZodValidator4.array(ProductDataSchema)
});

// src/common/AppData.ts
import { Ok as Ok2 } from "reliq";
import { Err as Err2 } from "reliq";
import "reliq";

// src/common/ProductData.ts
import { Ok as Ok3 } from "reliq";
import { Err as Err3 } from "reliq";
import "reliq";
function ProductData2({ name, price, stock }) {
  {
    let instance = {
      name,
      price,
      stock
    };
    if (name.trim().length === 0) return Err3("PRODUCT_DATA.ERR_INVALID_NAME");
    if (price < 0) return Err3("PRODUCT_DATA.ERR_PRICE_BELOW_ZERO");
    if (price > Number.MAX_SAFE_INTEGER) return Err3("PRODUCT_DATA.ERR_PRICE_ABOVE_MAX_SAFE_INTEGER");
    if (stock < 0) return Err3("PRODUCT_DATA.ERR_STOCK_BELOW_ZERO");
    if (stock > Number.MAX_SAFE_INTEGER) return Err3("PRODUCT_DATA.ERR_STOCK_ABOVE_MAX_SAFE_INTEGER");
    if (Number.isSafeInteger(stock) === false) return Err3("PRODUCT_DATA.ERR_STOCK_NOT_AN_INTEGER");
    let match = ProductDataSchema.safeParse(instance).success;
    if (match === false) return Err3("PRODUCT_DATA.ERR_SCHEMA_VALIDATION_FAILED");
    return Ok3(instance);
  }
}

// src/common/ProductOrderData.ts
import { Ok as Ok4 } from "reliq";
import { Err as Err4 } from "reliq";
import "reliq";
function ProductOrderData({ product, amount }) {
  {
    let instance = {
      product,
      amount
    };
    if (amount < 0) return Err4("PRODUCT_ORDER_DATA.ERR_AMOUNT_BELOW_ZERO");
    if (amount > Number.MAX_SAFE_INTEGER) return Err4("PRODUCT_ORDER_DATA.ERR_AMOUNT_ABOVE_MAX_SAFE_INTEGER");
    if (Number.isSafeInteger(amount) === false) return Err4("PRODUCT_ORDER_DATA.ERR_AMOUNT_NOT_AN_INTEGER");
    let match = ProductOrderDataSchema.safeParse(instance).success;
    if (match === false) return Err4("PRODUCT_ORDER_DATA.ERR_SCHEMA_VALIDATION_FAILED");
    return Ok4(instance);
  }
}

// src/common/UserData.ts
import { default as Validator2 } from "validator";
import { Ok as Ok5 } from "reliq";
import { Err as Err5 } from "reliq";
import "reliq";

// src/server-class/Authenticator.ts
import { Result as Result7 } from "reliq";
import { Err as Err6 } from "reliq";

// src/server-class/Database.ts
import "reliq";
import "reliq";

// src/server-class/PaymentProvider.ts
import "stripe";
import "reliq";
import "reliq";

// src/server-class/Product.ts
import "reliq";
import "reliq";
import { Ok as Ok6 } from "reliq";
import { Err as Err7 } from "reliq";
import { Some as Some2 } from "reliq";
import { None as None2 } from "reliq";
import "stripe";
function Product(_name, _price, _stock) {
  {
    if (_name.trim().length === 0) return Err7("PRODUCT.ERR_INVALID_NAME");
    if (_price < 0) return Err7("PRODUCT.ERR_PRICE_BELOW_ZERO");
    if (_price > Number.MAX_SAFE_INTEGER) return Err7("PRODUCT.ERR_PRICE_ABOVE_MAX_SAFE_INTEGER");
    if (_stock < 0) return Err7("PRODUCT.ERR_STOCK_BELOW_ZERO");
    return Ok6({
      name,
      price,
      stock,
      increaseStock,
      decreaseStock,
      purchase
    });
  }
  function name() {
    return _name;
  }
  function price() {
    return _price;
  }
  function stock() {
    return _stock;
  }
  function increaseStock(...[amount]) {
    if (amount < 0) return Err7("PRODUCT.ERR_AMOUNT_BELOW_ZERO");
    _stock += amount;
    return Ok6(void 0);
  }
  function decreaseStock(...[amount]) {
    if (amount < 0) return Err7("PRODUCT.ERR_AMOUNT_BELOW_ZERO");
    if (stock() - amount < 0) return Err7("PRODUCT.ERR_INSUFFICIENT_STOCK");
    _stock -= amount;
    return Ok6(void 0);
  }
  async function purchase(...[amount, provider]) {
    let decreaseStockR = decreaseStock(amount);
    if (decreaseStockR.err()) return decreaseStockR;
    let productDataR = ProductData2({
      name: name(),
      price: price(),
      stock: Number(stock())
    });
    if (productDataR.err()) return productDataR;
    let productData = productDataR.unwrapSafely();
    let productOrderDataR = ProductOrderData({
      product: productData,
      amount: Number(amount)
    });
    if (productOrderDataR.err()) return productOrderDataR;
    let productOrderData = productOrderDataR.unwrapSafely();
    let sessionR = await provider.receivePayment([productOrderData]);
    if (sessionR.err()) return sessionR;
    let sessionO = sessionR.unwrapSafely();
    if (sessionO.none()) return Ok6(None2);
    let session = sessionO.unwrapSafely();
    return Ok6(Some2(session));
  }
}

// src/server-class/Redis.ts
import { Result as Result11 } from "reliq";
import { Ok as Ok7 } from "reliq";
import { Err as Err8 } from "reliq";
import { Some as Some3 } from "reliq";
import { None as None3 } from "reliq";
async function Redis(_socket, _key) {
  {
    let instance = {
      get,
      set,
      disconnect
    };
    if (_key.trim().length === 0) return Err8("REDIS.ERR_INVALID_KEY");
    let connectR = await Result11.wrapAsync(async () => await _socket.connect());
    if (connectR.err()) return Err8([connectR.val()]);
    return Ok7(instance);
  }
  async function get(...[]) {
    let responseR = await Result11.wrapAsync(async () => await _socket.get(_key));
    if (responseR.err()) return Err8([responseR.val()]);
    let response = responseR.unwrapSafely();
    if (response === null) return Ok7(None3);
    if (response === void 0) return Ok7(None3);
    let dataR = Result11.wrap(() => JSON.parse(response));
    if (dataR.err()) return Err8([dataR.val()]);
    let data = dataR.unwrapSafely();
    let match = AppDataSchema.safeParse(data).success;
    if (match === false) return Err8("DATABASE.ERR_INVALID_RESPONSE");
    return Ok7(Some3(data));
  }
  async function set(...[data]) {
    let responseR = Result11.wrap(() => JSON.stringify(data));
    if (responseR.err()) return Err8([responseR.val()]);
    let response = responseR.unwrapSafely();
    let setR = await Result11.wrapAsync(async () => await _socket.set(_key, response));
    if (setR.err()) return Err8([setR.val()]);
    return Ok7(void 0);
  }
  async function disconnect() {
    let quitR = await Result11.wrapAsync(async () => await _socket.quit());
    if (quitR.err()) return Err8([quitR.val()]);
    return Ok7(void 0);
  }
}

// src/server-class/RedisSocket.ts
import { createClient as RedisClient } from "redis";
import { Result as Result12 } from "reliq";
import { Ok as Ok8 } from "reliq";
import { Err as Err9 } from "reliq";
function RedisSocket2(_host, _password, _port) {
  {
    if (_host.trim().length === 0) return Err9("REDIS_SOCKET.ERR_INVALID_HOST");
    if (_port < 0) return Err9("REDIS_SOCKET.ERR_INVALID_PORT");
    if (_password.trim().length === 0) return Err9("REDIS_SOCKET.ERR_INVALID_PASSWORD");
    let socketR = Result12.wrap(() => RedisClient({
      password: _password,
      socket: {
        host: _host,
        port: Number(_port)
      }
    }));
    if (socketR.err()) return Err9([socketR.val()]);
    let socket = socketR.unwrapSafely();
    return Ok8(socket);
  }
}

// src/server-class/Store.ts
import "reliq";
import { Result as Result13 } from "reliq";
import { Ok as Ok9 } from "reliq";
import { Err as Err10 } from "reliq";
import { Some as Some4 } from "reliq";
import { None as None4 } from "reliq";
function Store(_database) {
  {
    return {
      products,
      productsByName,
      increaseStock,
      decreaseStock,
      listProduct,
      deListProduct,
      deListProductByProduct,
      setProductPrice
    };
  }
  async function products() {
    let appDataR = await _appData();
    if (appDataR.err()) return appDataR;
    let appData = appDataR.unwrapSafely();
    let result = [];
    let i = 0n;
    while (i < appData.products.length) {
      let productData = appData.products[Number(i)];
      let productR = Product(productData.name, productData.price, BigInt(productData.stock));
      result.push(productR);
      i++;
    }
    return Ok9(result);
  }
  async function productsByName(...[name]) {
    let appDataR = await _appData();
    if (appDataR.err()) return appDataR;
    let appData = appDataR.unwrapSafely();
    let i = 0n;
    while (i < appData.products.length) {
      let productData = appData.products[Number(i)];
      if (productData.name === name) {
        let productR = Product(productData.name, productData.price, BigInt(productData.stock));
        return Ok9(Some4(productR));
      }
      i++;
    }
    return Ok9(None4);
  }
  async function increaseStock(...[name, amount]) {
    return _editStock(name, amount, "OP_INCREASE");
  }
  async function decreaseStock(...[name, amount]) {
    return _editStock(name, amount, "OP_DECREASE");
  }
  async function listProduct(...[product]) {
    let appDataR = await _appData();
    if (appDataR.err()) return appDataR;
    let appData = appDataR.unwrapSafely();
    let i = 0n;
    while (i < appData.products.length) {
      let productData2 = appData.products[Number(i)];
      if (productData2.name === product.name()) return Err10("STORE.ERR_PRODUCT_ALREADY_LISTED");
      i++;
    }
    let productDataR = ProductData2({
      name: product.name(),
      price: product.price(),
      stock: Number(product.stock())
    });
    if (productDataR.err()) return productDataR;
    let productData = productDataR.unwrapSafely();
    appData.products.push(productData);
    let setR = await _database.set(appData);
    if (setR.err()) return setR;
    return Ok9(void 0);
  }
  async function deListProduct(...[name]) {
    let appDataR = await _appData();
    if (appDataR.err()) return appDataR;
    let appData = appDataR.unwrapSafely();
    let match = appData.products.findIndex((productData) => productData.name === name);
    if (match === -1) return Err10("STORE.ERR_PRODUCT_NOT_FOUND");
    appData.products.splice(match, 1);
    let setR = await _database.set(appData);
    if (setR.err()) return setR;
    return Ok9(void 0);
  }
  async function deListProductByProduct(...[product]) {
    return deListProduct(product.name());
  }
  async function setProductPrice(...[name, price]) {
    let appDataR = await _appData();
    if (appDataR.err()) return appDataR;
    let appData = appDataR.unwrapSafely();
    let match = appData.products.findIndex((productData) => productData.name === name);
    if (match === -1) return Err10("STORE.ERR_PRODUCT_NOT_FOUND");
    let i = 0n;
    while (i < appData.products.length) {
      let productData = appData.products[Number(i)];
      if (productData.name === name) {
        appData.products.splice(match, 1);
        productData.price = price;
        appData.products.push(productData);
      }
      i++;
    }
    let setR = await _database.set(appData);
    if (setR.err()) return setR;
    return Ok9(void 0);
  }
  async function _editStock(name, amount, op) {
    let appDataR = await _appData();
    if (appDataR.err()) return appDataR;
    let appData = appDataR.unwrapSafely();
    let match = false;
    let productsLike = appData.products.map((productData) => {
      if (productData.name === name) {
        match = true;
        let productR = Product(productData.name, productData.price, BigInt(productData.stock));
        if (productR.err()) return productR;
        let product = productR.unwrapSafely();
        let editR = op === "OP_INCREASE" ? product.increaseStock(amount) : product.decreaseStock(amount);
        if (editR.err()) return editR;
        let productDataR = ProductData2({
          name: product.name(),
          price: product.price(),
          stock: Number(product.stock())
        });
        if (productDataR.err()) return productDataR;
        productData = productDataR.unwrapSafely();
      }
      return productData;
    });
    if (match === false) return Err10("STORE.ERR_PRODUCT_NOT_FOUND");
    let products2 = [];
    let i = 0n;
    while (i < productsLike.length) {
      let productLike = productsLike[Number(i)];
      if (Result13.isErr(productLike)) return productLike;
      products2.push(productLike);
      i++;
    }
    appData.products = products2;
    let setR = await _database.set(appData);
    if (setR.err()) return setR;
    return Ok9(void 0);
  }
  async function _appData() {
    let appDataR = await _database.get();
    if (appDataR.err()) return appDataR;
    let appDataO = appDataR.unwrapSafely();
    if (appDataO.none()) return Err10("STORE.ERR_APP_DATA_UNAVAILABLE");
    let appData = appDataO.unwrapSafely();
    return Ok9(appData);
  }
}

// src/server-class/Stripe.ts
import { default as Socket } from "stripe";
import { Result as Result14 } from "reliq";
import { Ok as Ok10 } from "reliq";
import { Err as Err11 } from "reliq";
import { Some as Some5 } from "reliq";
function Stripe3(_apiKey) {
  let _socket;
  {
    if (_apiKey.trim().length === 0) return Err11("STRIPE.ERR_INVALID_API_KEY");
    let socketR = Result14.wrap(() => new Socket(_apiKey));
    if (socketR.err()) return Err11([socketR.val()]);
    _socket = socketR.unwrapSafely();
    return Ok10({ checkPayment, receivePayment });
  }
  async function checkPayment(...[sessionId]) {
    let sessionR = await Result14.wrapAsync(async () => await _socket.checkout.sessions.retrieve(sessionId));
    if (sessionR.err()) return Err11([sessionR.val()]);
    let session = sessionR.unwrapSafely();
    return Ok10(Some5(session));
  }
  async function receivePayment(...[orders]) {
    let sessionR = await Result14.wrapAsync(async () => await _socket.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [...orders.map((order) => _toSessionCheckoutLineItem(order))],
      mode: "payment"
    }));
    if (sessionR.err()) return Err11([sessionR.val()]);
    let session = sessionR.unwrapSafely();
    return Ok10(Some5(session));
  }
  function _toSessionCheckoutLineItem(order) {
    let id = order.product.name.trim();
    let currency = "gbp";
    let productDataFragment = {
      name: id,
      description: order.product.name
    };
    let priceDataFragment = {
      currency,
      unit_amount: order.product.price,
      product_data: productDataFragment
    };
    let item = {
      quantity: order.amount,
      price_data: priceDataFragment
    };
    return item;
  }
}

// src/server-router/AdminRouter.ts
import { Router } from "express";
import { Result as Result15 } from "reliq";
import "reliq";
import { Err as Err12 } from "reliq";
function AdminRouter(_store) {
  {
    let routerR = Result15.wrap(() => Router().post("/product/increase-stock", async (rq, rs) => {
      let { password, name, amount } = rq.body;
      let match = typeof password !== null && typeof password !== void 0 && typeof password === "string" && typeof name !== null && typeof name !== void 0 && typeof name === "string" && typeof amount !== null && typeof amount !== void 0 && typeof amount === "number" && amount >= 0 && amount <= Number.MAX_SAFE_INTEGER && Number.isSafeInteger(amount);
      if (match === false) {
        let e = "ADMIN_ROUTER.ERR_INVALID_RESPONSE";
        rs.send(e);
        return;
      }
      let increaseStockR = await _store.increaseStock(name, BigInt(amount));
      if (increaseStockR.err()) {
        rs.send(increaseStockR.val());
        return;
      }
      let ok = "ADMIN_ROUTER.OK_INCREASE_STOCK";
      rs.status(200).send(ok);
      return;
    }));
    if (routerR.err()) return Err12([routerR.val()]);
    return routerR;
  }
}

// src/server-router/CheckoutRouter.ts
import { Router as Router2 } from "express";
import { Result as Result16 } from "reliq";
import { Ok as Ok12 } from "reliq";
import { Err as Err13 } from "reliq";
import { z as ZodValidator5 } from "zod";
function CheckoutRouter(_store) {
  {
    let routerR = Result16.wrap(() => Router2().post("/checkout", async (rq, rs) => {
      let stripeApiKey = process.env?.["STRIPE_API_KEY"];
      if (stripeApiKey === void 0) {
        let e = "CHECKOUT_ROUTER.ERR_STRIPE_API_KEY_REQUIRED";
        rs.status(500).send(e);
        return;
      }
      let stripeR = Stripe3(stripeApiKey);
      if (stripeR.err()) {
        rs.status(500).send(stripeR.val());
        return;
      }
      let stripe = stripeR.unwrapSafely();
      let { orders } = rq.body;
      let match = ZodValidator5.array(ProductOrderDataSchema).safeParse(orders).success;
      if (match === false) {
        let e = "CHECKOUT_ROUTER.ERR_INVALID_RESPONSE";
        rs.status(400).send(e);
        return;
      }
      let sessionR = await stripe.receivePayment(orders);
      if (sessionR.err()) {
        if (Array.isArray(sessionR.val())) {
          rs.send(sessionR.val()[0]);
          return;
        }
        rs.send(sessionR.val());
        return;
      }
      let sessionO = sessionR.unwrapSafely();
      if (sessionO.none()) {
        let e = "CHECKOUT_ROUTER.ERR_UNABLE_TO_RECEIVE_PAYMENT";
        rs.status(500).send(e);
        return;
      }
      let session = sessionO.unwrapSafely();
      let url = session.url;
      if (url === null) {
        let e = "CHECKOUT_ROUTER.ERR_UNABLE_TO_RECEIVE_PAYMENT";
        rs.status(500).send(e);
        return;
      }
      let id = session.id;
      rs.status(200).send(url);
      _startPaymentPollTimeout(id, url, _startPaymentPoll(stripeApiKey, id, 9 * 1e3), 3600 * 1e3);
      return;
    }));
    if (routerR.err()) return Err13([routerR.val()]);
    return routerR;
  }
  async function _checkPayment(stripeApiKey, sessionId, timer) {
    let stripeR = Stripe3(stripeApiKey);
    if (stripeR.err()) return stripeR;
    let stripe = stripeR.unwrapSafely();
    let sessionR = await stripe.checkPayment(sessionId);
    if (sessionR.err()) return sessionR;
    let sessionO = sessionR.unwrapSafely();
    if (sessionO.none()) return Err13("CHECKOUT_ROUTER.ERR_SESSION_NOT_AVAILABLE");
    let session = sessionO.unwrapSafely();
    let products = session.line_items?.data;
    if (products === void 0) return Err13("CHECKOUT_ROUTER.ERR_MISSING_STRIPE_LINE_ITEMS");
    let complete = session.payment_status === "paid" || session.status === "complete";
    let expired = session.status === "expired";
    if (expired) {
      clearInterval(timer);
      let i = 0n;
      while (i < products.length) {
        let product = products[Number(i)];
        let name = product.description;
        let amount = product.quantity;
        if (name === null) return Err13("CHECKOUT_ROUTER.ERR_MISSING_STRIPE_LINE_ITEM_PRODUCT_NAME");
        if (amount === null) return Err13("CHECKOUT_ROUTER.ERR_MISSING_STRIPE_LINE_ITEM_PRODUCT_AMOUNT");
        let increaseStockR = await _store.increaseStock(name, BigInt(amount));
        if (increaseStockR.err()) return increaseStockR;
        i++;
      }
      return Ok12(void 0);
    }
    if (complete) {
      clearInterval(timer);
      return Ok12(void 0);
    }
    return Ok12(void 0);
  }
  function _startPaymentPoll(stripeApiKey, sessionId, interval) {
    let timer = setInterval(async () => {
      let checkPaymentR = await _checkPayment(stripeApiKey, sessionId, timer);
      if (checkPaymentR.err()) {
        let e = checkPaymentR.val();
        console.error(e);
        return;
      }
      return;
    }, interval);
    return timer;
  }
  function _startPaymentPollTimeout(sessionId, sessionUrl, timer, duration) {
    setTimeout(() => {
      clearInterval(timer);
      let warning = `
            WARNING PAYMENT_POLL_WINDOW_CLOSURE
                SESSION_ID: ${sessionId}
                SESSION_URL: ${sessionUrl}
            `;
      console.warn(warning);
    }, duration);
  }
}

// src/server-router/ReactRouter.ts
import { Router as Router3 } from "express";
import { Err as Err14 } from "reliq";
import { Result as Result17 } from "reliq";
import { join } from "path";
function ReactRouter() {
  {
    let routerR = Result17.wrap(() => Router3().get("/", (__, rs) => rs.sendFile(join(__dirname, "web/App.html"))));
    if (routerR.err()) return Err14([routerR.val()]);
    return routerR;
  }
}

// src/server/Server.ts
import { Ok as Ok13 } from "reliq";
import { Err as Err15 } from "reliq";
import { Result as Result18 } from "reliq";
import { join as join2 } from "path";
function Server() {
  {
    return {
      run
    };
  }
  async function run() {
    let redisPassword = process.env?.["REDIS_PASSWORD"];
    if (redisPassword === void 0) return Err15("SERVER.REDIS_PASSWORD_REQUIRED");
    let redisSocketR = RedisSocket2("redis-15540.c85.us-east-1-2.ec2.redns.redis-cloud.com", redisPassword, 15540n);
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
    let appR = Result18.wrap(() => {
      return Express().use(Express.static(join2(__dirname, "web"))).use(Express.json()).use(reactRouter).use(checkoutRouter).use(adminRouter).listen(port);
    });
    if (appR.err()) return Err15([appR.val()]);
    appR.unwrapSafely();
    console.log("SERVER.RUNNING", port);
    return Ok13(void 0);
  }
}
var server = Server();
var runR = await server.run();
runR.mapErr((e) => {
  if (Array.isArray(e)) console.error(e[0]);
  else console.error(e);
  return;
});
export {
  Server
};
