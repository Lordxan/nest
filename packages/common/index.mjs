var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __decorateParam = (index2, decorator) => (target, key) => decorator(target, key, index2);

// node_modules/tsup/assets/esm_shims.js
var init_esm_shims = __esm({
  "node_modules/tsup/assets/esm_shims.js"() {
  }
});

// node_modules/cache-manager/lib/callback_filler.js
var require_callback_filler = __commonJS({
  "node_modules/cache-manager/lib/callback_filler.js"(exports, module) {
    init_esm_shims();
    function CallbackFiller() {
      this.queues = {};
    }
    CallbackFiller.prototype.fill = function(key, err, data) {
      var waiting = this.queues[key];
      delete this.queues[key];
      if (waiting && waiting.length) {
        waiting.forEach(function(task) {
          task.cb(err, data);
        });
      }
    };
    CallbackFiller.prototype.has = function(key) {
      return this.queues[key];
    };
    CallbackFiller.prototype.add = function(key, funcObj) {
      if (this.queues[key]) {
        this.queues[key].push(funcObj);
      } else {
        this.queues[key] = [funcObj];
      }
    };
    module.exports = CallbackFiller;
  }
});

// node_modules/cache-manager/lib/utils.js
var require_utils = __commonJS({
  "node_modules/cache-manager/lib/utils.js"(exports, module) {
    init_esm_shims();
    var isObject2 = function isObject3(value) {
      return value instanceof Object && value.constructor === Object;
    };
    var parseWrapArguments = function parseWrapArguments2(args) {
      var length = args.length;
      var work;
      var options = {};
      var cb;
      for (var i = 0; i < length; i += 1) {
        if (typeof args[i] === "function") {
          if (typeof args[i + 2] === "function") {
            cb = args.pop();
          } else if (typeof args[i + 1] === "function") {
            cb = args.pop();
          }
          if (isObject2(args[i + 1])) {
            options = args.pop();
          }
          work = args.pop();
          break;
        }
      }
      return {
        keys: args,
        work,
        options,
        cb
      };
    };
    module.exports = {
      isObject: isObject2,
      parseWrapArguments
    };
  }
});

// node_modules/cache-manager/lib/caching.js
var require_caching = __commonJS({
  "node_modules/cache-manager/lib/caching.js"(exports, module) {
    init_esm_shims();
    var CallbackFiller = require_callback_filler();
    var utils = require_utils();
    var parseWrapArguments = utils.parseWrapArguments;
    var caching = function(args) {
      args = args || {};
      var self = {};
      if (typeof args.store === "object") {
        if (args.store.create) {
          self.store = args.store.create(args);
        } else {
          self.store = args.store;
        }
      } else {
        var storeName = args.store || "memory";
        self.store = __require("./stores/" + storeName + ".js").create(args);
      }
      self.ignoreCacheErrors = args.ignoreCacheErrors || false;
      self.refreshThreshold = args.refreshThreshold || false;
      var Promise2 = args.promiseDependency || global.Promise;
      var callbackFiller = new CallbackFiller();
      var backgroundQueue = /* @__PURE__ */ new Set();
      if (typeof args.isCacheableValue === "function") {
        self._isCacheableValue = args.isCacheableValue;
      } else if (typeof self.store.isCacheableValue === "function") {
        self._isCacheableValue = self.store.isCacheableValue.bind(self.store);
      } else {
        self._isCacheableValue = function(value) {
          return value !== void 0;
        };
      }
      function wrapPromise(key, promise, options) {
        return new Promise2(function(resolve, reject2) {
          self.wrap(key, function(cb) {
            Promise2.resolve().then(promise).then(function(result) {
              cb(null, result);
              return null;
            }).catch(cb);
          }, options, function(err, result) {
            if (err) {
              return reject2(err);
            }
            resolve(result);
          });
        });
      }
      function handleBackgroundRefresh(key, work, options) {
        if (self.refreshThreshold && !backgroundQueue.has(key)) {
          backgroundQueue.add(key);
          self.checkRefreshThreshold(key, function(err, isExpiring) {
            if (err) {
              backgroundQueue.delete(key);
              return;
            }
            if (isExpiring) {
              work(function(err2, data) {
                if (err2 || !self._isCacheableValue(data)) {
                  backgroundQueue.delete(key);
                  return;
                }
                if (options && typeof options.ttl === "function") {
                  options.ttl = options.ttl(data);
                }
                self.store.set(key, data, options, function() {
                  backgroundQueue.delete(key);
                });
              });
            } else {
              backgroundQueue.delete(key);
            }
          });
        }
      }
      self.checkRefreshThreshold = function(key, cb) {
        if (self.refreshThreshold && typeof self.store.ttl === "function") {
          return self.store.ttl(key, function(ttlErr, ttl) {
            if (ttlErr || typeof ttl !== "number") {
              return cb(new Error("Invalid TTL response"));
            }
            if (self.refreshThreshold > ttl) {
              return cb(null, true);
            }
            return cb(null, false);
          });
        } else {
          return cb(new Error("Unhandled refresh"));
        }
      };
      self.wrap = function() {
        var parsedArgs = parseWrapArguments(Array.prototype.slice.apply(arguments));
        var keys = parsedArgs.keys;
        var work = parsedArgs.work;
        var options = parsedArgs.options;
        var cb = parsedArgs.cb;
        if (!cb) {
          keys.push(work);
          keys.push(options);
          return wrapPromise.apply(this, keys);
        }
        if (keys.length > 1) {
          return wrapMultiple(keys, work, options, cb);
        }
        var key = keys[0];
        var hasKey = callbackFiller.has(key);
        callbackFiller.add(key, { cb });
        if (hasKey) {
          return;
        }
        self.store.get(key, options, function(err, result) {
          if (err && !self.ignoreCacheErrors) {
            callbackFiller.fill(key, err);
          } else if (self._isCacheableValue(result)) {
            handleBackgroundRefresh(key, work, options);
            callbackFiller.fill(key, null, result);
          } else {
            work(function(err2, data) {
              if (err2) {
                callbackFiller.fill(key, err2);
                return;
              }
              if (!self._isCacheableValue(data)) {
                callbackFiller.fill(key, null, data);
                return;
              }
              if (options && typeof options.ttl === "function") {
                options.ttl = options.ttl(data);
              }
              self.store.set(key, data, options, function(err3) {
                if (err3 && !self.ignoreCacheErrors) {
                  callbackFiller.fill(key, err3);
                } else {
                  callbackFiller.fill(key, null, data);
                }
              });
            });
          }
        });
      };
      function wrapMultiple(keys, work, options, cb) {
        var combinedKey = keys.reduce(function(acc, k) {
          return acc + k;
        }, "");
        var hasKey = callbackFiller.has(combinedKey);
        callbackFiller.add(combinedKey, { cb });
        if (hasKey) {
          return;
        }
        keys.push(options);
        keys.push(onResult);
        self.store.mget.apply(self.store, keys);
        function onResult(err, result) {
          if (err && !self.ignoreCacheErrors) {
            return callbackFiller.fill(combinedKey, err);
          }
          var cacheOk = Array.isArray(result) && result.filter(function(_result) {
            return self._isCacheableValue(_result);
          }).length === result.length;
          if (cacheOk) {
            return callbackFiller.fill(combinedKey, null, result);
          }
          return work(function(err2, data) {
            if (err2 || !data) {
              return done(err2);
            }
            var _args = [];
            data.forEach(function(value, i) {
              if (self._isCacheableValue(value)) {
                _args.push(keys[i]);
                _args.push(value);
              }
            });
            if (_args.length === 0) {
              return done(null);
            }
            if (options && typeof options.ttl === "function") {
              options.ttl = options.ttl(data);
            }
            _args.push(options);
            _args.push(done);
            self.store.mset.apply(self.store, _args);
            function done(err3) {
              if (err3 && !self.ignoreCacheErrors) {
                callbackFiller.fill(combinedKey, err3);
              } else {
                callbackFiller.fill(combinedKey, null, data);
              }
            }
          });
        }
      }
      self.get = self.store.get.bind(self.store);
      if (typeof self.store.mget === "function") {
        self.mget = self.store.mget.bind(self.store);
      }
      self.set = self.store.set.bind(self.store);
      if (typeof self.store.mset === "function") {
        self.mset = self.store.mset.bind(self.store);
      }
      if (typeof self.store.del === "function") {
        self.del = self.store.del.bind(self.store);
      }
      if (typeof self.store.setex === "function") {
        self.setex = self.store.setex.bind(self.store);
      }
      if (typeof self.store.reset === "function") {
        self.reset = self.store.reset.bind(self.store);
      }
      if (typeof self.store.keys === "function") {
        self.keys = self.store.keys.bind(self.store);
      }
      if (typeof self.store.ttl === "function") {
        self.ttl = self.store.ttl.bind(self.store);
      }
      return self;
    };
    module.exports = caching;
  }
});

