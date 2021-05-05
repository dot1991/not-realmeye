function initializeOfferEditor(id, offers, renderSuspendedOffers, tradableItems, saveSpec) {
    function initializeData() {
        function nextId() {
            return id++
        }
        function offer(e) {
            this.id = nextId(),
            this.quantity = e && e[0] || 1,
            this.createdOn = e && e[1] || null,
            this.suspended = e && e[2] || !1,
            this.selling = e && d3.zip(e[3], e[4]) || [],
            this.buying = e && d3.zip(e[5], e[6]) || []
        }
        function updateItem(e, t, n, i, a) {
            i >= 0 ? addItem(t, n, i, a) : removeItem(t, n),
            dispatch.offerChanged(e)
        }
        function addItem(e, t, n, i) {
            if (i) {
                for (var a = 0; a < e.length; ++a)
                    if (e[a][0] == i) {
                        e[a] = [t, n];
                        break
                    }
            } else
                e.push([t, 1])
        }
        function removeItem(e, t) {
            for (var n = 0; n < e.length; ++n)
                e[n][0] == t && e.splice(n, 1)
        }
        var id = 0
          , dispatch = d3.dispatch("offerChanged", "collectionChanged");
        d.offers = offers.map(function(e) {
            return new offer(e)
        }),
        d.offers.dispatch = dispatch,
        d.offers.maxOfferCount = 200,
        d.offers.active = function() {
            return _.filter(this, function(e) {
                return !e.suspended
            })
        }
        ,
        d.offers.suspended = function() {
            return _.filter(this, function(e) {
                return e.suspended
            })
        }
        ,
        d.offers.create = function() {
            var e = new offer;
            return this.push(e),
            dispatch.collectionChanged(),
            e
        }
        ,
        d.offers.offersToSave = function() {
            return _.map(this, function(e) {
                return e.offerToSave()
            })
        }
        ,
        offer.prototype.suspend = function(e) {
            this.suspended = !0,
            this.moveToEnd(e)
        }
        ,
        offer.prototype.activate = function(e) {
            this.suspended = !1,
            this.moveToEnd(e)
        }
        ,
        offer.prototype.sell = function(e, t, n) {
            updateItem(this, this.selling, e, t, n)
        }
        ,
        offer.prototype.buy = function(e, t, n) {
            updateItem(this, this.buying, e, t, n)
        }
        ,
        offer.prototype.copy = function() {
            var newOffer = new offer;
            with (newOffer)
                quantity = this.quantity,
                createdOn = this.createdOn,
                suspeded = this.suspended,
                selling = $.extend(!0, [], this.selling),
                buying = $.extend(!0, [], this.buying);
            return newOffer
        }
        ,
        offer.prototype.duplicate = function() {
            var e = d.offers.indexOf(this)
              , t = this.copy();
            d.offers.splice(e, 0, t),
            dispatch.collectionChanged()
        }
        ,
        offer.prototype.remove = function(e) {
            var t = d.offers.indexOf(this);
            d.offers.splice(t, 1),
            e || dispatch.collectionChanged()
        }
        ,
        offer.prototype.swap = function() {
            var e = this.selling;
            this.selling = this.buying,
            this.buying = e,
            dispatch.collectionChanged()
        }
        ,
        offer.prototype.up = function() {
            var e = d.offers.indexOf(this);
            if (e > 0) {
                var t = d.offers[e];
                d.offers[e] = d.offers[e - 1],
                d.offers[e - 1] = t,
                dispatch.collectionChanged()
            }
        }
        ,
        offer.prototype.down = function() {
            var e = d.offers.indexOf(this);
            if (e < d.offers.length - 1) {
                var t = d.offers[e];
                d.offers[e] = d.offers[e + 1],
                d.offers[e + 1] = t,
                dispatch.collectionChanged()
            }
        }
        ,
        offer.prototype.moveToEnd = function(e) {
            var t = d.offers.indexOf(this);
            d.offers.splice(t, 1),
            d.offers.push(this),
            e || dispatch.collectionChanged()
        }
        ,
        offer.prototype.offerToSave = function() {
            return {
                quantity: this.quantity,
                sellingItems: _.pluck(this.selling, 0),
                sellingQuantities: _.pluck(this.selling, 1),
                buyingItems: _.pluck(this.buying, 0),
                buyingQuantities: _.pluck(this.buying, 1),
                suspended: this.suspended
            }
        }
    }
    function initializeElements() {
        e.root = d3.select("#" + id),
        initializeActiveOffersTable(),
        initializeActiveOffersButtonRow(),
        initializeSuspendedOffersTable(),
        initializeSuspendedOffersButtonRow(),
        initializeItemSelector()
    }
    function initializeActiveOffersTable() {
        function t() {
            e.activeOffers.updateTable()
        }
        function n(e, t, n, o) {
            var s = e.selectAll("span.item-add").data([!0]);
            s.enter().append("span").each(a(t, o)),
            s.style("display", n.length >= 8 ? "none" : "inline-block"),
            itemButtons = e.selectAll("span.item-editor").data(n, function(e) {
                return e[0]
            }),
            itemButtons.enter().insert("span", "span.item-add").each(i(t, o, n)),
            itemButtons.order(),
            itemButtons.exit().remove()
        }
        function i(t, n, i) {
            return function(a) {
                var o = d3.select(this);
                o.classed("btn btn-default item-editor", !0).attr("title", "Change quantity");
                var s = (o.append("span").classed("btn btn-default item-remove", !0).attr("title", "Remove this item").html('<i class="glyphicon glyphicon-remove"></i>').on("click", function() {
                    d3.event.stopPropagation(),
                    t[n](a[0], -1)
                }),
                renderQuantityEditor(o, "item", function() {
                    var e = _.find(i, function(e) {
                        return e[0] == a[0]
                    });
                    return e[1]
                }, function(e) {
                    t[n](a[0], e, a[0])
                }, function() {
                    var e = _.find(tradableItems, function(e) {
                        return e[0] == a[0]
                    });
                    return e[2]
                }),
                o.append("span").classed("item", !0).attr("data-item", a[0]).on("click", function() {
                    e.itemSelector.selectFor(t, function(e) {
                        t[n](e, a[1], a[0])
                    })
                }));
                makeItem($(s.node()))
            }
        }
        function a(t, n) {
            return function(i) {
                var a = d3.select(this);
                a.classed("btn btn-default item-add", !0).attr("title", "Add another item").html('<i class="glyphicon glyphicon-plus"></i><br>Add Item').on("click", function() {
                    d3.event.stopPropagation(),
                    e.itemSelector.selectFor(t, function(e) {
                        t[n](e, 1)
                    })
                })
            }
        }
        e.root.append("h2").text("Active Offers"),
        e.activeOffers = createTable(e.root, [{
            heading: "Selling",
            renderer: function(e, t) {
                n(e, t, t.selling, "sell")
            }
        }, {
            heading: "Buying",
            renderer: function(e, t) {
                n(e, t, t.buying, "buy")
            }
        }, {
            heading: ["Qty.", "Quantity"],
            renderer: function(e, t) {
                renderQuantityEditor(e, "trade", function() {
                    return t.quantity
                }, function(e) {
                    t.quantity = e
                }, function() {
                    return 256
                })
            }
        }, {
            heading: "Actions",
            renderer: function(e, t) {
                e.style("min-width", "96px"),
                renderMenu(e, [["Swap sides", "transfer", function() {
                    t.swap()
                }
                ], ["Move up", "chevron-up", function() {
                    t.up()
                }
                ], ["Move down", "chevron-down", function() {
                    t.down()
                }
                ], ["Duplicate", "duplicate", function() {
                    t.duplicate()
                }
                , function() {
                    return d.offers.length >= d.offers.maxOfferCount
                }
                ], ["Suspend", "pause", function() {
                    t.suspend()
                }
                ], ["Remove", "remove", function() {
                    t.remove()
                }
                ]])
            }
        }], function() {
            return d.offers.active()
        }),
        t(),
        d.offers.dispatch.on("collectionChanged.active", t),
        d.offers.dispatch.on("offerChanged.active", function(t) {
            e.activeOffers.updateOffer(t)
        })
    }
    function initializeActiveOffersButtonRow() {
        var t = e.buttonRow = e.root.append("div");
        t.classed("row");
        var n = t.append("div");
        n.classed("btn-group", !0);
        var i = n.append("button").classed("btn btn-success", !0).classed("disabled", d.offers.length >= d.offers.maxOfferCount).html('<i class="glyphicon glyphicon-plus"></i><br>Add Offer').on("click", function() {
            d3.select(this).classed("disabled") || d.offers.create()
        });
        d.offers.dispatch.on("collectionChanged.addOffer", function() {
            i.classed("disabled", d.offers.length >= d.offers.maxOfferCount)
        }),
        n.append("button").classed("btn btn-warning", !0).html('<i class="glyphicon glyphicon-pause"></i><br>Suspend All').on("click", function() {
            _.each(d.offers.active(), function(e) {
                e.suspend(!0)
            }),
            d.offers.dispatch.collectionChanged()
        }),
        n.append("button").classed("btn btn-danger", !0).html('<i class="glyphicon glyphicon-remove"></i><br>Remove All').on("click", function() {
            _.each(d.offers.active(), function(e) {
                e.remove(!0)
            }),
            d.offers.dispatch.collectionChanged()
        }),
        t.append("button").classed("btn btn-primary trade-save", !0).html('<i class="glyphicon glyphicon-ok"></i><br>Save Changes').on("click", function() {
            var e = d3.select(this);
            e.classed("disabled") || (e.classed("disabled", !0),
            callSpec(saveSpec, {
                trades: JSON.stringify(d.offers.offersToSave())
            }).fail(function() {
                t.append("span").classed("trade-message alert alert-danger", !0).text("Network Error").transition().delay(3e3).style("opacity", 0).remove().each("end", function() {
                    e.classed("disabled", !1)
                })
            }).done(function(n) {
                var i = n[0];
                if (i) {
                    var s = n[1];
                    s ? (a.select("span.confirmation-code").text(s),
                    o.modal("show")) : t.append("span").classed("trade-message alert alert-success", !0).text("Offers saved successfully.").transition().delay(3e3).style("opacity", 0).remove().each("end", function() {
                        e.classed("disabled", !1)
                    })
                } else {
                    var r = n[1]
                      , c = _.map(n[2], function(e) {
                        return d.offers[e - 1].id
                    });
                    t.append("span").classed("trade-message alert alert-danger", !0).text(r).transition().delay(5e3).style("opacity", 0).remove().each("end", function() {
                        e.classed("disabled", !1)
                    }),
                    d3.selectAll("table.trades tbody tr").filter(function(e) {
                        return _.contains(c, e.id)
                    }).style("background-color", "rgb(242,222,222)").transition().delay(5e3).style("background-color", "inherit")
                }
            }))
        });
        var a = e.root.append("div").attr("id", "trade-confirmator").classed("modal fade", !0).html('<div class="modal-dialog"><div class="modal-content"><div class="modal-body"><div class="span6"><h2>Confirmation</h2><p><a target="_blank" href="/mreyeball">Mr. Eyeball</a> is waiting for you to confirm your offer:</p><code>/tell mreyeball confirm trade: <span class="confirmation-code"></span></code><p>Act swiftly! In five minutes he forgets them all!</p><div class="alert">You can log in to RealmEye.com, and skip the confirmation step. Get a <a href="/mreyeball#password" target="_blank">password</a> from Mr. Eyeball!</div></div></div></div></div>')
          , o = $(a.node())
    }
    function initializeSuspendedOffersTable() {
        function t() {
            e.suspendedOffers.updateTable()
        }
        function n(e, t, n) {
            var i = e.selectAll("span.item-static").data(n, function(e) {
                return e[0]
            });
            i.enter().append("span").classed("item-static", !0).each(function(e) {
                var t = d3.select(this)
                  , n = t.append("span").attr("data-item", e[0]).classed("item", !0);
                makeItem($(n.node())),
                t.append("span").classed("item-quantity-static", !0).text("×" + e[1])
            }),
            i.exit().remove()
        }
        e.root.append("h2").text("Suspended Offers");
        e.suspendedOffers = createTable(e.root, [{
            heading: "Selling",
            renderer: function(e, t) {
                n(e, t, t.selling)
            }
        }, {
            heading: "Buying",
            renderer: function(e, t) {
                n(e, t, t.buying)
            }
        }, {
            heading: ["Qty.", "Quantity"],
            renderer: function(e, t) {
                e.classed("trade-quantity", !0).text(t.quantity)
            }
        }, {
            heading: "",
            renderer: function(e, t) {
                renderMenu(e, [["Activate", "play", function() {
                    t.activate()
                }
                ], ["Remove", "remove", function() {
                    t.remove()
                }
                ]])
            }
        }], function() {
            return d.offers.suspended()
        });
        t(),
        d.offers.dispatch.on("collectionChanged.suspended", t)
    }
    function initializeSuspendedOffersButtonRow() {
        var t = e.buttonRow = e.root.append("div");
        t.classed("btn-group", !0),
        t.append("button").classed("btn btn-success", !0).html('<i class="glyphicon glyphicon-play"></i><br>Activate All').on("click", function() {
            _.each(d.offers.suspended(), function(e) {
                e.activate(!0)
            }),
            d.offers.dispatch.collectionChanged()
        }),
        t.append("button").classed("btn btn-danger", !0).html('<i class="glyphicon glyphicon-remove"></i><br>Remove All').on("click", function() {
            _.each(d.offers.suspended(), function(e) {
                e.remove(!0)
            }),
            d.offers.dispatch.collectionChanged()
        })
    }
    function initializeItemSelector() {
        var t = e.itemSelector = e.root.append("div")
          , n = $(t.node())
          , i = ["#EDC8C8", "#C8EAED", "#EDCFC8", "#C8E3ED", "#EDD6C8", "#C8DBED", "#EDDEC8", "#C8D4ED", "#EDE5C8", "#C8CDED", "#EDECC8", "#CAC8ED", "#E7EDC8", "#D2C8ED", "#E0EDC8", "#D9C8ED", "#D9EDC8", "#E0C8ED", "#D2EDC8", "#E7C8ED", "#CAEDC8", "#EDC8EC", "#C8EDCD", "#EDC8E5", "#C8EDD4", "#EDC8DE", "#C8EDDB", "#EDC8D6", "#C8EDE3", "#EDC8CF", "#C8EDEA"];
        t.attr("id", "item-selector").classed("modal fade", !0).html('<div class="modal-dialog"><div class="modal-content"><div class="modal-body"></div></div></div>');
        var a = t.select(".modal-body").selectAll("span.item-wrapper").data(tradableItems).enter().append("span").classed("item-wrapper", !0).each(function(t) {
            var a = d3.select(this);
            a.style("background-color", i[t[1] % i.length]),
            a.attr("title", items[t[0]][0]);
            var o = a.append("span").classed("item", !0).attr("data-item", t[0]);
            makeItem($(o.node())),
            a.on("click", function() {
                $(o.node()).popover("hide"),
                a.classed("disabled") || (e.itemSelector.selectCallback(t[0]),
                n.modal("hide"))
            })
        });
        e.itemSelector.selectFor = function(t, i) {
            var o = _.pluck(t.selling, 0).concat(_.pluck(t.buying, 0));
            a.classed("disabled", !1).filter(function(e) {
                return _.contains(o, e[0])
            }).classed("disabled", !0),
            e.itemSelector.selectCallback = i,
            n.modal("show")
        }
    }
    function createTable(e, t, n) {
        function i() {
            var e = c.append("tr");
            t.forEach(function(t) {
                var n = t.heading
                  , i = e.append("th");
                "string" == typeof n ? i.text(n) : i.append("abbr").attr("title", n[1]).text(n[0])
            })
        }
        function a() {
            var e = n()
              , t = l.selectAll("tr").data(e, s);
            t.enter().append("tr"),
            t.each(d),
            t.order(),
            t.exit().remove()
        }
        function o(e) {
            l.selectAll("tr").data([e], s).each(d)
        }
        function s(e) {
            return e ? e.id : -1
        }
        function d(e) {
            function n(t) {
                var n = d3.select(this);
                t.renderer(n, e)
            }
            var i = d3.select(this)
              , a = i.selectAll("td").data(t);
            a.enter().append("td"),
            a.each(n)
        }
        var r = e.append("table")
          , c = r.append("thead")
          , l = r.append("tbody");
        return r.classed("table trades", !0),
        r.updateTable = a,
        r.updateOffer = o,
        i(),
        r
    }
    function renderMenu(e, t) {
        var n = e.selectAll("div.btn-group").data([!0]);
        n.enter().append("div").classed("btn-group", !0);
        var i = n.selectAll("button").data(t);
        i.enter().append("button").classed("btn btn-default", !0).html(function(e) {
            return '<i class="glyphicon glyphicon-' + e[1] + '"></i>'
        }).attr("title", function(e) {
            return e[0]
        }).on("click", function(e) {
            d3.select(this).classed("disabled") || e[2]()
        }),
        i.classed("disabled", function(e) {
            return e.length > 3 && e[3]()
        })
    }
    function renderQuantityEditor(e, t, n, i, a) {
        var o = t + "-quantity"
          , s = o + "-edited"
          , d = e.selectAll("span." + o).data([0]).enter().append("span").classed("btn btn-default", !0).classed(o, !0).text(n()).on("click", function() {
            function e(e) {
                l.on("blur", null).on("keydown", null).on("keyup", null),
                d3.select(window).on("mousewheel.quantity-editor", null).on("DOMMouseScroll.quantity-editor", null),
                l.remove(),
                d.classed(s, !1).text(e),
                i(e)
            }
            function t() {
                var e = o()
                  , t = d3.event.wheelDelta || -1 * d3.event.detail;
                o(t > 0 ? Math.min(++e, c) : Math.max(--e, 1)),
                l.node().select(),
                d3.event.preventDefault()
            }
            function o(e) {
                return e ? void l.property("value", e) : Math.max(1, Math.min(c, parseInt(l.property("value"))))
            }
            if (d3.event.stopPropagation(),
            !d.classed(s)) {
                var r = n()
                  , c = a();
                d.classed(s, !0).text("");
                var l = d.append("input").attr("type", "text").property("value", r).on("blur", function() {
                    var t = o() || r;
                    e(t)
                }).on("keydown", function() {
                    var e = o();
                    if (e)
                        switch (d3.event.which) {
                        case 38:
                            o(Math.min(++e, c));
                            break;
                        case 40:
                            o(Math.max(--e, 1))
                        }
                }).on("keyup", function() {
                    var t = o() || r;
                    switch (d3.event.which) {
                    case 38:
                        return void l.node().select();
                    case 40:
                        return void l.node().select();
                    case 27:
                        t = r;
                        break;
                    case 13:
                        break;
                    default:
                        return
                    }
                    e(t)
                });
                d3.select(window).on("mousewheel.quantity-editor", t).on("DOMMouseScroll.quantity-editor", t),
                l.node().focus()
            }
        })
    }
    var d = {}
      , e = {};
    initializeData(),
    initializeElements()
}
