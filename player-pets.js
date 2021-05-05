function initializeRenamePetButton(n, e, t) {
    $("#" + n).click(function() {
        var n = $("#pet-renamer")
          , a = items[e]
          , i = $("input", n);
        $(".pet-name", n).text(t.data.name),
        i.val(t.data.name),
        $(".pet", n).css("background-position", "-" + a[1] + "px -" + a[2] + "px"),
        $(".btn", n).off().click(function() {
            callSpecAndReload(t, {
                name: i.val()
            })
        }),
        i.keydown(function(n) {
            return 13 === n.keyCode ? (callSpecAndReload(t, {
                name: i.val()
            }),
            !1) : !0
        }),
        n.modal("show")
    })
}
function initializeRemovePetButton(n, e) {
    $("#" + n).click(function() {
        callSpecAndReload(e)
    })
}