// node_modules/cache-manager/node_modules/async/dist/async.mjs
var async_exports = {};
__export(async_exports, {
  all: () => every$1,
  allLimit: () => everyLimit$1,
  allSeries: () => everySeries$1,
  any: () => some$1,
  anyLimit: () => someLimit$1,
  anySeries: () => someSeries$1,
  apply: () => apply,
  applyEach: () => applyEach$1,
  applyEachSeries: () => applyEachSeries,
  asyncify: () => asyncify,
  auto: () => auto,
  autoInject: () => autoInject,
  cargo: () => cargo,
  cargoQueue: () => cargo$1,
  compose: () => compose,
  concat: () => concat$1,
  concatLimit: () => concatLimit$1,
  concatSeries: () => concatSeries$1,
  constant: () => constant,
  default: () => async_default,
  detect: () => detect$1,
  detectLimit: () => detectLimit$1,
  detectSeries: () => detectSeries$1,
  dir: () => dir,
  doDuring: () => doWhilst$1,
  doUntil: () => doUntil,
  doWhilst: () => doWhilst$1,
  during: () => whilst$1,
  each: () => each,
  eachLimit: () => eachLimit$2,
  eachOf: () => eachOf$1,
  eachOfLimit: () => eachOfLimit$2,
  eachOfSeries: () => eachOfSeries$1,
  eachSeries: () => eachSeries$1,
  ensureAsync: () => ensureAsync,
  every: () => every$1,
  everyLimit: () => everyLimit$1,
  everySeries: () => everySeries$1,
  filter: () => filter$1,
  filterLimit: () => filterLimit$1,
  filterSeries: () => filterSeries$1,
  find: () => detect$1,
  findLimit: () => detectLimit$1,
  findSeries: () => detectSeries$1,
  flatMap: () => concat$1,
  flatMapLimit: () => concatLimit$1,
  flatMapSeries: () => concatSeries$1,
  foldl: () => reduce$1,
  foldr: () => reduceRight,
  forEach: () => each,
  forEachLimit: () => eachLimit$2,
  forEachOf: () => eachOf$1,
  forEachOfLimit: () => eachOfLimit$2,
  forEachOfSeries: () => eachOfSeries$1,
  forEachSeries: () => eachSeries$1,
  forever: () => forever$1,
  groupBy: () => groupBy,
  groupByLimit: () => groupByLimit$1,
  groupBySeries: () => groupBySeries,
  inject: () => reduce$1,
  log: () => log,
  map: () => map$1,
  mapLimit: () => mapLimit$1,
  mapSeries: () => mapSeries$1,
  mapValues: () => mapValues,
  mapValuesLimit: () => mapValuesLimit$1,
  mapValuesSeries: () => mapValuesSeries,
  memoize: () => memoize,
  nextTick: () => nextTick,
  parallel: () => parallel,
  parallelLimit: () => parallelLimit,
  priorityQueue: () => priorityQueue,
  queue: () => queue$1,
  race: () => race$1,
  reduce: () => reduce$1,
  reduceRight: () => reduceRight,
  reflect: () => reflect,
  reflectAll: () => reflectAll,
  reject: () => reject$2,
  rejectLimit: () => rejectLimit$1,
  rejectSeries: () => rejectSeries$1,
  retry: () => retry,
  retryable: () => retryable,
  select: () => filter$1,
  selectLimit: () => filterLimit$1,
  selectSeries: () => filterSeries$1,
  seq: () => seq,
  series: () => series,
  setImmediate: () => setImmediate$1,
  some: () => some$1,
  someLimit: () => someLimit$1,
  someSeries: () => someSeries$1,
  sortBy: () => sortBy$1,
  timeout: () => timeout,
  times: () => times,
  timesLimit: () => timesLimit,
  timesSeries: () => timesSeries,
  transform: () => transform,
  tryEach: () => tryEach$1,
  unmemoize: () => unmemoize,
  until: () => until,
  waterfall: () => waterfall$1,
  whilst: () => whilst$1,
  wrapSync: () => asyncify
});
function apply(fn, ...args) {
  return (...callArgs) => fn(...args, ...callArgs);
}
function initialParams(fn) {
  return function(...args) {
    var callback = args.pop();
    return fn.call(this, args, callback);
  };
}
function fallback(fn) {
  setTimeout(fn, 0);
}
function wrap(defer) {
  return (fn, ...args) => defer(() => fn(...args));
}
function asyncify(func) {
  if (isAsync(func)) {
    return function(...args) {
      const callback = args.pop();
      const promise = func.apply(this, args);
      return handlePromise(promise, callback);
    };
  }
  return initialParams(function(args, callback) {
    var result;
    try {
      result = func.apply(this, args);
    } catch (e) {
      return callback(e);
    }
    if (result && typeof result.then === "function") {
      return handlePromise(result, callback);
    } else {
      callback(null, result);
    }
  });
}
function handlePromise(promise, callback) {
  return promise.then((value) => {
    invokeCallback(callback, null, value);
  }, (err) => {
    invokeCallback(callback, err && err.message ? err : new Error(err));
  });
}
function invokeCallback(callback, error, value) {
  try {
    callback(error, value);
  } catch (err) {
    setImmediate$1((e) => {
      throw e;
    }, err);
  }
}
function isAsync(fn) {
  return fn[Symbol.toStringTag] === "AsyncFunction";
}
function isAsyncGenerator(fn) {
  return fn[Symbol.toStringTag] === "AsyncGenerator";
}
function isAsyncIterable(obj) {
  return typeof obj[Symbol.asyncIterator] === "function";
}
function wrapAsync(asyncFn) {
  if (typeof asyncFn !== "function")
    throw new Error("expected a function");
  return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
}
function awaitify(asyncFn, arity = asyncFn.length) {
  if (!arity)
    throw new Error("arity is undefined");
  function awaitable(...args) {
    if (typeof args[arity - 1] === "function") {
      return asyncFn.apply(this, args);
    }
    return new Promise((resolve, reject2) => {
      args[arity - 1] = (err, ...cbArgs) => {
        if (err)
          return reject2(err);
        resolve(cbArgs.length > 1 ? cbArgs : cbArgs[0]);
      };
      asyncFn.apply(this, args);
    });
  }
  return awaitable;
}
function applyEach(eachfn) {
  return function applyEach2(fns, ...callArgs) {
    const go = awaitify(function(callback) {
      var that = this;
      return eachfn(fns, (fn, cb) => {
        wrapAsync(fn).apply(that, callArgs.concat(cb));
      }, callback);
    });
    return go;
  };
}
function _asyncMap(eachfn, arr, iteratee, callback) {
  arr = arr || [];
  var results = [];
  var counter = 0;
  var _iteratee = wrapAsync(iteratee);
  return eachfn(arr, (value, _, iterCb) => {
    var index2 = counter++;
    _iteratee(value, (err, v) => {
      results[index2] = v;
      iterCb(err);
    });
  }, (err) => {
    callback(err, results);
  });
}
function isArrayLike(value) {
  return value && typeof value.length === "number" && value.length >= 0 && value.length % 1 === 0;
}
function once(fn) {
  function wrapper(...args) {
    if (fn === null)
      return;
    var callFn = fn;
    fn = null;
    callFn.apply(this, args);
  }
  Object.assign(wrapper, fn);
  return wrapper;
}
function getIterator(coll) {
  return coll[Symbol.iterator] && coll[Symbol.iterator]();
}
function createArrayIterator(coll) {
  var i = -1;
  var len = coll.length;
  return function next() {
    return ++i < len ? { value: coll[i], key: i } : null;
  };
}
function createES2015Iterator(iterator) {
  var i = -1;
  return function next() {
    var item = iterator.next();
    if (item.done)
      return null;
    i++;
    return { value: item.value, key: i };
  };
}
function createObjectIterator(obj) {
  var okeys = obj ? Object.keys(obj) : [];
  var i = -1;
  var len = okeys.length;
  return function next() {
    var key = okeys[++i];
    return i < len ? { value: obj[key], key } : null;
  };
}
function createIterator(coll) {
  if (isArrayLike(coll)) {
    return createArrayIterator(coll);
  }
  var iterator = getIterator(coll);
  return iterator ? createES2015Iterator(iterator) : createObjectIterator(coll);
}
function onlyOnce(fn) {
  return function(...args) {
    if (fn === null)
      throw new Error("Callback was already called.");
    var callFn = fn;
    fn = null;
    callFn.apply(this, args);
  };
}
function asyncEachOfLimit(generator, limit, iteratee, callback) {
  let done = false;
  let canceled = false;
  let awaiting = false;
  let running = 0;
  let idx = 0;
  function replenish() {
    if (running >= limit || awaiting || done)
      return;
    awaiting = true;
    generator.next().then(({ value, done: iterDone }) => {
      if (canceled || done)
        return;
      awaiting = false;
      if (iterDone) {
        done = true;
        if (running <= 0) {
          callback(null);
        }
        return;
      }
      running++;
      iteratee(value, idx, iterateeCallback);
      idx++;
      replenish();
    }).catch(handleError);
  }
  function iterateeCallback(err, result) {
    running -= 1;
    if (canceled)
      return;
    if (err)
      return handleError(err);
    if (err === false) {
      done = true;
      canceled = true;
      return;
    }
    if (result === breakLoop || done && running <= 0) {
      done = true;
      return callback(null);
    }
    replenish();
  }
  function handleError(err) {
    if (canceled)
      return;
    awaiting = false;
    done = true;
    callback(err);
  }
  replenish();
}
function eachOfLimit$1(coll, limit, iteratee, callback) {
  return eachOfLimit(limit)(coll, wrapAsync(iteratee), callback);
}
function eachOfArrayLike(coll, iteratee, callback) {
  callback = once(callback);
  var index2 = 0, completed = 0, { length } = coll, canceled = false;
  if (length === 0) {
    callback(null);
  }
  function iteratorCallback(err, value) {
    if (err === false) {
      canceled = true;
    }
    if (canceled === true)
      return;
    if (err) {
      callback(err);
    } else if (++completed === length || value === breakLoop) {
      callback(null);
    }
  }
  for (; index2 < length; index2++) {
    iteratee(coll[index2], index2, onlyOnce(iteratorCallback));
  }
}
function eachOfGeneric(coll, iteratee, callback) {
  return eachOfLimit$2(coll, Infinity, iteratee, callback);
}
function eachOf(coll, iteratee, callback) {
  var eachOfImplementation = isArrayLike(coll) ? eachOfArrayLike : eachOfGeneric;
  return eachOfImplementation(coll, wrapAsync(iteratee), callback);
}
function map(coll, iteratee, callback) {
  return _asyncMap(eachOf$1, coll, iteratee, callback);
}
function eachOfSeries(coll, iteratee, callback) {
  return eachOfLimit$2(coll, 1, iteratee, callback);
}
function mapSeries(coll, iteratee, callback) {
  return _asyncMap(eachOfSeries$1, coll, iteratee, callback);
}
function promiseCallback() {
  let resolve, reject2;
  function callback(err, ...args) {
    if (err)
      return reject2(err);
    resolve(args.length > 1 ? args : args[0]);
  }
  callback[PROMISE_SYMBOL] = new Promise((res, rej) => {
    resolve = res, reject2 = rej;
  });
  return callback;
}
function auto(tasks, concurrency, callback) {
  if (typeof concurrency !== "number") {
    callback = concurrency;
    concurrency = null;
  }
  callback = once(callback || promiseCallback());
  var numTasks = Object.keys(tasks).length;
  if (!numTasks) {
    return callback(null);
  }
  if (!concurrency) {
    concurrency = numTasks;
  }
  var results = {};
  var runningTasks = 0;
  var canceled = false;
  var hasError = false;
  var listeners = /* @__PURE__ */ Object.create(null);
  var readyTasks = [];
  var readyToCheck = [];
  var uncheckedDependencies = {};
  Object.keys(tasks).forEach((key) => {
    var task = tasks[key];
    if (!Array.isArray(task)) {
      enqueueTask(key, [task]);
      readyToCheck.push(key);
      return;
    }
    var dependencies = task.slice(0, task.length - 1);
    var remainingDependencies = dependencies.length;
    if (remainingDependencies === 0) {
      enqueueTask(key, task);
      readyToCheck.push(key);
      return;
    }
    uncheckedDependencies[key] = remainingDependencies;
    dependencies.forEach((dependencyName) => {
      if (!tasks[dependencyName]) {
        throw new Error("async.auto task `" + key + "` has a non-existent dependency `" + dependencyName + "` in " + dependencies.join(", "));
      }
      addListener(dependencyName, () => {
        remainingDependencies--;
        if (remainingDependencies === 0) {
          enqueueTask(key, task);
        }
      });
    });
  });
  checkForDeadlocks();
  processQueue();
  function enqueueTask(key, task) {
    readyTasks.push(() => runTask(key, task));
  }
  function processQueue() {
    if (canceled)
      return;
    if (readyTasks.length === 0 && runningTasks === 0) {
      return callback(null, results);
    }
    while (readyTasks.length && runningTasks < concurrency) {
      var run = readyTasks.shift();
      run();
    }
  }
  function addListener(taskName, fn) {
    var taskListeners = listeners[taskName];
    if (!taskListeners) {
      taskListeners = listeners[taskName] = [];
    }
    taskListeners.push(fn);
  }
  function taskComplete(taskName) {
    var taskListeners = listeners[taskName] || [];
    taskListeners.forEach((fn) => fn());
    processQueue();
  }
  function runTask(key, task) {
    if (hasError)
      return;
    var taskCallback = onlyOnce((err, ...result) => {
      runningTasks--;
      if (err === false) {
        canceled = true;
        return;
      }
      if (result.length < 2) {
        [result] = result;
      }
      if (err) {
        var safeResults = {};
        Object.keys(results).forEach((rkey) => {
          safeResults[rkey] = results[rkey];
        });
        safeResults[key] = result;
        hasError = true;
        listeners = /* @__PURE__ */ Object.create(null);
        if (canceled)
          return;
        callback(err, safeResults);
      } else {
        results[key] = result;
        taskComplete(key);
      }
    });
    runningTasks++;
    var taskFn = wrapAsync(task[task.length - 1]);
    if (task.length > 1) {
      taskFn(results, taskCallback);
    } else {
      taskFn(taskCallback);
    }
  }
  function checkForDeadlocks() {
    var currentTask;
    var counter = 0;
    while (readyToCheck.length) {
      currentTask = readyToCheck.pop();
      counter++;
      getDependents(currentTask).forEach((dependent) => {
        if (--uncheckedDependencies[dependent] === 0) {
          readyToCheck.push(dependent);
        }
      });
    }
    if (counter !== numTasks) {
      throw new Error("async.auto cannot execute tasks due to a recursive dependency");
    }
  }
  function getDependents(taskName) {
    var result = [];
    Object.keys(tasks).forEach((key) => {
      const task = tasks[key];
      if (Array.isArray(task) && task.indexOf(taskName) >= 0) {
        result.push(key);
      }
    });
    return result;
  }
  return callback[PROMISE_SYMBOL];
}
function parseParams(func) {
  const src = func.toString().replace(STRIP_COMMENTS, "");
  let match = src.match(FN_ARGS);
  if (!match) {
    match = src.match(ARROW_FN_ARGS);
  }
  if (!match)
    throw new Error("could not parse args in autoInject\nSource:\n" + src);
  let [, args] = match;
  return args.replace(/\s/g, "").split(FN_ARG_SPLIT).map((arg) => arg.replace(FN_ARG, "").trim());
}
function autoInject(tasks, callback) {
  var newTasks = {};
  Object.keys(tasks).forEach((key) => {
    var taskFn = tasks[key];
    var params;
    var fnIsAsync = isAsync(taskFn);
    var hasNoDeps = !fnIsAsync && taskFn.length === 1 || fnIsAsync && taskFn.length === 0;
    if (Array.isArray(taskFn)) {
      params = [...taskFn];
      taskFn = params.pop();
      newTasks[key] = params.concat(params.length > 0 ? newTask : taskFn);
    } else if (hasNoDeps) {
      newTasks[key] = taskFn;
    } else {
      params = parseParams(taskFn);
      if (taskFn.length === 0 && !fnIsAsync && params.length === 0) {
        throw new Error("autoInject task functions require explicit parameters.");
      }
      if (!fnIsAsync)
        params.pop();
      newTasks[key] = params.concat(newTask);
    }
    function newTask(results, taskCb) {
      var newArgs = params.map((name) => results[name]);
      newArgs.push(taskCb);
      wrapAsync(taskFn)(...newArgs);
    }
  });
  return auto(newTasks, callback);
}
function setInitial(dll, node) {
  dll.length = 1;
  dll.head = dll.tail = node;
}
function queue(worker, concurrency, payload) {
  if (concurrency == null) {
    concurrency = 1;
  } else if (concurrency === 0) {
    throw new RangeError("Concurrency must not be zero");
  }
  var _worker = wrapAsync(worker);
  var numRunning = 0;
  var workersList = [];
  const events = {
    error: [],
    drain: [],
    saturated: [],
    unsaturated: [],
    empty: []
  };
  function on(event, handler) {
    events[event].push(handler);
  }
  function once2(event, handler) {
    const handleAndRemove = (...args) => {
      off(event, handleAndRemove);
      handler(...args);
    };
    events[event].push(handleAndRemove);
  }
  function off(event, handler) {
    if (!event)
      return Object.keys(events).forEach((ev) => events[ev] = []);
    if (!handler)
      return events[event] = [];
    events[event] = events[event].filter((ev) => ev !== handler);
  }
  function trigger(event, ...args) {
    events[event].forEach((handler) => handler(...args));
  }
  var processingScheduled = false;
  function _insert(data, insertAtFront, rejectOnError, callback) {
    if (callback != null && typeof callback !== "function") {
      throw new Error("task callback must be a function");
    }
    q.started = true;
    var res, rej;
    function promiseCallback2(err, ...args) {
      if (err)
        return rejectOnError ? rej(err) : res();
      if (args.length <= 1)
        return res(args[0]);
      res(args);
    }
    var item = {
      data,
      callback: rejectOnError ? promiseCallback2 : callback || promiseCallback2
    };
    if (insertAtFront) {
      q._tasks.unshift(item);
    } else {
      q._tasks.push(item);
    }
    if (!processingScheduled) {
      processingScheduled = true;
      setImmediate$1(() => {
        processingScheduled = false;
        q.process();
      });
    }
    if (rejectOnError || !callback) {
      return new Promise((resolve, reject2) => {
        res = resolve;
        rej = reject2;
      });
    }
  }
  function _createCB(tasks) {
    return function(err, ...args) {
      numRunning -= 1;
      for (var i = 0, l = tasks.length; i < l; i++) {
        var task = tasks[i];
        var index2 = workersList.indexOf(task);
        if (index2 === 0) {
          workersList.shift();
        } else if (index2 > 0) {
          workersList.splice(index2, 1);
        }
        task.callback(err, ...args);
        if (err != null) {
          trigger("error", err, task.data);
        }
      }
      if (numRunning <= q.concurrency - q.buffer) {
        trigger("unsaturated");
      }
      if (q.idle()) {
        trigger("drain");
      }
      q.process();
    };
  }
  function _maybeDrain(data) {
    if (data.length === 0 && q.idle()) {
      setImmediate$1(() => trigger("drain"));
      return true;
    }
    return false;
  }
  const eventMethod = (name) => (handler) => {
    if (!handler) {
      return new Promise((resolve, reject2) => {
        once2(name, (err, data) => {
          if (err)
            return reject2(err);
          resolve(data);
        });
      });
    }
    off(name);
    on(name, handler);
  };
  var isProcessing = false;
  var q = {
    _tasks: new DLL(),
    *[Symbol.iterator]() {
      yield* q._tasks[Symbol.iterator]();
    },
    concurrency,
    payload,
    buffer: concurrency / 4,
    started: false,
    paused: false,
    push(data, callback) {
      if (Array.isArray(data)) {
        if (_maybeDrain(data))
          return;
        return data.map((datum) => _insert(datum, false, false, callback));
      }
      return _insert(data, false, false, callback);
    },
    pushAsync(data, callback) {
      if (Array.isArray(data)) {
        if (_maybeDrain(data))
          return;
        return data.map((datum) => _insert(datum, false, true, callback));
      }
      return _insert(data, false, true, callback);
    },
    kill() {
      off();
      q._tasks.empty();
    },
    unshift(data, callback) {
      if (Array.isArray(data)) {
        if (_maybeDrain(data))
          return;
        return data.map((datum) => _insert(datum, true, false, callback));
      }
      return _insert(data, true, false, callback);
    },
    unshiftAsync(data, callback) {
      if (Array.isArray(data)) {
        if (_maybeDrain(data))
          return;
        return data.map((datum) => _insert(datum, true, true, callback));
      }
      return _insert(data, true, true, callback);
    },
    remove(testFn) {
      q._tasks.remove(testFn);
    },
    process() {
      if (isProcessing) {
        return;
      }
      isProcessing = true;
      while (!q.paused && numRunning < q.concurrency && q._tasks.length) {
        var tasks = [], data = [];
        var l = q._tasks.length;
        if (q.payload)
          l = Math.min(l, q.payload);
        for (var i = 0; i < l; i++) {
          var node = q._tasks.shift();
          tasks.push(node);
          workersList.push(node);
          data.push(node.data);
        }
        numRunning += 1;
        if (q._tasks.length === 0) {
          trigger("empty");
        }
        if (numRunning === q.concurrency) {
          trigger("saturated");
        }
        var cb = onlyOnce(_createCB(tasks));
        _worker(data, cb);
      }
      isProcessing = false;
    },
    length() {
      return q._tasks.length;
    },
    running() {
      return numRunning;
    },
    workersList() {
      return workersList;
    },
    idle() {
      return q._tasks.length + numRunning === 0;
    },
    pause() {
      q.paused = true;
    },
    resume() {
      if (q.paused === false) {
        return;
      }
      q.paused = false;
      setImmediate$1(q.process);
    }
  };
  Object.defineProperties(q, {
    saturated: {
      writable: false,
      value: eventMethod("saturated")
    },
    unsaturated: {
      writable: false,
      value: eventMethod("unsaturated")
    },
    empty: {
      writable: false,
      value: eventMethod("empty")
    },
    drain: {
      writable: false,
      value: eventMethod("drain")
    },
    error: {
      writable: false,
      value: eventMethod("error")
    }
  });
  return q;
}
function cargo(worker, payload) {
  return queue(worker, 1, payload);
}
function cargo$1(worker, concurrency, payload) {
  return queue(worker, concurrency, payload);
}
function reduce(coll, memo, iteratee, callback) {
  callback = once(callback);
  var _iteratee = wrapAsync(iteratee);
  return eachOfSeries$1(coll, (x, i, iterCb) => {
    _iteratee(memo, x, (err, v) => {
      memo = v;
      iterCb(err);
    });
  }, (err) => callback(err, memo));
}
function seq(...functions) {
  var _functions = functions.map(wrapAsync);
  return function(...args) {
    var that = this;
    var cb = args[args.length - 1];
    if (typeof cb == "function") {
      args.pop();
    } else {
      cb = promiseCallback();
    }
    reduce$1(_functions, args, (newargs, fn, iterCb) => {
      fn.apply(that, newargs.concat((err, ...nextargs) => {
        iterCb(err, nextargs);
      }));
    }, (err, results) => cb(err, ...results));
    return cb[PROMISE_SYMBOL];
  };
}
function compose(...args) {
  return seq(...args.reverse());
}
function mapLimit(coll, limit, iteratee, callback) {
  return _asyncMap(eachOfLimit(limit), coll, iteratee, callback);
}
function concatLimit(coll, limit, iteratee, callback) {
  var _iteratee = wrapAsync(iteratee);
  return mapLimit$1(coll, limit, (val, iterCb) => {
    _iteratee(val, (err, ...args) => {
      if (err)
        return iterCb(err);
      return iterCb(err, args);
    });
  }, (err, mapResults) => {
    var result = [];
    for (var i = 0; i < mapResults.length; i++) {
      if (mapResults[i]) {
        result = result.concat(...mapResults[i]);
      }
    }
    return callback(err, result);
  });
}
function concat(coll, iteratee, callback) {
  return concatLimit$1(coll, Infinity, iteratee, callback);
}
function concatSeries(coll, iteratee, callback) {
  return concatLimit$1(coll, 1, iteratee, callback);
}
function constant(...args) {
  return function(...ignoredArgs) {
    var callback = ignoredArgs.pop();
    return callback(null, ...args);
  };
}
function _createTester(check, getResult) {
  return (eachfn, arr, _iteratee, cb) => {
    var testPassed = false;
    var testResult;
    const iteratee = wrapAsync(_iteratee);
    eachfn(arr, (value, _, callback) => {
      iteratee(value, (err, result) => {
        if (err || err === false)
          return callback(err);
        if (check(result) && !testResult) {
          testPassed = true;
          testResult = getResult(true, value);
          return callback(null, breakLoop);
        }
        callback();
      });
    }, (err) => {
      if (err)
        return cb(err);
      cb(null, testPassed ? testResult : getResult(false));
    });
  };
}
function detect(coll, iteratee, callback) {
  return _createTester((bool) => bool, (res, item) => item)(eachOf$1, coll, iteratee, callback);
}
function detectLimit(coll, limit, iteratee, callback) {
  return _createTester((bool) => bool, (res, item) => item)(eachOfLimit(limit), coll, iteratee, callback);
}
function detectSeries(coll, iteratee, callback) {
  return _createTester((bool) => bool, (res, item) => item)(eachOfLimit(1), coll, iteratee, callback);
}
function consoleFunc(name) {
  return (fn, ...args) => wrapAsync(fn)(...args, (err, ...resultArgs) => {
    if (typeof console === "object") {
      if (err) {
        if (console.error) {
          console.error(err);
        }
      } else if (console[name]) {
        resultArgs.forEach((x) => console[name](x));
      }
    }
  });
}
function doWhilst(iteratee, test, callback) {
  callback = onlyOnce(callback);
  var _fn = wrapAsync(iteratee);
  var _test = wrapAsync(test);
  var results;
  function next(err, ...args) {
    if (err)
      return callback(err);
    if (err === false)
      return;
    results = args;
    _test(...args, check);
  }
  function check(err, truth) {
    if (err)
      return callback(err);
    if (err === false)
      return;
    if (!truth)
      return callback(null, ...results);
    _fn(next);
  }
  return check(null, true);
}
function doUntil(iteratee, test, callback) {
  const _test = wrapAsync(test);
  return doWhilst$1(iteratee, (...args) => {
    const cb = args.pop();
    _test(...args, (err, truth) => cb(err, !truth));
  }, callback);
}
function _withoutIndex(iteratee) {
  return (value, index2, callback) => iteratee(value, callback);
}
function eachLimit(coll, iteratee, callback) {
  return eachOf$1(coll, _withoutIndex(wrapAsync(iteratee)), callback);
}
function eachLimit$1(coll, limit, iteratee, callback) {
  return eachOfLimit(limit)(coll, _withoutIndex(wrapAsync(iteratee)), callback);
}
function eachSeries(coll, iteratee, callback) {
  return eachLimit$2(coll, 1, iteratee, callback);
}
function ensureAsync(fn) {
  if (isAsync(fn))
    return fn;
  return function(...args) {
    var callback = args.pop();
    var sync = true;
    args.push((...innerArgs) => {
      if (sync) {
        setImmediate$1(() => callback(...innerArgs));
      } else {
        callback(...innerArgs);
      }
    });
    fn.apply(this, args);
    sync = false;
  };
}
function every(coll, iteratee, callback) {
  return _createTester((bool) => !bool, (res) => !res)(eachOf$1, coll, iteratee, callback);
}
function everyLimit(coll, limit, iteratee, callback) {
  return _createTester((bool) => !bool, (res) => !res)(eachOfLimit(limit), coll, iteratee, callback);
}
function everySeries(coll, iteratee, callback) {
  return _createTester((bool) => !bool, (res) => !res)(eachOfSeries$1, coll, iteratee, callback);
}
function filterArray(eachfn, arr, iteratee, callback) {
  var truthValues = new Array(arr.length);
  eachfn(arr, (x, index2, iterCb) => {
    iteratee(x, (err, v) => {
      truthValues[index2] = !!v;
      iterCb(err);
    });
  }, (err) => {
    if (err)
      return callback(err);
    var results = [];
    for (var i = 0; i < arr.length; i++) {
      if (truthValues[i])
        results.push(arr[i]);
    }
    callback(null, results);
  });
}
function filterGeneric(eachfn, coll, iteratee, callback) {
  var results = [];
  eachfn(coll, (x, index2, iterCb) => {
    iteratee(x, (err, v) => {
      if (err)
        return iterCb(err);
      if (v) {
        results.push({ index: index2, value: x });
      }
      iterCb(err);
    });
  }, (err) => {
    if (err)
      return callback(err);
    callback(null, results.sort((a, b) => a.index - b.index).map((v) => v.value));
  });
}
function _filter(eachfn, coll, iteratee, callback) {
  var filter2 = isArrayLike(coll) ? filterArray : filterGeneric;
  return filter2(eachfn, coll, wrapAsync(iteratee), callback);
}
function filter(coll, iteratee, callback) {
  return _filter(eachOf$1, coll, iteratee, callback);
}
function filterLimit(coll, limit, iteratee, callback) {
  return _filter(eachOfLimit(limit), coll, iteratee, callback);
}
function filterSeries(coll, iteratee, callback) {
  return _filter(eachOfSeries$1, coll, iteratee, callback);
}
function forever(fn, errback) {
  var done = onlyOnce(errback);
  var task = wrapAsync(ensureAsync(fn));
  function next(err) {
    if (err)
      return done(err);
    if (err === false)
      return;
    task(next);
  }
  return next();
}
function groupByLimit(coll, limit, iteratee, callback) {
  var _iteratee = wrapAsync(iteratee);
  return mapLimit$1(coll, limit, (val, iterCb) => {
    _iteratee(val, (err, key) => {
      if (err)
        return iterCb(err);
      return iterCb(err, { key, val });
    });
  }, (err, mapResults) => {
    var result = {};
    var { hasOwnProperty } = Object.prototype;
    for (var i = 0; i < mapResults.length; i++) {
      if (mapResults[i]) {
        var { key } = mapResults[i];
        var { val } = mapResults[i];
        if (hasOwnProperty.call(result, key)) {
          result[key].push(val);
        } else {
          result[key] = [val];
        }
      }
    }
    return callback(err, result);
  });
}
function groupBy(coll, iteratee, callback) {
  return groupByLimit$1(coll, Infinity, iteratee, callback);
}
function groupBySeries(coll, iteratee, callback) {
  return groupByLimit$1(coll, 1, iteratee, callback);
}
function mapValuesLimit(obj, limit, iteratee, callback) {
  callback = once(callback);
  var newObj = {};
  var _iteratee = wrapAsync(iteratee);
  return eachOfLimit(limit)(obj, (val, key, next) => {
    _iteratee(val, key, (err, result) => {
      if (err)
        return next(err);
      newObj[key] = result;
      next(err);
    });
  }, (err) => callback(err, newObj));
}
function mapValues(obj, iteratee, callback) {
  return mapValuesLimit$1(obj, Infinity, iteratee, callback);
}
function mapValuesSeries(obj, iteratee, callback) {
  return mapValuesLimit$1(obj, 1, iteratee, callback);
}
function memoize(fn, hasher = (v) => v) {
  var memo = /* @__PURE__ */ Object.create(null);
  var queues = /* @__PURE__ */ Object.create(null);
  var _fn = wrapAsync(fn);
  var memoized = initialParams((args, callback) => {
    var key = hasher(...args);
    if (key in memo) {
      setImmediate$1(() => callback(null, ...memo[key]));
    } else if (key in queues) {
      queues[key].push(callback);
    } else {
      queues[key] = [callback];
      _fn(...args, (err, ...resultArgs) => {
        if (!err) {
          memo[key] = resultArgs;
        }
        var q = queues[key];
        delete queues[key];
        for (var i = 0, l = q.length; i < l; i++) {
          q[i](err, ...resultArgs);
        }
      });
    }
  });
  memoized.memo = memo;
  memoized.unmemoized = fn;
  return memoized;
}
function parallel(tasks, callback) {
  return _parallel(eachOf$1, tasks, callback);
}
function parallelLimit(tasks, limit, callback) {
  return _parallel(eachOfLimit(limit), tasks, callback);
}
function queue$1(worker, concurrency) {
  var _worker = wrapAsync(worker);
  return queue((items, cb) => {
    _worker(items[0], cb);
  }, concurrency, 1);
}
function leftChi(i) {
  return (i << 1) + 1;
}
function parent(i) {
  return (i + 1 >> 1) - 1;
}
function smaller(x, y) {
  if (x.priority !== y.priority) {
    return x.priority < y.priority;
  } else {
    return x.pushCount < y.pushCount;
  }
}
function priorityQueue(worker, concurrency) {
  var q = queue$1(worker, concurrency);
  q._tasks = new Heap();
  q.push = function(data, priority = 0, callback = () => {
  }) {
    if (typeof callback !== "function") {
      throw new Error("task callback must be a function");
    }
    q.started = true;
    if (!Array.isArray(data)) {
      data = [data];
    }
    if (data.length === 0 && q.idle()) {
      return setImmediate$1(() => q.drain());
    }
    for (var i = 0, l = data.length; i < l; i++) {
      var item = {
        data: data[i],
        priority,
        callback
      };
      q._tasks.push(item);
    }
    setImmediate$1(q.process);
  };
  delete q.unshift;
  return q;
}
function race(tasks, callback) {
  callback = once(callback);
  if (!Array.isArray(tasks))
    return callback(new TypeError("First argument to race must be an array of functions"));
  if (!tasks.length)
    return callback();
  for (var i = 0, l = tasks.length; i < l; i++) {
    wrapAsync(tasks[i])(callback);
  }
}
function reduceRight(array, memo, iteratee, callback) {
  var reversed = [...array].reverse();
  return reduce$1(reversed, memo, iteratee, callback);
}
function reflect(fn) {
  var _fn = wrapAsync(fn);
  return initialParams(function reflectOn(args, reflectCallback) {
    args.push((error, ...cbArgs) => {
      let retVal = {};
      if (error) {
        retVal.error = error;
      }
      if (cbArgs.length > 0) {
        var value = cbArgs;
        if (cbArgs.length <= 1) {
          [value] = cbArgs;
        }
        retVal.value = value;
      }
      reflectCallback(null, retVal);
    });
    return _fn.apply(this, args);
  });
}
function reflectAll(tasks) {
  var results;
  if (Array.isArray(tasks)) {
    results = tasks.map(reflect);
  } else {
    results = {};
    Object.keys(tasks).forEach((key) => {
      results[key] = reflect.call(this, tasks[key]);
    });
  }
  return results;
}
function reject(eachfn, arr, _iteratee, callback) {
  const iteratee = wrapAsync(_iteratee);
  return _filter(eachfn, arr, (value, cb) => {
    iteratee(value, (err, v) => {
      cb(err, !v);
    });
  }, callback);
}
function reject$1(coll, iteratee, callback) {
  return reject(eachOf$1, coll, iteratee, callback);
}
function rejectLimit(coll, limit, iteratee, callback) {
  return reject(eachOfLimit(limit), coll, iteratee, callback);
}
function rejectSeries(coll, iteratee, callback) {
  return reject(eachOfSeries$1, coll, iteratee, callback);
}
function constant$1(value) {
  return function() {
    return value;
  };
}
function retry(opts, task, callback) {
  var options = {
    times: DEFAULT_TIMES,
    intervalFunc: constant$1(DEFAULT_INTERVAL)
  };
  if (arguments.length < 3 && typeof opts === "function") {
    callback = task || promiseCallback();
    task = opts;
  } else {
    parseTimes(options, opts);
    callback = callback || promiseCallback();
  }
  if (typeof task !== "function") {
    throw new Error("Invalid arguments for async.retry");
  }
  var _task = wrapAsync(task);
  var attempt = 1;
  function retryAttempt() {
    _task((err, ...args) => {
      if (err === false)
        return;
      if (err && attempt++ < options.times && (typeof options.errorFilter != "function" || options.errorFilter(err))) {
        setTimeout(retryAttempt, options.intervalFunc(attempt - 1));
      } else {
        callback(err, ...args);
      }
    });
  }
  retryAttempt();
  return callback[PROMISE_SYMBOL];
}
function parseTimes(acc, t) {
  if (typeof t === "object") {
    acc.times = +t.times || DEFAULT_TIMES;
    acc.intervalFunc = typeof t.interval === "function" ? t.interval : constant$1(+t.interval || DEFAULT_INTERVAL);
    acc.errorFilter = t.errorFilter;
  } else if (typeof t === "number" || typeof t === "string") {
    acc.times = +t || DEFAULT_TIMES;
  } else {
    throw new Error("Invalid arguments for async.retry");
  }
}
function retryable(opts, task) {
  if (!task) {
    task = opts;
    opts = null;
  }
  let arity = opts && opts.arity || task.length;
  if (isAsync(task)) {
    arity += 1;
  }
  var _task = wrapAsync(task);
  return initialParams((args, callback) => {
    if (args.length < arity - 1 || callback == null) {
      args.push(callback);
      callback = promiseCallback();
    }
    function taskFn(cb) {
      _task(...args, cb);
    }
    if (opts)
      retry(opts, taskFn, callback);
    else
      retry(taskFn, callback);
    return callback[PROMISE_SYMBOL];
  });
}
function series(tasks, callback) {
  return _parallel(eachOfSeries$1, tasks, callback);
}
function some(coll, iteratee, callback) {
  return _createTester(Boolean, (res) => res)(eachOf$1, coll, iteratee, callback);
}
function someLimit(coll, limit, iteratee, callback) {
  return _createTester(Boolean, (res) => res)(eachOfLimit(limit), coll, iteratee, callback);
}
function someSeries(coll, iteratee, callback) {
  return _createTester(Boolean, (res) => res)(eachOfSeries$1, coll, iteratee, callback);
}
function sortBy(coll, iteratee, callback) {
  var _iteratee = wrapAsync(iteratee);
  return map$1(coll, (x, iterCb) => {
    _iteratee(x, (err, criteria) => {
      if (err)
        return iterCb(err);
      iterCb(err, { value: x, criteria });
    });
  }, (err, results) => {
    if (err)
      return callback(err);
    callback(null, results.sort(comparator).map((v) => v.value));
  });
  function comparator(left, right) {
    var a = left.criteria, b = right.criteria;
    return a < b ? -1 : a > b ? 1 : 0;
  }
}
function timeout(asyncFn, milliseconds, info) {
  var fn = wrapAsync(asyncFn);
  return initialParams((args, callback) => {
    var timedOut = false;
    var timer;
    function timeoutCallback() {
      var name = asyncFn.name || "anonymous";
      var error = new Error('Callback function "' + name + '" timed out.');
      error.code = "ETIMEDOUT";
      if (info) {
        error.info = info;
      }
      timedOut = true;
      callback(error);
    }
    args.push((...cbArgs) => {
      if (!timedOut) {
        callback(...cbArgs);
        clearTimeout(timer);
      }
    });
    timer = setTimeout(timeoutCallback, milliseconds);
    fn(...args);
  });
}
function range(size) {
  var result = Array(size);
  while (size--) {
    result[size] = size;
  }
  return result;
}
function timesLimit(count, limit, iteratee, callback) {
  var _iteratee = wrapAsync(iteratee);
  return mapLimit$1(range(count), limit, _iteratee, callback);
}
function times(n, iteratee, callback) {
  return timesLimit(n, Infinity, iteratee, callback);
}
function timesSeries(n, iteratee, callback) {
  return timesLimit(n, 1, iteratee, callback);
}
function transform(coll, accumulator, iteratee, callback) {
  if (arguments.length <= 3 && typeof accumulator === "function") {
    callback = iteratee;
    iteratee = accumulator;
    accumulator = Array.isArray(coll) ? [] : {};
  }
  callback = once(callback || promiseCallback());
  var _iteratee = wrapAsync(iteratee);
  eachOf$1(coll, (v, k, cb) => {
    _iteratee(accumulator, v, k, cb);
  }, (err) => callback(err, accumulator));
  return callback[PROMISE_SYMBOL];
}
function tryEach(tasks, callback) {
  var error = null;
  var result;
  return eachSeries$1(tasks, (task, taskCb) => {
    wrapAsync(task)((err, ...args) => {
      if (err === false)
        return taskCb(err);
      if (args.length < 2) {
        [result] = args;
      } else {
        result = args;
      }
      error = err;
      taskCb(err ? null : {});
    });
  }, () => callback(error, result));
}
function unmemoize(fn) {
  return (...args) => {
    return (fn.unmemoized || fn)(...args);
  };
}
function whilst(test, iteratee, callback) {
  callback = onlyOnce(callback);
  var _fn = wrapAsync(iteratee);
  var _test = wrapAsync(test);
  var results = [];
  function next(err, ...rest) {
    if (err)
      return callback(err);
    results = rest;
    if (err === false)
      return;
    _test(check);
  }
  function check(err, truth) {
    if (err)
      return callback(err);
    if (err === false)
      return;
    if (!truth)
      return callback(null, ...results);
    _fn(next);
  }
  return _test(check);
}
function until(test, iteratee, callback) {
  const _test = wrapAsync(test);
  return whilst$1((cb) => _test((err, truth) => cb(err, !truth)), iteratee, callback);
}
function waterfall(tasks, callback) {
  callback = once(callback);
  if (!Array.isArray(tasks))
    return callback(new Error("First argument to waterfall must be an array of functions"));
  if (!tasks.length)
    return callback();
  var taskIndex = 0;
  function nextTask(args) {
    var task = wrapAsync(tasks[taskIndex++]);
    task(...args, onlyOnce(next));
  }
  function next(err, ...args) {
    if (err === false)
      return;
    if (err || taskIndex === tasks.length) {
      return callback(err, ...args);
    }
    nextTask(args);
  }
  nextTask([]);
}
var hasSetImmediate, hasNextTick, _defer, setImmediate$1, breakLoop, eachOfLimit, eachOfLimit$2, eachOf$1, map$1, applyEach$1, eachOfSeries$1, mapSeries$1, applyEachSeries, PROMISE_SYMBOL, FN_ARGS, ARROW_FN_ARGS, FN_ARG_SPLIT, FN_ARG, STRIP_COMMENTS, DLL, reduce$1, mapLimit$1, concatLimit$1, concat$1, concatSeries$1, detect$1, detectLimit$1, detectSeries$1, dir, doWhilst$1, each, eachLimit$2, eachSeries$1, every$1, everyLimit$1, everySeries$1, filter$1, filterLimit$1, filterSeries$1, forever$1, groupByLimit$1, log, mapValuesLimit$1, _defer$1, nextTick, _parallel, Heap, race$1, reject$2, rejectLimit$1, rejectSeries$1, DEFAULT_TIMES, DEFAULT_INTERVAL, some$1, someLimit$1, someSeries$1, sortBy$1, tryEach$1, whilst$1, waterfall$1, index, async_default;
var init_async = __esm({
  "node_modules/cache-manager/node_modules/async/dist/async.mjs"() {
    init_esm_shims();
    hasSetImmediate = typeof setImmediate === "function" && setImmediate;
    hasNextTick = typeof process === "object" && typeof process.nextTick === "function";
    if (hasSetImmediate) {
      _defer = setImmediate;
    } else if (hasNextTick) {
      _defer = process.nextTick;
    } else {
      _defer = fallback;
    }
    setImmediate$1 = wrap(_defer);
    breakLoop = {};
    eachOfLimit = (limit) => {
      return (obj, iteratee, callback) => {
        callback = once(callback);
        if (limit <= 0) {
          throw new RangeError("concurrency limit cannot be less than 1");
        }
        if (!obj) {
          return callback(null);
        }
        if (isAsyncGenerator(obj)) {
          return asyncEachOfLimit(obj, limit, iteratee, callback);
        }
        if (isAsyncIterable(obj)) {
          return asyncEachOfLimit(obj[Symbol.asyncIterator](), limit, iteratee, callback);
        }
        var nextElem = createIterator(obj);
        var done = false;
        var canceled = false;
        var running = 0;
        var looping = false;
        function iterateeCallback(err, value) {
          if (canceled)
            return;
          running -= 1;
          if (err) {
            done = true;
            callback(err);
          } else if (err === false) {
            done = true;
            canceled = true;
          } else if (value === breakLoop || done && running <= 0) {
            done = true;
            return callback(null);
          } else if (!looping) {
            replenish();
          }
        }
        function replenish() {
          looping = true;
          while (running < limit && !done) {
            var elem = nextElem();
            if (elem === null) {
              done = true;
              if (running <= 0) {
                callback(null);
              }
              return;
            }
            running += 1;
            iteratee(elem.value, elem.key, onlyOnce(iterateeCallback));
          }
          looping = false;
        }
        replenish();
      };
    };
    eachOfLimit$2 = awaitify(eachOfLimit$1, 4);
    eachOf$1 = awaitify(eachOf, 3);
    map$1 = awaitify(map, 3);
    applyEach$1 = applyEach(map$1);
    eachOfSeries$1 = awaitify(eachOfSeries, 3);
    mapSeries$1 = awaitify(mapSeries, 3);
    applyEachSeries = applyEach(mapSeries$1);
    PROMISE_SYMBOL = Symbol("promiseCallback");
    FN_ARGS = /^(?:async\s+)?(?:function)?\s*\w*\s*\(\s*([^)]+)\s*\)(?:\s*{)/;
    ARROW_FN_ARGS = /^(?:async\s+)?\(?\s*([^)=]+)\s*\)?(?:\s*=>)/;
    FN_ARG_SPLIT = /,/;
    FN_ARG = /(=.+)?(\s*)$/;
    STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    DLL = class {
      constructor() {
        this.head = this.tail = null;
        this.length = 0;
      }
      removeLink(node) {
        if (node.prev)
          node.prev.next = node.next;
        else
          this.head = node.next;
        if (node.next)
          node.next.prev = node.prev;
        else
          this.tail = node.prev;
        node.prev = node.next = null;
        this.length -= 1;
        return node;
      }
      empty() {
        while (this.head)
          this.shift();
        return this;
      }
      insertAfter(node, newNode) {
        newNode.prev = node;
        newNode.next = node.next;
        if (node.next)
          node.next.prev = newNode;
        else
          this.tail = newNode;
        node.next = newNode;
        this.length += 1;
      }
      insertBefore(node, newNode) {
        newNode.prev = node.prev;
        newNode.next = node;
        if (node.prev)
          node.prev.next = newNode;
        else
          this.head = newNode;
        node.prev = newNode;
        this.length += 1;
      }
      unshift(node) {
        if (this.head)
          this.insertBefore(this.head, node);
        else
          setInitial(this, node);
      }
      push(node) {
        if (this.tail)
          this.insertAfter(this.tail, node);
        else
          setInitial(this, node);
      }
      shift() {
        return this.head && this.removeLink(this.head);
      }
      pop() {
        return this.tail && this.removeLink(this.tail);
      }
      toArray() {
        return [...this];
      }
      *[Symbol.iterator]() {
        var cur = this.head;
        while (cur) {
          yield cur.data;
          cur = cur.next;
        }
      }
      remove(testFn) {
        var curr = this.head;
        while (curr) {
          var { next } = curr;
          if (testFn(curr)) {
            this.removeLink(curr);
          }
          curr = next;
        }
        return this;
      }
    };
    reduce$1 = awaitify(reduce, 4);
    mapLimit$1 = awaitify(mapLimit, 4);
    concatLimit$1 = awaitify(concatLimit, 4);
    concat$1 = awaitify(concat, 3);
    concatSeries$1 = awaitify(concatSeries, 3);
    detect$1 = awaitify(detect, 3);
    detectLimit$1 = awaitify(detectLimit, 4);
    detectSeries$1 = awaitify(detectSeries, 3);
    dir = consoleFunc("dir");
    doWhilst$1 = awaitify(doWhilst, 3);
    each = awaitify(eachLimit, 3);
    eachLimit$2 = awaitify(eachLimit$1, 4);
    eachSeries$1 = awaitify(eachSeries, 3);
    every$1 = awaitify(every, 3);
    everyLimit$1 = awaitify(everyLimit, 4);
    everySeries$1 = awaitify(everySeries, 3);
    filter$1 = awaitify(filter, 3);
    filterLimit$1 = awaitify(filterLimit, 4);
    filterSeries$1 = awaitify(filterSeries, 3);
    forever$1 = awaitify(forever, 2);
    groupByLimit$1 = awaitify(groupByLimit, 4);
    log = consoleFunc("log");
    mapValuesLimit$1 = awaitify(mapValuesLimit, 4);
    if (hasNextTick) {
      _defer$1 = process.nextTick;
    } else if (hasSetImmediate) {
      _defer$1 = setImmediate;
    } else {
      _defer$1 = fallback;
    }
    nextTick = wrap(_defer$1);
    _parallel = awaitify((eachfn, tasks, callback) => {
      var results = isArrayLike(tasks) ? [] : {};
      eachfn(tasks, (task, key, taskCb) => {
        wrapAsync(task)((err, ...result) => {
          if (result.length < 2) {
            [result] = result;
          }
          results[key] = result;
          taskCb(err);
        });
      }, (err) => callback(err, results));
    }, 3);
    Heap = class {
      constructor() {
        this.heap = [];
        this.pushCount = Number.MIN_SAFE_INTEGER;
      }
      get length() {
        return this.heap.length;
      }
      empty() {
        this.heap = [];
        return this;
      }
      percUp(index2) {
        let p;
        while (index2 > 0 && smaller(this.heap[index2], this.heap[p = parent(index2)])) {
          let t = this.heap[index2];
          this.heap[index2] = this.heap[p];
          this.heap[p] = t;
          index2 = p;
        }
      }
      percDown(index2) {
        let l;
        while ((l = leftChi(index2)) < this.heap.length) {
          if (l + 1 < this.heap.length && smaller(this.heap[l + 1], this.heap[l])) {
            l = l + 1;
          }
          if (smaller(this.heap[index2], this.heap[l])) {
            break;
          }
          let t = this.heap[index2];
          this.heap[index2] = this.heap[l];
          this.heap[l] = t;
          index2 = l;
        }
      }
      push(node) {
        node.pushCount = ++this.pushCount;
        this.heap.push(node);
        this.percUp(this.heap.length - 1);
      }
      unshift(node) {
        return this.heap.push(node);
      }
      shift() {
        let [top] = this.heap;
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.percDown(0);
        return top;
      }
      toArray() {
        return [...this];
      }
      *[Symbol.iterator]() {
        for (let i = 0; i < this.heap.length; i++) {
          yield this.heap[i].data;
        }
      }
      remove(testFn) {
        let j = 0;
        for (let i = 0; i < this.heap.length; i++) {
          if (!testFn(this.heap[i])) {
            this.heap[j] = this.heap[i];
            j++;
          }
        }
        this.heap.splice(j);
        for (let i = parent(this.heap.length - 1); i >= 0; i--) {
          this.percDown(i);
        }
        return this;
      }
    };
    race$1 = awaitify(race, 2);
    reject$2 = awaitify(reject$1, 3);
    rejectLimit$1 = awaitify(rejectLimit, 4);
    rejectSeries$1 = awaitify(rejectSeries, 3);
    DEFAULT_TIMES = 5;
    DEFAULT_INTERVAL = 0;
    some$1 = awaitify(some, 3);
    someLimit$1 = awaitify(someLimit, 4);
    someSeries$1 = awaitify(someSeries, 3);
    sortBy$1 = awaitify(sortBy, 3);
    tryEach$1 = awaitify(tryEach);
    whilst$1 = awaitify(whilst, 3);
    waterfall$1 = awaitify(waterfall);
    index = {
      apply,
      applyEach: applyEach$1,
      applyEachSeries,
      asyncify,
      auto,
      autoInject,
      cargo,
      cargoQueue: cargo$1,
      compose,
      concat: concat$1,
      concatLimit: concatLimit$1,
      concatSeries: concatSeries$1,
      constant,
      detect: detect$1,
      detectLimit: detectLimit$1,
      detectSeries: detectSeries$1,
      dir,
      doUntil,
      doWhilst: doWhilst$1,
      each,
      eachLimit: eachLimit$2,
      eachOf: eachOf$1,
      eachOfLimit: eachOfLimit$2,
      eachOfSeries: eachOfSeries$1,
      eachSeries: eachSeries$1,
      ensureAsync,
      every: every$1,
      everyLimit: everyLimit$1,
      everySeries: everySeries$1,
      filter: filter$1,
      filterLimit: filterLimit$1,
      filterSeries: filterSeries$1,
      forever: forever$1,
      groupBy,
      groupByLimit: groupByLimit$1,
      groupBySeries,
      log,
      map: map$1,
      mapLimit: mapLimit$1,
      mapSeries: mapSeries$1,
      mapValues,
      mapValuesLimit: mapValuesLimit$1,
      mapValuesSeries,
      memoize,
      nextTick,
      parallel,
      parallelLimit,
      priorityQueue,
      queue: queue$1,
      race: race$1,
      reduce: reduce$1,
      reduceRight,
      reflect,
      reflectAll,
      reject: reject$2,
      rejectLimit: rejectLimit$1,
      rejectSeries: rejectSeries$1,
      retry,
      retryable,
      seq,
      series,
      setImmediate: setImmediate$1,
      some: some$1,
      someLimit: someLimit$1,
      someSeries: someSeries$1,
      sortBy: sortBy$1,
      timeout,
      times,
      timesLimit,
      timesSeries,
      transform,
      tryEach: tryEach$1,
      unmemoize,
      until,
      waterfall: waterfall$1,
      whilst: whilst$1,
      all: every$1,
      allLimit: everyLimit$1,
      allSeries: everySeries$1,
      any: some$1,
      anyLimit: someLimit$1,
      anySeries: someSeries$1,
      find: detect$1,
      findLimit: detectLimit$1,
      findSeries: detectSeries$1,
      flatMap: concat$1,
      flatMapLimit: concatLimit$1,
      flatMapSeries: concatSeries$1,
      forEach: each,
      forEachSeries: eachSeries$1,
      forEachLimit: eachLimit$2,
      forEachOf: eachOf$1,
      forEachOfSeries: eachOfSeries$1,
      forEachOfLimit: eachOfLimit$2,
      inject: reduce$1,
      foldl: reduce$1,
      foldr: reduceRight,
      select: filter$1,
      selectLimit: filterLimit$1,
      selectSeries: filterSeries$1,
      wrapSync: asyncify,
      during: whilst$1,
      doDuring: doWhilst$1
    };
    async_default = index;
  }
});

