$.tablesorter.addParser({
    id: "items",
    is: function(t) {
        return !1
    },
    format: function(t, e, a) {
        return $(a).data("sorter")
    },
    type: "text"
}),
$.tablesorter.addParser({
    id: "quantity",
    is: function(t) {
        return !1
    },
    format: function(t) {
        return t.slice(1)
    },
    type: "digit"
}),
$.tablesorter.addParser({
    id: "timeago",
    is: function(t) {
        return !1
    },
    format: function(t, e, a) {
        return $("span", a).attr("title")
    },
    type: "text"
}),
RealmEye.trading = {
    initializeTradableItems: function(t) {
        this.tradableItems = t;
        var e = {};
        _.each(t, function(t, a) {
            e[t[0]] = a
        }),
        this.positionForItem = e
    },
    initializeItemSelectorForSearch: function(t) {
        var e = this
          , a = $("#item-selector");
        a.modal({
            show: !1
        }),
        makeItem($("#" + t + " .item")),
        $("#" + t).click(function() {
            a.empty(),
            e.renderItemSelector(a, function(t) {
                var e = window.location.pathname.split("/")
                  , a = e[2] || "sell"
                  , i = e[4]
                  , n = ["", "offers-to", a, t];
                i && n.push(i),
                window.location.pathname = n.join("/")
            }, e.tradableItems),
            a.modal("show")
        })
    },
    initializeItemSelectorForFilter: function(t) {
        var e = this;
        makeItem($("#" + t + " .item")),
        $("#" + t).click(function() {
            var t = $("#item-selector");
            t.empty(),
            e.renderItemSelector(t, function(t) {
                var e = window.location.pathname.split("/")
                  , a = e[2] || "sell"
                  , i = e[3]
                  , n = ["", "offers-to", a, i];
                t && n.push(t),
                window.location.pathname = n.join("/")
            }, e.tradableItems, !0),
            t.modal("show")
        })
    },
    renderItemSelector: function(t, e, a, i) {
        var n = ["#EDC8C8", "#C8EAED", "#EDCFC8", "#C8E3ED", "#EDD6C8", "#C8DBED", "#EDDEC8", "#C8D4ED", "#EDE5C8", "#C8CDED", "#EDECC8", "#CAC8ED", "#E7EDC8", "#D2C8ED", "#E0EDC8", "#D9C8ED", "#D9EDC8", "#E0C8ED", "#D2EDC8", "#E7C8ED", "#CAEDC8", "#EDC8EC", "#C8EDCD", "#EDC8E5", "#C8EDD4", "#EDC8DE", "#C8EDDB", "#EDC8D6", "#C8EDE3", "#EDC8CF", "#C8EDEA"]
          , o = ['<div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-body">'];
        i && (o.push('<span class="item-wrapper btn"><span class="item-other" style="margin-top: 3px">Any<br>item</span></span>'),
        o.push('<span class="item-wrapper btn"><span class="item-other" style="margin-top: 13px" data-item="pots">Pots</span></span>')),
        _.each(a, function(t) {
            var e = t[0]
              , a = n[t[1] % n.length];
            o.push('<span class="item-wrapper" style="background-color: '),
            o.push(a),
            o.push('"><span class="item" data-item="'),
            o.push(e),
            o.push('"></span></span>')
        }),
        o.push("</div></div></div>"),
        t.append(o.join("")),
        makeItemsIn(t).on("click", function() {
            $(this).hasClass("disabled") || e($(this).data("item"))
        }),
        i && $(".item-other", t).on("click", function() {
            $(this).hasClass("disabled") || e($(this).data("item"))
        })
    },
    initializeOfferTypeSelectorForSearch: function(t) {
        $("#" + t).change(function() {
            var t = window.location.pathname.split("/");
            t[2] = $(this).val(),
            window.location.pathname = t.slice(0, 5).join("/")
        })
    },
    renderItemsLinkingToOffers: function(t, e, a) {
        $("#" + t + " td:nth-child(" + e + ") .item").each(function() {
            var t = $(this);
            makeItem(t),
            t.wrap(function() {
                var e = t.attr("data-item");
                return '<a href="/offers-to/' + a + "/" + e + '"/>'
            })
        })
    }
};
