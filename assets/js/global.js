"format global";

!function(e){function r(e,r,t){e in i||(i[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return c[e]||(c[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,s=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var s=0;s<i.dependencies.length;++s)i.dependencies[s]===o&&i.setters[s](a)}return o.locked=!1,r},r.name);o.setters=s.setters,o.execute=s.execute;for(var l=0,d=r.normalizedDeps.length;d>l;l++){var f,p=r.normalizedDeps[l],v=i[p],m=c[p];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=u(p),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[l]&&o.setters[l](f)}}}function o(e){var r={};if("object"==typeof e||"function"==typeof e)if(l){var t;for(var n in e)(t=Object.getOwnPropertyDescriptor(e,n))&&f(r,n,t)}else{var o=e&&e.hasOwnProperty;for(var n in e)(!o||e.hasOwnProperty(n))&&(r[n]=e[n])}return r["default"]=e,f(r,"__useDefault",{value:!0}),r}function a(r,t){var n=i[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,l=n.normalizedDeps.length;l>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(i[d]?a(d,t):u(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function u(e){if(v[e])return v[e];if("@node/"==e.substr(0,6))return p(e.substr(6));var r=i[e];if(!r)throw"Module "+e+" not present.";return n(i[e]),a(e,[]),i[e]=void 0,r.declarative&&f(r.module.exports,"__esModule",{value:!0}),v[e]=r.declarative?r.module.exports:r.esModule}var i={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},l=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(d){l=!1}var f;!function(){try{Object.defineProperty({},"a",{})&&(f=Object.defineProperty)}catch(e){f=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var c={},p="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,v={"@empty":{}};return function(e,t,n){return function(a){a(function(a){for(var i=0;i<t.length;i++)(function(e,r){r&&r.__esModule?v[e]=r:v[e]=o(r)})(t[i],arguments[i]);n({register:r});var s=u(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)u(e[i]);return s.__useDefault?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["1"], [], function($__System) {

$__System.register('2', [], function (_export) {
  /**
   * Web intents for sharing
   * Adapted from twitter's code
   *
   * @see {@link https://dev.twitter.com/web/intents#follow-intent}
   * @module shareIntent
   */

  /**
   * @constant
   * @type {String}
   */
  'use strict';

  var windowOptions, configs;

  _export('bindSharePopup', bindSharePopup);

  /**
   * shareIntent opens a popup window to share a ShareIntent
   *
   * @param {IntentProvider} config
   */

  function bindSharePopup(config) {
    var winHeight = screen.height;
    var winWidth = screen.width;

    /**
     * handleIntent
     *
     * @param {Event} e
     */
    var handleIntent = function handleIntent(e) {
      e = e || window.event;
      var target = e.target || e.srcElement;
      var m;
      var left;
      var top;

      while (target && target.nodeName.toLowerCase() !== 'a') {
        target = target.parentNode;
      }

      if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
        m = target.href.match(config.intentRegex);
        if (m) {
          left = Math.round(winWidth / 2 - config.width / 2);
          top = 0;

          if (winHeight > config.height) {
            top = Math.round(winHeight / 2 - config.height / 2);
          }

          var options = windowOptions + ',width=' + config.width + ',height=' + config.height + ',left=' + left + ',top=' + top;
          window.open(target.href, 'intent', options);
          e.returnValue = false;
          e.preventDefault && e.preventDefault();
        }
      }
    };

    if (document.addEventListener) {
      document.addEventListener('click', handleIntent, false);
    } else if (document.attachEvent) {
      document.attachEvent('onclick', handleIntent);
    }
  }

  return {
    setters: [],
    execute: function () {
      windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes';

      /**
       * @typedef {Object} IntentProvider
       * @property {RegExp} intentRegex matches an HREF
       * @property {Number} width of pop-up window
       * @property {Number} height of pop-up window
       */

      /**
       * Settings for each share pop-up provider
       * @constant
       * @type {Object.<String, IntentProvider>}
       */
      configs = {
        facebook: {
          intentRegex: /facebook\.com\/dialog\/share\?(\w+)/,
          width: 600,
          height: 500
        },
        google: {
          intentRegex: /plus\.google\.com\/share\?(\w+)/,
          width: 500,
          height: 525
        },
        twitter: {
          intentRegex: /twitter\.com\/intent\/(\w+)/,
          width: 550,
          height: 420
        }
      };

      _export('configs', configs);
    }
  };
});
$__System.register('1', ['2'], function (_export) {
  /**
   * @author David O'Trakoun <me@davidosomething.com>
   * @module global
   * @requires module:shareIntent
   */

  'use strict';

  var configs, bindSharePopup;
  return {
    setters: [function (_) {
      configs = _.configs;
      bindSharePopup = _.bindSharePopup;
    }],
    execute: function () {

      bindSharePopup(configs.facebook);
      bindSharePopup(configs.google);
      bindSharePopup(configs.twitter);
    }
  };
});
})
(function(factory) {
  factory();
});
//# sourceMappingURL=global.js.map