// node_modules/cache-manager/lib/multi_caching.js
var require_multi_caching = __commonJS({
  "node_modules/cache-manager/lib/multi_caching.js"(exports, module) {
    init_esm_shims();
    var async = (init_async(), __toCommonJS(async_exports));
    var CallbackFiller = require_callback_filler();
    var utils = require_utils();
    var isObject2 = utils.isObject;
    var parseWrapArguments = utils.parseWrapArguments;
    var multiCaching = function(caches, options) {
      var self = {};
      options = options || {};
      var Promise2 = options.promiseDependency || global.Promise;
      if (!Array.isArray(caches)) {
        throw new Error("multiCaching requires an array of caches");
      }
      var callbackFiller = new CallbackFiller();
      var backgroundQueue = /* @__PURE__ */ new Set();
      if (typeof options.isCacheableValue === "function") {
        self._isCacheableValue = options.isCacheableValue;
      } else {
        self._isCacheableValue = function(value) {
          return value !== void 0;
        };
      }
      function getIsCacheableValueFunction(cache) {
        if (cache.store && typeof cache.store.isCacheableValue === "function") {
          return cache.store.isCacheableValue.bind(cache.store);
        } else {
          return self._isCacheableValue;
        }
      }
      function getFromHighestPriorityCachePromise() {
        var args = Array.prototype.slice.apply(arguments).filter(function(v) {
          return typeof v !== "undefined";
        });
        return new Promise2(function(resolve, reject2) {
          var cb = function(err, result) {
            if (err) {
              return reject2(err);
            }
            resolve(result);
          };
          args.push(cb);
          getFromHighestPriorityCache.apply(null, args);
        });
      }
      function getFromHighestPriorityCache() {
        var args = Array.prototype.slice.apply(arguments).filter(function(v) {
          return typeof v !== "undefined";
        });
        var cb;
        var options2 = {};
        if (typeof args[args.length - 1] === "function") {
          cb = args.pop();
        }
        if (!cb) {
          return getFromHighestPriorityCachePromise.apply(this, args);
        }
        if (isObject2(args[args.length - 1])) {
          options2 = args.pop();
        }
        var keys = Array.prototype.slice.apply(args);
        var multi = keys.length > 1;
        args.push(options2);
        if (multi) {
          var keysToFetch = Array.prototype.slice.apply(keys);
          var mapResult = {};
        }
        var i = 0;
        async.eachSeries(caches, function(cache, next) {
          var callback = function(err, result) {
            if (err) {
              return next(err);
            }
            var _isCacheableValue = getIsCacheableValueFunction(cache);
            if (multi) {
              addResultToMap(result, _isCacheableValue);
              if (keysToFetch.length === 0 || i === caches.length - 1) {
                return cb(null, keys.map(function(k) {
                  return mapResult[k] || void 0;
                }), i);
              }
            } else if (_isCacheableValue(result)) {
              return cb(err, result, i);
            }
            i += 1;
            next();
          };
          if (multi) {
            if (typeof cache.store.mget !== "function") {
              return callback(null, []);
            }
            var _args = Array.prototype.slice.apply(keysToFetch);
            _args.push(options2);
            _args.push(callback);
            cache.store.mget.apply(cache.store, _args);
          } else {
            try {
              cache.store.get(args[0], options2, callback);
            } catch (err) {
              callback(err);
            }
          }
        }, function(err, result) {
          return cb(err, result);
        });
        function addResultToMap(result, isCacheable) {
          var key;
          var diff = 0;
          result.forEach(function(res, i2) {
            if (isCacheable(res)) {
              key = keysToFetch[i2 - diff];
              mapResult[key] = res;
              keysToFetch.splice(i2 - diff, 1);
              diff += 1;
            }
          });
        }
      }
      function setInMultipleCachesPromise() {
        var args = Array.prototype.slice.apply(arguments);
        return new Promise2(function(resolve, reject2) {
          var cb = function(err, result) {
            if (err) {
              return reject2(err);
            }
            resolve(result);
          };
          args.push(cb);
          setInMultipleCaches.apply(null, args);
        });
      }
      function setInMultipleCaches() {
        var args = Array.prototype.slice.apply(arguments);
        var _caches = Array.isArray(args[0]) ? args.shift() : caches;
        var cb;
        var options2 = {};
        if (typeof args[args.length - 1] === "function") {
          cb = args.pop();
        }
        if (!cb) {
          return setInMultipleCachesPromise.apply(this, args);
        }
        if (args.length % 2 > 0 && isObject2(args[args.length - 1])) {
          options2 = args.pop();
        }
        var length = args.length;
        var multi = length > 2;
        var i;
        async.each(_caches, function(cache, next) {
          var _isCacheableValue = getIsCacheableValueFunction(cache);
          var keysValues = Array.prototype.slice.apply(args);
          for (i = 0; i < length; i += 2) {
            if (!_isCacheableValue(keysValues[i + 1])) {
              keysValues.splice(i, 2);
            }
          }
          if (keysValues.length === 0) {
            return next();
          }
          var cacheOptions = options2;
          if (typeof options2.ttl === "function") {
            cacheOptions = {};
            cacheOptions.ttl = options2.ttl(keysValues, cache.store.name);
          }
          if (multi) {
            if (typeof cache.store.mset !== "function") {
              return next();
            }
            keysValues.push(cacheOptions);
            keysValues.push(next);
            cache.store.mset.apply(cache.store, keysValues);
          } else {
            cache.store.set(keysValues[0], keysValues[1], cacheOptions, next);
          }
        }, function(err, result) {
          cb(err, result);
        });
      }
      function getAndPassUpPromise(key) {
        return new Promise2(function(resolve, reject2) {
          self.getAndPassUp(key, function(err, result) {
            if (err) {
              return reject2(err);
            }
            resolve(result);
          });
        });
      }
      self.getAndPassUp = function(key, cb) {
        if (!cb) {
          return getAndPassUpPromise(key);
        }
        getFromHighestPriorityCache(key, function(err, result, index2) {
          if (err) {
            return cb(err);
          }
          if (index2) {
            var cachesToUpdate = caches.slice(0, index2);
            async.each(cachesToUpdate, function(cache, next) {
              var _isCacheableValue = getIsCacheableValueFunction(cache);
              if (_isCacheableValue(result)) {
                cache.set(key, result, next);
              }
            });
          }
          return cb(err, result);
        });
      };
      function wrapPromise(key, promise, options2) {
        return new Promise2(function(resolve, reject2) {
          self.wrap(key, function(cb) {
            Promise2.resolve().then(promise).then(function(result) {
              cb(null, result);
            }).catch(cb);
          }, options2, function(err, result) {
            if (err) {
              return reject2(err);
            }
            resolve(result);
          });
        });
      }
      function handleBackgroundRefresh(caches2, index2, key, work, options2) {
        if (caches2[index2].refreshThreshold && !backgroundQueue.has(key)) {
          backgroundQueue.add(key);
          caches2[index2].checkRefreshThreshold(key, function(err, isExpiring) {
            if (err) {
              backgroundQueue.delete(key);
              return;
            }
            if (isExpiring) {
              work(function(workErr, workData) {
                if (workErr || !self._isCacheableValue(workData)) {
                  backgroundQueue.delete(key);
                  return;
                }
                var args = [caches2, key, workData, options2, function() {
                  backgroundQueue.delete(key);
                }];
                setInMultipleCaches.apply(null, args);
              });
            } else {
              backgroundQueue.delete(key);
            }
          });
        }
      }
      self.wrap = function() {
        var parsedArgs = parseWrapArguments(Array.prototype.slice.apply(arguments));
        var keys = parsedArgs.keys;
        var work = parsedArgs.work;
        var options2 = parsedArgs.options;
        var cb = parsedArgs.cb;
        if (!cb) {
          keys.push(work);
          keys.push(options2);
          return wrapPromise.apply(this, keys);
        }
        if (keys.length > 1) {
          return wrapMultiple(keys, work, options2, cb);
        }
        var key = keys[0];
        var hasKey = callbackFiller.has(key);
        callbackFiller.add(key, { cb });
        if (hasKey) {
          return;
        }
        getFromHighestPriorityCache(key, function(err, result, index2) {
          if (err) {
            return callbackFiller.fill(key, err);
          } else if (self._isCacheableValue(result)) {
            handleBackgroundRefresh(caches, index2, key, work, options2);
            var cachesToUpdate = caches.slice(0, index2);
            var args = [cachesToUpdate, key, result, options2, function(err2) {
              callbackFiller.fill(key, err2, result);
            }];
            setInMultipleCaches.apply(null, args);
          } else {
            work(function(err2, data) {
              if (err2) {
                return callbackFiller.fill(key, err2);
              }
              if (!self._isCacheableValue(data)) {
                return callbackFiller.fill(key, err2, data);
              }
              var args2 = [caches, key, data, options2, function(err3) {
                callbackFiller.fill(key, err3, data);
              }];
              setInMultipleCaches.apply(null, args2);
            });
          }
        });
      };
      function wrapMultiple(keys, work, options2, cb) {
        var combinedKey = keys.reduce(function(acc, k) {
          return acc + k;
        }, "");
        var hasKey = callbackFiller.has(combinedKey);
        callbackFiller.add(combinedKey, { cb });
        if (hasKey) {
          return;
        }
        keys.push(options2);
        keys.push(onResult);
        getFromHighestPriorityCache.apply(this, keys);
        function onResult(err, result, index2) {
          if (err) {
            return done(err);
          }
          var cacheOK = result.filter(function(_result) {
            return self._isCacheableValue(_result);
          }).length === result.length;
          if (!cacheOK) {
            return work(workCallback);
          }
          var cachesToUpdate = caches.slice(0, index2);
          var _args = [cachesToUpdate];
          result.forEach(function(value, i) {
            _args.push(keys[i]);
            _args.push(value);
          });
          _args.push(options2);
          _args.push(function(err2) {
            done(err2, result);
          });
          return setInMultipleCaches.apply(null, _args);
          function workCallback(err2, data) {
            if (err2) {
              return done(err2);
            }
            var _args2;
            _args2 = [];
            data.forEach(function(value, i) {
              if (self._isCacheableValue(value)) {
                _args2.push(keys[i]);
                _args2.push(value);
              }
            });
            if (_args2.length === 0) {
              return done(null);
            }
            _args2.push(options2);
            _args2.push(function(err3) {
              done(err3, data);
            });
            setInMultipleCaches.apply(null, _args2);
          }
          function done(err2, data) {
            callbackFiller.fill(combinedKey, err2, data);
          }
        }
      }
      self.set = setInMultipleCaches;
      self.mset = setInMultipleCaches;
      self.get = getFromHighestPriorityCache;
      self.mget = getFromHighestPriorityCache;
      self.del = function() {
        var args = Array.prototype.slice.apply(arguments);
        var cb;
        var options2 = {};
        if (typeof args[args.length - 1] === "function") {
          cb = args.pop();
        }
        if (isObject2(args[args.length - 1])) {
          options2 = args.pop();
        }
        args.push(options2);
        async.each(caches, function(cache, next) {
          var _args = Array.prototype.slice.apply(args);
          _args.push(next);
          cache.store.del.apply(cache.store, _args);
        }, cb);
      };
      self.reset = function(cb) {
        async.each(caches, function(cache, next) {
          cache.store.reset(next);
        }, cb);
      };
      return self;
    };
    module.exports = multiCaching;
  }
});

