!(
  /**
   * Highstock JS v11.4.7 (2024-08-14)
   *
   * (c) 2009-2024 Torstein Honsi
   *
   * License: www.highcharts.com/license
   */ (function (t, e) {
    "object" == typeof module && module.exports
      ? ((e.default = e), (module.exports = t && t.document ? e(t) : e))
      : "function" == typeof define && define.amd
      ? define("highcharts/highstock", function () {
          return e(t);
        })
      : (t.Highcharts && t.Highcharts.error(16, !0), (t.Highcharts = e(t)));
  })("undefined" != typeof window ? window : this, function (t) {
    "use strict";
    var e = {};
    function i(e, i, s, o) {
      !e.hasOwnProperty(i) &&
        ((e[i] = o.apply(null, s)),
        t &&
          "function" == typeof CustomEvent &&
          t.dispatchEvent(
            new CustomEvent("HighchartsModuleLoaded", {
              detail: { path: i, module: e[i] },
            })
          ));
    }
    return (
      i(e, "Core/Globals.js", [], function () {
        var e, i;
        return (
          ((i = e || (e = {})).SVG_NS = "http://www.w3.org/2000/svg"),
          (i.product = "Highcharts"),
          (i.version = "11.4.7"),
          (i.win = void 0 !== t ? t : {}),
          (i.doc = i.win.document),
          (i.svg =
            i.doc &&
            i.doc.createElementNS &&
            !!i.doc.createElementNS(i.SVG_NS, "svg").createSVGRect),
          (i.userAgent = (i.win.navigator && i.win.navigator.userAgent) || ""),
          (i.isChrome = i.win.chrome),
          (i.isFirefox = -1 !== i.userAgent.indexOf("Firefox")),
          (i.isMS = /(edge|msie|trident)/i.test(i.userAgent) && !i.win.opera),
          (i.isSafari = !i.isChrome && -1 !== i.userAgent.indexOf("Safari")),
          (i.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(
            i.userAgent
          )),
          (i.isWebKit = -1 !== i.userAgent.indexOf("AppleWebKit")),
          (i.deg2rad = (2 * Math.PI) / 360),
          (i.hasBidiBug =
            i.isFirefox && 4 > parseInt(i.userAgent.split("Firefox/")[1], 10)),
          (i.marginNames = [
            "plotTop",
            "marginRight",
            "marginBottom",
            "plotLeft",
          ]),
          (i.noop = function () {}),
          (i.supportsPassiveEvents = (function () {
            let t = !1;
            if (!i.isMS) {
              let e = Object.defineProperty({}, "passive", {
                get: function () {
                  t = !0;
                },
              });
              i.win.addEventListener &&
                i.win.removeEventListener &&
                (i.win.addEventListener("testPassive", i.noop, e),
                i.win.removeEventListener("testPassive", i.noop, e));
            }
            return t;
          })()),
          (i.charts = []),
          (i.composed = []),
          (i.dateFormats = {}),
          (i.seriesTypes = {}),
          (i.symbolSizes = {}),
          (i.chartCount = 0),
          e
        );
      }),
      i(e, "Core/Utilities.js", [e["Core/Globals.js"]], function (t) {
        let e;
        let { charts: i, doc: s, win: o } = t;
        function r(e, i, s, a) {
          let n = i ? "Highcharts error" : "Highcharts warning";
          32 === e && (e = `${n}: Deprecated member`);
          let l = p(e),
            h = l
              ? `${n} #${e}: www.highcharts.com/errors/${e}/`
              : e.toString();
          if (void 0 !== a) {
            let t = "";
            l && (h += "?"),
              k(a, function (e, i) {
                (t += `
    - ${i}: ${e}`),
                  l && (h += encodeURI(i) + "=" + encodeURI(e));
              }),
              (h += t);
          }
          C(
            t,
            "displayError",
            { chart: s, code: e, message: h, params: a },
            function () {
              if (i) throw Error(h);
              o.console && -1 === r.messages.indexOf(h) && console.warn(h);
            }
          ),
            r.messages.push(h);
        }
        function a(t, e) {
          return parseInt(t, e || 10);
        }
        function n(t) {
          return "string" == typeof t;
        }
        function l(t) {
          let e = Object.prototype.toString.call(t);
          return "[object Array]" === e || "[object Array Iterator]" === e;
        }
        function h(t, e) {
          return !!t && "object" == typeof t && (!e || !l(t));
        }
        function d(t) {
          return h(t) && "number" == typeof t.nodeType;
        }
        function c(t) {
          let e = t && t.constructor;
          return !!(h(t, !0) && !d(t) && e && e.name && "Object" !== e.name);
        }
        function p(t) {
          return "number" == typeof t && !isNaN(t) && t < 1 / 0 && t > -1 / 0;
        }
        function u(t) {
          return null != t;
        }
        function g(t, e, i) {
          let s;
          let o = n(e) && !u(i),
            r = (e, i) => {
              u(e)
                ? t.setAttribute(i, e)
                : o
                ? (s = t.getAttribute(i)) ||
                  "class" !== i ||
                  (s = t.getAttribute(i + "Name"))
                : t.removeAttribute(i);
            };
          return n(e) ? r(i, e) : k(e, r), s;
        }
        function f(t) {
          return l(t) ? t : [t];
        }
        function m(t, e) {
          let i;
          for (i in (t || (t = {}), e)) t[i] = e[i];
          return t;
        }
        function x() {
          let t = arguments,
            e = t.length;
          for (let i = 0; i < e; i++) {
            let e = t[i];
            if (null != e) return e;
          }
        }
        function y(t, e) {
          m(t.style, e);
        }
        function b(t) {
          return Math.pow(10, Math.floor(Math.log(t) / Math.LN10));
        }
        function v(t, e) {
          return t > 1e14 ? t : parseFloat(t.toPrecision(e || 14));
        }
        ((r || (r = {})).messages = []),
          (Math.easeInOutSine = function (t) {
            return -0.5 * (Math.cos(Math.PI * t) - 1);
          });
        let S = Array.prototype.find
          ? function (t, e) {
              return t.find(e);
            }
          : function (t, e) {
              let i;
              let s = t.length;
              for (i = 0; i < s; i++) if (e(t[i], i)) return t[i];
            };
        function k(t, e, i) {
          for (let s in t)
            Object.hasOwnProperty.call(t, s) && e.call(i || t[s], t[s], s, t);
        }
        function M(t, e, i) {
          function s(e, i) {
            let s = t.removeEventListener;
            s && s.call(t, e, i, !1);
          }
          function o(i) {
            let o, r;
            t.nodeName &&
              (e ? ((o = {})[e] = !0) : (o = i),
              k(o, function (t, e) {
                if (i[e]) for (r = i[e].length; r--; ) s(e, i[e][r].fn);
              }));
          }
          let r = ("function" == typeof t && t.prototype) || t;
          if (Object.hasOwnProperty.call(r, "hcEvents")) {
            let t = r.hcEvents;
            if (e) {
              let r = t[e] || [];
              i
                ? ((t[e] = r.filter(function (t) {
                    return i !== t.fn;
                  })),
                  s(e, i))
                : (o(t), (t[e] = []));
            } else o(t), delete r.hcEvents;
          }
        }
        function C(e, i, o, r) {
          if (
            ((o = o || {}),
            s.createEvent && (e.dispatchEvent || (e.fireEvent && e !== t)))
          ) {
            let t = s.createEvent("Events");
            t.initEvent(i, !0, !0),
              (o = m(t, o)),
              e.dispatchEvent ? e.dispatchEvent(o) : e.fireEvent(i, o);
          } else if (e.hcEvents) {
            o.target ||
              m(o, {
                preventDefault: function () {
                  o.defaultPrevented = !0;
                },
                target: e,
                type: i,
              });
            let t = [],
              s = e,
              r = !1;
            for (; s.hcEvents; )
              Object.hasOwnProperty.call(s, "hcEvents") &&
                s.hcEvents[i] &&
                (t.length && (r = !0), t.unshift.apply(t, s.hcEvents[i])),
                (s = Object.getPrototypeOf(s));
            r && t.sort((t, e) => t.order - e.order),
              t.forEach((t) => {
                !1 === t.fn.call(e, o) && o.preventDefault();
              });
          }
          r && !o.defaultPrevented && r.call(e, o);
        }
        k(
          {
            map: "map",
            each: "forEach",
            grep: "filter",
            reduce: "reduce",
            some: "some",
          },
          function (e, i) {
            t[i] = function (t) {
              return (
                r(32, !1, void 0, { [`Highcharts.${i}`]: `use Array.${e}` }),
                Array.prototype[e].apply(t, [].slice.call(arguments, 1))
              );
            };
          }
        );
        let A = (function () {
          let t = Math.random().toString(36).substring(2, 9) + "-",
            i = 0;
          return function () {
            return "highcharts-" + (e ? "" : t) + i++;
          };
        })();
        return (
          o.jQuery &&
            (o.jQuery.fn.highcharts = function () {
              let e = [].slice.call(arguments);
              if (this[0])
                return e[0]
                  ? (new t[n(e[0]) ? e.shift() : "Chart"](this[0], e[0], e[1]),
                    this)
                  : i[g(this[0], "data-highcharts-chart")];
            }),
          {
            addEvent: function (e, i, s, o = {}) {
              let r = ("function" == typeof e && e.prototype) || e;
              Object.hasOwnProperty.call(r, "hcEvents") || (r.hcEvents = {});
              let a = r.hcEvents;
              t.Point &&
                e instanceof t.Point &&
                e.series &&
                e.series.chart &&
                (e.series.chart.runTrackerClick = !0);
              let n = e.addEventListener;
              n &&
                n.call(
                  e,
                  i,
                  s,
                  !!t.supportsPassiveEvents && {
                    passive:
                      void 0 === o.passive
                        ? -1 !== i.indexOf("touch")
                        : o.passive,
                    capture: !1,
                  }
                ),
                a[i] || (a[i] = []);
              let l = {
                fn: s,
                order: "number" == typeof o.order ? o.order : 1 / 0,
              };
              return (
                a[i].push(l),
                a[i].sort((t, e) => t.order - e.order),
                function () {
                  M(e, i, s);
                }
              );
            },
            arrayMax: function (t) {
              let e = t.length,
                i = t[0];
              for (; e--; ) t[e] > i && (i = t[e]);
              return i;
            },
            arrayMin: function (t) {
              let e = t.length,
                i = t[0];
              for (; e--; ) t[e] < i && (i = t[e]);
              return i;
            },
            attr: g,
            clamp: function (t, e, i) {
              return t > e ? (t < i ? t : i) : e;
            },
            clearTimeout: function (t) {
              u(t) && clearTimeout(t);
            },
            correctFloat: v,
            createElement: function (t, e, i, o, r) {
              let a = s.createElement(t);
              return (
                e && m(a, e),
                r && y(a, { padding: "0", border: "none", margin: "0" }),
                i && y(a, i),
                o && o.appendChild(a),
                a
              );
            },
            crisp: (t, e = 0, i) => {
              let s = (e % 2) / 2,
                o = i ? -1 : 1;
              return (Math.round(t * o - s) + s) * o;
            },
            css: y,
            defined: u,
            destroyObjectProperties: function (t, e, i) {
              k(t, function (s, o) {
                s !== e && s?.destroy && s.destroy(),
                  (s?.destroy || !i) && delete t[o];
              });
            },
            diffObjects: function (t, e, i, s) {
              let o = {};
              return (
                (function t(e, o, r, a) {
                  let n = i ? o : e;
                  k(e, function (i, d) {
                    if (!a && s && s.indexOf(d) > -1 && o[d]) {
                      (i = f(i)), (r[d] = []);
                      for (let e = 0; e < Math.max(i.length, o[d].length); e++)
                        o[d][e] &&
                          (void 0 === i[e]
                            ? (r[d][e] = o[d][e])
                            : ((r[d][e] = {}),
                              t(i[e], o[d][e], r[d][e], a + 1)));
                    } else h(i, !0) && !i.nodeType ? ((r[d] = l(i) ? [] : {}), t(i, o[d] || {}, r[d], a + 1), 0 !== Object.keys(r[d]).length || ("colorAxis" === d && 0 === a) || delete r[d]) : (e[d] !== o[d] || (d in e && !(d in o))) && "__proto__" !== d && "constructor" !== d && (r[d] = n[d]);
                  });
                })(t, e, o, 0),
                o
              );
            },
            discardElement: function (t) {
              t && t.parentElement && t.parentElement.removeChild(t);
            },
            erase: function (t, e) {
              let i = t.length;
              for (; i--; )
                if (t[i] === e) {
                  t.splice(i, 1);
                  break;
                }
            },
            error: r,
            extend: m,
            extendClass: function (t, e) {
              let i = function () {};
              return (i.prototype = new t()), m(i.prototype, e), i;
            },
            find: S,
            fireEvent: C,
            getClosestDistance: function (t, e) {
              let i, s, o, r;
              let a = !e;
              return (
                t.forEach((t) => {
                  if (t.length > 1)
                    for (r = s = t.length - 1; r > 0; r--)
                      (o = t[r] - t[r - 1]) < 0 && !a
                        ? (e?.(), (e = void 0))
                        : o && (void 0 === i || o < i) && (i = o);
                }),
                i
              );
            },
            getMagnitude: b,
            getNestedProperty: function (t, e) {
              let i = t.split(".");
              for (; i.length && u(e); ) {
                let t = i.shift();
                if (void 0 === t || "__proto__" === t) return;
                if ("this" === t) {
                  let t;
                  return h(e) && (t = e["@this"]), t ?? e;
                }
                let s = e[t];
                if (
                  !u(s) ||
                  "function" == typeof s ||
                  "number" == typeof s.nodeType ||
                  s === o
                )
                  return;
                e = s;
              }
              return e;
            },
            getStyle: function t(e, i, s) {
              let r;
              if ("width" === i) {
                let i = Math.min(e.offsetWidth, e.scrollWidth),
                  s =
                    e.getBoundingClientRect && e.getBoundingClientRect().width;
                return (
                  s < i && s >= i - 1 && (i = Math.floor(s)),
                  Math.max(
                    0,
                    i -
                      (t(e, "padding-left", !0) || 0) -
                      (t(e, "padding-right", !0) || 0)
                  )
                );
              }
              if ("height" === i)
                return Math.max(
                  0,
                  Math.min(e.offsetHeight, e.scrollHeight) -
                    (t(e, "padding-top", !0) || 0) -
                    (t(e, "padding-bottom", !0) || 0)
                );
              let n = o.getComputedStyle(e, void 0);
              return (
                n &&
                  ((r = n.getPropertyValue(i)),
                  x(s, "opacity" !== i) && (r = a(r))),
                r
              );
            },
            inArray: function (t, e, i) {
              return (
                r(32, !1, void 0, {
                  "Highcharts.inArray": "use Array.indexOf",
                }),
                e.indexOf(t, i)
              );
            },
            insertItem: function (t, e) {
              let i;
              let s = t.options.index,
                o = e.length;
              for (i = t.options.isInternal ? o : 0; i < o + 1; i++)
                if (
                  !e[i] ||
                  (p(s) && s < x(e[i].options.index, e[i]._i)) ||
                  e[i].options.isInternal
                ) {
                  e.splice(i, 0, t);
                  break;
                }
              return i;
            },
            isArray: l,
            isClass: c,
            isDOMElement: d,
            isFunction: function (t) {
              return "function" == typeof t;
            },
            isNumber: p,
            isObject: h,
            isString: n,
            keys: function (t) {
              return (
                r(32, !1, void 0, { "Highcharts.keys": "use Object.keys" }),
                Object.keys(t)
              );
            },
            merge: function () {
              let t,
                e = arguments,
                i = {},
                s = function (t, e) {
                  return (
                    "object" != typeof t && (t = {}),
                    k(e, function (i, o) {
                      "__proto__" !== o &&
                        "constructor" !== o &&
                        (!h(i, !0) || c(i) || d(i)
                          ? (t[o] = e[o])
                          : (t[o] = s(t[o] || {}, i)));
                    }),
                    t
                  );
                };
              !0 === e[0] &&
                ((i = e[1]), (e = Array.prototype.slice.call(e, 2)));
              let o = e.length;
              for (t = 0; t < o; t++) i = s(i, e[t]);
              return i;
            },
            normalizeTickInterval: function (t, e, i, s, o) {
              let r,
                a = t;
              i = x(i, b(t));
              let n = t / i;
              for (
                !e &&
                  ((e = o
                    ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]
                    : [1, 2, 2.5, 5, 10]),
                  !1 === s &&
                    (1 === i
                      ? (e = e.filter(function (t) {
                          return t % 1 == 0;
                        }))
                      : i <= 0.1 && (e = [1 / i]))),
                  r = 0;
                r < e.length &&
                ((a = e[r]),
                (!o || !(a * i >= t)) &&
                  (o || !(n <= (e[r] + (e[r + 1] || e[r])) / 2)));
                r++
              );
              return v(a * i, -Math.round(Math.log(0.001) / Math.LN10));
            },
            objectEach: k,
            offset: function (t) {
              let e = s.documentElement,
                i =
                  t.parentElement || t.parentNode
                    ? t.getBoundingClientRect()
                    : { top: 0, left: 0, width: 0, height: 0 };
              return {
                top:
                  i.top + (o.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left:
                  i.left +
                  (o.pageXOffset || e.scrollLeft) -
                  (e.clientLeft || 0),
                width: i.width,
                height: i.height,
              };
            },
            pad: function (t, e, i) {
              return (
                Array((e || 2) + 1 - String(t).replace("-", "").length).join(
                  i || "0"
                ) + t
              );
            },
            pick: x,
            pInt: a,
            pushUnique: function (t, e) {
              return 0 > t.indexOf(e) && !!t.push(e);
            },
            relativeLength: function (t, e, i) {
              return /%$/.test(t)
                ? (e * parseFloat(t)) / 100 + (i || 0)
                : parseFloat(t);
            },
            removeEvent: M,
            replaceNested: function (t, ...e) {
              let i, s;
              do for (s of ((i = t), e)) t = t.replace(s[0], s[1]);
              while (t !== i);
              return t;
            },
            splat: f,
            stableSort: function (t, e) {
              let i, s;
              let o = t.length;
              for (s = 0; s < o; s++) t[s].safeI = s;
              for (
                t.sort(function (t, s) {
                  return 0 === (i = e(t, s)) ? t.safeI - s.safeI : i;
                }),
                  s = 0;
                s < o;
                s++
              )
                delete t[s].safeI;
            },
            syncTimeout: function (t, e, i) {
              return e > 0 ? setTimeout(t, e, i) : (t.call(0, i), -1);
            },
            timeUnits: {
              millisecond: 1,
              second: 1e3,
              minute: 6e4,
              hour: 36e5,
              day: 864e5,
              week: 6048e5,
              month: 24192e5,
              year: 314496e5,
            },
            uniqueKey: A,
            useSerialIds: function (t) {
              return (e = x(t, e));
            },
            wrap: function (t, e, i) {
              let s = t[e];
              t[e] = function () {
                let t = arguments,
                  e = this;
                return i.apply(
                  this,
                  [
                    function () {
                      return s.apply(e, arguments.length ? arguments : t);
                    },
                  ].concat([].slice.call(arguments))
                );
              };
            },
          }
        );
      }),
      i(e, "Core/Chart/ChartDefaults.js", [], function () {
        return {
          alignThresholds: !1,
          panning: { enabled: !1, type: "x" },
          styledMode: !1,
          borderRadius: 0,
          colorCount: 10,
          allowMutatingData: !0,
          ignoreHiddenSeries: !0,
          spacing: [10, 10, 15, 10],
          resetZoomButton: { theme: {}, position: {} },
          reflow: !0,
          type: "line",
          zooming: {
            singleTouch: !1,
            resetButton: {
              theme: { zIndex: 6 },
              position: { align: "right", x: -10, y: 10 },
            },
          },
          width: null,
          height: null,
          borderColor: "#334eff",
          backgroundColor: "#ffffff",
          plotBorderColor: "#cccccc",
        };
      }),
      i(e, "Core/Color/Palettes.js", [], function () {
        return {
          colors: [
            "#2caffe",
            "#544fc5",
            "#00e272",
            "#fe6a35",
            "#6b8abc",
            "#d568fb",
            "#2ee0ca",
            "#fa4b42",
            "#feb56a",
            "#91e8e1",
          ],
        };
      }),
      i(
        e,
        "Core/Time.js",
        [e["Core/Globals.js"], e["Core/Utilities.js"]],
        function (t, e) {
          let { win: i } = t,
            {
              defined: s,
              error: o,
              extend: r,
              isNumber: a,
              isObject: n,
              merge: l,
              objectEach: h,
              pad: d,
              pick: c,
              splat: p,
              timeUnits: u,
            } = e,
            g =
              t.isSafari &&
              i.Intl &&
              i.Intl.DateTimeFormat.prototype.formatRange,
            f =
              t.isSafari &&
              i.Intl &&
              !i.Intl.DateTimeFormat.prototype.formatRange;
          class m {
            constructor(t) {
              (this.options = {}),
                (this.useUTC = !1),
                (this.variableTimezone = !1),
                (this.Date = i.Date),
                (this.getTimezoneOffset = this.timezoneOffsetFunction()),
                this.update(t);
            }
            get(t, e) {
              if (this.variableTimezone || this.timezoneOffset) {
                let i = e.getTime(),
                  s = i - this.getTimezoneOffset(e);
                e.setTime(s);
                let o = e["getUTC" + t]();
                return e.setTime(i), o;
              }
              return this.useUTC ? e["getUTC" + t]() : e["get" + t]();
            }
            set(t, e, i) {
              if (this.variableTimezone || this.timezoneOffset) {
                if (
                  "Milliseconds" === t ||
                  "Seconds" === t ||
                  ("Minutes" === t && this.getTimezoneOffset(e) % 36e5 == 0)
                )
                  return e["setUTC" + t](i);
                let s = this.getTimezoneOffset(e),
                  o = e.getTime() - s;
                e.setTime(o), e["setUTC" + t](i);
                let r = this.getTimezoneOffset(e);
                return (o = e.getTime() + r), e.setTime(o);
              }
              return this.useUTC || (g && "FullYear" === t)
                ? e["setUTC" + t](i)
                : e["set" + t](i);
            }
            update(t = {}) {
              let e = c(t.useUTC, !0);
              (this.options = t = l(!0, this.options, t)),
                (this.Date = t.Date || i.Date || Date),
                (this.useUTC = e),
                (this.timezoneOffset = (e && t.timezoneOffset) || void 0),
                (this.getTimezoneOffset = this.timezoneOffsetFunction()),
                (this.variableTimezone =
                  e && !!(t.getTimezoneOffset || t.timezone));
            }
            makeTime(t, e, i, s, o, r) {
              let a, n, l;
              return (
                this.useUTC
                  ? ((a = this.Date.UTC.apply(0, arguments)),
                    (n = this.getTimezoneOffset(a)),
                    (a += n),
                    n !== (l = this.getTimezoneOffset(a))
                      ? (a += l - n)
                      : n - 36e5 !== this.getTimezoneOffset(a - 36e5) ||
                        f ||
                        (a -= 36e5))
                  : (a = new this.Date(
                      t,
                      e,
                      c(i, 1),
                      c(s, 0),
                      c(o, 0),
                      c(r, 0)
                    ).getTime()),
                a
              );
            }
            timezoneOffsetFunction() {
              let t = this,
                e = this.options,
                i = e.getTimezoneOffset;
              return this.useUTC
                ? e.timezone
                  ? (t) => {
                      try {
                        let i = `shortOffset,${e.timezone || ""}`,
                          [s, o, r, n, l = 0] = (m.formatCache[i] =
                            m.formatCache[i] ||
                            Intl.DateTimeFormat("en", {
                              timeZone: e.timezone,
                              timeZoneName: "shortOffset",
                            }))
                            .format(t)
                            .split(/(GMT|:)/)
                            .map(Number),
                          h = -(36e5 * (r + l / 60));
                        if (a(h)) return h;
                      } catch (t) {
                        o(34);
                      }
                      return 0;
                    }
                  : this.useUTC && i
                  ? (t) => 6e4 * i(t.valueOf())
                  : () => 6e4 * (t.timezoneOffset || 0)
                : (t) => 6e4 * new Date(t.toString()).getTimezoneOffset();
            }
            dateFormat(e, i, o) {
              if (!s(i) || isNaN(i))
                return (
                  (t.defaultOptions.lang &&
                    t.defaultOptions.lang.invalidDate) ||
                  ""
                );
              e = c(e, "%Y-%m-%d %H:%M:%S");
              let a = this,
                n = new this.Date(i),
                l = this.get("Hours", n),
                p = this.get("Day", n),
                u = this.get("Date", n),
                g = this.get("Month", n),
                f = this.get("FullYear", n),
                m = t.defaultOptions.lang,
                x = m && m.weekdays,
                y = m && m.shortWeekdays;
              return (
                h(
                  r(
                    {
                      a: y ? y[p] : x[p].substr(0, 3),
                      A: x[p],
                      d: d(u),
                      e: d(u, 2, " "),
                      w: p,
                      b: m.shortMonths[g],
                      B: m.months[g],
                      m: d(g + 1),
                      o: g + 1,
                      y: f.toString().substr(2, 2),
                      Y: f,
                      H: d(l),
                      k: l,
                      I: d(l % 12 || 12),
                      l: l % 12 || 12,
                      M: d(this.get("Minutes", n)),
                      p: l < 12 ? "AM" : "PM",
                      P: l < 12 ? "am" : "pm",
                      S: d(this.get("Seconds", n)),
                      L: d(Math.floor(i % 1e3), 3),
                    },
                    t.dateFormats
                  ),
                  function (t, s) {
                    for (; -1 !== e.indexOf("%" + s); )
                      e = e.replace(
                        "%" + s,
                        "function" == typeof t ? t.call(a, i) : t
                      );
                  }
                ),
                o ? e.substr(0, 1).toUpperCase() + e.substr(1) : e
              );
            }
            resolveDTLFormat(t) {
              return n(t, !0)
                ? t
                : { main: (t = p(t))[0], from: t[1], to: t[2] };
            }
            getTimeTicks(t, e, i, o) {
              let a, n, l, h;
              let d = this,
                p = d.Date,
                g = [],
                f = {},
                m = new p(e),
                x = t.unitRange,
                y = t.count || 1;
              if (((o = c(o, 1)), s(e))) {
                d.set(
                  "Milliseconds",
                  m,
                  x >= u.second
                    ? 0
                    : y * Math.floor(d.get("Milliseconds", m) / y)
                ),
                  x >= u.second &&
                    d.set(
                      "Seconds",
                      m,
                      x >= u.minute
                        ? 0
                        : y * Math.floor(d.get("Seconds", m) / y)
                    ),
                  x >= u.minute &&
                    d.set(
                      "Minutes",
                      m,
                      x >= u.hour ? 0 : y * Math.floor(d.get("Minutes", m) / y)
                    ),
                  x >= u.hour &&
                    d.set(
                      "Hours",
                      m,
                      x >= u.day ? 0 : y * Math.floor(d.get("Hours", m) / y)
                    ),
                  x >= u.day &&
                    d.set(
                      "Date",
                      m,
                      x >= u.month
                        ? 1
                        : Math.max(1, y * Math.floor(d.get("Date", m) / y))
                    ),
                  x >= u.month &&
                    (d.set(
                      "Month",
                      m,
                      x >= u.year ? 0 : y * Math.floor(d.get("Month", m) / y)
                    ),
                    (n = d.get("FullYear", m))),
                  x >= u.year && ((n -= n % y), d.set("FullYear", m, n)),
                  x === u.week &&
                    ((h = d.get("Day", m)),
                    d.set(
                      "Date",
                      m,
                      d.get("Date", m) - h + o + (h < o ? -7 : 0)
                    )),
                  (n = d.get("FullYear", m));
                let t = d.get("Month", m),
                  r = d.get("Date", m),
                  c = d.get("Hours", m);
                (e = m.getTime()),
                  (d.variableTimezone || !d.useUTC) &&
                    s(i) &&
                    (l =
                      i - e > 4 * u.month ||
                      d.getTimezoneOffset(e) !== d.getTimezoneOffset(i));
                let p = m.getTime();
                for (a = 1; p < i; )
                  g.push(p),
                    x === u.year
                      ? (p = d.makeTime(n + a * y, 0))
                      : x === u.month
                      ? (p = d.makeTime(n, t + a * y))
                      : l && (x === u.day || x === u.week)
                      ? (p = d.makeTime(
                          n,
                          t,
                          r + a * y * (x === u.day ? 1 : 7)
                        ))
                      : l && x === u.hour && y > 1
                      ? (p = d.makeTime(n, t, r, c + a * y))
                      : (p += x * y),
                    a++;
                g.push(p),
                  x <= u.hour &&
                    g.length < 1e4 &&
                    g.forEach(function (t) {
                      t % 18e5 == 0 &&
                        "000000000" === d.dateFormat("%H%M%S%L", t) &&
                        (f[t] = "day");
                    });
              }
              return (g.info = r(t, { higherRanks: f, totalRange: x * y })), g;
            }
            getDateFormat(t, e, i, s) {
              let o = this.dateFormat("%m-%d %H:%M:%S.%L", e),
                r = "01-01 00:00:00.000",
                a = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 },
                n = "millisecond",
                l = n;
              for (n in u) {
                if (
                  t === u.week &&
                  +this.dateFormat("%w", e) === i &&
                  o.substr(6) === r.substr(6)
                ) {
                  n = "week";
                  break;
                }
                if (u[n] > t) {
                  n = l;
                  break;
                }
                if (a[n] && o.substr(a[n]) !== r.substr(a[n])) break;
                "week" !== n && (l = n);
              }
              return this.resolveDTLFormat(s[n]).main;
            }
          }
          return (m.formatCache = {}), m;
        }
      ),
      i(
        e,
        "Core/Defaults.js",
        [
          e["Core/Chart/ChartDefaults.js"],
          e["Core/Globals.js"],
          e["Core/Color/Palettes.js"],
          e["Core/Time.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s, o) {
          let { isTouchDevice: r } = e,
            { fireEvent: a, merge: n } = o,
            l = {
              colors: i.colors,
              symbols: [
                "circle",
                "diamond",
                "square",
                "triangle",
                "triangle-down",
              ],
              lang: {
                loading: "Loading...",
                months: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
                shortMonths: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                weekdays: [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                decimalPoint: ".",
                numericSymbols: ["k", "M", "G", "T", "P", "E"],
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " ",
              },
              global: {
                buttonTheme: {
                  fill: "#f7f7f7",
                  padding: 8,
                  r: 2,
                  stroke: "#cccccc",
                  "stroke-width": 1,
                  style: {
                    color: "#333333",
                    cursor: "pointer",
                    fontSize: "0.8em",
                    fontWeight: "normal",
                  },
                  states: {
                    hover: { fill: "#e6e6e6" },
                    select: {
                      fill: "#e6e9ff",
                      style: { color: "#000000", fontWeight: "bold" },
                    },
                    disabled: { style: { color: "#cccccc" } },
                  },
                },
              },
              time: {
                Date: void 0,
                getTimezoneOffset: void 0,
                timezone: void 0,
                timezoneOffset: 0,
                useUTC: !0,
              },
              chart: t,
              title: {
                style: { color: "#333333", fontWeight: "bold" },
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44,
              },
              subtitle: {
                style: { color: "#666666", fontSize: "0.8em" },
                text: "",
                align: "center",
                widthAdjust: -44,
              },
              caption: {
                margin: 15,
                style: { color: "#666666", fontSize: "0.8em" },
                text: "",
                align: "left",
                verticalAlign: "bottom",
              },
              plotOptions: {},
              legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                className: "highcharts-no-tooltip",
                events: {},
                layout: "horizontal",
                itemMarginBottom: 2,
                itemMarginTop: 2,
                labelFormatter: function () {
                  return this.name;
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                  style: { fontSize: "0.8em" },
                  activeColor: "#0022ff",
                  inactiveColor: "#cccccc",
                },
                itemStyle: {
                  color: "#333333",
                  cursor: "pointer",
                  fontSize: "0.8em",
                  textDecoration: "none",
                  textOverflow: "ellipsis",
                },
                itemHoverStyle: { color: "#000000" },
                itemHiddenStyle: {
                  color: "#666666",
                  textDecoration: "line-through",
                },
                shadow: !1,
                itemCheckboxStyle: {
                  position: "absolute",
                  width: "13px",
                  height: "13px",
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: { style: { fontSize: "0.8em", fontWeight: "bold" } },
              },
              loading: {
                labelStyle: {
                  fontWeight: "bold",
                  position: "relative",
                  top: "45%",
                },
                style: {
                  position: "absolute",
                  backgroundColor: "#ffffff",
                  opacity: 0.5,
                  textAlign: "center",
                },
              },
              tooltip: {
                enabled: !0,
                animation: {
                  duration: 300,
                  easing: (t) => Math.sqrt(1 - Math.pow(t - 1, 2)),
                },
                borderRadius: 3,
                dateTimeLabelFormats: {
                  millisecond: "%A, %e %b, %H:%M:%S.%L",
                  second: "%A, %e %b, %H:%M:%S",
                  minute: "%A, %e %b, %H:%M",
                  hour: "%A, %e %b, %H:%M",
                  day: "%A, %e %b %Y",
                  week: "Week from %A, %e %b %Y",
                  month: "%B %Y",
                  year: "%Y",
                },
                footerFormat: "",
                headerShape: "callout",
                hideDelay: 500,
                padding: 8,
                shape: "callout",
                shared: !1,
                snap: r ? 25 : 10,
                headerFormat:
                  '<span style="font-size: 0.8em">{point.key}</span><br/>',
                pointFormat:
                  '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
                backgroundColor: "#ffffff",
                borderWidth: void 0,
                shadow: !0,
                stickOnContact: !1,
                style: {
                  color: "#333333",
                  cursor: "default",
                  fontSize: "0.8em",
                },
                useHTML: !1,
              },
              credits: {
                enabled: !0,
                href: "https://www.highcharts.com?credits",
                position: {
                  align: "right",
                  x: -10,
                  verticalAlign: "bottom",
                  y: -5,
                },
                style: {
                  cursor: "pointer",
                  color: "#999999",
                  fontSize: "0.6em",
                },
                text: "Highcharts.com",
              },
            };
          l.chart.styledMode = !1;
          let h = new s(l.time);
          return {
            defaultOptions: l,
            defaultTime: h,
            getOptions: function () {
              return l;
            },
            setOptions: function (t) {
              return (
                a(e, "setOptions", { options: t }),
                n(!0, l, t),
                (t.time || t.global) &&
                  (e.time
                    ? e.time.update(n(l.global, l.time, t.global, t.time))
                    : (e.time = h)),
                l
              );
            },
          };
        }
      ),
      i(
        e,
        "Core/Color/Color.js",
        [e["Core/Globals.js"], e["Core/Utilities.js"]],
        function (t, e) {
          let { isNumber: i, merge: s, pInt: o } = e;
          class r {
            static parse(t) {
              return t ? new r(t) : r.None;
            }
            constructor(e) {
              let i, s, o, a;
              (this.rgba = [NaN, NaN, NaN, NaN]), (this.input = e);
              let n = t.Color;
              if (n && n !== r) return new n(e);
              if ("object" == typeof e && void 0 !== e.stops)
                this.stops = e.stops.map((t) => new r(t[1]));
              else if ("string" == typeof e) {
                if (
                  ((this.input = e = r.names[e.toLowerCase()] || e),
                  "#" === e.charAt(0))
                ) {
                  let t = e.length,
                    i = parseInt(e.substr(1), 16);
                  7 === t
                    ? (s = [(16711680 & i) >> 16, (65280 & i) >> 8, 255 & i, 1])
                    : 4 === t &&
                      (s = [
                        ((3840 & i) >> 4) | ((3840 & i) >> 8),
                        ((240 & i) >> 4) | (240 & i),
                        ((15 & i) << 4) | (15 & i),
                        1,
                      ]);
                }
                if (!s)
                  for (o = r.parsers.length; o-- && !s; )
                    (i = (a = r.parsers[o]).regex.exec(e)) && (s = a.parse(i));
              }
              s && (this.rgba = s);
            }
            get(t) {
              let e = this.input,
                o = this.rgba;
              if ("object" == typeof e && void 0 !== this.stops) {
                let i = s(e);
                return (
                  (i.stops = [].slice.call(i.stops)),
                  this.stops.forEach((e, s) => {
                    i.stops[s] = [i.stops[s][0], e.get(t)];
                  }),
                  i
                );
              }
              return o && i(o[0])
                ? "rgb" !== t && (t || 1 !== o[3])
                  ? "a" === t
                    ? `${o[3]}`
                    : "rgba(" + o.join(",") + ")"
                  : "rgb(" + o[0] + "," + o[1] + "," + o[2] + ")"
                : e;
            }
            brighten(t) {
              let e = this.rgba;
              if (this.stops)
                this.stops.forEach(function (e) {
                  e.brighten(t);
                });
              else if (i(t) && 0 !== t)
                for (let i = 0; i < 3; i++)
                  (e[i] += o(255 * t)),
                    e[i] < 0 && (e[i] = 0),
                    e[i] > 255 && (e[i] = 255);
              return this;
            }
            setOpacity(t) {
              return (this.rgba[3] = t), this;
            }
            tweenTo(t, e) {
              let s = this.rgba,
                o = t.rgba;
              if (!i(s[0]) || !i(o[0])) return t.input || "none";
              let r = 1 !== o[3] || 1 !== s[3];
              return (
                (r ? "rgba(" : "rgb(") +
                Math.round(o[0] + (s[0] - o[0]) * (1 - e)) +
                "," +
                Math.round(o[1] + (s[1] - o[1]) * (1 - e)) +
                "," +
                Math.round(o[2] + (s[2] - o[2]) * (1 - e)) +
                (r ? "," + (o[3] + (s[3] - o[3]) * (1 - e)) : "") +
                ")"
              );
            }
          }
          return (
            (r.names = { white: "#ffffff", black: "#000000" }),
            (r.parsers = [
              {
                regex:
                  /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?(?:\.\d+)?)\s*\)/,
                parse: function (t) {
                  return [o(t[1]), o(t[2]), o(t[3]), parseFloat(t[4], 10)];
                },
              },
              {
                regex: /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/,
                parse: function (t) {
                  return [o(t[1]), o(t[2]), o(t[3]), 1];
                },
              },
            ]),
            (r.None = new r("")),
            r
          );
        }
      ),
      i(
        e,
        "Core/Animation/Fx.js",
        [
          e["Core/Color/Color.js"],
          e["Core/Globals.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i) {
          let { parse: s } = t,
            { win: o } = e,
            { isNumber: r, objectEach: a } = i;
          class n {
            constructor(t, e, i) {
              (this.pos = NaN),
                (this.options = e),
                (this.elem = t),
                (this.prop = i);
            }
            dSetter() {
              let t = this.paths,
                e = t && t[0],
                i = t && t[1],
                s = this.now || 0,
                o = [];
              if (1 !== s && e && i) {
                if (e.length === i.length && s < 1)
                  for (let t = 0; t < i.length; t++) {
                    let a = e[t],
                      n = i[t],
                      l = [];
                    for (let t = 0; t < n.length; t++) {
                      let e = a[t],
                        i = n[t];
                      r(e) && r(i) && !("A" === n[0] && (4 === t || 5 === t))
                        ? (l[t] = e + s * (i - e))
                        : (l[t] = i);
                    }
                    o.push(l);
                  }
                else o = i;
              } else o = this.toD || [];
              this.elem.attr("d", o, void 0, !0);
            }
            update() {
              let t = this.elem,
                e = this.prop,
                i = this.now,
                s = this.options.step;
              this[e + "Setter"]
                ? this[e + "Setter"]()
                : t.attr
                ? t.element && t.attr(e, i, null, !0)
                : (t.style[e] = i + this.unit),
                s && s.call(t, i, this);
            }
            run(t, e, i) {
              let s = this,
                r = s.options,
                a = function (t) {
                  return !a.stopped && s.step(t);
                },
                l =
                  o.requestAnimationFrame ||
                  function (t) {
                    setTimeout(t, 13);
                  },
                h = function () {
                  for (let t = 0; t < n.timers.length; t++)
                    n.timers[t]() || n.timers.splice(t--, 1);
                  n.timers.length && l(h);
                };
              t !== e || this.elem["forceAnimate:" + this.prop]
                ? ((this.startTime = +new Date()),
                  (this.start = t),
                  (this.end = e),
                  (this.unit = i),
                  (this.now = this.start),
                  (this.pos = 0),
                  (a.elem = this.elem),
                  (a.prop = this.prop),
                  a() && 1 === n.timers.push(a) && l(h))
                : (delete r.curAnim[this.prop],
                  r.complete &&
                    0 === Object.keys(r.curAnim).length &&
                    r.complete.call(this.elem));
            }
            step(t) {
              let e, i;
              let s = +new Date(),
                o = this.options,
                r = this.elem,
                n = o.complete,
                l = o.duration,
                h = o.curAnim;
              return (
                r.attr && !r.element
                  ? (e = !1)
                  : t || s >= l + this.startTime
                  ? ((this.now = this.end),
                    (this.pos = 1),
                    this.update(),
                    (h[this.prop] = !0),
                    (i = !0),
                    a(h, function (t) {
                      !0 !== t && (i = !1);
                    }),
                    i && n && n.call(r),
                    (e = !1))
                  : ((this.pos = o.easing((s - this.startTime) / l)),
                    (this.now =
                      this.start + (this.end - this.start) * this.pos),
                    this.update(),
                    (e = !0)),
                e
              );
            }
            initPath(t, e, i) {
              let s = t.startX,
                o = t.endX,
                a = i.slice(),
                n = t.isArea,
                l = n ? 2 : 1,
                h = e && i.length > e.length && i.hasStackedCliffs,
                d,
                c,
                p,
                u,
                g = e && e.slice();
              if (!g || h) return [a, a];
              function f(t, e) {
                for (; t.length < c; ) {
                  let i = t[0],
                    s = e[c - t.length];
                  if (
                    (s &&
                      "M" === i[0] &&
                      ("C" === s[0]
                        ? (t[0] = ["C", i[1], i[2], i[1], i[2], i[1], i[2]])
                        : (t[0] = ["L", i[1], i[2]])),
                    t.unshift(i),
                    n)
                  ) {
                    let e = t.pop();
                    t.push(t[t.length - 1], e);
                  }
                }
              }
              function m(t) {
                for (; t.length < c; ) {
                  let e = t[Math.floor(t.length / l) - 1].slice();
                  if (("C" === e[0] && ((e[1] = e[5]), (e[2] = e[6])), n)) {
                    let i = t[Math.floor(t.length / l)].slice();
                    t.splice(t.length / 2, 0, e, i);
                  } else t.push(e);
                }
              }
              if (s && o && o.length) {
                for (p = 0; p < s.length; p++) {
                  if (s[p] === o[0]) {
                    d = p;
                    break;
                  }
                  if (s[0] === o[o.length - s.length + p]) {
                    (d = p), (u = !0);
                    break;
                  }
                  if (s[s.length - 1] === o[o.length - s.length + p]) {
                    d = s.length - p;
                    break;
                  }
                }
                void 0 === d && (g = []);
              }
              return (
                g.length &&
                  r(d) &&
                  ((c = a.length + d * l),
                  u ? (f(g, a), m(a)) : (f(a, g), m(g))),
                [g, a]
              );
            }
            fillSetter() {
              n.prototype.strokeSetter.apply(this, arguments);
            }
            strokeSetter() {
              this.elem.attr(
                this.prop,
                s(this.start).tweenTo(s(this.end), this.pos),
                void 0,
                !0
              );
            }
          }
          return (n.timers = []), n;
        }
      ),
      i(
        e,
        "Core/Animation/AnimationUtilities.js",
        [e["Core/Animation/Fx.js"], e["Core/Utilities.js"]],
        function (t, e) {
          let {
            defined: i,
            getStyle: s,
            isArray: o,
            isNumber: r,
            isObject: a,
            merge: n,
            objectEach: l,
            pick: h,
          } = e;
          function d(t) {
            return a(t)
              ? n({ duration: 500, defer: 0 }, t)
              : { duration: t ? 500 : 0, defer: 0 };
          }
          function c(e, i) {
            let s = t.timers.length;
            for (; s--; )
              t.timers[s].elem !== e ||
                (i && i !== t.timers[s].prop) ||
                (t.timers[s].stopped = !0);
          }
          return {
            animate: function (e, i, h) {
              let d,
                p = "",
                u,
                g,
                f;
              a(h) ||
                ((f = arguments),
                (h = { duration: f[2], easing: f[3], complete: f[4] })),
                r(h.duration) || (h.duration = 400),
                (h.easing =
                  "function" == typeof h.easing
                    ? h.easing
                    : Math[h.easing] || Math.easeInOutSine),
                (h.curAnim = n(i)),
                l(i, function (r, a) {
                  c(e, a),
                    (g = new t(e, h, a)),
                    (u = void 0),
                    "d" === a && o(i.d)
                      ? ((g.paths = g.initPath(e, e.pathArray, i.d)),
                        (g.toD = i.d),
                        (d = 0),
                        (u = 1))
                      : e.attr
                      ? (d = e.attr(a))
                      : ((d = parseFloat(s(e, a)) || 0),
                        "opacity" !== a && (p = "px")),
                    u || (u = r),
                    "string" == typeof u &&
                      u.match("px") &&
                      (u = u.replace(/px/g, "")),
                    g.run(d, u, p);
                });
            },
            animObject: d,
            getDeferredAnimation: function (t, e, s) {
              let o = d(e),
                r = s ? [s] : t.series,
                n = 0,
                l = 0;
              return (
                r.forEach((t) => {
                  let s = d(t.options.animation);
                  (n =
                    a(e) && i(e.defer)
                      ? o.defer
                      : Math.max(n, s.duration + s.defer)),
                    (l = Math.min(o.duration, s.duration));
                }),
                t.renderer.forExport && (n = 0),
                { defer: Math.max(0, n - l), duration: Math.min(n, l) }
              );
            },
            setAnimation: function (t, e) {
              e.renderer.globalAnimation = h(t, e.options.chart.animation, !0);
            },
            stop: c,
          };
        }
      ),
      i(
        e,
        "Core/Renderer/HTML/AST.js",
        [e["Core/Globals.js"], e["Core/Utilities.js"]],
        function (t, e) {
          let { SVG_NS: i, win: s } = t,
            {
              attr: o,
              createElement: r,
              css: a,
              error: n,
              isFunction: l,
              isString: h,
              objectEach: d,
              splat: c,
            } = e,
            { trustedTypes: p } = s,
            u =
              p &&
              l(p.createPolicy) &&
              p.createPolicy("highcharts", { createHTML: (t) => t }),
            g = u ? u.createHTML("") : "",
            f = (function () {
              try {
                return !!new DOMParser().parseFromString(g, "text/html");
              } catch (t) {
                return !1;
              }
            })();
          class m {
            static filterUserAttributes(t) {
              return (
                d(t, (e, i) => {
                  let s = !0;
                  -1 === m.allowedAttributes.indexOf(i) && (s = !1),
                    -1 !==
                      ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(
                        i
                      ) &&
                      (s =
                        h(e) &&
                        m.allowedReferences.some((t) => 0 === e.indexOf(t))),
                    s ||
                      (n(33, !1, void 0, {
                        "Invalid attribute in config": `${i}`,
                      }),
                      delete t[i]),
                    h(e) && t[i] && (t[i] = e.replace(/</g, "&lt;"));
                }),
                t
              );
            }
            static parseStyle(t) {
              return t.split(";").reduce((t, e) => {
                let i = e.split(":").map((t) => t.trim()),
                  s = i.shift();
                return (
                  s &&
                    i.length &&
                    (t[s.replace(/-([a-z])/g, (t) => t[1].toUpperCase())] =
                      i.join(":")),
                  t
                );
              }, {});
            }
            static setElementHTML(t, e) {
              (t.innerHTML = m.emptyHTML), e && new m(e).addToDOM(t);
            }
            constructor(t) {
              this.nodes = "string" == typeof t ? this.parseMarkup(t) : t;
            }
            addToDOM(e) {
              return (function e(s, r) {
                let l;
                return (
                  c(s).forEach(function (s) {
                    let h;
                    let c = s.tagName,
                      p = s.textContent
                        ? t.doc.createTextNode(s.textContent)
                        : void 0,
                      u = m.bypassHTMLFiltering;
                    if (c) {
                      if ("#text" === c) h = p;
                      else if (-1 !== m.allowedTags.indexOf(c) || u) {
                        let n = "svg" === c ? i : r.namespaceURI || i,
                          l = t.doc.createElementNS(n, c),
                          g = s.attributes || {};
                        d(s, function (t, e) {
                          "tagName" !== e &&
                            "attributes" !== e &&
                            "children" !== e &&
                            "style" !== e &&
                            "textContent" !== e &&
                            (g[e] = t);
                        }),
                          o(l, u ? g : m.filterUserAttributes(g)),
                          s.style && a(l, s.style),
                          p && l.appendChild(p),
                          e(s.children || [], l),
                          (h = l);
                      } else
                        n(33, !1, void 0, { "Invalid tagName in config": c });
                    }
                    h && r.appendChild(h), (l = h);
                  }),
                  l
                );
              })(this.nodes, e);
            }
            parseMarkup(t) {
              let e;
              let i = [];
              if (
                ((t = t.trim().replace(/ style=(["'])/g, " data-style=$1")), f)
              )
                e = new DOMParser().parseFromString(
                  u ? u.createHTML(t) : t,
                  "text/html"
                );
              else {
                let i = r("div");
                (i.innerHTML = t), (e = { body: i });
              }
              let s = (t, e) => {
                let i = t.nodeName.toLowerCase(),
                  o = { tagName: i };
                "#text" === i && (o.textContent = t.textContent || "");
                let r = t.attributes;
                if (r) {
                  let t = {};
                  [].forEach.call(r, (e) => {
                    "data-style" === e.name
                      ? (o.style = m.parseStyle(e.value))
                      : (t[e.name] = e.value);
                  }),
                    (o.attributes = t);
                }
                if (t.childNodes.length) {
                  let e = [];
                  [].forEach.call(t.childNodes, (t) => {
                    s(t, e);
                  }),
                    e.length && (o.children = e);
                }
                e.push(o);
              };
              return [].forEach.call(e.body.childNodes, (t) => s(t, i)), i;
            }
          }
          return (
            (m.allowedAttributes = [
              "alt",
              "aria-controls",
              "aria-describedby",
              "aria-expanded",
              "aria-haspopup",
              "aria-hidden",
              "aria-label",
              "aria-labelledby",
              "aria-live",
              "aria-pressed",
              "aria-readonly",
              "aria-roledescription",
              "aria-selected",
              "class",
              "clip-path",
              "color",
              "colspan",
              "cx",
              "cy",
              "d",
              "dx",
              "dy",
              "disabled",
              "fill",
              "filterUnits",
              "flood-color",
              "flood-opacity",
              "height",
              "href",
              "id",
              "in",
              "in2",
              "markerHeight",
              "markerWidth",
              "offset",
              "opacity",
              "operator",
              "orient",
              "padding",
              "paddingLeft",
              "paddingRight",
              "patternUnits",
              "r",
              "radius",
              "refX",
              "refY",
              "role",
              "scope",
              "slope",
              "src",
              "startOffset",
              "stdDeviation",
              "stroke",
              "stroke-linecap",
              "stroke-width",
              "style",
              "tableValues",
              "result",
              "rowspan",
              "summary",
              "target",
              "tabindex",
              "text-align",
              "text-anchor",
              "textAnchor",
              "textLength",
              "title",
              "type",
              "valign",
              "width",
              "x",
              "x1",
              "x2",
              "xlink:href",
              "y",
              "y1",
              "y2",
              "zIndex",
            ]),
            (m.allowedReferences = [
              "https://",
              "http://",
              "mailto:",
              "/",
              "../",
              "./",
              "#",
            ]),
            (m.allowedTags = [
              "a",
              "abbr",
              "b",
              "br",
              "button",
              "caption",
              "circle",
              "clipPath",
              "code",
              "dd",
              "defs",
              "div",
              "dl",
              "dt",
              "em",
              "feComponentTransfer",
              "feComposite",
              "feDropShadow",
              "feFlood",
              "feFuncA",
              "feFuncB",
              "feFuncG",
              "feFuncR",
              "feGaussianBlur",
              "feMorphology",
              "feOffset",
              "feMerge",
              "feMergeNode",
              "filter",
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
              "hr",
              "i",
              "img",
              "li",
              "linearGradient",
              "marker",
              "ol",
              "p",
              "path",
              "pattern",
              "pre",
              "rect",
              "small",
              "span",
              "stop",
              "strong",
              "style",
              "sub",
              "sup",
              "svg",
              "table",
              "text",
              "textPath",
              "thead",
              "title",
              "tbody",
              "tspan",
              "td",
              "th",
              "tr",
              "u",
              "ul",
              "#text",
            ]),
            (m.emptyHTML = g),
            (m.bypassHTMLFiltering = !1),
            m
          );
        }
      ),
      i(
        e,
        "Core/Templating.js",
        [e["Core/Defaults.js"], e["Core/Utilities.js"]],
        function (t, e) {
          let { defaultOptions: i, defaultTime: s } = t,
            {
              extend: o,
              getNestedProperty: r,
              isArray: a,
              isNumber: n,
              isObject: l,
              pick: h,
              pInt: d,
            } = e,
            c = {
              add: (t, e) => t + e,
              divide: (t, e) => (0 !== e ? t / e : ""),
              eq: (t, e) => t == e,
              each: function (t) {
                let e = arguments[arguments.length - 1];
                return (
                  !!a(t) &&
                  t
                    .map((i, s) =>
                      p(
                        e.body,
                        o(l(i) ? i : { "@this": i }, {
                          "@index": s,
                          "@first": 0 === s,
                          "@last": s === t.length - 1,
                        })
                      )
                    )
                    .join("")
                );
              },
              ge: (t, e) => t >= e,
              gt: (t, e) => t > e,
              if: (t) => !!t,
              le: (t, e) => t <= e,
              lt: (t, e) => t < e,
              multiply: (t, e) => t * e,
              ne: (t, e) => t != e,
              subtract: (t, e) => t - e,
              unless: (t) => !t,
            };
          function p(t = "", e, o) {
            let a = /\{([\w\:\.\,;\-\/<>%@"'’= #\(\)]+)\}/g,
              n = /\(([\w\:\.\,;\-\/<>%@"'= ]+)\)/g,
              l = [],
              d = /f$/,
              g = /\.(\d)/,
              f = i.lang,
              m = (o && o.time) || s,
              x = (o && o.numberFormatter) || u,
              y = (t = "") => {
                let i;
                return (
                  "true" === t ||
                  ("false" !== t &&
                    ((i = Number(t)).toString() === t ? i : r(t, e)))
                );
              },
              b,
              v,
              S = 0,
              k;
            for (; null !== (b = a.exec(t)); ) {
              let i = n.exec(b[1]);
              i && ((b = i), (k = !0)),
                (v && v.isBlock) ||
                  (v = {
                    ctx: e,
                    expression: b[1],
                    find: b[0],
                    isBlock: "#" === b[1].charAt(0),
                    start: b.index,
                    startInner: b.index + b[0].length,
                    length: b[0].length,
                  });
              let s = b[1].split(" ")[0].replace("#", "");
              c[s] && (v.isBlock && s === v.fn && S++, v.fn || (v.fn = s));
              let o = "else" === b[1];
              if (v.isBlock && v.fn && (b[1] === `/${v.fn}` || o)) {
                if (S) !o && S--;
                else {
                  let e = v.startInner,
                    i = t.substr(e, b.index - e);
                  void 0 === v.body
                    ? ((v.body = i), (v.startInner = b.index + b[0].length))
                    : (v.elseBody = i),
                    (v.find += i + b[0]),
                    o || (l.push(v), (v = void 0));
                }
              } else v.isBlock || l.push(v);
              if (i && !v?.isBlock) break;
            }
            return (
              l.forEach((i) => {
                let s, r;
                let { body: a, elseBody: n, expression: l, fn: u } = i;
                if (u) {
                  let t = [i],
                    h = l.split(" ");
                  for (r = c[u].length; r--; ) t.unshift(y(h[r + 1]));
                  (s = c[u].apply(e, t)),
                    i.isBlock &&
                      "boolean" == typeof s &&
                      (s = p(s ? a : n, e, o));
                } else {
                  let t = l.split(":");
                  if (
                    ((s = y(t.shift() || "")), t.length && "number" == typeof s)
                  ) {
                    let e = t.join(":");
                    if (d.test(e)) {
                      let t = parseInt((e.match(g) || ["", "-1"])[1], 10);
                      null !== s &&
                        (s = x(
                          s,
                          t,
                          f.decimalPoint,
                          e.indexOf(",") > -1 ? f.thousandsSep : ""
                        ));
                    } else s = m.dateFormat(e, s);
                  }
                }
                t = t.replace(i.find, h(s, ""));
              }),
              k ? p(t, e, o) : t
            );
          }
          function u(t, e, s, o) {
            let r, a;
            (t = +t || 0), (e = +e);
            let l = i.lang,
              c = (t.toString().split(".")[1] || "").split("e")[0].length,
              p = t.toString().split("e"),
              u = e;
            -1 === e
              ? (e = Math.min(c, 20))
              : n(e)
              ? e &&
                p[1] &&
                p[1] < 0 &&
                ((a = e + +p[1]) >= 0
                  ? ((p[0] = (+p[0]).toExponential(a).split("e")[0]), (e = a))
                  : ((p[0] = p[0].split(".")[0] || 0),
                    (t = e < 20 ? (p[0] * Math.pow(10, p[1])).toFixed(e) : 0),
                    (p[1] = 0)))
              : (e = 2);
            let g = (
                Math.abs(p[1] ? p[0] : t) + Math.pow(10, -Math.max(e, c) - 1)
              ).toFixed(e),
              f = String(d(g)),
              m = f.length > 3 ? f.length % 3 : 0;
            return (
              (s = h(s, l.decimalPoint)),
              (o = h(o, l.thousandsSep)),
              (r = (t < 0 ? "-" : "") + (m ? f.substr(0, m) + o : "")),
              0 > +p[1] && !u
                ? (r = "0")
                : (r += f.substr(m).replace(/(\d{3})(?=\d)/g, "$1" + o)),
              e ? (r += s + g.slice(-e)) : 0 == +r && (r = "0"),
              p[1] && 0 != +r && (r += "e" + p[1]),
              r
            );
          }
          return {
            dateFormat: function (t, e, i) {
              return s.dateFormat(t, e, i);
            },
            format: p,
            helpers: c,
            numberFormat: u,
          };
        }
      ),
      i(
        e,
        "Core/Renderer/RendererRegistry.js",
        [e["Core/Globals.js"]],
        function (t) {
          var e, i;
          let s;
          return (
            ((i = e || (e = {})).rendererTypes = {}),
            (i.getRendererType = function (t = s) {
              return i.rendererTypes[t] || i.rendererTypes[s];
            }),
            (i.registerRendererType = function (e, o, r) {
              (i.rendererTypes[e] = o),
                (!s || r) && ((s = e), (t.Renderer = o));
            }),
            e
          );
        }
      ),
      i(
        e,
        "Core/Renderer/RendererUtilities.js",
        [e["Core/Utilities.js"]],
        function (t) {
          var e;
          let { clamp: i, pick: s, pushUnique: o, stableSort: r } = t;
          return (
            ((e || (e = {})).distribute = function t(e, a, n) {
              let l = e,
                h = l.reducedLen || a,
                d = (t, e) => t.target - e.target,
                c = [],
                p = e.length,
                u = [],
                g = c.push,
                f,
                m,
                x,
                y = !0,
                b,
                v,
                S = 0,
                k;
              for (f = p; f--; ) S += e[f].size;
              if (S > h) {
                for (
                  r(e, (t, e) => (e.rank || 0) - (t.rank || 0)),
                    x = (k = e[0].rank === e[e.length - 1].rank) ? p / 2 : -1,
                    m = k ? x : p - 1;
                  x && S > h;

                )
                  (b = e[(f = Math.floor(m))]),
                    o(u, f) && (S -= b.size),
                    (m += x),
                    k && m >= e.length && ((x /= 2), (m = x));
                u.sort((t, e) => e - t).forEach((t) =>
                  g.apply(c, e.splice(t, 1))
                );
              }
              for (
                r(e, d),
                  e = e.map((t) => ({
                    size: t.size,
                    targets: [t.target],
                    align: s(t.align, 0.5),
                  }));
                y;

              ) {
                for (f = e.length; f--; )
                  (b = e[f]),
                    (v =
                      (Math.min.apply(0, b.targets) +
                        Math.max.apply(0, b.targets)) /
                      2),
                    (b.pos = i(v - b.size * b.align, 0, a - b.size));
                for (f = e.length, y = !1; f--; )
                  f > 0 &&
                    e[f - 1].pos + e[f - 1].size > e[f].pos &&
                    ((e[f - 1].size += e[f].size),
                    (e[f - 1].targets = e[f - 1].targets.concat(e[f].targets)),
                    (e[f - 1].align = 0.5),
                    e[f - 1].pos + e[f - 1].size > a &&
                      (e[f - 1].pos = a - e[f - 1].size),
                    e.splice(f, 1),
                    (y = !0));
              }
              return (
                g.apply(l, c),
                (f = 0),
                e.some((e) => {
                  let i = 0;
                  return (e.targets || []).some(() =>
                    ((l[f].pos = e.pos + i),
                    void 0 !== n && Math.abs(l[f].pos - l[f].target) > n)
                      ? (l.slice(0, f + 1).forEach((t) => delete t.pos),
                        (l.reducedLen = (l.reducedLen || a) - 0.1 * a),
                        l.reducedLen > 0.1 * a && t(l, a, n),
                        !0)
                      : ((i += l[f].size), f++, !1)
                  );
                }),
                r(l, d),
                l
              );
            }),
            e
          );
        }
      ),
      i(
        e,
        "Core/Renderer/SVG/SVGElement.js",
        [
          e["Core/Animation/AnimationUtilities.js"],
          e["Core/Color/Color.js"],
          e["Core/Globals.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s) {
          let { animate: o, animObject: r, stop: a } = t,
            { deg2rad: n, doc: l, svg: h, SVG_NS: d, win: c } = i,
            {
              addEvent: p,
              attr: u,
              createElement: g,
              crisp: f,
              css: m,
              defined: x,
              erase: y,
              extend: b,
              fireEvent: v,
              isArray: S,
              isFunction: k,
              isObject: M,
              isString: C,
              merge: A,
              objectEach: w,
              pick: T,
              pInt: P,
              pushUnique: O,
              replaceNested: L,
              syncTimeout: D,
              uniqueKey: E,
            } = s;
          class B {
            _defaultGetter(t) {
              let e = T(
                this[t + "Value"],
                this[t],
                this.element ? this.element.getAttribute(t) : null,
                0
              );
              return /^-?[\d\.]+$/.test(e) && (e = parseFloat(e)), e;
            }
            _defaultSetter(t, e, i) {
              i.setAttribute(e, t);
            }
            add(t) {
              let e;
              let i = this.renderer,
                s = this.element;
              return (
                t && (this.parentGroup = t),
                void 0 !== this.textStr &&
                  "text" === this.element.nodeName &&
                  i.buildText(this),
                (this.added = !0),
                (!t || t.handleZ || this.zIndex) && (e = this.zIndexSetter()),
                e || (t ? t.element : i.box).appendChild(s),
                this.onAdd && this.onAdd(),
                this
              );
            }
            addClass(t, e) {
              let i = e ? "" : this.attr("class") || "";
              return (
                (t = (t || "")
                  .split(/ /g)
                  .reduce(
                    function (t, e) {
                      return -1 === i.indexOf(e) && t.push(e), t;
                    },
                    i ? [i] : []
                  )
                  .join(" ")) !== i && this.attr("class", t),
                this
              );
            }
            afterSetters() {
              this.doTransform &&
                (this.updateTransform(), (this.doTransform = !1));
            }
            align(t, e, i, s = !0) {
              let o, r, a, n;
              let l = {},
                h = this.renderer,
                d = h.alignedObjects,
                c = !!t;
              t
                ? ((this.alignOptions = t),
                  (this.alignByTranslate = e),
                  (this.alignTo = i))
                : ((t = this.alignOptions || {}),
                  (e = this.alignByTranslate),
                  (i = this.alignTo));
              let p = !i || C(i) ? i || "renderer" : void 0;
              p && (c && O(d, this), (i = void 0));
              let u = T(i, h[p], h),
                g = t.align,
                f = t.verticalAlign;
              return (
                (o = (u.x || 0) + (t.x || 0)),
                (r = (u.y || 0) + (t.y || 0)),
                "right" === g ? (a = 1) : "center" === g && (a = 2),
                a && (o += ((u.width || 0) - (t.width || 0)) / a),
                (l[e ? "translateX" : "x"] = Math.round(o)),
                "bottom" === f ? (n = 1) : "middle" === f && (n = 2),
                n && (r += ((u.height || 0) - (t.height || 0)) / n),
                (l[e ? "translateY" : "y"] = Math.round(r)),
                s &&
                  (this[this.placed ? "animate" : "attr"](l),
                  (this.placed = !0)),
                (this.alignAttr = l),
                this
              );
            }
            alignSetter(t) {
              let e = { left: "start", center: "middle", right: "end" };
              e[t] &&
                ((this.alignValue = t),
                this.element.setAttribute("text-anchor", e[t]));
            }
            animate(t, e, i) {
              let s = r(T(e, this.renderer.globalAnimation, !0)),
                a = s.defer;
              return (
                l.hidden && (s.duration = 0),
                0 !== s.duration
                  ? (i && (s.complete = i),
                    D(() => {
                      this.element && o(this, t, s);
                    }, a))
                  : (this.attr(t, void 0, i || s.complete),
                    w(
                      t,
                      function (t, e) {
                        s.step &&
                          s.step.call(this, t, { prop: e, pos: 1, elem: this });
                      },
                      this
                    )),
                this
              );
            }
            applyTextOutline(t) {
              let e = this.element;
              -1 !== t.indexOf("contrast") &&
                (t = t.replace(
                  /contrast/g,
                  this.renderer.getContrast(e.style.fill)
                ));
              let s = t.split(" "),
                o = s[s.length - 1],
                r = s[0];
              if (r && "none" !== r && i.svg) {
                (this.fakeTS = !0),
                  (r = r.replace(/(^[\d\.]+)(.*?)$/g, function (t, e, i) {
                    return 2 * Number(e) + i;
                  })),
                  this.removeTextOutline();
                let t = l.createElementNS(d, "tspan");
                u(t, {
                  class: "highcharts-text-outline",
                  fill: o,
                  stroke: o,
                  "stroke-width": r,
                  "stroke-linejoin": "round",
                });
                let i = e.querySelector("textPath") || e;
                [].forEach.call(i.childNodes, (e) => {
                  let i = e.cloneNode(!0);
                  i.removeAttribute &&
                    ["fill", "stroke", "stroke-width", "stroke"].forEach((t) =>
                      i.removeAttribute(t)
                    ),
                    t.appendChild(i);
                });
                let s = 0;
                [].forEach.call(i.querySelectorAll("text tspan"), (t) => {
                  s += Number(t.getAttribute("dy"));
                });
                let a = l.createElementNS(d, "tspan");
                (a.textContent = "​"),
                  u(a, { x: Number(e.getAttribute("x")), dy: -s }),
                  t.appendChild(a),
                  i.insertBefore(t, i.firstChild);
              }
            }
            attr(t, e, i, s) {
              let { element: o } = this,
                r = B.symbolCustomAttribs,
                n,
                l,
                h = this,
                d;
              return (
                "string" == typeof t &&
                  void 0 !== e &&
                  ((n = t), ((t = {})[n] = e)),
                "string" == typeof t
                  ? (h = (this[t + "Getter"] || this._defaultGetter).call(
                      this,
                      t,
                      o
                    ))
                  : (w(
                      t,
                      function (e, i) {
                        (d = !1),
                          s || a(this, i),
                          this.symbolName &&
                            -1 !== r.indexOf(i) &&
                            (l || (this.symbolAttr(t), (l = !0)), (d = !0)),
                          this.rotation &&
                            ("x" === i || "y" === i) &&
                            (this.doTransform = !0),
                          d ||
                            (this[i + "Setter"] || this._defaultSetter).call(
                              this,
                              e,
                              i,
                              o
                            );
                      },
                      this
                    ),
                    this.afterSetters()),
                i && i.call(this),
                h
              );
            }
            clip(t) {
              if (t && !t.clipPath) {
                let e = E() + "-",
                  i = this.renderer
                    .createElement("clipPath")
                    .attr({ id: e })
                    .add(this.renderer.defs);
                b(t, { clipPath: i, id: e, count: 0 }), t.add(i);
              }
              return this.attr(
                "clip-path",
                t ? `url(${this.renderer.url}#${t.id})` : "none"
              );
            }
            crisp(t, e) {
              e = Math.round(e || t.strokeWidth || 0);
              let i = t.x || this.x || 0,
                s = t.y || this.y || 0,
                o = (t.width || this.width || 0) + i,
                r = (t.height || this.height || 0) + s,
                a = f(i, e),
                n = f(s, e);
              return (
                b(t, { x: a, y: n, width: f(o, e) - a, height: f(r, e) - n }),
                x(t.strokeWidth) && (t.strokeWidth = e),
                t
              );
            }
            complexColor(t, i, s) {
              let o = this.renderer,
                r,
                a,
                n,
                l,
                h,
                d,
                c,
                p,
                u,
                g,
                f = [],
                m;
              v(
                this.renderer,
                "complexColor",
                { args: arguments },
                function () {
                  if (
                    (t.radialGradient
                      ? (a = "radialGradient")
                      : t.linearGradient && (a = "linearGradient"),
                    a)
                  ) {
                    if (
                      ((n = t[a]),
                      (h = o.gradients),
                      (d = t.stops),
                      (u = s.radialReference),
                      S(n) &&
                        (t[a] = n =
                          {
                            x1: n[0],
                            y1: n[1],
                            x2: n[2],
                            y2: n[3],
                            gradientUnits: "userSpaceOnUse",
                          }),
                      "radialGradient" === a &&
                        u &&
                        !x(n.gradientUnits) &&
                        ((l = n),
                        (n = A(n, o.getRadialAttr(u, l), {
                          gradientUnits: "userSpaceOnUse",
                        }))),
                      w(n, function (t, e) {
                        "id" !== e && f.push(e, t);
                      }),
                      w(d, function (t) {
                        f.push(t);
                      }),
                      h[(f = f.join(","))])
                    )
                      g = h[f].attr("id");
                    else {
                      n.id = g = E();
                      let t = (h[f] = o.createElement(a).attr(n).add(o.defs));
                      (t.radAttr = l),
                        (t.stops = []),
                        d.forEach(function (i) {
                          0 === i[1].indexOf("rgba")
                            ? ((c = (r = e.parse(i[1])).get("rgb")),
                              (p = r.get("a")))
                            : ((c = i[1]), (p = 1));
                          let s = o
                            .createElement("stop")
                            .attr({
                              offset: i[0],
                              "stop-color": c,
                              "stop-opacity": p,
                            })
                            .add(t);
                          t.stops.push(s);
                        });
                    }
                    (m = "url(" + o.url + "#" + g + ")"),
                      s.setAttribute(i, m),
                      (s.gradient = f),
                      (t.toString = function () {
                        return m;
                      });
                  }
                }
              );
            }
            css(t) {
              let e = this.styles,
                i = {},
                s = this.element,
                o,
                r = !e;
              if (
                (e &&
                  w(t, function (t, s) {
                    e && e[s] !== t && ((i[s] = t), (r = !0));
                  }),
                r)
              ) {
                e && (t = b(e, i)),
                  null === t.width || "auto" === t.width
                    ? delete this.textWidth
                    : "text" === s.nodeName.toLowerCase() &&
                      t.width &&
                      (o = this.textWidth = P(t.width)),
                  b(this.styles, t),
                  o && !h && this.renderer.forExport && delete t.width;
                let r = A(t);
                s.namespaceURI === this.SVG_NS &&
                  (["textOutline", "textOverflow", "width"].forEach(
                    (t) => r && delete r[t]
                  ),
                  r.color && (r.fill = r.color)),
                  m(s, r);
              }
              return (
                this.added &&
                  ("text" === this.element.nodeName &&
                    this.renderer.buildText(this),
                  t.textOutline && this.applyTextOutline(t.textOutline)),
                this
              );
            }
            dashstyleSetter(t) {
              let e,
                i = this["stroke-width"];
              if (("inherit" === i && (i = 1), (t = t && t.toLowerCase()))) {
                let s = t
                  .replace("shortdashdotdot", "3,1,1,1,1,1,")
                  .replace("shortdashdot", "3,1,1,1")
                  .replace("shortdot", "1,1,")
                  .replace("shortdash", "3,1,")
                  .replace("longdash", "8,3,")
                  .replace(/dot/g, "1,3,")
                  .replace("dash", "4,3,")
                  .replace(/,$/, "")
                  .split(",");
                for (e = s.length; e--; ) s[e] = "" + P(s[e]) * T(i, NaN);
                (t = s.join(",").replace(/NaN/g, "none")),
                  this.element.setAttribute("stroke-dasharray", t);
              }
            }
            destroy() {
              let t = this,
                e = t.element || {},
                i = t.renderer,
                s = e.ownerSVGElement,
                o = ("SPAN" === e.nodeName && t.parentGroup) || void 0,
                r,
                n;
              if (
                ((e.onclick =
                  e.onmouseout =
                  e.onmouseover =
                  e.onmousemove =
                  e.point =
                    null),
                a(t),
                t.clipPath && s)
              ) {
                let e = t.clipPath;
                [].forEach.call(
                  s.querySelectorAll("[clip-path],[CLIP-PATH]"),
                  function (t) {
                    t.getAttribute("clip-path").indexOf(e.element.id) > -1 &&
                      t.removeAttribute("clip-path");
                  }
                ),
                  (t.clipPath = e.destroy());
              }
              if (((t.connector = t.connector?.destroy()), t.stops)) {
                for (n = 0; n < t.stops.length; n++) t.stops[n].destroy();
                (t.stops.length = 0), (t.stops = void 0);
              }
              for (
                t.safeRemoveChild(e);
                o && o.div && 0 === o.div.childNodes.length;

              )
                (r = o.parentGroup),
                  t.safeRemoveChild(o.div),
                  delete o.div,
                  (o = r);
              t.alignOptions && y(i.alignedObjects, t),
                w(t, function (e, i) {
                  t[i] &&
                    t[i].parentGroup === t &&
                    t[i].destroy &&
                    t[i].destroy(),
                    delete t[i];
                });
            }
            dSetter(t, e, i) {
              S(t) &&
                ("string" == typeof t[0] &&
                  (t = this.renderer.pathToSegments(t)),
                (this.pathArray = t),
                (t = t.reduce(
                  (t, e, i) =>
                    e && e.join
                      ? (i ? t + " " : "") + e.join(" ")
                      : (e || "").toString(),
                  ""
                ))),
                /(NaN| {2}|^$)/.test(t) && (t = "M 0 0"),
                this[e] !== t && (i.setAttribute(e, t), (this[e] = t));
            }
            fillSetter(t, e, i) {
              "string" == typeof t
                ? i.setAttribute(e, t)
                : t && this.complexColor(t, e, i);
            }
            hrefSetter(t, e, i) {
              i.setAttributeNS("http://www.w3.org/1999/xlink", e, t);
            }
            getBBox(t, e) {
              let i, s, o, r;
              let {
                  alignValue: a,
                  element: n,
                  renderer: l,
                  styles: h,
                  textStr: d,
                } = this,
                { cache: c, cacheKeys: p } = l,
                u = n.namespaceURI === this.SVG_NS,
                g = T(e, this.rotation, 0),
                f = l.styledMode
                  ? n && B.prototype.getStyle.call(n, "font-size")
                  : h.fontSize;
              if (
                (x(d) &&
                  (-1 === (r = d.toString()).indexOf("<") &&
                    (r = r.replace(/\d/g, "0")),
                  (r += [
                    "",
                    l.rootFontSize,
                    f,
                    g,
                    this.textWidth,
                    a,
                    h.textOverflow,
                    h.fontWeight,
                  ].join(","))),
                r && !t && (i = c[r]),
                !i || i.polygon)
              ) {
                if (u || l.forExport) {
                  try {
                    (o =
                      this.fakeTS &&
                      function (t) {
                        let e = n.querySelector(".highcharts-text-outline");
                        e && m(e, { display: t });
                      }),
                      k(o) && o("none"),
                      (i = n.getBBox
                        ? b({}, n.getBBox())
                        : {
                            width: n.offsetWidth,
                            height: n.offsetHeight,
                            x: 0,
                            y: 0,
                          }),
                      k(o) && o("");
                  } catch (t) {}
                  (!i || i.width < 0) &&
                    (i = { x: 0, y: 0, width: 0, height: 0 });
                } else i = this.htmlGetBBox();
                (s = i.height),
                  u &&
                    (i.height = s =
                      { "11px,17": 14, "13px,20": 16 }[
                        `${f || ""},${Math.round(s)}`
                      ] || s),
                  g && (i = this.getRotatedBox(i, g));
                let t = { bBox: i };
                v(this, "afterGetBBox", t), (i = t.bBox);
              }
              if (r && ("" === d || i.height > 0)) {
                for (; p.length > 250; ) delete c[p.shift()];
                c[r] || p.push(r), (c[r] = i);
              }
              return i;
            }
            getRotatedBox(t, e) {
              let { x: i, y: s, width: o, height: r } = t,
                {
                  alignValue: a,
                  translateY: l,
                  rotationOriginX: h = 0,
                  rotationOriginY: d = 0,
                } = this,
                c = { right: 1, center: 0.5 }[a || 0] || 0,
                p = Number(this.element.getAttribute("y") || 0) - (l ? 0 : s),
                u = e * n,
                g = (e - 90) * n,
                f = Math.cos(u),
                m = Math.sin(u),
                x = o * f,
                y = o * m,
                b = Math.cos(g),
                v = Math.sin(g),
                [[S, k], [M, C]] = [h, d].map((t) => [t - t * f, t * m]),
                A = i + c * (o - x) + S + C + p * b,
                w = A + x,
                T = w - r * b,
                P = T - x,
                O = s + p - c * y - k + M + p * v,
                L = O + y,
                D = L - r * v,
                E = D - y,
                B = Math.min(A, w, T, P),
                j = Math.min(O, L, D, E),
                R = Math.max(A, w, T, P) - B,
                I = Math.max(O, L, D, E) - j;
              return {
                x: B,
                y: j,
                width: R,
                height: I,
                polygon: [
                  [A, O],
                  [w, L],
                  [T, D],
                  [P, E],
                ],
              };
            }
            getStyle(t) {
              return c
                .getComputedStyle(this.element || this, "")
                .getPropertyValue(t);
            }
            hasClass(t) {
              return -1 !== ("" + this.attr("class")).split(" ").indexOf(t);
            }
            hide() {
              return this.attr({ visibility: "hidden" });
            }
            htmlGetBBox() {
              return { height: 0, width: 0, x: 0, y: 0 };
            }
            constructor(t, e) {
              (this.onEvents = {}),
                (this.opacity = 1),
                (this.SVG_NS = d),
                (this.element =
                  "span" === e || "body" === e
                    ? g(e)
                    : l.createElementNS(this.SVG_NS, e)),
                (this.renderer = t),
                (this.styles = {}),
                v(this, "afterInit");
            }
            on(t, e) {
              let { onEvents: i } = this;
              return i[t] && i[t](), (i[t] = p(this.element, t, e)), this;
            }
            opacitySetter(t, e, i) {
              let s = Number(Number(t).toFixed(3));
              (this.opacity = s), i.setAttribute(e, s);
            }
            reAlign() {
              this.alignOptions?.width &&
                "left" !== this.alignOptions.align &&
                ((this.alignOptions.width = this.getBBox().width),
                (this.placed = !1),
                this.align());
            }
            removeClass(t) {
              return this.attr(
                "class",
                ("" + this.attr("class"))
                  .replace(C(t) ? RegExp(`(^| )${t}( |$)`) : t, " ")
                  .replace(/ +/g, " ")
                  .trim()
              );
            }
            removeTextOutline() {
              let t = this.element.querySelector(
                "tspan.highcharts-text-outline"
              );
              t && this.safeRemoveChild(t);
            }
            safeRemoveChild(t) {
              let e = t.parentNode;
              e && e.removeChild(t);
            }
            setRadialReference(t) {
              let e =
                this.element.gradient &&
                this.renderer.gradients[this.element.gradient];
              return (
                (this.element.radialReference = t),
                e &&
                  e.radAttr &&
                  e.animate(this.renderer.getRadialAttr(t, e.radAttr)),
                this
              );
            }
            shadow(t) {
              let { renderer: e } = this,
                i = A(
                  this.parentGroup?.rotation === 90
                    ? { offsetX: -1, offsetY: -1 }
                    : {},
                  M(t) ? t : {}
                ),
                s = e.shadowDefinition(i);
              return this.attr({ filter: t ? `url(${e.url}#${s})` : "none" });
            }
            show(t = !0) {
              return this.attr({ visibility: t ? "inherit" : "visible" });
            }
            "stroke-widthSetter"(t, e, i) {
              (this[e] = t), i.setAttribute(e, t);
            }
            strokeWidth() {
              if (!this.renderer.styledMode) return this["stroke-width"] || 0;
              let t = this.getStyle("stroke-width"),
                e = 0,
                i;
              return (
                /px$/.test(t)
                  ? (e = P(t))
                  : "" !== t &&
                    (u((i = l.createElementNS(d, "rect")), {
                      width: t,
                      "stroke-width": 0,
                    }),
                    this.element.parentNode.appendChild(i),
                    (e = i.getBBox().width),
                    i.parentNode.removeChild(i)),
                e
              );
            }
            symbolAttr(t) {
              let e = this;
              B.symbolCustomAttribs.forEach(function (i) {
                e[i] = T(t[i], e[i]);
              }),
                e.attr({
                  d: e.renderer.symbols[e.symbolName](
                    e.x,
                    e.y,
                    e.width,
                    e.height,
                    e
                  ),
                });
            }
            textSetter(t) {
              t !== this.textStr &&
                (delete this.textPxLength,
                (this.textStr = t),
                this.added && this.renderer.buildText(this),
                this.reAlign());
            }
            titleSetter(t) {
              let e = this.element,
                i =
                  e.getElementsByTagName("title")[0] ||
                  l.createElementNS(this.SVG_NS, "title");
              e.insertBefore
                ? e.insertBefore(i, e.firstChild)
                : e.appendChild(i),
                (i.textContent = L(T(t, ""), [/<[^>]*>/g, ""])
                  .replace(/&lt;/g, "<")
                  .replace(/&gt;/g, ">"));
            }
            toFront() {
              let t = this.element;
              return t.parentNode.appendChild(t), this;
            }
            translate(t, e) {
              return this.attr({ translateX: t, translateY: e });
            }
            updateTransform(t = "transform") {
              let {
                  element: e,
                  matrix: i,
                  rotation: s = 0,
                  rotationOriginX: o,
                  rotationOriginY: r,
                  scaleX: a,
                  scaleY: n,
                  translateX: l = 0,
                  translateY: h = 0,
                } = this,
                d = ["translate(" + l + "," + h + ")"];
              x(i) && d.push("matrix(" + i.join(",") + ")"),
                s &&
                  (d.push(
                    "rotate(" +
                      s +
                      " " +
                      T(o, e.getAttribute("x"), 0) +
                      " " +
                      T(r, e.getAttribute("y") || 0) +
                      ")"
                  ),
                  this.text?.element.tagName === "SPAN" &&
                    this.text.attr({
                      rotation: s,
                      rotationOriginX: (o || 0) - this.padding,
                      rotationOriginY: (r || 0) - this.padding,
                    })),
                (x(a) || x(n)) &&
                  d.push("scale(" + T(a, 1) + " " + T(n, 1) + ")"),
                d.length &&
                  !(this.text || this).textPath &&
                  e.setAttribute(t, d.join(" "));
            }
            visibilitySetter(t, e, i) {
              "inherit" === t
                ? i.removeAttribute(e)
                : this[e] !== t && i.setAttribute(e, t),
                (this[e] = t);
            }
            xGetter(t) {
              return (
                "circle" === this.element.nodeName &&
                  ("x" === t ? (t = "cx") : "y" === t && (t = "cy")),
                this._defaultGetter(t)
              );
            }
            zIndexSetter(t, e) {
              let i = this.renderer,
                s = this.parentGroup,
                o = (s || i).element || i.box,
                r = this.element,
                a = o === i.box,
                n,
                l,
                h,
                d = !1,
                c,
                p = this.added,
                u;
              if (
                (x(t)
                  ? (r.setAttribute("data-z-index", t),
                    (t = +t),
                    this[e] === t && (p = !1))
                  : x(this[e]) && r.removeAttribute("data-z-index"),
                (this[e] = t),
                p)
              ) {
                for (
                  (t = this.zIndex) && s && (s.handleZ = !0),
                    u = (n = o.childNodes).length - 1;
                  u >= 0 && !d;
                  u--
                )
                  (c = !x((h = (l = n[u]).getAttribute("data-z-index")))),
                    l !== r &&
                      (t < 0 && c && !a && !u
                        ? (o.insertBefore(r, n[u]), (d = !0))
                        : (P(h) <= t || (c && (!x(t) || t >= 0))) &&
                          (o.insertBefore(r, n[u + 1]), (d = !0)));
                d || (o.insertBefore(r, n[a ? 3 : 0]), (d = !0));
              }
              return d;
            }
          }
          return (
            (B.symbolCustomAttribs = [
              "anchorX",
              "anchorY",
              "clockwise",
              "end",
              "height",
              "innerR",
              "r",
              "start",
              "width",
              "x",
              "y",
            ]),
            (B.prototype.strokeSetter = B.prototype.fillSetter),
            (B.prototype.yGetter = B.prototype.xGetter),
            (B.prototype.matrixSetter =
              B.prototype.rotationOriginXSetter =
              B.prototype.rotationOriginYSetter =
              B.prototype.rotationSetter =
              B.prototype.scaleXSetter =
              B.prototype.scaleYSetter =
              B.prototype.translateXSetter =
              B.prototype.translateYSetter =
              B.prototype.verticalAlignSetter =
                function (t, e) {
                  (this[e] = t), (this.doTransform = !0);
                }),
            B
          );
        }
      ),
      i(
        e,
        "Core/Renderer/SVG/SVGLabel.js",
        [e["Core/Renderer/SVG/SVGElement.js"], e["Core/Utilities.js"]],
        function (t, e) {
          let {
            defined: i,
            extend: s,
            isNumber: o,
            merge: r,
            pick: a,
            removeEvent: n,
          } = e;
          class l extends t {
            constructor(t, e, i, s, o, r, a, n, h, d) {
              let c;
              super(t, "g"),
                (this.paddingLeftSetter = this.paddingSetter),
                (this.paddingRightSetter = this.paddingSetter),
                (this.doUpdate = !1),
                (this.textStr = e),
                (this.x = i),
                (this.y = s),
                (this.anchorX = r),
                (this.anchorY = a),
                (this.baseline = h),
                (this.className = d),
                this.addClass(
                  "button" === d ? "highcharts-no-tooltip" : "highcharts-label"
                ),
                d && this.addClass("highcharts-" + d),
                (this.text = t.text(void 0, 0, 0, n).attr({ zIndex: 1 })),
                "string" == typeof o &&
                  ((c = /^url\((.*?)\)$/.test(o)) ||
                    this.renderer.symbols[o]) &&
                  (this.symbolKey = o),
                (this.bBox = l.emptyBBox),
                (this.padding = 3),
                (this.baselineOffset = 0),
                (this.needsBox = t.styledMode || c),
                (this.deferredAttr = {}),
                (this.alignFactor = 0);
            }
            alignSetter(t) {
              let e = { left: 0, center: 0.5, right: 1 }[t];
              e !== this.alignFactor &&
                ((this.alignFactor = e),
                this.bBox &&
                  o(this.xSetting) &&
                  this.attr({ x: this.xSetting }));
            }
            anchorXSetter(t, e) {
              (this.anchorX = t),
                this.boxAttr(
                  e,
                  Math.round(t) - this.getCrispAdjust() - this.xSetting
                );
            }
            anchorYSetter(t, e) {
              (this.anchorY = t), this.boxAttr(e, t - this.ySetting);
            }
            boxAttr(t, e) {
              this.box ? this.box.attr(t, e) : (this.deferredAttr[t] = e);
            }
            css(e) {
              if (e) {
                let t = {};
                (e = r(e)),
                  l.textProps.forEach((i) => {
                    void 0 !== e[i] && ((t[i] = e[i]), delete e[i]);
                  }),
                  this.text.css(t),
                  "fontSize" in t || "fontWeight" in t
                    ? this.updateTextPadding()
                    : ("width" in t || "textOverflow" in t) &&
                      this.updateBoxSize();
              }
              return t.prototype.css.call(this, e);
            }
            destroy() {
              n(this.element, "mouseenter"),
                n(this.element, "mouseleave"),
                this.text && this.text.destroy(),
                this.box && (this.box = this.box.destroy()),
                t.prototype.destroy.call(this);
            }
            fillSetter(t, e) {
              t && (this.needsBox = !0), (this.fill = t), this.boxAttr(e, t);
            }
            getBBox(t, e) {
              this.textStr &&
                0 === this.bBox.width &&
                0 === this.bBox.height &&
                this.updateBoxSize();
              let {
                  padding: i,
                  height: s = 0,
                  translateX: o = 0,
                  translateY: r = 0,
                  width: n = 0,
                } = this,
                l = a(this.paddingLeft, i),
                h = e ?? (this.rotation || 0),
                d = {
                  width: n,
                  height: s,
                  x: o + this.bBox.x - l,
                  y: r + this.bBox.y - i + this.baselineOffset,
                };
              return h && (d = this.getRotatedBox(d, h)), d;
            }
            getCrispAdjust() {
              return (
                ((this.renderer.styledMode && this.box
                  ? this.box.strokeWidth()
                  : this["stroke-width"]
                  ? parseInt(this["stroke-width"], 10)
                  : 0) %
                  2) /
                2
              );
            }
            heightSetter(t) {
              (this.heightSetting = t), (this.doUpdate = !0);
            }
            afterSetters() {
              super.afterSetters(),
                this.doUpdate && (this.updateBoxSize(), (this.doUpdate = !1));
            }
            onAdd() {
              this.text.add(this),
                this.attr({
                  text: a(this.textStr, ""),
                  x: this.x || 0,
                  y: this.y || 0,
                }),
                this.box &&
                  i(this.anchorX) &&
                  this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
            }
            paddingSetter(t, e) {
              o(t)
                ? t !== this[e] && ((this[e] = t), this.updateTextPadding())
                : (this[e] = void 0);
            }
            rSetter(t, e) {
              this.boxAttr(e, t);
            }
            strokeSetter(t, e) {
              (this.stroke = t), this.boxAttr(e, t);
            }
            "stroke-widthSetter"(t, e) {
              t && (this.needsBox = !0),
                (this["stroke-width"] = t),
                this.boxAttr(e, t);
            }
            "text-alignSetter"(t) {
              this.textAlign = t;
            }
            textSetter(t) {
              void 0 !== t && this.text.attr({ text: t }),
                this.updateTextPadding(),
                this.reAlign();
            }
            updateBoxSize() {
              let t;
              let e = this.text,
                r = {},
                a = this.padding,
                n = (this.bBox =
                  (!o(this.widthSetting) ||
                    !o(this.heightSetting) ||
                    this.textAlign) &&
                  i(e.textStr)
                    ? e.getBBox(void 0, 0)
                    : l.emptyBBox);
              (this.width = this.getPaddedWidth()),
                (this.height = (this.heightSetting || n.height || 0) + 2 * a);
              let h = this.renderer.fontMetrics(e);
              if (
                ((this.baselineOffset =
                  a +
                  Math.min(
                    (this.text.firstLineMetrics || h).b,
                    n.height || 1 / 0
                  )),
                this.heightSetting &&
                  (this.baselineOffset += (this.heightSetting - h.h) / 2),
                this.needsBox && !e.textPath)
              ) {
                if (!this.box) {
                  let t = (this.box = this.symbolKey
                    ? this.renderer.symbol(this.symbolKey)
                    : this.renderer.rect());
                  t.addClass(
                    ("button" === this.className
                      ? ""
                      : "highcharts-label-box") +
                      (this.className
                        ? " highcharts-" + this.className + "-box"
                        : "")
                  ),
                    t.add(this);
                }
                (t = this.getCrispAdjust()),
                  (r.x = t),
                  (r.y = (this.baseline ? -this.baselineOffset : 0) + t),
                  (r.width = Math.round(this.width)),
                  (r.height = Math.round(this.height)),
                  this.box.attr(s(r, this.deferredAttr)),
                  (this.deferredAttr = {});
              }
            }
            updateTextPadding() {
              let t = this.text;
              if (!t.textPath) {
                this.updateBoxSize();
                let e = this.baseline ? 0 : this.baselineOffset,
                  s = a(this.paddingLeft, this.padding);
                i(this.widthSetting) &&
                  this.bBox &&
                  ("center" === this.textAlign || "right" === this.textAlign) &&
                  (s +=
                    { center: 0.5, right: 1 }[this.textAlign] *
                    (this.widthSetting - this.bBox.width)),
                  (s !== t.x || e !== t.y) &&
                    (t.attr("x", s),
                    t.hasBoxWidthChanged && (this.bBox = t.getBBox(!0)),
                    void 0 !== e && t.attr("y", e)),
                  (t.x = s),
                  (t.y = e);
              }
            }
            widthSetter(t) {
              (this.widthSetting = o(t) ? t : void 0), (this.doUpdate = !0);
            }
            getPaddedWidth() {
              let t = this.padding,
                e = a(this.paddingLeft, t),
                i = a(this.paddingRight, t);
              return (this.widthSetting || this.bBox.width || 0) + e + i;
            }
            xSetter(t) {
              (this.x = t),
                this.alignFactor &&
                  ((t -= this.alignFactor * this.getPaddedWidth()),
                  (this["forceAnimate:x"] = !0)),
                (this.xSetting = Math.round(t)),
                this.attr("translateX", this.xSetting);
            }
            ySetter(t) {
              (this.ySetting = this.y = Math.round(t)),
                this.attr("translateY", this.ySetting);
            }
          }
          return (
            (l.emptyBBox = { width: 0, height: 0, x: 0, y: 0 }),
            (l.textProps = [
              "color",
              "direction",
              "fontFamily",
              "fontSize",
              "fontStyle",
              "fontWeight",
              "lineHeight",
              "textAlign",
              "textDecoration",
              "textOutline",
              "textOverflow",
              "whiteSpace",
              "width",
            ]),
            l
          );
        }
      ),
      i(
        e,
        "Core/Renderer/SVG/Symbols.js",
        [e["Core/Utilities.js"]],
        function (t) {
          let { defined: e, isNumber: i, pick: s } = t;
          function o(t, i, o, r, a) {
            let n = [];
            if (a) {
              let l = a.start || 0,
                h = s(a.r, o),
                d = s(a.r, r || o),
                c = 2e-4 / (a.borderRadius ? 1 : Math.max(h, 1)),
                p = Math.abs((a.end || 0) - l - 2 * Math.PI) < c,
                u = (a.end || 0) - (p ? c : 0),
                g = a.innerR,
                f = s(a.open, p),
                m = Math.cos(l),
                x = Math.sin(l),
                y = Math.cos(u),
                b = Math.sin(u),
                v = s(a.longArc, u - l - Math.PI < c ? 0 : 1),
                S = ["A", h, d, 0, v, s(a.clockwise, 1), t + h * y, i + d * b];
              (S.params = { start: l, end: u, cx: t, cy: i }),
                n.push(["M", t + h * m, i + d * x], S),
                e(g) &&
                  (((S = [
                    "A",
                    g,
                    g,
                    0,
                    v,
                    e(a.clockwise) ? 1 - a.clockwise : 0,
                    t + g * m,
                    i + g * x,
                  ]).params = { start: u, end: l, cx: t, cy: i }),
                  n.push(
                    f
                      ? ["M", t + g * y, i + g * b]
                      : ["L", t + g * y, i + g * b],
                    S
                  )),
                f || n.push(["Z"]);
            }
            return n;
          }
          function r(t, e, i, s, o) {
            return o && o.r
              ? a(t, e, i, s, o)
              : [
                  ["M", t, e],
                  ["L", t + i, e],
                  ["L", t + i, e + s],
                  ["L", t, e + s],
                  ["Z"],
                ];
          }
          function a(t, e, i, s, o) {
            let r = o?.r || 0;
            return [
              ["M", t + r, e],
              ["L", t + i - r, e],
              ["A", r, r, 0, 0, 1, t + i, e + r],
              ["L", t + i, e + s - r],
              ["A", r, r, 0, 0, 1, t + i - r, e + s],
              ["L", t + r, e + s],
              ["A", r, r, 0, 0, 1, t, e + s - r],
              ["L", t, e + r],
              ["A", r, r, 0, 0, 1, t + r, e],
              ["Z"],
            ];
          }
          return {
            arc: o,
            callout: function (t, e, s, o, r) {
              let n = Math.min((r && r.r) || 0, s, o),
                l = n + 6,
                h = r && r.anchorX,
                d = (r && r.anchorY) || 0,
                c = a(t, e, s, o, { r: n });
              if (!i(h) || (h < s && h > 0 && d < o && d > 0)) return c;
              if (t + h > s - l) {
                if (d > e + l && d < e + o - l)
                  c.splice(
                    3,
                    1,
                    ["L", t + s, d - 6],
                    ["L", t + s + 6, d],
                    ["L", t + s, d + 6],
                    ["L", t + s, e + o - n]
                  );
                else if (h < s) {
                  let i = d < e + l,
                    r = i ? e : e + o;
                  c.splice(i ? 2 : 5, 0, ["L", h, d], ["L", t + s - n, r]);
                } else
                  c.splice(
                    3,
                    1,
                    ["L", t + s, o / 2],
                    ["L", h, d],
                    ["L", t + s, o / 2],
                    ["L", t + s, e + o - n]
                  );
              } else if (t + h < l) {
                if (d > e + l && d < e + o - l)
                  c.splice(
                    7,
                    1,
                    ["L", t, d + 6],
                    ["L", t - 6, d],
                    ["L", t, d - 6],
                    ["L", t, e + n]
                  );
                else if (h > 0) {
                  let i = d < e + l,
                    s = i ? e : e + o;
                  c.splice(i ? 1 : 6, 0, ["L", h, d], ["L", t + n, s]);
                } else
                  c.splice(
                    7,
                    1,
                    ["L", t, o / 2],
                    ["L", h, d],
                    ["L", t, o / 2],
                    ["L", t, e + n]
                  );
              } else
                d > o && h < s - l
                  ? c.splice(
                      5,
                      1,
                      ["L", h + 6, e + o],
                      ["L", h, e + o + 6],
                      ["L", h - 6, e + o],
                      ["L", t + n, e + o]
                    )
                  : d < 0 &&
                    h > l &&
                    c.splice(
                      1,
                      1,
                      ["L", h - 6, e],
                      ["L", h, e - 6],
                      ["L", h + 6, e],
                      ["L", s - n, e]
                    );
              return c;
            },
            circle: function (t, e, i, s) {
              return o(t + i / 2, e + s / 2, i / 2, s / 2, {
                start: 0.5 * Math.PI,
                end: 2.5 * Math.PI,
                open: !1,
              });
            },
            diamond: function (t, e, i, s) {
              return [
                ["M", t + i / 2, e],
                ["L", t + i, e + s / 2],
                ["L", t + i / 2, e + s],
                ["L", t, e + s / 2],
                ["Z"],
              ];
            },
            rect: r,
            roundedRect: a,
            square: r,
            triangle: function (t, e, i, s) {
              return [
                ["M", t + i / 2, e],
                ["L", t + i, e + s],
                ["L", t, e + s],
                ["Z"],
              ];
            },
            "triangle-down": function (t, e, i, s) {
              return [
                ["M", t, e],
                ["L", t + i, e],
                ["L", t + i / 2, e + s],
                ["Z"],
              ];
            },
          };
        }
      ),
      i(
        e,
        "Core/Renderer/SVG/TextBuilder.js",
        [
          e["Core/Renderer/HTML/AST.js"],
          e["Core/Globals.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i) {
          let { doc: s, SVG_NS: o, win: r } = e,
            {
              attr: a,
              extend: n,
              fireEvent: l,
              isString: h,
              objectEach: d,
              pick: c,
            } = i;
          return class {
            constructor(t) {
              let e = t.styles;
              (this.renderer = t.renderer),
                (this.svgElement = t),
                (this.width = t.textWidth),
                (this.textLineHeight = e && e.lineHeight),
                (this.textOutline = e && e.textOutline),
                (this.ellipsis = !!(e && "ellipsis" === e.textOverflow)),
                (this.noWrap = !!(e && "nowrap" === e.whiteSpace));
            }
            buildSVG() {
              let e = this.svgElement,
                i = e.element,
                o = e.renderer,
                r = c(e.textStr, "").toString(),
                a = -1 !== r.indexOf("<"),
                n = i.childNodes,
                l = !e.added && o.box,
                d = [
                  r,
                  this.ellipsis,
                  this.noWrap,
                  this.textLineHeight,
                  this.textOutline,
                  e.getStyle("font-size"),
                  this.width,
                ].join(",");
              if (d !== e.textCache) {
                (e.textCache = d), delete e.actualWidth;
                for (let t = n.length; t--; ) i.removeChild(n[t]);
                if (
                  a ||
                  this.ellipsis ||
                  this.width ||
                  e.textPath ||
                  (-1 !== r.indexOf(" ") &&
                    (!this.noWrap || /<br.*?>/g.test(r)))
                ) {
                  if ("" !== r) {
                    l && l.appendChild(i);
                    let s = new t(r);
                    this.modifyTree(s.nodes),
                      s.addToDOM(i),
                      this.modifyDOM(),
                      this.ellipsis &&
                        -1 !== (i.textContent || "").indexOf("…") &&
                        e.attr(
                          "title",
                          this.unescapeEntities(e.textStr || "", [
                            "&lt;",
                            "&gt;",
                          ])
                        ),
                      l && l.removeChild(i);
                  }
                } else
                  i.appendChild(s.createTextNode(this.unescapeEntities(r)));
                h(this.textOutline) &&
                  e.applyTextOutline &&
                  e.applyTextOutline(this.textOutline);
              }
            }
            modifyDOM() {
              let t;
              let e = this.svgElement,
                i = a(e.element, "x");
              for (e.firstLineMetrics = void 0; (t = e.element.firstChild); )
                if (/^[\s\u200B]*$/.test(t.textContent || " "))
                  e.element.removeChild(t);
                else break;
              [].forEach.call(
                e.element.querySelectorAll("tspan.highcharts-br"),
                (t, s) => {
                  t.nextSibling &&
                    t.previousSibling &&
                    (0 === s &&
                      1 === t.previousSibling.nodeType &&
                      (e.firstLineMetrics = e.renderer.fontMetrics(
                        t.previousSibling
                      )),
                    a(t, { dy: this.getLineHeight(t.nextSibling), x: i }));
                }
              );
              let n = this.width || 0;
              if (!n) return;
              let l = (t, r) => {
                  let l = t.textContent || "",
                    h = l.replace(/([^\^])-/g, "$1- ").split(" "),
                    d =
                      !this.noWrap &&
                      (h.length > 1 || e.element.childNodes.length > 1),
                    c = this.getLineHeight(r),
                    p = 0,
                    u = e.actualWidth;
                  if (this.ellipsis)
                    l &&
                      this.truncate(
                        t,
                        l,
                        void 0,
                        0,
                        Math.max(0, n - 0.8 * c),
                        (t, e) => t.substring(0, e) + "…"
                      );
                  else if (d) {
                    let l = [],
                      d = [];
                    for (; r.firstChild && r.firstChild !== t; )
                      d.push(r.firstChild), r.removeChild(r.firstChild);
                    for (; h.length; )
                      h.length &&
                        !this.noWrap &&
                        p > 0 &&
                        (l.push(t.textContent || ""),
                        (t.textContent = h.join(" ").replace(/- /g, "-"))),
                        this.truncate(
                          t,
                          void 0,
                          h,
                          (0 === p && u) || 0,
                          n,
                          (t, e) => h.slice(0, e).join(" ").replace(/- /g, "-")
                        ),
                        (u = e.actualWidth),
                        p++;
                    d.forEach((e) => {
                      r.insertBefore(e, t);
                    }),
                      l.forEach((e) => {
                        r.insertBefore(s.createTextNode(e), t);
                        let n = s.createElementNS(o, "tspan");
                        (n.textContent = "​"),
                          a(n, { dy: c, x: i }),
                          r.insertBefore(n, t);
                      });
                  }
                },
                h = (t) => {
                  [].slice.call(t.childNodes).forEach((i) => {
                    i.nodeType === r.Node.TEXT_NODE
                      ? l(i, t)
                      : (-1 !== i.className.baseVal.indexOf("highcharts-br") &&
                          (e.actualWidth = 0),
                        h(i));
                  });
                };
              h(e.element);
            }
            getLineHeight(t) {
              let e = t.nodeType === r.Node.TEXT_NODE ? t.parentElement : t;
              return this.textLineHeight
                ? parseInt(this.textLineHeight.toString(), 10)
                : this.renderer.fontMetrics(e || this.svgElement.element).h;
            }
            modifyTree(t) {
              let e = (i, s) => {
                let {
                    attributes: o = {},
                    children: r,
                    style: a = {},
                    tagName: l,
                  } = i,
                  h = this.renderer.styledMode;
                if (
                  ("b" === l || "strong" === l
                    ? h
                      ? (o.class = "highcharts-strong")
                      : (a.fontWeight = "bold")
                    : ("i" === l || "em" === l) &&
                      (h
                        ? (o.class = "highcharts-emphasized")
                        : (a.fontStyle = "italic")),
                  a && a.color && (a.fill = a.color),
                  "br" === l)
                ) {
                  (o.class = "highcharts-br"), (i.textContent = "​");
                  let e = t[s + 1];
                  e &&
                    e.textContent &&
                    (e.textContent = e.textContent.replace(/^ +/gm, ""));
                } else
                  "a" === l &&
                    r &&
                    r.some((t) => "#text" === t.tagName) &&
                    (i.children = [{ children: r, tagName: "tspan" }]);
                "#text" !== l && "a" !== l && (i.tagName = "tspan"),
                  n(i, { attributes: o, style: a }),
                  r && r.filter((t) => "#text" !== t.tagName).forEach(e);
              };
              t.forEach(e), l(this.svgElement, "afterModifyTree", { nodes: t });
            }
            truncate(t, e, i, s, o, r) {
              let a, n;
              let l = this.svgElement,
                { rotation: h } = l,
                d = [],
                c = i ? 1 : 0,
                p = (e || i || "").length,
                u = p,
                g = function (e, o) {
                  let r = o || e,
                    a = t.parentNode;
                  if (a && void 0 === d[r] && a.getSubStringLength)
                    try {
                      d[r] = s + a.getSubStringLength(0, i ? r + 1 : r);
                    } catch (t) {}
                  return d[r];
                };
              if (((l.rotation = 0), s + (n = g(t.textContent.length)) > o)) {
                for (; c <= p; )
                  (u = Math.ceil((c + p) / 2)),
                    i && (a = r(i, u)),
                    (n = g(u, a && a.length - 1)),
                    c === p ? (c = p + 1) : n > o ? (p = u - 1) : (c = u);
                0 === p
                  ? (t.textContent = "")
                  : (e && p === e.length - 1) ||
                    (t.textContent = a || r(e || i, u));
              }
              i && i.splice(0, u), (l.actualWidth = n), (l.rotation = h);
            }
            unescapeEntities(t, e) {
              return (
                d(this.renderer.escapes, function (i, s) {
                  (e && -1 !== e.indexOf(i)) ||
                    (t = t.toString().replace(RegExp(i, "g"), s));
                }),
                t
              );
            }
          };
        }
      ),
      i(
        e,
        "Core/Renderer/SVG/SVGRenderer.js",
        [
          e["Core/Renderer/HTML/AST.js"],
          e["Core/Defaults.js"],
          e["Core/Color/Color.js"],
          e["Core/Globals.js"],
          e["Core/Renderer/RendererRegistry.js"],
          e["Core/Renderer/SVG/SVGElement.js"],
          e["Core/Renderer/SVG/SVGLabel.js"],
          e["Core/Renderer/SVG/Symbols.js"],
          e["Core/Renderer/SVG/TextBuilder.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s, o, r, a, n, l, h) {
          let d;
          let { defaultOptions: c } = e,
            {
              charts: p,
              deg2rad: u,
              doc: g,
              isFirefox: f,
              isMS: m,
              isWebKit: x,
              noop: y,
              SVG_NS: b,
              symbolSizes: v,
              win: S,
            } = s,
            {
              addEvent: k,
              attr: M,
              createElement: C,
              crisp: A,
              css: w,
              defined: T,
              destroyObjectProperties: P,
              extend: O,
              isArray: L,
              isNumber: D,
              isObject: E,
              isString: B,
              merge: j,
              pick: R,
              pInt: I,
              replaceNested: z,
              uniqueKey: G,
            } = h;
          class N {
            constructor(t, e, i, s, o, r, a) {
              let n, l;
              let h = this.createElement("svg").attr({
                  version: "1.1",
                  class: "highcharts-root",
                }),
                d = h.element;
              a || h.css(this.getStyle(s || {})),
                t.appendChild(d),
                M(t, "dir", "ltr"),
                -1 === t.innerHTML.indexOf("xmlns") &&
                  M(d, "xmlns", this.SVG_NS),
                (this.box = d),
                (this.boxWrapper = h),
                (this.alignedObjects = []),
                (this.url = this.getReferenceURL()),
                this.createElement("desc")
                  .add()
                  .element.appendChild(
                    g.createTextNode("Created with Highcharts 11.4.7")
                  ),
                (this.defs = this.createElement("defs").add()),
                (this.allowHTML = r),
                (this.forExport = o),
                (this.styledMode = a),
                (this.gradients = {}),
                (this.cache = {}),
                (this.cacheKeys = []),
                (this.imgCount = 0),
                (this.rootFontSize = h.getStyle("font-size")),
                this.setSize(e, i, !1),
                f &&
                  t.getBoundingClientRect &&
                  ((n = function () {
                    w(t, { left: 0, top: 0 }),
                      (l = t.getBoundingClientRect()),
                      w(t, {
                        left: Math.ceil(l.left) - l.left + "px",
                        top: Math.ceil(l.top) - l.top + "px",
                      });
                  })(),
                  (this.unSubPixelFix = k(S, "resize", n)));
            }
            definition(e) {
              return new t([e]).addToDOM(this.defs.element);
            }
            getReferenceURL() {
              if ((f || x) && g.getElementsByTagName("base").length) {
                if (!T(d)) {
                  let e = G(),
                    i = new t([
                      {
                        tagName: "svg",
                        attributes: { width: 8, height: 8 },
                        children: [
                          {
                            tagName: "defs",
                            children: [
                              {
                                tagName: "clipPath",
                                attributes: { id: e },
                                children: [
                                  {
                                    tagName: "rect",
                                    attributes: { width: 4, height: 4 },
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            tagName: "rect",
                            attributes: {
                              id: "hitme",
                              width: 8,
                              height: 8,
                              "clip-path": `url(#${e})`,
                              fill: "rgba(0,0,0,0.001)",
                            },
                          },
                        ],
                      },
                    ]).addToDOM(g.body);
                  w(i, { position: "fixed", top: 0, left: 0, zIndex: 9e5 });
                  let s = g.elementFromPoint(6, 6);
                  (d = "hitme" === (s && s.id)), g.body.removeChild(i);
                }
                if (d)
                  return z(
                    S.location.href.split("#")[0],
                    [/<[^>]*>/g, ""],
                    [/([\('\)])/g, "\\$1"],
                    [/ /g, "%20"]
                  );
              }
              return "";
            }
            getStyle(t) {
              return (
                (this.style = O(
                  {
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: "1rem",
                  },
                  t
                )),
                this.style
              );
            }
            setStyle(t) {
              this.boxWrapper.css(this.getStyle(t));
            }
            isHidden() {
              return !this.boxWrapper.getBBox().width;
            }
            destroy() {
              let t = this.defs;
              return (
                (this.box = null),
                (this.boxWrapper = this.boxWrapper.destroy()),
                P(this.gradients || {}),
                (this.gradients = null),
                (this.defs = t.destroy()),
                this.unSubPixelFix && this.unSubPixelFix(),
                (this.alignedObjects = null),
                null
              );
            }
            createElement(t) {
              return new this.Element(this, t);
            }
            getRadialAttr(t, e) {
              return {
                cx: t[0] - t[2] / 2 + (e.cx || 0) * t[2],
                cy: t[1] - t[2] / 2 + (e.cy || 0) * t[2],
                r: (e.r || 0) * t[2],
              };
            }
            shadowDefinition(t) {
              let e = [
                  `highcharts-drop-shadow-${this.chartIndex}`,
                  ...Object.keys(t).map((e) => `${e}-${t[e]}`),
                ]
                  .join("-")
                  .toLowerCase()
                  .replace(/[^a-z\d\-]/g, ""),
                i = j(
                  {
                    color: "#000000",
                    offsetX: 1,
                    offsetY: 1,
                    opacity: 0.15,
                    width: 5,
                  },
                  t
                );
              return (
                this.defs.element.querySelector(`#${e}`) ||
                  this.definition({
                    tagName: "filter",
                    attributes: { id: e, filterUnits: i.filterUnits },
                    children: this.getShadowFilterContent(i),
                  }),
                e
              );
            }
            getShadowFilterContent(t) {
              return [
                {
                  tagName: "feDropShadow",
                  attributes: {
                    dx: t.offsetX,
                    dy: t.offsetY,
                    "flood-color": t.color,
                    "flood-opacity": Math.min(5 * t.opacity, 1),
                    stdDeviation: t.width / 2,
                  },
                },
              ];
            }
            buildText(t) {
              new l(t).buildSVG();
            }
            getContrast(t) {
              let e = i.parse(t).rgba.map((t) => {
                  let e = t / 255;
                  return e <= 0.03928
                    ? e / 12.92
                    : Math.pow((e + 0.055) / 1.055, 2.4);
                }),
                s = 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2];
              return 1.05 / (s + 0.05) > (s + 0.05) / 0.05
                ? "#FFFFFF"
                : "#000000";
            }
            button(e, i, s, o, r = {}, a, n, l, h, d) {
              let p = this.label(
                  e,
                  i,
                  s,
                  h,
                  void 0,
                  void 0,
                  d,
                  void 0,
                  "button"
                ),
                u = this.styledMode,
                g = arguments,
                f = 0;
              (r = j(c.global.buttonTheme, r)),
                u && (delete r.fill, delete r.stroke, delete r["stroke-width"]);
              let x = r.states || {},
                y = r.style || {};
              delete r.states, delete r.style;
              let b = [t.filterUserAttributes(r)],
                v = [y];
              return (
                u ||
                  ["hover", "select", "disabled"].forEach((e, i) => {
                    b.push(
                      j(b[0], t.filterUserAttributes(g[i + 5] || x[e] || {}))
                    ),
                      v.push(b[i + 1].style),
                      delete b[i + 1].style;
                  }),
                k(p.element, m ? "mouseover" : "mouseenter", function () {
                  3 !== f && p.setState(1);
                }),
                k(p.element, m ? "mouseout" : "mouseleave", function () {
                  3 !== f && p.setState(f);
                }),
                (p.setState = (t = 0) => {
                  if (
                    (1 !== t && (p.state = f = t),
                    p
                      .removeClass(
                        /highcharts-button-(normal|hover|pressed|disabled)/
                      )
                      .addClass(
                        "highcharts-button-" +
                          ["normal", "hover", "pressed", "disabled"][t]
                      ),
                    !u)
                  ) {
                    p.attr(b[t]);
                    let e = v[t];
                    E(e) && p.css(e);
                  }
                }),
                p.attr(b[0]),
                !u &&
                  (p.css(O({ cursor: "default" }, y)),
                  d && p.text.css({ pointerEvents: "none" })),
                p
                  .on("touchstart", (t) => t.stopPropagation())
                  .on("click", function (t) {
                    3 !== f && o.call(p, t);
                  })
              );
            }
            crispLine(t, e) {
              let [i, s] = t;
              return (
                T(i[1]) && i[1] === s[1] && (i[1] = s[1] = A(i[1], e)),
                T(i[2]) && i[2] === s[2] && (i[2] = s[2] = A(i[2], e)),
                t
              );
            }
            path(t) {
              let e = this.styledMode ? {} : { fill: "none" };
              return (
                L(t) ? (e.d = t) : E(t) && O(e, t),
                this.createElement("path").attr(e)
              );
            }
            circle(t, e, i) {
              let s = E(t) ? t : void 0 === t ? {} : { x: t, y: e, r: i },
                o = this.createElement("circle");
              return (
                (o.xSetter = o.ySetter =
                  function (t, e, i) {
                    i.setAttribute("c" + e, t);
                  }),
                o.attr(s)
              );
            }
            arc(t, e, i, s, o, r) {
              let a;
              E(t)
                ? ((e = (a = t).y),
                  (i = a.r),
                  (s = a.innerR),
                  (o = a.start),
                  (r = a.end),
                  (t = a.x))
                : (a = { innerR: s, start: o, end: r });
              let n = this.symbol("arc", t, e, i, i, a);
              return (n.r = i), n;
            }
            rect(t, e, i, s, o, r) {
              let a = E(t)
                  ? t
                  : void 0 === t
                  ? {}
                  : {
                      x: t,
                      y: e,
                      r: o,
                      width: Math.max(i || 0, 0),
                      height: Math.max(s || 0, 0),
                    },
                n = this.createElement("rect");
              return (
                this.styledMode ||
                  (void 0 !== r && ((a["stroke-width"] = r), O(a, n.crisp(a))),
                  (a.fill = "none")),
                (n.rSetter = function (t, e, i) {
                  (n.r = t), M(i, { rx: t, ry: t });
                }),
                (n.rGetter = function () {
                  return n.r || 0;
                }),
                n.attr(a)
              );
            }
            roundedRect(t) {
              return this.symbol("roundedRect").attr(t);
            }
            setSize(t, e, i) {
              (this.width = t),
                (this.height = e),
                this.boxWrapper.animate(
                  { width: t, height: e },
                  {
                    step: function () {
                      this.attr({
                        viewBox:
                          "0 0 " +
                          this.attr("width") +
                          " " +
                          this.attr("height"),
                      });
                    },
                    duration: R(i, !0) ? void 0 : 0,
                  }
                ),
                this.alignElements();
            }
            g(t) {
              let e = this.createElement("g");
              return t ? e.attr({ class: "highcharts-" + t }) : e;
            }
            image(t, e, i, s, o, r) {
              let a = { preserveAspectRatio: "none" };
              D(e) && (a.x = e),
                D(i) && (a.y = i),
                D(s) && (a.width = s),
                D(o) && (a.height = o);
              let n = this.createElement("image").attr(a),
                l = function (e) {
                  n.attr({ href: t }), r.call(n, e);
                };
              if (r) {
                n.attr({
                  href: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                });
                let e = new S.Image();
                k(e, "load", l), (e.src = t), e.complete && l({});
              } else n.attr({ href: t });
              return n;
            }
            symbol(t, e, i, s, o, r) {
              let a, n, l, h;
              let d = this,
                c = /^url\((.*?)\)$/,
                u = c.test(t),
                f = !u && (this.symbols[t] ? t : "circle"),
                m = f && this.symbols[f];
              if (m)
                "number" == typeof e &&
                  (n = m.call(this.symbols, e || 0, i || 0, s || 0, o || 0, r)),
                  (a = this.path(n)),
                  d.styledMode || a.attr("fill", "none"),
                  O(a, {
                    symbolName: f || void 0,
                    x: e,
                    y: i,
                    width: s,
                    height: o,
                  }),
                  r && O(a, r);
              else if (u) {
                l = t.match(c)[1];
                let s = (a = this.image(l));
                (s.imgwidth = R(r && r.width, v[l] && v[l].width)),
                  (s.imgheight = R(r && r.height, v[l] && v[l].height)),
                  (h = (t) => t.attr({ width: t.width, height: t.height })),
                  ["width", "height"].forEach((t) => {
                    s[`${t}Setter`] = function (t, e) {
                      this[e] = t;
                      let {
                          alignByTranslate: i,
                          element: s,
                          width: o,
                          height: a,
                          imgwidth: n,
                          imgheight: l,
                        } = this,
                        h = "width" === e ? n : l,
                        d = 1;
                      r && "within" === r.backgroundSize && o && a && n && l
                        ? ((d = Math.min(o / n, a / l)),
                          M(s, {
                            width: Math.round(n * d),
                            height: Math.round(l * d),
                          }))
                        : s && h && s.setAttribute(e, h),
                        !i &&
                          n &&
                          l &&
                          this.translate(
                            ((o || 0) - n * d) / 2,
                            ((a || 0) - l * d) / 2
                          );
                    };
                  }),
                  T(e) && s.attr({ x: e, y: i }),
                  (s.isImg = !0),
                  T(s.imgwidth) && T(s.imgheight)
                    ? h(s)
                    : (s.attr({ width: 0, height: 0 }),
                      C("img", {
                        onload: function () {
                          let t = p[d.chartIndex];
                          0 === this.width &&
                            (w(this, { position: "absolute", top: "-999em" }),
                            g.body.appendChild(this)),
                            (v[l] = { width: this.width, height: this.height }),
                            (s.imgwidth = this.width),
                            (s.imgheight = this.height),
                            s.element && h(s),
                            this.parentNode &&
                              this.parentNode.removeChild(this),
                            d.imgCount--,
                            d.imgCount || !t || t.hasLoaded || t.onload();
                        },
                        src: l,
                      }),
                      this.imgCount++);
              }
              return a;
            }
            clipRect(t, e, i, s) {
              return this.rect(t, e, i, s, 0);
            }
            text(t, e, i, s) {
              let o = {};
              if (s && (this.allowHTML || !this.forExport))
                return this.html(t, e, i);
              (o.x = Math.round(e || 0)),
                i && (o.y = Math.round(i)),
                T(t) && (o.text = t);
              let r = this.createElement("text").attr(o);
              return (
                (s && (!this.forExport || this.allowHTML)) ||
                  (r.xSetter = function (t, e, i) {
                    let s = i.getElementsByTagName("tspan"),
                      o = i.getAttribute(e);
                    for (let i = 0, r; i < s.length; i++)
                      (r = s[i]).getAttribute(e) === o && r.setAttribute(e, t);
                    i.setAttribute(e, t);
                  }),
                r
              );
            }
            fontMetrics(t) {
              let e = I(r.prototype.getStyle.call(t, "font-size") || 0),
                i = e < 24 ? e + 3 : Math.round(1.2 * e),
                s = Math.round(0.8 * i);
              return { h: i, b: s, f: e };
            }
            rotCorr(t, e, i) {
              let s = t;
              return (
                e && i && (s = Math.max(s * Math.cos(e * u), 4)),
                { x: (-t / 3) * Math.sin(e * u), y: s }
              );
            }
            pathToSegments(t) {
              let e = [],
                i = [],
                s = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 };
              for (let o = 0; o < t.length; o++)
                B(i[0]) &&
                  D(t[o]) &&
                  i.length === s[i[0].toUpperCase()] &&
                  t.splice(o, 0, i[0].replace("M", "L").replace("m", "l")),
                  "string" == typeof t[o] &&
                    (i.length && e.push(i.slice(0)), (i.length = 0)),
                  i.push(t[o]);
              return e.push(i.slice(0)), e;
            }
            label(t, e, i, s, o, r, n, l, h) {
              return new a(this, t, e, i, s, o, r, n, l, h);
            }
            alignElements() {
              this.alignedObjects.forEach((t) => t.align());
            }
          }
          return (
            O(N.prototype, {
              Element: r,
              SVG_NS: b,
              escapes: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;",
              },
              symbols: n,
              draw: y,
            }),
            o.registerRendererType("svg", N, !0),
            N
          );
        }
      ),
      i(
        e,
        "Core/Renderer/HTML/HTMLElement.js",
        [
          e["Core/Renderer/HTML/AST.js"],
          e["Core/Globals.js"],
          e["Core/Renderer/SVG/SVGElement.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s) {
          let { composed: o } = e,
            {
              attr: r,
              css: a,
              createElement: n,
              defined: l,
              extend: h,
              pInt: d,
              pushUnique: c,
            } = s;
          function p(t, e, s) {
            let o = this.div?.style || s.style;
            i.prototype[`${e}Setter`].call(this, t, e, s), o && (o[e] = t);
          }
          let u = (t, e) => {
            if (!t.div) {
              let s = r(t.element, "class"),
                o = t.css,
                a = n(
                  "div",
                  s ? { className: s } : void 0,
                  {
                    position: "absolute",
                    left: `${t.translateX || 0}px`,
                    top: `${t.translateY || 0}px`,
                    ...t.styles,
                    display: t.display,
                    opacity: t.opacity,
                    visibility: t.visibility,
                  },
                  t.parentGroup?.div || e
                );
              (t.classSetter = (t, e, i) => {
                i.setAttribute("class", t), (a.className = t);
              }),
                (t.translateXSetter = t.translateYSetter =
                  (e, i) => {
                    (t[i] = e),
                      (a.style["translateX" === i ? "left" : "top"] = `${e}px`),
                      (t.doTransform = !0);
                  }),
                (t.opacitySetter = t.visibilitySetter = p),
                (t.css = (e) => (
                  o.call(t, e),
                  e.cursor && (a.style.cursor = e.cursor),
                  e.pointerEvents && (a.style.pointerEvents = e.pointerEvents),
                  t
                )),
                (t.on = function () {
                  return (
                    i.prototype.on.apply(
                      { element: a, onEvents: t.onEvents },
                      arguments
                    ),
                    t
                  );
                }),
                (t.div = a);
            }
            return t.div;
          };
          class g extends i {
            static compose(t) {
              c(o, this.compose) &&
                (t.prototype.html = function (t, e, i) {
                  return new g(this, "span").attr({
                    text: t,
                    x: Math.round(e),
                    y: Math.round(i),
                  });
                });
            }
            constructor(t, e) {
              super(t, e),
                this.css({
                  position: "absolute",
                  ...(t.styledMode
                    ? {}
                    : {
                        fontFamily: t.style.fontFamily,
                        fontSize: t.style.fontSize,
                      }),
                }),
                (this.element.style.whiteSpace = "nowrap");
            }
            getSpanCorrection(t, e, i) {
              (this.xCorr = -t * i), (this.yCorr = -e);
            }
            css(t) {
              let e;
              let { element: i } = this,
                s = "SPAN" === i.tagName && t && "width" in t,
                o = s && t.width;
              return (
                s &&
                  (delete t.width, (this.textWidth = d(o) || void 0), (e = !0)),
                t?.textOverflow === "ellipsis" &&
                  ((t.whiteSpace = "nowrap"), (t.overflow = "hidden")),
                h(this.styles, t),
                a(i, t),
                e && this.updateTransform(),
                this
              );
            }
            htmlGetBBox() {
              let { element: t } = this;
              return {
                x: t.offsetLeft,
                y: t.offsetTop,
                width: t.offsetWidth,
                height: t.offsetHeight,
              };
            }
            updateTransform() {
              if (!this.added) {
                this.alignOnAdd = !0;
                return;
              }
              let {
                  element: t,
                  renderer: e,
                  rotation: i,
                  rotationOriginX: s,
                  rotationOriginY: o,
                  styles: r,
                  textAlign: n = "left",
                  textWidth: h,
                  translateX: d = 0,
                  translateY: c = 0,
                  x: p = 0,
                  y: u = 0,
                } = this,
                g = { left: 0, center: 0.5, right: 1 }[n],
                f = r.whiteSpace;
              if (
                (a(t, { marginLeft: `${d}px`, marginTop: `${c}px` }),
                "SPAN" === t.tagName)
              ) {
                let r = [i, n, t.innerHTML, h, this.textAlign].join(","),
                  d = -(this.parentGroup?.padding * 1) || 0,
                  c,
                  m = !1;
                if (h !== this.oldTextWidth) {
                  let e = this.textPxLength
                      ? this.textPxLength
                      : (a(t, { width: "", whiteSpace: f || "nowrap" }),
                        t.offsetWidth),
                    s = h || 0;
                  (s > this.oldTextWidth || e > s) &&
                    (/[ \-]/.test(t.textContent || t.innerText) ||
                      "ellipsis" === t.style.textOverflow) &&
                    (a(t, {
                      width: e > s || i ? h + "px" : "auto",
                      display: "block",
                      whiteSpace: f || "normal",
                    }),
                    (this.oldTextWidth = h),
                    (m = !0));
                }
                (this.hasBoxWidthChanged = m),
                  r !== this.cTT &&
                    ((c = e.fontMetrics(t).b),
                    l(i) &&
                      (i !== (this.oldRotation || 0) || n !== this.oldAlign) &&
                      this.setSpanRotation(i, d, d),
                    this.getSpanCorrection(
                      (!l(i) && this.textPxLength) || t.offsetWidth,
                      c,
                      g
                    ));
                let { xCorr: x = 0, yCorr: y = 0 } = this,
                  b = (s ?? p) - x - p - d,
                  v = (o ?? u) - y - u - d;
                a(t, {
                  left: `${p + x}px`,
                  top: `${u + y}px`,
                  transformOrigin: `${b}px ${v}px`,
                }),
                  (this.cTT = r),
                  (this.oldRotation = i),
                  (this.oldAlign = n);
              }
            }
            setSpanRotation(t, e, i) {
              a(this.element, {
                transform: `rotate(${t}deg)`,
                transformOrigin: `${e}% ${i}px`,
              });
            }
            add(t) {
              let e;
              let i = this.renderer.box.parentNode,
                s = [];
              if (((this.parentGroup = t), t && !(e = t.div))) {
                let o = t;
                for (; o; ) s.push(o), (o = o.parentGroup);
                for (let t of s.reverse()) e = u(t, i);
              }
              return (
                (e || i).appendChild(this.element),
                (this.added = !0),
                this.alignOnAdd && this.updateTransform(),
                this
              );
            }
            textSetter(e) {
              e !== this.textStr &&
                (delete this.bBox,
                delete this.oldTextWidth,
                t.setElementHTML(this.element, e ?? ""),
                (this.textStr = e),
                (this.doTransform = !0));
            }
            alignSetter(t) {
              (this.alignValue = this.textAlign = t), (this.doTransform = !0);
            }
            xSetter(t, e) {
              (this[e] = t), (this.doTransform = !0);
            }
          }
          let f = g.prototype;
          return (
            (f.visibilitySetter = f.opacitySetter = p),
            (f.ySetter =
              f.rotationSetter =
              f.rotationOriginXSetter =
              f.rotationOriginYSetter =
                f.xSetter),
            g
          );
        }
      ),
      i(e, "Core/Axis/AxisDefaults.js", [], function () {
        var t, e;
        return (
          ((e = t || (t = {})).xAxis = {
            alignTicks: !0,
            allowDecimals: void 0,
            panningEnabled: !0,
            zIndex: 2,
            zoomEnabled: !0,
            dateTimeLabelFormats: {
              millisecond: { main: "%H:%M:%S.%L", range: !1 },
              second: { main: "%H:%M:%S", range: !1 },
              minute: { main: "%H:%M", range: !1 },
              hour: { main: "%H:%M", range: !1 },
              day: { main: "%e %b" },
              week: { main: "%e %b" },
              month: { main: "%b '%y" },
              year: { main: "%Y" },
            },
            endOnTick: !1,
            gridLineDashStyle: "Solid",
            gridZIndex: 1,
            labels: {
              autoRotationLimit: 80,
              distance: 15,
              enabled: !0,
              indentation: 10,
              overflow: "justify",
              reserveSpace: void 0,
              rotation: void 0,
              staggerLines: 0,
              step: 0,
              useHTML: !1,
              zIndex: 7,
              style: { color: "#333333", cursor: "default", fontSize: "0.8em" },
            },
            maxPadding: 0.01,
            minorGridLineDashStyle: "Solid",
            minorTickLength: 2,
            minorTickPosition: "outside",
            minorTicksPerMajor: 5,
            minPadding: 0.01,
            offset: void 0,
            reversed: void 0,
            reversedStacks: !1,
            showEmpty: !0,
            showFirstLabel: !0,
            showLastLabel: !0,
            startOfWeek: 1,
            startOnTick: !1,
            tickLength: 10,
            tickPixelInterval: 100,
            tickmarkPlacement: "between",
            tickPosition: "outside",
            title: {
              align: "middle",
              useHTML: !1,
              x: 0,
              y: 0,
              style: { color: "#666666", fontSize: "0.8em" },
            },
            type: "linear",
            uniqueNames: !0,
            visible: !0,
            minorGridLineColor: "#f2f2f2",
            minorGridLineWidth: 1,
            minorTickColor: "#999999",
            lineColor: "#333333",
            lineWidth: 1,
            gridLineColor: "#e6e6e6",
            gridLineWidth: void 0,
            tickColor: "#333333",
          }),
          (e.yAxis = {
            reversedStacks: !0,
            endOnTick: !0,
            maxPadding: 0.05,
            minPadding: 0.05,
            tickPixelInterval: 72,
            showLastLabel: !0,
            labels: { x: void 0 },
            startOnTick: !0,
            title: { text: "Values" },
            stackLabels: {
              animation: {},
              allowOverlap: !1,
              enabled: !1,
              crop: !0,
              overflow: "justify",
              formatter: function () {
                let { numberFormatter: t } = this.axis.chart;
                return t(this.total || 0, -1);
              },
              style: {
                color: "#000000",
                fontSize: "0.7em",
                fontWeight: "bold",
                textOutline: "1px contrast",
              },
            },
            gridLineWidth: 1,
            lineWidth: 0,
          }),
          t
        );
      }),
      i(e, "Core/Foundation.js", [e["Core/Utilities.js"]], function (t) {
        var e;
        let { addEvent: i, isFunction: s, objectEach: o, removeEvent: r } = t;
        return (
          ((e || (e = {})).registerEventOptions = function (t, e) {
            (t.eventOptions = t.eventOptions || {}),
              o(e.events, function (e, o) {
                t.eventOptions[o] !== e &&
                  (t.eventOptions[o] &&
                    (r(t, o, t.eventOptions[o]), delete t.eventOptions[o]),
                  s(e) && ((t.eventOptions[o] = e), i(t, o, e, { order: 0 })));
              });
          }),
          e
        );
      }),
      i(
        e,
        "Core/Axis/Tick.js",
        [e["Core/Templating.js"], e["Core/Globals.js"], e["Core/Utilities.js"]],
        function (t, e, i) {
          let { deg2rad: s } = e,
            {
              clamp: o,
              correctFloat: r,
              defined: a,
              destroyObjectProperties: n,
              extend: l,
              fireEvent: h,
              isNumber: d,
              merge: c,
              objectEach: p,
              pick: u,
            } = i;
          return class {
            constructor(t, e, i, s, o) {
              (this.isNew = !0),
                (this.isNewLabel = !0),
                (this.axis = t),
                (this.pos = e),
                (this.type = i || ""),
                (this.parameters = o || {}),
                (this.tickmarkOffset = this.parameters.tickmarkOffset),
                (this.options = this.parameters.options),
                h(this, "init"),
                i || s || this.addLabel();
            }
            addLabel() {
              let e = this,
                i = e.axis,
                s = i.options,
                o = i.chart,
                n = i.categories,
                c = i.logarithmic,
                p = i.names,
                g = e.pos,
                f = u(e.options && e.options.labels, s.labels),
                m = i.tickPositions,
                x = g === m[0],
                y = g === m[m.length - 1],
                b = (!f.step || 1 === f.step) && 1 === i.tickInterval,
                v = m.info,
                S = e.label,
                k,
                M,
                C,
                A = this.parameters.category || (n ? u(n[g], p[g], g) : g);
              c && d(A) && (A = r(c.lin2log(A))),
                i.dateTime &&
                  (v
                    ? (k = (M = o.time.resolveDTLFormat(
                        s.dateTimeLabelFormats[
                          (!s.grid && v.higherRanks[g]) || v.unitName
                        ]
                      )).main)
                    : d(A) &&
                      (k = i.dateTime.getXDateFormat(
                        A,
                        s.dateTimeLabelFormats || {}
                      ))),
                (e.isFirst = x),
                (e.isLast = y);
              let w = {
                axis: i,
                chart: o,
                dateTimeLabelFormat: k,
                isFirst: x,
                isLast: y,
                pos: g,
                tick: e,
                tickPositionInfo: v,
                value: A,
              };
              h(this, "labelFormat", w);
              let T = (e) =>
                  f.formatter
                    ? f.formatter.call(e, e)
                    : f.format
                    ? ((e.text = i.defaultLabelFormatter.call(e)),
                      t.format(f.format, e, o))
                    : i.defaultLabelFormatter.call(e),
                P = T.call(w, w),
                O = M && M.list;
              O
                ? (e.shortenLabel = function () {
                    for (C = 0; C < O.length; C++)
                      if (
                        (l(w, { dateTimeLabelFormat: O[C] }),
                        S.attr({ text: T.call(w, w) }),
                        S.getBBox().width <
                          i.getSlotWidth(e) - 2 * (f.padding || 0))
                      )
                        return;
                    S.attr({ text: "" });
                  })
                : (e.shortenLabel = void 0),
                b && i._addedPlotLB && e.moveLabel(P, f),
                a(S) || e.movedLabel
                  ? S &&
                    S.textStr !== P &&
                    !b &&
                    (!S.textWidth ||
                      f.style.width ||
                      S.styles.width ||
                      S.css({ width: null }),
                    S.attr({ text: P }),
                    (S.textPxLength = S.getBBox().width))
                  : ((e.label = S = e.createLabel(P, f)), (e.rotation = 0));
            }
            createLabel(t, e, i) {
              let s = this.axis,
                o = s.chart,
                r =
                  a(t) && e.enabled
                    ? o.renderer
                        .text(t, i?.x, i?.y, e.useHTML)
                        .add(s.labelGroup)
                    : void 0;
              return (
                r &&
                  (o.styledMode || r.css(c(e.style)),
                  (r.textPxLength = r.getBBox().width)),
                r
              );
            }
            destroy() {
              n(this, this.axis);
            }
            getPosition(t, e, i, s) {
              let a = this.axis,
                n = a.chart,
                l = (s && n.oldChartHeight) || n.chartHeight,
                d = {
                  x: t
                    ? r(a.translate(e + i, void 0, void 0, s) + a.transB)
                    : a.left +
                      a.offset +
                      (a.opposite
                        ? ((s && n.oldChartWidth) || n.chartWidth) -
                          a.right -
                          a.left
                        : 0),
                  y: t
                    ? l - a.bottom + a.offset - (a.opposite ? a.height : 0)
                    : r(l - a.translate(e + i, void 0, void 0, s) - a.transB),
                };
              return (
                (d.y = o(d.y, -1e5, 1e5)),
                h(this, "afterGetPosition", { pos: d }),
                d
              );
            }
            getLabelPosition(t, e, i, o, r, n, l, d) {
              let c, p;
              let g = this.axis,
                f = g.transA,
                m =
                  g.isLinked && g.linkedParent
                    ? g.linkedParent.reversed
                    : g.reversed,
                x = g.staggerLines,
                y = g.tickRotCorr || { x: 0, y: 0 },
                b =
                  o || g.reserveSpaceDefault
                    ? 0
                    : -g.labelOffset * ("center" === g.labelAlign ? 0.5 : 1),
                v = r.distance,
                S = {};
              return (
                (c =
                  0 === g.side
                    ? i.rotation
                      ? -v
                      : -i.getBBox().height
                    : 2 === g.side
                    ? y.y + v
                    : Math.cos(i.rotation * s) *
                      (y.y - i.getBBox(!1, 0).height / 2)),
                a(r.y) && (c = 0 === g.side && g.horiz ? r.y + c : r.y),
                (t =
                  t +
                  u(r.x, [0, 1, 0, -1][g.side] * v) +
                  b +
                  y.x -
                  (n && o ? n * f * (m ? -1 : 1) : 0)),
                (e = e + c - (n && !o ? n * f * (m ? 1 : -1) : 0)),
                x &&
                  ((p = (l / (d || 1)) % x),
                  g.opposite && (p = x - p - 1),
                  (e += p * (g.labelOffset / x))),
                (S.x = t),
                (S.y = Math.round(e)),
                h(this, "afterGetLabelPosition", {
                  pos: S,
                  tickmarkOffset: n,
                  index: l,
                }),
                S
              );
            }
            getLabelSize() {
              return this.label
                ? this.label.getBBox()[this.axis.horiz ? "height" : "width"]
                : 0;
            }
            getMarkPath(t, e, i, s, o = !1, r) {
              return r.crispLine(
                [
                  ["M", t, e],
                  ["L", t + (o ? 0 : -i), e + (o ? i : 0)],
                ],
                s
              );
            }
            handleOverflow(t) {
              let e = this.axis,
                i = e.options.labels,
                o = t.x,
                r = e.chart.chartWidth,
                a = e.chart.spacing,
                n = u(e.labelLeft, Math.min(e.pos, a[3])),
                l = u(
                  e.labelRight,
                  Math.max(e.isRadial ? 0 : e.pos + e.len, r - a[1])
                ),
                h = this.label,
                d = this.rotation,
                c = { left: 0, center: 0.5, right: 1 }[
                  e.labelAlign || h.attr("align")
                ],
                p = h.getBBox().width,
                g = e.getSlotWidth(this),
                f = {},
                m = g,
                x = 1,
                y,
                b,
                v;
              d || "justify" !== i.overflow
                ? d < 0 && o - c * p < n
                  ? (v = Math.round(o / Math.cos(d * s) - n))
                  : d > 0 &&
                    o + c * p > l &&
                    (v = Math.round((r - o) / Math.cos(d * s)))
                : ((y = o - c * p),
                  (b = o + (1 - c) * p),
                  y < n
                    ? (m = t.x + m * (1 - c) - n)
                    : b > l && ((m = l - t.x + m * c), (x = -1)),
                  (m = Math.min(g, m)) < g &&
                    "center" === e.labelAlign &&
                    (t.x += x * (g - m - c * (g - Math.min(p, m)))),
                  (p > m || (e.autoRotation && (h.styles || {}).width)) &&
                    (v = m)),
                v &&
                  (this.shortenLabel
                    ? this.shortenLabel()
                    : ((f.width = Math.floor(v) + "px"),
                      (i.style || {}).textOverflow ||
                        (f.textOverflow = "ellipsis"),
                      h.css(f)));
            }
            moveLabel(t, e) {
              let i = this,
                s = i.label,
                o = i.axis,
                r = !1,
                a;
              s && s.textStr === t
                ? ((i.movedLabel = s), (r = !0), delete i.label)
                : p(o.ticks, function (e) {
                    r ||
                      e.isNew ||
                      e === i ||
                      !e.label ||
                      e.label.textStr !== t ||
                      ((i.movedLabel = e.label),
                      (r = !0),
                      (e.labelPos = i.movedLabel.xy),
                      delete e.label);
                  }),
                !r &&
                  (i.labelPos || s) &&
                  ((a = i.labelPos || s.xy),
                  (i.movedLabel = i.createLabel(t, e, a)),
                  i.movedLabel && i.movedLabel.attr({ opacity: 0 }));
            }
            render(t, e, i) {
              let s = this.axis,
                o = s.horiz,
                a = this.pos,
                n = u(this.tickmarkOffset, s.tickmarkOffset),
                l = this.getPosition(o, a, n, e),
                d = l.x,
                c = l.y,
                p = s.pos,
                g = p + s.len,
                f = o ? d : c;
              !s.chart.polar && this.isNew && (r(f) < p || f > g) && (i = 0);
              let m = u(i, this.label && this.label.newOpacity, 1);
              (i = u(i, 1)),
                (this.isActive = !0),
                this.renderGridLine(e, i),
                this.renderMark(l, i),
                this.renderLabel(l, e, m, t),
                (this.isNew = !1),
                h(this, "afterRender");
            }
            renderGridLine(t, e) {
              let i = this.axis,
                s = i.options,
                o = {},
                r = this.pos,
                a = this.type,
                n = u(this.tickmarkOffset, i.tickmarkOffset),
                l = i.chart.renderer,
                h = this.gridLine,
                d,
                c = s.gridLineWidth,
                p = s.gridLineColor,
                g = s.gridLineDashStyle;
              "minor" === this.type &&
                ((c = s.minorGridLineWidth),
                (p = s.minorGridLineColor),
                (g = s.minorGridLineDashStyle)),
                h ||
                  (i.chart.styledMode ||
                    ((o.stroke = p),
                    (o["stroke-width"] = c || 0),
                    (o.dashstyle = g)),
                  a || (o.zIndex = 1),
                  t && (e = 0),
                  (this.gridLine = h =
                    l
                      .path()
                      .attr(o)
                      .addClass(
                        "highcharts-" + (a ? a + "-" : "") + "grid-line"
                      )
                      .add(i.gridGroup))),
                h &&
                  (d = i.getPlotLinePath({
                    value: r + n,
                    lineWidth: h.strokeWidth(),
                    force: "pass",
                    old: t,
                    acrossPanes: !1,
                  })) &&
                  h[t || this.isNew ? "attr" : "animate"]({ d: d, opacity: e });
            }
            renderMark(t, e) {
              let i = this.axis,
                s = i.options,
                o = i.chart.renderer,
                r = this.type,
                a = i.tickSize(r ? r + "Tick" : "tick"),
                n = t.x,
                l = t.y,
                h = u(
                  s["minor" !== r ? "tickWidth" : "minorTickWidth"],
                  !r && i.isXAxis ? 1 : 0
                ),
                d = s["minor" !== r ? "tickColor" : "minorTickColor"],
                c = this.mark,
                p = !c;
              a &&
                (i.opposite && (a[0] = -a[0]),
                c ||
                  ((this.mark = c =
                    o
                      .path()
                      .addClass("highcharts-" + (r ? r + "-" : "") + "tick")
                      .add(i.axisGroup)),
                  i.chart.styledMode ||
                    c.attr({ stroke: d, "stroke-width": h })),
                c[p ? "attr" : "animate"]({
                  d: this.getMarkPath(n, l, a[0], c.strokeWidth(), i.horiz, o),
                  opacity: e,
                }));
            }
            renderLabel(t, e, i, s) {
              let o = this.axis,
                r = o.horiz,
                a = o.options,
                n = this.label,
                l = a.labels,
                h = l.step,
                c = u(this.tickmarkOffset, o.tickmarkOffset),
                p = t.x,
                g = t.y,
                f = !0;
              n &&
                d(p) &&
                ((n.xy = t = this.getLabelPosition(p, g, n, r, l, c, s, h)),
                (!this.isFirst || this.isLast || a.showFirstLabel) &&
                (!this.isLast || this.isFirst || a.showLastLabel)
                  ? !r ||
                    l.step ||
                    l.rotation ||
                    e ||
                    0 === i ||
                    this.handleOverflow(t)
                  : (f = !1),
                h && s % h && (f = !1),
                f && d(t.y)
                  ? ((t.opacity = i),
                    n[this.isNewLabel ? "attr" : "animate"](t).show(!0),
                    (this.isNewLabel = !1))
                  : (n.hide(), (this.isNewLabel = !0)));
            }
            replaceMovedLabel() {
              let t = this.label,
                e = this.axis;
              t &&
                !this.isNew &&
                (t.animate({ opacity: 0 }, void 0, t.destroy),
                delete this.label),
                (e.isDirty = !0),
                (this.label = this.movedLabel),
                delete this.movedLabel;
            }
          };
        }
      ),
      i(
        e,
        "Core/Axis/Axis.js",
        [
          e["Core/Animation/AnimationUtilities.js"],
          e["Core/Axis/AxisDefaults.js"],
          e["Core/Color/Color.js"],
          e["Core/Defaults.js"],
          e["Core/Foundation.js"],
          e["Core/Globals.js"],
          e["Core/Axis/Tick.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s, o, r, a, n) {
          let { animObject: l } = t,
            { xAxis: h, yAxis: d } = e,
            { defaultOptions: c } = s,
            { registerEventOptions: p } = o,
            { deg2rad: u } = r,
            {
              arrayMax: g,
              arrayMin: f,
              clamp: m,
              correctFloat: x,
              defined: y,
              destroyObjectProperties: b,
              erase: v,
              error: S,
              extend: k,
              fireEvent: M,
              getClosestDistance: C,
              insertItem: A,
              isArray: w,
              isNumber: T,
              isString: P,
              merge: O,
              normalizeTickInterval: L,
              objectEach: D,
              pick: E,
              relativeLength: B,
              removeEvent: j,
              splat: R,
              syncTimeout: I,
            } = n,
            z = (t, e) =>
              L(
                e,
                void 0,
                void 0,
                E(t.options.allowDecimals, e < 0.5 || void 0 !== t.tickAmount),
                !!t.tickAmount
              );
          k(c, { xAxis: h, yAxis: O(h, d) });
          class G {
            constructor(t, e, i) {
              this.init(t, e, i);
            }
            init(t, e, i = this.coll) {
              let s = "xAxis" === i,
                o = this.isZAxis || (t.inverted ? !s : s);
              (this.chart = t),
                (this.horiz = o),
                (this.isXAxis = s),
                (this.coll = i),
                M(this, "init", { userOptions: e }),
                (this.opposite = E(e.opposite, this.opposite)),
                (this.side = E(
                  e.side,
                  this.side,
                  o ? (this.opposite ? 0 : 2) : this.opposite ? 1 : 3
                )),
                this.setOptions(e);
              let r = this.options,
                a = r.labels,
                n = r.type;
              (this.userOptions = e),
                (this.minPixelPadding = 0),
                (this.reversed = E(r.reversed, this.reversed)),
                (this.visible = r.visible),
                (this.zoomEnabled = r.zoomEnabled),
                (this.hasNames = "category" === n || !0 === r.categories),
                (this.categories =
                  (w(r.categories) && r.categories) ||
                  (this.hasNames ? [] : void 0)),
                this.names || ((this.names = []), (this.names.keys = {})),
                (this.plotLinesAndBandsGroups = {}),
                (this.positiveValuesOnly = !!this.logarithmic),
                (this.isLinked = y(r.linkedTo)),
                (this.ticks = {}),
                (this.labelEdge = []),
                (this.minorTicks = {}),
                (this.plotLinesAndBands = []),
                (this.alternateBands = {}),
                this.len ?? (this.len = 0),
                (this.minRange = this.userMinRange = r.minRange || r.maxZoom),
                (this.range = r.range),
                (this.offset = r.offset || 0),
                (this.max = void 0),
                (this.min = void 0);
              let l = E(
                r.crosshair,
                R(t.options.tooltip.crosshairs)[s ? 0 : 1]
              );
              (this.crosshair = !0 === l ? {} : l),
                -1 === t.axes.indexOf(this) &&
                  (s
                    ? t.axes.splice(t.xAxis.length, 0, this)
                    : t.axes.push(this),
                  A(this, t[this.coll])),
                t.orderItems(this.coll),
                (this.series = this.series || []),
                t.inverted &&
                  !this.isZAxis &&
                  s &&
                  !y(this.reversed) &&
                  (this.reversed = !0),
                (this.labelRotation = T(a.rotation) ? a.rotation : void 0),
                p(this, r),
                M(this, "afterInit");
            }
            setOptions(t) {
              let e = this.horiz
                ? { labels: { autoRotation: [-45], padding: 4 }, margin: 15 }
                : {
                    labels: { padding: 1 },
                    title: { rotation: 90 * this.side },
                  };
              (this.options = O(e, c[this.coll], t)),
                M(this, "afterSetOptions", { userOptions: t });
            }
            defaultLabelFormatter() {
              let t = this.axis,
                { numberFormatter: e } = this.chart,
                i = T(this.value) ? this.value : NaN,
                s = t.chart.time,
                o = t.categories,
                r = this.dateTimeLabelFormat,
                a = c.lang,
                n = a.numericSymbols,
                l = a.numericSymbolMagnitude || 1e3,
                h = t.logarithmic ? Math.abs(i) : t.tickInterval,
                d = n && n.length,
                p,
                u;
              if (o) u = `${this.value}`;
              else if (r) u = s.dateFormat(r, i);
              else if (d && n && h >= 1e3)
                for (; d-- && void 0 === u; )
                  h >= (p = Math.pow(l, d + 1)) &&
                    (10 * i) % p == 0 &&
                    null !== n[d] &&
                    0 !== i &&
                    (u = e(i / p, -1) + n[d]);
              return (
                void 0 === u &&
                  (u = Math.abs(i) >= 1e4 ? e(i, -1) : e(i, -1, void 0, "")),
                u
              );
            }
            getSeriesExtremes() {
              let t;
              let e = this;
              M(this, "getSeriesExtremes", null, function () {
                (e.hasVisibleSeries = !1),
                  (e.dataMin = e.dataMax = e.threshold = void 0),
                  (e.softThreshold = !e.isXAxis),
                  e.series.forEach((i) => {
                    if (i.reserveSpace()) {
                      let s = i.options,
                        o,
                        r = s.threshold,
                        a,
                        n;
                      if (
                        ((e.hasVisibleSeries = !0),
                        e.positiveValuesOnly && 0 >= (r || 0) && (r = void 0),
                        e.isXAxis)
                      )
                        (o = i.xData) &&
                          o.length &&
                          ((o = e.logarithmic ? o.filter((t) => t > 0) : o),
                          (a = (t = i.getXExtremes(o)).min),
                          (n = t.max),
                          T(a) ||
                            a instanceof Date ||
                            ((o = o.filter(T)),
                            (a = (t = i.getXExtremes(o)).min),
                            (n = t.max)),
                          o.length &&
                            ((e.dataMin = Math.min(E(e.dataMin, a), a)),
                            (e.dataMax = Math.max(E(e.dataMax, n), n))));
                      else {
                        let t = i.applyExtremes();
                        T(t.dataMin) &&
                          ((a = t.dataMin),
                          (e.dataMin = Math.min(E(e.dataMin, a), a))),
                          T(t.dataMax) &&
                            ((n = t.dataMax),
                            (e.dataMax = Math.max(E(e.dataMax, n), n))),
                          y(r) && (e.threshold = r),
                          (!s.softThreshold || e.positiveValuesOnly) &&
                            (e.softThreshold = !1);
                      }
                    }
                  });
              }),
                M(this, "afterGetSeriesExtremes");
            }
            translate(t, e, i, s, o, r) {
              let a = this.linkedParent || this,
                n = s && a.old ? a.old.min : a.min;
              if (!T(n)) return NaN;
              let l = a.minPixelPadding,
                h =
                  (a.isOrdinal ||
                    a.brokenAxis?.hasBreaks ||
                    (a.logarithmic && o)) &&
                  a.lin2val,
                d = 1,
                c = 0,
                p = s && a.old ? a.old.transA : a.transA,
                u = 0;
              return (
                p || (p = a.transA),
                i && ((d *= -1), (c = a.len)),
                a.reversed && ((d *= -1), (c -= d * (a.sector || a.len))),
                e
                  ? ((u = (t = t * d + c - l) / p + n), h && (u = a.lin2val(u)))
                  : (h && (t = a.val2lin(t)),
                    (u = d * (t - n) * p + c + d * l + (T(r) ? p * r : 0)),
                    a.isRadial || (u = x(u))),
                u
              );
            }
            toPixels(t, e) {
              return (
                this.translate(t, !1, !this.horiz, void 0, !0) +
                (e ? 0 : this.pos)
              );
            }
            toValue(t, e) {
              return this.translate(
                t - (e ? 0 : this.pos),
                !0,
                !this.horiz,
                void 0,
                !0
              );
            }
            getPlotLinePath(t) {
              let e = this,
                i = e.chart,
                s = e.left,
                o = e.top,
                r = t.old,
                a = t.value,
                n = t.lineWidth,
                l = (r && i.oldChartHeight) || i.chartHeight,
                h = (r && i.oldChartWidth) || i.chartWidth,
                d = e.transB,
                c = t.translatedValue,
                p = t.force,
                u,
                g,
                f,
                x,
                y;
              function b(t, e, i) {
                return (
                  "pass" !== p &&
                    (t < e || t > i) &&
                    (p ? (t = m(t, e, i)) : (y = !0)),
                  t
                );
              }
              let v = {
                value: a,
                lineWidth: n,
                old: r,
                force: p,
                acrossPanes: t.acrossPanes,
                translatedValue: c,
              };
              return (
                M(this, "getPlotLinePath", v, function (t) {
                  (u = f =
                    (c = m(
                      (c = E(c, e.translate(a, void 0, void 0, r))),
                      -1e5,
                      1e5
                    )) + d),
                    (g = x = l - c - d),
                    T(c)
                      ? e.horiz
                        ? ((g = o),
                          (x =
                            l -
                            e.bottom +
                            (e.options.isInternal
                              ? 0
                              : i.scrollablePixelsY || 0)),
                          (u = f = b(u, s, s + e.width)))
                        : ((u = s),
                          (f = h - e.right + (i.scrollablePixelsX || 0)),
                          (g = x = b(g, o, o + e.height)))
                      : ((y = !0), (p = !1)),
                    (t.path =
                      y && !p
                        ? void 0
                        : i.renderer.crispLine(
                            [
                              ["M", u, g],
                              ["L", f, x],
                            ],
                            n || 1
                          ));
                }),
                v.path
              );
            }
            getLinearTickPositions(t, e, i) {
              let s, o, r;
              let a = x(Math.floor(e / t) * t),
                n = x(Math.ceil(i / t) * t),
                l = [];
              if ((x(a + t) === a && (r = 20), this.single)) return [e];
              for (s = a; s <= n && (l.push(s), (s = x(s + t, r)) !== o); )
                o = s;
              return l;
            }
            getMinorTickInterval() {
              let { minorTicks: t, minorTickInterval: e } = this.options;
              return !0 === t ? E(e, "auto") : !1 !== t ? e : void 0;
            }
            getMinorTickPositions() {
              let t = this.options,
                e = this.tickPositions,
                i = this.minorTickInterval,
                s = this.pointRangePadding || 0,
                o = (this.min || 0) - s,
                r = (this.max || 0) + s,
                a = r - o,
                n = [],
                l;
              if (a && a / i < this.len / 3) {
                let s = this.logarithmic;
                if (s)
                  this.paddedTicks.forEach(function (t, e, o) {
                    e &&
                      n.push.apply(
                        n,
                        s.getLogTickPositions(i, o[e - 1], o[e], !0)
                      );
                  });
                else if (
                  this.dateTime &&
                  "auto" === this.getMinorTickInterval()
                )
                  n = n.concat(
                    this.getTimeTicks(
                      this.dateTime.normalizeTimeTickInterval(i),
                      o,
                      r,
                      t.startOfWeek
                    )
                  );
                else
                  for (l = o + ((e[0] - o) % i); l <= r && l !== n[0]; l += i)
                    n.push(l);
              }
              return 0 !== n.length && this.trimTicks(n), n;
            }
            adjustForMinRange() {
              let t = this.options,
                e = this.logarithmic,
                { max: i, min: s, minRange: o } = this,
                r,
                a,
                n,
                l;
              this.isXAxis &&
                void 0 === o &&
                !e &&
                (o =
                  y(t.min) || y(t.max) || y(t.floor) || y(t.ceiling)
                    ? null
                    : Math.min(
                        5 *
                          (C(
                            this.series.map(
                              (t) =>
                                (t.xIncrement
                                  ? t.xData?.slice(0, 2)
                                  : t.xData) || []
                            )
                          ) || 0),
                        this.dataMax - this.dataMin
                      )),
                T(i) &&
                  T(s) &&
                  T(o) &&
                  i - s < o &&
                  ((a = this.dataMax - this.dataMin >= o),
                  (r = (o - i + s) / 2),
                  (n = [s - r, E(t.min, s - r)]),
                  a && (n[2] = e ? e.log2lin(this.dataMin) : this.dataMin),
                  (l = [(s = g(n)) + o, E(t.max, s + o)]),
                  a && (l[2] = e ? e.log2lin(this.dataMax) : this.dataMax),
                  (i = f(l)) - s < o &&
                    ((n[0] = i - o), (n[1] = E(t.min, i - o)), (s = g(n)))),
                (this.minRange = o),
                (this.min = s),
                (this.max = i);
            }
            getClosest() {
              let t, e;
              if (this.categories) e = 1;
              else {
                let i = [];
                this.series.forEach(function (t) {
                  let s = t.closestPointRange;
                  t.xData?.length === 1
                    ? i.push(t.xData[0])
                    : !t.noSharedTooltip &&
                      y(s) &&
                      t.reserveSpace() &&
                      (e = y(e) ? Math.min(e, s) : s);
                }),
                  i.length && (i.sort((t, e) => t - e), (t = C([i])));
              }
              return t && e ? Math.min(t, e) : t || e;
            }
            nameToX(t) {
              let e = w(this.options.categories),
                i = e ? this.categories : this.names,
                s = t.options.x,
                o;
              return (
                (t.series.requireSorting = !1),
                y(s) ||
                  (s =
                    this.options.uniqueNames && i
                      ? e
                        ? i.indexOf(t.name)
                        : E(i.keys[t.name], -1)
                      : t.series.autoIncrement()),
                -1 === s ? !e && i && (o = i.length) : (o = s),
                void 0 !== o
                  ? ((this.names[o] = t.name), (this.names.keys[t.name] = o))
                  : t.x && (o = t.x),
                o
              );
            }
            updateNames() {
              let t = this,
                e = this.names;
              e.length > 0 &&
                (Object.keys(e.keys).forEach(function (t) {
                  delete e.keys[t];
                }),
                (e.length = 0),
                (this.minRange = this.userMinRange),
                (this.series || []).forEach((e) => {
                  (e.xIncrement = null),
                    (!e.points || e.isDirtyData) &&
                      ((t.max = Math.max(t.max, e.xData.length - 1)),
                      e.processData(),
                      e.generatePoints()),
                    e.data.forEach(function (i, s) {
                      let o;
                      i?.options &&
                        void 0 !== i.name &&
                        void 0 !== (o = t.nameToX(i)) &&
                        o !== i.x &&
                        ((i.x = o), (e.xData[s] = o));
                    });
                }));
            }
            setAxisTranslation() {
              let t = this,
                e = t.max - t.min,
                i = t.linkedParent,
                s = !!t.categories,
                o = t.isXAxis,
                r = t.axisPointRange || 0,
                a,
                n = 0,
                l = 0,
                h,
                d = t.transA;
              (o || s || r) &&
                ((a = t.getClosest()),
                i
                  ? ((n = i.minPointOffset), (l = i.pointRangePadding))
                  : t.series.forEach(function (e) {
                      let i = s
                          ? 1
                          : o
                          ? E(e.options.pointRange, a, 0)
                          : t.axisPointRange || 0,
                        h = e.options.pointPlacement;
                      if (((r = Math.max(r, i)), !t.single || s)) {
                        let t = e.is("xrange") ? !o : o;
                        (n = Math.max(n, t && P(h) ? 0 : i / 2)),
                          (l = Math.max(l, t && "on" === h ? 0 : i));
                      }
                    }),
                (h =
                  t.ordinal && t.ordinal.slope && a ? t.ordinal.slope / a : 1),
                (t.minPointOffset = n *= h),
                (t.pointRangePadding = l *= h),
                (t.pointRange = Math.min(r, t.single && s ? 1 : e)),
                o && a && (t.closestPointRange = a)),
                (t.translationSlope =
                  t.transA =
                  d =
                    t.staticScale || t.len / (e + l || 1)),
                (t.transB = t.horiz ? t.left : t.bottom),
                (t.minPixelPadding = d * n),
                M(this, "afterSetAxisTranslation");
            }
            minFromRange() {
              let { max: t, min: e } = this;
              return (T(t) && T(e) && t - e) || void 0;
            }
            setTickInterval(t) {
              let {
                  categories: e,
                  chart: i,
                  dataMax: s,
                  dataMin: o,
                  dateTime: r,
                  isXAxis: a,
                  logarithmic: n,
                  options: l,
                  softThreshold: h,
                } = this,
                d = T(this.threshold) ? this.threshold : void 0,
                c = this.minRange || 0,
                {
                  ceiling: p,
                  floor: u,
                  linkedTo: g,
                  softMax: f,
                  softMin: m,
                } = l,
                b = T(g) && i[this.coll]?.[g],
                v = l.tickPixelInterval,
                k = l.maxPadding,
                C = l.minPadding,
                A = 0,
                w,
                P =
                  T(l.tickInterval) && l.tickInterval >= 0
                    ? l.tickInterval
                    : void 0,
                O,
                L,
                D,
                B;
              if (
                (r || e || b || this.getTickAmount(),
                (D = E(this.userMin, l.min)),
                (B = E(this.userMax, l.max)),
                b
                  ? ((this.linkedParent = b),
                    (w = b.getExtremes()),
                    (this.min = E(w.min, w.dataMin)),
                    (this.max = E(w.max, w.dataMax)),
                    l.type !== b.options.type && S(11, !0, i))
                  : (h &&
                      y(d) &&
                      T(s) &&
                      T(o) &&
                      (o >= d
                        ? ((O = d), (C = 0))
                        : s <= d && ((L = d), (k = 0))),
                    (this.min = E(D, O, o)),
                    (this.max = E(B, L, s))),
                T(this.max) &&
                  T(this.min) &&
                  (n &&
                    (this.positiveValuesOnly &&
                      !t &&
                      0 >= Math.min(this.min, E(o, this.min)) &&
                      S(10, !0, i),
                    (this.min = x(n.log2lin(this.min), 16)),
                    (this.max = x(n.log2lin(this.max), 16))),
                  this.range &&
                    T(o) &&
                    ((this.userMin =
                      this.min =
                      D =
                        Math.max(o, this.minFromRange() || 0)),
                    (this.userMax = B = this.max),
                    (this.range = void 0))),
                M(this, "foundExtremes"),
                this.adjustForMinRange(),
                T(this.min) && T(this.max))
              ) {
                if (
                  (!T(this.userMin) &&
                    T(m) &&
                    m < this.min &&
                    (this.min = D = m),
                  !T(this.userMax) &&
                    T(f) &&
                    f > this.max &&
                    (this.max = B = f),
                  e ||
                    this.axisPointRange ||
                    this.stacking?.usePercentage ||
                    b ||
                    !(A = this.max - this.min) ||
                    (!y(D) && C && (this.min -= A * C),
                    y(B) || !k || (this.max += A * k)),
                  !T(this.userMin) &&
                    T(u) &&
                    (this.min = Math.max(this.min, u)),
                  !T(this.userMax) &&
                    T(p) &&
                    (this.max = Math.min(this.max, p)),
                  h && T(o) && T(s))
                ) {
                  let t = d || 0;
                  !y(D) && this.min < t && o >= t
                    ? (this.min = l.minRange ? Math.min(t, this.max - c) : t)
                    : !y(B) &&
                      this.max > t &&
                      s <= t &&
                      (this.max = l.minRange ? Math.max(t, this.min + c) : t);
                }
                !i.polar &&
                  this.min > this.max &&
                  (y(l.min)
                    ? (this.max = this.min)
                    : y(l.max) && (this.min = this.max)),
                  (A = this.max - this.min);
              }
              if (
                (this.min !== this.max && T(this.min) && T(this.max)
                  ? b && !P && v === b.options.tickPixelInterval
                    ? (this.tickInterval = P = b.tickInterval)
                    : (this.tickInterval = E(
                        P,
                        this.tickAmount
                          ? A / Math.max(this.tickAmount - 1, 1)
                          : void 0,
                        e ? 1 : (A * v) / Math.max(this.len, v)
                      ))
                  : (this.tickInterval = 1),
                a && !t)
              ) {
                let t =
                  this.min !== this.old?.min || this.max !== this.old?.max;
                this.series.forEach(function (e) {
                  (e.forceCrop = e.forceCropping?.()), e.processData(t);
                }),
                  M(this, "postProcessData", { hasExtremesChanged: t });
              }
              this.setAxisTranslation(),
                M(this, "initialAxisTranslation"),
                this.pointRange &&
                  !P &&
                  (this.tickInterval = Math.max(
                    this.pointRange,
                    this.tickInterval
                  ));
              let j = E(
                l.minTickInterval,
                r && !this.series.some((t) => t.noSharedTooltip)
                  ? this.closestPointRange
                  : 0
              );
              !P && this.tickInterval < j && (this.tickInterval = j),
                r || n || P || (this.tickInterval = z(this, this.tickInterval)),
                this.tickAmount || (this.tickInterval = this.unsquish()),
                this.setTickPositions();
            }
            setTickPositions() {
              let t = this.options,
                e = t.tickPositions,
                i = t.tickPositioner,
                s = this.getMinorTickInterval(),
                o = !this.isPanning,
                r = o && t.startOnTick,
                a = o && t.endOnTick,
                n = [],
                l;
              if (
                ((this.tickmarkOffset =
                  this.categories &&
                  "between" === t.tickmarkPlacement &&
                  1 === this.tickInterval
                    ? 0.5
                    : 0),
                (this.minorTickInterval =
                  "auto" === s && this.tickInterval
                    ? this.tickInterval / t.minorTicksPerMajor
                    : s),
                (this.single =
                  this.min === this.max &&
                  y(this.min) &&
                  !this.tickAmount &&
                  (this.min % 1 == 0 || !1 !== t.allowDecimals)),
                e)
              )
                n = e.slice();
              else if (T(this.min) && T(this.max)) {
                if (
                  !this.ordinal?.positions &&
                  (this.max - this.min) / this.tickInterval >
                    Math.max(2 * this.len, 200)
                )
                  (n = [this.min, this.max]), S(19, !1, this.chart);
                else if (this.dateTime)
                  n = this.getTimeTicks(
                    this.dateTime.normalizeTimeTickInterval(
                      this.tickInterval,
                      t.units
                    ),
                    this.min,
                    this.max,
                    t.startOfWeek,
                    this.ordinal?.positions,
                    this.closestPointRange,
                    !0
                  );
                else if (this.logarithmic)
                  n = this.logarithmic.getLogTickPositions(
                    this.tickInterval,
                    this.min,
                    this.max
                  );
                else {
                  let t = this.tickInterval,
                    e = t;
                  for (; e <= 2 * t; )
                    if (
                      ((n = this.getLinearTickPositions(
                        this.tickInterval,
                        this.min,
                        this.max
                      )),
                      this.tickAmount && n.length > this.tickAmount)
                    )
                      this.tickInterval = z(this, (e *= 1.1));
                    else break;
                }
                n.length > this.len &&
                  (n = [n[0], n[n.length - 1]])[0] === n[1] &&
                  (n.length = 1),
                  i &&
                    ((this.tickPositions = n),
                    (l = i.apply(this, [this.min, this.max])) && (n = l));
              }
              (this.tickPositions = n),
                (this.paddedTicks = n.slice(0)),
                this.trimTicks(n, r, a),
                !this.isLinked &&
                  T(this.min) &&
                  T(this.max) &&
                  (this.single &&
                    n.length < 2 &&
                    !this.categories &&
                    !this.series.some(
                      (t) =>
                        t.is("heatmap") &&
                        "between" === t.options.pointPlacement
                    ) &&
                    ((this.min -= 0.5), (this.max += 0.5)),
                  e || l || this.adjustTickAmount()),
                M(this, "afterSetTickPositions");
            }
            trimTicks(t, e, i) {
              let s = t[0],
                o = t[t.length - 1],
                r = (!this.isOrdinal && this.minPointOffset) || 0;
              if ((M(this, "trimTicks"), !this.isLinked)) {
                if (e && s !== -1 / 0) this.min = s;
                else for (; this.min - r > t[0]; ) t.shift();
                if (i) this.max = o;
                else for (; this.max + r < t[t.length - 1]; ) t.pop();
                0 === t.length &&
                  y(s) &&
                  !this.options.tickPositions &&
                  t.push((o + s) / 2);
              }
            }
            alignToOthers() {
              let t;
              let e = this,
                i = e.chart,
                s = [this],
                o = e.options,
                r = i.options.chart,
                a = "yAxis" === this.coll && r.alignThresholds,
                n = [];
              if (
                ((e.thresholdAlignment = void 0),
                ((!1 !== r.alignTicks && o.alignTicks) || a) &&
                  !1 !== o.startOnTick &&
                  !1 !== o.endOnTick &&
                  !e.logarithmic)
              ) {
                let o = (t) => {
                    let { horiz: e, options: i } = t;
                    return [e ? i.left : i.top, i.width, i.height, i.pane].join(
                      ","
                    );
                  },
                  r = o(this);
                i[this.coll].forEach(function (i) {
                  let { series: a } = i;
                  a.length &&
                    a.some((t) => t.visible) &&
                    i !== e &&
                    o(i) === r &&
                    ((t = !0), s.push(i));
                });
              }
              if (t && a) {
                s.forEach((t) => {
                  let i = t.getThresholdAlignment(e);
                  T(i) && n.push(i);
                });
                let t =
                  n.length > 1
                    ? n.reduce((t, e) => (t += e), 0) / n.length
                    : void 0;
                s.forEach((e) => {
                  e.thresholdAlignment = t;
                });
              }
              return t;
            }
            getThresholdAlignment(t) {
              if (
                ((!T(this.dataMin) ||
                  (this !== t &&
                    this.series.some((t) => t.isDirty || t.isDirtyData))) &&
                  this.getSeriesExtremes(),
                T(this.threshold))
              ) {
                let t = m(
                  (this.threshold - (this.dataMin || 0)) /
                    ((this.dataMax || 0) - (this.dataMin || 0)),
                  0,
                  1
                );
                return this.options.reversed && (t = 1 - t), t;
              }
            }
            getTickAmount() {
              let t = this.options,
                e = t.tickPixelInterval,
                i = t.tickAmount;
              y(t.tickInterval) ||
                i ||
                !(this.len < e) ||
                this.isRadial ||
                this.logarithmic ||
                !t.startOnTick ||
                !t.endOnTick ||
                (i = 2),
                !i && this.alignToOthers() && (i = Math.ceil(this.len / e) + 1),
                i < 4 && ((this.finalTickAmt = i), (i = 5)),
                (this.tickAmount = i);
            }
            adjustTickAmount() {
              let t = this,
                {
                  finalTickAmt: e,
                  max: i,
                  min: s,
                  options: o,
                  tickPositions: r,
                  tickAmount: a,
                  thresholdAlignment: n,
                } = t,
                l = r?.length,
                h = E(t.threshold, t.softThreshold ? 0 : null),
                d,
                c,
                p = t.tickInterval,
                u,
                g = () => r.push(x(r[r.length - 1] + p)),
                f = () => r.unshift(x(r[0] - p));
              if (
                (T(n) &&
                  ((u =
                    n < 0.5 ? Math.ceil(n * (a - 1)) : Math.floor(n * (a - 1))),
                  o.reversed && (u = a - 1 - u)),
                t.hasData() && T(s) && T(i))
              ) {
                let n = () => {
                  (t.transA *= (l - 1) / (a - 1)),
                    (t.min = o.startOnTick ? r[0] : Math.min(s, r[0])),
                    (t.max = o.endOnTick
                      ? r[r.length - 1]
                      : Math.max(i, r[r.length - 1]));
                };
                if (T(u) && T(t.threshold)) {
                  for (
                    ;
                    r[u] !== h ||
                    r.length !== a ||
                    r[0] > s ||
                    r[r.length - 1] < i;

                  ) {
                    for (r.length = 0, r.push(t.threshold); r.length < a; )
                      void 0 === r[u] || r[u] > t.threshold ? f() : g();
                    if (p > 8 * t.tickInterval) break;
                    p *= 2;
                  }
                  n();
                } else if (l < a) {
                  for (; r.length < a; ) r.length % 2 || s === h ? g() : f();
                  n();
                }
                if (y(e)) {
                  for (c = d = r.length; c--; )
                    ((3 === e && c % 2 == 1) ||
                      (e <= 2 && c > 0 && c < d - 1)) &&
                      r.splice(c, 1);
                  t.finalTickAmt = void 0;
                }
              }
            }
            setScale() {
              let { coll: t, stacking: e } = this,
                i = !1,
                s = !1;
              this.series.forEach((t) => {
                (i = i || t.isDirtyData || t.isDirty),
                  (s = s || (t.xAxis && t.xAxis.isDirty) || !1);
              }),
                this.setAxisSize();
              let o = this.len !== (this.old && this.old.len);
              o ||
              i ||
              s ||
              this.isLinked ||
              this.forceRedraw ||
              this.userMin !== (this.old && this.old.userMin) ||
              this.userMax !== (this.old && this.old.userMax) ||
              this.alignToOthers()
                ? (e && "yAxis" === t && e.buildStacks(),
                  (this.forceRedraw = !1),
                  this.userMinRange || (this.minRange = void 0),
                  this.getSeriesExtremes(),
                  this.setTickInterval(),
                  e && "xAxis" === t && e.buildStacks(),
                  this.isDirty ||
                    (this.isDirty =
                      o ||
                      this.min !== this.old?.min ||
                      this.max !== this.old?.max))
                : e && e.cleanStacks(),
                i && delete this.allExtremes,
                M(this, "afterSetScale");
            }
            setExtremes(t, e, i = !0, s, o) {
              this.series.forEach((t) => {
                delete t.kdTree;
              }),
                M(this, "setExtremes", (o = k(o, { min: t, max: e })), (t) => {
                  (this.userMin = t.min),
                    (this.userMax = t.max),
                    (this.eventArgs = t),
                    i && this.chart.redraw(s);
                });
            }
            setAxisSize() {
              let t = this.chart,
                e = this.options,
                i = e.offsets || [0, 0, 0, 0],
                s = this.horiz,
                o = (this.width = Math.round(
                  B(E(e.width, t.plotWidth - i[3] + i[1]), t.plotWidth)
                )),
                r = (this.height = Math.round(
                  B(E(e.height, t.plotHeight - i[0] + i[2]), t.plotHeight)
                )),
                a = (this.top = Math.round(
                  B(E(e.top, t.plotTop + i[0]), t.plotHeight, t.plotTop)
                )),
                n = (this.left = Math.round(
                  B(E(e.left, t.plotLeft + i[3]), t.plotWidth, t.plotLeft)
                ));
              (this.bottom = t.chartHeight - r - a),
                (this.right = t.chartWidth - o - n),
                (this.len = Math.max(s ? o : r, 0)),
                (this.pos = s ? n : a);
            }
            getExtremes() {
              let t = this.logarithmic;
              return {
                min: t ? x(t.lin2log(this.min)) : this.min,
                max: t ? x(t.lin2log(this.max)) : this.max,
                dataMin: this.dataMin,
                dataMax: this.dataMax,
                userMin: this.userMin,
                userMax: this.userMax,
              };
            }
            getThreshold(t) {
              let e = this.logarithmic,
                i = e ? e.lin2log(this.min) : this.min,
                s = e ? e.lin2log(this.max) : this.max;
              return (
                null === t || t === -1 / 0
                  ? (t = i)
                  : t === 1 / 0
                  ? (t = s)
                  : i > t
                  ? (t = i)
                  : s < t && (t = s),
                this.translate(t, 0, 1, 0, 1)
              );
            }
            autoLabelAlign(t) {
              let e = (E(t, 0) - 90 * this.side + 720) % 360,
                i = { align: "center" };
              return (
                M(this, "autoLabelAlign", i, function (t) {
                  e > 15 && e < 165
                    ? (t.align = "right")
                    : e > 195 && e < 345 && (t.align = "left");
                }),
                i.align
              );
            }
            tickSize(t) {
              let e = this.options,
                i = E(
                  e["tick" === t ? "tickWidth" : "minorTickWidth"],
                  "tick" === t && this.isXAxis && !this.categories ? 1 : 0
                ),
                s = e["tick" === t ? "tickLength" : "minorTickLength"],
                o;
              i &&
                s &&
                ("inside" === e[t + "Position"] && (s = -s), (o = [s, i]));
              let r = { tickSize: o };
              return M(this, "afterTickSize", r), r.tickSize;
            }
            labelMetrics() {
              let t = this.chart.renderer,
                e = this.ticks,
                i = e[Object.keys(e)[0]] || {};
              return this.chart.renderer.fontMetrics(
                i.label || i.movedLabel || t.box
              );
            }
            unsquish() {
              let t = this.options.labels,
                e = t.padding || 0,
                i = this.horiz,
                s = this.tickInterval,
                o =
                  this.len /
                  (((this.categories ? 1 : 0) + this.max - this.min) / s),
                r = t.rotation,
                a = x(0.8 * this.labelMetrics().h),
                n = Math.max(this.max - this.min, 0),
                l = function (t) {
                  let i = (t + 2 * e) / (o || 1);
                  return (
                    (i = i > 1 ? Math.ceil(i) : 1) * s > n &&
                      t !== 1 / 0 &&
                      o !== 1 / 0 &&
                      n &&
                      (i = Math.ceil(n / s)),
                    x(i * s)
                  );
                },
                h = s,
                d,
                c = Number.MAX_VALUE,
                p;
              if (i) {
                if (
                  (!t.staggerLines &&
                    (T(r)
                      ? (p = [r])
                      : o < t.autoRotationLimit && (p = t.autoRotation)),
                  p)
                ) {
                  let t, e;
                  for (let i of p)
                    (i === r || (i && i >= -90 && i <= 90)) &&
                      (e =
                        (t = l(Math.abs(a / Math.sin(u * i)))) +
                        Math.abs(i / 360)) < c &&
                      ((c = e), (d = i), (h = t));
                }
              } else h = l(0.75 * a);
              return (
                (this.autoRotation = p),
                (this.labelRotation = E(d, T(r) ? r : 0)),
                t.step ? s : h
              );
            }
            getSlotWidth(t) {
              let e = this.chart,
                i = this.horiz,
                s = this.options.labels,
                o = Math.max(
                  this.tickPositions.length - (this.categories ? 0 : 1),
                  1
                ),
                r = e.margin[3];
              if (t && T(t.slotWidth)) return t.slotWidth;
              if (i && s.step < 2)
                return s.rotation
                  ? 0
                  : ((this.staggerLines || 1) * this.len) / o;
              if (!i) {
                let t = s.style.width;
                if (void 0 !== t) return parseInt(String(t), 10);
                if (r) return r - e.spacing[3];
              }
              return 0.33 * e.chartWidth;
            }
            renderUnsquish() {
              let t = this.chart,
                e = t.renderer,
                i = this.tickPositions,
                s = this.ticks,
                o = this.options.labels,
                r = o.style,
                a = this.horiz,
                n = this.getSlotWidth(),
                l = Math.max(
                  1,
                  Math.round(n - (a ? 2 * (o.padding || 0) : o.distance || 0))
                ),
                h = {},
                d = this.labelMetrics(),
                c = r.textOverflow,
                p,
                u,
                g = 0,
                f,
                m;
              if (
                (P(o.rotation) || (h.rotation = o.rotation || 0),
                i.forEach(function (t) {
                  let e = s[t];
                  e.movedLabel && e.replaceMovedLabel(),
                    e &&
                      e.label &&
                      e.label.textPxLength > g &&
                      (g = e.label.textPxLength);
                }),
                (this.maxLabelLength = g),
                this.autoRotation)
              )
                g > l && g > d.h
                  ? (h.rotation = this.labelRotation)
                  : (this.labelRotation = 0);
              else if (n && ((p = l), !c))
                for (u = "clip", m = i.length; !a && m--; )
                  (f = s[i[m]].label) &&
                    ("ellipsis" === f.styles.textOverflow
                      ? f.css({ textOverflow: "clip" })
                      : f.textPxLength > n && f.css({ width: n + "px" }),
                    f.getBBox().height > this.len / i.length - (d.h - d.f) &&
                      (f.specificTextOverflow = "ellipsis"));
              h.rotation &&
                ((p = g > 0.5 * t.chartHeight ? 0.33 * t.chartHeight : g),
                c || (u = "ellipsis")),
                (this.labelAlign =
                  o.align || this.autoLabelAlign(this.labelRotation)),
                this.labelAlign && (h.align = this.labelAlign),
                i.forEach(function (t) {
                  let e = s[t],
                    i = e && e.label,
                    o = r.width,
                    a = {};
                  i &&
                    (i.attr(h),
                    e.shortenLabel
                      ? e.shortenLabel()
                      : p &&
                        !o &&
                        "nowrap" !== r.whiteSpace &&
                        (p < i.textPxLength || "SPAN" === i.element.tagName)
                      ? ((a.width = p + "px"),
                        c || (a.textOverflow = i.specificTextOverflow || u),
                        i.css(a))
                      : !i.styles.width ||
                        a.width ||
                        o ||
                        i.css({ width: null }),
                    delete i.specificTextOverflow,
                    (e.rotation = h.rotation));
                }, this),
                (this.tickRotCorr = e.rotCorr(
                  d.b,
                  this.labelRotation || 0,
                  0 !== this.side
                ));
            }
            hasData() {
              return (
                this.series.some(function (t) {
                  return t.hasData();
                }) ||
                (this.options.showEmpty && y(this.min) && y(this.max))
              );
            }
            addTitle(t) {
              let e;
              let i = this.chart.renderer,
                s = this.horiz,
                o = this.opposite,
                r = this.options.title,
                a = this.chart.styledMode;
              this.axisTitle ||
                ((e = r.textAlign) ||
                  (e = (
                    s
                      ? { low: "left", middle: "center", high: "right" }
                      : {
                          low: o ? "right" : "left",
                          middle: "center",
                          high: o ? "left" : "right",
                        }
                  )[r.align]),
                (this.axisTitle = i
                  .text(r.text || "", 0, 0, r.useHTML)
                  .attr({ zIndex: 7, rotation: r.rotation || 0, align: e })
                  .addClass("highcharts-axis-title")),
                a || this.axisTitle.css(O(r.style)),
                this.axisTitle.add(this.axisGroup),
                (this.axisTitle.isNew = !0)),
                a ||
                  r.style.width ||
                  this.isRadial ||
                  this.axisTitle.css({ width: this.len + "px" }),
                this.axisTitle[t ? "show" : "hide"](t);
            }
            generateTick(t) {
              let e = this.ticks;
              e[t] ? e[t].addLabel() : (e[t] = new a(this, t));
            }
            createGroups() {
              let { axisParent: t, chart: e, coll: i, options: s } = this,
                o = e.renderer,
                r = (e, r, a) =>
                  o
                    .g(e)
                    .attr({ zIndex: a })
                    .addClass(
                      `highcharts-${i.toLowerCase()}${r} ` +
                        (this.isRadial ? `highcharts-radial-axis${r} ` : "") +
                        (s.className || "")
                    )
                    .add(t);
              this.axisGroup ||
                ((this.gridGroup = r("grid", "-grid", s.gridZIndex)),
                (this.axisGroup = r("axis", "", s.zIndex)),
                (this.labelGroup = r(
                  "axis-labels",
                  "-labels",
                  s.labels.zIndex
                )));
            }
            getOffset() {
              let t = this,
                {
                  chart: e,
                  horiz: i,
                  options: s,
                  side: o,
                  ticks: r,
                  tickPositions: a,
                  coll: n,
                } = t,
                l = e.inverted && !t.isZAxis ? [1, 0, 3, 2][o] : o,
                h = t.hasData(),
                d = s.title,
                c = s.labels,
                p = T(s.crossing),
                u = e.axisOffset,
                g = e.clipOffset,
                f = [-1, 1, 1, -1][o],
                m,
                x = 0,
                b,
                v = 0,
                S = 0,
                k,
                C;
              if (
                ((t.showAxis = m = h || s.showEmpty),
                (t.staggerLines = (t.horiz && c.staggerLines) || void 0),
                t.createGroups(),
                h || t.isLinked
                  ? (a.forEach(function (e) {
                      t.generateTick(e);
                    }),
                    t.renderUnsquish(),
                    (t.reserveSpaceDefault =
                      0 === o ||
                      2 === o ||
                      { 1: "left", 3: "right" }[o] === t.labelAlign),
                    E(
                      c.reserveSpace,
                      !p && null,
                      "center" === t.labelAlign || null,
                      t.reserveSpaceDefault
                    ) &&
                      a.forEach(function (t) {
                        S = Math.max(r[t].getLabelSize(), S);
                      }),
                    t.staggerLines && (S *= t.staggerLines),
                    (t.labelOffset = S * (t.opposite ? -1 : 1)))
                  : D(r, function (t, e) {
                      t.destroy(), delete r[e];
                    }),
                d?.text &&
                  !1 !== d.enabled &&
                  (t.addTitle(m),
                  m &&
                    !p &&
                    !1 !== d.reserveSpace &&
                    ((t.titleOffset = x =
                      t.axisTitle.getBBox()[i ? "height" : "width"]),
                    (v = y((b = d.offset)) ? 0 : E(d.margin, i ? 5 : 10)))),
                t.renderLine(),
                (t.offset = f * E(s.offset, u[o] ? u[o] + (s.margin || 0) : 0)),
                (t.tickRotCorr = t.tickRotCorr || { x: 0, y: 0 }),
                (C =
                  0 === o
                    ? -t.labelMetrics().h
                    : 2 === o
                    ? t.tickRotCorr.y
                    : 0),
                (k = Math.abs(S) + v),
                S &&
                  ((k -= C),
                  (k +=
                    f *
                    (i
                      ? E(c.y, t.tickRotCorr.y + f * c.distance)
                      : E(c.x, f * c.distance)))),
                (t.axisTitleMargin = E(b, k)),
                t.getMaxLabelDimensions &&
                  (t.maxLabelDimensions = t.getMaxLabelDimensions(r, a)),
                "colorAxis" !== n && g)
              ) {
                let e = this.tickSize("tick");
                u[o] = Math.max(
                  u[o],
                  (t.axisTitleMargin || 0) + x + f * t.offset,
                  k,
                  a && a.length && e ? e[0] + f * t.offset : 0
                );
                let i =
                  !t.axisLine || s.offset ? 0 : t.axisLine.strokeWidth() / 2;
                g[l] = Math.max(g[l], i);
              }
              M(this, "afterGetOffset");
            }
            getLinePath(t) {
              let e = this.chart,
                i = this.opposite,
                s = this.offset,
                o = this.horiz,
                r = this.left + (i ? this.width : 0) + s,
                a = e.chartHeight - this.bottom - (i ? this.height : 0) + s;
              return (
                i && (t *= -1),
                e.renderer.crispLine(
                  [
                    ["M", o ? this.left : r, o ? a : this.top],
                    [
                      "L",
                      o ? e.chartWidth - this.right : r,
                      o ? a : e.chartHeight - this.bottom,
                    ],
                  ],
                  t
                )
              );
            }
            renderLine() {
              this.axisLine ||
                ((this.axisLine = this.chart.renderer
                  .path()
                  .addClass("highcharts-axis-line")
                  .add(this.axisGroup)),
                this.chart.styledMode ||
                  this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7,
                  }));
            }
            getTitlePosition(t) {
              let e = this.horiz,
                i = this.left,
                s = this.top,
                o = this.len,
                r = this.options.title,
                a = e ? i : s,
                n = this.opposite,
                l = this.offset,
                h = r.x,
                d = r.y,
                c = this.chart.renderer.fontMetrics(t),
                p = t ? Math.max(t.getBBox(!1, 0).height - c.h - 1, 0) : 0,
                u = {
                  low: a + (e ? 0 : o),
                  middle: a + o / 2,
                  high: a + (e ? o : 0),
                }[r.align],
                g =
                  (e ? s + this.height : i) +
                  (e ? 1 : -1) * (n ? -1 : 1) * (this.axisTitleMargin || 0) +
                  [-p, p, c.f, -p][this.side],
                f = {
                  x: e ? u + h : g + (n ? this.width : 0) + l + h,
                  y: e ? g + d - (n ? this.height : 0) + l : u + d,
                };
              return M(this, "afterGetTitlePosition", { titlePosition: f }), f;
            }
            renderMinorTick(t, e) {
              let i = this.minorTicks;
              i[t] || (i[t] = new a(this, t, "minor")),
                e && i[t].isNew && i[t].render(null, !0),
                i[t].render(null, !1, 1);
            }
            renderTick(t, e, i) {
              let s = this.isLinked,
                o = this.ticks;
              (!s ||
                (t >= this.min && t <= this.max) ||
                (this.grid && this.grid.isColumn)) &&
                (o[t] || (o[t] = new a(this, t)),
                i && o[t].isNew && o[t].render(e, !0, -1),
                o[t].render(e));
            }
            render() {
              let t, e;
              let i = this,
                s = i.chart,
                o = i.logarithmic,
                n = s.renderer,
                h = i.options,
                d = i.isLinked,
                c = i.tickPositions,
                p = i.axisTitle,
                u = i.ticks,
                g = i.minorTicks,
                f = i.alternateBands,
                m = h.stackLabels,
                x = h.alternateGridColor,
                y = h.crossing,
                b = i.tickmarkOffset,
                v = i.axisLine,
                S = i.showAxis,
                k = l(n.globalAnimation);
              if (
                ((i.labelEdge.length = 0),
                (i.overlap = !1),
                [u, g, f].forEach(function (t) {
                  D(t, function (t) {
                    t.isActive = !1;
                  });
                }),
                T(y))
              ) {
                let t = this.isXAxis ? s.yAxis[0] : s.xAxis[0],
                  e = [1, -1, -1, 1][this.side];
                if (t) {
                  let s = t.toPixels(y, !0);
                  i.horiz && (s = t.len - s), (i.offset = e * s);
                }
              }
              if (i.hasData() || d) {
                let n = i.chart.hasRendered && i.old && T(i.old.min);
                i.minorTickInterval &&
                  !i.categories &&
                  i.getMinorTickPositions().forEach(function (t) {
                    i.renderMinorTick(t, n);
                  }),
                  c.length &&
                    (c.forEach(function (t, e) {
                      i.renderTick(t, e, n);
                    }),
                    b &&
                      (0 === i.min || i.single) &&
                      (u[-1] || (u[-1] = new a(i, -1, null, !0)),
                      u[-1].render(-1))),
                  x &&
                    c.forEach(function (a, n) {
                      (e = void 0 !== c[n + 1] ? c[n + 1] + b : i.max - b),
                        n % 2 == 0 &&
                          a < i.max &&
                          e <= i.max + (s.polar ? -b : b) &&
                          (f[a] || (f[a] = new r.PlotLineOrBand(i, {})),
                          (t = a + b),
                          (f[a].options = {
                            from: o ? o.lin2log(t) : t,
                            to: o ? o.lin2log(e) : e,
                            color: x,
                            className: "highcharts-alternate-grid",
                          }),
                          f[a].render(),
                          (f[a].isActive = !0));
                    }),
                  i._addedPlotLB ||
                    ((i._addedPlotLB = !0),
                    (h.plotLines || [])
                      .concat(h.plotBands || [])
                      .forEach(function (t) {
                        i.addPlotBandOrLine(t);
                      }));
              }
              [u, g, f].forEach(function (t) {
                let e = [],
                  i = k.duration;
                D(t, function (t, i) {
                  t.isActive ||
                    (t.render(i, !1, 0), (t.isActive = !1), e.push(i));
                }),
                  I(
                    function () {
                      let i = e.length;
                      for (; i--; )
                        t[e[i]] &&
                          !t[e[i]].isActive &&
                          (t[e[i]].destroy(), delete t[e[i]]);
                    },
                    t !== f && s.hasRendered && i ? i : 0
                  );
              }),
                v &&
                  (v[v.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(v.strokeWidth()),
                  }),
                  (v.isPlaced = !0),
                  v[S ? "show" : "hide"](S)),
                p &&
                  S &&
                  (p[p.isNew ? "attr" : "animate"](i.getTitlePosition(p)),
                  (p.isNew = !1)),
                m && m.enabled && i.stacking && i.stacking.renderStackTotals(),
                (i.old = {
                  len: i.len,
                  max: i.max,
                  min: i.min,
                  transA: i.transA,
                  userMax: i.userMax,
                  userMin: i.userMin,
                }),
                (i.isDirty = !1),
                M(this, "afterRender");
            }
            redraw() {
              this.visible &&
                (this.render(),
                this.plotLinesAndBands.forEach(function (t) {
                  t.render();
                })),
                this.series.forEach(function (t) {
                  t.isDirty = !0;
                });
            }
            getKeepProps() {
              return this.keepProps || G.keepProps;
            }
            destroy(t) {
              let e = this,
                i = e.plotLinesAndBands,
                s = this.eventOptions;
              if (
                (M(this, "destroy", { keepEvents: t }),
                t || j(e),
                [e.ticks, e.minorTicks, e.alternateBands].forEach(function (t) {
                  b(t);
                }),
                i)
              ) {
                let t = i.length;
                for (; t--; ) i[t].destroy();
              }
              for (let t in ([
                "axisLine",
                "axisTitle",
                "axisGroup",
                "gridGroup",
                "labelGroup",
                "cross",
                "scrollbar",
              ].forEach(function (t) {
                e[t] && (e[t] = e[t].destroy());
              }),
              e.plotLinesAndBandsGroups))
                e.plotLinesAndBandsGroups[t] =
                  e.plotLinesAndBandsGroups[t].destroy();
              D(e, function (t, i) {
                -1 === e.getKeepProps().indexOf(i) && delete e[i];
              }),
                (this.eventOptions = s);
            }
            drawCrosshair(t, e) {
              let s = this.crosshair,
                o = E(s && s.snap, !0),
                r = this.chart,
                a,
                n,
                l,
                h = this.cross,
                d;
              if (
                (M(this, "drawCrosshair", { e: t, point: e }),
                t || (t = this.cross && this.cross.e),
                s && !1 !== (y(e) || !o))
              ) {
                if (
                  (o
                    ? y(e) &&
                      (n = E(
                        "colorAxis" !== this.coll ? e.crosshairPos : null,
                        this.isXAxis ? e.plotX : this.len - e.plotY
                      ))
                    : (n =
                        t &&
                        (this.horiz
                          ? t.chartX - this.pos
                          : this.len - t.chartY + this.pos)),
                  y(n) &&
                    ((d = {
                      value: e && (this.isXAxis ? e.x : E(e.stackY, e.y)),
                      translatedValue: n,
                    }),
                    r.polar &&
                      k(d, {
                        isCrosshair: !0,
                        chartX: t && t.chartX,
                        chartY: t && t.chartY,
                        point: e,
                      }),
                    (a = this.getPlotLinePath(d) || null)),
                  !y(a))
                ) {
                  this.hideCrosshair();
                  return;
                }
                (l = this.categories && !this.isRadial),
                  h ||
                    ((this.cross = h =
                      r.renderer
                        .path()
                        .addClass(
                          "highcharts-crosshair highcharts-crosshair-" +
                            (l ? "category " : "thin ") +
                            (s.className || "")
                        )
                        .attr({ zIndex: E(s.zIndex, 2) })
                        .add()),
                    !r.styledMode &&
                      (h
                        .attr({
                          stroke:
                            s.color ||
                            (l
                              ? i.parse("#ccd3ff").setOpacity(0.25).get()
                              : "#cccccc"),
                          "stroke-width": E(s.width, 1),
                        })
                        .css({ "pointer-events": "none" }),
                      s.dashStyle && h.attr({ dashstyle: s.dashStyle }))),
                  h.show().attr({ d: a }),
                  l && !s.width && h.attr({ "stroke-width": this.transA }),
                  (this.cross.e = t);
              } else this.hideCrosshair();
              M(this, "afterDrawCrosshair", { e: t, point: e });
            }
            hideCrosshair() {
              this.cross && this.cross.hide(), M(this, "afterHideCrosshair");
            }
            update(t, e) {
              let i = this.chart;
              (t = O(this.userOptions, t)),
                this.destroy(!0),
                this.init(i, t),
                (i.isDirtyBox = !0),
                E(e, !0) && i.redraw();
            }
            remove(t) {
              let e = this.chart,
                i = this.coll,
                s = this.series,
                o = s.length;
              for (; o--; ) s[o] && s[o].remove(!1);
              v(e.axes, this),
                v(e[i] || [], this),
                e.orderItems(i),
                this.destroy(),
                (e.isDirtyBox = !0),
                E(t, !0) && e.redraw();
            }
            setTitle(t, e) {
              this.update({ title: t }, e);
            }
            setCategories(t, e) {
              this.update({ categories: t }, e);
            }
          }
          return (
            (G.keepProps = [
              "coll",
              "extKey",
              "hcEvents",
              "len",
              "names",
              "series",
              "userMax",
              "userMin",
            ]),
            G
          );
        }
      ),
      i(e, "Core/Axis/DateTimeAxis.js", [e["Core/Utilities.js"]], function (t) {
        var e;
        let {
          addEvent: i,
          getMagnitude: s,
          normalizeTickInterval: o,
          timeUnits: r,
        } = t;
        return (
          (function (t) {
            function e() {
              return this.chart.time.getTimeTicks.apply(
                this.chart.time,
                arguments
              );
            }
            function a() {
              if ("datetime" !== this.options.type) {
                this.dateTime = void 0;
                return;
              }
              this.dateTime || (this.dateTime = new n(this));
            }
            t.compose = function (t) {
              return (
                t.keepProps.includes("dateTime") ||
                  (t.keepProps.push("dateTime"),
                  (t.prototype.getTimeTicks = e),
                  i(t, "afterSetOptions", a)),
                t
              );
            };
            class n {
              constructor(t) {
                this.axis = t;
              }
              normalizeTimeTickInterval(t, e) {
                let i = e || [
                    ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                    ["second", [1, 2, 5, 10, 15, 30]],
                    ["minute", [1, 2, 5, 10, 15, 30]],
                    ["hour", [1, 2, 3, 4, 6, 8, 12]],
                    ["day", [1, 2]],
                    ["week", [1, 2]],
                    ["month", [1, 2, 3, 4, 6]],
                    ["year", null],
                  ],
                  a = i[i.length - 1],
                  n = r[a[0]],
                  l = a[1],
                  h;
                for (
                  h = 0;
                  h < i.length &&
                  ((n = r[(a = i[h])[0]]),
                  (l = a[1]),
                  !i[h + 1] ||
                    !(t <= (n * l[l.length - 1] + r[i[h + 1][0]]) / 2));
                  h++
                );
                n === r.year && t < 5 * n && (l = [1, 2, 5]);
                let d = o(
                  t / n,
                  l,
                  "year" === a[0] ? Math.max(s(t / n), 1) : 1
                );
                return { unitRange: n, count: d, unitName: a[0] };
              }
              getXDateFormat(t, e) {
                let { axis: i } = this,
                  s = i.chart.time;
                return i.closestPointRange
                  ? s.getDateFormat(
                      i.closestPointRange,
                      t,
                      i.options.startOfWeek,
                      e
                    ) || s.resolveDTLFormat(e.year).main
                  : s.resolveDTLFormat(e.day).main;
              }
            }
            t.Additions = n;
          })(e || (e = {})),
          e
        );
      }),
      i(
        e,
        "Core/Axis/LogarithmicAxis.js",
        [e["Core/Utilities.js"]],
        function (t) {
          var e;
          let { addEvent: i, normalizeTickInterval: s, pick: o } = t;
          return (
            (function (t) {
              function e(t) {
                let e = t.userOptions,
                  i = this.logarithmic;
                "logarithmic" !== e.type
                  ? (this.logarithmic = void 0)
                  : i || (i = this.logarithmic = new a(this));
              }
              function r() {
                let t = this.logarithmic;
                t &&
                  ((this.lin2val = function (e) {
                    return t.lin2log(e);
                  }),
                  (this.val2lin = function (e) {
                    return t.log2lin(e);
                  }));
              }
              t.compose = function (t) {
                return (
                  t.keepProps.includes("logarithmic") ||
                    (t.keepProps.push("logarithmic"),
                    i(t, "init", e),
                    i(t, "afterInit", r)),
                  t
                );
              };
              class a {
                constructor(t) {
                  this.axis = t;
                }
                getLogTickPositions(t, e, i, r) {
                  let a = this.axis,
                    n = a.len,
                    l = a.options,
                    h = [];
                  if ((r || (this.minorAutoInterval = void 0), t >= 0.5))
                    (t = Math.round(t)),
                      (h = a.getLinearTickPositions(t, e, i));
                  else if (t >= 0.08) {
                    let s, o, a, n, l, d, c;
                    let p = Math.floor(e);
                    for (
                      s =
                        t > 0.3
                          ? [1, 2, 4]
                          : t > 0.15
                          ? [1, 2, 4, 6, 8]
                          : [1, 2, 3, 4, 5, 6, 7, 8, 9],
                        o = p;
                      o < i + 1 && !c;
                      o++
                    )
                      for (a = 0, n = s.length; a < n && !c; a++)
                        (l = this.log2lin(this.lin2log(o) * s[a])) > e &&
                          (!r || d <= i) &&
                          void 0 !== d &&
                          h.push(d),
                          d > i && (c = !0),
                          (d = l);
                  } else {
                    let d = this.lin2log(e),
                      c = this.lin2log(i),
                      p = r ? a.getMinorTickInterval() : l.tickInterval,
                      u = l.tickPixelInterval / (r ? 5 : 1),
                      g = r ? n / a.tickPositions.length : n;
                    (t = s(
                      (t = o(
                        "auto" === p ? null : p,
                        this.minorAutoInterval,
                        ((c - d) * u) / (g || 1)
                      ))
                    )),
                      (h = a.getLinearTickPositions(t, d, c).map(this.log2lin)),
                      r || (this.minorAutoInterval = t / 5);
                  }
                  return r || (a.tickInterval = t), h;
                }
                lin2log(t) {
                  return Math.pow(10, t);
                }
                log2lin(t) {
                  return Math.log(t) / Math.LN10;
                }
              }
              t.Additions = a;
            })(e || (e = {})),
            e
          );
        }
      ),
      i(
        e,
        "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js",
        [e["Core/Utilities.js"]],
        function (t) {
          var e;
          let { erase: i, extend: s, isNumber: o } = t;
          return (
            (function (t) {
              let e;
              function r(t) {
                return this.addPlotBandOrLine(t, "plotBands");
              }
              function a(t, i) {
                let s = this.userOptions,
                  o = new e(this, t);
                if ((this.visible && (o = o.render()), o)) {
                  if (
                    (this._addedPlotLB ||
                      ((this._addedPlotLB = !0),
                      (s.plotLines || [])
                        .concat(s.plotBands || [])
                        .forEach((t) => {
                          this.addPlotBandOrLine(t);
                        })),
                    i)
                  ) {
                    let e = s[i] || [];
                    e.push(t), (s[i] = e);
                  }
                  this.plotLinesAndBands.push(o);
                }
                return o;
              }
              function n(t) {
                return this.addPlotBandOrLine(t, "plotLines");
              }
              function l(t, e, i) {
                i = i || this.options;
                let s = this.getPlotLinePath({
                    value: e,
                    force: !0,
                    acrossPanes: i.acrossPanes,
                  }),
                  r = [],
                  a = this.horiz,
                  n =
                    !o(this.min) ||
                    !o(this.max) ||
                    (t < this.min && e < this.min) ||
                    (t > this.max && e > this.max),
                  l = this.getPlotLinePath({
                    value: t,
                    force: !0,
                    acrossPanes: i.acrossPanes,
                  }),
                  h,
                  d = 1,
                  c;
                if (l && s)
                  for (
                    n && ((c = l.toString() === s.toString()), (d = 0)), h = 0;
                    h < l.length;
                    h += 2
                  ) {
                    let t = l[h],
                      e = l[h + 1],
                      i = s[h],
                      o = s[h + 1];
                    ("M" === t[0] || "L" === t[0]) &&
                      ("M" === e[0] || "L" === e[0]) &&
                      ("M" === i[0] || "L" === i[0]) &&
                      ("M" === o[0] || "L" === o[0]) &&
                      (a && i[1] === t[1]
                        ? ((i[1] += d), (o[1] += d))
                        : a || i[2] !== t[2] || ((i[2] += d), (o[2] += d)),
                      r.push(
                        ["M", t[1], t[2]],
                        ["L", e[1], e[2]],
                        ["L", o[1], o[2]],
                        ["L", i[1], i[2]],
                        ["Z"]
                      )),
                      (r.isFlat = c);
                  }
                return r;
              }
              function h(t) {
                this.removePlotBandOrLine(t);
              }
              function d(t) {
                let e = this.plotLinesAndBands,
                  s = this.options,
                  o = this.userOptions;
                if (e) {
                  let r = e.length;
                  for (; r--; ) e[r].id === t && e[r].destroy();
                  [
                    s.plotLines || [],
                    o.plotLines || [],
                    s.plotBands || [],
                    o.plotBands || [],
                  ].forEach(function (e) {
                    for (r = e.length; r--; )
                      (e[r] || {}).id === t && i(e, e[r]);
                  });
                }
              }
              function c(t) {
                this.removePlotBandOrLine(t);
              }
              t.compose = function (t, i) {
                let o = i.prototype;
                return (
                  o.addPlotBand ||
                    ((e = t),
                    s(o, {
                      addPlotBand: r,
                      addPlotLine: n,
                      addPlotBandOrLine: a,
                      getPlotBandPath: l,
                      removePlotBand: h,
                      removePlotLine: c,
                      removePlotBandOrLine: d,
                    })),
                  i
                );
              };
            })(e || (e = {})),
            e
          );
        }
      ),
      i(
        e,
        "Core/Axis/PlotLineOrBand/PlotLineOrBand.js",
        [
          e["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e) {
          let {
            arrayMax: i,
            arrayMin: s,
            defined: o,
            destroyObjectProperties: r,
            erase: a,
            fireEvent: n,
            merge: l,
            objectEach: h,
            pick: d,
          } = e;
          class c {
            static compose(e) {
              return t.compose(c, e);
            }
            constructor(t, e) {
              (this.axis = t), (this.options = e), (this.id = e.id);
            }
            render() {
              n(this, "render");
              let { axis: t, options: e } = this,
                { horiz: i, logarithmic: s } = t,
                { color: r, events: a, zIndex: c = 0 } = e,
                p = {},
                u = t.chart.renderer,
                g = e.to,
                f = e.from,
                m = e.value,
                x = e.borderWidth,
                y = e.label,
                { label: b, svgElem: v } = this,
                S = [],
                k,
                M = o(f) && o(g),
                C = o(m),
                A = !v,
                w = {
                  class:
                    "highcharts-plot-" +
                    (M ? "band " : "line ") +
                    (e.className || ""),
                },
                T = M ? "bands" : "lines";
              if (
                (!t.chart.styledMode &&
                  (C
                    ? ((w.stroke = r || "#999999"),
                      (w["stroke-width"] = d(e.width, 1)),
                      e.dashStyle && (w.dashstyle = e.dashStyle))
                    : M &&
                      ((w.fill = r || "#e6e9ff"),
                      x &&
                        ((w.stroke = e.borderColor), (w["stroke-width"] = x)))),
                (p.zIndex = c),
                (T += "-" + c),
                (k = t.plotLinesAndBandsGroups[T]) ||
                  (t.plotLinesAndBandsGroups[T] = k =
                    u
                      .g("plot-" + T)
                      .attr(p)
                      .add()),
                v || (this.svgElem = v = u.path().attr(w).add(k)),
                o(m))
              )
                S = t.getPlotLinePath({
                  value: s?.log2lin(m) ?? m,
                  lineWidth: v.strokeWidth(),
                  acrossPanes: e.acrossPanes,
                });
              else {
                if (!(o(f) && o(g))) return;
                S = t.getPlotBandPath(
                  s?.log2lin(f) ?? f,
                  s?.log2lin(g) ?? g,
                  e
                );
              }
              return (
                !this.eventsAdded &&
                  a &&
                  (h(a, (t, e) => {
                    v?.on(e, (t) => {
                      a[e].apply(this, [t]);
                    });
                  }),
                  (this.eventsAdded = !0)),
                (A || !v.d) && S?.length
                  ? v.attr({ d: S })
                  : v &&
                    (S
                      ? (v.show(), v.animate({ d: S }))
                      : v.d && (v.hide(), b && (this.label = b = b.destroy()))),
                y &&
                (o(y.text) || o(y.formatter)) &&
                S?.length &&
                t.width > 0 &&
                t.height > 0 &&
                !S.isFlat
                  ? ((y = l(
                      {
                        align: i && M ? "center" : void 0,
                        x: i ? !M && 4 : 10,
                        verticalAlign: !i && M ? "middle" : void 0,
                        y: i ? (M ? 16 : 10) : M ? 6 : -4,
                        rotation: i && !M ? 90 : 0,
                      },
                      y
                    )),
                    this.renderLabel(y, S, M, c))
                  : b && b.hide(),
                this
              );
            }
            renderLabel(t, e, o, r) {
              let a = this.axis,
                n = a.chart.renderer,
                h = this.label;
              h ||
                ((this.label = h =
                  n
                    .text(this.getLabelText(t), 0, 0, t.useHTML)
                    .attr({
                      align: t.textAlign || t.align,
                      rotation: t.rotation,
                      class:
                        "highcharts-plot-" +
                        (o ? "band" : "line") +
                        "-label " +
                        (t.className || ""),
                      zIndex: r,
                    })),
                a.chart.styledMode ||
                  h.css(
                    l({ fontSize: "0.8em", textOverflow: "ellipsis" }, t.style)
                  ),
                h.add());
              let d = e.xBounds || [e[0][1], e[1][1], o ? e[2][1] : e[0][1]],
                c = e.yBounds || [e[0][2], e[1][2], o ? e[2][2] : e[0][2]],
                p = s(d),
                u = s(c);
              if (
                (h.align(t, !1, {
                  x: p,
                  y: u,
                  width: i(d) - p,
                  height: i(c) - u,
                }),
                !h.alignValue || "left" === h.alignValue)
              ) {
                let e = t.clip ? a.width : a.chart.chartWidth;
                h.css({
                  width:
                    (90 === h.rotation
                      ? a.height - (h.alignAttr.y - a.top)
                      : e - (h.alignAttr.x - a.left)) + "px",
                });
              }
              h.show(!0);
            }
            getLabelText(t) {
              return o(t.formatter) ? t.formatter.call(this) : t.text;
            }
            destroy() {
              a(this.axis.plotLinesAndBands, this), delete this.axis, r(this);
            }
          }
          return c;
        }
      ),
      i(
        e,
        "Core/Tooltip.js",
        [
          e["Core/Animation/AnimationUtilities.js"],
          e["Core/Templating.js"],
          e["Core/Globals.js"],
          e["Core/Renderer/RendererUtilities.js"],
          e["Core/Renderer/RendererRegistry.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s, o, r) {
          var a;
          let { animObject: n } = t,
            { format: l } = e,
            { composed: h, doc: d, isSafari: c } = i,
            { distribute: p } = s,
            {
              addEvent: u,
              clamp: g,
              css: f,
              discardElement: m,
              extend: x,
              fireEvent: y,
              isArray: b,
              isNumber: v,
              isString: S,
              merge: k,
              pick: M,
              pushUnique: C,
              splat: A,
              syncTimeout: w,
            } = r;
          class T {
            constructor(t, e, i) {
              (this.allowShared = !0),
                (this.crosshairs = []),
                (this.distance = 0),
                (this.isHidden = !0),
                (this.isSticky = !1),
                (this.options = {}),
                (this.outside = !1),
                (this.chart = t),
                this.init(t, e),
                (this.pointer = i);
            }
            bodyFormatter(t) {
              return t.map(function (t) {
                let e = t.series.tooltipOptions;
                return (
                  e[(t.point.formatPrefix || "point") + "Formatter"] ||
                  t.point.tooltipFormatter
                ).call(
                  t.point,
                  e[(t.point.formatPrefix || "point") + "Format"] || ""
                );
              });
            }
            cleanSplit(t) {
              this.chart.series.forEach(function (e) {
                let i = e && e.tt;
                i &&
                  (!i.isActive || t ? (e.tt = i.destroy()) : (i.isActive = !1));
              });
            }
            defaultFormatter(t) {
              let e;
              let i = this.points || A(this);
              return (
                (e = (e = [t.tooltipFooterHeaderFormatter(i[0])]).concat(
                  t.bodyFormatter(i)
                )).push(t.tooltipFooterHeaderFormatter(i[0], !0)),
                e
              );
            }
            destroy() {
              this.label && (this.label = this.label.destroy()),
                this.split &&
                  (this.cleanSplit(!0),
                  this.tt && (this.tt = this.tt.destroy())),
                this.renderer &&
                  ((this.renderer = this.renderer.destroy()),
                  m(this.container)),
                r.clearTimeout(this.hideTimer);
            }
            getAnchor(t, e) {
              let i;
              let { chart: s, pointer: o } = this,
                r = s.inverted,
                a = s.plotTop,
                n = s.plotLeft;
              if (
                ((t = A(t))[0].series &&
                  t[0].series.yAxis &&
                  !t[0].series.yAxis.options.reversedStacks &&
                  (t = t.slice().reverse()),
                this.followPointer && e)
              )
                void 0 === e.chartX && (e = o.normalize(e)),
                  (i = [e.chartX - n, e.chartY - a]);
              else if (t[0].tooltipPos) i = t[0].tooltipPos;
              else {
                let s = 0,
                  o = 0;
                t.forEach(function (t) {
                  let e = t.pos(!0);
                  e && ((s += e[0]), (o += e[1]));
                }),
                  (s /= t.length),
                  (o /= t.length),
                  this.shared &&
                    t.length > 1 &&
                    e &&
                    (r ? (s = e.chartX) : (o = e.chartY)),
                  (i = [s - n, o - a]);
              }
              return i.map(Math.round);
            }
            getClassName(t, e, i) {
              let s = this.options,
                o = t.series,
                r = o.options;
              return [
                s.className,
                "highcharts-label",
                i && "highcharts-tooltip-header",
                e ? "highcharts-tooltip-box" : "highcharts-tooltip",
                !i && "highcharts-color-" + M(t.colorIndex, o.colorIndex),
                r && r.className,
              ]
                .filter(S)
                .join(" ");
            }
            getLabel({ anchorX: t, anchorY: e } = { anchorX: 0, anchorY: 0 }) {
              let s = this,
                r = this.chart.styledMode,
                a = this.options,
                n = this.split && this.allowShared,
                l = this.container,
                h = this.chart.renderer;
              if (this.label) {
                let t = !this.label.hasClass("highcharts-label");
                ((!n && t) || (n && !t)) && this.destroy();
              }
              if (!this.label) {
                if (this.outside) {
                  let t = this.chart.options.chart.style,
                    e = o.getRendererType();
                  (this.container = l = i.doc.createElement("div")),
                    (l.className = "highcharts-tooltip-container"),
                    f(l, {
                      position: "absolute",
                      top: "1px",
                      pointerEvents: "none",
                      zIndex: Math.max(
                        this.options.style.zIndex || 0,
                        ((t && t.zIndex) || 0) + 3
                      ),
                    }),
                    (this.renderer = h =
                      new e(l, 0, 0, t, void 0, void 0, h.styledMode));
                }
                if (
                  (n
                    ? (this.label = h.g("tooltip"))
                    : ((this.label = h
                        .label(
                          "",
                          t,
                          e,
                          a.shape,
                          void 0,
                          void 0,
                          a.useHTML,
                          void 0,
                          "tooltip"
                        )
                        .attr({ padding: a.padding, r: a.borderRadius })),
                      r ||
                        this.label
                          .attr({
                            fill: a.backgroundColor,
                            "stroke-width": a.borderWidth || 0,
                          })
                          .css(a.style)
                          .css({
                            pointerEvents:
                              a.style.pointerEvents ||
                              (this.shouldStickOnContact() ? "auto" : "none"),
                          })),
                  s.outside)
                ) {
                  let t = this.label;
                  [t.xSetter, t.ySetter].forEach((e, i) => {
                    t[i ? "ySetter" : "xSetter"] = (o) => {
                      e.call(t, s.distance),
                        (t[i ? "y" : "x"] = o),
                        l && (l.style[i ? "top" : "left"] = `${o}px`);
                    };
                  });
                }
                this.label.attr({ zIndex: 8 }).shadow(a.shadow).add();
              }
              return (
                l && !l.parentElement && i.doc.body.appendChild(l), this.label
              );
            }
            getPlayingField() {
              let { body: t, documentElement: e } = d,
                { chart: i, distance: s, outside: o } = this;
              return {
                width: o
                  ? Math.max(
                      t.scrollWidth,
                      e.scrollWidth,
                      t.offsetWidth,
                      e.offsetWidth,
                      e.clientWidth
                    ) -
                    2 * s
                  : i.chartWidth,
                height: o
                  ? Math.max(
                      t.scrollHeight,
                      e.scrollHeight,
                      t.offsetHeight,
                      e.offsetHeight,
                      e.clientHeight
                    )
                  : i.chartHeight,
              };
            }
            getPosition(t, e, i) {
              let { distance: s, chart: o, outside: r, pointer: a } = this,
                { inverted: n, plotLeft: l, plotTop: h, polar: d } = o,
                { plotX: c = 0, plotY: p = 0 } = i,
                u = {},
                g = (n && i.h) || 0,
                { height: f, width: m } = this.getPlayingField(),
                x = a.getChartPosition(),
                y = (t) => t * x.scaleX,
                b = (t) => t * x.scaleY,
                v = (i) => {
                  let a = "x" === i;
                  return [i, a ? m : f, a ? t : e].concat(
                    r
                      ? [
                          a ? y(t) : b(e),
                          a ? x.left - s + y(c + l) : x.top - s + b(p + h),
                          0,
                          a ? m : f,
                        ]
                      : [
                          a ? t : e,
                          a ? c + l : p + h,
                          a ? l : h,
                          a ? l + o.plotWidth : h + o.plotHeight,
                        ]
                  );
                },
                S = v("y"),
                k = v("x"),
                C,
                A = !!i.negative;
              !d && o.hoverSeries?.yAxis?.reversed && (A = !A);
              let w = !this.followPointer && M(i.ttBelow, !d && !n === A),
                T = function (t, e, i, o, a, n, l) {
                  let h = r ? ("y" === t ? b(s) : y(s)) : s,
                    d = (i - o) / 2,
                    c = o < a - s,
                    p = a + s + o < e,
                    f = a - h - i + d,
                    m = a + h - d;
                  if (w && p) u[t] = m;
                  else if (!w && c) u[t] = f;
                  else if (c) u[t] = Math.min(l - o, f - g < 0 ? f : f - g);
                  else {
                    if (!p) return !1;
                    u[t] = Math.max(n, m + g + i > e ? m : m + g);
                  }
                },
                P = function (t, e, i, o, r) {
                  if (r < s || r > e - s) return !1;
                  r < i / 2
                    ? (u[t] = 1)
                    : r > e - o / 2
                    ? (u[t] = e - o - 2)
                    : (u[t] = r - i / 2);
                },
                O = function (t) {
                  ([S, k] = [k, S]), (C = t);
                },
                L = () => {
                  !1 !== T.apply(0, S)
                    ? !1 !== P.apply(0, k) || C || (O(!0), L())
                    : C
                    ? (u.x = u.y = 0)
                    : (O(!0), L());
                };
              return ((n && !d) || this.len > 1) && O(), L(), u;
            }
            hide(t) {
              let e = this;
              r.clearTimeout(this.hideTimer),
                (t = M(t, this.options.hideDelay)),
                this.isHidden ||
                  (this.hideTimer = w(function () {
                    let i = e.getLabel();
                    e.getLabel().animate(
                      { opacity: 0 },
                      {
                        duration: t ? 150 : t,
                        complete: () => {
                          i.hide(), e.container && e.container.remove();
                        },
                      }
                    ),
                      (e.isHidden = !0);
                  }, t));
            }
            init(t, e) {
              (this.chart = t),
                (this.options = e),
                (this.crosshairs = []),
                (this.isHidden = !0),
                (this.split = e.split && !t.inverted && !t.polar),
                (this.shared = e.shared || this.split),
                (this.outside = M(
                  e.outside,
                  !!(t.scrollablePixelsX || t.scrollablePixelsY)
                ));
            }
            shouldStickOnContact(t) {
              return !!(
                !this.followPointer &&
                this.options.stickOnContact &&
                (!t || this.pointer.inClass(t.target, "highcharts-tooltip"))
              );
            }
            move(t, e, i, s) {
              let o = this,
                r = n(!o.isHidden && o.options.animation),
                a = o.followPointer || (o.len || 0) > 1,
                l = { x: t, y: e };
              a || ((l.anchorX = i), (l.anchorY = s)),
                (r.step = () => o.drawTracker()),
                o.getLabel().animate(l, r);
            }
            refresh(t, e) {
              let { chart: i, options: s, pointer: o, shared: a } = this,
                n = A(t),
                h = n[0],
                d = [],
                c = s.format,
                p = s.formatter || this.defaultFormatter,
                u = i.styledMode,
                g = {},
                f = this.allowShared;
              if (!s.enabled || !h.series) return;
              r.clearTimeout(this.hideTimer),
                (this.allowShared = !(
                  !b(t) &&
                  t.series &&
                  t.series.noSharedTooltip
                )),
                (f = f && !this.allowShared),
                (this.followPointer =
                  !this.split && h.series.tooltipOptions.followPointer);
              let m = this.getAnchor(t, e),
                x = m[0],
                v = m[1];
              a && this.allowShared
                ? (o.applyInactiveState(n),
                  n.forEach(function (t) {
                    t.setState("hover"), d.push(t.getLabelConfig());
                  }),
                  ((g = h.getLabelConfig()).points = d))
                : (g = h.getLabelConfig()),
                (this.len = d.length);
              let k = S(c) ? l(c, g, i) : p.call(g, this),
                C = h.series;
              if (
                ((this.distance = M(C.tooltipOptions.distance, 16)), !1 === k)
              )
                this.hide();
              else {
                if (this.split && this.allowShared) this.renderSplit(k, n);
                else {
                  let t = x,
                    r = v;
                  if (
                    (e &&
                      o.isDirectTouch &&
                      ((t = e.chartX - i.plotLeft), (r = e.chartY - i.plotTop)),
                    i.polar ||
                      !1 === C.options.clip ||
                      n.some(
                        (e) =>
                          o.isDirectTouch || e.series.shouldShowTooltip(t, r)
                      ))
                  ) {
                    let t = this.getLabel((f && this.tt) || {});
                    (!s.style.width || u) &&
                      t.css({
                        width:
                          (this.outside ? this.getPlayingField() : i.spacingBox)
                            .width + "px",
                      }),
                      t.attr({
                        class: this.getClassName(h),
                        text: k && k.join ? k.join("") : k,
                      }),
                      u ||
                        t.attr({
                          stroke:
                            s.borderColor || h.color || C.color || "#666666",
                        }),
                      this.updatePosition({
                        plotX: x,
                        plotY: v,
                        negative: h.negative,
                        ttBelow: h.ttBelow,
                        h: m[2] || 0,
                      });
                  } else {
                    this.hide();
                    return;
                  }
                }
                this.isHidden &&
                  this.label &&
                  this.label.attr({ opacity: 1 }).show(),
                  (this.isHidden = !1);
              }
              y(this, "refresh");
            }
            renderSplit(t, e) {
              let i = this,
                {
                  chart: s,
                  chart: {
                    chartWidth: o,
                    chartHeight: r,
                    plotHeight: a,
                    plotLeft: n,
                    plotTop: l,
                    scrollablePixelsY: h = 0,
                    scrollablePixelsX: u,
                    styledMode: f,
                  },
                  distance: m,
                  options: y,
                  options: { positioner: b },
                  pointer: v,
                } = i,
                { scrollLeft: k = 0, scrollTop: C = 0 } =
                  s.scrollablePlotArea?.scrollingContainer || {},
                A =
                  i.outside && "number" != typeof u
                    ? d.documentElement.getBoundingClientRect()
                    : { left: k, right: k + o, top: C, bottom: C + r },
                w = i.getLabel(),
                T = this.renderer || s.renderer,
                P = !!(s.xAxis[0] && s.xAxis[0].opposite),
                { left: O, top: L } = v.getChartPosition(),
                D = l + C,
                E = 0,
                B = a - h;
              function j(t, e, s, o, r = !0) {
                let a, n;
                return (
                  s
                    ? ((a = P ? 0 : B),
                      (n = g(
                        t - o / 2,
                        A.left,
                        A.right - o - (i.outside ? O : 0)
                      )))
                    : ((a = e - D),
                      (n = g(
                        (n = r ? t - o - m : t + m),
                        r ? n : A.left,
                        A.right
                      ))),
                  { x: n, y: a }
                );
              }
              S(t) && (t = [!1, t]);
              let R = t.slice(0, e.length + 1).reduce(function (t, s, o) {
                if (!1 !== s && "" !== s) {
                  let r = e[o - 1] || {
                      isHeader: !0,
                      plotX: e[0].plotX,
                      plotY: a,
                      series: {},
                    },
                    h = r.isHeader,
                    d = h ? i : r.series,
                    c = (d.tt = (function (t, e, s) {
                      let o = t,
                        { isHeader: r, series: a } = e;
                      if (!o) {
                        let t = { padding: y.padding, r: y.borderRadius };
                        f ||
                          ((t.fill = y.backgroundColor),
                          (t["stroke-width"] = y.borderWidth ?? 1)),
                          (o = T.label(
                            "",
                            0,
                            0,
                            y[r ? "headerShape" : "shape"],
                            void 0,
                            void 0,
                            y.useHTML
                          )
                            .addClass(i.getClassName(e, !0, r))
                            .attr(t)
                            .add(w));
                      }
                      return (
                        (o.isActive = !0),
                        o.attr({ text: s }),
                        f ||
                          o
                            .css(y.style)
                            .attr({
                              stroke:
                                y.borderColor ||
                                e.color ||
                                a.color ||
                                "#333333",
                            }),
                        o
                      );
                    })(d.tt, r, s.toString())),
                    p = c.getBBox(),
                    u = p.width + c.strokeWidth();
                  h && ((E = p.height), (B += E), P && (D -= E));
                  let { anchorX: x, anchorY: v } = (function (t) {
                    let e, i;
                    let {
                      isHeader: s,
                      plotX: o = 0,
                      plotY: r = 0,
                      series: h,
                    } = t;
                    if (s) (e = Math.max(n + o, n)), (i = l + a / 2);
                    else {
                      let { xAxis: t, yAxis: s } = h;
                      (e = t.pos + g(o, -m, t.len + m)),
                        h.shouldShowTooltip(0, s.pos - l + r, {
                          ignoreX: !0,
                        }) && (i = s.pos + r);
                    }
                    return {
                      anchorX: (e = g(e, A.left - m, A.right + m)),
                      anchorY: i,
                    };
                  })(r);
                  if ("number" == typeof v) {
                    let e = p.height + 1,
                      s = b ? b.call(i, u, e, r) : j(x, v, h, u);
                    t.push({
                      align: b ? 0 : void 0,
                      anchorX: x,
                      anchorY: v,
                      boxWidth: u,
                      point: r,
                      rank: M(s.rank, h ? 1 : 0),
                      size: e,
                      target: s.y,
                      tt: c,
                      x: s.x,
                    });
                  } else c.isActive = !1;
                }
                return t;
              }, []);
              !b &&
                R.some((t) => {
                  let { outside: e } = i,
                    s = (e ? O : 0) + t.anchorX;
                  return (
                    (s < A.left && s + t.boxWidth < A.right) ||
                    (s < O - A.left + t.boxWidth && A.right - s > s)
                  );
                }) &&
                (R = R.map((t) => {
                  let { x: e, y: i } = j(
                    t.anchorX,
                    t.anchorY,
                    t.point.isHeader,
                    t.boxWidth,
                    !1
                  );
                  return x(t, { target: i, x: e });
                })),
                i.cleanSplit(),
                p(R, B);
              let I = { left: O, right: O };
              R.forEach(function (t) {
                let { x: e, boxWidth: s, isHeader: o } = t;
                !o &&
                  (i.outside && O + e < I.left && (I.left = O + e),
                  !o && i.outside && I.left + s > I.right && (I.right = O + e));
              }),
                R.forEach(function (t) {
                  let {
                      x: e,
                      anchorX: s,
                      anchorY: o,
                      pos: r,
                      point: { isHeader: a },
                    } = t,
                    n = {
                      visibility: void 0 === r ? "hidden" : "inherit",
                      x: e,
                      y: (r || 0) + D,
                      anchorX: s,
                      anchorY: o,
                    };
                  if (i.outside && e < s) {
                    let t = O - I.left;
                    t > 0 &&
                      (a || ((n.x = e + t), (n.anchorX = s + t)),
                      a &&
                        ((n.x = (I.right - I.left) / 2), (n.anchorX = s + t)));
                  }
                  t.tt.attr(n);
                });
              let { container: z, outside: G, renderer: N } = i;
              if (G && z && N) {
                let { width: t, height: e, x: i, y: s } = w.getBBox();
                N.setSize(t + i, e + s, !1),
                  (z.style.left = I.left + "px"),
                  (z.style.top = L + "px");
              }
              c && w.attr({ opacity: 1 === w.opacity ? 0.999 : 1 });
            }
            drawTracker() {
              if (!this.shouldStickOnContact()) {
                this.tracker && (this.tracker = this.tracker.destroy());
                return;
              }
              let t = this.chart,
                e = this.label,
                i = this.shared ? t.hoverPoints : t.hoverPoint;
              if (!e || !i) return;
              let s = { x: 0, y: 0, width: 0, height: 0 },
                o = this.getAnchor(i),
                r = e.getBBox();
              (o[0] += t.plotLeft - (e.translateX || 0)),
                (o[1] += t.plotTop - (e.translateY || 0)),
                (s.x = Math.min(0, o[0])),
                (s.y = Math.min(0, o[1])),
                (s.width =
                  o[0] < 0
                    ? Math.max(Math.abs(o[0]), r.width - o[0])
                    : Math.max(Math.abs(o[0]), r.width)),
                (s.height =
                  o[1] < 0
                    ? Math.max(Math.abs(o[1]), r.height - Math.abs(o[1]))
                    : Math.max(Math.abs(o[1]), r.height)),
                this.tracker
                  ? this.tracker.attr(s)
                  : ((this.tracker = e.renderer
                      .rect(s)
                      .addClass("highcharts-tracker")
                      .add(e)),
                    t.styledMode ||
                      this.tracker.attr({ fill: "rgba(0,0,0,0)" }));
            }
            styledModeFormat(t) {
              return t
                .replace(
                  'style="font-size: 0.8em"',
                  'class="highcharts-header"'
                )
                .replace(
                  /style="color:{(point|series)\.color}"/g,
                  'class="highcharts-color-{$1.colorIndex} {series.options.className} {point.options.className}"'
                );
            }
            tooltipFooterHeaderFormatter(t, e) {
              let i = t.series,
                s = i.tooltipOptions,
                o = i.xAxis,
                r = o && o.dateTime,
                a = { isFooter: e, labelConfig: t },
                n = s.xDateFormat,
                h = s[e ? "footerFormat" : "headerFormat"];
              return (
                y(this, "headerFormatter", a, function (e) {
                  r &&
                    !n &&
                    v(t.key) &&
                    (n = r.getXDateFormat(t.key, s.dateTimeLabelFormats)),
                    r &&
                      n &&
                      ((t.point && t.point.tooltipDateKeys) || ["key"]).forEach(
                        function (t) {
                          h = h.replace(
                            "{point." + t + "}",
                            "{point." + t + ":" + n + "}"
                          );
                        }
                      ),
                    i.chart.styledMode && (h = this.styledModeFormat(h)),
                    (e.text = l(h, { point: t, series: i }, this.chart));
                }),
                a.text
              );
            }
            update(t) {
              this.destroy(), this.init(this.chart, k(!0, this.options, t));
            }
            updatePosition(t) {
              let {
                  chart: e,
                  container: i,
                  distance: s,
                  options: o,
                  pointer: r,
                  renderer: a,
                } = this,
                { height: n = 0, width: l = 0 } = this.getLabel(),
                {
                  left: h,
                  top: d,
                  scaleX: c,
                  scaleY: p,
                } = r.getChartPosition(),
                u = (o.positioner || this.getPosition).call(this, l, n, t),
                g = (t.plotX || 0) + e.plotLeft,
                m = (t.plotY || 0) + e.plotTop,
                x;
              a &&
                i &&
                (o.positioner && ((u.x += h - s), (u.y += d - s)),
                (x = (o.borderWidth || 0) + 2 * s + 2),
                a.setSize(l + x, n + x, !1),
                (1 !== c || 1 !== p) &&
                  (f(i, { transform: `scale(${c}, ${p})` }),
                  (g *= c),
                  (m *= p)),
                (g += h - u.x),
                (m += d - u.y)),
                this.move(Math.round(u.x), Math.round(u.y || 0), g, m);
            }
          }
          return (
            ((a = T || (T = {})).compose = function (t) {
              C(h, "Core.Tooltip") &&
                u(t, "afterInit", function () {
                  let t = this.chart;
                  t.options.tooltip &&
                    (t.tooltip = new a(t, t.options.tooltip, this));
                });
            }),
            T
          );
        }
      ),
      i(
        e,
        "Core/Series/Point.js",
        [
          e["Core/Renderer/HTML/AST.js"],
          e["Core/Animation/AnimationUtilities.js"],
          e["Core/Defaults.js"],
          e["Core/Templating.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s, o) {
          let { animObject: r } = e,
            { defaultOptions: a } = i,
            { format: n } = s,
            {
              addEvent: l,
              crisp: h,
              erase: d,
              extend: c,
              fireEvent: p,
              getNestedProperty: u,
              isArray: g,
              isFunction: f,
              isNumber: m,
              isObject: x,
              merge: y,
              pick: b,
              syncTimeout: v,
              removeEvent: S,
              uniqueKey: k,
            } = o;
          class M {
            animateBeforeDestroy() {
              let t = this,
                e = { x: t.startXPos, opacity: 0 },
                i = t.getGraphicalProps();
              i.singular.forEach(function (i) {
                t[i] = t[i].animate(
                  "dataLabel" === i
                    ? { x: t[i].startXPos, y: t[i].startYPos, opacity: 0 }
                    : e
                );
              }),
                i.plural.forEach(function (e) {
                  t[e].forEach(function (e) {
                    e.element &&
                      e.animate(
                        c(
                          { x: t.startXPos },
                          e.startYPos ? { x: e.startXPos, y: e.startYPos } : {}
                        )
                      );
                  });
                });
            }
            applyOptions(t, e) {
              let i = this.series,
                s = i.options.pointValKey || i.pointValKey;
              return (
                c(this, (t = M.prototype.optionsToObject.call(this, t))),
                (this.options = this.options ? c(this.options, t) : t),
                t.group && delete this.group,
                t.dataLabels && delete this.dataLabels,
                s && (this.y = M.prototype.getNestedProperty.call(this, s)),
                this.selected && (this.state = "select"),
                "name" in this &&
                  void 0 === e &&
                  i.xAxis &&
                  i.xAxis.hasNames &&
                  (this.x = i.xAxis.nameToX(this)),
                void 0 === this.x && i
                  ? (this.x = e ?? i.autoIncrement())
                  : m(t.x) &&
                    i.options.relativeXValue &&
                    (this.x = i.autoIncrement(t.x)),
                (this.isNull = this.isValid && !this.isValid()),
                (this.formatPrefix = this.isNull ? "null" : "point"),
                this
              );
            }
            destroy() {
              if (!this.destroyed) {
                let t = this,
                  e = t.series,
                  i = e.chart,
                  s = e.options.dataSorting,
                  o = i.hoverPoints,
                  a = r(t.series.chart.renderer.globalAnimation),
                  n = () => {
                    for (let e in ((t.graphic ||
                      t.graphics ||
                      t.dataLabel ||
                      t.dataLabels) &&
                      (S(t), t.destroyElements()),
                    t))
                      delete t[e];
                  };
                t.legendItem && i.legend.destroyItem(t),
                  o &&
                    (t.setState(), d(o, t), o.length || (i.hoverPoints = null)),
                  t === i.hoverPoint && t.onMouseOut(),
                  s && s.enabled
                    ? (this.animateBeforeDestroy(), v(n, a.duration))
                    : n(),
                  i.pointCount--;
              }
              this.destroyed = !0;
            }
            destroyElements(t) {
              let e = this,
                i = e.getGraphicalProps(t);
              i.singular.forEach(function (t) {
                e[t] = e[t].destroy();
              }),
                i.plural.forEach(function (t) {
                  e[t].forEach(function (t) {
                    t && t.element && t.destroy();
                  }),
                    delete e[t];
                });
            }
            firePointEvent(t, e, i) {
              let s = this,
                o = this.series.options;
              s.manageEvent(t),
                "click" === t &&
                  o.allowPointSelect &&
                  (i = function (t) {
                    !s.destroyed &&
                      s.select &&
                      s.select(null, t.ctrlKey || t.metaKey || t.shiftKey);
                  }),
                p(s, t, e, i);
            }
            getClassName() {
              return (
                "highcharts-point" +
                (this.selected ? " highcharts-point-select" : "") +
                (this.negative ? " highcharts-negative" : "") +
                (this.isNull ? " highcharts-null-point" : "") +
                (void 0 !== this.colorIndex
                  ? " highcharts-color-" + this.colorIndex
                  : "") +
                (this.options.className ? " " + this.options.className : "") +
                (this.zone && this.zone.className
                  ? " " + this.zone.className.replace("highcharts-negative", "")
                  : "")
              );
            }
            getGraphicalProps(t) {
              let e, i;
              let s = this,
                o = [],
                r = { singular: [], plural: [] };
              for (
                (t = t || { graphic: 1, dataLabel: 1 }).graphic &&
                  o.push("graphic", "connector"),
                  t.dataLabel &&
                    o.push("dataLabel", "dataLabelPath", "dataLabelUpper"),
                  i = o.length;
                i--;

              )
                s[(e = o[i])] && r.singular.push(e);
              return (
                ["graphic", "dataLabel"].forEach(function (e) {
                  let i = e + "s";
                  t[e] && s[i] && r.plural.push(i);
                }),
                r
              );
            }
            getLabelConfig() {
              return {
                x: this.category,
                y: this.y,
                color: this.color,
                colorIndex: this.colorIndex,
                key: this.name || this.category,
                series: this.series,
                point: this,
                percentage: this.percentage,
                total: this.total || this.stackTotal,
              };
            }
            getNestedProperty(t) {
              return t
                ? 0 === t.indexOf("custom.")
                  ? u(t, this.options)
                  : this[t]
                : void 0;
            }
            getZone() {
              let t = this.series,
                e = t.zones,
                i = t.zoneAxis || "y",
                s,
                o = 0;
              for (s = e[0]; this[i] >= s.value; ) s = e[++o];
              return (
                this.nonZonedColor || (this.nonZonedColor = this.color),
                s && s.color && !this.options.color
                  ? (this.color = s.color)
                  : (this.color = this.nonZonedColor),
                s
              );
            }
            hasNewShapeType() {
              return (
                (this.graphic &&
                  (this.graphic.symbolName ||
                    this.graphic.element.nodeName)) !== this.shapeType
              );
            }
            constructor(t, e, i) {
              (this.formatPrefix = "point"),
                (this.visible = !0),
                (this.series = t),
                this.applyOptions(e, i),
                this.id ?? (this.id = k()),
                this.resolveColor(),
                t.chart.pointCount++,
                p(this, "afterInit");
            }
            isValid() {
              return (m(this.x) || this.x instanceof Date) && m(this.y);
            }
            optionsToObject(t) {
              let e = this.series,
                i = e.options.keys,
                s = i || e.pointArrayMap || ["y"],
                o = s.length,
                r = {},
                a,
                n = 0,
                l = 0;
              if (m(t) || null === t) r[s[0]] = t;
              else if (g(t))
                for (
                  !i &&
                  t.length > o &&
                  ("string" == (a = typeof t[0])
                    ? (r.name = t[0])
                    : "number" === a && (r.x = t[0]),
                  n++);
                  l < o;

                )
                  (i && void 0 === t[n]) ||
                    (s[l].indexOf(".") > 0
                      ? M.prototype.setNestedProperty(r, t[n], s[l])
                      : (r[s[l]] = t[n])),
                    n++,
                    l++;
              else
                "object" == typeof t &&
                  ((r = t),
                  t.dataLabels && (e.hasDataLabels = () => !0),
                  t.marker && (e._hasPointMarkers = !0));
              return r;
            }
            pos(t, e = this.plotY) {
              if (!this.destroyed) {
                let { plotX: i, series: s } = this,
                  { chart: o, xAxis: r, yAxis: a } = s,
                  n = 0,
                  l = 0;
                if (m(i) && m(e))
                  return (
                    t &&
                      ((n = r ? r.pos : o.plotLeft),
                      (l = a ? a.pos : o.plotTop)),
                    o.inverted && r && a
                      ? [a.len - e + l, r.len - i + n]
                      : [i + n, e + l]
                  );
              }
            }
            resolveColor() {
              let t = this.series,
                e = t.chart.options.chart,
                i = t.chart.styledMode,
                s,
                o,
                r = e.colorCount,
                a;
              delete this.nonZonedColor,
                t.options.colorByPoint
                  ? (i ||
                      ((s = (o = t.options.colors || t.chart.options.colors)[
                        t.colorCounter
                      ]),
                      (r = o.length)),
                    (a = t.colorCounter),
                    t.colorCounter++,
                    t.colorCounter === r && (t.colorCounter = 0))
                  : (i || (s = t.color), (a = t.colorIndex)),
                (this.colorIndex = b(this.options.colorIndex, a)),
                (this.color = b(this.options.color, s));
            }
            setNestedProperty(t, e, i) {
              return (
                i.split(".").reduce(function (t, i, s, o) {
                  let r = o.length - 1 === s;
                  return (t[i] = r ? e : x(t[i], !0) ? t[i] : {}), t[i];
                }, t),
                t
              );
            }
            shouldDraw() {
              return !this.isNull;
            }
            tooltipFormatter(t) {
              let e = this.series,
                i = e.tooltipOptions,
                s = b(i.valueDecimals, ""),
                o = i.valuePrefix || "",
                r = i.valueSuffix || "";
              return (
                e.chart.styledMode && (t = e.chart.tooltip.styledModeFormat(t)),
                (e.pointArrayMap || ["y"]).forEach(function (e) {
                  (e = "{point." + e),
                    (o || r) &&
                      (t = t.replace(RegExp(e + "}", "g"), o + e + "}" + r)),
                    (t = t.replace(RegExp(e + "}", "g"), e + ":,." + s + "f}"));
                }),
                n(t, { point: this, series: this.series }, e.chart)
              );
            }
            update(t, e, i, s) {
              let o;
              let r = this,
                a = r.series,
                n = r.graphic,
                l = a.chart,
                h = a.options;
              function d() {
                r.applyOptions(t);
                let s = n && r.hasMockGraphic,
                  d = null === r.y ? !s : s;
                n && d && ((r.graphic = n.destroy()), delete r.hasMockGraphic),
                  x(t, !0) &&
                    (n &&
                      n.element &&
                      t &&
                      t.marker &&
                      void 0 !== t.marker.symbol &&
                      (r.graphic = n.destroy()),
                    t?.dataLabels &&
                      r.dataLabel &&
                      (r.dataLabel = r.dataLabel.destroy())),
                  (o = r.index),
                  a.updateParallelArrays(r, o),
                  (h.data[o] =
                    x(h.data[o], !0) || x(t, !0) ? r.options : b(t, h.data[o])),
                  (a.isDirty = a.isDirtyData = !0),
                  !a.fixedBox && a.hasCartesianSeries && (l.isDirtyBox = !0),
                  "point" === h.legendType && (l.isDirtyLegend = !0),
                  e && l.redraw(i);
              }
              (e = b(e, !0)),
                !1 === s ? d() : r.firePointEvent("update", { options: t }, d);
            }
            remove(t, e) {
              this.series.removePoint(this.series.data.indexOf(this), t, e);
            }
            select(t, e) {
              let i = this,
                s = i.series,
                o = s.chart;
              (t = b(t, !i.selected)),
                (this.selectedStaging = t),
                i.firePointEvent(
                  t ? "select" : "unselect",
                  { accumulate: e },
                  function () {
                    (i.selected = i.options.selected = t),
                      (s.options.data[s.data.indexOf(i)] = i.options),
                      i.setState(t && "select"),
                      e ||
                        o.getSelectedPoints().forEach(function (t) {
                          let e = t.series;
                          t.selected &&
                            t !== i &&
                            ((t.selected = t.options.selected = !1),
                            (e.options.data[e.data.indexOf(t)] = t.options),
                            t.setState(
                              o.hoverPoints && e.options.inactiveOtherPoints
                                ? "inactive"
                                : ""
                            ),
                            t.firePointEvent("unselect"));
                        });
                  }
                ),
                delete this.selectedStaging;
            }
            onMouseOver(t) {
              let { inverted: e, pointer: i } = this.series.chart;
              i &&
                ((t = t
                  ? i.normalize(t)
                  : i.getChartCoordinatesFromPoint(this, e)),
                i.runPointActions(t, this));
            }
            onMouseOut() {
              let t = this.series.chart;
              this.firePointEvent("mouseOut"),
                this.series.options.inactiveOtherPoints ||
                  (t.hoverPoints || []).forEach(function (t) {
                    t.setState();
                  }),
                (t.hoverPoints = t.hoverPoint = null);
            }
            manageEvent(t) {
              let e = y(this.series.options.point, this.options),
                i = e.events?.[t];
              f(i) &&
              (!this.hcEvents?.[t] ||
                this.hcEvents?.[t]?.map((t) => t.fn).indexOf(i) === -1)
                ? (this.importedUserEvent?.(),
                  (this.importedUserEvent = l(this, t, i)))
                : this.importedUserEvent &&
                  !i &&
                  this.hcEvents?.[t] &&
                  (S(this, t),
                  delete this.hcEvents[t],
                  Object.keys(this.hcEvents) || delete this.importedUserEvent);
            }
            setState(e, i) {
              let s = this.series,
                o = this.state,
                r = s.options.states[e || "normal"] || {},
                n = a.plotOptions[s.type].marker && s.options.marker,
                l = n && !1 === n.enabled,
                h = (n && n.states && n.states[e || "normal"]) || {},
                d = !1 === h.enabled,
                u = this.marker || {},
                g = s.chart,
                f = n && s.markerAttribs,
                x = s.halo,
                y,
                v,
                S,
                k = s.stateMarkerGraphic,
                M;
              if (
                ((e = e || "") === this.state && !i) ||
                (this.selected && "select" !== e) ||
                !1 === r.enabled ||
                (e && (d || (l && !1 === h.enabled))) ||
                (e && u.states && u.states[e] && !1 === u.states[e].enabled)
              )
                return;
              if (
                ((this.state = e),
                f && (y = s.markerAttribs(this, e)),
                this.graphic && !this.hasMockGraphic)
              ) {
                if (
                  (o && this.graphic.removeClass("highcharts-point-" + o),
                  e && this.graphic.addClass("highcharts-point-" + e),
                  !g.styledMode)
                ) {
                  (v = s.pointAttribs(this, e)),
                    (S = b(g.options.chart.animation, r.animation));
                  let t = v.opacity;
                  s.options.inactiveOtherPoints &&
                    m(t) &&
                    (this.dataLabels || []).forEach(function (e) {
                      e &&
                        !e.hasClass("highcharts-data-label-hidden") &&
                        (e.animate({ opacity: t }, S),
                        e.connector && e.connector.animate({ opacity: t }, S));
                    }),
                    this.graphic.animate(v, S);
                }
                y &&
                  this.graphic.animate(
                    y,
                    b(g.options.chart.animation, h.animation, n.animation)
                  ),
                  k && k.hide();
              } else
                e &&
                  h &&
                  ((M = u.symbol || s.symbol),
                  k && k.currentSymbol !== M && (k = k.destroy()),
                  y &&
                    (k
                      ? k[i ? "animate" : "attr"]({ x: y.x, y: y.y })
                      : M &&
                        ((s.stateMarkerGraphic = k =
                          g.renderer
                            .symbol(M, y.x, y.y, y.width, y.height)
                            .add(s.markerGroup)),
                        (k.currentSymbol = M))),
                  !g.styledMode &&
                    k &&
                    "inactive" !== this.state &&
                    k.attr(s.pointAttribs(this, e))),
                  k &&
                    (k[e && this.isInside ? "show" : "hide"](),
                    (k.element.point = this),
                    k.addClass(this.getClassName(), !0));
              let C = r.halo,
                A = this.graphic || k,
                w = (A && A.visibility) || "inherit";
              C && C.size && A && "hidden" !== w && !this.isCluster
                ? (x || (s.halo = x = g.renderer.path().add(A.parentGroup)),
                  x
                    .show()
                    [i ? "animate" : "attr"]({ d: this.haloPath(C.size) }),
                  x.attr({
                    class:
                      "highcharts-halo highcharts-color-" +
                      b(this.colorIndex, s.colorIndex) +
                      (this.className ? " " + this.className : ""),
                    visibility: w,
                    zIndex: -1,
                  }),
                  (x.point = this),
                  g.styledMode ||
                    x.attr(
                      c(
                        {
                          fill: this.color || s.color,
                          "fill-opacity": C.opacity,
                        },
                        t.filterUserAttributes(C.attributes || {})
                      )
                    ))
                : x?.point?.haloPath &&
                  !x.point.destroyed &&
                  x.animate({ d: x.point.haloPath(0) }, null, x.hide),
                p(this, "afterSetState", { state: e });
            }
            haloPath(t) {
              let e = this.pos();
              return e
                ? this.series.chart.renderer.symbols.circle(
                    h(e[0], 1) - t,
                    e[1] - t,
                    2 * t,
                    2 * t
                  )
                : [];
            }
          }
          return M;
        }
      ),
      i(
        e,
        "Core/Pointer.js",
        [
          e["Core/Color/Color.js"],
          e["Core/Globals.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i) {
          var s;
          let { parse: o } = t,
            { charts: r, composed: a, isTouchDevice: n } = e,
            {
              addEvent: l,
              attr: h,
              css: d,
              extend: c,
              find: p,
              fireEvent: u,
              isNumber: g,
              isObject: f,
              objectEach: m,
              offset: x,
              pick: y,
              pushUnique: b,
              splat: v,
            } = i;
          class S {
            applyInactiveState(t) {
              let e = [],
                i;
              (t || []).forEach(function (t) {
                (i = t.series),
                  e.push(i),
                  i.linkedParent && e.push(i.linkedParent),
                  i.linkedSeries && (e = e.concat(i.linkedSeries)),
                  i.navigatorSeries && e.push(i.navigatorSeries);
              }),
                this.chart.series.forEach(function (t) {
                  -1 === e.indexOf(t)
                    ? t.setState("inactive", !0)
                    : t.options.inactiveOtherPoints &&
                      t.setAllPointsToState("inactive");
                });
            }
            destroy() {
              let t = this;
              this.eventsToUnbind.forEach((t) => t()),
                (this.eventsToUnbind = []),
                !e.chartCount &&
                  (S.unbindDocumentMouseUp &&
                    S.unbindDocumentMouseUp.forEach((t) => t()),
                  S.unbindDocumentTouchEnd &&
                    (S.unbindDocumentTouchEnd = S.unbindDocumentTouchEnd())),
                clearInterval(t.tooltipTimeout),
                m(t, function (e, i) {
                  t[i] = void 0;
                });
            }
            getSelectionMarkerAttrs(t, e) {
              let i = {
                args: { chartX: t, chartY: e },
                attrs: {},
                shapeType: "rect",
              };
              return (
                u(this, "getSelectionMarkerAttrs", i, (i) => {
                  let s;
                  let { chart: o, zoomHor: r, zoomVert: a } = this,
                    { mouseDownX: n = 0, mouseDownY: l = 0 } = o,
                    h = i.attrs;
                  (h.x = o.plotLeft),
                    (h.y = o.plotTop),
                    (h.width = r ? 1 : o.plotWidth),
                    (h.height = a ? 1 : o.plotHeight),
                    r &&
                      ((s = t - n),
                      (h.width = Math.max(1, Math.abs(s))),
                      (h.x = (s > 0 ? 0 : s) + n)),
                    a &&
                      ((s = e - l),
                      (h.height = Math.max(1, Math.abs(s))),
                      (h.y = (s > 0 ? 0 : s) + l));
                }),
                i
              );
            }
            drag(t) {
              let { chart: e } = this,
                { mouseDownX: i = 0, mouseDownY: s = 0 } = e,
                {
                  panning: r,
                  panKey: a,
                  selectionMarkerFill: n,
                } = e.options.chart,
                l = e.plotLeft,
                h = e.plotTop,
                d = e.plotWidth,
                c = e.plotHeight,
                p = f(r) ? r.enabled : r,
                u = a && t[`${a}Key`],
                g = t.chartX,
                m = t.chartY,
                x,
                y = this.selectionMarker;
              if (
                (!y || !y.touch) &&
                (g < l ? (g = l) : g > l + d && (g = l + d),
                m < h ? (m = h) : m > h + c && (m = h + c),
                (this.hasDragged = Math.sqrt(
                  Math.pow(i - g, 2) + Math.pow(s - m, 2)
                )),
                this.hasDragged > 10)
              ) {
                x = e.isInsidePlot(i - l, s - h, { visiblePlotOnly: !0 });
                let { shapeType: a, attrs: d } = this.getSelectionMarkerAttrs(
                  g,
                  m
                );
                (e.hasCartesianSeries || e.mapView) &&
                  this.hasZoom &&
                  x &&
                  !u &&
                  !y &&
                  ((this.selectionMarker = y = e.renderer[a]()),
                  y
                    .attr({ class: "highcharts-selection-marker", zIndex: 7 })
                    .add(),
                  e.styledMode ||
                    y.attr({ fill: n || o("#334eff").setOpacity(0.25).get() })),
                  y && y.attr(d),
                  x && !y && p && e.pan(t, r);
              }
            }
            dragStart(t) {
              let e = this.chart;
              (e.mouseIsDown = t.type),
                (e.cancelClick = !1),
                (e.mouseDownX = t.chartX),
                (e.mouseDownY = t.chartY);
            }
            getSelectionBox(t) {
              let e = { args: { marker: t }, result: t.getBBox() };
              return u(this, "getSelectionBox", e), e.result;
            }
            drop(t) {
              let e;
              let { chart: i, selectionMarker: s } = this;
              for (let t of i.axes)
                t.isPanning &&
                  ((t.isPanning = !1),
                  (t.options.startOnTick ||
                    t.options.endOnTick ||
                    t.series.some((t) => t.boosted)) &&
                    ((t.forceRedraw = !0),
                    t.setExtremes(t.userMin, t.userMax, !1),
                    (e = !0)));
              if ((e && i.redraw(), s && t)) {
                if (this.hasDragged) {
                  let e = this.getSelectionBox(s);
                  i.transform({
                    axes: i.axes.filter(
                      (t) =>
                        t.zoomEnabled &&
                        (("xAxis" === t.coll && this.zoomX) ||
                          ("yAxis" === t.coll && this.zoomY))
                    ),
                    selection: { originalEvent: t, xAxis: [], yAxis: [], ...e },
                    from: e,
                  });
                }
                g(i.index) && (this.selectionMarker = s.destroy());
              }
              i &&
                g(i.index) &&
                (d(i.container, { cursor: i._cursor }),
                (i.cancelClick = this.hasDragged > 10),
                (i.mouseIsDown = !1),
                (this.hasDragged = 0),
                (this.pinchDown = []));
            }
            findNearestKDPoint(t, e, i) {
              let s;
              return (
                t.forEach(function (t) {
                  let o =
                      !(t.noSharedTooltip && e) &&
                      0 > t.options.findNearestPointBy.indexOf("y"),
                    r = t.searchPoint(i, o);
                  f(r, !0) &&
                    r.series &&
                    (!f(s, !0) ||
                      (function (t, i) {
                        let s = t.distX - i.distX,
                          o = t.dist - i.dist,
                          r = i.series.group?.zIndex - t.series.group?.zIndex;
                        return 0 !== s && e
                          ? s
                          : 0 !== o
                          ? o
                          : 0 !== r
                          ? r
                          : t.series.index > i.series.index
                          ? -1
                          : 1;
                      })(s, r) > 0) &&
                    (s = r);
                }),
                s
              );
            }
            getChartCoordinatesFromPoint(t, e) {
              let { xAxis: i, yAxis: s } = t.series,
                o = t.shapeArgs;
              if (i && s) {
                let r = t.clientX ?? t.plotX ?? 0,
                  a = t.plotY || 0;
                return (
                  t.isNode && o && g(o.x) && g(o.y) && ((r = o.x), (a = o.y)),
                  e
                    ? { chartX: s.len + s.pos - a, chartY: i.len + i.pos - r }
                    : { chartX: r + i.pos, chartY: a + s.pos }
                );
              }
              if (o && o.x && o.y) return { chartX: o.x, chartY: o.y };
            }
            getChartPosition() {
              if (this.chartPosition) return this.chartPosition;
              let { container: t } = this.chart,
                e = x(t);
              this.chartPosition = {
                left: e.left,
                top: e.top,
                scaleX: 1,
                scaleY: 1,
              };
              let { offsetHeight: i, offsetWidth: s } = t;
              return (
                s > 2 &&
                  i > 2 &&
                  ((this.chartPosition.scaleX = e.width / s),
                  (this.chartPosition.scaleY = e.height / i)),
                this.chartPosition
              );
            }
            getCoordinates(t) {
              let e = { xAxis: [], yAxis: [] };
              for (let i of this.chart.axes)
                e[i.isXAxis ? "xAxis" : "yAxis"].push({
                  axis: i,
                  value: i.toValue(t[i.horiz ? "chartX" : "chartY"]),
                });
              return e;
            }
            getHoverData(t, e, i, s, o, r) {
              let a = [],
                n = function (t) {
                  return (
                    t.visible &&
                    !(!o && t.directTouch) &&
                    y(t.options.enableMouseTracking, !0)
                  );
                },
                l = e,
                h,
                d = {
                  chartX: r ? r.chartX : void 0,
                  chartY: r ? r.chartY : void 0,
                  shared: o,
                };
              u(this, "beforeGetHoverData", d),
                (h =
                  l && !l.stickyTracking
                    ? [l]
                    : i.filter((t) => t.stickyTracking && (d.filter || n)(t)));
              let c = (s && t) || !r ? t : this.findNearestKDPoint(h, o, r);
              return (
                (l = c && c.series),
                c &&
                  (o && !l.noSharedTooltip
                    ? (h = i.filter(function (t) {
                        return d.filter
                          ? d.filter(t)
                          : n(t) && !t.noSharedTooltip;
                      })).forEach(function (t) {
                        let e = p(t.points, function (t) {
                          return t.x === c.x && !t.isNull;
                        });
                        f(e) &&
                          (t.boosted && t.boost && (e = t.boost.getPoint(e)),
                          a.push(e));
                      })
                    : a.push(c)),
                u(this, "afterGetHoverData", (d = { hoverPoint: c })),
                { hoverPoint: d.hoverPoint, hoverSeries: l, hoverPoints: a }
              );
            }
            getPointFromEvent(t) {
              let e = t.target,
                i;
              for (; e && !i; ) (i = e.point), (e = e.parentNode);
              return i;
            }
            onTrackerMouseOut(t) {
              let e = this.chart,
                i = t.relatedTarget,
                s = e.hoverSeries;
              (this.isDirectTouch = !1),
                !s ||
                  !i ||
                  s.stickyTracking ||
                  this.inClass(i, "highcharts-tooltip") ||
                  (this.inClass(i, "highcharts-series-" + s.index) &&
                    this.inClass(i, "highcharts-tracker")) ||
                  s.onMouseOut();
            }
            inClass(t, e) {
              let i = t,
                s;
              for (; i; ) {
                if ((s = h(i, "class"))) {
                  if (-1 !== s.indexOf(e)) return !0;
                  if (-1 !== s.indexOf("highcharts-container")) return !1;
                }
                i = i.parentElement;
              }
            }
            constructor(t, e) {
              (this.hasDragged = 0),
                (this.pointerCaptureEventsToUnbind = []),
                (this.eventsToUnbind = []),
                (this.options = e),
                (this.chart = t),
                (this.runChartClick = !!e.chart.events?.click),
                (this.pinchDown = []),
                this.setDOMEvents(),
                u(this, "afterInit");
            }
            normalize(t, e) {
              let i = t.touches,
                s = i
                  ? i.length
                    ? i.item(0)
                    : y(i.changedTouches, t.changedTouches)[0]
                  : t;
              e || (e = this.getChartPosition());
              let o = s.pageX - e.left,
                r = s.pageY - e.top;
              return c(t, {
                chartX: Math.round((o /= e.scaleX)),
                chartY: Math.round((r /= e.scaleY)),
              });
            }
            onContainerClick(t) {
              let e = this.chart,
                i = e.hoverPoint,
                s = this.normalize(t),
                o = e.plotLeft,
                r = e.plotTop;
              !e.cancelClick &&
                (i && this.inClass(s.target, "highcharts-tracker")
                  ? (u(i.series, "click", c(s, { point: i })),
                    e.hoverPoint && i.firePointEvent("click", s))
                  : (c(s, this.getCoordinates(s)),
                    e.isInsidePlot(s.chartX - o, s.chartY - r, {
                      visiblePlotOnly: !0,
                    }) && u(e, "click", s)));
            }
            onContainerMouseDown(t) {
              let i = (1 & (t.buttons || t.button)) == 1;
              (t = this.normalize(t)),
                e.isFirefox && 0 !== t.button && this.onContainerMouseMove(t),
                (void 0 === t.button || i) &&
                  (this.zoomOption(t),
                  i && t.preventDefault?.(),
                  this.dragStart(t));
            }
            onContainerMouseLeave(t) {
              let { pointer: e } = r[y(S.hoverChartIndex, -1)] || {};
              (t = this.normalize(t)),
                this.onContainerMouseMove(t),
                e &&
                  !this.inClass(t.relatedTarget, "highcharts-tooltip") &&
                  (e.reset(), (e.chartPosition = void 0));
            }
            onContainerMouseEnter() {
              delete this.chartPosition;
            }
            onContainerMouseMove(t) {
              let e = this.chart,
                i = e.tooltip,
                s = this.normalize(t);
              this.setHoverChartIndex(t),
                ("mousedown" === e.mouseIsDown || this.touchSelect(s)) &&
                  this.drag(s),
                !e.openMenu &&
                  (this.inClass(s.target, "highcharts-tracker") ||
                    e.isInsidePlot(
                      s.chartX - e.plotLeft,
                      s.chartY - e.plotTop,
                      { visiblePlotOnly: !0 }
                    )) &&
                  !(i && i.shouldStickOnContact(s)) &&
                  (this.inClass(s.target, "highcharts-no-tooltip")
                    ? this.reset(!1, 0)
                    : this.runPointActions(s));
            }
            onDocumentTouchEnd(t) {
              this.onDocumentMouseUp(t);
            }
            onContainerTouchMove(t) {
              this.touchSelect(t)
                ? this.onContainerMouseMove(t)
                : this.touch(t);
            }
            onContainerTouchStart(t) {
              this.touchSelect(t)
                ? this.onContainerMouseDown(t)
                : (this.zoomOption(t), this.touch(t, !0));
            }
            onDocumentMouseMove(t) {
              let e = this.chart,
                i = e.tooltip,
                s = this.chartPosition,
                o = this.normalize(t, s);
              !s ||
                e.isInsidePlot(o.chartX - e.plotLeft, o.chartY - e.plotTop, {
                  visiblePlotOnly: !0,
                }) ||
                (i && i.shouldStickOnContact(o)) ||
                (o.target !== e.container.ownerDocument &&
                  this.inClass(o.target, "highcharts-tracker")) ||
                this.reset();
            }
            onDocumentMouseUp(t) {
              r[y(S.hoverChartIndex, -1)]?.pointer?.drop(t);
            }
            pinch(t) {
              let e = this,
                { chart: i, hasZoom: s, lastTouches: o } = e,
                r = [].map.call(t.touches || [], (t) => e.normalize(t)),
                a = r.length,
                n =
                  1 === a &&
                  ((e.inClass(t.target, "highcharts-tracker") &&
                    i.runTrackerClick) ||
                    e.runChartClick),
                l = i.tooltip,
                h = 1 === a && y(l?.options.followTouchMove, !0);
              a > 1 ? (e.initiated = !0) : h && (e.initiated = !1),
                s &&
                  e.initiated &&
                  !n &&
                  !1 !== t.cancelable &&
                  t.preventDefault(),
                "touchstart" === t.type
                  ? ((e.pinchDown = r), (e.res = !0), (i.mouseDownX = t.chartX))
                  : h
                  ? this.runPointActions(e.normalize(t))
                  : o &&
                    (u(i, "touchpan", { originalEvent: t, touches: r }, () => {
                      let e = (t) => {
                        let e = t[0],
                          i = t[1] || e;
                        return {
                          x: e.chartX,
                          y: e.chartY,
                          width: i.chartX - e.chartX,
                          height: i.chartY - e.chartY,
                        };
                      };
                      i.transform({
                        axes: i.axes.filter(
                          (t) =>
                            t.zoomEnabled &&
                            ((this.zoomHor && t.horiz) ||
                              (this.zoomVert && !t.horiz))
                        ),
                        to: e(r),
                        from: e(o),
                        trigger: t.type,
                      });
                    }),
                    e.res && ((e.res = !1), this.reset(!1, 0))),
                (e.lastTouches = r);
            }
            reset(t, e) {
              let i = this.chart,
                s = i.hoverSeries,
                o = i.hoverPoint,
                r = i.hoverPoints,
                a = i.tooltip,
                n = a && a.shared ? r : o;
              t &&
                n &&
                v(n).forEach(function (e) {
                  e.series.isCartesian && void 0 === e.plotX && (t = !1);
                }),
                t
                  ? a &&
                    n &&
                    v(n).length &&
                    (a.refresh(n),
                    a.shared && r
                      ? r.forEach(function (t) {
                          t.setState(t.state, !0),
                            t.series.isCartesian &&
                              (t.series.xAxis.crosshair &&
                                t.series.xAxis.drawCrosshair(null, t),
                              t.series.yAxis.crosshair &&
                                t.series.yAxis.drawCrosshair(null, t));
                        })
                      : o &&
                        (o.setState(o.state, !0),
                        i.axes.forEach(function (t) {
                          t.crosshair &&
                            o.series[t.coll] === t &&
                            t.drawCrosshair(null, o);
                        })))
                  : (o && o.onMouseOut(),
                    r &&
                      r.forEach(function (t) {
                        t.setState();
                      }),
                    s && s.onMouseOut(),
                    a && a.hide(e),
                    this.unDocMouseMove &&
                      (this.unDocMouseMove = this.unDocMouseMove()),
                    i.axes.forEach(function (t) {
                      t.hideCrosshair();
                    }),
                    (i.hoverPoints = i.hoverPoint = void 0));
            }
            runPointActions(t, e, i) {
              let s = this.chart,
                o = s.series,
                a = s.tooltip && s.tooltip.options.enabled ? s.tooltip : void 0,
                n = !!a && a.shared,
                h = e || s.hoverPoint,
                d = (h && h.series) || s.hoverSeries,
                c =
                  (!t || "touchmove" !== t.type) &&
                  (!!e || (d && d.directTouch && this.isDirectTouch)),
                u = this.getHoverData(h, d, o, c, n, t);
              (h = u.hoverPoint), (d = u.hoverSeries);
              let g = u.hoverPoints,
                f =
                  d &&
                  d.tooltipOptions.followPointer &&
                  !d.tooltipOptions.split,
                m = n && d && !d.noSharedTooltip;
              if (h && (i || h !== s.hoverPoint || (a && a.isHidden))) {
                if (
                  ((s.hoverPoints || []).forEach(function (t) {
                    -1 === g.indexOf(t) && t.setState();
                  }),
                  s.hoverSeries !== d && d.onMouseOver(),
                  this.applyInactiveState(g),
                  (g || []).forEach(function (t) {
                    t.setState("hover");
                  }),
                  s.hoverPoint && s.hoverPoint.firePointEvent("mouseOut"),
                  !h.series)
                )
                  return;
                (s.hoverPoints = g),
                  (s.hoverPoint = h),
                  h.firePointEvent("mouseOver", void 0, () => {
                    a && h && a.refresh(m ? g : h, t);
                  });
              } else if (f && a && !a.isHidden) {
                let e = a.getAnchor([{}], t);
                s.isInsidePlot(e[0], e[1], { visiblePlotOnly: !0 }) &&
                  a.updatePosition({ plotX: e[0], plotY: e[1] });
              }
              this.unDocMouseMove ||
                ((this.unDocMouseMove = l(
                  s.container.ownerDocument,
                  "mousemove",
                  (t) =>
                    r[S.hoverChartIndex ?? -1]?.pointer?.onDocumentMouseMove(t)
                )),
                this.eventsToUnbind.push(this.unDocMouseMove)),
                s.axes.forEach(function (e) {
                  let i;
                  let o = y((e.crosshair || {}).snap, !0);
                  !o ||
                    ((i = s.hoverPoint) && i.series[e.coll] === e) ||
                    (i = p(g, (t) => t.series && t.series[e.coll] === e)),
                    i || !o ? e.drawCrosshair(t, i) : e.hideCrosshair();
                });
            }
            setDOMEvents() {
              let t = this.chart.container,
                e = t.ownerDocument;
              (t.onmousedown = this.onContainerMouseDown.bind(this)),
                (t.onmousemove = this.onContainerMouseMove.bind(this)),
                (t.onclick = this.onContainerClick.bind(this)),
                this.eventsToUnbind.push(
                  l(t, "mouseenter", this.onContainerMouseEnter.bind(this)),
                  l(t, "mouseleave", this.onContainerMouseLeave.bind(this))
                ),
                S.unbindDocumentMouseUp || (S.unbindDocumentMouseUp = []),
                S.unbindDocumentMouseUp.push(
                  l(e, "mouseup", this.onDocumentMouseUp.bind(this))
                );
              let i = this.chart.renderTo.parentElement;
              for (; i && "BODY" !== i.tagName; )
                this.eventsToUnbind.push(
                  l(i, "scroll", () => {
                    delete this.chartPosition;
                  })
                ),
                  (i = i.parentElement);
              this.eventsToUnbind.push(
                l(t, "touchstart", this.onContainerTouchStart.bind(this), {
                  passive: !1,
                }),
                l(t, "touchmove", this.onContainerTouchMove.bind(this), {
                  passive: !1,
                })
              ),
                S.unbindDocumentTouchEnd ||
                  (S.unbindDocumentTouchEnd = l(
                    e,
                    "touchend",
                    this.onDocumentTouchEnd.bind(this),
                    { passive: !1 }
                  )),
                this.setPointerCapture(),
                l(this.chart, "redraw", this.setPointerCapture.bind(this));
            }
            setPointerCapture() {
              if (!n) return;
              let t = this.pointerCaptureEventsToUnbind,
                e = this.chart,
                i = e.container,
                s =
                  y(e.options.tooltip?.followTouchMove, !0) &&
                  e.series.some(
                    (t) => t.options.findNearestPointBy.indexOf("y") > -1
                  );
              !this.hasPointerCapture && s
                ? (t.push(
                    l(i, "pointerdown", (t) => {
                      t.target?.hasPointerCapture(t.pointerId) &&
                        t.target?.releasePointerCapture(t.pointerId);
                    }),
                    l(i, "pointermove", (t) => {
                      e.pointer?.getPointFromEvent(t)?.onMouseOver(t);
                    })
                  ),
                  e.styledMode || d(i, { "touch-action": "none" }),
                  (i.className += " highcharts-no-touch-action"),
                  (this.hasPointerCapture = !0))
                : this.hasPointerCapture &&
                  !s &&
                  (t.forEach((t) => t()),
                  (t.length = 0),
                  e.styledMode ||
                    d(i, {
                      "touch-action": y(
                        e.options.chart.style?.["touch-action"],
                        "manipulation"
                      ),
                    }),
                  (i.className = i.className.replace(
                    " highcharts-no-touch-action",
                    ""
                  )),
                  (this.hasPointerCapture = !1));
            }
            setHoverChartIndex(t) {
              let i = this.chart,
                s = e.charts[y(S.hoverChartIndex, -1)];
              if (s && s !== i) {
                let e = { relatedTarget: i.container };
                t && !t?.relatedTarget && (t = { ...e, ...t }),
                  s.pointer?.onContainerMouseLeave(t || e);
              }
              (s && s.mouseIsDown) || (S.hoverChartIndex = i.index);
            }
            touch(t, e) {
              let i;
              let { chart: s, pinchDown: o = [] } = this;
              this.setHoverChartIndex(),
                1 === (t = this.normalize(t)).touches.length
                  ? s.isInsidePlot(
                      t.chartX - s.plotLeft,
                      t.chartY - s.plotTop,
                      { visiblePlotOnly: !0 }
                    ) && !s.openMenu
                    ? (e && this.runPointActions(t),
                      "touchmove" === t.type &&
                        (i =
                          !!o[0] &&
                          Math.pow(o[0].chartX - t.chartX, 2) +
                            Math.pow(o[0].chartY - t.chartY, 2) >=
                            16),
                      y(i, !0) && this.pinch(t))
                    : e && this.reset()
                  : 2 === t.touches.length && this.pinch(t);
            }
            touchSelect(t) {
              return !!(
                this.chart.zooming.singleTouch &&
                t.touches &&
                1 === t.touches.length
              );
            }
            zoomOption(t) {
              let e = this.chart,
                i = e.inverted,
                s = e.zooming.type || "",
                o,
                r;
              /touch/.test(t.type) && (s = y(e.zooming.pinchType, s)),
                (this.zoomX = o = /x/.test(s)),
                (this.zoomY = r = /y/.test(s)),
                (this.zoomHor = (o && !i) || (r && i)),
                (this.zoomVert = (r && !i) || (o && i)),
                (this.hasZoom = o || r);
            }
          }
          return (
            ((s = S || (S = {})).compose = function (t) {
              b(a, "Core.Pointer") &&
                l(t, "beforeRender", function () {
                  this.pointer = new s(this, this.options);
                });
            }),
            S
          );
        }
      ),
      i(
        e,
        "Core/Legend/LegendSymbol.js",
        [e["Core/Utilities.js"]],
        function (t) {
          var e;
          let { extend: i, merge: s, pick: o } = t;
          return (
            (function (t) {
              function e(t, e, r) {
                let a = (this.legendItem = this.legendItem || {}),
                  { chart: n, options: l } = this,
                  { baseline: h = 0, symbolWidth: d, symbolHeight: c } = t,
                  p = this.symbol || "circle",
                  u = c / 2,
                  g = n.renderer,
                  f = a.group,
                  m = h - Math.round(c * (r ? 0.4 : 0.3)),
                  x = {},
                  y,
                  b = l.marker,
                  v = 0;
                if (
                  (n.styledMode ||
                    ((x["stroke-width"] = Math.min(l.lineWidth || 0, 24)),
                    l.dashStyle
                      ? (x.dashstyle = l.dashStyle)
                      : "square" === l.linecap ||
                        (x["stroke-linecap"] = "round")),
                  (a.line = g
                    .path()
                    .addClass("highcharts-graph")
                    .attr(x)
                    .add(f)),
                  r && (a.area = g.path().addClass("highcharts-area").add(f)),
                  x["stroke-linecap"] &&
                    (v = Math.min(a.line.strokeWidth(), d) / 2),
                  d)
                ) {
                  let t = [
                    ["M", v, m],
                    ["L", d - v, m],
                  ];
                  a.line.attr({ d: t }),
                    a.area?.attr({ d: [...t, ["L", d - v, h], ["L", v, h]] });
                }
                if (b && !1 !== b.enabled && d) {
                  let t = Math.min(o(b.radius, u), u);
                  0 === p.indexOf("url") &&
                    ((b = s(b, { width: c, height: c })), (t = 0)),
                    (a.symbol = y =
                      g
                        .symbol(
                          p,
                          d / 2 - t,
                          m - t,
                          2 * t,
                          2 * t,
                          i({ context: "legend" }, b)
                        )
                        .addClass("highcharts-point")
                        .add(f)),
                    (y.isMarker = !0);
                }
              }
              (t.areaMarker = function (t, i) {
                e.call(this, t, i, !0);
              }),
                (t.lineMarker = e),
                (t.rectangle = function (t, e) {
                  let i = e.legendItem || {},
                    s = t.options,
                    r = t.symbolHeight,
                    a = s.squareSymbol,
                    n = a ? r : t.symbolWidth;
                  i.symbol = this.chart.renderer
                    .rect(
                      a ? (t.symbolWidth - r) / 2 : 0,
                      t.baseline - r + 1,
                      n,
                      r,
                      o(t.options.symbolRadius, r / 2)
                    )
                    .addClass("highcharts-point")
                    .attr({ zIndex: 3 })
                    .add(i.group);
                });
            })(e || (e = {})),
            e
          );
        }
      ),
      i(e, "Core/Series/SeriesDefaults.js", [], function () {
        return {
          lineWidth: 2,
          allowPointSelect: !1,
          crisp: !0,
          showCheckbox: !1,
          animation: { duration: 1e3 },
          enableMouseTracking: !0,
          events: {},
          marker: {
            enabledThreshold: 2,
            lineColor: "#ffffff",
            lineWidth: 0,
            radius: 4,
            states: {
              normal: { animation: !0 },
              hover: {
                animation: { duration: 150 },
                enabled: !0,
                radiusPlus: 2,
                lineWidthPlus: 1,
              },
              select: {
                fillColor: "#cccccc",
                lineColor: "#000000",
                lineWidth: 2,
              },
            },
          },
          point: { events: {} },
          dataLabels: {
            animation: {},
            align: "center",
            borderWidth: 0,
            defer: !0,
            formatter: function () {
              let { numberFormatter: t } = this.series.chart;
              return "number" != typeof this.y ? "" : t(this.y, -1);
            },
            padding: 5,
            style: {
              fontSize: "0.7em",
              fontWeight: "bold",
              color: "contrast",
              textOutline: "1px contrast",
            },
            verticalAlign: "bottom",
            x: 0,
            y: 0,
          },
          cropThreshold: 300,
          opacity: 1,
          pointRange: 0,
          softThreshold: !0,
          states: {
            normal: { animation: !0 },
            hover: {
              animation: { duration: 150 },
              lineWidthPlus: 1,
              marker: {},
              halo: { size: 10, opacity: 0.25 },
            },
            select: { animation: { duration: 0 } },
            inactive: { animation: { duration: 150 }, opacity: 0.2 },
          },
          stickyTracking: !0,
          turboThreshold: 1e3,
          findNearestPointBy: "x",
        };
      }),
      i(
        e,
        "Core/Series/SeriesRegistry.js",
        [
          e["Core/Globals.js"],
          e["Core/Defaults.js"],
          e["Core/Series/Point.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s) {
          var o;
          let { defaultOptions: r } = e,
            { extend: a, extendClass: n, merge: l } = s;
          return (
            (function (e) {
              function s(t, s) {
                let o = r.plotOptions || {},
                  a = s.defaultOptions,
                  n = s.prototype;
                return (
                  (n.type = t),
                  n.pointClass || (n.pointClass = i),
                  !e.seriesTypes[t] &&
                    (a && (o[t] = a), (e.seriesTypes[t] = s), !0)
                );
              }
              (e.seriesTypes = t.seriesTypes),
                (e.registerSeriesType = s),
                (e.seriesType = function (t, o, h, d, c) {
                  let p = r.plotOptions || {};
                  if (
                    ((o = o || ""),
                    (p[t] = l(p[o], h)),
                    delete e.seriesTypes[t],
                    s(t, n(e.seriesTypes[o] || function () {}, d)),
                    (e.seriesTypes[t].prototype.type = t),
                    c)
                  ) {
                    class s extends i {}
                    a(s.prototype, c),
                      (e.seriesTypes[t].prototype.pointClass = s);
                  }
                  return e.seriesTypes[t];
                });
            })(o || (o = {})),
            o
          );
        }
      ),
      i(
        e,
        "Core/Series/Series.js",
        [
          e["Core/Animation/AnimationUtilities.js"],
          e["Core/Defaults.js"],
          e["Core/Foundation.js"],
          e["Core/Globals.js"],
          e["Core/Legend/LegendSymbol.js"],
          e["Core/Series/Point.js"],
          e["Core/Series/SeriesDefaults.js"],
          e["Core/Series/SeriesRegistry.js"],
          e["Core/Renderer/SVG/SVGElement.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s, o, r, a, n, l, h) {
          let { animObject: d, setAnimation: c } = t,
            { defaultOptions: p } = e,
            { registerEventOptions: u } = i,
            { svg: g, win: f } = s,
            { seriesTypes: m } = n,
            {
              arrayMax: x,
              arrayMin: y,
              clamp: b,
              correctFloat: v,
              crisp: S,
              defined: k,
              destroyObjectProperties: M,
              diffObjects: C,
              erase: A,
              error: w,
              extend: T,
              find: P,
              fireEvent: O,
              getClosestDistance: L,
              getNestedProperty: D,
              insertItem: E,
              isArray: B,
              isNumber: j,
              isString: R,
              merge: I,
              objectEach: z,
              pick: G,
              removeEvent: N,
              splat: W,
              syncTimeout: H,
            } = h;
          class X {
            constructor() {
              this.zoneAxis = "y";
            }
            init(t, e) {
              let i;
              O(this, "init", { options: e });
              let s = this,
                o = t.series;
              (this.eventsToUnbind = []),
                (s.chart = t),
                (s.options = s.setOptions(e));
              let r = s.options,
                a = !1 !== r.visible;
              (s.linkedSeries = []),
                s.bindAxes(),
                T(s, {
                  name: r.name,
                  state: "",
                  visible: a,
                  selected: !0 === r.selected,
                }),
                u(this, r);
              let n = r.events;
              ((n && n.click) ||
                (r.point && r.point.events && r.point.events.click) ||
                r.allowPointSelect) &&
                (t.runTrackerClick = !0),
                s.getColor(),
                s.getSymbol(),
                s.parallelArrays.forEach(function (t) {
                  s[t + "Data"] || (s[t + "Data"] = []);
                }),
                s.isCartesian && (t.hasCartesianSeries = !0),
                o.length && (i = o[o.length - 1]),
                (s._i = G(i && i._i, -1) + 1),
                (s.opacity = s.options.opacity),
                t.orderItems("series", E(this, o)),
                r.dataSorting && r.dataSorting.enabled
                  ? s.setDataSortingOptions()
                  : s.points || s.data || s.setData(r.data, !1),
                O(this, "afterInit");
            }
            is(t) {
              return m[t] && this instanceof m[t];
            }
            bindAxes() {
              let t;
              let e = this,
                i = e.options,
                s = e.chart;
              O(this, "bindAxes", null, function () {
                (e.axisTypes || []).forEach(function (o) {
                  (s[o] || []).forEach(function (s) {
                    (t = s.options),
                      (G(i[o], 0) === s.index ||
                        (void 0 !== i[o] && i[o] === t.id)) &&
                        (E(e, s.series), (e[o] = s), (s.isDirty = !0));
                  }),
                    e[o] || e.optionalAxis === o || w(18, !0, s);
                });
              }),
                O(this, "afterBindAxes");
            }
            updateParallelArrays(t, e, i) {
              let s = t.series,
                o = j(e)
                  ? function (i) {
                      let o = "y" === i && s.toYData ? s.toYData(t) : t[i];
                      s[i + "Data"][e] = o;
                    }
                  : function (t) {
                      Array.prototype[e].apply(s[t + "Data"], i);
                    };
              s.parallelArrays.forEach(o);
            }
            hasData() {
              return (
                (this.visible &&
                  void 0 !== this.dataMax &&
                  void 0 !== this.dataMin) ||
                (this.visible && this.yData && this.yData.length > 0)
              );
            }
            hasMarkerChanged(t, e) {
              let i = t.marker,
                s = e.marker || {};
              return (
                i &&
                ((s.enabled && !i.enabled) ||
                  s.symbol !== i.symbol ||
                  s.height !== i.height ||
                  s.width !== i.width)
              );
            }
            autoIncrement(t) {
              let e = this.options,
                i = e.pointIntervalUnit,
                s = e.relativeXValue,
                o = this.chart.time,
                r = this.xIncrement,
                a,
                n;
              return ((r = G(r, e.pointStart, 0)),
              (this.pointInterval = n =
                G(this.pointInterval, e.pointInterval, 1)),
              s && j(t) && (n *= t),
              i &&
                ((a = new o.Date(r)),
                "day" === i
                  ? o.set("Date", a, o.get("Date", a) + n)
                  : "month" === i
                  ? o.set("Month", a, o.get("Month", a) + n)
                  : "year" === i &&
                    o.set("FullYear", a, o.get("FullYear", a) + n),
                (n = a.getTime() - r)),
              s && j(t))
                ? r + n
                : ((this.xIncrement = r + n), r);
            }
            setDataSortingOptions() {
              let t = this.options;
              T(this, {
                requireSorting: !1,
                sorted: !1,
                enabledDataSorting: !0,
                allowDG: !1,
              }),
                k(t.pointRange) || (t.pointRange = 1);
            }
            setOptions(t) {
              let e;
              let i = this.chart,
                s = i.options.plotOptions,
                o = i.userOptions || {},
                r = I(t),
                a = i.styledMode,
                n = { plotOptions: s, userOptions: r };
              O(this, "setOptions", n);
              let l = n.plotOptions[this.type],
                h = o.plotOptions || {},
                d = h.series || {},
                c = p.plotOptions[this.type] || {},
                u = h[this.type] || {};
              this.userOptions = n.userOptions;
              let g = I(l, s.series, u, r);
              (this.tooltipOptions = I(
                p.tooltip,
                p.plotOptions.series?.tooltip,
                c?.tooltip,
                i.userOptions.tooltip,
                h.series?.tooltip,
                u.tooltip,
                r.tooltip
              )),
                (this.stickyTracking = G(
                  r.stickyTracking,
                  u.stickyTracking,
                  d.stickyTracking,
                  (!!this.tooltipOptions.shared && !this.noSharedTooltip) ||
                    g.stickyTracking
                )),
                null === l.marker && delete g.marker,
                (this.zoneAxis = g.zoneAxis || "y");
              let f = (this.zones = (g.zones || []).map((t) => ({ ...t })));
              return (
                (g.negativeColor || g.negativeFillColor) &&
                  !g.zones &&
                  ((e = {
                    value: g[this.zoneAxis + "Threshold"] || g.threshold || 0,
                    className: "highcharts-negative",
                  }),
                  a ||
                    ((e.color = g.negativeColor),
                    (e.fillColor = g.negativeFillColor)),
                  f.push(e)),
                f.length &&
                  k(f[f.length - 1].value) &&
                  f.push(
                    a ? {} : { color: this.color, fillColor: this.fillColor }
                  ),
                O(this, "afterSetOptions", { options: g }),
                g
              );
            }
            getName() {
              return G(this.options.name, "Series " + (this.index + 1));
            }
            getCyclic(t, e, i) {
              let s, o;
              let r = this.chart,
                a = `${t}Index`,
                n = `${t}Counter`,
                l = i?.length || r.options.chart.colorCount;
              !e &&
                (k(
                  (o = G(
                    "color" === t ? this.options.colorIndex : void 0,
                    this[a]
                  ))
                )
                  ? (s = o)
                  : (r.series.length || (r[n] = 0),
                    (s = r[n] % l),
                    (r[n] += 1)),
                i && (e = i[s])),
                void 0 !== s && (this[a] = s),
                (this[t] = e);
            }
            getColor() {
              this.chart.styledMode
                ? this.getCyclic("color")
                : this.options.colorByPoint
                ? (this.color = "#cccccc")
                : this.getCyclic(
                    "color",
                    this.options.color || p.plotOptions[this.type].color,
                    this.chart.options.colors
                  );
            }
            getPointsCollection() {
              return (this.hasGroupedData ? this.points : this.data) || [];
            }
            getSymbol() {
              let t = this.options.marker;
              this.getCyclic("symbol", t.symbol, this.chart.options.symbols);
            }
            findPointIndex(t, e) {
              let i, s, o;
              let a = t.id,
                n = t.x,
                l = this.points,
                h = this.options.dataSorting;
              if (a) {
                let t = this.chart.get(a);
                t instanceof r && (i = t);
              } else if (
                this.linkedParent ||
                this.enabledDataSorting ||
                this.options.relativeXValue
              ) {
                let e = (e) => !e.touched && e.index === t.index;
                if (
                  (h && h.matchByName
                    ? (e = (e) => !e.touched && e.name === t.name)
                    : this.options.relativeXValue &&
                      (e = (e) => !e.touched && e.options.x === t.x),
                  !(i = P(l, e)))
                )
                  return;
              }
              return (
                i && void 0 !== (o = i && i.index) && (s = !0),
                void 0 === o && j(n) && (o = this.xData.indexOf(n, e)),
                -1 !== o &&
                  void 0 !== o &&
                  this.cropped &&
                  (o = o >= this.cropStart ? o - this.cropStart : o),
                !s && j(o) && l[o] && l[o].touched && (o = void 0),
                o
              );
            }
            updateData(t, e) {
              let i = this.options,
                s = i.dataSorting,
                o = this.points,
                r = [],
                a = this.requireSorting,
                n = t.length === o.length,
                l,
                h,
                d,
                c,
                p = !0;
              if (
                ((this.xIncrement = null),
                t.forEach(function (t, e) {
                  let h;
                  let d =
                      (k(t) &&
                        this.pointClass.prototype.optionsToObject.call(
                          { series: this },
                          t
                        )) ||
                      {},
                    p = d.x;
                  d.id || j(p)
                    ? (-1 === (h = this.findPointIndex(d, c)) || void 0 === h
                        ? r.push(t)
                        : o[h] && t !== i.data[h]
                        ? (o[h].update(t, !1, null, !1),
                          (o[h].touched = !0),
                          a && (c = h + 1))
                        : o[h] && (o[h].touched = !0),
                      (!n ||
                        e !== h ||
                        (s && s.enabled) ||
                        this.hasDerivedData) &&
                        (l = !0))
                    : r.push(t);
                }, this),
                l)
              )
                for (h = o.length; h--; )
                  (d = o[h]) && !d.touched && d.remove && d.remove(!1, e);
              else
                !n || (s && s.enabled)
                  ? (p = !1)
                  : (t.forEach(function (t, e) {
                      t === o[e].y ||
                        o[e].destroyed ||
                        o[e].update(t, !1, null, !1);
                    }),
                    (r.length = 0));
              return (
                o.forEach(function (t) {
                  t && (t.touched = !1);
                }),
                !!p &&
                  (r.forEach(function (t) {
                    this.addPoint(t, !1, null, null, !1);
                  }, this),
                  null === this.xIncrement &&
                    this.xData &&
                    this.xData.length &&
                    ((this.xIncrement = x(this.xData)), this.autoIncrement()),
                  !0)
              );
            }
            setData(t, e = !0, i, s) {
              let o = this,
                r = o.points,
                a = (r && r.length) || 0,
                n = o.options,
                l = o.chart,
                h = n.dataSorting,
                d = o.xAxis,
                c = n.turboThreshold,
                p = this.xData,
                u = this.yData,
                g = o.pointArrayMap,
                f = g && g.length,
                m = n.keys,
                x,
                y,
                b,
                v = 0,
                S = 1,
                k;
              l.options.chart.allowMutatingData ||
                (n.data && delete o.options.data,
                o.userOptions.data && delete o.userOptions.data,
                (k = I(!0, t)));
              let M = (t = k || t || []).length;
              if (
                (h && h.enabled && (t = this.sortData(t)),
                l.options.chart.allowMutatingData &&
                  !1 !== s &&
                  M &&
                  a &&
                  !o.cropped &&
                  !o.hasGroupedData &&
                  o.visible &&
                  !o.boosted &&
                  (b = this.updateData(t, i)),
                !b)
              ) {
                (o.xIncrement = null),
                  (o.colorCounter = 0),
                  this.parallelArrays.forEach(function (t) {
                    o[t + "Data"].length = 0;
                  });
                let e = c && M > c;
                if (e) {
                  let i = o.getFirstValidPoint(t),
                    s = o.getFirstValidPoint(t, M - 1, -1),
                    r = (t) => !!(B(t) && (m || j(t[0])));
                  if (j(i) && j(s))
                    for (x = 0; x < M; x++)
                      (p[x] = this.autoIncrement()), (u[x] = t[x]);
                  else if (r(i) && r(s)) {
                    if (f) {
                      if (i.length === f)
                        for (x = 0; x < M; x++)
                          (p[x] = this.autoIncrement()), (u[x] = t[x]);
                      else
                        for (x = 0; x < M; x++)
                          (y = t[x]), (p[x] = y[0]), (u[x] = y.slice(1, f + 1));
                    } else if (
                      (m &&
                        ((v = m.indexOf("x")),
                        (S = m.indexOf("y")),
                        (v = v >= 0 ? v : 0),
                        (S = S >= 0 ? S : 1)),
                      1 === i.length && (S = 0),
                      v === S)
                    )
                      for (x = 0; x < M; x++)
                        (p[x] = this.autoIncrement()), (u[x] = t[x][S]);
                    else
                      for (x = 0; x < M; x++)
                        (y = t[x]), (p[x] = y[v]), (u[x] = y[S]);
                  } else e = !1;
                }
                if (!e)
                  for (x = 0; x < M; x++)
                    (y = { series: o }),
                      o.pointClass.prototype.applyOptions.apply(y, [t[x]]),
                      o.updateParallelArrays(y, x);
                for (
                  u && R(u[0]) && w(14, !0, l),
                    o.data = [],
                    o.options.data = o.userOptions.data = t,
                    x = a;
                  x--;

                )
                  r[x]?.destroy();
                d && (d.minRange = d.userMinRange),
                  (o.isDirty = l.isDirtyBox = !0),
                  (o.isDirtyData = !!r),
                  (i = !1);
              }
              "point" === n.legendType &&
                (this.processData(), this.generatePoints()),
                e && l.redraw(i);
            }
            sortData(t) {
              let e = this,
                i = e.options.dataSorting.sortKey || "y",
                s = function (t, e) {
                  return (
                    (k(e) &&
                      t.pointClass.prototype.optionsToObject.call(
                        { series: t },
                        e
                      )) ||
                    {}
                  );
                };
              return (
                t.forEach(function (i, o) {
                  (t[o] = s(e, i)), (t[o].index = o);
                }, this),
                t
                  .concat()
                  .sort((t, e) => {
                    let s = D(i, t),
                      o = D(i, e);
                    return o < s ? -1 : o > s ? 1 : 0;
                  })
                  .forEach(function (t, e) {
                    t.x = e;
                  }, this),
                e.linkedSeries &&
                  e.linkedSeries.forEach(function (e) {
                    let i = e.options,
                      o = i.data;
                    (i.dataSorting && i.dataSorting.enabled) ||
                      !o ||
                      (o.forEach(function (i, r) {
                        (o[r] = s(e, i)),
                          t[r] && ((o[r].x = t[r].x), (o[r].index = r));
                      }),
                      e.setData(o, !1));
                  }),
                t
              );
            }
            getProcessedData(t) {
              let e = this,
                i = e.xAxis,
                s = e.options.cropThreshold,
                o = i?.logarithmic,
                r = e.isCartesian,
                a,
                n,
                l = 0,
                h,
                d,
                c,
                p = e.xData,
                u = e.yData,
                g = !1,
                f = p.length;
              i &&
                ((d = (h = i.getExtremes()).min),
                (c = h.max),
                (g = !!(i.categories && !i.names.length))),
                r &&
                  e.sorted &&
                  !t &&
                  (!s || f > s || e.forceCrop) &&
                  (p[f - 1] < d || p[0] > c
                    ? ((p = []), (u = []))
                    : e.yData &&
                      (p[0] < d || p[f - 1] > c) &&
                      ((p = (a = this.cropData(e.xData, e.yData, d, c)).xData),
                      (u = a.yData),
                      (l = a.start),
                      (n = !0)));
              let m = L(
                [o ? p.map(o.log2lin) : p],
                () => e.requireSorting && !g && w(15, !1, e.chart)
              );
              return {
                xData: p,
                yData: u,
                cropped: n,
                cropStart: l,
                closestPointRange: m,
              };
            }
            processData(t) {
              let e = this.xAxis;
              if (
                this.isCartesian &&
                !this.isDirty &&
                !e.isDirty &&
                !this.yAxis.isDirty &&
                !t
              )
                return !1;
              let i = this.getProcessedData();
              (this.cropped = i.cropped),
                (this.cropStart = i.cropStart),
                (this.processedXData = i.xData),
                (this.processedYData = i.yData),
                (this.closestPointRange = this.basePointRange =
                  i.closestPointRange),
                O(this, "afterProcessData");
            }
            cropData(t, e, i, s) {
              let o = t.length,
                r,
                a,
                n = 0,
                l = o;
              for (r = 0; r < o; r++)
                if (t[r] >= i) {
                  n = Math.max(0, r - 1);
                  break;
                }
              for (a = r; a < o; a++)
                if (t[a] > s) {
                  l = a + 1;
                  break;
                }
              return {
                xData: t.slice(n, l),
                yData: e.slice(n, l),
                start: n,
                end: l,
              };
            }
            generatePoints() {
              let t = this.options,
                e = this.processedData || t.data,
                i = this.processedXData,
                s = this.processedYData,
                o = this.pointClass,
                r = i.length,
                a = this.cropStart || 0,
                n = this.hasGroupedData,
                l = t.keys,
                h = [],
                d = t.dataGrouping && t.dataGrouping.groupAll ? a : 0,
                c,
                p,
                u,
                g,
                f = this.data;
              if (!f && !n) {
                let t = [];
                (t.length = e.length), (f = this.data = t);
              }
              for (l && n && (this.options.keys = !1), g = 0; g < r; g++)
                (p = a + g),
                  n
                    ? (((u = new o(this, [i[g]].concat(W(s[g])))).dataGroup =
                        this.groupMap[d + g]),
                      u.dataGroup.options &&
                        ((u.options = u.dataGroup.options),
                        T(u, u.dataGroup.options),
                        delete u.dataLabels))
                    : (u = f[p]) ||
                      void 0 === e[p] ||
                      (f[p] = u = new o(this, e[p], i[g])),
                  u && ((u.index = n ? d + g : p), (h[g] = u));
              if (((this.options.keys = l), f && (r !== (c = f.length) || n)))
                for (g = 0; g < c; g++)
                  g !== a || n || (g += r),
                    f[g] && (f[g].destroyElements(), (f[g].plotX = void 0));
              (this.data = f),
                (this.points = h),
                O(this, "afterGeneratePoints");
            }
            getXExtremes(t) {
              return { min: y(t), max: x(t) };
            }
            getExtremes(t, e) {
              let i = this.xAxis,
                s = this.yAxis,
                o = [],
                r = this.requireSorting && !this.is("column") ? 1 : 0,
                a = !!s && s.positiveValuesOnly,
                n =
                  e ||
                  this.getExtremesFromAll ||
                  this.options.getExtremesFromAll,
                { processedXData: l, processedYData: h } = this,
                d,
                c,
                p,
                u,
                g,
                f,
                m,
                b = 0,
                v = 0,
                S = 0;
              if (this.cropped && n) {
                let t = this.getProcessedData(!0);
                (l = t.xData), (h = t.yData);
              }
              let k = (t = t || this.stackedYData || h || []).length,
                M = l || this.xData;
              for (
                i && ((b = (d = i.getExtremes()).min), (v = d.max)), f = 0;
                f < k;
                f++
              )
                if (
                  ((u = M[f]),
                  (c =
                    (j((g = t[f])) || B(g)) &&
                    ((j(g) ? g > 0 : g.length) || !a)),
                  (p =
                    e ||
                    this.getExtremesFromAll ||
                    this.options.getExtremesFromAll ||
                    this.cropped ||
                    !i ||
                    ((M[f + r] || u) >= b && (M[f - r] || u) <= v)),
                  c && p)
                ) {
                  if ((m = g.length)) for (; m--; ) j(g[m]) && (o[S++] = g[m]);
                  else o[S++] = g;
                }
              let C = { activeYData: o, dataMin: y(o), dataMax: x(o) };
              return O(this, "afterGetExtremes", { dataExtremes: C }), C;
            }
            applyExtremes() {
              let t = this.getExtremes();
              return (this.dataMin = t.dataMin), (this.dataMax = t.dataMax), t;
            }
            getFirstValidPoint(t, e = 0, i = 1) {
              let s = t.length,
                o = e;
              for (; o >= 0 && o < s; ) {
                if (k(t[o])) return t[o];
                o += i;
              }
            }
            translate() {
              this.processedXData || this.processData(), this.generatePoints();
              let t = this.options,
                e = t.stacking,
                i = this.xAxis,
                s = i.categories,
                o = this.enabledDataSorting,
                r = this.yAxis,
                a = this.points,
                n = a.length,
                l = this.pointPlacementToXValue(),
                h = !!l,
                d = t.threshold,
                c = t.startFromThreshold ? d : 0,
                p,
                u,
                g,
                f,
                m = Number.MAX_VALUE;
              function x(t) {
                return b(t, -1e5, 1e5);
              }
              for (p = 0; p < n; p++) {
                let t;
                let n = a[p],
                  y = n.x,
                  b,
                  S,
                  M = n.y,
                  C = n.low,
                  A =
                    e &&
                    r.stacking?.stacks[
                      (this.negStacks && M < (c ? 0 : d) ? "-" : "") +
                        this.stackKey
                    ];
                (u = i.translate(y, !1, !1, !1, !0, l)),
                  (n.plotX = j(u) ? v(x(u)) : void 0),
                  e &&
                    this.visible &&
                    A &&
                    A[y] &&
                    ((f = this.getStackIndicator(f, y, this.index)),
                    !n.isNull && f.key && (S = (b = A[y]).points[f.key]),
                    b &&
                      B(S) &&
                      ((C = S[0]),
                      (M = S[1]),
                      C === c &&
                        f.key === A[y].base &&
                        (C = G(j(d) ? d : r.min)),
                      r.positiveValuesOnly && k(C) && C <= 0 && (C = void 0),
                      (n.total = n.stackTotal = G(b.total)),
                      (n.percentage =
                        k(n.y) && b.total ? (n.y / b.total) * 100 : void 0),
                      (n.stackY = M),
                      this.irregularWidths ||
                        b.setOffset(
                          this.pointXOffset || 0,
                          this.barW || 0,
                          void 0,
                          void 0,
                          void 0,
                          this.xAxis
                        ))),
                  (n.yBottom = k(C)
                    ? x(r.translate(C, !1, !0, !1, !0))
                    : void 0),
                  this.dataModify && (M = this.dataModify.modifyValue(M, p)),
                  j(M) &&
                    void 0 !== n.plotX &&
                    (t = j((t = r.translate(M, !1, !0, !1, !0)))
                      ? x(t)
                      : void 0),
                  (n.plotY = t),
                  (n.isInside = this.isPointInside(n)),
                  (n.clientX = h ? v(i.translate(y, !1, !1, !1, !0, l)) : u),
                  (n.negative = (n.y || 0) < (d || 0)),
                  (n.category = G(s && s[n.x], n.x)),
                  n.isNull ||
                    !1 === n.visible ||
                    (void 0 !== g && (m = Math.min(m, Math.abs(u - g))),
                    (g = u)),
                  (n.zone = this.zones.length ? n.getZone() : void 0),
                  !n.graphic && this.group && o && (n.isNew = !0);
              }
              (this.closestPointRangePx = m), O(this, "afterTranslate");
            }
            getValidPoints(t, e, i) {
              let s = this.chart;
              return (t || this.points || []).filter(function (t) {
                let { plotX: o, plotY: r } = t;
                return (
                  !!(
                    (i || (!t.isNull && j(r))) &&
                    (!e || s.isInsidePlot(o, r, { inverted: s.inverted }))
                  ) && !1 !== t.visible
                );
              });
            }
            getClipBox() {
              let { chart: t, xAxis: e, yAxis: i } = this,
                { x: s, y: o, width: r, height: a } = I(t.clipBox);
              return (
                e && e.len !== t.plotSizeX && (r = e.len),
                i && i.len !== t.plotSizeY && (a = i.len),
                t.inverted && !this.invertible && ([r, a] = [a, r]),
                { x: s, y: o, width: r, height: a }
              );
            }
            getSharedClipKey() {
              return (
                (this.sharedClipKey =
                  (this.options.xAxis || 0) + "," + (this.options.yAxis || 0)),
                this.sharedClipKey
              );
            }
            setClip() {
              let { chart: t, group: e, markerGroup: i } = this,
                s = t.sharedClips,
                o = t.renderer,
                r = this.getClipBox(),
                a = this.getSharedClipKey(),
                n = s[a];
              n ? n.animate(r) : (s[a] = n = o.clipRect(r)),
                e && e.clip(!1 === this.options.clip ? void 0 : n),
                i && i.clip();
            }
            animate(t) {
              let { chart: e, group: i, markerGroup: s } = this,
                o = e.inverted,
                r = d(this.options.animation),
                a = [
                  this.getSharedClipKey(),
                  r.duration,
                  r.easing,
                  r.defer,
                ].join(","),
                n = e.sharedClips[a],
                l = e.sharedClips[a + "m"];
              if (t && i) {
                let t = this.getClipBox();
                if (n) n.attr("height", t.height);
                else {
                  (t.width = 0),
                    o && (t.x = e.plotHeight),
                    (n = e.renderer.clipRect(t)),
                    (e.sharedClips[a] = n);
                  let i = {
                    x: -99,
                    y: -99,
                    width: o ? e.plotWidth + 199 : 99,
                    height: o ? 99 : e.plotHeight + 199,
                  };
                  (l = e.renderer.clipRect(i)), (e.sharedClips[a + "m"] = l);
                }
                i.clip(n), s?.clip(l);
              } else if (n && !n.hasClass("highcharts-animating")) {
                let t = this.getClipBox(),
                  i = r.step;
                (s?.element.childNodes.length || e.series.length > 1) &&
                  (r.step = function (t, e) {
                    i && i.apply(e, arguments),
                      "width" === e.prop &&
                        l?.element &&
                        l.attr(o ? "height" : "width", t + 99);
                  }),
                  n.addClass("highcharts-animating").animate(t, r);
              }
            }
            afterAnimate() {
              this.setClip(),
                z(this.chart.sharedClips, (t, e, i) => {
                  t &&
                    !this.chart.container.querySelector(
                      `[clip-path="url(#${t.id})"]`
                    ) &&
                    (t.destroy(), delete i[e]);
                }),
                (this.finishedAnimating = !0),
                O(this, "afterAnimate");
            }
            drawPoints(t = this.points) {
              let e, i, s, o, r, a, n;
              let l = this.chart,
                h = l.styledMode,
                { colorAxis: d, options: c } = this,
                p = c.marker,
                u = this[this.specialGroup || "markerGroup"],
                g = this.xAxis,
                f = G(
                  p.enabled,
                  !g || !!g.isRadial || null,
                  this.closestPointRangePx >= p.enabledThreshold * p.radius
                );
              if (!1 !== p.enabled || this._hasPointMarkers)
                for (e = 0; e < t.length; e++)
                  if (
                    ((o = (s = (i = t[e]).graphic) ? "animate" : "attr"),
                    (r = i.marker || {}),
                    (a = !!i.marker),
                    ((f && void 0 === r.enabled) || r.enabled) &&
                      !i.isNull &&
                      !1 !== i.visible)
                  ) {
                    let t = G(r.symbol, this.symbol, "rect");
                    (n = this.markerAttribs(i, i.selected && "select")),
                      this.enabledDataSorting &&
                        (i.startXPos = g.reversed ? -(n.width || 0) : g.width);
                    let e = !1 !== i.isInside;
                    if (
                      (!s &&
                        e &&
                        ((n.width || 0) > 0 || i.hasImage) &&
                        ((i.graphic = s =
                          l.renderer
                            .symbol(t, n.x, n.y, n.width, n.height, a ? r : p)
                            .add(u)),
                        this.enabledDataSorting &&
                          l.hasRendered &&
                          (s.attr({ x: i.startXPos }), (o = "animate"))),
                      s &&
                        "animate" === o &&
                        s[e ? "show" : "hide"](e).animate(n),
                      s)
                    ) {
                      let t = this.pointAttribs(
                        i,
                        h || !i.selected ? void 0 : "select"
                      );
                      h ? d && s.css({ fill: t.fill }) : s[o](t);
                    }
                    s && s.addClass(i.getClassName(), !0);
                  } else s && (i.graphic = s.destroy());
            }
            markerAttribs(t, e) {
              let i = this.options,
                s = i.marker,
                o = t.marker || {},
                r = o.symbol || s.symbol,
                a = {},
                n,
                l,
                h = G(o.radius, s && s.radius);
              e &&
                ((n = s.states[e]),
                (h = G(
                  (l = o.states && o.states[e]) && l.radius,
                  n && n.radius,
                  h && h + ((n && n.radiusPlus) || 0)
                ))),
                (t.hasImage = r && 0 === r.indexOf("url")),
                t.hasImage && (h = 0);
              let d = t.pos();
              return (
                j(h) &&
                  d &&
                  (i.crisp &&
                    (d[0] = S(
                      d[0],
                      t.hasImage ? 0 : "rect" === r ? s?.lineWidth || 0 : 1
                    )),
                  (a.x = d[0] - h),
                  (a.y = d[1] - h)),
                h && (a.width = a.height = 2 * h),
                a
              );
            }
            pointAttribs(t, e) {
              let i = this.options.marker,
                s = t && t.options,
                o = (s && s.marker) || {},
                r = s && s.color,
                a = t && t.color,
                n = t && t.zone && t.zone.color,
                l,
                h,
                d = this.color,
                c,
                p,
                u = G(o.lineWidth, i.lineWidth),
                g = 1;
              return (
                (d = r || n || a || d),
                (c = o.fillColor || i.fillColor || d),
                (p = o.lineColor || i.lineColor || d),
                (e = e || "normal"),
                (l = i.states[e] || {}),
                (u = G(
                  (h = (o.states && o.states[e]) || {}).lineWidth,
                  l.lineWidth,
                  u + G(h.lineWidthPlus, l.lineWidthPlus, 0)
                )),
                (c = h.fillColor || l.fillColor || c),
                {
                  stroke: (p = h.lineColor || l.lineColor || p),
                  "stroke-width": u,
                  fill: c,
                  opacity: (g = G(h.opacity, l.opacity, g)),
                }
              );
            }
            destroy(t) {
              let e, i, s;
              let o = this,
                r = o.chart,
                a = /AppleWebKit\/533/.test(f.navigator.userAgent),
                n = o.data || [];
              for (
                O(o, "destroy", { keepEventsForUpdate: t }),
                  this.removeEvents(t),
                  (o.axisTypes || []).forEach(function (t) {
                    (s = o[t]) &&
                      s.series &&
                      (A(s.series, o), (s.isDirty = s.forceRedraw = !0));
                  }),
                  o.legendItem && o.chart.legend.destroyItem(o),
                  e = n.length;
                e--;

              )
                (i = n[e]) && i.destroy && i.destroy();
              for (let t of o.zones) M(t, void 0, !0);
              h.clearTimeout(o.animationTimeout),
                z(o, function (t, e) {
                  t instanceof l &&
                    !t.survive &&
                    t[a && "group" === e ? "hide" : "destroy"]();
                }),
                r.hoverSeries === o && (r.hoverSeries = void 0),
                A(r.series, o),
                r.orderItems("series"),
                z(o, function (e, i) {
                  (t && "hcEvents" === i) || delete o[i];
                });
            }
            applyZones() {
              let {
                  area: t,
                  chart: e,
                  graph: i,
                  zones: s,
                  points: o,
                  xAxis: r,
                  yAxis: a,
                  zoneAxis: n,
                } = this,
                { inverted: l, renderer: h } = e,
                d = this[`${n}Axis`],
                { isXAxis: c, len: p = 0 } = d || {},
                u = (i?.strokeWidth() || 0) / 2 + 1,
                g = (t, e = 0, i = 0) => {
                  l && (i = p - i);
                  let { translated: s = 0, lineClip: o } = t,
                    r = i - s;
                  o?.push([
                    "L",
                    e,
                    Math.abs(r) < u ? i - u * (r <= 0 ? -1 : 1) : s,
                  ]);
                };
              if (s.length && (i || t) && d && j(d.min)) {
                let e = d.getExtremes().max,
                  u = (t) => {
                    t.forEach((e, i) => {
                      ("M" === e[0] || "L" === e[0]) &&
                        (t[i] = [
                          e[0],
                          c ? p - e[1] : e[1],
                          c ? e[2] : p - e[2],
                        ]);
                    });
                  };
                if (
                  (s.forEach((t) => {
                    (t.lineClip = []),
                      (t.translated = b(
                        d.toPixels(G(t.value, e), !0) || 0,
                        0,
                        p
                      ));
                  }),
                  i && !this.showLine && i.hide(),
                  t && t.hide(),
                  "y" === n && o.length < r.len)
                )
                  for (let t of o) {
                    let { plotX: e, plotY: i, zone: o } = t,
                      r = o && s[s.indexOf(o) - 1];
                    o && g(o, e, i), r && g(r, e, i);
                  }
                let f = [],
                  m = d.toPixels(d.getExtremes().min, !0);
                s.forEach((e) => {
                  let s = e.lineClip || [],
                    o = Math.round(e.translated || 0);
                  r.reversed && s.reverse();
                  let { clip: n, simpleClip: d } = e,
                    p = 0,
                    g = 0,
                    x = r.len,
                    y = a.len;
                  c ? ((p = o), (x = m)) : ((g = o), (y = m));
                  let b = [
                      ["M", p, g],
                      ["L", x, g],
                      ["L", x, y],
                      ["L", p, y],
                      ["Z"],
                    ],
                    v = [b[0], ...s, b[1], b[2], ...f, b[3], b[4]];
                  (f = s.reverse()),
                    (m = o),
                    l && (u(v), t && u(b)),
                    n
                      ? (n.animate({ d: v }), d?.animate({ d: b }))
                      : ((n = e.clip = h.path(v)),
                        t && (d = e.simpleClip = h.path(b))),
                    i && e.graph?.clip(n),
                    t && e.area?.clip(d);
                });
              } else this.visible && (i && i.show(), t && t.show());
            }
            plotGroup(t, e, i, s, o) {
              let r = this[t],
                a = !r,
                n = { visibility: i, zIndex: s || 0.1 };
              return (
                k(this.opacity) &&
                  !this.chart.styledMode &&
                  "inactive" !== this.state &&
                  (n.opacity = this.opacity),
                r || (this[t] = r = this.chart.renderer.g().add(o)),
                r.addClass(
                  "highcharts-" +
                    e +
                    " highcharts-series-" +
                    this.index +
                    " highcharts-" +
                    this.type +
                    "-series " +
                    (k(this.colorIndex)
                      ? "highcharts-color-" + this.colorIndex + " "
                      : "") +
                    (this.options.className || "") +
                    (r.hasClass("highcharts-tracker")
                      ? " highcharts-tracker"
                      : ""),
                  !0
                ),
                r.attr(n)[a ? "attr" : "animate"](this.getPlotBox(e)),
                r
              );
            }
            getPlotBox(t) {
              let e = this.xAxis,
                i = this.yAxis,
                s = this.chart,
                o =
                  s.inverted &&
                  !s.polar &&
                  e &&
                  this.invertible &&
                  "series" === t;
              return (
                s.inverted && ((e = i), (i = this.xAxis)),
                {
                  translateX: e ? e.left : s.plotLeft,
                  translateY: i ? i.top : s.plotTop,
                  rotation: o ? 90 : 0,
                  rotationOriginX: o ? (e.len - i.len) / 2 : 0,
                  rotationOriginY: o ? (e.len + i.len) / 2 : 0,
                  scaleX: o ? -1 : 1,
                  scaleY: 1,
                }
              );
            }
            removeEvents(t) {
              let { eventsToUnbind: e } = this;
              t || N(this),
                e.length &&
                  (e.forEach((t) => {
                    t();
                  }),
                  (e.length = 0));
            }
            render() {
              let t = this,
                { chart: e, options: i, hasRendered: s } = t,
                o = d(i.animation),
                r = t.visible ? "inherit" : "hidden",
                a = i.zIndex,
                n = e.seriesGroup,
                l = t.finishedAnimating ? 0 : o.duration;
              O(this, "render"),
                t.plotGroup("group", "series", r, a, n),
                (t.markerGroup = t.plotGroup(
                  "markerGroup",
                  "markers",
                  r,
                  a,
                  n
                )),
                !1 !== i.clip && t.setClip(),
                l && t.animate?.(!0),
                t.drawGraph && (t.drawGraph(), t.applyZones()),
                t.visible && t.drawPoints(),
                t.drawDataLabels?.(),
                t.redrawPoints?.(),
                i.enableMouseTracking && t.drawTracker?.(),
                l && t.animate?.(),
                s ||
                  (l && o.defer && (l += o.defer),
                  (t.animationTimeout = H(() => {
                    t.afterAnimate();
                  }, l || 0))),
                (t.isDirty = !1),
                (t.hasRendered = !0),
                O(t, "afterRender");
            }
            redraw() {
              let t = this.isDirty || this.isDirtyData;
              this.translate(), this.render(), t && delete this.kdTree;
            }
            reserveSpace() {
              return (
                this.visible || !this.chart.options.chart.ignoreHiddenSeries
              );
            }
            searchPoint(t, e) {
              let { xAxis: i, yAxis: s } = this,
                o = this.chart.inverted;
              return this.searchKDTree(
                {
                  clientX: o ? i.len - t.chartY + i.pos : t.chartX - i.pos,
                  plotY: o ? s.len - t.chartX + s.pos : t.chartY - s.pos,
                },
                e,
                t
              );
            }
            buildKDTree(t) {
              this.buildingKdTree = !0;
              let e = this,
                i = e.options.findNearestPointBy.indexOf("y") > -1 ? 2 : 1;
              delete e.kdTree,
                H(
                  function () {
                    (e.kdTree = (function t(i, s, o) {
                      let r, a;
                      let n = i?.length;
                      if (n)
                        return (
                          (r = e.kdAxisArray[s % o]),
                          i.sort((t, e) => (t[r] || 0) - (e[r] || 0)),
                          {
                            point: i[(a = Math.floor(n / 2))],
                            left: t(i.slice(0, a), s + 1, o),
                            right: t(i.slice(a + 1), s + 1, o),
                          }
                        );
                    })(e.getValidPoints(void 0, !e.directTouch), i, i)),
                      (e.buildingKdTree = !1);
                  },
                  e.options.kdNow || t?.type === "touchstart" ? 0 : 1
                );
            }
            searchKDTree(t, e, i) {
              let s = this,
                [o, r] = this.kdAxisArray,
                a = e ? "distX" : "dist",
                n =
                  (s.options.findNearestPointBy || "").indexOf("y") > -1
                    ? 2
                    : 1,
                l = !!s.isBubble;
              if (
                (this.kdTree || this.buildingKdTree || this.buildKDTree(i),
                this.kdTree)
              )
                return (function t(e, i, n, h) {
                  let d = i.point,
                    c = s.kdAxisArray[n % h],
                    p,
                    u,
                    g = d;
                  !(function (t, e) {
                    let i = t[o],
                      s = e[o],
                      a = k(i) && k(s) ? i - s : null,
                      n = t[r],
                      h = e[r],
                      d = k(n) && k(h) ? n - h : 0,
                      c = (l && e.marker?.radius) || 0;
                    (e.dist = Math.sqrt(((a && a * a) || 0) + d * d) - c),
                      (e.distX = k(a) ? Math.abs(a) - c : Number.MAX_VALUE);
                  })(e, d);
                  let f =
                      (e[c] || 0) -
                      (d[c] || 0) +
                      ((l && d.marker?.radius) || 0),
                    m = f < 0 ? "left" : "right",
                    x = f < 0 ? "right" : "left";
                  return (
                    i[m] && (g = (p = t(e, i[m], n + 1, h))[a] < g[a] ? p : d),
                    i[x] &&
                      Math.sqrt(f * f) < g[a] &&
                      (g = (u = t(e, i[x], n + 1, h))[a] < g[a] ? u : g),
                    g
                  );
                })(t, this.kdTree, n, n);
            }
            pointPlacementToXValue() {
              let { options: t, xAxis: e } = this,
                i = t.pointPlacement;
              return (
                "between" === i && (i = e.reversed ? -0.5 : 0.5),
                j(i) ? i * (t.pointRange || e.pointRange) : 0
              );
            }
            isPointInside(t) {
              let { chart: e, xAxis: i, yAxis: s } = this,
                { plotX: o = -1, plotY: r = -1 } = t;
              return (
                r >= 0 &&
                r <= (s ? s.len : e.plotHeight) &&
                o >= 0 &&
                o <= (i ? i.len : e.plotWidth)
              );
            }
            drawTracker() {
              let t = this,
                e = t.options,
                i = e.trackByArea,
                s = [].concat((i ? t.areaPath : t.graphPath) || []),
                o = t.chart,
                r = o.pointer,
                a = o.renderer,
                n = o.options.tooltip?.snap || 0,
                l = () => {
                  e.enableMouseTracking &&
                    o.hoverSeries !== t &&
                    t.onMouseOver();
                },
                h = "rgba(192,192,192," + (g ? 1e-4 : 0.002) + ")",
                d = t.tracker;
              d
                ? d.attr({ d: s })
                : t.graph &&
                  ((t.tracker = d =
                    a
                      .path(s)
                      .attr({
                        visibility: t.visible ? "inherit" : "hidden",
                        zIndex: 2,
                      })
                      .addClass(
                        i
                          ? "highcharts-tracker-area"
                          : "highcharts-tracker-line"
                      )
                      .add(t.group)),
                  o.styledMode ||
                    d.attr({
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      stroke: h,
                      fill: i ? h : "none",
                      "stroke-width": t.graph.strokeWidth() + (i ? 0 : 2 * n),
                    }),
                  [t.tracker, t.markerGroup, t.dataLabelsGroup].forEach((t) => {
                    t &&
                      (t
                        .addClass("highcharts-tracker")
                        .on("mouseover", l)
                        .on("mouseout", (t) => {
                          r?.onTrackerMouseOut(t);
                        }),
                      e.cursor && !o.styledMode && t.css({ cursor: e.cursor }),
                      t.on("touchstart", l));
                  })),
                O(this, "afterDrawTracker");
            }
            addPoint(t, e, i, s, o) {
              let r, a;
              let n = this.options,
                l = this.data,
                h = this.chart,
                d = this.xAxis,
                c = d && d.hasNames && d.names,
                p = n.data,
                u = this.xData;
              e = G(e, !0);
              let g = { series: this };
              this.pointClass.prototype.applyOptions.apply(g, [t]);
              let f = g.x;
              if (((a = u.length), this.requireSorting && f < u[a - 1]))
                for (r = !0; a && u[a - 1] > f; ) a--;
              this.updateParallelArrays(g, "splice", [a, 0, 0]),
                this.updateParallelArrays(g, a),
                c && g.name && (c[f] = g.name),
                p.splice(a, 0, t),
                (r || this.processedData) &&
                  (this.data.splice(a, 0, null), this.processData()),
                "point" === n.legendType && this.generatePoints(),
                i &&
                  (l[0] && l[0].remove
                    ? l[0].remove(!1)
                    : (l.shift(),
                      this.updateParallelArrays(g, "shift"),
                      p.shift())),
                !1 !== o && O(this, "addPoint", { point: g }),
                (this.isDirty = !0),
                (this.isDirtyData = !0),
                e && h.redraw(s);
            }
            removePoint(t, e, i) {
              let s = this,
                o = s.data,
                r = o[t],
                a = s.points,
                n = s.chart,
                l = function () {
                  a && a.length === o.length && a.splice(t, 1),
                    o.splice(t, 1),
                    s.options.data.splice(t, 1),
                    s.updateParallelArrays(r || { series: s }, "splice", [
                      t,
                      1,
                    ]),
                    r && r.destroy(),
                    (s.isDirty = !0),
                    (s.isDirtyData = !0),
                    e && n.redraw();
                };
              c(i, n),
                (e = G(e, !0)),
                r ? r.firePointEvent("remove", null, l) : l();
            }
            remove(t, e, i, s) {
              let o = this,
                r = o.chart;
              function a() {
                o.destroy(s),
                  (r.isDirtyLegend = r.isDirtyBox = !0),
                  r.linkSeries(s),
                  G(t, !0) && r.redraw(e);
              }
              !1 !== i ? O(o, "remove", null, a) : a();
            }
            update(t, e) {
              O(this, "update", { options: (t = C(t, this.userOptions)) });
              let i = this,
                s = i.chart,
                o = i.userOptions,
                r = i.initialType || i.type,
                a = s.options.plotOptions,
                n = m[r].prototype,
                l = i.finishedAnimating && { animation: !1 },
                h = {},
                d,
                c,
                p = [
                  "colorIndex",
                  "eventOptions",
                  "navigatorSeries",
                  "symbolIndex",
                  "baseSeries",
                ],
                u = t.type || o.type || s.options.chart.type,
                g = !(
                  this.hasDerivedData ||
                  (u && u !== this.type) ||
                  void 0 !== t.pointStart ||
                  void 0 !== t.pointInterval ||
                  void 0 !== t.relativeXValue ||
                  t.joinBy ||
                  t.mapData ||
                  [
                    "dataGrouping",
                    "pointStart",
                    "pointInterval",
                    "pointIntervalUnit",
                    "keys",
                  ].some((t) => i.hasOptionChanged(t))
                );
              (u = u || r),
                g &&
                  (p.push(
                    "data",
                    "isDirtyData",
                    "isDirtyCanvas",
                    "points",
                    "processedData",
                    "processedXData",
                    "processedYData",
                    "xIncrement",
                    "cropped",
                    "_hasPointMarkers",
                    "hasDataLabels",
                    "nodes",
                    "layout",
                    "level",
                    "mapMap",
                    "mapData",
                    "minY",
                    "maxY",
                    "minX",
                    "maxX",
                    "transformGroups"
                  ),
                  !1 !== t.visible && p.push("area", "graph"),
                  i.parallelArrays.forEach(function (t) {
                    p.push(t + "Data");
                  }),
                  t.data &&
                    (t.dataSorting && T(i.options.dataSorting, t.dataSorting),
                    this.setData(t.data, !1))),
                (t = I(
                  o,
                  {
                    index: void 0 === o.index ? i.index : o.index,
                    pointStart:
                      a?.series?.pointStart ?? o.pointStart ?? i.xData?.[0],
                  },
                  !g && { data: i.options.data },
                  t,
                  l
                )),
                g && t.data && (t.data = i.options.data),
                (p = [
                  "group",
                  "markerGroup",
                  "dataLabelsGroup",
                  "transformGroup",
                ].concat(p)).forEach(function (t) {
                  (p[t] = i[t]), delete i[t];
                });
              let f = !1;
              if (m[u]) {
                if (((f = u !== i.type), i.remove(!1, !1, !1, !0), f)) {
                  if ((s.propFromSeries(), Object.setPrototypeOf))
                    Object.setPrototypeOf(i, m[u].prototype);
                  else {
                    let t =
                      Object.hasOwnProperty.call(i, "hcEvents") && i.hcEvents;
                    for (c in n) i[c] = void 0;
                    T(i, m[u].prototype),
                      t ? (i.hcEvents = t) : delete i.hcEvents;
                  }
                }
              } else w(17, !0, s, { missingModuleFor: u });
              if (
                (p.forEach(function (t) {
                  i[t] = p[t];
                }),
                i.init(s, t),
                g && this.points)
              )
                for (let t of (!1 === (d = i.options).visible
                  ? ((h.graphic = 1), (h.dataLabel = 1))
                  : (this.hasMarkerChanged(d, o) && (h.graphic = 1),
                    i.hasDataLabels?.() || (h.dataLabel = 1)),
                this.points))
                  t &&
                    t.series &&
                    (t.resolveColor(),
                    Object.keys(h).length && t.destroyElements(h),
                    !1 === d.showInLegend &&
                      t.legendItem &&
                      s.legend.destroyItem(t));
              (i.initialType = r),
                s.linkSeries(),
                s.setSortedData(),
                f && i.linkedSeries.length && (i.isDirtyData = !0),
                O(this, "afterUpdate"),
                G(e, !0) && s.redraw(!!g && void 0);
            }
            setName(t) {
              (this.name = this.options.name = this.userOptions.name = t),
                (this.chart.isDirtyLegend = !0);
            }
            hasOptionChanged(t) {
              let e = this.chart,
                i = this.options[t],
                s = e.options.plotOptions,
                o = this.userOptions[t],
                r = G(s?.[this.type]?.[t], s?.series?.[t]);
              return o && !k(r) ? i !== o : i !== G(r, i);
            }
            onMouseOver() {
              let t = this.chart,
                e = t.hoverSeries,
                i = t.pointer;
              i?.setHoverChartIndex(),
                e && e !== this && e.onMouseOut(),
                this.options.events.mouseOver && O(this, "mouseOver"),
                this.setState("hover"),
                (t.hoverSeries = this);
            }
            onMouseOut() {
              let t = this.options,
                e = this.chart,
                i = e.tooltip,
                s = e.hoverPoint;
              (e.hoverSeries = null),
                s && s.onMouseOut(),
                this && t.events.mouseOut && O(this, "mouseOut"),
                i &&
                  !this.stickyTracking &&
                  (!i.shared || this.noSharedTooltip) &&
                  i.hide(),
                e.series.forEach(function (t) {
                  t.setState("", !0);
                });
            }
            setState(t, e) {
              let i = this,
                s = i.options,
                o = i.graph,
                r = s.inactiveOtherPoints,
                a = s.states,
                n = G(
                  a[t || "normal"] && a[t || "normal"].animation,
                  i.chart.options.chart.animation
                ),
                l = s.lineWidth,
                h = s.opacity;
              if (
                ((t = t || ""),
                i.state !== t &&
                  ([i.group, i.markerGroup, i.dataLabelsGroup].forEach(
                    function (e) {
                      e &&
                        (i.state &&
                          e.removeClass("highcharts-series-" + i.state),
                        t && e.addClass("highcharts-series-" + t));
                    }
                  ),
                  (i.state = t),
                  !i.chart.styledMode))
              ) {
                if (a[t] && !1 === a[t].enabled) return;
                if (
                  (t &&
                    ((l = a[t].lineWidth || l + (a[t].lineWidthPlus || 0)),
                    (h = G(a[t].opacity, h))),
                  o && !o.dashstyle && j(l))
                )
                  for (let t of [o, ...this.zones.map((t) => t.graph)])
                    t?.animate({ "stroke-width": l }, n);
                r ||
                  [
                    i.group,
                    i.markerGroup,
                    i.dataLabelsGroup,
                    i.labelBySeries,
                  ].forEach(function (t) {
                    t && t.animate({ opacity: h }, n);
                  });
              }
              e && r && i.points && i.setAllPointsToState(t || void 0);
            }
            setAllPointsToState(t) {
              this.points.forEach(function (e) {
                e.setState && e.setState(t);
              });
            }
            setVisible(t, e) {
              let i = this,
                s = i.chart,
                o = s.options.chart.ignoreHiddenSeries,
                r = i.visible;
              i.visible =
                t =
                i.options.visible =
                i.userOptions.visible =
                  void 0 === t ? !r : t;
              let a = t ? "show" : "hide";
              [
                "group",
                "dataLabelsGroup",
                "markerGroup",
                "tracker",
                "tt",
              ].forEach((t) => {
                i[t]?.[a]();
              }),
                (s.hoverSeries === i || s.hoverPoint?.series === i) &&
                  i.onMouseOut(),
                i.legendItem && s.legend.colorizeItem(i, t),
                (i.isDirty = !0),
                i.options.stacking &&
                  s.series.forEach((t) => {
                    t.options.stacking && t.visible && (t.isDirty = !0);
                  }),
                i.linkedSeries.forEach((e) => {
                  e.setVisible(t, !1);
                }),
                o && (s.isDirtyBox = !0),
                O(i, a),
                !1 !== e && s.redraw();
            }
            show() {
              this.setVisible(!0);
            }
            hide() {
              this.setVisible(!1);
            }
            select(t) {
              (this.selected =
                t =
                this.options.selected =
                  void 0 === t ? !this.selected : t),
                this.checkbox && (this.checkbox.checked = t),
                O(this, t ? "select" : "unselect");
            }
            shouldShowTooltip(t, e, i = {}) {
              return (
                (i.series = this),
                (i.visiblePlotOnly = !0),
                this.chart.isInsidePlot(t, e, i)
              );
            }
            drawLegendSymbol(t, e) {
              o[this.options.legendSymbol || "rectangle"]?.call(this, t, e);
            }
          }
          return (
            (X.defaultOptions = a),
            (X.types = n.seriesTypes),
            (X.registerType = n.registerSeriesType),
            T(X.prototype, {
              axisTypes: ["xAxis", "yAxis"],
              coll: "series",
              colorCounter: 0,
              directTouch: !1,
              invertible: !0,
              isCartesian: !0,
              kdAxisArray: ["clientX", "plotY"],
              parallelArrays: ["x", "y"],
              pointClass: r,
              requireSorting: !0,
              sorted: !0,
            }),
            (n.series = X),
            X
          );
        }
      ),
      i(
        e,
        "Core/Legend/Legend.js",
        [
          e["Core/Animation/AnimationUtilities.js"],
          e["Core/Foundation.js"],
          e["Core/Globals.js"],
          e["Core/Series/Series.js"],
          e["Core/Series/Point.js"],
          e["Core/Renderer/RendererUtilities.js"],
          e["Core/Templating.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s, o, r, a, n) {
          var l;
          let { animObject: h, setAnimation: d } = t,
            { registerEventOptions: c } = e,
            { composed: p, marginNames: u } = i,
            { distribute: g } = r,
            { format: f } = a,
            {
              addEvent: m,
              createElement: x,
              css: y,
              defined: b,
              discardElement: v,
              find: S,
              fireEvent: k,
              isNumber: M,
              merge: C,
              pick: A,
              pushUnique: w,
              relativeLength: T,
              stableSort: P,
              syncTimeout: O,
            } = n;
          class L {
            constructor(t, e) {
              (this.allItems = []),
                (this.initialItemY = 0),
                (this.itemHeight = 0),
                (this.itemMarginBottom = 0),
                (this.itemMarginTop = 0),
                (this.itemX = 0),
                (this.itemY = 0),
                (this.lastItemY = 0),
                (this.lastLineHeight = 0),
                (this.legendHeight = 0),
                (this.legendWidth = 0),
                (this.maxItemWidth = 0),
                (this.maxLegendWidth = 0),
                (this.offsetWidth = 0),
                (this.padding = 0),
                (this.pages = []),
                (this.symbolHeight = 0),
                (this.symbolWidth = 0),
                (this.titleHeight = 0),
                (this.totalItemWidth = 0),
                (this.widthOption = 0),
                (this.chart = t),
                this.setOptions(e),
                e.enabled &&
                  (this.render(),
                  c(this, e),
                  m(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes();
                  })),
                m(this.chart, "render", () => {
                  this.options.enabled &&
                    this.proximate &&
                    (this.proximatePositions(), this.positionItems());
                });
            }
            setOptions(t) {
              let e = A(t.padding, 8);
              (this.options = t),
                this.chart.styledMode ||
                  ((this.itemStyle = t.itemStyle),
                  (this.itemHiddenStyle = C(
                    this.itemStyle,
                    t.itemHiddenStyle
                  ))),
                (this.itemMarginTop = t.itemMarginTop),
                (this.itemMarginBottom = t.itemMarginBottom),
                (this.padding = e),
                (this.initialItemY = e - 5),
                (this.symbolWidth = A(t.symbolWidth, 16)),
                (this.pages = []),
                (this.proximate =
                  "proximate" === t.layout && !this.chart.inverted),
                (this.baseline = void 0);
            }
            update(t, e) {
              let i = this.chart;
              this.setOptions(C(!0, this.options, t)),
                "events" in this.options && c(this, this.options),
                this.destroy(),
                (i.isDirtyLegend = i.isDirtyBox = !0),
                A(e, !0) && i.redraw(),
                k(this, "afterUpdate", { redraw: e });
            }
            colorizeItem(t, e) {
              let {
                area: i,
                group: s,
                label: o,
                line: r,
                symbol: a,
              } = t.legendItem || {};
              if (
                (s?.[e ? "removeClass" : "addClass"](
                  "highcharts-legend-item-hidden"
                ),
                !this.chart.styledMode)
              ) {
                let { itemHiddenStyle: s = {} } = this,
                  n = s.color,
                  {
                    fillColor: l,
                    fillOpacity: h,
                    lineColor: d,
                    marker: c,
                  } = t.options,
                  p = (t) => (
                    !e && (t.fill && (t.fill = n), t.stroke && (t.stroke = n)),
                    t
                  );
                o?.css(C(e ? this.itemStyle : s)),
                  r?.attr(p({ stroke: d || t.color })),
                  a &&
                    a.attr(
                      p(c && a.isMarker ? t.pointAttribs() : { fill: t.color })
                    ),
                  i?.attr(
                    p({ fill: l || t.color, "fill-opacity": l ? 1 : h ?? 0.75 })
                  );
              }
              k(this, "afterColorizeItem", { item: t, visible: e });
            }
            positionItems() {
              this.allItems.forEach(this.positionItem, this),
                this.chart.isResizing || this.positionCheckboxes();
            }
            positionItem(t) {
              let { group: e, x: i = 0, y: s = 0 } = t.legendItem || {},
                o = this.options,
                r = o.symbolPadding,
                a = !o.rtl,
                n = t.checkbox;
              if (e && e.element) {
                let o = {
                  translateX: a ? i : this.legendWidth - i - 2 * r - 4,
                  translateY: s,
                };
                e[b(e.translateY) ? "animate" : "attr"](o, void 0, () => {
                  k(this, "afterPositionItem", { item: t });
                });
              }
              n && ((n.x = i), (n.y = s));
            }
            destroyItem(t) {
              let e = t.checkbox,
                i = t.legendItem || {};
              for (let t of ["group", "label", "line", "symbol"])
                i[t] && (i[t] = i[t].destroy());
              e && v(e), (t.legendItem = void 0);
            }
            destroy() {
              for (let t of this.getAllItems()) this.destroyItem(t);
              for (let t of [
                "clipRect",
                "up",
                "down",
                "pager",
                "nav",
                "box",
                "title",
                "group",
              ])
                this[t] && (this[t] = this[t].destroy());
              this.display = null;
            }
            positionCheckboxes() {
              let t;
              let e = this.group && this.group.alignAttr,
                i = this.clipHeight || this.legendHeight,
                s = this.titleHeight;
              e &&
                ((t = e.translateY),
                this.allItems.forEach(function (o) {
                  let r;
                  let a = o.checkbox;
                  a &&
                    ((r = t + s + a.y + (this.scrollOffset || 0) + 3),
                    y(a, {
                      left: e.translateX + o.checkboxOffset + a.x - 20 + "px",
                      top: r + "px",
                      display:
                        this.proximate || (r > t - 6 && r < t + i - 6)
                          ? ""
                          : "none",
                    }));
                }, this));
            }
            renderTitle() {
              let t = this.options,
                e = this.padding,
                i = t.title,
                s,
                o = 0;
              i.text &&
                (this.title ||
                  ((this.title = this.chart.renderer
                    .label(
                      i.text,
                      e - 3,
                      e - 4,
                      void 0,
                      void 0,
                      void 0,
                      t.useHTML,
                      void 0,
                      "legend-title"
                    )
                    .attr({ zIndex: 1 })),
                  this.chart.styledMode || this.title.css(i.style),
                  this.title.add(this.group)),
                i.width ||
                  this.title.css({ width: this.maxLegendWidth + "px" }),
                (o = (s = this.title.getBBox()).height),
                (this.offsetWidth = s.width),
                this.contentGroup.attr({ translateY: o })),
                (this.titleHeight = o);
            }
            setText(t) {
              let e = this.options;
              t.legendItem.label.attr({
                text: e.labelFormat
                  ? f(e.labelFormat, t, this.chart)
                  : e.labelFormatter.call(t),
              });
            }
            renderItem(t) {
              let e = (t.legendItem = t.legendItem || {}),
                i = this.chart,
                s = i.renderer,
                o = this.options,
                r = "horizontal" === o.layout,
                a = this.symbolWidth,
                n = o.symbolPadding || 0,
                l = this.itemStyle,
                h = this.itemHiddenStyle,
                d = r ? A(o.itemDistance, 20) : 0,
                c = !o.rtl,
                p = !t.series,
                u = !p && t.series.drawLegendSymbol ? t.series : t,
                g = u.options,
                f = !!this.createCheckboxForItem && g && g.showCheckbox,
                m = o.useHTML,
                x = t.options.className,
                y = e.label,
                b = a + n + d + (f ? 20 : 0);
              !y &&
                ((e.group = s
                  .g("legend-item")
                  .addClass(
                    "highcharts-" +
                      u.type +
                      "-series highcharts-color-" +
                      t.colorIndex +
                      (x ? " " + x : "") +
                      (p ? " highcharts-series-" + t.index : "")
                  )
                  .attr({ zIndex: 1 })
                  .add(this.scrollGroup)),
                (e.label = y =
                  s.text("", c ? a + n : -n, this.baseline || 0, m)),
                i.styledMode || y.css(C(t.visible ? l : h)),
                y.attr({ align: c ? "left" : "right", zIndex: 2 }).add(e.group),
                !this.baseline &&
                  ((this.fontMetrics = s.fontMetrics(y)),
                  (this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop),
                  y.attr("y", this.baseline),
                  (this.symbolHeight = A(o.symbolHeight, this.fontMetrics.f)),
                  o.squareSymbol &&
                    ((this.symbolWidth = A(
                      o.symbolWidth,
                      Math.max(this.symbolHeight, 16)
                    )),
                    (b = this.symbolWidth + n + d + (f ? 20 : 0)),
                    c && y.attr("x", this.symbolWidth + n))),
                u.drawLegendSymbol(this, t),
                this.setItemEvents && this.setItemEvents(t, y, m)),
                f &&
                  !t.checkbox &&
                  this.createCheckboxForItem &&
                  this.createCheckboxForItem(t),
                this.colorizeItem(t, t.visible),
                (i.styledMode || !l.width) &&
                  y.css({
                    width:
                      (o.itemWidth || this.widthOption || i.spacingBox.width) -
                      b +
                      "px",
                  }),
                this.setText(t);
              let v = y.getBBox(),
                S = (this.fontMetrics && this.fontMetrics.h) || 0;
              (t.itemWidth = t.checkboxOffset =
                o.itemWidth || e.labelWidth || v.width + b),
                (this.maxItemWidth = Math.max(this.maxItemWidth, t.itemWidth)),
                (this.totalItemWidth += t.itemWidth),
                (this.itemHeight = t.itemHeight =
                  Math.round(
                    e.labelHeight || (v.height > 1.5 * S ? v.height : S)
                  ));
            }
            layoutItem(t) {
              let e = this.options,
                i = this.padding,
                s = "horizontal" === e.layout,
                o = t.itemHeight,
                r = this.itemMarginBottom,
                a = this.itemMarginTop,
                n = s ? A(e.itemDistance, 20) : 0,
                l = this.maxLegendWidth,
                h =
                  e.alignColumns && this.totalItemWidth > l
                    ? this.maxItemWidth
                    : t.itemWidth,
                d = t.legendItem || {};
              s &&
                this.itemX - i + h > l &&
                ((this.itemX = i),
                this.lastLineHeight &&
                  (this.itemY += a + this.lastLineHeight + r),
                (this.lastLineHeight = 0)),
                (this.lastItemY = a + this.itemY + r),
                (this.lastLineHeight = Math.max(o, this.lastLineHeight)),
                (d.x = this.itemX),
                (d.y = this.itemY),
                s
                  ? (this.itemX += h)
                  : ((this.itemY += a + o + r), (this.lastLineHeight = o)),
                (this.offsetWidth =
                  this.widthOption ||
                  Math.max(
                    (s ? this.itemX - i - (t.checkbox ? 0 : n) : h) + i,
                    this.offsetWidth
                  ));
            }
            getAllItems() {
              let t = [];
              return (
                this.chart.series.forEach(function (e) {
                  let i = e && e.options;
                  e &&
                    A(i.showInLegend, !b(i.linkedTo) && void 0, !0) &&
                    (t = t.concat(
                      (e.legendItem || {}).labels ||
                        ("point" === i.legendType ? e.data : e)
                    ));
                }),
                k(this, "afterGetAllItems", { allItems: t }),
                t
              );
            }
            getAlignment() {
              let t = this.options;
              return this.proximate
                ? t.align.charAt(0) + "tv"
                : t.floating
                ? ""
                : t.align.charAt(0) +
                  t.verticalAlign.charAt(0) +
                  t.layout.charAt(0);
            }
            adjustMargins(t, e) {
              let i = this.chart,
                s = this.options,
                o = this.getAlignment();
              o &&
                [
                  /(lth|ct|rth)/,
                  /(rtv|rm|rbv)/,
                  /(rbh|cb|lbh)/,
                  /(lbv|lm|ltv)/,
                ].forEach(function (r, a) {
                  r.test(o) &&
                    !b(t[a]) &&
                    (i[u[a]] = Math.max(
                      i[u[a]],
                      i.legend[(a + 1) % 2 ? "legendHeight" : "legendWidth"] +
                        [1, -1, -1, 1][a] * s[a % 2 ? "x" : "y"] +
                        A(s.margin, 12) +
                        e[a] +
                        (i.titleOffset[a] || 0)
                    ));
                });
            }
            proximatePositions() {
              let t;
              let e = this.chart,
                i = [],
                s = "left" === this.options.align;
              for (let o of (this.allItems.forEach(function (t) {
                let o,
                  r,
                  a = s,
                  n,
                  l;
                t.yAxis &&
                  (t.xAxis.options.reversed && (a = !a),
                  t.points &&
                    (o = S(
                      a ? t.points : t.points.slice(0).reverse(),
                      function (t) {
                        return M(t.plotY);
                      }
                    )),
                  (r =
                    this.itemMarginTop +
                    t.legendItem.label.getBBox().height +
                    this.itemMarginBottom),
                  (l = t.yAxis.top - e.plotTop),
                  (n = t.visible
                    ? (o ? o.plotY : t.yAxis.height) + (l - 0.3 * r)
                    : l + t.yAxis.height),
                  i.push({ target: n, size: r, item: t }));
              }, this),
              g(i, e.plotHeight)))
                (t = o.item.legendItem || {}),
                  M(o.pos) && (t.y = e.plotTop - e.spacing[0] + o.pos);
            }
            render() {
              let t = this.chart,
                e = t.renderer,
                i = this.options,
                s = this.padding,
                o = this.getAllItems(),
                r,
                a,
                n,
                l = this.group,
                h,
                d = this.box;
              (this.itemX = s),
                (this.itemY = this.initialItemY),
                (this.offsetWidth = 0),
                (this.lastItemY = 0),
                (this.widthOption = T(i.width, t.spacingBox.width - s)),
                (h = t.spacingBox.width - 2 * s - i.x),
                ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) >
                  -1 && (h /= 2),
                (this.maxLegendWidth = this.widthOption || h),
                l ||
                  ((this.group = l =
                    e
                      .g("legend")
                      .addClass(i.className || "")
                      .attr({ zIndex: 7 })
                      .add()),
                  (this.contentGroup = e.g().attr({ zIndex: 1 }).add(l)),
                  (this.scrollGroup = e.g().add(this.contentGroup))),
                this.renderTitle(),
                P(
                  o,
                  (t, e) =>
                    ((t.options && t.options.legendIndex) || 0) -
                    ((e.options && e.options.legendIndex) || 0)
                ),
                i.reversed && o.reverse(),
                (this.allItems = o),
                (this.display = r = !!o.length),
                (this.lastLineHeight = 0),
                (this.maxItemWidth = 0),
                (this.totalItemWidth = 0),
                (this.itemHeight = 0),
                o.forEach(this.renderItem, this),
                o.forEach(this.layoutItem, this),
                (a = (this.widthOption || this.offsetWidth) + s),
                (n = this.lastItemY + this.lastLineHeight + this.titleHeight),
                (n = this.handleOverflow(n) + s),
                d ||
                  (this.box = d =
                    e
                      .rect()
                      .addClass("highcharts-legend-box")
                      .attr({ r: i.borderRadius })
                      .add(l)),
                t.styledMode ||
                  d
                    .attr({
                      stroke: i.borderColor,
                      "stroke-width": i.borderWidth || 0,
                      fill: i.backgroundColor || "none",
                    })
                    .shadow(i.shadow),
                a > 0 &&
                  n > 0 &&
                  d[d.placed ? "animate" : "attr"](
                    d.crisp.call(
                      {},
                      { x: 0, y: 0, width: a, height: n },
                      d.strokeWidth()
                    )
                  ),
                l[r ? "show" : "hide"](),
                t.styledMode && "none" === l.getStyle("display") && (a = n = 0),
                (this.legendWidth = a),
                (this.legendHeight = n),
                r && this.align(),
                this.proximate || this.positionItems(),
                k(this, "afterRender");
            }
            align(t = this.chart.spacingBox) {
              let e = this.chart,
                i = this.options,
                s = t.y;
              /(lth|ct|rth)/.test(this.getAlignment()) && e.titleOffset[0] > 0
                ? (s += e.titleOffset[0])
                : /(lbh|cb|rbh)/.test(this.getAlignment()) &&
                  e.titleOffset[2] > 0 &&
                  (s -= e.titleOffset[2]),
                s !== t.y && (t = C(t, { y: s })),
                e.hasRendered || (this.group.placed = !1),
                this.group.align(
                  C(i, {
                    width: this.legendWidth,
                    height: this.legendHeight,
                    verticalAlign: this.proximate ? "top" : i.verticalAlign,
                  }),
                  !0,
                  t
                );
            }
            handleOverflow(t) {
              let e = this,
                i = this.chart,
                s = i.renderer,
                o = this.options,
                r = o.y,
                a = "top" === o.verticalAlign,
                n = this.padding,
                l = o.maxHeight,
                h = o.navigation,
                d = A(h.animation, !0),
                c = h.arrowSize || 12,
                p = this.pages,
                u = this.allItems,
                g = function (t) {
                  "number" == typeof t
                    ? S.attr({ height: t })
                    : S && ((e.clipRect = S.destroy()), e.contentGroup.clip()),
                    e.contentGroup.div &&
                      (e.contentGroup.div.style.clip = t
                        ? "rect(" + n + "px,9999px," + (n + t) + "px,0)"
                        : "auto");
                },
                f = function (t) {
                  return (
                    (e[t] = s
                      .circle(0, 0, 1.3 * c)
                      .translate(c / 2, c / 2)
                      .add(v)),
                    i.styledMode || e[t].attr("fill", "rgba(0,0,0,0.0001)"),
                    e[t]
                  );
                },
                m,
                x,
                y,
                b = i.spacingBox.height + (a ? -r : r) - n,
                v = this.nav,
                S = this.clipRect;
              return (
                "horizontal" !== o.layout ||
                  "middle" === o.verticalAlign ||
                  o.floating ||
                  (b /= 2),
                l && (b = Math.min(b, l)),
                (p.length = 0),
                t && b > 0 && t > b && !1 !== h.enabled
                  ? ((this.clipHeight = m =
                      Math.max(b - 20 - this.titleHeight - n, 0)),
                    (this.currentPage = A(this.currentPage, 1)),
                    (this.fullHeight = t),
                    u.forEach((t, e) => {
                      let i = (y = t.legendItem || {}).y || 0,
                        s = Math.round(y.label.getBBox().height),
                        o = p.length;
                      (!o || (i - p[o - 1] > m && (x || i) !== p[o - 1])) &&
                        (p.push(x || i), o++),
                        (y.pageIx = o - 1),
                        x && ((u[e - 1].legendItem || {}).pageIx = o - 1),
                        e === u.length - 1 &&
                          i + s - p[o - 1] > m &&
                          i > p[o - 1] &&
                          (p.push(i), (y.pageIx = o)),
                        i !== x && (x = i);
                    }),
                    S ||
                      ((S = e.clipRect = s.clipRect(0, n - 2, 9999, 0)),
                      e.contentGroup.clip(S)),
                    g(m),
                    v ||
                      ((this.nav = v =
                        s.g().attr({ zIndex: 1 }).add(this.group)),
                      (this.up = s.symbol("triangle", 0, 0, c, c).add(v)),
                      f("upTracker").on("click", function () {
                        e.scroll(-1, d);
                      }),
                      (this.pager = s
                        .text("", 15, 10)
                        .addClass("highcharts-legend-navigation")),
                      !i.styledMode && h.style && this.pager.css(h.style),
                      this.pager.add(v),
                      (this.down = s
                        .symbol("triangle-down", 0, 0, c, c)
                        .add(v)),
                      f("downTracker").on("click", function () {
                        e.scroll(1, d);
                      })),
                    e.scroll(0),
                    (t = b))
                  : v &&
                    (g(),
                    (this.nav = v.destroy()),
                    this.scrollGroup.attr({ translateY: 1 }),
                    (this.clipHeight = 0)),
                t
              );
            }
            scroll(t, e) {
              let i = this.chart,
                s = this.pages,
                o = s.length,
                r = this.clipHeight,
                a = this.options.navigation,
                n = this.pager,
                l = this.padding,
                c = this.currentPage + t;
              c > o && (c = o),
                c > 0 &&
                  (void 0 !== e && d(e, i),
                  this.nav.attr({
                    translateX: l,
                    translateY: r + this.padding + 7 + this.titleHeight,
                    visibility: "inherit",
                  }),
                  [this.up, this.upTracker].forEach(function (t) {
                    t.attr({
                      class:
                        1 === c
                          ? "highcharts-legend-nav-inactive"
                          : "highcharts-legend-nav-active",
                    });
                  }),
                  n.attr({ text: c + "/" + o }),
                  [this.down, this.downTracker].forEach(function (t) {
                    t.attr({
                      x: 18 + this.pager.getBBox().width,
                      class:
                        c === o
                          ? "highcharts-legend-nav-inactive"
                          : "highcharts-legend-nav-active",
                    });
                  }, this),
                  i.styledMode ||
                    (this.up.attr({
                      fill: 1 === c ? a.inactiveColor : a.activeColor,
                    }),
                    this.upTracker.css({
                      cursor: 1 === c ? "default" : "pointer",
                    }),
                    this.down.attr({
                      fill: c === o ? a.inactiveColor : a.activeColor,
                    }),
                    this.downTracker.css({
                      cursor: c === o ? "default" : "pointer",
                    })),
                  (this.scrollOffset = -s[c - 1] + this.initialItemY),
                  this.scrollGroup.animate({ translateY: this.scrollOffset }),
                  (this.currentPage = c),
                  this.positionCheckboxes(),
                  O(() => {
                    k(this, "afterScroll", { currentPage: c });
                  }, h(A(e, i.renderer.globalAnimation, !0)).duration));
            }
            setItemEvents(t, e, i) {
              let r = this,
                a = t.legendItem || {},
                n = r.chart.renderer.boxWrapper,
                l = t instanceof o,
                h = t instanceof s,
                d = "highcharts-legend-" + (l ? "point" : "series") + "-active",
                c = r.chart.styledMode,
                p = i ? [e, a.symbol] : [a.group],
                u = (e) => {
                  r.allItems.forEach((i) => {
                    t !== i &&
                      [i].concat(i.linkedSeries || []).forEach((t) => {
                        t.setState(e, !l);
                      });
                  });
                };
              for (let i of p)
                i &&
                  i
                    .on("mouseover", function () {
                      t.visible && u("inactive"),
                        t.setState("hover"),
                        t.visible && n.addClass(d),
                        c || e.css(r.options.itemHoverStyle);
                    })
                    .on("mouseout", function () {
                      r.chart.styledMode ||
                        e.css(C(t.visible ? r.itemStyle : r.itemHiddenStyle)),
                        u(""),
                        n.removeClass(d),
                        t.setState();
                    })
                    .on("click", function (e) {
                      let i = function () {
                        t.setVisible && t.setVisible(),
                          u(t.visible ? "inactive" : "");
                      };
                      n.removeClass(d),
                        k(
                          r,
                          "itemClick",
                          { browserEvent: e, legendItem: t },
                          i
                        ),
                        l
                          ? t.firePointEvent("legendItemClick", {
                              browserEvent: e,
                            })
                          : h && k(t, "legendItemClick", { browserEvent: e });
                    });
            }
            createCheckboxForItem(t) {
              (t.checkbox = x(
                "input",
                {
                  type: "checkbox",
                  className: "highcharts-legend-checkbox",
                  checked: t.selected,
                  defaultChecked: t.selected,
                },
                this.options.itemCheckboxStyle,
                this.chart.container
              )),
                m(t.checkbox, "click", function (e) {
                  let i = e.target;
                  k(
                    t.series || t,
                    "checkboxClick",
                    { checked: i.checked, item: t },
                    function () {
                      t.select();
                    }
                  );
                });
            }
          }
          return (
            ((l = L || (L = {})).compose = function (t) {
              w(p, "Core.Legend") &&
                m(t, "beforeMargins", function () {
                  this.legend = new l(this, this.options.legend);
                });
            }),
            L
          );
        }
      ),
      i(
        e,
        "Core/Chart/Chart.js",
        [
          e["Core/Animation/AnimationUtilities.js"],
          e["Core/Axis/Axis.js"],
          e["Core/Defaults.js"],
          e["Core/Templating.js"],
          e["Core/Foundation.js"],
          e["Core/Globals.js"],
          e["Core/Renderer/RendererRegistry.js"],
          e["Core/Series/Series.js"],
          e["Core/Series/SeriesRegistry.js"],
          e["Core/Renderer/SVG/SVGRenderer.js"],
          e["Core/Time.js"],
          e["Core/Utilities.js"],
          e["Core/Renderer/HTML/AST.js"],
          e["Core/Axis/Tick.js"],
        ],
        function (t, e, i, s, o, r, a, n, l, h, d, c, p, u) {
          let { animate: g, animObject: f, setAnimation: m } = t,
            { defaultOptions: x, defaultTime: y } = i,
            { numberFormat: b } = s,
            { registerEventOptions: v } = o,
            { charts: S, doc: k, marginNames: M, svg: C, win: A } = r,
            { seriesTypes: w } = l,
            {
              addEvent: T,
              attr: P,
              createElement: O,
              css: L,
              defined: D,
              diffObjects: E,
              discardElement: B,
              erase: j,
              error: R,
              extend: I,
              find: z,
              fireEvent: G,
              getStyle: N,
              isArray: W,
              isNumber: H,
              isObject: X,
              isString: F,
              merge: U,
              objectEach: Y,
              pick: V,
              pInt: _,
              relativeLength: $,
              removeEvent: Z,
              splat: K,
              syncTimeout: q,
              uniqueKey: J,
            } = c;
          class Q {
            static chart(t, e, i) {
              return new Q(t, e, i);
            }
            constructor(t, e, i) {
              this.sharedClips = {};
              let s = [...arguments];
              (F(t) || t.nodeName) && (this.renderTo = s.shift()),
                this.init(s[0], s[1]);
            }
            setZoomOptions() {
              let t = this.options.chart,
                e = t.zooming;
              this.zooming = {
                ...e,
                type: V(t.zoomType, e.type),
                key: V(t.zoomKey, e.key),
                pinchType: V(t.pinchType, e.pinchType),
                singleTouch: V(t.zoomBySingleTouch, e.singleTouch, !1),
                resetButton: U(e.resetButton, t.resetZoomButton),
              };
            }
            init(t, e) {
              G(this, "init", { args: arguments }, function () {
                let i = U(x, t),
                  s = i.chart;
                (this.userOptions = I({}, t)),
                  (this.margin = []),
                  (this.spacing = []),
                  (this.labelCollectors = []),
                  (this.callback = e),
                  (this.isResizing = 0),
                  (this.options = i),
                  (this.axes = []),
                  (this.series = []),
                  (this.time =
                    t.time && Object.keys(t.time).length
                      ? new d(t.time)
                      : r.time),
                  (this.numberFormatter = s.numberFormatter || b),
                  (this.styledMode = s.styledMode),
                  (this.hasCartesianSeries = s.showAxes),
                  (this.index = S.length),
                  S.push(this),
                  r.chartCount++,
                  v(this, s),
                  (this.xAxis = []),
                  (this.yAxis = []),
                  (this.pointCount =
                    this.colorCounter =
                    this.symbolCounter =
                      0),
                  this.setZoomOptions(),
                  G(this, "afterInit"),
                  this.firstRender();
              });
            }
            initSeries(t) {
              let e = this.options.chart,
                i = t.type || e.type,
                s = w[i];
              s || R(17, !0, this, { missingModuleFor: i });
              let o = new s();
              return "function" == typeof o.init && o.init(this, t), o;
            }
            setSortedData() {
              this.getSeriesOrderByLinks().forEach(function (t) {
                t.points ||
                  t.data ||
                  !t.enabledDataSorting ||
                  t.setData(t.options.data, !1);
              });
            }
            getSeriesOrderByLinks() {
              return this.series.concat().sort(function (t, e) {
                return t.linkedSeries.length || e.linkedSeries.length
                  ? e.linkedSeries.length - t.linkedSeries.length
                  : 0;
              });
            }
            orderItems(t, e = 0) {
              let i = this[t],
                s = (this.options[t] = K(this.options[t]).slice()),
                o = (this.userOptions[t] = this.userOptions[t]
                  ? K(this.userOptions[t]).slice()
                  : []);
              if ((this.hasRendered && (s.splice(e), o.splice(e)), i))
                for (let t = e, r = i.length; t < r; ++t) {
                  let e = i[t];
                  e &&
                    ((e.index = t),
                    e instanceof n && (e.name = e.getName()),
                    e.options.isInternal ||
                      ((s[t] = e.options), (o[t] = e.userOptions)));
                }
            }
            isInsidePlot(t, e, i = {}) {
              let {
                  inverted: s,
                  plotBox: o,
                  plotLeft: r,
                  plotTop: a,
                  scrollablePlotBox: n,
                } = this,
                { scrollLeft: l = 0, scrollTop: h = 0 } =
                  (i.visiblePlotOnly &&
                    this.scrollablePlotArea?.scrollingContainer) ||
                  {},
                d = i.series,
                c = (i.visiblePlotOnly && n) || o,
                p = i.inverted ? e : t,
                u = i.inverted ? t : e,
                g = { x: p, y: u, isInsidePlot: !0, options: i };
              if (!i.ignoreX) {
                let t = (d && (s && !this.polar ? d.yAxis : d.xAxis)) || {
                    pos: r,
                    len: 1 / 0,
                  },
                  e = i.paneCoordinates ? t.pos + p : r + p;
                (e >= Math.max(l + r, t.pos) &&
                  e <= Math.min(l + r + c.width, t.pos + t.len)) ||
                  (g.isInsidePlot = !1);
              }
              if (!i.ignoreY && g.isInsidePlot) {
                let t = (!s && i.axis && !i.axis.isXAxis && i.axis) ||
                    (d && (s ? d.xAxis : d.yAxis)) || { pos: a, len: 1 / 0 },
                  e = i.paneCoordinates ? t.pos + u : a + u;
                (e >= Math.max(h + a, t.pos) &&
                  e <= Math.min(h + a + c.height, t.pos + t.len)) ||
                  (g.isInsidePlot = !1);
              }
              return G(this, "afterIsInsidePlot", g), g.isInsidePlot;
            }
            redraw(t) {
              G(this, "beforeRedraw");
              let e = this.hasCartesianSeries
                  ? this.axes
                  : this.colorAxis || [],
                i = this.series,
                s = this.pointer,
                o = this.legend,
                r = this.userOptions.legend,
                a = this.renderer,
                n = a.isHidden(),
                l = [],
                h,
                d,
                c,
                p = this.isDirtyBox,
                u = this.isDirtyLegend,
                g;
              for (
                a.rootFontSize = a.boxWrapper.getStyle("font-size"),
                  this.setResponsive && this.setResponsive(!1),
                  m(!!this.hasRendered && t, this),
                  n && this.temporaryDisplay(),
                  this.layOutTitles(!1),
                  c = i.length;
                c--;

              )
                if (
                  ((g = i[c]).options.stacking || g.options.centerInCategory) &&
                  ((d = !0), g.isDirty)
                ) {
                  h = !0;
                  break;
                }
              if (h)
                for (c = i.length; c--; )
                  (g = i[c]).options.stacking && (g.isDirty = !0);
              i.forEach(function (t) {
                t.isDirty &&
                  ("point" === t.options.legendType
                    ? ("function" == typeof t.updateTotals && t.updateTotals(),
                      (u = !0))
                    : r && (r.labelFormatter || r.labelFormat) && (u = !0)),
                  t.isDirtyData && G(t, "updatedData");
              }),
                u &&
                  o &&
                  o.options.enabled &&
                  (o.render(), (this.isDirtyLegend = !1)),
                d && this.getStacks(),
                e.forEach(function (t) {
                  t.updateNames(), t.setScale();
                }),
                this.getMargins(),
                e.forEach(function (t) {
                  t.isDirty && (p = !0);
                }),
                e.forEach(function (t) {
                  let e = t.min + "," + t.max;
                  t.extKey !== e &&
                    ((t.extKey = e),
                    l.push(function () {
                      G(t, "afterSetExtremes", I(t.eventArgs, t.getExtremes())),
                        delete t.eventArgs;
                    })),
                    (p || d) && t.redraw();
                }),
                p && this.drawChartBox(),
                G(this, "predraw"),
                i.forEach(function (t) {
                  (p || t.isDirty) && t.visible && t.redraw(),
                    (t.isDirtyData = !1);
                }),
                s && s.reset(!0),
                a.draw(),
                G(this, "redraw"),
                G(this, "render"),
                n && this.temporaryDisplay(!0),
                l.forEach(function (t) {
                  t.call();
                });
            }
            get(t) {
              let e = this.series;
              function i(e) {
                return e.id === t || (e.options && e.options.id === t);
              }
              let s = z(this.axes, i) || z(this.series, i);
              for (let t = 0; !s && t < e.length; t++)
                s = z(e[t].points || [], i);
              return s;
            }
            getAxes() {
              let t = this.userOptions;
              for (let i of (G(this, "getAxes"), ["xAxis", "yAxis"]))
                for (let s of (t[i] = K(t[i] || {}))) new e(this, s, i);
              G(this, "afterGetAxes");
            }
            getSelectedPoints() {
              return this.series.reduce(
                (t, e) => (
                  e.getPointsCollection().forEach((e) => {
                    V(e.selectedStaging, e.selected) && t.push(e);
                  }),
                  t
                ),
                []
              );
            }
            getSelectedSeries() {
              return this.series.filter(function (t) {
                return t.selected;
              });
            }
            setTitle(t, e, i) {
              this.applyDescription("title", t),
                this.applyDescription("subtitle", e),
                this.applyDescription("caption", void 0),
                this.layOutTitles(i);
            }
            applyDescription(t, e) {
              let i = this,
                s = (this.options[t] = U(this.options[t], e)),
                o = this[t];
              o && e && (this[t] = o = o.destroy()),
                s &&
                  !o &&
                  (((o = this.renderer
                    .text(s.text, 0, 0, s.useHTML)
                    .attr({
                      align: s.align,
                      class: "highcharts-" + t,
                      zIndex: s.zIndex || 4,
                    })
                    .add()).update = function (e, s) {
                    i.applyDescription(t, e), i.layOutTitles(s);
                  }),
                  this.styledMode ||
                    o.css(
                      I(
                        "title" === t
                          ? { fontSize: this.options.isStock ? "1em" : "1.2em" }
                          : {},
                        s.style
                      )
                    ),
                  (this[t] = o));
            }
            layOutTitles(t = !0) {
              let e = [0, 0, 0],
                i = this.renderer,
                s = this.spacingBox;
              ["title", "subtitle", "caption"].forEach(function (t) {
                let o = this[t],
                  r = this.options[t],
                  a = r.verticalAlign || "top",
                  n =
                    "title" === t
                      ? "top" === a
                        ? -3
                        : 0
                      : "top" === a
                      ? e[0] + 2
                      : 0;
                if (o) {
                  o.css({
                    width: (r.width || s.width + (r.widthAdjust || 0)) + "px",
                  });
                  let t = i.fontMetrics(o).b,
                    l = Math.round(o.getBBox(r.useHTML).height);
                  o.align(
                    I({ y: "bottom" === a ? t : n + t, height: l }, r),
                    !1,
                    "spacingBox"
                  ),
                    r.floating ||
                      ("top" === a
                        ? (e[0] = Math.ceil(e[0] + l))
                        : "bottom" === a && (e[2] = Math.ceil(e[2] + l)));
                }
              }, this),
                e[0] &&
                  "top" === (this.options.title.verticalAlign || "top") &&
                  (e[0] += this.options.title.margin),
                e[2] &&
                  "bottom" === this.options.caption.verticalAlign &&
                  (e[2] += this.options.caption.margin);
              let o =
                !this.titleOffset || this.titleOffset.join(",") !== e.join(",");
              (this.titleOffset = e),
                G(this, "afterLayOutTitles"),
                !this.isDirtyBox &&
                  o &&
                  ((this.isDirtyBox = this.isDirtyLegend = o),
                  this.hasRendered && t && this.isDirtyBox && this.redraw());
            }
            getContainerBox() {
              return {
                width: N(this.renderTo, "width", !0) || 0,
                height: N(this.renderTo, "height", !0) || 0,
              };
            }
            getChartSize() {
              let t = this.options.chart,
                e = t.width,
                i = t.height,
                s = this.getContainerBox();
              (this.chartWidth = Math.max(0, e || s.width || 600)),
                (this.chartHeight = Math.max(
                  0,
                  $(i, this.chartWidth) || (s.height > 1 ? s.height : 400)
                )),
                (this.containerBox = s);
            }
            temporaryDisplay(t) {
              let e = this.renderTo,
                i;
              if (t)
                for (; e && e.style; )
                  e.hcOrigStyle && (L(e, e.hcOrigStyle), delete e.hcOrigStyle),
                    e.hcOrigDetached &&
                      (k.body.removeChild(e), (e.hcOrigDetached = !1)),
                    (e = e.parentNode);
              else
                for (
                  ;
                  e &&
                  e.style &&
                  (k.body.contains(e) ||
                    e.parentNode ||
                    ((e.hcOrigDetached = !0), k.body.appendChild(e)),
                  ("none" === N(e, "display", !1) || e.hcOricDetached) &&
                    ((e.hcOrigStyle = {
                      display: e.style.display,
                      height: e.style.height,
                      overflow: e.style.overflow,
                    }),
                    (i = { display: "block", overflow: "hidden" }),
                    e !== this.renderTo && (i.height = 0),
                    L(e, i),
                    e.offsetWidth ||
                      e.style.setProperty("display", "block", "important")),
                  (e = e.parentNode) !== k.body);

                );
            }
            setClassName(t) {
              this.container.className = "highcharts-container " + (t || "");
            }
            getContainer() {
              let t = this.options,
                e = t.chart,
                i = "data-highcharts-chart",
                s = J(),
                o,
                r = this.renderTo;
              r || (this.renderTo = r = e.renderTo),
                F(r) && (this.renderTo = r = k.getElementById(r)),
                r || R(13, !0, this);
              let n = _(P(r, i));
              H(n) && S[n] && S[n].hasRendered && S[n].destroy(),
                P(r, i, this.index),
                (r.innerHTML = p.emptyHTML),
                e.skipClone || r.offsetWidth || this.temporaryDisplay(),
                this.getChartSize();
              let l = this.chartHeight,
                d = this.chartWidth;
              L(r, { overflow: "hidden" }),
                this.styledMode ||
                  (o = I(
                    {
                      position: "relative",
                      overflow: "hidden",
                      width: d + "px",
                      height: l + "px",
                      textAlign: "left",
                      lineHeight: "normal",
                      zIndex: 0,
                      "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                      userSelect: "none",
                      "touch-action": "manipulation",
                      outline: "none",
                    },
                    e.style || {}
                  ));
              let c = O("div", { id: s }, o, r);
              (this.container = c),
                this.getChartSize(),
                d === this.chartWidth ||
                  ((d = this.chartWidth),
                  this.styledMode ||
                    L(c, { width: V(e.style?.width, d + "px") })),
                (this.containerBox = this.getContainerBox()),
                (this._cursor = c.style.cursor);
              let u = e.renderer || !C ? a.getRendererType(e.renderer) : h;
              if (
                ((this.renderer = new u(
                  c,
                  d,
                  l,
                  void 0,
                  e.forExport,
                  t.exporting && t.exporting.allowHTML,
                  this.styledMode
                )),
                m(void 0, this),
                this.setClassName(e.className),
                this.styledMode)
              )
                for (let e in t.defs) this.renderer.definition(t.defs[e]);
              else this.renderer.setStyle(e.style);
              (this.renderer.chartIndex = this.index),
                G(this, "afterGetContainer");
            }
            getMargins(t) {
              let { spacing: e, margin: i, titleOffset: s } = this;
              this.resetMargins(),
                s[0] &&
                  !D(i[0]) &&
                  (this.plotTop = Math.max(this.plotTop, s[0] + e[0])),
                s[2] &&
                  !D(i[2]) &&
                  (this.marginBottom = Math.max(
                    this.marginBottom,
                    s[2] + e[2]
                  )),
                this.legend &&
                  this.legend.display &&
                  this.legend.adjustMargins(i, e),
                G(this, "getMargins"),
                t || this.getAxisMargins();
            }
            getAxisMargins() {
              let t = this,
                e = (t.axisOffset = [0, 0, 0, 0]),
                i = t.colorAxis,
                s = t.margin,
                o = function (t) {
                  t.forEach(function (t) {
                    t.visible && t.getOffset();
                  });
                };
              t.hasCartesianSeries ? o(t.axes) : i && i.length && o(i),
                M.forEach(function (i, o) {
                  D(s[o]) || (t[i] += e[o]);
                }),
                t.setChartSize();
            }
            getOptions() {
              return E(this.userOptions, x);
            }
            reflow(t) {
              let e = this,
                i = e.containerBox,
                s = e.getContainerBox();
              delete e.pointer?.chartPosition,
                !e.isPrinting &&
                  !e.isResizing &&
                  i &&
                  s.width &&
                  ((s.width !== i.width || s.height !== i.height) &&
                    (c.clearTimeout(e.reflowTimeout),
                    (e.reflowTimeout = q(
                      function () {
                        e.container && e.setSize(void 0, void 0, !1);
                      },
                      t ? 100 : 0
                    ))),
                  (e.containerBox = s));
            }
            setReflow() {
              let t = this,
                e = (e) => {
                  t.options?.chart.reflow && t.hasLoaded && t.reflow(e);
                };
              if ("function" == typeof ResizeObserver)
                new ResizeObserver(e).observe(t.renderTo);
              else {
                let t = T(A, "resize", e);
                T(this, "destroy", t);
              }
            }
            setSize(t, e, i) {
              let s = this,
                o = s.renderer;
              (s.isResizing += 1), m(i, s);
              let r = o.globalAnimation;
              (s.oldChartHeight = s.chartHeight),
                (s.oldChartWidth = s.chartWidth),
                void 0 !== t && (s.options.chart.width = t),
                void 0 !== e && (s.options.chart.height = e),
                s.getChartSize();
              let {
                chartWidth: a,
                chartHeight: n,
                scrollablePixelsX: l = 0,
                scrollablePixelsY: h = 0,
              } = s;
              (s.isDirtyBox ||
                a !== s.oldChartWidth ||
                n !== s.oldChartHeight) &&
                (s.styledMode ||
                  (r ? g : L)(
                    s.container,
                    { width: `${a + l}px`, height: `${n + h}px` },
                    r
                  ),
                s.setChartSize(!0),
                o.setSize(a, n, r),
                s.axes.forEach(function (t) {
                  (t.isDirty = !0), t.setScale();
                }),
                (s.isDirtyLegend = !0),
                (s.isDirtyBox = !0),
                s.layOutTitles(),
                s.getMargins(),
                s.redraw(r),
                (s.oldChartHeight = void 0),
                G(s, "resize"),
                setTimeout(() => {
                  s && G(s, "endResize");
                }, f(r).duration)),
                (s.isResizing -= 1);
            }
            setChartSize(t) {
              let e, i, s, o;
              let {
                  chartHeight: r,
                  chartWidth: a,
                  inverted: n,
                  spacing: l,
                  renderer: h,
                } = this,
                d = this.clipOffset,
                c = Math[n ? "floor" : "round"];
              (this.plotLeft = e = Math.round(this.plotLeft)),
                (this.plotTop = i = Math.round(this.plotTop)),
                (this.plotWidth = s =
                  Math.max(0, Math.round(a - e - this.marginRight))),
                (this.plotHeight = o =
                  Math.max(0, Math.round(r - i - this.marginBottom))),
                (this.plotSizeX = n ? o : s),
                (this.plotSizeY = n ? s : o),
                (this.spacingBox = h.spacingBox =
                  {
                    x: l[3],
                    y: l[0],
                    width: a - l[3] - l[1],
                    height: r - l[0] - l[2],
                  }),
                (this.plotBox = h.plotBox =
                  { x: e, y: i, width: s, height: o }),
                d &&
                  (this.clipBox = {
                    x: c(d[3]),
                    y: c(d[0]),
                    width: c(this.plotSizeX - d[1] - d[3]),
                    height: c(this.plotSizeY - d[0] - d[2]),
                  }),
                t ||
                  (this.axes.forEach(function (t) {
                    t.setAxisSize(), t.setAxisTranslation();
                  }),
                  h.alignElements()),
                G(this, "afterSetChartSize", { skipAxes: t });
            }
            resetMargins() {
              G(this, "resetMargins");
              let t = this,
                e = t.options.chart,
                i = e.plotBorderWidth || 0,
                s = i / 2;
              ["margin", "spacing"].forEach(function (i) {
                let s = e[i],
                  o = X(s) ? s : [s, s, s, s];
                ["Top", "Right", "Bottom", "Left"].forEach(function (s, r) {
                  t[i][r] = V(e[i + s], o[r]);
                });
              }),
                M.forEach(function (e, i) {
                  t[e] = V(t.margin[i], t.spacing[i]);
                }),
                (t.axisOffset = [0, 0, 0, 0]),
                (t.clipOffset = [s, s, s, s]),
                (t.plotBorderWidth = i);
            }
            drawChartBox() {
              let t = this.options.chart,
                e = this.renderer,
                i = this.chartWidth,
                s = this.chartHeight,
                o = this.styledMode,
                r = this.plotBGImage,
                a = t.backgroundColor,
                n = t.plotBackgroundColor,
                l = t.plotBackgroundImage,
                h = this.plotLeft,
                d = this.plotTop,
                c = this.plotWidth,
                p = this.plotHeight,
                u = this.plotBox,
                g = this.clipRect,
                f = this.clipBox,
                m = this.chartBackground,
                x = this.plotBackground,
                y = this.plotBorder,
                b,
                v,
                S,
                k = "animate";
              m ||
                ((this.chartBackground = m =
                  e.rect().addClass("highcharts-background").add()),
                (k = "attr")),
                o
                  ? (b = v = m.strokeWidth())
                  : ((v = (b = t.borderWidth || 0) + (t.shadow ? 8 : 0)),
                    (S = { fill: a || "none" }),
                    (b || m["stroke-width"]) &&
                      ((S.stroke = t.borderColor), (S["stroke-width"] = b)),
                    m.attr(S).shadow(t.shadow)),
                m[k]({
                  x: v / 2,
                  y: v / 2,
                  width: i - v - (b % 2),
                  height: s - v - (b % 2),
                  r: t.borderRadius,
                }),
                (k = "animate"),
                x ||
                  ((k = "attr"),
                  (this.plotBackground = x =
                    e.rect().addClass("highcharts-plot-background").add())),
                x[k](u),
                !o &&
                  (x.attr({ fill: n || "none" }).shadow(t.plotShadow),
                  l &&
                    (r
                      ? (l !== r.attr("href") && r.attr("href", l),
                        r.animate(u))
                      : (this.plotBGImage = e.image(l, h, d, c, p).add()))),
                g
                  ? g.animate({ width: f.width, height: f.height })
                  : (this.clipRect = e.clipRect(f)),
                (k = "animate"),
                y ||
                  ((k = "attr"),
                  (this.plotBorder = y =
                    e
                      .rect()
                      .addClass("highcharts-plot-border")
                      .attr({ zIndex: 1 })
                      .add())),
                o ||
                  y.attr({
                    stroke: t.plotBorderColor,
                    "stroke-width": t.plotBorderWidth || 0,
                    fill: "none",
                  }),
                y[k](
                  y.crisp({ x: h, y: d, width: c, height: p }, -y.strokeWidth())
                ),
                (this.isDirtyBox = !1),
                G(this, "afterDrawChartBox");
            }
            propFromSeries() {
              let t, e, i;
              let s = this,
                o = s.options.chart,
                r = s.options.series;
              ["inverted", "angular", "polar"].forEach(function (a) {
                for (
                  e = w[o.type],
                    i = o[a] || (e && e.prototype[a]),
                    t = r && r.length;
                  !i && t--;

                )
                  (e = w[r[t].type]) && e.prototype[a] && (i = !0);
                s[a] = i;
              });
            }
            linkSeries(t) {
              let e = this,
                i = e.series;
              i.forEach(function (t) {
                t.linkedSeries.length = 0;
              }),
                i.forEach(function (t) {
                  let { linkedTo: i } = t.options;
                  if (F(i)) {
                    let s;
                    (s =
                      ":previous" === i ? e.series[t.index - 1] : e.get(i)) &&
                      s.linkedParent !== t &&
                      (s.linkedSeries.push(t),
                      (t.linkedParent = s),
                      s.enabledDataSorting && t.setDataSortingOptions(),
                      (t.visible = V(
                        t.options.visible,
                        s.options.visible,
                        t.visible
                      )));
                  }
                }),
                G(this, "afterLinkSeries", { isUpdating: t });
            }
            renderSeries() {
              this.series.forEach(function (t) {
                t.translate(), t.render();
              });
            }
            render() {
              let t = this.axes,
                e = this.colorAxis,
                i = this.renderer,
                s = this.options.chart.axisLayoutRuns || 2,
                o = (t) => {
                  t.forEach((t) => {
                    t.visible && t.render();
                  });
                },
                r = 0,
                a = !0,
                n,
                l = 0;
              for (let e of (this.setTitle(),
              G(this, "beforeMargins"),
              this.getStacks?.(),
              this.getMargins(!0),
              this.setChartSize(),
              t)) {
                let { options: t } = e,
                  { labels: i } = t;
                if (
                  this.hasCartesianSeries &&
                  e.horiz &&
                  e.visible &&
                  i.enabled &&
                  e.series.length &&
                  "colorAxis" !== e.coll &&
                  !this.polar
                ) {
                  (r = t.tickLength), e.createGroups();
                  let s = new u(e, 0, "", !0),
                    o = s.createLabel("x", i);
                  if (
                    (s.destroy(),
                    o &&
                      V(i.reserveSpace, !H(t.crossing)) &&
                      (r =
                        o.getBBox().height +
                        i.distance +
                        Math.max(t.offset || 0, 0)),
                    r)
                  ) {
                    o?.destroy();
                    break;
                  }
                }
              }
              for (
                this.plotHeight = Math.max(this.plotHeight - r, 0);
                (a || n || s > 1) && l < s;

              ) {
                let e = this.plotWidth,
                  i = this.plotHeight;
                for (let e of t)
                  0 === l
                    ? e.setScale()
                    : ((e.horiz && a) || (!e.horiz && n)) &&
                      e.setTickInterval(!0);
                0 === l ? this.getAxisMargins() : this.getMargins(),
                  (a = e / this.plotWidth > (l ? 1 : 1.1)),
                  (n = i / this.plotHeight > (l ? 1 : 1.05)),
                  l++;
              }
              this.drawChartBox(),
                this.hasCartesianSeries ? o(t) : e && e.length && o(e),
                this.seriesGroup ||
                  (this.seriesGroup = i
                    .g("series-group")
                    .attr({ zIndex: 3 })
                    .shadow(this.options.chart.seriesGroupShadow)
                    .add()),
                this.renderSeries(),
                this.addCredits(),
                this.setResponsive && this.setResponsive(),
                (this.hasRendered = !0);
            }
            addCredits(t) {
              let e = this,
                i = U(!0, this.options.credits, t);
              i.enabled &&
                !this.credits &&
                ((this.credits = this.renderer
                  .text(i.text + (this.mapCredits || ""), 0, 0)
                  .addClass("highcharts-credits")
                  .on("click", function () {
                    i.href && (A.location.href = i.href);
                  })
                  .attr({ align: i.position.align, zIndex: 8 })),
                e.styledMode || this.credits.css(i.style),
                this.credits.add().align(i.position),
                (this.credits.update = function (t) {
                  (e.credits = e.credits.destroy()), e.addCredits(t);
                }));
            }
            destroy() {
              let t;
              let e = this,
                i = e.axes,
                s = e.series,
                o = e.container,
                a = o && o.parentNode;
              for (
                G(e, "destroy"),
                  e.renderer.forExport ? j(S, e) : (S[e.index] = void 0),
                  r.chartCount--,
                  e.renderTo.removeAttribute("data-highcharts-chart"),
                  Z(e),
                  t = i.length;
                t--;

              )
                i[t] = i[t].destroy();
              for (
                this.scroller &&
                  this.scroller.destroy &&
                  this.scroller.destroy(),
                  t = s.length;
                t--;

              )
                s[t] = s[t].destroy();
              [
                "title",
                "subtitle",
                "chartBackground",
                "plotBackground",
                "plotBGImage",
                "plotBorder",
                "seriesGroup",
                "clipRect",
                "credits",
                "pointer",
                "rangeSelector",
                "legend",
                "resetZoomButton",
                "tooltip",
                "renderer",
              ].forEach(function (t) {
                let i = e[t];
                i && i.destroy && (e[t] = i.destroy());
              }),
                o && ((o.innerHTML = p.emptyHTML), Z(o), a && B(o)),
                Y(e, function (t, i) {
                  delete e[i];
                });
            }
            firstRender() {
              let t = this,
                e = t.options;
              t.getContainer(),
                t.resetMargins(),
                t.setChartSize(),
                t.propFromSeries(),
                t.getAxes();
              let i = W(e.series) ? e.series : [];
              (e.series = []),
                i.forEach(function (e) {
                  t.initSeries(e);
                }),
                t.linkSeries(),
                t.setSortedData(),
                G(t, "beforeRender"),
                t.render(),
                t.pointer?.getChartPosition(),
                t.renderer.imgCount || t.hasLoaded || t.onload(),
                t.temporaryDisplay(!0);
            }
            onload() {
              this.callbacks.concat([this.callback]).forEach(function (t) {
                t && void 0 !== this.index && t.apply(this, [this]);
              }, this),
                G(this, "load"),
                G(this, "render"),
                D(this.index) && this.setReflow(),
                this.warnIfA11yModuleNotLoaded(),
                (this.hasLoaded = !0);
            }
            warnIfA11yModuleNotLoaded() {
              let { options: t, title: e } = this;
              !t ||
                this.accessibility ||
                (this.renderer.boxWrapper.attr({
                  role: "img",
                  "aria-label": ((e && e.element.textContent) || "").replace(
                    /</g,
                    "&lt;"
                  ),
                }),
                (t.accessibility && !1 === t.accessibility.enabled) ||
                  R(
                    'Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning. See https://www.highcharts.com/docs/accessibility/accessibility-module.',
                    !1,
                    this
                  ));
            }
            addSeries(t, e, i) {
              let s;
              let o = this;
              return (
                t &&
                  ((e = V(e, !0)),
                  G(o, "addSeries", { options: t }, function () {
                    (s = o.initSeries(t)),
                      (o.isDirtyLegend = !0),
                      o.linkSeries(),
                      s.enabledDataSorting && s.setData(t.data, !1),
                      G(o, "afterAddSeries", { series: s }),
                      e && o.redraw(i);
                  })),
                s
              );
            }
            addAxis(t, e, i, s) {
              return this.createAxis(e ? "xAxis" : "yAxis", {
                axis: t,
                redraw: i,
                animation: s,
              });
            }
            addColorAxis(t, e, i) {
              return this.createAxis("colorAxis", {
                axis: t,
                redraw: e,
                animation: i,
              });
            }
            createAxis(t, i) {
              let s = new e(this, i.axis, t);
              return V(i.redraw, !0) && this.redraw(i.animation), s;
            }
            showLoading(t) {
              let e = this,
                i = e.options,
                s = i.loading,
                o = function () {
                  r &&
                    L(r, {
                      left: e.plotLeft + "px",
                      top: e.plotTop + "px",
                      width: e.plotWidth + "px",
                      height: e.plotHeight + "px",
                    });
                },
                r = e.loadingDiv,
                a = e.loadingSpan;
              r ||
                (e.loadingDiv = r =
                  O(
                    "div",
                    {
                      className: "highcharts-loading highcharts-loading-hidden",
                    },
                    null,
                    e.container
                  )),
                a ||
                  ((e.loadingSpan = a =
                    O(
                      "span",
                      { className: "highcharts-loading-inner" },
                      null,
                      r
                    )),
                  T(e, "redraw", o)),
                (r.className = "highcharts-loading"),
                p.setElementHTML(a, V(t, i.lang.loading, "")),
                e.styledMode ||
                  (L(r, I(s.style, { zIndex: 10 })),
                  L(a, s.labelStyle),
                  e.loadingShown ||
                    (L(r, { opacity: 0, display: "" }),
                    g(
                      r,
                      { opacity: s.style.opacity || 0.5 },
                      { duration: s.showDuration || 0 }
                    ))),
                (e.loadingShown = !0),
                o();
            }
            hideLoading() {
              let t = this.options,
                e = this.loadingDiv;
              e &&
                ((e.className = "highcharts-loading highcharts-loading-hidden"),
                this.styledMode ||
                  g(
                    e,
                    { opacity: 0 },
                    {
                      duration: t.loading.hideDuration || 100,
                      complete: function () {
                        L(e, { display: "none" });
                      },
                    }
                  )),
                (this.loadingShown = !1);
            }
            update(t, e, i, s) {
              let o, r, a;
              let n = this,
                l = {
                  credits: "addCredits",
                  title: "setTitle",
                  subtitle: "setSubtitle",
                  caption: "setCaption",
                },
                h = t.isResponsiveOptions,
                c = [];
              G(n, "update", { options: t }),
                h || n.setResponsive(!1, !0),
                (t = E(t, n.options)),
                (n.userOptions = U(n.userOptions, t));
              let p = t.chart;
              p &&
                (U(!0, n.options.chart, p),
                this.setZoomOptions(),
                "className" in p && n.setClassName(p.className),
                ("inverted" in p || "polar" in p || "type" in p) &&
                  (n.propFromSeries(), (o = !0)),
                "alignTicks" in p && (o = !0),
                "events" in p && v(this, p),
                Y(p, function (t, e) {
                  -1 !== n.propsRequireUpdateSeries.indexOf("chart." + e) &&
                    (r = !0),
                    -1 !== n.propsRequireDirtyBox.indexOf(e) &&
                      (n.isDirtyBox = !0),
                    -1 === n.propsRequireReflow.indexOf(e) ||
                      ((n.isDirtyBox = !0), h || (a = !0));
                }),
                !n.styledMode &&
                  p.style &&
                  n.renderer.setStyle(n.options.chart.style || {})),
                !n.styledMode && t.colors && (this.options.colors = t.colors),
                t.time &&
                  (this.time === y && (this.time = new d(t.time)),
                  U(!0, n.options.time, t.time)),
                Y(t, function (e, i) {
                  n[i] && "function" == typeof n[i].update
                    ? n[i].update(e, !1)
                    : "function" == typeof n[l[i]]
                    ? n[l[i]](e)
                    : "colors" !== i &&
                      -1 === n.collectionsWithUpdate.indexOf(i) &&
                      U(!0, n.options[i], t[i]),
                    "chart" !== i &&
                      -1 !== n.propsRequireUpdateSeries.indexOf(i) &&
                      (r = !0);
                }),
                this.collectionsWithUpdate.forEach(function (e) {
                  t[e] &&
                    (K(t[e]).forEach(function (t, s) {
                      let o;
                      let r = D(t.id);
                      r && (o = n.get(t.id)),
                        !o &&
                          n[e] &&
                          (o = n[e][V(t.index, s)]) &&
                          ((r && D(o.options.id)) || o.options.isInternal) &&
                          (o = void 0),
                        o &&
                          o.coll === e &&
                          (o.update(t, !1), i && (o.touched = !0)),
                        !o &&
                          i &&
                          n.collectionsWithInit[e] &&
                          (n.collectionsWithInit[e][0].apply(
                            n,
                            [t]
                              .concat(n.collectionsWithInit[e][1] || [])
                              .concat([!1])
                          ).touched = !0);
                    }),
                    i &&
                      n[e].forEach(function (t) {
                        t.touched || t.options.isInternal
                          ? delete t.touched
                          : c.push(t);
                      }));
                }),
                c.forEach(function (t) {
                  t.chart && t.remove && t.remove(!1);
                }),
                o &&
                  n.axes.forEach(function (t) {
                    t.update({}, !1);
                  }),
                r &&
                  n.getSeriesOrderByLinks().forEach(function (t) {
                    t.chart && t.update({}, !1);
                  }, this);
              let u = p && p.width,
                g =
                  p &&
                  (F(p.height) ? $(p.height, u || n.chartWidth) : p.height);
              a || (H(u) && u !== n.chartWidth) || (H(g) && g !== n.chartHeight)
                ? n.setSize(u, g, s)
                : V(e, !0) && n.redraw(s),
                G(n, "afterUpdate", { options: t, redraw: e, animation: s });
            }
            setSubtitle(t, e) {
              this.applyDescription("subtitle", t), this.layOutTitles(e);
            }
            setCaption(t, e) {
              this.applyDescription("caption", t), this.layOutTitles(e);
            }
            showResetZoom() {
              let t = this,
                e = x.lang,
                i = t.zooming.resetButton,
                s = i.theme,
                o =
                  "chart" === i.relativeTo || "spacingBox" === i.relativeTo
                    ? null
                    : "plotBox";
              function r() {
                t.zoomOut();
              }
              G(this, "beforeShowResetZoom", null, function () {
                t.resetZoomButton = t.renderer
                  .button(e.resetZoom, null, null, r, s)
                  .attr({ align: i.position.align, title: e.resetZoomTitle })
                  .addClass("highcharts-reset-zoom")
                  .add()
                  .align(i.position, !1, o);
              }),
                G(this, "afterShowResetZoom");
            }
            zoomOut() {
              G(this, "selection", { resetSelection: !0 }, () =>
                this.transform({ reset: !0, trigger: "zoom" })
              );
            }
            pan(t, e) {
              let i = this,
                s = "object" == typeof e ? e : { enabled: e, type: "x" },
                o = s.type,
                r =
                  o &&
                  i[{ x: "xAxis", xy: "axes", y: "yAxis" }[o]].filter(
                    (t) => t.options.panningEnabled && !t.options.isInternal
                  ),
                a = i.options.chart;
              a?.panning && (a.panning = s),
                G(this, "pan", { originalEvent: t }, () => {
                  i.transform({
                    axes: r,
                    event: t,
                    to: {
                      x: t.chartX - (i.mouseDownX || 0),
                      y: t.chartY - (i.mouseDownY || 0),
                    },
                    trigger: "pan",
                  }),
                    L(i.container, { cursor: "move" });
                });
            }
            transform(t) {
              let {
                  axes: e = this.axes,
                  event: i,
                  from: s = {},
                  reset: o,
                  selection: r,
                  to: a = {},
                  trigger: n,
                } = t,
                { inverted: l } = this,
                h = !1,
                d,
                c;
              for (let t of (this.hoverPoints?.forEach((t) => t.setState()),
              e)) {
                let {
                    horiz: e,
                    len: p,
                    minPointOffset: u = 0,
                    options: g,
                    reversed: f,
                  } = t,
                  m = e ? "width" : "height",
                  x = e ? "x" : "y",
                  y = V(a[m], t.len),
                  b = V(s[m], t.len),
                  v = 10 > Math.abs(y) ? 1 : y / b,
                  S = (s[x] || 0) + b / 2 - t.pos,
                  k = S - ((a[x] ?? t.pos) + y / 2 - t.pos) / v,
                  M = (f && !l) || (!f && l) ? -1 : 1;
                if (!o && (S < 0 || S > t.len)) continue;
                let C = t.toValue(k, !0) + (r ? 0 : u * M),
                  A = t.toValue(k + p / v, !0) - (r ? 0 : u * M || 0),
                  w = t.allExtremes;
                if (
                  (C > A && ([C, A] = [A, C]),
                  1 === v && !o && "yAxis" === t.coll && !w)
                ) {
                  for (let e of t.series) {
                    let t = e.getExtremes(e.getProcessedData(!0).yData, !0);
                    w ??
                      (w = {
                        dataMin: Number.MAX_VALUE,
                        dataMax: -Number.MAX_VALUE,
                      }),
                      H(t.dataMin) &&
                        H(t.dataMax) &&
                        ((w.dataMin = Math.min(t.dataMin, w.dataMin)),
                        (w.dataMax = Math.max(t.dataMax, w.dataMax)));
                  }
                  t.allExtremes = w;
                }
                let {
                    dataMin: T,
                    dataMax: P,
                    min: O,
                    max: L,
                  } = I(t.getExtremes(), w || {}),
                  E = T ?? g.min,
                  B = P ?? g.max,
                  j = A - C,
                  R = t.categories ? 0 : Math.min(j, B - E),
                  z = E - R * (D(g.min) ? 0 : g.minPadding),
                  G = B + R * (D(g.max) ? 0 : g.maxPadding),
                  N = t.allowZoomOutside || 1 === v || ("zoom" !== n && v > 1),
                  W = Math.min(g.min ?? z, z, N ? O : z),
                  X = Math.max(g.max ?? G, G, N ? L : G);
                (!t.isOrdinal || 1 !== v || o) &&
                  (C < W && ((C = W), v >= 1 && (A = C + j)),
                  A > X && ((A = X), v >= 1 && (C = A - j)),
                  (o ||
                    (t.series.length &&
                      (C !== O || A !== L) &&
                      C >= W &&
                      A <= X)) &&
                    (r
                      ? r[t.coll].push({ axis: t, min: C, max: A })
                      : ((t.isPanning = "zoom" !== n),
                        t.isPanning && (c = !0),
                        t.setExtremes(o ? void 0 : C, o ? void 0 : A, !1, !1, {
                          move: k,
                          trigger: n,
                          scale: v,
                        }),
                        !o &&
                          (C > W || A < X) &&
                          "mousewheel" !== n &&
                          (d = !0)),
                    (h = !0)),
                  i &&
                    (this[e ? "mouseDownX" : "mouseDownY"] =
                      i[e ? "chartX" : "chartY"]));
              }
              return (
                h &&
                  (r
                    ? G(this, "selection", r, () => {
                        delete t.selection,
                          (t.trigger = "zoom"),
                          this.transform(t);
                      })
                    : (!d || c || this.resetZoomButton
                        ? !d &&
                          this.resetZoomButton &&
                          (this.resetZoomButton =
                            this.resetZoomButton.destroy())
                        : this.showResetZoom(),
                      this.redraw(
                        "zoom" === n &&
                          (this.options.chart.animation ??
                            this.pointCount < 100)
                      ))),
                h
              );
            }
          }
          return (
            I(Q.prototype, {
              callbacks: [],
              collectionsWithInit: {
                xAxis: [Q.prototype.addAxis, [!0]],
                yAxis: [Q.prototype.addAxis, [!1]],
                series: [Q.prototype.addSeries],
              },
              collectionsWithUpdate: ["xAxis", "yAxis", "series"],
              propsRequireDirtyBox: [
                "backgroundColor",
                "borderColor",
                "borderWidth",
                "borderRadius",
                "plotBackgroundColor",
                "plotBackgroundImage",
                "plotBorderColor",
                "plotBorderWidth",
                "plotShadow",
                "shadow",
              ],
              propsRequireReflow: [
                "margin",
                "marginTop",
                "marginRight",
                "marginBottom",
                "marginLeft",
                "spacing",
                "spacingTop",
                "spacingRight",
                "spacingBottom",
                "spacingLeft",
              ],
              propsRequireUpdateSeries: [
                "chart.inverted",
                "chart.polar",
                "chart.ignoreHiddenSeries",
                "chart.type",
                "colors",
                "plotOptions",
                "time",
                "tooltip",
              ],
            }),
            Q
          );
        }
      ),
      i(
        e,
        "Extensions/ScrollablePlotArea.js",
        [
          e["Core/Animation/AnimationUtilities.js"],
          e["Core/Globals.js"],
          e["Core/Renderer/RendererRegistry.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s) {
          let { stop: o } = t,
            { composed: r } = e,
            {
              addEvent: a,
              createElement: n,
              css: l,
              defined: h,
              merge: d,
              pushUnique: c,
            } = s;
          function p() {
            let t = this.scrollablePlotArea;
            (this.scrollablePixelsX || this.scrollablePixelsY) &&
              !t &&
              (this.scrollablePlotArea = t = new g(this)),
              t?.applyFixed();
          }
          function u() {
            this.chart.scrollablePlotArea &&
              (this.chart.scrollablePlotArea.isDirty = !0);
          }
          class g {
            static compose(t, e, i) {
              c(r, this.compose) &&
                (a(t, "afterInit", u),
                a(e, "afterSetChartSize", (t) =>
                  this.afterSetSize(t.target, t)
                ),
                a(e, "render", p),
                a(i, "show", u));
            }
            static afterSetSize(t, e) {
              let i, s, o;
              let { minWidth: r, minHeight: a } =
                  t.options.chart.scrollablePlotArea || {},
                { clipBox: n, plotBox: l, inverted: c, renderer: p } = t;
              if (
                !p.forExport &&
                (r
                  ? ((t.scrollablePixelsX = i = Math.max(0, r - t.chartWidth)),
                    i &&
                      ((t.scrollablePlotBox = d(t.plotBox)),
                      (l.width = t.plotWidth += i),
                      (n[c ? "height" : "width"] += i),
                      (o = !0)))
                  : a &&
                    ((t.scrollablePixelsY = s = Math.max(0, a - t.chartHeight)),
                    h(s) &&
                      ((t.scrollablePlotBox = d(t.plotBox)),
                      (l.height = t.plotHeight += s),
                      (n[c ? "width" : "height"] += s),
                      (o = !1))),
                h(o) && !e.skipAxes)
              )
                for (let e of t.axes)
                  e.horiz === o && (e.setAxisSize(), e.setAxisTranslation());
            }
            constructor(t) {
              let e;
              let s = t.options.chart,
                o = i.getRendererType(),
                r = s.scrollablePlotArea || {},
                h = this.moveFixedElements.bind(this),
                d = {
                  WebkitOverflowScrolling: "touch",
                  overflowX: "hidden",
                  overflowY: "hidden",
                };
              t.scrollablePixelsX && (d.overflowX = "auto"),
                t.scrollablePixelsY && (d.overflowY = "auto"),
                (this.chart = t);
              let c = (this.parentDiv = n(
                  "div",
                  { className: "highcharts-scrolling-parent" },
                  { position: "relative" },
                  t.renderTo
                )),
                p = (this.scrollingContainer = n(
                  "div",
                  { className: "highcharts-scrolling" },
                  d,
                  c
                )),
                u = (this.innerContainer = n(
                  "div",
                  { className: "highcharts-inner-container" },
                  void 0,
                  p
                )),
                g = (this.fixedDiv = n(
                  "div",
                  { className: "highcharts-fixed" },
                  {
                    position: "absolute",
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: (s.style?.zIndex || 0) + 2,
                    top: 0,
                  },
                  void 0,
                  !0
                )),
                f = (this.fixedRenderer = new o(
                  g,
                  t.chartWidth,
                  t.chartHeight,
                  s.style
                ));
              (this.mask = f
                .path()
                .attr({
                  fill: s.backgroundColor || "#fff",
                  "fill-opacity": r.opacity ?? 0.85,
                  zIndex: -1,
                })
                .addClass("highcharts-scrollable-mask")
                .add()),
                p.parentNode.insertBefore(g, p),
                l(t.renderTo, { overflow: "visible" }),
                a(t, "afterShowResetZoom", h),
                a(t, "afterApplyDrilldown", h),
                a(t, "afterLayOutTitles", h),
                a(p, "scroll", () => {
                  let { pointer: i, hoverPoint: s } = t;
                  i &&
                    (delete i.chartPosition,
                    s && (e = s),
                    i.runPointActions(void 0, e, !0));
                }),
                u.appendChild(t.container);
            }
            applyFixed() {
              let {
                  chart: t,
                  fixedRenderer: e,
                  isDirty: i,
                  scrollingContainer: s,
                } = this,
                {
                  axisOffset: r,
                  chartWidth: a,
                  chartHeight: n,
                  container: d,
                  plotHeight: c,
                  plotLeft: p,
                  plotTop: u,
                  plotWidth: g,
                  scrollablePixelsX: f = 0,
                  scrollablePixelsY: m = 0,
                } = t,
                { scrollPositionX: x = 0, scrollPositionY: y = 0 } =
                  t.options.chart.scrollablePlotArea || {},
                b = a + f,
                v = n + m;
              e.setSize(a, n),
                (i ?? !0) && ((this.isDirty = !1), this.moveFixedElements()),
                o(t.container),
                l(d, { width: `${b}px`, height: `${v}px` }),
                t.renderer.boxWrapper.attr({
                  width: b,
                  height: v,
                  viewBox: [0, 0, b, v].join(" "),
                }),
                t.chartBackground?.attr({ width: b, height: v }),
                l(s, { width: `${a}px`, height: `${n}px` }),
                h(i) || ((s.scrollLeft = f * x), (s.scrollTop = m * y));
              let S = u - r[0] - 1,
                k = p - r[3] - 1,
                M = u + c + r[2] + 1,
                C = p + g + r[1] + 1,
                A = p + g - f,
                w = u + c - m,
                T = [["M", 0, 0]];
              f
                ? (T = [
                    ["M", 0, S],
                    ["L", p - 1, S],
                    ["L", p - 1, M],
                    ["L", 0, M],
                    ["Z"],
                    ["M", A, S],
                    ["L", a, S],
                    ["L", a, M],
                    ["L", A, M],
                    ["Z"],
                  ])
                : m &&
                  (T = [
                    ["M", k, 0],
                    ["L", k, u - 1],
                    ["L", C, u - 1],
                    ["L", C, 0],
                    ["Z"],
                    ["M", k, w],
                    ["L", k, n],
                    ["L", C, n],
                    ["L", C, w],
                    ["Z"],
                  ]),
                "adjustHeight" !== t.redrawTrigger && this.mask.attr({ d: T });
            }
            moveFixedElements() {
              let t;
              let {
                  container: e,
                  inverted: i,
                  scrollablePixelsX: s,
                  scrollablePixelsY: o,
                } = this.chart,
                r = this.fixedRenderer,
                a = g.fixedSelectors;
              for (let n of (s && !i
                ? (t = ".highcharts-yaxis")
                : s && i
                ? (t = ".highcharts-xaxis")
                : o && !i
                ? (t = ".highcharts-xaxis")
                : o && i && (t = ".highcharts-yaxis"),
              t &&
                a.push(
                  `${t}:not(.highcharts-radial-axis)`,
                  `${t}-labels:not(.highcharts-radial-axis-labels)`
                ),
              a))
                [].forEach.call(e.querySelectorAll(n), (t) => {
                  (t.namespaceURI === r.SVG_NS
                    ? r.box
                    : r.box.parentNode
                  ).appendChild(t),
                    (t.style.pointerEvents = "auto");
                });
            }
          }
          return (
            (g.fixedSelectors = [
              ".highcharts-breadcrumbs-group",
              ".highcharts-contextbutton",
              ".highcharts-caption",
              ".highcharts-credits",
              ".highcharts-drillup-button",
              ".highcharts-legend",
              ".highcharts-legend-checkbox",
              ".highcharts-navigator-series",
              ".highcharts-navigator-xaxis",
              ".highcharts-navigator-yaxis",
              ".highcharts-navigator",
              ".highcharts-range-selector-group",
              ".highcharts-reset-zoom",
              ".highcharts-scrollbar",
              ".highcharts-subtitle",
              ".highcharts-title",
            ]),
            g
          );
        }
      ),
      i(
        e,
        "Core/Axis/Stacking/StackItem.js",
        [
          e["Core/Templating.js"],
          e["Core/Series/SeriesRegistry.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i) {
          let { format: s } = t,
            { series: o } = e,
            {
              destroyObjectProperties: r,
              fireEvent: a,
              isNumber: n,
              pick: l,
            } = i;
          return class {
            constructor(t, e, i, s, o) {
              let r = t.chart.inverted,
                a = t.reversed;
              this.axis = t;
              let n = (this.isNegative = !!i != !!a);
              (this.options = e = e || {}),
                (this.x = s),
                (this.total = null),
                (this.cumulative = null),
                (this.points = {}),
                (this.hasValidPoints = !1),
                (this.stack = o),
                (this.leftCliff = 0),
                (this.rightCliff = 0),
                (this.alignOptions = {
                  align: e.align || (r ? (n ? "left" : "right") : "center"),
                  verticalAlign:
                    e.verticalAlign || (r ? "middle" : n ? "bottom" : "top"),
                  y: e.y,
                  x: e.x,
                }),
                (this.textAlign =
                  e.textAlign || (r ? (n ? "right" : "left") : "center"));
            }
            destroy() {
              r(this, this.axis);
            }
            render(t) {
              let e = this.axis.chart,
                i = this.options,
                o = i.format,
                r = o ? s(o, this, e) : i.formatter.call(this);
              if (this.label)
                this.label.attr({ text: r, visibility: "hidden" });
              else {
                this.label = e.renderer.label(
                  r,
                  null,
                  void 0,
                  i.shape,
                  void 0,
                  void 0,
                  i.useHTML,
                  !1,
                  "stack-labels"
                );
                let s = {
                  r: i.borderRadius || 0,
                  text: r,
                  padding: l(i.padding, 5),
                  visibility: "hidden",
                };
                e.styledMode ||
                  ((s.fill = i.backgroundColor),
                  (s.stroke = i.borderColor),
                  (s["stroke-width"] = i.borderWidth),
                  this.label.css(i.style || {})),
                  this.label.attr(s),
                  this.label.added || this.label.add(t);
              }
              (this.label.labelrank = e.plotSizeY), a(this, "afterRender");
            }
            setOffset(t, e, i, s, r, h) {
              let {
                  alignOptions: d,
                  axis: c,
                  label: p,
                  options: u,
                  textAlign: g,
                } = this,
                f = c.chart,
                m = this.getStackBox({
                  xOffset: t,
                  width: e,
                  boxBottom: i,
                  boxTop: s,
                  defaultX: r,
                  xAxis: h,
                }),
                { verticalAlign: x } = d;
              if (p && m) {
                let t = p.getBBox(void 0, 0),
                  e = p.padding,
                  i = "justify" === l(u.overflow, "justify"),
                  s;
                (d.x = u.x || 0), (d.y = u.y || 0);
                let { x: r, y: a } = this.adjustStackPosition({
                  labelBox: t,
                  verticalAlign: x,
                  textAlign: g,
                });
                (m.x -= r),
                  (m.y -= a),
                  p.align(d, !1, m),
                  (s = f.isInsidePlot(
                    p.alignAttr.x + d.x + r,
                    p.alignAttr.y + d.y + a
                  )) || (i = !1),
                  i &&
                    o.prototype.justifyDataLabel.call(
                      c,
                      p,
                      d,
                      p.alignAttr,
                      t,
                      m
                    ),
                  p.attr({
                    x: p.alignAttr.x,
                    y: p.alignAttr.y,
                    rotation: u.rotation,
                    rotationOriginX:
                      t.width *
                      { left: 0, center: 0.5, right: 1 }[
                        u.textAlign || "center"
                      ],
                    rotationOriginY: t.height / 2,
                  }),
                  l(!i && u.crop, !0) &&
                    (s =
                      n(p.x) &&
                      n(p.y) &&
                      f.isInsidePlot(p.x - e + (p.width || 0), p.y) &&
                      f.isInsidePlot(p.x + e, p.y)),
                  p[s ? "show" : "hide"]();
              }
              a(this, "afterSetOffset", { xOffset: t, width: e });
            }
            adjustStackPosition({
              labelBox: t,
              verticalAlign: e,
              textAlign: i,
            }) {
              let s = {
                  bottom: 0,
                  middle: 1,
                  top: 2,
                  right: 1,
                  center: 0,
                  left: -1,
                },
                o = s[e],
                r = s[i];
              return {
                x: t.width / 2 + (t.width / 2) * r,
                y: (t.height / 2) * o,
              };
            }
            getStackBox(t) {
              let e = this.axis,
                i = e.chart,
                {
                  boxTop: s,
                  defaultX: o,
                  xOffset: r,
                  width: a,
                  boxBottom: h,
                } = t,
                d = e.stacking.usePercentage ? 100 : l(s, this.total, 0),
                c = e.toPixels(d),
                p = t.xAxis || i.xAxis[0],
                u = l(o, p.translate(this.x)) + r,
                g = Math.abs(
                  c -
                    e.toPixels(
                      h ||
                        (n(e.min) &&
                          e.logarithmic &&
                          e.logarithmic.lin2log(e.min)) ||
                        0
                    )
                ),
                f = i.inverted,
                m = this.isNegative;
              return f
                ? {
                    x: (m ? c : c - g) - i.plotLeft,
                    y: p.height - u - a + p.top - i.plotTop,
                    width: g,
                    height: a,
                  }
                : {
                    x: u + p.transB - i.plotLeft,
                    y: (m ? c - g : c) - i.plotTop,
                    width: a,
                    height: g,
                  };
            }
          };
        }
      ),
      i(
        e,
        "Core/Axis/Stacking/StackingAxis.js",
        [
          e["Core/Animation/AnimationUtilities.js"],
          e["Core/Axis/Axis.js"],
          e["Core/Series/SeriesRegistry.js"],
          e["Core/Axis/Stacking/StackItem.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s, o) {
          var r;
          let { getDeferredAnimation: a } = t,
            {
              series: { prototype: n },
            } = i,
            {
              addEvent: l,
              correctFloat: h,
              defined: d,
              destroyObjectProperties: c,
              fireEvent: p,
              isArray: u,
              isNumber: g,
              objectEach: f,
              pick: m,
            } = o;
          function x() {
            let t = this.inverted;
            this.axes.forEach((t) => {
              t.stacking &&
                t.stacking.stacks &&
                t.hasVisibleSeries &&
                (t.stacking.oldStacks = t.stacking.stacks);
            }),
              this.series.forEach((e) => {
                let i = (e.xAxis && e.xAxis.options) || {};
                e.options.stacking &&
                  e.reserveSpace() &&
                  (e.stackKey = [
                    e.type,
                    m(e.options.stack, ""),
                    t ? i.top : i.left,
                    t ? i.height : i.width,
                  ].join(","));
              });
          }
          function y() {
            let t = this.stacking;
            if (t) {
              let e = t.stacks;
              f(e, (t, i) => {
                c(t), delete e[i];
              }),
                t.stackTotalGroup?.destroy();
            }
          }
          function b() {
            this.stacking || (this.stacking = new A(this));
          }
          function v(t, e, i, s) {
            return (
              !d(t) || t.x !== e || (s && t.stackKey !== s)
                ? (t = { x: e, index: 0, key: s, stackKey: s })
                : t.index++,
              (t.key = [i, e, t.index].join(",")),
              t
            );
          }
          function S() {
            let t;
            let e = this,
              i = e.yAxis,
              s = e.stackKey || "",
              o = i.stacking.stacks,
              r = e.processedXData,
              a = e.options.stacking,
              n = e[a + "Stacker"];
            n &&
              [s, "-" + s].forEach((i) => {
                let s = r.length,
                  a,
                  l,
                  h;
                for (; s--; )
                  (a = r[s]),
                    (t = e.getStackIndicator(t, a, e.index, i)),
                    (l = o[i]?.[a]),
                    (h = l?.points[t.key || ""]) && n.call(e, h, l, s);
              });
          }
          function k(t, e, i) {
            let s = e.total ? 100 / e.total : 0;
            (t[0] = h(t[0] * s)),
              (t[1] = h(t[1] * s)),
              (this.stackedYData[i] = t[1]);
          }
          function M(t) {
            (this.is("column") || this.is("columnrange")) &&
              (this.options.centerInCategory &&
              !this.options.stacking &&
              this.chart.series.length > 1
                ? n.setStackedPoints.call(this, t, "group")
                : t.stacking.resetStacks());
          }
          function C(t, e) {
            let i, o, r, a, n, l, c, p, g;
            let f = e || this.options.stacking;
            if (
              !f ||
              !this.reserveSpace() ||
              ({ group: "xAxis" }[f] || "yAxis") !== t.coll
            )
              return;
            let x = this.processedXData,
              y = this.processedYData,
              b = [],
              v = y.length,
              S = this.options,
              k = S.threshold || 0,
              M = S.startFromThreshold ? k : 0,
              C = S.stack,
              A = e ? `${this.type},${f}` : this.stackKey || "",
              w = "-" + A,
              T = this.negStacks,
              P = t.stacking,
              O = P.stacks,
              L = P.oldStacks;
            for (P.stacksTouched += 1, c = 0; c < v; c++) {
              (p = x[c]),
                (g = y[c]),
                (l = (i = this.getStackIndicator(i, p, this.index)).key || ""),
                O[(n = (o = T && g < (M ? 0 : k)) ? w : A)] || (O[n] = {}),
                O[n][p] ||
                  (L[n]?.[p]
                    ? ((O[n][p] = L[n][p]), (O[n][p].total = null))
                    : (O[n][p] = new s(t, t.options.stackLabels, !!o, p, C))),
                (r = O[n][p]),
                null !== g
                  ? ((r.points[l] = r.points[this.index] =
                      [m(r.cumulative, M)]),
                    d(r.cumulative) || (r.base = l),
                    (r.touched = P.stacksTouched),
                    i.index > 0 &&
                      !1 === this.singleStacks &&
                      (r.points[l][0] =
                        r.points[this.index + "," + p + ",0"][0]))
                  : (delete r.points[l], delete r.points[this.index]);
              let e = r.total || 0;
              "percent" === f
                ? ((a = o ? A : w),
                  (e =
                    T && O[a]?.[p]
                      ? ((a = O[a][p]).total =
                          Math.max(a.total || 0, e) + Math.abs(g) || 0)
                      : h(e + (Math.abs(g) || 0))))
                : "group" === f
                ? (u(g) && (g = g[0]), null !== g && e++)
                : (e = h(e + (g || 0))),
                "group" === f
                  ? (r.cumulative = (e || 1) - 1)
                  : (r.cumulative = h(m(r.cumulative, M) + (g || 0))),
                (r.total = e),
                null !== g &&
                  (r.points[l].push(r.cumulative),
                  (b[c] = r.cumulative),
                  (r.hasValidPoints = !0));
            }
            "percent" === f && (P.usePercentage = !0),
              "group" !== f && (this.stackedYData = b),
              (P.oldStacks = {});
          }
          class A {
            constructor(t) {
              (this.oldStacks = {}),
                (this.stacks = {}),
                (this.stacksTouched = 0),
                (this.axis = t);
            }
            buildStacks() {
              let t, e;
              let i = this.axis,
                s = i.series,
                o = "xAxis" === i.coll,
                r = i.options.reversedStacks,
                a = s.length;
              for (this.resetStacks(), this.usePercentage = !1, e = a; e--; )
                (t = s[r ? e : a - e - 1]),
                  o && t.setGroupedPoints(i),
                  t.setStackedPoints(i);
              if (!o) for (e = 0; e < a; e++) s[e].modifyStacks();
              p(i, "afterBuildStacks");
            }
            cleanStacks() {
              this.oldStacks &&
                ((this.stacks = this.oldStacks),
                f(this.stacks, (t) => {
                  f(t, (t) => {
                    t.cumulative = t.total;
                  });
                }));
            }
            resetStacks() {
              f(this.stacks, (t) => {
                f(t, (e, i) => {
                  g(e.touched) && e.touched < this.stacksTouched
                    ? (e.destroy(), delete t[i])
                    : ((e.total = null), (e.cumulative = null));
                });
              });
            }
            renderStackTotals() {
              let t = this.axis,
                e = t.chart,
                i = e.renderer,
                s = this.stacks,
                o = a(e, t.options.stackLabels?.animation || !1),
                r = (this.stackTotalGroup =
                  this.stackTotalGroup ||
                  i.g("stack-labels").attr({ zIndex: 6, opacity: 0 }).add());
              r.translate(e.plotLeft, e.plotTop),
                f(s, (t) => {
                  f(t, (t) => {
                    t.render(r);
                  });
                }),
                r.animate({ opacity: 1 }, o);
            }
          }
          return (
            ((r || (r = {})).compose = function (t, e, i) {
              let s = e.prototype,
                o = i.prototype;
              s.getStacks ||
                (l(t, "init", b),
                l(t, "destroy", y),
                (s.getStacks = x),
                (o.getStackIndicator = v),
                (o.modifyStacks = S),
                (o.percentStacker = k),
                (o.setGroupedPoints = M),
                (o.setStackedPoints = C));
            }),
            r
          );
        }
      ),
      i(
        e,
        "Series/Line/LineSeries.js",
        [
          e["Core/Series/Series.js"],
          e["Core/Series/SeriesRegistry.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i) {
          let { defined: s, merge: o, isObject: r } = i;
          class a extends t {
            drawGraph() {
              let t = this.options,
                e = (this.gappedPath || this.getGraphPath).call(this),
                i = this.chart.styledMode;
              [this, ...this.zones].forEach((s, a) => {
                let n,
                  l = s.graph,
                  h = l ? "animate" : "attr",
                  d = s.dashStyle || t.dashStyle;
                l
                  ? ((l.endX = this.preventGraphAnimation ? null : e.xMap),
                    l.animate({ d: e }))
                  : e.length &&
                    (s.graph = l =
                      this.chart.renderer
                        .path(e)
                        .addClass(
                          "highcharts-graph" +
                            (a ? ` highcharts-zone-graph-${a - 1} ` : " ") +
                            ((a && s.className) || "")
                        )
                        .attr({ zIndex: 1 })
                        .add(this.group)),
                  l &&
                    !i &&
                    ((n = {
                      stroke:
                        (!a && t.lineColor) ||
                        s.color ||
                        this.color ||
                        "#cccccc",
                      "stroke-width": t.lineWidth || 0,
                      fill: (this.fillGraph && this.color) || "none",
                    }),
                    d
                      ? (n.dashstyle = d)
                      : "square" !== t.linecap &&
                        (n["stroke-linecap"] = n["stroke-linejoin"] = "round"),
                    l[h](n).shadow(
                      a < 2 &&
                        t.shadow &&
                        o(
                          { filterUnits: "userSpaceOnUse" },
                          r(t.shadow) ? t.shadow : {}
                        )
                    )),
                  l && ((l.startX = e.xMap), (l.isArea = e.isArea));
              });
            }
            getGraphPath(t, e, i) {
              let o = this,
                r = o.options,
                a = [],
                n = [],
                l,
                h = r.step,
                d = (t = t || o.points).reversed;
              return (
                d && t.reverse(),
                (h = { right: 1, center: 2 }[h] || (h && 3)) &&
                  d &&
                  (h = 4 - h),
                (t = this.getValidPoints(
                  t,
                  !1,
                  !(r.connectNulls && !e && !i)
                )).forEach(function (d, c) {
                  let p;
                  let u = d.plotX,
                    g = d.plotY,
                    f = t[c - 1],
                    m = d.isNull || "number" != typeof g;
                  (d.leftCliff || (f && f.rightCliff)) && !i && (l = !0),
                    m && !s(e) && c > 0
                      ? (l = !r.connectNulls)
                      : m && !e
                      ? (l = !0)
                      : (0 === c || l
                          ? (p = [["M", d.plotX, d.plotY]])
                          : o.getPointSpline
                          ? (p = [o.getPointSpline(t, d, c)])
                          : h
                          ? (p =
                              1 === h
                                ? [["L", f.plotX, g]]
                                : 2 === h
                                ? [
                                    ["L", (f.plotX + u) / 2, f.plotY],
                                    ["L", (f.plotX + u) / 2, g],
                                  ]
                                : [["L", u, f.plotY]]).push(["L", u, g])
                          : (p = [["L", u, g]]),
                        n.push(d.x),
                        h && (n.push(d.x), 2 === h && n.push(d.x)),
                        a.push.apply(a, p),
                        (l = !1));
                }),
                (a.xMap = n),
                (o.graphPath = a),
                a
              );
            }
          }
          return (
            (a.defaultOptions = o(t.defaultOptions, {
              legendSymbol: "lineMarker",
            })),
            e.registerSeriesType("line", a),
            a
          );
        }
      ),
      i(e, "Series/Area/AreaSeriesDefaults.js", [], function () {
        return { threshold: 0, legendSymbol: "areaMarker" };
      }),
      i(
        e,
        "Series/Area/AreaSeries.js",
        [
          e["Series/Area/AreaSeriesDefaults.js"],
          e["Core/Series/SeriesRegistry.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i) {
          let {
              seriesTypes: { line: s },
            } = e,
            { extend: o, merge: r, objectEach: a, pick: n } = i;
          class l extends s {
            drawGraph() {
              (this.areaPath = []), super.drawGraph.apply(this);
              let { areaPath: t, options: e } = this;
              [this, ...this.zones].forEach((i, s) => {
                let o = {},
                  r = i.fillColor || e.fillColor,
                  a = i.area,
                  n = a ? "animate" : "attr";
                a
                  ? ((a.endX = this.preventGraphAnimation ? null : t.xMap),
                    a.animate({ d: t }))
                  : ((o.zIndex = 0),
                    ((a = i.area =
                      this.chart.renderer
                        .path(t)
                        .addClass(
                          "highcharts-area" +
                            (s ? ` highcharts-zone-area-${s - 1} ` : " ") +
                            ((s && i.className) || "")
                        )
                        .add(this.group)).isArea = !0)),
                  this.chart.styledMode ||
                    ((o.fill = r || i.color || this.color),
                    (o["fill-opacity"] = r ? 1 : e.fillOpacity ?? 0.75),
                    a.css({
                      pointerEvents: this.stickyTracking ? "none" : "auto",
                    })),
                  a[n](o),
                  (a.startX = t.xMap),
                  (a.shiftUnit = e.step ? 2 : 1);
              });
            }
            getGraphPath(t) {
              let e, i, o;
              let r = s.prototype.getGraphPath,
                a = this.options,
                l = a.stacking,
                h = this.yAxis,
                d = [],
                c = [],
                p = this.index,
                u = h.stacking.stacks[this.stackKey],
                g = a.threshold,
                f = Math.round(h.getThreshold(a.threshold)),
                m = n(a.connectNulls, "percent" === l),
                x = function (i, s, o) {
                  let r = t[i],
                    a = l && u[r.x].points[p],
                    n = r[o + "Null"] || 0,
                    m = r[o + "Cliff"] || 0,
                    x,
                    y,
                    b = !0;
                  m || n
                    ? ((x = (n ? a[0] : a[1]) + m), (y = a[0] + m), (b = !!n))
                    : !l && t[s] && t[s].isNull && (x = y = g),
                    void 0 !== x &&
                      (c.push({
                        plotX: e,
                        plotY: null === x ? f : h.getThreshold(x),
                        isNull: b,
                        isCliff: !0,
                      }),
                      d.push({
                        plotX: e,
                        plotY: null === y ? f : h.getThreshold(y),
                        doCurve: !1,
                      }));
                };
              (t = t || this.points), l && (t = this.getStackPoints(t));
              for (let s = 0, r = t.length; s < r; ++s)
                l ||
                  (t[s].leftCliff =
                    t[s].rightCliff =
                    t[s].leftNull =
                    t[s].rightNull =
                      void 0),
                  (i = t[s].isNull),
                  (e = n(t[s].rectPlotX, t[s].plotX)),
                  (o = l ? n(t[s].yBottom, f) : f),
                  (i && !m) ||
                    (m || x(s, s - 1, "left"),
                    (i && !l && m) ||
                      (c.push(t[s]), d.push({ x: s, plotX: e, plotY: o })),
                    m || x(s, s + 1, "right"));
              let y = r.call(this, c, !0, !0);
              d.reversed = !0;
              let b = r.call(this, d, !0, !0),
                v = b[0];
              v && "M" === v[0] && (b[0] = ["L", v[1], v[2]]);
              let S = y.concat(b);
              S.length && S.push(["Z"]);
              let k = r.call(this, c, !1, m);
              return (
                this.chart.series.length > 1 &&
                  l &&
                  c.some((t) => t.isCliff) &&
                  (S.hasStackedCliffs = k.hasStackedCliffs = !0),
                (S.xMap = y.xMap),
                (this.areaPath = S),
                k
              );
            }
            getStackPoints(t) {
              let e = this,
                i = [],
                s = [],
                o = this.xAxis,
                r = this.yAxis,
                l = r.stacking.stacks[this.stackKey],
                h = {},
                d = r.series,
                c = d.length,
                p = r.options.reversedStacks ? 1 : -1,
                u = d.indexOf(e);
              if (((t = t || this.points), this.options.stacking)) {
                for (let e = 0; e < t.length; e++)
                  (t[e].leftNull = t[e].rightNull = void 0), (h[t[e].x] = t[e]);
                a(l, function (t, e) {
                  null !== t.total && s.push(e);
                }),
                  s.sort(function (t, e) {
                    return t - e;
                  });
                let g = d.map((t) => t.visible);
                s.forEach(function (t, a) {
                  let f = 0,
                    m,
                    x;
                  if (h[t] && !h[t].isNull)
                    i.push(h[t]),
                      [-1, 1].forEach(function (i) {
                        let o = 1 === i ? "rightNull" : "leftNull",
                          r = l[s[a + i]],
                          n = 0;
                        if (r) {
                          let i = u;
                          for (; i >= 0 && i < c; ) {
                            let s = d[i].index;
                            !(m = r.points[s]) &&
                              (s === e.index
                                ? (h[t][o] = !0)
                                : g[i] &&
                                  (x = l[t].points[s]) &&
                                  (n -= x[1] - x[0])),
                              (i += p);
                          }
                        }
                        h[t][1 === i ? "rightCliff" : "leftCliff"] = n;
                      });
                  else {
                    let e = u;
                    for (; e >= 0 && e < c; ) {
                      let i = d[e].index;
                      if ((m = l[t].points[i])) {
                        f = m[1];
                        break;
                      }
                      e += p;
                    }
                    (f = n(f, 0)),
                      (f = r.translate(f, 0, 1, 0, 1)),
                      i.push({
                        isNull: !0,
                        plotX: o.translate(t, 0, 0, 0, 1),
                        x: t,
                        plotY: f,
                        yBottom: f,
                      });
                  }
                });
              }
              return i;
            }
          }
          return (
            (l.defaultOptions = r(s.defaultOptions, t)),
            o(l.prototype, { singleStacks: !1 }),
            e.registerSeriesType("area", l),
            l
          );
        }
      ),
      i(
        e,
        "Series/Spline/SplineSeries.js",
        [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]],
        function (t, e) {
          let { line: i } = t.seriesTypes,
            { merge: s, pick: o } = e;
          class r extends i {
            getPointSpline(t, e, i) {
              let s, r, a, n;
              let l = e.plotX || 0,
                h = e.plotY || 0,
                d = t[i - 1],
                c = t[i + 1];
              function p(t) {
                return t && !t.isNull && !1 !== t.doCurve && !e.isCliff;
              }
              if (p(d) && p(c)) {
                let t = d.plotX || 0,
                  i = d.plotY || 0,
                  o = c.plotX || 0,
                  p = c.plotY || 0,
                  u = 0;
                (s = (1.5 * l + t) / 2.5),
                  (r = (1.5 * h + i) / 2.5),
                  (a = (1.5 * l + o) / 2.5),
                  (n = (1.5 * h + p) / 2.5),
                  a !== s && (u = ((n - r) * (a - l)) / (a - s) + h - n),
                  (r += u),
                  (n += u),
                  r > i && r > h
                    ? ((r = Math.max(i, h)), (n = 2 * h - r))
                    : r < i && r < h && ((r = Math.min(i, h)), (n = 2 * h - r)),
                  n > p && n > h
                    ? ((n = Math.max(p, h)), (r = 2 * h - n))
                    : n < p && n < h && ((n = Math.min(p, h)), (r = 2 * h - n)),
                  (e.rightContX = a),
                  (e.rightContY = n),
                  (e.controlPoints = { low: [s, r], high: [a, n] });
              }
              let u = [
                "C",
                o(d.rightContX, d.plotX, 0),
                o(d.rightContY, d.plotY, 0),
                o(s, l, 0),
                o(r, h, 0),
                l,
                h,
              ];
              return (d.rightContX = d.rightContY = void 0), u;
            }
          }
          return (
            (r.defaultOptions = s(i.defaultOptions)),
            t.registerSeriesType("spline", r),
            r
          );
        }
      ),
      i(
        e,
        "Series/AreaSpline/AreaSplineSeries.js",
        [
          e["Series/Spline/SplineSeries.js"],
          e["Core/Series/SeriesRegistry.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i) {
          let {
              area: s,
              area: { prototype: o },
            } = e.seriesTypes,
            { extend: r, merge: a } = i;
          class n extends t {}
          return (
            (n.defaultOptions = a(t.defaultOptions, s.defaultOptions)),
            r(n.prototype, {
              getGraphPath: o.getGraphPath,
              getStackPoints: o.getStackPoints,
              drawGraph: o.drawGraph,
            }),
            e.registerSeriesType("areaspline", n),
            n
          );
        }
      ),
      i(e, "Series/Column/ColumnSeriesDefaults.js", [], function () {
        return {
          borderRadius: 3,
          centerInCategory: !1,
          groupPadding: 0.2,
          marker: null,
          pointPadding: 0.1,
          minPointLength: 0,
          cropThreshold: 50,
          pointRange: null,
          states: {
            hover: { halo: !1, brightness: 0.1 },
            select: { color: "#cccccc", borderColor: "#000000" },
          },
          dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 },
          startFromThreshold: !0,
          stickyTracking: !1,
          tooltip: { distance: 6 },
          threshold: 0,
          borderColor: "#ffffff",
        };
      }),
      i(
        e,
        "Series/Column/ColumnSeries.js",
        [
          e["Core/Animation/AnimationUtilities.js"],
          e["Core/Color/Color.js"],
          e["Series/Column/ColumnSeriesDefaults.js"],
          e["Core/Globals.js"],
          e["Core/Series/Series.js"],
          e["Core/Series/SeriesRegistry.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s, o, r, a) {
          let { animObject: n } = t,
            { parse: l } = e,
            { noop: h } = s,
            {
              clamp: d,
              crisp: c,
              defined: p,
              extend: u,
              fireEvent: g,
              isArray: f,
              isNumber: m,
              merge: x,
              pick: y,
              objectEach: b,
            } = a;
          class v extends o {
            animate(t) {
              let e, i;
              let s = this,
                o = this.yAxis,
                r = o.pos,
                a = o.reversed,
                l = s.options,
                { clipOffset: h, inverted: c } = this.chart,
                p = {},
                g = c ? "translateX" : "translateY";
              t && h
                ? ((p.scaleY = 0.001),
                  (i = d(o.toPixels(l.threshold), r, r + o.len)),
                  c
                    ? ((i += a ? -Math.floor(h[0]) : Math.ceil(h[2])),
                      (p.translateX = i - o.len))
                    : ((i += a ? Math.ceil(h[0]) : -Math.floor(h[2])),
                      (p.translateY = i)),
                  s.clipBox && s.setClip(),
                  s.group.attr(p))
                : ((e = Number(s.group.attr(g))),
                  s.group.animate(
                    { scaleY: 1 },
                    u(n(s.options.animation), {
                      step: function (t, i) {
                        s.group &&
                          ((p[g] = e + i.pos * (r - e)), s.group.attr(p));
                      },
                    })
                  ));
            }
            init(t, e) {
              super.init.apply(this, arguments);
              let i = this;
              (t = i.chart).hasRendered &&
                t.series.forEach(function (t) {
                  t.type === i.type && (t.isDirty = !0);
                });
            }
            getColumnMetrics() {
              let t = this,
                e = t.options,
                i = t.xAxis,
                s = t.yAxis,
                o = i.options.reversedStacks,
                r = (i.reversed && !o) || (!i.reversed && o),
                a = {},
                n,
                l = 0;
              !1 === e.grouping
                ? (l = 1)
                : t.chart.series.forEach(function (e) {
                    let i;
                    let o = e.yAxis,
                      r = e.options;
                    e.type === t.type &&
                      e.reserveSpace() &&
                      s.len === o.len &&
                      s.pos === o.pos &&
                      (r.stacking && "group" !== r.stacking
                        ? (void 0 === a[(n = e.stackKey)] && (a[n] = l++),
                          (i = a[n]))
                        : !1 !== r.grouping && (i = l++),
                      (e.columnIndex = i));
                  });
              let h = Math.min(
                  Math.abs(i.transA) *
                    ((!i.brokenAxis?.hasBreaks && i.ordinal?.slope) ||
                      e.pointRange ||
                      i.closestPointRange ||
                      i.tickInterval ||
                      1),
                  i.len
                ),
                d = h * e.groupPadding,
                c = (h - 2 * d) / (l || 1),
                p = Math.min(
                  e.maxPointWidth || i.len,
                  y(e.pointWidth, c * (1 - 2 * e.pointPadding))
                ),
                u = (t.columnIndex || 0) + (r ? 1 : 0);
              return (
                (t.columnMetrics = {
                  width: p,
                  offset: (c - p) / 2 + (d + u * c - h / 2) * (r ? -1 : 1),
                  paddedWidth: c,
                  columnCount: l,
                }),
                t.columnMetrics
              );
            }
            crispCol(t, e, i, s) {
              let o = this.borderWidth,
                r = this.chart.inverted;
              return (
                (s = c(e + s, o, r) - (e = c(e, o, r))),
                this.options.crisp && (i = c(t + i, o) - (t = c(t, o))),
                { x: t, y: e, width: i, height: s }
              );
            }
            adjustForMissingColumns(t, e, i, s) {
              if (!i.isNull && s.columnCount > 1) {
                let o = this.xAxis.series
                    .filter((t) => t.visible)
                    .map((t) => t.index),
                  r = 0,
                  a = 0;
                b(this.xAxis.stacking?.stacks, (t) => {
                  if ("number" == typeof i.x) {
                    let e = t[i.x.toString()];
                    if (e && f(e.points[this.index])) {
                      let t = Object.keys(e.points)
                        .filter(
                          (t) =>
                            !t.match(",") &&
                            e.points[t] &&
                            e.points[t].length > 1
                        )
                        .map(parseFloat)
                        .filter((t) => -1 !== o.indexOf(t))
                        .sort((t, e) => e - t);
                      (r = t.indexOf(this.index)), (a = t.length);
                    }
                  }
                }),
                  (r = this.xAxis.reversed ? a - 1 - r : r);
                let n = (a - 1) * s.paddedWidth + e;
                t = (i.plotX || 0) + n / 2 - e - r * s.paddedWidth;
              }
              return t;
            }
            translate() {
              let t = this,
                e = t.chart,
                i = t.options,
                s = (t.dense = t.closestPointRange * t.xAxis.transA < 2),
                r = (t.borderWidth = y(i.borderWidth, s ? 0 : 1)),
                a = t.xAxis,
                n = t.yAxis,
                l = i.threshold,
                h = y(i.minPointLength, 5),
                c = t.getColumnMetrics(),
                u = c.width,
                f = (t.pointXOffset = c.offset),
                x = t.dataMin,
                b = t.dataMax,
                v = (t.translatedThreshold = n.getThreshold(l)),
                S = (t.barW = Math.max(u, 1 + 2 * r));
              i.pointPadding && (S = Math.ceil(S)),
                o.prototype.translate.apply(t),
                t.points.forEach(function (s) {
                  let o = y(s.yBottom, v),
                    r = 999 + Math.abs(o),
                    g = s.plotX || 0,
                    k = d(s.plotY, -r, n.len + r),
                    M,
                    C = Math.min(k, o),
                    A = Math.max(k, o) - C,
                    w = u,
                    T = g + f,
                    P = S;
                  h &&
                    Math.abs(A) < h &&
                    ((A = h),
                    (M =
                      (!n.reversed && !s.negative) ||
                      (n.reversed && s.negative)),
                    m(l) &&
                      m(b) &&
                      s.y === l &&
                      b <= l &&
                      (n.min || 0) < l &&
                      (x !== b || (n.max || 0) <= l) &&
                      ((M = !M), (s.negative = !s.negative)),
                    (C = Math.abs(C - v) > h ? o - h : v - (M ? h : 0))),
                    p(s.options.pointWidth) &&
                      (T -= Math.round(
                        ((w = P = Math.ceil(s.options.pointWidth)) - u) / 2
                      )),
                    i.centerInCategory &&
                      !i.stacking &&
                      (T = t.adjustForMissingColumns(T, w, s, c)),
                    (s.barX = T),
                    (s.pointWidth = w),
                    (s.tooltipPos = e.inverted
                      ? [
                          d(
                            n.len + n.pos - e.plotLeft - k,
                            n.pos - e.plotLeft,
                            n.len + n.pos - e.plotLeft
                          ),
                          a.len + a.pos - e.plotTop - T - P / 2,
                          A,
                        ]
                      : [
                          a.left - e.plotLeft + T + P / 2,
                          d(
                            k + n.pos - e.plotTop,
                            n.pos - e.plotTop,
                            n.len + n.pos - e.plotTop
                          ),
                          A,
                        ]),
                    (s.shapeType =
                      t.pointClass.prototype.shapeType || "roundedRect"),
                    (s.shapeArgs = t.crispCol(
                      T,
                      s.isNull ? v : C,
                      P,
                      s.isNull ? 0 : A
                    ));
                }),
                g(this, "afterColumnTranslate");
            }
            drawGraph() {
              this.group[this.dense ? "addClass" : "removeClass"](
                "highcharts-dense-data"
              );
            }
            pointAttribs(t, e) {
              let i = this.options,
                s = this.pointAttrToOptions || {},
                o = s.stroke || "borderColor",
                r = s["stroke-width"] || "borderWidth",
                a,
                n,
                h,
                d = (t && t.color) || this.color,
                c = (t && t[o]) || i[o] || d,
                p = (t && t.options.dashStyle) || i.dashStyle,
                u = (t && t[r]) || i[r] || this[r] || 0,
                g = y(t && t.opacity, i.opacity, 1);
              t &&
                this.zones.length &&
                ((n = t.getZone()),
                (d =
                  t.options.color ||
                  (n && (n.color || t.nonZonedColor)) ||
                  this.color),
                n &&
                  ((c = n.borderColor || c),
                  (p = n.dashStyle || p),
                  (u = n.borderWidth || u))),
                e &&
                  t &&
                  ((h = (a = x(
                    i.states[e],
                    (t.options.states && t.options.states[e]) || {}
                  )).brightness),
                  (d =
                    a.color ||
                    (void 0 !== h && l(d).brighten(a.brightness).get()) ||
                    d),
                  (c = a[o] || c),
                  (u = a[r] || u),
                  (p = a.dashStyle || p),
                  (g = y(a.opacity, g)));
              let f = { fill: d, stroke: c, "stroke-width": u, opacity: g };
              return p && (f.dashstyle = p), f;
            }
            drawPoints(t = this.points) {
              let e;
              let i = this,
                s = this.chart,
                o = i.options,
                r = s.renderer,
                a = o.animationLimit || 250;
              t.forEach(function (t) {
                let n = t.plotY,
                  l = t.graphic,
                  h = !!l,
                  d = l && s.pointCount < a ? "animate" : "attr";
                m(n) && null !== t.y
                  ? ((e = t.shapeArgs),
                    l && t.hasNewShapeType() && (l = l.destroy()),
                    i.enabledDataSorting &&
                      (t.startXPos = i.xAxis.reversed
                        ? -((e && e.width) || 0)
                        : i.xAxis.width),
                    !l &&
                      ((t.graphic = l =
                        r[t.shapeType](e).add(t.group || i.group)),
                      l &&
                        i.enabledDataSorting &&
                        s.hasRendered &&
                        s.pointCount < a &&
                        (l.attr({ x: t.startXPos }),
                        (h = !0),
                        (d = "animate"))),
                    l && h && l[d](x(e)),
                    s.styledMode ||
                      l[d](i.pointAttribs(t, t.selected && "select")).shadow(
                        !1 !== t.allowShadow && o.shadow
                      ),
                    l &&
                      (l.addClass(t.getClassName(), !0),
                      l.attr({ visibility: t.visible ? "inherit" : "hidden" })))
                  : l && (t.graphic = l.destroy());
              });
            }
            drawTracker(t = this.points) {
              let e;
              let i = this,
                s = i.chart,
                o = s.pointer,
                r = function (t) {
                  let e = o?.getPointFromEvent(t);
                  o &&
                    e &&
                    i.options.enableMouseTracking &&
                    ((o.isDirectTouch = !0), e.onMouseOver(t));
                };
              t.forEach(function (t) {
                (e = f(t.dataLabels)
                  ? t.dataLabels
                  : t.dataLabel
                  ? [t.dataLabel]
                  : []),
                  t.graphic && (t.graphic.element.point = t),
                  e.forEach(function (e) {
                    (e.div || e.element).point = t;
                  });
              }),
                i._hasTracking ||
                  (i.trackerGroups.forEach(function (t) {
                    i[t] &&
                      (i[t]
                        .addClass("highcharts-tracker")
                        .on("mouseover", r)
                        .on("mouseout", function (t) {
                          o?.onTrackerMouseOut(t);
                        })
                        .on("touchstart", r),
                      !s.styledMode &&
                        i.options.cursor &&
                        i[t].css({ cursor: i.options.cursor }));
                  }),
                  (i._hasTracking = !0)),
                g(this, "afterDrawTracker");
            }
            remove() {
              let t = this,
                e = t.chart;
              e.hasRendered &&
                e.series.forEach(function (e) {
                  e.type === t.type && (e.isDirty = !0);
                }),
                o.prototype.remove.apply(t, arguments);
            }
          }
          return (
            (v.defaultOptions = x(o.defaultOptions, i)),
            u(v.prototype, {
              directTouch: !0,
              getSymbol: h,
              negStacks: !0,
              trackerGroups: ["group", "dataLabelsGroup"],
            }),
            r.registerSeriesType("column", v),
            v
          );
        }
      ),
      i(
        e,
        "Core/Series/DataLabel.js",
        [
          e["Core/Animation/AnimationUtilities.js"],
          e["Core/Templating.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i) {
          var s;
          let { getDeferredAnimation: o } = t,
            { format: r } = e,
            {
              defined: a,
              extend: n,
              fireEvent: l,
              isArray: h,
              isString: d,
              merge: c,
              objectEach: p,
              pick: u,
              pInt: g,
              splat: f,
            } = i;
          return (
            (function (t) {
              function e() {
                return v(this).some((t) => t?.enabled);
              }
              function i(t, e, i, s, o) {
                let { chart: r, enabledDataSorting: l } = this,
                  h = this.isCartesian && r.inverted,
                  d = t.plotX,
                  p = t.plotY,
                  g = i.rotation || 0,
                  f =
                    a(d) &&
                    a(p) &&
                    r.isInsidePlot(d, Math.round(p), {
                      inverted: h,
                      paneCoordinates: !0,
                      series: this,
                    }),
                  m =
                    0 === g &&
                    "justify" === u(i.overflow, l ? "none" : "justify"),
                  x =
                    this.visible &&
                    !1 !== t.visible &&
                    a(d) &&
                    (t.series.forceDL ||
                      (l && !m) ||
                      f ||
                      (u(i.inside, !!this.options.stacking) &&
                        s &&
                        r.isInsidePlot(d, h ? s.x + 1 : s.y + s.height - 1, {
                          inverted: h,
                          paneCoordinates: !0,
                          series: this,
                        }))),
                  y = t.pos();
                if (x && y) {
                  var b;
                  let a = e.getBBox(),
                    d = e.getBBox(void 0, 0),
                    p = { right: 1, center: 0.5 }[i.align || 0] || 0,
                    v = { bottom: 1, middle: 0.5 }[i.verticalAlign || 0] || 0;
                  if (
                    ((s = n(
                      { x: y[0], y: Math.round(y[1]), width: 0, height: 0 },
                      s || {}
                    )),
                    "plotEdges" === i.alignTo &&
                      this.isCartesian &&
                      ((s[h ? "x" : "y"] = 0),
                      (s[h ? "width" : "height"] = this.yAxis?.len || 0)),
                    n(i, { width: a.width, height: a.height }),
                    (b = s),
                    l &&
                      this.xAxis &&
                      !m &&
                      this.setDataLabelStartPos(t, e, o, f, b),
                    e.align(
                      c(i, { width: d.width, height: d.height }),
                      !1,
                      s,
                      !1
                    ),
                    (e.alignAttr.x += p * (d.width - a.width)),
                    (e.alignAttr.y += v * (d.height - a.height)),
                    e[e.placed ? "animate" : "attr"]({
                      x: e.alignAttr.x + (a.width - d.width) / 2,
                      y: e.alignAttr.y + (a.height - d.height) / 2,
                      rotationOriginX: (e.width || 0) / 2,
                      rotationOriginY: (e.height || 0) / 2,
                    }),
                    m && s.height >= 0)
                  )
                    this.justifyDataLabel(e, i, e.alignAttr, a, s, o);
                  else if (u(i.crop, !0)) {
                    let { x: t, y: i } = e.alignAttr;
                    x =
                      r.isInsidePlot(t, i, {
                        paneCoordinates: !0,
                        series: this,
                      }) &&
                      r.isInsidePlot(t + a.width - 1, i + a.height - 1, {
                        paneCoordinates: !0,
                        series: this,
                      });
                  }
                  i.shape &&
                    !g &&
                    e[o ? "attr" : "animate"]({ anchorX: y[0], anchorY: y[1] });
                }
                o && l && (e.placed = !1),
                  x || (l && !m)
                    ? (e.show(), (e.placed = !0))
                    : (e.hide(), (e.placed = !1));
              }
              function s() {
                return this.plotGroup(
                  "dataLabelsGroup",
                  "data-labels",
                  this.hasRendered ? "inherit" : "hidden",
                  this.options.dataLabels.zIndex || 6
                );
              }
              function m(t) {
                let e = this.hasRendered || 0,
                  i = this.initDataLabelsGroup().attr({ opacity: +e });
                return (
                  !e &&
                    i &&
                    (this.visible && i.show(),
                    this.options.animation
                      ? i.animate({ opacity: 1 }, t)
                      : i.attr({ opacity: 1 })),
                  i
                );
              }
              function x(t) {
                let e;
                t = t || this.points;
                let i = this,
                  s = i.chart,
                  n = i.options,
                  h = s.renderer,
                  { backgroundColor: c, plotBackgroundColor: m } =
                    s.options.chart,
                  x = h.getContrast((d(m) && m) || (d(c) && c) || "#000000"),
                  y = v(i),
                  { animation: S, defer: k } = y[0],
                  M = k ? o(s, S, i) : { defer: 0, duration: 0 };
                l(this, "drawDataLabels"),
                  i.hasDataLabels?.() &&
                    ((e = this.initDataLabels(M)),
                    t.forEach((t) => {
                      let o = t.dataLabels || [];
                      f(b(y, t.dlOptions || t.options?.dataLabels)).forEach(
                        (c, f) => {
                          let m =
                              c.enabled &&
                              (t.visible || t.dataLabelOnHidden) &&
                              (!t.isNull || t.dataLabelOnNull) &&
                              (function (t, e) {
                                let i = e.filter;
                                if (i) {
                                  let e = i.operator,
                                    s = t[i.property],
                                    o = i.value;
                                  return (
                                    (">" === e && s > o) ||
                                    ("<" === e && s < o) ||
                                    (">=" === e && s >= o) ||
                                    ("<=" === e && s <= o) ||
                                    ("==" === e && s == o) ||
                                    ("===" === e && s === o) ||
                                    ("!=" === e && s != o) ||
                                    ("!==" === e && s !== o)
                                  );
                                }
                                return !0;
                              })(t, c),
                            {
                              backgroundColor: y,
                              borderColor: b,
                              distance: v,
                              style: S = {},
                            } = c,
                            k,
                            M,
                            C,
                            A,
                            w = {},
                            T = o[f],
                            P = !T,
                            O;
                          m &&
                            ((M = u(c[t.formatPrefix + "Format"], c.format)),
                            (k = t.getLabelConfig()),
                            (C = a(M)
                              ? r(M, k, s)
                              : (
                                  c[t.formatPrefix + "Formatter"] || c.formatter
                                ).call(k, c)),
                            (A = c.rotation),
                            !s.styledMode &&
                              ((S.color = u(
                                c.color,
                                S.color,
                                d(i.color) ? i.color : void 0,
                                "#000000"
                              )),
                              "contrast" === S.color
                                ? ("none" !== y && (O = y),
                                  (t.contrastColor = h.getContrast(
                                    ("auto" !== O && O) || t.color || i.color
                                  )),
                                  (S.color =
                                    O ||
                                    (!a(v) && c.inside) ||
                                    0 > g(v || 0) ||
                                    n.stacking
                                      ? t.contrastColor
                                      : x))
                                : delete t.contrastColor,
                              n.cursor && (S.cursor = n.cursor)),
                            (w = {
                              r: c.borderRadius || 0,
                              rotation: A,
                              padding: c.padding,
                              zIndex: 1,
                            }),
                            s.styledMode ||
                              ((w.fill = "auto" === y ? t.color : y),
                              (w.stroke = "auto" === b ? t.color : b),
                              (w["stroke-width"] = c.borderWidth)),
                            p(w, (t, e) => {
                              void 0 === t && delete w[e];
                            })),
                            !T ||
                              (m &&
                                a(C) &&
                                !!T.div == !!c.useHTML &&
                                ((T.rotation && c.rotation) ||
                                  T.rotation === c.rotation)) ||
                              ((T = void 0), (P = !0)),
                            m &&
                              a(C) &&
                              (T
                                ? (w.text = C)
                                : (T = h.label(
                                    C,
                                    0,
                                    0,
                                    c.shape,
                                    void 0,
                                    void 0,
                                    c.useHTML,
                                    void 0,
                                    "data-label"
                                  )).addClass(
                                    " highcharts-data-label-color-" +
                                      t.colorIndex +
                                      " " +
                                      (c.className || "") +
                                      (c.useHTML ? " highcharts-tracker" : "")
                                  ),
                              T &&
                                ((T.options = c),
                                T.attr(w),
                                s.styledMode || T.css(S).shadow(c.shadow),
                                l(T, "beforeAddingDataLabel", {
                                  labelOptions: c,
                                  point: t,
                                }),
                                T.added || T.add(e),
                                i.alignDataLabel(t, T, c, void 0, P),
                                (T.isActive = !0),
                                o[f] && o[f] !== T && o[f].destroy(),
                                (o[f] = T)));
                        }
                      );
                      let c = o.length;
                      for (; c--; )
                        o[c] && o[c].isActive
                          ? (o[c].isActive = !1)
                          : (o[c]?.destroy(), o.splice(c, 1));
                      (t.dataLabel = o[0]), (t.dataLabels = o);
                    })),
                  l(this, "afterDrawDataLabels");
              }
              function y(t, e, i, s, o, r) {
                let a = this.chart,
                  n = e.align,
                  l = e.verticalAlign,
                  h = t.box ? 0 : t.padding || 0,
                  d = a.inverted ? this.yAxis : this.xAxis,
                  c = d ? d.left - a.plotLeft : 0,
                  p = a.inverted ? this.xAxis : this.yAxis,
                  u = p ? p.top - a.plotTop : 0,
                  { x: g = 0, y: f = 0 } = e,
                  m,
                  x;
                return (
                  (m = (i.x || 0) + h + c) < 0 &&
                    ("right" === n && g >= 0
                      ? ((e.align = "left"), (e.inside = !0))
                      : (g -= m),
                    (x = !0)),
                  (m = (i.x || 0) + s.width - h + c) > a.plotWidth &&
                    ("left" === n && g <= 0
                      ? ((e.align = "right"), (e.inside = !0))
                      : (g += a.plotWidth - m),
                    (x = !0)),
                  (m = i.y + h + u) < 0 &&
                    ("bottom" === l && f >= 0
                      ? ((e.verticalAlign = "top"), (e.inside = !0))
                      : (f -= m),
                    (x = !0)),
                  (m = (i.y || 0) + s.height - h + u) > a.plotHeight &&
                    ("top" === l && f <= 0
                      ? ((e.verticalAlign = "bottom"), (e.inside = !0))
                      : (f += a.plotHeight - m),
                    (x = !0)),
                  x &&
                    ((e.x = g),
                    (e.y = f),
                    (t.placed = !r),
                    t.align(e, void 0, o)),
                  x
                );
              }
              function b(t, e) {
                let i = [],
                  s;
                if (h(t) && !h(e))
                  i = t.map(function (t) {
                    return c(t, e);
                  });
                else if (h(e) && !h(t))
                  i = e.map(function (e) {
                    return c(t, e);
                  });
                else if (h(t) || h(e)) {
                  if (h(t) && h(e))
                    for (s = Math.max(t.length, e.length); s--; )
                      i[s] = c(t[s], e[s]);
                } else i = c(t, e);
                return i;
              }
              function v(t) {
                let e = t.chart.options.plotOptions;
                return f(
                  b(
                    b(e?.series?.dataLabels, e?.[t.type]?.dataLabels),
                    t.options.dataLabels
                  )
                );
              }
              function S(t, e, i, s, o) {
                let r = this.chart,
                  a = r.inverted,
                  n = this.xAxis,
                  l = n.reversed,
                  h = ((a ? e.height : e.width) || 0) / 2,
                  d = t.pointWidth,
                  c = d ? d / 2 : 0;
                (e.startXPos = a ? o.x : l ? -h - c : n.width - h + c),
                  (e.startYPos = a
                    ? l
                      ? this.yAxis.height - h + c
                      : -h - c
                    : o.y),
                  s
                    ? "hidden" === e.visibility &&
                      (e.show(), e.attr({ opacity: 0 }).animate({ opacity: 1 }))
                    : e
                        .attr({ opacity: 1 })
                        .animate({ opacity: 0 }, void 0, e.hide),
                  r.hasRendered &&
                    (i && e.attr({ x: e.startXPos, y: e.startYPos }),
                    (e.placed = !0));
              }
              t.compose = function (t) {
                let o = t.prototype;
                o.initDataLabels ||
                  ((o.initDataLabels = m),
                  (o.initDataLabelsGroup = s),
                  (o.alignDataLabel = i),
                  (o.drawDataLabels = x),
                  (o.justifyDataLabel = y),
                  (o.setDataLabelStartPos = S),
                  (o.hasDataLabels = e));
              };
            })(s || (s = {})),
            s
          );
        }
      ),
      i(
        e,
        "Series/Column/ColumnDataLabel.js",
        [
          e["Core/Series/DataLabel.js"],
          e["Core/Globals.js"],
          e["Core/Series/SeriesRegistry.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s) {
          var o;
          let { composed: r } = e,
            { series: a } = i,
            { merge: n, pick: l, pushUnique: h } = s;
          return (
            (function (e) {
              function i(t, e, i, s, o) {
                let r = this.chart.inverted,
                  h = t.series,
                  d = (h.xAxis ? h.xAxis.len : this.chart.plotSizeX) || 0,
                  c = (h.yAxis ? h.yAxis.len : this.chart.plotSizeY) || 0,
                  p = t.dlBox || t.shapeArgs,
                  u = l(t.below, t.plotY > l(this.translatedThreshold, c)),
                  g = l(i.inside, !!this.options.stacking);
                if (p) {
                  if (
                    ((s = n(p)), !("allow" === i.overflow && !1 === i.crop))
                  ) {
                    s.y < 0 && ((s.height += s.y), (s.y = 0));
                    let t = s.y + s.height - c;
                    t > 0 && t < s.height - 1 && (s.height -= t);
                  }
                  r &&
                    (s = {
                      x: c - s.y - s.height,
                      y: d - s.x - s.width,
                      width: s.height,
                      height: s.width,
                    }),
                    g ||
                      (r
                        ? ((s.x += u ? 0 : s.width), (s.width = 0))
                        : ((s.y += u ? s.height : 0), (s.height = 0)));
                }
                (i.align = l(
                  i.align,
                  !r || g ? "center" : u ? "right" : "left"
                )),
                  (i.verticalAlign = l(
                    i.verticalAlign,
                    r || g ? "middle" : u ? "top" : "bottom"
                  )),
                  a.prototype.alignDataLabel.call(this, t, e, i, s, o),
                  i.inside &&
                    t.contrastColor &&
                    e.css({ color: t.contrastColor });
              }
              e.compose = function (e) {
                t.compose(a),
                  h(r, "ColumnDataLabel") && (e.prototype.alignDataLabel = i);
              };
            })(o || (o = {})),
            o
          );
        }
      ),
      i(
        e,
        "Series/Bar/BarSeries.js",
        [
          e["Series/Column/ColumnSeries.js"],
          e["Core/Series/SeriesRegistry.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i) {
          let { extend: s, merge: o } = i;
          class r extends t {}
          return (
            (r.defaultOptions = o(t.defaultOptions, {})),
            s(r.prototype, { inverted: !0 }),
            e.registerSeriesType("bar", r),
            r
          );
        }
      ),
      i(e, "Series/Scatter/ScatterSeriesDefaults.js", [], function () {
        return {
          lineWidth: 0,
          findNearestPointBy: "xy",
          jitter: { x: 0, y: 0 },
          marker: { enabled: !0 },
          tooltip: {
            headerFormat:
              '<span style="color:{point.color}">●</span> <span style="font-size: 0.8em"> {series.name}</span><br/>',
            pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>",
          },
        };
      }),
      i(
        e,
        "Series/Scatter/ScatterSeries.js",
        [
          e["Series/Scatter/ScatterSeriesDefaults.js"],
          e["Core/Series/SeriesRegistry.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i) {
          let { column: s, line: o } = e.seriesTypes,
            { addEvent: r, extend: a, merge: n } = i;
          class l extends o {
            applyJitter() {
              let t = this,
                e = this.options.jitter,
                i = this.points.length;
              e &&
                this.points.forEach(function (s, o) {
                  ["x", "y"].forEach(function (r, a) {
                    if (e[r] && !s.isNull) {
                      let n = `plot${r.toUpperCase()}`,
                        l = t[`${r}Axis`],
                        h = e[r] * l.transA;
                      if (l && !l.logarithmic) {
                        let t = Math.max(0, (s[n] || 0) - h),
                          e = Math.min(l.len, (s[n] || 0) + h);
                        (s[n] =
                          t +
                          (e - t) *
                            (function (t) {
                              let e = 1e4 * Math.sin(t);
                              return e - Math.floor(e);
                            })(o + a * i)),
                          "x" === r && (s.clientX = s.plotX);
                      }
                    }
                  });
                });
            }
            drawGraph() {
              this.options.lineWidth
                ? super.drawGraph()
                : this.graph && (this.graph = this.graph.destroy());
            }
          }
          return (
            (l.defaultOptions = n(o.defaultOptions, t)),
            a(l.prototype, {
              drawTracker: s.prototype.drawTracker,
              sorted: !1,
              requireSorting: !1,
              noSharedTooltip: !0,
              trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            }),
            r(l, "afterTranslate", function () {
              this.applyJitter();
            }),
            e.registerSeriesType("scatter", l),
            l
          );
        }
      ),
      i(
        e,
        "Series/CenteredUtilities.js",
        [
          e["Core/Globals.js"],
          e["Core/Series/Series.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i) {
          var s, o;
          let { deg2rad: r } = t,
            { fireEvent: a, isNumber: n, pick: l, relativeLength: h } = i;
          return (
            ((o = s || (s = {})).getCenter = function () {
              let t = this.options,
                i = this.chart,
                s = 2 * (t.slicedOffset || 0),
                o = i.plotWidth - 2 * s,
                r = i.plotHeight - 2 * s,
                d = t.center,
                c = Math.min(o, r),
                p = t.thickness,
                u,
                g = t.size,
                f = t.innerSize || 0,
                m,
                x;
              "string" == typeof g && (g = parseFloat(g)),
                "string" == typeof f && (f = parseFloat(f));
              let y = [
                l(d[0], "50%"),
                l(d[1], "50%"),
                l(g && g < 0 ? void 0 : t.size, "100%"),
                l(f && f < 0 ? void 0 : t.innerSize || 0, "0%"),
              ];
              for (
                !i.angular || this instanceof e || (y[3] = 0), m = 0;
                m < 4;
                ++m
              )
                (x = y[m]),
                  (u = m < 2 || (2 === m && /%$/.test(x))),
                  (y[m] = h(x, [o, r, c, y[2]][m]) + (u ? s : 0));
              return (
                y[3] > y[2] && (y[3] = y[2]),
                n(p) && 2 * p < y[2] && p > 0 && (y[3] = y[2] - 2 * p),
                a(this, "afterGetCenter", { positions: y }),
                y
              );
            }),
            (o.getStartAndEndRadians = function (t, e) {
              let i = n(t) ? t : 0,
                s = n(e) && e > i && e - i < 360 ? e : i + 360;
              return { start: r * (i + -90), end: r * (s + -90) };
            }),
            s
          );
        }
      ),
      i(
        e,
        "Series/Pie/PiePoint.js",
        [
          e["Core/Animation/AnimationUtilities.js"],
          e["Core/Series/Point.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i) {
          let { setAnimation: s } = t,
            {
              addEvent: o,
              defined: r,
              extend: a,
              isNumber: n,
              pick: l,
              relativeLength: h,
            } = i;
          class d extends e {
            getConnectorPath(t) {
              let e = t.dataLabelPosition,
                i = t.options || {},
                s = i.connectorShape,
                o = this.connectorShapes[s] || s;
              return (
                (e &&
                  o.call(
                    this,
                    { ...e.computed, alignment: e.alignment },
                    e.connectorPosition,
                    i
                  )) ||
                []
              );
            }
            getTranslate() {
              return (
                (this.sliced && this.slicedTranslation) || {
                  translateX: 0,
                  translateY: 0,
                }
              );
            }
            haloPath(t) {
              let e = this.shapeArgs;
              return this.sliced || !this.visible
                ? []
                : this.series.chart.renderer.symbols.arc(
                    e.x,
                    e.y,
                    e.r + t,
                    e.r + t,
                    {
                      innerR: e.r - 1,
                      start: e.start,
                      end: e.end,
                      borderRadius: e.borderRadius,
                    }
                  );
            }
            constructor(t, e, i) {
              super(t, e, i),
                (this.half = 0),
                this.name ?? (this.name = "Slice");
              let s = (t) => {
                this.slice("select" === t.type);
              };
              o(this, "select", s), o(this, "unselect", s);
            }
            isValid() {
              return n(this.y) && this.y >= 0;
            }
            setVisible(t, e = !0) {
              t !== this.visible &&
                this.update({ visible: t ?? !this.visible }, e, void 0, !1);
            }
            slice(t, e, i) {
              let o = this.series;
              s(i, o.chart),
                (e = l(e, !0)),
                (this.sliced =
                  this.options.sliced =
                  t =
                    r(t) ? t : !this.sliced),
                (o.options.data[o.data.indexOf(this)] = this.options),
                this.graphic && this.graphic.animate(this.getTranslate());
            }
          }
          return (
            a(d.prototype, {
              connectorShapes: {
                fixedOffset: function (t, e, i) {
                  let s = e.breakAt,
                    o = e.touchingSliceAt,
                    r = i.softConnector
                      ? [
                          "C",
                          t.x + ("left" === t.alignment ? -5 : 5),
                          t.y,
                          2 * s.x - o.x,
                          2 * s.y - o.y,
                          s.x,
                          s.y,
                        ]
                      : ["L", s.x, s.y];
                  return [["M", t.x, t.y], r, ["L", o.x, o.y]];
                },
                straight: function (t, e) {
                  let i = e.touchingSliceAt;
                  return [
                    ["M", t.x, t.y],
                    ["L", i.x, i.y],
                  ];
                },
                crookedLine: function (t, e, i) {
                  let { breakAt: s, touchingSliceAt: o } = e,
                    { series: r } = this,
                    [a, n, l] = r.center,
                    d = l / 2,
                    { plotLeft: c, plotWidth: p } = r.chart,
                    u = "left" === t.alignment,
                    { x: g, y: f } = t,
                    m = s.x;
                  if (i.crookDistance) {
                    let t = h(i.crookDistance, 1);
                    m = u ? a + d + (p + c - a - d) * (1 - t) : c + (a - d) * t;
                  } else
                    m = a + (n - f) * Math.tan((this.angle || 0) - Math.PI / 2);
                  let x = [["M", g, f]];
                  return (
                    (u ? m <= g && m >= s.x : m >= g && m <= s.x) &&
                      x.push(["L", m, f]),
                    x.push(["L", s.x, s.y], ["L", o.x, o.y]),
                    x
                  );
                },
              },
            }),
            d
          );
        }
      ),
      i(e, "Series/Pie/PieSeriesDefaults.js", [], function () {
        return {
          borderRadius: 3,
          center: [null, null],
          clip: !1,
          colorByPoint: !0,
          dataLabels: {
            connectorPadding: 5,
            connectorShape: "crookedLine",
            crookDistance: void 0,
            distance: 30,
            enabled: !0,
            formatter: function () {
              return this.point.isNull ? void 0 : this.point.name;
            },
            softConnector: !0,
            x: 0,
          },
          fillColor: void 0,
          ignoreHiddenPoint: !0,
          inactiveOtherPoints: !0,
          legendType: "point",
          marker: null,
          size: null,
          showInLegend: !1,
          slicedOffset: 10,
          stickyTracking: !1,
          tooltip: { followPointer: !0 },
          borderColor: "#ffffff",
          borderWidth: 1,
          lineWidth: void 0,
          states: { hover: { brightness: 0.1 } },
        };
      }),
      i(
        e,
        "Series/Pie/PieSeries.js",
        [
          e["Series/CenteredUtilities.js"],
          e["Series/Column/ColumnSeries.js"],
          e["Core/Globals.js"],
          e["Series/Pie/PiePoint.js"],
          e["Series/Pie/PieSeriesDefaults.js"],
          e["Core/Series/Series.js"],
          e["Core/Series/SeriesRegistry.js"],
          e["Core/Renderer/SVG/Symbols.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s, o, r, a, n, l) {
          let { getStartAndEndRadians: h } = t,
            { noop: d } = i,
            { clamp: c, extend: p, fireEvent: u, merge: g, pick: f } = l;
          class m extends r {
            animate(t) {
              let e = this,
                i = e.points,
                s = e.startAngleRad;
              t ||
                i.forEach(function (t) {
                  let i = t.graphic,
                    o = t.shapeArgs;
                  i &&
                    o &&
                    (i.attr({
                      r: f(t.startR, e.center && e.center[3] / 2),
                      start: s,
                      end: s,
                    }),
                    i.animate(
                      { r: o.r, start: o.start, end: o.end },
                      e.options.animation
                    ));
                });
            }
            drawEmpty() {
              let t, e;
              let i = this.startAngleRad,
                s = this.endAngleRad,
                o = this.options;
              0 === this.total && this.center
                ? ((t = this.center[0]),
                  (e = this.center[1]),
                  this.graph ||
                    (this.graph = this.chart.renderer
                      .arc(t, e, this.center[1] / 2, 0, i, s)
                      .addClass("highcharts-empty-series")
                      .add(this.group)),
                  this.graph.attr({
                    d: n.arc(t, e, this.center[2] / 2, 0, {
                      start: i,
                      end: s,
                      innerR: this.center[3] / 2,
                    }),
                  }),
                  this.chart.styledMode ||
                    this.graph.attr({
                      "stroke-width": o.borderWidth,
                      fill: o.fillColor || "none",
                      stroke: o.color || "#cccccc",
                    }))
                : this.graph && (this.graph = this.graph.destroy());
            }
            drawPoints() {
              let t = this.chart.renderer;
              this.points.forEach(function (e) {
                e.graphic &&
                  e.hasNewShapeType() &&
                  (e.graphic = e.graphic.destroy()),
                  e.graphic ||
                    ((e.graphic = t[e.shapeType](e.shapeArgs).add(
                      e.series.group
                    )),
                    (e.delayedRendering = !0));
              });
            }
            generatePoints() {
              super.generatePoints(), this.updateTotals();
            }
            getX(t, e, i, s) {
              let o = this.center,
                r = this.radii ? this.radii[i.index] || 0 : o[2] / 2,
                a = s.dataLabelPosition,
                n = a?.distance || 0,
                l = Math.asin(c((t - o[1]) / (r + n), -1, 1));
              return (
                o[0] +
                Math.cos(l) * (r + n) * (e ? -1 : 1) +
                (n > 0 ? (e ? -1 : 1) * (s.padding || 0) : 0)
              );
            }
            hasData() {
              return !!this.processedXData.length;
            }
            redrawPoints() {
              let t, e, i, s;
              let o = this,
                r = o.chart;
              this.drawEmpty(),
                o.group && !r.styledMode && o.group.shadow(o.options.shadow),
                o.points.forEach(function (a) {
                  let n = {};
                  (e = a.graphic),
                    !a.isNull && e
                      ? ((s = a.shapeArgs),
                        (t = a.getTranslate()),
                        r.styledMode ||
                          (i = o.pointAttribs(a, a.selected && "select")),
                        a.delayedRendering
                          ? (e.setRadialReference(o.center).attr(s).attr(t),
                            r.styledMode ||
                              e.attr(i).attr({ "stroke-linejoin": "round" }),
                            (a.delayedRendering = !1))
                          : (e.setRadialReference(o.center),
                            r.styledMode || g(!0, n, i),
                            g(!0, n, s, t),
                            e.animate(n)),
                        e.attr({
                          visibility: a.visible ? "inherit" : "hidden",
                        }),
                        e.addClass(a.getClassName(), !0))
                      : e && (a.graphic = e.destroy());
                });
            }
            sortByAngle(t, e) {
              t.sort(function (t, i) {
                return void 0 !== t.angle && (i.angle - t.angle) * e;
              });
            }
            translate(t) {
              u(this, "translate"), this.generatePoints();
              let e = this.options,
                i = e.slicedOffset,
                s = h(e.startAngle, e.endAngle),
                o = (this.startAngleRad = s.start),
                r = (this.endAngleRad = s.end) - o,
                a = this.points,
                n = e.ignoreHiddenPoint,
                l = a.length,
                d,
                c,
                p,
                g,
                f,
                m,
                x,
                y = 0;
              for (
                t || (this.center = t = this.getCenter()), m = 0;
                m < l;
                m++
              ) {
                (x = a[m]),
                  (d = o + y * r),
                  x.isValid() && (!n || x.visible) && (y += x.percentage / 100),
                  (c = o + y * r);
                let e = {
                  x: t[0],
                  y: t[1],
                  r: t[2] / 2,
                  innerR: t[3] / 2,
                  start: Math.round(1e3 * d) / 1e3,
                  end: Math.round(1e3 * c) / 1e3,
                };
                (x.shapeType = "arc"),
                  (x.shapeArgs = e),
                  (p = (c + d) / 2) > 1.5 * Math.PI
                    ? (p -= 2 * Math.PI)
                    : p < -Math.PI / 2 && (p += 2 * Math.PI),
                  (x.slicedTranslation = {
                    translateX: Math.round(Math.cos(p) * i),
                    translateY: Math.round(Math.sin(p) * i),
                  }),
                  (g = (Math.cos(p) * t[2]) / 2),
                  (f = (Math.sin(p) * t[2]) / 2),
                  (x.tooltipPos = [t[0] + 0.7 * g, t[1] + 0.7 * f]),
                  (x.half = p < -Math.PI / 2 || p > Math.PI / 2 ? 1 : 0),
                  (x.angle = p);
              }
              u(this, "afterTranslate");
            }
            updateTotals() {
              let t = this.points,
                e = t.length,
                i = this.options.ignoreHiddenPoint,
                s,
                o,
                r = 0;
              for (s = 0; s < e; s++)
                (o = t[s]).isValid() && (!i || o.visible) && (r += o.y);
              for (s = 0, this.total = r; s < e; s++)
                ((o = t[s]).percentage =
                  r > 0 && (o.visible || !i) ? (o.y / r) * 100 : 0),
                  (o.total = r);
            }
          }
          return (
            (m.defaultOptions = g(r.defaultOptions, o)),
            p(m.prototype, {
              axisTypes: [],
              directTouch: !0,
              drawGraph: void 0,
              drawTracker: e.prototype.drawTracker,
              getCenter: t.getCenter,
              getSymbol: d,
              invertible: !1,
              isCartesian: !1,
              noSharedTooltip: !0,
              pointAttribs: e.prototype.pointAttribs,
              pointClass: s,
              requireSorting: !1,
              searchPoint: d,
              trackerGroups: ["group", "dataLabelsGroup"],
            }),
            a.registerSeriesType("pie", m),
            m
          );
        }
      ),
      i(
        e,
        "Series/Pie/PieDataLabel.js",
        [
          e["Core/Series/DataLabel.js"],
          e["Core/Globals.js"],
          e["Core/Renderer/RendererUtilities.js"],
          e["Core/Series/SeriesRegistry.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s, o) {
          var r;
          let { composed: a, noop: n } = e,
            { distribute: l } = i,
            { series: h } = s,
            {
              arrayMax: d,
              clamp: c,
              defined: p,
              pick: u,
              pushUnique: g,
              relativeLength: f,
            } = o;
          return (
            (function (e) {
              let i = {
                radialDistributionY: function (t, e) {
                  return (e.dataLabelPosition?.top || 0) + t.distributeBox.pos;
                },
                radialDistributionX: function (t, e, i, s, o) {
                  let r = o.dataLabelPosition;
                  return t.getX(
                    i < (r?.top || 0) + 2 || i > (r?.bottom || 0) - 2 ? s : i,
                    e.half,
                    e,
                    o
                  );
                },
                justify: function (t, e, i, s) {
                  return (
                    s[0] +
                    (t.half ? -1 : 1) *
                      (i + (e.dataLabelPosition?.distance || 0))
                  );
                },
                alignToPlotEdges: function (t, e, i, s) {
                  let o = t.getBBox().width;
                  return e ? o + s : i - o - s;
                },
                alignToConnectors: function (t, e, i, s) {
                  let o = 0,
                    r;
                  return (
                    t.forEach(function (t) {
                      (r = t.dataLabel.getBBox().width) > o && (o = r);
                    }),
                    e ? o + s : i - o - s
                  );
                },
              };
              function s(t, e) {
                let { center: i, options: s } = this,
                  o = i[2] / 2,
                  r = t.angle || 0,
                  a = Math.cos(r),
                  n = Math.sin(r),
                  l = i[0] + a * o,
                  h = i[1] + n * o,
                  d = Math.min(
                    (s.slicedOffset || 0) + (s.borderWidth || 0),
                    e / 5
                  );
                return {
                  natural: { x: l + a * e, y: h + n * e },
                  computed: {},
                  alignment: e < 0 ? "center" : t.half ? "right" : "left",
                  connectorPosition: {
                    breakAt: { x: l + a * d, y: h + n * d },
                    touchingSliceAt: { x: l, y: h },
                  },
                  distance: e,
                };
              }
              function o() {
                let t = this,
                  e = t.points,
                  i = t.chart,
                  s = i.plotWidth,
                  o = i.plotHeight,
                  r = i.plotLeft,
                  a = Math.round(i.chartWidth / 3),
                  n = t.center,
                  c = n[2] / 2,
                  g = n[1],
                  m = [[], []],
                  x = [0, 0, 0, 0],
                  y = t.dataLabelPositioners,
                  b,
                  v,
                  S,
                  k = 0;
                t.visible &&
                  t.hasDataLabels?.() &&
                  (e.forEach((t) => {
                    (t.dataLabels || []).forEach((t) => {
                      t.shortened &&
                        (t
                          .attr({ width: "auto" })
                          .css({ width: "auto", textOverflow: "clip" }),
                        (t.shortened = !1));
                    });
                  }),
                  h.prototype.drawDataLabels.apply(t),
                  e.forEach((t) => {
                    (t.dataLabels || []).forEach((e, i) => {
                      let s = n[2] / 2,
                        o = e.options,
                        r = f(o?.distance || 0, s);
                      0 === i && m[t.half].push(t),
                        !p(o?.style?.width) &&
                          e.getBBox().width > a &&
                          (e.css({ width: Math.round(0.7 * a) + "px" }),
                          (e.shortened = !0)),
                        (e.dataLabelPosition = this.getDataLabelPosition(t, r)),
                        (k = Math.max(k, r));
                    });
                  }),
                  m.forEach((e, a) => {
                    let h = e.length,
                      d = [],
                      f,
                      m,
                      b = 0,
                      M;
                    h &&
                      (t.sortByAngle(e, a - 0.5),
                      k > 0 &&
                        ((f = Math.max(0, g - c - k)),
                        (m = Math.min(g + c + k, i.plotHeight)),
                        e.forEach((t) => {
                          (t.dataLabels || []).forEach((e) => {
                            let s = e.dataLabelPosition;
                            s &&
                              s.distance > 0 &&
                              ((s.top = Math.max(0, g - c - s.distance)),
                              (s.bottom = Math.min(
                                g + c + s.distance,
                                i.plotHeight
                              )),
                              (b = e.getBBox().height || 21),
                              (e.lineHeight =
                                i.renderer.fontMetrics(e.text || e).h +
                                2 * e.padding),
                              (t.distributeBox = {
                                target:
                                  (e.dataLabelPosition?.natural.y || 0) -
                                  s.top +
                                  e.lineHeight / 2,
                                size: b,
                                rank: t.y,
                              }),
                              d.push(t.distributeBox));
                          });
                        }),
                        l(d, (M = m + b - f), M / 5)),
                      e.forEach((i) => {
                        (i.dataLabels || []).forEach((l) => {
                          let h = l.options || {},
                            g = i.distributeBox,
                            f = l.dataLabelPosition,
                            m = f?.natural.y || 0,
                            b = h.connectorPadding || 0,
                            k = l.lineHeight || 21,
                            M = (k - l.getBBox().height) / 2,
                            C = 0,
                            A = m,
                            w = "inherit";
                          if (f) {
                            if (
                              (d &&
                                p(g) &&
                                f.distance > 0 &&
                                (void 0 === g.pos
                                  ? (w = "hidden")
                                  : ((S = g.size),
                                    (A = y.radialDistributionY(i, l)))),
                              h.justify)
                            )
                              C = y.justify(i, l, c, n);
                            else
                              switch (h.alignTo) {
                                case "connectors":
                                  C = y.alignToConnectors(e, a, s, r);
                                  break;
                                case "plotEdges":
                                  C = y.alignToPlotEdges(l, a, s, r);
                                  break;
                                default:
                                  C = y.radialDistributionX(t, i, A - M, m, l);
                              }
                            if (
                              ((f.attribs = {
                                visibility: w,
                                align: f.alignment,
                              }),
                              (f.posAttribs = {
                                x:
                                  C +
                                  (h.x || 0) +
                                  ({ left: b, right: -b }[f.alignment] || 0),
                                y: A + (h.y || 0) - k / 2,
                              }),
                              (f.computed.x = C),
                              (f.computed.y = A - M),
                              u(h.crop, !0))
                            ) {
                              let t;
                              C - (v = l.getBBox().width) < b && 1 === a
                                ? ((t = Math.round(v - C + b)),
                                  (x[3] = Math.max(t, x[3])))
                                : C + v > s - b &&
                                  0 === a &&
                                  ((t = Math.round(C + v - s + b)),
                                  (x[1] = Math.max(t, x[1]))),
                                A - S / 2 < 0
                                  ? (x[0] = Math.max(
                                      Math.round(-A + S / 2),
                                      x[0]
                                    ))
                                  : A + S / 2 > o &&
                                    (x[2] = Math.max(
                                      Math.round(A + S / 2 - o),
                                      x[2]
                                    )),
                                (f.sideOverflow = t);
                            }
                          }
                        });
                      }));
                  }),
                  (0 === d(x) || this.verifyDataLabelOverflow(x)) &&
                    (this.placeDataLabels(),
                    this.points.forEach((e) => {
                      (e.dataLabels || []).forEach((s) => {
                        let { connectorColor: o, connectorWidth: r = 1 } =
                            s.options || {},
                          a = s.dataLabelPosition;
                        if (r) {
                          let n;
                          (b = s.connector),
                            a && a.distance > 0
                              ? ((n = !b),
                                b ||
                                  (s.connector = b =
                                    i.renderer
                                      .path()
                                      .addClass(
                                        "highcharts-data-label-connector  highcharts-color-" +
                                          e.colorIndex +
                                          (e.className ? " " + e.className : "")
                                      )
                                      .add(t.dataLabelsGroup)),
                                i.styledMode ||
                                  b.attr({
                                    "stroke-width": r,
                                    stroke: o || e.color || "#666666",
                                  }),
                                b[n ? "attr" : "animate"]({
                                  d: e.getConnectorPath(s),
                                }),
                                b.attr({ visibility: a.attribs?.visibility }))
                              : b && (s.connector = b.destroy());
                        }
                      });
                    })));
              }
              function r() {
                this.points.forEach((t) => {
                  (t.dataLabels || []).forEach((t) => {
                    let e = t.dataLabelPosition;
                    e
                      ? (e.sideOverflow &&
                          (t.css({
                            width:
                              Math.max(t.getBBox().width - e.sideOverflow, 0) +
                              "px",
                            textOverflow:
                              (t.options?.style || {}).textOverflow ||
                              "ellipsis",
                          }),
                          (t.shortened = !0)),
                        t.attr(e.attribs),
                        t[t.moved ? "animate" : "attr"](e.posAttribs),
                        (t.moved = !0))
                      : t && t.attr({ y: -9999 });
                  }),
                    delete t.distributeBox;
                }, this);
              }
              function m(t) {
                let e = this.center,
                  i = this.options,
                  s = i.center,
                  o = i.minSize || 80,
                  r = o,
                  a = null !== i.size;
                return (
                  !a &&
                    (null !== s[0]
                      ? (r = Math.max(e[2] - Math.max(t[1], t[3]), o))
                      : ((r = Math.max(e[2] - t[1] - t[3], o)),
                        (e[0] += (t[3] - t[1]) / 2)),
                    null !== s[1]
                      ? (r = c(r, o, e[2] - Math.max(t[0], t[2])))
                      : ((r = c(r, o, e[2] - t[0] - t[2])),
                        (e[1] += (t[0] - t[2]) / 2)),
                    r < e[2]
                      ? ((e[2] = r),
                        (e[3] = Math.min(
                          i.thickness
                            ? Math.max(0, r - 2 * i.thickness)
                            : Math.max(0, f(i.innerSize || 0, r)),
                          r
                        )),
                        this.translate(e),
                        this.drawDataLabels && this.drawDataLabels())
                      : (a = !0)),
                  a
                );
              }
              e.compose = function (e) {
                if ((t.compose(h), g(a, "PieDataLabel"))) {
                  let t = e.prototype;
                  (t.dataLabelPositioners = i),
                    (t.alignDataLabel = n),
                    (t.drawDataLabels = o),
                    (t.getDataLabelPosition = s),
                    (t.placeDataLabels = r),
                    (t.verifyDataLabelOverflow = m);
                }
              };
            })(r || (r = {})),
            r
          );
        }
      ),
      i(e, "Core/Geometry/GeometryUtilities.js", [], function () {
        var t, e;
        return (
          ((e = t || (t = {})).getCenterOfPoints = function (t) {
            let e = t.reduce((t, e) => ((t.x += e.x), (t.y += e.y), t), {
              x: 0,
              y: 0,
            });
            return { x: e.x / t.length, y: e.y / t.length };
          }),
          (e.getDistanceBetweenPoints = function (t, e) {
            return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
          }),
          (e.getAngleBetweenPoints = function (t, e) {
            return Math.atan2(e.x - t.x, e.y - t.y);
          }),
          (e.pointInPolygon = function ({ x: t, y: e }, i) {
            let s = i.length,
              o,
              r,
              a = !1;
            for (o = 0, r = s - 1; o < s; r = o++) {
              let [s, n] = i[o],
                [l, h] = i[r];
              n > e != h > e &&
                t < ((l - s) * (e - n)) / (h - n) + s &&
                (a = !a);
            }
            return a;
          }),
          t
        );
      }),
      i(
        e,
        "Extensions/OverlappingDataLabels.js",
        [e["Core/Geometry/GeometryUtilities.js"], e["Core/Utilities.js"]],
        function (t, e) {
          let { pointInPolygon: i } = t,
            { addEvent: s, fireEvent: o, objectEach: r, pick: a } = e;
          function n(t) {
            let e = t.length,
              s = (t, e) =>
                !(
                  e.x >= t.x + t.width ||
                  e.x + e.width <= t.x ||
                  e.y >= t.y + t.height ||
                  e.y + e.height <= t.y
                ),
              r = (t, e) => {
                for (let s of t) if (i({ x: s[0], y: s[1] }, e)) return !0;
                return !1;
              },
              a,
              n,
              h,
              d,
              c,
              p = !1;
            for (let i = 0; i < e; i++)
              (a = t[i]) &&
                ((a.oldOpacity = a.opacity),
                (a.newOpacity = 1),
                (a.absoluteBox = (function (t) {
                  if (t && (!t.alignAttr || t.placed)) {
                    let e = t.box ? 0 : t.padding || 0,
                      i = t.alignAttr || { x: t.attr("x"), y: t.attr("y") },
                      s = t.getBBox();
                    return (
                      (t.width = s.width),
                      (t.height = s.height),
                      {
                        x: i.x + (t.parentGroup?.translateX || 0) + e,
                        y: i.y + (t.parentGroup?.translateY || 0) + e,
                        width: (t.width || 0) - 2 * e,
                        height: (t.height || 0) - 2 * e,
                        polygon: s?.polygon,
                      }
                    );
                  }
                })(a)));
            t.sort((t, e) => (e.labelrank || 0) - (t.labelrank || 0));
            for (let i = 0; i < e; ++i) {
              d = (n = t[i]) && n.absoluteBox;
              let o = d?.polygon;
              for (let a = i + 1; a < e; ++a) {
                c = (h = t[a]) && h.absoluteBox;
                let e = !1;
                if (
                  d &&
                  c &&
                  n !== h &&
                  0 !== n.newOpacity &&
                  0 !== h.newOpacity &&
                  "hidden" !== n.visibility &&
                  "hidden" !== h.visibility
                ) {
                  let t = c.polygon;
                  if (
                    (o && t && o !== t
                      ? r(o, t) && (e = !0)
                      : s(d, c) && (e = !0),
                    e)
                  ) {
                    let t = n.labelrank < h.labelrank ? n : h,
                      e = t.text;
                    (t.newOpacity = 0),
                      e?.element.querySelector("textPath") && e.hide();
                  }
                }
              }
            }
            for (let e of t) l(e, this) && (p = !0);
            p && o(this, "afterHideAllOverlappingLabels");
          }
          function l(t, e) {
            let i,
              s,
              r = !1;
            return (
              t &&
                ((s = t.newOpacity),
                t.oldOpacity !== s &&
                  (t.hasClass("highcharts-data-label")
                    ? (t[s ? "removeClass" : "addClass"](
                        "highcharts-data-label-hidden"
                      ),
                      (i = function () {
                        e.styledMode ||
                          t.css({ pointerEvents: s ? "auto" : "none" });
                      }),
                      (r = !0),
                      t[t.isOld ? "animate" : "attr"](
                        { opacity: s },
                        void 0,
                        i
                      ),
                      o(e, "afterHideOverlappingLabel"))
                    : t.attr({ opacity: s })),
                (t.isOld = !0)),
              r
            );
          }
          function h() {
            let t = this,
              e = [];
            for (let i of t.labelCollectors || []) e = e.concat(i());
            for (let i of t.yAxis || [])
              i.stacking &&
                i.options.stackLabels &&
                !i.options.stackLabels.allowOverlap &&
                r(i.stacking.stacks, (t) => {
                  r(t, (t) => {
                    t.label && e.push(t.label);
                  });
                });
            for (let i of t.series || [])
              if (i.visible && i.hasDataLabels?.()) {
                let s = (i) => {
                  for (let s of i)
                    s.visible &&
                      (s.dataLabels || []).forEach((i) => {
                        let o = i.options || {};
                        (i.labelrank = a(
                          o.labelrank,
                          s.labelrank,
                          s.shapeArgs?.height
                        )),
                          o.allowOverlap ?? Number(o.distance) > 0
                            ? ((i.oldOpacity = i.opacity),
                              (i.newOpacity = 1),
                              l(i, t))
                            : e.push(i);
                      });
                };
                s(i.nodes || []), s(i.points);
              }
            this.hideOverlappingLabels(e);
          }
          return {
            compose: function (t) {
              let e = t.prototype;
              e.hideOverlappingLabels ||
                ((e.hideOverlappingLabels = n), s(t, "render", h));
            },
          };
        }
      ),
      i(
        e,
        "Extensions/BorderRadius.js",
        [e["Core/Defaults.js"], e["Core/Globals.js"], e["Core/Utilities.js"]],
        function (t, e, i) {
          let { defaultOptions: s } = t,
            { noop: o } = e,
            {
              addEvent: r,
              extend: a,
              isObject: n,
              merge: l,
              relativeLength: h,
            } = i,
            d = { radius: 0, scope: "stack", where: void 0 },
            c = o,
            p = o;
          function u(t, e, i, s, o = {}) {
            let r = c(t, e, i, s, o),
              { innerR: a = 0, r: n = i, start: l = 0, end: d = 0 } = o;
            if (o.open || !o.borderRadius) return r;
            let p = d - l,
              g = Math.sin(p / 2),
              f = Math.max(
                Math.min(
                  h(o.borderRadius || 0, n - a),
                  (n - a) / 2,
                  (n * g) / (1 + g)
                ),
                0
              ),
              m = Math.min(f, (p / Math.PI) * 2 * a),
              x = r.length - 1;
            for (; x--; )
              !(function (t, e, i) {
                let s, o, r;
                let a = t[e],
                  n = t[e + 1];
                if (
                  ("Z" === n[0] && (n = t[0]),
                  ("M" === a[0] || "L" === a[0]) && "A" === n[0]
                    ? ((s = a), (o = n), (r = !0))
                    : "A" === a[0] &&
                      ("M" === n[0] || "L" === n[0]) &&
                      ((s = n), (o = a)),
                  s && o && o.params)
                ) {
                  let a = o[1],
                    n = o[5],
                    l = o.params,
                    { start: h, end: d, cx: c, cy: p } = l,
                    u = n ? a - i : a + i,
                    g = u ? Math.asin(i / u) : 0,
                    f = n ? g : -g,
                    m = Math.cos(g) * u;
                  r
                    ? ((l.start = h + f),
                      (s[1] = c + m * Math.cos(h)),
                      (s[2] = p + m * Math.sin(h)),
                      t.splice(e + 1, 0, [
                        "A",
                        i,
                        i,
                        0,
                        0,
                        1,
                        c + a * Math.cos(l.start),
                        p + a * Math.sin(l.start),
                      ]))
                    : ((l.end = d - f),
                      (o[6] = c + a * Math.cos(l.end)),
                      (o[7] = p + a * Math.sin(l.end)),
                      t.splice(e + 1, 0, [
                        "A",
                        i,
                        i,
                        0,
                        0,
                        1,
                        c + m * Math.cos(d),
                        p + m * Math.sin(d),
                      ])),
                    (o[4] = Math.abs(l.end - l.start) < Math.PI ? 0 : 1);
                }
              })(r, x, x > 1 ? m : f);
            return r;
          }
          function g() {
            if (
              this.options.borderRadius &&
              !(this.chart.is3d && this.chart.is3d())
            ) {
              let { options: t, yAxis: e } = this,
                i = "percent" === t.stacking,
                o = s.plotOptions?.[this.type]?.borderRadius,
                r = f(t.borderRadius, n(o) ? o : {}),
                l = e.options.reversed;
              for (let s of this.points) {
                let { shapeArgs: o } = s;
                if ("roundedRect" === s.shapeType && o) {
                  let { width: n = 0, height: d = 0, y: c = 0 } = o,
                    p = c,
                    u = d;
                  if ("stack" === r.scope && s.stackTotal) {
                    let o = e.translate(i ? 100 : s.stackTotal, !1, !0, !1, !0),
                      r = e.translate(t.threshold || 0, !1, !0, !1, !0),
                      a = this.crispCol(0, Math.min(o, r), 0, Math.abs(o - r));
                    (p = a.y), (u = a.height);
                  }
                  let g = (s.negative ? -1 : 1) * (l ? -1 : 1) == -1,
                    f = r.where;
                  !f &&
                    this.is("waterfall") &&
                    Math.abs(
                      (s.yBottom || 0) - (this.translatedThreshold || 0)
                    ) > this.borderWidth &&
                    (f = "all"),
                    f || (f = "end");
                  let m =
                    Math.min(
                      h(r.radius, n),
                      n / 2,
                      "all" === f ? d / 2 : 1 / 0
                    ) || 0;
                  "end" === f && (g && (p -= m), (u += m)),
                    a(o, { brBoxHeight: u, brBoxY: p, r: m });
                }
              }
            }
          }
          function f(t, e) {
            return n(t) || (t = { radius: t || 0 }), l(d, e, t);
          }
          function m() {
            let t = f(this.options.borderRadius);
            for (let e of this.points) {
              let i = e.shapeArgs;
              i && (i.borderRadius = h(t.radius, (i.r || 0) - (i.innerR || 0)));
            }
          }
          function x(t, e, i, s, o = {}) {
            let r = p(t, e, i, s, o),
              { r: a = 0, brBoxHeight: n = s, brBoxY: l = e } = o,
              h = e - l,
              d = l + n - (e + s),
              c = h - a > -0.1 ? 0 : a,
              u = d - a > -0.1 ? 0 : a,
              g = Math.max(c && h, 0),
              f = Math.max(u && d, 0),
              m = [t + c, e],
              y = [t + i - c, e],
              b = [t + i, e + c],
              v = [t + i, e + s - u],
              S = [t + i - u, e + s],
              k = [t + u, e + s],
              M = [t, e + s - u],
              C = [t, e + c],
              A = (t, e) => Math.sqrt(Math.pow(t, 2) - Math.pow(e, 2));
            if (g) {
              let t = A(c, c - g);
              (m[0] -= t), (y[0] += t), (b[1] = C[1] = e + c - g);
            }
            if (s < c - g) {
              let o = A(c, c - g - s);
              (b[0] = v[0] = t + i - c + o),
                (S[0] = Math.min(b[0], S[0])),
                (k[0] = Math.max(v[0], k[0])),
                (M[0] = C[0] = t + c - o),
                (b[1] = C[1] = e + s);
            }
            if (f) {
              let t = A(u, u - f);
              (S[0] += t), (k[0] -= t), (v[1] = M[1] = e + s - u + f);
            }
            if (s < u - f) {
              let o = A(u, u - f - s);
              (b[0] = v[0] = t + i - u + o),
                (y[0] = Math.min(b[0], y[0])),
                (m[0] = Math.max(v[0], m[0])),
                (M[0] = C[0] = t + u - o),
                (v[1] = M[1] = e);
            }
            return (
              (r.length = 0),
              r.push(
                ["M", ...m],
                ["L", ...y],
                ["A", c, c, 0, 0, 1, ...b],
                ["L", ...v],
                ["A", u, u, 0, 0, 1, ...S],
                ["L", ...k],
                ["A", u, u, 0, 0, 1, ...M],
                ["L", ...C],
                ["A", c, c, 0, 0, 1, ...m],
                ["Z"]
              ),
              r
            );
          }
          return {
            compose: function (t, e, i) {
              let s = t.types.pie;
              if (!e.symbolCustomAttribs.includes("borderRadius")) {
                let o = i.prototype.symbols;
                r(t, "afterColumnTranslate", g, { order: 9 }),
                  r(s, "afterTranslate", m),
                  e.symbolCustomAttribs.push(
                    "borderRadius",
                    "brBoxHeight",
                    "brBoxY"
                  ),
                  (c = o.arc),
                  (p = o.roundedRect),
                  (o.arc = u),
                  (o.roundedRect = x);
              }
            },
            optionsToObject: f,
          };
        }
      ),
      i(e, "Core/Responsive.js", [e["Core/Utilities.js"]], function (t) {
        var e;
        let {
          diffObjects: i,
          extend: s,
          find: o,
          merge: r,
          pick: a,
          uniqueKey: n,
        } = t;
        return (
          (function (t) {
            function e(t, e) {
              let i = t.condition;
              (
                i.callback ||
                function () {
                  return (
                    this.chartWidth <= a(i.maxWidth, Number.MAX_VALUE) &&
                    this.chartHeight <= a(i.maxHeight, Number.MAX_VALUE) &&
                    this.chartWidth >= a(i.minWidth, 0) &&
                    this.chartHeight >= a(i.minHeight, 0)
                  );
                }
              ).call(this) && e.push(t._id);
            }
            function l(t, e) {
              let s = this.options.responsive,
                a = this.currentResponsive,
                l = [],
                h;
              !e &&
                s &&
                s.rules &&
                s.rules.forEach((t) => {
                  void 0 === t._id && (t._id = n()),
                    this.matchResponsiveRule(t, l);
                }, this);
              let d = r(
                ...l
                  .map((t) => o((s || {}).rules || [], (e) => e._id === t))
                  .map((t) => t && t.chartOptions)
              );
              (d.isResponsiveOptions = !0), (l = l.toString() || void 0);
              let c = a && a.ruleIds;
              l === c ||
                (a &&
                  ((this.currentResponsive = void 0),
                  (this.updatingResponsive = !0),
                  this.update(a.undoOptions, t, !0),
                  (this.updatingResponsive = !1)),
                l
                  ? (((h = i(
                      d,
                      this.options,
                      !0,
                      this.collectionsWithUpdate
                    )).isResponsiveOptions = !0),
                    (this.currentResponsive = {
                      ruleIds: l,
                      mergedOptions: d,
                      undoOptions: h,
                    }),
                    this.updatingResponsive || this.update(d, t, !0))
                  : (this.currentResponsive = void 0));
            }
            t.compose = function (t) {
              let i = t.prototype;
              return (
                i.matchResponsiveRule ||
                  s(i, { matchResponsiveRule: e, setResponsive: l }),
                t
              );
            };
          })(e || (e = {})),
          e
        );
      }),
      i(
        e,
        "masters/highcharts.src.js",
        [
          e["Core/Globals.js"],
          e["Core/Utilities.js"],
          e["Core/Defaults.js"],
          e["Core/Animation/Fx.js"],
          e["Core/Animation/AnimationUtilities.js"],
          e["Core/Renderer/HTML/AST.js"],
          e["Core/Templating.js"],
          e["Core/Renderer/RendererRegistry.js"],
          e["Core/Renderer/RendererUtilities.js"],
          e["Core/Renderer/SVG/SVGElement.js"],
          e["Core/Renderer/SVG/SVGRenderer.js"],
          e["Core/Renderer/HTML/HTMLElement.js"],
          e["Core/Axis/Axis.js"],
          e["Core/Axis/DateTimeAxis.js"],
          e["Core/Axis/LogarithmicAxis.js"],
          e["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"],
          e["Core/Axis/Tick.js"],
          e["Core/Tooltip.js"],
          e["Core/Series/Point.js"],
          e["Core/Pointer.js"],
          e["Core/Legend/Legend.js"],
          e["Core/Legend/LegendSymbol.js"],
          e["Core/Chart/Chart.js"],
          e["Extensions/ScrollablePlotArea.js"],
          e["Core/Axis/Stacking/StackingAxis.js"],
          e["Core/Axis/Stacking/StackItem.js"],
          e["Core/Series/Series.js"],
          e["Core/Series/SeriesRegistry.js"],
          e["Series/Column/ColumnDataLabel.js"],
          e["Series/Pie/PieDataLabel.js"],
          e["Core/Series/DataLabel.js"],
          e["Extensions/OverlappingDataLabels.js"],
          e["Extensions/BorderRadius.js"],
          e["Core/Responsive.js"],
          e["Core/Color/Color.js"],
          e["Core/Time.js"],
        ],
        function (
          t,
          e,
          i,
          s,
          o,
          r,
          a,
          n,
          l,
          h,
          d,
          c,
          p,
          u,
          g,
          f,
          m,
          x,
          y,
          b,
          v,
          S,
          k,
          M,
          C,
          A,
          w,
          T,
          P,
          O,
          L,
          D,
          E,
          B,
          j,
          R
        ) {
          return (
            (t.AST = r),
            (t.Axis = p),
            (t.Chart = k),
            (t.Color = j),
            (t.DataLabel = L),
            (t.Fx = s),
            (t.HTMLElement = c),
            (t.Legend = v),
            (t.LegendSymbol = S),
            (t.OverlappingDataLabels = t.OverlappingDataLabels || D),
            (t.PlotLineOrBand = f),
            (t.Point = y),
            (t.Pointer = b),
            (t.RendererRegistry = n),
            (t.Series = w),
            (t.SeriesRegistry = T),
            (t.StackItem = A),
            (t.SVGElement = h),
            (t.SVGRenderer = d),
            (t.Templating = a),
            (t.Tick = m),
            (t.Time = R),
            (t.Tooltip = x),
            (t.animate = o.animate),
            (t.animObject = o.animObject),
            (t.chart = k.chart),
            (t.color = j.parse),
            (t.dateFormat = a.dateFormat),
            (t.defaultOptions = i.defaultOptions),
            (t.distribute = l.distribute),
            (t.format = a.format),
            (t.getDeferredAnimation = o.getDeferredAnimation),
            (t.getOptions = i.getOptions),
            (t.numberFormat = a.numberFormat),
            (t.seriesType = T.seriesType),
            (t.setAnimation = o.setAnimation),
            (t.setOptions = i.setOptions),
            (t.stop = o.stop),
            (t.time = i.defaultTime),
            (t.timers = s.timers),
            E.compose(t.Series, t.SVGElement, t.SVGRenderer),
            P.compose(t.Series.types.column),
            L.compose(t.Series),
            u.compose(t.Axis),
            c.compose(t.SVGRenderer),
            v.compose(t.Chart),
            g.compose(t.Axis),
            D.compose(t.Chart),
            O.compose(t.Series.types.pie),
            f.compose(t.Axis),
            b.compose(t.Chart),
            B.compose(t.Chart),
            M.compose(t.Axis, t.Chart, t.Series),
            C.compose(t.Axis, t.Chart, t.Series),
            x.compose(t.Pointer),
            e.extend(t, e),
            t
          );
        }
      ),
      i(
        e,
        "Series/DataModifyComposition.js",
        [
          e["Core/Axis/Axis.js"],
          e["Core/Series/Point.js"],
          e["Core/Series/Series.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s) {
          var o;
          let { tooltipFormatter: r } = e.prototype,
            {
              addEvent: a,
              arrayMax: n,
              arrayMin: l,
              correctFloat: h,
              defined: d,
              isArray: c,
              isNumber: p,
              isString: u,
              pick: g,
            } = s;
          return (
            (function (t) {
              function e(t, e, i) {
                !this.isXAxis &&
                  (this.series.forEach(function (i) {
                    "compare" === t && "boolean" != typeof e
                      ? i.setCompare(e, !1)
                      : "cumulative" !== t || u(e) || i.setCumulative(e, !1);
                  }),
                  g(i, !0) && this.chart.redraw());
              }
              function i(t) {
                let e = this,
                  { numberFormatter: i } = e.series.chart,
                  s = function (s) {
                    t = t.replace(
                      "{point." + s + "}",
                      (e[s] > 0 && "change" === s ? "+" : "") +
                        i(e[s], g(e.series.tooltipOptions.changeDecimals, 2))
                    );
                  };
                return (
                  d(e.change) && s("change"),
                  d(e.cumulativeSum) && s("cumulativeSum"),
                  r.apply(this, [t])
                );
              }
              function s() {
                let t;
                let e = this.options.compare;
                ("percent" === e || "value" === e || this.options.cumulative) &&
                  ((t = new v(this)),
                  "percent" === e || "value" === e
                    ? t.initCompare(e)
                    : t.initCumulative()),
                  (this.dataModify = t);
              }
              function o(t) {
                let e = t.dataExtremes,
                  i = e.activeYData;
                if (this.dataModify && e) {
                  let t;
                  this.options.compare
                    ? (t = [
                        this.dataModify.modifyValue(e.dataMin),
                        this.dataModify.modifyValue(e.dataMax),
                      ])
                    : this.options.cumulative &&
                      c(i) &&
                      i.length >= 2 &&
                      (t = v.getCumulativeExtremes(i)),
                    t && ((e.dataMin = l(t)), (e.dataMax = n(t)));
                }
              }
              function f(t, e) {
                (this.options.compare = this.userOptions.compare = t),
                  this.update({}, g(e, !0)),
                  this.dataModify && ("value" === t || "percent" === t)
                    ? this.dataModify.initCompare(t)
                    : this.points.forEach((t) => {
                        delete t.change;
                      });
              }
              function m() {
                if (this.xAxis && this.processedYData && this.dataModify) {
                  let t = this.processedXData,
                    e = this.processedYData,
                    i = e.length,
                    s = !0 === this.options.compareStart ? 0 : 1,
                    o = -1,
                    r;
                  for (
                    this.pointArrayMap &&
                      (o = this.pointArrayMap.indexOf(
                        this.options.pointValKey || this.pointValKey || "y"
                      )),
                      r = 0;
                    r < i - s;
                    r++
                  ) {
                    let i = e[r] && o > -1 ? e[r][o] : e[r];
                    if (p(i) && 0 !== i && t[r + s] >= (this.xAxis.min || 0)) {
                      this.dataModify.compareValue = i;
                      break;
                    }
                  }
                }
              }
              function x(t, e) {
                this.setModifier("compare", t, e);
              }
              function y(t, e) {
                (t = g(t, !1)),
                  (this.options.cumulative = this.userOptions.cumulative = t),
                  this.update({}, g(e, !0)),
                  this.dataModify
                    ? this.dataModify.initCumulative()
                    : this.points.forEach((t) => {
                        delete t.cumulativeSum;
                      });
              }
              function b(t, e) {
                this.setModifier("cumulative", t, e);
              }
              t.compose = function (t, r, n) {
                let l = r.prototype,
                  h = n.prototype,
                  d = t.prototype;
                return (
                  d.setCompare ||
                    ((d.setCompare = f),
                    (d.setCumulative = y),
                    a(t, "afterInit", s),
                    a(t, "afterGetExtremes", o),
                    a(t, "afterProcessData", m)),
                  l.setCompare ||
                    ((l.setCompare = x),
                    (l.setModifier = e),
                    (l.setCumulative = b),
                    (h.tooltipFormatter = i)),
                  t
                );
              };
              class v {
                constructor(t) {
                  this.series = t;
                }
                modifyValue() {
                  return 0;
                }
                static getCumulativeExtremes(t) {
                  let e = 1 / 0,
                    i = -1 / 0;
                  return (
                    t.reduce((t, s) => {
                      let o = t + s;
                      return (
                        (e = Math.min(e, o, t)), (i = Math.max(i, o, t)), o
                      );
                    }),
                    [e, i]
                  );
                }
                initCompare(t) {
                  this.modifyValue = function (e, i) {
                    null === e && (e = 0);
                    let s = this.compareValue;
                    if (void 0 !== e && void 0 !== s) {
                      if (
                        ("value" === t
                          ? (e -= s)
                          : (e =
                              (e / s) * 100 -
                              (100 === this.series.options.compareBase
                                ? 0
                                : 100)),
                        void 0 !== i)
                      ) {
                        let t = this.series.points[i];
                        t && (t.change = e);
                      }
                      return e;
                    }
                    return 0;
                  };
                }
                initCumulative() {
                  this.modifyValue = function (t, e) {
                    if ((null === t && (t = 0), void 0 !== t && void 0 !== e)) {
                      let i = e > 0 ? this.series.points[e - 1] : null;
                      i && i.cumulativeSum && (t = h(i.cumulativeSum + t));
                      let s = this.series.points[e],
                        o = s.series.options.cumulativeStart,
                        r =
                          s.x <= this.series.xAxis.max &&
                          s.x >= this.series.xAxis.min;
                      return (
                        s &&
                          (!o || r
                            ? (s.cumulativeSum = t)
                            : (s.cumulativeSum = void 0)),
                        t
                      );
                    }
                    return 0;
                  };
                }
              }
              t.Additions = v;
            })(o || (o = {})),
            o
          );
        }
      ),
      i(
        e,
        "Stock/Navigator/ChartNavigatorComposition.js",
        [e["Core/Globals.js"], e["Core/Utilities.js"]],
        function (t, e) {
          let i;
          let { isTouchDevice: s } = t,
            { addEvent: o, merge: r, pick: a } = e,
            n = [];
          function l() {
            this.navigator && this.navigator.setBaseSeries(null, !1);
          }
          function h() {
            let t, e, i;
            let s = this.legend,
              o = this.navigator;
            if (o) {
              (t = s && s.options), (e = o.xAxis), (i = o.yAxis);
              let { scrollbarHeight: r, scrollButtonSize: n } = o;
              this.inverted
                ? ((o.left = o.opposite
                    ? this.chartWidth - r - o.height
                    : this.spacing[3] + r),
                  (o.top = this.plotTop + n))
                : ((o.left = a(e.left, this.plotLeft + n)),
                  (o.top =
                    o.navigatorOptions.top ||
                    this.chartHeight -
                      o.height -
                      r -
                      (this.scrollbar?.options.margin || 0) -
                      this.spacing[2] -
                      (this.rangeSelector && this.extraBottomMargin
                        ? this.rangeSelector.getHeight()
                        : 0) -
                      (t &&
                      "bottom" === t.verticalAlign &&
                      "proximate" !== t.layout &&
                      t.enabled &&
                      !t.floating
                        ? s.legendHeight + a(t.margin, 10)
                        : 0) -
                      (this.titleOffset ? this.titleOffset[2] : 0))),
                e &&
                  i &&
                  (this.inverted
                    ? (e.options.left = i.options.left = o.left)
                    : (e.options.top = i.options.top = o.top),
                  e.setAxisSize(),
                  i.setAxisSize());
            }
          }
          function d(t) {
            !this.navigator &&
              !this.scroller &&
              (this.options.navigator.enabled ||
                this.options.scrollbar.enabled) &&
              ((this.scroller = this.navigator = new i(this)),
              a(t.redraw, !0) && this.redraw(t.animation));
          }
          function c() {
            let t = this.options;
            (t.navigator.enabled || t.scrollbar.enabled) &&
              (this.scroller = this.navigator = new i(this));
          }
          function p() {
            let t = this.options,
              e = t.navigator,
              i = t.rangeSelector;
            if (
              ((e && e.enabled) || (i && i.enabled)) &&
              ((!s && "x" === this.zooming.type) ||
                (s && "x" === this.zooming.pinchType))
            )
              return !1;
          }
          function u(t) {
            let e = t.navigator;
            if (e && t.xAxis[0]) {
              let i = t.xAxis[0].getExtremes();
              e.render(i.min, i.max);
            }
          }
          function g(t) {
            let e = t.options.navigator || {},
              i = t.options.scrollbar || {};
            !this.navigator &&
              !this.scroller &&
              (e.enabled || i.enabled) &&
              (r(!0, this.options.navigator, e),
              r(!0, this.options.scrollbar, i),
              delete t.options.navigator,
              delete t.options.scrollbar);
          }
          return {
            compose: function (t, s) {
              if (e.pushUnique(n, t)) {
                let e = t.prototype;
                (i = s),
                  e.callbacks.push(u),
                  o(t, "afterAddSeries", l),
                  o(t, "afterSetChartSize", h),
                  o(t, "afterUpdate", d),
                  o(t, "beforeRender", c),
                  o(t, "beforeShowResetZoom", p),
                  o(t, "update", g);
              }
            },
          };
        }
      ),
      i(
        e,
        "Core/Axis/NavigatorAxisComposition.js",
        [e["Core/Globals.js"], e["Core/Utilities.js"]],
        function (t, e) {
          let { isTouchDevice: i } = t,
            {
              addEvent: s,
              correctFloat: o,
              defined: r,
              isNumber: a,
              pick: n,
            } = e;
          function l() {
            this.navigatorAxis || (this.navigatorAxis = new d(this));
          }
          function h(t) {
            let e;
            let s = this.chart,
              o = s.options,
              a = o.navigator,
              n = this.navigatorAxis,
              l = s.zooming.pinchType,
              h = o.rangeSelector,
              d = s.zooming.type;
            if (this.isXAxis && (a?.enabled || h?.enabled)) {
              if ("y" === d && "zoom" === t.trigger) e = !1;
              else if (
                (("zoom" === t.trigger && "xy" === d) || (i && "xy" === l)) &&
                this.options.range
              ) {
                let e = n.previousZoom;
                r(t.min)
                  ? (n.previousZoom = [this.min, this.max])
                  : e &&
                    ((t.min = e[0]), (t.max = e[1]), (n.previousZoom = void 0));
              }
            }
            void 0 !== e && t.preventDefault();
          }
          class d {
            static compose(t) {
              t.keepProps.includes("navigatorAxis") ||
                (t.keepProps.push("navigatorAxis"),
                s(t, "init", l),
                s(t, "setExtremes", h));
            }
            constructor(t) {
              this.axis = t;
            }
            destroy() {
              this.axis = void 0;
            }
            toFixedRange(t, e, i, s) {
              let l = this.axis,
                h = (l.pointRange || 0) / 2,
                d = n(i, l.translate(t, !0, !l.horiz)),
                c = n(s, l.translate(e, !0, !l.horiz));
              return (
                r(i) || (d = o(d + h)),
                r(s) || (c = o(c - h)),
                (a(d) && a(c)) || (d = c = void 0),
                { min: d, max: c }
              );
            }
          }
          return d;
        }
      ),
      i(
        e,
        "Stock/Navigator/NavigatorDefaults.js",
        [e["Core/Color/Color.js"], e["Core/Series/SeriesRegistry.js"]],
        function (t, e) {
          let { parse: i } = t,
            { seriesTypes: s } = e;
          return {
            height: 40,
            margin: 25,
            maskInside: !0,
            handles: {
              width: 7,
              borderRadius: 0,
              height: 15,
              symbols: ["navigator-handle", "navigator-handle"],
              enabled: !0,
              lineWidth: 1,
              backgroundColor: "#f2f2f2",
              borderColor: "#999999",
            },
            maskFill: i("#667aff").setOpacity(0.3).get(),
            outlineColor: "#999999",
            outlineWidth: 1,
            series: {
              type: void 0 === s.areaspline ? "line" : "areaspline",
              fillOpacity: 0.05,
              lineWidth: 1,
              compare: null,
              sonification: { enabled: !1 },
              dataGrouping: {
                approximation: "average",
                enabled: !0,
                groupPixelWidth: 2,
                firstAnchor: "firstPoint",
                anchor: "middle",
                lastAnchor: "lastPoint",
                units: [
                  ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                  ["second", [1, 2, 5, 10, 15, 30]],
                  ["minute", [1, 2, 5, 10, 15, 30]],
                  ["hour", [1, 2, 3, 4, 6, 8, 12]],
                  ["day", [1, 2, 3, 4]],
                  ["week", [1, 2, 3]],
                  ["month", [1, 3, 6]],
                  ["year", null],
                ],
              },
              dataLabels: { enabled: !1, zIndex: 2 },
              id: "highcharts-navigator-series",
              className: "highcharts-navigator-series",
              lineColor: null,
              marker: { enabled: !1 },
              threshold: null,
            },
            xAxis: {
              className: "highcharts-navigator-xaxis",
              tickLength: 0,
              lineWidth: 0,
              gridLineColor: "#e6e6e6",
              id: "navigator-x-axis",
              gridLineWidth: 1,
              tickPixelInterval: 200,
              labels: {
                align: "left",
                style: {
                  color: "#000000",
                  fontSize: "0.7em",
                  opacity: 0.6,
                  textOutline: "2px contrast",
                },
                x: 3,
                y: -4,
              },
              crosshair: !1,
            },
            yAxis: {
              className: "highcharts-navigator-yaxis",
              gridLineWidth: 0,
              startOnTick: !1,
              endOnTick: !1,
              minPadding: 0.1,
              id: "navigator-y-axis",
              maxPadding: 0.1,
              labels: { enabled: !1 },
              crosshair: !1,
              title: { text: null },
              tickLength: 0,
              tickWidth: 0,
            },
          };
        }
      ),
      i(
        e,
        "Stock/Navigator/NavigatorSymbols.js",
        [e["Core/Renderer/SVG/Symbols.js"], e["Core/Utilities.js"]],
        function (t, e) {
          let { relativeLength: i } = e;
          return {
            "navigator-handle": function (e, s, o, r, a = {}) {
              let n = a.width ? a.width / 2 : o,
                l = i(a.borderRadius || 0, Math.min(2 * n, r));
              return [
                ["M", -1.5, (r = a.height || r) / 2 - 3.5],
                ["L", -1.5, r / 2 + 4.5],
                ["M", 0.5, r / 2 - 3.5],
                ["L", 0.5, r / 2 + 4.5],
                ...t.rect(-n - 1, 0.5, 2 * n + 1, r, { r: l }),
              ];
            },
          };
        }
      ),
      i(
        e,
        "Stock/Utilities/StockUtilities.js",
        [e["Core/Utilities.js"]],
        function (t) {
          let { defined: e } = t;
          return {
            setFixedRange: function (t) {
              let i = this.xAxis[0];
              e(i.dataMax) && e(i.dataMin) && t
                ? (this.fixedRange = Math.min(t, i.dataMax - i.dataMin))
                : (this.fixedRange = t);
            },
          };
        }
      ),
      i(
        e,
        "Stock/Navigator/NavigatorComposition.js",
        [
          e["Core/Defaults.js"],
          e["Core/Globals.js"],
          e["Core/Axis/NavigatorAxisComposition.js"],
          e["Stock/Navigator/NavigatorDefaults.js"],
          e["Stock/Navigator/NavigatorSymbols.js"],
          e["Core/Renderer/RendererRegistry.js"],
          e["Stock/Utilities/StockUtilities.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s, o, r, a, n) {
          let { setOptions: l } = t,
            { composed: h } = e,
            { getRendererType: d } = r,
            { setFixedRange: c } = a,
            { addEvent: p, extend: u, pushUnique: g } = n;
          function f() {
            this.chart.navigator &&
              !this.options.isInternal &&
              this.chart.navigator.setBaseSeries(null, !1);
          }
          return {
            compose: function (t, e, r) {
              i.compose(e),
                g(h, "Navigator") &&
                  ((t.prototype.setFixedRange = c),
                  u(d().prototype.symbols, o),
                  p(r, "afterUpdate", f),
                  l({ navigator: s }));
            },
          };
        }
      ),
      i(
        e,
        "Core/Axis/ScrollbarAxis.js",
        [e["Core/Globals.js"], e["Core/Utilities.js"]],
        function (t, e) {
          var i;
          let { composed: s } = t,
            { addEvent: o, defined: r, pick: a, pushUnique: n } = e;
          return (
            (function (t) {
              let e;
              function i(t) {
                let e = a(t.options && t.options.min, t.min),
                  i = a(t.options && t.options.max, t.max);
                return {
                  axisMin: e,
                  axisMax: i,
                  scrollMin: r(t.dataMin)
                    ? Math.min(e, t.min, t.dataMin, a(t.threshold, 1 / 0))
                    : e,
                  scrollMax: r(t.dataMax)
                    ? Math.max(i, t.max, t.dataMax, a(t.threshold, -1 / 0))
                    : i,
                };
              }
              function l() {
                let t = this.scrollbar,
                  e = t && !t.options.opposite,
                  i = this.horiz ? 2 : e ? 3 : 1;
                t &&
                  ((this.chart.scrollbarsOffsets = [0, 0]),
                  (this.chart.axisOffset[i] +=
                    t.size + (t.options.margin || 0)));
              }
              function h() {
                let t = this;
                t.options &&
                  t.options.scrollbar &&
                  t.options.scrollbar.enabled &&
                  ((t.options.scrollbar.vertical = !t.horiz),
                  (t.options.startOnTick = t.options.endOnTick = !1),
                  (t.scrollbar = new e(
                    t.chart.renderer,
                    t.options.scrollbar,
                    t.chart
                  )),
                  o(t.scrollbar, "changed", function (e) {
                    let s, o;
                    let {
                        axisMin: a,
                        axisMax: n,
                        scrollMin: l,
                        scrollMax: h,
                      } = i(t),
                      d = h - l;
                    if (r(a) && r(n)) {
                      if (
                        ((t.horiz && !t.reversed) || (!t.horiz && t.reversed)
                          ? ((s = l + d * this.to), (o = l + d * this.from))
                          : ((s = l + d * (1 - this.from)),
                            (o = l + d * (1 - this.to))),
                        this.shouldUpdateExtremes(e.DOMType))
                      ) {
                        let i =
                          "mousemove" !== e.DOMType &&
                          "touchmove" !== e.DOMType &&
                          void 0;
                        t.setExtremes(o, s, !0, i, e);
                      } else this.setRange(this.from, this.to);
                    }
                  }));
              }
              function d() {
                let t, e, s;
                let { scrollMin: o, scrollMax: a } = i(this),
                  n = this.scrollbar,
                  l = this.axisTitleMargin + (this.titleOffset || 0),
                  h = this.chart.scrollbarsOffsets,
                  d = this.options.margin || 0;
                if (n && h) {
                  if (this.horiz)
                    this.opposite || (h[1] += l),
                      n.position(
                        this.left,
                        this.top +
                          this.height +
                          2 +
                          h[1] -
                          (this.opposite ? d : 0),
                        this.width,
                        this.height
                      ),
                      this.opposite || (h[1] += d),
                      (t = 1);
                  else {
                    let e;
                    this.opposite && (h[0] += l),
                      (e = n.options.opposite
                        ? this.left +
                          this.width +
                          2 +
                          h[0] -
                          (this.opposite ? 0 : d)
                        : this.opposite
                        ? 0
                        : d),
                      n.position(e, this.top, this.width, this.height),
                      this.opposite && (h[0] += d),
                      (t = 0);
                  }
                  (h[t] += n.size + (n.options.margin || 0)),
                    isNaN(o) ||
                    isNaN(a) ||
                    !r(this.min) ||
                    !r(this.max) ||
                    this.min === this.max
                      ? n.setRange(0, 1)
                      : ((e = (this.min - o) / (a - o)),
                        (s = (this.max - o) / (a - o)),
                        (this.horiz && !this.reversed) ||
                        (!this.horiz && this.reversed)
                          ? n.setRange(e, s)
                          : n.setRange(1 - s, 1 - e));
                }
              }
              t.compose = function (t, i) {
                n(s, "Axis.Scrollbar") &&
                  ((e = i),
                  o(t, "afterGetOffset", l),
                  o(t, "afterInit", h),
                  o(t, "afterRender", d));
              };
            })(i || (i = {})),
            i
          );
        }
      ),
      i(e, "Stock/Scrollbar/ScrollbarDefaults.js", [], function () {
        return {
          height: 10,
          barBorderRadius: 5,
          buttonBorderRadius: 0,
          buttonsEnabled: !1,
          liveRedraw: void 0,
          margin: void 0,
          minWidth: 6,
          opposite: !0,
          step: 0.2,
          zIndex: 3,
          barBackgroundColor: "#cccccc",
          barBorderWidth: 0,
          barBorderColor: "#cccccc",
          buttonArrowColor: "#333333",
          buttonBackgroundColor: "#e6e6e6",
          buttonBorderColor: "#cccccc",
          buttonBorderWidth: 1,
          rifleColor: "none",
          trackBackgroundColor: "rgba(255, 255, 255, 0.001)",
          trackBorderColor: "#cccccc",
          trackBorderRadius: 5,
          trackBorderWidth: 1,
        };
      }),
      i(
        e,
        "Stock/Scrollbar/Scrollbar.js",
        [
          e["Core/Defaults.js"],
          e["Core/Globals.js"],
          e["Core/Axis/ScrollbarAxis.js"],
          e["Stock/Scrollbar/ScrollbarDefaults.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s, o) {
          let { defaultOptions: r } = t,
            {
              addEvent: a,
              correctFloat: n,
              crisp: l,
              defined: h,
              destroyObjectProperties: d,
              fireEvent: c,
              merge: p,
              pick: u,
              removeEvent: g,
            } = o;
          class f {
            static compose(t) {
              i.compose(t, f);
            }
            static swapXY(t, e) {
              return (
                e &&
                  t.forEach((t) => {
                    let e;
                    let i = t.length;
                    for (let s = 0; s < i; s += 2)
                      "number" == typeof (e = t[s + 1]) &&
                        ((t[s + 1] = t[s + 2]), (t[s + 2] = e));
                  }),
                t
              );
            }
            constructor(t, e, i) {
              (this._events = []),
                (this.chartX = 0),
                (this.chartY = 0),
                (this.from = 0),
                (this.scrollbarButtons = []),
                (this.scrollbarLeft = 0),
                (this.scrollbarStrokeWidth = 1),
                (this.scrollbarTop = 0),
                (this.size = 0),
                (this.to = 0),
                (this.trackBorderWidth = 1),
                (this.x = 0),
                (this.y = 0),
                this.init(t, e, i);
            }
            addEvents() {
              let t = this.options.inverted ? [1, 0] : [0, 1],
                e = this.scrollbarButtons,
                i = this.scrollbarGroup.element,
                s = this.track.element,
                o = this.mouseDownHandler.bind(this),
                r = this.mouseMoveHandler.bind(this),
                n = this.mouseUpHandler.bind(this),
                l = [
                  [e[t[0]].element, "click", this.buttonToMinClick.bind(this)],
                  [e[t[1]].element, "click", this.buttonToMaxClick.bind(this)],
                  [s, "click", this.trackClick.bind(this)],
                  [i, "mousedown", o],
                  [i.ownerDocument, "mousemove", r],
                  [i.ownerDocument, "mouseup", n],
                  [i, "touchstart", o],
                  [i.ownerDocument, "touchmove", r],
                  [i.ownerDocument, "touchend", n],
                ];
              l.forEach(function (t) {
                a.apply(null, t);
              }),
                (this._events = l);
            }
            buttonToMaxClick(t) {
              let e = (this.to - this.from) * u(this.options.step, 0.2);
              this.updatePosition(this.from + e, this.to + e),
                c(this, "changed", {
                  from: this.from,
                  to: this.to,
                  trigger: "scrollbar",
                  DOMEvent: t,
                });
            }
            buttonToMinClick(t) {
              let e = n(this.to - this.from) * u(this.options.step, 0.2);
              this.updatePosition(n(this.from - e), n(this.to - e)),
                c(this, "changed", {
                  from: this.from,
                  to: this.to,
                  trigger: "scrollbar",
                  DOMEvent: t,
                });
            }
            cursorToScrollbarPosition(t) {
              let e = this.options,
                i = e.minWidth > this.calculatedWidth ? e.minWidth : 0;
              return {
                chartX:
                  (t.chartX - this.x - this.xOffset) / (this.barWidth - i),
                chartY:
                  (t.chartY - this.y - this.yOffset) / (this.barWidth - i),
              };
            }
            destroy() {
              let t = this,
                e = t.chart.scroller;
              t.removeEvents(),
                [
                  "track",
                  "scrollbarRifles",
                  "scrollbar",
                  "scrollbarGroup",
                  "group",
                ].forEach(function (e) {
                  t[e] && t[e].destroy && (t[e] = t[e].destroy());
                }),
                e &&
                  t === e.scrollbar &&
                  ((e.scrollbar = null), d(e.scrollbarButtons));
            }
            drawScrollbarButton(t) {
              let e = this.renderer,
                i = this.scrollbarButtons,
                s = this.options,
                o = this.size,
                r = e.g().add(this.group);
              if ((i.push(r), s.buttonsEnabled)) {
                let a = e.rect().addClass("highcharts-scrollbar-button").add(r);
                this.chart.styledMode ||
                  a.attr({
                    stroke: s.buttonBorderColor,
                    "stroke-width": s.buttonBorderWidth,
                    fill: s.buttonBackgroundColor,
                  }),
                  a.attr(
                    a.crisp(
                      {
                        x: -0.5,
                        y: -0.5,
                        width: o,
                        height: o,
                        r: s.buttonBorderRadius,
                      },
                      a.strokeWidth()
                    )
                  );
                let n = e
                  .path(
                    f.swapXY(
                      [
                        ["M", o / 2 + (t ? -1 : 1), o / 2 - 3],
                        ["L", o / 2 + (t ? -1 : 1), o / 2 + 3],
                        ["L", o / 2 + (t ? 2 : -2), o / 2],
                      ],
                      s.vertical
                    )
                  )
                  .addClass("highcharts-scrollbar-arrow")
                  .add(i[t]);
                this.chart.styledMode || n.attr({ fill: s.buttonArrowColor });
              }
            }
            init(t, e, i) {
              (this.scrollbarButtons = []),
                (this.renderer = t),
                (this.userOptions = e),
                (this.options = p(s, r.scrollbar, e)),
                (this.options.margin = u(this.options.margin, 10)),
                (this.chart = i),
                (this.size = u(this.options.size, this.options.height)),
                e.enabled && (this.render(), this.addEvents());
            }
            mouseDownHandler(t) {
              let e = this.chart.pointer?.normalize(t) || t,
                i = this.cursorToScrollbarPosition(e);
              (this.chartX = i.chartX),
                (this.chartY = i.chartY),
                (this.initPositions = [this.from, this.to]),
                (this.grabbedCenter = !0);
            }
            mouseMoveHandler(t) {
              let e;
              let i = this.chart.pointer?.normalize(t) || t,
                s = this.options.vertical ? "chartY" : "chartX",
                o = this.initPositions || [];
              this.grabbedCenter &&
                (!t.touches || 0 !== t.touches[0][s]) &&
                ((e = this.cursorToScrollbarPosition(i)[s] - this[s]),
                (this.hasDragged = !0),
                this.updatePosition(o[0] + e, o[1] + e),
                this.hasDragged &&
                  c(this, "changed", {
                    from: this.from,
                    to: this.to,
                    trigger: "scrollbar",
                    DOMType: t.type,
                    DOMEvent: t,
                  }));
            }
            mouseUpHandler(t) {
              this.hasDragged &&
                c(this, "changed", {
                  from: this.from,
                  to: this.to,
                  trigger: "scrollbar",
                  DOMType: t.type,
                  DOMEvent: t,
                }),
                (this.grabbedCenter =
                  this.hasDragged =
                  this.chartX =
                  this.chartY =
                    null);
            }
            position(t, e, i, s) {
              let {
                  buttonsEnabled: o,
                  margin: r = 0,
                  vertical: a,
                } = this.options,
                n = this.rendered ? "animate" : "attr",
                l = s,
                h = 0;
              this.group.show(),
                (this.x = t),
                (this.y = e + this.trackBorderWidth),
                (this.width = i),
                (this.height = s),
                (this.xOffset = l),
                (this.yOffset = h),
                a
                  ? ((this.width = this.yOffset = i = h = this.size),
                    (this.xOffset = l = 0),
                    (this.yOffset = h = o ? this.size : 0),
                    (this.barWidth = s - (o ? 2 * i : 0)),
                    (this.x = t += r))
                  : ((this.height = s = this.size),
                    (this.xOffset = l = o ? this.size : 0),
                    (this.barWidth = i - (o ? 2 * s : 0)),
                    (this.y = this.y + r)),
                this.group[n]({ translateX: t, translateY: this.y }),
                this.track[n]({ width: i, height: s }),
                this.scrollbarButtons[1][n]({
                  translateX: a ? 0 : i - l,
                  translateY: a ? s - h : 0,
                });
            }
            removeEvents() {
              this._events.forEach(function (t) {
                g.apply(null, t);
              }),
                (this._events.length = 0);
            }
            render() {
              let t = this.renderer,
                e = this.options,
                i = this.size,
                s = this.chart.styledMode,
                o = t.g("scrollbar").attr({ zIndex: e.zIndex }).hide().add();
              (this.group = o),
                (this.track = t
                  .rect()
                  .addClass("highcharts-scrollbar-track")
                  .attr({ r: e.trackBorderRadius || 0, height: i, width: i })
                  .add(o)),
                s ||
                  this.track.attr({
                    fill: e.trackBackgroundColor,
                    stroke: e.trackBorderColor,
                    "stroke-width": e.trackBorderWidth,
                  });
              let r = (this.trackBorderWidth = this.track.strokeWidth());
              this.track.attr({ x: -l(0, r), y: -l(0, r) }),
                (this.scrollbarGroup = t.g().add(o)),
                (this.scrollbar = t
                  .rect()
                  .addClass("highcharts-scrollbar-thumb")
                  .attr({
                    height: i - r,
                    width: i - r,
                    r: e.barBorderRadius || 0,
                  })
                  .add(this.scrollbarGroup)),
                (this.scrollbarRifles = t
                  .path(
                    f.swapXY(
                      [
                        ["M", -3, i / 4],
                        ["L", -3, (2 * i) / 3],
                        ["M", 0, i / 4],
                        ["L", 0, (2 * i) / 3],
                        ["M", 3, i / 4],
                        ["L", 3, (2 * i) / 3],
                      ],
                      e.vertical
                    )
                  )
                  .addClass("highcharts-scrollbar-rifles")
                  .add(this.scrollbarGroup)),
                s ||
                  (this.scrollbar.attr({
                    fill: e.barBackgroundColor,
                    stroke: e.barBorderColor,
                    "stroke-width": e.barBorderWidth,
                  }),
                  this.scrollbarRifles.attr({
                    stroke: e.rifleColor,
                    "stroke-width": 1,
                  })),
                (this.scrollbarStrokeWidth = this.scrollbar.strokeWidth()),
                this.scrollbarGroup.translate(
                  -l(0, this.scrollbarStrokeWidth),
                  -l(0, this.scrollbarStrokeWidth)
                ),
                this.drawScrollbarButton(0),
                this.drawScrollbarButton(1);
            }
            setRange(t, e) {
              let i, s;
              let o = this.options,
                r = o.vertical,
                a = o.minWidth,
                l = this.barWidth,
                d =
                  !this.rendered ||
                  this.hasDragged ||
                  (this.chart.navigator && this.chart.navigator.hasDragged)
                    ? "attr"
                    : "animate";
              if (!h(l)) return;
              let c = l * Math.min(e, 1);
              (i = Math.ceil(l * (t = Math.max(t, 0)))),
                (this.calculatedWidth = s = n(c - i)),
                s < a && ((i = (l - a + s) * t), (s = a));
              let p = Math.floor(i + this.xOffset + this.yOffset),
                u = s / 2 - 0.5;
              (this.from = t),
                (this.to = e),
                r
                  ? (this.scrollbarGroup[d]({ translateY: p }),
                    this.scrollbar[d]({ height: s }),
                    this.scrollbarRifles[d]({ translateY: u }),
                    (this.scrollbarTop = p),
                    (this.scrollbarLeft = 0))
                  : (this.scrollbarGroup[d]({ translateX: p }),
                    this.scrollbar[d]({ width: s }),
                    this.scrollbarRifles[d]({ translateX: u }),
                    (this.scrollbarLeft = p),
                    (this.scrollbarTop = 0)),
                s <= 12
                  ? this.scrollbarRifles.hide()
                  : this.scrollbarRifles.show(),
                !1 === o.showFull &&
                  (t <= 0 && e >= 1 ? this.group.hide() : this.group.show()),
                (this.rendered = !0);
            }
            shouldUpdateExtremes(t) {
              return (
                u(
                  this.options.liveRedraw,
                  e.svg && !e.isTouchDevice && !this.chart.boosted
                ) ||
                "mouseup" === t ||
                "touchend" === t ||
                !h(t)
              );
            }
            trackClick(t) {
              let e = this.chart.pointer?.normalize(t) || t,
                i = this.to - this.from,
                s = this.y + this.scrollbarTop,
                o = this.x + this.scrollbarLeft;
              (this.options.vertical && e.chartY > s) ||
              (!this.options.vertical && e.chartX > o)
                ? this.updatePosition(this.from + i, this.to + i)
                : this.updatePosition(this.from - i, this.to - i),
                c(this, "changed", {
                  from: this.from,
                  to: this.to,
                  trigger: "scrollbar",
                  DOMEvent: t,
                });
            }
            update(t) {
              this.destroy(),
                this.init(
                  this.chart.renderer,
                  p(!0, this.options, t),
                  this.chart
                );
            }
            updatePosition(t, e) {
              e > 1 && ((t = n(1 - n(e - t))), (e = 1)),
                t < 0 && ((e = n(e - t)), (t = 0)),
                (this.from = t),
                (this.to = e);
            }
          }
          return (
            (f.defaultOptions = s),
            (r.scrollbar = p(!0, f.defaultOptions, r.scrollbar)),
            f
          );
        }
      ),
      i(
        e,
        "Stock/Navigator/Navigator.js",
        [
          e["Core/Axis/Axis.js"],
          e["Stock/Navigator/ChartNavigatorComposition.js"],
          e["Core/Defaults.js"],
          e["Core/Globals.js"],
          e["Core/Axis/NavigatorAxisComposition.js"],
          e["Stock/Navigator/NavigatorComposition.js"],
          e["Stock/Scrollbar/Scrollbar.js"],
          e["Core/Renderer/SVG/SVGRenderer.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s, o, r, a, n, l) {
          let { defaultOptions: h } = i,
            { isTouchDevice: d } = s,
            {
              prototype: { symbols: c },
            } = n,
            {
              addEvent: p,
              clamp: u,
              correctFloat: g,
              defined: f,
              destroyObjectProperties: m,
              erase: x,
              extend: y,
              find: b,
              fireEvent: v,
              isArray: S,
              isNumber: k,
              merge: M,
              pick: C,
              removeEvent: A,
              splat: w,
            } = l;
          function T(t, ...e) {
            let i = [].filter.call(e, k);
            if (i.length) return Math[t].apply(0, i);
          }
          class P {
            static compose(t, i, s) {
              e.compose(t, P), r.compose(t, i, s);
            }
            constructor(t) {
              (this.isDirty = !1), (this.scrollbarHeight = 0), this.init(t);
            }
            drawHandle(t, e, i, s) {
              let o = this.navigatorOptions.handles.height;
              this.handles[e][s](
                i
                  ? {
                      translateX: Math.round(this.left + this.height / 2),
                      translateY: Math.round(
                        this.top + parseInt(t, 10) + 0.5 - o
                      ),
                    }
                  : {
                      translateX: Math.round(this.left + parseInt(t, 10)),
                      translateY: Math.round(
                        this.top + this.height / 2 - o / 2 - 1
                      ),
                    }
              );
            }
            drawOutline(t, e, i, s) {
              let o = this.navigatorOptions.maskInside,
                r = this.outline.strokeWidth(),
                a = r / 2,
                n = (r % 2) / 2,
                l = this.scrollButtonSize,
                h = this.size,
                d = this.top,
                c = this.height,
                p = d - a,
                u = d + c,
                g = this.left,
                f,
                m;
              i
                ? ((f = d + e + n),
                  (e = d + t + n),
                  (m = [
                    ["M", g + c, d - l - n],
                    ["L", g + c, f],
                    ["L", g, f],
                    ["M", g, e],
                    ["L", g + c, e],
                    ["L", g + c, d + h + l],
                  ]),
                  o && m.push(["M", g + c, f - a], ["L", g + c, e + a]))
                : ((g -= l),
                  (t += g + l - n),
                  (e += g + l - n),
                  (m = [
                    ["M", g, p],
                    ["L", t, p],
                    ["L", t, u],
                    ["M", e, u],
                    ["L", e, p],
                    ["L", g + h + 2 * l, p],
                  ]),
                  o && m.push(["M", t - a, p], ["L", e + a, p])),
                this.outline[s]({ d: m });
            }
            drawMasks(t, e, i, s) {
              let o, r, a, n;
              let l = this.left,
                h = this.top,
                d = this.height;
              i
                ? ((a = [l, l, l]),
                  (n = [h, h + t, h + e]),
                  (r = [d, d, d]),
                  (o = [t, e - t, this.size - e]))
                : ((a = [l, l + t, l + e]),
                  (n = [h, h, h]),
                  (r = [t, e - t, this.size - e]),
                  (o = [d, d, d])),
                this.shades.forEach((t, e) => {
                  t[s]({ x: a[e], y: n[e], width: r[e], height: o[e] });
                });
            }
            renderElements() {
              let t = this,
                e = t.navigatorOptions,
                i = e.maskInside,
                s = t.chart,
                o = s.inverted,
                r = s.renderer,
                a = { cursor: o ? "ns-resize" : "ew-resize" },
                n =
                  t.navigatorGroup ??
                  (t.navigatorGroup = r
                    .g("navigator")
                    .attr({ zIndex: 8, visibility: "hidden" })
                    .add());
              if (
                ([!i, i, !i].forEach((i, o) => {
                  let l =
                    t.shades[o] ??
                    (t.shades[o] = r
                      .rect()
                      .addClass(
                        "highcharts-navigator-mask" +
                          (1 === o ? "-inside" : "-outside")
                      )
                      .add(n));
                  s.styledMode ||
                    (l.attr({ fill: i ? e.maskFill : "rgba(0,0,0,0)" }),
                    1 === o && l.css(a));
                }),
                t.outline ||
                  (t.outline = r
                    .path()
                    .addClass("highcharts-navigator-outline")
                    .add(n)),
                s.styledMode ||
                  t.outline.attr({
                    "stroke-width": e.outlineWidth,
                    stroke: e.outlineColor,
                  }),
                e.handles?.enabled)
              ) {
                let i = e.handles,
                  { height: o, width: l } = i;
                [0, 1].forEach((e) => {
                  let h = i.symbols[e];
                  if (t.handles[e]) {
                    if (h !== t.handles[e].symbolName) {
                      let i = c[h].call(c, -l / 2 - 1, 0, l, o);
                      t.handles[e].attr({ d: i }),
                        (t.handles[e].symbolName = h);
                    }
                  } else
                    (t.handles[e] = r.symbol(h, -l / 2 - 1, 0, l, o, i)),
                      t.handles[e]
                        .attr({ zIndex: 7 - e })
                        .addClass(
                          "highcharts-navigator-handle highcharts-navigator-handle-" +
                            ["left", "right"][e]
                        )
                        .add(n);
                  s.inverted &&
                    t.handles[e].attr({
                      rotation: 90,
                      rotationOriginX: Math.floor(-l / 2),
                      rotationOriginY: (o + l) / 2,
                    }),
                    s.styledMode ||
                      t.handles[e]
                        .attr({
                          fill: i.backgroundColor,
                          stroke: i.borderColor,
                          "stroke-width": i.lineWidth,
                          width: i.width,
                          height: i.height,
                          x: -l / 2 - 1,
                          y: 0,
                        })
                        .css(a);
                });
              }
            }
            update(t, e = !1) {
              let i = this.chart,
                s = i.options.chart.inverted !== i.scrollbar?.options.vertical;
              if (
                (M(!0, i.options.navigator, t),
                (this.navigatorOptions = i.options.navigator || {}),
                this.setOpposite(),
                f(t.enabled) || s)
              )
                return (
                  this.destroy(),
                  (this.navigatorEnabled = t.enabled || this.navigatorEnabled),
                  this.init(i)
                );
              if (
                this.navigatorEnabled &&
                ((this.isDirty = !0),
                !1 === t.adaptToUpdatedData &&
                  this.baseSeries.forEach((t) => {
                    A(t, "updatedData", this.updatedDataHandler);
                  }, this),
                t.adaptToUpdatedData &&
                  this.baseSeries.forEach((t) => {
                    t.eventsToUnbind.push(
                      p(t, "updatedData", this.updatedDataHandler)
                    );
                  }, this),
                (t.series || t.baseSeries) && this.setBaseSeries(void 0, !1),
                t.height || t.xAxis || t.yAxis)
              ) {
                this.height = t.height ?? this.height;
                let e = this.getXAxisOffsets();
                this.xAxis.update(
                  {
                    ...t.xAxis,
                    offsets: e,
                    [i.inverted ? "width" : "height"]: this.height,
                    [i.inverted ? "height" : "width"]: void 0,
                  },
                  !1
                ),
                  this.yAxis.update(
                    {
                      ...t.yAxis,
                      [i.inverted ? "width" : "height"]: this.height,
                    },
                    !1
                  );
              }
              e && i.redraw();
            }
            render(t, e, i, s) {
              let o = this.chart,
                r = this.xAxis,
                a = r.pointRange || 0,
                n = r.navigatorAxis.fake ? o.xAxis[0] : r,
                l = this.navigatorEnabled,
                h = this.rendered,
                d = o.inverted,
                c = o.xAxis[0].minRange,
                p = o.xAxis[0].options.maxRange,
                m = this.scrollButtonSize,
                x,
                y,
                b,
                S = this.scrollbarHeight,
                M,
                A;
              if (this.hasDragged && !f(i)) return;
              if (
                (this.isDirty && this.renderElements(),
                (t = g(t - a / 2)),
                (e = g(e + a / 2)),
                !k(t) || !k(e))
              ) {
                if (!h) return;
                (i = 0), (s = C(r.width, n.width));
              }
              this.left = C(r.left, o.plotLeft + m + (d ? o.plotWidth : 0));
              let w =
                (this.size =
                M =
                  C(r.len, (d ? o.plotHeight : o.plotWidth) - 2 * m));
              (x = d ? S : M + 2 * m),
                (i = C(i, r.toPixels(t, !0))),
                (s = C(s, r.toPixels(e, !0))),
                (k(i) && Math.abs(i) !== 1 / 0) || ((i = 0), (s = x));
              let T = r.toValue(i, !0),
                P = r.toValue(s, !0),
                O = Math.abs(g(P - T));
              O < c
                ? this.grabbedLeft
                  ? (i = r.toPixels(P - c - a, !0))
                  : this.grabbedRight && (s = r.toPixels(T + c + a, !0))
                : f(p) &&
                  g(O - a) > p &&
                  (this.grabbedLeft
                    ? (i = r.toPixels(P - p - a, !0))
                    : this.grabbedRight && (s = r.toPixels(T + p + a, !0))),
                (this.zoomedMax = u(Math.max(i, s), 0, w)),
                (this.zoomedMin = u(
                  this.fixedWidth
                    ? this.zoomedMax - this.fixedWidth
                    : Math.min(i, s),
                  0,
                  w
                )),
                (this.range = this.zoomedMax - this.zoomedMin),
                (w = Math.round(this.zoomedMax));
              let L = Math.round(this.zoomedMin);
              l &&
                (this.navigatorGroup.attr({ visibility: "inherit" }),
                (A = h && !this.hasDragged ? "animate" : "attr"),
                this.drawMasks(L, w, d, A),
                this.drawOutline(L, w, d, A),
                this.navigatorOptions.handles.enabled &&
                  (this.drawHandle(L, 0, d, A), this.drawHandle(w, 1, d, A))),
                this.scrollbar &&
                  (d
                    ? ((b = this.top - m),
                      (y =
                        this.left -
                        S +
                        (l || !n.opposite
                          ? 0
                          : (n.titleOffset || 0) + n.axisTitleMargin)),
                      (S = M + 2 * m))
                    : ((b = this.top + (l ? this.height : -S)),
                      (y = this.left - m)),
                  this.scrollbar.position(y, b, x, S),
                  this.scrollbar.setRange(
                    this.zoomedMin / (M || 1),
                    this.zoomedMax / (M || 1)
                  )),
                (this.rendered = !0),
                (this.isDirty = !1),
                v(this, "afterRender");
            }
            addMouseEvents() {
              let t = this,
                e = t.chart,
                i = e.container,
                s = [],
                o,
                r;
              (t.mouseMoveHandler = o =
                function (e) {
                  t.onMouseMove(e);
                }),
                (t.mouseUpHandler = r =
                  function (e) {
                    t.onMouseUp(e);
                  }),
                (s = t.getPartsEvents("mousedown")).push(
                  p(e.renderTo, "mousemove", o),
                  p(i.ownerDocument, "mouseup", r),
                  p(e.renderTo, "touchmove", o),
                  p(i.ownerDocument, "touchend", r)
                ),
                s.concat(t.getPartsEvents("touchstart")),
                (t.eventsToUnbind = s),
                t.series &&
                  t.series[0] &&
                  s.push(
                    p(t.series[0].xAxis, "foundExtremes", function () {
                      e.navigator.modifyNavigatorAxisExtremes();
                    })
                  );
            }
            getPartsEvents(t) {
              let e = this,
                i = [];
              return (
                ["shades", "handles"].forEach(function (s) {
                  e[s].forEach(function (o, r) {
                    i.push(
                      p(o.element, t, function (t) {
                        e[s + "Mousedown"](t, r);
                      })
                    );
                  });
                }),
                i
              );
            }
            shadesMousedown(t, e) {
              t = this.chart.pointer?.normalize(t) || t;
              let i = this.chart,
                s = this.xAxis,
                o = this.zoomedMin,
                r = this.size,
                a = this.range,
                n = this.left,
                l = t.chartX,
                h,
                d,
                c,
                p;
              i.inverted && ((l = t.chartY), (n = this.top)),
                1 === e
                  ? ((this.grabbedCenter = l),
                    (this.fixedWidth = a),
                    (this.dragOffset = l - o))
                  : ((p = l - n - a / 2),
                    0 === e
                      ? (p = Math.max(0, p))
                      : 2 === e &&
                        p + a >= r &&
                        ((p = r - a),
                        this.reversedExtremes
                          ? ((p -= a), (d = this.getUnionExtremes().dataMin))
                          : (h = this.getUnionExtremes().dataMax)),
                    p !== o &&
                      ((this.fixedWidth = a),
                      f(
                        (c = s.navigatorAxis.toFixedRange(p, p + a, d, h)).min
                      ) &&
                        v(this, "setRange", {
                          min: Math.min(c.min, c.max),
                          max: Math.max(c.min, c.max),
                          redraw: !0,
                          eventArguments: { trigger: "navigator" },
                        })));
            }
            handlesMousedown(t, e) {
              t = this.chart.pointer?.normalize(t) || t;
              let i = this.chart,
                s = i.xAxis[0],
                o = this.reversedExtremes;
              0 === e
                ? ((this.grabbedLeft = !0),
                  (this.otherHandlePos = this.zoomedMax),
                  (this.fixedExtreme = o ? s.min : s.max))
                : ((this.grabbedRight = !0),
                  (this.otherHandlePos = this.zoomedMin),
                  (this.fixedExtreme = o ? s.max : s.min)),
                i.setFixedRange(void 0);
            }
            onMouseMove(t) {
              let e = this,
                i = e.chart,
                s = e.navigatorSize,
                o = e.range,
                r = e.dragOffset,
                a = i.inverted,
                n = e.left,
                l;
              (!t.touches || 0 !== t.touches[0].pageX) &&
                ((l = (t = i.pointer?.normalize(t) || t).chartX),
                a && ((n = e.top), (l = t.chartY)),
                e.grabbedLeft
                  ? ((e.hasDragged = !0),
                    e.render(0, 0, l - n, e.otherHandlePos))
                  : e.grabbedRight
                  ? ((e.hasDragged = !0),
                    e.render(0, 0, e.otherHandlePos, l - n))
                  : e.grabbedCenter &&
                    ((e.hasDragged = !0),
                    l < r ? (l = r) : l > s + r - o && (l = s + r - o),
                    e.render(0, 0, l - r, l - r + o)),
                e.hasDragged &&
                  e.scrollbar &&
                  C(
                    e.scrollbar.options.liveRedraw,
                    !d && !this.chart.boosted
                  ) &&
                  ((t.DOMType = t.type),
                  setTimeout(function () {
                    e.onMouseUp(t);
                  }, 0)));
            }
            onMouseUp(t) {
              let e, i, s, o, r, a;
              let n = this.chart,
                l = this.xAxis,
                h = this.scrollbar,
                d = t.DOMEvent || t,
                c = n.inverted,
                p = this.rendered && !this.hasDragged ? "animate" : "attr";
              ((this.hasDragged && (!h || !h.hasDragged)) ||
                "scrollbar" === t.trigger) &&
                ((s = this.getUnionExtremes()),
                this.zoomedMin === this.otherHandlePos
                  ? (o = this.fixedExtreme)
                  : this.zoomedMax === this.otherHandlePos &&
                    (r = this.fixedExtreme),
                this.zoomedMax === this.size &&
                  (r = this.reversedExtremes ? s.dataMin : s.dataMax),
                0 === this.zoomedMin &&
                  (o = this.reversedExtremes ? s.dataMax : s.dataMin),
                f(
                  (a = l.navigatorAxis.toFixedRange(
                    this.zoomedMin,
                    this.zoomedMax,
                    o,
                    r
                  )).min
                ) &&
                  v(this, "setRange", {
                    min: Math.min(a.min, a.max),
                    max: Math.max(a.min, a.max),
                    redraw: !0,
                    animation: !this.hasDragged && null,
                    eventArguments: {
                      trigger: "navigator",
                      triggerOp: "navigator-drag",
                      DOMEvent: d,
                    },
                  })),
                "mousemove" !== t.DOMType &&
                  "touchmove" !== t.DOMType &&
                  (this.grabbedLeft =
                    this.grabbedRight =
                    this.grabbedCenter =
                    this.fixedWidth =
                    this.fixedExtreme =
                    this.otherHandlePos =
                    this.hasDragged =
                    this.dragOffset =
                      null),
                this.navigatorEnabled &&
                  k(this.zoomedMin) &&
                  k(this.zoomedMax) &&
                  ((i = Math.round(this.zoomedMin)),
                  (e = Math.round(this.zoomedMax)),
                  this.shades && this.drawMasks(i, e, c, p),
                  this.outline && this.drawOutline(i, e, c, p),
                  this.navigatorOptions.handles.enabled &&
                    Object.keys(this.handles).length === this.handles.length &&
                    (this.drawHandle(i, 0, c, p), this.drawHandle(e, 1, c, p)));
            }
            removeEvents() {
              this.eventsToUnbind &&
                (this.eventsToUnbind.forEach(function (t) {
                  t();
                }),
                (this.eventsToUnbind = void 0)),
                this.removeBaseSeriesEvents();
            }
            removeBaseSeriesEvents() {
              let t = this.baseSeries || [];
              this.navigatorEnabled &&
                t[0] &&
                (!1 !== this.navigatorOptions.adaptToUpdatedData &&
                  t.forEach(function (t) {
                    A(t, "updatedData", this.updatedDataHandler);
                  }, this),
                t[0].xAxis &&
                  A(t[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes));
            }
            getXAxisOffsets() {
              return this.chart.inverted
                ? [this.scrollButtonSize, 0, -this.scrollButtonSize, 0]
                : [0, -this.scrollButtonSize, 0, this.scrollButtonSize];
            }
            init(e) {
              let i = e.options,
                s = i.navigator || {},
                r = s.enabled,
                n = i.scrollbar || {},
                l = n.enabled,
                h = (r && s.height) || 0,
                d = (l && n.height) || 0,
                c = (n.buttonsEnabled && d) || 0;
              (this.handles = []),
                (this.shades = []),
                (this.chart = e),
                this.setBaseSeries(),
                (this.height = h),
                (this.scrollbarHeight = d),
                (this.scrollButtonSize = c),
                (this.scrollbarEnabled = l),
                (this.navigatorEnabled = r),
                (this.navigatorOptions = s),
                (this.scrollbarOptions = n),
                this.setOpposite();
              let u = this,
                g = u.baseSeries,
                f = e.xAxis.length,
                m = e.yAxis.length,
                x = (g && g[0] && g[0].xAxis) || e.xAxis[0] || { options: {} };
              if (((e.isDirtyBox = !0), u.navigatorEnabled)) {
                let i = this.getXAxisOffsets();
                (u.xAxis = new t(
                  e,
                  M(
                    {
                      breaks: x.options.breaks,
                      ordinal: x.options.ordinal,
                      overscroll: x.options.overscroll,
                    },
                    s.xAxis,
                    {
                      type: "datetime",
                      yAxis: s.yAxis?.id,
                      index: f,
                      isInternal: !0,
                      offset: 0,
                      keepOrdinalPadding: !0,
                      startOnTick: !1,
                      endOnTick: !1,
                      minPadding: x.options.ordinal ? 0 : x.options.minPadding,
                      maxPadding: x.options.ordinal ? 0 : x.options.maxPadding,
                      zoomEnabled: !1,
                    },
                    e.inverted
                      ? { offsets: i, width: h }
                      : { offsets: i, height: h }
                  ),
                  "xAxis"
                )),
                  (u.yAxis = new t(
                    e,
                    M(
                      s.yAxis,
                      {
                        alignTicks: !1,
                        offset: 0,
                        index: m,
                        isInternal: !0,
                        reversed: C(
                          s.yAxis && s.yAxis.reversed,
                          e.yAxis[0] && e.yAxis[0].reversed,
                          !1
                        ),
                        zoomEnabled: !1,
                      },
                      e.inverted ? { width: h } : { height: h }
                    ),
                    "yAxis"
                  )),
                  g || s.series.data
                    ? u.updateNavigatorSeries(!1)
                    : 0 === e.series.length &&
                      (u.unbindRedraw = p(e, "beforeRedraw", function () {
                        e.series.length > 0 &&
                          !u.series &&
                          (u.setBaseSeries(), u.unbindRedraw());
                      })),
                  (u.reversedExtremes =
                    (e.inverted && !u.xAxis.reversed) ||
                    (!e.inverted && u.xAxis.reversed)),
                  u.renderElements(),
                  u.addMouseEvents();
              } else
                (u.xAxis = {
                  chart: e,
                  navigatorAxis: { fake: !0 },
                  translate: function (t, i) {
                    let s = e.xAxis[0],
                      o = s.getExtremes(),
                      r = s.len - 2 * c,
                      a = T("min", s.options.min, o.dataMin),
                      n = T("max", s.options.max, o.dataMax) - a;
                    return i ? (t * n) / r + a : (r * (t - a)) / n;
                  },
                  toPixels: function (t) {
                    return this.translate(t);
                  },
                  toValue: function (t) {
                    return this.translate(t, !0);
                  },
                }),
                  (u.xAxis.navigatorAxis.axis = u.xAxis),
                  (u.xAxis.navigatorAxis.toFixedRange =
                    o.prototype.toFixedRange.bind(u.xAxis.navigatorAxis));
              if (e.options.scrollbar.enabled) {
                let t = M(e.options.scrollbar, { vertical: e.inverted });
                !k(t.margin) &&
                  u.navigatorEnabled &&
                  (t.margin = e.inverted ? -3 : 3),
                  (e.scrollbar = u.scrollbar = new a(e.renderer, t, e)),
                  p(u.scrollbar, "changed", function (t) {
                    let e = u.size,
                      i = e * this.to,
                      s = e * this.from;
                    (u.hasDragged = u.scrollbar.hasDragged),
                      u.render(0, 0, s, i),
                      this.shouldUpdateExtremes(t.DOMType) &&
                        setTimeout(function () {
                          u.onMouseUp(t);
                        });
                  });
              }
              u.addBaseSeriesEvents(), u.addChartEvents();
            }
            setOpposite() {
              let t = this.navigatorOptions,
                e = this.navigatorEnabled,
                i = this.chart;
              this.opposite = C(t.opposite, !!(!e && i.inverted));
            }
            getUnionExtremes(t) {
              let e;
              let i = this.chart.xAxis[0],
                s = this.xAxis,
                o = s.options,
                r = i.options;
              return (
                (t && null === i.dataMin) ||
                  (e = {
                    dataMin: C(
                      o && o.min,
                      T("min", r.min, i.dataMin, s.dataMin, s.min)
                    ),
                    dataMax: C(
                      o && o.max,
                      T("max", r.max, i.dataMax, s.dataMax, s.max)
                    ),
                  }),
                e
              );
            }
            setBaseSeries(t, e) {
              let i = this.chart,
                s = (this.baseSeries = []);
              (t =
                t ||
                (i.options && i.options.navigator.baseSeries) ||
                (i.series.length
                  ? b(i.series, (t) => !t.options.isInternal).index
                  : 0)),
                (i.series || []).forEach((e, i) => {
                  !e.options.isInternal &&
                    (e.options.showInNavigator ||
                      ((i === t || e.options.id === t) &&
                        !1 !== e.options.showInNavigator)) &&
                    s.push(e);
                }),
                this.xAxis &&
                  !this.xAxis.navigatorAxis.fake &&
                  this.updateNavigatorSeries(!0, e);
            }
            updateNavigatorSeries(t, e) {
              let i = this,
                s = i.chart,
                o = i.baseSeries,
                r = {
                  enableMouseTracking: !1,
                  index: null,
                  linkedTo: null,
                  group: "nav",
                  padXAxis: !1,
                  xAxis: this.navigatorOptions.xAxis?.id,
                  yAxis: this.navigatorOptions.yAxis?.id,
                  showInLegend: !1,
                  stacking: void 0,
                  isInternal: !0,
                  states: { inactive: { opacity: 1 } },
                },
                a = (i.series = (i.series || []).filter((t) => {
                  let e = t.baseSeries;
                  return (
                    !(0 > o.indexOf(e)) ||
                    (e &&
                      (A(e, "updatedData", i.updatedDataHandler),
                      delete e.navigatorSeries),
                    t.chart && t.destroy(),
                    !1)
                  );
                })),
                n,
                l,
                d = i.navigatorOptions.series,
                c;
              o &&
                o.length &&
                o.forEach((t) => {
                  let p = t.navigatorSeries,
                    u = y(
                      { color: t.color, visible: t.visible },
                      S(d) ? h.navigator.series : d
                    );
                  if (p && !1 === i.navigatorOptions.adaptToUpdatedData) return;
                  (r.name = "Navigator " + o.length),
                    (c = (n = t.options || {}).navigatorOptions || {}),
                    (u.dataLabels = w(u.dataLabels)),
                    ((l = M(n, r, u, c)).pointRange = C(
                      u.pointRange,
                      c.pointRange,
                      h.plotOptions[l.type || "line"].pointRange
                    ));
                  let g = c.data || u.data;
                  (i.hasNavigatorData = i.hasNavigatorData || !!g),
                    (l.data = g || (n.data && n.data.slice(0))),
                    p && p.options
                      ? p.update(l, e)
                      : ((t.navigatorSeries = s.initSeries(l)),
                        s.setSortedData(),
                        (t.navigatorSeries.baseSeries = t),
                        a.push(t.navigatorSeries));
                }),
                ((d.data && !(o && o.length)) || S(d)) &&
                  ((i.hasNavigatorData = !1),
                  (d = w(d)).forEach((t, e) => {
                    (r.name = "Navigator " + (a.length + 1)),
                      ((l = M(
                        h.navigator.series,
                        {
                          color:
                            (s.series[e] &&
                              !s.series[e].options.isInternal &&
                              s.series[e].color) ||
                            s.options.colors[e] ||
                            s.options.colors[0],
                        },
                        r,
                        t
                      )).data = t.data),
                      l.data &&
                        ((i.hasNavigatorData = !0), a.push(s.initSeries(l)));
                  })),
                t && this.addBaseSeriesEvents();
            }
            addBaseSeriesEvents() {
              let t = this,
                e = t.baseSeries || [];
              e[0] &&
                e[0].xAxis &&
                e[0].eventsToUnbind.push(
                  p(e[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes)
                ),
                e.forEach((i) => {
                  i.eventsToUnbind.push(
                    p(i, "show", function () {
                      this.navigatorSeries &&
                        this.navigatorSeries.setVisible(!0, !1);
                    })
                  ),
                    i.eventsToUnbind.push(
                      p(i, "hide", function () {
                        this.navigatorSeries &&
                          this.navigatorSeries.setVisible(!1, !1);
                      })
                    ),
                    !1 !== this.navigatorOptions.adaptToUpdatedData &&
                      i.xAxis &&
                      i.eventsToUnbind.push(
                        p(i, "updatedData", this.updatedDataHandler)
                      ),
                    i.eventsToUnbind.push(
                      p(i, "remove", function () {
                        e && x(e, i),
                          this.navigatorSeries &&
                            (x(t.series, this.navigatorSeries),
                            f(this.navigatorSeries.options) &&
                              this.navigatorSeries.remove(!1),
                            delete this.navigatorSeries);
                      })
                    );
                });
            }
            getBaseSeriesMin(t) {
              return this.baseSeries.reduce(function (t, e) {
                return Math.min(t, e.xData && e.xData.length ? e.xData[0] : t);
              }, t);
            }
            modifyNavigatorAxisExtremes() {
              let t = this.xAxis;
              if (void 0 !== t.getExtremes) {
                let e = this.getUnionExtremes(!0);
                e &&
                  (e.dataMin !== t.min || e.dataMax !== t.max) &&
                  ((t.min = e.dataMin), (t.max = e.dataMax));
              }
            }
            modifyBaseAxisExtremes() {
              let t, e;
              let i = this.chart.navigator,
                s = this.getExtremes(),
                o = s.min,
                r = s.max,
                a = s.dataMin,
                n = s.dataMax,
                l = r - o,
                h = i.stickToMin,
                d = i.stickToMax,
                c = C(
                  this.ordinal?.convertOverscroll(this.options.overscroll),
                  0
                ),
                p = i.series && i.series[0],
                u = !!this.setExtremes;
              !(
                this.eventArgs &&
                "rangeSelectorButton" === this.eventArgs.trigger
              ) &&
                (h && (t = (e = a) + l),
                d &&
                  ((t = n + c),
                  h ||
                    (e = Math.max(
                      a,
                      t - l,
                      i.getBaseSeriesMin(
                        p && p.xData ? p.xData[0] : -Number.MAX_VALUE
                      )
                    ))),
                u &&
                  (h || d) &&
                  k(e) &&
                  ((this.min = this.userMin = e),
                  (this.max = this.userMax = t))),
                (i.stickToMin = i.stickToMax = null);
            }
            updatedDataHandler() {
              let t = this.chart.navigator,
                e = this.navigatorSeries,
                i = t.reversedExtremes
                  ? 0 === Math.round(t.zoomedMin)
                  : Math.round(t.zoomedMax) >= Math.round(t.size);
              (t.stickToMax = C(
                this.chart.options.navigator &&
                  this.chart.options.navigator.stickToMax,
                i
              )),
                (t.stickToMin = t.shouldStickToMin(this, t)),
                e &&
                  !t.hasNavigatorData &&
                  ((e.options.pointStart = this.xData[0]),
                  e.setData(this.options.data, !1, null, !1));
            }
            shouldStickToMin(t, e) {
              let i = e.getBaseSeriesMin(t.xData[0]),
                s = t.xAxis,
                o = s.max,
                r = s.min,
                a = s.options.range;
              return !!(k(o) && k(r)) && (a && o - i > 0 ? o - i < a : r <= i);
            }
            addChartEvents() {
              this.eventsToUnbind || (this.eventsToUnbind = []),
                this.eventsToUnbind.push(
                  p(this.chart, "redraw", function () {
                    let t = this.navigator,
                      e =
                        t &&
                        ((t.baseSeries &&
                          t.baseSeries[0] &&
                          t.baseSeries[0].xAxis) ||
                          this.xAxis[0]);
                    e && t.render(e.min, e.max);
                  }),
                  p(this.chart, "getMargins", function () {
                    let t = this.navigator,
                      e = t.opposite ? "plotTop" : "marginBottom";
                    this.inverted &&
                      (e = t.opposite ? "marginRight" : "plotLeft"),
                      (this[e] =
                        (this[e] || 0) +
                        (t.navigatorEnabled || !this.inverted
                          ? t.height + t.scrollbarHeight
                          : 0) +
                        t.navigatorOptions.margin);
                  }),
                  p(P, "setRange", function (t) {
                    this.chart.xAxis[0].setExtremes(
                      t.min,
                      t.max,
                      t.redraw,
                      t.animation,
                      t.eventArguments
                    );
                  })
                );
            }
            destroy() {
              this.removeEvents(),
                this.xAxis &&
                  (x(this.chart.xAxis, this.xAxis),
                  x(this.chart.axes, this.xAxis)),
                this.yAxis &&
                  (x(this.chart.yAxis, this.yAxis),
                  x(this.chart.axes, this.yAxis)),
                (this.series || []).forEach((t) => {
                  t.destroy && t.destroy();
                }),
                [
                  "series",
                  "xAxis",
                  "yAxis",
                  "shades",
                  "outline",
                  "scrollbarTrack",
                  "scrollbarRifles",
                  "scrollbarGroup",
                  "scrollbar",
                  "navigatorGroup",
                  "rendered",
                ].forEach((t) => {
                  this[t] && this[t].destroy && this[t].destroy(),
                    (this[t] = null);
                }),
                [this.handles].forEach((t) => {
                  m(t);
                }),
                (this.navigatorEnabled = !1);
            }
          }
          return P;
        }
      ),
      i(
        e,
        "Core/Axis/OrdinalAxis.js",
        [
          e["Core/Axis/Axis.js"],
          e["Core/Globals.js"],
          e["Core/Series/Series.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s) {
          var o;
          let {
            addEvent: r,
            correctFloat: a,
            css: n,
            defined: l,
            error: h,
            isNumber: d,
            pick: c,
            timeUnits: p,
            isString: u,
          } = s;
          return (
            (function (t) {
              function s(t, e, i, o, r = [], a = 0, n) {
                let d = {},
                  c = this.options.tickPixelInterval,
                  u = this.chart.time,
                  g = [],
                  f,
                  m,
                  x,
                  y,
                  b,
                  v = 0,
                  S = [],
                  k = -Number.MAX_VALUE;
                if (
                  (!this.options.ordinal && !this.options.breaks) ||
                  !r ||
                  r.length < 3 ||
                  void 0 === e
                )
                  return u.getTimeTicks.apply(u, arguments);
                let M = r.length;
                for (f = 0; f < M; f++) {
                  if (
                    ((b = f && r[f - 1] > i),
                    r[f] < e && (v = f),
                    f === M - 1 || r[f + 1] - r[f] > 5 * a || b)
                  ) {
                    if (r[f] > k) {
                      for (
                        m = u.getTimeTicks(t, r[v], r[f], o);
                        m.length && m[0] <= k;

                      )
                        m.shift();
                      m.length && (k = m[m.length - 1]),
                        g.push(S.length),
                        (S = S.concat(m));
                    }
                    v = f + 1;
                  }
                  if (b) break;
                }
                if (m) {
                  if (((y = m.info), n && y.unitRange <= p.hour)) {
                    for (v = 1, f = S.length - 1; v < f; v++)
                      u.dateFormat("%d", S[v]) !==
                        u.dateFormat("%d", S[v - 1]) &&
                        ((d[S[v]] = "day"), (x = !0));
                    x && (d[S[0]] = "day"), (y.higherRanks = d);
                  }
                  (y.segmentStarts = g), (S.info = y);
                } else h(12, !1, this.chart);
                if (n && l(c)) {
                  let t = S.length,
                    e = [],
                    s = [],
                    o,
                    r,
                    a,
                    n,
                    l,
                    h = t;
                  for (; h--; )
                    (r = this.translate(S[h])),
                      a && (s[h] = a - r),
                      (e[h] = a = r);
                  for (
                    s.sort((t, e) => t - e),
                      (n = s[Math.floor(s.length / 2)]) < 0.6 * c && (n = null),
                      h = S[t - 1] > i ? t - 1 : t,
                      a = void 0;
                    h--;

                  )
                    (l = Math.abs(a - (r = e[h]))),
                      a && l < 0.8 * c && (null === n || l < 0.8 * n)
                        ? (d[S[h]] && !d[S[h + 1]]
                            ? ((o = h + 1), (a = r))
                            : (o = h),
                          S.splice(o, 1))
                        : (a = r);
                }
                return S;
              }
              function o(t) {
                let e = this.ordinal.positions;
                if (!e) return t;
                let i = e.length - 1,
                  s;
                return (t < 0
                  ? (t = e[0])
                  : t > i
                  ? (t = e[i])
                  : ((i = Math.floor(t)), (s = t - i)),
                void 0 !== s && void 0 !== e[i])
                  ? e[i] + (s ? s * (e[i + 1] - e[i]) : 0)
                  : t;
              }
              function g(t) {
                let e = this.ordinal,
                  i = this.old ? this.old.min : this.min,
                  s = this.old ? this.old.transA : this.transA,
                  o = e.getExtendedPositions();
                if (o && o.length) {
                  let r = a((t - i) * s + this.minPixelPadding),
                    n = a(e.getIndexOfPoint(r, o)),
                    l = a(n % 1);
                  if (n >= 0 && n <= o.length - 1) {
                    let t = o[Math.floor(n)],
                      e = o[Math.ceil(n)];
                    return o[Math.floor(n)] + l * (e - t);
                  }
                }
                return t;
              }
              function f(e, i) {
                let s = t.Additions.findIndexOf(e, i, !0);
                if (e[s] === i) return s;
                let o = (i - e[s]) / (e[s + 1] - e[s]);
                return s + o;
              }
              function m() {
                this.ordinal || (this.ordinal = new t.Additions(this));
              }
              function x() {
                let { eventArgs: t, options: e } = this;
                if (
                  this.isXAxis &&
                  l(e.overscroll) &&
                  0 !== e.overscroll &&
                  d(this.max) &&
                  d(this.min) &&
                  (this.options.ordinal &&
                    !this.ordinal.originalOrdinalRange &&
                    this.ordinal.getExtendedPositions(!1),
                  this.max === this.dataMax &&
                    (t?.trigger !== "pan" || this.isInternal) &&
                    t?.trigger !== "navigator")
                ) {
                  let i = this.ordinal.convertOverscroll(e.overscroll);
                  (this.max += i),
                    !this.isInternal &&
                      l(this.userMin) &&
                      t?.trigger !== "mousewheel" &&
                      (this.min += i);
                }
              }
              function y() {
                this.horiz &&
                  !this.isDirty &&
                  (this.isDirty =
                    this.isOrdinal &&
                    this.chart.navigator &&
                    !this.chart.navigator.adaptToUpdatedData);
              }
              function b() {
                this.ordinal &&
                  (this.ordinal.beforeSetTickPositions(),
                  (this.tickInterval = this.ordinal.postProcessTickInterval(
                    this.tickInterval
                  )));
              }
              function v(t) {
                let e = this.xAxis[0],
                  i = e.ordinal.convertOverscroll(e.options.overscroll),
                  s = t.originalEvent.chartX,
                  o = this.options.chart.panning,
                  r = !1;
                if (
                  o &&
                  "y" !== o.type &&
                  e.options.ordinal &&
                  e.series.length &&
                  (!t.touches || t.touches.length <= 1)
                ) {
                  let t, o;
                  let a = this.mouseDownX,
                    l = e.getExtremes(),
                    h = l.dataMin,
                    d = l.dataMax,
                    c = l.min,
                    p = l.max,
                    u = this.hoverPoints,
                    g =
                      e.closestPointRange ||
                      (e.ordinal && e.ordinal.overscrollPointsRange),
                    f = Math.round(
                      (a - s) / (e.translationSlope * (e.ordinal.slope || g))
                    ),
                    m = e.ordinal.getExtendedPositions(),
                    x = {
                      ordinal: { positions: m, extendedOrdinalPositions: m },
                    },
                    y = e.index2val,
                    b = e.val2lin;
                  if ((c <= h && f < 0) || (p + i >= d && f > 0)) return;
                  x.ordinal.positions
                    ? Math.abs(f) > 1 &&
                      (u &&
                        u.forEach(function (t) {
                          t.setState();
                        }),
                      d > (o = x.ordinal.positions)[o.length - 1] && o.push(d),
                      this.setFixedRange(p - c),
                      (t = e.navigatorAxis.toFixedRange(
                        void 0,
                        void 0,
                        y.apply(x, [b.apply(x, [c, !0]) + f]),
                        y.apply(x, [b.apply(x, [p, !0]) + f])
                      )).min >= Math.min(l.dataMin, c) &&
                        t.max <= Math.max(d, p) + i &&
                        e.setExtremes(t.min, t.max, !0, !1, { trigger: "pan" }),
                      (this.mouseDownX = s),
                      n(this.container, { cursor: "move" }))
                    : (r = !0);
                } else r = !0;
                r || (o && /y/.test(o.type))
                  ? i && (e.max = e.dataMax + i)
                  : t.preventDefault();
              }
              function S() {
                let t = this.xAxis;
                t &&
                  t.options.ordinal &&
                  (delete t.ordinal.index,
                  delete t.ordinal.originalOrdinalRange);
              }
              function k(t, e) {
                let i;
                let s = this.ordinal,
                  o = s.positions,
                  r = s.slope,
                  a;
                if (!o) return t;
                let n = o.length;
                if (o[0] <= t && o[n - 1] >= t) i = f(o, t);
                else {
                  if (
                    !(
                      (a =
                        s.getExtendedPositions && s.getExtendedPositions()) &&
                      a.length
                    )
                  )
                    return t;
                  let n = a.length;
                  r || (r = (a[n - 1] - a[0]) / n);
                  let l = f(a, o[0]);
                  if (t >= a[0] && t <= a[n - 1]) i = f(a, t) - l;
                  else {
                    if (!e) return t;
                    i =
                      t < a[0]
                        ? -l - (a[0] - t) / r
                        : (t - a[n - 1]) / r + n - l;
                  }
                }
                return e ? i : r * (i || 0) + s.offset;
              }
              t.compose = function (t, e, i) {
                let a = t.prototype;
                return (
                  a.ordinal2lin ||
                    ((a.getTimeTicks = s),
                    (a.index2val = o),
                    (a.lin2val = g),
                    (a.val2lin = k),
                    (a.ordinal2lin = a.val2lin),
                    r(t, "afterInit", m),
                    r(t, "foundExtremes", x),
                    r(t, "afterSetScale", y),
                    r(t, "initialAxisTranslation", b),
                    r(i, "pan", v),
                    r(i, "touchpan", v),
                    r(e, "updatedData", S)),
                  t
                );
              };
              class M {
                constructor(t) {
                  (this.index = {}), (this.axis = t);
                }
                beforeSetTickPositions() {
                  let t = this.axis,
                    e = t.ordinal,
                    i = t.getExtremes(),
                    s = i.min,
                    o = i.max,
                    r = t.brokenAxis?.hasBreaks,
                    a = t.options.ordinal,
                    n,
                    l,
                    h,
                    d,
                    p,
                    u,
                    g,
                    f = [],
                    m = Number.MAX_VALUE,
                    x = !1,
                    y = !1,
                    b = !1;
                  if (a || r) {
                    let i = 0;
                    if (
                      (t.series.forEach(function (t, e) {
                        if (
                          ((l = []),
                          e > 0 &&
                            "highcharts-navigator-series" !== t.options.id &&
                            t.processedXData.length > 1 &&
                            (y =
                              i !== t.processedXData[1] - t.processedXData[0]),
                          (i = t.processedXData[1] - t.processedXData[0]),
                          t.boosted && (b = t.boosted),
                          t.reserveSpace() &&
                            (!1 !== t.takeOrdinalPosition || r) &&
                            ((n = (f = f.concat(t.processedXData)).length),
                            f.sort(function (t, e) {
                              return t - e;
                            }),
                            (m = Math.min(m, c(t.closestPointRange, m))),
                            n))
                        ) {
                          for (e = 0; e < n - 1; )
                            f[e] !== f[e + 1] && l.push(f[e + 1]), e++;
                          l[0] !== f[0] && l.unshift(f[0]), (f = l);
                        }
                      }),
                      t.ordinal.originalOrdinalRange ||
                        (t.ordinal.originalOrdinalRange = (f.length - 1) * m),
                      y && b && (f.pop(), f.shift()),
                      (n = f.length) > 2)
                    ) {
                      for (h = f[1] - f[0], g = n - 1; g-- && !x; )
                        f[g + 1] - f[g] !== h && (x = !0);
                      !t.options.keepOrdinalPadding &&
                        (f[0] - s > h || o - f[f.length - 1] > h) &&
                        (x = !0);
                    } else
                      t.options.overscroll &&
                        (2 === n
                          ? (m = f[1] - f[0])
                          : 1 === n
                          ? ((m = t.ordinal.convertOverscroll(
                              t.options.overscroll
                            )),
                            (f = [f[0], f[0] + m]))
                          : (m = e.overscrollPointsRange));
                    x || t.forceOrdinal
                      ? (t.options.overscroll &&
                          ((e.overscrollPointsRange = m),
                          (f = f.concat(e.getOverscrollPositions()))),
                        (e.positions = f),
                        (d = t.ordinal2lin(Math.max(s, f[0]), !0)),
                        (p = Math.max(
                          t.ordinal2lin(Math.min(o, f[f.length - 1]), !0),
                          1
                        )),
                        (e.slope = u = (o - s) / (p - d)),
                        (e.offset = s - d * u))
                      : ((e.overscrollPointsRange = c(
                          t.closestPointRange,
                          e.overscrollPointsRange
                        )),
                        (e.positions = t.ordinal.slope = e.offset = void 0));
                  }
                  (t.isOrdinal = a && x), (e.groupIntervalFactor = null);
                }
                static findIndexOf(t, e, i) {
                  let s = 0,
                    o = t.length - 1,
                    r;
                  for (; s < o; )
                    t[(r = Math.ceil((s + o) / 2))] <= e
                      ? (s = r)
                      : (o = r - 1);
                  return t[s] === e ? s : i ? s : -1;
                }
                getExtendedPositions(t = !0) {
                  let s = this,
                    o = s.axis,
                    r = o.constructor.prototype,
                    a = o.chart,
                    n = o.series[0]?.currentDataGrouping,
                    l = n ? n.count + n.unitName : "raw",
                    h = t
                      ? o.ordinal.convertOverscroll(o.options.overscroll)
                      : 0,
                    d = o.getExtremes(),
                    c,
                    p,
                    u = s.index;
                  return (
                    u || (u = s.index = {}),
                    u[l] ||
                      (((c = {
                        series: [],
                        chart: a,
                        forceOrdinal: !1,
                        getExtremes: function () {
                          return { min: d.dataMin, max: d.dataMax + h };
                        },
                        applyGrouping: r.applyGrouping,
                        getGroupPixelWidth: r.getGroupPixelWidth,
                        getTimeTicks: r.getTimeTicks,
                        options: { ordinal: !0 },
                        ordinal: {
                          getGroupIntervalFactor: this.getGroupIntervalFactor,
                        },
                        ordinal2lin: r.ordinal2lin,
                        getIndexOfPoint: r.getIndexOfPoint,
                        val2lin: r.val2lin,
                      }).ordinal.axis = c),
                      o.series.forEach(function (o) {
                        (p = {
                          xAxis: c,
                          xData: o.xData.slice(),
                          chart: a,
                          groupPixelWidth: o.groupPixelWidth,
                          destroyGroupedData: e.noop,
                          getProcessedData: i.prototype.getProcessedData,
                          applyGrouping: i.prototype.applyGrouping,
                          reserveSpace: i.prototype.reserveSpace,
                          visible: o.visible,
                        }),
                          t &&
                            (p.xData = p.xData.concat(
                              s.getOverscrollPositions()
                            )),
                          (p.options = {
                            dataGrouping: n
                              ? {
                                  firstAnchor:
                                    o.options.dataGrouping?.firstAnchor,
                                  anchor: o.options.dataGrouping?.anchor,
                                  lastAnchor:
                                    o.options.dataGrouping?.firstAnchor,
                                  enabled: !0,
                                  forced: !0,
                                  approximation: "open",
                                  units: [[n.unitName, [n.count]]],
                                }
                              : { enabled: !1 },
                          }),
                          c.series.push(p),
                          o.processData.apply(p);
                      }),
                      c.applyGrouping({ hasExtremesChanged: !0 }),
                      p?.closestPointRange !== p?.basePointRange &&
                        p.currentDataGrouping &&
                        (c.forceOrdinal = !0),
                      o.ordinal.beforeSetTickPositions.apply({ axis: c }),
                      !o.ordinal.originalOrdinalRange &&
                        c.ordinal.originalOrdinalRange &&
                        (o.ordinal.originalOrdinalRange =
                          c.ordinal.originalOrdinalRange),
                      (u[l] = c.ordinal.positions)),
                    u[l]
                  );
                }
                getGroupIntervalFactor(t, e, i) {
                  let s = i.processedXData,
                    o = s.length,
                    r = [],
                    a,
                    n,
                    l = this.groupIntervalFactor;
                  if (!l) {
                    for (n = 0; n < o - 1; n++) r[n] = s[n + 1] - s[n];
                    r.sort(function (t, e) {
                      return t - e;
                    }),
                      (a = r[Math.floor(o / 2)]),
                      (t = Math.max(t, s[0])),
                      (e = Math.min(e, s[o - 1])),
                      (this.groupIntervalFactor = l = (o * a) / (e - t));
                  }
                  return l;
                }
                getIndexOfPoint(t, e) {
                  let i;
                  let s = this.axis,
                    o = 0,
                    r = function (t) {
                      let { min: e, max: i } = s;
                      return (
                        !!(l(e) && l(i)) &&
                        t.points.some((t) => t.x >= e && t.x <= i)
                      );
                    };
                  s.series.forEach((t) => {
                    let e = t.points?.[0];
                    l(e?.plotX) &&
                      (e.plotX < i || !l(i)) &&
                      r(t) &&
                      ((i = e.plotX), (o = e.x));
                  }),
                    i ?? (i = s.minPixelPadding);
                  let n =
                      s.translationSlope *
                      (this.slope ||
                        s.closestPointRange ||
                        this.overscrollPointsRange),
                    h = a((t - i) / n);
                  return M.findIndexOf(e, o, !0) + h;
                }
                getOverscrollPositions() {
                  let t = this.axis,
                    e = this.convertOverscroll(t.options.overscroll),
                    i = this.overscrollPointsRange,
                    s = [],
                    o = t.dataMax;
                  if (l(i)) for (; o <= t.dataMax + e; ) s.push((o += i));
                  return s;
                }
                postProcessTickInterval(t) {
                  let e = this.axis,
                    i = this.slope;
                  return i
                    ? e.options.breaks
                      ? e.closestPointRange || t
                      : t / (i / e.closestPointRange)
                    : t;
                }
                convertOverscroll(t = 0) {
                  let e = this,
                    i = e.axis,
                    s = function (t) {
                      return (
                        c(
                          e.originalOrdinalRange,
                          l(i.dataMax) && l(i.dataMin)
                            ? i.dataMax - i.dataMin
                            : 0
                        ) * t
                      );
                    };
                  if (u(t)) {
                    let e = parseInt(t, 10);
                    if (/%$/.test(t)) return s(e / 100);
                    if (/px/.test(t)) {
                      let t = Math.min(e, 0.9 * i.len) / i.len;
                      return s(t / (1 - t));
                    }
                    return 0;
                  }
                  return t;
                }
              }
              t.Additions = M;
            })(o || (o = {})),
            o
          );
        }
      ),
      i(e, "Stock/RangeSelector/RangeSelectorDefaults.js", [], function () {
        return {
          lang: {
            rangeSelectorZoom: "Zoom",
            rangeSelectorFrom: "",
            rangeSelectorTo: "→",
          },
          rangeSelector: {
            allButtonsEnabled: !1,
            buttons: void 0,
            buttonSpacing: 5,
            dropdown: "responsive",
            enabled: void 0,
            verticalAlign: "top",
            buttonTheme: { width: 28, height: 18, padding: 2, zIndex: 7 },
            floating: !1,
            x: 0,
            y: 0,
            height: void 0,
            inputBoxBorderColor: "none",
            inputBoxHeight: 17,
            inputBoxWidth: void 0,
            inputDateFormat: "%e %b %Y",
            inputDateParser: void 0,
            inputEditDateFormat: "%Y-%m-%d",
            inputEnabled: !0,
            inputPosition: { align: "right", x: 0, y: 0 },
            inputSpacing: 5,
            selected: void 0,
            buttonPosition: { align: "left", x: 0, y: 0 },
            inputStyle: {
              color: "#334eff",
              cursor: "pointer",
              fontSize: "0.8em",
            },
            labelStyle: { color: "#666666", fontSize: "0.8em" },
          },
        };
      }),
      i(
        e,
        "Stock/RangeSelector/RangeSelectorComposition.js",
        [
          e["Core/Defaults.js"],
          e["Core/Globals.js"],
          e["Stock/RangeSelector/RangeSelectorDefaults.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s) {
          let o;
          let { defaultOptions: r } = t,
            { composed: a } = e,
            {
              addEvent: n,
              defined: l,
              extend: h,
              isNumber: d,
              merge: c,
              pick: p,
              pushUnique: u,
            } = s,
            g = [];
          function f() {
            let t, e;
            let i = this.range,
              s = i.type,
              o = this.max,
              r = this.chart.time,
              a = function (t, e) {
                let i = "year" === s ? "FullYear" : "Month",
                  o = new r.Date(t),
                  a = r.get(i, o);
                return (
                  r.set(i, o, a + e),
                  a === r.get(i, o) && r.set("Date", o, 0),
                  o.getTime() - t
                );
              };
            d(i)
              ? ((t = o - i), (e = i))
              : i &&
                ((t = o + a(o, -(i.count || 1))),
                this.chart && this.chart.setFixedRange(o - t));
            let n = p(this.dataMin, Number.MIN_VALUE);
            return (
              d(t) || (t = n),
              t <= n &&
                ((t = n),
                void 0 === e && (e = a(t, i.count)),
                (this.newMax = Math.min(
                  t + e,
                  p(this.dataMax, Number.MAX_VALUE)
                ))),
              d(o)
                ? !d(i) && i && i._offsetMin && (t += i._offsetMin)
                : (t = void 0),
              t
            );
          }
          function m() {
            this.options.rangeSelector &&
              this.options.rangeSelector.enabled &&
              (this.rangeSelector = new o(this));
          }
          function x() {
            let t = this.rangeSelector;
            if (t) {
              d(t.deferredYTDClick) &&
                (t.clickButton(t.deferredYTDClick), delete t.deferredYTDClick);
              let e = t.options.verticalAlign;
              t.options.floating ||
                ("bottom" === e
                  ? (this.extraBottomMargin = !0)
                  : "middle" === e || (this.extraTopMargin = !0));
            }
          }
          function y() {
            let t;
            let e = this.rangeSelector;
            if (!e) return;
            let i = this.xAxis[0].getExtremes(),
              s = this.legend,
              o = e && e.options.verticalAlign;
            d(i.min) && e.render(i.min, i.max),
              s.display &&
                "top" === o &&
                o === s.options.verticalAlign &&
                ((t = c(this.spacingBox)),
                "vertical" === s.options.layout
                  ? (t.y = this.plotTop)
                  : (t.y += e.getHeight()),
                (s.group.placed = !1),
                s.align(t));
          }
          function b() {
            for (let t = 0, e = g.length; t < e; ++t) {
              let e = g[t];
              if (e[0] === this) {
                e[1].forEach((t) => t()), g.splice(t, 1);
                return;
              }
            }
          }
          function v() {
            let t = this.rangeSelector;
            if (t) {
              let e = t.getHeight();
              this.extraTopMargin && (this.plotTop += e),
                this.extraBottomMargin && (this.marginBottom += e);
            }
          }
          function S(t) {
            let e = t.options.rangeSelector,
              i = this.extraBottomMargin,
              s = this.extraTopMargin,
              r = this.rangeSelector;
            if (
              (e &&
                e.enabled &&
                !l(r) &&
                this.options.rangeSelector &&
                ((this.options.rangeSelector.enabled = !0),
                (this.rangeSelector = r = new o(this))),
              (this.extraBottomMargin = !1),
              (this.extraTopMargin = !1),
              r)
            ) {
              let t =
                (e && e.verticalAlign) ||
                (r.options && r.options.verticalAlign);
              r.options.floating ||
                ("bottom" === t
                  ? (this.extraBottomMargin = !0)
                  : "middle" === t || (this.extraTopMargin = !0)),
                (this.extraBottomMargin !== i || this.extraTopMargin !== s) &&
                  (this.isDirtyBox = !0);
            }
          }
          return {
            compose: function (t, e, s) {
              if (((o = s), u(a, "RangeSelector"))) {
                let s = e.prototype;
                (t.prototype.minFromRange = f),
                  n(e, "afterGetContainer", m),
                  n(e, "beforeRender", x),
                  n(e, "destroy", b),
                  n(e, "getMargins", v),
                  n(e, "redraw", y),
                  n(e, "update", S),
                  s.callbacks.push(y),
                  h(r, { rangeSelector: i.rangeSelector }),
                  h(r.lang, i.lang);
              }
            },
          };
        }
      ),
      i(
        e,
        "Stock/RangeSelector/RangeSelector.js",
        [
          e["Core/Axis/Axis.js"],
          e["Core/Defaults.js"],
          e["Core/Globals.js"],
          e["Stock/RangeSelector/RangeSelectorComposition.js"],
          e["Core/Renderer/SVG/SVGElement.js"],
          e["Core/Utilities.js"],
          e["Core/Axis/OrdinalAxis.js"],
        ],
        function (e, i, s, o, r, a, n) {
          let { defaultOptions: l } = i,
            {
              addEvent: h,
              createElement: d,
              css: c,
              defined: p,
              destroyObjectProperties: u,
              discardElement: g,
              extend: f,
              fireEvent: m,
              isNumber: x,
              merge: y,
              objectEach: b,
              pad: v,
              pick: S,
              pInt: k,
              splat: M,
            } = a;
          class C {
            static compose(t, e) {
              o.compose(t, e, C);
            }
            constructor(t) {
              (this.buttonOptions = C.prototype.defaultButtons),
                (this.initialButtonGroupWidth = 0),
                this.init(t);
            }
            clickButton(t, i) {
              let s = this.chart,
                o = this.buttonOptions[t],
                r = s.xAxis[0],
                a = (s.scroller && s.scroller.getUnionExtremes()) || r || {},
                n = o.type,
                l = o.dataGrouping,
                d = a.dataMin,
                c = a.dataMax,
                u,
                g = r && Math.round(Math.min(r.max, S(c, r.max))),
                f,
                y = o._range,
                b,
                v,
                k,
                C = !0;
              if (null !== d && null !== c) {
                if (
                  (this.setSelected(t),
                  l &&
                    ((this.forcedDataGrouping = !0),
                    e.prototype.setDataGrouping.call(
                      r || { chart: this.chart },
                      l,
                      !1
                    ),
                    (this.frozenStates = o.preserveDataGrouping)),
                  "month" === n || "year" === n)
                )
                  r
                    ? ((v = {
                        range: o,
                        max: g,
                        chart: s,
                        dataMin: d,
                        dataMax: c,
                      }),
                      (u = r.minFromRange.call(v)),
                      x(v.newMax) && (g = v.newMax),
                      (C = !1))
                    : (y = o);
                else if (y)
                  (g = Math.min((u = Math.max(g - y, d)) + y, c)), (C = !1);
                else if ("ytd" === n) {
                  if (r)
                    (void 0 === c || void 0 === d) &&
                      ((d = Number.MAX_VALUE),
                      (c = Number.MIN_VALUE),
                      s.series.forEach((t) => {
                        let e = t.xData;
                        e &&
                          ((d = Math.min(e[0], d)),
                          (c = Math.max(e[e.length - 1], c)));
                      }),
                      (i = !1)),
                      (u = b =
                        (k = this.getYTDExtremes(c, d, s.time.useUTC)).min),
                      (g = k.max);
                  else {
                    this.deferredYTDClick = t;
                    return;
                  }
                } else
                  "all" === n &&
                    r &&
                    (s.navigator &&
                      s.navigator.baseSeries[0] &&
                      (s.navigator.baseSeries[0].xAxis.options.range = void 0),
                    (u = d),
                    (g = c));
                if (
                  (C && o._offsetMin && p(u) && (u += o._offsetMin),
                  o._offsetMax && p(g) && (g += o._offsetMax),
                  this.dropdown && (this.dropdown.selectedIndex = t + 1),
                  r)
                )
                  r.setExtremes(u, g, S(i, !0), void 0, {
                    trigger: "rangeSelectorButton",
                    rangeSelectorButton: o,
                  }),
                    s.setFixedRange(o._range);
                else {
                  f = M(s.options.xAxis)[0];
                  let t = h(s, "afterGetAxes", function () {
                    let t = s.xAxis[0];
                    (t.range = t.options.range = y),
                      (t.min = t.options.min = b);
                  });
                  h(s, "load", function () {
                    let e = s.xAxis[0];
                    s.setFixedRange(o._range),
                      (e.options.range = f.range),
                      (e.options.min = f.min),
                      t();
                  });
                }
                m(this, "afterBtnClick");
              }
            }
            setSelected(t) {
              this.selected = this.options.selected = t;
            }
            init(t) {
              let e = this,
                i = t.options.rangeSelector,
                s = i.buttons || e.defaultButtons.slice(),
                o = i.selected,
                r = function () {
                  let t = e.minInput,
                    i = e.maxInput;
                  t && t.blur && m(t, "blur"), i && i.blur && m(i, "blur");
                };
              (e.chart = t),
                (e.options = i),
                (e.buttons = []),
                (e.buttonOptions = s),
                (this.eventsToUnbind = []),
                this.eventsToUnbind.push(h(t.container, "mousedown", r)),
                this.eventsToUnbind.push(h(t, "resize", r)),
                s.forEach(e.computeButtonRange),
                void 0 !== o && s[o] && this.clickButton(o, !1),
                this.eventsToUnbind.push(
                  h(t, "load", function () {
                    t.xAxis &&
                      t.xAxis[0] &&
                      h(t.xAxis[0], "setExtremes", function (i) {
                        x(this.max) &&
                          x(this.min) &&
                          this.max - this.min !== t.fixedRange &&
                          "rangeSelectorButton" !== i.trigger &&
                          "updatedData" !== i.trigger &&
                          e.forcedDataGrouping &&
                          !e.frozenStates &&
                          this.setDataGrouping(!1, !1);
                      });
                  })
                ),
                this.createElements();
            }
            updateButtonStates() {
              let t = this,
                e = this.chart,
                i = this.dropdown,
                s = this.dropdownLabel,
                o = e.xAxis[0],
                r = Math.round(o.max - o.min),
                a = !o.hasVisibleSeries,
                h = 24 * 36e5,
                d = (e.scroller && e.scroller.getUnionExtremes()) || o,
                p = d.dataMin,
                u = d.dataMax,
                g = t.getYTDExtremes(u, p, e.time.useUTC),
                f = g.min,
                m = g.max,
                y = t.selected,
                b = t.options.allButtonsEnabled,
                v = Array(t.buttonOptions.length).fill(0),
                S = x(y),
                k = t.buttons,
                M = !1,
                C = null;
              t.buttonOptions.forEach((e, i) => {
                let s = e._range,
                  l = e.type,
                  d = e.count || 1,
                  c = e._offsetMax - e._offsetMin,
                  g = i === y,
                  x = s > u - p,
                  k = s < o.minRange,
                  A = !1,
                  w = s === r;
                if (
                  (g && x && (M = !0),
                  o.isOrdinal && o.ordinal?.positions && s && r < s)
                ) {
                  let t = o.ordinal.positions,
                    e = n.Additions.findIndexOf(t, o.min, !0),
                    i = Math.min(
                      n.Additions.findIndexOf(t, o.max, !0) + 1,
                      t.length - 1
                    );
                  t[i] - t[e] > s && (w = !0);
                } else
                  ("month" === l || "year" === l) &&
                  r + 36e5 >= { month: 28, year: 365 }[l] * h * d - c &&
                  r - 36e5 <= { month: 31, year: 366 }[l] * h * d + c
                    ? (w = !0)
                    : "ytd" === l
                    ? ((w = m - f + c === r), (A = !g))
                    : "all" === l && (w = o.max - o.min >= u - p);
                let T = !b && !(M && "all" === l) && (x || k || a),
                  P = (M && "all" === l) || (!A && w) || (g && t.frozenStates);
                T ? (v[i] = 3) : P && (!S || i === y) && (C = i);
              }),
                null !== C
                  ? ((v[C] = 2), t.setSelected(C))
                  : (t.setSelected(),
                    s &&
                      (s.setState(0),
                      s.attr({
                        text: (l.lang.rangeSelectorZoom || "") + " ▾",
                      })));
              for (let e = 0; e < v.length; e++) {
                let o = v[e],
                  r = k[e];
                if (r.state !== o && (r.setState(o), i)) {
                  (i.options[e + 1].disabled = 3 === o),
                    2 === o &&
                      (s &&
                        (s.setState(2),
                        s.attr({ text: t.buttonOptions[e].text + " ▾" })),
                      (i.selectedIndex = e + 1));
                  let r = s.getBBox();
                  c(i, { width: `${r.width}px`, height: `${r.height}px` });
                }
              }
            }
            computeButtonRange(t) {
              let e = t.type,
                i = t.count || 1,
                s = {
                  millisecond: 1,
                  second: 1e3,
                  minute: 6e4,
                  hour: 36e5,
                  day: 864e5,
                  week: 6048e5,
                };
              s[e]
                ? (t._range = s[e] * i)
                : ("month" === e || "year" === e) &&
                  (t._range = 24 * { month: 30, year: 365 }[e] * 36e5 * i),
                (t._offsetMin = S(t.offsetMin, 0)),
                (t._offsetMax = S(t.offsetMax, 0)),
                (t._range += t._offsetMax - t._offsetMin);
            }
            getInputValue(t) {
              let e = "min" === t ? this.minInput : this.maxInput,
                i = this.chart.options.rangeSelector,
                s = this.chart.time;
              return e
                ? (
                    ("text" === e.type && i.inputDateParser) ||
                    this.defaultInputDateParser
                  )(e.value, s.useUTC, s)
                : 0;
            }
            setInputValue(t, e) {
              let i = this.options,
                s = this.chart.time,
                o = "min" === t ? this.minInput : this.maxInput,
                r = "min" === t ? this.minDateBox : this.maxDateBox;
              if (o) {
                let t = o.getAttribute("data-hc-time"),
                  a = p(t) ? Number(t) : void 0;
                if (p(e)) {
                  let t = a;
                  p(t) && o.setAttribute("data-hc-time-previous", t),
                    o.setAttribute("data-hc-time", e),
                    (a = e);
                }
                (o.value = s.dateFormat(
                  this.inputTypeFormats[o.type] || i.inputEditDateFormat,
                  a
                )),
                  r && r.attr({ text: s.dateFormat(i.inputDateFormat, a) });
              }
            }
            setInputExtremes(t, e, i) {
              let s = "min" === t ? this.minInput : this.maxInput;
              if (s) {
                let t = this.inputTypeFormats[s.type],
                  o = this.chart.time;
                if (t) {
                  let r = o.dateFormat(t, e);
                  s.min !== r && (s.min = r);
                  let a = o.dateFormat(t, i);
                  s.max !== a && (s.max = a);
                }
              }
            }
            showInput(t) {
              let e = "min" === t ? this.minDateBox : this.maxDateBox,
                i = "min" === t ? this.minInput : this.maxInput;
              if (i && e && this.inputGroup) {
                let t = "text" === i.type,
                  { translateX: s = 0, translateY: o = 0 } = this.inputGroup,
                  { x: r = 0, width: a = 0, height: n = 0 } = e,
                  { inputBoxWidth: l } = this.options;
                c(i, {
                  width: t ? a + (l ? -2 : 20) + "px" : "auto",
                  height: n - 2 + "px",
                  border: "2px solid silver",
                }),
                  t && l
                    ? c(i, { left: s + r + "px", top: o + "px" })
                    : c(i, {
                        left:
                          Math.min(
                            Math.round(r + s - (i.offsetWidth - a) / 2),
                            this.chart.chartWidth - i.offsetWidth
                          ) + "px",
                        top: o - (i.offsetHeight - n) / 2 + "px",
                      });
              }
            }
            hideInput(t) {
              let e = "min" === t ? this.minInput : this.maxInput;
              e &&
                c(e, {
                  top: "-9999em",
                  border: 0,
                  width: "1px",
                  height: "1px",
                });
            }
            defaultInputDateParser(t, e, i) {
              let o = t.split("/").join("-").split(" ").join("T");
              if ((-1 === o.indexOf("T") && (o += "T00:00"), e)) o += "Z";
              else {
                let t;
                if (
                  s.isSafari &&
                  !(
                    (t = o).length > 6 &&
                    (t.lastIndexOf("-") === t.length - 6 ||
                      t.lastIndexOf("+") === t.length - 6)
                  )
                ) {
                  let t = new Date(o).getTimezoneOffset() / 60;
                  o += t <= 0 ? `+${v(-t)}:00` : `-${v(t)}:00`;
                }
              }
              let r = Date.parse(o);
              if (!x(r)) {
                let e = t.split("-");
                r = Date.UTC(k(e[0]), k(e[1]) - 1, k(e[2]));
              }
              return i && e && x(r) && (r += i.getTimezoneOffset(r)), r;
            }
            drawInput(t) {
              let { chart: e, div: i, inputGroup: o } = this,
                r = this,
                a = e.renderer.style || {},
                n = e.renderer,
                h = e.options.rangeSelector,
                p = l.lang,
                u = "min" === t;
              function g(t) {
                let { maxInput: i, minInput: s } = r,
                  o = e.xAxis[0],
                  a = e.scroller?.getUnionExtremes() || o,
                  n = a.dataMin,
                  l = a.dataMax,
                  h = e.xAxis[0].getExtremes()[t],
                  d = r.getInputValue(t);
                x(d) &&
                  d !== h &&
                  (u && i && x(n)
                    ? d > Number(i.getAttribute("data-hc-time"))
                      ? (d = void 0)
                      : d < n && (d = n)
                    : s &&
                      x(l) &&
                      (d < Number(s.getAttribute("data-hc-time"))
                        ? (d = void 0)
                        : d > l && (d = l)),
                  void 0 !== d &&
                    o.setExtremes(
                      u ? d : o.min,
                      u ? o.max : d,
                      void 0,
                      void 0,
                      { trigger: "rangeSelectorInput" }
                    ));
              }
              let m = p[u ? "rangeSelectorFrom" : "rangeSelectorTo"] || "",
                b = n
                  .label(m, 0)
                  .addClass("highcharts-range-label")
                  .attr({
                    padding: m ? 2 : 0,
                    height: m ? h.inputBoxHeight : 0,
                  })
                  .add(o),
                v = n
                  .label("", 0)
                  .addClass("highcharts-range-input")
                  .attr({
                    padding: 2,
                    width: h.inputBoxWidth,
                    height: h.inputBoxHeight,
                    "text-align": "center",
                  })
                  .on("click", function () {
                    r.showInput(t), r[t + "Input"].focus();
                  });
              e.styledMode ||
                v.attr({ stroke: h.inputBoxBorderColor, "stroke-width": 1 }),
                v.add(o);
              let S = d(
                "input",
                { name: t, className: "highcharts-range-selector" },
                void 0,
                i
              );
              S.setAttribute(
                "type",
                (function (t) {
                  if (-1 !== t.indexOf("%L")) return "text";
                  let e = [
                      "a",
                      "A",
                      "d",
                      "e",
                      "w",
                      "b",
                      "B",
                      "m",
                      "o",
                      "y",
                      "Y",
                    ].some((e) => -1 !== t.indexOf("%" + e)),
                    i = ["H", "k", "I", "l", "M", "S"].some(
                      (e) => -1 !== t.indexOf("%" + e)
                    );
                  return e && i
                    ? "datetime-local"
                    : e
                    ? "date"
                    : i
                    ? "time"
                    : "text";
                })(h.inputDateFormat || "%e %b %Y")
              ),
                e.styledMode ||
                  (b.css(y(a, h.labelStyle)),
                  v.css(y({ color: "#333333" }, a, h.inputStyle)),
                  c(
                    S,
                    f(
                      {
                        position: "absolute",
                        border: 0,
                        boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                        width: "1px",
                        height: "1px",
                        padding: 0,
                        textAlign: "center",
                        fontSize: a.fontSize,
                        fontFamily: a.fontFamily,
                        top: "-9999em",
                      },
                      h.inputStyle
                    )
                  )),
                (S.onfocus = () => {
                  r.showInput(t);
                }),
                (S.onblur = () => {
                  S === s.doc.activeElement && g(t),
                    r.hideInput(t),
                    r.setInputValue(t),
                    S.blur();
                });
              let k = !1;
              return (
                (S.onchange = () => {
                  k || (g(t), r.hideInput(t), S.blur());
                }),
                (S.onkeypress = (e) => {
                  13 === e.keyCode && g(t);
                }),
                (S.onkeydown = (e) => {
                  (k = !0),
                    ("ArrowUp" === e.key ||
                      "ArrowDown" === e.key ||
                      "Tab" === e.key) &&
                      g(t);
                }),
                (S.onkeyup = () => {
                  k = !1;
                }),
                { dateBox: v, input: S, label: b }
              );
            }
            getPosition() {
              let t = this.chart,
                e = t.options.rangeSelector,
                i = "top" === e.verticalAlign ? t.plotTop - t.axisOffset[0] : 0;
              return {
                buttonTop: i + e.buttonPosition.y,
                inputTop: i + e.inputPosition.y - 10,
              };
            }
            getYTDExtremes(t, e, i) {
              let s = this.chart.time,
                o = new s.Date(t),
                r = s.get("FullYear", o),
                a = Math.max(e, i ? s.Date.UTC(r, 0, 1) : +new s.Date(r, 0, 1)),
                n = o.getTime();
              return { max: Math.min(t || n, n), min: a };
            }
            createElements() {
              let t = this.chart,
                e = t.renderer,
                i = t.container,
                s = t.options,
                o = s.rangeSelector,
                r = o.inputEnabled,
                a = S(s.chart.style?.zIndex, 0) + 1;
              if (
                !1 !== o.enabled &&
                ((this.group = e
                  .g("range-selector-group")
                  .attr({ zIndex: 7 })
                  .add()),
                (this.div = d("div", void 0, {
                  position: "relative",
                  height: 0,
                  zIndex: a,
                })),
                this.buttonOptions.length && this.renderButtons(),
                i.parentNode && i.parentNode.insertBefore(this.div, i),
                r)
              ) {
                this.inputGroup = e.g("input-group").add(this.group);
                let t = this.drawInput("min");
                (this.minDateBox = t.dateBox),
                  (this.minLabel = t.label),
                  (this.minInput = t.input);
                let i = this.drawInput("max");
                (this.maxDateBox = i.dateBox),
                  (this.maxLabel = i.label),
                  (this.maxInput = i.input);
              }
            }
            render(t, e) {
              let i = this.chart,
                s = i.options.rangeSelector,
                o = s.inputEnabled;
              if (!1 !== s.enabled) {
                if (o) {
                  this.setInputValue("min", t), this.setInputValue("max", e);
                  let o =
                    (i.scroller && i.scroller.getUnionExtremes()) ||
                    i.xAxis[0] ||
                    {};
                  if (p(o.dataMin) && p(o.dataMax)) {
                    let t = i.xAxis[0].minRange || 0;
                    this.setInputExtremes(
                      "min",
                      o.dataMin,
                      Math.min(o.dataMax, this.getInputValue("max")) - t
                    ),
                      this.setInputExtremes(
                        "max",
                        Math.max(o.dataMin, this.getInputValue("min")) + t,
                        o.dataMax
                      );
                  }
                  if (this.inputGroup) {
                    let t = 0;
                    [
                      this.minLabel,
                      this.minDateBox,
                      this.maxLabel,
                      this.maxDateBox,
                    ].forEach((e) => {
                      if (e) {
                        let { width: i } = e.getBBox();
                        i && (e.attr({ x: t }), (t += i + s.inputSpacing));
                      }
                    });
                  }
                }
                this.alignElements(), this.updateButtonStates();
              }
            }
            renderButtons() {
              let { buttons: t, chart: e, options: i } = this,
                o = l.lang,
                r = e.renderer,
                a = y(i.buttonTheme),
                n = a && a.states,
                c = a.width || 28;
              delete a.width,
                delete a.states,
                (this.buttonGroup = r
                  .g("range-selector-buttons")
                  .add(this.group));
              let p = (this.dropdown = d(
                  "select",
                  void 0,
                  {
                    position: "absolute",
                    padding: 0,
                    border: 0,
                    cursor: "pointer",
                    opacity: 1e-4,
                  },
                  this.div
                )),
                u = e.userOptions.rangeSelector?.buttonTheme;
              (this.dropdownLabel = r
                .button(
                  "",
                  0,
                  0,
                  () => {},
                  y(a, {
                    "stroke-width": S(a["stroke-width"], 0),
                    width: "auto",
                    paddingLeft: S(i.buttonTheme.paddingLeft, u?.padding, 8),
                    paddingRight: S(i.buttonTheme.paddingRight, u?.padding, 8),
                  }),
                  n && n.hover,
                  n && n.select,
                  n && n.disabled
                )
                .hide()
                .add(this.group)),
                h(p, "touchstart", () => {
                  p.style.fontSize = "16px";
                });
              let g = s.isMS ? "mouseover" : "mouseenter",
                f = s.isMS ? "mouseout" : "mouseleave";
              h(p, g, () => {
                m(this.dropdownLabel.element, g);
              }),
                h(p, f, () => {
                  m(this.dropdownLabel.element, f);
                }),
                h(p, "change", () => {
                  m(this.buttons[p.selectedIndex - 1].element, "click");
                }),
                (this.zoomText = r
                  .label(o.rangeSelectorZoom || "", 0)
                  .attr({
                    padding: i.buttonTheme.padding,
                    height: i.buttonTheme.height,
                    paddingLeft: 0,
                    paddingRight: 0,
                  })
                  .add(this.buttonGroup)),
                this.chart.styledMode ||
                  (this.zoomText.css(i.labelStyle),
                  (a["stroke-width"] = S(a["stroke-width"], 0))),
                d(
                  "option",
                  { textContent: this.zoomText.textStr, disabled: !0 },
                  void 0,
                  p
                ),
                this.buttonOptions.forEach((e, i) => {
                  d("option", { textContent: e.title || e.text }, void 0, p),
                    (t[i] = r
                      .button(
                        e.text,
                        0,
                        0,
                        (t) => {
                          let s;
                          let o = e.events && e.events.click;
                          o && (s = o.call(e, t)),
                            !1 !== s && this.clickButton(i),
                            (this.isActive = !0);
                        },
                        a,
                        n && n.hover,
                        n && n.select,
                        n && n.disabled
                      )
                      .attr({ "text-align": "center", width: c })
                      .add(this.buttonGroup)),
                    e.title && t[i].attr("title", e.title);
                });
            }
            alignElements() {
              let {
                  buttonGroup: t,
                  buttons: e,
                  chart: i,
                  group: s,
                  inputGroup: o,
                  options: r,
                  zoomText: a,
                } = this,
                n = i.options,
                l =
                  n.exporting &&
                  !1 !== n.exporting.enabled &&
                  n.navigation &&
                  n.navigation.buttonOptions,
                { buttonPosition: h, inputPosition: d, verticalAlign: c } = r,
                p = (t, e) =>
                  l &&
                  this.titleCollision(i) &&
                  "top" === c &&
                  "right" === e.align &&
                  e.y - t.getBBox().height - 12 <
                    (l.y || 0) + (l.height || 0) + i.spacing[0]
                    ? -40
                    : 0,
                u = i.plotLeft;
              if (s && h && d) {
                let n = h.x - i.spacing[3];
                if (t) {
                  if ((this.positionButtons(), !this.initialButtonGroupWidth)) {
                    let t = 0;
                    a && (t += a.getBBox().width + 5),
                      e.forEach((i, s) => {
                        (t += i.width || 0),
                          s !== e.length - 1 && (t += r.buttonSpacing);
                      }),
                      (this.initialButtonGroupWidth = t);
                  }
                  u -= i.spacing[3];
                  let o = p(t, h);
                  this.alignButtonGroup(o),
                    this.buttonGroup?.translateY &&
                      this.dropdownLabel.attr({
                        y: this.buttonGroup.translateY,
                      }),
                    (s.placed = t.placed = i.hasLoaded);
                }
                let l = 0;
                o &&
                  ((l = p(o, d)),
                  "left" === d.align
                    ? (n = u)
                    : "right" === d.align &&
                      (n = -Math.max(i.axisOffset[1], -l)),
                  o.align(
                    {
                      y: d.y,
                      width: o.getBBox().width,
                      align: d.align,
                      x: d.x + n - 2,
                    },
                    !0,
                    i.spacingBox
                  ),
                  (o.placed = i.hasLoaded)),
                  this.handleCollision(l),
                  s.align({ verticalAlign: c }, !0, i.spacingBox);
                let g = s.alignAttr.translateY,
                  f = s.getBBox().height + 20,
                  m = 0;
                if ("bottom" === c) {
                  let t = i.legend && i.legend.options;
                  m =
                    g -
                    (f =
                      f +
                      (t &&
                      "bottom" === t.verticalAlign &&
                      t.enabled &&
                      !t.floating
                        ? i.legend.legendHeight + S(t.margin, 10)
                        : 0) -
                      20) -
                    (r.floating ? 0 : r.y) -
                    (i.titleOffset ? i.titleOffset[2] : 0) -
                    10;
                }
                "top" === c
                  ? (r.floating && (m = 0),
                    i.titleOffset && i.titleOffset[0] && (m = i.titleOffset[0]),
                    (m += i.margin[0] - i.spacing[0] || 0))
                  : "middle" === c &&
                    (d.y === h.y
                      ? (m = g)
                      : (d.y || h.y) &&
                        (d.y < 0 || h.y < 0
                          ? (m -= Math.min(d.y, h.y))
                          : (m = g - f))),
                  s.translate(r.x, r.y + Math.floor(m));
                let { minInput: x, maxInput: y, dropdown: b } = this;
                r.inputEnabled &&
                  x &&
                  y &&
                  ((x.style.marginTop = s.translateY + "px"),
                  (y.style.marginTop = s.translateY + "px")),
                  b && (b.style.marginTop = s.translateY + "px");
              }
            }
            alignButtonGroup(t, e) {
              let { chart: i, options: s, buttonGroup: o } = this,
                { buttonPosition: r } = s,
                a = i.plotLeft - i.spacing[3],
                n = r.x - i.spacing[3];
              "right" === r.align
                ? (n += t - a)
                : "center" === r.align && (n -= a / 2),
                o &&
                  o.align(
                    {
                      y: r.y,
                      width: S(e, this.initialButtonGroupWidth),
                      align: r.align,
                      x: n,
                    },
                    !0,
                    i.spacingBox
                  );
            }
            positionButtons() {
              let { buttons: t, chart: e, options: i, zoomText: s } = this,
                o = e.hasLoaded ? "animate" : "attr",
                { buttonPosition: r } = i,
                a = e.plotLeft,
                n = a;
              s &&
                "hidden" !== s.visibility &&
                (s[o]({ x: S(a + r.x, a) }),
                (n += r.x + s.getBBox().width + 5));
              for (let e = 0, s = this.buttonOptions.length; e < s; ++e)
                "hidden" !== t[e].visibility
                  ? (t[e][o]({ x: n }),
                    (n += (t[e].width || 0) + i.buttonSpacing))
                  : t[e][o]({ x: a });
            }
            handleCollision(t) {
              let { chart: e, buttonGroup: i, inputGroup: s } = this,
                {
                  buttonPosition: o,
                  dropdown: r,
                  inputPosition: a,
                } = this.options,
                n = () => {
                  let t = 0;
                  return (
                    this.buttons.forEach((e) => {
                      let i = e.getBBox();
                      i.width > t && (t = i.width);
                    }),
                    t
                  );
                },
                l = (e) => {
                  if (s?.alignOptions && i) {
                    let r =
                        s.alignAttr.translateX +
                        s.alignOptions.x -
                        t +
                        s.getBBox().x +
                        2,
                      n = s.alignOptions.width || 0,
                      l = i.alignAttr.translateX + i.getBBox().x;
                    return (
                      l + e > r && r + n > l && o.y < a.y + s.getBBox().height
                    );
                  }
                  return !1;
                },
                h = () => {
                  s &&
                    i &&
                    s.attr({
                      translateX:
                        s.alignAttr.translateX +
                        (e.axisOffset[1] >= -t ? 0 : -t),
                      translateY:
                        s.alignAttr.translateY + i.getBBox().height + 10,
                    });
                };
              if (i) {
                if ("always" === r) {
                  this.collapseButtons(), l(n()) && h();
                  return;
                }
                "never" === r && this.expandButtons();
              }
              s && i
                ? a.align === o.align || l(this.initialButtonGroupWidth + 20)
                  ? "responsive" === r
                    ? (this.collapseButtons(), l(n()) && h())
                    : h()
                  : "responsive" === r && this.expandButtons()
                : i &&
                  "responsive" === r &&
                  (this.initialButtonGroupWidth > e.plotWidth
                    ? this.collapseButtons()
                    : this.expandButtons());
            }
            collapseButtons() {
              let { buttons: t, zoomText: e } = this;
              !0 !== this.isCollapsed &&
                ((this.isCollapsed = !0),
                e.hide(),
                t.forEach((t) => void t.hide()),
                this.showDropdown());
            }
            expandButtons() {
              let { buttons: t, zoomText: e } = this;
              !1 !== this.isCollapsed &&
                ((this.isCollapsed = !1),
                this.hideDropdown(),
                e.show(),
                t.forEach((t) => void t.show()),
                this.positionButtons());
            }
            showDropdown() {
              let {
                buttonGroup: t,
                chart: e,
                dropdownLabel: i,
                dropdown: s,
              } = this;
              if (t && s) {
                let { translateX: o = 0, translateY: r = 0 } = t,
                  a = e.plotLeft + o;
                i.attr({ x: a, y: r }).show(),
                  c(s, {
                    left: a + "px",
                    top: r + "px",
                    visibility: "inherit",
                  }),
                  (this.hasVisibleDropdown = !0);
              }
            }
            hideDropdown() {
              let { dropdown: t } = this;
              t &&
                (this.dropdownLabel.hide(),
                c(t, { visibility: "hidden", width: "1px", height: "1px" }),
                (this.hasVisibleDropdown = !1));
            }
            getHeight() {
              let t = this.options,
                e = this.group,
                i = t.inputPosition,
                s = t.buttonPosition,
                o = t.y,
                r = s.y,
                a = i.y,
                n = 0;
              if (t.height) return t.height;
              this.alignElements(), (n = e ? e.getBBox(!0).height + 13 + o : 0);
              let l = Math.min(a, r);
              return (
                ((a < 0 && r < 0) || (a > 0 && r > 0)) && (n += Math.abs(l)), n
              );
            }
            titleCollision(t) {
              return !(t.options.title.text || t.options.subtitle.text);
            }
            update(t, e = !0) {
              let i = this.chart;
              y(!0, i.options.rangeSelector, t),
                this.destroy(),
                this.init(i),
                e && this.render();
            }
            destroy() {
              let e = this,
                i = e.minInput,
                s = e.maxInput;
              e.eventsToUnbind &&
                (e.eventsToUnbind.forEach((t) => t()),
                (e.eventsToUnbind = void 0)),
                u(e.buttons),
                i && (i.onfocus = i.onblur = i.onchange = null),
                s && (s.onfocus = s.onblur = s.onchange = null),
                b(
                  e,
                  function (i, s) {
                    i &&
                      "chart" !== s &&
                      (i instanceof r
                        ? i.destroy()
                        : i instanceof t.HTMLElement && g(i)),
                      i !== C.prototype[s] && (e[s] = null);
                  },
                  this
                );
            }
          }
          return (
            f(C.prototype, {
              defaultButtons: [
                { type: "month", count: 1, text: "1m", title: "View 1 month" },
                { type: "month", count: 3, text: "3m", title: "View 3 months" },
                { type: "month", count: 6, text: "6m", title: "View 6 months" },
                { type: "ytd", text: "YTD", title: "View year to date" },
                { type: "year", count: 1, text: "1y", title: "View 1 year" },
                { type: "all", text: "All", title: "View all" },
              ],
              inputTypeFormats: {
                "datetime-local": "%Y-%m-%dT%H:%M:%S",
                date: "%Y-%m-%d",
                time: "%H:%M:%S",
              },
            }),
            C
          );
        }
      ),
      i(
        e,
        "Core/Chart/StockChart.js",
        [
          e["Core/Chart/Chart.js"],
          e["Core/Templating.js"],
          e["Core/Defaults.js"],
          e["Stock/Navigator/NavigatorDefaults.js"],
          e["Stock/RangeSelector/RangeSelectorDefaults.js"],
          e["Stock/Scrollbar/ScrollbarDefaults.js"],
          e["Stock/Utilities/StockUtilities.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s, o, r, a, n) {
          let { format: l } = e,
            { getOptions: h } = i,
            { setFixedRange: d } = a,
            {
              addEvent: c,
              clamp: p,
              crisp: u,
              defined: g,
              extend: f,
              find: m,
              isNumber: x,
              isString: y,
              merge: b,
              pick: v,
              splat: S,
            } = n;
          function k(t, e, i) {
            return "xAxis" === t
              ? { minPadding: 0, maxPadding: 0, overscroll: 0, ordinal: !0 }
              : "yAxis" === t
              ? {
                  labels: { y: -2 },
                  opposite: i.opposite ?? e.opposite ?? !0,
                  showLastLabel: !!(e.categories || "category" === e.type),
                  title: {
                    text: i.title?.text !== "Values" ? i.title?.text : null,
                  },
                }
              : {};
          }
          function M(t, e) {
            if ("xAxis" === t) {
              let t = v(e.navigator && e.navigator.enabled, s.enabled, !0),
                i = { type: "datetime", categories: void 0 };
              return t && ((i.startOnTick = !1), (i.endOnTick = !1)), i;
            }
            return {};
          }
          class C extends t {
            init(t, e) {
              let i = h(),
                a = t.xAxis,
                n = t.yAxis,
                l = v(t.navigator && t.navigator.enabled, s.enabled, !0);
              t.xAxis = t.yAxis = void 0;
              let d = b(
                {
                  chart: {
                    panning: { enabled: !0, type: "x" },
                    zooming: { pinchType: "x", mouseWheel: { type: "x" } },
                  },
                  navigator: { enabled: l },
                  scrollbar: { enabled: v(r.enabled, !0) },
                  rangeSelector: { enabled: v(o.rangeSelector.enabled, !0) },
                  title: { text: null },
                  tooltip: {
                    split: v(i.tooltip && i.tooltip.split, !0),
                    crosshairs: !0,
                  },
                  legend: { enabled: !1 },
                },
                t,
                { isStock: !0 }
              );
              (t.xAxis = a),
                (t.yAxis = n),
                (d.xAxis = S(t.xAxis || {}).map((e) =>
                  b(k("xAxis", e, i.xAxis), e, M("xAxis", t))
                )),
                (d.yAxis = S(t.yAxis || {}).map((t) =>
                  b(k("yAxis", t, i.yAxis), t)
                )),
                super.init(d, e);
            }
            createAxis(t, e) {
              return (
                (e.axis = b(
                  k(t, e.axis, h()[t]),
                  e.axis,
                  M(t, this.userOptions)
                )),
                super.createAxis(t, e)
              );
            }
          }
          return (
            c(t, "update", function (t) {
              let e = t.options;
              "scrollbar" in e &&
                this.navigator &&
                (b(!0, this.options.scrollbar, e.scrollbar),
                this.navigator.update({
                  enabled: !!this.navigator.navigatorEnabled,
                }),
                delete e.scrollbar);
            }),
            (function (t) {
              function e(t) {
                if (
                  !this.crosshair ||
                  !this.crosshair.label ||
                  !this.crosshair.label.enabled ||
                  !this.cross ||
                  !x(this.min) ||
                  !x(this.max)
                )
                  return;
                let e = this.chart,
                  i = this.logarithmic,
                  s = this.crosshair.label,
                  o = this.horiz,
                  r = this.opposite,
                  a = this.left,
                  n = this.top,
                  h = this.width,
                  d = "inside" === this.options.tickPosition,
                  c = !1 !== this.crosshair.snap,
                  p = t.e || (this.cross && this.cross.e),
                  u = t.point,
                  g = this.crossLabel,
                  m,
                  y,
                  b = s.format,
                  S = "",
                  k,
                  M = 0,
                  C = this.min,
                  A = this.max;
                i && ((C = i.lin2log(this.min)), (A = i.lin2log(this.max)));
                let w = o
                  ? "center"
                  : r
                  ? "right" === this.labelAlign
                    ? "right"
                    : "left"
                  : "left" === this.labelAlign
                  ? "left"
                  : "center";
                g ||
                  ((g = this.crossLabel =
                    e.renderer
                      .label("", 0, void 0, s.shape || "callout")
                      .addClass(
                        "highcharts-crosshair-label highcharts-color-" +
                          (u && u.series
                            ? u.series.colorIndex
                            : this.series[0] && this.series[0].colorIndex)
                      )
                      .attr({
                        align: s.align || w,
                        padding: v(s.padding, 8),
                        r: v(s.borderRadius, 3),
                        zIndex: 2,
                      })
                      .add(this.labelGroup)),
                  e.styledMode ||
                    g
                      .attr({
                        fill:
                          s.backgroundColor ||
                          (u && u.series && u.series.color) ||
                          "#666666",
                        stroke: s.borderColor || "",
                        "stroke-width": s.borderWidth || 0,
                      })
                      .css(
                        f(
                          {
                            color: "#ffffff",
                            fontWeight: "normal",
                            fontSize: "0.7em",
                            textAlign: "center",
                          },
                          s.style || {}
                        )
                      )),
                  o
                    ? ((m = c ? (u.plotX || 0) + a : p.chartX),
                      (y = n + (r ? 0 : this.height)))
                    : ((m = a + this.offset + (r ? h : 0)),
                      (y = c ? (u.plotY || 0) + n : p.chartY)),
                  b ||
                    s.formatter ||
                    (this.dateTime && (S = "%b %d, %Y"),
                    (b = "{value" + (S ? ":" + S : "") + "}"));
                let T = c
                    ? this.isXAxis
                      ? u.x
                      : u.y
                    : this.toValue(o ? p.chartX : p.chartY),
                  P =
                    u && u.series
                      ? u.series.isPointInside(u)
                      : x(T) && T > C && T < A,
                  O = "";
                b
                  ? (O = l(b, { value: T }, e))
                  : s.formatter && x(T) && (O = s.formatter.call(this, T)),
                  g.attr({
                    text: O,
                    x: m,
                    y: y,
                    visibility: P ? "inherit" : "hidden",
                  });
                let L = g.getBBox();
                !x(g.x) || o || r || (m = g.x - L.width / 2),
                  x(g.y) &&
                    (o
                      ? ((d && !r) || (!d && r)) && (y = g.y - L.height)
                      : (y = g.y - L.height / 2)),
                  (k = o
                    ? { left: a, right: a + this.width }
                    : {
                        left: "left" === this.labelAlign ? a : 0,
                        right:
                          "right" === this.labelAlign
                            ? a + this.width
                            : e.chartWidth,
                      });
                let D = g.translateX || 0;
                D < k.left && (M = k.left - D),
                  D + L.width >= k.right && (M = -(D + L.width - k.right)),
                  g.attr({
                    x: m + M,
                    y: y,
                    anchorX: o ? m : this.opposite ? 0 : e.chartWidth,
                    anchorY: o
                      ? this.opposite
                        ? e.chartHeight
                        : 0
                      : y + L.height / 2,
                  });
              }
              function i() {
                this.crossLabel && (this.crossLabel = this.crossLabel.hide());
              }
              function s(t) {
                let e = this.chart,
                  i = this.options,
                  s = (e._labelPanes = e._labelPanes || {}),
                  o = i.labels;
                if (e.options.isStock && "yAxis" === this.coll) {
                  let e = i.top + "," + i.height;
                  !s[e] &&
                    o.enabled &&
                    (15 === o.distance && 1 === this.side && (o.distance = 0),
                    void 0 === o.align && (o.align = "right"),
                    (s[e] = this),
                    (t.align = "right"),
                    t.preventDefault());
                }
              }
              function o() {
                let t = this.chart,
                  e =
                    this.options &&
                    this.options.top + "," + this.options.height;
                e &&
                  t._labelPanes &&
                  t._labelPanes[e] === this &&
                  delete t._labelPanes[e];
              }
              function r(t) {
                let e = this,
                  i =
                    e.isLinked && !e.series && e.linkedParent
                      ? e.linkedParent.series
                      : e.series,
                  s = e.chart,
                  o = s.renderer,
                  r = e.left,
                  a = e.top,
                  n = [],
                  l = t.translatedValue,
                  h = t.value,
                  d = t.force,
                  c,
                  u,
                  f,
                  b,
                  S = [],
                  k,
                  M;
                if (
                  (s.options.isStock &&
                    !1 !== t.acrossPanes &&
                    "xAxis" === e.coll) ||
                  "yAxis" === e.coll
                ) {
                  for (let o of (t.preventDefault(),
                  (S = ((t) => {
                    let o = "xAxis" === t ? "yAxis" : "xAxis",
                      r = e.options[o];
                    return x(r)
                      ? [s[o][r]]
                      : y(r)
                      ? [s.get(r)]
                      : i.map((t) => t[o]);
                  })(e.coll)),
                  e.isXAxis ? s.yAxis : s.xAxis))
                    if (!o.options.isInternal) {
                      let t = o.isXAxis ? "yAxis" : "xAxis";
                      e === (g(o.options[t]) ? s[t][o.options[t]] : s[t][0]) &&
                        S.push(o);
                    }
                  for (let t of ((k = S.length
                    ? []
                    : [e.isXAxis ? s.yAxis[0] : s.xAxis[0]]),
                  S))
                    -1 !== k.indexOf(t) ||
                      m(k, (e) => e.pos === t.pos && e.len === t.len) ||
                      k.push(t);
                  if (
                    x((M = v(l, e.translate(h || 0, void 0, void 0, t.old))))
                  ) {
                    if (e.horiz)
                      for (let t of k) {
                        let i;
                        (b = (u = t.pos) + t.len),
                          (c = f = Math.round(M + e.transB)),
                          "pass" !== d &&
                            (c < r || c > r + e.width) &&
                            (d ? (c = f = p(c, r, r + e.width)) : (i = !0)),
                          i || n.push(["M", c, u], ["L", f, b]);
                      }
                    else
                      for (let t of k) {
                        let i;
                        (f = (c = t.pos) + t.len),
                          (u = b = Math.round(a + e.height - M)),
                          "pass" !== d &&
                            (u < a || u > a + e.height) &&
                            (d ? (u = b = p(u, a, a + e.height)) : (i = !0)),
                          i || n.push(["M", c, u], ["L", f, b]);
                      }
                  }
                  t.path =
                    n.length > 0
                      ? o.crispPolyLine(n, t.lineWidth || 1)
                      : void 0;
                }
              }
              function a(t) {
                if (this.chart.options.isStock) {
                  let e;
                  this.is("column") || this.is("columnrange")
                    ? (e = { borderWidth: 0, shadow: !1 })
                    : this.is("scatter") ||
                      this.is("sma") ||
                      (e = { marker: { enabled: !1, radius: 2 } }),
                    e &&
                      (t.plotOptions[this.type] = b(
                        t.plotOptions[this.type],
                        e
                      ));
                }
              }
              function n() {
                let t = this.chart,
                  e = this.options.dataGrouping;
                return (
                  !1 !== this.allowDG && e && v(e.enabled, t.options.isStock)
                );
              }
              function h(t, e) {
                for (let i = 0; i < t.length; i += 2) {
                  let s = t[i],
                    o = t[i + 1];
                  g(s[1]) && s[1] === o[1] && (s[1] = o[1] = u(s[1], e)),
                    g(s[2]) && s[2] === o[2] && (s[2] = o[2] = u(s[2], e));
                }
                return t;
              }
              (t.compose = function (t, l, p, u) {
                let g = p.prototype;
                g.forceCropping ||
                  (c(l, "afterDrawCrosshair", e),
                  c(l, "afterHideCrosshair", i),
                  c(l, "autoLabelAlign", s),
                  c(l, "destroy", o),
                  c(l, "getPlotLinePath", r),
                  (t.prototype.setFixedRange = d),
                  (g.forceCropping = n),
                  c(p, "setOptions", a),
                  (u.prototype.crispPolyLine = h));
              }),
                (t.stockChart = function (e, i, s) {
                  return new t(e, i, s);
                });
            })(C || (C = {})),
            C
          );
        }
      ),
      i(
        e,
        "Series/HLC/HLCPoint.js",
        [e["Core/Series/SeriesRegistry.js"]],
        function (t) {
          let {
            column: {
              prototype: { pointClass: e },
            },
          } = t.seriesTypes;
          return class extends e {};
        }
      ),
      i(e, "Series/HLC/HLCSeriesDefaults.js", [], function () {
        return {
          lineWidth: 1,
          tooltip: {
            pointFormat:
              '<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>',
          },
          threshold: null,
          states: { hover: { lineWidth: 3 } },
          stickyTracking: !0,
        };
      }),
      i(
        e,
        "Series/HLC/HLCSeries.js",
        [
          e["Series/HLC/HLCPoint.js"],
          e["Series/HLC/HLCSeriesDefaults.js"],
          e["Core/Series/SeriesRegistry.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s) {
          let { column: o } = i.seriesTypes,
            { crisp: r, extend: a, merge: n } = s;
          class l extends o {
            extendStem(t, e, i) {
              let s = t[0],
                o = t[1];
              "number" == typeof s[2] && (s[2] = Math.max(i + e, s[2])),
                "number" == typeof o[2] && (o[2] = Math.min(i - e, o[2]));
            }
            getPointPath(t, e) {
              let i = e.strokeWidth(),
                s = t.series,
                o = r(t.plotX || 0, i),
                a = Math.round(t.shapeArgs.width / 2),
                n = [
                  ["M", o, Math.round(t.yBottom)],
                  ["L", o, Math.round(t.plotHigh)],
                ];
              if (null !== t.close) {
                let e = r(t.plotClose, i);
                n.push(["M", o, e], ["L", o + a, e]), s.extendStem(n, i / 2, e);
              }
              return n;
            }
            drawSinglePoint(t) {
              let e = t.series,
                i = e.chart,
                s,
                o = t.graphic;
              void 0 !== t.plotY &&
                (o || (t.graphic = o = i.renderer.path().add(e.group)),
                i.styledMode ||
                  o.attr(e.pointAttribs(t, t.selected && "select")),
                (s = e.getPointPath(t, o)),
                o[o ? "animate" : "attr"]({ d: s }).addClass(
                  t.getClassName(),
                  !0
                ));
            }
            drawPoints() {
              this.points.forEach(this.drawSinglePoint);
            }
            init() {
              super.init.apply(this, arguments),
                (this.options.stacking = void 0);
            }
            pointAttribs(t, e) {
              let i = super.pointAttribs.call(this, t, e);
              return delete i.fill, i;
            }
            toYData(t) {
              return [t.high, t.low, t.close];
            }
            translate() {
              let t = this,
                e = t.yAxis,
                i = (this.pointArrayMap && this.pointArrayMap.slice()) || [],
                s = i.map(
                  (t) => `plot${t.charAt(0).toUpperCase() + t.slice(1)}`
                );
              s.push("yBottom"),
                i.push("low"),
                super.translate.apply(t),
                t.points.forEach(function (o) {
                  i.forEach(function (i, r) {
                    let a = o[i];
                    null !== a &&
                      (t.dataModify && (a = t.dataModify.modifyValue(a)),
                      (o[s[r]] = e.toPixels(a, !0)));
                  }),
                    (o.tooltipPos[1] = o.plotHigh + e.pos - t.chart.plotTop);
                });
            }
          }
          return (
            (l.defaultOptions = n(o.defaultOptions, e)),
            a(l.prototype, {
              pointClass: t,
              animate: null,
              directTouch: !1,
              pointArrayMap: ["high", "low", "close"],
              pointAttrToOptions: {
                stroke: "color",
                "stroke-width": "lineWidth",
              },
              pointValKey: "close",
            }),
            i.registerSeriesType("hlc", l),
            l
          );
        }
      ),
      i(
        e,
        "Series/OHLC/OHLCPoint.js",
        [e["Core/Series/SeriesRegistry.js"]],
        function (t) {
          let {
            seriesTypes: { hlc: e },
          } = t;
          class i extends e.prototype.pointClass {
            getClassName() {
              return (
                super.getClassName.call(this) +
                (this.open < this.close
                  ? " highcharts-point-up"
                  : " highcharts-point-down")
              );
            }
            resolveUpColor() {
              this.open < this.close &&
                !this.options.color &&
                this.series.options.upColor &&
                (this.color = this.series.options.upColor);
            }
            resolveColor() {
              super.resolveColor(),
                this.series.is("heikinashi") || this.resolveUpColor();
            }
            getZone() {
              let t = super.getZone();
              return this.resolveUpColor(), t;
            }
            applyOptions() {
              return (
                super.applyOptions.apply(this, arguments),
                this.resolveColor && this.resolveColor(),
                this
              );
            }
          }
          return i;
        }
      ),
      i(e, "Series/OHLC/OHLCSeriesDefaults.js", [], function () {
        return {
          tooltip: {
            pointFormat:
              '<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>',
          },
        };
      }),
      i(
        e,
        "Series/OHLC/OHLCSeries.js",
        [
          e["Core/Globals.js"],
          e["Series/OHLC/OHLCPoint.js"],
          e["Series/OHLC/OHLCSeriesDefaults.js"],
          e["Core/Series/SeriesRegistry.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s, o) {
          let { composed: r } = t,
            { hlc: a } = s.seriesTypes,
            { addEvent: n, crisp: l, extend: h, merge: d, pushUnique: c } = o;
          function p(t) {
            let e = t.options,
              i = e.dataGrouping;
            i &&
              e.useOhlcData &&
              "highcharts-navigator-series" !== e.id &&
              (i.approximation = "ohlc");
          }
          function u(t) {
            let e = t.options;
            e.useOhlcData &&
              "highcharts-navigator-series" !== e.id &&
              h(this, {
                pointValKey: g.prototype.pointValKey,
                pointArrayMap: g.prototype.pointArrayMap,
                toYData: g.prototype.toYData,
              });
          }
          class g extends a {
            static compose(t, ...e) {
              c(r, "OHLCSeries") &&
                (n(t, "afterSetOptions", p), n(t, "init", u));
            }
            getPointPath(t, e) {
              let i = super.getPointPath(t, e),
                s = e.strokeWidth(),
                o = l(t.plotX || 0, s),
                r = Math.round(t.shapeArgs.width / 2);
              if (null !== t.open) {
                let e = l(t.plotOpen, s);
                i.push(["M", o, e], ["L", o - r, e]),
                  super.extendStem(i, s / 2, e);
              }
              return i;
            }
            pointAttribs(t, e) {
              let i = super.pointAttribs.call(this, t, e),
                s = this.options;
              return (
                delete i.fill,
                !t.options.color &&
                  s.upColor &&
                  t.open < t.close &&
                  (i.stroke = s.upColor),
                i
              );
            }
            toYData(t) {
              return [t.open, t.high, t.low, t.close];
            }
          }
          return (
            (g.defaultOptions = d(a.defaultOptions, i)),
            h(g.prototype, {
              pointClass: e,
              pointArrayMap: ["open", "high", "low", "close"],
            }),
            s.registerSeriesType("ohlc", g),
            g
          );
        }
      ),
      i(e, "Series/Candlestick/CandlestickSeriesDefaults.js", [], function () {
        return {
          states: { hover: { lineWidth: 2 } },
          threshold: null,
          lineColor: "#000000",
          lineWidth: 1,
          upColor: "#ffffff",
          stickyTracking: !0,
        };
      }),
      i(
        e,
        "Series/Candlestick/CandlestickSeries.js",
        [
          e["Series/Candlestick/CandlestickSeriesDefaults.js"],
          e["Core/Series/SeriesRegistry.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i) {
          let { column: s, ohlc: o } = e.seriesTypes,
            { crisp: r, merge: a } = i;
          class n extends o {
            pointAttribs(t, e) {
              let i = s.prototype.pointAttribs.call(this, t, e),
                o = this.options,
                r = t.open < t.close,
                a = o.lineColor || this.color,
                n = t.color || this.color;
              if (
                ((i["stroke-width"] = o.lineWidth),
                (i.fill = t.options.color || (r && o.upColor) || n),
                (i.stroke = t.options.lineColor || (r && o.upLineColor) || a),
                e)
              ) {
                let t = o.states[e];
                (i.fill = t.color || i.fill),
                  (i.stroke = t.lineColor || i.stroke),
                  (i["stroke-width"] = t.lineWidth || i["stroke-width"]);
              }
              return i;
            }
            drawPoints() {
              let t = this.points,
                e = this.chart,
                i = this.yAxis.reversed;
              for (let s of t) {
                let t = s.graphic,
                  o,
                  a,
                  n,
                  l,
                  h,
                  d,
                  c,
                  p,
                  u,
                  g = !t;
                if (void 0 !== s.plotY) {
                  t || (s.graphic = t = e.renderer.path().add(this.group)),
                    this.chart.styledMode ||
                      t
                        .attr(this.pointAttribs(s, s.selected && "select"))
                        .shadow(this.options.shadow);
                  let f = t.strokeWidth();
                  (c = r(s.plotX || 0, f)),
                    (n = Math.min((o = s.plotOpen), (a = s.plotClose))),
                    (l = Math.max(o, a)),
                    (u = Math.round(s.shapeArgs.width / 2)),
                    (h = i
                      ? l !== s.yBottom
                      : Math.round(n) !== Math.round(s.plotHigh || 0)),
                    (d = i
                      ? Math.round(n) !== Math.round(s.plotHigh || 0)
                      : l !== s.yBottom),
                    (n = r(n, f)),
                    (l = r(l, f)),
                    (p = []).push(
                      ["M", c - u, l],
                      ["L", c - u, n],
                      ["L", c + u, n],
                      ["L", c + u, l],
                      ["Z"],
                      ["M", c, n],
                      ["L", c, h ? Math.round(i ? s.yBottom : s.plotHigh) : n],
                      ["M", c, l],
                      ["L", c, d ? Math.round(i ? s.plotHigh : s.yBottom) : l]
                    ),
                    t[g ? "attr" : "animate"]({ d: p }).addClass(
                      s.getClassName(),
                      !0
                    );
                }
              }
            }
          }
          return (
            (n.defaultOptions = a(
              o.defaultOptions,
              { tooltip: o.defaultOptions.tooltip },
              t
            )),
            e.registerSeriesType("candlestick", n),
            n
          );
        }
      ),
      i(
        e,
        "Series/Flags/FlagsPoint.js",
        [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]],
        function (t, e) {
          let {
              column: {
                prototype: { pointClass: i },
              },
            } = t.seriesTypes,
            { isNumber: s } = e;
          return class extends i {
            constructor() {
              super(...arguments), (this.ttBelow = !1);
            }
            isValid() {
              return s(this.y) || void 0 === this.y;
            }
            hasNewShapeType() {
              let t = this.options.shape || this.series.options.shape;
              return this.graphic && t && t !== this.graphic.symbolKey;
            }
          };
        }
      ),
      i(e, "Series/Flags/FlagsSeriesDefaults.js", [], function () {
        return {
          borderRadius: 0,
          pointRange: 0,
          allowOverlapX: !1,
          shape: "flag",
          stackDistance: 12,
          textAlign: "center",
          tooltip: { pointFormat: "{point.text}" },
          threshold: null,
          y: -30,
          fillColor: "#ffffff",
          lineWidth: 1,
          states: { hover: { lineColor: "#000000", fillColor: "#ccd3ff" } },
          style: { fontSize: "0.7em", fontWeight: "bold" },
        };
      }),
      i(
        e,
        "Series/Flags/FlagsSymbols.js",
        [e["Core/Renderer/RendererRegistry.js"]],
        function (t) {
          var e;
          return (
            (function (e) {
              let i = [];
              function s(t, e, i, s, o) {
                let r = (o && o.anchorX) || t,
                  a = (o && o.anchorY) || e,
                  n = this.circle(r - 1, a - 1, 2, 2);
                return (
                  n.push(
                    ["M", r, a],
                    ["L", t, e + s],
                    ["L", t, e],
                    ["L", t + i, e],
                    ["L", t + i, e + s],
                    ["L", t, e + s],
                    ["Z"]
                  ),
                  n
                );
              }
              function o(t, e) {
                t[e + "pin"] = function (i, s, o, r, a) {
                  let n;
                  let l = a && a.anchorX,
                    h = a && a.anchorY;
                  if (
                    ("circle" === e &&
                      r > o &&
                      ((i -= Math.round((r - o) / 2)), (o = r)),
                    (n = t[e](i, s, o, r, a)),
                    l && h)
                  ) {
                    let a = l;
                    if ("circle" === e) a = i + o / 2;
                    else {
                      let t = n[0],
                        e = n[1];
                      "M" === t[0] && "L" === e[0] && (a = (t[1] + e[1]) / 2);
                    }
                    let d = s > h ? s : s + r;
                    n.push(["M", a, d], ["L", l, h]),
                      (n = n.concat(t.circle(l - 1, h - 1, 2, 2)));
                  }
                  return n;
                };
              }
              e.compose = function (e) {
                if (-1 === i.indexOf(e)) {
                  i.push(e);
                  let t = e.prototype.symbols;
                  (t.flag = s), o(t, "circle"), o(t, "square");
                }
                let r = t.getRendererType();
                i.indexOf(r) && i.push(r);
              };
            })(e || (e = {})),
            e
          );
        }
      ),
      i(
        e,
        "Series/OnSeriesComposition.js",
        [
          e["Series/Column/ColumnSeries.js"],
          e["Core/Globals.js"],
          e["Core/Series/Series.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s) {
          var o;
          let { composed: r } = e,
            { prototype: a } = t,
            { prototype: n } = i,
            { defined: l, pushUnique: h, stableSort: d } = s;
          return (
            (function (t) {
              function e(t) {
                return n.getPlotBox.call(
                  (this.options.onSeries &&
                    this.chart.get(this.options.onSeries)) ||
                    this,
                  t
                );
              }
              function i() {
                a.translate.apply(this);
                let t = this,
                  e = t.options,
                  i = t.chart,
                  s = t.points,
                  o = e.onSeries,
                  r = o && i.get(o),
                  n = r && r.options.step,
                  h = r && r.points,
                  c = i.inverted,
                  p = t.xAxis,
                  u = t.yAxis,
                  g = s.length - 1,
                  f,
                  m,
                  x = e.onKey || "y",
                  y = h && h.length,
                  b = 0,
                  v,
                  S,
                  k,
                  M,
                  C;
                if (r && r.visible && y) {
                  for (
                    b = (r.pointXOffset || 0) + (r.barW || 0) / 2,
                      M = r.currentDataGrouping,
                      S = h[y - 1].x + (M ? M.totalRange : 0),
                      d(s, (t, e) => t.x - e.x),
                      x = "plot" + x[0].toUpperCase() + x.substr(1);
                    y-- && s[g];

                  )
                    if (
                      ((v = h[y]),
                      ((f = s[g]).y = v.y),
                      v.x <= f.x && void 0 !== v[x])
                    ) {
                      if (
                        f.x <= S &&
                        ((f.plotY = v[x]),
                        v.x < f.x && !n && (k = h[y + 1]) && void 0 !== k[x])
                      ) {
                        if (l(f.plotX) && r.is("spline")) {
                          let t = [v.plotX || 0, v.plotY || 0],
                            e = [k.plotX || 0, k.plotY || 0],
                            i = v.controlPoints?.high || t,
                            s = k.controlPoints?.low || e,
                            o = (o, r) =>
                              Math.pow(1 - o, 3) * t[r] +
                              3 * (1 - o) * (1 - o) * o * i[r] +
                              3 * (1 - o) * o * o * s[r] +
                              o * o * o * e[r],
                            r = 0,
                            a = 1,
                            n;
                          for (let t = 0; t < 100; t++) {
                            let t = (r + a) / 2,
                              e = o(t, 0);
                            if (null === e) break;
                            if (0.25 > Math.abs(e - f.plotX)) {
                              n = t;
                              break;
                            }
                            e < f.plotX ? (r = t) : (a = t);
                          }
                          l(n) &&
                            ((f.plotY = o(n, 1)),
                            (f.y = u.toValue(f.plotY, !0)));
                        } else
                          (C = (f.x - v.x) / (k.x - v.x)),
                            (f.plotY += C * (k[x] - v[x])),
                            (f.y += C * (k.y - v.y));
                      }
                      if ((g--, y++, g < 0)) break;
                    }
                }
                s.forEach((e, i) => {
                  let o;
                  (e.plotX += b),
                    (void 0 === e.plotY || c) &&
                      (e.plotX >= 0 && e.plotX <= p.len
                        ? c
                          ? ((e.plotY = p.translate(e.x, 0, 1, 0, 1)),
                            (e.plotX = l(e.y)
                              ? u.translate(e.y, 0, 0, 0, 1)
                              : 0))
                          : (e.plotY =
                              (p.opposite ? 0 : t.yAxis.len) + p.offset)
                        : (e.shapeArgs = {})),
                    (m = s[i - 1]) &&
                      m.plotX === e.plotX &&
                      (void 0 === m.stackIndex && (m.stackIndex = 0),
                      (o = m.stackIndex + 1)),
                    (e.stackIndex = o);
                }),
                  (this.onSeries = r);
              }
              (t.compose = function (t) {
                if (h(r, "OnSeries")) {
                  let s = t.prototype;
                  (s.getPlotBox = e), (s.translate = i);
                }
                return t;
              }),
                (t.getPlotBox = e),
                (t.translate = i);
            })(o || (o = {})),
            o
          );
        }
      ),
      i(
        e,
        "Series/Flags/FlagsSeries.js",
        [
          e["Series/Flags/FlagsPoint.js"],
          e["Series/Flags/FlagsSeriesDefaults.js"],
          e["Series/Flags/FlagsSymbols.js"],
          e["Core/Globals.js"],
          e["Series/OnSeriesComposition.js"],
          e["Core/Renderer/RendererUtilities.js"],
          e["Core/Series/SeriesRegistry.js"],
          e["Core/Renderer/SVG/SVGElement.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s, o, r, a, n, l) {
          let { noop: h } = s,
            { distribute: d } = r,
            {
              series: c,
              seriesTypes: { column: p },
            } = a,
            {
              addEvent: u,
              defined: g,
              extend: f,
              isNumber: m,
              merge: x,
              objectEach: y,
              wrap: b,
            } = l;
          class v extends p {
            animate(t) {
              t && this.setClip();
            }
            drawPoints() {
              let t, e, i, s, o, r, a, l, h, c, p;
              let u = this.points,
                f = this.chart,
                v = f.renderer,
                S = f.inverted,
                k = this.options,
                M = k.y,
                C = this.yAxis,
                A = {},
                w = [],
                T = m(k.borderRadius) ? k.borderRadius : 0;
              for (s = u.length; s--; )
                (o = u[s]),
                  (c = (S ? o.plotY : o.plotX) > this.xAxis.len),
                  (t = o.plotX),
                  (a = o.stackIndex),
                  (i = o.options.shape || k.shape),
                  void 0 !== (e = o.plotY) &&
                    (e = o.plotY + M - (void 0 !== a && a * k.stackDistance)),
                  (o.anchorX = a ? void 0 : o.plotX),
                  (l = a ? void 0 : o.plotY),
                  (p = "flag" !== i),
                  (r = o.graphic),
                  void 0 !== e && t >= 0 && !c
                    ? (r && o.hasNewShapeType() && (r = r.destroy()),
                      r ||
                        ((r = o.graphic =
                          v
                            .label("", 0, void 0, i, void 0, void 0, k.useHTML)
                            .addClass("highcharts-point")
                            .add(this.markerGroup)),
                        o.graphic.div && (o.graphic.div.point = o),
                        (r.isNew = !0)),
                      r.attr({
                        align: p ? "center" : "left",
                        width: k.width,
                        height: k.height,
                        "text-align": k.textAlign,
                        r: T,
                      }),
                      f.styledMode ||
                        r
                          .attr(this.pointAttribs(o))
                          .css(x(k.style, o.style))
                          .shadow(k.shadow),
                      t > 0 && (t -= r.strokeWidth() % 2),
                      (h = { y: e, anchorY: l }),
                      k.allowOverlapX && ((h.x = t), (h.anchorX = o.anchorX)),
                      r
                        .attr({ text: o.options.title ?? k.title ?? "A" })
                        [r.isNew ? "attr" : "animate"](h),
                      k.allowOverlapX ||
                        (A[o.plotX]
                          ? (A[o.plotX].size = Math.max(
                              A[o.plotX].size,
                              r.width || 0
                            ))
                          : (A[o.plotX] = {
                              align: p ? 0.5 : 0,
                              size: r.width || 0,
                              target: t,
                              anchorX: t,
                            })),
                      (o.tooltipPos = [t, e + C.pos - f.plotTop]))
                    : r && (o.graphic = r.destroy());
              if (!k.allowOverlapX) {
                let t = 100;
                for (let e of (y(A, function (e) {
                  (e.plotX = e.anchorX), w.push(e), (t = Math.max(e.size, t));
                }),
                d(w, S ? C.len : this.xAxis.len, t),
                u)) {
                  let t = e.plotX,
                    i = e.graphic,
                    s = i && A[t];
                  s &&
                    i &&
                    (g(s.pos)
                      ? (i[i.isNew ? "attr" : "animate"]({
                          x: s.pos + (s.align || 0) * s.size,
                          anchorX: e.anchorX,
                        }).show().isNew = !1)
                      : (i.hide().isNew = !0));
                }
              }
              k.useHTML &&
                this.markerGroup &&
                b(this.markerGroup, "on", function (t) {
                  return n.prototype.on.apply(
                    t.apply(this, [].slice.call(arguments, 1)),
                    [].slice.call(arguments, 1)
                  );
                });
            }
            drawTracker() {
              let t = this.points;
              for (let e of (super.drawTracker(), t)) {
                let i = e.graphic;
                i &&
                  (e.unbindMouseOver && e.unbindMouseOver(),
                  (e.unbindMouseOver = u(i.element, "mouseover", function () {
                    for (let s of (e.stackIndex > 0 &&
                      !e.raised &&
                      ((e._y = i.y), i.attr({ y: e._y - 8 }), (e.raised = !0)),
                    t))
                      s !== e &&
                        s.raised &&
                        s.graphic &&
                        (s.graphic.attr({ y: s._y }), (s.raised = !1));
                  })));
              }
            }
            pointAttribs(t, e) {
              let i = this.options,
                s = (t && t.color) || this.color,
                o = i.lineColor,
                r = t && t.lineWidth,
                a = (t && t.fillColor) || i.fillColor;
              return (
                e &&
                  ((a = i.states[e].fillColor),
                  (o = i.states[e].lineColor),
                  (r = i.states[e].lineWidth)),
                {
                  fill: a || s,
                  stroke: o || s,
                  "stroke-width": r || i.lineWidth || 0,
                }
              );
            }
            setClip() {
              c.prototype.setClip.apply(this, arguments),
                !1 !== this.options.clip &&
                  this.sharedClipKey &&
                  this.markerGroup &&
                  this.markerGroup.clip(
                    this.chart.sharedClips[this.sharedClipKey]
                  );
            }
          }
          return (
            (v.compose = i.compose),
            (v.defaultOptions = x(p.defaultOptions, e)),
            o.compose(v),
            f(v.prototype, {
              allowDG: !1,
              forceCrop: !0,
              invertible: !1,
              noSharedTooltip: !0,
              pointClass: t,
              sorted: !1,
              takeOrdinalPosition: !1,
              trackerGroups: ["markerGroup"],
              buildKDTree: h,
              init: c.prototype.init,
            }),
            a.registerSeriesType("flags", v),
            v
          );
        }
      ),
      i(
        e,
        "Core/Axis/BrokenAxis.js",
        [e["Core/Axis/Stacking/StackItem.js"], e["Core/Utilities.js"]],
        function (t, e) {
          var i;
          let {
            addEvent: s,
            find: o,
            fireEvent: r,
            isArray: a,
            isNumber: n,
            pick: l,
          } = e;
          return (
            (function (e) {
              function i() {
                void 0 !== this.brokenAxis &&
                  this.brokenAxis.setBreaks(this.options.breaks, !1);
              }
              function h() {
                this.brokenAxis?.hasBreaks && (this.options.ordinal = !1);
              }
              function d() {
                let t = this.brokenAxis;
                if (t?.hasBreaks) {
                  let e = this.tickPositions,
                    i = this.tickPositions.info,
                    s = [];
                  for (let i = 0; i < e.length; i++)
                    t.isInAnyBreak(e[i]) || s.push(e[i]);
                  (this.tickPositions = s), (this.tickPositions.info = i);
                }
              }
              function c() {
                this.brokenAxis || (this.brokenAxis = new m(this));
              }
              function p() {
                let {
                  isDirty: t,
                  options: { connectNulls: e },
                  points: i,
                  xAxis: s,
                  yAxis: o,
                } = this;
                if (t) {
                  let t = i.length;
                  for (; t--; ) {
                    let r = i[t],
                      a =
                        !(null === r.y && !1 === e) &&
                        (s?.brokenAxis?.isInAnyBreak(r.x, !0) ||
                          o?.brokenAxis?.isInAnyBreak(r.y, !0));
                    r.visible = !a && !1 !== r.options.visible;
                  }
                }
              }
              function u() {
                this.drawBreaks(this.xAxis, ["x"]),
                  this.drawBreaks(this.yAxis, l(this.pointArrayMap, ["y"]));
              }
              function g(t, e) {
                let i, s, o;
                let a = this,
                  h = a.points;
                if (t?.brokenAxis?.hasBreaks) {
                  let d = t.brokenAxis;
                  e.forEach(function (e) {
                    (i = d?.breakArray || []),
                      (s = t.isXAxis ? t.min : l(a.options.threshold, t.min));
                    let c = t?.options?.breaks?.filter(function (t) {
                      let e = !0;
                      for (let s = 0; s < i.length; s++) {
                        let o = i[s];
                        if (o.from === t.from && o.to === t.to) {
                          e = !1;
                          break;
                        }
                      }
                      return e;
                    });
                    h.forEach(function (a) {
                      (o = l(a["stack" + e.toUpperCase()], a[e])),
                        i.forEach(function (e) {
                          if (n(s) && n(o)) {
                            let i = "";
                            (s < e.from && o > e.to) ||
                            (s > e.from && o < e.from)
                              ? (i = "pointBreak")
                              : ((s < e.from && o > e.from && o < e.to) ||
                                  (s > e.from && o > e.to && o < e.from)) &&
                                (i = "pointInBreak"),
                              i && r(t, i, { point: a, brk: e });
                          }
                        }),
                        c?.forEach(function (e) {
                          r(t, "pointOutsideOfBreak", { point: a, brk: e });
                        });
                    });
                  });
                }
              }
              function f() {
                let e = this.currentDataGrouping,
                  i = e?.gapSize,
                  s = this.points.slice(),
                  o = this.yAxis,
                  r = this.options.gapSize,
                  a = s.length - 1;
                if (r && a > 0) {
                  let e, n;
                  for (
                    "value" !== this.options.gapUnit &&
                      (r *= this.basePointRange),
                      i && i > r && i >= this.basePointRange && (r = i);
                    a--;

                  )
                    if (
                      ((n && !1 !== n.visible) || (n = s[a + 1]),
                      (e = s[a]),
                      !1 !== n.visible && !1 !== e.visible)
                    ) {
                      if (n.x - e.x > r) {
                        let i = (e.x + n.x) / 2;
                        s.splice(a + 1, 0, { isNull: !0, x: i }),
                          o.stacking &&
                            this.options.stacking &&
                            ((o.stacking.stacks[this.stackKey][i] = new t(
                              o,
                              o.options.stackLabels,
                              !1,
                              i,
                              this.stack
                            )).total = 0);
                      }
                      n = e;
                    }
                }
                return this.getGraphPath(s);
              }
              e.compose = function (t, e) {
                if (!t.keepProps.includes("brokenAxis")) {
                  t.keepProps.push("brokenAxis"),
                    s(t, "init", c),
                    s(t, "afterInit", i),
                    s(t, "afterSetTickPositions", d),
                    s(t, "afterSetOptions", h);
                  let o = e.prototype;
                  (o.drawBreaks = g),
                    (o.gappedPath = f),
                    s(e, "afterGeneratePoints", p),
                    s(e, "afterRender", u);
                }
                return t;
              };
              class m {
                static isInBreak(t, e) {
                  let i = t.repeat || 1 / 0,
                    s = t.from,
                    o = t.to - t.from,
                    r = e >= s ? (e - s) % i : i - ((s - e) % i);
                  return t.inclusive ? r <= o : r < o && 0 !== r;
                }
                static lin2Val(t) {
                  let e = this.brokenAxis,
                    i = e && e.breakArray;
                  if (!i || !n(t)) return t;
                  let s = t,
                    o,
                    r;
                  for (r = 0; r < i.length && !((o = i[r]).from >= s); r++)
                    o.to < s ? (s += o.len) : m.isInBreak(o, s) && (s += o.len);
                  return s;
                }
                static val2Lin(t) {
                  let e = this.brokenAxis,
                    i = e && e.breakArray;
                  if (!i || !n(t)) return t;
                  let s = t,
                    o,
                    r;
                  for (r = 0; r < i.length; r++)
                    if ((o = i[r]).to <= t) s -= o.len;
                    else if (o.from >= t) break;
                    else if (m.isInBreak(o, t)) {
                      s -= t - o.from;
                      break;
                    }
                  return s;
                }
                constructor(t) {
                  (this.hasBreaks = !1), (this.axis = t);
                }
                findBreakAt(t, e) {
                  return o(e, function (e) {
                    return e.from < t && t < e.to;
                  });
                }
                isInAnyBreak(t, e) {
                  let i = this.axis,
                    s = i.options.breaks || [],
                    o = s.length,
                    r,
                    a,
                    h;
                  if (o && n(t)) {
                    for (; o--; )
                      m.isInBreak(s[o], t) &&
                        ((r = !0), a || (a = l(s[o].showPoints, !i.isXAxis)));
                    h = r && e ? r && !a : r;
                  }
                  return h;
                }
                setBreaks(t, e) {
                  let i = this,
                    s = i.axis,
                    o = a(t) && !!t.length && !!Object.keys(t[0]).length;
                  (s.isDirty = i.hasBreaks !== o),
                    (i.hasBreaks = o),
                    t !== s.options.breaks &&
                      (s.options.breaks = s.userOptions.breaks = t),
                    (s.forceRedraw = !0),
                    s.series.forEach(function (t) {
                      t.isDirty = !0;
                    }),
                    o ||
                      s.val2lin !== m.val2Lin ||
                      (delete s.val2lin, delete s.lin2val),
                    o &&
                      ((s.userOptions.ordinal = !1),
                      (s.lin2val = m.lin2Val),
                      (s.val2lin = m.val2Lin),
                      (s.setExtremes = function (t, e, o, r, a) {
                        if (i.hasBreaks) {
                          let s;
                          let o = this.options.breaks || [];
                          for (; (s = i.findBreakAt(t, o)); ) t = s.to;
                          for (; (s = i.findBreakAt(e, o)); ) e = s.from;
                          e < t && (e = t);
                        }
                        s.constructor.prototype.setExtremes.call(
                          this,
                          t,
                          e,
                          o,
                          r,
                          a
                        );
                      }),
                      (s.setAxisTranslation = function () {
                        if (
                          (s.constructor.prototype.setAxisTranslation.call(
                            this
                          ),
                          (i.unitLength = void 0),
                          i.hasBreaks)
                        ) {
                          let t = s.options.breaks || [],
                            e = [],
                            o = [],
                            a = l(s.pointRangePadding, 0),
                            h = 0,
                            d,
                            c,
                            p = s.userMin || s.min,
                            u = s.userMax || s.max,
                            g,
                            f;
                          t.forEach(function (t) {
                            (c = t.repeat || 1 / 0),
                              n(p) &&
                                n(u) &&
                                (m.isInBreak(t, p) &&
                                  (p += (t.to % c) - (p % c)),
                                m.isInBreak(t, u) &&
                                  (u -= (u % c) - (t.from % c)));
                          }),
                            t.forEach(function (t) {
                              if (
                                ((g = t.from),
                                (c = t.repeat || 1 / 0),
                                n(p) && n(u))
                              ) {
                                for (; g - c > p; ) g -= c;
                                for (; g < p; ) g += c;
                                for (f = g; f < u; f += c)
                                  e.push({ value: f, move: "in" }),
                                    e.push({
                                      value: f + t.to - t.from,
                                      move: "out",
                                      size: t.breakSize,
                                    });
                              }
                            }),
                            e.sort(function (t, e) {
                              return t.value === e.value
                                ? ("in" === t.move ? 0 : 1) -
                                    ("in" === e.move ? 0 : 1)
                                : t.value - e.value;
                            }),
                            (d = 0),
                            (g = p),
                            e.forEach(function (t) {
                              1 === (d += "in" === t.move ? 1 : -1) &&
                                "in" === t.move &&
                                (g = t.value),
                                0 === d &&
                                  n(g) &&
                                  (o.push({
                                    from: g,
                                    to: t.value,
                                    len: t.value - g - (t.size || 0),
                                  }),
                                  (h += t.value - g - (t.size || 0)));
                            }),
                            (i.breakArray = o),
                            n(p) &&
                              n(u) &&
                              n(s.min) &&
                              ((i.unitLength = u - p - h + a),
                              r(s, "afterBreaks"),
                              s.staticScale
                                ? (s.transA = s.staticScale)
                                : i.unitLength &&
                                  (s.transA *= (u - s.min + a) / i.unitLength),
                              a &&
                                (s.minPixelPadding =
                                  s.transA * (s.minPointOffset || 0)),
                              (s.min = p),
                              (s.max = u));
                        }
                      })),
                    l(e, !0) && s.chart.redraw();
                }
              }
              e.Additions = m;
            })(i || (i = {})),
            i
          );
        }
      ),
      i(
        e,
        "masters/modules/broken-axis.src.js",
        [e["Core/Globals.js"], e["Core/Axis/BrokenAxis.js"]],
        function (t, e) {
          return (
            (t.BrokenAxis = t.BrokenAxis || e),
            t.BrokenAxis.compose(t.Axis, t.Series),
            t
          );
        }
      ),
      i(e, "Extensions/DataGrouping/ApproximationRegistry.js", [], function () {
        return {};
      }),
      i(
        e,
        "Extensions/DataGrouping/ApproximationDefaults.js",
        [
          e["Extensions/DataGrouping/ApproximationRegistry.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e) {
          let {
            arrayMax: i,
            arrayMin: s,
            correctFloat: o,
            extend: r,
            isNumber: a,
          } = e;
          function n(t) {
            let e = t.length,
              i = l(t);
            return a(i) && e && (i = o(i / e)), i;
          }
          function l(t) {
            let e = t.length,
              i;
            if (!e && t.hasNulls) i = null;
            else if (e) for (i = 0; e--; ) i += t[e];
            return i;
          }
          let h = {
            average: n,
            averages: function () {
              let t = [];
              return (
                [].forEach.call(arguments, function (e) {
                  t.push(n(e));
                }),
                void 0 === t[0] ? void 0 : t
              );
            },
            close: function (t) {
              return t.length ? t[t.length - 1] : t.hasNulls ? null : void 0;
            },
            high: function (t) {
              return t.length ? i(t) : t.hasNulls ? null : void 0;
            },
            hlc: function (e, i, s) {
              if (
                ((e = t.high(e)),
                (i = t.low(i)),
                (s = t.close(s)),
                a(e) || a(i) || a(s))
              )
                return [e, i, s];
            },
            low: function (t) {
              return t.length ? s(t) : t.hasNulls ? null : void 0;
            },
            ohlc: function (e, i, s, o) {
              if (
                ((e = t.open(e)),
                (i = t.high(i)),
                (s = t.low(s)),
                (o = t.close(o)),
                a(e) || a(i) || a(s) || a(o))
              )
                return [e, i, s, o];
            },
            open: function (t) {
              return t.length ? t[0] : t.hasNulls ? null : void 0;
            },
            range: function (e, i) {
              return ((e = t.low(e)), (i = t.high(i)), a(e) || a(i))
                ? [e, i]
                : null === e && null === i
                ? null
                : void 0;
            },
            sum: l,
          };
          return r(t, h), h;
        }
      ),
      i(e, "Extensions/DataGrouping/DataGroupingDefaults.js", [], function () {
        return {
          common: {
            groupPixelWidth: 2,
            dateTimeLabelFormats: {
              millisecond: [
                "%A, %e %b, %H:%M:%S.%L",
                "%A, %e %b, %H:%M:%S.%L",
                "-%H:%M:%S.%L",
              ],
              second: [
                "%A, %e %b, %H:%M:%S",
                "%A, %e %b, %H:%M:%S",
                "-%H:%M:%S",
              ],
              minute: ["%A, %e %b, %H:%M", "%A, %e %b, %H:%M", "-%H:%M"],
              hour: ["%A, %e %b, %H:%M", "%A, %e %b, %H:%M", "-%H:%M"],
              day: ["%A, %e %b %Y", "%A, %e %b", "-%A, %e %b %Y"],
              week: ["Week from %A, %e %b %Y", "%A, %e %b", "-%A, %e %b %Y"],
              month: ["%B %Y", "%B", "-%B %Y"],
              year: ["%Y", "%Y", "-%Y"],
            },
          },
          seriesSpecific: {
            line: {},
            spline: {},
            area: {},
            areaspline: {},
            arearange: {},
            column: { groupPixelWidth: 10 },
            columnrange: { groupPixelWidth: 10 },
            candlestick: { groupPixelWidth: 10 },
            ohlc: { groupPixelWidth: 5 },
            hlc: { groupPixelWidth: 5 },
            heikinashi: { groupPixelWidth: 10 },
          },
          units: [
            ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
            ["second", [1, 2, 5, 10, 15, 30]],
            ["minute", [1, 2, 5, 10, 15, 30]],
            ["hour", [1, 2, 3, 4, 6, 8, 12]],
            ["day", [1]],
            ["week", [1]],
            ["month", [1, 3, 6]],
            ["year", null],
          ],
        };
      }),
      i(
        e,
        "Extensions/DataGrouping/DataGroupingAxisComposition.js",
        [
          e["Extensions/DataGrouping/DataGroupingDefaults.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e) {
          let i;
          let { addEvent: s, extend: o, merge: r, pick: a } = e;
          function n(t) {
            let e = this,
              i = e.series;
            i.forEach(function (t) {
              t.groupPixelWidth = void 0;
            }),
              i.forEach(function (i) {
                (i.groupPixelWidth =
                  e.getGroupPixelWidth && e.getGroupPixelWidth()),
                  i.groupPixelWidth && (i.hasProcessed = !0),
                  i.applyGrouping(!!t.hasExtremesChanged);
              });
          }
          function l() {
            let e = this.series,
              i = e.length,
              s = 0,
              o = !1,
              r,
              n;
            for (; i--; )
              (n = e[i].options.dataGrouping) &&
                ((s = Math.max(
                  s,
                  a(n.groupPixelWidth, t.common.groupPixelWidth)
                )),
                (r = (e[i].processedXData || e[i].data).length),
                (e[i].groupPixelWidth ||
                  r > this.chart.plotSizeX / s ||
                  (r && n.forced)) &&
                  (o = !0));
            return o ? s : 0;
          }
          function h() {
            this.series.forEach(function (t) {
              t.hasProcessed = !1;
            });
          }
          function d(t, e) {
            let s;
            if (
              ((e = a(e, !0)),
              t || (t = { forced: !1, units: null }),
              this instanceof i)
            )
              for (s = this.series.length; s--; )
                this.series[s].update({ dataGrouping: t }, !1);
            else
              this.chart.options.series.forEach(function (e) {
                e.dataGrouping =
                  "boolean" == typeof t ? t : r(t, e.dataGrouping);
              });
            this.ordinal && (this.ordinal.slope = void 0),
              e && this.chart.redraw();
          }
          return {
            compose: function (t) {
              i = t;
              let e = t.prototype;
              e.applyGrouping ||
                (s(t, "afterSetScale", h),
                s(t, "postProcessData", n),
                o(e, {
                  applyGrouping: n,
                  getGroupPixelWidth: l,
                  setDataGrouping: d,
                }));
            },
          };
        }
      ),
      i(
        e,
        "Extensions/DataGrouping/DataGroupingSeriesComposition.js",
        [
          e["Extensions/DataGrouping/ApproximationRegistry.js"],
          e["Extensions/DataGrouping/DataGroupingDefaults.js"],
          e["Core/Axis/DateTimeAxis.js"],
          e["Core/Defaults.js"],
          e["Core/Series/SeriesRegistry.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s, o, r) {
          let {
              series: { prototype: a },
            } = o,
            {
              addEvent: n,
              defined: l,
              error: h,
              extend: d,
              isNumber: c,
              merge: p,
              pick: u,
            } = r,
            g = a.generatePoints;
          function f(t) {
            var s;
            let o, r;
            let n = this.chart,
              d = this.options.dataGrouping,
              p = !1 !== this.allowDG && d && u(d.enabled, n.options.isStock),
              g = this.reserveSpace(),
              f = this.currentDataGrouping,
              m,
              x,
              y = !1;
            p && !this.requireSorting && (this.requireSorting = y = !0);
            let b =
              !1 ==
                !(
                  this.isCartesian &&
                  !this.isDirty &&
                  !this.xAxis.isDirty &&
                  !this.yAxis.isDirty &&
                  !t
                ) || !p;
            if ((y && (this.requireSorting = !1), b)) return;
            this.destroyGroupedData();
            let v = d.groupAll ? this.xData : this.processedXData,
              S = d.groupAll ? this.yData : this.processedYData,
              k = n.plotSizeX,
              M = this.xAxis,
              C = M.options.ordinal,
              A = this.groupPixelWidth;
            if (A && v && v.length && k) {
              (r = !0), (this.isDirty = !0), (this.points = null);
              let t = M.getExtremes(),
                p = t.min,
                u = t.max,
                f =
                  (C &&
                    M.ordinal &&
                    M.ordinal.getGroupIntervalFactor(p, u, this)) ||
                  1,
                y = ((A * (u - p)) / k) * f,
                b = M.getTimeTicks(
                  i.Additions.prototype.normalizeTimeTickInterval(
                    y,
                    d.units || e.units
                  ),
                  Math.min(p, v[0]),
                  Math.max(u, v[v.length - 1]),
                  M.options.startOfWeek,
                  v,
                  this.closestPointRange
                ),
                w = a.groupData.apply(this, [v, S, b, d.approximation]),
                T = w.groupedXData,
                P = w.groupedYData,
                O = 0;
              for (
                d &&
                  d.smoothed &&
                  T.length &&
                  ((d.firstAnchor = "firstPoint"),
                  (d.anchor = "middle"),
                  (d.lastAnchor = "lastPoint"),
                  h(32, !1, n, {
                    "dataGrouping.smoothed": "use dataGrouping.anchor",
                  })),
                  o = 1;
                o < b.length;
                o++
              )
                (b.info.segmentStarts &&
                  -1 !== b.info.segmentStarts.indexOf(o)) ||
                  (O = Math.max(b[o] - b[o - 1], O));
              ((m = b.info).gapSize = O),
                (this.closestPointRange = b.info.totalRange),
                (this.groupMap = w.groupMap),
                (this.currentDataGrouping = m),
                (function (t, e, i) {
                  let s = t.options.dataGrouping,
                    o = t.currentDataGrouping && t.currentDataGrouping.gapSize;
                  if (!(s && t.xData && o && t.groupMap)) return;
                  let r = e.length - 1,
                    a = s.anchor,
                    n = s.firstAnchor,
                    l = s.lastAnchor,
                    h = e.length - 1,
                    d = 0;
                  if (n && t.xData[0] >= e[0]) {
                    let i;
                    d++;
                    let s = t.groupMap[0].start,
                      r = t.groupMap[0].length;
                    c(s) && c(r) && (i = s + (r - 1)),
                      (e[0] = {
                        start: e[0],
                        middle: e[0] + 0.5 * o,
                        end: e[0] + o,
                        firstPoint: t.xData[0],
                        lastPoint: i && t.xData[i],
                      }[n]);
                  }
                  if (r > 0 && l && o && e[r] >= i - o) {
                    h--;
                    let i = t.groupMap[t.groupMap.length - 1].start;
                    e[r] = {
                      start: e[r],
                      middle: e[r] + 0.5 * o,
                      end: e[r] + o,
                      firstPoint: i && t.xData[i],
                      lastPoint: t.xData[t.xData.length - 1],
                    }[l];
                  }
                  if (a && "start" !== a) {
                    let t = o * { middle: 0.5, end: 1 }[a];
                    for (; h >= d; ) (e[h] += t), h--;
                  }
                })(this, T, u),
                g &&
                  (l((s = T)[0]) &&
                    c(M.min) &&
                    c(M.dataMin) &&
                    s[0] < M.min &&
                    (((!l(M.options.min) && M.min <= M.dataMin) ||
                      M.min === M.dataMin) &&
                      (M.min = Math.min(s[0], M.min)),
                    (M.dataMin = Math.min(s[0], M.dataMin))),
                  l(s[s.length - 1]) &&
                    c(M.max) &&
                    c(M.dataMax) &&
                    s[s.length - 1] > M.max &&
                    (((!l(M.options.max) &&
                      c(M.dataMax) &&
                      M.max >= M.dataMax) ||
                      M.max === M.dataMax) &&
                      (M.max = Math.max(s[s.length - 1], M.max)),
                    (M.dataMax = Math.max(s[s.length - 1], M.dataMax)))),
                d.groupAll &&
                  ((this.allGroupedData = P),
                  (T = (x = this.cropData(T, P, M.min, M.max)).xData),
                  (P = x.yData),
                  (this.cropStart = x.start)),
                (this.processedXData = T),
                (this.processedYData = P);
            } else (this.groupMap = null), (this.currentDataGrouping = void 0);
            (this.hasGroupedData = r),
              (this.preventGraphAnimation =
                (f && f.totalRange) !== (m && m.totalRange));
          }
          function m() {
            this.groupedData &&
              (this.groupedData.forEach(function (t, e) {
                t && (this.groupedData[e] = t.destroy ? t.destroy() : null);
              }, this),
              (this.groupedData.length = 0),
              delete this.allGroupedData);
          }
          function x() {
            g.apply(this),
              this.destroyGroupedData(),
              (this.groupedData = this.hasGroupedData ? this.points : null);
          }
          function y() {
            return this.is("arearange")
              ? "range"
              : this.is("ohlc")
              ? "ohlc"
              : this.is("hlc")
              ? "hlc"
              : this.is("column") || this.options.cumulative
              ? "sum"
              : "average";
          }
          function b(e, i, s, o) {
            let r = this,
              a = r.data,
              n = r.options && r.options.data,
              h = [],
              d = [],
              u = [],
              g = e.length,
              f = !!i,
              m = [],
              x = r.pointArrayMap,
              y = x && x.length,
              b = ["x"].concat(x || ["y"]),
              v =
                this.options.dataGrouping && this.options.dataGrouping.groupAll,
              S,
              k,
              M,
              C = 0,
              A = 0,
              w =
                "function" == typeof o
                  ? o
                  : o && t[o]
                  ? t[o]
                  : t[
                      (r.getDGApproximation && r.getDGApproximation()) ||
                        "average"
                    ];
            if (y) {
              let t = x.length;
              for (; t--; ) m.push([]);
            } else m.push([]);
            let T = y || 1;
            for (let t = 0; t <= g; t++)
              if (!(e[t] < s[0])) {
                for (; (void 0 !== s[C + 1] && e[t] >= s[C + 1]) || t === g; ) {
                  (S = s[C]),
                    (r.dataGroupInfo = {
                      start: v ? A : r.cropStart + A,
                      length: m[0].length,
                      groupStart: S,
                    }),
                    (M = w.apply(r, m)),
                    r.pointClass &&
                      !l(r.dataGroupInfo.options) &&
                      ((r.dataGroupInfo.options = p(
                        r.pointClass.prototype.optionsToObject.call(
                          { series: r },
                          r.options.data[r.cropStart + A]
                        )
                      )),
                      b.forEach(function (t) {
                        delete r.dataGroupInfo.options[t];
                      })),
                    void 0 !== M &&
                      (h.push(S), d.push(M), u.push(r.dataGroupInfo)),
                    (A = t);
                  for (let t = 0; t < T; t++)
                    (m[t].length = 0), (m[t].hasNulls = !1);
                  if (((C += 1), t === g)) break;
                }
                if (t === g) break;
                if (x) {
                  let e;
                  let i =
                      r.options.dataGrouping && r.options.dataGrouping.groupAll
                        ? t
                        : r.cropStart + t,
                    s =
                      (a && a[i]) ||
                      r.pointClass.prototype.applyOptions.apply({ series: r }, [
                        n[i],
                      ]);
                  for (let t = 0; t < y; t++)
                    c((e = s[x[t]]))
                      ? m[t].push(e)
                      : null === e && (m[t].hasNulls = !0);
                } else
                  c((k = f ? i[t] : null))
                    ? m[0].push(k)
                    : null === k && (m[0].hasNulls = !0);
              }
            return { groupedXData: h, groupedYData: d, groupMap: u };
          }
          function v(t) {
            let i = t.options,
              o = this.type,
              r = this.chart.options.plotOptions,
              a = this.useCommonDataGrouping && e.common,
              n = e.seriesSpecific,
              l = s.defaultOptions.plotOptions[o].dataGrouping;
            if (r && (n[o] || a)) {
              let t = this.chart.rangeSelector;
              l || (l = p(e.common, n[o])),
                (i.dataGrouping = p(
                  a,
                  l,
                  r.series && r.series.dataGrouping,
                  r[o].dataGrouping,
                  this.userOptions.dataGrouping,
                  !i.isInternal &&
                    t &&
                    c(t.selected) &&
                    t.buttonOptions[t.selected].dataGrouping
                ));
            }
          }
          return {
            compose: function (t) {
              let e = t.prototype;
              e.applyGrouping ||
                (n(t.prototype.pointClass, "update", function () {
                  if (this.dataGroup) return h(24, !1, this.series.chart), !1;
                }),
                n(t, "afterSetOptions", v),
                n(t, "destroy", m),
                d(e, {
                  applyGrouping: f,
                  destroyGroupedData: m,
                  generatePoints: x,
                  getDGApproximation: y,
                  groupData: b,
                }));
            },
            groupData: b,
          };
        }
      ),
      i(
        e,
        "Extensions/DataGrouping/DataGrouping.js",
        [
          e["Extensions/DataGrouping/DataGroupingAxisComposition.js"],
          e["Extensions/DataGrouping/DataGroupingDefaults.js"],
          e["Extensions/DataGrouping/DataGroupingSeriesComposition.js"],
          e["Core/Templating.js"],
          e["Core/Globals.js"],
          e["Core/Utilities.js"],
        ],
        function (t, e, i, s, o, r) {
          let { format: a } = s,
            { composed: n } = o,
            { addEvent: l, extend: h, isNumber: d, pick: c, pushUnique: p } = r;
          function u(t) {
            let i = this.chart,
              s = i.time,
              o = t.labelConfig,
              r = o.series,
              n = o.point,
              l = r.options,
              p = r.tooltipOptions,
              u = l.dataGrouping,
              g = r.xAxis,
              f = p.xDateFormat,
              m,
              x,
              y,
              b,
              v,
              S = p[t.isFooter ? "footerFormat" : "headerFormat"];
            if (g && "datetime" === g.options.type && u && d(o.key)) {
              (x = r.currentDataGrouping),
                (y = u.dateTimeLabelFormats || e.common.dateTimeLabelFormats),
                x
                  ? ((b = y[x.unitName]),
                    1 === x.count ? (f = b[0]) : ((f = b[1]), (m = b[2])))
                  : !f &&
                    y &&
                    g.dateTime &&
                    (f = g.dateTime.getXDateFormat(
                      o.x,
                      p.dateTimeLabelFormats
                    ));
              let l = c(r.groupMap?.[n.index].groupStart, o.key),
                d = l + x?.totalRange - 1;
              (v = s.dateFormat(f, l)),
                m && (v += s.dateFormat(m, d)),
                r.chart.styledMode && (S = this.styledModeFormat(S)),
                (t.text = a(
                  S,
                  { point: h(o.point, { key: v }), series: r },
                  i
                )),
                t.preventDefault();
            }
          }
          return {
            compose: function (e, s, o) {
              t.compose(e),
                i.compose(s),
                o && p(n, "DataGrouping") && l(o, "headerFormatter", u);
            },
            groupData: i.groupData,
          };
        }
      ),
      i(
        e,
        "masters/modules/datagrouping.src.js",
        [
          e["Core/Globals.js"],
          e["Extensions/DataGrouping/ApproximationDefaults.js"],
          e["Extensions/DataGrouping/ApproximationRegistry.js"],
          e["Extensions/DataGrouping/DataGrouping.js"],
        ],
        function (t, e, i, s) {
          return (
            (t.dataGrouping = t.dataGrouping || {}),
            (t.dataGrouping.approximationDefaults =
              t.dataGrouping.approximationDefaults || e),
            (t.dataGrouping.approximations =
              t.dataGrouping.approximations || i),
            s.compose(t.Axis, t.Series, t.Tooltip),
            t
          );
        }
      ),
      i(
        e,
        "Extensions/Annotations/NavigationBindingsUtilities.js",
        [e["Core/Utilities.js"]],
        function (t) {
          let { defined: e, isNumber: i, pick: s } = t,
            o = {
              backgroundColor: "string",
              borderColor: "string",
              borderRadius: "string",
              color: "string",
              fill: "string",
              fontSize: "string",
              labels: "string",
              name: "string",
              stroke: "string",
              title: "string",
            };
          return {
            annotationsFieldsTypes: o,
            getAssignedAxis: function (t) {
              return t.filter((t) => {
                let e = t.axis.getExtremes(),
                  o = e.min,
                  r = e.max,
                  a = s(t.axis.minPointOffset, 0);
                return (
                  i(o) &&
                  i(r) &&
                  t.value >= o - a &&
                  t.value <= r + a &&
                  !t.axis.options.isInternal
                );
              })[0];
            },
            getFieldType: function (t, i) {
              let s = o[t],
                r = typeof i;
              return (
                e(s) && (r = s),
                { string: "text", number: "number", boolean: "checkbox" }[r]
              );
            },
          };
        }
      ),
      i(
        e,
        "Extensions/MouseWheelZoom/MouseWheelZoom.js",
        [
          e["Core/Utilities.js"],
          e["Extensions/Annotations/NavigationBindingsUtilities.js"],
        ],
        function (t, e) {
          let i;
          let { addEvent: s, isObject: o, pick: r, defined: a, merge: n } = t,
            { getAssignedAxis: l } = e,
            h = [],
            d = { enabled: !0, sensitivity: 1.1 },
            c = (t) => (o(t) || (t = { enabled: t ?? !0 }), n(d, t)),
            p = function (t, e, s, o, n, l, h) {
              let d = r(h.type, t.zooming.type, ""),
                c = [];
              "x" === d
                ? (c = s)
                : "y" === d
                ? (c = o)
                : "xy" === d && (c = t.axes);
              let p = t.transform({
                axes: c,
                to: { x: n - 5, y: l - 5, width: 10, height: 10 },
                from: {
                  x: n - 5 * e,
                  y: l - 5 * e,
                  width: 10 * e,
                  height: 10 * e,
                },
                trigger: "mousewheel",
              });
              return (
                p &&
                  (a(i) && clearTimeout(i),
                  (i = setTimeout(() => {
                    t.pointer?.drop();
                  }, 400))),
                p
              );
            };
          function u() {
            let t = c(this.zooming.mouseWheel);
            t.enabled &&
              s(this.container, "wheel", (e) => {
                e = this.pointer?.normalize(e) || e;
                let { pointer: i } = this,
                  s = i && !i.inClass(e.target, "highcharts-no-mousewheel");
                if (
                  this.isInsidePlot(
                    e.chartX - this.plotLeft,
                    e.chartY - this.plotTop
                  ) &&
                  s
                ) {
                  let s = t.sensitivity || 1.1,
                    o = e.detail || (e.deltaY || 0) / 120,
                    r = l(i.getCoordinates(e).xAxis),
                    a = l(i.getCoordinates(e).yAxis);
                  p(
                    this,
                    Math.pow(s, o),
                    r ? [r.axis] : this.xAxis,
                    a ? [a.axis] : this.yAxis,
                    e.chartX,
                    e.chartY,
                    t
                  ) && e.preventDefault?.();
                }
              });
          }
          return {
            compose: function (t) {
              -1 === h.indexOf(t) && (h.push(t), s(t, "afterGetContainer", u));
            },
          };
        }
      ),
      i(
        e,
        "masters/modules/mouse-wheel-zoom.src.js",
        [
          e["Core/Globals.js"],
          e["Extensions/MouseWheelZoom/MouseWheelZoom.js"],
        ],
        function (t, e) {
          return (
            (t.MouseWheelZoom = t.MouseWheelZoom || e),
            t.MouseWheelZoom.compose(t.Chart),
            t
          );
        }
      ),
      i(
        e,
        "masters/modules/stock.src.js",
        [
          e["Core/Globals.js"],
          e["Series/DataModifyComposition.js"],
          e["Stock/Navigator/Navigator.js"],
          e["Core/Axis/OrdinalAxis.js"],
          e["Stock/RangeSelector/RangeSelector.js"],
          e["Stock/Scrollbar/Scrollbar.js"],
          e["Core/Chart/StockChart.js"],
          e["Series/OHLC/OHLCSeries.js"],
          e["Series/Flags/FlagsSeries.js"],
        ],
        function (t, e, i, s, o, r, a, n, l) {
          return (
            (t.Navigator = t.Navigator || i),
            (t.OrdinalAxis = t.OrdinalAxis || s),
            (t.RangeSelector = t.RangeSelector || o),
            (t.Scrollbar = t.Scrollbar || r),
            (t.stockChart = t.stockChart || a.stockChart),
            (t.StockChart = t.StockChart || t.stockChart),
            t.extend(t.StockChart, a),
            e.compose(t.Series, t.Axis, t.Point),
            l.compose(t.Renderer),
            n.compose(t.Series),
            t.Navigator.compose(t.Chart, t.Axis, t.Series),
            t.OrdinalAxis.compose(t.Axis, t.Series, t.Chart),
            t.RangeSelector.compose(t.Axis, t.Chart),
            t.Scrollbar.compose(t.Axis),
            t.StockChart.compose(t.Chart, t.Axis, t.Series, t.SVGRenderer),
            t
          );
        }
      ),
      i(
        e,
        "masters/highstock.src.js",
        [e["masters/highcharts.src.js"]],
        function (t) {
          return (t.product = "Highstock"), t;
        }
      ),
      (e["masters/highstock.src.js"]._modules = e),
      e["masters/highstock.src.js"]
    );
  })
);
