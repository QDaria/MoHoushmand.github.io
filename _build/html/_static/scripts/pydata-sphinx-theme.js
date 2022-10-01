!(function (t) {
  var e = {};
  function n(i) {
    if (e[i]) return e[i].exports;
    var o = (e[i] = { i: i, l: !1, exports: {} });
    return t[i].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = t),
    (n.c = e),
    (n.d = function (t, e, i) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
    }),
    (n.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.t = function (t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var i = Object.create(null);
      if (
        (n.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var o in t)
          n.d(
            i,
            o,
            function (e) {
              return t[e];
            }.bind(null, o)
          );
      return i;
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(e, "a", e), e;
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ""),
    n((n.s = 2));
})([
  function (t, e) {
    t.exports = jQuery;
  },
  function (t, e, n) {
    "use strict";
    n.r(e),
      function (t) {
        /**!
         * @fileOverview Kickass library to create and place poppers near their reference elements.
         * @version 1.16.1
         * @license
         * Copyright (c) 2016 Federico Zivolo and contributors
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in all
         * copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
         * SOFTWARE.
         */
        var n =
            "undefined" != typeof window &&
            "undefined" != typeof document &&
            "undefined" != typeof navigator,
          i = (function () {
            for (
              var t = ["Edge", "Trident", "Firefox"], e = 0;
              e < t.length;
              e += 1
            )
              if (n && navigator.userAgent.indexOf(t[e]) >= 0) return 1;
            return 0;
          })();
        var o =
          n && window.Promise
            ? function (t) {
                var e = !1;
                return function () {
                  e ||
                    ((e = !0),
                    window.Promise.resolve().then(function () {
                      (e = !1), t();
                    }));
                };
              }
            : function (t) {
                var e = !1;
                return function () {
                  e ||
                    ((e = !0),
                    setTimeout(function () {
                      (e = !1), t();
                    }, i));
                };
              };
        function r(t) {
          return t && "[object Function]" === {}.toString.call(t);
        }
        function a(t, e) {
          if (1 !== t.nodeType) return [];
          var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
          return e ? n[e] : n;
        }
        function s(t) {
          return "HTML" === t.nodeName ? t : t.parentNode || t.host;
        }
        function l(t) {
          if (!t) return document.body;
          switch (t.nodeName) {
            case "HTML":
            case "BODY":
              return t.ownerDocument.body;
            case "#document":
              return t.body;
          }
          var e = a(t),
            n = e.overflow,
            i = e.overflowX,
            o = e.overflowY;
          return /(auto|scroll|overlay)/.test(n + o + i) ? t : l(s(t));
        }
        function u(t) {
          return t && t.referenceNode ? t.referenceNode : t;
        }
        var f = n && !(!window.MSInputMethodContext || !document.documentMode),
          d = n && /MSIE 10/.test(navigator.userAgent);
        function c(t) {
          return 11 === t ? f : 10 === t ? d : f || d;
        }
        function h(t) {
          if (!t) return document.documentElement;
          for (
            var e = c(10) ? document.body : null, n = t.offsetParent || null;
            n === e && t.nextElementSibling;

          )
            n = (t = t.nextElementSibling).offsetParent;
          var i = n && n.nodeName;
          return i && "BODY" !== i && "HTML" !== i
            ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) &&
              "static" === a(n, "position")
              ? h(n)
              : n
            : t
            ? t.ownerDocument.documentElement
            : document.documentElement;
        }
        function p(t) {
          return null !== t.parentNode ? p(t.parentNode) : t;
        }
        function m(t, e) {
          if (!(t && t.nodeType && e && e.nodeType))
            return document.documentElement;
          var n =
              t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
            i = n ? t : e,
            o = n ? e : t,
            r = document.createRange();
          r.setStart(i, 0), r.setEnd(o, 0);
          var a,
            s,
            l = r.commonAncestorContainer;
          if ((t !== l && e !== l) || i.contains(o))
            return "BODY" === (s = (a = l).nodeName) ||
              ("HTML" !== s && h(a.firstElementChild) !== a)
              ? h(l)
              : l;
          var u = p(t);
          return u.host ? m(u.host, e) : m(t, p(e).host);
        }
        function g(t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "top",
            n = "top" === e ? "scrollTop" : "scrollLeft",
            i = t.nodeName;
          if ("BODY" === i || "HTML" === i) {
            var o = t.ownerDocument.documentElement,
              r = t.ownerDocument.scrollingElement || o;
            return r[n];
          }
          return t[n];
        }
        function v(t, e) {
          var n =
              arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            i = g(e, "top"),
            o = g(e, "left"),
            r = n ? -1 : 1;
          return (
            (t.top += i * r),
            (t.bottom += i * r),
            (t.left += o * r),
            (t.right += o * r),
            t
          );
        }
        function _(t, e) {
          var n = "x" === e ? "Left" : "Top",
            i = "Left" === n ? "Right" : "Bottom";
          return (
            parseFloat(t["border" + n + "Width"]) +
            parseFloat(t["border" + i + "Width"])
          );
        }
        function b(t, e, n, i) {
          return Math.max(
            e["offset" + t],
            e["scroll" + t],
            n["client" + t],
            n["offset" + t],
            n["scroll" + t],
            c(10)
              ? parseInt(n["offset" + t]) +
                  parseInt(i["margin" + ("Height" === t ? "Top" : "Left")]) +
                  parseInt(i["margin" + ("Height" === t ? "Bottom" : "Right")])
              : 0
          );
        }
        function y(t) {
          var e = t.body,
            n = t.documentElement,
            i = c(10) && getComputedStyle(n);
          return { height: b("Height", e, n, i), width: b("Width", e, n, i) };
        }
        var w = function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          },
          E = (function () {
            function t(t, e) {
              for (var n = 0; n < e.length; n++) {
                var i = e[n];
                (i.enumerable = i.enumerable || !1),
                  (i.configurable = !0),
                  "value" in i && (i.writable = !0),
                  Object.defineProperty(t, i.key, i);
              }
            }
            return function (e, n, i) {
              return n && t(e.prototype, n), i && t(e, i), e;
            };
          })(),
          T = function (t, e, n) {
            return (
              e in t
                ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (t[e] = n),
              t
            );
          },
          C =
            Object.assign ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var i in n)
                  Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
              }
              return t;
            };
        function S(t) {
          return C({}, t, {
            right: t.left + t.width,
            bottom: t.top + t.height,
          });
        }
        function N(t) {
          var e = {};
          try {
            if (c(10)) {
              e = t.getBoundingClientRect();
              var n = g(t, "top"),
                i = g(t, "left");
              (e.top += n), (e.left += i), (e.bottom += n), (e.right += i);
            } else e = t.getBoundingClientRect();
          } catch (t) {}
          var o = {
              left: e.left,
              top: e.top,
              width: e.right - e.left,
              height: e.bottom - e.top,
            },
            r = "HTML" === t.nodeName ? y(t.ownerDocument) : {},
            s = r.width || t.clientWidth || o.width,
            l = r.height || t.clientHeight || o.height,
            u = t.offsetWidth - s,
            f = t.offsetHeight - l;
          if (u || f) {
            var d = a(t);
            (u -= _(d, "x")), (f -= _(d, "y")), (o.width -= u), (o.height -= f);
          }
          return S(o);
        }
        function D(t, e) {
          var n =
              arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            i = c(10),
            o = "HTML" === e.nodeName,
            r = N(t),
            s = N(e),
            u = l(t),
            f = a(e),
            d = parseFloat(f.borderTopWidth),
            h = parseFloat(f.borderLeftWidth);
          n &&
            o &&
            ((s.top = Math.max(s.top, 0)), (s.left = Math.max(s.left, 0)));
          var p = S({
            top: r.top - s.top - d,
            left: r.left - s.left - h,
            width: r.width,
            height: r.height,
          });
          if (((p.marginTop = 0), (p.marginLeft = 0), !i && o)) {
            var m = parseFloat(f.marginTop),
              g = parseFloat(f.marginLeft);
            (p.top -= d - m),
              (p.bottom -= d - m),
              (p.left -= h - g),
              (p.right -= h - g),
              (p.marginTop = m),
              (p.marginLeft = g);
          }
          return (
            (i && !n ? e.contains(u) : e === u && "BODY" !== u.nodeName) &&
              (p = v(p, e)),
            p
          );
        }
        function k(t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = t.ownerDocument.documentElement,
            i = D(t, n),
            o = Math.max(n.clientWidth, window.innerWidth || 0),
            r = Math.max(n.clientHeight, window.innerHeight || 0),
            a = e ? 0 : g(n),
            s = e ? 0 : g(n, "left"),
            l = {
              top: a - i.top + i.marginTop,
              left: s - i.left + i.marginLeft,
              width: o,
              height: r,
            };
          return S(l);
        }
        function A(t) {
          var e = t.nodeName;
          if ("BODY" === e || "HTML" === e) return !1;
          if ("fixed" === a(t, "position")) return !0;
          var n = s(t);
          return !!n && A(n);
        }
        function I(t) {
          if (!t || !t.parentElement || c()) return document.documentElement;
          for (var e = t.parentElement; e && "none" === a(e, "transform"); )
            e = e.parentElement;
          return e || document.documentElement;
        }
        function O(t, e, n, i) {
          var o =
              arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
            r = { top: 0, left: 0 },
            a = o ? I(t) : m(t, u(e));
          if ("viewport" === i) r = k(a, o);
          else {
            var f = void 0;
            "scrollParent" === i
              ? "BODY" === (f = l(s(e))).nodeName &&
                (f = t.ownerDocument.documentElement)
              : (f = "window" === i ? t.ownerDocument.documentElement : i);
            var d = D(f, a, o);
            if ("HTML" !== f.nodeName || A(a)) r = d;
            else {
              var c = y(t.ownerDocument),
                h = c.height,
                p = c.width;
              (r.top += d.top - d.marginTop),
                (r.bottom = h + d.top),
                (r.left += d.left - d.marginLeft),
                (r.right = p + d.left);
            }
          }
          var g = "number" == typeof (n = n || 0);
          return (
            (r.left += g ? n : n.left || 0),
            (r.top += g ? n : n.top || 0),
            (r.right -= g ? n : n.right || 0),
            (r.bottom -= g ? n : n.bottom || 0),
            r
          );
        }
        function x(t) {
          return t.width * t.height;
        }
        function j(t, e, n, i, o) {
          var r =
            arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
          if (-1 === t.indexOf("auto")) return t;
          var a = O(n, i, r, o),
            s = {
              top: { width: a.width, height: e.top - a.top },
              right: { width: a.right - e.right, height: a.height },
              bottom: { width: a.width, height: a.bottom - e.bottom },
              left: { width: e.left - a.left, height: a.height },
            },
            l = Object.keys(s)
              .map(function (t) {
                return C({ key: t }, s[t], { area: x(s[t]) });
              })
              .sort(function (t, e) {
                return e.area - t.area;
              }),
            u = l.filter(function (t) {
              var e = t.width,
                i = t.height;
              return e >= n.clientWidth && i >= n.clientHeight;
            }),
            f = u.length > 0 ? u[0].key : l[0].key,
            d = t.split("-")[1];
          return f + (d ? "-" + d : "");
        }
        function L(t, e, n) {
          var i =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : null,
            o = i ? I(e) : m(e, u(n));
          return D(n, o, i);
        }
        function P(t) {
          var e = t.ownerDocument.defaultView.getComputedStyle(t),
            n = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
            i = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
          return { width: t.offsetWidth + i, height: t.offsetHeight + n };
        }
        function F(t) {
          var e = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom",
          };
          return t.replace(/left|right|bottom|top/g, function (t) {
            return e[t];
          });
        }
        function R(t, e, n) {
          n = n.split("-")[0];
          var i = P(t),
            o = { width: i.width, height: i.height },
            r = -1 !== ["right", "left"].indexOf(n),
            a = r ? "top" : "left",
            s = r ? "left" : "top",
            l = r ? "height" : "width",
            u = r ? "width" : "height";
          return (
            (o[a] = e[a] + e[l] / 2 - i[l] / 2),
            (o[s] = n === s ? e[s] - i[u] : e[F(s)]),
            o
          );
        }
        function M(t, e) {
          return Array.prototype.find ? t.find(e) : t.filter(e)[0];
        }
        function B(t, e, n) {
          return (
            (void 0 === n
              ? t
              : t.slice(
                  0,
                  (function (t, e, n) {
                    if (Array.prototype.findIndex)
                      return t.findIndex(function (t) {
                        return t[e] === n;
                      });
                    var i = M(t, function (t) {
                      return t[e] === n;
                    });
                    return t.indexOf(i);
                  })(t, "name", n)
                )
            ).forEach(function (t) {
              t.function &&
                console.warn(
                  "`modifier.function` is deprecated, use `modifier.fn`!"
                );
              var n = t.function || t.fn;
              t.enabled &&
                r(n) &&
                ((e.offsets.popper = S(e.offsets.popper)),
                (e.offsets.reference = S(e.offsets.reference)),
                (e = n(e, t)));
            }),
            e
          );
        }
        function H() {
          if (!this.state.isDestroyed) {
            var t = {
              instance: this,
              styles: {},
              arrowStyles: {},
              attributes: {},
              flipped: !1,
              offsets: {},
            };
            (t.offsets.reference = L(
              this.state,
              this.popper,
              this.reference,
              this.options.positionFixed
            )),
              (t.placement = j(
                this.options.placement,
                t.offsets.reference,
                this.popper,
                this.reference,
                this.options.modifiers.flip.boundariesElement,
                this.options.modifiers.flip.padding
              )),
              (t.originalPlacement = t.placement),
              (t.positionFixed = this.options.positionFixed),
              (t.offsets.popper = R(
                this.popper,
                t.offsets.reference,
                t.placement
              )),
              (t.offsets.popper.position = this.options.positionFixed
                ? "fixed"
                : "absolute"),
              (t = B(this.modifiers, t)),
              this.state.isCreated
                ? this.options.onUpdate(t)
                : ((this.state.isCreated = !0), this.options.onCreate(t));
          }
        }
        function q(t, e) {
          return t.some(function (t) {
            var n = t.name;
            return t.enabled && n === e;
          });
        }
        function Q(t) {
          for (
            var e = [!1, "ms", "Webkit", "Moz", "O"],
              n = t.charAt(0).toUpperCase() + t.slice(1),
              i = 0;
            i < e.length;
            i++
          ) {
            var o = e[i],
              r = o ? "" + o + n : t;
            if (void 0 !== document.body.style[r]) return r;
          }
          return null;
        }
        function W() {
          return (
            (this.state.isDestroyed = !0),
            q(this.modifiers, "applyStyle") &&
              (this.popper.removeAttribute("x-placement"),
              (this.popper.style.position = ""),
              (this.popper.style.top = ""),
              (this.popper.style.left = ""),
              (this.popper.style.right = ""),
              (this.popper.style.bottom = ""),
              (this.popper.style.willChange = ""),
              (this.popper.style[Q("transform")] = "")),
            this.disableEventListeners(),
            this.options.removeOnDestroy &&
              this.popper.parentNode.removeChild(this.popper),
            this
          );
        }
        function U(t) {
          var e = t.ownerDocument;
          return e ? e.defaultView : window;
        }
        function V(t, e, n, i) {
          (n.updateBound = i),
            U(t).addEventListener("resize", n.updateBound, { passive: !0 });
          var o = l(t);
          return (
            (function t(e, n, i, o) {
              var r = "BODY" === e.nodeName,
                a = r ? e.ownerDocument.defaultView : e;
              a.addEventListener(n, i, { passive: !0 }),
                r || t(l(a.parentNode), n, i, o),
                o.push(a);
            })(o, "scroll", n.updateBound, n.scrollParents),
            (n.scrollElement = o),
            (n.eventsEnabled = !0),
            n
          );
        }
        function Y() {
          this.state.eventsEnabled ||
            (this.state = V(
              this.reference,
              this.options,
              this.state,
              this.scheduleUpdate
            ));
        }
        function z() {
          var t, e;
          this.state.eventsEnabled &&
            (cancelAnimationFrame(this.scheduleUpdate),
            (this.state =
              ((t = this.reference),
              (e = this.state),
              U(t).removeEventListener("resize", e.updateBound),
              e.scrollParents.forEach(function (t) {
                t.removeEventListener("scroll", e.updateBound);
              }),
              (e.updateBound = null),
              (e.scrollParents = []),
              (e.scrollElement = null),
              (e.eventsEnabled = !1),
              e)));
        }
        function K(t) {
          return "" !== t && !isNaN(parseFloat(t)) && isFinite(t);
        }
        function X(t, e) {
          Object.keys(e).forEach(function (n) {
            var i = "";
            -1 !==
              ["width", "height", "top", "right", "bottom", "left"].indexOf(
                n
              ) &&
              K(e[n]) &&
              (i = "px"),
              (t.style[n] = e[n] + i);
          });
        }
        var $ = n && /Firefox/i.test(navigator.userAgent);
        function G(t, e, n) {
          var i = M(t, function (t) {
              return t.name === e;
            }),
            o =
              !!i &&
              t.some(function (t) {
                return t.name === n && t.enabled && t.order < i.order;
              });
          if (!o) {
            var r = "`" + e + "`",
              a = "`" + n + "`";
            console.warn(
              a +
                " modifier is required by " +
                r +
                " modifier in order to work, be sure to include it before " +
                r +
                "!"
            );
          }
          return o;
        }
        var J = [
            "auto-start",
            "auto",
            "auto-end",
            "top-start",
            "top",
            "top-end",
            "right-start",
            "right",
            "right-end",
            "bottom-end",
            "bottom",
            "bottom-start",
            "left-end",
            "left",
            "left-start",
          ],
          Z = J.slice(3);
        function tt(t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = Z.indexOf(t),
            i = Z.slice(n + 1).concat(Z.slice(0, n));
          return e ? i.reverse() : i;
        }
        var et = "flip",
          nt = "clockwise",
          it = "counterclockwise";
        function ot(t, e, n, i) {
          var o = [0, 0],
            r = -1 !== ["right", "left"].indexOf(i),
            a = t.split(/(\+|\-)/).map(function (t) {
              return t.trim();
            }),
            s = a.indexOf(
              M(a, function (t) {
                return -1 !== t.search(/,|\s/);
              })
            );
          a[s] &&
            -1 === a[s].indexOf(",") &&
            console.warn(
              "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
            );
          var l = /\s*,\s*|\s+/,
            u =
              -1 !== s
                ? [
                    a.slice(0, s).concat([a[s].split(l)[0]]),
                    [a[s].split(l)[1]].concat(a.slice(s + 1)),
                  ]
                : [a];
          return (
            (u = u.map(function (t, i) {
              var o = (1 === i ? !r : r) ? "height" : "width",
                a = !1;
              return t
                .reduce(function (t, e) {
                  return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e)
                    ? ((t[t.length - 1] = e), (a = !0), t)
                    : a
                    ? ((t[t.length - 1] += e), (a = !1), t)
                    : t.concat(e);
                }, [])
                .map(function (t) {
                  return (function (t, e, n, i) {
                    var o = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                      r = +o[1],
                      a = o[2];
                    if (!r) return t;
                    if (0 === a.indexOf("%")) {
                      var s = void 0;
                      switch (a) {
                        case "%p":
                          s = n;
                          break;
                        case "%":
                        case "%r":
                        default:
                          s = i;
                      }
                      return (S(s)[e] / 100) * r;
                    }
                    if ("vh" === a || "vw" === a) {
                      return (
                        (("vh" === a
                          ? Math.max(
                              document.documentElement.clientHeight,
                              window.innerHeight || 0
                            )
                          : Math.max(
                              document.documentElement.clientWidth,
                              window.innerWidth || 0
                            )) /
                          100) *
                        r
                      );
                    }
                    return r;
                  })(t, o, e, n);
                });
            })).forEach(function (t, e) {
              t.forEach(function (n, i) {
                K(n) && (o[e] += n * ("-" === t[i - 1] ? -1 : 1));
              });
            }),
            o
          );
        }
        var rt = {
            placement: "bottom",
            positionFixed: !1,
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function () {},
            onUpdate: function () {},
            modifiers: {
              shift: {
                order: 100,
                enabled: !0,
                fn: function (t) {
                  var e = t.placement,
                    n = e.split("-")[0],
                    i = e.split("-")[1];
                  if (i) {
                    var o = t.offsets,
                      r = o.reference,
                      a = o.popper,
                      s = -1 !== ["bottom", "top"].indexOf(n),
                      l = s ? "left" : "top",
                      u = s ? "width" : "height",
                      f = {
                        start: T({}, l, r[l]),
                        end: T({}, l, r[l] + r[u] - a[u]),
                      };
                    t.offsets.popper = C({}, a, f[i]);
                  }
                  return t;
                },
              },
              offset: {
                order: 200,
                enabled: !0,
                fn: function (t, e) {
                  var n = e.offset,
                    i = t.placement,
                    o = t.offsets,
                    r = o.popper,
                    a = o.reference,
                    s = i.split("-")[0],
                    l = void 0;
                  return (
                    (l = K(+n) ? [+n, 0] : ot(n, r, a, s)),
                    "left" === s
                      ? ((r.top += l[0]), (r.left -= l[1]))
                      : "right" === s
                      ? ((r.top += l[0]), (r.left += l[1]))
                      : "top" === s
                      ? ((r.left += l[0]), (r.top -= l[1]))
                      : "bottom" === s && ((r.left += l[0]), (r.top += l[1])),
                    (t.popper = r),
                    t
                  );
                },
                offset: 0,
              },
              preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function (t, e) {
                  var n = e.boundariesElement || h(t.instance.popper);
                  t.instance.reference === n && (n = h(n));
                  var i = Q("transform"),
                    o = t.instance.popper.style,
                    r = o.top,
                    a = o.left,
                    s = o[i];
                  (o.top = ""), (o.left = ""), (o[i] = "");
                  var l = O(
                    t.instance.popper,
                    t.instance.reference,
                    e.padding,
                    n,
                    t.positionFixed
                  );
                  (o.top = r), (o.left = a), (o[i] = s), (e.boundaries = l);
                  var u = e.priority,
                    f = t.offsets.popper,
                    d = {
                      primary: function (t) {
                        var n = f[t];
                        return (
                          f[t] < l[t] &&
                            !e.escapeWithReference &&
                            (n = Math.max(f[t], l[t])),
                          T({}, t, n)
                        );
                      },
                      secondary: function (t) {
                        var n = "right" === t ? "left" : "top",
                          i = f[n];
                        return (
                          f[t] > l[t] &&
                            !e.escapeWithReference &&
                            (i = Math.min(
                              f[n],
                              l[t] - ("right" === t ? f.width : f.height)
                            )),
                          T({}, n, i)
                        );
                      },
                    };
                  return (
                    u.forEach(function (t) {
                      var e =
                        -1 !== ["left", "top"].indexOf(t)
                          ? "primary"
                          : "secondary";
                      f = C({}, f, d[e](t));
                    }),
                    (t.offsets.popper = f),
                    t
                  );
                },
                priority: ["left", "right", "top", "bottom"],
                padding: 5,
                boundariesElement: "scrollParent",
              },
              keepTogether: {
                order: 400,
                enabled: !0,
                fn: function (t) {
                  var e = t.offsets,
                    n = e.popper,
                    i = e.reference,
                    o = t.placement.split("-")[0],
                    r = Math.floor,
                    a = -1 !== ["top", "bottom"].indexOf(o),
                    s = a ? "right" : "bottom",
                    l = a ? "left" : "top",
                    u = a ? "width" : "height";
                  return (
                    n[s] < r(i[l]) && (t.offsets.popper[l] = r(i[l]) - n[u]),
                    n[l] > r(i[s]) && (t.offsets.popper[l] = r(i[s])),
                    t
                  );
                },
              },
              arrow: {
                order: 500,
                enabled: !0,
                fn: function (t, e) {
                  var n;
                  if (!G(t.instance.modifiers, "arrow", "keepTogether"))
                    return t;
                  var i = e.element;
                  if ("string" == typeof i) {
                    if (!(i = t.instance.popper.querySelector(i))) return t;
                  } else if (!t.instance.popper.contains(i))
                    return (
                      console.warn(
                        "WARNING: `arrow.element` must be child of its popper element!"
                      ),
                      t
                    );
                  var o = t.placement.split("-")[0],
                    r = t.offsets,
                    s = r.popper,
                    l = r.reference,
                    u = -1 !== ["left", "right"].indexOf(o),
                    f = u ? "height" : "width",
                    d = u ? "Top" : "Left",
                    c = d.toLowerCase(),
                    h = u ? "left" : "top",
                    p = u ? "bottom" : "right",
                    m = P(i)[f];
                  l[p] - m < s[c] && (t.offsets.popper[c] -= s[c] - (l[p] - m)),
                    l[c] + m > s[p] && (t.offsets.popper[c] += l[c] + m - s[p]),
                    (t.offsets.popper = S(t.offsets.popper));
                  var g = l[c] + l[f] / 2 - m / 2,
                    v = a(t.instance.popper),
                    _ = parseFloat(v["margin" + d]),
                    b = parseFloat(v["border" + d + "Width"]),
                    y = g - t.offsets.popper[c] - _ - b;
                  return (
                    (y = Math.max(Math.min(s[f] - m, y), 0)),
                    (t.arrowElement = i),
                    (t.offsets.arrow =
                      (T((n = {}), c, Math.round(y)), T(n, h, ""), n)),
                    t
                  );
                },
                element: "[x-arrow]",
              },
              flip: {
                order: 600,
                enabled: !0,
                fn: function (t, e) {
                  if (q(t.instance.modifiers, "inner")) return t;
                  if (t.flipped && t.placement === t.originalPlacement)
                    return t;
                  var n = O(
                      t.instance.popper,
                      t.instance.reference,
                      e.padding,
                      e.boundariesElement,
                      t.positionFixed
                    ),
                    i = t.placement.split("-")[0],
                    o = F(i),
                    r = t.placement.split("-")[1] || "",
                    a = [];
                  switch (e.behavior) {
                    case et:
                      a = [i, o];
                      break;
                    case nt:
                      a = tt(i);
                      break;
                    case it:
                      a = tt(i, !0);
                      break;
                    default:
                      a = e.behavior;
                  }
                  return (
                    a.forEach(function (s, l) {
                      if (i !== s || a.length === l + 1) return t;
                      (i = t.placement.split("-")[0]), (o = F(i));
                      var u = t.offsets.popper,
                        f = t.offsets.reference,
                        d = Math.floor,
                        c =
                          ("left" === i && d(u.right) > d(f.left)) ||
                          ("right" === i && d(u.left) < d(f.right)) ||
                          ("top" === i && d(u.bottom) > d(f.top)) ||
                          ("bottom" === i && d(u.top) < d(f.bottom)),
                        h = d(u.left) < d(n.left),
                        p = d(u.right) > d(n.right),
                        m = d(u.top) < d(n.top),
                        g = d(u.bottom) > d(n.bottom),
                        v =
                          ("left" === i && h) ||
                          ("right" === i && p) ||
                          ("top" === i && m) ||
                          ("bottom" === i && g),
                        _ = -1 !== ["top", "bottom"].indexOf(i),
                        b =
                          !!e.flipVariations &&
                          ((_ && "start" === r && h) ||
                            (_ && "end" === r && p) ||
                            (!_ && "start" === r && m) ||
                            (!_ && "end" === r && g)),
                        y =
                          !!e.flipVariationsByContent &&
                          ((_ && "start" === r && p) ||
                            (_ && "end" === r && h) ||
                            (!_ && "start" === r && g) ||
                            (!_ && "end" === r && m)),
                        w = b || y;
                      (c || v || w) &&
                        ((t.flipped = !0),
                        (c || v) && (i = a[l + 1]),
                        w &&
                          (r = (function (t) {
                            return "end" === t
                              ? "start"
                              : "start" === t
                              ? "end"
                              : t;
                          })(r)),
                        (t.placement = i + (r ? "-" + r : "")),
                        (t.offsets.popper = C(
                          {},
                          t.offsets.popper,
                          R(t.instance.popper, t.offsets.reference, t.placement)
                        )),
                        (t = B(t.instance.modifiers, t, "flip")));
                    }),
                    t
                  );
                },
                behavior: "flip",
                padding: 5,
                boundariesElement: "viewport",
                flipVariations: !1,
                flipVariationsByContent: !1,
              },
              inner: {
                order: 700,
                enabled: !1,
                fn: function (t) {
                  var e = t.placement,
                    n = e.split("-")[0],
                    i = t.offsets,
                    o = i.popper,
                    r = i.reference,
                    a = -1 !== ["left", "right"].indexOf(n),
                    s = -1 === ["top", "left"].indexOf(n);
                  return (
                    (o[a ? "left" : "top"] =
                      r[n] - (s ? o[a ? "width" : "height"] : 0)),
                    (t.placement = F(e)),
                    (t.offsets.popper = S(o)),
                    t
                  );
                },
              },
              hide: {
                order: 800,
                enabled: !0,
                fn: function (t) {
                  if (!G(t.instance.modifiers, "hide", "preventOverflow"))
                    return t;
                  var e = t.offsets.reference,
                    n = M(t.instance.modifiers, function (t) {
                      return "preventOverflow" === t.name;
                    }).boundaries;
                  if (
                    e.bottom < n.top ||
                    e.left > n.right ||
                    e.top > n.bottom ||
                    e.right < n.left
                  ) {
                    if (!0 === t.hide) return t;
                    (t.hide = !0), (t.attributes["x-out-of-boundaries"] = "");
                  } else {
                    if (!1 === t.hide) return t;
                    (t.hide = !1), (t.attributes["x-out-of-boundaries"] = !1);
                  }
                  return t;
                },
              },
              computeStyle: {
                order: 850,
                enabled: !0,
                fn: function (t, e) {
                  var n = e.x,
                    i = e.y,
                    o = t.offsets.popper,
                    r = M(t.instance.modifiers, function (t) {
                      return "applyStyle" === t.name;
                    }).gpuAcceleration;
                  void 0 !== r &&
                    console.warn(
                      "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
                    );
                  var a = void 0 !== r ? r : e.gpuAcceleration,
                    s = h(t.instance.popper),
                    l = N(s),
                    u = { position: o.position },
                    f = (function (t, e) {
                      var n = t.offsets,
                        i = n.popper,
                        o = n.reference,
                        r = Math.round,
                        a = Math.floor,
                        s = function (t) {
                          return t;
                        },
                        l = r(o.width),
                        u = r(i.width),
                        f = -1 !== ["left", "right"].indexOf(t.placement),
                        d = -1 !== t.placement.indexOf("-"),
                        c = e ? (f || d || l % 2 == u % 2 ? r : a) : s,
                        h = e ? r : s;
                      return {
                        left: c(
                          l % 2 == 1 && u % 2 == 1 && !d && e
                            ? i.left - 1
                            : i.left
                        ),
                        top: h(i.top),
                        bottom: h(i.bottom),
                        right: c(i.right),
                      };
                    })(t, window.devicePixelRatio < 2 || !$),
                    d = "bottom" === n ? "top" : "bottom",
                    c = "right" === i ? "left" : "right",
                    p = Q("transform"),
                    m = void 0,
                    g = void 0;
                  if (
                    ((g =
                      "bottom" === d
                        ? "HTML" === s.nodeName
                          ? -s.clientHeight + f.bottom
                          : -l.height + f.bottom
                        : f.top),
                    (m =
                      "right" === c
                        ? "HTML" === s.nodeName
                          ? -s.clientWidth + f.right
                          : -l.width + f.right
                        : f.left),
                    a && p)
                  )
                    (u[p] = "translate3d(" + m + "px, " + g + "px, 0)"),
                      (u[d] = 0),
                      (u[c] = 0),
                      (u.willChange = "transform");
                  else {
                    var v = "bottom" === d ? -1 : 1,
                      _ = "right" === c ? -1 : 1;
                    (u[d] = g * v),
                      (u[c] = m * _),
                      (u.willChange = d + ", " + c);
                  }
                  var b = { "x-placement": t.placement };
                  return (
                    (t.attributes = C({}, b, t.attributes)),
                    (t.styles = C({}, u, t.styles)),
                    (t.arrowStyles = C({}, t.offsets.arrow, t.arrowStyles)),
                    t
                  );
                },
                gpuAcceleration: !0,
                x: "bottom",
                y: "right",
              },
              applyStyle: {
                order: 900,
                enabled: !0,
                fn: function (t) {
                  var e, n;
                  return (
                    X(t.instance.popper, t.styles),
                    (e = t.instance.popper),
                    (n = t.attributes),
                    Object.keys(n).forEach(function (t) {
                      !1 !== n[t]
                        ? e.setAttribute(t, n[t])
                        : e.removeAttribute(t);
                    }),
                    t.arrowElement &&
                      Object.keys(t.arrowStyles).length &&
                      X(t.arrowElement, t.arrowStyles),
                    t
                  );
                },
                onLoad: function (t, e, n, i, o) {
                  var r = L(o, e, t, n.positionFixed),
                    a = j(
                      n.placement,
                      r,
                      e,
                      t,
                      n.modifiers.flip.boundariesElement,
                      n.modifiers.flip.padding
                    );
                  return (
                    e.setAttribute("x-placement", a),
                    X(e, { position: n.positionFixed ? "fixed" : "absolute" }),
                    n
                  );
                },
                gpuAcceleration: void 0,
              },
            },
          },
          at = (function () {
            function t(e, n) {
              var i = this,
                a =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : {};
              w(this, t),
                (this.scheduleUpdate = function () {
                  return requestAnimationFrame(i.update);
                }),
                (this.update = o(this.update.bind(this))),
                (this.options = C({}, t.Defaults, a)),
                (this.state = {
                  isDestroyed: !1,
                  isCreated: !1,
                  scrollParents: [],
                }),
                (this.reference = e && e.jquery ? e[0] : e),
                (this.popper = n && n.jquery ? n[0] : n),
                (this.options.modifiers = {}),
                Object.keys(C({}, t.Defaults.modifiers, a.modifiers)).forEach(
                  function (e) {
                    i.options.modifiers[e] = C(
                      {},
                      t.Defaults.modifiers[e] || {},
                      a.modifiers ? a.modifiers[e] : {}
                    );
                  }
                ),
                (this.modifiers = Object.keys(this.options.modifiers)
                  .map(function (t) {
                    return C({ name: t }, i.options.modifiers[t]);
                  })
                  .sort(function (t, e) {
                    return t.order - e.order;
                  })),
                this.modifiers.forEach(function (t) {
                  t.enabled &&
                    r(t.onLoad) &&
                    t.onLoad(i.reference, i.popper, i.options, t, i.state);
                }),
                this.update();
              var s = this.options.eventsEnabled;
              s && this.enableEventListeners(), (this.state.eventsEnabled = s);
            }
            return (
              E(t, [
                {
                  key: "update",
                  value: function () {
                    return H.call(this);
                  },
                },
                {
                  key: "destroy",
                  value: function () {
                    return W.call(this);
                  },
                },
                {
                  key: "enableEventListeners",
                  value: function () {
                    return Y.call(this);
                  },
                },
                {
                  key: "disableEventListeners",
                  value: function () {
                    return z.call(this);
                  },
                },
              ]),
              t
            );
          })();
        (at.Utils = ("undefined" != typeof window ? window : t).PopperUtils),
          (at.placements = J),
          (at.Defaults = rt),
          (e.default = at);
      }.call(this, n(4));
  },
  function (t, e, n) {
    t.exports = n(5);
  },
  function (t, e, n) {
    /*!
     * Bootstrap v4.6.1 (https://getbootstrap.com/)
     * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     */
    !(function (t, e, n) {
      "use strict";
      function i(t) {
        return t && "object" == typeof t && "default" in t ? t : { default: t };
      }
      var o = i(e),
        r = i(n);
      function a(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      function s(t, e, n) {
        return e && a(t.prototype, e), n && a(t, n), t;
      }
      function l() {
        return (l =
          Object.assign ||
          function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var n = arguments[e];
              for (var i in n)
                Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
            }
            return t;
          }).apply(this, arguments);
      }
      function u(t, e) {
        return (u =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function f(t) {
        var e = this,
          n = !1;
        return (
          o.default(this).one(d.TRANSITION_END, function () {
            n = !0;
          }),
          setTimeout(function () {
            n || d.triggerTransitionEnd(e);
          }, t),
          this
        );
      }
      var d = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function (t) {
          do {
            t += ~~(1e6 * Math.random());
          } while (document.getElementById(t));
          return t;
        },
        getSelectorFromElement: function (t) {
          var e = t.getAttribute("data-target");
          if (!e || "#" === e) {
            var n = t.getAttribute("href");
            e = n && "#" !== n ? n.trim() : "";
          }
          try {
            return document.querySelector(e) ? e : null;
          } catch (t) {
            return null;
          }
        },
        getTransitionDurationFromElement: function (t) {
          if (!t) return 0;
          var e = o.default(t).css("transition-duration"),
            n = o.default(t).css("transition-delay"),
            i = parseFloat(e),
            r = parseFloat(n);
          return i || r
            ? ((e = e.split(",")[0]),
              (n = n.split(",")[0]),
              1e3 * (parseFloat(e) + parseFloat(n)))
            : 0;
        },
        reflow: function (t) {
          return t.offsetHeight;
        },
        triggerTransitionEnd: function (t) {
          o.default(t).trigger("transitionend");
        },
        supportsTransitionEnd: function () {
          return Boolean("transitionend");
        },
        isElement: function (t) {
          return (t[0] || t).nodeType;
        },
        typeCheckConfig: function (t, e, n) {
          for (var i in n)
            if (Object.prototype.hasOwnProperty.call(n, i)) {
              var o = n[i],
                r = e[i],
                a =
                  r && d.isElement(r)
                    ? "element"
                    : null == (s = r)
                    ? "" + s
                    : {}.toString
                        .call(s)
                        .match(/\s([a-z]+)/i)[1]
                        .toLowerCase();
              if (!new RegExp(o).test(a))
                throw new Error(
                  t.toUpperCase() +
                    ': Option "' +
                    i +
                    '" provided type "' +
                    a +
                    '" but expected type "' +
                    o +
                    '".'
                );
            }
          var s;
        },
        findShadowRoot: function (t) {
          if (!document.documentElement.attachShadow) return null;
          if ("function" == typeof t.getRootNode) {
            var e = t.getRootNode();
            return e instanceof ShadowRoot ? e : null;
          }
          return t instanceof ShadowRoot
            ? t
            : t.parentNode
            ? d.findShadowRoot(t.parentNode)
            : null;
        },
        jQueryDetection: function () {
          if (void 0 === o.default)
            throw new TypeError(
              "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
            );
          var t = o.default.fn.jquery.split(" ")[0].split(".");
          if (
            (t[0] < 2 && t[1] < 9) ||
            (1 === t[0] && 9 === t[1] && t[2] < 1) ||
            t[0] >= 4
          )
            throw new Error(
              "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
            );
        },
      };
      d.jQueryDetection(),
        (o.default.fn.emulateTransitionEnd = f),
        (o.default.event.special[d.TRANSITION_END] = {
          bindType: "transitionend",
          delegateType: "transitionend",
          handle: function (t) {
            if (o.default(t.target).is(this))
              return t.handleObj.handler.apply(this, arguments);
          },
        });
      var c = o.default.fn.alert,
        h = (function () {
          function t(t) {
            this._element = t;
          }
          var e = t.prototype;
          return (
            (e.close = function (t) {
              var e = this._element;
              t && (e = this._getRootElement(t)),
                this._triggerCloseEvent(e).isDefaultPrevented() ||
                  this._removeElement(e);
            }),
            (e.dispose = function () {
              o.default.removeData(this._element, "bs.alert"),
                (this._element = null);
            }),
            (e._getRootElement = function (t) {
              var e = d.getSelectorFromElement(t),
                n = !1;
              return (
                e && (n = document.querySelector(e)),
                n || (n = o.default(t).closest(".alert")[0]),
                n
              );
            }),
            (e._triggerCloseEvent = function (t) {
              var e = o.default.Event("close.bs.alert");
              return o.default(t).trigger(e), e;
            }),
            (e._removeElement = function (t) {
              var e = this;
              if (
                (o.default(t).removeClass("show"),
                o.default(t).hasClass("fade"))
              ) {
                var n = d.getTransitionDurationFromElement(t);
                o.default(t)
                  .one(d.TRANSITION_END, function (n) {
                    return e._destroyElement(t, n);
                  })
                  .emulateTransitionEnd(n);
              } else this._destroyElement(t);
            }),
            (e._destroyElement = function (t) {
              o.default(t).detach().trigger("closed.bs.alert").remove();
            }),
            (t._jQueryInterface = function (e) {
              return this.each(function () {
                var n = o.default(this),
                  i = n.data("bs.alert");
                i || ((i = new t(this)), n.data("bs.alert", i)),
                  "close" === e && i[e](this);
              });
            }),
            (t._handleDismiss = function (t) {
              return function (e) {
                e && e.preventDefault(), t.close(this);
              };
            }),
            s(t, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.6.1";
                },
              },
            ]),
            t
          );
        })();
      o
        .default(document)
        .on(
          "click.bs.alert.data-api",
          '[data-dismiss="alert"]',
          h._handleDismiss(new h())
        ),
        (o.default.fn.alert = h._jQueryInterface),
        (o.default.fn.alert.Constructor = h),
        (o.default.fn.alert.noConflict = function () {
          return (o.default.fn.alert = c), h._jQueryInterface;
        });
      var p = o.default.fn.button,
        m = (function () {
          function t(t) {
            (this._element = t), (this.shouldAvoidTriggerChange = !1);
          }
          var e = t.prototype;
          return (
            (e.toggle = function () {
              var t = !0,
                e = !0,
                n = o
                  .default(this._element)
                  .closest('[data-toggle="buttons"]')[0];
              if (n) {
                var i = this._element.querySelector(
                  'input:not([type="hidden"])'
                );
                if (i) {
                  if ("radio" === i.type)
                    if (i.checked && this._element.classList.contains("active"))
                      t = !1;
                    else {
                      var r = n.querySelector(".active");
                      r && o.default(r).removeClass("active");
                    }
                  t &&
                    (("checkbox" !== i.type && "radio" !== i.type) ||
                      (i.checked = !this._element.classList.contains("active")),
                    this.shouldAvoidTriggerChange ||
                      o.default(i).trigger("change")),
                    i.focus(),
                    (e = !1);
                }
              }
              this._element.hasAttribute("disabled") ||
                this._element.classList.contains("disabled") ||
                (e &&
                  this._element.setAttribute(
                    "aria-pressed",
                    !this._element.classList.contains("active")
                  ),
                t && o.default(this._element).toggleClass("active"));
            }),
            (e.dispose = function () {
              o.default.removeData(this._element, "bs.button"),
                (this._element = null);
            }),
            (t._jQueryInterface = function (e, n) {
              return this.each(function () {
                var i = o.default(this),
                  r = i.data("bs.button");
                r || ((r = new t(this)), i.data("bs.button", r)),
                  (r.shouldAvoidTriggerChange = n),
                  "toggle" === e && r[e]();
              });
            }),
            s(t, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.6.1";
                },
              },
            ]),
            t
          );
        })();
      o
        .default(document)
        .on(
          "click.bs.button.data-api",
          '[data-toggle^="button"]',
          function (t) {
            var e = t.target,
              n = e;
            if (
              (o.default(e).hasClass("btn") ||
                (e = o.default(e).closest(".btn")[0]),
              !e ||
                e.hasAttribute("disabled") ||
                e.classList.contains("disabled"))
            )
              t.preventDefault();
            else {
              var i = e.querySelector('input:not([type="hidden"])');
              if (
                i &&
                (i.hasAttribute("disabled") || i.classList.contains("disabled"))
              )
                return void t.preventDefault();
              ("INPUT" !== n.tagName && "LABEL" === e.tagName) ||
                m._jQueryInterface.call(
                  o.default(e),
                  "toggle",
                  "INPUT" === n.tagName
                );
            }
          }
        )
        .on(
          "focus.bs.button.data-api blur.bs.button.data-api",
          '[data-toggle^="button"]',
          function (t) {
            var e = o.default(t.target).closest(".btn")[0];
            o.default(e).toggleClass("focus", /^focus(in)?$/.test(t.type));
          }
        ),
        o.default(window).on("load.bs.button.data-api", function () {
          for (
            var t = [].slice.call(
                document.querySelectorAll('[data-toggle="buttons"] .btn')
              ),
              e = 0,
              n = t.length;
            e < n;
            e++
          ) {
            var i = t[e],
              o = i.querySelector('input:not([type="hidden"])');
            o.checked || o.hasAttribute("checked")
              ? i.classList.add("active")
              : i.classList.remove("active");
          }
          for (
            var r = 0,
              a = (t = [].slice.call(
                document.querySelectorAll('[data-toggle="button"]')
              )).length;
            r < a;
            r++
          ) {
            var s = t[r];
            "true" === s.getAttribute("aria-pressed")
              ? s.classList.add("active")
              : s.classList.remove("active");
          }
        }),
        (o.default.fn.button = m._jQueryInterface),
        (o.default.fn.button.Constructor = m),
        (o.default.fn.button.noConflict = function () {
          return (o.default.fn.button = p), m._jQueryInterface;
        });
      var g = "carousel",
        v = ".bs.carousel",
        _ = o.default.fn[g],
        b = {
          interval: 5e3,
          keyboard: !0,
          slide: !1,
          pause: "hover",
          wrap: !0,
          touch: !0,
        },
        y = {
          interval: "(number|boolean)",
          keyboard: "boolean",
          slide: "(boolean|string)",
          pause: "(string|boolean)",
          wrap: "boolean",
          touch: "boolean",
        },
        w = { TOUCH: "touch", PEN: "pen" },
        E = (function () {
          function t(t, e) {
            (this._items = null),
              (this._interval = null),
              (this._activeElement = null),
              (this._isPaused = !1),
              (this._isSliding = !1),
              (this.touchTimeout = null),
              (this.touchStartX = 0),
              (this.touchDeltaX = 0),
              (this._config = this._getConfig(e)),
              (this._element = t),
              (this._indicatorsElement = this._element.querySelector(
                ".carousel-indicators"
              )),
              (this._touchSupported =
                "ontouchstart" in document.documentElement ||
                navigator.maxTouchPoints > 0),
              (this._pointerEvent = Boolean(
                window.PointerEvent || window.MSPointerEvent
              )),
              this._addEventListeners();
          }
          var e = t.prototype;
          return (
            (e.next = function () {
              this._isSliding || this._slide("next");
            }),
            (e.nextWhenVisible = function () {
              var t = o.default(this._element);
              !document.hidden &&
                t.is(":visible") &&
                "hidden" !== t.css("visibility") &&
                this.next();
            }),
            (e.prev = function () {
              this._isSliding || this._slide("prev");
            }),
            (e.pause = function (t) {
              t || (this._isPaused = !0),
                this._element.querySelector(
                  ".carousel-item-next, .carousel-item-prev"
                ) && (d.triggerTransitionEnd(this._element), this.cycle(!0)),
                clearInterval(this._interval),
                (this._interval = null);
            }),
            (e.cycle = function (t) {
              t || (this._isPaused = !1),
                this._interval &&
                  (clearInterval(this._interval), (this._interval = null)),
                this._config.interval &&
                  !this._isPaused &&
                  (this._updateInterval(),
                  (this._interval = setInterval(
                    (document.visibilityState
                      ? this.nextWhenVisible
                      : this.next
                    ).bind(this),
                    this._config.interval
                  )));
            }),
            (e.to = function (t) {
              var e = this;
              this._activeElement = this._element.querySelector(
                ".active.carousel-item"
              );
              var n = this._getItemIndex(this._activeElement);
              if (!(t > this._items.length - 1 || t < 0))
                if (this._isSliding)
                  o.default(this._element).one("slid.bs.carousel", function () {
                    return e.to(t);
                  });
                else {
                  if (n === t) return this.pause(), void this.cycle();
                  var i = t > n ? "next" : "prev";
                  this._slide(i, this._items[t]);
                }
            }),
            (e.dispose = function () {
              o.default(this._element).off(v),
                o.default.removeData(this._element, "bs.carousel"),
                (this._items = null),
                (this._config = null),
                (this._element = null),
                (this._interval = null),
                (this._isPaused = null),
                (this._isSliding = null),
                (this._activeElement = null),
                (this._indicatorsElement = null);
            }),
            (e._getConfig = function (t) {
              return (t = l({}, b, t)), d.typeCheckConfig(g, t, y), t;
            }),
            (e._handleSwipe = function () {
              var t = Math.abs(this.touchDeltaX);
              if (!(t <= 40)) {
                var e = t / this.touchDeltaX;
                (this.touchDeltaX = 0),
                  e > 0 && this.prev(),
                  e < 0 && this.next();
              }
            }),
            (e._addEventListeners = function () {
              var t = this;
              this._config.keyboard &&
                o
                  .default(this._element)
                  .on("keydown.bs.carousel", function (e) {
                    return t._keydown(e);
                  }),
                "hover" === this._config.pause &&
                  o
                    .default(this._element)
                    .on("mouseenter.bs.carousel", function (e) {
                      return t.pause(e);
                    })
                    .on("mouseleave.bs.carousel", function (e) {
                      return t.cycle(e);
                    }),
                this._config.touch && this._addTouchEventListeners();
            }),
            (e._addTouchEventListeners = function () {
              var t = this;
              if (this._touchSupported) {
                var e = function (e) {
                    t._pointerEvent &&
                    w[e.originalEvent.pointerType.toUpperCase()]
                      ? (t.touchStartX = e.originalEvent.clientX)
                      : t._pointerEvent ||
                        (t.touchStartX = e.originalEvent.touches[0].clientX);
                  },
                  n = function (e) {
                    t._pointerEvent &&
                      w[e.originalEvent.pointerType.toUpperCase()] &&
                      (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX),
                      t._handleSwipe(),
                      "hover" === t._config.pause &&
                        (t.pause(),
                        t.touchTimeout && clearTimeout(t.touchTimeout),
                        (t.touchTimeout = setTimeout(function (e) {
                          return t.cycle(e);
                        }, 500 + t._config.interval)));
                  };
                o
                  .default(this._element.querySelectorAll(".carousel-item img"))
                  .on("dragstart.bs.carousel", function (t) {
                    return t.preventDefault();
                  }),
                  this._pointerEvent
                    ? (o
                        .default(this._element)
                        .on("pointerdown.bs.carousel", function (t) {
                          return e(t);
                        }),
                      o
                        .default(this._element)
                        .on("pointerup.bs.carousel", function (t) {
                          return n(t);
                        }),
                      this._element.classList.add("pointer-event"))
                    : (o
                        .default(this._element)
                        .on("touchstart.bs.carousel", function (t) {
                          return e(t);
                        }),
                      o
                        .default(this._element)
                        .on("touchmove.bs.carousel", function (e) {
                          return (function (e) {
                            t.touchDeltaX =
                              e.originalEvent.touches &&
                              e.originalEvent.touches.length > 1
                                ? 0
                                : e.originalEvent.touches[0].clientX -
                                  t.touchStartX;
                          })(e);
                        }),
                      o
                        .default(this._element)
                        .on("touchend.bs.carousel", function (t) {
                          return n(t);
                        }));
              }
            }),
            (e._keydown = function (t) {
              if (!/input|textarea/i.test(t.target.tagName))
                switch (t.which) {
                  case 37:
                    t.preventDefault(), this.prev();
                    break;
                  case 39:
                    t.preventDefault(), this.next();
                }
            }),
            (e._getItemIndex = function (t) {
              return (
                (this._items =
                  t && t.parentNode
                    ? [].slice.call(
                        t.parentNode.querySelectorAll(".carousel-item")
                      )
                    : []),
                this._items.indexOf(t)
              );
            }),
            (e._getItemByDirection = function (t, e) {
              var n = "next" === t,
                i = "prev" === t,
                o = this._getItemIndex(e),
                r = this._items.length - 1;
              if (((i && 0 === o) || (n && o === r)) && !this._config.wrap)
                return e;
              var a = (o + ("prev" === t ? -1 : 1)) % this._items.length;
              return -1 === a
                ? this._items[this._items.length - 1]
                : this._items[a];
            }),
            (e._triggerSlideEvent = function (t, e) {
              var n = this._getItemIndex(t),
                i = this._getItemIndex(
                  this._element.querySelector(".active.carousel-item")
                ),
                r = o.default.Event("slide.bs.carousel", {
                  relatedTarget: t,
                  direction: e,
                  from: i,
                  to: n,
                });
              return o.default(this._element).trigger(r), r;
            }),
            (e._setActiveIndicatorElement = function (t) {
              if (this._indicatorsElement) {
                var e = [].slice.call(
                  this._indicatorsElement.querySelectorAll(".active")
                );
                o.default(e).removeClass("active");
                var n = this._indicatorsElement.children[this._getItemIndex(t)];
                n && o.default(n).addClass("active");
              }
            }),
            (e._updateInterval = function () {
              var t =
                this._activeElement ||
                this._element.querySelector(".active.carousel-item");
              if (t) {
                var e = parseInt(t.getAttribute("data-interval"), 10);
                e
                  ? ((this._config.defaultInterval =
                      this._config.defaultInterval || this._config.interval),
                    (this._config.interval = e))
                  : (this._config.interval =
                      this._config.defaultInterval || this._config.interval);
              }
            }),
            (e._slide = function (t, e) {
              var n,
                i,
                r,
                a = this,
                s = this._element.querySelector(".active.carousel-item"),
                l = this._getItemIndex(s),
                u = e || (s && this._getItemByDirection(t, s)),
                f = this._getItemIndex(u),
                c = Boolean(this._interval);
              if (
                ("next" === t
                  ? ((n = "carousel-item-left"),
                    (i = "carousel-item-next"),
                    (r = "left"))
                  : ((n = "carousel-item-right"),
                    (i = "carousel-item-prev"),
                    (r = "right")),
                u && o.default(u).hasClass("active"))
              )
                this._isSliding = !1;
              else if (
                !this._triggerSlideEvent(u, r).isDefaultPrevented() &&
                s &&
                u
              ) {
                (this._isSliding = !0),
                  c && this.pause(),
                  this._setActiveIndicatorElement(u),
                  (this._activeElement = u);
                var h = o.default.Event("slid.bs.carousel", {
                  relatedTarget: u,
                  direction: r,
                  from: l,
                  to: f,
                });
                if (o.default(this._element).hasClass("slide")) {
                  o.default(u).addClass(i),
                    d.reflow(u),
                    o.default(s).addClass(n),
                    o.default(u).addClass(n);
                  var p = d.getTransitionDurationFromElement(s);
                  o.default(s)
                    .one(d.TRANSITION_END, function () {
                      o
                        .default(u)
                        .removeClass(n + " " + i)
                        .addClass("active"),
                        o.default(s).removeClass("active " + i + " " + n),
                        (a._isSliding = !1),
                        setTimeout(function () {
                          return o.default(a._element).trigger(h);
                        }, 0);
                    })
                    .emulateTransitionEnd(p);
                } else
                  o.default(s).removeClass("active"),
                    o.default(u).addClass("active"),
                    (this._isSliding = !1),
                    o.default(this._element).trigger(h);
                c && this.cycle();
              }
            }),
            (t._jQueryInterface = function (e) {
              return this.each(function () {
                var n = o.default(this).data("bs.carousel"),
                  i = l({}, b, o.default(this).data());
                "object" == typeof e && (i = l({}, i, e));
                var r = "string" == typeof e ? e : i.slide;
                if (
                  (n ||
                    ((n = new t(this, i)),
                    o.default(this).data("bs.carousel", n)),
                  "number" == typeof e)
                )
                  n.to(e);
                else if ("string" == typeof r) {
                  if (void 0 === n[r])
                    throw new TypeError('No method named "' + r + '"');
                  n[r]();
                } else i.interval && i.ride && (n.pause(), n.cycle());
              });
            }),
            (t._dataApiClickHandler = function (e) {
              var n = d.getSelectorFromElement(this);
              if (n) {
                var i = o.default(n)[0];
                if (i && o.default(i).hasClass("carousel")) {
                  var r = l({}, o.default(i).data(), o.default(this).data()),
                    a = this.getAttribute("data-slide-to");
                  a && (r.interval = !1),
                    t._jQueryInterface.call(o.default(i), r),
                    a && o.default(i).data("bs.carousel").to(a),
                    e.preventDefault();
                }
              }
            }),
            s(t, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.6.1";
                },
              },
              {
                key: "Default",
                get: function () {
                  return b;
                },
              },
            ]),
            t
          );
        })();
      o
        .default(document)
        .on(
          "click.bs.carousel.data-api",
          "[data-slide], [data-slide-to]",
          E._dataApiClickHandler
        ),
        o.default(window).on("load.bs.carousel.data-api", function () {
          for (
            var t = [].slice.call(
                document.querySelectorAll('[data-ride="carousel"]')
              ),
              e = 0,
              n = t.length;
            e < n;
            e++
          ) {
            var i = o.default(t[e]);
            E._jQueryInterface.call(i, i.data());
          }
        }),
        (o.default.fn[g] = E._jQueryInterface),
        (o.default.fn[g].Constructor = E),
        (o.default.fn[g].noConflict = function () {
          return (o.default.fn[g] = _), E._jQueryInterface;
        });
      var T = "collapse",
        C = o.default.fn[T],
        S = { toggle: !0, parent: "" },
        N = { toggle: "boolean", parent: "(string|element)" },
        D = (function () {
          function t(t, e) {
            (this._isTransitioning = !1),
              (this._element = t),
              (this._config = this._getConfig(e)),
              (this._triggerArray = [].slice.call(
                document.querySelectorAll(
                  '[data-toggle="collapse"][href="#' +
                    t.id +
                    '"],[data-toggle="collapse"][data-target="#' +
                    t.id +
                    '"]'
                )
              ));
            for (
              var n = [].slice.call(
                  document.querySelectorAll('[data-toggle="collapse"]')
                ),
                i = 0,
                o = n.length;
              i < o;
              i++
            ) {
              var r = n[i],
                a = d.getSelectorFromElement(r),
                s = [].slice
                  .call(document.querySelectorAll(a))
                  .filter(function (e) {
                    return e === t;
                  });
              null !== a &&
                s.length > 0 &&
                ((this._selector = a), this._triggerArray.push(r));
            }
            (this._parent = this._config.parent ? this._getParent() : null),
              this._config.parent ||
                this._addAriaAndCollapsedClass(
                  this._element,
                  this._triggerArray
                ),
              this._config.toggle && this.toggle();
          }
          var e = t.prototype;
          return (
            (e.toggle = function () {
              o.default(this._element).hasClass("show")
                ? this.hide()
                : this.show();
            }),
            (e.show = function () {
              var e,
                n,
                i = this;
              if (
                !(
                  this._isTransitioning ||
                  o.default(this._element).hasClass("show") ||
                  (this._parent &&
                    0 ===
                      (e = [].slice
                        .call(
                          this._parent.querySelectorAll(".show, .collapsing")
                        )
                        .filter(function (t) {
                          return "string" == typeof i._config.parent
                            ? t.getAttribute("data-parent") === i._config.parent
                            : t.classList.contains("collapse");
                        })).length &&
                    (e = null),
                  e &&
                    (n = o
                      .default(e)
                      .not(this._selector)
                      .data("bs.collapse")) &&
                    n._isTransitioning)
                )
              ) {
                var r = o.default.Event("show.bs.collapse");
                if (
                  (o.default(this._element).trigger(r), !r.isDefaultPrevented())
                ) {
                  e &&
                    (t._jQueryInterface.call(
                      o.default(e).not(this._selector),
                      "hide"
                    ),
                    n || o.default(e).data("bs.collapse", null));
                  var a = this._getDimension();
                  o
                    .default(this._element)
                    .removeClass("collapse")
                    .addClass("collapsing"),
                    (this._element.style[a] = 0),
                    this._triggerArray.length &&
                      o
                        .default(this._triggerArray)
                        .removeClass("collapsed")
                        .attr("aria-expanded", !0),
                    this.setTransitioning(!0);
                  var s = "scroll" + (a[0].toUpperCase() + a.slice(1)),
                    l = d.getTransitionDurationFromElement(this._element);
                  o
                    .default(this._element)
                    .one(d.TRANSITION_END, function () {
                      o
                        .default(i._element)
                        .removeClass("collapsing")
                        .addClass("collapse show"),
                        (i._element.style[a] = ""),
                        i.setTransitioning(!1),
                        o.default(i._element).trigger("shown.bs.collapse");
                    })
                    .emulateTransitionEnd(l),
                    (this._element.style[a] = this._element[s] + "px");
                }
              }
            }),
            (e.hide = function () {
              var t = this;
              if (
                !this._isTransitioning &&
                o.default(this._element).hasClass("show")
              ) {
                var e = o.default.Event("hide.bs.collapse");
                if (
                  (o.default(this._element).trigger(e), !e.isDefaultPrevented())
                ) {
                  var n = this._getDimension();
                  (this._element.style[n] =
                    this._element.getBoundingClientRect()[n] + "px"),
                    d.reflow(this._element),
                    o
                      .default(this._element)
                      .addClass("collapsing")
                      .removeClass("collapse show");
                  var i = this._triggerArray.length;
                  if (i > 0)
                    for (var r = 0; r < i; r++) {
                      var a = this._triggerArray[r],
                        s = d.getSelectorFromElement(a);
                      null !== s &&
                        (o
                          .default([].slice.call(document.querySelectorAll(s)))
                          .hasClass("show") ||
                          o
                            .default(a)
                            .addClass("collapsed")
                            .attr("aria-expanded", !1));
                    }
                  this.setTransitioning(!0), (this._element.style[n] = "");
                  var l = d.getTransitionDurationFromElement(this._element);
                  o.default(this._element)
                    .one(d.TRANSITION_END, function () {
                      t.setTransitioning(!1),
                        o
                          .default(t._element)
                          .removeClass("collapsing")
                          .addClass("collapse")
                          .trigger("hidden.bs.collapse");
                    })
                    .emulateTransitionEnd(l);
                }
              }
            }),
            (e.setTransitioning = function (t) {
              this._isTransitioning = t;
            }),
            (e.dispose = function () {
              o.default.removeData(this._element, "bs.collapse"),
                (this._config = null),
                (this._parent = null),
                (this._element = null),
                (this._triggerArray = null),
                (this._isTransitioning = null);
            }),
            (e._getConfig = function (t) {
              return (
                ((t = l({}, S, t)).toggle = Boolean(t.toggle)),
                d.typeCheckConfig(T, t, N),
                t
              );
            }),
            (e._getDimension = function () {
              return o.default(this._element).hasClass("width")
                ? "width"
                : "height";
            }),
            (e._getParent = function () {
              var e,
                n = this;
              d.isElement(this._config.parent)
                ? ((e = this._config.parent),
                  void 0 !== this._config.parent.jquery &&
                    (e = this._config.parent[0]))
                : (e = document.querySelector(this._config.parent));
              var i =
                  '[data-toggle="collapse"][data-parent="' +
                  this._config.parent +
                  '"]',
                r = [].slice.call(e.querySelectorAll(i));
              return (
                o.default(r).each(function (e, i) {
                  n._addAriaAndCollapsedClass(t._getTargetFromElement(i), [i]);
                }),
                e
              );
            }),
            (e._addAriaAndCollapsedClass = function (t, e) {
              var n = o.default(t).hasClass("show");
              e.length &&
                o
                  .default(e)
                  .toggleClass("collapsed", !n)
                  .attr("aria-expanded", n);
            }),
            (t._getTargetFromElement = function (t) {
              var e = d.getSelectorFromElement(t);
              return e ? document.querySelector(e) : null;
            }),
            (t._jQueryInterface = function (e) {
              return this.each(function () {
                var n = o.default(this),
                  i = n.data("bs.collapse"),
                  r = l({}, S, n.data(), "object" == typeof e && e ? e : {});
                if (
                  (!i &&
                    r.toggle &&
                    "string" == typeof e &&
                    /show|hide/.test(e) &&
                    (r.toggle = !1),
                  i || ((i = new t(this, r)), n.data("bs.collapse", i)),
                  "string" == typeof e)
                ) {
                  if (void 0 === i[e])
                    throw new TypeError('No method named "' + e + '"');
                  i[e]();
                }
              });
            }),
            s(t, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.6.1";
                },
              },
              {
                key: "Default",
                get: function () {
                  return S;
                },
              },
            ]),
            t
          );
        })();
      o
        .default(document)
        .on(
          "click.bs.collapse.data-api",
          '[data-toggle="collapse"]',
          function (t) {
            "A" === t.currentTarget.tagName && t.preventDefault();
            var e = o.default(this),
              n = d.getSelectorFromElement(this),
              i = [].slice.call(document.querySelectorAll(n));
            o.default(i).each(function () {
              var t = o.default(this),
                n = t.data("bs.collapse") ? "toggle" : e.data();
              D._jQueryInterface.call(t, n);
            });
          }
        ),
        (o.default.fn[T] = D._jQueryInterface),
        (o.default.fn[T].Constructor = D),
        (o.default.fn[T].noConflict = function () {
          return (o.default.fn[T] = C), D._jQueryInterface;
        });
      var k = "dropdown",
        A = o.default.fn[k],
        I = new RegExp("38|40|27"),
        O = {
          offset: 0,
          flip: !0,
          boundary: "scrollParent",
          reference: "toggle",
          display: "dynamic",
          popperConfig: null,
        },
        x = {
          offset: "(number|string|function)",
          flip: "boolean",
          boundary: "(string|element)",
          reference: "(string|element)",
          display: "string",
          popperConfig: "(null|object)",
        },
        j = (function () {
          function t(t, e) {
            (this._element = t),
              (this._popper = null),
              (this._config = this._getConfig(e)),
              (this._menu = this._getMenuElement()),
              (this._inNavbar = this._detectNavbar()),
              this._addEventListeners();
          }
          var e = t.prototype;
          return (
            (e.toggle = function () {
              if (
                !this._element.disabled &&
                !o.default(this._element).hasClass("disabled")
              ) {
                var e = o.default(this._menu).hasClass("show");
                t._clearMenus(), e || this.show(!0);
              }
            }),
            (e.show = function (e) {
              if (
                (void 0 === e && (e = !1),
                !(
                  this._element.disabled ||
                  o.default(this._element).hasClass("disabled") ||
                  o.default(this._menu).hasClass("show")
                ))
              ) {
                var n = { relatedTarget: this._element },
                  i = o.default.Event("show.bs.dropdown", n),
                  a = t._getParentFromElement(this._element);
                if ((o.default(a).trigger(i), !i.isDefaultPrevented())) {
                  if (!this._inNavbar && e) {
                    if (void 0 === r.default)
                      throw new TypeError(
                        "Bootstrap's dropdowns require Popper (https://popper.js.org)"
                      );
                    var s = this._element;
                    "parent" === this._config.reference
                      ? (s = a)
                      : d.isElement(this._config.reference) &&
                        ((s = this._config.reference),
                        void 0 !== this._config.reference.jquery &&
                          (s = this._config.reference[0])),
                      "scrollParent" !== this._config.boundary &&
                        o.default(a).addClass("position-static"),
                      (this._popper = new r.default(
                        s,
                        this._menu,
                        this._getPopperConfig()
                      ));
                  }
                  "ontouchstart" in document.documentElement &&
                    0 === o.default(a).closest(".navbar-nav").length &&
                    o
                      .default(document.body)
                      .children()
                      .on("mouseover", null, o.default.noop),
                    this._element.focus(),
                    this._element.setAttribute("aria-expanded", !0),
                    o.default(this._menu).toggleClass("show"),
                    o
                      .default(a)
                      .toggleClass("show")
                      .trigger(o.default.Event("shown.bs.dropdown", n));
                }
              }
            }),
            (e.hide = function () {
              if (
                !this._element.disabled &&
                !o.default(this._element).hasClass("disabled") &&
                o.default(this._menu).hasClass("show")
              ) {
                var e = { relatedTarget: this._element },
                  n = o.default.Event("hide.bs.dropdown", e),
                  i = t._getParentFromElement(this._element);
                o.default(i).trigger(n),
                  n.isDefaultPrevented() ||
                    (this._popper && this._popper.destroy(),
                    o.default(this._menu).toggleClass("show"),
                    o
                      .default(i)
                      .toggleClass("show")
                      .trigger(o.default.Event("hidden.bs.dropdown", e)));
              }
            }),
            (e.dispose = function () {
              o.default.removeData(this._element, "bs.dropdown"),
                o.default(this._element).off(".bs.dropdown"),
                (this._element = null),
                (this._menu = null),
                null !== this._popper &&
                  (this._popper.destroy(), (this._popper = null));
            }),
            (e.update = function () {
              (this._inNavbar = this._detectNavbar()),
                null !== this._popper && this._popper.scheduleUpdate();
            }),
            (e._addEventListeners = function () {
              var t = this;
              o.default(this._element).on("click.bs.dropdown", function (e) {
                e.preventDefault(), e.stopPropagation(), t.toggle();
              });
            }),
            (e._getConfig = function (t) {
              return (
                (t = l(
                  {},
                  this.constructor.Default,
                  o.default(this._element).data(),
                  t
                )),
                d.typeCheckConfig(k, t, this.constructor.DefaultType),
                t
              );
            }),
            (e._getMenuElement = function () {
              if (!this._menu) {
                var e = t._getParentFromElement(this._element);
                e && (this._menu = e.querySelector(".dropdown-menu"));
              }
              return this._menu;
            }),
            (e._getPlacement = function () {
              var t = o.default(this._element.parentNode),
                e = "bottom-start";
              return (
                t.hasClass("dropup")
                  ? (e = o.default(this._menu).hasClass("dropdown-menu-right")
                      ? "top-end"
                      : "top-start")
                  : t.hasClass("dropright")
                  ? (e = "right-start")
                  : t.hasClass("dropleft")
                  ? (e = "left-start")
                  : o.default(this._menu).hasClass("dropdown-menu-right") &&
                    (e = "bottom-end"),
                e
              );
            }),
            (e._detectNavbar = function () {
              return o.default(this._element).closest(".navbar").length > 0;
            }),
            (e._getOffset = function () {
              var t = this,
                e = {};
              return (
                "function" == typeof this._config.offset
                  ? (e.fn = function (e) {
                      return (
                        (e.offsets = l(
                          {},
                          e.offsets,
                          t._config.offset(e.offsets, t._element)
                        )),
                        e
                      );
                    })
                  : (e.offset = this._config.offset),
                e
              );
            }),
            (e._getPopperConfig = function () {
              var t = {
                placement: this._getPlacement(),
                modifiers: {
                  offset: this._getOffset(),
                  flip: { enabled: this._config.flip },
                  preventOverflow: { boundariesElement: this._config.boundary },
                },
              };
              return (
                "static" === this._config.display &&
                  (t.modifiers.applyStyle = { enabled: !1 }),
                l({}, t, this._config.popperConfig)
              );
            }),
            (t._jQueryInterface = function (e) {
              return this.each(function () {
                var n = o.default(this).data("bs.dropdown");
                if (
                  (n ||
                    ((n = new t(this, "object" == typeof e ? e : null)),
                    o.default(this).data("bs.dropdown", n)),
                  "string" == typeof e)
                ) {
                  if (void 0 === n[e])
                    throw new TypeError('No method named "' + e + '"');
                  n[e]();
                }
              });
            }),
            (t._clearMenus = function (e) {
              if (
                !e ||
                (3 !== e.which && ("keyup" !== e.type || 9 === e.which))
              )
                for (
                  var n = [].slice.call(
                      document.querySelectorAll('[data-toggle="dropdown"]')
                    ),
                    i = 0,
                    r = n.length;
                  i < r;
                  i++
                ) {
                  var a = t._getParentFromElement(n[i]),
                    s = o.default(n[i]).data("bs.dropdown"),
                    l = { relatedTarget: n[i] };
                  if ((e && "click" === e.type && (l.clickEvent = e), s)) {
                    var u = s._menu;
                    if (
                      o.default(a).hasClass("show") &&
                      !(
                        e &&
                        (("click" === e.type &&
                          /input|textarea/i.test(e.target.tagName)) ||
                          ("keyup" === e.type && 9 === e.which)) &&
                        o.default.contains(a, e.target)
                      )
                    ) {
                      var f = o.default.Event("hide.bs.dropdown", l);
                      o.default(a).trigger(f),
                        f.isDefaultPrevented() ||
                          ("ontouchstart" in document.documentElement &&
                            o
                              .default(document.body)
                              .children()
                              .off("mouseover", null, o.default.noop),
                          n[i].setAttribute("aria-expanded", "false"),
                          s._popper && s._popper.destroy(),
                          o.default(u).removeClass("show"),
                          o
                            .default(a)
                            .removeClass("show")
                            .trigger(o.default.Event("hidden.bs.dropdown", l)));
                    }
                  }
                }
            }),
            (t._getParentFromElement = function (t) {
              var e,
                n = d.getSelectorFromElement(t);
              return n && (e = document.querySelector(n)), e || t.parentNode;
            }),
            (t._dataApiKeydownHandler = function (e) {
              if (
                !(/input|textarea/i.test(e.target.tagName)
                  ? 32 === e.which ||
                    (27 !== e.which &&
                      ((40 !== e.which && 38 !== e.which) ||
                        o.default(e.target).closest(".dropdown-menu").length))
                  : !I.test(e.which)) &&
                !this.disabled &&
                !o.default(this).hasClass("disabled")
              ) {
                var n = t._getParentFromElement(this),
                  i = o.default(n).hasClass("show");
                if (i || 27 !== e.which) {
                  if (
                    (e.preventDefault(),
                    e.stopPropagation(),
                    !i || 27 === e.which || 32 === e.which)
                  )
                    return (
                      27 === e.which &&
                        o
                          .default(n.querySelector('[data-toggle="dropdown"]'))
                          .trigger("focus"),
                      void o.default(this).trigger("click")
                    );
                  var r = [].slice
                    .call(
                      n.querySelectorAll(
                        ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
                      )
                    )
                    .filter(function (t) {
                      return o.default(t).is(":visible");
                    });
                  if (0 !== r.length) {
                    var a = r.indexOf(e.target);
                    38 === e.which && a > 0 && a--,
                      40 === e.which && a < r.length - 1 && a++,
                      a < 0 && (a = 0),
                      r[a].focus();
                  }
                }
              }
            }),
            s(t, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.6.1";
                },
              },
              {
                key: "Default",
                get: function () {
                  return O;
                },
              },
              {
                key: "DefaultType",
                get: function () {
                  return x;
                },
              },
            ]),
            t
          );
        })();
      o
        .default(document)
        .on(
          "keydown.bs.dropdown.data-api",
          '[data-toggle="dropdown"]',
          j._dataApiKeydownHandler
        )
        .on(
          "keydown.bs.dropdown.data-api",
          ".dropdown-menu",
          j._dataApiKeydownHandler
        )
        .on(
          "click.bs.dropdown.data-api keyup.bs.dropdown.data-api",
          j._clearMenus
        )
        .on(
          "click.bs.dropdown.data-api",
          '[data-toggle="dropdown"]',
          function (t) {
            t.preventDefault(),
              t.stopPropagation(),
              j._jQueryInterface.call(o.default(this), "toggle");
          }
        )
        .on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
          t.stopPropagation();
        }),
        (o.default.fn[k] = j._jQueryInterface),
        (o.default.fn[k].Constructor = j),
        (o.default.fn[k].noConflict = function () {
          return (o.default.fn[k] = A), j._jQueryInterface;
        });
      var L = o.default.fn.modal,
        P = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
        F = {
          backdrop: "(boolean|string)",
          keyboard: "boolean",
          focus: "boolean",
          show: "boolean",
        },
        R = (function () {
          function t(t, e) {
            (this._config = this._getConfig(e)),
              (this._element = t),
              (this._dialog = t.querySelector(".modal-dialog")),
              (this._backdrop = null),
              (this._isShown = !1),
              (this._isBodyOverflowing = !1),
              (this._ignoreBackdropClick = !1),
              (this._isTransitioning = !1),
              (this._scrollbarWidth = 0);
          }
          var e = t.prototype;
          return (
            (e.toggle = function (t) {
              return this._isShown ? this.hide() : this.show(t);
            }),
            (e.show = function (t) {
              var e = this;
              if (!this._isShown && !this._isTransitioning) {
                var n = o.default.Event("show.bs.modal", { relatedTarget: t });
                o.default(this._element).trigger(n),
                  n.isDefaultPrevented() ||
                    ((this._isShown = !0),
                    o.default(this._element).hasClass("fade") &&
                      (this._isTransitioning = !0),
                    this._checkScrollbar(),
                    this._setScrollbar(),
                    this._adjustDialog(),
                    this._setEscapeEvent(),
                    this._setResizeEvent(),
                    o
                      .default(this._element)
                      .on(
                        "click.dismiss.bs.modal",
                        '[data-dismiss="modal"]',
                        function (t) {
                          return e.hide(t);
                        }
                      ),
                    o
                      .default(this._dialog)
                      .on("mousedown.dismiss.bs.modal", function () {
                        o.default(e._element).one(
                          "mouseup.dismiss.bs.modal",
                          function (t) {
                            o.default(t.target).is(e._element) &&
                              (e._ignoreBackdropClick = !0);
                          }
                        );
                      }),
                    this._showBackdrop(function () {
                      return e._showElement(t);
                    }));
              }
            }),
            (e.hide = function (t) {
              var e = this;
              if (
                (t && t.preventDefault(),
                this._isShown && !this._isTransitioning)
              ) {
                var n = o.default.Event("hide.bs.modal");
                if (
                  (o.default(this._element).trigger(n),
                  this._isShown && !n.isDefaultPrevented())
                ) {
                  this._isShown = !1;
                  var i = o.default(this._element).hasClass("fade");
                  if (
                    (i && (this._isTransitioning = !0),
                    this._setEscapeEvent(),
                    this._setResizeEvent(),
                    o.default(document).off("focusin.bs.modal"),
                    o.default(this._element).removeClass("show"),
                    o.default(this._element).off("click.dismiss.bs.modal"),
                    o.default(this._dialog).off("mousedown.dismiss.bs.modal"),
                    i)
                  ) {
                    var r = d.getTransitionDurationFromElement(this._element);
                    o.default(this._element)
                      .one(d.TRANSITION_END, function (t) {
                        return e._hideModal(t);
                      })
                      .emulateTransitionEnd(r);
                  } else this._hideModal();
                }
              }
            }),
            (e.dispose = function () {
              [window, this._element, this._dialog].forEach(function (t) {
                return o.default(t).off(".bs.modal");
              }),
                o.default(document).off("focusin.bs.modal"),
                o.default.removeData(this._element, "bs.modal"),
                (this._config = null),
                (this._element = null),
                (this._dialog = null),
                (this._backdrop = null),
                (this._isShown = null),
                (this._isBodyOverflowing = null),
                (this._ignoreBackdropClick = null),
                (this._isTransitioning = null),
                (this._scrollbarWidth = null);
            }),
            (e.handleUpdate = function () {
              this._adjustDialog();
            }),
            (e._getConfig = function (t) {
              return (t = l({}, P, t)), d.typeCheckConfig("modal", t, F), t;
            }),
            (e._triggerBackdropTransition = function () {
              var t = this,
                e = o.default.Event("hidePrevented.bs.modal");
              if (
                (o.default(this._element).trigger(e), !e.isDefaultPrevented())
              ) {
                var n =
                  this._element.scrollHeight >
                  document.documentElement.clientHeight;
                n || (this._element.style.overflowY = "hidden"),
                  this._element.classList.add("modal-static");
                var i = d.getTransitionDurationFromElement(this._dialog);
                o.default(this._element).off(d.TRANSITION_END),
                  o
                    .default(this._element)
                    .one(d.TRANSITION_END, function () {
                      t._element.classList.remove("modal-static"),
                        n ||
                          o
                            .default(t._element)
                            .one(d.TRANSITION_END, function () {
                              t._element.style.overflowY = "";
                            })
                            .emulateTransitionEnd(t._element, i);
                    })
                    .emulateTransitionEnd(i),
                  this._element.focus();
              }
            }),
            (e._showElement = function (t) {
              var e = this,
                n = o.default(this._element).hasClass("fade"),
                i = this._dialog
                  ? this._dialog.querySelector(".modal-body")
                  : null;
              (this._element.parentNode &&
                this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
                document.body.appendChild(this._element),
                (this._element.style.display = "block"),
                this._element.removeAttribute("aria-hidden"),
                this._element.setAttribute("aria-modal", !0),
                this._element.setAttribute("role", "dialog"),
                o.default(this._dialog).hasClass("modal-dialog-scrollable") && i
                  ? (i.scrollTop = 0)
                  : (this._element.scrollTop = 0),
                n && d.reflow(this._element),
                o.default(this._element).addClass("show"),
                this._config.focus && this._enforceFocus();
              var r = o.default.Event("shown.bs.modal", { relatedTarget: t }),
                a = function () {
                  e._config.focus && e._element.focus(),
                    (e._isTransitioning = !1),
                    o.default(e._element).trigger(r);
                };
              if (n) {
                var s = d.getTransitionDurationFromElement(this._dialog);
                o.default(this._dialog)
                  .one(d.TRANSITION_END, a)
                  .emulateTransitionEnd(s);
              } else a();
            }),
            (e._enforceFocus = function () {
              var t = this;
              o.default(document)
                .off("focusin.bs.modal")
                .on("focusin.bs.modal", function (e) {
                  document !== e.target &&
                    t._element !== e.target &&
                    0 === o.default(t._element).has(e.target).length &&
                    t._element.focus();
                });
            }),
            (e._setEscapeEvent = function () {
              var t = this;
              this._isShown
                ? o
                    .default(this._element)
                    .on("keydown.dismiss.bs.modal", function (e) {
                      t._config.keyboard && 27 === e.which
                        ? (e.preventDefault(), t.hide())
                        : t._config.keyboard ||
                          27 !== e.which ||
                          t._triggerBackdropTransition();
                    })
                : this._isShown ||
                  o.default(this._element).off("keydown.dismiss.bs.modal");
            }),
            (e._setResizeEvent = function () {
              var t = this;
              this._isShown
                ? o.default(window).on("resize.bs.modal", function (e) {
                    return t.handleUpdate(e);
                  })
                : o.default(window).off("resize.bs.modal");
            }),
            (e._hideModal = function () {
              var t = this;
              (this._element.style.display = "none"),
                this._element.setAttribute("aria-hidden", !0),
                this._element.removeAttribute("aria-modal"),
                this._element.removeAttribute("role"),
                (this._isTransitioning = !1),
                this._showBackdrop(function () {
                  o.default(document.body).removeClass("modal-open"),
                    t._resetAdjustments(),
                    t._resetScrollbar(),
                    o.default(t._element).trigger("hidden.bs.modal");
                });
            }),
            (e._removeBackdrop = function () {
              this._backdrop &&
                (o.default(this._backdrop).remove(), (this._backdrop = null));
            }),
            (e._showBackdrop = function (t) {
              var e = this,
                n = o.default(this._element).hasClass("fade") ? "fade" : "";
              if (this._isShown && this._config.backdrop) {
                if (
                  ((this._backdrop = document.createElement("div")),
                  (this._backdrop.className = "modal-backdrop"),
                  n && this._backdrop.classList.add(n),
                  o.default(this._backdrop).appendTo(document.body),
                  o
                    .default(this._element)
                    .on("click.dismiss.bs.modal", function (t) {
                      e._ignoreBackdropClick
                        ? (e._ignoreBackdropClick = !1)
                        : t.target === t.currentTarget &&
                          ("static" === e._config.backdrop
                            ? e._triggerBackdropTransition()
                            : e.hide());
                    }),
                  n && d.reflow(this._backdrop),
                  o.default(this._backdrop).addClass("show"),
                  !t)
                )
                  return;
                if (!n) return void t();
                var i = d.getTransitionDurationFromElement(this._backdrop);
                o.default(this._backdrop)
                  .one(d.TRANSITION_END, t)
                  .emulateTransitionEnd(i);
              } else if (!this._isShown && this._backdrop) {
                o.default(this._backdrop).removeClass("show");
                var r = function () {
                  e._removeBackdrop(), t && t();
                };
                if (o.default(this._element).hasClass("fade")) {
                  var a = d.getTransitionDurationFromElement(this._backdrop);
                  o.default(this._backdrop)
                    .one(d.TRANSITION_END, r)
                    .emulateTransitionEnd(a);
                } else r();
              } else t && t();
            }),
            (e._adjustDialog = function () {
              var t =
                this._element.scrollHeight >
                document.documentElement.clientHeight;
              !this._isBodyOverflowing &&
                t &&
                (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
                this._isBodyOverflowing &&
                  !t &&
                  (this._element.style.paddingRight =
                    this._scrollbarWidth + "px");
            }),
            (e._resetAdjustments = function () {
              (this._element.style.paddingLeft = ""),
                (this._element.style.paddingRight = "");
            }),
            (e._checkScrollbar = function () {
              var t = document.body.getBoundingClientRect();
              (this._isBodyOverflowing =
                Math.round(t.left + t.right) < window.innerWidth),
                (this._scrollbarWidth = this._getScrollbarWidth());
            }),
            (e._setScrollbar = function () {
              var t = this;
              if (this._isBodyOverflowing) {
                var e = [].slice.call(
                    document.querySelectorAll(
                      ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
                    )
                  ),
                  n = [].slice.call(document.querySelectorAll(".sticky-top"));
                o.default(e).each(function (e, n) {
                  var i = n.style.paddingRight,
                    r = o.default(n).css("padding-right");
                  o.default(n)
                    .data("padding-right", i)
                    .css(
                      "padding-right",
                      parseFloat(r) + t._scrollbarWidth + "px"
                    );
                }),
                  o.default(n).each(function (e, n) {
                    var i = n.style.marginRight,
                      r = o.default(n).css("margin-right");
                    o.default(n)
                      .data("margin-right", i)
                      .css(
                        "margin-right",
                        parseFloat(r) - t._scrollbarWidth + "px"
                      );
                  });
                var i = document.body.style.paddingRight,
                  r = o.default(document.body).css("padding-right");
                o.default(document.body)
                  .data("padding-right", i)
                  .css(
                    "padding-right",
                    parseFloat(r) + this._scrollbarWidth + "px"
                  );
              }
              o.default(document.body).addClass("modal-open");
            }),
            (e._resetScrollbar = function () {
              var t = [].slice.call(
                document.querySelectorAll(
                  ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
                )
              );
              o.default(t).each(function (t, e) {
                var n = o.default(e).data("padding-right");
                o.default(e).removeData("padding-right"),
                  (e.style.paddingRight = n || "");
              });
              var e = [].slice.call(document.querySelectorAll(".sticky-top"));
              o.default(e).each(function (t, e) {
                var n = o.default(e).data("margin-right");
                void 0 !== n &&
                  o
                    .default(e)
                    .css("margin-right", n)
                    .removeData("margin-right");
              });
              var n = o.default(document.body).data("padding-right");
              o.default(document.body).removeData("padding-right"),
                (document.body.style.paddingRight = n || "");
            }),
            (e._getScrollbarWidth = function () {
              var t = document.createElement("div");
              (t.className = "modal-scrollbar-measure"),
                document.body.appendChild(t);
              var e = t.getBoundingClientRect().width - t.clientWidth;
              return document.body.removeChild(t), e;
            }),
            (t._jQueryInterface = function (e, n) {
              return this.each(function () {
                var i = o.default(this).data("bs.modal"),
                  r = l(
                    {},
                    P,
                    o.default(this).data(),
                    "object" == typeof e && e ? e : {}
                  );
                if (
                  (i ||
                    ((i = new t(this, r)), o.default(this).data("bs.modal", i)),
                  "string" == typeof e)
                ) {
                  if (void 0 === i[e])
                    throw new TypeError('No method named "' + e + '"');
                  i[e](n);
                } else r.show && i.show(n);
              });
            }),
            s(t, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.6.1";
                },
              },
              {
                key: "Default",
                get: function () {
                  return P;
                },
              },
            ]),
            t
          );
        })();
      o
        .default(document)
        .on("click.bs.modal.data-api", '[data-toggle="modal"]', function (t) {
          var e,
            n = this,
            i = d.getSelectorFromElement(this);
          i && (e = document.querySelector(i));
          var r = o.default(e).data("bs.modal")
            ? "toggle"
            : l({}, o.default(e).data(), o.default(this).data());
          ("A" !== this.tagName && "AREA" !== this.tagName) ||
            t.preventDefault();
          var a = o.default(e).one("show.bs.modal", function (t) {
            t.isDefaultPrevented() ||
              a.one("hidden.bs.modal", function () {
                o.default(n).is(":visible") && n.focus();
              });
          });
          R._jQueryInterface.call(o.default(e), r, this);
        }),
        (o.default.fn.modal = R._jQueryInterface),
        (o.default.fn.modal.Constructor = R),
        (o.default.fn.modal.noConflict = function () {
          return (o.default.fn.modal = L), R._jQueryInterface;
        });
      var M = [
          "background",
          "cite",
          "href",
          "itemtype",
          "longdesc",
          "poster",
          "src",
          "xlink:href",
        ],
        B = {
          "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
          a: ["target", "href", "title", "rel"],
          area: [],
          b: [],
          br: [],
          col: [],
          code: [],
          div: [],
          em: [],
          hr: [],
          h1: [],
          h2: [],
          h3: [],
          h4: [],
          h5: [],
          h6: [],
          i: [],
          img: ["src", "srcset", "alt", "title", "width", "height"],
          li: [],
          ol: [],
          p: [],
          pre: [],
          s: [],
          small: [],
          span: [],
          sub: [],
          sup: [],
          strong: [],
          u: [],
          ul: [],
        },
        H = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
        q =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
      function Q(t, e, n) {
        if (0 === t.length) return t;
        if (n && "function" == typeof n) return n(t);
        for (
          var i = new window.DOMParser().parseFromString(t, "text/html"),
            o = Object.keys(e),
            r = [].slice.call(i.body.querySelectorAll("*")),
            a = function (t, n) {
              var i = r[t],
                a = i.nodeName.toLowerCase();
              if (-1 === o.indexOf(i.nodeName.toLowerCase()))
                return i.parentNode.removeChild(i), "continue";
              var s = [].slice.call(i.attributes),
                l = [].concat(e["*"] || [], e[a] || []);
              s.forEach(function (t) {
                (function (t, e) {
                  var n = t.nodeName.toLowerCase();
                  if (-1 !== e.indexOf(n))
                    return (
                      -1 === M.indexOf(n) ||
                      Boolean(H.test(t.nodeValue) || q.test(t.nodeValue))
                    );
                  for (
                    var i = e.filter(function (t) {
                        return t instanceof RegExp;
                      }),
                      o = 0,
                      r = i.length;
                    o < r;
                    o++
                  )
                    if (i[o].test(n)) return !0;
                  return !1;
                })(t, l) || i.removeAttribute(t.nodeName);
              });
            },
            s = 0,
            l = r.length;
          s < l;
          s++
        )
          a(s);
        return i.body.innerHTML;
      }
      var W = "tooltip",
        U = o.default.fn[W],
        V = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        Y = ["sanitize", "whiteList", "sanitizeFn"],
        z = {
          AUTO: "auto",
          TOP: "top",
          RIGHT: "right",
          BOTTOM: "bottom",
          LEFT: "left",
        },
        K = {
          animation: !0,
          template:
            '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
          trigger: "hover focus",
          title: "",
          delay: 0,
          html: !1,
          selector: !1,
          placement: "top",
          offset: 0,
          container: !1,
          fallbackPlacement: "flip",
          boundary: "scrollParent",
          customClass: "",
          sanitize: !0,
          sanitizeFn: null,
          whiteList: B,
          popperConfig: null,
        },
        X = {
          animation: "boolean",
          template: "string",
          title: "(string|element|function)",
          trigger: "string",
          delay: "(number|object)",
          html: "boolean",
          selector: "(string|boolean)",
          placement: "(string|function)",
          offset: "(number|string|function)",
          container: "(string|element|boolean)",
          fallbackPlacement: "(string|array)",
          boundary: "(string|element)",
          customClass: "(string|function)",
          sanitize: "boolean",
          sanitizeFn: "(null|function)",
          whiteList: "object",
          popperConfig: "(null|object)",
        },
        $ = {
          HIDE: "hide.bs.tooltip",
          HIDDEN: "hidden.bs.tooltip",
          SHOW: "show.bs.tooltip",
          SHOWN: "shown.bs.tooltip",
          INSERTED: "inserted.bs.tooltip",
          CLICK: "click.bs.tooltip",
          FOCUSIN: "focusin.bs.tooltip",
          FOCUSOUT: "focusout.bs.tooltip",
          MOUSEENTER: "mouseenter.bs.tooltip",
          MOUSELEAVE: "mouseleave.bs.tooltip",
        },
        G = (function () {
          function t(t, e) {
            if (void 0 === r.default)
              throw new TypeError(
                "Bootstrap's tooltips require Popper (https://popper.js.org)"
              );
            (this._isEnabled = !0),
              (this._timeout = 0),
              (this._hoverState = ""),
              (this._activeTrigger = {}),
              (this._popper = null),
              (this.element = t),
              (this.config = this._getConfig(e)),
              (this.tip = null),
              this._setListeners();
          }
          var e = t.prototype;
          return (
            (e.enable = function () {
              this._isEnabled = !0;
            }),
            (e.disable = function () {
              this._isEnabled = !1;
            }),
            (e.toggleEnabled = function () {
              this._isEnabled = !this._isEnabled;
            }),
            (e.toggle = function (t) {
              if (this._isEnabled)
                if (t) {
                  var e = this.constructor.DATA_KEY,
                    n = o.default(t.currentTarget).data(e);
                  n ||
                    ((n = new this.constructor(
                      t.currentTarget,
                      this._getDelegateConfig()
                    )),
                    o.default(t.currentTarget).data(e, n)),
                    (n._activeTrigger.click = !n._activeTrigger.click),
                    n._isWithActiveTrigger()
                      ? n._enter(null, n)
                      : n._leave(null, n);
                } else {
                  if (o.default(this.getTipElement()).hasClass("show"))
                    return void this._leave(null, this);
                  this._enter(null, this);
                }
            }),
            (e.dispose = function () {
              clearTimeout(this._timeout),
                o.default.removeData(this.element, this.constructor.DATA_KEY),
                o.default(this.element).off(this.constructor.EVENT_KEY),
                o
                  .default(this.element)
                  .closest(".modal")
                  .off("hide.bs.modal", this._hideModalHandler),
                this.tip && o.default(this.tip).remove(),
                (this._isEnabled = null),
                (this._timeout = null),
                (this._hoverState = null),
                (this._activeTrigger = null),
                this._popper && this._popper.destroy(),
                (this._popper = null),
                (this.element = null),
                (this.config = null),
                (this.tip = null);
            }),
            (e.show = function () {
              var t = this;
              if ("none" === o.default(this.element).css("display"))
                throw new Error("Please use show on visible elements");
              var e = o.default.Event(this.constructor.Event.SHOW);
              if (this.isWithContent() && this._isEnabled) {
                o.default(this.element).trigger(e);
                var n = d.findShadowRoot(this.element),
                  i = o.default.contains(
                    null !== n ? n : this.element.ownerDocument.documentElement,
                    this.element
                  );
                if (e.isDefaultPrevented() || !i) return;
                var a = this.getTipElement(),
                  s = d.getUID(this.constructor.NAME);
                a.setAttribute("id", s),
                  this.element.setAttribute("aria-describedby", s),
                  this.setContent(),
                  this.config.animation && o.default(a).addClass("fade");
                var l =
                    "function" == typeof this.config.placement
                      ? this.config.placement.call(this, a, this.element)
                      : this.config.placement,
                  u = this._getAttachment(l);
                this.addAttachmentClass(u);
                var f = this._getContainer();
                o.default(a).data(this.constructor.DATA_KEY, this),
                  o.default.contains(
                    this.element.ownerDocument.documentElement,
                    this.tip
                  ) || o.default(a).appendTo(f),
                  o
                    .default(this.element)
                    .trigger(this.constructor.Event.INSERTED),
                  (this._popper = new r.default(
                    this.element,
                    a,
                    this._getPopperConfig(u)
                  )),
                  o.default(a).addClass("show"),
                  o.default(a).addClass(this.config.customClass),
                  "ontouchstart" in document.documentElement &&
                    o
                      .default(document.body)
                      .children()
                      .on("mouseover", null, o.default.noop);
                var c = function () {
                  t.config.animation && t._fixTransition();
                  var e = t._hoverState;
                  (t._hoverState = null),
                    o.default(t.element).trigger(t.constructor.Event.SHOWN),
                    "out" === e && t._leave(null, t);
                };
                if (o.default(this.tip).hasClass("fade")) {
                  var h = d.getTransitionDurationFromElement(this.tip);
                  o.default(this.tip)
                    .one(d.TRANSITION_END, c)
                    .emulateTransitionEnd(h);
                } else c();
              }
            }),
            (e.hide = function (t) {
              var e = this,
                n = this.getTipElement(),
                i = o.default.Event(this.constructor.Event.HIDE),
                r = function () {
                  "show" !== e._hoverState &&
                    n.parentNode &&
                    n.parentNode.removeChild(n),
                    e._cleanTipClass(),
                    e.element.removeAttribute("aria-describedby"),
                    o.default(e.element).trigger(e.constructor.Event.HIDDEN),
                    null !== e._popper && e._popper.destroy(),
                    t && t();
                };
              if (
                (o.default(this.element).trigger(i), !i.isDefaultPrevented())
              ) {
                if (
                  (o.default(n).removeClass("show"),
                  "ontouchstart" in document.documentElement &&
                    o
                      .default(document.body)
                      .children()
                      .off("mouseover", null, o.default.noop),
                  (this._activeTrigger.click = !1),
                  (this._activeTrigger.focus = !1),
                  (this._activeTrigger.hover = !1),
                  o.default(this.tip).hasClass("fade"))
                ) {
                  var a = d.getTransitionDurationFromElement(n);
                  o.default(n).one(d.TRANSITION_END, r).emulateTransitionEnd(a);
                } else r();
                this._hoverState = "";
              }
            }),
            (e.update = function () {
              null !== this._popper && this._popper.scheduleUpdate();
            }),
            (e.isWithContent = function () {
              return Boolean(this.getTitle());
            }),
            (e.addAttachmentClass = function (t) {
              o.default(this.getTipElement()).addClass("bs-tooltip-" + t);
            }),
            (e.getTipElement = function () {
              return (
                (this.tip = this.tip || o.default(this.config.template)[0]),
                this.tip
              );
            }),
            (e.setContent = function () {
              var t = this.getTipElement();
              this.setElementContent(
                o.default(t.querySelectorAll(".tooltip-inner")),
                this.getTitle()
              ),
                o.default(t).removeClass("fade show");
            }),
            (e.setElementContent = function (t, e) {
              "object" != typeof e || (!e.nodeType && !e.jquery)
                ? this.config.html
                  ? (this.config.sanitize &&
                      (e = Q(e, this.config.whiteList, this.config.sanitizeFn)),
                    t.html(e))
                  : t.text(e)
                : this.config.html
                ? o.default(e).parent().is(t) || t.empty().append(e)
                : t.text(o.default(e).text());
            }),
            (e.getTitle = function () {
              var t = this.element.getAttribute("data-original-title");
              return (
                t ||
                  (t =
                    "function" == typeof this.config.title
                      ? this.config.title.call(this.element)
                      : this.config.title),
                t
              );
            }),
            (e._getPopperConfig = function (t) {
              var e = this;
              return l(
                {},
                {
                  placement: t,
                  modifiers: {
                    offset: this._getOffset(),
                    flip: { behavior: this.config.fallbackPlacement },
                    arrow: { element: ".arrow" },
                    preventOverflow: {
                      boundariesElement: this.config.boundary,
                    },
                  },
                  onCreate: function (t) {
                    t.originalPlacement !== t.placement &&
                      e._handlePopperPlacementChange(t);
                  },
                  onUpdate: function (t) {
                    return e._handlePopperPlacementChange(t);
                  },
                },
                this.config.popperConfig
              );
            }),
            (e._getOffset = function () {
              var t = this,
                e = {};
              return (
                "function" == typeof this.config.offset
                  ? (e.fn = function (e) {
                      return (
                        (e.offsets = l(
                          {},
                          e.offsets,
                          t.config.offset(e.offsets, t.element)
                        )),
                        e
                      );
                    })
                  : (e.offset = this.config.offset),
                e
              );
            }),
            (e._getContainer = function () {
              return !1 === this.config.container
                ? document.body
                : d.isElement(this.config.container)
                ? o.default(this.config.container)
                : o.default(document).find(this.config.container);
            }),
            (e._getAttachment = function (t) {
              return z[t.toUpperCase()];
            }),
            (e._setListeners = function () {
              var t = this;
              this.config.trigger.split(" ").forEach(function (e) {
                if ("click" === e)
                  o.default(t.element).on(
                    t.constructor.Event.CLICK,
                    t.config.selector,
                    function (e) {
                      return t.toggle(e);
                    }
                  );
                else if ("manual" !== e) {
                  var n =
                      "hover" === e
                        ? t.constructor.Event.MOUSEENTER
                        : t.constructor.Event.FOCUSIN,
                    i =
                      "hover" === e
                        ? t.constructor.Event.MOUSELEAVE
                        : t.constructor.Event.FOCUSOUT;
                  o.default(t.element)
                    .on(n, t.config.selector, function (e) {
                      return t._enter(e);
                    })
                    .on(i, t.config.selector, function (e) {
                      return t._leave(e);
                    });
                }
              }),
                (this._hideModalHandler = function () {
                  t.element && t.hide();
                }),
                o
                  .default(this.element)
                  .closest(".modal")
                  .on("hide.bs.modal", this._hideModalHandler),
                this.config.selector
                  ? (this.config = l({}, this.config, {
                      trigger: "manual",
                      selector: "",
                    }))
                  : this._fixTitle();
            }),
            (e._fixTitle = function () {
              var t = typeof this.element.getAttribute("data-original-title");
              (this.element.getAttribute("title") || "string" !== t) &&
                (this.element.setAttribute(
                  "data-original-title",
                  this.element.getAttribute("title") || ""
                ),
                this.element.setAttribute("title", ""));
            }),
            (e._enter = function (t, e) {
              var n = this.constructor.DATA_KEY;
              (e = e || o.default(t.currentTarget).data(n)) ||
                ((e = new this.constructor(
                  t.currentTarget,
                  this._getDelegateConfig()
                )),
                o.default(t.currentTarget).data(n, e)),
                t &&
                  (e._activeTrigger["focusin" === t.type ? "focus" : "hover"] =
                    !0),
                o.default(e.getTipElement()).hasClass("show") ||
                "show" === e._hoverState
                  ? (e._hoverState = "show")
                  : (clearTimeout(e._timeout),
                    (e._hoverState = "show"),
                    e.config.delay && e.config.delay.show
                      ? (e._timeout = setTimeout(function () {
                          "show" === e._hoverState && e.show();
                        }, e.config.delay.show))
                      : e.show());
            }),
            (e._leave = function (t, e) {
              var n = this.constructor.DATA_KEY;
              (e = e || o.default(t.currentTarget).data(n)) ||
                ((e = new this.constructor(
                  t.currentTarget,
                  this._getDelegateConfig()
                )),
                o.default(t.currentTarget).data(n, e)),
                t &&
                  (e._activeTrigger["focusout" === t.type ? "focus" : "hover"] =
                    !1),
                e._isWithActiveTrigger() ||
                  (clearTimeout(e._timeout),
                  (e._hoverState = "out"),
                  e.config.delay && e.config.delay.hide
                    ? (e._timeout = setTimeout(function () {
                        "out" === e._hoverState && e.hide();
                      }, e.config.delay.hide))
                    : e.hide());
            }),
            (e._isWithActiveTrigger = function () {
              for (var t in this._activeTrigger)
                if (this._activeTrigger[t]) return !0;
              return !1;
            }),
            (e._getConfig = function (t) {
              var e = o.default(this.element).data();
              return (
                Object.keys(e).forEach(function (t) {
                  -1 !== Y.indexOf(t) && delete e[t];
                }),
                "number" ==
                  typeof (t = l(
                    {},
                    this.constructor.Default,
                    e,
                    "object" == typeof t && t ? t : {}
                  )).delay && (t.delay = { show: t.delay, hide: t.delay }),
                "number" == typeof t.title && (t.title = t.title.toString()),
                "number" == typeof t.content &&
                  (t.content = t.content.toString()),
                d.typeCheckConfig(W, t, this.constructor.DefaultType),
                t.sanitize &&
                  (t.template = Q(t.template, t.whiteList, t.sanitizeFn)),
                t
              );
            }),
            (e._getDelegateConfig = function () {
              var t = {};
              if (this.config)
                for (var e in this.config)
                  this.constructor.Default[e] !== this.config[e] &&
                    (t[e] = this.config[e]);
              return t;
            }),
            (e._cleanTipClass = function () {
              var t = o.default(this.getTipElement()),
                e = t.attr("class").match(V);
              null !== e && e.length && t.removeClass(e.join(""));
            }),
            (e._handlePopperPlacementChange = function (t) {
              (this.tip = t.instance.popper),
                this._cleanTipClass(),
                this.addAttachmentClass(this._getAttachment(t.placement));
            }),
            (e._fixTransition = function () {
              var t = this.getTipElement(),
                e = this.config.animation;
              null === t.getAttribute("x-placement") &&
                (o.default(t).removeClass("fade"),
                (this.config.animation = !1),
                this.hide(),
                this.show(),
                (this.config.animation = e));
            }),
            (t._jQueryInterface = function (e) {
              return this.each(function () {
                var n = o.default(this),
                  i = n.data("bs.tooltip"),
                  r = "object" == typeof e && e;
                if (
                  (i || !/dispose|hide/.test(e)) &&
                  (i || ((i = new t(this, r)), n.data("bs.tooltip", i)),
                  "string" == typeof e)
                ) {
                  if (void 0 === i[e])
                    throw new TypeError('No method named "' + e + '"');
                  i[e]();
                }
              });
            }),
            s(t, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.6.1";
                },
              },
              {
                key: "Default",
                get: function () {
                  return K;
                },
              },
              {
                key: "NAME",
                get: function () {
                  return W;
                },
              },
              {
                key: "DATA_KEY",
                get: function () {
                  return "bs.tooltip";
                },
              },
              {
                key: "Event",
                get: function () {
                  return $;
                },
              },
              {
                key: "EVENT_KEY",
                get: function () {
                  return ".bs.tooltip";
                },
              },
              {
                key: "DefaultType",
                get: function () {
                  return X;
                },
              },
            ]),
            t
          );
        })();
      (o.default.fn[W] = G._jQueryInterface),
        (o.default.fn[W].Constructor = G),
        (o.default.fn[W].noConflict = function () {
          return (o.default.fn[W] = U), G._jQueryInterface;
        });
      var J = "popover",
        Z = o.default.fn[J],
        tt = new RegExp("(^|\\s)bs-popover\\S+", "g"),
        et = l({}, G.Default, {
          placement: "right",
          trigger: "click",
          content: "",
          template:
            '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
        }),
        nt = l({}, G.DefaultType, { content: "(string|element|function)" }),
        it = {
          HIDE: "hide.bs.popover",
          HIDDEN: "hidden.bs.popover",
          SHOW: "show.bs.popover",
          SHOWN: "shown.bs.popover",
          INSERTED: "inserted.bs.popover",
          CLICK: "click.bs.popover",
          FOCUSIN: "focusin.bs.popover",
          FOCUSOUT: "focusout.bs.popover",
          MOUSEENTER: "mouseenter.bs.popover",
          MOUSELEAVE: "mouseleave.bs.popover",
        },
        ot = (function (t) {
          var e, n;
          function i() {
            return t.apply(this, arguments) || this;
          }
          (n = t),
            ((e = i).prototype = Object.create(n.prototype)),
            (e.prototype.constructor = e),
            u(e, n);
          var r = i.prototype;
          return (
            (r.isWithContent = function () {
              return this.getTitle() || this._getContent();
            }),
            (r.addAttachmentClass = function (t) {
              o.default(this.getTipElement()).addClass("bs-popover-" + t);
            }),
            (r.getTipElement = function () {
              return (
                (this.tip = this.tip || o.default(this.config.template)[0]),
                this.tip
              );
            }),
            (r.setContent = function () {
              var t = o.default(this.getTipElement());
              this.setElementContent(
                t.find(".popover-header"),
                this.getTitle()
              );
              var e = this._getContent();
              "function" == typeof e && (e = e.call(this.element)),
                this.setElementContent(t.find(".popover-body"), e),
                t.removeClass("fade show");
            }),
            (r._getContent = function () {
              return (
                this.element.getAttribute("data-content") || this.config.content
              );
            }),
            (r._cleanTipClass = function () {
              var t = o.default(this.getTipElement()),
                e = t.attr("class").match(tt);
              null !== e && e.length > 0 && t.removeClass(e.join(""));
            }),
            (i._jQueryInterface = function (t) {
              return this.each(function () {
                var e = o.default(this).data("bs.popover"),
                  n = "object" == typeof t ? t : null;
                if (
                  (e || !/dispose|hide/.test(t)) &&
                  (e ||
                    ((e = new i(this, n)),
                    o.default(this).data("bs.popover", e)),
                  "string" == typeof t)
                ) {
                  if (void 0 === e[t])
                    throw new TypeError('No method named "' + t + '"');
                  e[t]();
                }
              });
            }),
            s(i, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.6.1";
                },
              },
              {
                key: "Default",
                get: function () {
                  return et;
                },
              },
              {
                key: "NAME",
                get: function () {
                  return J;
                },
              },
              {
                key: "DATA_KEY",
                get: function () {
                  return "bs.popover";
                },
              },
              {
                key: "Event",
                get: function () {
                  return it;
                },
              },
              {
                key: "EVENT_KEY",
                get: function () {
                  return ".bs.popover";
                },
              },
              {
                key: "DefaultType",
                get: function () {
                  return nt;
                },
              },
            ]),
            i
          );
        })(G);
      (o.default.fn[J] = ot._jQueryInterface),
        (o.default.fn[J].Constructor = ot),
        (o.default.fn[J].noConflict = function () {
          return (o.default.fn[J] = Z), ot._jQueryInterface;
        });
      var rt = "scrollspy",
        at = o.default.fn[rt],
        st = { offset: 10, method: "auto", target: "" },
        lt = { offset: "number", method: "string", target: "(string|element)" },
        ut = (function () {
          function t(t, e) {
            var n = this;
            (this._element = t),
              (this._scrollElement = "BODY" === t.tagName ? window : t),
              (this._config = this._getConfig(e)),
              (this._selector =
                this._config.target +
                " .nav-link," +
                this._config.target +
                " .list-group-item," +
                this._config.target +
                " .dropdown-item"),
              (this._offsets = []),
              (this._targets = []),
              (this._activeTarget = null),
              (this._scrollHeight = 0),
              o
                .default(this._scrollElement)
                .on("scroll.bs.scrollspy", function (t) {
                  return n._process(t);
                }),
              this.refresh(),
              this._process();
          }
          var e = t.prototype;
          return (
            (e.refresh = function () {
              var t = this,
                e =
                  this._scrollElement === this._scrollElement.window
                    ? "offset"
                    : "position",
                n = "auto" === this._config.method ? e : this._config.method,
                i = "position" === n ? this._getScrollTop() : 0;
              (this._offsets = []),
                (this._targets = []),
                (this._scrollHeight = this._getScrollHeight()),
                [].slice
                  .call(document.querySelectorAll(this._selector))
                  .map(function (t) {
                    var e,
                      r = d.getSelectorFromElement(t);
                    if ((r && (e = document.querySelector(r)), e)) {
                      var a = e.getBoundingClientRect();
                      if (a.width || a.height)
                        return [o.default(e)[n]().top + i, r];
                    }
                    return null;
                  })
                  .filter(function (t) {
                    return t;
                  })
                  .sort(function (t, e) {
                    return t[0] - e[0];
                  })
                  .forEach(function (e) {
                    t._offsets.push(e[0]), t._targets.push(e[1]);
                  });
            }),
            (e.dispose = function () {
              o.default.removeData(this._element, "bs.scrollspy"),
                o.default(this._scrollElement).off(".bs.scrollspy"),
                (this._element = null),
                (this._scrollElement = null),
                (this._config = null),
                (this._selector = null),
                (this._offsets = null),
                (this._targets = null),
                (this._activeTarget = null),
                (this._scrollHeight = null);
            }),
            (e._getConfig = function (t) {
              if (
                "string" !=
                  typeof (t = l({}, st, "object" == typeof t && t ? t : {}))
                    .target &&
                d.isElement(t.target)
              ) {
                var e = o.default(t.target).attr("id");
                e || ((e = d.getUID(rt)), o.default(t.target).attr("id", e)),
                  (t.target = "#" + e);
              }
              return d.typeCheckConfig(rt, t, lt), t;
            }),
            (e._getScrollTop = function () {
              return this._scrollElement === window
                ? this._scrollElement.pageYOffset
                : this._scrollElement.scrollTop;
            }),
            (e._getScrollHeight = function () {
              return (
                this._scrollElement.scrollHeight ||
                Math.max(
                  document.body.scrollHeight,
                  document.documentElement.scrollHeight
                )
              );
            }),
            (e._getOffsetHeight = function () {
              return this._scrollElement === window
                ? window.innerHeight
                : this._scrollElement.getBoundingClientRect().height;
            }),
            (e._process = function () {
              var t = this._getScrollTop() + this._config.offset,
                e = this._getScrollHeight(),
                n = this._config.offset + e - this._getOffsetHeight();
              if ((this._scrollHeight !== e && this.refresh(), t >= n)) {
                var i = this._targets[this._targets.length - 1];
                this._activeTarget !== i && this._activate(i);
              } else {
                if (
                  this._activeTarget &&
                  t < this._offsets[0] &&
                  this._offsets[0] > 0
                )
                  return (this._activeTarget = null), void this._clear();
                for (var o = this._offsets.length; o--; )
                  this._activeTarget !== this._targets[o] &&
                    t >= this._offsets[o] &&
                    (void 0 === this._offsets[o + 1] ||
                      t < this._offsets[o + 1]) &&
                    this._activate(this._targets[o]);
              }
            }),
            (e._activate = function (t) {
              (this._activeTarget = t), this._clear();
              var e = this._selector.split(",").map(function (e) {
                  return (
                    e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                  );
                }),
                n = o.default(
                  [].slice.call(document.querySelectorAll(e.join(",")))
                );
              n.hasClass("dropdown-item")
                ? (n
                    .closest(".dropdown")
                    .find(".dropdown-toggle")
                    .addClass("active"),
                  n.addClass("active"))
                : (n.addClass("active"),
                  n
                    .parents(".nav, .list-group")
                    .prev(".nav-link, .list-group-item")
                    .addClass("active"),
                  n
                    .parents(".nav, .list-group")
                    .prev(".nav-item")
                    .children(".nav-link")
                    .addClass("active")),
                o
                  .default(this._scrollElement)
                  .trigger("activate.bs.scrollspy", { relatedTarget: t });
            }),
            (e._clear = function () {
              [].slice
                .call(document.querySelectorAll(this._selector))
                .filter(function (t) {
                  return t.classList.contains("active");
                })
                .forEach(function (t) {
                  return t.classList.remove("active");
                });
            }),
            (t._jQueryInterface = function (e) {
              return this.each(function () {
                var n = o.default(this).data("bs.scrollspy");
                if (
                  (n ||
                    ((n = new t(this, "object" == typeof e && e)),
                    o.default(this).data("bs.scrollspy", n)),
                  "string" == typeof e)
                ) {
                  if (void 0 === n[e])
                    throw new TypeError('No method named "' + e + '"');
                  n[e]();
                }
              });
            }),
            s(t, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.6.1";
                },
              },
              {
                key: "Default",
                get: function () {
                  return st;
                },
              },
            ]),
            t
          );
        })();
      o.default(window).on("load.bs.scrollspy.data-api", function () {
        for (
          var t = [].slice.call(
              document.querySelectorAll('[data-spy="scroll"]')
            ),
            e = t.length;
          e--;

        ) {
          var n = o.default(t[e]);
          ut._jQueryInterface.call(n, n.data());
        }
      }),
        (o.default.fn[rt] = ut._jQueryInterface),
        (o.default.fn[rt].Constructor = ut),
        (o.default.fn[rt].noConflict = function () {
          return (o.default.fn[rt] = at), ut._jQueryInterface;
        });
      var ft = o.default.fn.tab,
        dt = (function () {
          function t(t) {
            this._element = t;
          }
          var e = t.prototype;
          return (
            (e.show = function () {
              var t = this;
              if (
                !(
                  (this._element.parentNode &&
                    this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                    o.default(this._element).hasClass("active")) ||
                  o.default(this._element).hasClass("disabled")
                )
              ) {
                var e,
                  n,
                  i = o.default(this._element).closest(".nav, .list-group")[0],
                  r = d.getSelectorFromElement(this._element);
                if (i) {
                  var a =
                    "UL" === i.nodeName || "OL" === i.nodeName
                      ? "> li > .active"
                      : ".active";
                  n = (n = o.default.makeArray(o.default(i).find(a)))[
                    n.length - 1
                  ];
                }
                var s = o.default.Event("hide.bs.tab", {
                    relatedTarget: this._element,
                  }),
                  l = o.default.Event("show.bs.tab", { relatedTarget: n });
                if (
                  (n && o.default(n).trigger(s),
                  o.default(this._element).trigger(l),
                  !l.isDefaultPrevented() && !s.isDefaultPrevented())
                ) {
                  r && (e = document.querySelector(r)),
                    this._activate(this._element, i);
                  var u = function () {
                    var e = o.default.Event("hidden.bs.tab", {
                        relatedTarget: t._element,
                      }),
                      i = o.default.Event("shown.bs.tab", { relatedTarget: n });
                    o.default(n).trigger(e), o.default(t._element).trigger(i);
                  };
                  e ? this._activate(e, e.parentNode, u) : u();
                }
              }
            }),
            (e.dispose = function () {
              o.default.removeData(this._element, "bs.tab"),
                (this._element = null);
            }),
            (e._activate = function (t, e, n) {
              var i = this,
                r = (
                  !e || ("UL" !== e.nodeName && "OL" !== e.nodeName)
                    ? o.default(e).children(".active")
                    : o.default(e).find("> li > .active")
                )[0],
                a = n && r && o.default(r).hasClass("fade"),
                s = function () {
                  return i._transitionComplete(t, r, n);
                };
              if (r && a) {
                var l = d.getTransitionDurationFromElement(r);
                o.default(r)
                  .removeClass("show")
                  .one(d.TRANSITION_END, s)
                  .emulateTransitionEnd(l);
              } else s();
            }),
            (e._transitionComplete = function (t, e, n) {
              if (e) {
                o.default(e).removeClass("active");
                var i = o
                  .default(e.parentNode)
                  .find("> .dropdown-menu .active")[0];
                i && o.default(i).removeClass("active"),
                  "tab" === e.getAttribute("role") &&
                    e.setAttribute("aria-selected", !1);
              }
              o.default(t).addClass("active"),
                "tab" === t.getAttribute("role") &&
                  t.setAttribute("aria-selected", !0),
                d.reflow(t),
                t.classList.contains("fade") && t.classList.add("show");
              var r = t.parentNode;
              if (
                (r && "LI" === r.nodeName && (r = r.parentNode),
                r && o.default(r).hasClass("dropdown-menu"))
              ) {
                var a = o.default(t).closest(".dropdown")[0];
                if (a) {
                  var s = [].slice.call(a.querySelectorAll(".dropdown-toggle"));
                  o.default(s).addClass("active");
                }
                t.setAttribute("aria-expanded", !0);
              }
              n && n();
            }),
            (t._jQueryInterface = function (e) {
              return this.each(function () {
                var n = o.default(this),
                  i = n.data("bs.tab");
                if (
                  (i || ((i = new t(this)), n.data("bs.tab", i)),
                  "string" == typeof e)
                ) {
                  if (void 0 === i[e])
                    throw new TypeError('No method named "' + e + '"');
                  i[e]();
                }
              });
            }),
            s(t, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.6.1";
                },
              },
            ]),
            t
          );
        })();
      o
        .default(document)
        .on(
          "click.bs.tab.data-api",
          '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
          function (t) {
            t.preventDefault(),
              dt._jQueryInterface.call(o.default(this), "show");
          }
        ),
        (o.default.fn.tab = dt._jQueryInterface),
        (o.default.fn.tab.Constructor = dt),
        (o.default.fn.tab.noConflict = function () {
          return (o.default.fn.tab = ft), dt._jQueryInterface;
        });
      var ct = "toast",
        ht = o.default.fn[ct],
        pt = { animation: !0, autohide: !0, delay: 500 },
        mt = { animation: "boolean", autohide: "boolean", delay: "number" },
        gt = (function () {
          function t(t, e) {
            (this._element = t),
              (this._config = this._getConfig(e)),
              (this._timeout = null),
              this._setListeners();
          }
          var e = t.prototype;
          return (
            (e.show = function () {
              var t = this,
                e = o.default.Event("show.bs.toast");
              if (
                (o.default(this._element).trigger(e), !e.isDefaultPrevented())
              ) {
                this._clearTimeout(),
                  this._config.animation && this._element.classList.add("fade");
                var n = function () {
                  t._element.classList.remove("showing"),
                    t._element.classList.add("show"),
                    o.default(t._element).trigger("shown.bs.toast"),
                    t._config.autohide &&
                      (t._timeout = setTimeout(function () {
                        t.hide();
                      }, t._config.delay));
                };
                if (
                  (this._element.classList.remove("hide"),
                  d.reflow(this._element),
                  this._element.classList.add("showing"),
                  this._config.animation)
                ) {
                  var i = d.getTransitionDurationFromElement(this._element);
                  o.default(this._element)
                    .one(d.TRANSITION_END, n)
                    .emulateTransitionEnd(i);
                } else n();
              }
            }),
            (e.hide = function () {
              if (this._element.classList.contains("show")) {
                var t = o.default.Event("hide.bs.toast");
                o.default(this._element).trigger(t),
                  t.isDefaultPrevented() || this._close();
              }
            }),
            (e.dispose = function () {
              this._clearTimeout(),
                this._element.classList.contains("show") &&
                  this._element.classList.remove("show"),
                o.default(this._element).off("click.dismiss.bs.toast"),
                o.default.removeData(this._element, "bs.toast"),
                (this._element = null),
                (this._config = null);
            }),
            (e._getConfig = function (t) {
              return (
                (t = l(
                  {},
                  pt,
                  o.default(this._element).data(),
                  "object" == typeof t && t ? t : {}
                )),
                d.typeCheckConfig(ct, t, this.constructor.DefaultType),
                t
              );
            }),
            (e._setListeners = function () {
              var t = this;
              o.default(this._element).on(
                "click.dismiss.bs.toast",
                '[data-dismiss="toast"]',
                function () {
                  return t.hide();
                }
              );
            }),
            (e._close = function () {
              var t = this,
                e = function () {
                  t._element.classList.add("hide"),
                    o.default(t._element).trigger("hidden.bs.toast");
                };
              if (
                (this._element.classList.remove("show"), this._config.animation)
              ) {
                var n = d.getTransitionDurationFromElement(this._element);
                o.default(this._element)
                  .one(d.TRANSITION_END, e)
                  .emulateTransitionEnd(n);
              } else e();
            }),
            (e._clearTimeout = function () {
              clearTimeout(this._timeout), (this._timeout = null);
            }),
            (t._jQueryInterface = function (e) {
              return this.each(function () {
                var n = o.default(this),
                  i = n.data("bs.toast");
                if (
                  (i ||
                    ((i = new t(this, "object" == typeof e && e)),
                    n.data("bs.toast", i)),
                  "string" == typeof e)
                ) {
                  if (void 0 === i[e])
                    throw new TypeError('No method named "' + e + '"');
                  i[e](this);
                }
              });
            }),
            s(t, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.6.1";
                },
              },
              {
                key: "DefaultType",
                get: function () {
                  return mt;
                },
              },
              {
                key: "Default",
                get: function () {
                  return pt;
                },
              },
            ]),
            t
          );
        })();
      (o.default.fn[ct] = gt._jQueryInterface),
        (o.default.fn[ct].Constructor = gt),
        (o.default.fn[ct].noConflict = function () {
          return (o.default.fn[ct] = ht), gt._jQueryInterface;
        }),
        (t.Alert = h),
        (t.Button = m),
        (t.Carousel = E),
        (t.Collapse = D),
        (t.Dropdown = j),
        (t.Modal = R),
        (t.Popover = ot),
        (t.Scrollspy = ut),
        (t.Tab = dt),
        (t.Toast = gt),
        (t.Tooltip = G),
        (t.Util = d),
        Object.defineProperty(t, "__esModule", { value: !0 });
    })(e, n(0), n(1));
  },
  function (t, e) {
    var n;
    n = (function () {
      return this;
    })();
    try {
      n = n || new Function("return this")();
    } catch (t) {
      "object" == typeof window && (n = window);
    }
    t.exports = n;
  },
  function (t, e, n) {
    "use strict";
    n.r(e);
    n(0), n(3), n.p;
    $(function () {
      var t = document.querySelector("div.bd-sidebar");
      let e = parseInt(sessionStorage.getItem("sidebar-scroll-top"), 10);
      if (isNaN(e)) {
        var n = document
          .getElementById("bd-docs-nav")
          .querySelectorAll(".active");
        if (n.length > 0) {
          var i = n[n.length - 1],
            o = i.getBoundingClientRect().y - t.getBoundingClientRect().y;
          if (i.getBoundingClientRect().y > 0.5 * window.innerHeight) {
            let e = 0.25;
            (t.scrollTop = o - t.clientHeight * e),
              console.log("[PST]: Scrolled sidebar using last active link...");
          }
        }
      } else (t.scrollTop = e), console.log("[PST]: Scrolled sidebar using stored browser position...");
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("sidebar-scroll-top", t.scrollTop);
      });
    }),
      $(function () {
        $(window).on("activate.bs.scrollspy", function () {
          document.querySelectorAll("#bd-toc-nav a").forEach((t) => {
            t.parentElement.classList.remove("active");
          });
          document.querySelectorAll("#bd-toc-nav a.active").forEach((t) => {
            t.parentElement.classList.add("active");
          });
        });
      });
  },
]);