// node_modules/cache-manager/lib/index.js
var require_lib = __commonJS({
  "node_modules/cache-manager/lib/index.js"(exports, module) {
    init_esm_shims();
    var cacheManager = {
      caching: require_caching(),
      multiCaching: require_multi_caching()
    };
    module.exports = cacheManager;
  }
});

// node_modules/cache-manager/index.js
var require_cache_manager = __commonJS({
  "node_modules/cache-manager/index.js"(exports, module) {
    init_esm_shims();
    module.exports = require_lib();
  }
});

// packages/common/index.ts
init_esm_shims();
import "reflect-metadata";

// packages/common/cache/index.ts
init_esm_shims();

// packages/common/cache/cache.constants.ts
init_esm_shims();
var CACHE_MANAGER = "CACHE_MANAGER";
var CACHE_MODULE_OPTIONS = "CACHE_MODULE_OPTIONS";
var CACHE_KEY_METADATA = "cache_module:cache_key";
var CACHE_TTL_METADATA = "cache_module:cache_ttl";

// packages/common/cache/cache.module.ts
init_esm_shims();

// packages/common/decorators/index.ts
init_esm_shims();

// packages/common/decorators/core/index.ts
init_esm_shims();

// packages/common/decorators/core/bind.decorator.ts
init_esm_shims();
function Bind(...decorators) {
  return (target, key, descriptor) => {
    decorators.forEach((fn, index2) => fn(target, key, index2));
    return descriptor;
  };
}

// packages/common/decorators/core/catch.decorator.ts
init_esm_shims();

// packages/common/constants.ts
init_esm_shims();
var MODULE_METADATA = {
  IMPORTS: "imports",
  PROVIDERS: "providers",
  CONTROLLERS: "controllers",
  EXPORTS: "exports"
};
var GLOBAL_MODULE_METADATA = "__module:global__";
var HOST_METADATA = "host";
var PATH_METADATA = "path";
var PARAMTYPES_METADATA = "design:paramtypes";
var SELF_DECLARED_DEPS_METADATA = "self:paramtypes";
var OPTIONAL_DEPS_METADATA = "optional:paramtypes";
var PROPERTY_DEPS_METADATA = "self:properties_metadata";
var OPTIONAL_PROPERTY_DEPS_METADATA = "optional:properties_metadata";
var SCOPE_OPTIONS_METADATA = "scope:options";
var METHOD_METADATA = "method";
var ROUTE_ARGS_METADATA = "__routeArguments__";
var CUSTOM_ROUTE_AGRS_METADATA = "__customRouteArgs__";
var EXCEPTION_FILTERS_METADATA = "__exceptionFilters__";
var FILTER_CATCH_EXCEPTIONS = "__filterCatchExceptions__";
var PIPES_METADATA = "__pipes__";
var GUARDS_METADATA = "__guards__";
var RENDER_METADATA = "__renderTemplate__";
var INTERCEPTORS_METADATA = "__interceptors__";
var HTTP_CODE_METADATA = "__httpCode__";
var HEADERS_METADATA = "__headers__";
var REDIRECT_METADATA = "__redirect__";
var RESPONSE_PASSTHROUGH_METADATA = "__responsePassthrough__";
var SSE_METADATA = "__sse__";
var VERSION_METADATA = "__version__";
var INJECTABLE_WATERMARK = "__injectable__";
var CONTROLLER_WATERMARK = "__controller__";
var CATCH_WATERMARK = "__catch__";

// packages/common/decorators/core/catch.decorator.ts
function Catch(...exceptions) {
  return (target) => {
    Reflect.defineMetadata(CATCH_WATERMARK, true, target);
    Reflect.defineMetadata(FILTER_CATCH_EXCEPTIONS, exceptions, target);
  };
}

// packages/common/decorators/core/controller.decorator.ts
init_esm_shims();

// packages/common/utils/shared.utils.ts
init_esm_shims();
var isUndefined = (obj) => typeof obj === "undefined";
var isObject = (fn) => !isNil(fn) && typeof fn === "object";
var isPlainObject = (fn) => {
  if (!isObject(fn)) {
    return false;
  }
  const proto = Object.getPrototypeOf(fn);
  if (proto === null) {
    return true;
  }
  const ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof ctor === "function" && ctor instanceof ctor && Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object);
};
var isFunction = (val) => typeof val === "function";
var isString = (val) => typeof val === "string";
var isNumber = (val) => typeof val === "number";
var isNil = (val) => isUndefined(val) || val === null;

