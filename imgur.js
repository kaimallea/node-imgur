/*! For license information please see imgur.js.LICENSE.txt */
!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define('imgur', [], t)
    : 'object' == typeof exports
    ? (exports.imgur = t())
    : (e.imgur = t());
})(self, function () {
  return (() => {
    var e = {
        9669: (e, t, r) => {
          e.exports = r(1609);
        },
        5448: (e, t, r) => {
          'use strict';
          var n = r(4867),
            o = r(6026),
            s = r(4372),
            i = r(5327),
            a = r(4097),
            u = r(4109),
            c = r(7985),
            l = r(5061);
          e.exports = function (e) {
            return new Promise(function (t, r) {
              var f = e.data,
                h = e.headers;
              n.isFormData(f) && delete h['Content-Type'];
              var p = new XMLHttpRequest();
              if (e.auth) {
                var d = e.auth.username || '',
                  m = e.auth.password
                    ? unescape(encodeURIComponent(e.auth.password))
                    : '';
                h.Authorization = 'Basic ' + btoa(d + ':' + m);
              }
              var v = a(e.baseURL, e.url);
              if (
                (p.open(
                  e.method.toUpperCase(),
                  i(v, e.params, e.paramsSerializer),
                  !0
                ),
                (p.timeout = e.timeout),
                (p.onreadystatechange = function () {
                  if (
                    p &&
                    4 === p.readyState &&
                    (0 !== p.status ||
                      (p.responseURL && 0 === p.responseURL.indexOf('file:')))
                  ) {
                    var n =
                        'getAllResponseHeaders' in p
                          ? u(p.getAllResponseHeaders())
                          : null,
                      s = {
                        data:
                          e.responseType && 'text' !== e.responseType
                            ? p.response
                            : p.responseText,
                        status: p.status,
                        statusText: p.statusText,
                        headers: n,
                        config: e,
                        request: p,
                      };
                    o(t, r, s), (p = null);
                  }
                }),
                (p.onabort = function () {
                  p &&
                    (r(l('Request aborted', e, 'ECONNABORTED', p)), (p = null));
                }),
                (p.onerror = function () {
                  r(l('Network Error', e, null, p)), (p = null);
                }),
                (p.ontimeout = function () {
                  var t = 'timeout of ' + e.timeout + 'ms exceeded';
                  e.timeoutErrorMessage && (t = e.timeoutErrorMessage),
                    r(l(t, e, 'ECONNABORTED', p)),
                    (p = null);
                }),
                n.isStandardBrowserEnv())
              ) {
                var y =
                  (e.withCredentials || c(v)) && e.xsrfCookieName
                    ? s.read(e.xsrfCookieName)
                    : void 0;
                y && (h[e.xsrfHeaderName] = y);
              }
              if (
                ('setRequestHeader' in p &&
                  n.forEach(h, function (e, t) {
                    void 0 === f && 'content-type' === t.toLowerCase()
                      ? delete h[t]
                      : p.setRequestHeader(t, e);
                  }),
                n.isUndefined(e.withCredentials) ||
                  (p.withCredentials = !!e.withCredentials),
                e.responseType)
              )
                try {
                  p.responseType = e.responseType;
                } catch (t) {
                  if ('json' !== e.responseType) throw t;
                }
              'function' == typeof e.onDownloadProgress &&
                p.addEventListener('progress', e.onDownloadProgress),
                'function' == typeof e.onUploadProgress &&
                  p.upload &&
                  p.upload.addEventListener('progress', e.onUploadProgress),
                e.cancelToken &&
                  e.cancelToken.promise.then(function (e) {
                    p && (p.abort(), r(e), (p = null));
                  }),
                f || (f = null),
                p.send(f);
            });
          };
        },
        1609: (e, t, r) => {
          'use strict';
          var n = r(4867),
            o = r(1849),
            s = r(321),
            i = r(7185);
          function a(e) {
            var t = new s(e),
              r = o(s.prototype.request, t);
            return n.extend(r, s.prototype, t), n.extend(r, t), r;
          }
          var u = a(r(5655));
          (u.Axios = s),
            (u.create = function (e) {
              return a(i(u.defaults, e));
            }),
            (u.Cancel = r(5263)),
            (u.CancelToken = r(4972)),
            (u.isCancel = r(6502)),
            (u.all = function (e) {
              return Promise.all(e);
            }),
            (u.spread = r(8713)),
            (u.isAxiosError = r(6268)),
            (e.exports = u),
            (e.exports.default = u);
        },
        5263: (e) => {
          'use strict';
          function t(e) {
            this.message = e;
          }
          (t.prototype.toString = function () {
            return 'Cancel' + (this.message ? ': ' + this.message : '');
          }),
            (t.prototype.__CANCEL__ = !0),
            (e.exports = t);
        },
        4972: (e, t, r) => {
          'use strict';
          var n = r(5263);
          function o(e) {
            if ('function' != typeof e)
              throw new TypeError('executor must be a function.');
            var t;
            this.promise = new Promise(function (e) {
              t = e;
            });
            var r = this;
            e(function (e) {
              r.reason || ((r.reason = new n(e)), t(r.reason));
            });
          }
          (o.prototype.throwIfRequested = function () {
            if (this.reason) throw this.reason;
          }),
            (o.source = function () {
              var e;
              return {
                token: new o(function (t) {
                  e = t;
                }),
                cancel: e,
              };
            }),
            (e.exports = o);
        },
        6502: (e) => {
          'use strict';
          e.exports = function (e) {
            return !(!e || !e.__CANCEL__);
          };
        },
        321: (e, t, r) => {
          'use strict';
          var n = r(4867),
            o = r(5327),
            s = r(782),
            i = r(3572),
            a = r(7185);
          function u(e) {
            (this.defaults = e),
              (this.interceptors = { request: new s(), response: new s() });
          }
          (u.prototype.request = function (e) {
            'string' == typeof e
              ? ((e = arguments[1] || {}).url = arguments[0])
              : (e = e || {}),
              (e = a(this.defaults, e)).method
                ? (e.method = e.method.toLowerCase())
                : this.defaults.method
                ? (e.method = this.defaults.method.toLowerCase())
                : (e.method = 'get');
            var t = [i, void 0],
              r = Promise.resolve(e);
            for (
              this.interceptors.request.forEach(function (e) {
                t.unshift(e.fulfilled, e.rejected);
              }),
                this.interceptors.response.forEach(function (e) {
                  t.push(e.fulfilled, e.rejected);
                });
              t.length;

            )
              r = r.then(t.shift(), t.shift());
            return r;
          }),
            (u.prototype.getUri = function (e) {
              return (
                (e = a(this.defaults, e)),
                o(e.url, e.params, e.paramsSerializer).replace(/^\?/, '')
              );
            }),
            n.forEach(['delete', 'get', 'head', 'options'], function (e) {
              u.prototype[e] = function (t, r) {
                return this.request(
                  a(r || {}, { method: e, url: t, data: (r || {}).data })
                );
              };
            }),
            n.forEach(['post', 'put', 'patch'], function (e) {
              u.prototype[e] = function (t, r, n) {
                return this.request(a(n || {}, { method: e, url: t, data: r }));
              };
            }),
            (e.exports = u);
        },
        782: (e, t, r) => {
          'use strict';
          var n = r(4867);
          function o() {
            this.handlers = [];
          }
          (o.prototype.use = function (e, t) {
            return (
              this.handlers.push({ fulfilled: e, rejected: t }),
              this.handlers.length - 1
            );
          }),
            (o.prototype.eject = function (e) {
              this.handlers[e] && (this.handlers[e] = null);
            }),
            (o.prototype.forEach = function (e) {
              n.forEach(this.handlers, function (t) {
                null !== t && e(t);
              });
            }),
            (e.exports = o);
        },
        4097: (e, t, r) => {
          'use strict';
          var n = r(1793),
            o = r(7303);
          e.exports = function (e, t) {
            return e && !n(t) ? o(e, t) : t;
          };
        },
        5061: (e, t, r) => {
          'use strict';
          var n = r(481);
          e.exports = function (e, t, r, o, s) {
            var i = new Error(e);
            return n(i, t, r, o, s);
          };
        },
        3572: (e, t, r) => {
          'use strict';
          var n = r(4867),
            o = r(8527),
            s = r(6502),
            i = r(5655);
          function a(e) {
            e.cancelToken && e.cancelToken.throwIfRequested();
          }
          e.exports = function (e) {
            return (
              a(e),
              (e.headers = e.headers || {}),
              (e.data = o(e.data, e.headers, e.transformRequest)),
              (e.headers = n.merge(
                e.headers.common || {},
                e.headers[e.method] || {},
                e.headers
              )),
              n.forEach(
                ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
                function (t) {
                  delete e.headers[t];
                }
              ),
              (e.adapter || i.adapter)(e).then(
                function (t) {
                  return (
                    a(e),
                    (t.data = o(t.data, t.headers, e.transformResponse)),
                    t
                  );
                },
                function (t) {
                  return (
                    s(t) ||
                      (a(e),
                      t &&
                        t.response &&
                        (t.response.data = o(
                          t.response.data,
                          t.response.headers,
                          e.transformResponse
                        ))),
                    Promise.reject(t)
                  );
                }
              )
            );
          };
        },
        481: (e) => {
          'use strict';
          e.exports = function (e, t, r, n, o) {
            return (
              (e.config = t),
              r && (e.code = r),
              (e.request = n),
              (e.response = o),
              (e.isAxiosError = !0),
              (e.toJSON = function () {
                return {
                  message: this.message,
                  name: this.name,
                  description: this.description,
                  number: this.number,
                  fileName: this.fileName,
                  lineNumber: this.lineNumber,
                  columnNumber: this.columnNumber,
                  stack: this.stack,
                  config: this.config,
                  code: this.code,
                };
              }),
              e
            );
          };
        },
        7185: (e, t, r) => {
          'use strict';
          var n = r(4867);
          e.exports = function (e, t) {
            t = t || {};
            var r = {},
              o = ['url', 'method', 'data'],
              s = ['headers', 'auth', 'proxy', 'params'],
              i = [
                'baseURL',
                'transformRequest',
                'transformResponse',
                'paramsSerializer',
                'timeout',
                'timeoutMessage',
                'withCredentials',
                'adapter',
                'responseType',
                'xsrfCookieName',
                'xsrfHeaderName',
                'onUploadProgress',
                'onDownloadProgress',
                'decompress',
                'maxContentLength',
                'maxBodyLength',
                'maxRedirects',
                'transport',
                'httpAgent',
                'httpsAgent',
                'cancelToken',
                'socketPath',
                'responseEncoding',
              ],
              a = ['validateStatus'];
            function u(e, t) {
              return n.isPlainObject(e) && n.isPlainObject(t)
                ? n.merge(e, t)
                : n.isPlainObject(t)
                ? n.merge({}, t)
                : n.isArray(t)
                ? t.slice()
                : t;
            }
            function c(o) {
              n.isUndefined(t[o])
                ? n.isUndefined(e[o]) || (r[o] = u(void 0, e[o]))
                : (r[o] = u(e[o], t[o]));
            }
            n.forEach(o, function (e) {
              n.isUndefined(t[e]) || (r[e] = u(void 0, t[e]));
            }),
              n.forEach(s, c),
              n.forEach(i, function (o) {
                n.isUndefined(t[o])
                  ? n.isUndefined(e[o]) || (r[o] = u(void 0, e[o]))
                  : (r[o] = u(void 0, t[o]));
              }),
              n.forEach(a, function (n) {
                n in t
                  ? (r[n] = u(e[n], t[n]))
                  : n in e && (r[n] = u(void 0, e[n]));
              });
            var l = o.concat(s).concat(i).concat(a),
              f = Object.keys(e)
                .concat(Object.keys(t))
                .filter(function (e) {
                  return -1 === l.indexOf(e);
                });
            return n.forEach(f, c), r;
          };
        },
        6026: (e, t, r) => {
          'use strict';
          var n = r(5061);
          e.exports = function (e, t, r) {
            var o = r.config.validateStatus;
            r.status && o && !o(r.status)
              ? t(
                  n(
                    'Request failed with status code ' + r.status,
                    r.config,
                    null,
                    r.request,
                    r
                  )
                )
              : e(r);
          };
        },
        8527: (e, t, r) => {
          'use strict';
          var n = r(4867);
          e.exports = function (e, t, r) {
            return (
              n.forEach(r, function (r) {
                e = r(e, t);
              }),
              e
            );
          };
        },
        5655: (e, t, r) => {
          'use strict';
          var n = r(4867),
            o = r(6016),
            s = { 'Content-Type': 'application/x-www-form-urlencoded' };
          function i(e, t) {
            !n.isUndefined(e) &&
              n.isUndefined(e['Content-Type']) &&
              (e['Content-Type'] = t);
          }
          var a,
            u = {
              adapter:
                (('undefined' != typeof XMLHttpRequest ||
                  ('undefined' != typeof process &&
                    '[object process]' ===
                      Object.prototype.toString.call(process))) &&
                  (a = r(5448)),
                a),
              transformRequest: [
                function (e, t) {
                  return (
                    o(t, 'Accept'),
                    o(t, 'Content-Type'),
                    n.isFormData(e) ||
                    n.isArrayBuffer(e) ||
                    n.isBuffer(e) ||
                    n.isStream(e) ||
                    n.isFile(e) ||
                    n.isBlob(e)
                      ? e
                      : n.isArrayBufferView(e)
                      ? e.buffer
                      : n.isURLSearchParams(e)
                      ? (i(
                          t,
                          'application/x-www-form-urlencoded;charset=utf-8'
                        ),
                        e.toString())
                      : n.isObject(e)
                      ? (i(t, 'application/json;charset=utf-8'),
                        JSON.stringify(e))
                      : e
                  );
                },
              ],
              transformResponse: [
                function (e) {
                  if ('string' == typeof e)
                    try {
                      e = JSON.parse(e);
                    } catch (e) {}
                  return e;
                },
              ],
              timeout: 0,
              xsrfCookieName: 'XSRF-TOKEN',
              xsrfHeaderName: 'X-XSRF-TOKEN',
              maxContentLength: -1,
              maxBodyLength: -1,
              validateStatus: function (e) {
                return e >= 200 && e < 300;
              },
              headers: {
                common: { Accept: 'application/json, text/plain, */*' },
              },
            };
          n.forEach(['delete', 'get', 'head'], function (e) {
            u.headers[e] = {};
          }),
            n.forEach(['post', 'put', 'patch'], function (e) {
              u.headers[e] = n.merge(s);
            }),
            (e.exports = u);
        },
        1849: (e) => {
          'use strict';
          e.exports = function (e, t) {
            return function () {
              for (
                var r = new Array(arguments.length), n = 0;
                n < r.length;
                n++
              )
                r[n] = arguments[n];
              return e.apply(t, r);
            };
          };
        },
        5327: (e, t, r) => {
          'use strict';
          var n = r(4867);
          function o(e) {
            return encodeURIComponent(e)
              .replace(/%3A/gi, ':')
              .replace(/%24/g, '$')
              .replace(/%2C/gi, ',')
              .replace(/%20/g, '+')
              .replace(/%5B/gi, '[')
              .replace(/%5D/gi, ']');
          }
          e.exports = function (e, t, r) {
            if (!t) return e;
            var s;
            if (r) s = r(t);
            else if (n.isURLSearchParams(t)) s = t.toString();
            else {
              var i = [];
              n.forEach(t, function (e, t) {
                null != e &&
                  (n.isArray(e) ? (t += '[]') : (e = [e]),
                  n.forEach(e, function (e) {
                    n.isDate(e)
                      ? (e = e.toISOString())
                      : n.isObject(e) && (e = JSON.stringify(e)),
                      i.push(o(t) + '=' + o(e));
                  }));
              }),
                (s = i.join('&'));
            }
            if (s) {
              var a = e.indexOf('#');
              -1 !== a && (e = e.slice(0, a)),
                (e += (-1 === e.indexOf('?') ? '?' : '&') + s);
            }
            return e;
          };
        },
        7303: (e) => {
          'use strict';
          e.exports = function (e, t) {
            return t ? e.replace(/\/+$/, '') + '/' + t.replace(/^\/+/, '') : e;
          };
        },
        4372: (e, t, r) => {
          'use strict';
          var n = r(4867);
          e.exports = n.isStandardBrowserEnv()
            ? {
                write: function (e, t, r, o, s, i) {
                  var a = [];
                  a.push(e + '=' + encodeURIComponent(t)),
                    n.isNumber(r) &&
                      a.push('expires=' + new Date(r).toGMTString()),
                    n.isString(o) && a.push('path=' + o),
                    n.isString(s) && a.push('domain=' + s),
                    !0 === i && a.push('secure'),
                    (document.cookie = a.join('; '));
                },
                read: function (e) {
                  var t = document.cookie.match(
                    new RegExp('(^|;\\s*)(' + e + ')=([^;]*)')
                  );
                  return t ? decodeURIComponent(t[3]) : null;
                },
                remove: function (e) {
                  this.write(e, '', Date.now() - 864e5);
                },
              }
            : {
                write: function () {},
                read: function () {
                  return null;
                },
                remove: function () {},
              };
        },
        1793: (e) => {
          'use strict';
          e.exports = function (e) {
            return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
          };
        },
        6268: (e) => {
          'use strict';
          e.exports = function (e) {
            return 'object' == typeof e && !0 === e.isAxiosError;
          };
        },
        7985: (e, t, r) => {
          'use strict';
          var n = r(4867);
          e.exports = n.isStandardBrowserEnv()
            ? (function () {
                var e,
                  t = /(msie|trident)/i.test(navigator.userAgent),
                  r = document.createElement('a');
                function o(e) {
                  var n = e;
                  return (
                    t && (r.setAttribute('href', n), (n = r.href)),
                    r.setAttribute('href', n),
                    {
                      href: r.href,
                      protocol: r.protocol ? r.protocol.replace(/:$/, '') : '',
                      host: r.host,
                      search: r.search ? r.search.replace(/^\?/, '') : '',
                      hash: r.hash ? r.hash.replace(/^#/, '') : '',
                      hostname: r.hostname,
                      port: r.port,
                      pathname:
                        '/' === r.pathname.charAt(0)
                          ? r.pathname
                          : '/' + r.pathname,
                    }
                  );
                }
                return (
                  (e = o(window.location.href)),
                  function (t) {
                    var r = n.isString(t) ? o(t) : t;
                    return r.protocol === e.protocol && r.host === e.host;
                  }
                );
              })()
            : function () {
                return !0;
              };
        },
        6016: (e, t, r) => {
          'use strict';
          var n = r(4867);
          e.exports = function (e, t) {
            n.forEach(e, function (r, n) {
              n !== t &&
                n.toUpperCase() === t.toUpperCase() &&
                ((e[t] = r), delete e[n]);
            });
          };
        },
        4109: (e, t, r) => {
          'use strict';
          var n = r(4867),
            o = [
              'age',
              'authorization',
              'content-length',
              'content-type',
              'etag',
              'expires',
              'from',
              'host',
              'if-modified-since',
              'if-unmodified-since',
              'last-modified',
              'location',
              'max-forwards',
              'proxy-authorization',
              'referer',
              'retry-after',
              'user-agent',
            ];
          e.exports = function (e) {
            var t,
              r,
              s,
              i = {};
            return e
              ? (n.forEach(e.split('\n'), function (e) {
                  if (
                    ((s = e.indexOf(':')),
                    (t = n.trim(e.substr(0, s)).toLowerCase()),
                    (r = n.trim(e.substr(s + 1))),
                    t)
                  ) {
                    if (i[t] && o.indexOf(t) >= 0) return;
                    i[t] =
                      'set-cookie' === t
                        ? (i[t] ? i[t] : []).concat([r])
                        : i[t]
                        ? i[t] + ', ' + r
                        : r;
                  }
                }),
                i)
              : i;
          };
        },
        8713: (e) => {
          'use strict';
          e.exports = function (e) {
            return function (t) {
              return e.apply(null, t);
            };
          };
        },
        4867: (e, t, r) => {
          'use strict';
          var n = r(1849),
            o = Object.prototype.toString;
          function s(e) {
            return '[object Array]' === o.call(e);
          }
          function i(e) {
            return void 0 === e;
          }
          function a(e) {
            return null !== e && 'object' == typeof e;
          }
          function u(e) {
            if ('[object Object]' !== o.call(e)) return !1;
            var t = Object.getPrototypeOf(e);
            return null === t || t === Object.prototype;
          }
          function c(e) {
            return '[object Function]' === o.call(e);
          }
          function l(e, t) {
            if (null != e)
              if (('object' != typeof e && (e = [e]), s(e)))
                for (var r = 0, n = e.length; r < n; r++)
                  t.call(null, e[r], r, e);
              else
                for (var o in e)
                  Object.prototype.hasOwnProperty.call(e, o) &&
                    t.call(null, e[o], o, e);
          }
          e.exports = {
            isArray: s,
            isArrayBuffer: function (e) {
              return '[object ArrayBuffer]' === o.call(e);
            },
            isBuffer: function (e) {
              return (
                null !== e &&
                !i(e) &&
                null !== e.constructor &&
                !i(e.constructor) &&
                'function' == typeof e.constructor.isBuffer &&
                e.constructor.isBuffer(e)
              );
            },
            isFormData: function (e) {
              return 'undefined' != typeof FormData && e instanceof FormData;
            },
            isArrayBufferView: function (e) {
              return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
                ? ArrayBuffer.isView(e)
                : e && e.buffer && e.buffer instanceof ArrayBuffer;
            },
            isString: function (e) {
              return 'string' == typeof e;
            },
            isNumber: function (e) {
              return 'number' == typeof e;
            },
            isObject: a,
            isPlainObject: u,
            isUndefined: i,
            isDate: function (e) {
              return '[object Date]' === o.call(e);
            },
            isFile: function (e) {
              return '[object File]' === o.call(e);
            },
            isBlob: function (e) {
              return '[object Blob]' === o.call(e);
            },
            isFunction: c,
            isStream: function (e) {
              return a(e) && c(e.pipe);
            },
            isURLSearchParams: function (e) {
              return (
                'undefined' != typeof URLSearchParams &&
                e instanceof URLSearchParams
              );
            },
            isStandardBrowserEnv: function () {
              return (
                ('undefined' == typeof navigator ||
                  ('ReactNative' !== navigator.product &&
                    'NativeScript' !== navigator.product &&
                    'NS' !== navigator.product)) &&
                'undefined' != typeof window &&
                'undefined' != typeof document
              );
            },
            forEach: l,
            merge: function e() {
              var t = {};
              function r(r, n) {
                u(t[n]) && u(r)
                  ? (t[n] = e(t[n], r))
                  : u(r)
                  ? (t[n] = e({}, r))
                  : s(r)
                  ? (t[n] = r.slice())
                  : (t[n] = r);
              }
              for (var n = 0, o = arguments.length; n < o; n++)
                l(arguments[n], r);
              return t;
            },
            extend: function (e, t, r) {
              return (
                l(t, function (t, o) {
                  e[o] = r && 'function' == typeof t ? n(t, r) : t;
                }),
                e
              );
            },
            trim: function (e) {
              return e.replace(/^\s*/, '').replace(/\s*$/, '');
            },
            stripBOM: function (e) {
              return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e;
            },
          };
        },
        7187: (e) => {
          'use strict';
          var t,
            r = 'object' == typeof Reflect ? Reflect : null,
            n =
              r && 'function' == typeof r.apply
                ? r.apply
                : function (e, t, r) {
                    return Function.prototype.apply.call(e, t, r);
                  };
          t =
            r && 'function' == typeof r.ownKeys
              ? r.ownKeys
              : Object.getOwnPropertySymbols
              ? function (e) {
                  return Object.getOwnPropertyNames(e).concat(
                    Object.getOwnPropertySymbols(e)
                  );
                }
              : function (e) {
                  return Object.getOwnPropertyNames(e);
                };
          var o =
            Number.isNaN ||
            function (e) {
              return e != e;
            };
          function s() {
            s.init.call(this);
          }
          (e.exports = s),
            (e.exports.once = function (e, t) {
              return new Promise(function (r, n) {
                function o(r) {
                  e.removeListener(t, s), n(r);
                }
                function s() {
                  'function' == typeof e.removeListener &&
                    e.removeListener('error', o),
                    r([].slice.call(arguments));
                }
                m(e, t, s, { once: !0 }),
                  'error' !== t &&
                    (function (e, t, r) {
                      'function' == typeof e.on &&
                        m(e, 'error', t, { once: !0 });
                    })(e, o);
              });
            }),
            (s.EventEmitter = s),
            (s.prototype._events = void 0),
            (s.prototype._eventsCount = 0),
            (s.prototype._maxListeners = void 0);
          var i = 10;
          function a(e) {
            if ('function' != typeof e)
              throw new TypeError(
                'The "listener" argument must be of type Function. Received type ' +
                  typeof e
              );
          }
          function u(e) {
            return void 0 === e._maxListeners
              ? s.defaultMaxListeners
              : e._maxListeners;
          }
          function c(e, t, r, n) {
            var o, s, i, c;
            if (
              (a(r),
              void 0 === (s = e._events)
                ? ((s = e._events = Object.create(null)), (e._eventsCount = 0))
                : (void 0 !== s.newListener &&
                    (e.emit('newListener', t, r.listener ? r.listener : r),
                    (s = e._events)),
                  (i = s[t])),
              void 0 === i)
            )
              (i = s[t] = r), ++e._eventsCount;
            else if (
              ('function' == typeof i
                ? (i = s[t] = n ? [r, i] : [i, r])
                : n
                ? i.unshift(r)
                : i.push(r),
              (o = u(e)) > 0 && i.length > o && !i.warned)
            ) {
              i.warned = !0;
              var l = new Error(
                'Possible EventEmitter memory leak detected. ' +
                  i.length +
                  ' ' +
                  String(t) +
                  ' listeners added. Use emitter.setMaxListeners() to increase limit'
              );
              (l.name = 'MaxListenersExceededWarning'),
                (l.emitter = e),
                (l.type = t),
                (l.count = i.length),
                (c = l),
                console && console.warn && console.warn(c);
            }
            return e;
          }
          function l() {
            if (!this.fired)
              return (
                this.target.removeListener(this.type, this.wrapFn),
                (this.fired = !0),
                0 === arguments.length
                  ? this.listener.call(this.target)
                  : this.listener.apply(this.target, arguments)
              );
          }
          function f(e, t, r) {
            var n = {
                fired: !1,
                wrapFn: void 0,
                target: e,
                type: t,
                listener: r,
              },
              o = l.bind(n);
            return (o.listener = r), (n.wrapFn = o), o;
          }
          function h(e, t, r) {
            var n = e._events;
            if (void 0 === n) return [];
            var o = n[t];
            return void 0 === o
              ? []
              : 'function' == typeof o
              ? r
                ? [o.listener || o]
                : [o]
              : r
              ? (function (e) {
                  for (var t = new Array(e.length), r = 0; r < t.length; ++r)
                    t[r] = e[r].listener || e[r];
                  return t;
                })(o)
              : d(o, o.length);
          }
          function p(e) {
            var t = this._events;
            if (void 0 !== t) {
              var r = t[e];
              if ('function' == typeof r) return 1;
              if (void 0 !== r) return r.length;
            }
            return 0;
          }
          function d(e, t) {
            for (var r = new Array(t), n = 0; n < t; ++n) r[n] = e[n];
            return r;
          }
          function m(e, t, r, n) {
            if ('function' == typeof e.on) n.once ? e.once(t, r) : e.on(t, r);
            else {
              if ('function' != typeof e.addEventListener)
                throw new TypeError(
                  'The "emitter" argument must be of type EventEmitter. Received type ' +
                    typeof e
                );
              e.addEventListener(t, function o(s) {
                n.once && e.removeEventListener(t, o), r(s);
              });
            }
          }
          Object.defineProperty(s, 'defaultMaxListeners', {
            enumerable: !0,
            get: function () {
              return i;
            },
            set: function (e) {
              if ('number' != typeof e || e < 0 || o(e))
                throw new RangeError(
                  'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                    e +
                    '.'
                );
              i = e;
            },
          }),
            (s.init = function () {
              (void 0 !== this._events &&
                this._events !== Object.getPrototypeOf(this)._events) ||
                ((this._events = Object.create(null)), (this._eventsCount = 0)),
                (this._maxListeners = this._maxListeners || void 0);
            }),
            (s.prototype.setMaxListeners = function (e) {
              if ('number' != typeof e || e < 0 || o(e))
                throw new RangeError(
                  'The value of "n" is out of range. It must be a non-negative number. Received ' +
                    e +
                    '.'
                );
              return (this._maxListeners = e), this;
            }),
            (s.prototype.getMaxListeners = function () {
              return u(this);
            }),
            (s.prototype.emit = function (e) {
              for (var t = [], r = 1; r < arguments.length; r++)
                t.push(arguments[r]);
              var o = 'error' === e,
                s = this._events;
              if (void 0 !== s) o = o && void 0 === s.error;
              else if (!o) return !1;
              if (o) {
                var i;
                if ((t.length > 0 && (i = t[0]), i instanceof Error)) throw i;
                var a = new Error(
                  'Unhandled error.' + (i ? ' (' + i.message + ')' : '')
                );
                throw ((a.context = i), a);
              }
              var u = s[e];
              if (void 0 === u) return !1;
              if ('function' == typeof u) n(u, this, t);
              else {
                var c = u.length,
                  l = d(u, c);
                for (r = 0; r < c; ++r) n(l[r], this, t);
              }
              return !0;
            }),
            (s.prototype.addListener = function (e, t) {
              return c(this, e, t, !1);
            }),
            (s.prototype.on = s.prototype.addListener),
            (s.prototype.prependListener = function (e, t) {
              return c(this, e, t, !0);
            }),
            (s.prototype.once = function (e, t) {
              return a(t), this.on(e, f(this, e, t)), this;
            }),
            (s.prototype.prependOnceListener = function (e, t) {
              return a(t), this.prependListener(e, f(this, e, t)), this;
            }),
            (s.prototype.removeListener = function (e, t) {
              var r, n, o, s, i;
              if ((a(t), void 0 === (n = this._events))) return this;
              if (void 0 === (r = n[e])) return this;
              if (r === t || r.listener === t)
                0 == --this._eventsCount
                  ? (this._events = Object.create(null))
                  : (delete n[e],
                    n.removeListener &&
                      this.emit('removeListener', e, r.listener || t));
              else if ('function' != typeof r) {
                for (o = -1, s = r.length - 1; s >= 0; s--)
                  if (r[s] === t || r[s].listener === t) {
                    (i = r[s].listener), (o = s);
                    break;
                  }
                if (o < 0) return this;
                0 === o
                  ? r.shift()
                  : (function (e, t) {
                      for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                      e.pop();
                    })(r, o),
                  1 === r.length && (n[e] = r[0]),
                  void 0 !== n.removeListener &&
                    this.emit('removeListener', e, i || t);
              }
              return this;
            }),
            (s.prototype.off = s.prototype.removeListener),
            (s.prototype.removeAllListeners = function (e) {
              var t, r, n;
              if (void 0 === (r = this._events)) return this;
              if (void 0 === r.removeListener)
                return (
                  0 === arguments.length
                    ? ((this._events = Object.create(null)),
                      (this._eventsCount = 0))
                    : void 0 !== r[e] &&
                      (0 == --this._eventsCount
                        ? (this._events = Object.create(null))
                        : delete r[e]),
                  this
                );
              if (0 === arguments.length) {
                var o,
                  s = Object.keys(r);
                for (n = 0; n < s.length; ++n)
                  'removeListener' !== (o = s[n]) && this.removeAllListeners(o);
                return (
                  this.removeAllListeners('removeListener'),
                  (this._events = Object.create(null)),
                  (this._eventsCount = 0),
                  this
                );
              }
              if ('function' == typeof (t = r[e])) this.removeListener(e, t);
              else if (void 0 !== t)
                for (n = t.length - 1; n >= 0; n--)
                  this.removeListener(e, t[n]);
              return this;
            }),
            (s.prototype.listeners = function (e) {
              return h(this, e, !0);
            }),
            (s.prototype.rawListeners = function (e) {
              return h(this, e, !1);
            }),
            (s.listenerCount = function (e, t) {
              return 'function' == typeof e.listenerCount
                ? e.listenerCount(t)
                : p.call(e, t);
            }),
            (s.prototype.listenerCount = p),
            (s.prototype.eventNames = function () {
              return this._eventsCount > 0 ? t(this._events) : [];
            });
        },
        6230: (e) => {
          e.exports = 'object' == typeof self ? self.FormData : window.FormData;
        },
        2587: (e) => {
          'use strict';
          function t(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }
          e.exports = function (e, r, n, o) {
            (r = r || '&'), (n = n || '=');
            var s = {};
            if ('string' != typeof e || 0 === e.length) return s;
            var i = /\+/g;
            e = e.split(r);
            var a = 1e3;
            o && 'number' == typeof o.maxKeys && (a = o.maxKeys);
            var u = e.length;
            a > 0 && u > a && (u = a);
            for (var c = 0; c < u; ++c) {
              var l,
                f,
                h,
                p,
                d = e[c].replace(i, '%20'),
                m = d.indexOf(n);
              m >= 0
                ? ((l = d.substr(0, m)), (f = d.substr(m + 1)))
                : ((l = d), (f = '')),
                (h = decodeURIComponent(l)),
                (p = decodeURIComponent(f)),
                t(s, h)
                  ? Array.isArray(s[h])
                    ? s[h].push(p)
                    : (s[h] = [s[h], p])
                  : (s[h] = p);
            }
            return s;
          };
        },
        2361: (e) => {
          'use strict';
          var t = function (e) {
            switch (typeof e) {
              case 'string':
                return e;
              case 'boolean':
                return e ? 'true' : 'false';
              case 'number':
                return isFinite(e) ? e : '';
              default:
                return '';
            }
          };
          e.exports = function (e, r, n, o) {
            return (
              (r = r || '&'),
              (n = n || '='),
              null === e && (e = void 0),
              'object' == typeof e
                ? Object.keys(e)
                    .map(function (o) {
                      var s = encodeURIComponent(t(o)) + n;
                      return Array.isArray(e[o])
                        ? e[o]
                            .map(function (e) {
                              return s + encodeURIComponent(t(e));
                            })
                            .join(r)
                        : s + encodeURIComponent(t(e[o]));
                    })
                    .join(r)
                : o
                ? encodeURIComponent(t(o)) + n + encodeURIComponent(t(e))
                : ''
            );
          };
        },
        7673: (e, t, r) => {
          'use strict';
          (t.decode = t.parse = r(2587)), (t.encode = t.stringify = r(2361));
        },
        9907: (e, t, r) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.getAlbum = void 0);
          const n = r(5080),
            o = r(2571);
          t.getAlbum = async function (e, t) {
            const r = `${n.ALBUM_ENDPOINT}/${t}`;
            return o.getImgurApiResponseFromResponse(
              await e.request({ url: r })
            );
          };
        },
        4639: (e, t, r) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            r(655).__exportStar(r(9907), t);
        },
        5934: (e, t, r) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.ImgurClient = void 0);
          const n = r(655),
            o = r(7187),
            s = r(3894),
            i = r(2176),
            a = r(6788),
            u = r(4639),
            c = r(5080),
            l = 'imgur/next (https://github.com/kaimallea/node-imgur)',
            f = n.__importDefault(r(9669));
          class h extends o.EventEmitter {
            constructor(e) {
              super(),
                (this.credentials = e),
                (this.plainFetcher = f.default.create({
                  baseURL: c.IMGUR_API_PREFIX,
                  headers: { 'user-agent': l },
                  responseType: 'json',
                })),
                (this.fetcher = f.default.create({
                  baseURL: c.IMGUR_API_PREFIX,
                  headers: { 'user-agent': l },
                  responseType: 'json',
                })),
                this.fetcher.interceptors.request.use(
                  async (e) => (
                    (e.headers = e.headers ? e.headers : {}),
                    (e.headers.authorization = await s.getAuthorizationHeader(
                      this
                    )),
                    e
                  ),
                  (e) => Promise.reject(e)
                );
            }
            plainRequest(e) {
              return this.plainFetcher(e);
            }
            request(e = {}) {
              return this.fetcher(e);
            }
            deleteImage(e) {
              return i.deleteImage(this, e);
            }
            favoriteImage(e) {
              return i.favoriteImage(this, e);
            }
            getAlbum(e) {
              return u.getAlbum(this, e);
            }
            getGallery(e) {
              return a.getGallery(this, e);
            }
            getSubredditGallery(e) {
              return a.getSubredditGallery(this, e);
            }
            searchGallery(e) {
              return a.searchGallery(this, e);
            }
            getImage(e) {
              return i.getImage(this, e);
            }
            updateImage(e) {
              return i.updateImage(this, e);
            }
            upload(e) {
              return i.upload(this, e);
            }
          }
          t.ImgurClient = h;
        },
        5080: (e, t) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.SEARCH_GALLERY_ENDPOINT = t.SUBREDDIT_GALLERY_ENDPOINT = t.GALLERY_ENDPOINT = t.UPLOAD_ENDPOINT = t.IMAGE_ENDPOINT = t.ALBUM_ENDPOINT = t.AUTHORIZE_ENDPOINT = t.API_VERSION = t.IMGUR_API_PREFIX = void 0),
            (t.IMGUR_API_PREFIX = 'https://api.imgur.com'),
            (t.API_VERSION = '3'),
            (t.AUTHORIZE_ENDPOINT = 'oauth2/authorize'),
            (t.ALBUM_ENDPOINT = `${t.API_VERSION}/album`),
            (t.IMAGE_ENDPOINT = `${t.API_VERSION}/image`),
            (t.UPLOAD_ENDPOINT = `${t.API_VERSION}/upload`),
            (t.GALLERY_ENDPOINT = `${t.API_VERSION}/gallery`),
            (t.SUBREDDIT_GALLERY_ENDPOINT = `${t.API_VERSION}/gallery/r`),
            (t.SEARCH_GALLERY_ENDPOINT = `${t.API_VERSION}/gallery/search`);
        },
        6419: (e, t) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.isLogin = t.isClientId = t.isAccessToken = void 0),
            (t.isAccessToken = function (e) {
              return void 0 !== e.accessToken;
            }),
            (t.isClientId = function (e) {
              return void 0 !== e.clientId;
            }),
            (t.isLogin = function (e) {
              return (
                void 0 !== e.clientId &&
                void 0 !== e.username &&
                void 0 !== e.password
              );
            });
        },
        2571: (e, t, r) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.getImgurApiResponseFromResponse = t.createForm = t.getSource = t.isStream = t.isImageUrl = t.isBase64 = void 0);
          const n = r(655).__importDefault(r(6230));
          function o(e) {
            return (
              'string' != typeof e && void 0 !== e.base64 && 'base64' === e.type
            );
          }
          function s(e) {
            return 'string' != typeof e && void 0 !== e.stream;
          }
          (t.isBase64 = o),
            (t.isImageUrl = function (e) {
              return (
                'string' == typeof e || (void 0 !== e.image && 'url' === e.type)
              );
            }),
            (t.isStream = s),
            (t.getSource = function (e) {
              return 'string' == typeof e
                ? e
                : o(e)
                ? 'payload.base64'
                : s(e)
                ? 'payload.stream'
                : e.image;
            }),
            (t.createForm = function (e) {
              const t = new n.default();
              if ('string' == typeof e) return t.append('image', e), t;
              for (const [r, n] of Object.entries(e)) {
                const o = ['base64', 'stream'];
                -1 !== o.indexOf(r)
                  ? -1 !== o.indexOf(e.type) && t.append(r, e)
                  : t.append(r, n);
              }
              return t;
            }),
            (t.getImgurApiResponseFromResponse = function (e) {
              var t, r;
              return void 0 !==
                (null === (t = e.data) || void 0 === t ? void 0 : t.status) &&
                void 0 !==
                  (null === (r = e.data) || void 0 === r ? void 0 : r.success)
                ? e.data
                : { data: e.data, status: e.status, success: !0 };
            });
        },
        4818: (e, t, r) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.getGallery = t.constructGalleryUrl = void 0);
          const n = r(5080),
            o = r(8575),
            s = r(2571),
            i = { section: 'hot', sort: 'viral' };
          function a(e) {
            const t = Object.assign({}, i, e);
            let r = `${t.section}`;
            t.sort && (r += `/${t.sort}`),
              'top' === t.section && t.window && (r += `/${t.window}`),
              t.page && (r += `/${t.page}`);
            const s = new o.URL(
              `${n.IMGUR_API_PREFIX}/${n.GALLERY_ENDPOINT}/${r}`
            );
            return (
              void 0 !== t.showViral &&
                s.searchParams.append('showViral', t.showViral.toString()),
              void 0 !== t.mature &&
                s.searchParams.append('mature', t.mature.toString()),
              void 0 !== t.album_previews &&
                s.searchParams.append(
                  'album_previews',
                  t.album_previews.toString()
                ),
              s
            );
          }
          (t.constructGalleryUrl = a),
            (t.getGallery = async function (e, t = i) {
              const { pathname: r } = a(t),
                n = r.slice(1);
              return s.getImgurApiResponseFromResponse(
                await e.request({ url: n })
              );
            });
        },
        1686: (e, t, r) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.getSubredditGallery = t.constructSubredditGalleryUrl = void 0);
          const n = r(5080),
            o = r(8575),
            s = r(2571);
          function i(e) {
            let t = `${e.subreddit}`;
            return (
              e.sort && (t += `/${e.sort}`),
              'top' === e.sort && e.window && (t += `/${e.window}`),
              e.page && (t += `/${e.page}`),
              new o.URL(
                `${n.IMGUR_API_PREFIX}/${n.SUBREDDIT_GALLERY_ENDPOINT}/${t}`
              )
            );
          }
          (t.constructSubredditGalleryUrl = i),
            (t.getSubredditGallery = async function (e, t) {
              const { pathname: r } = i(t),
                n = r.slice(1);
              return s.getImgurApiResponseFromResponse(
                await e.request({ url: n })
              );
            });
        },
        6788: (e, t, r) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 });
          const n = r(655);
          n.__exportStar(r(4818), t),
            n.__exportStar(r(1686), t),
            n.__exportStar(r(8477), t);
        },
        8477: (e, t, r) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.searchGallery = t.constructSearchGalleryUrl = void 0);
          const n = r(5080),
            o = r(2571),
            s = r(8575),
            i = ['q_all', 'q_any', 'q_exactly', 'q_not', 'q_type', 'q_size_px'];
          function a(e) {
            let t = '';
            e.sort && (t += `/${e.sort}`),
              'top' === e.sort && e.window && (t += `/${e.window}`),
              e.page && (t += `/${e.page}`);
            const r = new s.URL(
              `${n.IMGUR_API_PREFIX}/${n.SEARCH_GALLERY_ENDPOINT}${t}`
            );
            if (
              (i.forEach((t) => {
                var n;
                (null === (n = e[t]) || void 0 === n ? void 0 : n.length) &&
                  r.searchParams.append(t, e[t]);
              }),
              !r.search)
            ) {
              const t = e.q || e.query;
              if (!t) throw new Error('No query was provided');
              r.searchParams.append('q', t);
            }
            return r;
          }
          (t.constructSearchGalleryUrl = a),
            (t.searchGallery = async function (e, t) {
              const { pathname: r } = a(t),
                n = r.slice(1);
              return o.getImgurApiResponseFromResponse(
                await e.request({ url: n })
              );
            });
        },
        3894: (e, t, r) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.getAuthorizationHeader = void 0);
          const n = r(6419),
            o = r(5080);
          t.getAuthorizationHeader = async function (e) {
            if (n.isAccessToken(e.credentials))
              return `Bearer ${e.credentials.accessToken}`;
            if (n.isClientId(e.credentials) && !n.isLogin(e.credentials))
              return `Client-ID ${e.credentials.clientId}`;
            const { clientId: t, username: r, password: s } = e.credentials,
              i = {
                url: o.AUTHORIZE_ENDPOINT,
                baseURL: o.IMGUR_API_PREFIX,
                params: { client_id: t, response_type: 'token' },
              };
            let a = await e.plainRequest(i);
            const u = Array.isArray(a.headers['set-cookie'])
              ? a.headers['set-cookie'][0]
              : a.headers['set-cookie'];
            if (!u) throw new Error('No cookies were set during authorization');
            const c = u.match('(^|;)[s]*authorize_token=([^;]*)');
            if (!c || c.length < 3)
              throw new Error('Unable to find authorize_token cookie');
            const l = c[2];
            (i.method = 'POST'),
              (i.data = { username: r, password: s, allow: l }),
              (i.followRedirect = !1),
              (i.headers = { cookie: `authorize_token=${l}` }),
              (a = await e.plainRequest(i));
            const f = a.headers.location;
            if (!f) throw new Error('Unable to parse location');
            const h = JSON.parse(
              '{"' +
                decodeURI(f.slice(f.indexOf('#') + 1))
                  .replace(/"/g, '\\"')
                  .replace(/&/g, '","')
                  .replace(/=/g, '":"') +
                '"}'
            ).access_token;
            return (e.credentials.accessToken = h), `Bearer ${h}`;
          };
        },
        870: (e, t, r) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.deleteImage = void 0);
          const n = r(5080),
            o = r(2571);
          t.deleteImage = async function (e, t) {
            const r = `${n.IMAGE_ENDPOINT}/${t}`;
            return o.getImgurApiResponseFromResponse(
              await e.request({ url: r, method: 'DELETE' })
            );
          };
        },
        2129: (e, t, r) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.favoriteImage = void 0);
          const n = r(5080),
            o = r(2571);
          t.favoriteImage = async function (e, t) {
            const r = `${n.IMAGE_ENDPOINT}/${t}/favorite`;
            return o.getImgurApiResponseFromResponse(
              await e.request({ url: r, method: 'POST' })
            );
          };
        },
        8455: (e, t, r) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.getImage = void 0);
          const n = r(5080),
            o = r(2571);
          t.getImage = async function (e, t) {
            const r = `${n.IMAGE_ENDPOINT}/${t}`;
            return o.getImgurApiResponseFromResponse(
              await e.request({ url: r })
            );
          };
        },
        2176: (e, t, r) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 });
          const n = r(655);
          n.__exportStar(r(870), t),
            n.__exportStar(r(2129), t),
            n.__exportStar(r(8455), t),
            n.__exportStar(r(9831), t),
            n.__exportStar(r(5328), t);
        },
        9831: (e, t, r) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.updateImage = void 0);
          const n = r(5080),
            o = r(2571);
          function s(e) {
            return (
              'string' == typeof e.title || 'string' == typeof e.description
            );
          }
          t.updateImage = async function (e, t) {
            if (Array.isArray(t)) {
              const r = t.map((t) => {
                if (!s(t))
                  throw new Error('Update requires a title and/or description');
                const r = `${n.IMAGE_ENDPOINT}/${t.imageHash}`,
                  i = o.createForm(t);
                return new Promise(async function (t) {
                  return t(
                    o.getImgurApiResponseFromResponse(
                      await e.request({ url: r, method: 'POST', data: i })
                    )
                  );
                });
              });
              return await Promise.all(r);
            }
            if (!s(t))
              throw new Error('Update requires a title and/or description');
            const r = `${n.IMAGE_ENDPOINT}/${t.imageHash}`,
              i = o.createForm(t);
            return o.getImgurApiResponseFromResponse(
              await e.request({ url: r, method: 'POST', data: i })
            );
          };
        },
        5328: (e, t, r) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.upload = void 0);
          const n = r(2571),
            o = r(5080);
          t.upload = async function (e, t) {
            if (Array.isArray(t)) {
              const r = t.map((t) => {
                const r = n.createForm(t);
                return new Promise(async (t) => {
                  t(
                    n.getImgurApiResponseFromResponse(
                      await e.request({
                        url: o.UPLOAD_ENDPOINT,
                        method: 'POST',
                        data: r,
                        onUploadProgress: (t) => {
                          console.log({ progressEvent: t }),
                            e.emit('uploadProgress', { ...t });
                        },
                      })
                    )
                  );
                });
              });
              return await Promise.all(r);
            }
            const r = n.createForm(t),
              s = await e.request({
                url: o.UPLOAD_ENDPOINT,
                method: 'POST',
                data: r,
                onUploadProgress: (t) => {
                  console.log({ progressEvent: t }),
                    e.emit('uploadProgress', { ...t });
                },
              });
            return Promise.resolve(n.getImgurApiResponseFromResponse(s));
          };
        },
        655: (e, t, r) => {
          'use strict';
          r.r(t),
            r.d(t, {
              __extends: () => o,
              __assign: () => s,
              __rest: () => i,
              __decorate: () => a,
              __param: () => u,
              __metadata: () => c,
              __awaiter: () => l,
              __generator: () => f,
              __createBinding: () => h,
              __exportStar: () => p,
              __values: () => d,
              __read: () => m,
              __spread: () => v,
              __spreadArrays: () => y,
              __await: () => g,
              __asyncGenerator: () => _,
              __asyncDelegator: () => b,
              __asyncValues: () => w,
              __makeTemplateObject: () => O,
              __importStar: () => I,
              __importDefault: () => x,
              __classPrivateFieldGet: () => E,
              __classPrivateFieldSet: () => P,
            });
          var n = function (e, t) {
            return (n =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
              })(e, t);
          };
          function o(e, t) {
            function r() {
              this.constructor = e;
            }
            n(e, t),
              (e.prototype =
                null === t
                  ? Object.create(t)
                  : ((r.prototype = t.prototype), new r()));
          }
          var s = function () {
            return (s =
              Object.assign ||
              function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++)
                  for (var o in (t = arguments[r]))
                    Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e;
              }).apply(this, arguments);
          };
          function i(e, t) {
            var r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) &&
                t.indexOf(n) < 0 &&
                (r[n] = e[n]);
            if (
              null != e &&
              'function' == typeof Object.getOwnPropertySymbols
            ) {
              var o = 0;
              for (n = Object.getOwnPropertySymbols(e); o < n.length; o++)
                t.indexOf(n[o]) < 0 &&
                  Object.prototype.propertyIsEnumerable.call(e, n[o]) &&
                  (r[n[o]] = e[n[o]]);
            }
            return r;
          }
          function a(e, t, r, n) {
            var o,
              s = arguments.length,
              i =
                s < 3
                  ? t
                  : null === n
                  ? (n = Object.getOwnPropertyDescriptor(t, r))
                  : n;
            if (
              'object' == typeof Reflect &&
              'function' == typeof Reflect.decorate
            )
              i = Reflect.decorate(e, t, r, n);
            else
              for (var a = e.length - 1; a >= 0; a--)
                (o = e[a]) &&
                  (i = (s < 3 ? o(i) : s > 3 ? o(t, r, i) : o(t, r)) || i);
            return s > 3 && i && Object.defineProperty(t, r, i), i;
          }
          function u(e, t) {
            return function (r, n) {
              t(r, n, e);
            };
          }
          function c(e, t) {
            if (
              'object' == typeof Reflect &&
              'function' == typeof Reflect.metadata
            )
              return Reflect.metadata(e, t);
          }
          function l(e, t, r, n) {
            return new (r || (r = Promise))(function (o, s) {
              function i(e) {
                try {
                  u(n.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function a(e) {
                try {
                  u(n.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function u(e) {
                var t;
                e.done
                  ? o(e.value)
                  : ((t = e.value),
                    t instanceof r
                      ? t
                      : new r(function (e) {
                          e(t);
                        })).then(i, a);
              }
              u((n = n.apply(e, t || [])).next());
            });
          }
          function f(e, t) {
            var r,
              n,
              o,
              s,
              i = {
                label: 0,
                sent: function () {
                  if (1 & o[0]) throw o[1];
                  return o[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (s = { next: a(0), throw: a(1), return: a(2) }),
              'function' == typeof Symbol &&
                (s[Symbol.iterator] = function () {
                  return this;
                }),
              s
            );
            function a(s) {
              return function (a) {
                return (function (s) {
                  if (r) throw new TypeError('Generator is already executing.');
                  for (; i; )
                    try {
                      if (
                        ((r = 1),
                        n &&
                          (o =
                            2 & s[0]
                              ? n.return
                              : s[0]
                              ? n.throw || ((o = n.return) && o.call(n), 0)
                              : n.next) &&
                          !(o = o.call(n, s[1])).done)
                      )
                        return o;
                      switch (((n = 0), o && (s = [2 & s[0], o.value]), s[0])) {
                        case 0:
                        case 1:
                          o = s;
                          break;
                        case 4:
                          return i.label++, { value: s[1], done: !1 };
                        case 5:
                          i.label++, (n = s[1]), (s = [0]);
                          continue;
                        case 7:
                          (s = i.ops.pop()), i.trys.pop();
                          continue;
                        default:
                          if (
                            !(
                              (o =
                                (o = i.trys).length > 0 && o[o.length - 1]) ||
                              (6 !== s[0] && 2 !== s[0])
                            )
                          ) {
                            i = 0;
                            continue;
                          }
                          if (
                            3 === s[0] &&
                            (!o || (s[1] > o[0] && s[1] < o[3]))
                          ) {
                            i.label = s[1];
                            break;
                          }
                          if (6 === s[0] && i.label < o[1]) {
                            (i.label = o[1]), (o = s);
                            break;
                          }
                          if (o && i.label < o[2]) {
                            (i.label = o[2]), i.ops.push(s);
                            break;
                          }
                          o[2] && i.ops.pop(), i.trys.pop();
                          continue;
                      }
                      s = t.call(e, i);
                    } catch (e) {
                      (s = [6, e]), (n = 0);
                    } finally {
                      r = o = 0;
                    }
                  if (5 & s[0]) throw s[1];
                  return { value: s[0] ? s[1] : void 0, done: !0 };
                })([s, a]);
              };
            }
          }
          function h(e, t, r, n) {
            void 0 === n && (n = r), (e[n] = t[r]);
          }
          function p(e, t) {
            for (var r in e)
              'default' === r || t.hasOwnProperty(r) || (t[r] = e[r]);
          }
          function d(e) {
            var t = 'function' == typeof Symbol && Symbol.iterator,
              r = t && e[t],
              n = 0;
            if (r) return r.call(e);
            if (e && 'number' == typeof e.length)
              return {
                next: function () {
                  return (
                    e && n >= e.length && (e = void 0),
                    { value: e && e[n++], done: !e }
                  );
                },
              };
            throw new TypeError(
              t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
            );
          }
          function m(e, t) {
            var r = 'function' == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n,
              o,
              s = r.call(e),
              i = [];
            try {
              for (; (void 0 === t || t-- > 0) && !(n = s.next()).done; )
                i.push(n.value);
            } catch (e) {
              o = { error: e };
            } finally {
              try {
                n && !n.done && (r = s.return) && r.call(s);
              } finally {
                if (o) throw o.error;
              }
            }
            return i;
          }
          function v() {
            for (var e = [], t = 0; t < arguments.length; t++)
              e = e.concat(m(arguments[t]));
            return e;
          }
          function y() {
            for (var e = 0, t = 0, r = arguments.length; t < r; t++)
              e += arguments[t].length;
            var n = Array(e),
              o = 0;
            for (t = 0; t < r; t++)
              for (var s = arguments[t], i = 0, a = s.length; i < a; i++, o++)
                n[o] = s[i];
            return n;
          }
          function g(e) {
            return this instanceof g ? ((this.v = e), this) : new g(e);
          }
          function _(e, t, r) {
            if (!Symbol.asyncIterator)
              throw new TypeError('Symbol.asyncIterator is not defined.');
            var n,
              o = r.apply(e, t || []),
              s = [];
            return (
              (n = {}),
              i('next'),
              i('throw'),
              i('return'),
              (n[Symbol.asyncIterator] = function () {
                return this;
              }),
              n
            );
            function i(e) {
              o[e] &&
                (n[e] = function (t) {
                  return new Promise(function (r, n) {
                    s.push([e, t, r, n]) > 1 || a(e, t);
                  });
                });
            }
            function a(e, t) {
              try {
                (r = o[e](t)).value instanceof g
                  ? Promise.resolve(r.value.v).then(u, c)
                  : l(s[0][2], r);
              } catch (e) {
                l(s[0][3], e);
              }
              var r;
            }
            function u(e) {
              a('next', e);
            }
            function c(e) {
              a('throw', e);
            }
            function l(e, t) {
              e(t), s.shift(), s.length && a(s[0][0], s[0][1]);
            }
          }
          function b(e) {
            var t, r;
            return (
              (t = {}),
              n('next'),
              n('throw', function (e) {
                throw e;
              }),
              n('return'),
              (t[Symbol.iterator] = function () {
                return this;
              }),
              t
            );
            function n(n, o) {
              t[n] = e[n]
                ? function (t) {
                    return (r = !r)
                      ? { value: g(e[n](t)), done: 'return' === n }
                      : o
                      ? o(t)
                      : t;
                  }
                : o;
            }
          }
          function w(e) {
            if (!Symbol.asyncIterator)
              throw new TypeError('Symbol.asyncIterator is not defined.');
            var t,
              r = e[Symbol.asyncIterator];
            return r
              ? r.call(e)
              : ((e = d(e)),
                (t = {}),
                n('next'),
                n('throw'),
                n('return'),
                (t[Symbol.asyncIterator] = function () {
                  return this;
                }),
                t);
            function n(r) {
              t[r] =
                e[r] &&
                function (t) {
                  return new Promise(function (n, o) {
                    !(function (e, t, r, n) {
                      Promise.resolve(n).then(function (t) {
                        e({ value: t, done: r });
                      }, t);
                    })(n, o, (t = e[r](t)).done, t.value);
                  });
                };
            }
          }
          function O(e, t) {
            return (
              Object.defineProperty
                ? Object.defineProperty(e, 'raw', { value: t })
                : (e.raw = t),
              e
            );
          }
          function I(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
              for (var r in e)
                Object.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return (t.default = e), t;
          }
          function x(e) {
            return e && e.__esModule ? e : { default: e };
          }
          function E(e, t) {
            if (!t.has(e))
              throw new TypeError(
                'attempted to get private field on non-instance'
              );
            return t.get(e);
          }
          function P(e, t, r) {
            if (!t.has(e))
              throw new TypeError(
                'attempted to set private field on non-instance'
              );
            return t.set(e, r), r;
          }
        },
        2511: function (e, t, r) {
          var n;
          (e = r.nmd(e)),
            (function (o) {
              t && t.nodeType, e && e.nodeType;
              var s = 'object' == typeof r.g && r.g;
              s.global !== s && s.window !== s && s.self;
              var i,
                a = 2147483647,
                u = 36,
                c = /^xn--/,
                l = /[^\x20-\x7E]/,
                f = /[\x2E\u3002\uFF0E\uFF61]/g,
                h = {
                  overflow: 'Overflow: input needs wider integers to process',
                  'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
                  'invalid-input': 'Invalid input',
                },
                p = Math.floor,
                d = String.fromCharCode;
              function m(e) {
                throw RangeError(h[e]);
              }
              function v(e, t) {
                for (var r = e.length, n = []; r--; ) n[r] = t(e[r]);
                return n;
              }
              function y(e, t) {
                var r = e.split('@'),
                  n = '';
                return (
                  r.length > 1 && ((n = r[0] + '@'), (e = r[1])),
                  n + v((e = e.replace(f, '.')).split('.'), t).join('.')
                );
              }
              function g(e) {
                for (var t, r, n = [], o = 0, s = e.length; o < s; )
                  (t = e.charCodeAt(o++)) >= 55296 && t <= 56319 && o < s
                    ? 56320 == (64512 & (r = e.charCodeAt(o++)))
                      ? n.push(((1023 & t) << 10) + (1023 & r) + 65536)
                      : (n.push(t), o--)
                    : n.push(t);
                return n;
              }
              function _(e) {
                return v(e, function (e) {
                  var t = '';
                  return (
                    e > 65535 &&
                      ((t += d((((e -= 65536) >>> 10) & 1023) | 55296)),
                      (e = 56320 | (1023 & e))),
                    t + d(e)
                  );
                }).join('');
              }
              function b(e, t) {
                return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
              }
              function w(e, t, r) {
                var n = 0;
                for (
                  e = r ? p(e / 700) : e >> 1, e += p(e / t);
                  e > 455;
                  n += u
                )
                  e = p(e / 35);
                return p(n + (36 * e) / (e + 38));
              }
              function O(e) {
                var t,
                  r,
                  n,
                  o,
                  s,
                  i,
                  c,
                  l,
                  f,
                  h,
                  d,
                  v = [],
                  y = e.length,
                  g = 0,
                  b = 128,
                  O = 72;
                for ((r = e.lastIndexOf('-')) < 0 && (r = 0), n = 0; n < r; ++n)
                  e.charCodeAt(n) >= 128 && m('not-basic'),
                    v.push(e.charCodeAt(n));
                for (o = r > 0 ? r + 1 : 0; o < y; ) {
                  for (
                    s = g, i = 1, c = u;
                    o >= y && m('invalid-input'),
                      ((l =
                        (d = e.charCodeAt(o++)) - 48 < 10
                          ? d - 22
                          : d - 65 < 26
                          ? d - 65
                          : d - 97 < 26
                          ? d - 97
                          : u) >= u ||
                        l > p((a - g) / i)) &&
                        m('overflow'),
                      (g += l * i),
                      !(l < (f = c <= O ? 1 : c >= O + 26 ? 26 : c - O));
                    c += u
                  )
                    i > p(a / (h = u - f)) && m('overflow'), (i *= h);
                  (O = w(g - s, (t = v.length + 1), 0 == s)),
                    p(g / t) > a - b && m('overflow'),
                    (b += p(g / t)),
                    (g %= t),
                    v.splice(g++, 0, b);
                }
                return _(v);
              }
              function I(e) {
                var t,
                  r,
                  n,
                  o,
                  s,
                  i,
                  c,
                  l,
                  f,
                  h,
                  v,
                  y,
                  _,
                  O,
                  I,
                  x = [];
                for (
                  y = (e = g(e)).length, t = 128, r = 0, s = 72, i = 0;
                  i < y;
                  ++i
                )
                  (v = e[i]) < 128 && x.push(d(v));
                for (n = o = x.length, o && x.push('-'); n < y; ) {
                  for (c = a, i = 0; i < y; ++i)
                    (v = e[i]) >= t && v < c && (c = v);
                  for (
                    c - t > p((a - r) / (_ = n + 1)) && m('overflow'),
                      r += (c - t) * _,
                      t = c,
                      i = 0;
                    i < y;
                    ++i
                  )
                    if (((v = e[i]) < t && ++r > a && m('overflow'), v == t)) {
                      for (
                        l = r, f = u;
                        !(l < (h = f <= s ? 1 : f >= s + 26 ? 26 : f - s));
                        f += u
                      )
                        (I = l - h),
                          (O = u - h),
                          x.push(d(b(h + (I % O), 0))),
                          (l = p(I / O));
                      x.push(d(b(l, 0))), (s = w(r, _, n == o)), (r = 0), ++n;
                    }
                  ++r, ++t;
                }
                return x.join('');
              }
              (i = {
                version: '1.3.2',
                ucs2: { decode: g, encode: _ },
                decode: O,
                encode: I,
                toASCII: function (e) {
                  return y(e, function (e) {
                    return l.test(e) ? 'xn--' + I(e) : e;
                  });
                },
                toUnicode: function (e) {
                  return y(e, function (e) {
                    return c.test(e) ? O(e.slice(4).toLowerCase()) : e;
                  });
                },
              }),
                void 0 ===
                  (n = function () {
                    return i;
                  }.call(t, r, t, e)) || (e.exports = n);
            })();
        },
        8575: (e, t, r) => {
          'use strict';
          var n = r(2511),
            o = r(2502);
          function s() {
            (this.protocol = null),
              (this.slashes = null),
              (this.auth = null),
              (this.host = null),
              (this.port = null),
              (this.hostname = null),
              (this.hash = null),
              (this.search = null),
              (this.query = null),
              (this.pathname = null),
              (this.path = null),
              (this.href = null);
          }
          (t.parse = _),
            (t.resolve = function (e, t) {
              return _(e, !1, !0).resolve(t);
            }),
            (t.resolveObject = function (e, t) {
              return e ? _(e, !1, !0).resolveObject(t) : t;
            }),
            (t.format = function (e) {
              return (
                o.isString(e) && (e = _(e)),
                e instanceof s ? e.format() : s.prototype.format.call(e)
              );
            }),
            (t.Url = s);
          var i = /^([a-z0-9.+-]+:)/i,
            a = /:[0-9]*$/,
            u = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
            c = ['{', '}', '|', '\\', '^', '`'].concat([
              '<',
              '>',
              '"',
              '`',
              ' ',
              '\r',
              '\n',
              '\t',
            ]),
            l = ["'"].concat(c),
            f = ['%', '/', '?', ';', '#'].concat(l),
            h = ['/', '?', '#'],
            p = /^[+a-z0-9A-Z_-]{0,63}$/,
            d = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
            m = { javascript: !0, 'javascript:': !0 },
            v = { javascript: !0, 'javascript:': !0 },
            y = {
              http: !0,
              https: !0,
              ftp: !0,
              gopher: !0,
              file: !0,
              'http:': !0,
              'https:': !0,
              'ftp:': !0,
              'gopher:': !0,
              'file:': !0,
            },
            g = r(7673);
          function _(e, t, r) {
            if (e && o.isObject(e) && e instanceof s) return e;
            var n = new s();
            return n.parse(e, t, r), n;
          }
          (s.prototype.parse = function (e, t, r) {
            if (!o.isString(e))
              throw new TypeError(
                "Parameter 'url' must be a string, not " + typeof e
              );
            var s = e.indexOf('?'),
              a = -1 !== s && s < e.indexOf('#') ? '?' : '#',
              c = e.split(a);
            c[0] = c[0].replace(/\\/g, '/');
            var _ = (e = c.join(a));
            if (((_ = _.trim()), !r && 1 === e.split('#').length)) {
              var b = u.exec(_);
              if (b)
                return (
                  (this.path = _),
                  (this.href = _),
                  (this.pathname = b[1]),
                  b[2]
                    ? ((this.search = b[2]),
                      (this.query = t
                        ? g.parse(this.search.substr(1))
                        : this.search.substr(1)))
                    : t && ((this.search = ''), (this.query = {})),
                  this
                );
            }
            var w = i.exec(_);
            if (w) {
              var O = (w = w[0]).toLowerCase();
              (this.protocol = O), (_ = _.substr(w.length));
            }
            if (r || w || _.match(/^\/\/[^@\/]+@[^@\/]+/)) {
              var I = '//' === _.substr(0, 2);
              !I || (w && v[w]) || ((_ = _.substr(2)), (this.slashes = !0));
            }
            if (!v[w] && (I || (w && !y[w]))) {
              for (var x, E, P = -1, R = 0; R < h.length; R++)
                -1 !== (A = _.indexOf(h[R])) && (-1 === P || A < P) && (P = A);
              for (
                -1 !==
                  (E = -1 === P ? _.lastIndexOf('@') : _.lastIndexOf('@', P)) &&
                  ((x = _.slice(0, E)),
                  (_ = _.slice(E + 1)),
                  (this.auth = decodeURIComponent(x))),
                  P = -1,
                  R = 0;
                R < f.length;
                R++
              ) {
                var A;
                -1 !== (A = _.indexOf(f[R])) && (-1 === P || A < P) && (P = A);
              }
              -1 === P && (P = _.length),
                (this.host = _.slice(0, P)),
                (_ = _.slice(P)),
                this.parseHost(),
                (this.hostname = this.hostname || '');
              var j =
                '[' === this.hostname[0] &&
                ']' === this.hostname[this.hostname.length - 1];
              if (!j)
                for (
                  var S = this.hostname.split(/\./), N = ((R = 0), S.length);
                  R < N;
                  R++
                ) {
                  var L = S[R];
                  if (L && !L.match(p)) {
                    for (var T = '', U = 0, C = L.length; U < C; U++)
                      L.charCodeAt(U) > 127 ? (T += 'x') : (T += L[U]);
                    if (!T.match(p)) {
                      var q = S.slice(0, R),
                        D = S.slice(R + 1),
                        F = L.match(d);
                      F && (q.push(F[1]), D.unshift(F[2])),
                        D.length && (_ = '/' + D.join('.') + _),
                        (this.hostname = q.join('.'));
                      break;
                    }
                  }
                }
              this.hostname.length > 255
                ? (this.hostname = '')
                : (this.hostname = this.hostname.toLowerCase()),
                j || (this.hostname = n.toASCII(this.hostname));
              var M = this.port ? ':' + this.port : '',
                k = this.hostname || '';
              (this.host = k + M),
                (this.href += this.host),
                j &&
                  ((this.hostname = this.hostname.substr(
                    1,
                    this.hostname.length - 2
                  )),
                  '/' !== _[0] && (_ = '/' + _));
            }
            if (!m[O])
              for (R = 0, N = l.length; R < N; R++) {
                var $ = l[R];
                if (-1 !== _.indexOf($)) {
                  var G = encodeURIComponent($);
                  G === $ && (G = escape($)), (_ = _.split($).join(G));
                }
              }
            var B = _.indexOf('#');
            -1 !== B && ((this.hash = _.substr(B)), (_ = _.slice(0, B)));
            var H = _.indexOf('?');
            if (
              (-1 !== H
                ? ((this.search = _.substr(H)),
                  (this.query = _.substr(H + 1)),
                  t && (this.query = g.parse(this.query)),
                  (_ = _.slice(0, H)))
                : t && ((this.search = ''), (this.query = {})),
              _ && (this.pathname = _),
              y[O] && this.hostname && !this.pathname && (this.pathname = '/'),
              this.pathname || this.search)
            ) {
              M = this.pathname || '';
              var z = this.search || '';
              this.path = M + z;
            }
            return (this.href = this.format()), this;
          }),
            (s.prototype.format = function () {
              var e = this.auth || '';
              e &&
                ((e = (e = encodeURIComponent(e)).replace(/%3A/i, ':')),
                (e += '@'));
              var t = this.protocol || '',
                r = this.pathname || '',
                n = this.hash || '',
                s = !1,
                i = '';
              this.host
                ? (s = e + this.host)
                : this.hostname &&
                  ((s =
                    e +
                    (-1 === this.hostname.indexOf(':')
                      ? this.hostname
                      : '[' + this.hostname + ']')),
                  this.port && (s += ':' + this.port)),
                this.query &&
                  o.isObject(this.query) &&
                  Object.keys(this.query).length &&
                  (i = g.stringify(this.query));
              var a = this.search || (i && '?' + i) || '';
              return (
                t && ':' !== t.substr(-1) && (t += ':'),
                this.slashes || ((!t || y[t]) && !1 !== s)
                  ? ((s = '//' + (s || '')),
                    r && '/' !== r.charAt(0) && (r = '/' + r))
                  : s || (s = ''),
                n && '#' !== n.charAt(0) && (n = '#' + n),
                a && '?' !== a.charAt(0) && (a = '?' + a),
                t +
                  s +
                  (r = r.replace(/[?#]/g, function (e) {
                    return encodeURIComponent(e);
                  })) +
                  (a = a.replace('#', '%23')) +
                  n
              );
            }),
            (s.prototype.resolve = function (e) {
              return this.resolveObject(_(e, !1, !0)).format();
            }),
            (s.prototype.resolveObject = function (e) {
              if (o.isString(e)) {
                var t = new s();
                t.parse(e, !1, !0), (e = t);
              }
              for (
                var r = new s(), n = Object.keys(this), i = 0;
                i < n.length;
                i++
              ) {
                var a = n[i];
                r[a] = this[a];
              }
              if (((r.hash = e.hash), '' === e.href))
                return (r.href = r.format()), r;
              if (e.slashes && !e.protocol) {
                for (var u = Object.keys(e), c = 0; c < u.length; c++) {
                  var l = u[c];
                  'protocol' !== l && (r[l] = e[l]);
                }
                return (
                  y[r.protocol] &&
                    r.hostname &&
                    !r.pathname &&
                    (r.path = r.pathname = '/'),
                  (r.href = r.format()),
                  r
                );
              }
              if (e.protocol && e.protocol !== r.protocol) {
                if (!y[e.protocol]) {
                  for (var f = Object.keys(e), h = 0; h < f.length; h++) {
                    var p = f[h];
                    r[p] = e[p];
                  }
                  return (r.href = r.format()), r;
                }
                if (((r.protocol = e.protocol), e.host || v[e.protocol]))
                  r.pathname = e.pathname;
                else {
                  for (
                    var d = (e.pathname || '').split('/');
                    d.length && !(e.host = d.shift());

                  );
                  e.host || (e.host = ''),
                    e.hostname || (e.hostname = ''),
                    '' !== d[0] && d.unshift(''),
                    d.length < 2 && d.unshift(''),
                    (r.pathname = d.join('/'));
                }
                if (
                  ((r.search = e.search),
                  (r.query = e.query),
                  (r.host = e.host || ''),
                  (r.auth = e.auth),
                  (r.hostname = e.hostname || e.host),
                  (r.port = e.port),
                  r.pathname || r.search)
                ) {
                  var m = r.pathname || '',
                    g = r.search || '';
                  r.path = m + g;
                }
                return (
                  (r.slashes = r.slashes || e.slashes), (r.href = r.format()), r
                );
              }
              var _ = r.pathname && '/' === r.pathname.charAt(0),
                b = e.host || (e.pathname && '/' === e.pathname.charAt(0)),
                w = b || _ || (r.host && e.pathname),
                O = w,
                I = (r.pathname && r.pathname.split('/')) || [],
                x =
                  ((d = (e.pathname && e.pathname.split('/')) || []),
                  r.protocol && !y[r.protocol]);
              if (
                (x &&
                  ((r.hostname = ''),
                  (r.port = null),
                  r.host && ('' === I[0] ? (I[0] = r.host) : I.unshift(r.host)),
                  (r.host = ''),
                  e.protocol &&
                    ((e.hostname = null),
                    (e.port = null),
                    e.host &&
                      ('' === d[0] ? (d[0] = e.host) : d.unshift(e.host)),
                    (e.host = null)),
                  (w = w && ('' === d[0] || '' === I[0]))),
                b)
              )
                (r.host = e.host || '' === e.host ? e.host : r.host),
                  (r.hostname =
                    e.hostname || '' === e.hostname ? e.hostname : r.hostname),
                  (r.search = e.search),
                  (r.query = e.query),
                  (I = d);
              else if (d.length)
                I || (I = []),
                  I.pop(),
                  (I = I.concat(d)),
                  (r.search = e.search),
                  (r.query = e.query);
              else if (!o.isNullOrUndefined(e.search))
                return (
                  x &&
                    ((r.hostname = r.host = I.shift()),
                    (j =
                      !!(r.host && r.host.indexOf('@') > 0) &&
                      r.host.split('@')) &&
                      ((r.auth = j.shift()),
                      (r.host = r.hostname = j.shift()))),
                  (r.search = e.search),
                  (r.query = e.query),
                  (o.isNull(r.pathname) && o.isNull(r.search)) ||
                    (r.path =
                      (r.pathname ? r.pathname : '') +
                      (r.search ? r.search : '')),
                  (r.href = r.format()),
                  r
                );
              if (!I.length)
                return (
                  (r.pathname = null),
                  r.search ? (r.path = '/' + r.search) : (r.path = null),
                  (r.href = r.format()),
                  r
                );
              for (
                var E = I.slice(-1)[0],
                  P =
                    ((r.host || e.host || I.length > 1) &&
                      ('.' === E || '..' === E)) ||
                    '' === E,
                  R = 0,
                  A = I.length;
                A >= 0;
                A--
              )
                '.' === (E = I[A])
                  ? I.splice(A, 1)
                  : '..' === E
                  ? (I.splice(A, 1), R++)
                  : R && (I.splice(A, 1), R--);
              if (!w && !O) for (; R--; R) I.unshift('..');
              !w ||
                '' === I[0] ||
                (I[0] && '/' === I[0].charAt(0)) ||
                I.unshift(''),
                P && '/' !== I.join('/').substr(-1) && I.push('');
              var j,
                S = '' === I[0] || (I[0] && '/' === I[0].charAt(0));
              return (
                x &&
                  ((r.hostname = r.host = S ? '' : I.length ? I.shift() : ''),
                  (j =
                    !!(r.host && r.host.indexOf('@') > 0) &&
                    r.host.split('@')) &&
                    ((r.auth = j.shift()), (r.host = r.hostname = j.shift()))),
                (w = w || (r.host && I.length)) && !S && I.unshift(''),
                I.length
                  ? (r.pathname = I.join('/'))
                  : ((r.pathname = null), (r.path = null)),
                (o.isNull(r.pathname) && o.isNull(r.search)) ||
                  (r.path =
                    (r.pathname ? r.pathname : '') +
                    (r.search ? r.search : '')),
                (r.auth = e.auth || r.auth),
                (r.slashes = r.slashes || e.slashes),
                (r.href = r.format()),
                r
              );
            }),
            (s.prototype.parseHost = function () {
              var e = this.host,
                t = a.exec(e);
              t &&
                (':' !== (t = t[0]) && (this.port = t.substr(1)),
                (e = e.substr(0, e.length - t.length))),
                e && (this.hostname = e);
            });
        },
        2502: (e) => {
          'use strict';
          e.exports = {
            isString: function (e) {
              return 'string' == typeof e;
            },
            isObject: function (e) {
              return 'object' == typeof e && null !== e;
            },
            isNull: function (e) {
              return null === e;
            },
            isNullOrUndefined: function (e) {
              return null == e;
            },
          };
        },
      },
      t = {};
    function r(n) {
      var o = t[n];
      if (void 0 !== o) return o.exports;
      var s = (t[n] = { id: n, loaded: !1, exports: {} });
      return e[n].call(s.exports, s, s.exports, r), (s.loaded = !0), s.exports;
    }
    (r.d = (e, t) => {
      for (var n in t)
        r.o(t, n) &&
          !r.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
      (r.g = (function () {
        if ('object' == typeof globalThis) return globalThis;
        try {
          return this || new Function('return this')();
        } catch (e) {
          if ('object' == typeof window) return window;
        }
      })()),
      (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
      (r.r = (e) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (r.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e));
    var n = {};
    return (
      (() => {
        'use strict';
        r(5934);
      })(),
      n.default
    );
  })();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbWd1ci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vaW1ndXIvLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsIndlYnBhY2s6Ly9pbWd1ci8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIndlYnBhY2s6Ly9pbWd1ci8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovL2ltZ3VyLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovL2ltZ3VyLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9pbWd1ci8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovL2ltZ3VyLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovL2ltZ3VyLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly9pbWd1ci8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovL2ltZ3VyLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2ltZ3VyLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly9pbWd1ci8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovL2ltZ3VyLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyIsIndlYnBhY2s6Ly9pbWd1ci8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIndlYnBhY2s6Ly9pbWd1ci8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovL2ltZ3VyLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly9pbWd1ci8uL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovL2ltZ3VyLy4vbm9kZV9tb2R1bGVzL2Zvcm0tZGF0YS9saWIvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9pbWd1ci8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy9kZWNvZGUuanMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmcvZW5jb2RlLmpzIiwid2VicGFjazovL2ltZ3VyLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nL2luZGV4LmpzIiwid2VicGFjazovL2ltZ3VyLy4vc3JjL2FsYnVtL2dldEFsYnVtLnRzIiwid2VicGFjazovL2ltZ3VyLy4vc3JjL2FsYnVtL2luZGV4LnRzIiwid2VicGFjazovL2ltZ3VyLy4vc3JjL2NsaWVudC50cyIsIndlYnBhY2s6Ly9pbWd1ci8uL3NyYy9jb21tb24vZW5kcG9pbnRzLnRzIiwid2VicGFjazovL2ltZ3VyLy4vc3JjL2NvbW1vbi90eXBlcy50cyIsIndlYnBhY2s6Ly9pbWd1ci8uL3NyYy9jb21tb24vdXRpbHMudHMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9zcmMvZ2FsbGVyeS9nZXRHYWxsZXJ5LnRzIiwid2VicGFjazovL2ltZ3VyLy4vc3JjL2dhbGxlcnkvZ2V0U3VicmVkZGl0R2FsbGVyeS50cyIsIndlYnBhY2s6Ly9pbWd1ci8uL3NyYy9nYWxsZXJ5L2luZGV4LnRzIiwid2VicGFjazovL2ltZ3VyLy4vc3JjL2dhbGxlcnkvc2VhcmNoR2FsbGVyeS50cyIsIndlYnBhY2s6Ly9pbWd1ci8uL3NyYy9nZXRBdXRob3JpemF0aW9uSGVhZGVyLnRzIiwid2VicGFjazovL2ltZ3VyLy4vc3JjL2ltYWdlL2RlbGV0ZUltYWdlLnRzIiwid2VicGFjazovL2ltZ3VyLy4vc3JjL2ltYWdlL2Zhdm9yaXRlSW1hZ2UudHMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9zcmMvaW1hZ2UvZ2V0SW1hZ2UudHMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9zcmMvaW1hZ2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9zcmMvaW1hZ2UvdXBkYXRlSW1hZ2UudHMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9zcmMvaW1hZ2UvdXBsb2FkLnRzIiwid2VicGFjazovL2ltZ3VyLy4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIndlYnBhY2s6Ly9pbWd1ci8uL25vZGVfbW9kdWxlcy91cmwvbm9kZV9tb2R1bGVzL3B1bnljb2RlL3B1bnljb2RlLmpzIiwid2VicGFjazovL2ltZ3VyLy4vbm9kZV9tb2R1bGVzL3VybC91cmwuanMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9ub2RlX21vZHVsZXMvdXJsL3V0aWwuanMiLCJ3ZWJwYWNrOi8vaW1ndXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaW1ndXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2ltZ3VyL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vaW1ndXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9pbWd1ci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2ltZ3VyL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOlsicm9vdCIsImZhY3RvcnkiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwic2VsZiIsInV0aWxzIiwic2V0dGxlIiwiY29va2llcyIsImJ1aWxkVVJMIiwiYnVpbGRGdWxsUGF0aCIsInBhcnNlSGVhZGVycyIsImlzVVJMU2FtZU9yaWdpbiIsImNyZWF0ZUVycm9yIiwiY29uZmlnIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXF1ZXN0RGF0YSIsImRhdGEiLCJyZXF1ZXN0SGVhZGVycyIsImhlYWRlcnMiLCJpc0Zvcm1EYXRhIiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0IiwiYXV0aCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkF1dGhvcml6YXRpb24iLCJidG9hIiwiZnVsbFBhdGgiLCJiYXNlVVJMIiwidXJsIiwib3BlbiIsIm1ldGhvZCIsInRvVXBwZXJDYXNlIiwicGFyYW1zIiwicGFyYW1zU2VyaWFsaXplciIsInRpbWVvdXQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VVUkwiLCJpbmRleE9mIiwicmVzcG9uc2VIZWFkZXJzIiwiZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIiwicmVzcG9uc2UiLCJyZXNwb25zZVR5cGUiLCJyZXNwb25zZVRleHQiLCJzdGF0dXNUZXh0Iiwib25hYm9ydCIsIm9uZXJyb3IiLCJvbnRpbWVvdXQiLCJ0aW1lb3V0RXJyb3JNZXNzYWdlIiwiaXNTdGFuZGFyZEJyb3dzZXJFbnYiLCJ4c3JmVmFsdWUiLCJ3aXRoQ3JlZGVudGlhbHMiLCJ4c3JmQ29va2llTmFtZSIsInJlYWQiLCJ1bmRlZmluZWQiLCJ4c3JmSGVhZGVyTmFtZSIsImZvckVhY2giLCJ2YWwiLCJrZXkiLCJ0b0xvd2VyQ2FzZSIsInNldFJlcXVlc3RIZWFkZXIiLCJpc1VuZGVmaW5lZCIsImUiLCJvbkRvd25sb2FkUHJvZ3Jlc3MiLCJhZGRFdmVudExpc3RlbmVyIiwib25VcGxvYWRQcm9ncmVzcyIsInVwbG9hZCIsImNhbmNlbFRva2VuIiwicHJvbWlzZSIsInRoZW4iLCJjYW5jZWwiLCJhYm9ydCIsInNlbmQiLCJiaW5kIiwiQXhpb3MiLCJtZXJnZUNvbmZpZyIsImNyZWF0ZUluc3RhbmNlIiwiZGVmYXVsdENvbmZpZyIsImNvbnRleHQiLCJpbnN0YW5jZSIsInByb3RvdHlwZSIsImV4dGVuZCIsImF4aW9zIiwiY3JlYXRlIiwiaW5zdGFuY2VDb25maWciLCJkZWZhdWx0cyIsIkNhbmNlbCIsIkNhbmNlbFRva2VuIiwiaXNDYW5jZWwiLCJhbGwiLCJwcm9taXNlcyIsInNwcmVhZCIsImlzQXhpb3NFcnJvciIsImRlZmF1bHQiLCJtZXNzYWdlIiwidGhpcyIsInRvU3RyaW5nIiwiX19DQU5DRUxfXyIsImV4ZWN1dG9yIiwiVHlwZUVycm9yIiwicmVzb2x2ZVByb21pc2UiLCJ0b2tlbiIsInJlYXNvbiIsInRocm93SWZSZXF1ZXN0ZWQiLCJzb3VyY2UiLCJjIiwidmFsdWUiLCJJbnRlcmNlcHRvck1hbmFnZXIiLCJkaXNwYXRjaFJlcXVlc3QiLCJpbnRlcmNlcHRvcnMiLCJhcmd1bWVudHMiLCJjaGFpbiIsImludGVyY2VwdG9yIiwidW5zaGlmdCIsImZ1bGZpbGxlZCIsInJlamVjdGVkIiwicHVzaCIsImxlbmd0aCIsInNoaWZ0IiwiZ2V0VXJpIiwicmVwbGFjZSIsImhhbmRsZXJzIiwidXNlIiwiZWplY3QiLCJpZCIsImZuIiwiaCIsImlzQWJzb2x1dGVVUkwiLCJjb21iaW5lVVJMcyIsInJlcXVlc3RlZFVSTCIsImVuaGFuY2VFcnJvciIsImNvZGUiLCJlcnJvciIsIkVycm9yIiwidHJhbnNmb3JtRGF0YSIsInRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQiLCJ0cmFuc2Zvcm1SZXF1ZXN0IiwibWVyZ2UiLCJjb21tb24iLCJhZGFwdGVyIiwidHJhbnNmb3JtUmVzcG9uc2UiLCJ0b0pTT04iLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJudW1iZXIiLCJmaWxlTmFtZSIsImxpbmVOdW1iZXIiLCJjb2x1bW5OdW1iZXIiLCJzdGFjayIsImNvbmZpZzEiLCJjb25maWcyIiwidmFsdWVGcm9tQ29uZmlnMktleXMiLCJtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cyIsImRlZmF1bHRUb0NvbmZpZzJLZXlzIiwiZGlyZWN0TWVyZ2VLZXlzIiwiZ2V0TWVyZ2VkVmFsdWUiLCJ0YXJnZXQiLCJpc1BsYWluT2JqZWN0IiwiaXNBcnJheSIsInNsaWNlIiwibWVyZ2VEZWVwUHJvcGVydGllcyIsInByb3AiLCJheGlvc0tleXMiLCJjb25jYXQiLCJvdGhlcktleXMiLCJPYmplY3QiLCJrZXlzIiwiZmlsdGVyIiwidmFsaWRhdGVTdGF0dXMiLCJmbnMiLCJub3JtYWxpemVIZWFkZXJOYW1lIiwiREVGQVVMVF9DT05URU5UX1RZUEUiLCJzZXRDb250ZW50VHlwZUlmVW5zZXQiLCJwcm9jZXNzIiwiY2FsbCIsImlzQXJyYXlCdWZmZXIiLCJpc0J1ZmZlciIsImlzU3RyZWFtIiwiaXNGaWxlIiwiaXNCbG9iIiwiaXNBcnJheUJ1ZmZlclZpZXciLCJidWZmZXIiLCJpc1VSTFNlYXJjaFBhcmFtcyIsImlzT2JqZWN0IiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcnNlIiwibWF4Q29udGVudExlbmd0aCIsIm1heEJvZHlMZW5ndGgiLCJ0aGlzQXJnIiwiYXJncyIsIkFycmF5IiwiaSIsImFwcGx5IiwiZW5jb2RlIiwic2VyaWFsaXplZFBhcmFtcyIsInBhcnRzIiwidiIsImlzRGF0ZSIsInRvSVNPU3RyaW5nIiwiam9pbiIsImhhc2htYXJrSW5kZXgiLCJyZWxhdGl2ZVVSTCIsIndyaXRlIiwiZXhwaXJlcyIsInBhdGgiLCJkb21haW4iLCJzZWN1cmUiLCJjb29raWUiLCJpc051bWJlciIsIkRhdGUiLCJ0b0dNVFN0cmluZyIsImlzU3RyaW5nIiwiZG9jdW1lbnQiLCJtYXRjaCIsIlJlZ0V4cCIsImRlY29kZVVSSUNvbXBvbmVudCIsInJlbW92ZSIsIm5vdyIsInRlc3QiLCJwYXlsb2FkIiwib3JpZ2luVVJMIiwibXNpZSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInVybFBhcnNpbmdOb2RlIiwiY3JlYXRlRWxlbWVudCIsInJlc29sdmVVUkwiLCJocmVmIiwic2V0QXR0cmlidXRlIiwicHJvdG9jb2wiLCJob3N0Iiwic2VhcmNoIiwiaGFzaCIsImhvc3RuYW1lIiwicG9ydCIsInBhdGhuYW1lIiwiY2hhckF0Iiwid2luZG93IiwibG9jYXRpb24iLCJyZXF1ZXN0VVJMIiwicGFyc2VkIiwibm9ybWFsaXplZE5hbWUiLCJpZ25vcmVEdXBsaWNhdGVPZiIsInNwbGl0IiwibGluZSIsInRyaW0iLCJzdWJzdHIiLCJjYWxsYmFjayIsImFyciIsImdldFByb3RvdHlwZU9mIiwiaXNGdW5jdGlvbiIsIm9iaiIsImwiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbnN0cnVjdG9yIiwiRm9ybURhdGEiLCJBcnJheUJ1ZmZlciIsImlzVmlldyIsInBpcGUiLCJVUkxTZWFyY2hQYXJhbXMiLCJwcm9kdWN0IiwicmVzdWx0IiwiYXNzaWduVmFsdWUiLCJhIiwiYiIsInN0ciIsInN0cmlwQk9NIiwiY29udGVudCIsImNoYXJDb2RlQXQiLCJSZWZsZWN0T3duS2V5cyIsIlIiLCJSZWZsZWN0IiwiUmVmbGVjdEFwcGx5IiwicmVjZWl2ZXIiLCJGdW5jdGlvbiIsIm93bktleXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiTnVtYmVySXNOYU4iLCJOdW1iZXIiLCJpc05hTiIsIkV2ZW50RW1pdHRlciIsImluaXQiLCJvbmNlIiwiZW1pdHRlciIsImVycm9yTGlzdGVuZXIiLCJlcnIiLCJyZW1vdmVMaXN0ZW5lciIsInJlc29sdmVyIiwiZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyIiwiaGFuZGxlciIsImZsYWdzIiwib24iLCJhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlciIsIl9ldmVudHMiLCJfZXZlbnRzQ291bnQiLCJfbWF4TGlzdGVuZXJzIiwiZGVmYXVsdE1heExpc3RlbmVycyIsImNoZWNrTGlzdGVuZXIiLCJsaXN0ZW5lciIsIl9nZXRNYXhMaXN0ZW5lcnMiLCJ0aGF0IiwiX2FkZExpc3RlbmVyIiwidHlwZSIsInByZXBlbmQiLCJtIiwiZXZlbnRzIiwiZXhpc3RpbmciLCJ3YXJuaW5nIiwibmV3TGlzdGVuZXIiLCJlbWl0Iiwid2FybmVkIiwidyIsIlN0cmluZyIsImNvdW50IiwiY29uc29sZSIsIndhcm4iLCJvbmNlV3JhcHBlciIsImZpcmVkIiwid3JhcEZuIiwiX29uY2VXcmFwIiwic3RhdGUiLCJ3cmFwcGVkIiwiX2xpc3RlbmVycyIsInVud3JhcCIsImV2bGlzdGVuZXIiLCJyZXQiLCJ1bndyYXBMaXN0ZW5lcnMiLCJhcnJheUNsb25lIiwibGlzdGVuZXJDb3VudCIsIm4iLCJjb3B5Iiwid3JhcExpc3RlbmVyIiwiYXJnIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInNldCIsIlJhbmdlRXJyb3IiLCJzZXRNYXhMaXN0ZW5lcnMiLCJnZXRNYXhMaXN0ZW5lcnMiLCJkb0Vycm9yIiwiZXIiLCJsZW4iLCJsaXN0ZW5lcnMiLCJhZGRMaXN0ZW5lciIsInByZXBlbmRMaXN0ZW5lciIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJsaXN0IiwicG9zaXRpb24iLCJvcmlnaW5hbExpc3RlbmVyIiwiaW5kZXgiLCJwb3AiLCJzcGxpY2VPbmUiLCJvZmYiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJyYXdMaXN0ZW5lcnMiLCJldmVudE5hbWVzIiwicXMiLCJzZXAiLCJlcSIsIm9wdGlvbnMiLCJyZWdleHAiLCJtYXhLZXlzIiwia3N0ciIsInZzdHIiLCJrIiwieCIsImlkeCIsInN0cmluZ2lmeVByaW1pdGl2ZSIsImlzRmluaXRlIiwibWFwIiwia3MiLCJkZWNvZGUiLCJhc3luYyIsImNsaWVudCIsImFsYnVtSGFzaCIsIkFMQlVNX0VORFBPSU5UIiwiZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZSIsIlVTRVJBR0VOVCIsIkltZ3VyQ2xpZW50IiwiY3JlZGVudGlhbHMiLCJzdXBlciIsInBsYWluRmV0Y2hlciIsIklNR1VSX0FQSV9QUkVGSVgiLCJmZXRjaGVyIiwiYXV0aG9yaXphdGlvbiIsImdldEF1dGhvcml6YXRpb25IZWFkZXIiLCJpbWFnZUhhc2giLCJkZWxldGVJbWFnZSIsImZhdm9yaXRlSW1hZ2UiLCJnZXRBbGJ1bSIsImdldEdhbGxlcnkiLCJnZXRTdWJyZWRkaXRHYWxsZXJ5Iiwic2VhcmNoR2FsbGVyeSIsImdldEltYWdlIiwidXBkYXRlSW1hZ2UiLCJBUElfVkVSU0lPTiIsIkFVVEhPUklaRV9FTkRQT0lOVCIsIklNQUdFX0VORFBPSU5UIiwiVVBMT0FEX0VORFBPSU5UIiwiR0FMTEVSWV9FTkRQT0lOVCIsIlNVQlJFRERJVF9HQUxMRVJZX0VORFBPSU5UIiwiU0VBUkNIX0dBTExFUllfRU5EUE9JTlQiLCJhY2Nlc3NUb2tlbiIsImNsaWVudElkIiwiaXNCYXNlNjQiLCJiYXNlNjQiLCJzdHJlYW0iLCJpbWFnZSIsImZvcm0iLCJhcHBlbmQiLCJlbnRyaWVzIiwic3VwcG9ydGVkVXBsb2FkT2JqZWN0VHlwZXMiLCJzdWNjZXNzIiwiZGVmYXVsdE9wdGlvbnMiLCJzZWN0aW9uIiwic29ydCIsImNvbnN0cnVjdEdhbGxlcnlVcmwiLCJtZXJnZWRPcHRpb25zIiwiYXNzaWduIiwidXJpIiwicGFnZSIsIlVSTCIsInNob3dWaXJhbCIsInNlYXJjaFBhcmFtcyIsIm1hdHVyZSIsImFsYnVtX3ByZXZpZXdzIiwiZmluYWxQYXRobmFtZSIsImNvbnN0cnVjdFN1YnJlZGRpdEdhbGxlcnlVcmwiLCJzdWJyZWRkaXQiLCJhZHZhbmNlZFBhcmFtZXRlcnMiLCJjb25zdHJ1Y3RTZWFyY2hHYWxsZXJ5VXJsIiwicGFyYW0iLCJxdWVyeSIsInEiLCJpc0FjY2Vzc1Rva2VuIiwiaXNDbGllbnRJZCIsImlzTG9naW4iLCJjbGllbnRfaWQiLCJyZXNwb25zZV90eXBlIiwicGxhaW5SZXF1ZXN0IiwibWF0Y2hlcyIsImF1dGhvcml6ZVRva2VuIiwiYWxsb3ciLCJmb2xsb3dSZWRpcmVjdCIsImRlY29kZVVSSSIsImFjY2Vzc190b2tlbiIsImlzVmFsaWRVcGRhdGVQYXlsb2FkIiwicCIsInRpdGxlIiwiY3JlYXRlRm9ybSIsInByb2dyZXNzRXZlbnQiLCJsb2ciLCJleHRlbmRTdGF0aWNzIiwiZCIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiX19leHRlbmRzIiwiX18iLCJfX2Fzc2lnbiIsInQiLCJzIiwiX19yZXN0IiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJfX2RlY29yYXRlIiwiZGVjb3JhdG9ycyIsImRlc2MiLCJyIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZGVjb3JhdGUiLCJfX3BhcmFtIiwicGFyYW1JbmRleCIsImRlY29yYXRvciIsIl9fbWV0YWRhdGEiLCJtZXRhZGF0YUtleSIsIm1ldGFkYXRhVmFsdWUiLCJtZXRhZGF0YSIsIl9fYXdhaXRlciIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwic3RlcCIsIm5leHQiLCJkb25lIiwiX19nZW5lcmF0b3IiLCJib2R5IiwiZiIsInkiLCJnIiwiXyIsImxhYmVsIiwic2VudCIsInRyeXMiLCJvcHMiLCJ2ZXJiIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJvcCIsIl9fY3JlYXRlQmluZGluZyIsIm8iLCJrMiIsIl9fZXhwb3J0U3RhciIsIl9fdmFsdWVzIiwiX19yZWFkIiwiYXIiLCJfX3NwcmVhZCIsIl9fc3ByZWFkQXJyYXlzIiwiaWwiLCJqIiwiamwiLCJfX2F3YWl0IiwiX19hc3luY0dlbmVyYXRvciIsImFzeW5jSXRlcmF0b3IiLCJyZXN1bWUiLCJmdWxmaWxsIiwiX19hc3luY0RlbGVnYXRvciIsIl9fYXN5bmNWYWx1ZXMiLCJfX21ha2VUZW1wbGF0ZU9iamVjdCIsImNvb2tlZCIsInJhdyIsIl9faW1wb3J0U3RhciIsIm1vZCIsIl9fZXNNb2R1bGUiLCJfX2ltcG9ydERlZmF1bHQiLCJfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0IiwicHJpdmF0ZU1hcCIsImhhcyIsIl9fY2xhc3NQcml2YXRlRmllbGRTZXQiLCJub2RlVHlwZSIsImZyZWVHbG9iYWwiLCJnbG9iYWwiLCJwdW55Y29kZSIsIm1heEludCIsImJhc2UiLCJyZWdleFB1bnljb2RlIiwicmVnZXhOb25BU0NJSSIsInJlZ2V4U2VwYXJhdG9ycyIsImVycm9ycyIsImZsb29yIiwiTWF0aCIsInN0cmluZ0Zyb21DaGFyQ29kZSIsImZyb21DaGFyQ29kZSIsImFycmF5IiwibWFwRG9tYWluIiwic3RyaW5nIiwidWNzMmRlY29kZSIsImV4dHJhIiwib3V0cHV0IiwiY291bnRlciIsInVjczJlbmNvZGUiLCJkaWdpdFRvQmFzaWMiLCJkaWdpdCIsImZsYWciLCJhZGFwdCIsImRlbHRhIiwibnVtUG9pbnRzIiwiZmlyc3RUaW1lIiwiYmFzZU1pbnVzVE1pbiIsImlucHV0Iiwib3V0IiwiYmFzaWMiLCJvbGRpIiwiYmFzZU1pbnVzVCIsImNvZGVQb2ludCIsImlucHV0TGVuZ3RoIiwiYmlhcyIsImxhc3RJbmRleE9mIiwic3BsaWNlIiwiaGFuZGxlZENQQ291bnQiLCJiYXNpY0xlbmd0aCIsImN1cnJlbnRWYWx1ZSIsImhhbmRsZWRDUENvdW50UGx1c09uZSIsInFNaW51c1QiLCJ1dGlsIiwiVXJsIiwic2xhc2hlcyIsInVybFBhcnNlIiwicmVsYXRpdmUiLCJyZXNvbHZlT2JqZWN0IiwiZm9ybWF0IiwicHJvdG9jb2xQYXR0ZXJuIiwicG9ydFBhdHRlcm4iLCJzaW1wbGVQYXRoUGF0dGVybiIsInVud2lzZSIsImF1dG9Fc2NhcGUiLCJub25Ib3N0Q2hhcnMiLCJob3N0RW5kaW5nQ2hhcnMiLCJob3N0bmFtZVBhcnRQYXR0ZXJuIiwiaG9zdG5hbWVQYXJ0U3RhcnQiLCJ1bnNhZmVQcm90b2NvbCIsImhvc3RsZXNzUHJvdG9jb2wiLCJzbGFzaGVkUHJvdG9jb2wiLCJxdWVyeXN0cmluZyIsInBhcnNlUXVlcnlTdHJpbmciLCJzbGFzaGVzRGVub3RlSG9zdCIsInUiLCJxdWVyeUluZGV4Iiwic3BsaXR0ZXIiLCJ1U3BsaXQiLCJyZXN0Iiwic2ltcGxlUGF0aCIsImV4ZWMiLCJwcm90byIsImxvd2VyUHJvdG8iLCJhdFNpZ24iLCJob3N0RW5kIiwiaGVjIiwicGFyc2VIb3N0IiwiaXB2Nkhvc3RuYW1lIiwiaG9zdHBhcnRzIiwicGFydCIsIm5ld3BhcnQiLCJ2YWxpZFBhcnRzIiwibm90SG9zdCIsImJpdCIsInRvQVNDSUkiLCJhZSIsImVzYyIsImVzY2FwZSIsInFtIiwicmVsIiwidGtleXMiLCJ0ayIsInRrZXkiLCJya2V5cyIsInJrIiwicmtleSIsInJlbFBhdGgiLCJpc1NvdXJjZUFicyIsImlzUmVsQWJzIiwibXVzdEVuZEFicyIsInJlbW92ZUFsbERvdHMiLCJzcmNQYXRoIiwicHN5Y2hvdGljIiwiaXNOdWxsT3JVbmRlZmluZWQiLCJhdXRoSW5Ib3N0IiwiaXNOdWxsIiwibGFzdCIsImhhc1RyYWlsaW5nU2xhc2giLCJ1cCIsImlzQWJzb2x1dGUiLCJfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJjYWNoZWRNb2R1bGUiLCJsb2FkZWQiLCJfX3dlYnBhY2tfbW9kdWxlc19fIiwiZGVmaW5pdGlvbiIsImdsb2JhbFRoaXMiLCJ0b1N0cmluZ1RhZyIsIm5tZCIsInBhdGhzIiwiY2hpbGRyZW4iXSwibWFwcGluZ3MiOiI7Q0FBQSxTQUEyQ0EsRUFBTUMsR0FDMUIsaUJBQVpDLFNBQTBDLGlCQUFYQyxPQUN4Q0EsT0FBT0QsUUFBVUQsSUFDUSxtQkFBWEcsUUFBeUJBLE9BQU9DLElBQzlDRCxPQUFPLFFBQVMsR0FBSUgsR0FDTSxpQkFBWkMsUUFDZEEsUUFBZSxNQUFJRCxJQUVuQkQsRUFBWSxNQUFJQyxJQVJsQixDQVNHSyxNQUFNLFdBQ1QsTSw0QkNWQUgsRUFBT0QsUUFBVSxFQUFqQixPLDRCQ0VBLElBQUlLLEVBQVEsRUFBUSxNQUNoQkMsRUFBUyxFQUFRLE1BQ2pCQyxFQUFVLEVBQVEsTUFDbEJDLEVBQVcsRUFBUSxNQUNuQkMsRUFBZ0IsRUFBUSxNQUN4QkMsRUFBZSxFQUFRLE1BQ3ZCQyxFQUFrQixFQUFRLE1BQzFCQyxFQUFjLEVBQVEsTUFFMUJYLEVBQU9ELFFBQVUsU0FBb0JhLEdBQ25DLE9BQU8sSUFBSUMsU0FBUSxTQUE0QkMsRUFBU0MsR0FDdEQsSUFBSUMsRUFBY0osRUFBT0ssS0FDckJDLEVBQWlCTixFQUFPTyxRQUV4QmYsRUFBTWdCLFdBQVdKLFdBQ1pFLEVBQWUsZ0JBR3hCLElBQUlHLEVBQVUsSUFBSUMsZUFHbEIsR0FBSVYsRUFBT1csS0FBTSxDQUNmLElB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T3JOLEdBQ1IsR0FBc0IsaUJBQVhnTCxPQUFxQixPQUFPQSxRQUxqQixHQ0F4QnVaLEVBQW9CL0ksRUFBSSxDQUFDMVAsRUFBSzNGLElBQVVJLE9BQU9yRixVQUFVOEssZUFBZWhGLEtBQUs4RSxFQUFLM0YsR0NDbEZvZSxFQUFvQi9LLEVBQUs1ZCxJQUNILG9CQUFYd2YsUUFBMEJBLE9BQU8wSixhQUMxQ3ZlLE9BQU8ySyxlQUFldFYsRUFBU3dmLE9BQU8wSixZQUFhLENBQUVsaUIsTUFBTyxXQUU3RDJELE9BQU8ySyxlQUFldFYsRUFBUyxhQUFjLENBQUVnSCxPQUFPLEtDTHZEMmhCLEVBQW9CUSxJQUFPbHBCLElBQzFCQSxFQUFPbXBCLE1BQVEsR0FDVm5wQixFQUFPb3BCLFdBQVVwcEIsRUFBT29wQixTQUFXLElBQ2pDcHBCLEcsa0NDSFIsUyIsImZpbGUiOiJpbWd1ci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiaW1ndXJcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiaW1ndXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiaW1ndXJcIl0gPSBmYWN0b3J5KCk7XG59KShzZWxmLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkID8gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGNvbmZpZy5hdXRoLnBhc3N3b3JkKSkgOiAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgdmFyIGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgdmFyIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSAndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnO1xuICAgICAgaWYgKGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcih0aW1lb3V0RXJyb3JNZXNzYWdlLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghcmVxdWVzdERhdGEpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhheGlvcy5kZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbi8vIEV4cG9zZSBpc0F4aW9zRXJyb3JcbmF4aW9zLmlzQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4vaGVscGVycy9pc0F4aW9zRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vbWVyZ2VDb25maWcnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcbiAgICBjb25maWcudXJsID0gYXJndW1lbnRzWzBdO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgfVxuXG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgLy8gU2V0IGNvbmZpZy5tZXRob2RcbiAgaWYgKGNvbmZpZy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2UgaWYgKHRoaXMuZGVmYXVsdHMubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IHRoaXMuZGVmYXVsdHMubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnLm1ldGhvZCA9ICdnZXQnO1xuICB9XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbkF4aW9zLnByb3RvdHlwZS5nZXRVcmkgPSBmdW5jdGlvbiBnZXRVcmkoY29uZmlnKSB7XG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIHJldHVybiBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcikucmVwbGFjZSgvXlxcPy8sICcnKTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IChjb25maWcgfHwge30pLmRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBmdWxsIHBhdGhcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNcbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuXG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICBlcnJvci5pc0F4aW9zRXJyb3IgPSB0cnVlO1xuXG4gIGVycm9yLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZVxuICAgIH07XG4gIH07XG4gIHJldHVybiBlcnJvcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICB2YXIgY29uZmlnID0ge307XG5cbiAgdmFyIHZhbHVlRnJvbUNvbmZpZzJLZXlzID0gWyd1cmwnLCAnbWV0aG9kJywgJ2RhdGEnXTtcbiAgdmFyIG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzID0gWydoZWFkZXJzJywgJ2F1dGgnLCAncHJveHknLCAncGFyYW1zJ107XG4gIHZhciBkZWZhdWx0VG9Db25maWcyS2V5cyA9IFtcbiAgICAnYmFzZVVSTCcsICd0cmFuc2Zvcm1SZXF1ZXN0JywgJ3RyYW5zZm9ybVJlc3BvbnNlJywgJ3BhcmFtc1NlcmlhbGl6ZXInLFxuICAgICd0aW1lb3V0JywgJ3RpbWVvdXRNZXNzYWdlJywgJ3dpdGhDcmVkZW50aWFscycsICdhZGFwdGVyJywgJ3Jlc3BvbnNlVHlwZScsICd4c3JmQ29va2llTmFtZScsXG4gICAgJ3hzcmZIZWFkZXJOYW1lJywgJ29uVXBsb2FkUHJvZ3Jlc3MnLCAnb25Eb3dubG9hZFByb2dyZXNzJywgJ2RlY29tcHJlc3MnLFxuICAgICdtYXhDb250ZW50TGVuZ3RoJywgJ21heEJvZHlMZW5ndGgnLCAnbWF4UmVkaXJlY3RzJywgJ3RyYW5zcG9ydCcsICdodHRwQWdlbnQnLFxuICAgICdodHRwc0FnZW50JywgJ2NhbmNlbFRva2VuJywgJ3NvY2tldFBhdGgnLCAncmVzcG9uc2VFbmNvZGluZydcbiAgXTtcbiAgdmFyIGRpcmVjdE1lcmdlS2V5cyA9IFsndmFsaWRhdGVTdGF0dXMnXTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSkge1xuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2UodGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfVxuXG4gIHV0aWxzLmZvckVhY2godmFsdWVGcm9tQ29uZmlnMktleXMsIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMltwcm9wXSk7XG4gICAgfVxuICB9KTtcblxuICB1dGlscy5mb3JFYWNoKG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzLCBtZXJnZURlZXBQcm9wZXJ0aWVzKTtcblxuICB1dGlscy5mb3JFYWNoKGRlZmF1bHRUb0NvbmZpZzJLZXlzLCBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChkaXJlY3RNZXJnZUtleXMsIGZ1bmN0aW9uIG1lcmdlKHByb3ApIHtcbiAgICBpZiAocHJvcCBpbiBjb25maWcyKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBheGlvc0tleXMgPSB2YWx1ZUZyb21Db25maWcyS2V5c1xuICAgIC5jb25jYXQobWVyZ2VEZWVwUHJvcGVydGllc0tleXMpXG4gICAgLmNvbmNhdChkZWZhdWx0VG9Db25maWcyS2V5cylcbiAgICAuY29uY2F0KGRpcmVjdE1lcmdlS2V5cyk7XG5cbiAgdmFyIG90aGVyS2V5cyA9IE9iamVjdFxuICAgIC5rZXlzKGNvbmZpZzEpXG4gICAgLmNvbmNhdChPYmplY3Qua2V5cyhjb25maWcyKSlcbiAgICAuZmlsdGVyKGZ1bmN0aW9uIGZpbHRlckF4aW9zS2V5cyhrZXkpIHtcbiAgICAgIHJldHVybiBheGlvc0tleXMuaW5kZXhPZihrZXkpID09PSAtMTtcbiAgICB9KTtcblxuICB1dGlscy5mb3JFYWNoKG90aGVyS2V5cywgbWVyZ2VEZWVwUHJvcGVydGllcyk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQWNjZXB0Jyk7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgLyogSWdub3JlICovIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICBtYXhCb2R5TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB2YXIgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKCcjJyk7XG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuXG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3NcbiAqXG4gKiBAcGFyYW0geyp9IHBheWxvYWQgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBeGlvc0Vycm9yKHBheWxvYWQpIHtcbiAgcmV0dXJuICh0eXBlb2YgcGF5bG9hZCA9PT0gJ29iamVjdCcpICYmIChwYXlsb2FkLmlzQXhpb3NFcnJvciA9PT0gdHJ1ZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKVxuICAgICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWwpIHtcbiAgaWYgKHRvU3RyaW5nLmNhbGwodmFsKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbCk7XG4gIHJldHVybiBwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHJlc3VsdFtrZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICogQHJldHVybiB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmZ1bmN0aW9uIHN0cmlwQk9NKGNvbnRlbnQpIHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdDogaXNQbGFpbk9iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltLFxuICBzdHJpcEJPTTogc3RyaXBCT01cbn07XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xubW9kdWxlLmV4cG9ydHMub25jZSA9IG9uY2U7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBvbmNlKGVtaXR0ZXIsIG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmdW5jdGlvbiBlcnJvckxpc3RlbmVyKGVycikge1xuICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCByZXNvbHZlcik7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNvbHZlcigpIHtcbiAgICAgIGlmICh0eXBlb2YgZW1pdHRlci5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGVycm9yTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgcmVzb2x2ZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICBpZiAobmFtZSAhPT0gJ2Vycm9yJykge1xuICAgICAgYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgZXJyb3JMaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGhhbmRsZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCAnZXJyb3InLCBoYW5kbGVyLCBmbGFncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIGxpc3RlbmVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgZW1pdHRlci5vbmNlKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW1pdHRlci5vbihuYW1lLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBFdmVudFRhcmdldCBkb2VzIG5vdCBoYXZlIGBlcnJvcmAgZXZlbnQgc2VtYW50aWNzIGxpa2UgTm9kZVxuICAgIC8vIEV2ZW50RW1pdHRlcnMsIHdlIGRvIG5vdCBsaXN0ZW4gZm9yIGBlcnJvcmAgZXZlbnRzIGhlcmUuXG4gICAgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmN0aW9uIHdyYXBMaXN0ZW5lcihhcmcpIHtcbiAgICAgIC8vIElFIGRvZXMgbm90IGhhdmUgYnVpbHRpbiBgeyBvbmNlOiB0cnVlIH1gIHN1cHBvcnQgc28gd2VcbiAgICAgIC8vIGhhdmUgdG8gZG8gaXQgbWFudWFsbHkuXG4gICAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgd3JhcExpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIGxpc3RlbmVyKGFyZyk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwiZW1pdHRlclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBFdmVudEVtaXR0ZXIuIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBlbWl0dGVyKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWVudiBicm93c2VyICovXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnID8gc2VsZi5Gb3JtRGF0YSA6IHdpbmRvdy5Gb3JtRGF0YTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8vIElmIG9iai5oYXNPd25Qcm9wZXJ0eSBoYXMgYmVlbiBvdmVycmlkZGVuLCB0aGVuIGNhbGxpbmdcbi8vIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSB3aWxsIGJyZWFrLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvaXNzdWVzLzE3MDdcbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocXMsIHNlcCwgZXEsIG9wdGlvbnMpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIHZhciBvYmogPSB7fTtcblxuICBpZiAodHlwZW9mIHFzICE9PSAnc3RyaW5nJyB8fCBxcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdmFyIHJlZ2V4cCA9IC9cXCsvZztcbiAgcXMgPSBxcy5zcGxpdChzZXApO1xuXG4gIHZhciBtYXhLZXlzID0gMTAwMDtcbiAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMubWF4S2V5cyA9PT0gJ251bWJlcicpIHtcbiAgICBtYXhLZXlzID0gb3B0aW9ucy5tYXhLZXlzO1xuICB9XG5cbiAgdmFyIGxlbiA9IHFzLmxlbmd0aDtcbiAgLy8gbWF4S2V5cyA8PSAwIG1lYW5zIHRoYXQgd2Ugc2hvdWxkIG5vdCBsaW1pdCBrZXlzIGNvdW50XG4gIGlmIChtYXhLZXlzID4gMCAmJiBsZW4gPiBtYXhLZXlzKSB7XG4gICAgbGVuID0gbWF4S2V5cztcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICB2YXIgeCA9IHFzW2ldLnJlcGxhY2UocmVnZXhwLCAnJTIwJyksXG4gICAgICAgIGlkeCA9IHguaW5kZXhPZihlcSksXG4gICAgICAgIGtzdHIsIHZzdHIsIGssIHY7XG5cbiAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgIGtzdHIgPSB4LnN1YnN0cigwLCBpZHgpO1xuICAgICAgdnN0ciA9IHguc3Vic3RyKGlkeCArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrc3RyID0geDtcbiAgICAgIHZzdHIgPSAnJztcbiAgICB9XG5cbiAgICBrID0gZGVjb2RlVVJJQ29tcG9uZW50KGtzdHIpO1xuICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQodnN0cik7XG5cbiAgICBpZiAoIWhhc093blByb3BlcnR5KG9iaiwgaykpIHtcbiAgICAgIG9ialtrXSA9IHY7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9ialtrXSkpIHtcbiAgICAgIG9ialtrXS5wdXNoKHYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba10gPSBbb2JqW2tdLCB2XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnlQcmltaXRpdmUgPSBmdW5jdGlvbih2KSB7XG4gIHN3aXRjaCAodHlwZW9mIHYpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHY7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiB2ID8gJ3RydWUnIDogJ2ZhbHNlJztcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gaXNGaW5pdGUodikgPyB2IDogJyc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgc2VwLCBlcSwgbmFtZSkge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgIG9iaiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChmdW5jdGlvbihrKSB7XG4gICAgICB2YXIga3MgPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKGspKSArIGVxO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgICByZXR1cm4gb2JqW2tdLm1hcChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZSh2KSk7XG4gICAgICAgIH0pLmpvaW4oc2VwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqW2tdKSk7XG4gICAgICB9XG4gICAgfSkuam9pbihzZXApO1xuXG4gIH1cblxuICBpZiAoIW5hbWUpIHJldHVybiAnJztcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUobmFtZSkpICsgZXEgK1xuICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmopKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG5leHBvcnRzLmVuY29kZSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcbiIsImltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7IEFMQlVNX0VORFBPSU5UIH0gZnJvbSAnLi4vY29tbW9uL2VuZHBvaW50cyc7XG5pbXBvcnQgeyBJbWd1ckFwaVJlc3BvbnNlLCBBbGJ1bURhdGEgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHsgZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBbGJ1bShcbiAgY2xpZW50OiBJbWd1ckNsaWVudCxcbiAgYWxidW1IYXNoOiBzdHJpbmdcbik6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxBbGJ1bURhdGE+PiB7XG4gIGNvbnN0IHVybCA9IGAke0FMQlVNX0VORFBPSU5UfS8ke2FsYnVtSGFzaH1gO1xuICByZXR1cm4gZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZShcbiAgICBhd2FpdCBjbGllbnQucmVxdWVzdCh7IHVybCB9KVxuICApIGFzIEltZ3VyQXBpUmVzcG9uc2U8QWxidW1EYXRhPjtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vZ2V0QWxidW0nO1xuIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCB7IGdldEF1dGhvcml6YXRpb25IZWFkZXIgfSBmcm9tICcuL2dldEF1dGhvcml6YXRpb25IZWFkZXInO1xuaW1wb3J0IHtcbiAgZGVsZXRlSW1hZ2UsXG4gIGZhdm9yaXRlSW1hZ2UsXG4gIGdldEltYWdlLFxuICB1cGxvYWQsXG4gIHVwZGF0ZUltYWdlLFxuICBVcGRhdGVJbWFnZVBheWxvYWQsXG59IGZyb20gJy4vaW1hZ2UnO1xuaW1wb3J0IHtcbiAgR2FsbGVyeU9wdGlvbnMsXG4gIGdldEdhbGxlcnksXG4gIGdldFN1YnJlZGRpdEdhbGxlcnksXG4gIFN1YnJlZGRpdEdhbGxlcnlPcHRpb25zLFxuICBzZWFyY2hHYWxsZXJ5LFxuICBTZWFyY2hHYWxsZXJ5T3B0aW9ucyxcbn0gZnJvbSAnLi9nYWxsZXJ5JztcbmltcG9ydCB7IGdldEFsYnVtIH0gZnJvbSAnLi9hbGJ1bSc7XG5pbXBvcnQgeyBJTUdVUl9BUElfUFJFRklYIH0gZnJvbSAnLi9jb21tb24vZW5kcG9pbnRzJztcbmltcG9ydCB7XG4gIEFsYnVtRGF0YSxcbiAgQ3JlZGVudGlhbHMsXG4gIEdhbGxlcnlEYXRhLFxuICBJbWFnZURhdGEsXG4gIEltZ3VyQXBpUmVzcG9uc2UsXG4gIFBheWxvYWQsXG59IGZyb20gJy4vY29tbW9uL3R5cGVzJztcblxuY29uc3QgVVNFUkFHRU5UID0gJ2ltZ3VyL25leHQgKGh0dHBzOi8vZ2l0aHViLmNvbS9rYWltYWxsZWEvbm9kZS1pbWd1ciknO1xuXG5pbXBvcnQgYXhpb3MsIHsgQXhpb3NJbnN0YW5jZSwgQXhpb3NSZXNwb25zZSwgQXhpb3NSZXF1ZXN0Q29uZmlnIH0gZnJvbSAnYXhpb3MnO1xuXG5leHBvcnQgdHlwZSB7IENyZWRlbnRpYWxzIGFzIEltZ3VyQ3JlZGVudGlhbHMgfTtcbmV4cG9ydCBjbGFzcyBJbWd1ckNsaWVudCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIHByaXZhdGUgcGxhaW5GZXRjaGVyOiBBeGlvc0luc3RhbmNlO1xuICBwcml2YXRlIGZldGNoZXI6IEF4aW9zSW5zdGFuY2U7XG5cbiAgY29uc3RydWN0b3IocmVhZG9ubHkgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucGxhaW5GZXRjaGVyID0gYXhpb3MuY3JlYXRlKHtcbiAgICAgIGJhc2VVUkw6IElNR1VSX0FQSV9QUkVGSVgsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICd1c2VyLWFnZW50JzogVVNFUkFHRU5ULFxuICAgICAgfSxcbiAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuICAgIH0pO1xuICAgIHRoaXMuZmV0Y2hlciA9IGF4aW9zLmNyZWF0ZSh7XG4gICAgICBiYXNlVVJMOiBJTUdVUl9BUElfUFJFRklYLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAndXNlci1hZ2VudCc6IFVTRVJBR0VOVCxcbiAgICAgIH0sXG4gICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICB9KTtcbiAgICB0aGlzLmZldGNoZXIuaW50ZXJjZXB0b3JzLnJlcXVlc3QudXNlKFxuICAgICAgYXN5bmMgKGNvbmZpZzogQXhpb3NSZXF1ZXN0Q29uZmlnKSA9PiB7XG4gICAgICAgIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgPyBjb25maWcuaGVhZGVycyA6IHt9O1xuICAgICAgICBjb25maWcuaGVhZGVycy5hdXRob3JpemF0aW9uID0gYXdhaXQgZ2V0QXV0aG9yaXphdGlvbkhlYWRlcih0aGlzKTtcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgIH0sXG4gICAgICAoZTogRXJyb3IpID0+IFByb21pc2UucmVqZWN0KGUpXG4gICAgKTtcbiAgfVxuXG4gIHBsYWluUmVxdWVzdChvcHRpb25zOiBBeGlvc1JlcXVlc3RDb25maWcpOiBQcm9taXNlPEF4aW9zUmVzcG9uc2U8dW5rbm93bj4+IHtcbiAgICByZXR1cm4gdGhpcy5wbGFpbkZldGNoZXIob3B0aW9ucyk7XG4gIH1cblxuICByZXF1ZXN0KG9wdGlvbnM6IEF4aW9zUmVxdWVzdENvbmZpZyA9IHt9KTogUHJvbWlzZTxBeGlvc1Jlc3BvbnNlPHVua25vd24+PiB7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hlcihvcHRpb25zKTtcbiAgfVxuXG4gIGRlbGV0ZUltYWdlKGltYWdlSGFzaDogc3RyaW5nKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPGJvb2xlYW4+PiB7XG4gICAgcmV0dXJuIGRlbGV0ZUltYWdlKHRoaXMsIGltYWdlSGFzaCk7XG4gIH1cblxuICBmYXZvcml0ZUltYWdlKGltYWdlSGFzaDogc3RyaW5nKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPHN0cmluZz4+IHtcbiAgICByZXR1cm4gZmF2b3JpdGVJbWFnZSh0aGlzLCBpbWFnZUhhc2gpO1xuICB9XG5cbiAgZ2V0QWxidW0oYWxidW1IYXNoOiBzdHJpbmcpOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8QWxidW1EYXRhPj4ge1xuICAgIHJldHVybiBnZXRBbGJ1bSh0aGlzLCBhbGJ1bUhhc2gpO1xuICB9XG5cbiAgZ2V0R2FsbGVyeShvcHRpb25zOiBHYWxsZXJ5T3B0aW9ucyk6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxHYWxsZXJ5RGF0YT4+IHtcbiAgICByZXR1cm4gZ2V0R2FsbGVyeSh0aGlzLCBvcHRpb25zKTtcbiAgfVxuXG4gIGdldFN1YnJlZGRpdEdhbGxlcnkoXG4gICAgb3B0aW9uczogU3VicmVkZGl0R2FsbGVyeU9wdGlvbnNcbiAgKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPEdhbGxlcnlEYXRhPj4ge1xuICAgIHJldHVybiBnZXRTdWJyZWRkaXRHYWxsZXJ5KHRoaXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgc2VhcmNoR2FsbGVyeShcbiAgICBvcHRpb25zOiBTZWFyY2hHYWxsZXJ5T3B0aW9uc1xuICApOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8R2FsbGVyeURhdGE+PiB7XG4gICAgcmV0dXJuIHNlYXJjaEdhbGxlcnkodGhpcywgb3B0aW9ucyk7XG4gIH1cblxuICBnZXRJbWFnZShpbWFnZUhhc2g6IHN0cmluZyk6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxJbWFnZURhdGE+PiB7XG4gICAgcmV0dXJuIGdldEltYWdlKHRoaXMsIGltYWdlSGFzaCk7XG4gIH1cblxuICB1cGRhdGVJbWFnZShcbiAgICBwYXlsb2FkOiBVcGRhdGVJbWFnZVBheWxvYWQgfCBVcGRhdGVJbWFnZVBheWxvYWRbXVxuICApOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8Ym9vbGVhbj4gfCBJbWd1ckFwaVJlc3BvbnNlPGJvb2xlYW4+W10+IHtcbiAgICByZXR1cm4gdXBkYXRlSW1hZ2UodGhpcywgcGF5bG9hZCk7XG4gIH1cblxuICB1cGxvYWQoXG4gICAgcGF5bG9hZDogc3RyaW5nIHwgc3RyaW5nW10gfCBQYXlsb2FkIHwgUGF5bG9hZFtdXG4gICk6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxJbWFnZURhdGE+IHwgSW1ndXJBcGlSZXNwb25zZTxJbWFnZURhdGE+W10+IHtcbiAgICByZXR1cm4gdXBsb2FkKHRoaXMsIHBheWxvYWQpO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgSU1HVVJfQVBJX1BSRUZJWCA9ICdodHRwczovL2FwaS5pbWd1ci5jb20nO1xuXG5leHBvcnQgY29uc3QgQVBJX1ZFUlNJT04gPSAnMyc7XG5cbmV4cG9ydCBjb25zdCBBVVRIT1JJWkVfRU5EUE9JTlQgPSAnb2F1dGgyL2F1dGhvcml6ZSc7XG5cbmV4cG9ydCBjb25zdCBBTEJVTV9FTkRQT0lOVCA9IGAke0FQSV9WRVJTSU9OfS9hbGJ1bWA7XG5cbmV4cG9ydCBjb25zdCBJTUFHRV9FTkRQT0lOVCA9IGAke0FQSV9WRVJTSU9OfS9pbWFnZWA7XG5cbmV4cG9ydCBjb25zdCBVUExPQURfRU5EUE9JTlQgPSBgJHtBUElfVkVSU0lPTn0vdXBsb2FkYDtcblxuZXhwb3J0IGNvbnN0IEdBTExFUllfRU5EUE9JTlQgPSBgJHtBUElfVkVSU0lPTn0vZ2FsbGVyeWA7XG5cbmV4cG9ydCBjb25zdCBTVUJSRURESVRfR0FMTEVSWV9FTkRQT0lOVCA9IGAke0FQSV9WRVJTSU9OfS9nYWxsZXJ5L3JgO1xuXG5leHBvcnQgY29uc3QgU0VBUkNIX0dBTExFUllfRU5EUE9JTlQgPSBgJHtBUElfVkVSU0lPTn0vZ2FsbGVyeS9zZWFyY2hgO1xuIiwiaW1wb3J0IHsgUmVhZGFibGUgfSBmcm9tICdzdHJlYW0nO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjY2Vzc1Rva2VuIHtcbiAgYWNjZXNzVG9rZW46IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDbGllbnRJZCB7XG4gIGNsaWVudElkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9naW4gZXh0ZW5kcyBDbGllbnRJZCB7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIHBhc3N3b3JkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIENyZWRlbnRpYWxzID0gQWNjZXNzVG9rZW4gfCBDbGllbnRJZCB8IExvZ2luO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNBY2Nlc3NUb2tlbihhcmc6IHVua25vd24pOiBhcmcgaXMgQWNjZXNzVG9rZW4ge1xuICByZXR1cm4gKGFyZyBhcyBBY2Nlc3NUb2tlbikuYWNjZXNzVG9rZW4gIT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2xpZW50SWQoYXJnOiB1bmtub3duKTogYXJnIGlzIENsaWVudElkIHtcbiAgcmV0dXJuIChhcmcgYXMgQ2xpZW50SWQpLmNsaWVudElkICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xvZ2luKGFyZzogdW5rbm93bik6IGFyZyBpcyBMb2dpbiB7XG4gIHJldHVybiAoXG4gICAgKGFyZyBhcyBMb2dpbikuY2xpZW50SWQgIT09IHVuZGVmaW5lZCAmJlxuICAgIChhcmcgYXMgTG9naW4pLnVzZXJuYW1lICE9PSB1bmRlZmluZWQgJiZcbiAgICAoYXJnIGFzIExvZ2luKS5wYXNzd29yZCAhPT0gdW5kZWZpbmVkXG4gICk7XG59XG5cbmludGVyZmFjZSBDb21tb25EYXRhIHtcbiAgaWQ6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZyB8IG51bGw7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmcgfCBudWxsO1xuICBkYXRldGltZTogbnVtYmVyO1xuICBsaW5rOiBzdHJpbmc7XG5cbiAgYWRfY29uZmlnPzoge1xuICAgIHNhZmVGbGFnczogc3RyaW5nW107XG4gICAgaGlnaFJpc2tGbGFnczogc3RyaW5nW107XG4gICAgdW5zYWZlRmxhZ3M6IHN0cmluZ1tdO1xuICAgIHdhbGxVbnNhZmVGbGFnczogc3RyaW5nW107XG4gICAgc2hvd3NBZHM6IGJvb2xlYW47XG4gIH07XG4gIGFkX3R5cGU6IG51bWJlcjtcbiAgYWRfdXJsOiBzdHJpbmc7XG5cbiAgYWNjb3VudF91cmw6IHN0cmluZyB8IG51bGw7XG4gIGFjY291bnRfaWQ6IHN0cmluZyB8IG51bGw7XG4gIGZhdm9yaXRlOiBib29sZWFuO1xuICBpc19hZDogYm9vbGVhbjtcbiAgaXNfYWxidW06IGJvb2xlYW47XG4gIGluX2dhbGxlcnk6IGJvb2xlYW47XG4gIGluX21vc3RfdmlyYWw6IGJvb2xlYW47XG4gIG5zZnc6IGJvb2xlYW4gfCBudWxsO1xuICBzZWN0aW9uOiBzdHJpbmcgfCBudWxsO1xuICB0YWdzOiBBcnJheTx7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRpc3BsYXlfbmFtZTogc3RyaW5nO1xuICAgIGZvbGxvd2VyczogbnVtYmVyO1xuICAgIHRvdGFsX2l0ZW1zOiBudW1iZXI7XG4gICAgZm9sbG93aW5nOiBib29sZWFuO1xuICAgIGlzX3doaXRlbGlzdGVkOiBib29sZWFuO1xuICAgIGJhY2tncm91bmRfaGFzaDogc3RyaW5nO1xuICAgIHRodW1ibmFpbF9oYXNoOiBzdHJpbmcgfCBudWxsO1xuICAgIGFjY2VudDogc3RyaW5nO1xuICAgIGJhY2tncm91bmRfaXNfYW5pbWF0ZWQ6IGJvb2xlYW47XG4gICAgdGh1bWJuYWlsX2lzX2FuaW1hdGVkOiBib29sZWFuO1xuICAgIGlzX3Byb21vdGVkOiBib29sZWFuO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgbG9nb19oYXNoOiBzdHJpbmcgfCBudWxsO1xuICAgIGxvZ29fZGVzdGluYXRpb25fdXJsOiBzdHJpbmcgfCBudWxsO1xuICAgIGRlc2NyaXB0aW9uX2Fubm90YXRpb25zOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgfT47XG4gIHRvcGljOiBzdHJpbmcgfCBudWxsO1xuICB0b3BpY19pZDogc3RyaW5nIHwgbnVsbDtcbiAgdm90ZTogbnVsbDtcblxuICBjb21tZW50X2NvdW50OiBudW1iZXIgfCBudWxsO1xuICBmYXZvcml0ZV9jb3VudDogbnVtYmVyIHwgbnVsbDtcbiAgdXBzOiBudW1iZXIgfCBudWxsO1xuICBkb3duczogbnVtYmVyIHwgbnVsbDtcbiAgc2NvcmU6IG51bWJlciB8IG51bGw7XG4gIHBvaW50czogbnVtYmVyIHwgbnVsbDtcbiAgdmlld3M6IG51bWJlcjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSW1hZ2VEYXRhIGV4dGVuZHMgQ29tbW9uRGF0YSB7XG4gIHR5cGU6IHN0cmluZztcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIHNpemU6IG51bWJlcjtcbiAgZGVsZXRlaGFzaD86IHN0cmluZztcbiAgYmFuZHdpZHRoOiBudW1iZXI7XG4gIGFuaW1hdGVkOiBib29sZWFuO1xuICBoYXNfc291bmQ6IGJvb2xlYW47XG4gIGVkaXRlZDogc3RyaW5nO1xuICBtcDRfc2l6ZT86IG51bWJlcjtcbiAgbXA0Pzogc3RyaW5nO1xuICBnaWZ2Pzogc3RyaW5nO1xuICBobHM/OiBzdHJpbmc7XG4gIGxvb3Bpbmc/OiBib29sZWFuO1xuICBwcm9jZXNzaW5nPzoge1xuICAgIHN0YXR1czogJ3BlbmRpbmcnIHwgJ2NvbXBsZXRlZCc7XG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWxidW1EYXRhIGV4dGVuZHMgQ29tbW9uRGF0YSB7XG4gIGNvdmVyOiBzdHJpbmcgfCBudWxsO1xuICBjb3Zlcl93aWR0aDogbnVtYmVyIHwgbnVsbDtcbiAgY292ZXJfaGVpZ2h0OiBudW1iZXIgfCBudWxsO1xuICBsYXlvdXQ6IHN0cmluZztcbiAgcHJpdmFjeTogc3RyaW5nO1xuICBpbmNsdWRlX2FsYnVtX2FkczogYm9vbGVhbjtcbiAgaW1hZ2VzOiBJbWFnZURhdGFbXTtcbiAgaW1hZ2VzX2NvdW50OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIEdhbGxlcnlEYXRhID0gQXJyYXk8SW1hZ2VEYXRhIHwgQWxidW1EYXRhPjtcbmV4cG9ydCBpbnRlcmZhY2UgUGF5bG9hZCB7XG4gIGltYWdlPzogc3RyaW5nO1xuICBiYXNlNjQ/OiBzdHJpbmc7XG4gIHR5cGU/OiAnc3RyZWFtJyB8ICd1cmwnIHwgJ2Jhc2U2NCc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHRpdGxlPzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgYWxidW0/OiBzdHJpbmc7XG4gIHN0cmVhbT86IFJlYWRhYmxlO1xuICBkaXNhYmxlX2F1ZGlvPzogJzEnIHwgJzAnO1xufVxuZXhwb3J0IGludGVyZmFjZSBJbWd1ckFwaVJlc3BvbnNlPFxuICBUID1cbiAgICB8IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4gICAgfCBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPltdXG4gICAgfCBzdHJpbmdcbiAgICB8IGJvb2xlYW5cbiAgICB8IEltYWdlRGF0YVxuICAgIHwgR2FsbGVyeURhdGFcbiAgICB8IEFsYnVtRGF0YVxuPiB7XG4gIGRhdGE6IFQ7XG4gIHN0YXR1czogbnVtYmVyO1xuICBzdWNjZXNzOiBib29sZWFuO1xufVxuIiwiaW1wb3J0IHsgQXhpb3NSZXNwb25zZSB9IGZyb20gJ2F4aW9zJztcbmltcG9ydCBGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuaW1wb3J0IHsgSW1ndXJBcGlSZXNwb25zZSwgUGF5bG9hZCB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgUmVhZGFibGUgfSBmcm9tICdzdHJlYW0nO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNCYXNlNjQocGF5bG9hZDogc3RyaW5nIHwgUGF5bG9hZCk6IGJvb2xlYW4ge1xuICBpZiAodHlwZW9mIHBheWxvYWQgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkLmJhc2U2NCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGF5bG9hZC50eXBlID09PSAnYmFzZTY0Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSW1hZ2VVcmwocGF5bG9hZDogc3RyaW5nIHwgUGF5bG9hZCk6IGJvb2xlYW4ge1xuICBpZiAodHlwZW9mIHBheWxvYWQgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gdHlwZW9mIHBheWxvYWQuaW1hZ2UgIT09ICd1bmRlZmluZWQnICYmIHBheWxvYWQudHlwZSA9PT0gJ3VybCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmVhbShwYXlsb2FkOiBzdHJpbmcgfCBQYXlsb2FkKTogYm9vbGVhbiB7XG4gIGlmICh0eXBlb2YgcGF5bG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHlwZW9mIHBheWxvYWQuc3RyZWFtICE9PSAndW5kZWZpbmVkJztcbn1cblxuLy8gVE9ETzogUmVmYWN0b3IgdGhpcyB0byBiZSBhIHVuaXF1ZSBuYW1lIG9mIHNvbWUga2luZCAoYSBoYXNoPylcbmV4cG9ydCBmdW5jdGlvbiBnZXRTb3VyY2UocGF5bG9hZDogc3RyaW5nIHwgUGF5bG9hZCk6IHN0cmluZyB8IFJlYWRhYmxlIHtcbiAgaWYgKHR5cGVvZiBwYXlsb2FkID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBwYXlsb2FkO1xuICB9XG5cbiAgaWYgKGlzQmFzZTY0KHBheWxvYWQpKSB7XG4gICAgcmV0dXJuICdwYXlsb2FkLmJhc2U2NCcgYXMgc3RyaW5nO1xuICB9IGVsc2UgaWYgKGlzU3RyZWFtKHBheWxvYWQpKSB7XG4gICAgcmV0dXJuICdwYXlsb2FkLnN0cmVhbScgYXMgc3RyaW5nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBwYXlsb2FkLmltYWdlIGFzIHN0cmluZztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRm9ybShwYXlsb2FkOiBzdHJpbmcgfCBQYXlsb2FkKTogRm9ybURhdGEge1xuICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgaWYgKHR5cGVvZiBwYXlsb2FkID09PSAnc3RyaW5nJykge1xuICAgIGZvcm0uYXBwZW5kKCdpbWFnZScsIHBheWxvYWQpO1xuICAgIHJldHVybiBmb3JtO1xuICB9XG5cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocGF5bG9hZCkpIHtcbiAgICBjb25zdCBzdXBwb3J0ZWRVcGxvYWRPYmplY3RUeXBlcyA9IFsnYmFzZTY0JywgJ3N0cmVhbSddO1xuICAgIGlmIChzdXBwb3J0ZWRVcGxvYWRPYmplY3RUeXBlcy5pbmRleE9mKGtleSkgIT09IC0xKSB7XG4gICAgICBpZiAoc3VwcG9ydGVkVXBsb2FkT2JqZWN0VHlwZXMuaW5kZXhPZihwYXlsb2FkLnR5cGUgYXMgc3RyaW5nKSAhPT0gLTEpIHtcbiAgICAgICAgZm9ybS5hcHBlbmQoa2V5LCBwYXlsb2FkKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9ybS5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmb3JtO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZShcbiAgcmVzcG9uc2U6IEF4aW9zUmVzcG9uc2Vcbik6IEltZ3VyQXBpUmVzcG9uc2Uge1xuICBpZiAoXG4gICAgdHlwZW9mIHJlc3BvbnNlLmRhdGE/LnN0YXR1cyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgcmVzcG9uc2UuZGF0YT8uc3VjY2VzcyAhPT0gJ3VuZGVmaW5lZCdcbiAgKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGRhdGE6IHJlc3BvbnNlLmRhdGEsXG4gICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgLy8gVE9ETzogZGV0ZXJtaW5lIHRoZSBzdWNjZXNzIG9mIHRoZSBjYWxsP1xuICAgIHN1Y2Nlc3M6IHRydWUsXG4gIH07XG59XG4iLCJpbXBvcnQgeyBJbWd1ckNsaWVudCB9IGZyb20gJy4uL2NsaWVudCc7XG5pbXBvcnQgeyBHQUxMRVJZX0VORFBPSU5ULCBJTUdVUl9BUElfUFJFRklYIH0gZnJvbSAnLi4vY29tbW9uL2VuZHBvaW50cyc7XG5pbXBvcnQgeyBJbWd1ckFwaVJlc3BvbnNlLCBHYWxsZXJ5RGF0YSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQgeyBVUkwgfSBmcm9tICd1cmwnO1xuaW1wb3J0IHsgZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIENvbW1vblNlY3Rpb25Qcm9wcyA9IHtcbiAgc29ydD86ICd2aXJhbCcgfCAndG9wJyB8ICd0aW1lJztcbiAgcGFnZT86IG51bWJlcjtcbn07XG5cbmV4cG9ydCB0eXBlIEhvdFNlY3Rpb24gPSBDb21tb25TZWN0aW9uUHJvcHMgJiB7XG4gIHNlY3Rpb246ICdob3QnO1xufTtcblxuZXhwb3J0IHR5cGUgVG9wU2VjdGlvbiA9IENvbW1vblNlY3Rpb25Qcm9wcyAmIHtcbiAgc2VjdGlvbjogJ3RvcCc7XG4gIHdpbmRvdz86ICdkYXknIHwgJ3dlZWsnIHwgJ21vbnRoJyB8ICd5ZWFyJyB8ICdhbGwnO1xufTtcblxuZXhwb3J0IHR5cGUgVXNlclNlY3Rpb24gPSBPbWl0PENvbW1vblNlY3Rpb25Qcm9wcywgJ3NvcnQnPiAmIHtcbiAgc2VjdGlvbjogJ3VzZXInO1xuICBzb3J0PzogJ3ZpcmFsJyB8ICd0b3AnIHwgJ3RpbWUnIHwgJ3Jpc2luZyc7XG59O1xuXG5leHBvcnQgdHlwZSBTZWN0aW9uT3B0aW9ucyA9IEhvdFNlY3Rpb24gfCBUb3BTZWN0aW9uIHwgVXNlclNlY3Rpb247XG5cbmV4cG9ydCB0eXBlIFByZXNlbnRhdGlvbk9wdGlvbnMgPSB7XG4gIHNob3dWaXJhbD86IGJvb2xlYW47XG4gIG1hdHVyZT86IGJvb2xlYW47XG4gIGFsYnVtX3ByZXZpZXdzPzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCB0eXBlIEdhbGxlcnlPcHRpb25zID0gU2VjdGlvbk9wdGlvbnMgJiBQcmVzZW50YXRpb25PcHRpb25zO1xuXG5jb25zdCBkZWZhdWx0T3B0aW9uczogR2FsbGVyeU9wdGlvbnMgPSB7XG4gIHNlY3Rpb246ICdob3QnLFxuICBzb3J0OiAndmlyYWwnLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0cnVjdEdhbGxlcnlVcmwob3B0aW9uczogR2FsbGVyeU9wdGlvbnMpOiBVUkwge1xuICBjb25zdCBtZXJnZWRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gIGxldCB1cmkgPSBgJHttZXJnZWRPcHRpb25zLnNlY3Rpb259YDtcblxuICBpZiAobWVyZ2VkT3B0aW9ucy5zb3J0KSB7XG4gICAgdXJpICs9IGAvJHttZXJnZWRPcHRpb25zLnNvcnR9YDtcbiAgfVxuXG4gIGlmIChtZXJnZWRPcHRpb25zLnNlY3Rpb24gPT09ICd0b3AnICYmIG1lcmdlZE9wdGlvbnMud2luZG93KSB7XG4gICAgdXJpICs9IGAvJHttZXJnZWRPcHRpb25zLndpbmRvd31gO1xuICB9XG5cbiAgaWYgKG1lcmdlZE9wdGlvbnMucGFnZSkge1xuICAgIHVyaSArPSBgLyR7bWVyZ2VkT3B0aW9ucy5wYWdlfWA7XG4gIH1cblxuICBjb25zdCB1cmwgPSBuZXcgVVJMKGAke0lNR1VSX0FQSV9QUkVGSVh9LyR7R0FMTEVSWV9FTkRQT0lOVH0vJHt1cml9YCk7XG5cbiAgaWYgKG1lcmdlZE9wdGlvbnMuc2hvd1ZpcmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgnc2hvd1ZpcmFsJywgbWVyZ2VkT3B0aW9ucy5zaG93VmlyYWwudG9TdHJpbmcoKSk7XG4gIH1cblxuICBpZiAobWVyZ2VkT3B0aW9ucy5tYXR1cmUgIT09IHVuZGVmaW5lZCkge1xuICAgIHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKCdtYXR1cmUnLCBtZXJnZWRPcHRpb25zLm1hdHVyZS50b1N0cmluZygpKTtcbiAgfVxuXG4gIGlmIChtZXJnZWRPcHRpb25zLmFsYnVtX3ByZXZpZXdzICE9PSB1bmRlZmluZWQpIHtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChcbiAgICAgICdhbGJ1bV9wcmV2aWV3cycsXG4gICAgICBtZXJnZWRPcHRpb25zLmFsYnVtX3ByZXZpZXdzLnRvU3RyaW5nKClcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEdhbGxlcnkoXG4gIGNsaWVudDogSW1ndXJDbGllbnQsXG4gIG9wdGlvbnM6IEdhbGxlcnlPcHRpb25zID0gZGVmYXVsdE9wdGlvbnNcbik6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxHYWxsZXJ5RGF0YT4+IHtcbiAgY29uc3QgeyBwYXRobmFtZSB9ID0gY29uc3RydWN0R2FsbGVyeVVybChvcHRpb25zKTtcbiAgLy8gc2luY2Ugd2UncmUgdXNpbmcgcHJlZml4VXJsIHdpdGggZ290LCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGUgc3RhcnRpbmcgc2xhc2ggb3IgaXQnbGwgdGhyb3dcbiAgY29uc3QgZmluYWxQYXRobmFtZSA9IHBhdGhuYW1lLnNsaWNlKDEpO1xuXG4gIHJldHVybiBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKFxuICAgIGF3YWl0IGNsaWVudC5yZXF1ZXN0KHsgdXJsOiBmaW5hbFBhdGhuYW1lIH0pXG4gICkgYXMgSW1ndXJBcGlSZXNwb25zZTxHYWxsZXJ5RGF0YT47XG59XG4iLCJpbXBvcnQgeyBJbWd1ckNsaWVudCB9IGZyb20gJy4uL2NsaWVudCc7XG5pbXBvcnQge1xuICBTVUJSRURESVRfR0FMTEVSWV9FTkRQT0lOVCxcbiAgSU1HVVJfQVBJX1BSRUZJWCxcbn0gZnJvbSAnLi4vY29tbW9uL2VuZHBvaW50cyc7XG5pbXBvcnQgeyBJbWd1ckFwaVJlc3BvbnNlLCBHYWxsZXJ5RGF0YSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQgeyBVUkwgfSBmcm9tICd1cmwnO1xuaW1wb3J0IHsgZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIFRpbWVPcHRpb25zID0ge1xuICBzdWJyZWRkaXQ6IHN0cmluZztcbiAgc29ydD86ICd0aW1lJztcbiAgcGFnZT86IG51bWJlcjtcbn07XG5cbmV4cG9ydCB0eXBlIFRvcE9wdGlvbnMgPSBPbWl0PFRpbWVPcHRpb25zLCAnc29ydCc+ICYge1xuICBzb3J0PzogJ3RvcCc7XG4gIHdpbmRvdz86ICdkYXknIHwgJ3dlZWsnIHwgJ21vbnRoJyB8ICd5ZWFyJyB8ICdhbGwnO1xufTtcblxuZXhwb3J0IHR5cGUgU3VicmVkZGl0R2FsbGVyeU9wdGlvbnMgPSBUaW1lT3B0aW9ucyB8IFRvcE9wdGlvbnM7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zdHJ1Y3RTdWJyZWRkaXRHYWxsZXJ5VXJsKFxuICBvcHRpb25zOiBTdWJyZWRkaXRHYWxsZXJ5T3B0aW9uc1xuKTogVVJMIHtcbiAgbGV0IHVyaSA9IGAke29wdGlvbnMuc3VicmVkZGl0fWA7XG5cbiAgaWYgKG9wdGlvbnMuc29ydCkge1xuICAgIHVyaSArPSBgLyR7b3B0aW9ucy5zb3J0fWA7XG4gIH1cblxuICBpZiAob3B0aW9ucy5zb3J0ID09PSAndG9wJyAmJiBvcHRpb25zLndpbmRvdykge1xuICAgIHVyaSArPSBgLyR7b3B0aW9ucy53aW5kb3d9YDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLnBhZ2UpIHtcbiAgICB1cmkgKz0gYC8ke29wdGlvbnMucGFnZX1gO1xuICB9XG5cbiAgY29uc3QgdXJsID0gbmV3IFVSTChcbiAgICBgJHtJTUdVUl9BUElfUFJFRklYfS8ke1NVQlJFRERJVF9HQUxMRVJZX0VORFBPSU5UfS8ke3VyaX1gXG4gICk7XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN1YnJlZGRpdEdhbGxlcnkoXG4gIGNsaWVudDogSW1ndXJDbGllbnQsXG4gIG9wdGlvbnM6IFN1YnJlZGRpdEdhbGxlcnlPcHRpb25zXG4pOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8R2FsbGVyeURhdGE+PiB7XG4gIGNvbnN0IHsgcGF0aG5hbWUgfSA9IGNvbnN0cnVjdFN1YnJlZGRpdEdhbGxlcnlVcmwob3B0aW9ucyk7XG4gIC8vIHNpbmNlIHdlJ3JlIHVzaW5nIHByZWZpeFVybCB3aXRoIGdvdCwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHN0YXJ0aW5nIHNsYXNoIG9yIGl0J2xsIHRocm93XG4gIGNvbnN0IGZpbmFsUGF0aG5hbWUgPSBwYXRobmFtZS5zbGljZSgxKTtcblxuICByZXR1cm4gZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZShcbiAgICBhd2FpdCBjbGllbnQucmVxdWVzdCh7IHVybDogZmluYWxQYXRobmFtZSB9KVxuICApIGFzIEltZ3VyQXBpUmVzcG9uc2U8R2FsbGVyeURhdGE+O1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9nZXRHYWxsZXJ5JztcbmV4cG9ydCAqIGZyb20gJy4vZ2V0U3VicmVkZGl0R2FsbGVyeSc7XG5leHBvcnQgKiBmcm9tICcuL3NlYXJjaEdhbGxlcnknO1xuIiwiaW1wb3J0IHsgSW1ndXJDbGllbnQgfSBmcm9tICcuLi9jbGllbnQnO1xuaW1wb3J0IHsgU0VBUkNIX0dBTExFUllfRU5EUE9JTlQsIElNR1VSX0FQSV9QUkVGSVggfSBmcm9tICcuLi9jb21tb24vZW5kcG9pbnRzJztcbmltcG9ydCB7IEltZ3VyQXBpUmVzcG9uc2UsIEdhbGxlcnlEYXRhIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzJztcbmltcG9ydCB7IGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuaW1wb3J0IHsgVVJMIH0gZnJvbSAndXJsJztcblxuZXhwb3J0IHR5cGUgU2VhcmNoT3B0aW9ucyA9IHtcbiAgcT86IHN0cmluZztcbiAgcXVlcnk/OiBzdHJpbmc7XG4gIHNvcnQ/OiAndGltZScgfCAndmlyYWwnO1xuICBwYWdlPzogbnVtYmVyO1xufTtcblxuZXhwb3J0IHR5cGUgVG9wU2VhcmNoT3B0aW9ucyA9IE9taXQ8U2VhcmNoT3B0aW9ucywgJ3NvcnQnPiAmIHtcbiAgc29ydD86ICd0b3AnO1xuICB3aW5kb3c/OiAnZGF5JyB8ICd3ZWVrJyB8ICdtb250aCcgfCAneWVhcicgfCAnYWxsJztcbn07XG5cbmV4cG9ydCB0eXBlIEFkdmFuY2VkU2VhcmNoUXVlcnlQYXJhbWV0ZXJzID0ge1xuICBxX2FsbD86IHN0cmluZztcbiAgcV9hbnk/OiBzdHJpbmc7XG4gIHFfZXhhY3RseT86IHN0cmluZztcbiAgcV9ub3Q/OiBzdHJpbmc7XG4gIHFfdHlwZT86ICdqcGcnIHwgJ3BuZycgfCAnZ2lmJyB8ICdhbmlnaWYnIHwgJ2FsYnVtJztcbiAgcV9zaXplX3B4PzogJ3NtYWxsJyB8ICdtZWQnIHwgJ2JpZycgfCAnbHJnJyB8ICdodWdlJztcbn07XG5cbmNvbnN0IGFkdmFuY2VkUGFyYW1ldGVyczogQXJyYXk8a2V5b2YgQWR2YW5jZWRTZWFyY2hRdWVyeVBhcmFtZXRlcnM+ID0gW1xuICAncV9hbGwnLFxuICAncV9hbnknLFxuICAncV9leGFjdGx5JyxcbiAgJ3Ffbm90JyxcbiAgJ3FfdHlwZScsXG4gICdxX3NpemVfcHgnLFxuXTtcblxuZXhwb3J0IHR5cGUgU2VhcmNoR2FsbGVyeU9wdGlvbnMgPSAoU2VhcmNoT3B0aW9ucyB8IFRvcFNlYXJjaE9wdGlvbnMpICZcbiAgQWR2YW5jZWRTZWFyY2hRdWVyeVBhcmFtZXRlcnM7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zdHJ1Y3RTZWFyY2hHYWxsZXJ5VXJsKG9wdGlvbnM6IFNlYXJjaEdhbGxlcnlPcHRpb25zKTogVVJMIHtcbiAgbGV0IHVyaSA9ICcnO1xuXG4gIGlmIChvcHRpb25zLnNvcnQpIHtcbiAgICB1cmkgKz0gYC8ke29wdGlvbnMuc29ydH1gO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuc29ydCA9PT0gJ3RvcCcgJiYgb3B0aW9ucy53aW5kb3cpIHtcbiAgICB1cmkgKz0gYC8ke29wdGlvbnMud2luZG93fWA7XG4gIH1cblxuICBpZiAob3B0aW9ucy5wYWdlKSB7XG4gICAgdXJpICs9IGAvJHtvcHRpb25zLnBhZ2V9YDtcbiAgfVxuXG4gIGNvbnN0IHVybCA9IG5ldyBVUkwoYCR7SU1HVVJfQVBJX1BSRUZJWH0vJHtTRUFSQ0hfR0FMTEVSWV9FTkRQT0lOVH0ke3VyaX1gKTtcblxuICBhZHZhbmNlZFBhcmFtZXRlcnMuZm9yRWFjaCgocGFyYW0pID0+IHtcbiAgICBpZiAob3B0aW9uc1twYXJhbV0/Lmxlbmd0aCkge1xuICAgICAgdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQocGFyYW0sIG9wdGlvbnNbcGFyYW1dIGFzIHN0cmluZyk7XG4gICAgfVxuICB9KTtcblxuICBpZiAoIXVybC5zZWFyY2gpIHtcbiAgICBjb25zdCBxdWVyeSA9IG9wdGlvbnMucSB8fCBvcHRpb25zLnF1ZXJ5O1xuICAgIGlmICghcXVlcnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gcXVlcnkgd2FzIHByb3ZpZGVkJyk7XG4gICAgfVxuXG4gICAgdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoJ3EnLCBxdWVyeSk7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VhcmNoR2FsbGVyeShcbiAgY2xpZW50OiBJbWd1ckNsaWVudCxcbiAgb3B0aW9uczogU2VhcmNoR2FsbGVyeU9wdGlvbnNcbik6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxHYWxsZXJ5RGF0YT4+IHtcbiAgY29uc3QgeyBwYXRobmFtZSB9ID0gY29uc3RydWN0U2VhcmNoR2FsbGVyeVVybChvcHRpb25zKTtcbiAgLy8gc2luY2Ugd2UncmUgdXNpbmcgcHJlZml4VXJsIHdpdGggZ290LCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGUgc3RhcnRpbmcgc2xhc2ggb3IgaXQnbGwgdGhyb3dcbiAgY29uc3QgZmluYWxQYXRobmFtZSA9IHBhdGhuYW1lLnNsaWNlKDEpO1xuXG4gIHJldHVybiBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKFxuICAgIGF3YWl0IGNsaWVudC5yZXF1ZXN0KHsgdXJsOiBmaW5hbFBhdGhuYW1lIH0pXG4gICkgYXMgSW1ndXJBcGlSZXNwb25zZTxHYWxsZXJ5RGF0YT47XG59XG4iLCJpbXBvcnQge1xuICBBY2Nlc3NUb2tlbixcbiAgaXNBY2Nlc3NUb2tlbixcbiAgaXNDbGllbnRJZCxcbiAgaXNMb2dpbixcbn0gZnJvbSAnLi9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHsgSW1ndXJDbGllbnQgfSBmcm9tICcuL2NsaWVudCc7XG5pbXBvcnQgeyBJTUdVUl9BUElfUFJFRklYLCBBVVRIT1JJWkVfRU5EUE9JTlQgfSBmcm9tICcuL2NvbW1vbi9lbmRwb2ludHMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QXV0aG9yaXphdGlvbkhlYWRlcihcbiAgY2xpZW50OiBJbWd1ckNsaWVudFxuKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgaWYgKGlzQWNjZXNzVG9rZW4oY2xpZW50LmNyZWRlbnRpYWxzKSkge1xuICAgIHJldHVybiBgQmVhcmVyICR7Y2xpZW50LmNyZWRlbnRpYWxzLmFjY2Vzc1Rva2VufWA7XG4gIH1cblxuICBpZiAoaXNDbGllbnRJZChjbGllbnQuY3JlZGVudGlhbHMpICYmICFpc0xvZ2luKGNsaWVudC5jcmVkZW50aWFscykpIHtcbiAgICByZXR1cm4gYENsaWVudC1JRCAke2NsaWVudC5jcmVkZW50aWFscy5jbGllbnRJZH1gO1xuICB9XG5cbiAgY29uc3QgeyBjbGllbnRJZCwgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSBjbGllbnQuY3JlZGVudGlhbHM7XG5cbiAgY29uc3Qgb3B0aW9uczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7XG4gICAgdXJsOiBBVVRIT1JJWkVfRU5EUE9JTlQsXG4gICAgYmFzZVVSTDogSU1HVVJfQVBJX1BSRUZJWCxcbiAgICBwYXJhbXM6IHtcbiAgICAgIGNsaWVudF9pZDogY2xpZW50SWQsXG4gICAgICByZXNwb25zZV90eXBlOiAndG9rZW4nLFxuICAgIH0sXG4gIH07XG5cbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgY2xpZW50LnBsYWluUmVxdWVzdChvcHRpb25zKTtcblxuICBjb25zdCBjb29raWVzID0gQXJyYXkuaXNBcnJheShyZXNwb25zZS5oZWFkZXJzWydzZXQtY29va2llJ10pXG4gICAgPyByZXNwb25zZS5oZWFkZXJzWydzZXQtY29va2llJ11bMF1cbiAgICA6IHJlc3BvbnNlLmhlYWRlcnNbJ3NldC1jb29raWUnXTtcblxuICBpZiAoIWNvb2tpZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNvb2tpZXMgd2VyZSBzZXQgZHVyaW5nIGF1dGhvcml6YXRpb24nKTtcbiAgfVxuXG4gIGNvbnN0IG1hdGNoZXMgPSBjb29raWVzLm1hdGNoKCcoXnw7KVtzXSphdXRob3JpemVfdG9rZW49KFteO10qKScpO1xuXG4gIGlmICghbWF0Y2hlcyB8fCBtYXRjaGVzLmxlbmd0aCA8IDMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBmaW5kIGF1dGhvcml6ZV90b2tlbiBjb29raWUnKTtcbiAgfVxuXG4gIGNvbnN0IGF1dGhvcml6ZVRva2VuID0gbWF0Y2hlc1syXTtcblxuICBvcHRpb25zLm1ldGhvZCA9ICdQT1NUJztcbiAgb3B0aW9ucy5kYXRhID0ge1xuICAgIHVzZXJuYW1lLFxuICAgIHBhc3N3b3JkLFxuICAgIGFsbG93OiBhdXRob3JpemVUb2tlbixcbiAgfTtcblxuICBvcHRpb25zLmZvbGxvd1JlZGlyZWN0ID0gZmFsc2U7XG4gIG9wdGlvbnMuaGVhZGVycyA9IHtcbiAgICBjb29raWU6IGBhdXRob3JpemVfdG9rZW49JHthdXRob3JpemVUb2tlbn1gLFxuICB9O1xuXG4gIHJlc3BvbnNlID0gYXdhaXQgY2xpZW50LnBsYWluUmVxdWVzdChvcHRpb25zKTtcbiAgY29uc3QgbG9jYXRpb24gPSByZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9uO1xuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gcGFyc2UgbG9jYXRpb24nKTtcbiAgfVxuXG4gIGNvbnN0IHRva2VuID0gSlNPTi5wYXJzZShcbiAgICAne1wiJyArXG4gICAgICBkZWNvZGVVUkkobG9jYXRpb24uc2xpY2UobG9jYXRpb24uaW5kZXhPZignIycpICsgMSkpXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJylcbiAgICAgICAgLnJlcGxhY2UoLyYvZywgJ1wiLFwiJylcbiAgICAgICAgLnJlcGxhY2UoLz0vZywgJ1wiOlwiJykgK1xuICAgICAgJ1wifSdcbiAgKTtcblxuICBjb25zdCBhY2Nlc3NUb2tlbiA9IHRva2VuLmFjY2Vzc190b2tlbjtcbiAgKChjbGllbnQuY3JlZGVudGlhbHMgYXMgdW5rbm93bikgYXMgQWNjZXNzVG9rZW4pLmFjY2Vzc1Rva2VuID0gYWNjZXNzVG9rZW47XG5cbiAgcmV0dXJuIGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gO1xufVxuIiwiaW1wb3J0IHsgSW1ndXJDbGllbnQgfSBmcm9tICcuLi9jbGllbnQnO1xuaW1wb3J0IHsgSU1BR0VfRU5EUE9JTlQgfSBmcm9tICcuLi9jb21tb24vZW5kcG9pbnRzJztcbmltcG9ydCB7IEltZ3VyQXBpUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHsgZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVJbWFnZShcbiAgY2xpZW50OiBJbWd1ckNsaWVudCxcbiAgaW1hZ2VIYXNoOiBzdHJpbmdcbik6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxib29sZWFuPj4ge1xuICBjb25zdCB1cmwgPSBgJHtJTUFHRV9FTkRQT0lOVH0vJHtpbWFnZUhhc2h9YDtcbiAgcmV0dXJuIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UoXG4gICAgYXdhaXQgY2xpZW50LnJlcXVlc3QoeyB1cmwsIG1ldGhvZDogJ0RFTEVURScgfSlcbiAgKSBhcyBJbWd1ckFwaVJlc3BvbnNlPGJvb2xlYW4+O1xufVxuIiwiaW1wb3J0IHsgSW1ndXJDbGllbnQgfSBmcm9tICcuLi9jbGllbnQnO1xuaW1wb3J0IHsgSU1BR0VfRU5EUE9JTlQgfSBmcm9tICcuLi9jb21tb24vZW5kcG9pbnRzJztcbmltcG9ydCB7IEltZ3VyQXBpUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHsgZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmYXZvcml0ZUltYWdlKFxuICBjbGllbnQ6IEltZ3VyQ2xpZW50LFxuICBpbWFnZUhhc2g6IHN0cmluZ1xuKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPCdmYXZvcml0ZWQnPj4ge1xuICBjb25zdCB1cmwgPSBgJHtJTUFHRV9FTkRQT0lOVH0vJHtpbWFnZUhhc2h9L2Zhdm9yaXRlYDtcbiAgcmV0dXJuIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UoXG4gICAgYXdhaXQgY2xpZW50LnJlcXVlc3QoeyB1cmwsIG1ldGhvZDogJ1BPU1QnIH0pXG4gICkgYXMgSW1ndXJBcGlSZXNwb25zZTwnZmF2b3JpdGVkJz47XG59XG4iLCJpbXBvcnQgeyBJbWd1ckNsaWVudCB9IGZyb20gJy4uL2NsaWVudCc7XG5pbXBvcnQgeyBJTUFHRV9FTkRQT0lOVCB9IGZyb20gJy4uL2NvbW1vbi9lbmRwb2ludHMnO1xuaW1wb3J0IHsgSW1ndXJBcGlSZXNwb25zZSwgSW1hZ2VEYXRhIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzJztcbmltcG9ydCB7IGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0SW1hZ2UoXG4gIGNsaWVudDogSW1ndXJDbGllbnQsXG4gIGltYWdlSGFzaDogc3RyaW5nXG4pOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPj4ge1xuICBjb25zdCB1cmwgPSBgJHtJTUFHRV9FTkRQT0lOVH0vJHtpbWFnZUhhc2h9YDtcbiAgcmV0dXJuIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UoXG4gICAgYXdhaXQgY2xpZW50LnJlcXVlc3QoeyB1cmwgfSlcbiAgKSBhcyBJbWd1ckFwaVJlc3BvbnNlPEltYWdlRGF0YT47XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL2RlbGV0ZUltYWdlJztcbmV4cG9ydCAqIGZyb20gJy4vZmF2b3JpdGVJbWFnZSc7XG5leHBvcnQgKiBmcm9tICcuL2dldEltYWdlJztcbmV4cG9ydCAqIGZyb20gJy4vdXBkYXRlSW1hZ2UnO1xuZXhwb3J0ICogZnJvbSAnLi91cGxvYWQnO1xuIiwiaW1wb3J0IHsgSW1ndXJDbGllbnQgfSBmcm9tICcuLi9jbGllbnQnO1xuaW1wb3J0IHsgSU1BR0VfRU5EUE9JTlQgfSBmcm9tICcuLi9jb21tb24vZW5kcG9pbnRzJztcbmltcG9ydCB7IGNyZWF0ZUZvcm0sIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuaW1wb3J0IHsgUGF5bG9hZCwgSW1ndXJBcGlSZXNwb25zZSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlSW1hZ2VQYXlsb2FkXG4gIGV4dGVuZHMgUGljazxQYXlsb2FkLCAndGl0bGUnIHwgJ2Rlc2NyaXB0aW9uJz4ge1xuICBpbWFnZUhhc2g6IHN0cmluZztcbn1cblxuZnVuY3Rpb24gaXNWYWxpZFVwZGF0ZVBheWxvYWQocDogVXBkYXRlSW1hZ2VQYXlsb2FkKSB7XG4gIHJldHVybiB0eXBlb2YgcC50aXRsZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHAuZGVzY3JpcHRpb24gPT09ICdzdHJpbmcnO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlSW1hZ2UoXG4gIGNsaWVudDogSW1ndXJDbGllbnQsXG4gIHBheWxvYWQ6IFVwZGF0ZUltYWdlUGF5bG9hZCB8IFVwZGF0ZUltYWdlUGF5bG9hZFtdXG4pOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8Ym9vbGVhbj4gfCBJbWd1ckFwaVJlc3BvbnNlPGJvb2xlYW4+W10+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkocGF5bG9hZCkpIHtcbiAgICBjb25zdCBwcm9taXNlcyA9IHBheWxvYWQubWFwKChwOiBVcGRhdGVJbWFnZVBheWxvYWQpID0+IHtcbiAgICAgIGlmICghaXNWYWxpZFVwZGF0ZVBheWxvYWQocCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVcGRhdGUgcmVxdWlyZXMgYSB0aXRsZSBhbmQvb3IgZGVzY3JpcHRpb24nKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdXJsID0gYCR7SU1BR0VfRU5EUE9JTlR9LyR7cC5pbWFnZUhhc2h9YDtcbiAgICAgIGNvbnN0IGZvcm0gPSBjcmVhdGVGb3JtKHApO1xuICAgICAgLyogZXNsaW50IG5vLWFzeW5jLXByb21pc2UtZXhlY3V0b3I6IDAgKi9cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyBmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZShcbiAgICAgICAgICBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKFxuICAgICAgICAgICAgYXdhaXQgY2xpZW50LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICBkYXRhOiBmb3JtLFxuICAgICAgICAgICAgICAvLyByZXNvbHZlQm9keU9ubHk6IHRydWUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICkgYXMgSW1ndXJBcGlSZXNwb25zZTxib29sZWFuPlxuICAgICAgICApO1xuICAgICAgfSkgYXMgUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPGJvb2xlYW4+PjtcbiAgICB9KTtcblxuICAgIHJldHVybiBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cblxuICBpZiAoIWlzVmFsaWRVcGRhdGVQYXlsb2FkKHBheWxvYWQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVcGRhdGUgcmVxdWlyZXMgYSB0aXRsZSBhbmQvb3IgZGVzY3JpcHRpb24nKTtcbiAgfVxuXG4gIGNvbnN0IHVybCA9IGAke0lNQUdFX0VORFBPSU5UfS8ke3BheWxvYWQuaW1hZ2VIYXNofWA7XG4gIGNvbnN0IGZvcm0gPSBjcmVhdGVGb3JtKHBheWxvYWQpO1xuICByZXR1cm4gZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZShcbiAgICBhd2FpdCBjbGllbnQucmVxdWVzdCh7XG4gICAgICB1cmwsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGRhdGE6IGZvcm0sXG4gICAgICAvLyByZXNvbHZlQm9keU9ubHk6IHRydWUsXG4gICAgfSlcbiAgKSBhcyBJbWd1ckFwaVJlc3BvbnNlPGJvb2xlYW4+O1xufVxuIiwiaW1wb3J0IHsgSW1ndXJDbGllbnQgfSBmcm9tICcuLi9jbGllbnQnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRm9ybSxcbiAgZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZSxcbiAgLy8gZ2V0U291cmNlLFxufSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuaW1wb3J0IHsgUGF5bG9hZCwgSW1ndXJBcGlSZXNwb25zZSwgSW1hZ2VEYXRhIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzJztcbmltcG9ydCB7IFVQTE9BRF9FTkRQT0lOVCB9IGZyb20gJy4uL2NvbW1vbi9lbmRwb2ludHMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBsb2FkKFxuICBjbGllbnQ6IEltZ3VyQ2xpZW50LFxuICBwYXlsb2FkOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFBheWxvYWQgfCBQYXlsb2FkW11cbik6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxJbWFnZURhdGE+IHwgSW1ndXJBcGlSZXNwb25zZTxJbWFnZURhdGE+W10+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkocGF5bG9hZCkpIHtcbiAgICBjb25zdCBwcm9taXNlcyA9IHBheWxvYWQubWFwKChwOiBzdHJpbmcgfCBQYXlsb2FkKSA9PiB7XG4gICAgICBjb25zdCBmb3JtID0gY3JlYXRlRm9ybShwKTtcblxuICAgICAgLyogZXNsaW50IG5vLWFzeW5jLXByb21pc2UtZXhlY3V0b3I6IDAgKi9cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSkgPT4ge1xuICAgICAgICByZXNvbHZlKFxuICAgICAgICAgIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UoXG4gICAgICAgICAgICBhd2FpdCBjbGllbnQucmVxdWVzdCh7XG4gICAgICAgICAgICAgIHVybDogVVBMT0FEX0VORFBPSU5ULFxuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgZGF0YTogZm9ybSxcbiAgICAgICAgICAgICAgb25VcGxvYWRQcm9ncmVzczogKHByb2dyZXNzRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh7IHByb2dyZXNzRXZlbnQgfSk7XG4gICAgICAgICAgICAgICAgY2xpZW50LmVtaXQoJ3VwbG9hZFByb2dyZXNzJywgeyAuLi5wcm9ncmVzc0V2ZW50IH0pO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApIGFzIEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPlxuICAgICAgICApO1xuICAgICAgfSkgYXMgUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPEltYWdlRGF0YT4+O1xuICAgIH0pO1xuICAgIHJldHVybiBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cblxuICBjb25zdCBmb3JtID0gY3JlYXRlRm9ybShwYXlsb2FkKTtcbiAgLy8gY29uc3QgaWQgPSBEYXRlLm5vdy50b1N0cmluZygpO1xuICBjb25zdCByZXF1ZXN0ID0gYXdhaXQgY2xpZW50LnJlcXVlc3Qoe1xuICAgIHVybDogVVBMT0FEX0VORFBPSU5ULFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGRhdGE6IGZvcm0sXG4gICAgb25VcGxvYWRQcm9ncmVzczogKHByb2dyZXNzRXZlbnQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHsgcHJvZ3Jlc3NFdmVudCB9KTtcbiAgICAgIGNsaWVudC5lbWl0KCd1cGxvYWRQcm9ncmVzcycsIHsgLi4ucHJvZ3Jlc3NFdmVudCB9KTtcbiAgICB9LFxuICB9KTtcblxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFxuICAgIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UocmVxdWVzdCkgYXMgSW1ndXJBcGlSZXNwb25zZTxJbWFnZURhdGE+XG4gICk7XG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jcmVhdGVCaW5kaW5nKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gZ2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByaXZhdGVNYXAuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHByaXZhdGVNYXAsIHZhbHVlKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gc2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZU1hcC5zZXQocmVjZWl2ZXIsIHZhbHVlKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG4iLCIvKiEgaHR0cHM6Ly9tdGhzLmJlL3B1bnljb2RlIHYxLjMuMiBieSBAbWF0aGlhcyAqL1xuOyhmdW5jdGlvbihyb290KSB7XG5cblx0LyoqIERldGVjdCBmcmVlIHZhcmlhYmxlcyAqL1xuXHR2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmXG5cdFx0IWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdCFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXHR2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuXHRpZiAoXG5cdFx0ZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHxcblx0XHRmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCB8fFxuXHRcdGZyZWVHbG9iYWwuc2VsZiA9PT0gZnJlZUdsb2JhbFxuXHQpIHtcblx0XHRyb290ID0gZnJlZUdsb2JhbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgYHB1bnljb2RlYCBvYmplY3QuXG5cdCAqIEBuYW1lIHB1bnljb2RlXG5cdCAqIEB0eXBlIE9iamVjdFxuXHQgKi9cblx0dmFyIHB1bnljb2RlLFxuXG5cdC8qKiBIaWdoZXN0IHBvc2l0aXZlIHNpZ25lZCAzMi1iaXQgZmxvYXQgdmFsdWUgKi9cblx0bWF4SW50ID0gMjE0NzQ4MzY0NywgLy8gYWthLiAweDdGRkZGRkZGIG9yIDJeMzEtMVxuXG5cdC8qKiBCb290c3RyaW5nIHBhcmFtZXRlcnMgKi9cblx0YmFzZSA9IDM2LFxuXHR0TWluID0gMSxcblx0dE1heCA9IDI2LFxuXHRza2V3ID0gMzgsXG5cdGRhbXAgPSA3MDAsXG5cdGluaXRpYWxCaWFzID0gNzIsXG5cdGluaXRpYWxOID0gMTI4LCAvLyAweDgwXG5cdGRlbGltaXRlciA9ICctJywgLy8gJ1xceDJEJ1xuXG5cdC8qKiBSZWd1bGFyIGV4cHJlc3Npb25zICovXG5cdHJlZ2V4UHVueWNvZGUgPSAvXnhuLS0vLFxuXHRyZWdleE5vbkFTQ0lJID0gL1teXFx4MjAtXFx4N0VdLywgLy8gdW5wcmludGFibGUgQVNDSUkgY2hhcnMgKyBub24tQVNDSUkgY2hhcnNcblx0cmVnZXhTZXBhcmF0b3JzID0gL1tcXHgyRVxcdTMwMDJcXHVGRjBFXFx1RkY2MV0vZywgLy8gUkZDIDM0OTAgc2VwYXJhdG9yc1xuXG5cdC8qKiBFcnJvciBtZXNzYWdlcyAqL1xuXHRlcnJvcnMgPSB7XG5cdFx0J292ZXJmbG93JzogJ092ZXJmbG93OiBpbnB1dCBuZWVkcyB3aWRlciBpbnRlZ2VycyB0byBwcm9jZXNzJyxcblx0XHQnbm90LWJhc2ljJzogJ0lsbGVnYWwgaW5wdXQgPj0gMHg4MCAobm90IGEgYmFzaWMgY29kZSBwb2ludCknLFxuXHRcdCdpbnZhbGlkLWlucHV0JzogJ0ludmFsaWQgaW5wdXQnXG5cdH0sXG5cblx0LyoqIENvbnZlbmllbmNlIHNob3J0Y3V0cyAqL1xuXHRiYXNlTWludXNUTWluID0gYmFzZSAtIHRNaW4sXG5cdGZsb29yID0gTWF0aC5mbG9vcixcblx0c3RyaW5nRnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZSxcblxuXHQvKiogVGVtcG9yYXJ5IHZhcmlhYmxlICovXG5cdGtleTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICogQSBnZW5lcmljIGVycm9yIHV0aWxpdHkgZnVuY3Rpb24uXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIFRoZSBlcnJvciB0eXBlLlxuXHQgKiBAcmV0dXJucyB7RXJyb3J9IFRocm93cyBhIGBSYW5nZUVycm9yYCB3aXRoIHRoZSBhcHBsaWNhYmxlIGVycm9yIG1lc3NhZ2UuXG5cdCAqL1xuXHRmdW5jdGlvbiBlcnJvcih0eXBlKSB7XG5cdFx0dGhyb3cgUmFuZ2VFcnJvcihlcnJvcnNbdHlwZV0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgZ2VuZXJpYyBgQXJyYXkjbWFwYCB1dGlsaXR5IGZ1bmN0aW9uLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnkgYXJyYXlcblx0ICogaXRlbS5cblx0ICogQHJldHVybnMge0FycmF5fSBBIG5ldyBhcnJheSBvZiB2YWx1ZXMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuXHQgKi9cblx0ZnVuY3Rpb24gbWFwKGFycmF5LCBmbikge1xuXHRcdHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xuXHRcdHdoaWxlIChsZW5ndGgtLSkge1xuXHRcdFx0cmVzdWx0W2xlbmd0aF0gPSBmbihhcnJheVtsZW5ndGhdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHNpbXBsZSBgQXJyYXkjbWFwYC1saWtlIHdyYXBwZXIgdG8gd29yayB3aXRoIGRvbWFpbiBuYW1lIHN0cmluZ3Mgb3IgZW1haWxcblx0ICogYWRkcmVzc2VzLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZG9tYWluIFRoZSBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnlcblx0ICogY2hhcmFjdGVyLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IEEgbmV3IHN0cmluZyBvZiBjaGFyYWN0ZXJzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFja1xuXHQgKiBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIG1hcERvbWFpbihzdHJpbmcsIGZuKSB7XG5cdFx0dmFyIHBhcnRzID0gc3RyaW5nLnNwbGl0KCdAJyk7XG5cdFx0dmFyIHJlc3VsdCA9ICcnO1xuXHRcdGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG5cdFx0XHQvLyBJbiBlbWFpbCBhZGRyZXNzZXMsIG9ubHkgdGhlIGRvbWFpbiBuYW1lIHNob3VsZCBiZSBwdW55Y29kZWQuIExlYXZlXG5cdFx0XHQvLyB0aGUgbG9jYWwgcGFydCAoaS5lLiBldmVyeXRoaW5nIHVwIHRvIGBAYCkgaW50YWN0LlxuXHRcdFx0cmVzdWx0ID0gcGFydHNbMF0gKyAnQCc7XG5cdFx0XHRzdHJpbmcgPSBwYXJ0c1sxXTtcblx0XHR9XG5cdFx0Ly8gQXZvaWQgYHNwbGl0KHJlZ2V4KWAgZm9yIElFOCBjb21wYXRpYmlsaXR5LiBTZWUgIzE3LlxuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlZ2V4U2VwYXJhdG9ycywgJ1xceDJFJyk7XG5cdFx0dmFyIGxhYmVscyA9IHN0cmluZy5zcGxpdCgnLicpO1xuXHRcdHZhciBlbmNvZGVkID0gbWFwKGxhYmVscywgZm4pLmpvaW4oJy4nKTtcblx0XHRyZXR1cm4gcmVzdWx0ICsgZW5jb2RlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIG51bWVyaWMgY29kZSBwb2ludHMgb2YgZWFjaCBVbmljb2RlXG5cdCAqIGNoYXJhY3RlciBpbiB0aGUgc3RyaW5nLiBXaGlsZSBKYXZhU2NyaXB0IHVzZXMgVUNTLTIgaW50ZXJuYWxseSxcblx0ICogdGhpcyBmdW5jdGlvbiB3aWxsIGNvbnZlcnQgYSBwYWlyIG9mIHN1cnJvZ2F0ZSBoYWx2ZXMgKGVhY2ggb2Ygd2hpY2hcblx0ICogVUNTLTIgZXhwb3NlcyBhcyBzZXBhcmF0ZSBjaGFyYWN0ZXJzKSBpbnRvIGEgc2luZ2xlIGNvZGUgcG9pbnQsXG5cdCAqIG1hdGNoaW5nIFVURi0xNi5cblx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5lbmNvZGVgXG5cdCAqIEBzZWUgPGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nPlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuXHQgKiBAbmFtZSBkZWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgVW5pY29kZSBpbnB1dCBzdHJpbmcgKFVDUy0yKS5cblx0ICogQHJldHVybnMge0FycmF5fSBUaGUgbmV3IGFycmF5IG9mIGNvZGUgcG9pbnRzLlxuXHQgKi9cblx0ZnVuY3Rpb24gdWNzMmRlY29kZShzdHJpbmcpIHtcblx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0ICAgIGNvdW50ZXIgPSAwLFxuXHRcdCAgICBsZW5ndGggPSBzdHJpbmcubGVuZ3RoLFxuXHRcdCAgICB2YWx1ZSxcblx0XHQgICAgZXh0cmE7XG5cdFx0d2hpbGUgKGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdHZhbHVlID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdGlmICh2YWx1ZSA+PSAweEQ4MDAgJiYgdmFsdWUgPD0gMHhEQkZGICYmIGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdFx0Ly8gaGlnaCBzdXJyb2dhdGUsIGFuZCB0aGVyZSBpcyBhIG5leHQgY2hhcmFjdGVyXG5cdFx0XHRcdGV4dHJhID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdFx0aWYgKChleHRyYSAmIDB4RkMwMCkgPT0gMHhEQzAwKSB7IC8vIGxvdyBzdXJyb2dhdGVcblx0XHRcdFx0XHRvdXRwdXQucHVzaCgoKHZhbHVlICYgMHgzRkYpIDw8IDEwKSArIChleHRyYSAmIDB4M0ZGKSArIDB4MTAwMDApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIHVubWF0Y2hlZCBzdXJyb2dhdGU7IG9ubHkgYXBwZW5kIHRoaXMgY29kZSB1bml0LCBpbiBjYXNlIHRoZSBuZXh0XG5cdFx0XHRcdFx0Ly8gY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdGNvdW50ZXItLTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBzdHJpbmcgYmFzZWQgb24gYW4gYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cblx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5kZWNvZGVgXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZS51Y3MyXG5cdCAqIEBuYW1lIGVuY29kZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBjb2RlUG9pbnRzIFRoZSBhcnJheSBvZiBudW1lcmljIGNvZGUgcG9pbnRzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgbmV3IFVuaWNvZGUgc3RyaW5nIChVQ1MtMikuXG5cdCAqL1xuXHRmdW5jdGlvbiB1Y3MyZW5jb2RlKGFycmF5KSB7XG5cdFx0cmV0dXJuIG1hcChhcnJheSwgZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHRcdGlmICh2YWx1ZSA+IDB4RkZGRikge1xuXHRcdFx0XHR2YWx1ZSAtPSAweDEwMDAwO1xuXHRcdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKTtcblx0XHRcdFx0dmFsdWUgPSAweERDMDAgfCB2YWx1ZSAmIDB4M0ZGO1xuXHRcdFx0fVxuXHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSk7XG5cdFx0XHRyZXR1cm4gb3V0cHV0O1xuXHRcdH0pLmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgYmFzaWMgY29kZSBwb2ludCBpbnRvIGEgZGlnaXQvaW50ZWdlci5cblx0ICogQHNlZSBgZGlnaXRUb0Jhc2ljKClgXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlUG9pbnQgVGhlIGJhc2ljIG51bWVyaWMgY29kZSBwb2ludCB2YWx1ZS5cblx0ICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWVyaWMgdmFsdWUgb2YgYSBiYXNpYyBjb2RlIHBvaW50IChmb3IgdXNlIGluXG5cdCAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaW4gdGhlIHJhbmdlIGAwYCB0byBgYmFzZSAtIDFgLCBvciBgYmFzZWAgaWZcblx0ICogdGhlIGNvZGUgcG9pbnQgZG9lcyBub3QgcmVwcmVzZW50IGEgdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBiYXNpY1RvRGlnaXQoY29kZVBvaW50KSB7XG5cdFx0aWYgKGNvZGVQb2ludCAtIDQ4IDwgMTApIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSAyMjtcblx0XHR9XG5cdFx0aWYgKGNvZGVQb2ludCAtIDY1IDwgMjYpIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSA2NTtcblx0XHR9XG5cdFx0aWYgKGNvZGVQb2ludCAtIDk3IDwgMjYpIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSA5Nztcblx0XHR9XG5cdFx0cmV0dXJuIGJhc2U7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBkaWdpdC9pbnRlZ2VyIGludG8gYSBiYXNpYyBjb2RlIHBvaW50LlxuXHQgKiBAc2VlIGBiYXNpY1RvRGlnaXQoKWBcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRpZ2l0IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludC5cblx0ICogQHJldHVybnMge051bWJlcn0gVGhlIGJhc2ljIGNvZGUgcG9pbnQgd2hvc2UgdmFsdWUgKHdoZW4gdXNlZCBmb3Jcblx0ICogcmVwcmVzZW50aW5nIGludGVnZXJzKSBpcyBgZGlnaXRgLCB3aGljaCBuZWVkcyB0byBiZSBpbiB0aGUgcmFuZ2Vcblx0ICogYDBgIHRvIGBiYXNlIC0gMWAuIElmIGBmbGFnYCBpcyBub24temVybywgdGhlIHVwcGVyY2FzZSBmb3JtIGlzXG5cdCAqIHVzZWQ7IGVsc2UsIHRoZSBsb3dlcmNhc2UgZm9ybSBpcyB1c2VkLiBUaGUgYmVoYXZpb3IgaXMgdW5kZWZpbmVkXG5cdCAqIGlmIGBmbGFnYCBpcyBub24temVybyBhbmQgYGRpZ2l0YCBoYXMgbm8gdXBwZXJjYXNlIGZvcm0uXG5cdCAqL1xuXHRmdW5jdGlvbiBkaWdpdFRvQmFzaWMoZGlnaXQsIGZsYWcpIHtcblx0XHQvLyAgMC4uMjUgbWFwIHRvIEFTQ0lJIGEuLnogb3IgQS4uWlxuXHRcdC8vIDI2Li4zNSBtYXAgdG8gQVNDSUkgMC4uOVxuXHRcdHJldHVybiBkaWdpdCArIDIyICsgNzUgKiAoZGlnaXQgPCAyNikgLSAoKGZsYWcgIT0gMCkgPDwgNSk7XG5cdH1cblxuXHQvKipcblx0ICogQmlhcyBhZGFwdGF0aW9uIGZ1bmN0aW9uIGFzIHBlciBzZWN0aW9uIDMuNCBvZiBSRkMgMzQ5Mi5cblx0ICogaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzQ5MiNzZWN0aW9uLTMuNFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0ZnVuY3Rpb24gYWRhcHQoZGVsdGEsIG51bVBvaW50cywgZmlyc3RUaW1lKSB7XG5cdFx0dmFyIGsgPSAwO1xuXHRcdGRlbHRhID0gZmlyc3RUaW1lID8gZmxvb3IoZGVsdGEgLyBkYW1wKSA6IGRlbHRhID4+IDE7XG5cdFx0ZGVsdGEgKz0gZmxvb3IoZGVsdGEgLyBudW1Qb2ludHMpO1xuXHRcdGZvciAoLyogbm8gaW5pdGlhbGl6YXRpb24gKi87IGRlbHRhID4gYmFzZU1pbnVzVE1pbiAqIHRNYXggPj4gMTsgayArPSBiYXNlKSB7XG5cdFx0XHRkZWx0YSA9IGZsb29yKGRlbHRhIC8gYmFzZU1pbnVzVE1pbik7XG5cdFx0fVxuXHRcdHJldHVybiBmbG9vcihrICsgKGJhc2VNaW51c1RNaW4gKyAxKSAqIGRlbHRhIC8gKGRlbHRhICsgc2tldykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scyB0byBhIHN0cmluZyBvZiBVbmljb2RlXG5cdCAqIHN5bWJvbHMuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSByZXN1bHRpbmcgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cblx0ICovXG5cdGZ1bmN0aW9uIGRlY29kZShpbnB1dCkge1xuXHRcdC8vIERvbid0IHVzZSBVQ1MtMlxuXHRcdHZhciBvdXRwdXQgPSBbXSxcblx0XHQgICAgaW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGgsXG5cdFx0ICAgIG91dCxcblx0XHQgICAgaSA9IDAsXG5cdFx0ICAgIG4gPSBpbml0aWFsTixcblx0XHQgICAgYmlhcyA9IGluaXRpYWxCaWFzLFxuXHRcdCAgICBiYXNpYyxcblx0XHQgICAgaixcblx0XHQgICAgaW5kZXgsXG5cdFx0ICAgIG9sZGksXG5cdFx0ICAgIHcsXG5cdFx0ICAgIGssXG5cdFx0ICAgIGRpZ2l0LFxuXHRcdCAgICB0LFxuXHRcdCAgICAvKiogQ2FjaGVkIGNhbGN1bGF0aW9uIHJlc3VsdHMgKi9cblx0XHQgICAgYmFzZU1pbnVzVDtcblxuXHRcdC8vIEhhbmRsZSB0aGUgYmFzaWMgY29kZSBwb2ludHM6IGxldCBgYmFzaWNgIGJlIHRoZSBudW1iZXIgb2YgaW5wdXQgY29kZVxuXHRcdC8vIHBvaW50cyBiZWZvcmUgdGhlIGxhc3QgZGVsaW1pdGVyLCBvciBgMGAgaWYgdGhlcmUgaXMgbm9uZSwgdGhlbiBjb3B5XG5cdFx0Ly8gdGhlIGZpcnN0IGJhc2ljIGNvZGUgcG9pbnRzIHRvIHRoZSBvdXRwdXQuXG5cblx0XHRiYXNpYyA9IGlucHV0Lmxhc3RJbmRleE9mKGRlbGltaXRlcik7XG5cdFx0aWYgKGJhc2ljIDwgMCkge1xuXHRcdFx0YmFzaWMgPSAwO1xuXHRcdH1cblxuXHRcdGZvciAoaiA9IDA7IGogPCBiYXNpYzsgKytqKSB7XG5cdFx0XHQvLyBpZiBpdCdzIG5vdCBhIGJhc2ljIGNvZGUgcG9pbnRcblx0XHRcdGlmIChpbnB1dC5jaGFyQ29kZUF0KGopID49IDB4ODApIHtcblx0XHRcdFx0ZXJyb3IoJ25vdC1iYXNpYycpO1xuXHRcdFx0fVxuXHRcdFx0b3V0cHV0LnB1c2goaW5wdXQuY2hhckNvZGVBdChqKSk7XG5cdFx0fVxuXG5cdFx0Ly8gTWFpbiBkZWNvZGluZyBsb29wOiBzdGFydCBqdXN0IGFmdGVyIHRoZSBsYXN0IGRlbGltaXRlciBpZiBhbnkgYmFzaWMgY29kZVxuXHRcdC8vIHBvaW50cyB3ZXJlIGNvcGllZDsgc3RhcnQgYXQgdGhlIGJlZ2lubmluZyBvdGhlcndpc2UuXG5cblx0XHRmb3IgKGluZGV4ID0gYmFzaWMgPiAwID8gYmFzaWMgKyAxIDogMDsgaW5kZXggPCBpbnB1dExlbmd0aDsgLyogbm8gZmluYWwgZXhwcmVzc2lvbiAqLykge1xuXG5cdFx0XHQvLyBgaW5kZXhgIGlzIHRoZSBpbmRleCBvZiB0aGUgbmV4dCBjaGFyYWN0ZXIgdG8gYmUgY29uc3VtZWQuXG5cdFx0XHQvLyBEZWNvZGUgYSBnZW5lcmFsaXplZCB2YXJpYWJsZS1sZW5ndGggaW50ZWdlciBpbnRvIGBkZWx0YWAsXG5cdFx0XHQvLyB3aGljaCBnZXRzIGFkZGVkIHRvIGBpYC4gVGhlIG92ZXJmbG93IGNoZWNraW5nIGlzIGVhc2llclxuXHRcdFx0Ly8gaWYgd2UgaW5jcmVhc2UgYGlgIGFzIHdlIGdvLCB0aGVuIHN1YnRyYWN0IG9mZiBpdHMgc3RhcnRpbmdcblx0XHRcdC8vIHZhbHVlIGF0IHRoZSBlbmQgdG8gb2J0YWluIGBkZWx0YWAuXG5cdFx0XHRmb3IgKG9sZGkgPSBpLCB3ID0gMSwgayA9IGJhc2U7IC8qIG5vIGNvbmRpdGlvbiAqLzsgayArPSBiYXNlKSB7XG5cblx0XHRcdFx0aWYgKGluZGV4ID49IGlucHV0TGVuZ3RoKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ2ludmFsaWQtaW5wdXQnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRpZ2l0ID0gYmFzaWNUb0RpZ2l0KGlucHV0LmNoYXJDb2RlQXQoaW5kZXgrKykpO1xuXG5cdFx0XHRcdGlmIChkaWdpdCA+PSBiYXNlIHx8IGRpZ2l0ID4gZmxvb3IoKG1heEludCAtIGkpIC8gdykpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGkgKz0gZGlnaXQgKiB3O1xuXHRcdFx0XHR0ID0gayA8PSBiaWFzID8gdE1pbiA6IChrID49IGJpYXMgKyB0TWF4ID8gdE1heCA6IGsgLSBiaWFzKTtcblxuXHRcdFx0XHRpZiAoZGlnaXQgPCB0KSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRiYXNlTWludXNUID0gYmFzZSAtIHQ7XG5cdFx0XHRcdGlmICh3ID4gZmxvb3IobWF4SW50IC8gYmFzZU1pbnVzVCkpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHcgKj0gYmFzZU1pbnVzVDtcblxuXHRcdFx0fVxuXG5cdFx0XHRvdXQgPSBvdXRwdXQubGVuZ3RoICsgMTtcblx0XHRcdGJpYXMgPSBhZGFwdChpIC0gb2xkaSwgb3V0LCBvbGRpID09IDApO1xuXG5cdFx0XHQvLyBgaWAgd2FzIHN1cHBvc2VkIHRvIHdyYXAgYXJvdW5kIGZyb20gYG91dGAgdG8gYDBgLFxuXHRcdFx0Ly8gaW5jcmVtZW50aW5nIGBuYCBlYWNoIHRpbWUsIHNvIHdlJ2xsIGZpeCB0aGF0IG5vdzpcblx0XHRcdGlmIChmbG9vcihpIC8gb3V0KSA+IG1heEludCAtIG4pIHtcblx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHR9XG5cblx0XHRcdG4gKz0gZmxvb3IoaSAvIG91dCk7XG5cdFx0XHRpICU9IG91dDtcblxuXHRcdFx0Ly8gSW5zZXJ0IGBuYCBhdCBwb3NpdGlvbiBgaWAgb2YgdGhlIG91dHB1dFxuXHRcdFx0b3V0cHV0LnNwbGljZShpKyssIDAsIG4pO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVjczJlbmNvZGUob3V0cHV0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMgKGUuZy4gYSBkb21haW4gbmFtZSBsYWJlbCkgdG8gYVxuXHQgKiBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBlbmNvZGUoaW5wdXQpIHtcblx0XHR2YXIgbixcblx0XHQgICAgZGVsdGEsXG5cdFx0ICAgIGhhbmRsZWRDUENvdW50LFxuXHRcdCAgICBiYXNpY0xlbmd0aCxcblx0XHQgICAgYmlhcyxcblx0XHQgICAgaixcblx0XHQgICAgbSxcblx0XHQgICAgcSxcblx0XHQgICAgayxcblx0XHQgICAgdCxcblx0XHQgICAgY3VycmVudFZhbHVlLFxuXHRcdCAgICBvdXRwdXQgPSBbXSxcblx0XHQgICAgLyoqIGBpbnB1dExlbmd0aGAgd2lsbCBob2xkIHRoZSBudW1iZXIgb2YgY29kZSBwb2ludHMgaW4gYGlucHV0YC4gKi9cblx0XHQgICAgaW5wdXRMZW5ndGgsXG5cdFx0ICAgIC8qKiBDYWNoZWQgY2FsY3VsYXRpb24gcmVzdWx0cyAqL1xuXHRcdCAgICBoYW5kbGVkQ1BDb3VudFBsdXNPbmUsXG5cdFx0ICAgIGJhc2VNaW51c1QsXG5cdFx0ICAgIHFNaW51c1Q7XG5cblx0XHQvLyBDb252ZXJ0IHRoZSBpbnB1dCBpbiBVQ1MtMiB0byBVbmljb2RlXG5cdFx0aW5wdXQgPSB1Y3MyZGVjb2RlKGlucHV0KTtcblxuXHRcdC8vIENhY2hlIHRoZSBsZW5ndGhcblx0XHRpbnB1dExlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblxuXHRcdC8vIEluaXRpYWxpemUgdGhlIHN0YXRlXG5cdFx0biA9IGluaXRpYWxOO1xuXHRcdGRlbHRhID0gMDtcblx0XHRiaWFzID0gaW5pdGlhbEJpYXM7XG5cblx0XHQvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzXG5cdFx0Zm9yIChqID0gMDsgaiA8IGlucHV0TGVuZ3RoOyArK2opIHtcblx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA8IDB4ODApIHtcblx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGN1cnJlbnRWYWx1ZSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGhhbmRsZWRDUENvdW50ID0gYmFzaWNMZW5ndGggPSBvdXRwdXQubGVuZ3RoO1xuXG5cdFx0Ly8gYGhhbmRsZWRDUENvdW50YCBpcyB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIHRoYXQgaGF2ZSBiZWVuIGhhbmRsZWQ7XG5cdFx0Ly8gYGJhc2ljTGVuZ3RoYCBpcyB0aGUgbnVtYmVyIG9mIGJhc2ljIGNvZGUgcG9pbnRzLlxuXG5cdFx0Ly8gRmluaXNoIHRoZSBiYXNpYyBzdHJpbmcgLSBpZiBpdCBpcyBub3QgZW1wdHkgLSB3aXRoIGEgZGVsaW1pdGVyXG5cdFx0aWYgKGJhc2ljTGVuZ3RoKSB7XG5cdFx0XHRvdXRwdXQucHVzaChkZWxpbWl0ZXIpO1xuXHRcdH1cblxuXHRcdC8vIE1haW4gZW5jb2RpbmcgbG9vcDpcblx0XHR3aGlsZSAoaGFuZGxlZENQQ291bnQgPCBpbnB1dExlbmd0aCkge1xuXG5cdFx0XHQvLyBBbGwgbm9uLWJhc2ljIGNvZGUgcG9pbnRzIDwgbiBoYXZlIGJlZW4gaGFuZGxlZCBhbHJlYWR5LiBGaW5kIHRoZSBuZXh0XG5cdFx0XHQvLyBsYXJnZXIgb25lOlxuXHRcdFx0Zm9yIChtID0gbWF4SW50LCBqID0gMDsgaiA8IGlucHV0TGVuZ3RoOyArK2opIHtcblx0XHRcdFx0Y3VycmVudFZhbHVlID0gaW5wdXRbal07XG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPj0gbiAmJiBjdXJyZW50VmFsdWUgPCBtKSB7XG5cdFx0XHRcdFx0bSA9IGN1cnJlbnRWYWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJbmNyZWFzZSBgZGVsdGFgIGVub3VnaCB0byBhZHZhbmNlIHRoZSBkZWNvZGVyJ3MgPG4saT4gc3RhdGUgdG8gPG0sMD4sXG5cdFx0XHQvLyBidXQgZ3VhcmQgYWdhaW5zdCBvdmVyZmxvd1xuXHRcdFx0aGFuZGxlZENQQ291bnRQbHVzT25lID0gaGFuZGxlZENQQ291bnQgKyAxO1xuXHRcdFx0aWYgKG0gLSBuID4gZmxvb3IoKG1heEludCAtIGRlbHRhKSAvIGhhbmRsZWRDUENvdW50UGx1c09uZSkpIHtcblx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHR9XG5cblx0XHRcdGRlbHRhICs9IChtIC0gbikgKiBoYW5kbGVkQ1BDb3VudFBsdXNPbmU7XG5cdFx0XHRuID0gbTtcblxuXHRcdFx0Zm9yIChqID0gMDsgaiA8IGlucHV0TGVuZ3RoOyArK2opIHtcblx0XHRcdFx0Y3VycmVudFZhbHVlID0gaW5wdXRbal07XG5cblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA8IG4gJiYgKytkZWx0YSA+IG1heEludCkge1xuXHRcdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA9PSBuKSB7XG5cdFx0XHRcdFx0Ly8gUmVwcmVzZW50IGRlbHRhIGFzIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXJcblx0XHRcdFx0XHRmb3IgKHEgPSBkZWx0YSwgayA9IGJhc2U7IC8qIG5vIGNvbmRpdGlvbiAqLzsgayArPSBiYXNlKSB7XG5cdFx0XHRcdFx0XHR0ID0gayA8PSBiaWFzID8gdE1pbiA6IChrID49IGJpYXMgKyB0TWF4ID8gdE1heCA6IGsgLSBiaWFzKTtcblx0XHRcdFx0XHRcdGlmIChxIDwgdCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHFNaW51c1QgPSBxIC0gdDtcblx0XHRcdFx0XHRcdGJhc2VNaW51c1QgPSBiYXNlIC0gdDtcblx0XHRcdFx0XHRcdG91dHB1dC5wdXNoKFxuXHRcdFx0XHRcdFx0XHRzdHJpbmdGcm9tQ2hhckNvZGUoZGlnaXRUb0Jhc2ljKHQgKyBxTWludXNUICUgYmFzZU1pbnVzVCwgMCkpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0cSA9IGZsb29yKHFNaW51c1QgLyBiYXNlTWludXNUKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRvdXRwdXQucHVzaChzdHJpbmdGcm9tQ2hhckNvZGUoZGlnaXRUb0Jhc2ljKHEsIDApKSk7XG5cdFx0XHRcdFx0YmlhcyA9IGFkYXB0KGRlbHRhLCBoYW5kbGVkQ1BDb3VudFBsdXNPbmUsIGhhbmRsZWRDUENvdW50ID09IGJhc2ljTGVuZ3RoKTtcblx0XHRcdFx0XHRkZWx0YSA9IDA7XG5cdFx0XHRcdFx0KytoYW5kbGVkQ1BDb3VudDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQrK2RlbHRhO1xuXHRcdFx0KytuO1xuXG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQuam9pbignJyk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBQdW55Y29kZSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgZG9tYWluIG5hbWUgb3IgYW4gZW1haWwgYWRkcmVzc1xuXHQgKiB0byBVbmljb2RlLiBPbmx5IHRoZSBQdW55Y29kZWQgcGFydHMgb2YgdGhlIGlucHV0IHdpbGwgYmUgY29udmVydGVkLCBpLmUuXG5cdCAqIGl0IGRvZXNuJ3QgbWF0dGVyIGlmIHlvdSBjYWxsIGl0IG9uIGEgc3RyaW5nIHRoYXQgaGFzIGFscmVhZHkgYmVlblxuXHQgKiBjb252ZXJ0ZWQgdG8gVW5pY29kZS5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgUHVueWNvZGVkIGRvbWFpbiBuYW1lIG9yIGVtYWlsIGFkZHJlc3MgdG9cblx0ICogY29udmVydCB0byBVbmljb2RlLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgVW5pY29kZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gUHVueWNvZGVcblx0ICogc3RyaW5nLlxuXHQgKi9cblx0ZnVuY3Rpb24gdG9Vbmljb2RlKGlucHV0KSB7XG5cdFx0cmV0dXJuIG1hcERvbWFpbihpbnB1dCwgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gcmVnZXhQdW55Y29kZS50ZXN0KHN0cmluZylcblx0XHRcdFx0PyBkZWNvZGUoc3RyaW5nLnNsaWNlKDQpLnRvTG93ZXJDYXNlKCkpXG5cdFx0XHRcdDogc3RyaW5nO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgVW5pY29kZSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgZG9tYWluIG5hbWUgb3IgYW4gZW1haWwgYWRkcmVzcyB0b1xuXHQgKiBQdW55Y29kZS4gT25seSB0aGUgbm9uLUFTQ0lJIHBhcnRzIG9mIHRoZSBkb21haW4gbmFtZSB3aWxsIGJlIGNvbnZlcnRlZCxcblx0ICogaS5lLiBpdCBkb2Vzbid0IG1hdHRlciBpZiB5b3UgY2FsbCBpdCB3aXRoIGEgZG9tYWluIHRoYXQncyBhbHJlYWR5IGluXG5cdCAqIEFTQ0lJLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzIHRvIGNvbnZlcnQsIGFzIGFcblx0ICogVW5pY29kZSBzdHJpbmcuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBQdW55Y29kZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gZG9tYWluIG5hbWUgb3Jcblx0ICogZW1haWwgYWRkcmVzcy5cblx0ICovXG5cdGZ1bmN0aW9uIHRvQVNDSUkoaW5wdXQpIHtcblx0XHRyZXR1cm4gbWFwRG9tYWluKGlucHV0LCBmdW5jdGlvbihzdHJpbmcpIHtcblx0XHRcdHJldHVybiByZWdleE5vbkFTQ0lJLnRlc3Qoc3RyaW5nKVxuXHRcdFx0XHQ/ICd4bi0tJyArIGVuY29kZShzdHJpbmcpXG5cdFx0XHRcdDogc3RyaW5nO1xuXHRcdH0pO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqIERlZmluZSB0aGUgcHVibGljIEFQSSAqL1xuXHRwdW55Y29kZSA9IHtcblx0XHQvKipcblx0XHQgKiBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgUHVueWNvZGUuanMgdmVyc2lvbiBudW1iZXIuXG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHR5cGUgU3RyaW5nXG5cdFx0ICovXG5cdFx0J3ZlcnNpb24nOiAnMS4zLjInLFxuXHRcdC8qKlxuXHRcdCAqIEFuIG9iamVjdCBvZiBtZXRob2RzIHRvIGNvbnZlcnQgZnJvbSBKYXZhU2NyaXB0J3MgaW50ZXJuYWwgY2hhcmFjdGVyXG5cdFx0ICogcmVwcmVzZW50YXRpb24gKFVDUy0yKSB0byBVbmljb2RlIGNvZGUgcG9pbnRzLCBhbmQgYmFjay5cblx0XHQgKiBAc2VlIDxodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZz5cblx0XHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0XHQgKiBAdHlwZSBPYmplY3Rcblx0XHQgKi9cblx0XHQndWNzMic6IHtcblx0XHRcdCdkZWNvZGUnOiB1Y3MyZGVjb2RlLFxuXHRcdFx0J2VuY29kZSc6IHVjczJlbmNvZGVcblx0XHR9LFxuXHRcdCdkZWNvZGUnOiBkZWNvZGUsXG5cdFx0J2VuY29kZSc6IGVuY29kZSxcblx0XHQndG9BU0NJSSc6IHRvQVNDSUksXG5cdFx0J3RvVW5pY29kZSc6IHRvVW5pY29kZVxuXHR9O1xuXG5cdC8qKiBFeHBvc2UgYHB1bnljb2RlYCAqL1xuXHQvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcblx0Ly8gbGlrZSB0aGUgZm9sbG93aW5nOlxuXHRpZiAoXG5cdFx0dHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiZcblx0XHRkZWZpbmUuYW1kXG5cdCkge1xuXHRcdGRlZmluZSgncHVueWNvZGUnLCBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBwdW55Y29kZTtcblx0XHR9KTtcblx0fSBlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiBmcmVlTW9kdWxlKSB7XG5cdFx0aWYgKG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzKSB7IC8vIGluIE5vZGUuanMgb3IgUmluZ29KUyB2MC44LjArXG5cdFx0XHRmcmVlTW9kdWxlLmV4cG9ydHMgPSBwdW55Y29kZTtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0Zm9yIChrZXkgaW4gcHVueWNvZGUpIHtcblx0XHRcdFx0cHVueWNvZGUuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IHB1bnljb2RlW2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QucHVueWNvZGUgPSBwdW55Y29kZTtcblx0fVxuXG59KHRoaXMpKTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwdW55Y29kZSA9IHJlcXVpcmUoJ3B1bnljb2RlJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5leHBvcnRzLnBhcnNlID0gdXJsUGFyc2U7XG5leHBvcnRzLnJlc29sdmUgPSB1cmxSZXNvbHZlO1xuZXhwb3J0cy5yZXNvbHZlT2JqZWN0ID0gdXJsUmVzb2x2ZU9iamVjdDtcbmV4cG9ydHMuZm9ybWF0ID0gdXJsRm9ybWF0O1xuXG5leHBvcnRzLlVybCA9IFVybDtcblxuZnVuY3Rpb24gVXJsKCkge1xuICB0aGlzLnByb3RvY29sID0gbnVsbDtcbiAgdGhpcy5zbGFzaGVzID0gbnVsbDtcbiAgdGhpcy5hdXRoID0gbnVsbDtcbiAgdGhpcy5ob3N0ID0gbnVsbDtcbiAgdGhpcy5wb3J0ID0gbnVsbDtcbiAgdGhpcy5ob3N0bmFtZSA9IG51bGw7XG4gIHRoaXMuaGFzaCA9IG51bGw7XG4gIHRoaXMuc2VhcmNoID0gbnVsbDtcbiAgdGhpcy5xdWVyeSA9IG51bGw7XG4gIHRoaXMucGF0aG5hbWUgPSBudWxsO1xuICB0aGlzLnBhdGggPSBudWxsO1xuICB0aGlzLmhyZWYgPSBudWxsO1xufVxuXG4vLyBSZWZlcmVuY2U6IFJGQyAzOTg2LCBSRkMgMTgwOCwgUkZDIDIzOTZcblxuLy8gZGVmaW5lIHRoZXNlIGhlcmUgc28gYXQgbGVhc3QgdGhleSBvbmx5IGhhdmUgdG8gYmVcbi8vIGNvbXBpbGVkIG9uY2Ugb24gdGhlIGZpcnN0IG1vZHVsZSBsb2FkLlxudmFyIHByb3RvY29sUGF0dGVybiA9IC9eKFthLXowLTkuKy1dKzopL2ksXG4gICAgcG9ydFBhdHRlcm4gPSAvOlswLTldKiQvLFxuXG4gICAgLy8gU3BlY2lhbCBjYXNlIGZvciBhIHNpbXBsZSBwYXRoIFVSTFxuICAgIHNpbXBsZVBhdGhQYXR0ZXJuID0gL14oXFwvXFwvPyg/IVxcLylbXlxcP1xcc10qKShcXD9bXlxcc10qKT8kLyxcblxuICAgIC8vIFJGQyAyMzk2OiBjaGFyYWN0ZXJzIHJlc2VydmVkIGZvciBkZWxpbWl0aW5nIFVSTHMuXG4gICAgLy8gV2UgYWN0dWFsbHkganVzdCBhdXRvLWVzY2FwZSB0aGVzZS5cbiAgICBkZWxpbXMgPSBbJzwnLCAnPicsICdcIicsICdgJywgJyAnLCAnXFxyJywgJ1xcbicsICdcXHQnXSxcblxuICAgIC8vIFJGQyAyMzk2OiBjaGFyYWN0ZXJzIG5vdCBhbGxvd2VkIGZvciB2YXJpb3VzIHJlYXNvbnMuXG4gICAgdW53aXNlID0gWyd7JywgJ30nLCAnfCcsICdcXFxcJywgJ14nLCAnYCddLmNvbmNhdChkZWxpbXMpLFxuXG4gICAgLy8gQWxsb3dlZCBieSBSRkNzLCBidXQgY2F1c2Ugb2YgWFNTIGF0dGFja3MuICBBbHdheXMgZXNjYXBlIHRoZXNlLlxuICAgIGF1dG9Fc2NhcGUgPSBbJ1xcJyddLmNvbmNhdCh1bndpc2UpLFxuICAgIC8vIENoYXJhY3RlcnMgdGhhdCBhcmUgbmV2ZXIgZXZlciBhbGxvd2VkIGluIGEgaG9zdG5hbWUuXG4gICAgLy8gTm90ZSB0aGF0IGFueSBpbnZhbGlkIGNoYXJzIGFyZSBhbHNvIGhhbmRsZWQsIGJ1dCB0aGVzZVxuICAgIC8vIGFyZSB0aGUgb25lcyB0aGF0IGFyZSAqZXhwZWN0ZWQqIHRvIGJlIHNlZW4sIHNvIHdlIGZhc3QtcGF0aFxuICAgIC8vIHRoZW0uXG4gICAgbm9uSG9zdENoYXJzID0gWyclJywgJy8nLCAnPycsICc7JywgJyMnXS5jb25jYXQoYXV0b0VzY2FwZSksXG4gICAgaG9zdEVuZGluZ0NoYXJzID0gWycvJywgJz8nLCAnIyddLFxuICAgIGhvc3RuYW1lTWF4TGVuID0gMjU1LFxuICAgIGhvc3RuYW1lUGFydFBhdHRlcm4gPSAvXlsrYS16MC05QS1aXy1dezAsNjN9JC8sXG4gICAgaG9zdG5hbWVQYXJ0U3RhcnQgPSAvXihbK2EtejAtOUEtWl8tXXswLDYzfSkoLiopJC8sXG4gICAgLy8gcHJvdG9jb2xzIHRoYXQgY2FuIGFsbG93IFwidW5zYWZlXCIgYW5kIFwidW53aXNlXCIgY2hhcnMuXG4gICAgdW5zYWZlUHJvdG9jb2wgPSB7XG4gICAgICAnamF2YXNjcmlwdCc6IHRydWUsXG4gICAgICAnamF2YXNjcmlwdDonOiB0cnVlXG4gICAgfSxcbiAgICAvLyBwcm90b2NvbHMgdGhhdCBuZXZlciBoYXZlIGEgaG9zdG5hbWUuXG4gICAgaG9zdGxlc3NQcm90b2NvbCA9IHtcbiAgICAgICdqYXZhc2NyaXB0JzogdHJ1ZSxcbiAgICAgICdqYXZhc2NyaXB0Oic6IHRydWVcbiAgICB9LFxuICAgIC8vIHByb3RvY29scyB0aGF0IGFsd2F5cyBjb250YWluIGEgLy8gYml0LlxuICAgIHNsYXNoZWRQcm90b2NvbCA9IHtcbiAgICAgICdodHRwJzogdHJ1ZSxcbiAgICAgICdodHRwcyc6IHRydWUsXG4gICAgICAnZnRwJzogdHJ1ZSxcbiAgICAgICdnb3BoZXInOiB0cnVlLFxuICAgICAgJ2ZpbGUnOiB0cnVlLFxuICAgICAgJ2h0dHA6JzogdHJ1ZSxcbiAgICAgICdodHRwczonOiB0cnVlLFxuICAgICAgJ2Z0cDonOiB0cnVlLFxuICAgICAgJ2dvcGhlcjonOiB0cnVlLFxuICAgICAgJ2ZpbGU6JzogdHJ1ZVxuICAgIH0sXG4gICAgcXVlcnlzdHJpbmcgPSByZXF1aXJlKCdxdWVyeXN0cmluZycpO1xuXG5mdW5jdGlvbiB1cmxQYXJzZSh1cmwsIHBhcnNlUXVlcnlTdHJpbmcsIHNsYXNoZXNEZW5vdGVIb3N0KSB7XG4gIGlmICh1cmwgJiYgdXRpbC5pc09iamVjdCh1cmwpICYmIHVybCBpbnN0YW5jZW9mIFVybCkgcmV0dXJuIHVybDtcblxuICB2YXIgdSA9IG5ldyBVcmw7XG4gIHUucGFyc2UodXJsLCBwYXJzZVF1ZXJ5U3RyaW5nLCBzbGFzaGVzRGVub3RlSG9zdCk7XG4gIHJldHVybiB1O1xufVxuXG5VcmwucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24odXJsLCBwYXJzZVF1ZXJ5U3RyaW5nLCBzbGFzaGVzRGVub3RlSG9zdCkge1xuICBpZiAoIXV0aWwuaXNTdHJpbmcodXJsKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQYXJhbWV0ZXIgJ3VybCcgbXVzdCBiZSBhIHN0cmluZywgbm90IFwiICsgdHlwZW9mIHVybCk7XG4gIH1cblxuICAvLyBDb3B5IGNocm9tZSwgSUUsIG9wZXJhIGJhY2tzbGFzaC1oYW5kbGluZyBiZWhhdmlvci5cbiAgLy8gQmFjayBzbGFzaGVzIGJlZm9yZSB0aGUgcXVlcnkgc3RyaW5nIGdldCBjb252ZXJ0ZWQgdG8gZm9yd2FyZCBzbGFzaGVzXG4gIC8vIFNlZTogaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTI1OTE2XG4gIHZhciBxdWVyeUluZGV4ID0gdXJsLmluZGV4T2YoJz8nKSxcbiAgICAgIHNwbGl0dGVyID1cbiAgICAgICAgICAocXVlcnlJbmRleCAhPT0gLTEgJiYgcXVlcnlJbmRleCA8IHVybC5pbmRleE9mKCcjJykpID8gJz8nIDogJyMnLFxuICAgICAgdVNwbGl0ID0gdXJsLnNwbGl0KHNwbGl0dGVyKSxcbiAgICAgIHNsYXNoUmVnZXggPSAvXFxcXC9nO1xuICB1U3BsaXRbMF0gPSB1U3BsaXRbMF0ucmVwbGFjZShzbGFzaFJlZ2V4LCAnLycpO1xuICB1cmwgPSB1U3BsaXQuam9pbihzcGxpdHRlcik7XG5cbiAgdmFyIHJlc3QgPSB1cmw7XG5cbiAgLy8gdHJpbSBiZWZvcmUgcHJvY2VlZGluZy5cbiAgLy8gVGhpcyBpcyB0byBzdXBwb3J0IHBhcnNlIHN0dWZmIGxpa2UgXCIgIGh0dHA6Ly9mb28uY29tICBcXG5cIlxuICByZXN0ID0gcmVzdC50cmltKCk7XG5cbiAgaWYgKCFzbGFzaGVzRGVub3RlSG9zdCAmJiB1cmwuc3BsaXQoJyMnKS5sZW5ndGggPT09IDEpIHtcbiAgICAvLyBUcnkgZmFzdCBwYXRoIHJlZ2V4cFxuICAgIHZhciBzaW1wbGVQYXRoID0gc2ltcGxlUGF0aFBhdHRlcm4uZXhlYyhyZXN0KTtcbiAgICBpZiAoc2ltcGxlUGF0aCkge1xuICAgICAgdGhpcy5wYXRoID0gcmVzdDtcbiAgICAgIHRoaXMuaHJlZiA9IHJlc3Q7XG4gICAgICB0aGlzLnBhdGhuYW1lID0gc2ltcGxlUGF0aFsxXTtcbiAgICAgIGlmIChzaW1wbGVQYXRoWzJdKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoID0gc2ltcGxlUGF0aFsyXTtcbiAgICAgICAgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAgICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnlzdHJpbmcucGFyc2UodGhpcy5zZWFyY2guc3Vic3RyKDEpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5zZWFyY2guc3Vic3RyKDEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZWFyY2ggPSAnJztcbiAgICAgICAgdGhpcy5xdWVyeSA9IHt9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG5cbiAgdmFyIHByb3RvID0gcHJvdG9jb2xQYXR0ZXJuLmV4ZWMocmVzdCk7XG4gIGlmIChwcm90bykge1xuICAgIHByb3RvID0gcHJvdG9bMF07XG4gICAgdmFyIGxvd2VyUHJvdG8gPSBwcm90by50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMucHJvdG9jb2wgPSBsb3dlclByb3RvO1xuICAgIHJlc3QgPSByZXN0LnN1YnN0cihwcm90by5sZW5ndGgpO1xuICB9XG5cbiAgLy8gZmlndXJlIG91dCBpZiBpdCdzIGdvdCBhIGhvc3RcbiAgLy8gdXNlckBzZXJ2ZXIgaXMgKmFsd2F5cyogaW50ZXJwcmV0ZWQgYXMgYSBob3N0bmFtZSwgYW5kIHVybFxuICAvLyByZXNvbHV0aW9uIHdpbGwgdHJlYXQgLy9mb28vYmFyIGFzIGhvc3Q9Zm9vLHBhdGg9YmFyIGJlY2F1c2UgdGhhdCdzXG4gIC8vIGhvdyB0aGUgYnJvd3NlciByZXNvbHZlcyByZWxhdGl2ZSBVUkxzLlxuICBpZiAoc2xhc2hlc0Rlbm90ZUhvc3QgfHwgcHJvdG8gfHwgcmVzdC5tYXRjaCgvXlxcL1xcL1teQFxcL10rQFteQFxcL10rLykpIHtcbiAgICB2YXIgc2xhc2hlcyA9IHJlc3Quc3Vic3RyKDAsIDIpID09PSAnLy8nO1xuICAgIGlmIChzbGFzaGVzICYmICEocHJvdG8gJiYgaG9zdGxlc3NQcm90b2NvbFtwcm90b10pKSB7XG4gICAgICByZXN0ID0gcmVzdC5zdWJzdHIoMik7XG4gICAgICB0aGlzLnNsYXNoZXMgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGlmICghaG9zdGxlc3NQcm90b2NvbFtwcm90b10gJiZcbiAgICAgIChzbGFzaGVzIHx8IChwcm90byAmJiAhc2xhc2hlZFByb3RvY29sW3Byb3RvXSkpKSB7XG5cbiAgICAvLyB0aGVyZSdzIGEgaG9zdG5hbWUuXG4gICAgLy8gdGhlIGZpcnN0IGluc3RhbmNlIG9mIC8sID8sIDssIG9yICMgZW5kcyB0aGUgaG9zdC5cbiAgICAvL1xuICAgIC8vIElmIHRoZXJlIGlzIGFuIEAgaW4gdGhlIGhvc3RuYW1lLCB0aGVuIG5vbi1ob3N0IGNoYXJzICphcmUqIGFsbG93ZWRcbiAgICAvLyB0byB0aGUgbGVmdCBvZiB0aGUgbGFzdCBAIHNpZ24sIHVubGVzcyBzb21lIGhvc3QtZW5kaW5nIGNoYXJhY3RlclxuICAgIC8vIGNvbWVzICpiZWZvcmUqIHRoZSBALXNpZ24uXG4gICAgLy8gVVJMcyBhcmUgb2Jub3hpb3VzLlxuICAgIC8vXG4gICAgLy8gZXg6XG4gICAgLy8gaHR0cDovL2FAYkBjLyA9PiB1c2VyOmFAYiBob3N0OmNcbiAgICAvLyBodHRwOi8vYUBiP0BjID0+IHVzZXI6YSBob3N0OmMgcGF0aDovP0BjXG5cbiAgICAvLyB2MC4xMiBUT0RPKGlzYWFjcyk6IFRoaXMgaXMgbm90IHF1aXRlIGhvdyBDaHJvbWUgZG9lcyB0aGluZ3MuXG4gICAgLy8gUmV2aWV3IG91ciB0ZXN0IGNhc2UgYWdhaW5zdCBicm93c2VycyBtb3JlIGNvbXByZWhlbnNpdmVseS5cblxuICAgIC8vIGZpbmQgdGhlIGZpcnN0IGluc3RhbmNlIG9mIGFueSBob3N0RW5kaW5nQ2hhcnNcbiAgICB2YXIgaG9zdEVuZCA9IC0xO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaG9zdEVuZGluZ0NoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaGVjID0gcmVzdC5pbmRleE9mKGhvc3RFbmRpbmdDaGFyc1tpXSk7XG4gICAgICBpZiAoaGVjICE9PSAtMSAmJiAoaG9zdEVuZCA9PT0gLTEgfHwgaGVjIDwgaG9zdEVuZCkpXG4gICAgICAgIGhvc3RFbmQgPSBoZWM7XG4gICAgfVxuXG4gICAgLy8gYXQgdGhpcyBwb2ludCwgZWl0aGVyIHdlIGhhdmUgYW4gZXhwbGljaXQgcG9pbnQgd2hlcmUgdGhlXG4gICAgLy8gYXV0aCBwb3J0aW9uIGNhbm5vdCBnbyBwYXN0LCBvciB0aGUgbGFzdCBAIGNoYXIgaXMgdGhlIGRlY2lkZXIuXG4gICAgdmFyIGF1dGgsIGF0U2lnbjtcbiAgICBpZiAoaG9zdEVuZCA9PT0gLTEpIHtcbiAgICAgIC8vIGF0U2lnbiBjYW4gYmUgYW55d2hlcmUuXG4gICAgICBhdFNpZ24gPSByZXN0Lmxhc3RJbmRleE9mKCdAJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGF0U2lnbiBtdXN0IGJlIGluIGF1dGggcG9ydGlvbi5cbiAgICAgIC8vIGh0dHA6Ly9hQGIvY0BkID0+IGhvc3Q6YiBhdXRoOmEgcGF0aDovY0BkXG4gICAgICBhdFNpZ24gPSByZXN0Lmxhc3RJbmRleE9mKCdAJywgaG9zdEVuZCk7XG4gICAgfVxuXG4gICAgLy8gTm93IHdlIGhhdmUgYSBwb3J0aW9uIHdoaWNoIGlzIGRlZmluaXRlbHkgdGhlIGF1dGguXG4gICAgLy8gUHVsbCB0aGF0IG9mZi5cbiAgICBpZiAoYXRTaWduICE9PSAtMSkge1xuICAgICAgYXV0aCA9IHJlc3Quc2xpY2UoMCwgYXRTaWduKTtcbiAgICAgIHJlc3QgPSByZXN0LnNsaWNlKGF0U2lnbiArIDEpO1xuICAgICAgdGhpcy5hdXRoID0gZGVjb2RlVVJJQ29tcG9uZW50KGF1dGgpO1xuICAgIH1cblxuICAgIC8vIHRoZSBob3N0IGlzIHRoZSByZW1haW5pbmcgdG8gdGhlIGxlZnQgb2YgdGhlIGZpcnN0IG5vbi1ob3N0IGNoYXJcbiAgICBob3N0RW5kID0gLTE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub25Ib3N0Q2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBoZWMgPSByZXN0LmluZGV4T2Yobm9uSG9zdENoYXJzW2ldKTtcbiAgICAgIGlmIChoZWMgIT09IC0xICYmIChob3N0RW5kID09PSAtMSB8fCBoZWMgPCBob3N0RW5kKSlcbiAgICAgICAgaG9zdEVuZCA9IGhlYztcbiAgICB9XG4gICAgLy8gaWYgd2Ugc3RpbGwgaGF2ZSBub3QgaGl0IGl0LCB0aGVuIHRoZSBlbnRpcmUgdGhpbmcgaXMgYSBob3N0LlxuICAgIGlmIChob3N0RW5kID09PSAtMSlcbiAgICAgIGhvc3RFbmQgPSByZXN0Lmxlbmd0aDtcblxuICAgIHRoaXMuaG9zdCA9IHJlc3Quc2xpY2UoMCwgaG9zdEVuZCk7XG4gICAgcmVzdCA9IHJlc3Quc2xpY2UoaG9zdEVuZCk7XG5cbiAgICAvLyBwdWxsIG91dCBwb3J0LlxuICAgIHRoaXMucGFyc2VIb3N0KCk7XG5cbiAgICAvLyB3ZSd2ZSBpbmRpY2F0ZWQgdGhhdCB0aGVyZSBpcyBhIGhvc3RuYW1lLFxuICAgIC8vIHNvIGV2ZW4gaWYgaXQncyBlbXB0eSwgaXQgaGFzIHRvIGJlIHByZXNlbnQuXG4gICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUgfHwgJyc7XG5cbiAgICAvLyBpZiBob3N0bmFtZSBiZWdpbnMgd2l0aCBbIGFuZCBlbmRzIHdpdGggXVxuICAgIC8vIGFzc3VtZSB0aGF0IGl0J3MgYW4gSVB2NiBhZGRyZXNzLlxuICAgIHZhciBpcHY2SG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lWzBdID09PSAnWycgJiZcbiAgICAgICAgdGhpcy5ob3N0bmFtZVt0aGlzLmhvc3RuYW1lLmxlbmd0aCAtIDFdID09PSAnXSc7XG5cbiAgICAvLyB2YWxpZGF0ZSBhIGxpdHRsZS5cbiAgICBpZiAoIWlwdjZIb3N0bmFtZSkge1xuICAgICAgdmFyIGhvc3RwYXJ0cyA9IHRoaXMuaG9zdG5hbWUuc3BsaXQoL1xcLi8pO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBob3N0cGFydHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBwYXJ0ID0gaG9zdHBhcnRzW2ldO1xuICAgICAgICBpZiAoIXBhcnQpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoIXBhcnQubWF0Y2goaG9zdG5hbWVQYXJ0UGF0dGVybikpIHtcbiAgICAgICAgICB2YXIgbmV3cGFydCA9ICcnO1xuICAgICAgICAgIGZvciAodmFyIGogPSAwLCBrID0gcGFydC5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChwYXJ0LmNoYXJDb2RlQXQoaikgPiAxMjcpIHtcbiAgICAgICAgICAgICAgLy8gd2UgcmVwbGFjZSBub24tQVNDSUkgY2hhciB3aXRoIGEgdGVtcG9yYXJ5IHBsYWNlaG9sZGVyXG4gICAgICAgICAgICAgIC8vIHdlIG5lZWQgdGhpcyB0byBtYWtlIHN1cmUgc2l6ZSBvZiBob3N0bmFtZSBpcyBub3RcbiAgICAgICAgICAgICAgLy8gYnJva2VuIGJ5IHJlcGxhY2luZyBub24tQVNDSUkgYnkgbm90aGluZ1xuICAgICAgICAgICAgICBuZXdwYXJ0ICs9ICd4JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5ld3BhcnQgKz0gcGFydFtqXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gd2UgdGVzdCBhZ2FpbiB3aXRoIEFTQ0lJIGNoYXIgb25seVxuICAgICAgICAgIGlmICghbmV3cGFydC5tYXRjaChob3N0bmFtZVBhcnRQYXR0ZXJuKSkge1xuICAgICAgICAgICAgdmFyIHZhbGlkUGFydHMgPSBob3N0cGFydHMuc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICB2YXIgbm90SG9zdCA9IGhvc3RwYXJ0cy5zbGljZShpICsgMSk7XG4gICAgICAgICAgICB2YXIgYml0ID0gcGFydC5tYXRjaChob3N0bmFtZVBhcnRTdGFydCk7XG4gICAgICAgICAgICBpZiAoYml0KSB7XG4gICAgICAgICAgICAgIHZhbGlkUGFydHMucHVzaChiaXRbMV0pO1xuICAgICAgICAgICAgICBub3RIb3N0LnVuc2hpZnQoYml0WzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub3RIb3N0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICByZXN0ID0gJy8nICsgbm90SG9zdC5qb2luKCcuJykgKyByZXN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ob3N0bmFtZSA9IHZhbGlkUGFydHMuam9pbignLicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaG9zdG5hbWUubGVuZ3RoID4gaG9zdG5hbWVNYXhMZW4pIHtcbiAgICAgIHRoaXMuaG9zdG5hbWUgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaG9zdG5hbWVzIGFyZSBhbHdheXMgbG93ZXIgY2FzZS5cbiAgICAgIHRoaXMuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgaWYgKCFpcHY2SG9zdG5hbWUpIHtcbiAgICAgIC8vIElETkEgU3VwcG9ydDogUmV0dXJucyBhIHB1bnljb2RlZCByZXByZXNlbnRhdGlvbiBvZiBcImRvbWFpblwiLlxuICAgICAgLy8gSXQgb25seSBjb252ZXJ0cyBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgdGhhdFxuICAgICAgLy8gaGF2ZSBub24tQVNDSUkgY2hhcmFjdGVycywgaS5lLiBpdCBkb2Vzbid0IG1hdHRlciBpZlxuICAgICAgLy8geW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0IGFscmVhZHkgaXMgQVNDSUktb25seS5cbiAgICAgIHRoaXMuaG9zdG5hbWUgPSBwdW55Y29kZS50b0FTQ0lJKHRoaXMuaG9zdG5hbWUpO1xuICAgIH1cblxuICAgIHZhciBwID0gdGhpcy5wb3J0ID8gJzonICsgdGhpcy5wb3J0IDogJyc7XG4gICAgdmFyIGggPSB0aGlzLmhvc3RuYW1lIHx8ICcnO1xuICAgIHRoaXMuaG9zdCA9IGggKyBwO1xuICAgIHRoaXMuaHJlZiArPSB0aGlzLmhvc3Q7XG5cbiAgICAvLyBzdHJpcCBbIGFuZCBdIGZyb20gdGhlIGhvc3RuYW1lXG4gICAgLy8gdGhlIGhvc3QgZmllbGQgc3RpbGwgcmV0YWlucyB0aGVtLCB0aG91Z2hcbiAgICBpZiAoaXB2Nkhvc3RuYW1lKSB7XG4gICAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZS5zdWJzdHIoMSwgdGhpcy5ob3N0bmFtZS5sZW5ndGggLSAyKTtcbiAgICAgIGlmIChyZXN0WzBdICE9PSAnLycpIHtcbiAgICAgICAgcmVzdCA9ICcvJyArIHJlc3Q7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gbm93IHJlc3QgaXMgc2V0IHRvIHRoZSBwb3N0LWhvc3Qgc3R1ZmYuXG4gIC8vIGNob3Agb2ZmIGFueSBkZWxpbSBjaGFycy5cbiAgaWYgKCF1bnNhZmVQcm90b2NvbFtsb3dlclByb3RvXSkge1xuXG4gICAgLy8gRmlyc3QsIG1ha2UgMTAwJSBzdXJlIHRoYXQgYW55IFwiYXV0b0VzY2FwZVwiIGNoYXJzIGdldFxuICAgIC8vIGVzY2FwZWQsIGV2ZW4gaWYgZW5jb2RlVVJJQ29tcG9uZW50IGRvZXNuJ3QgdGhpbmsgdGhleVxuICAgIC8vIG5lZWQgdG8gYmUuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhdXRvRXNjYXBlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdmFyIGFlID0gYXV0b0VzY2FwZVtpXTtcbiAgICAgIGlmIChyZXN0LmluZGV4T2YoYWUpID09PSAtMSlcbiAgICAgICAgY29udGludWU7XG4gICAgICB2YXIgZXNjID0gZW5jb2RlVVJJQ29tcG9uZW50KGFlKTtcbiAgICAgIGlmIChlc2MgPT09IGFlKSB7XG4gICAgICAgIGVzYyA9IGVzY2FwZShhZSk7XG4gICAgICB9XG4gICAgICByZXN0ID0gcmVzdC5zcGxpdChhZSkuam9pbihlc2MpO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gY2hvcCBvZmYgZnJvbSB0aGUgdGFpbCBmaXJzdC5cbiAgdmFyIGhhc2ggPSByZXN0LmluZGV4T2YoJyMnKTtcbiAgaWYgKGhhc2ggIT09IC0xKSB7XG4gICAgLy8gZ290IGEgZnJhZ21lbnQgc3RyaW5nLlxuICAgIHRoaXMuaGFzaCA9IHJlc3Quc3Vic3RyKGhhc2gpO1xuICAgIHJlc3QgPSByZXN0LnNsaWNlKDAsIGhhc2gpO1xuICB9XG4gIHZhciBxbSA9IHJlc3QuaW5kZXhPZignPycpO1xuICBpZiAocW0gIT09IC0xKSB7XG4gICAgdGhpcy5zZWFyY2ggPSByZXN0LnN1YnN0cihxbSk7XG4gICAgdGhpcy5xdWVyeSA9IHJlc3Quc3Vic3RyKHFtICsgMSk7XG4gICAgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAgIHRoaXMucXVlcnkgPSBxdWVyeXN0cmluZy5wYXJzZSh0aGlzLnF1ZXJ5KTtcbiAgICB9XG4gICAgcmVzdCA9IHJlc3Quc2xpY2UoMCwgcW0pO1xuICB9IGVsc2UgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAvLyBubyBxdWVyeSBzdHJpbmcsIGJ1dCBwYXJzZVF1ZXJ5U3RyaW5nIHN0aWxsIHJlcXVlc3RlZFxuICAgIHRoaXMuc2VhcmNoID0gJyc7XG4gICAgdGhpcy5xdWVyeSA9IHt9O1xuICB9XG4gIGlmIChyZXN0KSB0aGlzLnBhdGhuYW1lID0gcmVzdDtcbiAgaWYgKHNsYXNoZWRQcm90b2NvbFtsb3dlclByb3RvXSAmJlxuICAgICAgdGhpcy5ob3N0bmFtZSAmJiAhdGhpcy5wYXRobmFtZSkge1xuICAgIHRoaXMucGF0aG5hbWUgPSAnLyc7XG4gIH1cblxuICAvL3RvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gIGlmICh0aGlzLnBhdGhuYW1lIHx8IHRoaXMuc2VhcmNoKSB7XG4gICAgdmFyIHAgPSB0aGlzLnBhdGhuYW1lIHx8ICcnO1xuICAgIHZhciBzID0gdGhpcy5zZWFyY2ggfHwgJyc7XG4gICAgdGhpcy5wYXRoID0gcCArIHM7XG4gIH1cblxuICAvLyBmaW5hbGx5LCByZWNvbnN0cnVjdCB0aGUgaHJlZiBiYXNlZCBvbiB3aGF0IGhhcyBiZWVuIHZhbGlkYXRlZC5cbiAgdGhpcy5ocmVmID0gdGhpcy5mb3JtYXQoKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBmb3JtYXQgYSBwYXJzZWQgb2JqZWN0IGludG8gYSB1cmwgc3RyaW5nXG5mdW5jdGlvbiB1cmxGb3JtYXQob2JqKSB7XG4gIC8vIGVuc3VyZSBpdCdzIGFuIG9iamVjdCwgYW5kIG5vdCBhIHN0cmluZyB1cmwuXG4gIC8vIElmIGl0J3MgYW4gb2JqLCB0aGlzIGlzIGEgbm8tb3AuXG4gIC8vIHRoaXMgd2F5LCB5b3UgY2FuIGNhbGwgdXJsX2Zvcm1hdCgpIG9uIHN0cmluZ3NcbiAgLy8gdG8gY2xlYW4gdXAgcG90ZW50aWFsbHkgd29ua3kgdXJscy5cbiAgaWYgKHV0aWwuaXNTdHJpbmcob2JqKSkgb2JqID0gdXJsUGFyc2Uob2JqKTtcbiAgaWYgKCEob2JqIGluc3RhbmNlb2YgVXJsKSkgcmV0dXJuIFVybC5wcm90b3R5cGUuZm9ybWF0LmNhbGwob2JqKTtcbiAgcmV0dXJuIG9iai5mb3JtYXQoKTtcbn1cblxuVXJsLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGF1dGggPSB0aGlzLmF1dGggfHwgJyc7XG4gIGlmIChhdXRoKSB7XG4gICAgYXV0aCA9IGVuY29kZVVSSUNvbXBvbmVudChhdXRoKTtcbiAgICBhdXRoID0gYXV0aC5yZXBsYWNlKC8lM0EvaSwgJzonKTtcbiAgICBhdXRoICs9ICdAJztcbiAgfVxuXG4gIHZhciBwcm90b2NvbCA9IHRoaXMucHJvdG9jb2wgfHwgJycsXG4gICAgICBwYXRobmFtZSA9IHRoaXMucGF0aG5hbWUgfHwgJycsXG4gICAgICBoYXNoID0gdGhpcy5oYXNoIHx8ICcnLFxuICAgICAgaG9zdCA9IGZhbHNlLFxuICAgICAgcXVlcnkgPSAnJztcblxuICBpZiAodGhpcy5ob3N0KSB7XG4gICAgaG9zdCA9IGF1dGggKyB0aGlzLmhvc3Q7XG4gIH0gZWxzZSBpZiAodGhpcy5ob3N0bmFtZSkge1xuICAgIGhvc3QgPSBhdXRoICsgKHRoaXMuaG9zdG5hbWUuaW5kZXhPZignOicpID09PSAtMSA/XG4gICAgICAgIHRoaXMuaG9zdG5hbWUgOlxuICAgICAgICAnWycgKyB0aGlzLmhvc3RuYW1lICsgJ10nKTtcbiAgICBpZiAodGhpcy5wb3J0KSB7XG4gICAgICBob3N0ICs9ICc6JyArIHRoaXMucG9ydDtcbiAgICB9XG4gIH1cblxuICBpZiAodGhpcy5xdWVyeSAmJlxuICAgICAgdXRpbC5pc09iamVjdCh0aGlzLnF1ZXJ5KSAmJlxuICAgICAgT2JqZWN0LmtleXModGhpcy5xdWVyeSkubGVuZ3RoKSB7XG4gICAgcXVlcnkgPSBxdWVyeXN0cmluZy5zdHJpbmdpZnkodGhpcy5xdWVyeSk7XG4gIH1cblxuICB2YXIgc2VhcmNoID0gdGhpcy5zZWFyY2ggfHwgKHF1ZXJ5ICYmICgnPycgKyBxdWVyeSkpIHx8ICcnO1xuXG4gIGlmIChwcm90b2NvbCAmJiBwcm90b2NvbC5zdWJzdHIoLTEpICE9PSAnOicpIHByb3RvY29sICs9ICc6JztcblxuICAvLyBvbmx5IHRoZSBzbGFzaGVkUHJvdG9jb2xzIGdldCB0aGUgLy8uICBOb3QgbWFpbHRvOiwgeG1wcDosIGV0Yy5cbiAgLy8gdW5sZXNzIHRoZXkgaGFkIHRoZW0gdG8gYmVnaW4gd2l0aC5cbiAgaWYgKHRoaXMuc2xhc2hlcyB8fFxuICAgICAgKCFwcm90b2NvbCB8fCBzbGFzaGVkUHJvdG9jb2xbcHJvdG9jb2xdKSAmJiBob3N0ICE9PSBmYWxzZSkge1xuICAgIGhvc3QgPSAnLy8nICsgKGhvc3QgfHwgJycpO1xuICAgIGlmIChwYXRobmFtZSAmJiBwYXRobmFtZS5jaGFyQXQoMCkgIT09ICcvJykgcGF0aG5hbWUgPSAnLycgKyBwYXRobmFtZTtcbiAgfSBlbHNlIGlmICghaG9zdCkge1xuICAgIGhvc3QgPSAnJztcbiAgfVxuXG4gIGlmIChoYXNoICYmIGhhc2guY2hhckF0KDApICE9PSAnIycpIGhhc2ggPSAnIycgKyBoYXNoO1xuICBpZiAoc2VhcmNoICYmIHNlYXJjaC5jaGFyQXQoMCkgIT09ICc/Jykgc2VhcmNoID0gJz8nICsgc2VhcmNoO1xuXG4gIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZSgvWz8jXS9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQobWF0Y2gpO1xuICB9KTtcbiAgc2VhcmNoID0gc2VhcmNoLnJlcGxhY2UoJyMnLCAnJTIzJyk7XG5cbiAgcmV0dXJuIHByb3RvY29sICsgaG9zdCArIHBhdGhuYW1lICsgc2VhcmNoICsgaGFzaDtcbn07XG5cbmZ1bmN0aW9uIHVybFJlc29sdmUoc291cmNlLCByZWxhdGl2ZSkge1xuICByZXR1cm4gdXJsUGFyc2Uoc291cmNlLCBmYWxzZSwgdHJ1ZSkucmVzb2x2ZShyZWxhdGl2ZSk7XG59XG5cblVybC5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uKHJlbGF0aXZlKSB7XG4gIHJldHVybiB0aGlzLnJlc29sdmVPYmplY3QodXJsUGFyc2UocmVsYXRpdmUsIGZhbHNlLCB0cnVlKSkuZm9ybWF0KCk7XG59O1xuXG5mdW5jdGlvbiB1cmxSZXNvbHZlT2JqZWN0KHNvdXJjZSwgcmVsYXRpdmUpIHtcbiAgaWYgKCFzb3VyY2UpIHJldHVybiByZWxhdGl2ZTtcbiAgcmV0dXJuIHVybFBhcnNlKHNvdXJjZSwgZmFsc2UsIHRydWUpLnJlc29sdmVPYmplY3QocmVsYXRpdmUpO1xufVxuXG5VcmwucHJvdG90eXBlLnJlc29sdmVPYmplY3QgPSBmdW5jdGlvbihyZWxhdGl2ZSkge1xuICBpZiAodXRpbC5pc1N0cmluZyhyZWxhdGl2ZSkpIHtcbiAgICB2YXIgcmVsID0gbmV3IFVybCgpO1xuICAgIHJlbC5wYXJzZShyZWxhdGl2ZSwgZmFsc2UsIHRydWUpO1xuICAgIHJlbGF0aXZlID0gcmVsO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IG5ldyBVcmwoKTtcbiAgdmFyIHRrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XG4gIGZvciAodmFyIHRrID0gMDsgdGsgPCB0a2V5cy5sZW5ndGg7IHRrKyspIHtcbiAgICB2YXIgdGtleSA9IHRrZXlzW3RrXTtcbiAgICByZXN1bHRbdGtleV0gPSB0aGlzW3RrZXldO1xuICB9XG5cbiAgLy8gaGFzaCBpcyBhbHdheXMgb3ZlcnJpZGRlbiwgbm8gbWF0dGVyIHdoYXQuXG4gIC8vIGV2ZW4gaHJlZj1cIlwiIHdpbGwgcmVtb3ZlIGl0LlxuICByZXN1bHQuaGFzaCA9IHJlbGF0aXZlLmhhc2g7XG5cbiAgLy8gaWYgdGhlIHJlbGF0aXZlIHVybCBpcyBlbXB0eSwgdGhlbiB0aGVyZSdzIG5vdGhpbmcgbGVmdCB0byBkbyBoZXJlLlxuICBpZiAocmVsYXRpdmUuaHJlZiA9PT0gJycpIHtcbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gaHJlZnMgbGlrZSAvL2Zvby9iYXIgYWx3YXlzIGN1dCB0byB0aGUgcHJvdG9jb2wuXG4gIGlmIChyZWxhdGl2ZS5zbGFzaGVzICYmICFyZWxhdGl2ZS5wcm90b2NvbCkge1xuICAgIC8vIHRha2UgZXZlcnl0aGluZyBleGNlcHQgdGhlIHByb3RvY29sIGZyb20gcmVsYXRpdmVcbiAgICB2YXIgcmtleXMgPSBPYmplY3Qua2V5cyhyZWxhdGl2ZSk7XG4gICAgZm9yICh2YXIgcmsgPSAwOyByayA8IHJrZXlzLmxlbmd0aDsgcmsrKykge1xuICAgICAgdmFyIHJrZXkgPSBya2V5c1tya107XG4gICAgICBpZiAocmtleSAhPT0gJ3Byb3RvY29sJylcbiAgICAgICAgcmVzdWx0W3JrZXldID0gcmVsYXRpdmVbcmtleV07XG4gICAgfVxuXG4gICAgLy91cmxQYXJzZSBhcHBlbmRzIHRyYWlsaW5nIC8gdG8gdXJscyBsaWtlIGh0dHA6Ly93d3cuZXhhbXBsZS5jb21cbiAgICBpZiAoc2xhc2hlZFByb3RvY29sW3Jlc3VsdC5wcm90b2NvbF0gJiZcbiAgICAgICAgcmVzdWx0Lmhvc3RuYW1lICYmICFyZXN1bHQucGF0aG5hbWUpIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gcmVzdWx0LnBhdGhuYW1lID0gJy8nO1xuICAgIH1cblxuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpZiAocmVsYXRpdmUucHJvdG9jb2wgJiYgcmVsYXRpdmUucHJvdG9jb2wgIT09IHJlc3VsdC5wcm90b2NvbCkge1xuICAgIC8vIGlmIGl0J3MgYSBrbm93biB1cmwgcHJvdG9jb2wsIHRoZW4gY2hhbmdpbmdcbiAgICAvLyB0aGUgcHJvdG9jb2wgZG9lcyB3ZWlyZCB0aGluZ3NcbiAgICAvLyBmaXJzdCwgaWYgaXQncyBub3QgZmlsZTosIHRoZW4gd2UgTVVTVCBoYXZlIGEgaG9zdCxcbiAgICAvLyBhbmQgaWYgdGhlcmUgd2FzIGEgcGF0aFxuICAgIC8vIHRvIGJlZ2luIHdpdGgsIHRoZW4gd2UgTVVTVCBoYXZlIGEgcGF0aC5cbiAgICAvLyBpZiBpdCBpcyBmaWxlOiwgdGhlbiB0aGUgaG9zdCBpcyBkcm9wcGVkLFxuICAgIC8vIGJlY2F1c2UgdGhhdCdzIGtub3duIHRvIGJlIGhvc3RsZXNzLlxuICAgIC8vIGFueXRoaW5nIGVsc2UgaXMgYXNzdW1lZCB0byBiZSBhYnNvbHV0ZS5cbiAgICBpZiAoIXNsYXNoZWRQcm90b2NvbFtyZWxhdGl2ZS5wcm90b2NvbF0pIHtcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMocmVsYXRpdmUpO1xuICAgICAgZm9yICh2YXIgdiA9IDA7IHYgPCBrZXlzLmxlbmd0aDsgdisrKSB7XG4gICAgICAgIHZhciBrID0ga2V5c1t2XTtcbiAgICAgICAgcmVzdWx0W2tdID0gcmVsYXRpdmVba107XG4gICAgICB9XG4gICAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcmVzdWx0LnByb3RvY29sID0gcmVsYXRpdmUucHJvdG9jb2w7XG4gICAgaWYgKCFyZWxhdGl2ZS5ob3N0ICYmICFob3N0bGVzc1Byb3RvY29sW3JlbGF0aXZlLnByb3RvY29sXSkge1xuICAgICAgdmFyIHJlbFBhdGggPSAocmVsYXRpdmUucGF0aG5hbWUgfHwgJycpLnNwbGl0KCcvJyk7XG4gICAgICB3aGlsZSAocmVsUGF0aC5sZW5ndGggJiYgIShyZWxhdGl2ZS5ob3N0ID0gcmVsUGF0aC5zaGlmdCgpKSk7XG4gICAgICBpZiAoIXJlbGF0aXZlLmhvc3QpIHJlbGF0aXZlLmhvc3QgPSAnJztcbiAgICAgIGlmICghcmVsYXRpdmUuaG9zdG5hbWUpIHJlbGF0aXZlLmhvc3RuYW1lID0gJyc7XG4gICAgICBpZiAocmVsUGF0aFswXSAhPT0gJycpIHJlbFBhdGgudW5zaGlmdCgnJyk7XG4gICAgICBpZiAocmVsUGF0aC5sZW5ndGggPCAyKSByZWxQYXRoLnVuc2hpZnQoJycpO1xuICAgICAgcmVzdWx0LnBhdGhuYW1lID0gcmVsUGF0aC5qb2luKCcvJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5wYXRobmFtZSA9IHJlbGF0aXZlLnBhdGhuYW1lO1xuICAgIH1cbiAgICByZXN1bHQuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgIHJlc3VsdC5ob3N0ID0gcmVsYXRpdmUuaG9zdCB8fCAnJztcbiAgICByZXN1bHQuYXV0aCA9IHJlbGF0aXZlLmF1dGg7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVsYXRpdmUuaG9zdG5hbWUgfHwgcmVsYXRpdmUuaG9zdDtcbiAgICByZXN1bHQucG9ydCA9IHJlbGF0aXZlLnBvcnQ7XG4gICAgLy8gdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgICBpZiAocmVzdWx0LnBhdGhuYW1lIHx8IHJlc3VsdC5zZWFyY2gpIHtcbiAgICAgIHZhciBwID0gcmVzdWx0LnBhdGhuYW1lIHx8ICcnO1xuICAgICAgdmFyIHMgPSByZXN1bHQuc2VhcmNoIHx8ICcnO1xuICAgICAgcmVzdWx0LnBhdGggPSBwICsgcztcbiAgICB9XG4gICAgcmVzdWx0LnNsYXNoZXMgPSByZXN1bHQuc2xhc2hlcyB8fCByZWxhdGl2ZS5zbGFzaGVzO1xuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB2YXIgaXNTb3VyY2VBYnMgPSAocmVzdWx0LnBhdGhuYW1lICYmIHJlc3VsdC5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJyksXG4gICAgICBpc1JlbEFicyA9IChcbiAgICAgICAgICByZWxhdGl2ZS5ob3N0IHx8XG4gICAgICAgICAgcmVsYXRpdmUucGF0aG5hbWUgJiYgcmVsYXRpdmUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLydcbiAgICAgICksXG4gICAgICBtdXN0RW5kQWJzID0gKGlzUmVsQWJzIHx8IGlzU291cmNlQWJzIHx8XG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQuaG9zdCAmJiByZWxhdGl2ZS5wYXRobmFtZSkpLFxuICAgICAgcmVtb3ZlQWxsRG90cyA9IG11c3RFbmRBYnMsXG4gICAgICBzcmNQYXRoID0gcmVzdWx0LnBhdGhuYW1lICYmIHJlc3VsdC5wYXRobmFtZS5zcGxpdCgnLycpIHx8IFtdLFxuICAgICAgcmVsUGF0aCA9IHJlbGF0aXZlLnBhdGhuYW1lICYmIHJlbGF0aXZlLnBhdGhuYW1lLnNwbGl0KCcvJykgfHwgW10sXG4gICAgICBwc3ljaG90aWMgPSByZXN1bHQucHJvdG9jb2wgJiYgIXNsYXNoZWRQcm90b2NvbFtyZXN1bHQucHJvdG9jb2xdO1xuXG4gIC8vIGlmIHRoZSB1cmwgaXMgYSBub24tc2xhc2hlZCB1cmwsIHRoZW4gcmVsYXRpdmVcbiAgLy8gbGlua3MgbGlrZSAuLi8uLiBzaG91bGQgYmUgYWJsZVxuICAvLyB0byBjcmF3bCB1cCB0byB0aGUgaG9zdG5hbWUsIGFzIHdlbGwuICBUaGlzIGlzIHN0cmFuZ2UuXG4gIC8vIHJlc3VsdC5wcm90b2NvbCBoYXMgYWxyZWFkeSBiZWVuIHNldCBieSBub3cuXG4gIC8vIExhdGVyIG9uLCBwdXQgdGhlIGZpcnN0IHBhdGggcGFydCBpbnRvIHRoZSBob3N0IGZpZWxkLlxuICBpZiAocHN5Y2hvdGljKSB7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gJyc7XG4gICAgcmVzdWx0LnBvcnQgPSBudWxsO1xuICAgIGlmIChyZXN1bHQuaG9zdCkge1xuICAgICAgaWYgKHNyY1BhdGhbMF0gPT09ICcnKSBzcmNQYXRoWzBdID0gcmVzdWx0Lmhvc3Q7XG4gICAgICBlbHNlIHNyY1BhdGgudW5zaGlmdChyZXN1bHQuaG9zdCk7XG4gICAgfVxuICAgIHJlc3VsdC5ob3N0ID0gJyc7XG4gICAgaWYgKHJlbGF0aXZlLnByb3RvY29sKSB7XG4gICAgICByZWxhdGl2ZS5ob3N0bmFtZSA9IG51bGw7XG4gICAgICByZWxhdGl2ZS5wb3J0ID0gbnVsbDtcbiAgICAgIGlmIChyZWxhdGl2ZS5ob3N0KSB7XG4gICAgICAgIGlmIChyZWxQYXRoWzBdID09PSAnJykgcmVsUGF0aFswXSA9IHJlbGF0aXZlLmhvc3Q7XG4gICAgICAgIGVsc2UgcmVsUGF0aC51bnNoaWZ0KHJlbGF0aXZlLmhvc3QpO1xuICAgICAgfVxuICAgICAgcmVsYXRpdmUuaG9zdCA9IG51bGw7XG4gICAgfVxuICAgIG11c3RFbmRBYnMgPSBtdXN0RW5kQWJzICYmIChyZWxQYXRoWzBdID09PSAnJyB8fCBzcmNQYXRoWzBdID09PSAnJyk7XG4gIH1cblxuICBpZiAoaXNSZWxBYnMpIHtcbiAgICAvLyBpdCdzIGFic29sdXRlLlxuICAgIHJlc3VsdC5ob3N0ID0gKHJlbGF0aXZlLmhvc3QgfHwgcmVsYXRpdmUuaG9zdCA9PT0gJycpID9cbiAgICAgICAgICAgICAgICAgIHJlbGF0aXZlLmhvc3QgOiByZXN1bHQuaG9zdDtcbiAgICByZXN1bHQuaG9zdG5hbWUgPSAocmVsYXRpdmUuaG9zdG5hbWUgfHwgcmVsYXRpdmUuaG9zdG5hbWUgPT09ICcnKSA/XG4gICAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmUuaG9zdG5hbWUgOiByZXN1bHQuaG9zdG5hbWU7XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICBzcmNQYXRoID0gcmVsUGF0aDtcbiAgICAvLyBmYWxsIHRocm91Z2ggdG8gdGhlIGRvdC1oYW5kbGluZyBiZWxvdy5cbiAgfSBlbHNlIGlmIChyZWxQYXRoLmxlbmd0aCkge1xuICAgIC8vIGl0J3MgcmVsYXRpdmVcbiAgICAvLyB0aHJvdyBhd2F5IHRoZSBleGlzdGluZyBmaWxlLCBhbmQgdGFrZSB0aGUgbmV3IHBhdGggaW5zdGVhZC5cbiAgICBpZiAoIXNyY1BhdGgpIHNyY1BhdGggPSBbXTtcbiAgICBzcmNQYXRoLnBvcCgpO1xuICAgIHNyY1BhdGggPSBzcmNQYXRoLmNvbmNhdChyZWxQYXRoKTtcbiAgICByZXN1bHQuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICB9IGVsc2UgaWYgKCF1dGlsLmlzTnVsbE9yVW5kZWZpbmVkKHJlbGF0aXZlLnNlYXJjaCkpIHtcbiAgICAvLyBqdXN0IHB1bGwgb3V0IHRoZSBzZWFyY2guXG4gICAgLy8gbGlrZSBocmVmPSc/Zm9vJy5cbiAgICAvLyBQdXQgdGhpcyBhZnRlciB0aGUgb3RoZXIgdHdvIGNhc2VzIGJlY2F1c2UgaXQgc2ltcGxpZmllcyB0aGUgYm9vbGVhbnNcbiAgICBpZiAocHN5Y2hvdGljKSB7XG4gICAgICByZXN1bHQuaG9zdG5hbWUgPSByZXN1bHQuaG9zdCA9IHNyY1BhdGguc2hpZnQoKTtcbiAgICAgIC8vb2NjYXRpb25hbHkgdGhlIGF1dGggY2FuIGdldCBzdHVjayBvbmx5IGluIGhvc3RcbiAgICAgIC8vdGhpcyBlc3BlY2lhbGx5IGhhcHBlbnMgaW4gY2FzZXMgbGlrZVxuICAgICAgLy91cmwucmVzb2x2ZU9iamVjdCgnbWFpbHRvOmxvY2FsMUBkb21haW4xJywgJ2xvY2FsMkBkb21haW4yJylcbiAgICAgIHZhciBhdXRoSW5Ib3N0ID0gcmVzdWx0Lmhvc3QgJiYgcmVzdWx0Lmhvc3QuaW5kZXhPZignQCcpID4gMCA/XG4gICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ob3N0LnNwbGl0KCdAJykgOiBmYWxzZTtcbiAgICAgIGlmIChhdXRoSW5Ib3N0KSB7XG4gICAgICAgIHJlc3VsdC5hdXRoID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgICAgICByZXN1bHQuaG9zdCA9IHJlc3VsdC5ob3N0bmFtZSA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICAvL3RvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gICAgaWYgKCF1dGlsLmlzTnVsbChyZXN1bHQucGF0aG5hbWUpIHx8ICF1dGlsLmlzTnVsbChyZXN1bHQuc2VhcmNoKSkge1xuICAgICAgcmVzdWx0LnBhdGggPSAocmVzdWx0LnBhdGhuYW1lID8gcmVzdWx0LnBhdGhuYW1lIDogJycpICtcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdC5zZWFyY2ggPyByZXN1bHQuc2VhcmNoIDogJycpO1xuICAgIH1cbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKCFzcmNQYXRoLmxlbmd0aCkge1xuICAgIC8vIG5vIHBhdGggYXQgYWxsLiAgZWFzeS5cbiAgICAvLyB3ZSd2ZSBhbHJlYWR5IGhhbmRsZWQgdGhlIG90aGVyIHN0dWZmIGFib3ZlLlxuICAgIHJlc3VsdC5wYXRobmFtZSA9IG51bGw7XG4gICAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmIChyZXN1bHQuc2VhcmNoKSB7XG4gICAgICByZXN1bHQucGF0aCA9ICcvJyArIHJlc3VsdC5zZWFyY2g7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gbnVsbDtcbiAgICB9XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIGlmIGEgdXJsIEVORHMgaW4gLiBvciAuLiwgdGhlbiBpdCBtdXN0IGdldCBhIHRyYWlsaW5nIHNsYXNoLlxuICAvLyBob3dldmVyLCBpZiBpdCBlbmRzIGluIGFueXRoaW5nIGVsc2Ugbm9uLXNsYXNoeSxcbiAgLy8gdGhlbiBpdCBtdXN0IE5PVCBnZXQgYSB0cmFpbGluZyBzbGFzaC5cbiAgdmFyIGxhc3QgPSBzcmNQYXRoLnNsaWNlKC0xKVswXTtcbiAgdmFyIGhhc1RyYWlsaW5nU2xhc2ggPSAoXG4gICAgICAocmVzdWx0Lmhvc3QgfHwgcmVsYXRpdmUuaG9zdCB8fCBzcmNQYXRoLmxlbmd0aCA+IDEpICYmXG4gICAgICAobGFzdCA9PT0gJy4nIHx8IGxhc3QgPT09ICcuLicpIHx8IGxhc3QgPT09ICcnKTtcblxuICAvLyBzdHJpcCBzaW5nbGUgZG90cywgcmVzb2x2ZSBkb3VibGUgZG90cyB0byBwYXJlbnQgZGlyXG4gIC8vIGlmIHRoZSBwYXRoIHRyaWVzIHRvIGdvIGFib3ZlIHRoZSByb290LCBgdXBgIGVuZHMgdXAgPiAwXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBzcmNQYXRoLmxlbmd0aDsgaSA+PSAwOyBpLS0pIHtcbiAgICBsYXN0ID0gc3JjUGF0aFtpXTtcbiAgICBpZiAobGFzdCA9PT0gJy4nKSB7XG4gICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcbiAgICB9IGVsc2UgaWYgKGxhc3QgPT09ICcuLicpIHtcbiAgICAgIHNyY1BhdGguc3BsaWNlKGksIDEpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlIHBhdGggaXMgYWxsb3dlZCB0byBnbyBhYm92ZSB0aGUgcm9vdCwgcmVzdG9yZSBsZWFkaW5nIC4uc1xuICBpZiAoIW11c3RFbmRBYnMgJiYgIXJlbW92ZUFsbERvdHMpIHtcbiAgICBmb3IgKDsgdXAtLTsgdXApIHtcbiAgICAgIHNyY1BhdGgudW5zaGlmdCgnLi4nKTtcbiAgICB9XG4gIH1cblxuICBpZiAobXVzdEVuZEFicyAmJiBzcmNQYXRoWzBdICE9PSAnJyAmJlxuICAgICAgKCFzcmNQYXRoWzBdIHx8IHNyY1BhdGhbMF0uY2hhckF0KDApICE9PSAnLycpKSB7XG4gICAgc3JjUGF0aC51bnNoaWZ0KCcnKTtcbiAgfVxuXG4gIGlmIChoYXNUcmFpbGluZ1NsYXNoICYmIChzcmNQYXRoLmpvaW4oJy8nKS5zdWJzdHIoLTEpICE9PSAnLycpKSB7XG4gICAgc3JjUGF0aC5wdXNoKCcnKTtcbiAgfVxuXG4gIHZhciBpc0Fic29sdXRlID0gc3JjUGF0aFswXSA9PT0gJycgfHxcbiAgICAgIChzcmNQYXRoWzBdICYmIHNyY1BhdGhbMF0uY2hhckF0KDApID09PSAnLycpO1xuXG4gIC8vIHB1dCB0aGUgaG9zdCBiYWNrXG4gIGlmIChwc3ljaG90aWMpIHtcbiAgICByZXN1bHQuaG9zdG5hbWUgPSByZXN1bHQuaG9zdCA9IGlzQWJzb2x1dGUgPyAnJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmNQYXRoLmxlbmd0aCA/IHNyY1BhdGguc2hpZnQoKSA6ICcnO1xuICAgIC8vb2NjYXRpb25hbHkgdGhlIGF1dGggY2FuIGdldCBzdHVjayBvbmx5IGluIGhvc3RcbiAgICAvL3RoaXMgZXNwZWNpYWxseSBoYXBwZW5zIGluIGNhc2VzIGxpa2VcbiAgICAvL3VybC5yZXNvbHZlT2JqZWN0KCdtYWlsdG86bG9jYWwxQGRvbWFpbjEnLCAnbG9jYWwyQGRvbWFpbjInKVxuICAgIHZhciBhdXRoSW5Ib3N0ID0gcmVzdWx0Lmhvc3QgJiYgcmVzdWx0Lmhvc3QuaW5kZXhPZignQCcpID4gMCA/XG4gICAgICAgICAgICAgICAgICAgICByZXN1bHQuaG9zdC5zcGxpdCgnQCcpIDogZmFsc2U7XG4gICAgaWYgKGF1dGhJbkhvc3QpIHtcbiAgICAgIHJlc3VsdC5hdXRoID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgICAgcmVzdWx0Lmhvc3QgPSByZXN1bHQuaG9zdG5hbWUgPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgfVxuICB9XG5cbiAgbXVzdEVuZEFicyA9IG11c3RFbmRBYnMgfHwgKHJlc3VsdC5ob3N0ICYmIHNyY1BhdGgubGVuZ3RoKTtcblxuICBpZiAobXVzdEVuZEFicyAmJiAhaXNBYnNvbHV0ZSkge1xuICAgIHNyY1BhdGgudW5zaGlmdCgnJyk7XG4gIH1cblxuICBpZiAoIXNyY1BhdGgubGVuZ3RoKSB7XG4gICAgcmVzdWx0LnBhdGhuYW1lID0gbnVsbDtcbiAgICByZXN1bHQucGF0aCA9IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0LnBhdGhuYW1lID0gc3JjUGF0aC5qb2luKCcvJyk7XG4gIH1cblxuICAvL3RvIHN1cHBvcnQgcmVxdWVzdC5odHRwXG4gIGlmICghdXRpbC5pc051bGwocmVzdWx0LnBhdGhuYW1lKSB8fCAhdXRpbC5pc051bGwocmVzdWx0LnNlYXJjaCkpIHtcbiAgICByZXN1bHQucGF0aCA9IChyZXN1bHQucGF0aG5hbWUgPyByZXN1bHQucGF0aG5hbWUgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHJlc3VsdC5zZWFyY2ggPyByZXN1bHQuc2VhcmNoIDogJycpO1xuICB9XG4gIHJlc3VsdC5hdXRoID0gcmVsYXRpdmUuYXV0aCB8fCByZXN1bHQuYXV0aDtcbiAgcmVzdWx0LnNsYXNoZXMgPSByZXN1bHQuc2xhc2hlcyB8fCByZWxhdGl2ZS5zbGFzaGVzO1xuICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblVybC5wcm90b3R5cGUucGFyc2VIb3N0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBob3N0ID0gdGhpcy5ob3N0O1xuICB2YXIgcG9ydCA9IHBvcnRQYXR0ZXJuLmV4ZWMoaG9zdCk7XG4gIGlmIChwb3J0KSB7XG4gICAgcG9ydCA9IHBvcnRbMF07XG4gICAgaWYgKHBvcnQgIT09ICc6Jykge1xuICAgICAgdGhpcy5wb3J0ID0gcG9ydC5zdWJzdHIoMSk7XG4gICAgfVxuICAgIGhvc3QgPSBob3N0LnN1YnN0cigwLCBob3N0Lmxlbmd0aCAtIHBvcnQubGVuZ3RoKTtcbiAgfVxuICBpZiAoaG9zdCkgdGhpcy5ob3N0bmFtZSA9IGhvc3Q7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNTdHJpbmc6IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB0eXBlb2YoYXJnKSA9PT0gJ3N0cmluZyc7XG4gIH0sXG4gIGlzT2JqZWN0OiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gdHlwZW9mKGFyZykgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbiAgfSxcbiAgaXNOdWxsOiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gYXJnID09PSBudWxsO1xuICB9LFxuICBpc051bGxPclVuZGVmaW5lZDogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGFyZyA9PSBudWxsO1xuICB9XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsImV4cG9ydCB7IEltZ3VyQ2xpZW50LCBJbWd1ckNyZWRlbnRpYWxzIH0gZnJvbSAnLi9jbGllbnQnO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
