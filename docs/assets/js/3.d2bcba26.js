(window.webpackJsonp = window.webpackJsonp || []).push([
  [3],
  {
    109: function(t, e, s) {
      "use strict";
      var n = s(91);
      s.n(n).a;
    },
    130: function(t, e, s) {
      "use strict";
      s.r(e);
      var n = [
          "There's nothing here.",
          "How did we get here?",
          "That's a Four-Oh-Four.",
          "Looks like we've got some broken links."
        ],
        o = {
          methods: {
            getMsg: function() {
              return n[Math.floor(Math.random() * n.length)];
            }
          }
        },
        i = (s(109), s(15)),
        r = Object(i.a)(
          o,
          function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e("div", { staticClass: "theme-container" }, [
              e(
                "div",
                { staticClass: "content" },
                [
                  e("h1", [this._v("404")]),
                  this._v(" "),
                  e("blockquote", [this._v(this._s(this.getMsg()))]),
                  this._v(" "),
                  e("router-link", { attrs: { to: "/" } }, [
                    this._v("Take me home.")
                  ])
                ],
                1
              )
            ]);
          },
          [],
          !1,
          null,
          null,
          null
        );
      r.options.__file = "404.vue";
      e.default = r.exports;
    },
    91: function(t, e, s) {}
  }
]);
