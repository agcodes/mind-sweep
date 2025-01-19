define("@embroider/macros/es-compat2", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = esCompat;
  function esCompat(m) {
    return m?.__esModule ? m : {
      default: m,
      ...m
    };
  }
});
define("@embroider/macros/runtime", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.config = config;
  _exports.each = each;
  _exports.getGlobalConfig = getGlobalConfig;
  _exports.isTesting = isTesting;
  _exports.macroCondition = macroCondition;
  /*
    These are the runtime implementations for the javascript macros that have
    runtime implementations.
  
    Not every macro has a runtime implementation, some only make sense in the
    build and always run there.
  
    Even when we have runtime implementations, we are still careful to emit static
    errors during the build wherever possible, and runtime errors when necessary,
    so that you're not surprised when you switch from runtime-mode to compile-time
    mode.
  */

  /*
    CAUTION: in classic builds, this file gets shared by all present copies of
    @embroider/macros. If you want to change its public API, you need to rename it
    and update `pathToRuntime` in ../babel/state.ts to point at it, so that your
    babel plugin and runtime will match.
  */

  function each(array) {
    if (!Array.isArray(array)) {
      throw new Error(`the argument to the each() macro must be an array`);
    }
    return array;
  }
  function macroCondition(predicate) {
    return predicate;
  }

  // This is here as a compile target for `getConfig` and `getOwnConfig` when
  // we're in runtime mode. This is not public API to call from your own code.
  function config(packageRoot) {
    return runtimeConfig.packages[packageRoot];
  }
  function getGlobalConfig() {
    return runtimeConfig.global;
  }
  function isTesting() {
    let g = runtimeConfig.global;
    let e = g && g['@embroider/macros'];
    return Boolean(e && e.isTesting);
  }
  const runtimeConfig = initializeRuntimeMacrosConfig();

  // this exists to be targeted by our babel plugin
  function initializeRuntimeMacrosConfig() {
    return {
      "packages": {
        "/home/ag/dev/mind-sweep/node_modules/@ember-data/adapter": {
          "compatWith": null,
          "debug": {
            "LOG_PAYLOADS": false,
            "LOG_OPERATIONS": false,
            "LOG_MUTATIONS": false,
            "LOG_NOTIFICATIONS": false,
            "LOG_REQUESTS": false,
            "LOG_REQUEST_STATUS": false,
            "LOG_IDENTIFIERS": false,
            "LOG_GRAPH": false,
            "LOG_INSTANCE_CACHE": false
          },
          "deprecations": {
            "DEPRECATE_CATCH_ALL": true,
            "DEPRECATE_3_12": true,
            "DEPRECATE_NON_STRICT_TYPES": true,
            "DEPRECATE_NON_STRICT_ID": true,
            "DEPRECATE_COMPUTED_CHAINS": true,
            "DEPRECATE_LEGACY_IMPORTS": true,
            "DEPRECATE_NON_UNIQUE_PAYLOADS": true,
            "DEPRECATE_RELATIONSHIP_REMOTE_UPDATE_CLEARING_LOCAL_STATE": true,
            "DEPRECATE_MANY_ARRAY_DUPLICATES": true
          },
          "features": {
            "SAMPLE_FEATURE_FLAG": false
          },
          "includeDataAdapter": false,
          "packages": {
            "HAS_EMBER_DATA_PACKAGE": false,
            "HAS_STORE_PACKAGE": true,
            "HAS_MODEL_PACKAGE": false,
            "HAS_JSON_API_PACKAGE": false,
            "HAS_GRAPH_PACKAGE": false,
            "HAS_REQUEST_PACKAGE": false,
            "HAS_COMPAT_PACKAGE": true,
            "HAS_TRACKING_PACKAGE": false,
            "HAS_ADAPTER_PACKAGE": true,
            "HAS_SERIALIZER_PACKAGE": false
          },
          "env": {
            "TESTING": true,
            "PRODUCTION": false,
            "DEBUG": true
          }
        },
        "/home/ag/dev/mind-sweep/node_modules/@ember-data/debug": {
          "compatWith": null,
          "debug": {
            "LOG_PAYLOADS": false,
            "LOG_OPERATIONS": false,
            "LOG_MUTATIONS": false,
            "LOG_NOTIFICATIONS": false,
            "LOG_REQUESTS": false,
            "LOG_REQUEST_STATUS": false,
            "LOG_IDENTIFIERS": false,
            "LOG_GRAPH": false,
            "LOG_INSTANCE_CACHE": false
          },
          "deprecations": {
            "DEPRECATE_CATCH_ALL": true,
            "DEPRECATE_3_12": true,
            "DEPRECATE_NON_STRICT_TYPES": true,
            "DEPRECATE_NON_STRICT_ID": true,
            "DEPRECATE_COMPUTED_CHAINS": true,
            "DEPRECATE_LEGACY_IMPORTS": true,
            "DEPRECATE_NON_UNIQUE_PAYLOADS": true,
            "DEPRECATE_RELATIONSHIP_REMOTE_UPDATE_CLEARING_LOCAL_STATE": true,
            "DEPRECATE_MANY_ARRAY_DUPLICATES": true
          },
          "features": {
            "SAMPLE_FEATURE_FLAG": false
          },
          "includeDataAdapter": true,
          "env": {
            "TESTING": true,
            "PRODUCTION": false,
            "DEBUG": true
          },
          "includeDataAdapterInProduction": true
        },
        "/home/ag/dev/mind-sweep/node_modules/@ember-data/graph": {
          "compatWith": null,
          "debug": {
            "LOG_PAYLOADS": false,
            "LOG_OPERATIONS": false,
            "LOG_MUTATIONS": false,
            "LOG_NOTIFICATIONS": false,
            "LOG_REQUESTS": false,
            "LOG_REQUEST_STATUS": false,
            "LOG_IDENTIFIERS": false,
            "LOG_GRAPH": false,
            "LOG_INSTANCE_CACHE": false
          },
          "deprecations": {
            "DEPRECATE_CATCH_ALL": true,
            "DEPRECATE_3_12": true,
            "DEPRECATE_NON_STRICT_TYPES": true,
            "DEPRECATE_NON_STRICT_ID": true,
            "DEPRECATE_COMPUTED_CHAINS": true,
            "DEPRECATE_LEGACY_IMPORTS": true,
            "DEPRECATE_NON_UNIQUE_PAYLOADS": true,
            "DEPRECATE_RELATIONSHIP_REMOTE_UPDATE_CLEARING_LOCAL_STATE": true,
            "DEPRECATE_MANY_ARRAY_DUPLICATES": true
          },
          "features": {
            "SAMPLE_FEATURE_FLAG": false
          },
          "includeDataAdapter": false,
          "packages": {
            "HAS_EMBER_DATA_PACKAGE": false,
            "HAS_STORE_PACKAGE": true,
            "HAS_MODEL_PACKAGE": false,
            "HAS_JSON_API_PACKAGE": false,
            "HAS_GRAPH_PACKAGE": true,
            "HAS_REQUEST_PACKAGE": false,
            "HAS_COMPAT_PACKAGE": false,
            "HAS_TRACKING_PACKAGE": false,
            "HAS_ADAPTER_PACKAGE": false,
            "HAS_SERIALIZER_PACKAGE": false
          },
          "env": {
            "TESTING": true,
            "PRODUCTION": false,
            "DEBUG": true
          }
        },
        "/home/ag/dev/mind-sweep/node_modules/@ember-data/json-api": {
          "compatWith": null,
          "debug": {
            "LOG_PAYLOADS": false,
            "LOG_OPERATIONS": false,
            "LOG_MUTATIONS": false,
            "LOG_NOTIFICATIONS": false,
            "LOG_REQUESTS": false,
            "LOG_REQUEST_STATUS": false,
            "LOG_IDENTIFIERS": false,
            "LOG_GRAPH": false,
            "LOG_INSTANCE_CACHE": false
          },
          "deprecations": {
            "DEPRECATE_CATCH_ALL": true,
            "DEPRECATE_3_12": true,
            "DEPRECATE_NON_STRICT_TYPES": true,
            "DEPRECATE_NON_STRICT_ID": true,
            "DEPRECATE_COMPUTED_CHAINS": true,
            "DEPRECATE_LEGACY_IMPORTS": true,
            "DEPRECATE_NON_UNIQUE_PAYLOADS": true,
            "DEPRECATE_RELATIONSHIP_REMOTE_UPDATE_CLEARING_LOCAL_STATE": true,
            "DEPRECATE_MANY_ARRAY_DUPLICATES": true
          },
          "features": {
            "SAMPLE_FEATURE_FLAG": false
          },
          "includeDataAdapter": false,
          "packages": {
            "HAS_EMBER_DATA_PACKAGE": false,
            "HAS_STORE_PACKAGE": true,
            "HAS_MODEL_PACKAGE": false,
            "HAS_JSON_API_PACKAGE": true,
            "HAS_GRAPH_PACKAGE": true,
            "HAS_REQUEST_PACKAGE": false,
            "HAS_COMPAT_PACKAGE": false,
            "HAS_TRACKING_PACKAGE": false,
            "HAS_ADAPTER_PACKAGE": false,
            "HAS_SERIALIZER_PACKAGE": false
          },
          "env": {
            "TESTING": true,
            "PRODUCTION": false,
            "DEBUG": true
          }
        },
        "/home/ag/dev/mind-sweep/node_modules/@ember-data/legacy-compat": {
          "compatWith": null,
          "debug": {
            "LOG_PAYLOADS": false,
            "LOG_OPERATIONS": false,
            "LOG_MUTATIONS": false,
            "LOG_NOTIFICATIONS": false,
            "LOG_REQUESTS": false,
            "LOG_REQUEST_STATUS": false,
            "LOG_IDENTIFIERS": false,
            "LOG_GRAPH": false,
            "LOG_INSTANCE_CACHE": false
          },
          "deprecations": {
            "DEPRECATE_CATCH_ALL": true,
            "DEPRECATE_3_12": true,
            "DEPRECATE_NON_STRICT_TYPES": true,
            "DEPRECATE_NON_STRICT_ID": true,
            "DEPRECATE_COMPUTED_CHAINS": true,
            "DEPRECATE_LEGACY_IMPORTS": true,
            "DEPRECATE_NON_UNIQUE_PAYLOADS": true,
            "DEPRECATE_RELATIONSHIP_REMOTE_UPDATE_CLEARING_LOCAL_STATE": true,
            "DEPRECATE_MANY_ARRAY_DUPLICATES": true
          },
          "features": {
            "SAMPLE_FEATURE_FLAG": false
          },
          "includeDataAdapter": false,
          "packages": {
            "HAS_EMBER_DATA_PACKAGE": false,
            "HAS_STORE_PACKAGE": true,
            "HAS_MODEL_PACKAGE": false,
            "HAS_JSON_API_PACKAGE": true,
            "HAS_GRAPH_PACKAGE": true,
            "HAS_REQUEST_PACKAGE": true,
            "HAS_COMPAT_PACKAGE": true,
            "HAS_TRACKING_PACKAGE": false,
            "HAS_ADAPTER_PACKAGE": false,
            "HAS_SERIALIZER_PACKAGE": false
          },
          "env": {
            "TESTING": true,
            "PRODUCTION": false,
            "DEBUG": true
          }
        },
        "/home/ag/dev/mind-sweep/node_modules/@ember-data/model": {
          "compatWith": null,
          "debug": {
            "LOG_PAYLOADS": false,
            "LOG_OPERATIONS": false,
            "LOG_MUTATIONS": false,
            "LOG_NOTIFICATIONS": false,
            "LOG_REQUESTS": false,
            "LOG_REQUEST_STATUS": false,
            "LOG_IDENTIFIERS": false,
            "LOG_GRAPH": false,
            "LOG_INSTANCE_CACHE": false
          },
          "deprecations": {
            "DEPRECATE_CATCH_ALL": true,
            "DEPRECATE_3_12": true,
            "DEPRECATE_NON_STRICT_TYPES": true,
            "DEPRECATE_NON_STRICT_ID": true,
            "DEPRECATE_COMPUTED_CHAINS": true,
            "DEPRECATE_LEGACY_IMPORTS": true,
            "DEPRECATE_NON_UNIQUE_PAYLOADS": true,
            "DEPRECATE_RELATIONSHIP_REMOTE_UPDATE_CLEARING_LOCAL_STATE": true,
            "DEPRECATE_MANY_ARRAY_DUPLICATES": true
          },
          "features": {
            "SAMPLE_FEATURE_FLAG": false
          },
          "includeDataAdapter": true,
          "packages": {
            "HAS_EMBER_DATA_PACKAGE": false,
            "HAS_STORE_PACKAGE": true,
            "HAS_MODEL_PACKAGE": true,
            "HAS_JSON_API_PACKAGE": true,
            "HAS_GRAPH_PACKAGE": true,
            "HAS_REQUEST_PACKAGE": false,
            "HAS_COMPAT_PACKAGE": true,
            "HAS_TRACKING_PACKAGE": true,
            "HAS_ADAPTER_PACKAGE": false,
            "HAS_SERIALIZER_PACKAGE": false
          },
          "env": {
            "TESTING": true,
            "PRODUCTION": false,
            "DEBUG": true
          }
        },
        "/home/ag/dev/mind-sweep/node_modules/@ember-data/request": {
          "compatWith": null,
          "debug": {
            "LOG_PAYLOADS": false,
            "LOG_OPERATIONS": false,
            "LOG_MUTATIONS": false,
            "LOG_NOTIFICATIONS": false,
            "LOG_REQUESTS": false,
            "LOG_REQUEST_STATUS": false,
            "LOG_IDENTIFIERS": false,
            "LOG_GRAPH": false,
            "LOG_INSTANCE_CACHE": false
          },
          "deprecations": {
            "DEPRECATE_CATCH_ALL": true,
            "DEPRECATE_3_12": true,
            "DEPRECATE_NON_STRICT_TYPES": true,
            "DEPRECATE_NON_STRICT_ID": true,
            "DEPRECATE_COMPUTED_CHAINS": true,
            "DEPRECATE_LEGACY_IMPORTS": true,
            "DEPRECATE_NON_UNIQUE_PAYLOADS": true,
            "DEPRECATE_RELATIONSHIP_REMOTE_UPDATE_CLEARING_LOCAL_STATE": true,
            "DEPRECATE_MANY_ARRAY_DUPLICATES": true
          },
          "features": {
            "SAMPLE_FEATURE_FLAG": false
          },
          "includeDataAdapter": false,
          "packages": {
            "HAS_EMBER_DATA_PACKAGE": false,
            "HAS_STORE_PACKAGE": false,
            "HAS_MODEL_PACKAGE": false,
            "HAS_JSON_API_PACKAGE": false,
            "HAS_GRAPH_PACKAGE": false,
            "HAS_REQUEST_PACKAGE": true,
            "HAS_COMPAT_PACKAGE": false,
            "HAS_TRACKING_PACKAGE": false,
            "HAS_ADAPTER_PACKAGE": false,
            "HAS_SERIALIZER_PACKAGE": false
          },
          "env": {
            "TESTING": true,
            "PRODUCTION": false,
            "DEBUG": true
          }
        },
        "/home/ag/dev/mind-sweep/node_modules/@ember-data/serializer": {
          "compatWith": null,
          "debug": {
            "LOG_PAYLOADS": false,
            "LOG_OPERATIONS": false,
            "LOG_MUTATIONS": false,
            "LOG_NOTIFICATIONS": false,
            "LOG_REQUESTS": false,
            "LOG_REQUEST_STATUS": false,
            "LOG_IDENTIFIERS": false,
            "LOG_GRAPH": false,
            "LOG_INSTANCE_CACHE": false
          },
          "deprecations": {
            "DEPRECATE_CATCH_ALL": true,
            "DEPRECATE_3_12": true,
            "DEPRECATE_NON_STRICT_TYPES": true,
            "DEPRECATE_NON_STRICT_ID": true,
            "DEPRECATE_COMPUTED_CHAINS": true,
            "DEPRECATE_LEGACY_IMPORTS": true,
            "DEPRECATE_NON_UNIQUE_PAYLOADS": true,
            "DEPRECATE_RELATIONSHIP_REMOTE_UPDATE_CLEARING_LOCAL_STATE": true,
            "DEPRECATE_MANY_ARRAY_DUPLICATES": true
          },
          "features": {
            "SAMPLE_FEATURE_FLAG": false
          },
          "includeDataAdapter": false,
          "packages": {
            "HAS_EMBER_DATA_PACKAGE": false,
            "HAS_STORE_PACKAGE": false,
            "HAS_MODEL_PACKAGE": false,
            "HAS_JSON_API_PACKAGE": false,
            "HAS_GRAPH_PACKAGE": false,
            "HAS_REQUEST_PACKAGE": false,
            "HAS_COMPAT_PACKAGE": false,
            "HAS_TRACKING_PACKAGE": false,
            "HAS_ADAPTER_PACKAGE": false,
            "HAS_SERIALIZER_PACKAGE": true
          },
          "env": {
            "TESTING": true,
            "PRODUCTION": false,
            "DEBUG": true
          }
        },
        "/home/ag/dev/mind-sweep/node_modules/@ember-data/store": {
          "compatWith": null,
          "debug": {
            "LOG_PAYLOADS": false,
            "LOG_OPERATIONS": false,
            "LOG_MUTATIONS": false,
            "LOG_NOTIFICATIONS": false,
            "LOG_REQUESTS": false,
            "LOG_REQUEST_STATUS": false,
            "LOG_IDENTIFIERS": false,
            "LOG_GRAPH": false,
            "LOG_INSTANCE_CACHE": false
          },
          "deprecations": {
            "DEPRECATE_CATCH_ALL": true,
            "DEPRECATE_3_12": true,
            "DEPRECATE_NON_STRICT_TYPES": true,
            "DEPRECATE_NON_STRICT_ID": true,
            "DEPRECATE_COMPUTED_CHAINS": true,
            "DEPRECATE_LEGACY_IMPORTS": true,
            "DEPRECATE_NON_UNIQUE_PAYLOADS": true,
            "DEPRECATE_RELATIONSHIP_REMOTE_UPDATE_CLEARING_LOCAL_STATE": true,
            "DEPRECATE_MANY_ARRAY_DUPLICATES": true
          },
          "features": {
            "SAMPLE_FEATURE_FLAG": false
          },
          "includeDataAdapter": false,
          "packages": {
            "HAS_EMBER_DATA_PACKAGE": false,
            "HAS_STORE_PACKAGE": true,
            "HAS_MODEL_PACKAGE": false,
            "HAS_JSON_API_PACKAGE": false,
            "HAS_GRAPH_PACKAGE": false,
            "HAS_REQUEST_PACKAGE": true,
            "HAS_COMPAT_PACKAGE": false,
            "HAS_TRACKING_PACKAGE": true,
            "HAS_ADAPTER_PACKAGE": false,
            "HAS_SERIALIZER_PACKAGE": false
          },
          "env": {
            "TESTING": true,
            "PRODUCTION": false,
            "DEBUG": true
          }
        },
        "/home/ag/dev/mind-sweep/node_modules/@ember-data/tracking": {
          "compatWith": null,
          "debug": {
            "LOG_PAYLOADS": false,
            "LOG_OPERATIONS": false,
            "LOG_MUTATIONS": false,
            "LOG_NOTIFICATIONS": false,
            "LOG_REQUESTS": false,
            "LOG_REQUEST_STATUS": false,
            "LOG_IDENTIFIERS": false,
            "LOG_GRAPH": false,
            "LOG_INSTANCE_CACHE": false
          },
          "deprecations": {
            "DEPRECATE_CATCH_ALL": true,
            "DEPRECATE_3_12": true,
            "DEPRECATE_NON_STRICT_TYPES": true,
            "DEPRECATE_NON_STRICT_ID": true,
            "DEPRECATE_COMPUTED_CHAINS": true,
            "DEPRECATE_LEGACY_IMPORTS": true,
            "DEPRECATE_NON_UNIQUE_PAYLOADS": true,
            "DEPRECATE_RELATIONSHIP_REMOTE_UPDATE_CLEARING_LOCAL_STATE": true,
            "DEPRECATE_MANY_ARRAY_DUPLICATES": true
          },
          "features": {
            "SAMPLE_FEATURE_FLAG": false
          },
          "includeDataAdapter": false,
          "packages": {
            "HAS_EMBER_DATA_PACKAGE": false,
            "HAS_STORE_PACKAGE": false,
            "HAS_MODEL_PACKAGE": false,
            "HAS_JSON_API_PACKAGE": false,
            "HAS_GRAPH_PACKAGE": false,
            "HAS_REQUEST_PACKAGE": false,
            "HAS_COMPAT_PACKAGE": false,
            "HAS_TRACKING_PACKAGE": true,
            "HAS_ADAPTER_PACKAGE": false,
            "HAS_SERIALIZER_PACKAGE": false
          },
          "env": {
            "TESTING": true,
            "PRODUCTION": false,
            "DEBUG": true
          }
        },
        "/home/ag/dev/mind-sweep/node_modules/ember-data": {
          "compatWith": null,
          "debug": {
            "LOG_PAYLOADS": false,
            "LOG_OPERATIONS": false,
            "LOG_MUTATIONS": false,
            "LOG_NOTIFICATIONS": false,
            "LOG_REQUESTS": false,
            "LOG_REQUEST_STATUS": false,
            "LOG_IDENTIFIERS": false,
            "LOG_GRAPH": false,
            "LOG_INSTANCE_CACHE": false
          },
          "deprecations": {
            "DEPRECATE_CATCH_ALL": true,
            "DEPRECATE_3_12": true,
            "DEPRECATE_NON_STRICT_TYPES": true,
            "DEPRECATE_NON_STRICT_ID": true,
            "DEPRECATE_COMPUTED_CHAINS": true,
            "DEPRECATE_LEGACY_IMPORTS": true,
            "DEPRECATE_NON_UNIQUE_PAYLOADS": true,
            "DEPRECATE_RELATIONSHIP_REMOTE_UPDATE_CLEARING_LOCAL_STATE": true,
            "DEPRECATE_MANY_ARRAY_DUPLICATES": true
          },
          "features": {
            "SAMPLE_FEATURE_FLAG": false
          },
          "includeDataAdapter": true,
          "env": {
            "TESTING": true,
            "PRODUCTION": false,
            "DEBUG": true
          }
        }
      },
      "global": {
        "@embroider/macros": {
          "isTesting": false
        }
      }
    };
  }
  function updaterMethods() {
    return {
      config,
      getGlobalConfig,
      setConfig(packageRoot, value) {
        runtimeConfig.packages[packageRoot] = value;
      },
      setGlobalConfig(key, value) {
        runtimeConfig.global[key] = value;
      }
    };
  }

  // this is how runtime config can get injected at boot. I'm not sure yet if this
  // should be public API, but we certainly need it internally to set things like
  // the global fastboot.isRunning.
  //
  // consumers of this API push a function onto
  // window._embroider_macros_runtime_config. The function is given four methods
  // which allow it to read and write the per-package and global configs. The
  // reason for allowing both read & write is that merging strategies are up to
  // each consumers -- read first, then merge, then write.
  //
  // For an example user of this API, see where we generate
  // embroider_macros_fastboot_init.js' in @embroider/core.
  let updaters = typeof window !== 'undefined' ? window._embroider_macros_runtime_config : undefined;
  if (updaters) {
    let methods = updaterMethods();
    for (let updater of updaters) {
      updater(methods);
    }
  }
});//# sourceMappingURL=engine-vendor.map