// packages/common/decorators/core/controller.decorator.ts
function Controller(prefixOrOptions) {
  const defaultPath = "/";
  const [path, host, scopeOptions, versionOptions] = isUndefined(prefixOrOptions) ? [defaultPath, void 0, void 0, void 0] : isString(prefixOrOptions) || Array.isArray(prefixOrOptions) ? [prefixOrOptions, void 0, void 0, void 0] : [
    prefixOrOptions.path || defaultPath,
    prefixOrOptions.host,
    { scope: prefixOrOptions.scope },
    Array.isArray(prefixOrOptions.version) ? Array.from(new Set(prefixOrOptions.version)) : prefixOrOptions.version
  ];
  return (target) => {
    Reflect.defineMetadata(CONTROLLER_WATERMARK, true, target);
    Reflect.defineMetadata(PATH_METADATA, path, target);
    Reflect.defineMetadata(HOST_METADATA, host, target);
    Reflect.defineMetadata(SCOPE_OPTIONS_METADATA, scopeOptions, target);
    Reflect.defineMetadata(VERSION_METADATA, versionOptions, target);
  };
}

// packages/common/decorators/core/dependencies.decorator.ts
init_esm_shims();
function flatten(arr) {
  const flat = [].concat(...arr);
  return flat.some(Array.isArray) ? flatten(flat) : flat;
}
var Dependencies = (...dependencies) => {
  const flattenDeps = flatten(dependencies);
  return (target) => {
    Reflect.defineMetadata(PARAMTYPES_METADATA, flattenDeps, target);
  };
};

// packages/common/decorators/core/exception-filters.decorator.ts
init_esm_shims();

// packages/common/utils/extend-metadata.util.ts
init_esm_shims();
function extendArrayMetadata(key, metadata, target) {
  const previousValue = Reflect.getMetadata(key, target) || [];
  const value = [...previousValue, ...metadata];
  Reflect.defineMetadata(key, value, target);
}

// packages/common/utils/validate-each.util.ts
init_esm_shims();
var InvalidDecoratorItemException = class extends Error {
  constructor(decorator, item, context) {
    const message = `Invalid ${item} passed to ${decorator}() decorator (${context}).`;
    super(message);
    this.msg = message;
  }
  what() {
    return this.msg;
  }
};
function validateEach(context, arr, predicate, decorator, item) {
  if (!context || !context.name) {
    return true;
  }
  const errors = arr.some((str) => !predicate(str));
  if (errors) {
    throw new InvalidDecoratorItemException(decorator, item, context.name);
  }
  return true;
}

// packages/common/decorators/core/exception-filters.decorator.ts
var UseFilters = (...filters) => addExceptionFiltersMetadata(...filters);
function addExceptionFiltersMetadata(...filters) {
  return (target, key, descriptor) => {
    const isFilterValid = (filter2) => filter2 && (isFunction(filter2) || isFunction(filter2.catch));
    if (descriptor) {
      validateEach(target.constructor, filters, isFilterValid, "@UseFilters", "filter");
      extendArrayMetadata(EXCEPTION_FILTERS_METADATA, filters, descriptor.value);
      return descriptor;
    }
    validateEach(target, filters, isFilterValid, "@UseFilters", "filter");
    extendArrayMetadata(EXCEPTION_FILTERS_METADATA, filters, target);
    return target;
  };
}

// packages/common/decorators/core/inject.decorator.ts
init_esm_shims();
function Inject(token) {
  return (target, key, index2) => {
    const type = token || Reflect.getMetadata("design:type", target, key);
    if (!isUndefined(index2)) {
      let dependencies = Reflect.getMetadata(SELF_DECLARED_DEPS_METADATA, target) || [];
      dependencies = [...dependencies, { index: index2, param: type }];
      Reflect.defineMetadata(SELF_DECLARED_DEPS_METADATA, dependencies, target);
      return;
    }
    let properties = Reflect.getMetadata(PROPERTY_DEPS_METADATA, target.constructor) || [];
    properties = [...properties, { key, type }];
    Reflect.defineMetadata(PROPERTY_DEPS_METADATA, properties, target.constructor);
  };
}

// packages/common/decorators/core/injectable.decorator.ts
init_esm_shims();
import { v4 as uuid } from "uuid";
function Injectable(options) {
  return (target) => {
    Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target);
    Reflect.defineMetadata(SCOPE_OPTIONS_METADATA, options, target);
  };
}
function mixin(mixinClass) {
  Object.defineProperty(mixinClass, "name", {
    value: uuid()
  });
  Injectable()(mixinClass);
  return mixinClass;
}

// packages/common/decorators/core/optional.decorator.ts
init_esm_shims();
function Optional() {
  return (target, key, index2) => {
    if (!isUndefined(index2)) {
      const args = Reflect.getMetadata(OPTIONAL_DEPS_METADATA, target) || [];
      Reflect.defineMetadata(OPTIONAL_DEPS_METADATA, [...args, index2], target);
      return;
    }
    const properties = Reflect.getMetadata(OPTIONAL_PROPERTY_DEPS_METADATA, target.constructor) || [];
    Reflect.defineMetadata(OPTIONAL_PROPERTY_DEPS_METADATA, [...properties, key], target.constructor);
  };
}

// packages/common/decorators/core/set-metadata.decorator.ts
init_esm_shims();
var SetMetadata = (metadataKey, metadataValue) => {
  const decoratorFactory = (target, key, descriptor) => {
    if (descriptor) {
      Reflect.defineMetadata(metadataKey, metadataValue, descriptor.value);
      return descriptor;
    }
    Reflect.defineMetadata(metadataKey, metadataValue, target);
    return target;
  };
  decoratorFactory.KEY = metadataKey;
  return decoratorFactory;
};

// packages/common/decorators/core/use-guards.decorator.ts
init_esm_shims();
function UseGuards(...guards) {
  return (target, key, descriptor) => {
    const isGuardValid = (guard) => guard && (isFunction(guard) || isFunction(guard.canActivate));
    if (descriptor) {
      validateEach(target.constructor, guards, isGuardValid, "@UseGuards", "guard");
      extendArrayMetadata(GUARDS_METADATA, guards, descriptor.value);
      return descriptor;
    }
    validateEach(target, guards, isGuardValid, "@UseGuards", "guard");
    extendArrayMetadata(GUARDS_METADATA, guards, target);
    return target;
  };
}

// packages/common/decorators/core/use-interceptors.decorator.ts
init_esm_shims();
function UseInterceptors(...interceptors) {
  return (target, key, descriptor) => {
    const isInterceptorValid = (interceptor) => interceptor && (isFunction(interceptor) || isFunction(interceptor.intercept));
    if (descriptor) {
      validateEach(target.constructor, interceptors, isInterceptorValid, "@UseInterceptors", "interceptor");
      extendArrayMetadata(INTERCEPTORS_METADATA, interceptors, descriptor.value);
      return descriptor;
    }
    validateEach(target, interceptors, isInterceptorValid, "@UseInterceptors", "interceptor");
    extendArrayMetadata(INTERCEPTORS_METADATA, interceptors, target);
    return target;
  };
}

// packages/common/decorators/core/use-pipes.decorator.ts
init_esm_shims();
function UsePipes(...pipes) {
  return (target, key, descriptor) => {
    const isPipeValid = (pipe) => pipe && (isFunction(pipe) || isFunction(pipe.transform));
    if (descriptor) {
      extendArrayMetadata(PIPES_METADATA, pipes, descriptor.value);
      return descriptor;
    }
    validateEach(target, pipes, isPipeValid, "@UsePipes", "pipe");
    extendArrayMetadata(PIPES_METADATA, pipes, target);
    return target;
  };
}

// packages/common/decorators/core/apply-decorators.ts
init_esm_shims();
function applyDecorators(...decorators) {
  return (target, propertyKey, descriptor) => {
    for (const decorator of decorators) {
      if (target instanceof Function && !descriptor) {
        decorator(target);
        continue;
      }
      decorator(target, propertyKey, descriptor);
    }
  };
}

// packages/common/decorators/core/version.decorator.ts
init_esm_shims();
function Version(version) {
  if (Array.isArray(version)) {
    version = Array.from(new Set(version));
  }
  return (target, key, descriptor) => {
    Reflect.defineMetadata(VERSION_METADATA, version, descriptor.value);
    return descriptor;
  };
}

// packages/common/decorators/modules/index.ts
init_esm_shims();

// packages/common/decorators/modules/global.decorator.ts
init_esm_shims();
function Global() {
  return (target) => {
    Reflect.defineMetadata(GLOBAL_MODULE_METADATA, true, target);
  };
}

// packages/common/decorators/modules/module.decorator.ts
init_esm_shims();

// packages/common/utils/validate-module-keys.util.ts
init_esm_shims();
var INVALID_MODULE_CONFIG_MESSAGE = (text, property) => `Invalid property '${property}' passed into the @Module() decorator.`;
var metadataKeys = [
  MODULE_METADATA.IMPORTS,
  MODULE_METADATA.EXPORTS,
  MODULE_METADATA.CONTROLLERS,
  MODULE_METADATA.PROVIDERS
];
function validateModuleKeys(keys) {
  const validateKey = (key) => {
    if (metadataKeys.includes(key)) {
      return;
    }
    throw new Error(INVALID_MODULE_CONFIG_MESSAGE`${key}`);
  };
  keys.forEach(validateKey);
}

// packages/common/decorators/modules/module.decorator.ts
function Module(metadata) {
  const propsKeys = Object.keys(metadata);
  validateModuleKeys(propsKeys);
  return (target) => {
    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, metadata[property], target);
      }
    }
  };
}

// packages/common/decorators/http/index.ts
init_esm_shims();

// packages/common/decorators/http/request-mapping.decorator.ts
init_esm_shims();

// packages/common/enums/request-method.enum.ts
init_esm_shims();
var RequestMethod = /* @__PURE__ */ ((RequestMethod2) => {
  RequestMethod2[RequestMethod2["GET"] = 0] = "GET";
  RequestMethod2[RequestMethod2["POST"] = 1] = "POST";
  RequestMethod2[RequestMethod2["PUT"] = 2] = "PUT";
  RequestMethod2[RequestMethod2["DELETE"] = 3] = "DELETE";
  RequestMethod2[RequestMethod2["PATCH"] = 4] = "PATCH";
  RequestMethod2[RequestMethod2["ALL"] = 5] = "ALL";
  RequestMethod2[RequestMethod2["OPTIONS"] = 6] = "OPTIONS";
  RequestMethod2[RequestMethod2["HEAD"] = 7] = "HEAD";
  return RequestMethod2;
})(RequestMethod || {});

// packages/common/decorators/http/request-mapping.decorator.ts
var defaultMetadata = {
  [PATH_METADATA]: "/",
  [METHOD_METADATA]: 0 /* GET */
};
var RequestMapping = (metadata = defaultMetadata) => {
  const pathMetadata = metadata[PATH_METADATA];
  const path = pathMetadata && pathMetadata.length ? pathMetadata : "/";
  const requestMethod = metadata[METHOD_METADATA] || 0 /* GET */;
  return (target, key, descriptor) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    Reflect.defineMetadata(METHOD_METADATA, requestMethod, descriptor.value);
    return descriptor;
  };
};
var createMappingDecorator = (method) => (path) => {
  return RequestMapping({
    [PATH_METADATA]: path,
    [METHOD_METADATA]: method
  });
};
var Post = createMappingDecorator(1 /* POST */);
var Get = createMappingDecorator(0 /* GET */);
var Delete = createMappingDecorator(3 /* DELETE */);
var Put = createMappingDecorator(2 /* PUT */);
var Patch = createMappingDecorator(4 /* PATCH */);
var Options = createMappingDecorator(6 /* OPTIONS */);
var Head = createMappingDecorator(7 /* HEAD */);
var All = createMappingDecorator(5 /* ALL */);

// packages/common/decorators/http/route-params.decorator.ts
init_esm_shims();

// packages/common/enums/route-paramtypes.enum.ts
init_esm_shims();

// packages/common/decorators/http/route-params.decorator.ts
function assignMetadata(args, paramtype, index2, data, ...pipes) {
  return __spreadProps(__spreadValues({}, args), {
    [`${paramtype}:${index2}`]: {
      index: index2,
      data,
      pipes
    }
  });
}
function createRouteParamDecorator(paramtype) {
  return (data) => (target, key, index2) => {
    const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, target.constructor, key) || {};
    Reflect.defineMetadata(ROUTE_ARGS_METADATA, assignMetadata(args, paramtype, index2, data), target.constructor, key);
  };
}
var createPipesRouteParamDecorator = (paramtype) => (data, ...pipes) => (target, key, index2) => {
  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, target.constructor, key) || {};
  const hasParamData = isNil(data) || isString(data);
  const paramData = hasParamData ? data : void 0;
  const paramPipes = hasParamData ? pipes : [data, ...pipes];
  Reflect.defineMetadata(ROUTE_ARGS_METADATA, assignMetadata(args, paramtype, index2, paramData, ...paramPipes), target.constructor, key);
};
var Request = createRouteParamDecorator(0 /* REQUEST */);
var Response = (options) => (target, key, index2) => {
  if (options == null ? void 0 : options.passthrough) {
    Reflect.defineMetadata(RESPONSE_PASSTHROUGH_METADATA, options == null ? void 0 : options.passthrough, target.constructor, key);
  }
  return createRouteParamDecorator(1 /* RESPONSE */)()(target, key, index2);
};
var Next = createRouteParamDecorator(2 /* NEXT */);
var Ip = createRouteParamDecorator(11 /* IP */);
var Session = createRouteParamDecorator(7 /* SESSION */);
function UploadedFile(fileKey, ...pipes) {
  return createPipesRouteParamDecorator(8 /* FILE */)(fileKey, ...pipes);
}
function UploadedFiles(...pipes) {
  return createPipesRouteParamDecorator(9 /* FILES */)(void 0, ...pipes);
}
var Headers = createRouteParamDecorator(6 /* HEADERS */);
function Query(property, ...pipes) {
  return createPipesRouteParamDecorator(4 /* QUERY */)(property, ...pipes);
}
function Body(property, ...pipes) {
  return createPipesRouteParamDecorator(3 /* BODY */)(property, ...pipes);
}
function Param(property, ...pipes) {
  return createPipesRouteParamDecorator(5 /* PARAM */)(property, ...pipes);
}
function HostParam(property) {
  return createRouteParamDecorator(10 /* HOST */)(property);
}
var Req = Request;
var Res = Response;

// packages/common/decorators/http/http-code.decorator.ts
init_esm_shims();
function HttpCode(statusCode) {
  return (target, key, descriptor) => {
    Reflect.defineMetadata(HTTP_CODE_METADATA, statusCode, descriptor.value);
    return descriptor;
  };
}

// packages/common/decorators/http/create-route-param-metadata.decorator.ts
init_esm_shims();
import { v4 as uuid2 } from "uuid";

// packages/common/utils/assign-custom-metadata.util.ts
init_esm_shims();
function assignCustomParameterMetadata(args, paramtype, index2, factory, data, ...pipes) {
  return __spreadProps(__spreadValues({}, args), {
    [`${paramtype}${CUSTOM_ROUTE_AGRS_METADATA}:${index2}`]: {
      index: index2,
      factory,
      data,
      pipes
    }
  });
}

// packages/common/decorators/http/create-route-param-metadata.decorator.ts
function createParamDecorator(factory, enhancers = []) {
  const paramtype = uuid2();
  return (data, ...pipes) => (target, key, index2) => {
    const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, target.constructor, key) || {};
    const isPipe = (pipe) => pipe && (isFunction(pipe) && pipe.prototype && isFunction(pipe.prototype.transform) || isFunction(pipe.transform));
    const hasParamData = isNil(data) || !isPipe(data);
    const paramData = hasParamData ? data : void 0;
    const paramPipes = hasParamData ? pipes : [data, ...pipes];
    Reflect.defineMetadata(ROUTE_ARGS_METADATA, assignCustomParameterMetadata(args, paramtype, index2, factory, paramData, ...paramPipes), target.constructor, key);
    enhancers.forEach((fn) => fn(target, key, index2));
  };
}

// packages/common/decorators/http/render.decorator.ts
init_esm_shims();
function Render(template) {
  return (target, key, descriptor) => {
    Reflect.defineMetadata(RENDER_METADATA, template, descriptor.value);
    return descriptor;
  };
}

// packages/common/decorators/http/header.decorator.ts
init_esm_shims();
function Header(name, value) {
  return (target, key, descriptor) => {
    extendArrayMetadata(HEADERS_METADATA, [{ name, value }], descriptor.value);
    return descriptor;
  };
}

// packages/common/decorators/http/redirect.decorator.ts
init_esm_shims();
function Redirect(url = "", statusCode) {
  return (target, key, descriptor) => {
    Reflect.defineMetadata(REDIRECT_METADATA, { statusCode, url }, descriptor.value);
    return descriptor;
  };
}

// packages/common/decorators/http/sse.decorator.ts
init_esm_shims();
function Sse(path) {
  return (target, key, descriptor) => {
    path = path && path.length ? path : "/";
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    Reflect.defineMetadata(METHOD_METADATA, 0 /* GET */, descriptor.value);
    Reflect.defineMetadata(SSE_METADATA, true, descriptor.value);
    return descriptor;
  };
}

// packages/common/cache/cache.providers.ts
init_esm_shims();

// packages/common/utils/load-package.util.ts
init_esm_shims();

// packages/common/services/logger.service.ts
init_esm_shims();

// packages/common/services/console-logger.service.ts
init_esm_shims();

// packages/common/utils/cli-colors.util.ts
init_esm_shims();
import { WriteStream } from "tty";
var isColorAllowed = () => !process.env.NO_COLOR && WriteStream.prototype.hasColors();
var colorIfAllowed = (colorFn) => (text) => isColorAllowed() ? colorFn(text) : text;
var clc = {
  green: colorIfAllowed((text) => `\x1B[32m${text}\x1B[39m`),
  yellow: colorIfAllowed((text) => `\x1B[33m${text}\x1B[39m`),
  red: colorIfAllowed((text) => `\x1B[31m${text}\x1B[39m`),
  magentaBright: colorIfAllowed((text) => `\x1B[95m${text}\x1B[39m`),
  cyanBright: colorIfAllowed((text) => `\x1B[96m${text}\x1B[39m`)
};
var yellow = colorIfAllowed((text) => `\x1B[38;5;3m${text}\x1B[39m`);

// packages/common/services/utils/index.ts
init_esm_shims();

// packages/common/services/utils/is-log-level-enabled.util.ts
init_esm_shims();
var LOG_LEVEL_VALUES = {
  debug: 0,
  verbose: 1,
  log: 2,
  warn: 3,
  error: 4
};
function isLogLevelEnabled(targetLevel, logLevels) {
  var _a;
  if (!logLevels || Array.isArray(logLevels) && (logLevels == null ? void 0 : logLevels.length) === 0) {
    return false;
  }
  if (logLevels.includes(targetLevel)) {
    return true;
  }
  const highestLogLevelValue = (_a = logLevels.map((level) => LOG_LEVEL_VALUES[level]).sort((a, b) => b - a)) == null ? void 0 : _a[0];
  const targetLevelValue = LOG_LEVEL_VALUES[targetLevel];
  return targetLevelValue >= highestLogLevelValue;
}

