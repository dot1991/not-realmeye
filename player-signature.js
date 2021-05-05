function initializeSaveSignature(e, t, r) {
    function n() {
        l.button("loading"),
        codemirror.save(),
        s.fadeTo("fast", .3),
        callSpec(t, {
            definition: o.val()
        }).done(function(e) {
            l.button("reset");
            var t = e[0];
            if (t && r)
                window.location.href = r;
            else if (t)
                u.removeClass("alert-warning").addClass("alert-success").text("Signature successfully updated.").removeClass("invisible"),
                s[0].onload = function() {
                    s.fadeTo("fast", 1)
                }
                ,
                s.attr("src", c + "?" + (new Date).getTime());
            else {
                if (u.removeClass("alert-success").addClass("alert-warning").text(e[1]).removeClass("invisible"),
                null == e[2])
                    return;
                var n = o.val()
                  , i = codemirror.findPosH({
                    line: 0,
                    ch: 0
                }, a(n, e[2], -1), "char", !1)
                  , p = codemirror.findPosH({
                    line: 0,
                    ch: 0
                }, a(n, e[2], 1) + 1, "char", !1);
                codemirror.getDoc().setSelection(i, p)
            }
        })
    }
    function a(e, t, r) {
        for (var n = t, a = r > 0 ? e.length : -1; n != a && !/\s/m.test(e.charAt(n)); )
            n += r;
        return n - r
    }
    var i = $("#" + e)
      , s = $("img", i)
      , o = $("textarea", i);
    codemirror = CodeMirror.fromTextArea(o[0], {
        lineNumbers: !0,
        extraKeys: {
            "Ctrl-Enter": n
        },
        lint: !0
    });
    var l = $(".save-button", i)
      , u = $("div.alert", i)
      , c = s.attr("src");
    l.click(n)
}
function initializeEmbedCodeGenerator(e, t, r) {
    function n() {
        m.text(0 === d ? a() : i())
    }
    function a() {
        var e = [];
        return 2 !== h && (e.push("[url="),
        e.push(0 === h ? "http://www.realmeye.com/player/" + t : encodeURI(c.val())),
        e.push("]")),
        e.push("[imgalign=x]http://www.realmeye.com/signature-of/"),
        e.push(t),
        e.push("[/imgalign]"),
        2 !== h && e.push("[/url]"),
        e.join("")
    }
    function i() {
        function e(e) {
            return e.replace(/[&\"<>]/g, function(e) {
                switch (e) {
                case "&":
                    return "&amp;";
                case '"':
                    return "&quot;";
                case "<":
                    return "&lt;";
                case ">":
                    return "&rt;"
                }
            })
        }
        var r, n = e(f.val()), a = [];
        switch (h) {
        case 0:
            r = "http://www.realmeye.com/player/" + t;
            break;
        case 1:
            r = encodeURI(c.val());
            break;
        default:
            r = null
        }
        return null !== r && (a.push('<a href="'),
        a.push(r),
        a.push('">')),
        a.push('<img title="'),
        a.push(n),
        a.push('" alt="'),
        a.push(n),
        a.push('" src="http://www.realmeye.com/signature-of/'),
        a.push(t),
        a.push('">'),
        null !== r && a.push("</a>"),
        a.join("")
    }
    var s = $("#" + e)
      , o = $(".code-type label", s)
      , l = $(".link-type label", s)
      , u = $(".custom-link", s)
      , c = $("input", u)
      , p = $(".title", s)
      , f = $("#title-input")
      , d = 0
      , h = 0
      , m = $("pre", s)
      , v = new ZeroClipboard($("#copy-button", s),{
        moviePath: r,
        hoverClass: "hover",
        activeClass: "active"
    });
    v.on("dataRequested", function(e, t) {
        e.setText(m.text())
    }),
    $("form", s).submit(function() {
        return !1
    }),
    l.click(function() {
        var e = $(this).index();
        1 === e ? u.slideDown("fast") : u.slideUp("fast"),
        h = e,
        n()
    }),
    o.click(function() {
        var e = $(this).index();
        1 === e ? p.slideDown("fast") : p.slideUp("fast"),
        d = e,
        n()
    }),
    c.on("input", n),
    f.on("input", n),
    n()
}
