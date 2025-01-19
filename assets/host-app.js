'use strict';



;define("host-app/app", ["exports", "@ember/application", "host-app/resolver", "ember-load-initializers", "host-app/config/environment", "decimal.js", "piexifjs"], function (_exports, _application, _resolver, _emberLoadInitializers, _environment, _decimal, _piexifjs) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/application",0,"host-app/resolver",0,"ember-load-initializers",0,"host-app/config/environment",0,"decimal.js",0,"piexifjs"eaimeta@70e063a35619d71f
  // import needed
  const App = _application.default.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
  var _default = _exports.default = App;
});
;define("host-app/component-managers/glimmer", ["exports", "@glimmer/component/-private/ember-component-manager"], function (_exports, _emberComponentManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberComponentManager.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component/-private/ember-component-manager"eaimeta@70e063a35619d71f
});
;define("host-app/components/app-component", ["exports", "@glimmer/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component"eaimeta@70e063a35619d71f
  class AppComponent extends _component.default {}
  _exports.default = AppComponent;
});
;define("host-app/components/canvas-c", ["exports", "addon-canvas/components/canvas-c"], function (_exports, _canvasC) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _canvasC.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"addon-canvas/components/canvas-c"eaimeta@70e063a35619d71f
});
;define("host-app/components/canvas-menu", ["exports", "common-components/components/form/canvas-menu"], function (_exports, _canvasMenu) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _canvasMenu.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"common-components/components/form/canvas-menu"eaimeta@70e063a35619d71f
});
;define("host-app/components/cursor-hover", ["exports", "univers-app-components/components/cursor-hover"], function (_exports, _cursorHover) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _cursorHover.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"univers-app-components/components/cursor-hover"eaimeta@70e063a35619d71f
});
;define("host-app/components/deviant-art-item", ["exports", "univers-app-components/components/deviant-art-item"], function (_exports, _deviantArtItem) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _deviantArtItem.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"univers-app-components/components/deviant-art-item"eaimeta@70e063a35619d71f
});
;define("host-app/components/drawing-component", ["exports", "addon-canvas/components/drawing-component"], function (_exports, _drawingComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _drawingComponent.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"addon-canvas/components/drawing-component"eaimeta@70e063a35619d71f
});
;define("host-app/components/form-component", ["exports", "common-components/components/form/form-component"], function (_exports, _formComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formComponent.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"common-components/components/form/form-component"eaimeta@70e063a35619d71f
});
;define("host-app/components/gallery-item", ["exports", "univers-app-components/components/gallery-item"], function (_exports, _galleryItem) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _galleryItem.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"univers-app-components/components/gallery-item"eaimeta@70e063a35619d71f
});
;define("host-app/components/gallery-thumbnail", ["exports", "univers-app-components/components/gallery-thumbnail"], function (_exports, _galleryThumbnail) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _galleryThumbnail.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"univers-app-components/components/gallery-thumbnail"eaimeta@70e063a35619d71f
});
;define("host-app/components/gallery-thumbnails", ["exports", "univers-app-components/components/gallery-thumbnails"], function (_exports, _galleryThumbnails) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _galleryThumbnails.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"univers-app-components/components/gallery-thumbnails"eaimeta@70e063a35619d71f
});
;define("host-app/components/gallery", ["exports", "univers-app-components/components/gallery"], function (_exports, _gallery) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gallery.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"univers-app-components/components/gallery"eaimeta@70e063a35619d71f
});
;define("host-app/components/input-check-box", ["exports", "common-components/components/form/input-check-box"], function (_exports, _inputCheckBox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _inputCheckBox.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"common-components/components/form/input-check-box"eaimeta@70e063a35619d71f
});
;define("host-app/components/input-number-plus-minus", ["exports", "common-components/components/form/input-number-plus-minus"], function (_exports, _inputNumberPlusMinus) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _inputNumberPlusMinus.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"common-components/components/form/input-number-plus-minus"eaimeta@70e063a35619d71f
});
;define("host-app/components/input-text", ["exports", "common-components/components/form/input-text"], function (_exports, _inputText) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _inputText.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"common-components/components/form/input-text"eaimeta@70e063a35619d71f
});
;define("host-app/components/link-to-external", ["exports", "ember-engines/components/link-to-external"], function (_exports, _linkToExternal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _linkToExternal.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-engines/components/link-to-external"eaimeta@70e063a35619d71f
});
;define("host-app/components/links-navbar", ["exports", "univers-app-components/components/links-navbar"], function (_exports, _linksNavbar) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _linksNavbar.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"univers-app-components/components/links-navbar"eaimeta@70e063a35619d71f
});
;define("host-app/components/main-menu", ["exports", "univers-app-components/components/main-menu"], function (_exports, _mainMenu) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _mainMenu.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"univers-app-components/components/main-menu"eaimeta@70e063a35619d71f
});
;define("host-app/components/main-navbar", ["exports", "univers-app-components/components/main-navbar"], function (_exports, _mainNavbar) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _mainNavbar.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"univers-app-components/components/main-navbar"eaimeta@70e063a35619d71f
});
;define("host-app/components/post-home-item", ["exports", "univers-app-components/components/post-home-item"], function (_exports, _postHomeItem) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _postHomeItem.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"univers-app-components/components/post-home-item"eaimeta@70e063a35619d71f
});
;define("host-app/components/post-item", ["exports", "univers-app-components/components/post-item"], function (_exports, _postItem) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _postItem.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"univers-app-components/components/post-item"eaimeta@70e063a35619d71f
});
;define("host-app/components/posts-list", ["exports", "univers-app-components/components/posts-list"], function (_exports, _postsList) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _postsList.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"univers-app-components/components/posts-list"eaimeta@70e063a35619d71f
});
;define("host-app/components/saved-img", ["exports", "addon-canvas/components/saved-img"], function (_exports, _savedImg) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _savedImg.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"addon-canvas/components/saved-img"eaimeta@70e063a35619d71f
});
;define("host-app/components/switch-lang", ["exports", "univers-app-components/components/switch-lang"], function (_exports, _switchLang) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _switchLang.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"univers-app-components/components/switch-lang"eaimeta@70e063a35619d71f
});
;define("host-app/components/tabbed-form", ["exports", "common-components/components/form/tabbed-form"], function (_exports, _tabbedForm) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _tabbedForm.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"common-components/components/form/tabbed-form"eaimeta@70e063a35619d71f
});
;define("host-app/components/text-input", ["exports", "common-components/components/text-input"], function (_exports, _textInput) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _textInput.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"common-components/components/text-input"eaimeta@70e063a35619d71f
});
;define("host-app/config/asset-manifest", ["exports", "require", "host-app/config/environment"], function (_exports, _require, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"require",0,"host-app/config/environment"eaimeta@70e063a35619d71f
  const modulePrefix = _environment.default.modulePrefix;
  const metaName = `${modulePrefix}/config/asset-manifest`;
  const nodeName = `${modulePrefix}/config/node-asset-manifest`;
  let config = {};
  try {
    // If we have a Node version of the asset manifest, use that for FastBoot and
    // similar environments.
    if (_require.default.has(nodeName)) {
      config = (0, _require.default)(nodeName).default; // eslint-disable-line
    } else {
      const rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
      config = JSON.parse(unescape(rawConfig));
    }
  } catch (err) {
    throw new Error('Failed to load asset manifest. For browser environments, verify the meta tag with name "' + metaName + '" is present. For non-browser environments, verify that you included the node-asset-manifest module.');
  }
  var _default = _exports.default = config;
});
;define("host-app/container-debug-adapter", ["exports", "ember-resolver/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _containerDebugAdapter.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-resolver/container-debug-adapter"eaimeta@70e063a35619d71f
});
;define("host-app/controllers/application", ["exports", "@ember/controller", "@ember/service"], function (_exports, _controller, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let Application = _exports.default = (_class = class Application extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "intl", _descriptor, this);
      _initializerDefineProperty(this, "navigationService", _descriptor2, this);
    }
    init() {
      super.init(...arguments);
      this.arrayRoutes = [];
      let browserLang = (navigator.language || navigator.userLanguage).toLowerCase();
      if (browserLang === 'fr') {
        browserLang = "fr-fr";
      }
      let locale = browserLang === "fr-fr" ? "fr-fr" : "en-us";
      const localeLang = localStorage.getItem("user_lang");
      if (localeLang && localeLang != "") {
        locale = localeLang;
      }
      this.intl.setLocale([locale]);
      this.targetChanged();
      this.addObserver('target.currentURL', this, 'targetChanged');
    }
    targetChanged() {
      this.navigationService.config = this.target.namespace.VARS;
      return this.navigationService.setNavigationRoutes(this.target.currentRouteName, this.target.currentRouteName);
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "intl", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "navigationService", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("host-app/data-adapter", ["exports", "@ember-data/debug"], function (_exports, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _debug.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/debug"eaimeta@70e063a35619d71f
});
;define("host-app/helpers/app-version", ["exports", "@ember/component/helper", "host-app/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _helper, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper",0,"host-app/config/environment",0,"ember-cli-app-version/utils/regexp"eaimeta@70e063a35619d71f
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;
    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }
    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }
    return match ? match[0] : version;
  }
  var _default = _exports.default = (0, _helper.helper)(appVersion);
});
;define("host-app/helpers/format-date", ["exports", "ember-intl/helpers/format-date"], function (_exports, _formatDate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatDate.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-intl/helpers/format-date"eaimeta@70e063a35619d71f
});
;define("host-app/helpers/format-list", ["exports", "ember-intl/helpers/format-list"], function (_exports, _formatList) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatList.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-intl/helpers/format-list"eaimeta@70e063a35619d71f
});
;define("host-app/helpers/format-message", ["exports", "ember-intl/helpers/format-message"], function (_exports, _formatMessage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatMessage.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-intl/helpers/format-message"eaimeta@70e063a35619d71f
});
;define("host-app/helpers/format-money", ["exports", "common-components/helpers/format-money"], function (_exports, _formatMoney) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatMoney.default;
    }
  });
  Object.defineProperty(_exports, "formatMoney", {
    enumerable: true,
    get: function () {
      return _formatMoney.formatMoney;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"common-components/helpers/format-money"eaimeta@70e063a35619d71f
});
;define("host-app/helpers/format-number", ["exports", "ember-intl/helpers/format-number"], function (_exports, _formatNumber) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatNumber.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-intl/helpers/format-number"eaimeta@70e063a35619d71f
});
;define("host-app/helpers/format-relative", ["exports", "ember-intl/helpers/format-relative"], function (_exports, _formatRelative) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatRelative.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-intl/helpers/format-relative"eaimeta@70e063a35619d71f
});
;define("host-app/helpers/format-time", ["exports", "ember-intl/helpers/format-time"], function (_exports, _formatTime) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatTime.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-intl/helpers/format-time"eaimeta@70e063a35619d71f
});
;define("host-app/helpers/page-title", ["exports", "ember-page-title/helpers/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitle.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-page-title/helpers/page-title"eaimeta@70e063a35619d71f
});
;define("host-app/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-inflector/lib/helpers/pluralize"eaimeta@70e063a35619d71f
  var _default = _exports.default = _pluralize.default;
});
;define("host-app/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-inflector/lib/helpers/singularize"eaimeta@70e063a35619d71f
  var _default = _exports.default = _singularize.default;
});
;define("host-app/helpers/t", ["exports", "ember-intl/helpers/t"], function (_exports, _t) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _t.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-intl/helpers/t"eaimeta@70e063a35619d71f
});
;define("host-app/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "host-app/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-app-version/initializer-factory",0,"host-app/config/environment"eaimeta@70e063a35619d71f
  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }
  var _default = _exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define("host-app/initializers/ember-data", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  /*
    This code initializes EmberData in an Ember application.
  */
  var _default = _exports.default = {
    name: 'ember-data',
    initialize(application) {
      application.registerOptionsForType('serializer', {
        singleton: false
      });
      application.registerOptionsForType('adapter', {
        singleton: false
      });
    }
  };
});
;define("host-app/initializers/ember-engines-router-service", ["exports", "ember-engines-router-service/initializers/ember-engines-router-service"], function (_exports, _emberEnginesRouterService) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberEnginesRouterService.default;
    }
  });
  Object.defineProperty(_exports, "initializer", {
    enumerable: true,
    get: function () {
      return _emberEnginesRouterService.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-engines-router-service/initializers/ember-engines-router-service"eaimeta@70e063a35619d71f
});
;define("host-app/initializers/engines", ["exports", "ember-engines/initializers/engines"], function (_exports, _engines) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _engines.default;
    }
  });
  Object.defineProperty(_exports, "initialize", {
    enumerable: true,
    get: function () {
      return _engines.initialize;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-engines/initializers/engines"eaimeta@70e063a35619d71f
});
;define("host-app/initializers/navigation-service", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.initialize = initialize;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  function initialize() {}
  var _default = _exports.default = {
    name: 'navigation-service',
    initialize
  };
});
;define("host-app/instance-initializers/load-asset-manifest", ["exports", "host-app/config/asset-manifest"], function (_exports, _assetManifest) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.initialize = initialize;
  0; //eaimeta@70e063a35619d71f0,"host-app/config/asset-manifest"eaimeta@70e063a35619d71f
  /**
   * Initializes the AssetLoader service with a generated asset-manifest.
   */
  function initialize(instance) {
    const service = instance.lookup('service:asset-loader');
    service.pushManifest(_assetManifest.default);
  }
  var _default = _exports.default = {
    name: 'load-asset-manifest',
    initialize
  };
});
;define("host-app/models/init-canvas3d-service", ["exports", "three", "three/addons/postprocessing/ShaderPass.js", "three/addons/shaders/LuminosityShader.js", "three/addons/postprocessing/RenderPass.js", "three/addons/postprocessing/EffectComposer.js", "three/addons/controls/OrbitControls.js"], function (_exports, _three, _ShaderPass, _LuminosityShader, _RenderPass, _EffectComposer, _OrbitControls) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"three",0,"three/addons/postprocessing/ShaderPass.js",0,"three/addons/shaders/LuminosityShader.js",0,"three/addons/postprocessing/RenderPass.js",0,"three/addons/postprocessing/EffectComposer.js",0,"three/addons/controls/OrbitControls.js"eaimeta@70e063a35619d71f
  class InitCanvas3dService {
    init3d() {}
  }
  _exports.default = InitCanvas3dService;
});
;define("host-app/modifiers/did-insert", ["exports", "@ember/render-modifiers/modifiers/did-insert"], function (_exports, _didInsert) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didInsert.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/render-modifiers/modifiers/did-insert"eaimeta@70e063a35619d71f
});
;define("host-app/modifiers/did-update", ["exports", "@ember/render-modifiers/modifiers/did-update"], function (_exports, _didUpdate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didUpdate.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/render-modifiers/modifiers/did-update"eaimeta@70e063a35619d71f
});
;define("host-app/modifiers/will-destroy", ["exports", "@ember/render-modifiers/modifiers/will-destroy"], function (_exports, _willDestroy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _willDestroy.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/render-modifiers/modifiers/will-destroy"eaimeta@70e063a35619d71f
});
;define("host-app/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-resolver"eaimeta@70e063a35619d71f
  var _default = _exports.default = _emberResolver.default;
});
;define("host-app/router", ["exports", "@ember/routing/router", "host-app/config/environment"], function (_exports, _router, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/router",0,"host-app/config/environment"eaimeta@70e063a35619d71f
  const Router = _router.default.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });
  Router.map(function () {
    this.mount('color');
    this.mount('games');
  });
  var _default = _exports.default = Router;
});
;define("host-app/routes/image/page", ["exports", "univers-app-components/routes/view-route", "@ember/service"], function (_exports, _viewRoute, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"univers-app-components/routes/view-route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let ImageViewRoute = _exports.default = (_class = class ImageViewRoute extends _viewRoute.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "deviantArtService", _descriptor, this);
    }
    async model(params) {
      const url = decodeURIComponent(params.id);
      const decryptedUrl = this.deviantArtService.decryptUrl(url);
      return {
        ok: true,
        params,
        url: decryptedUrl
      };
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "deviantArtService", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("host-app/routes/index", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let IndexRoute = _exports.default = (_class = class IndexRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "intl", _descriptor, this);
      _initializerDefineProperty(this, "navigationService", _descriptor2, this);
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "intl", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "navigationService", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("host-app/services/actions-handler", ["exports", "@ember/service"], function (_exports, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/service"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class ActionsHandler extends _service.default {
    constructor(owner, args) {
      super(owner, args);
      _defineProperty(this, "activeForm", false);
      _defineProperty(this, "components", null);
      _defineProperty(this, "idPreviousInstance", "");
      _defineProperty(this, "idInstance", "");
      _defineProperty(this, "data", {});
      _defineProperty(this, "componentData", {});
      _defineProperty(this, "componentsData", {});
      this.components = [];
      this.eventTarget = new EventTarget();
    }
    triggerEvent(name, data) {
      this.eventTarget.dispatchEvent(new CustomEvent(name, {
        detail: data
      }));
      return true;
    }
    addComponent(id) {
      this.components.push(id);
    }
    componentValueAction(actionName, value, componentID, id) {
      return this.componentDataAction({
        "value": value,
        "actionName": actionName,
        'componentID': componentID,
        "id": id
      }, componentID);
    }
    componentEventAction(e, value, componentID) {
      const data = [];
      data["value"] = value;
      if (e.target) {
        for (let key in e.target.dataset) {
          data[key] = e.target.dataset[key];
        }
      }
      return this.componentDataAction(data, componentID);
    }
    componentDataAction(data, componentID) {
      if (typeof componentID === "string" && componentID !== "") {
        return this.triggerEvent(`componentAction${componentID}`, data);
      } else {
        return false;
      }
    }
    applyAction(id, data) {
      return this.triggerEvent(`applyAction${id}`, data);
    }
    handleDataSet(dataset) {
      const data = [];
      if (dataset) {
        for (let key in dataset) {
          data[key] = dataset[key];
        }
      }
      return data;
    }
    setInstance(id) {
      this.idInstance = id;
    }
    toggleAnimationButton(animationRunning, componentID) {
      if (animationRunning === true) {
        this.displayInputValue(this.getElementId(componentID, "start-animation"), "Stop");
      } else {
        this.displayInputValue(this.getElementId(componentID, "start-animation"), "Animation");
      }
    }
    toggleHTMLElement(id, hide, show) {
      if (typeof id === "string" && id !== "") {
        const htmlElement = document.getElementById(id);
        if (htmlElement) {
          if (hide === true) {
            htmlElement.style.display = "none";
          } else if (htmlElement.style.display === '' || htmlElement.style.display === 'none' || show === true) {
            htmlElement.classList.remove("d-none");
            htmlElement.style.display = "block";
          } else {
            htmlElement.style.display = "none";
          }
        }
      }
    }
    setHtmlElementVisibility(id, show) {
      if (typeof id === "string" && id !== "") {
        const htmlElement = document.getElementById(id);
        if (htmlElement) {
          if (show) {
            htmlElement.classList.remove("d-none");
          } else {
            htmlElement.classList.add("d-none");
          }
        }
      }
    }
    getElementId(componentID, id) {
      return `${componentID}-${id}`;
    }
    getData() {
      return this.data;
    }
    setInput(key, value, componentID) {
      this.data[key] = value;
      this.displayLabel(key, value, componentID);
      this.displayInputValue(key, value, componentID);
    }
    setInputs(data, componentID) {
      for (let key in data) {
        this.setInput(key, data[key], componentID);
      }
    }
    saveInputValue(inputId, value) {
      this.componentsData[inputId] = value;
    }
    /*getInputValue(inputId){
      if (this.componentsData[inputId]){
        return this.componentsData[inputId];
      }
      return null;
    }*/
    getInputValue(inputId) {
      const inputElement = document.getElementById(inputId);
      if (inputElement) {
        let currentValue = inputElement.value;
        if (currentValue == null || currentValue == "") {
          currentValue = inputElement.getAttribute('data-current-value');
          if (currentValue == null || currentValue == "") {
            return this.componentsData[inputId];
          }
          return currentValue;
        }
        return currentValue;
      }
    }
    displayInputValue(id, value, componentID) {
      if (typeof componentID === "string" && componentID !== "") {
        const formElement = document.getElementById(componentID);
        if (formElement) {
          const inputElement = formElement.querySelector(`input[name="${id}"]`);
          if (inputElement) {
            this.saveInputValue(`${componentID}-${id}`, value);
            if (inputElement.type === "checkbox") {
              inputElement.checked = value === 1 || value === true;
            } else {
              inputElement.setAttribute('current-value', value);
              inputElement.value = value;
            }
          }
        }
      } else {
        const inputElement = document.getElementById(id);
        if (inputElement) {
          this.saveInputValue(id, value);
          inputElement.setAttribute('data-current-value', value);
          inputElement.value = value;
        }
      }
    }
    displayLabel(name, value, componentID) {
      if (typeof componentID === "string") {
        if (componentID !== "") {
          const labelElement = document.getElementById(this.getElementId(componentID, `span-label-${name}`));
          if (labelElement) {
            labelElement.innerHTML = value;
          }
        }
      } else {
        const labelElement = document.getElementById(`span-label-${name}`);
        if (labelElement) {
          labelElement.innerHTML = value;
        }
      }
    }
  }
  _exports.default = ActionsHandler;
});
;define("host-app/services/api-posts-service", ["exports", "@ember/service"], function (_exports, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/service"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class ApiPostsService extends _service.default {
    constructor(...args) {
      super(...args);
      // Create a cache object
      _defineProperty(this, "cache", {});
    }
    fetchData(url) {
      return new Promise(resolve => {
        // Check if data is already in the cache and not older than 1 hour
        if (this.cache[url] && this.isDataFresh(this.cache[url])) {
          resolve(this.cache[url].dataPosts);
        } else {
          fetch(url).then(response => response.json()).then(data => {
            const dataPosts = this.handleResponse(data);
            // Store data and timestamp in the cache
            this.cache[url] = {
              dataPosts,
              timestamp: Date.now()
            };
            resolve(dataPosts);
          });
        }
      });
    }
    handleResponse(response) {
      return response;
    }
    isDataFresh(cacheEntry) {
      // Check if the data is not older than 600 seconds (600 seconds * 1000 milliseconds)
      return Date.now() - cacheEntry.timestamp < 600000;
    }
    getItems() {
      const items = [];
      return items;
    }
    getItem() {
      return null;
    }
  }
  _exports.default = ApiPostsService;
});
;define("host-app/services/asset-loader", ["exports", "ember-asset-loader/services/asset-loader"], function (_exports, _assetLoader) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _assetLoader.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-asset-loader/services/asset-loader"eaimeta@70e063a35619d71f
});
;define("host-app/services/deviant-art-service", ["exports", "@ember/service", "addon-canvas/models/CImg"], function (_exports, _service, _CImg) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"addon-canvas/models/CImg"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class DeviantArtService extends _service.default {
    constructor(...args) {
      super(...args);
      // Create a cache object
      _defineProperty(this, "cache", {});
      _defineProperty(this, "limit", 40);
      _defineProperty(this, "secretKey", "cache");
    }
    fetchData(url, id, limit) {
      this.limit = limit;
      return new Promise(resolve => {
        if (this.cache[url + id] && this.isDataFresh(this.cache[url + id])) {
          resolve(this.handleResponse(this.cache[url + id].data, url + id));
        } else {
          fetch(url).then(response => response.text()).then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'application/xml');
            // Handle XML data
            resolve(this.handleResponse(xmlDoc, url + id));
          }).catch(error => {
            console.error(error);
            // Handle error
            resolve(null);
          });
        }
      });
    }
    isDataFresh(cacheEntry) {
      // Check if the data is not older than 600 seconds (600 seconds * 1000 milliseconds)
      return Date.now() - cacheEntry.timestamp < 600000;
    }
    handleResponse(xmlDocument, url) {
      // Store data and timestamp in the cache
      this.cache[url] = {
        data: xmlDocument,
        timestamp: Date.now()
      };
      for (let i = 0; i < xmlDocument.childNodes.length; i++) {
        const node = xmlDocument.childNodes[i];
        if (node.localName === "rss") {
          for (let j = 0; j < node.childNodes.length; j++) {
            if (node.childNodes[j].localName === "channel") {
              return this.getItems(node.childNodes[j]);
            }
          }
        }
      }
      return null;
    }
    getItems(channel) {
      let nb = 0;
      const items = [];
      for (let i = 0; i < channel.childNodes.length; i++) {
        if (channel.childNodes[i].localName === "item") {
          if (nb >= this.limit) {
            break;
          }
          const item = this.getItem(channel.childNodes[i], nb);
          if (item !== null) {
            items.push(item);
          }
          nb++;
        }
      }
      return items;
    }
    getItem(item, nb) {
      let description = "";
      let title = "";
      let thumbnailUrl = "";
      let thumbnail = null;
      let pubDate = "";
      let link = "";
      let thumbnail1 = null;
      let img = {};
      const thumbnails = [];
      for (let i = 0; i < item.childNodes.length; i++) {
        switch (item.childNodes[i].nodeName) {
          case "media:content":
            img = this.getImg(item.childNodes[i]);
            break;
          case "media:description":
            description = item.childNodes[i].innerHTML;
            break;
          case "media:title":
            title = item.childNodes[i].innerHTML;
            break;
          case "media:thumbnail":
            thumbnail1 = this.getImg(item.childNodes[i]);
            thumbnails.push({
              "url": thumbnail1.url,
              "width": thumbnail1.width,
              "height": thumbnail1.height
            });
            break;
          case "pubDate":
            pubDate = item.childNodes[i].innerHTML;
            break;
          case "link":
            link = item.childNodes[i].innerHTML;
            break;
          default:
            break;
        }
      }
      for (let i = 0; i < thumbnails.length; i++) {
        if (thumbnails[i].url.indexOf("w_300") > 0) {
          thumbnailUrl = thumbnails[i].url;
          thumbnail = thumbnails[i];
        }
      }
      if (thumbnail) {
        const parsedDate = new Date(pubDate);
        const formattedDate = `${parsedDate.getFullYear()}-${(parsedDate.getMonth() + 1).toString().padStart(2, '0')}-${parsedDate.getDate().toString().padStart(2, '0')}`;
        return {
          "image": {
            "src": img.url,
            "description": this.stripTags(description),
            "width": img.width,
            "height": img.height
          },
          "url": img.url,
          "width": img.width,
          "height": img.height,
          "title": this.stripTags(title),
          "description": this.stripTags(description),
          "link": link,
          "publicID": nb,
          "pubDate": pubDate,
          "thumbnails": thumbnails,
          "thumbnailUrl": thumbnailUrl,
          "thumbnail": thumbnail,
          "urlEncode": this.encryptUrl(img.url, "mySecretKey"),
          "loading": nb > 10 ? "lazy" : "eager",
          "date_y_m_d": formattedDate,
          "id": nb
        };
      }
      return null;
    }
    encryptUrl(url) {
      let encrypted = '';
      let keyIndex = 0;

      // Chiffrer chaque caractère de l'URL en fonction du secretKey
      for (let i = 0; i < url.length; i++) {
        // Décaler le code ASCII du caractère en fonction de la clé
        const charCode = url.charCodeAt(i) + this.secretKey.charCodeAt(keyIndex % this.secretKey.length);
        encrypted += String.fromCharCode(charCode);

        // Passer à la lettre suivante de la clé
        keyIndex++;
      }

      // Convertir en base64 pour rendre l'URL plus sûre pour le transport
      return btoa(encrypted);
    }
    decryptUrl(encryptedUrl) {
      const decoded = atob(encryptedUrl); // Décoder la base64
      let decrypted = '';
      let keyIndex = 0;

      // Déchiffrer chaque caractère de l'URL
      for (let i = 0; i < decoded.length; i++) {
        // Revenir au code ASCII original en soustrayant le décalage
        const charCode = decoded.charCodeAt(i) - this.secretKey.charCodeAt(keyIndex % this.secretKey.length);
        decrypted += String.fromCharCode(charCode);

        // Passer à la lettre suivante de la clé
        keyIndex++;
      }
      return decrypted;
    }
    getImg(item) {
      const img = new _CImg.default(0, 0, 0, 0, null, "");
      for (let j = 0; j < item.attributes.length; j++) {
        if (item.attributes[j].nodeName === "url") {
          img.url = item.attributes[j].value;
        } else if (item.attributes[j].nodeName === "height") {
          img.height = parseInt(item.attributes[j].value);
        } else if (item.attributes[j].nodeName === "width") {
          img.width = parseInt(item.attributes[j].value);
        }
      }
      return img;
    }
    stripTags(text) {
      if (text) {
        let ele = document.createElement("div");
        ele.innerHTML = text;
        return ele.textContent.replace(/(<([^>]+)>)/gi, "");
      }
      return "";
    }
  }
  _exports.default = DeviantArtService;
});
;define("host-app/services/engine-router-service", ["exports", "ember-engines-router-service/services/engine-router-service"], function (_exports, _engineRouterService) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-engines-router-service/services/engine-router-service"eaimeta@70e063a35619d71f
  var _default = _exports.default = _engineRouterService.default;
});
;define("host-app/services/fullscreen-service", ["exports", "@ember/service"], function (_exports, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/service"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class FullScreenService extends _service.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "fn", null);
      _defineProperty(this, "elementID", '');
      _defineProperty(this, "document", null);
      _defineProperty(this, "isCommonjs", null);
      _defineProperty(this, "keyboardAllowed", null);
      _defineProperty(this, "isEnabled", false);
      _defineProperty(this, "fullScreenRequestHandler", null);
      _defineProperty(this, "fullScreenChangehandler", null);
      _defineProperty(this, "fullScreenElementId", '');
      _defineProperty(this, "intervalId", 0);
      _defineProperty(this, "elementHeight", 0);
      _defineProperty(this, "fullScreenStarted", false);
      _defineProperty(this, "waitChange", false);
    }
    initialize() {
      this.waitChange = false;
      this.document = typeof window === 'object' && typeof window.document === 'object' ? window.document : {};
      this.keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;
      const fnMap = [['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'],
      // New WebKit
      ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'],
      // Old WebKit (Safari 5.1)
      ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];
      this.fn = {};
      for (const val of fnMap) {
        if (val && val[1] in document) {
          for (let i = 0; i < val.length; i++) {
            this.fn[fnMap[0][i]] = val[i];
          }
          break;
        }
      }
      this.eventNameMap = {
        change: this.fn.fullscreenchange,
        error: this.fn.fullscreenerror
      };
      return true;
    }
    updateEnabled() {
      this.set('isEnabled', this.isFullscreen());
    }
    trigger() {}
    enterFullScreen() {
      const element = document.getElementById(this.fullScreenElementId);
      if (!this.isFullscreen()) {
        this.fullScreenStarted = false;
        this.waitChange = false;
        this.request(element);
      }
    }
    request(element) {
      if (this.fn) {
        const request = this.fn.requestFullscreen;
        element = element || document.documentElement;
        const rect = element.getBoundingClientRect();
        this.elementHeight = rect.height;
        this.fullScreenStarted = false;
        // Work around Safari 5.1 bug: reports support for
        // keyboard in fullscreen even though it doesn't.
        // Browser sniffing, since the alternative with
        // setTimeout is even worse.
        if (/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)) {
          element[request]();
        } else {
          element[request](this.keyboardAllowed ? Element.ALLOW_KEYBOARD_INPUT : {}).then(() => {
            this.waitChange = true;
          }).catch(err => {
            this.elementHeight = 0;
            this.waitChange = false;
          });
        }
      }
    }
    getFullScreenChange(newHeight) {
      if (newHeight > 0 && this.elementHeight > 0 && newHeight != this.elementHeight) {
        if (this.elementHeight > 0 && this.waitChange) {
          this.elementHeight = newHeight;
          this.waitChange = false;
          this.fullScreenStarted = true;
          return true;
        }
        if (this.waitChange == false && newHeight > 0 && this.isFullscreen() == false && this.fullScreenStarted) {
          this.fullScreenStarted = false;
          this.elementHeight = 0;
          return true;
        }
      }
      return false;
    }
    exit() {
      if (this.isFullscreen()) {
        this.elementHeight = 0;
        this.waitChange = false;
        this.document[this.fn.exitFullscreen]();
      }
    }
    willDestroy() {
      this.fullScreenStarted = false;
    }
    isFullscreen() {
      if (this.fn === null) {
        return false;
      }
      return this.document[this.fn.fullscreenElement] !== null;
    }
  }
  _exports.default = FullScreenService;
});
;define("host-app/services/intl", ["exports", "ember-intl/services/intl"], function (_exports, _intl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _intl.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-intl/services/intl"eaimeta@70e063a35619d71f
});
;define("host-app/services/model-notifier-service", ["exports", "@ember/service", "@glimmer/tracking"], function (_exports, _service, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3; // app/services/model-notifier.js
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let ModelNotifierService = _exports.default = (_class = class ModelNotifierService extends _service.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "modelID", _descriptor, this);
      _initializerDefineProperty(this, "modelType", _descriptor2, this);
      _initializerDefineProperty(this, "dataSet", _descriptor3, this);
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "modelID", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return "";
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "modelType", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return "";
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "dataSet", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("host-app/services/navigation-service", ["exports", "@ember/service"], function (_exports, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let NavigationService = _exports.default = (_class = class NavigationService extends _service.default {
    constructor(owner, args) {
      super(owner, args);
      _initializerDefineProperty(this, "fullscreenService", _descriptor, this);
      _initializerDefineProperty(this, "intl", _descriptor2, this);
      _defineProperty(this, "arrayRoutes", null);
      _defineProperty(this, "routeName1", '');
      _defineProperty(this, "routeTitle1", '');
      _defineProperty(this, "routeEnabled1", false);
      _defineProperty(this, "pageTitleEnabled", false);
      _defineProperty(this, "routeName2", '');
      _defineProperty(this, "routeTitle2", '');
      _defineProperty(this, "routeEnabled2", false);
      _defineProperty(this, "fullScreenEnabled", false);
      _defineProperty(this, "nav_id", 0);
      _defineProperty(this, "fps", 0);
      _defineProperty(this, "config", null);
      _defineProperty(this, "idElementProgress", 'nav-progress-bar');
      _defineProperty(this, "routeClass1", '');
      this.routeName1 = '';
      this.routeTitle1 = '';
      this.routeClass1 = '';
      this.routeName2 = '';
      this.routeTitle2 = '';
      this.pageTitleEnabled = false;
      this.routeEnabled1 = false;
      this.routeEnabled2 = false;
      this.arrayRoutes = [];
    }
    fetchData() {
      return new Promise(resolve => {
        fetch('/api/index.json').then(response => response.json()).then(data => {
          this.setApplicationRoutes(data);
          // Handle the parsed data here
          resolve(data);
        });
      });
    }
    setDocumentTitle(title) {
      document.title = title;
    }
    updateProgressBar(percent) {
      if (this.idElementProgress) {
        const progressBar = document.getElementById(this.idElementProgress);
        if (progressBar) {
          if (percent >= 0 && percent < 100) {
            progressBar.style.width = `${Math.round(percent * 100) / 100}%`;
            progressBar.style.height = '6px';
            progressBar.style.display = 'block';
          } else {
            progressBar.style.display = 'none';
            progressBar.style.width = '0';
            progressBar.style.height = '0';
          }
        }
      }
    }
    setApplicationRoutes(model) {
      this.arrayRoutes = [];
      for (let index = 0; index < model.dataSets.length; index++) {
        this.arrayRoutes[model.dataSets[index].id] = model.dataSets[index];
      }
    }
    setNavigationRoutes(name, route) {
      if (name !== null) {
        if (name.indexOf(".index") > 0) {
          this.set('routeClass1', 'd-block');
          this.disableFullScreen();
        } else {
          this.set('routeClass1', 'd-none');
        }
        if (this.arrayRoutes[name] && typeof this.arrayRoutes[name] === 'object') {
          if (typeof this.arrayRoutes[name].indexTitle === 'string' && this.arrayRoutes[name].indexTitle !== '') {
            this.setRoute1(this.intl.t(this.arrayRoutes[name].indexTitle), this.arrayRoutes[name].indexRoute);
          }
          if (typeof this.arrayRoutes[name].pageRoute === 'string' && this.arrayRoutes[name].pageRoute !== '') {
            this.setRoute2(this.intl.t(this.arrayRoutes[name].title), this.arrayRoutes[name].pageRoute);
          } else if (typeof this.arrayRoutes[name].title === 'string' && this.arrayRoutes[name].title !== '') {
            this.setRoute2(this.intl.t(this.arrayRoutes[name].title), route);
          }
          return true;
        }
      }
      this.disableRoute1();
      this.disableRoute2();
      this.disableFullScreen();
      return false;
    }
    disableRoute1() {
      this.set('routeEnabled1', false);
    }
    disableRoute2() {
      this.set('pageTitleEnabled', false);
      this.set('routeEnabled2', false);
    }
    setRoute1(rootTitle, rootName) {
      if (rootName !== '') {
        this.set('routeName1', String(rootName));
        this.set('routeTitle1', rootTitle);
        this.set('routeEnabled1', true);
      } else {
        this.set('routeEnabled1', false);
        this.set('routeName1', "index");
        this.set('routeTitle1', "");
      }
    }
    setRoute2(rootTitle, rootName) {
      if (rootName === '0') {
        this.set('routeEnabled2', false);
        this.set('routeName2', "index");
        this.set('routeTitle2', rootTitle);
        this.set('pageTitleEnabled', true);
      } else if (rootName !== '') {
        this.set('routeName2', String(rootName));
        this.set('routeTitle2', rootTitle);
        this.set('pageTitleEnabled', false);
        this.set('routeEnabled2', true);
      } else {
        this.set('routeEnabled2', false);
        this.set('routeName2', "index");
        this.set('routeTitle2', "");
        this.set('pageTitleEnabled', false);
      }
    }
    enterFullScreen() {
      this.fullscreenService.enterFullScreen();
    }
    initFullScreen(idElement) {
      this.fullscreenService.fullScreenElementId = idElement;
      this.set('fullScreenEnabled', true);
    }
    getFullScreenElementID() {
      return this.fullscreenService.fullScreenElementId;
    }
    disableFullScreen() {
      this.set('fullScreenEnabled', false);
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "fullscreenService", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "intl", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("host-app/services/page-title", ["exports", "ember-page-title/services/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitle.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-page-title/services/page-title"eaimeta@70e063a35619d71f
});
;define("host-app/services/store", ["exports", "@ember/debug", "ember-data/store"], function (_exports, _debug, _store) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _store.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"ember-data/store"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the store service. Use `export { default } from 'ember-data/store';` in app/services/store.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '5.2'
    }
  }));
});
;define("host-app/services/user-actions-service", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  class UserActionsService {
    constructor() {
      this.eventTarget = new EventTarget();
    }
    // Méthode pour déclencher l'événement
    triggerEvent(name, data) {
      const event = new CustomEvent(name, {
        detail: data
      });
      this.eventTarget.dispatchEvent(event);
    }
  }
  _exports.default = UserActionsService;
});
;define("host-app/services/worker-container", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class WorkerContainer {
    constructor() {
      _defineProperty(this, "JSONfn", '');
      _defineProperty(this, "worker", null);
      _defineProperty(this, "canvasService", null);
      _defineProperty(this, "component", null);
      _defineProperty(this, "id", 0);
      _defineProperty(this, "callback", null);
      _defineProperty(this, "workerUrl", '');
    }
    initWorker(workerJs) {
      if (workerJs === "") {
        return false;
      }
      const workerBlob = new Blob([workerJs], {
        type: 'application/javascript'
      });
      this.workerUrl = window.URL.createObjectURL(workerBlob);
      console.info(this.workerUrl);
      this.worker = new Worker(this.workerUrl);
      this.JSONfn = {
        stringify: function (obj) {
          return JSON.stringify(obj, function (key, value) {
            if (value instanceof Function || typeof value === 'function') {
              const fnBody = value.toString();
              if (fnBody.length < 8 || fnBody.substring(0, 8) !== 'function') {
                //this is ES6 Arrow Function
                return `_NuFrRa_${fnBody}`;
              }
              return fnBody;
            }
            if (value instanceof RegExp) {
              return `_PxEgEr_${value}`;
            }
            return value;
          });
        }
      };
      return true;
    }
    execAll(args) {
      const promises = [];
      for (let ix = 0; ix < args.length; ix++) {
        promises.push(this.exec(args[ix]));
      }
      return Promise.all(promises).then(function (values) {
        return values;
      });
    }
    exec(param) {
      this.worker.onmessage = oEvent => {
        console.info("receive message");
        console.info(oEvent);
        //param.callback(oEvent.data);
        this.worker.terminate();
        // free
        URL.revokeObjectURL(this.workerUrl);
      };
      this.worker.onerror = error => {
        //console.error(error);
        //param.callback(null, error.message);
        this.worker.terminate();
      };
      console.info("post message");
      this.worker.postMessage(this.JSONfn.stringify(param));
    }
  }
  _exports.default = WorkerContainer;
});
;define("host-app/services/worker-service", ["exports", "fetch", "host-app/services/worker-container"], function (_exports, _fetch, _workerContainer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"fetch",0,"host-app/services/worker-container"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class WorkerService {
    constructor() {
      _defineProperty(this, "workerJs", '');
      _defineProperty(this, "workerNb", 0);
    }
    async loadJs() {
      const response = await (0, _fetch.default)('/worker/worker.js');
      this.workerJs = await response.text();
    }
    createWorkerContainer() {
      this.workerNb++;
      const workerContainer = new _workerContainer.default();
      if (workerContainer.initWorker(this.workerJs)) {
        workerContainer.id = this.workerNb;
        return workerContainer;
      }
    }
  }
  _exports.default = WorkerService;
});
;define("host-app/templates/about", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <article class="container-xxl mt-4 mb-4">
    <section class="col-12 mb-4">
      <div class="card p-5">
        <p class="text-warning">
          No Cookies Tracking
        </p>
        <p>
          We do not use cookies to track your online activities. We assure you
          that we do not collect any personal data.
        </p>
  
        <p class="text-warning">
          Interactive Features
        </p>
        <p>
          JavaScript allows us to create dynamic and interactive elements on our
          site.
          <br />
          For most browsers, JavaScript is enabled by default.
          <br />
          However, if you have manually disabled it, you can enable JavaScript in
          your browser settings.<br />
          We recommend using Mozilla Firefox
        </p>
      </div>
    </section>
  </article>
  <article class="container-xxl mt-4 mb-4">
    <section class="col-12 mb-4">
      <div class="card p-5">
        <p class="text-warning">
          Aucun suivi par cookies
        </p>
        <p>
          Nous n'utilisons pas de cookies pour suivre vos activités en ligne et ne
          collectons pas de données personnelles.
        </p>
  
        <p class="text-warning">
          Fonctionnalités interactives
        </p>
        <p>
          JavaScript nous permet de créer des éléments dynamiques et interactifs
          sur notre site.
          <br />
          Pour la plupart des navigateurs, JavaScript est activé par défaut.
          <br />
          Cependant, si vous l'avez désactivé manuellement, vous pouvez l'activer
          dans les paramètres de votre navigateur.
          <br />
          Nous recommandons d'utiliser Mozilla Firefox.
        </p>
      </div>
    </section>
    <section class="col-12 mb-3">
      <ul class="list-group index-list index-list-3 mb-3 list-group">
        <li class="list-group-item">
          <a
            class="btn btn-outline-secondary btn-list-sub-item"
            href="https://mastodon.social/@universlogique"
          >
            Follow me on Mastodon
          </a>
        </li>
        <li class="list-group-item">
          <a
            class="btn btn-outline-secondary btn-list-sub-item"
            href="https://github.com/agcodes/playground/tree/main"
          >
            Github (playground)
          </a>
        </li>
        <li class="list-group-item">
          <a
            class="btn btn-outline-secondary btn-list-sub-item"
            href="https://codepen.io/universlogique"
          >
            Snippets
          </a>
        </li>
        <li class="list-group-item">
          <a
            class="btn btn-outline-secondary btn-list-sub-item"
            href="https://deviantart.com/universlogique"
          >
            Deviant art
          </a>
        </li>
      </ul>
    </section>
  </article>
  */
  {
    "id": "gzRrHWVQ",
    "block": "[[[10,\"article\"],[14,0,\"container-xxl mt-4 mb-4\"],[12],[1,\"\\n  \"],[10,\"section\"],[14,0,\"col-12 mb-4\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card p-5\"],[12],[1,\"\\n      \"],[10,2],[14,0,\"text-warning\"],[12],[1,\"\\n        No Cookies Tracking\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        We do not use cookies to track your online activities. We assure you\\n        that we do not collect any personal data.\\n      \"],[13],[1,\"\\n\\n      \"],[10,2],[14,0,\"text-warning\"],[12],[1,\"\\n        Interactive Features\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        JavaScript allows us to create dynamic and interactive elements on our\\n        site.\\n        \"],[10,\"br\"],[12],[13],[1,\"\\n        For most browsers, JavaScript is enabled by default.\\n        \"],[10,\"br\"],[12],[13],[1,\"\\n        However, if you have manually disabled it, you can enable JavaScript in\\n        your browser settings.\"],[10,\"br\"],[12],[13],[1,\"\\n        We recommend using Mozilla Firefox\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[10,\"article\"],[14,0,\"container-xxl mt-4 mb-4\"],[12],[1,\"\\n  \"],[10,\"section\"],[14,0,\"col-12 mb-4\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card p-5\"],[12],[1,\"\\n      \"],[10,2],[14,0,\"text-warning\"],[12],[1,\"\\n        Aucun suivi par cookies\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Nous n'utilisons pas de cookies pour suivre vos activités en ligne et ne\\n        collectons pas de données personnelles.\\n      \"],[13],[1,\"\\n\\n      \"],[10,2],[14,0,\"text-warning\"],[12],[1,\"\\n        Fonctionnalités interactives\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        JavaScript nous permet de créer des éléments dynamiques et interactifs\\n        sur notre site.\\n        \"],[10,\"br\"],[12],[13],[1,\"\\n        Pour la plupart des navigateurs, JavaScript est activé par défaut.\\n        \"],[10,\"br\"],[12],[13],[1,\"\\n        Cependant, si vous l'avez désactivé manuellement, vous pouvez l'activer\\n        dans les paramètres de votre navigateur.\\n        \"],[10,\"br\"],[12],[13],[1,\"\\n        Nous recommandons d'utiliser Mozilla Firefox.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,\"section\"],[14,0,\"col-12 mb-3\"],[12],[1,\"\\n    \"],[10,\"ul\"],[14,0,\"list-group index-list index-list-3 mb-3 list-group\"],[12],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,0,\"btn btn-outline-secondary btn-list-sub-item\"],[14,6,\"https://mastodon.social/@universlogique\"],[12],[1,\"\\n          Follow me on Mastodon\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,0,\"btn btn-outline-secondary btn-list-sub-item\"],[14,6,\"https://github.com/agcodes/playground/tree/main\"],[12],[1,\"\\n          Github (playground)\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,0,\"btn btn-outline-secondary btn-list-sub-item\"],[14,6,\"https://codepen.io/universlogique\"],[12],[1,\"\\n          Snippets\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,0,\"btn btn-outline-secondary btn-list-sub-item\"],[14,6,\"https://deviantart.com/universlogique\"],[12],[1,\"\\n          Deviant art\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"article\",\"section\",\"div\",\"p\",\"br\",\"ul\",\"li\",\"a\"]]",
    "moduleName": "host-app/templates/about.hbs",
    "isStrictMode": false
  });
});
;define("host-app/templates/application", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div data-name="application" class="ember-view">
    <div data-name="navbar" class="main-navbar container-fluid hide-m">
      <div data-name="navbar-row" class="row">
        <nav class="navbar navbar-expand-lg" id="main-nav-bar">
          <div class="container-xxl">
            <div class="row">
              <div class="col col-12">
                <ul class="nav navbar">
                  <li class="">
                    <LinkTo
                      role="link"
                      @route="index"
                      title="{{t 'Home'}}"
                      rel="home"
                    >
                      <span class="pad-nav-link">
                        <img
                          src="{{this.rootURL}}assets/img/logo-32-32.png"
                          height="32"
                          width="32"
                          alt="{{t 'SITE_TITLE'}}"
                          loading="lazy"
                          class="rounded elementor-animation-pulse"
                        />
                      </span>
                    </LinkTo>
                  </li>
  
                  <li class="nav-item">
                    <LinkTo role="link" @route="index" class="nav-link">
                      {{t "SITE_TITLE"}}
                    </LinkTo>
                  </li>
  
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
    {{outlet}}
  </div>
  */
  {
    "id": "sb2FxvS2",
    "block": "[[[10,0],[14,\"data-name\",\"application\"],[14,0,\"ember-view\"],[12],[1,\"\\n  \"],[10,0],[14,\"data-name\",\"navbar\"],[14,0,\"main-navbar container-fluid hide-m\"],[12],[1,\"\\n    \"],[10,0],[14,\"data-name\",\"navbar-row\"],[14,0,\"row\"],[12],[1,\"\\n      \"],[10,\"nav\"],[14,0,\"navbar navbar-expand-lg\"],[14,1,\"main-nav-bar\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"container-xxl\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"col col-12\"],[12],[1,\"\\n              \"],[10,\"ul\"],[14,0,\"nav navbar\"],[12],[1,\"\\n                \"],[10,\"li\"],[14,0,\"\"],[12],[1,\"\\n                  \"],[8,[39,4],[[24,\"role\",\"link\"],[16,\"title\",[29,[[28,[37,5],[\"Home\"],null]]]],[24,\"rel\",\"home\"]],[[\"@route\"],[\"index\"]],[[\"default\"],[[[[1,\"\\n                    \"],[10,1],[14,0,\"pad-nav-link\"],[12],[1,\"\\n                      \"],[10,\"img\"],[15,\"src\",[29,[[30,0,[\"rootURL\"]],\"assets/img/logo-32-32.png\"]]],[14,\"height\",\"32\"],[14,\"width\",\"32\"],[15,\"alt\",[29,[[28,[37,5],[\"SITE_TITLE\"],null]]]],[14,\"loading\",\"lazy\"],[14,0,\"rounded elementor-animation-pulse\"],[12],[13],[1,\"\\n                    \"],[13],[1,\"\\n                  \"]],[]]]]],[1,\"\\n                \"],[13],[1,\"\\n\\n                \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[1,\"\\n                  \"],[8,[39,4],[[24,\"role\",\"link\"],[24,0,\"nav-link\"]],[[\"@route\"],[\"index\"]],[[\"default\"],[[[[1,\"\\n                    \"],[1,[28,[35,5],[\"SITE_TITLE\"],null]],[1,\"\\n                  \"]],[]]]]],[1,\"\\n                \"],[13],[1,\"\\n\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[46,[28,[37,9],null,null],null,null,null],[1,\"\\n\"],[13]],[],false,[\"div\",\"nav\",\"ul\",\"li\",\"link-to\",\"t\",\"span\",\"img\",\"component\",\"-outlet\"]]",
    "moduleName": "host-app/templates/application.hbs",
    "isStrictMode": false
  });
});
;define("host-app/templates/components/index-c", ["exports", "@glimmer/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component"eaimeta@70e063a35619d71f
  class IndexC extends _component.default {
    constructor(owner, args) {
      super(owner, args);
      this.item = args.item;
    }
  }
  _exports.default = IndexC;
});
;define("host-app/templates/components/test", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <p>
    test
  </p>
  */
  {
    "id": "Xxg4wIeJ",
    "block": "[[[10,2],[12],[1,\"\\n  test\\n\"],[13]],[],false,[\"p\"]]",
    "moduleName": "host-app/templates/components/test.hbs",
    "isStrictMode": false
  });
});
;define("host-app/templates/gallery", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <Gallery />
  */
  {
    "id": "30rUKUAB",
    "block": "[[[8,[39,0],null,null,null]],[],false,[\"gallery\"]]",
    "moduleName": "host-app/templates/gallery.hbs",
    "isStrictMode": false
  });
});
;define("host-app/templates/head", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{!-- 
    Add content you wish automatically added to the documents head
    here. The 'model' available in this template can be populated by
    setting values on the 'head-data' service. 
  --}}
  */
  {
    "id": "dkkJaXA0",
    "block": "[[],[],false,[]]",
    "moduleName": "host-app/templates/head.hbs",
    "isStrictMode": false
  });
});
;define("host-app/templates/image/page", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="row">
    <div class="col col-2 col-md-2">
      <div class="m-3 d-none d-md-block">
        <div class="">
          <div class="card-body">
            <p class="m-3">
              <LinkTo role="link" class="btn btn-outline-light" @route="gallery">
                {{t "Back to gallery"}}
              </LinkTo>
            </p>
          </div>
        </div>
        <GalleryThumbnails />
      </div>
    </div>
    <div class="col col-12 col-md-10 justify-content-center">
      <div class="">
        <div class="card-body">
          <figure class="figure-fit-image">
            <img
              src="{{this.model.url}}"
              alt="image"
              class="fit-image border-2px-gray img-fluid shadow-1-strong rounded mb-4"
            />
          </figure>
        </div>
      </div>
    </div>
  </div>
  */
  {
    "id": "+UHkFbV/",
    "block": "[[[10,0],[14,0,\"row\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"col col-2 col-md-2\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"m-3 d-none d-md-block\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n          \"],[10,2],[14,0,\"m-3\"],[12],[1,\"\\n            \"],[8,[39,2],[[24,\"role\",\"link\"],[24,0,\"btn btn-outline-light\"]],[[\"@route\"],[\"gallery\"]],[[\"default\"],[[[[1,\"\\n              \"],[1,[28,[35,3],[\"Back to gallery\"],null]],[1,\"\\n            \"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[8,[39,4],null,null,null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"col col-12 col-md-10 justify-content-center\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n        \"],[10,\"figure\"],[14,0,\"figure-fit-image\"],[12],[1,\"\\n          \"],[10,\"img\"],[15,\"src\",[29,[[30,0,[\"model\",\"url\"]]]]],[14,\"alt\",\"image\"],[14,0,\"fit-image border-2px-gray img-fluid shadow-1-strong rounded mb-4\"],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"div\",\"p\",\"link-to\",\"t\",\"gallery-thumbnails\",\"figure\",\"img\"]]",
    "moduleName": "host-app/templates/image/page.hbs",
    "isStrictMode": false
  });
});
;define("host-app/templates/index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <main class="mb-4 page-index">
    <section class="container-fluid">
      <div class="row justify-content-center align-items-center">
  
        <LinkTo class="special-cursor" role="link" @route="color">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="svg-play"
            width="400"
            height="400"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              stroke="black"
              stroke-width="2"
              fill="lightgray"
            />
            <polygon points="40,30 40,70 70,50" fill="black" />
          </svg>
        </LinkTo>
  
      </div>
    </section>
  </main>
  
  <style>
  
  </style>
  */
  {
    "id": "lwToKS4B",
    "block": "[[[10,\"main\"],[14,0,\"mb-4 page-index\"],[12],[1,\"\\n  \"],[10,\"section\"],[14,0,\"container-fluid\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"row justify-content-center align-items-center\"],[12],[1,\"\\n\\n      \"],[8,[39,3],[[24,0,\"special-cursor\"],[24,\"role\",\"link\"]],[[\"@route\"],[\"color\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,\"svg\"],[14,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[14,0,\"svg-play\"],[14,\"width\",\"400\"],[14,\"height\",\"400\"],[14,\"viewBox\",\"0 0 100 100\"],[12],[1,\"\\n          \"],[10,\"circle\"],[14,\"cx\",\"50\"],[14,\"cy\",\"50\"],[14,\"r\",\"48\"],[14,\"stroke\",\"black\"],[14,\"stroke-width\",\"2\"],[14,\"fill\",\"lightgray\"],[12],[13],[1,\"\\n          \"],[10,\"polygon\"],[14,\"points\",\"40,30 40,70 70,50\"],[14,\"fill\",\"black\"],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"style\"],[12],[1,\"\\n\\n\"],[13]],[],false,[\"main\",\"section\",\"div\",\"link-to\",\"svg\",\"circle\",\"polygon\",\"style\"]]",
    "moduleName": "host-app/templates/index.hbs",
    "isStrictMode": false
  });
});
;define("host-app/templates/links", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <article class="row">
    <div class="list-group list-group-flush p-5 font-weight-bold">
      <p class="list-group-item">
        I draw pictures with my computer.
      </p>
      <li class="list-group-item p-3 font-weight-bold fs-4">
        <LinkTo role="link" @route="index" title="{{t "Home"}}" rel="home">
          WEBSITE
        </LinkTo>
      </li>
      <li class="list-group-item p-3 font-weight-bold fs-4">
        <a href="https://www.instagram.com/universlogique/">
          INSTA
        </a>
      </li>
      <li class="list-group-item p-3 font-weight-bold fs-4">
        <a href="https://www.deviantart.com/">
          DEVIANT ART
        </a>
      </li>
      <li class="list-group-item p-3 m-l-2 font-weight-bold fs-4">
        <LinkTo role="link" 
          @route="gallery"
  				class="m-1"
        >
          {{t "Gallery"}}
        </LinkTo>
      </li>
      <li class="list-group-item p-3 font-weight-bold fs-4">
        <a href="https://www.youtube.com/@universlogique/">
          YOUTUBE
        </a>
      </li>
    </div>
  </article>
  */
  {
    "id": "zk0XQ34I",
    "block": "[[[10,\"article\"],[14,0,\"row\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"list-group list-group-flush p-5 font-weight-bold\"],[12],[1,\"\\n    \"],[10,2],[14,0,\"list-group-item\"],[12],[1,\"\\n      I draw pictures with my computer.\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item p-3 font-weight-bold fs-4\"],[12],[1,\"\\n      \"],[8,[39,4],[[24,\"role\",\"link\"],[16,\"title\",[29,[[28,[37,5],[\"Home\"],null]]]],[24,\"rel\",\"home\"]],[[\"@route\"],[\"index\"]],[[\"default\"],[[[[1,\"\\n        WEBSITE\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item p-3 font-weight-bold fs-4\"],[12],[1,\"\\n      \"],[10,3],[14,6,\"https://www.instagram.com/universlogique/\"],[12],[1,\"\\n        INSTA\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item p-3 font-weight-bold fs-4\"],[12],[1,\"\\n      \"],[10,3],[14,6,\"https://www.deviantart.com/\"],[12],[1,\"\\n        DEVIANT ART\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item p-3 m-l-2 font-weight-bold fs-4\"],[12],[1,\"\\n      \"],[8,[39,4],[[24,\"role\",\"link\"],[24,0,\"m-1\"]],[[\"@route\"],[\"gallery\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,5],[\"Gallery\"],null]],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item p-3 font-weight-bold fs-4\"],[12],[1,\"\\n      \"],[10,3],[14,6,\"https://www.youtube.com/@universlogique/\"],[12],[1,\"\\n        YOUTUBE\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"article\",\"div\",\"p\",\"li\",\"link-to\",\"t\",\"a\"]]",
    "moduleName": "host-app/templates/links.hbs",
    "isStrictMode": false
  });
});
;define("host-app/templates/menu", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <main class="mb-4 page-index">
    <section class="container-fluid">
      <div class="row">
        <div class="col col-md-6 col-12 index-col-2">
          <div class="col col-12 index-col-2-intro">
            <p class="baseline">
              <LinkTo @route="menu">
                {{t "site_index_description"}}
              </LinkTo>
  
            </p>
          </div>
          <SwitchLang />
        </div>
        <div class="col col-md-6 col-12 index-col-3">
          ok menu
        </div>
      </div>
    </section>
  </main>
  
  <footer class="row text-center">
    <div class="col-12 mb-3">
      <div class="d-md-none d-block">
        <ul class="nav navbar">
          <LinksNavbar />
        </ul>
      </div>
    </div>
  </footer>
  */
  {
    "id": "+SI/jYbB",
    "block": "[[[10,\"main\"],[14,0,\"mb-4 page-index\"],[12],[1,\"\\n  \"],[10,\"section\"],[14,0,\"container-fluid\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"col col-md-6 col-12 index-col-2\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"col col-12 index-col-2-intro\"],[12],[1,\"\\n          \"],[10,2],[14,0,\"baseline\"],[12],[1,\"\\n            \"],[8,[39,4],null,[[\"@route\"],[\"menu\"]],[[\"default\"],[[[[1,\"\\n              \"],[1,[28,[35,5],[\"site_index_description\"],null]],[1,\"\\n            \"]],[]]]]],[1,\"\\n\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[8,[39,6],null,null,null],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"col col-md-6 col-12 index-col-3\"],[12],[1,\"\\n        ok menu\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"footer\"],[14,0,\"row text-center\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"col-12 mb-3\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"d-md-none d-block\"],[12],[1,\"\\n      \"],[10,\"ul\"],[14,0,\"nav navbar\"],[12],[1,\"\\n        \"],[8,[39,9],null,null,null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"main\",\"section\",\"div\",\"p\",\"link-to\",\"t\",\"switch-lang\",\"footer\",\"ul\",\"links-navbar\"]]",
    "moduleName": "host-app/templates/menu.hbs",
    "isStrictMode": false
  });
});
;define("host-app/templates/not-found", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <article class="container-xxl mt-4 mb-4">
    <header class="col-12 mb-3">
      <h1 class="m-4">
        {{t "Not found"}}.
      </h1>
    </header>
  </article>
  */
  {
    "id": "HLpsdM0H",
    "block": "[[[10,\"article\"],[14,0,\"container-xxl mt-4 mb-4\"],[12],[1,\"\\n  \"],[10,\"header\"],[14,0,\"col-12 mb-3\"],[12],[1,\"\\n    \"],[10,\"h1\"],[14,0,\"m-4\"],[12],[1,\"\\n      \"],[1,[28,[35,3],[\"Not found\"],null]],[1,\".\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"article\",\"header\",\"h1\",\"t\"]]",
    "moduleName": "host-app/templates/not-found.hbs",
    "isStrictMode": false
  });
});
;define("host-app/templates/posts", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <PostsList />
  */
  {
    "id": "SbxksP5w",
    "block": "[[[8,[39,0],null,null,null]],[],false,[\"posts-list\"]]",
    "moduleName": "host-app/templates/posts.hbs",
    "isStrictMode": false
  });
});
;define("host-app/templates/sources", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <article class="container-xxl mt-4 mb-4">
    <header class="col-12">
      <h1 class="m-4">
        Sources
      </h1>
    </header>
    <section class="col-12">
      <ul class="list-group m-4">
        <li class="list-group-item">
          <a href="http://paulbourke.net/fractals/">
            Fractals, Chaos, Self-Similarity - Paul Bourke
          </a>
          <span class="btn btn-outline-secondary btn-list-sub-item">
            <a href="http://paulbourke.net/fractals/z4gasket/">
              z4 Julia Gasket
            </a>
          </span>
          <span class="btn btn-outline-secondary btn-list-sub-item">
            <a href="http://paulbourke.net/fractals/woggle/">
              Woggle
            </a>
          </span>
          <span class="btn btn-outline-secondary btn-list-sub-item">
            <a href="https://paulbourke.net/fractals/starjulia/">
              Star Julia (Roger Bagula)
            </a>
          </span>
          <span class="btn btn-outline-secondary btn-list-sub-item">
            <a href="https://paulbourke.net/fractals/multijulia/">
              Multi Julia
            </a>
          </span>
          <span class="btn btn-outline-secondary btn-list-sub-item">
            <a href="http://paulbourke.net/fractals/ifs/">
              IFS
            </a>
          </span>
        </li>
        <li class="list-group-item">
          <a
            href="https://note.com/108hassium/n/n96ebc5def594?_x_tr_sl=auto&_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_hl=fr"
          >
            Fractals - 108hassium
          </a>
        </li>
        <li class="list-group-item">
          <a href="https://richmit.github.io/mraster/index.html">
            MRaster - Mitch Richling
          </a>
        </li>
  
        <li class="list-group-item">
          <a href="http://www.sol.com.au/kor/gan.htm">
            Ganesha Fractal - Melinda Green
          </a>
        </li>
        <li class="list-group-item">
          <a
            href="https://fr.wikipedia.org/wiki/Ensemble_de_Mandelbrot#Universalit%C3%A9"
          >
            Ensemble de Mandelbrot [FR]
          </a>
        </li>
        <li class="list-group-item">
          <a href="https://superliminal.com/fractals/bbrot/">
            The Buddhabrot Technique - Melinda Green
          </a>
        </li>
        <li class="list-group-item">
          <a href="https://images.math.cnrs.fr/Mandelbulb.html">
            Mandelbulb (math CNRS) (FR)
          </a>
        </li>
        <li class="list-group-item">
          <a
            href="https://softologyblog.wordpress.com/2011/05/04/kalisets-and-hybrid-ducks/"
          >
            Fractals - Softology's Blog
          </a>
        </li>
  
        <li class="list-group-item">
          <a href="https://oolong.co.uk/play/">
            Zoobie, Yinyo, Rosaly, Shimmia... - Oolong's playground
          </a>
        </li>
        <li class="list-group-item">
          <a
            href="https://github.com/aschinchon/the-chaos-game/tree/master"
          >
            The Chaos Game: an R experiment
          </a>
        </li>
        <li class="list-group-item">
          <a
            href="https://fronkonstin.com/2019/10/28/the-chaos-game-an-experiment-about-fractals-recursivity-and-creative-coding/"
          >
            Chaos game - Fronkonstin
          </a>
        </li>
        <li class="list-group-item">
          <a href="https://andrewtop.com/projects/ifs_3d/">
            3D IFS - Andrew Top
          </a>
        </li>
      </ul>
      <ul class="list-group m-4">
        <li class="list-group-item">
          <a href="http://www.ritsumei.ac.jp/~akitaoka/index-e.html">
            Akiyoshi's illusion pages
          </a>
          <span class="btn btn-outline-secondary btn-list-sub-item">
            <a href="http://www.psy.ritsumei.ac.jp/~akitaoka/color2e.html">
              Color Illusion (Akiyoshi Kitaoka)
            </a>
          </span>
        </li>
      </ul>
      <ul class="list-group m-4">
        <li class="list-group-item">
          <a href="http://mathcurve.com/">
            Mathcurve (FR)
          </a>
        </li>
        <li class="list-group-item">
          <a href="https://www.youtube.com/watch?v=-X49VQgi86E">
            La face cachée des tables de multiplications de Micmaths - Mickaël
            Launay (FR)
          </a>
        </li>
        <li class="list-group-item">
          <a href="http://mathworld.wolfram.com">
            mathworld.wolfram.com
          </a>
          <span class="btn btn-outline-secondary btn-list-sub-item">
            <a href="http://mathworld.wolfram.com/topics/PedalCurves.html">
              Pedal curves
            </a>
          </span>
          <span class="btn btn-outline-secondary btn-list-sub-item">
            <a href="http://mathworld.wolfram.com/Pentaflake.html">
              Pentaflake (penta-flocon)
            </a>
          </span>
        </li>
        <li class="list-group-item">
          <a
            href="https://www.algosome.com/articles/strange-attractors-de-jong.html"
          >
            Strange Attractors: The De Jong Attractors
          </a>
        </li>
        <li class="list-group-item">
          <a
            href="https://fronkonstin.com/2017/11/07/drawing-10-million-points-with-ggplot-clifford-attractors/"
          >
            Clifford Attractor - fronkonstin.com
          </a>
        </li>
  
        <li class="list-group-item">
          <a href="https://www.vorillaz.com/dadras-attractor/">
            Attractorz - Vorillaz
          </a>
        </li>
        <li class="list-group-item">
          <a href="https://en.wikipedia.org/wiki/Gingerbreadman_map">
            Gingerbreadman map
          </a>
        </li>
      </ul>
    </section>
  
    <header class="col-12">
      <h1 class="m-4">
        Codes
      </h1>
    </header>
  
    <section class="col-12">
      <ul class="list-group m-4">
        <li class="list-group-item">
          <a href="https://emberjs.com/">
            Framework : Ember JS
          </a>
        </li>
        <li class="list-group-item">
          <a href="https://ember-engines.com/">
            Ember engines
          </a>
        </li>
        <li class="list-group-item">
          <a href="https://threejs.org">three js</a>
        </li>
        <li class="list-group-item">
          <a href="https://github.com/piratefsh/image-processing">
            Image processing (filters)
          </a>
        </li>
        <li class="list-group-item">
          <a href="https://github.com/infusion/Complex.js/blob/master/complex.js">
            Complex
          </a>
        </li>
        <li class="list-group-item">
          <a href="http://www.math.sci.hiroshima-u.ac.jp/m-mat/MT/emt.html">
            Mersenne Twister
          </a>
        </li>
      </ul>
    </section>
  
    <section class="col-12">
      <ul class="list-group m-4">
        <li class="list-group-item">
          <a
            class="btn btn-outline-secondary btn-list-sub-item"
            href="https://www.deviantart.com/notifications/notes/#to=universlogique"
          >
            Contact
          </a>
        </li>
      </ul>
    </section>
  </article>
  */
  {
    "id": "Mc54eAHq",
    "block": "[[[10,\"article\"],[14,0,\"container-xxl mt-4 mb-4\"],[12],[1,\"\\n  \"],[10,\"header\"],[14,0,\"col-12\"],[12],[1,\"\\n    \"],[10,\"h1\"],[14,0,\"m-4\"],[12],[1,\"\\n      Sources\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,\"section\"],[14,0,\"col-12\"],[12],[1,\"\\n    \"],[10,\"ul\"],[14,0,\"list-group m-4\"],[12],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"http://paulbourke.net/fractals/\"],[12],[1,\"\\n          Fractals, Chaos, Self-Similarity - Paul Bourke\\n        \"],[13],[1,\"\\n        \"],[10,1],[14,0,\"btn btn-outline-secondary btn-list-sub-item\"],[12],[1,\"\\n          \"],[10,3],[14,6,\"http://paulbourke.net/fractals/z4gasket/\"],[12],[1,\"\\n            z4 Julia Gasket\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,1],[14,0,\"btn btn-outline-secondary btn-list-sub-item\"],[12],[1,\"\\n          \"],[10,3],[14,6,\"http://paulbourke.net/fractals/woggle/\"],[12],[1,\"\\n            Woggle\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,1],[14,0,\"btn btn-outline-secondary btn-list-sub-item\"],[12],[1,\"\\n          \"],[10,3],[14,6,\"https://paulbourke.net/fractals/starjulia/\"],[12],[1,\"\\n            Star Julia (Roger Bagula)\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,1],[14,0,\"btn btn-outline-secondary btn-list-sub-item\"],[12],[1,\"\\n          \"],[10,3],[14,6,\"https://paulbourke.net/fractals/multijulia/\"],[12],[1,\"\\n            Multi Julia\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,1],[14,0,\"btn btn-outline-secondary btn-list-sub-item\"],[12],[1,\"\\n          \"],[10,3],[14,6,\"http://paulbourke.net/fractals/ifs/\"],[12],[1,\"\\n            IFS\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://note.com/108hassium/n/n96ebc5def594?_x_tr_sl=auto&_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_hl=fr\"],[12],[1,\"\\n          Fractals - 108hassium\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://richmit.github.io/mraster/index.html\"],[12],[1,\"\\n          MRaster - Mitch Richling\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"http://www.sol.com.au/kor/gan.htm\"],[12],[1,\"\\n          Ganesha Fractal - Melinda Green\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://fr.wikipedia.org/wiki/Ensemble_de_Mandelbrot#Universalit%C3%A9\"],[12],[1,\"\\n          Ensemble de Mandelbrot [FR]\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://superliminal.com/fractals/bbrot/\"],[12],[1,\"\\n          The Buddhabrot Technique - Melinda Green\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://images.math.cnrs.fr/Mandelbulb.html\"],[12],[1,\"\\n          Mandelbulb (math CNRS) (FR)\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://softologyblog.wordpress.com/2011/05/04/kalisets-and-hybrid-ducks/\"],[12],[1,\"\\n          Fractals - Softology's Blog\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://oolong.co.uk/play/\"],[12],[1,\"\\n          Zoobie, Yinyo, Rosaly, Shimmia... - Oolong's playground\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://github.com/aschinchon/the-chaos-game/tree/master\"],[12],[1,\"\\n          The Chaos Game: an R experiment\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://fronkonstin.com/2019/10/28/the-chaos-game-an-experiment-about-fractals-recursivity-and-creative-coding/\"],[12],[1,\"\\n          Chaos game - Fronkonstin\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://andrewtop.com/projects/ifs_3d/\"],[12],[1,\"\\n          3D IFS - Andrew Top\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"ul\"],[14,0,\"list-group m-4\"],[12],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"http://www.ritsumei.ac.jp/~akitaoka/index-e.html\"],[12],[1,\"\\n          Akiyoshi's illusion pages\\n        \"],[13],[1,\"\\n        \"],[10,1],[14,0,\"btn btn-outline-secondary btn-list-sub-item\"],[12],[1,\"\\n          \"],[10,3],[14,6,\"http://www.psy.ritsumei.ac.jp/~akitaoka/color2e.html\"],[12],[1,\"\\n            Color Illusion (Akiyoshi Kitaoka)\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"ul\"],[14,0,\"list-group m-4\"],[12],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"http://mathcurve.com/\"],[12],[1,\"\\n          Mathcurve (FR)\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://www.youtube.com/watch?v=-X49VQgi86E\"],[12],[1,\"\\n          La face cachée des tables de multiplications de Micmaths - Mickaël\\n          Launay (FR)\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"http://mathworld.wolfram.com\"],[12],[1,\"\\n          mathworld.wolfram.com\\n        \"],[13],[1,\"\\n        \"],[10,1],[14,0,\"btn btn-outline-secondary btn-list-sub-item\"],[12],[1,\"\\n          \"],[10,3],[14,6,\"http://mathworld.wolfram.com/topics/PedalCurves.html\"],[12],[1,\"\\n            Pedal curves\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,1],[14,0,\"btn btn-outline-secondary btn-list-sub-item\"],[12],[1,\"\\n          \"],[10,3],[14,6,\"http://mathworld.wolfram.com/Pentaflake.html\"],[12],[1,\"\\n            Pentaflake (penta-flocon)\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://www.algosome.com/articles/strange-attractors-de-jong.html\"],[12],[1,\"\\n          Strange Attractors: The De Jong Attractors\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://fronkonstin.com/2017/11/07/drawing-10-million-points-with-ggplot-clifford-attractors/\"],[12],[1,\"\\n          Clifford Attractor - fronkonstin.com\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://www.vorillaz.com/dadras-attractor/\"],[12],[1,\"\\n          Attractorz - Vorillaz\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://en.wikipedia.org/wiki/Gingerbreadman_map\"],[12],[1,\"\\n          Gingerbreadman map\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"header\"],[14,0,\"col-12\"],[12],[1,\"\\n    \"],[10,\"h1\"],[14,0,\"m-4\"],[12],[1,\"\\n      Codes\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"section\"],[14,0,\"col-12\"],[12],[1,\"\\n    \"],[10,\"ul\"],[14,0,\"list-group m-4\"],[12],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://emberjs.com/\"],[12],[1,\"\\n          Framework : Ember JS\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://ember-engines.com/\"],[12],[1,\"\\n          Ember engines\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://threejs.org\"],[12],[1,\"three js\"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://github.com/piratefsh/image-processing\"],[12],[1,\"\\n          Image processing (filters)\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"https://github.com/infusion/Complex.js/blob/master/complex.js\"],[12],[1,\"\\n          Complex\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,6,\"http://www.math.sci.hiroshima-u.ac.jp/m-mat/MT/emt.html\"],[12],[1,\"\\n          Mersenne Twister\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"section\"],[14,0,\"col-12\"],[12],[1,\"\\n    \"],[10,\"ul\"],[14,0,\"list-group m-4\"],[12],[1,\"\\n      \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n        \"],[10,3],[14,0,\"btn btn-outline-secondary btn-list-sub-item\"],[14,6,\"https://www.deviantart.com/notifications/notes/#to=universlogique\"],[12],[1,\"\\n          Contact\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"article\",\"header\",\"h1\",\"section\",\"ul\",\"li\",\"a\",\"span\"]]",
    "moduleName": "host-app/templates/sources.hbs",
    "isStrictMode": false
  });
});
;define("host-app/transforms/boolean", ["exports", "@ember/debug", "@ember-data/serializer/-private"], function (_exports, _debug, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.BooleanTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/-private"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the BooleanTransform. Use `export { BooleanTransform as default } from '@ember-data/serializer/transform';` in app/transforms/boolean.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '5.2'
    }
  }));
});
;define("host-app/transforms/date", ["exports", "@ember/debug", "@ember-data/serializer/-private"], function (_exports, _debug, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.DateTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/-private"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the DateTransform. Use `export { DateTransform as default } from '@ember-data/serializer/transform';` in app/transforms/date.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '5.2'
    }
  }));
});
;define("host-app/transforms/number", ["exports", "@ember/debug", "@ember-data/serializer/-private"], function (_exports, _debug, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.NumberTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/-private"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the NumberTransform. Use `export { NumberTransform as default } from '@ember-data/serializer/transform';` in app/transforms/number.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '5.2'
    }
  }));
});
;define("host-app/transforms/string", ["exports", "@ember/debug", "@ember-data/serializer/-private"], function (_exports, _debug, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.StringTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/-private"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the StringTransform. Use `export { StringTransform as default } from '@ember-data/serializer/transform';` in app/transforms/string.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '5.2'
    }
  }));
});
;

;define('host-app/config/environment', [], function() {
  var prefix = 'host-app';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("host-app/app")["default"].create({"SITE_TITLE":"Mind sweep","VARS":{"SITE_TITLE":"Mind sweep","DEVIANT_ART_URL":"https://backend.deviantart.com/rss.xml?q=gallery:universlogique","API_POSTS_URL":"https://en-revant.fr/mastodon.json"},"name":"host-app","version":"0.0.0+ff96747c"});
          }
        
//# sourceMappingURL=host-app.map