// packages/common/services/console-logger.service.ts
var DEFAULT_LOG_LEVELS = [
  "log",
  "error",
  "warn",
  "debug",
  "verbose"
];
var ConsoleLogger = class {
  constructor(context, options = {}) {
    this.context = context;
    this.options = options;
    if (!options.logLevels) {
      options.logLevels = DEFAULT_LOG_LEVELS;
    }
    if (context) {
      this.originalContext = context;
    }
  }
  log(message, ...optionalParams) {
    if (!this.isLevelEnabled("log")) {
      return;
    }
    const { messages, context } = this.getContextAndMessagesToPrint([
      message,
      ...optionalParams
    ]);
    this.printMessages(messages, context, "log");
  }
  error(message, ...optionalParams) {
    if (!this.isLevelEnabled("error")) {
      return;
    }
    const { messages, context, stack } = this.getContextAndStackAndMessagesToPrint([message, ...optionalParams]);
    this.printMessages(messages, context, "error", "stderr");
    this.printStackTrace(stack);
  }
  warn(message, ...optionalParams) {
    if (!this.isLevelEnabled("warn")) {
      return;
    }
    const { messages, context } = this.getContextAndMessagesToPrint([
      message,
      ...optionalParams
    ]);
    this.printMessages(messages, context, "warn");
  }
  debug(message, ...optionalParams) {
    if (!this.isLevelEnabled("debug")) {
      return;
    }
    const { messages, context } = this.getContextAndMessagesToPrint([
      message,
      ...optionalParams
    ]);
    this.printMessages(messages, context, "debug");
  }
  verbose(message, ...optionalParams) {
    if (!this.isLevelEnabled("verbose")) {
      return;
    }
    const { messages, context } = this.getContextAndMessagesToPrint([
      message,
      ...optionalParams
    ]);
    this.printMessages(messages, context, "verbose");
  }
  setLogLevels(levels) {
    if (!this.options) {
      this.options = {};
    }
    this.options.logLevels = levels;
  }
  setContext(context) {
    this.context = context;
  }
  resetContext() {
    this.context = this.originalContext;
  }
  isLevelEnabled(level) {
    var _a;
    const logLevels = (_a = this.options) == null ? void 0 : _a.logLevels;
    return isLogLevelEnabled(level, logLevels);
  }
  getTimestamp() {
    const localeStringOptions = {
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      day: "2-digit",
      month: "2-digit"
    };
    return new Date(Date.now()).toLocaleString(void 0, localeStringOptions);
  }
  printMessages(messages, context = "", logLevel = "log", writeStreamType) {
    messages.forEach((message) => {
      const pidMessage = this.formatPid(process.pid);
      const contextMessage = context ? yellow(`[${context}] `) : "";
      const timestampDiff = this.updateAndGetTimestampDiff();
      const formattedLogLevel = logLevel.toUpperCase().padStart(7, " ");
      const formatedMessage = this.formatMessage(logLevel, message, pidMessage, formattedLogLevel, contextMessage, timestampDiff);
      process[writeStreamType != null ? writeStreamType : "stdout"].write(formatedMessage);
    });
  }
  formatPid(pid) {
    return `[Nest] ${pid}  - `;
  }
  formatMessage(logLevel, message, pidMessage, formattedLogLevel, contextMessage, timestampDiff) {
    const output = this.stringifyMessage(message, logLevel);
    pidMessage = this.colorize(pidMessage, logLevel);
    formattedLogLevel = this.colorize(formattedLogLevel, logLevel);
    return `${pidMessage}${this.getTimestamp()} ${formattedLogLevel} ${contextMessage}${output}${timestampDiff}
`;
  }
  stringifyMessage(message, logLevel) {
    return isPlainObject(message) ? `${this.colorize("Object:", logLevel)}
${JSON.stringify(message, (key, value) => typeof value === "bigint" ? value.toString() : value, 2)}
` : this.colorize(message, logLevel);
  }
  colorize(message, logLevel) {
    const color = this.getColorByLogLevel(logLevel);
    return color(message);
  }
  printStackTrace(stack) {
    if (!stack) {
      return;
    }
    process.stderr.write(`${stack}
`);
  }
  updateAndGetTimestampDiff() {
    var _a;
    const includeTimestamp = ConsoleLogger.lastTimestampAt && ((_a = this.options) == null ? void 0 : _a.timestamp);
    const result = includeTimestamp ? yellow(` +${Date.now() - ConsoleLogger.lastTimestampAt}ms`) : "";
    ConsoleLogger.lastTimestampAt = Date.now();
    return result;
  }
  getContextAndMessagesToPrint(args) {
    if ((args == null ? void 0 : args.length) <= 1) {
      return { messages: args, context: this.context };
    }
    const lastElement = args[args.length - 1];
    const isContext = isString(lastElement);
    if (!isContext) {
      return { messages: args, context: this.context };
    }
    return {
      context: lastElement,
      messages: args.slice(0, args.length - 1)
    };
  }
  getContextAndStackAndMessagesToPrint(args) {
    const { messages, context } = this.getContextAndMessagesToPrint(args);
    if ((messages == null ? void 0 : messages.length) <= 1) {
      return { messages, context };
    }
    const lastElement = messages[messages.length - 1];
    const isStack = isString(lastElement);
    if (!isStack) {
      return { messages, context };
    }
    return {
      stack: lastElement,
      messages: messages.slice(0, messages.length - 1),
      context
    };
  }
  getColorByLogLevel(level) {
    switch (level) {
      case "debug":
        return clc.magentaBright;
      case "warn":
        return clc.yellow;
      case "error":
        return clc.red;
      case "verbose":
        return clc.cyanBright;
      default:
        return clc.green;
    }
  }
};
ConsoleLogger = __decorateClass([
  Injectable(),
  __decorateParam(0, Optional()),
  __decorateParam(1, Optional())
], ConsoleLogger);

// packages/common/services/logger.service.ts
var DEFAULT_LOGGER = new ConsoleLogger();
var Logger = class {
  constructor(context, options = {}) {
    this.context = context;
    this.options = options;
  }
  get localInstance() {
    if (Logger.staticInstanceRef === DEFAULT_LOGGER) {
      return this.registerLocalInstanceRef();
    } else if (Logger.staticInstanceRef instanceof Logger) {
      const prototype = Object.getPrototypeOf(Logger.staticInstanceRef);
      if (prototype.constructor === Logger) {
        return this.registerLocalInstanceRef();
      }
    }
    return Logger.staticInstanceRef;
  }
  error(message, ...optionalParams) {
    var _a;
    optionalParams = this.context ? optionalParams.concat(this.context) : optionalParams;
    (_a = this.localInstance) == null ? void 0 : _a.error(message, ...optionalParams);
  }
  log(message, ...optionalParams) {
    var _a;
    optionalParams = this.context ? optionalParams.concat(this.context) : optionalParams;
    (_a = this.localInstance) == null ? void 0 : _a.log(message, ...optionalParams);
  }
  warn(message, ...optionalParams) {
    var _a;
    optionalParams = this.context ? optionalParams.concat(this.context) : optionalParams;
    (_a = this.localInstance) == null ? void 0 : _a.warn(message, ...optionalParams);
  }
  debug(message, ...optionalParams) {
    var _a, _b;
    optionalParams = this.context ? optionalParams.concat(this.context) : optionalParams;
    (_b = (_a = this.localInstance) == null ? void 0 : _a.debug) == null ? void 0 : _b.call(_a, message, ...optionalParams);
  }
  verbose(message, ...optionalParams) {
    var _a, _b;
    optionalParams = this.context ? optionalParams.concat(this.context) : optionalParams;
    (_b = (_a = this.localInstance) == null ? void 0 : _a.verbose) == null ? void 0 : _b.call(_a, message, ...optionalParams);
  }
  static error(message, ...optionalParams) {
    var _a;
    (_a = this.staticInstanceRef) == null ? void 0 : _a.error(message, ...optionalParams);
  }
  static log(message, ...optionalParams) {
    var _a;
    (_a = this.staticInstanceRef) == null ? void 0 : _a.log(message, ...optionalParams);
  }
  static warn(message, ...optionalParams) {
    var _a;
    (_a = this.staticInstanceRef) == null ? void 0 : _a.warn(message, ...optionalParams);
  }
  static debug(message, ...optionalParams) {
    var _a, _b;
    (_b = (_a = this.staticInstanceRef) == null ? void 0 : _a.debug) == null ? void 0 : _b.call(_a, message, ...optionalParams);
  }
  static verbose(message, ...optionalParams) {
    var _a, _b;
    (_b = (_a = this.staticInstanceRef) == null ? void 0 : _a.verbose) == null ? void 0 : _b.call(_a, message, ...optionalParams);
  }
  static flush() {
    this.isBufferAttached = false;
    this.logBuffer.forEach((item) => item.methodRef(...item.arguments));
    this.logBuffer = [];
  }
  static attachBuffer() {
    this.isBufferAttached = true;
  }
  static detachBuffer() {
    this.isBufferAttached = false;
  }
  static getTimestamp() {
    const localeStringOptions = {
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      day: "2-digit",
      month: "2-digit"
    };
    return new Date(Date.now()).toLocaleString(void 0, localeStringOptions);
  }
  static overrideLogger(logger2) {
    var _a;
    if (Array.isArray(logger2)) {
      Logger.logLevels = logger2;
      return (_a = this.staticInstanceRef) == null ? void 0 : _a.setLogLevels(logger2);
    }
    if (isObject(logger2)) {
      if (logger2 instanceof Logger && logger2.constructor !== Logger) {
        const errorMessage = `Using the "extends Logger" instruction is not allowed in Nest v8. Please, use "extends ConsoleLogger" instead.`;
        this.staticInstanceRef.error(errorMessage);
        throw new Error(errorMessage);
      }
      this.staticInstanceRef = logger2;
    } else {
      this.staticInstanceRef = void 0;
    }
  }
  static isLevelEnabled(level) {
    const logLevels = Logger.logLevels;
    return isLogLevelEnabled(level, logLevels);
  }
  registerLocalInstanceRef() {
    var _a;
    if (this.localInstanceRef) {
      return this.localInstanceRef;
    }
    this.localInstanceRef = new ConsoleLogger(this.context, {
      timestamp: (_a = this.options) == null ? void 0 : _a.timestamp,
      logLevels: Logger.logLevels
    });
    return this.localInstanceRef;
  }
};
Logger.logBuffer = new Array();
Logger.staticInstanceRef = DEFAULT_LOGGER;
Logger.WrapBuffer = (target, propertyKey, descriptor) => {
  const originalFn = descriptor.value;
  descriptor.value = function(...args) {
    if (Logger.isBufferAttached) {
      Logger.logBuffer.push({
        methodRef: originalFn.bind(this),
        arguments: args
      });
      return;
    }
    return originalFn.call(this, ...args);
  };
};
__decorateClass([
  Logger.WrapBuffer
], Logger.prototype, "error", 1);
__decorateClass([
  Logger.WrapBuffer
], Logger.prototype, "log", 1);
__decorateClass([
  Logger.WrapBuffer
], Logger.prototype, "warn", 1);
__decorateClass([
  Logger.WrapBuffer
], Logger.prototype, "debug", 1);
__decorateClass([
  Logger.WrapBuffer
], Logger.prototype, "verbose", 1);
__decorateClass([
  Logger.WrapBuffer
], Logger, "error", 1);
__decorateClass([
  Logger.WrapBuffer
], Logger, "log", 1);
__decorateClass([
  Logger.WrapBuffer
], Logger, "warn", 1);
__decorateClass([
  Logger.WrapBuffer
], Logger, "debug", 1);
__decorateClass([
  Logger.WrapBuffer
], Logger, "verbose", 1);
Logger = __decorateClass([
  Injectable(),
  __decorateParam(0, Optional()),
  __decorateParam(1, Optional())
], Logger);

// packages/common/utils/load-package.util.ts
var MISSING_REQUIRED_DEPENDENCY = (name, reason) => `The "${name}" package is missing. Please, make sure to install this library ($ npm install ${name}) to take advantage of ${reason}.`;
var logger = new Logger("PackageLoader");
function loadPackage(packageName, context, loaderFn) {
  try {
    return loaderFn ? loaderFn() : __require(packageName);
  } catch (e) {
    logger.error(MISSING_REQUIRED_DEPENDENCY(packageName, context));
    Logger.flush();
    process.exit(1);
  }
}

// packages/common/cache/default-options.ts
init_esm_shims();
var defaultCacheOptions = {
  ttl: 5,
  max: 100,
  store: "memory"
};

// packages/common/cache/cache.providers.ts
function createCacheManager() {
  return {
    provide: CACHE_MANAGER,
    useFactory: (options) => {
      const cacheManager = loadPackage("cache-manager", "CacheModule", () => require_cache_manager());
      return Array.isArray(options) ? cacheManager.multiCaching(options.map((store) => cacheManager.caching(__spreadValues(__spreadValues({}, defaultCacheOptions), store || {})))) : cacheManager.caching(__spreadValues(__spreadValues({}, defaultCacheOptions), options || {}));
    },
    inject: [CACHE_MODULE_OPTIONS]
  };
}

