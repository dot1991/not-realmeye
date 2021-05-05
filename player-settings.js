function initializeVisibilitySettings(e, t) {
    var i = $("#" + e);
    $("select[name=profileVisibility]", i).change(function() {
        var e = parseInt($(this).val());
        $("select[name!=profileVisibility]", i).each(function() {
            var t = parseInt($(this).val());
            $("option", this).each(function() {
                var t = parseInt($(this).val());
                t !== (t & e) ? $(this).hide() : $(this).show()
            }),
            t !== (t & e) && $(this).val(t & e)
        })
    }),
    i.submit(function(e) {
        var a = {};
        $("select", i).each(function() {
            var e = $(this);
            a[e.attr("name")] = e.val()
        }),
        callSpecAndReload(t, a),
        e.preventDefault()
    })
}
function initializeChangePassword(e, t, i) {
    var a = $("#" + e);
    openModalButton = $(".btn.open", a),
    modal = $(".modal", a),
    initialized = !1,
    openModalButton.click(function() {
        if (modal.modal("show"),
        !initialized) {
            var e = $(".btn.save", modal);
            e.button("loading"),
            $.getScript(t + "js/zxcvbn.js", function() {
                var t = $(':input[name="current-password"]', modal)
                  , a = $(':input[name="new-password"]', modal)
                  , n = $("#new-password-help")
                  , o = $(':input[name="verified-password"]', modal)
                  , s = $("#verify-password-help")
                  , l = ""
                  , r = !1
                  , d = function() {
                    c.addClass("hide");
                    var i = a.val();
                    if (verifiedPassword = o.val(),
                    i.length < 6)
                        n.text("Too short"),
                        r = !1;
                    else if (i != l) {
                        var d = zxcvbn(i);
                        n.text(["Pathetic", "Weak", "Weak", "Acceptable", "Great"][d.score]),
                        r = d.score > 2
                    }
                    return s.text(verifiedPassword == i ? "" : "Doesn't match"),
                    l = i,
                    !r || verifiedPassword != i || t.val().length < 6 ? (e.attr("disabled", "disabled").addClass("disabled"),
                    !1) : (e.removeAttr("disabled").removeClass("disabled"),
                    !0)
                }
                  , c = (window.location.pathname,
                $(".alert", modal));
                t.on("keydown", function() {
                    return setTimeout(d, 0),
                    !0
                }),
                a.on("keydown", function() {
                    return setTimeout(d, 0),
                    !0
                }),
                o.on("keydown", function() {
                    return setTimeout(d, 0),
                    !0
                }),
                e.click(function() {
                    d() && callSpecAndReload(i, {
                        currentPassword: t.val(),
                        newPassword: a.val()
                    }, function(e) {
                        return "OK" == e ? !0 : (c.text(e).removeClass("hide"),
                        !1)
                    })
                }),
                e.button("reset"),
                setTimeout(d, 0),
                initialized = !0
            })
        }
    })
}
