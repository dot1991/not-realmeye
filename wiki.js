function initializeWikiPage(i, t) {
    var e = {};
    $.each(t, function() {
        e[this[0]] = this[1]
    }),
    $("#" + i + " a").each(function() {
        var i = $(this)
          , t = i.attr("href");
        if (t)
            if (/^\/wiki/.test(t)) {
                t = t.replace(/[?#].*$/, "");
                var n = e[t];
                n ? i.attr("title", n) : i.addClass("missing-wiki-page").attr("title", "Missing wiki page")
            } else
                /^#/.test(t) || (/^\s*$/.test(i.text()) || i.addClass("external"),
                i.attr("title") || i.attr("title", "External link"))
    })
}
function initializeDeleteWikiPageLink(i, t) {
    initializeModal(i, "delete-modal", t, "#")
}
function initializeRestoreWikiPageLink(i, t) {
    initializeModal(i, "revert-modal", t, "/")
}
function initializeLockPageLink(i, t) {
    var e = $("#" + i)
      , n = $("#lock-modal")
      , a = n.find(".alert-danger");
    e.click(function() {
        n.modal("show")
    }),
    n.find("button").click(function() {
        var i = window.location.href;
        callSpec(t).done(function(t) {
            if (t[0]) {
                var e = i.lastIndexOf("#");
                window.location.href = i.slice(0, e)
            } else
                a.text(t[1]).removeClass("hide")
        })
    })
}
function initializeModal(i, t, e, n) {
    var a = ($("#" + i),
    $("#" + t))
      , l = a.find(":input[name=comment]")
      , o = a.find(".alert-danger");
    $("#" + i).click(function() {
        a.modal("show")
    }),
    a.find("button").click(function() {
        var i = window.location.href;
        callSpec(e, {
            comment: l.val()
        }).done(function(t) {
            if (t[0]) {
                var e = i.lastIndexOf(n);
                window.location.href = i.slice(0, e)
            } else
                o.text(t[1]).removeClass("hide")
        })
    })
}
function initializeWikiSearch(i, t, e) {
    var n, a = $("#" + i);
    a.select2({
        minimumInputLength: 2,
        placeholder: "Wiki search",
        ajax: $.extend(t, {
            dataType: "json",
            quietMillis: 400,
            data: function(i) {
                return n = i,
                completeData({
                    title: i
                })
            },
            results: function(i, t) {
                var a = [{
                    id: e + "?q=" + encodeURIComponent(n),
                    text: "Search for: " + n
                }];
                return i[0] && (a = a.concat($.map(i[1], function(i) {
                    return {
                        id: i[0],
                        text: "Go to: " + i[1]
                    }
                }))),
                {
                    results: a
                }
            }
        })
    }),
    a.on("change.select2", function(i) {
        window.location.href = i.val
    })
}
