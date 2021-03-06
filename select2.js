!function(e) {
    "undefined" == typeof e.fn.each2 && e.fn.extend({
        each2: function(t) {
            for (var s = e([0]), i = -1, n = this.length; ++i < n && (s.context = s[0] = this[i]) && t.call(s[0], i, s) !== !1; )
                ;
            return this
        }
    })
}(jQuery),
function(e, t) {
    "use strict";
    function s(e, t) {
        for (var s = 0, n = t.length; n > s; s += 1)
            if (i(e, t[s]))
                return s;
        return -1
    }
    function i(e, s) {
        return e === s ? !0 : e === t || s === t ? !1 : null === e || null === s ? !1 : e.constructor === String ? e + "" == s + "" : s.constructor === String ? s + "" == e + "" : !1
    }
    function n(t, s) {
        var i, n, o;
        if (null === t || t.length < 1)
            return [];
        for (i = t.split(s),
        n = 0,
        o = i.length; o > n; n += 1)
            i[n] = e.trim(i[n]);
        return i
    }
    function o(e) {
        return e.outerWidth(!1) - e.width()
    }
    function a(s) {
        var i = "keyup-change-value";
        s.bind("keydown", function() {
            e.data(s, i) === t && e.data(s, i, s.val())
        }),
        s.bind("keyup", function() {
            var n = e.data(s, i);
            n !== t && s.val() !== n && (e.removeData(s, i),
            s.trigger("keyup-change"))
        })
    }
    function r(s) {
        s.bind("mousemove", function(s) {
            var i = A;
            (i === t || i.x !== s.pageX || i.y !== s.pageY) && e(s.target).trigger("mousemove-filtered", s)
        })
    }
    function l(e, s, i) {
        i = i || t;
        var n;
        return function() {
            var t = arguments;
            window.clearTimeout(n),
            n = window.setTimeout(function() {
                s.apply(i, t)
            }, e)
        }
    }
    function c(e) {
        var t, s = !1;
        return function() {
            return s === !1 && (t = e(),
            s = !0),
            t
        }
    }
    function h(e, t) {
        var i = l(e, function(e) {
            t.trigger("scroll-debounced", e)
        });
        t.bind("scroll", function(e) {
            s(e.target, t.get()) >= 0 && i(e)
        })
    }
    function d(e) {
        e[0] !== document.activeElement && window.setTimeout(function() {
            var t, s = e[0], i = e.val().length;
            e.focus(),
            e.is(":visible") && s === document.activeElement && (s.setSelectionRange ? s.setSelectionRange(i, i) : s.createTextRange && (t = s.createTextRange(),
            t.collapse(!1),
            t.select()))
        }, 0)
    }
    function u(e) {
        e.preventDefault(),
        e.stopPropagation()
    }
    function p(e) {
        e.preventDefault(),
        e.stopImmediatePropagation()
    }
    function f(t) {
        if (!R) {
            var s = t[0].currentStyle || window.getComputedStyle(t[0], null);
            R = e(document.createElement("div")).css({
                position: "absolute",
                left: "-10000px",
                top: "-10000px",
                display: "none",
                fontSize: s.fontSize,
                fontFamily: s.fontFamily,
                fontStyle: s.fontStyle,
                fontWeight: s.fontWeight,
                letterSpacing: s.letterSpacing,
                textTransform: s.textTransform,
                whiteSpace: "nowrap"
            }),
            R.attr("class", "select2-sizer"),
            e("body").append(R)
        }
        return R.text(t.val()),
        R.width()
    }
    function g(t, s, i) {
        var n, o, a = [];
        n = t.attr("class"),
        n && (n = "" + n,
        e(n.split(" ")).each2(function() {
            0 === this.indexOf("select2-") && a.push(this)
        })),
        n = s.attr("class"),
        n && (n = "" + n,
        e(n.split(" ")).each2(function() {
            0 !== this.indexOf("select2-") && (o = i(this),
            o && a.push(this))
        })),
        t.attr("class", a.join(" "))
    }
    function m(e, t, s, i) {
        var n = e.toUpperCase().indexOf(t.toUpperCase())
          , o = t.length;
        return 0 > n ? void s.push(i(e)) : (s.push(i(e.substring(0, n))),
        s.push("<span class='select2-match'>"),
        s.push(i(e.substring(n, n + o))),
        s.push("</span>"),
        void s.push(i(e.substring(n + o, e.length))))
    }
    function v(t) {
        var s, i = 0, n = null, o = t.quietMillis || 100, a = t.url, r = this;
        return function(l) {
            window.clearTimeout(s),
            s = window.setTimeout(function() {
                i += 1;
                var s = i
                  , o = t.data
                  , c = a
                  , h = t.transport || e.ajax
                  , d = t.type || "GET"
                  , u = {};
                o = o ? o.call(r, l.term, l.page, l.context) : null,
                c = "function" == typeof c ? c.call(r, l.term, l.page, l.context) : c,
                null !== n && n.abort(),
                t.params && (e.isFunction(t.params) ? e.extend(u, t.params.call(r)) : e.extend(u, t.params)),
                e.extend(u, {
                    url: c,
                    dataType: t.dataType,
                    data: o,
                    type: d,
                    cache: !1,
                    success: function(e) {
                        if (!(i > s)) {
                            var n = t.results(e, l.page);
                            l.callback(n)
                        }
                    }
                }),
                n = h.call(r, u)
            }, o)
        }
    }
    function b(t) {
        var s, i, n = t, o = function(e) {
            return "" + e.text
        };
        e.isArray(n) && (i = n,
        n = {
            results: i
        }),
        e.isFunction(n) === !1 && (i = n,
        n = function() {
            return i
        }
        );
        var a = n();
        return a.text && (o = a.text,
        e.isFunction(o) || (s = n.text,
        o = function(e) {
            return e[s]
        }
        )),
        function(t) {
            var s, i = t.term, a = {
                results: []
            };
            return "" === i ? void t.callback(n()) : (s = function(n, a) {
                var r, l;
                if (n = n[0],
                n.children) {
                    r = {};
                    for (l in n)
                        n.hasOwnProperty(l) && (r[l] = n[l]);
                    r.children = [],
                    e(n.children).each2(function(e, t) {
                        s(t, r.children)
                    }),
                    (r.children.length || t.matcher(i, o(r), n)) && a.push(r)
                } else
                    t.matcher(i, o(n), n) && a.push(n)
            }
            ,
            e(n().results).each2(function(e, t) {
                s(t, a.results)
            }),
            void t.callback(a))
        }
    }
    function w(s) {
        var i = e.isFunction(s);
        return function(n) {
            var o = n.term
              , a = {
                results: []
            };
            e(i ? s() : s).each(function() {
                var e = this.text !== t
                  , s = e ? this.text : this;
                ("" === o || n.matcher(o, s)) && a.results.push(e ? this : {
                    id: this,
                    text: this
                })
            }),
            n.callback(a)
        }
    }
    function C(t, s) {
        if (e.isFunction(t))
            return !0;
        if (!t)
            return !1;
        throw new Error("formatterName must be a function or a falsy value")
    }
    function S(t) {
        return e.isFunction(t) ? t() : t
    }
    function y(t) {
        var s = 0;
        return e.each(t, function(e, t) {
            t.children ? s += y(t.children) : s++
        }),
        s
    }
    function x(e, s, n, o) {
        var a, r, l, c, h, d = e, u = !1;
        if (!o.createSearchChoice || !o.tokenSeparators || o.tokenSeparators.length < 1)
            return t;
        for (; ; ) {
            for (r = -1,
            l = 0,
            c = o.tokenSeparators.length; c > l && (h = o.tokenSeparators[l],
            r = e.indexOf(h),
            !(r >= 0)); l++)
                ;
            if (0 > r)
                break;
            if (a = e.substring(0, r),
            e = e.substring(r + h.length),
            a.length > 0 && (a = o.createSearchChoice(a, s),
            a !== t && null !== a && o.id(a) !== t && null !== o.id(a))) {
                for (u = !1,
                l = 0,
                c = s.length; c > l; l++)
                    if (i(o.id(a), o.id(s[l]))) {
                        u = !0;
                        break
                    }
                u || n(a)
            }
        }
        return d !== e ? e : void 0
    }
    function T(t, s) {
        var i = function() {};
        return i.prototype = new t,
        i.prototype.constructor = i,
        i.prototype.parent = t.prototype,
        i.prototype = e.extend(i.prototype, s),
        i
    }
    if (window.Select2 === t) {
        var E, P, k, O, I, R, A, M;
        E = {
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            SPACE: 32,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            HOME: 36,
            END: 35,
            BACKSPACE: 8,
            DELETE: 46,
            isArrow: function(e) {
                switch (e = e.which ? e.which : e) {
                case E.LEFT:
                case E.RIGHT:
                case E.UP:
                case E.DOWN:
                    return !0
                }
                return !1
            },
            isControl: function(e) {
                var t = e.which;
                switch (t) {
                case E.SHIFT:
                case E.CTRL:
                case E.ALT:
                    return !0
                }
                return e.metaKey ? !0 : !1
            },
            isFunctionKey: function(e) {
                return e = e.which ? e.which : e,
                e >= 112 && 123 >= e
            }
        },
        M = e(document),
        I = function() {
            var e = 1;
            return function() {
                return e++
            }
        }(),
        M.bind("mousemove", function(e) {
            A = {
                x: e.pageX,
                y: e.pageY
            }
        }),
        P = T(Object, {
            bind: function(e) {
                var t = this;
                return function() {
                    e.apply(t, arguments)
                }
            },
            init: function(s) {
                var i, n, o = ".select2-results";
                this.opts = s = this.prepareOpts(s),
                this.id = s.id,
                s.element.data("select2") !== t && null !== s.element.data("select2") && this.destroy(),
                this.enabled = !0,
                this.container = this.createContainer(),
                this.containerId = "s2id_" + (s.element.attr("id") || "autogen" + I()),
                this.containerSelector = "#" + this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1"),
                this.container.attr("id", this.containerId),
                this.body = c(function() {
                    return s.element.closest("body")
                }),
                g(this.container, this.opts.element, this.opts.adaptContainerCssClass),
                this.container.css(S(s.containerCss)),
                this.container.addClass(S(s.containerCssClass)),
                this.elementTabIndex = this.opts.element.attr("tabIndex"),
                this.opts.element.data("select2", this).addClass("select2-offscreen").bind("focus.select2", function() {
                    e(this).select2("focus")
                }).attr("tabIndex", "-1").before(this.container),
                this.container.data("select2", this),
                this.dropdown = this.container.find(".select2-drop"),
                this.dropdown.addClass(S(s.dropdownCssClass)),
                this.dropdown.data("select2", this),
                this.results = i = this.container.find(o),
                this.search = n = this.container.find("input.select2-input"),
                n.attr("tabIndex", this.elementTabIndex),
                this.resultsPage = 0,
                this.context = null,
                this.initContainer(),
                r(this.results),
                this.dropdown.delegate(o, "mousemove-filtered touchstart touchmove touchend", this.bind(this.highlightUnderEvent)),
                h(80, this.results),
                this.dropdown.delegate(o, "scroll-debounced", this.bind(this.loadMoreIfNeeded)),
                e.fn.mousewheel && i.mousewheel(function(e, t, s, n) {
                    var o = i.scrollTop();
                    n > 0 && 0 >= o - n ? (i.scrollTop(0),
                    u(e)) : 0 > n && i.get(0).scrollHeight - i.scrollTop() + n <= i.height() && (i.scrollTop(i.get(0).scrollHeight - i.height()),
                    u(e))
                }),
                a(n),
                n.bind("keyup-change input paste", this.bind(this.updateResults)),
                n.bind("focus", function() {
                    n.addClass("select2-focused")
                }),
                n.bind("blur", function() {
                    n.removeClass("select2-focused")
                }),
                this.dropdown.delegate(o, "mouseup", this.bind(function(t) {
                    e(t.target).closest(".select2-result-selectable").length > 0 && (this.highlightUnderEvent(t),
                    this.selectHighlighted(t))
                })),
                this.dropdown.bind("click mouseup mousedown", function(e) {
                    e.stopPropagation()
                }),
                e.isFunction(this.opts.initSelection) && (this.initSelection(),
                this.monitorSource()),
                (s.element.is(":disabled") || s.element.is("[readonly='readonly']")) && this.disable()
            },
            destroy: function() {
                var e = this.opts.element.data("select2");
                this.propertyObserver && (delete this.propertyObserver,
                this.propertyObserver = null),
                e !== t && (e.container.remove(),
                e.dropdown.remove(),
                e.opts.element.removeClass("select2-offscreen").removeData("select2").unbind(".select2").attr({
                    tabIndex: this.elementTabIndex
                }).show())
            },
            prepareOpts: function(s) {
                var o, a, r, l;
                if (o = s.element,
                "select" === o.get(0).tagName.toLowerCase() && (this.select = a = s.element),
                a && e.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function() {
                    if (this in s)
                        throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.")
                }),
                s = e.extend({}, {
                    populateResults: function(i, n, o) {
                        var a, r = this.opts.id, l = this;
                        (a = function(i, n, c) {
                            var h, d, u, p, f, g, m, v, b, w;
                            for (i = s.sortResults(i, n, o),
                            h = 0,
                            d = i.length; d > h; h += 1)
                                u = i[h],
                                f = u.disabled === !0,
                                p = !f && r(u) !== t,
                                g = u.children && u.children.length > 0,
                                m = e("<li></li>"),
                                m.addClass("select2-results-dept-" + c),
                                m.addClass("select2-result"),
                                m.addClass(p ? "select2-result-selectable" : "select2-result-unselectable"),
                                f && m.addClass("select2-disabled"),
                                g && m.addClass("select2-result-with-children"),
                                m.addClass(l.opts.formatResultCssClass(u)),
                                v = e(document.createElement("div")),
                                v.addClass("select2-result-label"),
                                w = s.formatResult(u, v, o, l.opts.escapeMarkup),
                                w !== t && v.html(w),
                                m.append(v),
                                g && (b = e("<ul></ul>"),
                                b.addClass("select2-result-sub"),
                                a(u.children, b, c + 1),
                                m.append(b)),
                                m.data("select2-data", u),
                                n.append(m)
                        }
                        )(n, i, 0)
                    }
                }, e.fn.select2.defaults, s),
                "function" != typeof s.id && (r = s.id,
                s.id = function(e) {
                    return e[r]
                }
                ),
                e.isArray(s.element.data("select2Tags"))) {
                    if ("tags"in s)
                        throw "tags specified as both an attribute 'data-select2-tags' and in options of Select2 " + s.element.attr("id");
                    s.tags = s.element.data("select2Tags")
                }
                if (a ? (s.query = this.bind(function(s) {
                    var n, a, r, l = {
                        results: [],
                        more: !1
                    }, c = s.term;
                    r = function(e, t) {
                        var n;
                        e.is("option") ? s.matcher(c, e.text(), e) && t.push({
                            id: e.attr("value"),
                            text: e.text(),
                            element: e.get(),
                            css: e.attr("class"),
                            disabled: i(e.attr("disabled"), "disabled")
                        }) : e.is("optgroup") && (n = {
                            text: e.attr("label"),
                            children: [],
                            element: e.get(),
                            css: e.attr("class")
                        },
                        e.children().each2(function(e, t) {
                            r(t, n.children)
                        }),
                        n.children.length > 0 && t.push(n))
                    }
                    ,
                    n = o.children(),
                    this.getPlaceholder() !== t && n.length > 0 && (a = n[0],
                    "" === e(a).text() && (n = n.not(a))),
                    n.each2(function(e, t) {
                        r(t, l.results)
                    }),
                    s.callback(l)
                }),
                s.id = function(e) {
                    return e.id
                }
                ,
                s.formatResultCssClass = function(e) {
                    return e.css
                }
                ) : "query"in s || ("ajax"in s ? (l = s.element.data("ajax-url"),
                l && l.length > 0 && (s.ajax.url = l),
                s.query = v.call(s.element, s.ajax)) : "data"in s ? s.query = b(s.data) : "tags"in s && (s.query = w(s.tags),
                s.createSearchChoice === t && (s.createSearchChoice = function(e) {
                    return {
                        id: e,
                        text: e
                    }
                }
                ),
                s.initSelection === t && (s.initSelection = function(t, o) {
                    var a = [];
                    e(n(t.val(), s.separator)).each(function() {
                        var t = this
                          , n = this
                          , o = s.tags;
                        e.isFunction(o) && (o = o()),
                        e(o).each(function() {
                            return i(this.id, t) ? (n = this.text,
                            !1) : void 0
                        }),
                        a.push({
                            id: t,
                            text: n
                        })
                    }),
                    o(a)
                }
                ))),
                "function" != typeof s.query)
                    throw "query function not defined for Select2 " + s.element.attr("id");
                return s
            },
            monitorSource: function() {
                var e, t = this.opts.element;
                t.bind("change.select2", this.bind(function(e) {
                    this.opts.element.data("select2-change-triggered") !== !0 && this.initSelection()
                })),
                e = this.bind(function() {
                    var e, t;
                    e = "disabled" !== this.opts.element.attr("disabled"),
                    t = "readonly" === this.opts.element.attr("readonly"),
                    e = e && !t,
                    this.enabled !== e && (e ? this.enable() : this.disable()),
                    g(this.container, this.opts.element, this.opts.adaptContainerCssClass),
                    this.container.addClass(S(this.opts.containerCssClass)),
                    g(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass),
                    this.dropdown.addClass(S(this.opts.dropdownCssClass))
                }),
                t.bind("propertychange.select2 DOMAttrModified.select2", e),
                "undefined" != typeof WebKitMutationObserver && (this.propertyObserver && (delete this.propertyObserver,
                this.propertyObserver = null),
                this.propertyObserver = new WebKitMutationObserver(function(t) {
                    t.forEach(e)
                }
                ),
                this.propertyObserver.observe(t.get(0), {
                    attributes: !0,
                    subtree: !1
                }))
            },
            triggerChange: function(t) {
                t = t || {},
                t = e.extend({}, t, {
                    type: "change",
                    val: this.val()
                }),
                this.opts.element.data("select2-change-triggered", !0),
                this.opts.element.trigger(t),
                this.opts.element.data("select2-change-triggered", !1),
                this.opts.element.click(),
                this.opts.blurOnChange && this.opts.element.blur()
            },
            enable: function() {
                this.enabled || (this.enabled = !0,
                this.container.removeClass("select2-container-disabled"),
                this.opts.element.removeAttr("disabled"))
            },
            disable: function() {
                this.enabled && (this.close(),
                this.enabled = !1,
                this.container.addClass("select2-container-disabled"),
                this.opts.element.attr("disabled", "disabled"))
            },
            opened: function() {
                return this.container.hasClass("select2-dropdown-open")
            },
            positionDropdown: function() {
                var t, s, i, n = this.container.offset(), o = this.container.outerHeight(!1), a = this.container.outerWidth(!1), r = this.dropdown.outerHeight(!1), l = e(window).scrollLeft() + e(window).width(), c = e(window).scrollTop() + e(window).height(), h = n.top + o, d = n.left, u = c >= h + r, p = n.top - r >= this.body().scrollTop(), f = this.dropdown.outerWidth(!1), g = l >= d + f, m = this.dropdown.hasClass("select2-drop-above");
                "static" !== this.body().css("position") && (t = this.body().offset(),
                h -= t.top,
                d -= t.left),
                m ? (s = !0,
                !p && u && (s = !1)) : (s = !1,
                !u && p && (s = !0)),
                g || (d = n.left + a - f),
                s ? (h = n.top - r,
                this.container.addClass("select2-drop-above"),
                this.dropdown.addClass("select2-drop-above")) : (this.container.removeClass("select2-drop-above"),
                this.dropdown.removeClass("select2-drop-above")),
                i = e.extend({
                    top: h,
                    left: d,
                    width: a
                }, S(this.opts.dropdownCss)),
                this.dropdown.css(i)
            },
            shouldOpen: function() {
                var t;
                return this.opened() ? !1 : (t = e.Event("opening"),
                this.opts.element.trigger(t),
                !t.isDefaultPrevented())
            },
            clearDropdownAlignmentPreference: function() {
                this.container.removeClass("select2-drop-above"),
                this.dropdown.removeClass("select2-drop-above")
            },
            open: function() {
                return this.shouldOpen() ? (window.setTimeout(this.bind(this.opening), 1),
                !0) : !1
            },
            opening: function() {
                function t() {
                    return {
                        width: Math.max(document.documentElement.scrollWidth, e(window).width()),
                        height: Math.max(document.documentElement.scrollHeight, e(window).height())
                    }
                }
                var s, i = this.containerId, n = "scroll." + i, o = "resize." + i, a = "orientationchange." + i;
                this.clearDropdownAlignmentPreference(),
                this.container.addClass("select2-dropdown-open").addClass("select2-container-active"),
                this.dropdown[0] !== this.body().children().last()[0] && this.dropdown.detach().appendTo(this.body()),
                this.updateResults(!0),
                s = e("#select2-drop-mask"),
                0 == s.length && (s = e(document.createElement("div")),
                s.attr("id", "select2-drop-mask").attr("class", "select2-drop-mask"),
                s.hide(),
                s.appendTo(this.body()),
                s.bind("mousedown touchstart", function(t) {
                    var s, i = e("#select2-drop");
                    i.length > 0 && (s = i.data("select2"),
                    s.opts.selectOnBlur && s.selectHighlighted({
                        noFocus: !0
                    }),
                    s.close())
                })),
                this.dropdown.prev()[0] !== s[0] && this.dropdown.before(s),
                e("#select2-drop").removeAttr("id"),
                this.dropdown.attr("id", "select2-drop"),
                s.css(t()),
                s.show(),
                this.dropdown.show(),
                this.positionDropdown(),
                this.dropdown.addClass("select2-drop-active"),
                this.ensureHighlightVisible();
                var r = this;
                this.container.parents().add(window).each(function() {
                    e(this).bind(o + " " + n + " " + a, function(s) {
                        e("#select2-drop-mask").css(t()),
                        r.positionDropdown()
                    })
                }),
                this.focusSearch()
            },
            close: function() {
                if (this.opened()) {
                    var t = this.containerId
                      , s = "scroll." + t
                      , i = "resize." + t
                      , n = "orientationchange." + t;
                    this.container.parents().add(window).each(function() {
                        e(this).unbind(s).unbind(i).unbind(n)
                    }),
                    this.clearDropdownAlignmentPreference(),
                    e("#select2-drop-mask").hide(),
                    this.dropdown.removeAttr("id"),
                    this.dropdown.hide(),
                    this.container.removeClass("select2-dropdown-open"),
                    this.results.empty(),
                    this.clearSearch(),
                    this.search.removeClass("select2-active"),
                    this.opts.element.trigger(e.Event("close"))
                }
            },
            clearSearch: function() {},
            getMaximumSelectionSize: function() {
                return S(this.opts.maximumSelectionSize)
            },
            ensureHighlightVisible: function() {
                var t, s, i, n, o, a, r, l = this.results;
                if (s = this.highlight(),
                !(0 > s)) {
                    if (0 == s)
                        return void l.scrollTop(0);
                    t = this.findHighlightableChoices(),
                    i = e(t[s]),
                    n = i.offset().top + i.outerHeight(!0),
                    s === t.length - 1 && (r = l.find("li.select2-more-results"),
                    r.length > 0 && (n = r.offset().top + r.outerHeight(!0))),
                    o = l.offset().top + l.outerHeight(!0),
                    n > o && l.scrollTop(l.scrollTop() + (n - o)),
                    a = i.offset().top - l.offset().top,
                    0 > a && "none" != i.css("display") && l.scrollTop(l.scrollTop() + a)
                }
            },
            findHighlightableChoices: function() {
                this.results.find(".select2-result-selectable:not(.select2-selected):not(.select2-disabled)");
                return this.results.find(".select2-result-selectable:not(.select2-selected):not(.select2-disabled)")
            },
            moveHighlight: function(t) {
                for (var s = this.findHighlightableChoices(), i = this.highlight(); i > -1 && i < s.length; ) {
                    i += t;
                    var n = e(s[i]);
                    if (n.hasClass("select2-result-selectable") && !n.hasClass("select2-disabled") && !n.hasClass("select2-selected")) {
                        this.highlight(i);
                        break
                    }
                }
            },
            highlight: function(t) {
                var i, n, o = this.findHighlightableChoices();
                return 0 === arguments.length ? s(o.filter(".select2-highlighted")[0], o.get()) : (t >= o.length && (t = o.length - 1),
                0 > t && (t = 0),
                this.results.find(".select2-highlighted").removeClass("select2-highlighted"),
                i = e(o[t]),
                i.addClass("select2-highlighted"),
                this.ensureHighlightVisible(),
                n = i.data("select2-data"),
                void (n && this.opts.element.trigger({
                    type: "highlight",
                    val: this.id(n),
                    choice: n
                })))
            },
            countSelectableResults: function() {
                return this.findHighlightableChoices().length
            },
            highlightUnderEvent: function(t) {
                var s = e(t.target).closest(".select2-result-selectable");
                if (s.length > 0 && !s.is(".select2-highlighted")) {
                    var i = this.findHighlightableChoices();
                    this.highlight(i.index(s))
                } else
                    0 == s.length && this.results.find(".select2-highlighted").removeClass("select2-highlighted")
            },
            loadMoreIfNeeded: function() {
                var e, t = this.results, s = t.find("li.select2-more-results"), i = this.resultsPage + 1, n = this, o = this.search.val(), a = this.context;
                0 !== s.length && (e = s.offset().top - t.offset().top - t.height(),
                e <= this.opts.loadMorePadding && (s.addClass("select2-active"),
                this.opts.query({
                    element: this.opts.element,
                    term: o,
                    page: i,
                    context: a,
                    matcher: this.opts.matcher,
                    callback: this.bind(function(e) {
                        n.opened() && (n.opts.populateResults.call(this, t, e.results, {
                            term: o,
                            page: i,
                            context: a
                        }),
                        n.postprocessResults(e, !1, !1),
                        e.more === !0 ? (s.detach().appendTo(t).text(n.opts.formatLoadMore(i + 1)),
                        window.setTimeout(function() {
                            n.loadMoreIfNeeded()
                        }, 10)) : s.remove(),
                        n.positionDropdown(),
                        n.resultsPage = i,
                        n.context = e.context)
                    })
                })))
            },
            tokenize: function() {},
            updateResults: function(s) {
                function n() {
                    c.scrollTop(0),
                    l.removeClass("select2-active"),
                    d.positionDropdown()
                }
                function o(e) {
                    c.html(e),
                    n()
                }
                var a, r, l = this.search, c = this.results, h = this.opts, d = this, u = l.val(), p = e.data(this.container, "select2-last-term");
                if ((s === !0 || !p || !i(u, p)) && (e.data(this.container, "select2-last-term", u),
                s === !0 || this.showSearchInput !== !1 && this.opened())) {
                    var f = this.getMaximumSelectionSize();
                    if (f >= 1 && (a = this.data(),
                    e.isArray(a) && a.length >= f && C(h.formatSelectionTooBig, "formatSelectionTooBig")))
                        return void o("<li class='select2-selection-limit'>" + h.formatSelectionTooBig(f) + "</li>");
                    if (l.val().length < h.minimumInputLength)
                        return void o(C(h.formatInputTooShort, "formatInputTooShort") ? "<li class='select2-no-results'>" + h.formatInputTooShort(l.val(), h.minimumInputLength) + "</li>" : "");
                    if (h.maximumInputLength && l.val().length > h.maximumInputLength)
                        return void o(C(h.formatInputTooLong, "formatInputTooLong") ? "<li class='select2-no-results'>" + h.formatInputTooLong(l.val(), h.maximumInputLength) + "</li>" : "");
                    h.formatSearching && 0 === this.findHighlightableChoices().length && o("<li class='select2-searching'>" + h.formatSearching() + "</li>"),
                    l.addClass("select2-active"),
                    r = this.tokenize(),
                    r != t && null != r && l.val(r),
                    this.resultsPage = 1,
                    h.query({
                        element: h.element,
                        term: l.val(),
                        page: this.resultsPage,
                        context: null,
                        matcher: h.matcher,
                        callback: this.bind(function(a) {
                            var r;
                            return this.opened() ? (this.context = a.context === t ? null : a.context,
                            this.opts.createSearchChoice && "" !== l.val() && (r = this.opts.createSearchChoice.call(null, l.val(), a.results),
                            r !== t && null !== r && d.id(r) !== t && null !== d.id(r) && 0 === e(a.results).filter(function() {
                                return i(d.id(this), d.id(r))
                            }).length && a.results.unshift(r)),
                            0 === a.results.length && C(h.formatNoMatches, "formatNoMatches") ? void o("<li class='select2-no-results'>" + h.formatNoMatches(l.val()) + "</li>") : (c.empty(),
                            d.opts.populateResults.call(this, c, a.results, {
                                term: l.val(),
                                page: this.resultsPage,
                                context: null
                            }),
                            a.more === !0 && C(h.formatLoadMore, "formatLoadMore") && (c.append("<li class='select2-more-results'>" + d.opts.escapeMarkup(h.formatLoadMore(this.resultsPage)) + "</li>"),
                            window.setTimeout(function() {
                                d.loadMoreIfNeeded()
                            }, 10)),
                            this.postprocessResults(a, s),
                            n(),
                            void this.opts.element.trigger({
                                type: "loaded",
                                data: a
                            }))) : void this.search.removeClass("select2-active")
                        })
                    })
                }
            },
            cancel: function() {
                this.close()
            },
            blur: function() {
                this.opts.selectOnBlur && this.selectHighlighted({
                    noFocus: !0
                }),
                this.close(),
                this.container.removeClass("select2-container-active"),
                this.search[0] === document.activeElement && this.search.blur(),
                this.clearSearch(),
                this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")
            },
            focusSearch: function() {
                d(this.search)
            },
            selectHighlighted: function(e) {
                var t = this.highlight()
                  , s = this.results.find(".select2-highlighted")
                  , i = s.closest(".select2-result").data("select2-data");
                i && (this.highlight(t),
                this.onSelect(i, e))
            },
            getPlaceholder: function() {
                return this.opts.element.attr("placeholder") || this.opts.element.attr("data-placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder
            },
            initContainerWidth: function() {
                function s() {
                    var s, i, n, o, a;
                    if ("off" === this.opts.width)
                        return null;
                    if ("element" === this.opts.width)
                        return 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px";
                    if ("copy" === this.opts.width || "resolve" === this.opts.width) {
                        if (s = this.opts.element.attr("style"),
                        s !== t)
                            for (i = s.split(";"),
                            o = 0,
                            a = i.length; a > o; o += 1)
                                if (n = i[o].replace(/\s/g, "").match(/width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/),
                                null !== n && n.length >= 1)
                                    return n[1];
                        return "resolve" === this.opts.width ? (s = this.opts.element.css("width"),
                        s.indexOf("%") > 0 ? s : 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px") : null
                    }
                    return e.isFunction(this.opts.width) ? this.opts.width() : this.opts.width
                }
                var i = s.call(this);
                null !== i && this.container.css("width", i)
            }
        }),
        k = T(P, {
            createContainer: function() {
                var t = e(document.createElement("div")).attr({
                    "class": "select2-container"
                }).html(["<a href='javascript:void(0)' onclick='return false;' class='select2-choice' tabindex='-1'>", "   <span></span><abbr class='select2-search-choice-close' style='display:none;'></abbr>", "   <div><b></b></div>", "</a>", "<input class='select2-focusser select2-offscreen' type='text'/>", "<div class='select2-drop' style='display:none'>", "   <div class='select2-search'>", "       <input type='text' autocomplete='off' class='select2-input'/>", "   </div>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return t
            },
            disable: function() {
                this.enabled && (this.parent.disable.apply(this, arguments),
                this.focusser.attr("disabled", "disabled"))
            },
            enable: function() {
                this.enabled || (this.parent.enable.apply(this, arguments),
                this.focusser.removeAttr("disabled"))
            },
            opening: function() {
                this.parent.opening.apply(this, arguments),
                this.focusser.attr("disabled", "disabled"),
                this.opts.element.trigger(e.Event("open"))
            },
            close: function() {
                this.opened() && (this.parent.close.apply(this, arguments),
                this.focusser.removeAttr("disabled"),
                d(this.focusser))
            },
            focus: function() {
                this.opened() ? this.close() : (this.focusser.removeAttr("disabled"),
                this.focusser.focus())
            },
            isFocused: function() {
                return this.container.hasClass("select2-container-active")
            },
            cancel: function() {
                this.parent.cancel.apply(this, arguments),
                this.focusser.removeAttr("disabled"),
                this.focusser.focus()
            },
            initContainer: function() {
                var t, s = this.container, i = this.dropdown, n = !1;
                this.showSearch(this.opts.minimumResultsForSearch >= 0),
                this.selection = t = s.find(".select2-choice"),
                this.focusser = s.find(".select2-focusser"),
                this.focusser.attr("id", "s2id_autogen" + I()),
                e("label[for='" + this.opts.element.attr("id") + "']").attr("for", this.focusser.attr("id")),
                this.search.bind("keydown", this.bind(function(e) {
                    if (this.enabled) {
                        if (e.which === E.PAGE_UP || e.which === E.PAGE_DOWN)
                            return void u(e);
                        switch (e.which) {
                        case E.UP:
                        case E.DOWN:
                            return this.moveHighlight(e.which === E.UP ? -1 : 1),
                            void u(e);
                        case E.TAB:
                        case E.ENTER:
                            return this.selectHighlighted(),
                            void u(e);
                        case E.ESC:
                            return this.cancel(e),
                            void u(e)
                        }
                    }
                })),
                this.search.bind("blur", this.bind(function(e) {
                    document.activeElement === this.body().get(0) && window.setTimeout(this.bind(function() {
                        this.search.focus()
                    }), 0)
                })),
                this.focusser.bind("keydown", this.bind(function(e) {
                    return !this.enabled || e.which === E.TAB || E.isControl(e) || E.isFunctionKey(e) || e.which === E.ESC ? void 0 : this.opts.openOnEnter === !1 && e.which === E.ENTER ? void u(e) : e.which == E.DOWN || e.which == E.UP || e.which == E.ENTER && this.opts.openOnEnter ? (this.open(),
                    void u(e)) : e.which == E.DELETE || e.which == E.BACKSPACE ? (this.opts.allowClear && this.clear(),
                    void u(e)) : void 0
                })),
                a(this.focusser),
                this.focusser.bind("keyup-change input", this.bind(function(e) {
                    this.opened() || (this.open(),
                    this.showSearchInput !== !1 && this.search.val(this.focusser.val()),
                    this.focusser.val(""),
                    u(e))
                })),
                t.delegate("abbr", "mousedown", this.bind(function(e) {
                    this.enabled && (this.clear(),
                    p(e),
                    this.close(),
                    this.selection.focus())
                })),
                t.bind("mousedown", this.bind(function(e) {
                    n = !0,
                    this.opened() ? this.close() : this.enabled && this.open(),
                    u(e),
                    n = !1
                })),
                i.bind("mousedown", this.bind(function() {
                    this.search.focus()
                })),
                t.bind("focus", this.bind(function(e) {
                    u(e)
                })),
                this.focusser.bind("focus", this.bind(function() {
                    this.container.addClass("select2-container-active")
                })).bind("blur", this.bind(function() {
                    this.opened() || this.container.removeClass("select2-container-active")
                })),
                this.search.bind("focus", this.bind(function() {
                    this.container.addClass("select2-container-active")
                })),
                this.initContainerWidth(),
                this.setPlaceholder()
            },
            clear: function(e) {
                var t = this.selection.data("select2-data");
                t && (this.opts.element.val(""),
                this.selection.find("span").empty(),
                this.selection.removeData("select2-data"),
                this.setPlaceholder(),
                e !== !1 && (this.opts.element.trigger({
                    type: "removed",
                    val: this.id(t),
                    choice: t
                }),
                this.triggerChange({
                    removed: t
                })))
            },
            initSelection: function() {
                if ("" === this.opts.element.val() && "" === this.opts.element.text())
                    this.close(),
                    this.setPlaceholder();
                else {
                    var e = this;
                    this.opts.initSelection.call(null, this.opts.element, function(s) {
                        s !== t && null !== s && (e.updateSelection(s),
                        e.close(),
                        e.setPlaceholder())
                    })
                }
            },
            prepareOpts: function() {
                var t = this.parent.prepareOpts.apply(this, arguments);
                return "select" === t.element.get(0).tagName.toLowerCase() ? t.initSelection = function(t, s) {
                    var i = t.find(":selected");
                    e.isFunction(s) && s({
                        id: i.attr("value"),
                        text: i.text(),
                        element: i
                    })
                }
                : "data"in t && (t.initSelection = t.initSelection || function(s, n) {
                    var o = s.val()
                      , a = null;
                    t.query({
                        matcher: function(e, s, n) {
                            var r = i(o, t.id(n));
                            return r && (a = n),
                            r
                        },
                        callback: e.isFunction(n) ? function() {
                            n(a)
                        }
                        : e.noop
                    })
                }
                ),
                t
            },
            getPlaceholder: function() {
                return this.select && "" !== this.select.find("option").first().text() ? t : this.parent.getPlaceholder.apply(this, arguments)
            },
            setPlaceholder: function() {
                var e = this.getPlaceholder();
                if ("" === this.opts.element.val() && e !== t) {
                    if (this.select && "" !== this.select.find("option:first").text())
                        return;
                    this.selection.find("span").html(this.opts.escapeMarkup(e)),
                    this.selection.addClass("select2-default"),
                    this.selection.find("abbr").hide()
                }
            },
            postprocessResults: function(e, t, s) {
                var n = 0
                  , o = this
                  , a = !0;
                if (this.findHighlightableChoices().each2(function(e, t) {
                    return i(o.id(t.data("select2-data")), o.opts.element.val()) ? (n = e,
                    !1) : void 0
                }),
                s !== !1 && this.highlight(n),
                t === !0) {
                    var r = this.opts.minimumResultsForSearch;
                    a = 0 > r ? !1 : y(e.results) >= r,
                    this.showSearch(a)
                }
            },
            showSearch: function(t) {
                this.showSearchInput = t,
                this.dropdown.find(".select2-search")[t ? "removeClass" : "addClass"]("select2-search-hidden"),
                e(this.dropdown, this.container)[t ? "addClass" : "removeClass"]("select2-with-searchbox")
            },
            onSelect: function(e, t) {
                var s = this.opts.element.val();
                this.opts.element.val(this.id(e)),
                this.updateSelection(e),
                this.opts.element.trigger({
                    type: "selected",
                    val: this.id(e),
                    choice: e
                }),
                this.close(),
                t && t.noFocus || this.selection.focus(),
                i(s, this.id(e)) || this.triggerChange()
            },
            updateSelection: function(e) {
                var s, i = this.selection.find("span");
                this.selection.data("select2-data", e),
                i.empty(),
                s = this.opts.formatSelection(e, i),
                s !== t && i.append(this.opts.escapeMarkup(s)),
                this.selection.removeClass("select2-default"),
                this.opts.allowClear && this.getPlaceholder() !== t && this.selection.find("abbr").show()
            },
            val: function() {
                var e, s = !1, i = null, n = this;
                if (0 === arguments.length)
                    return this.opts.element.val();
                if (e = arguments[0],
                arguments.length > 1 && (s = arguments[1]),
                this.select)
                    this.select.val(e).find(":selected").each2(function(e, t) {
                        return i = {
                            id: t.attr("value"),
                            text: t.text(),
                            element: t.get(0)
                        },
                        !1
                    }),
                    this.updateSelection(i),
                    this.setPlaceholder(),
                    s && this.triggerChange();
                else {
                    if (this.opts.initSelection === t)
                        throw new Error("cannot call val() if initSelection() is not defined");
                    if (!e && 0 !== e)
                        return this.clear(s),
                        void (s && this.triggerChange());
                    this.opts.element.val(e),
                    this.opts.initSelection(this.opts.element, function(e) {
                        n.opts.element.val(e ? n.id(e) : ""),
                        n.updateSelection(e),
                        n.setPlaceholder(),
                        s && n.triggerChange()
                    })
                }
            },
            clearSearch: function() {
                this.search.val(""),
                this.focusser.val("")
            },
            data: function(e) {
                var s;
                return 0 === arguments.length ? (s = this.selection.data("select2-data"),
                s == t && (s = null),
                s) : void (e && "" !== e ? (this.opts.element.val(e ? this.id(e) : ""),
                this.updateSelection(e)) : this.clear())
            }
        }),
        O = T(P, {
            createContainer: function() {
                var t = e(document.createElement("div")).attr({
                    "class": "select2-container select2-container-multi"
                }).html(["    <ul class='select2-choices'>", "  <li class='select2-search-field'>", "    <input type='text' autocomplete='off' class='select2-input'>", "  </li>", "</ul>", "<div class='select2-drop select2-drop-multi' style='display:none;'>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return t
            },
            prepareOpts: function() {
                var t = this.parent.prepareOpts.apply(this, arguments);
                return "select" === t.element.get(0).tagName.toLowerCase() ? t.initSelection = function(e, t) {
                    var s = [];
                    e.find(":selected").each2(function(e, t) {
                        s.push({
                            id: t.attr("value"),
                            text: t.text(),
                            element: t[0]
                        })
                    }),
                    t(s)
                }
                : "data"in t && (t.initSelection = t.initSelection || function(s, o) {
                    var a = n(s.val(), t.separator)
                      , r = [];
                    t.query({
                        matcher: function(s, n, o) {
                            var l = e.grep(a, function(e) {
                                return i(e, t.id(o))
                            }).length;
                            return l && r.push(o),
                            l
                        },
                        callback: e.isFunction(o) ? function() {
                            o(r)
                        }
                        : e.noop
                    })
                }
                ),
                t
            },
            initContainer: function() {
                var t, s = ".select2-choices";
                this.searchContainer = this.container.find(".select2-search-field"),
                this.selection = t = this.container.find(s),
                this.search.attr("id", "s2id_autogen" + I()),
                e("label[for='" + this.opts.element.attr("id") + "']").attr("for", this.search.attr("id")),
                this.search.bind("input paste", this.bind(function() {
                    this.enabled && (this.opened() || this.open())
                })),
                this.search.bind("keydown", this.bind(function(e) {
                    if (this.enabled) {
                        if (e.which === E.BACKSPACE && "" === this.search.val()) {
                            this.close();
                            var s, i = t.find(".select2-search-choice-focus");
                            if (i.length > 0)
                                return this.unselect(i.first()),
                                this.search.width(10),
                                void u(e);
                            s = t.find(".select2-search-choice:not(.select2-locked)"),
                            s.length > 0 && s.last().addClass("select2-search-choice-focus")
                        } else
                            t.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
                        if (this.opened())
                            switch (e.which) {
                            case E.UP:
                            case E.DOWN:
                                return this.moveHighlight(e.which === E.UP ? -1 : 1),
                                void u(e);
                            case E.ENTER:
                            case E.TAB:
                                return this.selectHighlighted(),
                                void u(e);
                            case E.ESC:
                                return this.cancel(e),
                                void u(e)
                            }
                        if (e.which !== E.TAB && !E.isControl(e) && !E.isFunctionKey(e) && e.which !== E.BACKSPACE && e.which !== E.ESC) {
                            if (e.which === E.ENTER) {
                                if (this.opts.openOnEnter === !1)
                                    return;
                                if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey)
                                    return
                            }
                            this.open(),
                            (e.which === E.PAGE_UP || e.which === E.PAGE_DOWN) && u(e),
                            e.which === E.ENTER && u(e)
                        }
                    }
                })),
                this.search.bind("keyup", this.bind(this.resizeSearch)),
                this.search.bind("blur", this.bind(function(e) {
                    this.container.removeClass("select2-container-active"),
                    this.search.removeClass("select2-focused"),
                    this.opened() || this.clearSearch(),
                    e.stopImmediatePropagation()
                })),
                this.container.delegate(s, "mousedown", this.bind(function(t) {
                    this.enabled && (e(t.target).closest(".select2-search-choice").length > 0 || (this.clearPlaceholder(),
                    this.open(),
                    this.focusSearch(),
                    t.preventDefault()))
                })),
                this.container.delegate(s, "focus", this.bind(function() {
                    this.enabled && (this.container.addClass("select2-container-active"),
                    this.dropdown.addClass("select2-drop-active"),
                    this.clearPlaceholder())
                })),
                this.initContainerWidth(),
                this.clearSearch()
            },
            enable: function() {
                this.enabled || (this.parent.enable.apply(this, arguments),
                this.search.removeAttr("disabled"))
            },
            disable: function() {
                this.enabled && (this.parent.disable.apply(this, arguments),
                this.search.attr("disabled", !0))
            },
            initSelection: function() {
                if ("" === this.opts.element.val() && "" === this.opts.element.text() && (this.updateSelection([]),
                this.close(),
                this.clearSearch()),
                this.select || "" !== this.opts.element.val()) {
                    var e = this;
                    this.opts.initSelection.call(null, this.opts.element, function(s) {
                        s !== t && null !== s && (e.updateSelection(s),
                        e.close(),
                        e.clearSearch())
                    })
                }
            },
            clearSearch: function() {
                var e = this.getPlaceholder();
                e !== t && 0 === this.getVal().length && this.search.hasClass("select2-focused") === !1 ? (this.search.val(e).addClass("select2-default"),
                this.search.width(this.getMaxSearchWidth())) : this.search.val("").width(10)
            },
            clearPlaceholder: function() {
                this.search.hasClass("select2-default") && this.search.val("").removeClass("select2-default")
            },
            opening: function() {
                this.clearPlaceholder(),
                this.resizeSearch(),
                this.parent.opening.apply(this, arguments),
                this.focusSearch(),
                this.opts.element.trigger(e.Event("open"))
            },
            close: function() {
                this.opened() && this.parent.close.apply(this, arguments)
            },
            focus: function() {
                this.close(),
                this.search.focus()
            },
            isFocused: function() {
                return this.search.hasClass("select2-focused")
            },
            updateSelection: function(t) {
                var i = []
                  , n = []
                  , o = this;
                e(t).each(function() {
                    s(o.id(this), i) < 0 && (i.push(o.id(this)),
                    n.push(this))
                }),
                t = n,
                this.selection.find(".select2-search-choice").remove(),
                e(t).each(function() {
                    o.addSelectedChoice(this)
                }),
                o.postprocessResults()
            },
            tokenize: function() {
                var e = this.search.val();
                e = this.opts.tokenizer(e, this.data(), this.bind(this.onSelect), this.opts),
                null != e && e != t && (this.search.val(e),
                e.length > 0 && this.open())
            },
            onSelect: function(e, t) {
                this.addSelectedChoice(e),
                this.opts.element.trigger({
                    type: "selected",
                    val: this.id(e),
                    choice: e
                }),
                (this.select || !this.opts.closeOnSelect) && this.postprocessResults(),
                this.opts.closeOnSelect ? (this.close(),
                this.search.width(10)) : this.countSelectableResults() > 0 ? (this.search.width(10),
                this.resizeSearch(),
                this.getMaximumSelectionSize() > 0 && this.val().length >= this.getMaximumSelectionSize() && this.updateResults(!0),
                this.positionDropdown()) : (this.close(),
                this.search.width(10)),
                this.triggerChange({
                    added: e
                }),
                t && t.noFocus || this.focusSearch()
            },
            cancel: function() {
                this.close(),
                this.focusSearch()
            },
            addSelectedChoice: function(s) {
                var i, n = !s.locked, o = e("<li class='select2-search-choice'>    <div></div>    <a href='#' onclick='return false;' class='select2-search-choice-close' tabindex='-1'></a></li>"), a = e("<li class='select2-search-choice select2-locked'><div></div></li>"), r = n ? o : a, l = this.id(s), c = this.getVal();
                i = this.opts.formatSelection(s, r.find("div")),
                i != t && r.find("div").replaceWith("<div>" + this.opts.escapeMarkup(i) + "</div>"),
                n && r.find(".select2-search-choice-close").bind("mousedown", u).bind("click dblclick", this.bind(function(t) {
                    this.enabled && (e(t.target).closest(".select2-search-choice").fadeOut("fast", this.bind(function() {
                        this.unselect(e(t.target)),
                        this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"),
                        this.close(),
                        this.focusSearch()
                    })).dequeue(),
                    u(t))
                })).bind("focus", this.bind(function() {
                    this.enabled && (this.container.addClass("select2-container-active"),
                    this.dropdown.addClass("select2-drop-active"))
                })),
                r.data("select2-data", s),
                r.insertBefore(this.searchContainer),
                c.push(l),
                this.setVal(c)
            },
            unselect: function(e) {
                var t, i, n = this.getVal();
                if (e = e.closest(".select2-search-choice"),
                0 === e.length)
                    throw "Invalid argument: " + e + ". Must be .select2-search-choice";
                t = e.data("select2-data"),
                t && (i = s(this.id(t), n),
                i >= 0 && (n.splice(i, 1),
                this.setVal(n),
                this.select && this.postprocessResults()),
                e.remove(),
                this.opts.element.trigger({
                    type: "removed",
                    val: this.id(t),
                    choice: t
                }),
                this.triggerChange({
                    removed: t
                }))
            },
            postprocessResults: function() {
                var e = this.getVal()
                  , t = this.results.find(".select2-result")
                  , i = this.results.find(".select2-result-with-children")
                  , n = this;
                t.each2(function(t, i) {
                    var o = n.id(i.data("select2-data"));
                    s(o, e) >= 0 && (i.addClass("select2-selected"),
                    i.find(".select2-result-selectable").addClass("select2-selected"))
                }),
                i.each2(function(e, t) {
                    t.is(".select2-result-selectable") || 0 !== t.find(".select2-result-selectable:not(.select2-selected)").length || t.addClass("select2-selected")
                }),
                -1 == this.highlight() && n.highlight(0)
            },
            getMaxSearchWidth: function() {
                return this.selection.width() - o(this.search)
            },
            resizeSearch: function() {
                var e, t, s, i, n, a = o(this.search);
                e = f(this.search) + 10,
                t = this.search.offset().left,
                s = this.selection.width(),
                i = this.selection.offset().left,
                n = s - (t - i) - a,
                e > n && (n = s - a),
                40 > n && (n = s - a),
                0 >= n && (n = e),
                this.search.width(n)
            },
            getVal: function() {
                var e;
                return this.select ? (e = this.select.val(),
                null === e ? [] : e) : (e = this.opts.element.val(),
                n(e, this.opts.separator))
            },
            setVal: function(t) {
                var i;
                this.select ? this.select.val(t) : (i = [],
                e(t).each(function() {
                    s(this, i) < 0 && i.push(this)
                }),
                this.opts.element.val(0 === i.length ? "" : i.join(this.opts.separator)))
            },
            val: function() {
                var s, i = !1, n = this;
                if (0 === arguments.length)
                    return this.getVal();
                if (s = arguments[0],
                arguments.length > 1 && (i = arguments[1]),
                !s && 0 !== s)
                    return this.opts.element.val(""),
                    this.updateSelection([]),
                    this.clearSearch(),
                    void (i && this.triggerChange());
                if (this.setVal(s),
                this.select)
                    this.opts.initSelection(this.select, this.bind(this.updateSelection)),
                    i && this.triggerChange();
                else {
                    if (this.opts.initSelection === t)
                        throw new Error("val() cannot be called if initSelection() is not defined");
                    this.opts.initSelection(this.opts.element, function(t) {
                        var s = e(t).map(n.id);
                        n.setVal(s),
                        n.updateSelection(t),
                        n.clearSearch(),
                        i && n.triggerChange()
                    })
                }
                this.clearSearch()
            },
            onSortStart: function() {
                if (this.select)
                    throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
                this.search.width(0),
                this.searchContainer.hide()
            },
            onSortEnd: function() {
                var t = []
                  , s = this;
                this.searchContainer.show(),
                this.searchContainer.appendTo(this.searchContainer.parent()),
                this.resizeSearch(),
                this.selection.find(".select2-search-choice").each(function() {
                    t.push(s.opts.id(e(this).data("select2-data")))
                }),
                this.setVal(t),
                this.triggerChange()
            },
            data: function(t) {
                var s, i = this;
                return 0 === arguments.length ? this.selection.find(".select2-search-choice").map(function() {
                    return e(this).data("select2-data")
                }).get() : (t || (t = []),
                s = e.map(t, function(e) {
                    return i.opts.id(e)
                }),
                this.setVal(s),
                this.updateSelection(t),
                this.clearSearch(),
                void 0)
            }
        }),
        e.fn.select2 = function() {
            var i, n, o, a, r = Array.prototype.slice.call(arguments, 0), l = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "onSortStart", "onSortEnd", "enable", "disable", "positionDropdown", "data"];
            return this.each(function() {
                if (0 === r.length || "object" == typeof r[0])
                    i = 0 === r.length ? {} : e.extend({}, r[0]),
                    i.element = e(this),
                    "select" === i.element.get(0).tagName.toLowerCase() ? a = i.element.attr("multiple") : (a = i.multiple || !1,
                    "tags"in i && (i.multiple = a = !0)),
                    n = a ? new O : new k,
                    n.init(i);
                else {
                    if ("string" != typeof r[0])
                        throw "Invalid arguments to select2 plugin: " + r;
                    if (s(r[0], l) < 0)
                        throw "Unknown method: " + r[0];
                    if (o = t,
                    n = e(this).data("select2"),
                    n === t)
                        return;
                    if (o = "container" === r[0] ? n.container : n[r[0]].apply(n, r.slice(1)),
                    o !== t)
                        return !1
                }
            }),
            o === t ? this : o
        }
        ,
        e.fn.select2.defaults = {
            width: "copy",
            loadMorePadding: 0,
            closeOnSelect: !0,
            openOnEnter: !0,
            containerCss: {},
            dropdownCss: {},
            containerCssClass: "",
            dropdownCssClass: "",
            formatResult: function(e, t, s, i) {
                var n = [];
                return m(e.text, s.term, n, i),
                n.join("")
            },
            formatSelection: function(e, s) {
                return e ? e.text : t
            },
            sortResults: function(e, t, s) {
                return e
            },
            formatResultCssClass: function(e) {
                return t
            },
            formatNoMatches: function() {
                return "No matches found"
            },
            formatInputTooShort: function(e, t) {
                var s = t - e.length;
                return "Please enter " + s + " more character" + (1 == s ? "" : "s")
            },
            formatInputTooLong: function(e, t) {
                var s = e.length - t;
                return "Please delete " + s + " character" + (1 == s ? "" : "s")
            },
            formatSelectionTooBig: function(e) {
                return "You can only select " + e + " item" + (1 == e ? "" : "s")
            },
            formatLoadMore: function(e) {
                return "Loading more results..."
            },
            formatSearching: function() {
                return "Searching..."
            },
            minimumResultsForSearch: 0,
            minimumInputLength: 0,
            maximumInputLength: null,
            maximumSelectionSize: 0,
            id: function(e) {
                return e.id
            },
            matcher: function(e, t) {
                return ("" + t).toUpperCase().indexOf(("" + e).toUpperCase()) >= 0
            },
            separator: ",",
            tokenSeparators: [],
            tokenizer: x,
            escapeMarkup: function(e) {
                var t = {
                    "\\": "&#92;",
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&apos;",
                    "/": "&#47;"
                };
                return String(e).replace(/[&<>"'\/\\]/g, function(e) {
                    return t[e[0]]
                })
            },
            blurOnChange: !1,
            selectOnBlur: !1,
            adaptContainerCssClass: function(e) {
                return e
            },
            adaptDropdownCssClass: function(e) {
                return null
            }
        },
        window.Select2 = {
            query: {
                ajax: v,
                local: b,
                tags: w
            },
            util: {
                debounce: l,
                markMatch: m
            },
            "class": {
                "abstract": P,
                single: k,
                multi: O
            }
        }
    }
}(jQuery);