// packages/common/cache/cache.module.ts
var CacheModule = class {
  static register(options = {}) {
    return {
      module: CacheModule,
      global: options.isGlobal,
      providers: [{ provide: CACHE_MODULE_OPTIONS, useValue: options }]
    };
  }
  static registerAsync(options) {
    return {
      module: CacheModule,
      global: options.isGlobal,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        ...options.extraProviders || []
      ]
    };
  }
  static createAsyncProviders(options) {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      }
    ];
  }
  static createAsyncOptionsProvider(options) {
    if (options.useFactory) {
      return {
        provide: CACHE_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    return {
      provide: CACHE_MODULE_OPTIONS,
      useFactory: async (optionsFactory) => optionsFactory.createCacheOptions(),
      inject: [options.useExisting || options.useClass]
    };
  }
};
CacheModule = __decorateClass([
  Module({
    providers: [createCacheManager()],
    exports: [CACHE_MANAGER]
  })
], CacheModule);

// packages/common/cache/decorators/index.ts
init_esm_shims();

// packages/common/cache/decorators/cache-key.decorator.ts
init_esm_shims();
var CacheKey = (key) => SetMetadata(CACHE_KEY_METADATA, key);

// packages/common/cache/decorators/cache-ttl.decorator.ts
init_esm_shims();
var CacheTTL = (ttl) => SetMetadata(CACHE_TTL_METADATA, ttl);

// packages/common/cache/interceptors/index.ts
init_esm_shims();

// packages/common/cache/interceptors/cache.interceptor.ts
init_esm_shims();
import { of } from "rxjs";
import { tap } from "rxjs/operators";
var HTTP_ADAPTER_HOST = "HttpAdapterHost";
var REFLECTOR = "Reflector";
var CacheInterceptor = class {
  constructor(cacheManager, reflector) {
    this.cacheManager = cacheManager;
    this.reflector = reflector;
    this.allowedMethods = ["GET"];
  }
  async intercept(context, next) {
    var _a;
    const key = this.trackBy(context);
    const ttlValueOrFactory = (_a = this.reflector.get(CACHE_TTL_METADATA, context.getHandler())) != null ? _a : null;
    if (!key) {
      return next.handle();
    }
    try {
      const value = await this.cacheManager.get(key);
      if (!isNil(value)) {
        return of(value);
      }
      const ttl = isFunction(ttlValueOrFactory) ? await ttlValueOrFactory(context) : ttlValueOrFactory;
      return next.handle().pipe(tap((response) => {
        const args = isNil(ttl) ? [key, response] : [key, response, { ttl }];
        this.cacheManager.set(...args);
      }));
    } catch {
      return next.handle();
    }
  }
  trackBy(context) {
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod;
    const cacheMetadata = this.reflector.get(CACHE_KEY_METADATA, context.getHandler());
    if (!isHttpApp || cacheMetadata) {
      return cacheMetadata;
    }
    const request = context.getArgByIndex(0);
    if (!this.isRequestCacheable(context)) {
      return void 0;
    }
    return httpAdapter.getRequestUrl(request);
  }
  isRequestCacheable(context) {
    const req = context.switchToHttp().getRequest();
    return this.allowedMethods.includes(req.method);
  }
};
__decorateClass([
  Optional(),
  Inject(HTTP_ADAPTER_HOST)
], CacheInterceptor.prototype, "httpAdapterHost", 2);
CacheInterceptor = __decorateClass([
  Injectable(),
  __decorateParam(0, Inject(CACHE_MANAGER)),
  __decorateParam(1, Inject(REFLECTOR))
], CacheInterceptor);

// packages/common/cache/interfaces/index.ts
init_esm_shims();

// packages/common/cache/interfaces/cache-manager.interface.ts
init_esm_shims();

// packages/common/cache/interfaces/cache-module.interface.ts
init_esm_shims();

// packages/common/enums/index.ts
init_esm_shims();

// packages/common/enums/http-status.enum.ts
init_esm_shims();
var HttpStatus = /* @__PURE__ */ ((HttpStatus2) => {
  HttpStatus2[HttpStatus2["CONTINUE"] = 100] = "CONTINUE";
  HttpStatus2[HttpStatus2["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
  HttpStatus2[HttpStatus2["PROCESSING"] = 102] = "PROCESSING";
  HttpStatus2[HttpStatus2["EARLYHINTS"] = 103] = "EARLYHINTS";
  HttpStatus2[HttpStatus2["OK"] = 200] = "OK";
  HttpStatus2[HttpStatus2["CREATED"] = 201] = "CREATED";
  HttpStatus2[HttpStatus2["ACCEPTED"] = 202] = "ACCEPTED";
  HttpStatus2[HttpStatus2["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
  HttpStatus2[HttpStatus2["NO_CONTENT"] = 204] = "NO_CONTENT";
  HttpStatus2[HttpStatus2["RESET_CONTENT"] = 205] = "RESET_CONTENT";
  HttpStatus2[HttpStatus2["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
  HttpStatus2[HttpStatus2["AMBIGUOUS"] = 300] = "AMBIGUOUS";
  HttpStatus2[HttpStatus2["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
  HttpStatus2[HttpStatus2["FOUND"] = 302] = "FOUND";
  HttpStatus2[HttpStatus2["SEE_OTHER"] = 303] = "SEE_OTHER";
  HttpStatus2[HttpStatus2["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
  HttpStatus2[HttpStatus2["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
  HttpStatus2[HttpStatus2["PERMANENT_REDIRECT"] = 308] = "PERMANENT_REDIRECT";
  HttpStatus2[HttpStatus2["BAD_REQUEST"] = 400] = "BAD_REQUEST";
  HttpStatus2[HttpStatus2["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
  HttpStatus2[HttpStatus2["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
  HttpStatus2[HttpStatus2["FORBIDDEN"] = 403] = "FORBIDDEN";
  HttpStatus2[HttpStatus2["NOT_FOUND"] = 404] = "NOT_FOUND";
  HttpStatus2[HttpStatus2["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
  HttpStatus2[HttpStatus2["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
  HttpStatus2[HttpStatus2["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
  HttpStatus2[HttpStatus2["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
  HttpStatus2[HttpStatus2["CONFLICT"] = 409] = "CONFLICT";
  HttpStatus2[HttpStatus2["GONE"] = 410] = "GONE";
  HttpStatus2[HttpStatus2["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
  HttpStatus2[HttpStatus2["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
  HttpStatus2[HttpStatus2["PAYLOAD_TOO_LARGE"] = 413] = "PAYLOAD_TOO_LARGE";
  HttpStatus2[HttpStatus2["URI_TOO_LONG"] = 414] = "URI_TOO_LONG";
  HttpStatus2[HttpStatus2["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
  HttpStatus2[HttpStatus2["REQUESTED_RANGE_NOT_SATISFIABLE"] = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE";
  HttpStatus2[HttpStatus2["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
  HttpStatus2[HttpStatus2["I_AM_A_TEAPOT"] = 418] = "I_AM_A_TEAPOT";
  HttpStatus2[HttpStatus2["MISDIRECTED"] = 421] = "MISDIRECTED";
  HttpStatus2[HttpStatus2["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
  HttpStatus2[HttpStatus2["FAILED_DEPENDENCY"] = 424] = "FAILED_DEPENDENCY";
  HttpStatus2[HttpStatus2["PRECONDITION_REQUIRED"] = 428] = "PRECONDITION_REQUIRED";
  HttpStatus2[HttpStatus2["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
  HttpStatus2[HttpStatus2["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
  HttpStatus2[HttpStatus2["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
  HttpStatus2[HttpStatus2["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
  HttpStatus2[HttpStatus2["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
  HttpStatus2[HttpStatus2["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
  HttpStatus2[HttpStatus2["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
  return HttpStatus2;
})(HttpStatus || {});

// packages/common/enums/shutdown-signal.enum.ts
init_esm_shims();
var ShutdownSignal = /* @__PURE__ */ ((ShutdownSignal2) => {
  ShutdownSignal2["SIGHUP"] = "SIGHUP";
  ShutdownSignal2["SIGINT"] = "SIGINT";
  ShutdownSignal2["SIGQUIT"] = "SIGQUIT";
  ShutdownSignal2["SIGILL"] = "SIGILL";
  ShutdownSignal2["SIGTRAP"] = "SIGTRAP";
  ShutdownSignal2["SIGABRT"] = "SIGABRT";
  ShutdownSignal2["SIGBUS"] = "SIGBUS";
  ShutdownSignal2["SIGFPE"] = "SIGFPE";
  ShutdownSignal2["SIGSEGV"] = "SIGSEGV";
  ShutdownSignal2["SIGUSR2"] = "SIGUSR2";
  ShutdownSignal2["SIGTERM"] = "SIGTERM";
  return ShutdownSignal2;
})(ShutdownSignal || {});

// packages/common/enums/version-type.enum.ts
init_esm_shims();
var VersioningType = /* @__PURE__ */ ((VersioningType2) => {
  VersioningType2[VersioningType2["URI"] = 0] = "URI";
  VersioningType2[VersioningType2["HEADER"] = 1] = "HEADER";
  VersioningType2[VersioningType2["MEDIA_TYPE"] = 2] = "MEDIA_TYPE";
  VersioningType2[VersioningType2["CUSTOM"] = 3] = "CUSTOM";
  return VersioningType2;
})(VersioningType || {});

// packages/common/exceptions/index.ts
init_esm_shims();

// packages/common/exceptions/bad-request.exception.ts
init_esm_shims();

// packages/common/exceptions/http.exception.ts
init_esm_shims();
var HttpException = class extends Error {
  constructor(response, status) {
    super();
    this.response = response;
    this.status = status;
    this.initMessage();
    this.initName();
  }
  initMessage() {
    if (isString(this.response)) {
      this.message = this.response;
    } else if (isObject(this.response) && isString(this.response.message)) {
      this.message = this.response.message;
    } else if (this.constructor) {
      this.message = this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g).join(" ");
    }
  }
  initName() {
    this.name = this.constructor.name;
  }
  getResponse() {
    return this.response;
  }
  getStatus() {
    return this.status;
  }
  static createBody(objectOrError, description, statusCode) {
    if (!objectOrError) {
      return { statusCode, message: description };
    }
    return isObject(objectOrError) && !Array.isArray(objectOrError) ? objectOrError : { statusCode, message: objectOrError, error: description };
  }
};

// packages/common/exceptions/bad-request.exception.ts
var BadRequestException = class extends HttpException {
  constructor(objectOrError, description = "Bad Request") {
    super(HttpException.createBody(objectOrError, description, 400 /* BAD_REQUEST */), 400 /* BAD_REQUEST */);
  }
};

// packages/common/exceptions/unauthorized.exception.ts
init_esm_shims();
var UnauthorizedException = class extends HttpException {
  constructor(objectOrError, description = "Unauthorized") {
    super(HttpException.createBody(objectOrError, description, 401 /* UNAUTHORIZED */), 401 /* UNAUTHORIZED */);
  }
};

// packages/common/exceptions/method-not-allowed.exception.ts
init_esm_shims();
var MethodNotAllowedException = class extends HttpException {
  constructor(objectOrError, description = "Method Not Allowed") {
    super(HttpException.createBody(objectOrError, description, 405 /* METHOD_NOT_ALLOWED */), 405 /* METHOD_NOT_ALLOWED */);
  }
};

// packages/common/exceptions/not-found.exception.ts
init_esm_shims();
var NotFoundException = class extends HttpException {
  constructor(objectOrError, description = "Not Found") {
    super(HttpException.createBody(objectOrError, description, 404 /* NOT_FOUND */), 404 /* NOT_FOUND */);
  }
};

// packages/common/exceptions/forbidden.exception.ts
init_esm_shims();
var ForbiddenException = class extends HttpException {
  constructor(objectOrError, description = "Forbidden") {
    super(HttpException.createBody(objectOrError, description, 403 /* FORBIDDEN */), 403 /* FORBIDDEN */);
  }
};

// packages/common/exceptions/not-acceptable.exception.ts
init_esm_shims();
var NotAcceptableException = class extends HttpException {
  constructor(objectOrError, description = "Not Acceptable") {
    super(HttpException.createBody(objectOrError, description, 406 /* NOT_ACCEPTABLE */), 406 /* NOT_ACCEPTABLE */);
  }
};

// packages/common/exceptions/request-timeout.exception.ts
init_esm_shims();
var RequestTimeoutException = class extends HttpException {
  constructor(objectOrError, description = "Request Timeout") {
    super(HttpException.createBody(objectOrError, description, 408 /* REQUEST_TIMEOUT */), 408 /* REQUEST_TIMEOUT */);
  }
};

// packages/common/exceptions/conflict.exception.ts
init_esm_shims();
var ConflictException = class extends HttpException {
  constructor(objectOrError, description = "Conflict") {
    super(HttpException.createBody(objectOrError, description, 409 /* CONFLICT */), 409 /* CONFLICT */);
  }
};

// packages/common/exceptions/gone.exception.ts
init_esm_shims();
var GoneException = class extends HttpException {
  constructor(objectOrError, description = "Gone") {
    super(HttpException.createBody(objectOrError, description, 410 /* GONE */), 410 /* GONE */);
  }
};

// packages/common/exceptions/payload-too-large.exception.ts
init_esm_shims();
var PayloadTooLargeException = class extends HttpException {
  constructor(objectOrError, description = "Payload Too Large") {
    super(HttpException.createBody(objectOrError, description, 413 /* PAYLOAD_TOO_LARGE */), 413 /* PAYLOAD_TOO_LARGE */);
  }
};

// packages/common/exceptions/unsupported-media-type.exception.ts
init_esm_shims();
var UnsupportedMediaTypeException = class extends HttpException {
  constructor(objectOrError, description = "Unsupported Media Type") {
    super(HttpException.createBody(objectOrError, description, 415 /* UNSUPPORTED_MEDIA_TYPE */), 415 /* UNSUPPORTED_MEDIA_TYPE */);
  }
};

// packages/common/exceptions/unprocessable-entity.exception.ts
init_esm_shims();
var UnprocessableEntityException = class extends HttpException {
  constructor(objectOrError, description = "Unprocessable Entity") {
    super(HttpException.createBody(objectOrError, description, 422 /* UNPROCESSABLE_ENTITY */), 422 /* UNPROCESSABLE_ENTITY */);
  }
};

// packages/common/exceptions/internal-server-error.exception.ts
init_esm_shims();
var InternalServerErrorException = class extends HttpException {
  constructor(objectOrError, description = "Internal Server Error") {
    super(HttpException.createBody(objectOrError, description, 500 /* INTERNAL_SERVER_ERROR */), 500 /* INTERNAL_SERVER_ERROR */);
  }
};

// packages/common/exceptions/not-implemented.exception.ts
init_esm_shims();
var NotImplementedException = class extends HttpException {
  constructor(objectOrError, description = "Not Implemented") {
    super(HttpException.createBody(objectOrError, description, 501 /* NOT_IMPLEMENTED */), 501 /* NOT_IMPLEMENTED */);
  }
};

// packages/common/exceptions/http-version-not-supported.exception.ts
init_esm_shims();
var HttpVersionNotSupportedException = class extends HttpException {
  constructor(objectOrError, description = "HTTP Version Not Supported") {
    super(HttpException.createBody(objectOrError, description, 505 /* HTTP_VERSION_NOT_SUPPORTED */), 505 /* HTTP_VERSION_NOT_SUPPORTED */);
  }
};

// packages/common/exceptions/bad-gateway.exception.ts
init_esm_shims();
var BadGatewayException = class extends HttpException {
  constructor(objectOrError, description = "Bad Gateway") {
    super(HttpException.createBody(objectOrError, description, 502 /* BAD_GATEWAY */), 502 /* BAD_GATEWAY */);
  }
};

// packages/common/exceptions/service-unavailable.exception.ts
init_esm_shims();
var ServiceUnavailableException = class extends HttpException {
  constructor(objectOrError, description = "Service Unavailable") {
    super(HttpException.createBody(objectOrError, description, 503 /* SERVICE_UNAVAILABLE */), 503 /* SERVICE_UNAVAILABLE */);
  }
};

// packages/common/exceptions/gateway-timeout.exception.ts
init_esm_shims();
var GatewayTimeoutException = class extends HttpException {
  constructor(objectOrError, description = "Gateway Timeout") {
    super(HttpException.createBody(objectOrError, description, 504 /* GATEWAY_TIMEOUT */), 504 /* GATEWAY_TIMEOUT */);
  }
};

// packages/common/exceptions/im-a-teapot.exception.ts
init_esm_shims();
var ImATeapotException = class extends HttpException {
  constructor(objectOrError, description = `I'm a teapot`) {
    super(HttpException.createBody(objectOrError, description, 418 /* I_AM_A_TEAPOT */), 418 /* I_AM_A_TEAPOT */);
  }
};

// packages/common/exceptions/precondition-failed.exception.ts
init_esm_shims();
var PreconditionFailedException = class extends HttpException {
  constructor(objectOrError, description = "Precondition Failed") {
    super(HttpException.createBody(objectOrError, description, 412 /* PRECONDITION_FAILED */), 412 /* PRECONDITION_FAILED */);
  }
};

// packages/common/exceptions/misdirected.exception.ts
init_esm_shims();
var MisdirectedException = class extends HttpException {
  constructor(objectOrError, description = "Misdirected") {
    super(HttpException.createBody(objectOrError, description, 421 /* MISDIRECTED */), 421 /* MISDIRECTED */);
  }
};

// packages/common/file-stream/index.ts
init_esm_shims();

// packages/common/file-stream/streamable-file.ts
init_esm_shims();
import { Readable } from "stream";
import { types } from "util";
var StreamableFile = class {
  constructor(bufferOrReadStream, options = {}) {
    this.options = options;
    if (types.isUint8Array(bufferOrReadStream)) {
      this.stream = new Readable();
      this.stream.push(bufferOrReadStream);
      this.stream.push(null);
    } else if (bufferOrReadStream.pipe && isFunction(bufferOrReadStream.pipe)) {
      this.stream = bufferOrReadStream;
    }
  }
  getStream() {
    return this.stream;
  }
  getHeaders() {
    const {
      type = "application/octet-stream",
      disposition = void 0,
      length = void 0
    } = this.options;
    return {
      type,
      disposition,
      length
    };
  }
};

// packages/common/http/index.ts
init_esm_shims();

// packages/common/http/http.module.ts
init_esm_shims();
import Axios2 from "axios";

// packages/common/utils/random-string-generator.util.ts
init_esm_shims();
import { v4 as uuid3 } from "uuid";
var randomStringGenerator = () => uuid3();

// packages/common/http/http.constants.ts
init_esm_shims();
var AXIOS_INSTANCE_TOKEN = "AXIOS_INSTANCE_TOKEN";
var HTTP_MODULE_ID = "HTTP_MODULE_ID";
var HTTP_MODULE_OPTIONS = "HTTP_MODULE_OPTIONS";

// packages/common/http/http.service.ts
init_esm_shims();
import Axios from "axios";
import { Observable as Observable2 } from "rxjs";

// packages/common/services/index.ts
init_esm_shims();

// packages/common/http/http.service.ts
var HttpService = class {
  constructor(instance = Axios) {
    this.instance = instance;
    this.logger = new Logger(HttpService.name);
    this.logger.warn('DEPRECATED! "HttpModule" (from the "@nestjs/common" package) is deprecated and will be removed in the next major release. Please, use the "@nestjs/axios" package instead.');
  }
  request(config) {
    return this.makeObservable(this.instance.request, config);
  }
  get(url, config) {
    return this.makeObservable(this.instance.get, url, config);
  }
  delete(url, config) {
    return this.makeObservable(this.instance.delete, url, config);
  }
  head(url, config) {
    return this.makeObservable(this.instance.head, url, config);
  }
  post(url, data, config) {
    return this.makeObservable(this.instance.post, url, data, config);
  }
  put(url, data, config) {
    return this.makeObservable(this.instance.put, url, data, config);
  }
  patch(url, data, config) {
    return this.makeObservable(this.instance.patch, url, data, config);
  }
  get axiosRef() {
    return this.instance;
  }
  makeObservable(axios, ...args) {
    return new Observable2((subscriber) => {
      const config = __spreadValues({}, args[args.length - 1] || {});
      let cancelSource;
      if (!config.cancelToken) {
        cancelSource = Axios.CancelToken.source();
        config.cancelToken = cancelSource.token;
      }
      axios(...args).then((res) => {
        subscriber.next(res);
        subscriber.complete();
      }).catch((err) => {
        subscriber.error(err);
      });
      return () => {
        if (config.responseType === "stream") {
          return;
        }
        if (cancelSource) {
          cancelSource.cancel();
        }
      };
    });
  }
};
HttpService = __decorateClass([
  __decorateParam(0, Inject(AXIOS_INSTANCE_TOKEN))
], HttpService);

// packages/common/http/http.module.ts
var HttpModule = class {
  static register(config) {
    return {
      module: HttpModule,
      providers: [
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useValue: Axios2.create(config)
        },
        {
          provide: HTTP_MODULE_ID,
          useValue: randomStringGenerator()
        }
      ]
    };
  }
  static registerAsync(options) {
    return {
      module: HttpModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useFactory: (config) => Axios2.create(config),
          inject: [HTTP_MODULE_OPTIONS]
        },
        {
          provide: HTTP_MODULE_ID,
          useValue: randomStringGenerator()
        },
        ...options.extraProviders || []
      ]
    };
  }
  static createAsyncProviders(options) {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      }
    ];
  }
  static createAsyncOptionsProvider(options) {
    if (options.useFactory) {
      return {
        provide: HTTP_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    return {
      provide: HTTP_MODULE_OPTIONS,
      useFactory: async (optionsFactory) => optionsFactory.createHttpOptions(),
      inject: [options.useExisting || options.useClass]
    };
  }
};
HttpModule = __decorateClass([
  Module({
    providers: [
      HttpService,
      {
        provide: AXIOS_INSTANCE_TOKEN,
        useValue: Axios2
      }
    ],
    exports: [HttpService]
  })
], HttpModule);

// packages/common/http/interfaces/index.ts
init_esm_shims();

// packages/common/http/interfaces/http-module.interface.ts
init_esm_shims();

// packages/common/interfaces/index.ts
init_esm_shims();

// packages/common/interfaces/abstract.interface.ts
init_esm_shims();

// packages/common/interfaces/controllers/controller-metadata.interface.ts
init_esm_shims();

// packages/common/interfaces/controllers/controller.interface.ts
init_esm_shims();

// packages/common/interfaces/exceptions/exception-filter.interface.ts
init_esm_shims();

// packages/common/interfaces/exceptions/rpc-exception-filter.interface.ts
init_esm_shims();

// packages/common/interfaces/exceptions/ws-exception-filter.interface.ts
init_esm_shims();

// packages/common/interfaces/external/validation-error.interface.ts
init_esm_shims();

// packages/common/interfaces/features/arguments-host.interface.ts
init_esm_shims();

// packages/common/interfaces/features/can-activate.interface.ts
init_esm_shims();

// packages/common/interfaces/features/custom-route-param-factory.interface.ts
init_esm_shims();

// packages/common/interfaces/features/execution-context.interface.ts
init_esm_shims();

// packages/common/interfaces/features/nest-interceptor.interface.ts
init_esm_shims();

// packages/common/interfaces/features/paramtype.interface.ts
init_esm_shims();

// packages/common/interfaces/features/pipe-transform.interface.ts
init_esm_shims();

// packages/common/interfaces/global-prefix-options.interface.ts
init_esm_shims();

// packages/common/interfaces/hooks/index.ts
init_esm_shims();

// packages/common/interfaces/hooks/before-application-shutdown.interface.ts
init_esm_shims();

// packages/common/interfaces/hooks/on-application-bootstrap.interface.ts
init_esm_shims();

// packages/common/interfaces/hooks/on-application-shutdown.interface.ts
init_esm_shims();

// packages/common/interfaces/hooks/on-destroy.interface.ts
init_esm_shims();

// packages/common/interfaces/hooks/on-init.interface.ts
init_esm_shims();

// packages/common/interfaces/http/index.ts
init_esm_shims();

// packages/common/interfaces/http/http-server.interface.ts
init_esm_shims();

// packages/common/interfaces/http/message-event.interface.ts
init_esm_shims();

// packages/common/interfaces/injectable.interface.ts
init_esm_shims();

// packages/common/interfaces/microservices/nest-hybrid-application-options.interface.ts
init_esm_shims();

// packages/common/interfaces/middleware/index.ts
init_esm_shims();

// packages/common/interfaces/middleware/middleware-config-proxy.interface.ts
init_esm_shims();

// packages/common/interfaces/middleware/middleware-configuration.interface.ts
init_esm_shims();

// packages/common/interfaces/middleware/middleware-consumer.interface.ts
init_esm_shims();

// packages/common/interfaces/middleware/nest-middleware.interface.ts
init_esm_shims();

// packages/common/interfaces/modules/index.ts
init_esm_shims();

// packages/common/interfaces/modules/dynamic-module.interface.ts
init_esm_shims();

// packages/common/interfaces/modules/forward-reference.interface.ts
init_esm_shims();

// packages/common/interfaces/modules/injection-token.interface.ts
init_esm_shims();

// packages/common/interfaces/modules/introspection-result.interface.ts
init_esm_shims();

// packages/common/interfaces/modules/module-metadata.interface.ts
init_esm_shims();

// packages/common/interfaces/modules/nest-module.interface.ts
init_esm_shims();

// packages/common/interfaces/modules/optional-factory-dependency.interface.ts
init_esm_shims();

// packages/common/interfaces/modules/provider.interface.ts
init_esm_shims();

// packages/common/interfaces/nest-application-context.interface.ts
init_esm_shims();

// packages/common/interfaces/nest-application-options.interface.ts
init_esm_shims();

// packages/common/interfaces/nest-application.interface.ts
init_esm_shims();

// packages/common/interfaces/nest-microservice.interface.ts
init_esm_shims();

// packages/common/interfaces/scope-options.interface.ts
init_esm_shims();
var Scope = /* @__PURE__ */ ((Scope2) => {
  Scope2[Scope2["DEFAULT"] = 0] = "DEFAULT";
  Scope2[Scope2["TRANSIENT"] = 1] = "TRANSIENT";
  Scope2[Scope2["REQUEST"] = 2] = "REQUEST";
  return Scope2;
})(Scope || {});

// packages/common/interfaces/type.interface.ts
init_esm_shims();

// packages/common/interfaces/version-options.interface.ts
init_esm_shims();
var VERSION_NEUTRAL = Symbol("VERSION_NEUTRAL");

// packages/common/interfaces/websockets/web-socket-adapter.interface.ts
init_esm_shims();

// packages/common/pipes/index.ts
init_esm_shims();

// packages/common/pipes/default-value.pipe.ts
init_esm_shims();
var DefaultValuePipe = class {
  constructor(defaultValue) {
    this.defaultValue = defaultValue;
  }
  transform(value, _metadata) {
    if (isNil(value) || isNumber(value) && isNaN(value)) {
      return this.defaultValue;
    }
    return value;
  }
};
DefaultValuePipe = __decorateClass([
  Injectable()
], DefaultValuePipe);

// packages/common/pipes/parse-array.pipe.ts
init_esm_shims();

// packages/common/utils/http-error-by-code.util.ts
init_esm_shims();
var HttpErrorByCode = {
  [502 /* BAD_GATEWAY */]: BadGatewayException,
  [400 /* BAD_REQUEST */]: BadRequestException,
  [409 /* CONFLICT */]: ConflictException,
  [403 /* FORBIDDEN */]: ForbiddenException,
  [504 /* GATEWAY_TIMEOUT */]: GatewayTimeoutException,
  [410 /* GONE */]: GoneException,
  [418 /* I_AM_A_TEAPOT */]: ImATeapotException,
  [500 /* INTERNAL_SERVER_ERROR */]: InternalServerErrorException,
  [405 /* METHOD_NOT_ALLOWED */]: MethodNotAllowedException,
  [406 /* NOT_ACCEPTABLE */]: NotAcceptableException,
  [404 /* NOT_FOUND */]: NotFoundException,
  [501 /* NOT_IMPLEMENTED */]: NotImplementedException,
  [413 /* PAYLOAD_TOO_LARGE */]: PayloadTooLargeException,
  [412 /* PRECONDITION_FAILED */]: PreconditionFailedException,
  [408 /* REQUEST_TIMEOUT */]: RequestTimeoutException,
  [503 /* SERVICE_UNAVAILABLE */]: ServiceUnavailableException,
  [401 /* UNAUTHORIZED */]: UnauthorizedException,
  [422 /* UNPROCESSABLE_ENTITY */]: UnprocessableEntityException,
  [415 /* UNSUPPORTED_MEDIA_TYPE */]: UnsupportedMediaTypeException
};

// packages/common/pipes/validation.pipe.ts
init_esm_shims();
import { iterate } from "iterare";
var classValidator = {};
var classTransformer = {};
var ValidationPipe = class {
  constructor(options) {
    options = options || {};
    const _a = options, {
      transform: transform2,
      disableErrorMessages,
      errorHttpStatusCode,
      expectedType,
      transformOptions,
      validateCustomDecorators
    } = _a, validatorOptions = __objRest(_a, [
      "transform",
      "disableErrorMessages",
      "errorHttpStatusCode",
      "expectedType",
      "transformOptions",
      "validateCustomDecorators"
    ]);
    this.isTransformEnabled = !!transform2;
    this.validatorOptions = validatorOptions;
    this.transformOptions = transformOptions;
    this.isDetailedOutputDisabled = disableErrorMessages;
    this.validateCustomDecorators = validateCustomDecorators || false;
    this.errorHttpStatusCode = errorHttpStatusCode || 400 /* BAD_REQUEST */;
    this.expectedType = expectedType;
    this.exceptionFactory = options.exceptionFactory || this.createExceptionFactory();
    classValidator = this.loadValidator(options.validatorPackage);
    classTransformer = this.loadTransformer(options.transformerPackage);
  }
  loadValidator(validatorPackage) {
    return validatorPackage != null ? validatorPackage : loadPackage("class-validator", "ValidationPipe", () => __require("class-validator"));
  }
  loadTransformer(transformerPackage) {
    return transformerPackage != null ? transformerPackage : loadPackage("class-transformer", "ValidationPipe", () => __require("class-transformer"));
  }
  async transform(value, metadata) {
    if (this.expectedType) {
      metadata = __spreadProps(__spreadValues({}, metadata), { metatype: this.expectedType });
    }
    const metatype = metadata.metatype;
    if (!metatype || !this.toValidate(metadata)) {
      return this.isTransformEnabled ? this.transformPrimitive(value, metadata) : value;
    }
    const originalValue = value;
    value = this.toEmptyIfNil(value);
    const isNil2 = value !== originalValue;
    const isPrimitive = this.isPrimitive(value);
    this.stripProtoKeys(value);
    let entity = classTransformer.plainToClass(metatype, value, this.transformOptions);
    const originalEntity = entity;
    const isCtorNotEqual = entity.constructor !== metatype;
    if (isCtorNotEqual && !isPrimitive) {
      entity.constructor = metatype;
    } else if (isCtorNotEqual) {
      entity = { constructor: metatype };
    }
    const errors = await this.validate(entity, this.validatorOptions);
    if (errors.length > 0) {
      throw await this.exceptionFactory(errors);
    }
    if (isPrimitive) {
      entity = originalEntity;
    }
    if (this.isTransformEnabled) {
      return entity;
    }
    if (isNil2) {
      return originalValue;
    }
    return Object.keys(this.validatorOptions).length > 0 ? classTransformer.classToPlain(entity, this.transformOptions) : value;
  }
  createExceptionFactory() {
    return (validationErrors = []) => {
      if (this.isDetailedOutputDisabled) {
        return new HttpErrorByCode[this.errorHttpStatusCode]();
      }
      const errors = this.flattenValidationErrors(validationErrors);
      return new HttpErrorByCode[this.errorHttpStatusCode](errors);
    };
  }
  toValidate(metadata) {
    const { metatype, type } = metadata;
    if (type === "custom" && !this.validateCustomDecorators) {
      return false;
    }
    const types2 = [String, Boolean, Number, Array, Object, Buffer];
    return !types2.some((t) => metatype === t) && !isNil(metatype);
  }
  transformPrimitive(value, metadata) {
    if (!metadata.data) {
      return value;
    }
    const { type, metatype } = metadata;
    if (type !== "param" && type !== "query") {
      return value;
    }
    if (metatype === Boolean) {
      return value === true || value === "true";
    }
    if (metatype === Number) {
      return +value;
    }
    return value;
  }
  toEmptyIfNil(value) {
    return isNil(value) ? {} : value;
  }
  stripProtoKeys(value) {
    delete value.__proto__;
    const keys = Object.keys(value);
    iterate(keys).filter((key) => isObject(value[key]) && value[key]).forEach((key) => this.stripProtoKeys(value[key]));
  }
  isPrimitive(value) {
    return ["number", "boolean", "string"].includes(typeof value);
  }
  validate(object, validatorOptions) {
    return classValidator.validate(object, validatorOptions);
  }
  flattenValidationErrors(validationErrors) {
    return iterate(validationErrors).map((error) => this.mapChildrenToValidationErrors(error)).flatten().filter((item) => !!item.constraints).map((item) => Object.values(item.constraints)).flatten().toArray();
  }
  mapChildrenToValidationErrors(error, parentPath) {
    if (!(error.children && error.children.length)) {
      return [error];
    }
    const validationErrors = [];
    parentPath = parentPath ? `${parentPath}.${error.property}` : error.property;
    for (const item of error.children) {
      if (item.children && item.children.length) {
        validationErrors.push(...this.mapChildrenToValidationErrors(item, parentPath));
      }
      validationErrors.push(this.prependConstraintsWithParentProp(parentPath, item));
    }
    return validationErrors;
  }
  prependConstraintsWithParentProp(parentPath, error) {
    const constraints = {};
    for (const key in error.constraints) {
      constraints[key] = `${parentPath}.${error.constraints[key]}`;
    }
    return __spreadProps(__spreadValues({}, error), {
      constraints
    });
  }
};
ValidationPipe = __decorateClass([
  Injectable(),
  __decorateParam(0, Optional())
], ValidationPipe);

// packages/common/pipes/parse-array.pipe.ts
var VALIDATION_ERROR_MESSAGE = "Validation failed (parsable array expected)";
var DEFAULT_ARRAY_SEPARATOR = ",";
var ParseArrayPipe = class {
  constructor(options = {}) {
    this.options = options;
    this.validationPipe = new ValidationPipe(__spreadValues({
      transform: true,
      validateCustomDecorators: true
    }, options));
    const { exceptionFactory, errorHttpStatusCode = 400 /* BAD_REQUEST */ } = options;
    this.exceptionFactory = exceptionFactory || ((error) => new HttpErrorByCode[errorHttpStatusCode](error));
  }
  async transform(value, metadata) {
    if (!value && !this.options.optional) {
      throw this.exceptionFactory(VALIDATION_ERROR_MESSAGE);
    } else if (isNil(value) && this.options.optional) {
      return value;
    }
    if (!Array.isArray(value)) {
      if (!isString(value)) {
        throw this.exceptionFactory(VALIDATION_ERROR_MESSAGE);
      } else {
        try {
          value = value.trim().split(this.options.separator || DEFAULT_ARRAY_SEPARATOR);
        } catch {
          throw this.exceptionFactory(VALIDATION_ERROR_MESSAGE);
        }
      }
    }
    if (this.options.items) {
      const validationMetadata = {
        metatype: this.options.items,
        type: "query"
      };
      const isExpectedTypePrimitive = this.isExpectedTypePrimitive();
      const toClassInstance = (item, index2) => {
        try {
          item = JSON.parse(item);
        } catch {
        }
        if (isExpectedTypePrimitive) {
          return this.validatePrimitive(item, index2);
        }
        return this.validationPipe.transform(item, validationMetadata);
      };
      if (this.options.stopAtFirstError === false) {
        let errors = [];
        const targetArray = value;
        for (let i = 0; i < targetArray.length; i++) {
          try {
            targetArray[i] = await toClassInstance(targetArray[i]);
          } catch (err) {
            let message;
            if (err.getResponse) {
              const response = err.getResponse();
              if (Array.isArray(response.message)) {
                message = response.message.map((item) => `[${i}] ${item}`);
              } else {
                message = `[${i}] ${response.message}`;
              }
            } else {
              message = err;
            }
            errors = errors.concat(message);
          }
        }
        if (errors.length > 0) {
          throw this.exceptionFactory(errors);
        }
        return targetArray;
      } else {
        value = await Promise.all(value.map(toClassInstance));
      }
    }
    return value;
  }
  isExpectedTypePrimitive() {
    return [Boolean, Number, String].includes(this.options.items);
  }
  validatePrimitive(originalValue, index2) {
    if (this.options.items === Number) {
      const value = originalValue !== null && originalValue !== "" ? +originalValue : NaN;
      if (isNaN(value)) {
        throw this.exceptionFactory(`${isUndefined(index2) ? "" : `[${index2}] `}item must be a number`);
      }
      return value;
    } else if (this.options.items === String) {
      if (!isString(originalValue)) {
        return `${originalValue}`;
      }
    } else if (this.options.items === Boolean) {
      if (typeof originalValue !== "boolean") {
        throw this.exceptionFactory(`${isUndefined(index2) ? "" : `[${index2}] `}item must be a boolean value`);
      }
    }
    return originalValue;
  }
};
ParseArrayPipe = __decorateClass([
  Injectable(),
  __decorateParam(0, Optional())
], ParseArrayPipe);

// packages/common/pipes/parse-bool.pipe.ts
init_esm_shims();
var ParseBoolPipe = class {
  constructor(options) {
    options = options || {};
    const { exceptionFactory, errorHttpStatusCode = 400 /* BAD_REQUEST */ } = options;
    this.exceptionFactory = exceptionFactory || ((error) => new HttpErrorByCode[errorHttpStatusCode](error));
  }
  async transform(value, metadata) {
    if (value === true || value === "true") {
      return true;
    }
    if (value === false || value === "false") {
      return false;
    }
    throw this.exceptionFactory("Validation failed (boolean string is expected)");
  }
};
ParseBoolPipe = __decorateClass([
  Injectable(),
  __decorateParam(0, Optional())
], ParseBoolPipe);

// packages/common/pipes/parse-int.pipe.ts
init_esm_shims();
var ParseIntPipe = class {
  constructor(options) {
    options = options || {};
    const { exceptionFactory, errorHttpStatusCode = 400 /* BAD_REQUEST */ } = options;
    this.exceptionFactory = exceptionFactory || ((error) => new HttpErrorByCode[errorHttpStatusCode](error));
  }
  async transform(value, metadata) {
    const isNumeric = ["string", "number"].includes(typeof value) && /^-?\d+$/.test(value) && isFinite(value);
    if (!isNumeric) {
      throw this.exceptionFactory("Validation failed (numeric string is expected)");
    }
    return parseInt(value, 10);
  }
};
ParseIntPipe = __decorateClass([
  Injectable(),
  __decorateParam(0, Optional())
], ParseIntPipe);

// packages/common/pipes/parse-float.pipe.ts
init_esm_shims();
var ParseFloatPipe = class {
  constructor(options) {
    options = options || {};
    const { exceptionFactory, errorHttpStatusCode = 400 /* BAD_REQUEST */ } = options;
    this.exceptionFactory = exceptionFactory || ((error) => new HttpErrorByCode[errorHttpStatusCode](error));
  }
  async transform(value, metadata) {
    const isNumeric = ["string", "number"].includes(typeof value) && !isNaN(parseFloat(value)) && isFinite(value);
    if (!isNumeric) {
      throw this.exceptionFactory("Validation failed (numeric string is expected)");
    }
    return parseFloat(value);
  }
};
ParseFloatPipe = __decorateClass([
  Injectable(),
  __decorateParam(0, Optional())
], ParseFloatPipe);

// packages/common/pipes/parse-enum.pipe.ts
init_esm_shims();
var ParseEnumPipe = class {
  constructor(enumType, options) {
    this.enumType = enumType;
    if (!enumType) {
      throw new Error(`"ParseEnumPipe" requires "enumType" argument specified (to validate input values).`);
    }
    options = options || {};
    const { exceptionFactory, errorHttpStatusCode = 400 /* BAD_REQUEST */ } = options;
    this.exceptionFactory = exceptionFactory || ((error) => new HttpErrorByCode[errorHttpStatusCode](error));
  }
  async transform(value, metadata) {
    if (!this.isEnum(value)) {
      throw this.exceptionFactory("Validation failed (enum string is expected)");
    }
    return value;
  }
  isEnum(value) {
    const enumValues = Object.keys(this.enumType).map((item) => this.enumType[item]);
    return enumValues.includes(value);
  }
};
ParseEnumPipe = __decorateClass([
  Injectable(),
  __decorateParam(1, Optional())
], ParseEnumPipe);

// packages/common/pipes/parse-uuid.pipe.ts
init_esm_shims();

// packages/common/utils/is-uuid.ts
init_esm_shims();
var uuid4 = {
  3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
};
function isUUID(str, version = "all") {
  if (!isString(str)) {
    throw new BadRequestException("The value passed as UUID is not a string");
  }
  const pattern = uuid4[version];
  return pattern && pattern.test(str);
}

// packages/common/pipes/parse-uuid.pipe.ts
var ParseUUIDPipe = class {
  constructor(options) {
    options = options || {};
    const {
      exceptionFactory,
      errorHttpStatusCode = 400 /* BAD_REQUEST */,
      version
    } = options;
    this.version = version;
    this.exceptionFactory = exceptionFactory || ((error) => new HttpErrorByCode[errorHttpStatusCode](error));
  }
  async transform(value, metadata) {
    if (!isUUID(value, this.version)) {
      throw this.exceptionFactory(`Validation failed (uuid ${this.version ? "v" + this.version : ""} is expected)`);
    }
    return value;
  }
};
ParseUUIDPipe = __decorateClass([
  Injectable(),
  __decorateParam(0, Optional())
], ParseUUIDPipe);

// packages/common/serializer/index.ts
init_esm_shims();

// packages/common/serializer/class-serializer.interceptor.ts
init_esm_shims();
import { map as map2 } from "rxjs/operators";

// packages/common/serializer/class-serializer.constants.ts
init_esm_shims();
var CLASS_SERIALIZER_OPTIONS = "class_serializer:options";

// packages/common/serializer/class-serializer.interceptor.ts
var classTransformer2 = {};
var REFLECTOR2 = "Reflector";
var ClassSerializerInterceptor = class {
  constructor(reflector, defaultOptions = {}) {
    this.reflector = reflector;
    this.defaultOptions = defaultOptions;
    var _a;
    classTransformer2 = (_a = defaultOptions == null ? void 0 : defaultOptions.transformerPackage) != null ? _a : loadPackage("class-transformer", "ClassSerializerInterceptor", () => __require("class-transformer"));
    if (!(defaultOptions == null ? void 0 : defaultOptions.transformerPackage)) {
      __require("class-transformer");
    }
  }
  intercept(context, next) {
    const contextOptions = this.getContextOptions(context);
    const options = __spreadValues(__spreadValues({}, this.defaultOptions), contextOptions);
    return next.handle().pipe(map2((res) => this.serialize(res, options)));
  }
  serialize(response, options) {
    if (!isObject(response) || response instanceof StreamableFile) {
      return response;
    }
    return Array.isArray(response) ? response.map((item) => this.transformToPlain(item, options)) : this.transformToPlain(response, options);
  }
  transformToPlain(plainOrClass, options) {
    return plainOrClass ? classTransformer2.classToPlain(plainOrClass, options) : plainOrClass;
  }
  getContextOptions(context) {
    return this.reflectSerializeMetadata(context.getHandler()) || this.reflectSerializeMetadata(context.getClass());
  }
  reflectSerializeMetadata(obj) {
    return this.reflector.get(CLASS_SERIALIZER_OPTIONS, obj);
  }
};
ClassSerializerInterceptor = __decorateClass([
  Injectable(),
  __decorateParam(0, Inject(REFLECTOR2)),
  __decorateParam(1, Optional())
], ClassSerializerInterceptor);

// packages/common/serializer/decorators/index.ts
init_esm_shims();

// packages/common/serializer/decorators/serialize-options.decorator.ts
init_esm_shims();
var SerializeOptions = (options) => SetMetadata(CLASS_SERIALIZER_OPTIONS, options);

// packages/common/utils/index.ts
init_esm_shims();

// packages/common/utils/forward-ref.util.ts
init_esm_shims();
var forwardRef = (fn) => ({
  forwardRef: fn
});
export {
  All,
  BadGatewayException,
  BadRequestException,
  Bind,
  Body,
  CACHE_KEY_METADATA,
  CACHE_MANAGER,
  CACHE_MODULE_OPTIONS,
  CACHE_TTL_METADATA,
  CacheInterceptor,
  CacheKey,
  CacheModule,
  CacheTTL,
  Catch,
  ClassSerializerInterceptor,
  ConflictException,
  ConsoleLogger,
  Controller,
  DefaultValuePipe,
  Delete,
  Dependencies,
  ForbiddenException,
  GatewayTimeoutException,
  Get,
  Global,
  GoneException,
  Head,
  Header,
  Headers,
  HostParam,
  HttpCode,
  HttpException,
  HttpModule,
  HttpService,
  HttpStatus,
  HttpVersionNotSupportedException,
  ImATeapotException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Ip,
  Logger,
  MethodNotAllowedException,
  MisdirectedException,
  Module,
  Next,
  NotAcceptableException,
  NotFoundException,
  NotImplementedException,
  Optional,
  Options,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseEnumPipe,
  ParseFloatPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  PayloadTooLargeException,
  Post,
  PreconditionFailedException,
  Put,
  Query,
  Redirect,
  Render,
  Req,
  Request,
  RequestMapping,
  RequestMethod,
  RequestTimeoutException,
  Res,
  Response,
  Scope,
  SerializeOptions,
  ServiceUnavailableException,
  Session,
  SetMetadata,
  ShutdownSignal,
  Sse,
  StreamableFile,
  UnauthorizedException,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
  UploadedFile,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  VERSION_NEUTRAL,
  ValidationPipe,
  Version,
  VersioningType,
  applyDecorators,
  assignMetadata,
  createParamDecorator,
  flatten,
  forwardRef,
  mixin
};
//# sourceMappingURL=index.mjs.map