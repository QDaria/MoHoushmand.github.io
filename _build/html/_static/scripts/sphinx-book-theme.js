!(function (e) {
  var t = {};
  function n(o) {
    if (t[o]) return t[o].exports;
    var r = (t[o] = { i: o, l: !1, exports: {} });
    return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, o) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var o = Object.create(null);
      if (
        (n.r(o),
        Object.defineProperty(o, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          n.d(
            o,
            r,
            function (t) {
              return e[t];
            }.bind(null, r)
          );
      return o;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 0));
})([
  function (e, t, n) {
    e.exports = n(1);
  },
  function (e, t, n) {
    "use strict";
    n.r(t);
    n.p;
    var o = (e) => {
      "loading" != document.readyState
        ? e()
        : document.addEventListener
        ? document.addEventListener("DOMContentLoaded", e)
        : document.attachEvent("onreadystatechange", function () {
            "complete" == document.readyState && e();
          });
    };
    (window.initThebeSBT = () => {
      var e = $("div.section h1")[0];
      $(e).next().hasClass("thebe-launch-button") ||
        $("<button class='thebe-launch-button'></button>").insertAfter($(e)),
        initThebe();
    }),
      (window.printPdf = (e) => {
        let t = $(e).attr("aria-describedby"),
          n = $("#" + t).detach();
        window.print(), $("body").append(n);
      }),
      (window.toggleFullScreen = () => {
        var e =
          (document.fullscreenElement && null !== document.fullscreenElement) ||
          (document.webkitFullscreenElement &&
            null !== document.webkitFullscreenElement);
        let t = document.documentElement;
        e
          ? (console.log("[SBT]: Exiting full screen"),
            document.exitFullscreen
              ? document.exitFullscreen()
              : document.webkitExitFullscreen &&
                document.webkitExitFullscreen())
          : (console.log("[SBT]: Entering full screen"),
            t.requestFullscreen
              ? t.requestFullscreen()
              : t.webkitRequestFullscreen && t.webkitRequestFullscreen());
      }),
      o(() => {
        $(document).ready(function () {
          $('[data-toggle="tooltip"]').tooltip({
            trigger: "hover",
            delay: { show: 500, hide: 100 },
          });
        });
      }),
      o(() => {
        var e = document.getElementById("site-navigation"),
          t = e.querySelectorAll(".active"),
          n = t[t.length - 1];
        void 0 !== n &&
          n.offsetTop > 0.5 * $(window).height() &&
          (e.scrollTop = n.offsetTop - 0.2 * $(window).height());
      }),
      o(() => {
        var e = [];
        let t = new IntersectionObserver((t, n) => {
          t.forEach((t) => {
            if (t.isIntersecting) e.push(t.target);
            else
              for (let n = 0; n < e.length; n++)
                if (e[n] === t.target) {
                  e.splice(n, 1);
                  break;
                }
          }),
            e.length > 0
              ? $("div.bd-toc").removeClass("show")
              : $("div.bd-toc").addClass("show");
        });
        let n = [];
        ["margin", "margin-caption", "full-width", "sidebar", "popout"].forEach(
          (e) => {
            n.push(
              "." + e,
              ".tag_" + e,
              "." + e.replace("-", "_"),
              ".tag_" + e.replace("-", "_")
            );
          }
        ),
          document.querySelectorAll(n.join(", ")).forEach((e) => {
            t.observe(e);
          }),
          new IntersectionObserver((e, t) => {
            e[0].boundingClientRect.y < 0
              ? document.body.classList.add("scrolled")
              : document.body.classList.remove("scrolled");
          }).observe(document.querySelector(".sbt-scroll-pixel-helper"));
      }),
      o(function () {
        new MutationObserver((e, t) => {
          e.forEach((e) => {
            0 !== e.addedNodes.length &&
              void 0 !== e.addedNodes[0].data &&
              -1 != e.addedNodes[0].data.search("Inserted RTD Footer") &&
              e.addedNodes.forEach((e) => {
                document.getElementById("rtd-footer-container").append(e);
              });
          });
        }).observe(document.body, { childList: !0 });
      });
  },
]);
//# sourceMappingURL=sphinx-book-theme.js.map
