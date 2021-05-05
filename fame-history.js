(function() {
    var t, e, n, r, o, a = {}.hasOwnProperty, s = function(t, e) {
        function n() {
            this.constructor = t
        }
        for (var r in e)
            a.call(e, r) && (t[r] = e[r]);
        return n.prototype = e.prototype,
        t.prototype = new n,
        t.__super__ = e.prototype,
        t
    };
    e = function() {
        function t(t, e, n) {
            this.data = t,
            this.currentFame = e,
            this.renderFameChange(n),
            this.renderGraph(n)
        }
        return t.prototype.renderFameChange = function(t) {
            var e, n, r;
            return n = this.data[0][1],
            e = this.currentFame - n,
            r = 0 === e ? "Fame hasn't changed " : e > 0 ? "Gained <strong>" + e + "</strong> fame " : "Lost <strong>" + -e + "</strong> fame ",
            r += this.interval,
            $("#" + t + " ." + this.cssClass).prepend(r)
        }
        ,
        t.prototype.timeFormat = function() {}
        ,
        t.prototype.renderGraph = function(t) {
            return nv.addGraph(function(e) {
                return function() {
                    var n, r;
                    return e.chart = nv.models.linePlusBarChart(),
                    r = e.timeFormat(),
                    e.chart.x(function(t, e) {
                        return e
                    }),
                    e.chart.showLegend(!1),
                    e.chart.bars.dispatch.on("elementMouseover.tooltip", null),
                    e.chart.tooltipContent(function(t, e, n, r, o) {
                        var a;
                        return a = r.point.change,
                        "<strong>" + n + "</strong> " + (0 === a ? "" : 0 > a ? '(<span style="color: red">' + a + "</span>) " : '(<span style="color: green">+' + a + "</span>) ") + "fame at " + e
                    }),
                    n = e.datum(),
                    e.chart.xAxis.axisLabel("Time").tickFormat(function(t) {
                        return r(new Date(n[0].values[t].x))
                    }),
                    d3.select("#" + t + " ." + e.cssClass + " svg").datum(n).transition().duration(500).call(e.chart),
                    e.chart
                }
            }(this))
        }
        ,
        t.prototype.datum = function() {
            var t, e;
            return t = this.absoluteFame(),
            e = this.changes(t),
            [{
                values: t,
                key: "Fame",
                color: "#0088cc"
            }, {
                values: e,
                key: "Change",
                bar: !0
            }]
        }
        ,
        t.prototype.absoluteFame = function() {
            var t, e, n, r, o, a, s, i;
            if (0 === this.data.length)
                return [];
            for (n = t = e = null,
            r = this.lastTime(),
            s = function(t) {
                return new Date(r - 1e3 * t)
            }
            ,
            o = function(r) {
                return function() {
                    var o;
                    return null === n || r.data.length > 0 && e - r.stepInterval === r.data[0][0] ? (o = r.data.shift(),
                    e = o[0],
                    t = o[1],
                    n = s(e)) : (e -= r.stepInterval,
                    n = s(e))
                }
            }(this),
            i = []; r > n; )
                a = null === t ? this.data[0][1] : t,
                o(),
                i.push({
                    x: n,
                    y: t,
                    change: t - a
                });
            return i
        }
        ,
        t.prototype.changes = function(t) {
            var e, n, r, o, a, s, i;
            if (0 === t.length)
                return [];
            for (o = t[0].y,
            i = [],
            n = a = 0,
            s = t.length; s > a; n = ++a)
                r = t[n],
                e = r.y - o,
                o = r.y,
                i.push({
                    x: r.x,
                    y: Math.abs(e),
                    color: 0 > e ? "red" : "green"
                });
            return i
        }
        ,
        t
    }(),
    n = function(t) {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return s(e, t),
        e.prototype.cssClass = "past-day",
        e.prototype.interval = "in the past 24 hours",
        e.prototype.stepInterval = 600,
        e.prototype.timeFormat = function() {
            return d3.time.format("%H:%M")
        }
        ,
        e.prototype.lastTime = function() {
            return new Date(6e5 * (Math.floor(((new Date).getTime() - 1) / 6e5) + 1))
        }
        ,
        e
    }(e),
    r = function(t) {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return s(e, t),
        e.prototype.cssClass = "past-week",
        e.prototype.interval = "in the past 7 days",
        e.prototype.stepInterval = 3600,
        e.prototype.timeFormat = function() {
            return d3.time.format("%a %Hh")
        }
        ,
        e.prototype.lastTime = function() {
            return new Date(36e5 * (Math.floor(((new Date).getTime() - 1) / 36e5) + 1))
        }
        ,
        e
    }(e),
    t = function(t) {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return s(e, t),
        e.prototype.cssClass = "all-time",
        e.prototype.interval = "since Feb 20, 2013",
        e.prototype.stepInterval = 86400,
        e.prototype.timeFormat = function() {
            return d3.time.format("%b %d")
        }
        ,
        e.prototype.lastTime = function() {
            return new Date(864e5 * (Math.floor(((new Date).getTime() - 1) / 864e5) + 1))
        }
        ,
        e
    }(e),
    o = function(t, e, n) {
        var r, o, a, s, i, u, p;
        if (!(e.length < 2)) {
            for (i = null,
            s = function(t) {
                return Math.floor((t[0] - 1) / n)
            }
            ,
            o = function(t) {
                return t[0] % n
            }
            ,
            a = u = 1,
            p = e.length - 1; p >= 1 ? p >= u : u >= p; a = p >= 1 ? ++u : --u)
                r = e[a],
                null !== i && s(i) !== s(r) && t.push([(s(i) + 1) * n, i[1]]),
                i = r;
            return t.push([(s(i) + 1) * n, i[1]])
        }
    }
    ,
    window.initializeGraphs = function(e, a, s, i) {
        var u;
        return nv.dev = !1,
        0 === e.length ? void $("#" + i).html("<h4>No data available</h4>") : (u = e[e.length - 1][1],
        new n(e,u,i),
        0 !== a.length && (o(a, e, 3600),
        new r(a,u,i),
        0 !== s.length) ? (o(s, a, 86400),
        new t(s,u,i)) : void 0)
    }
}
).call(this);
