function renderDeadCharacterPopover(e, t) {
	$("#" + e + " .character")
		.each(function () {
			function e(e) {
				var t = ['<table class="character-dyes">'];
				return $.each(e, function (e, a) {
					"0" != a && items[a] && (t.push('<tr><td><span class="item" data-item="'), t.push(a), t.push('"></span></td><td>'), t.push(items[a][0]), t.push("</td></tr>"))
				}), t.push("</table>"), t = $(t.join("")), makeItemsIn(t), t
			}
			var t = $(this),
				a = classInfoById[parseInt(t.data("class"))],
				s = parseInt(t.data("skin")),
				r = _.detect(a[6], function (e) {
					return e[0] == s
				});
			t.popover({
				html: !0,
				content: e([t.data("accessory-dye-id"), t.data("clothing-dye-id")]),
				placement: "top",
				trigger: "manual",
				title: a[1] + " - " + r[1]
			}), t.hover(function () {
				t.popover("show")
			}, function () {
				t.popover("hide")
			})
		})
}

function renderDeadCharacterStats(e, t) {
	function a(e, t) {
		var a = [0, 1, 2, 3, 4, 6, 7, 5],
			s = classInfoById[e][5],
			r = $.map(a, function (e) {
				return s[e]
			});
		if(t > 1600861500) return r;
		switch (e) {
		case 799:
			r[2] = 50, r[5] = 40, r[7] = 45;
			break;
		case 801:
			r[5] = 30;
			break;
		case 803:
			r[2] = 60, r[7] = 55
		}
		if(t > 1552389890) return r;
		switch (e) {
		case 785:
			r[3] = 25, r[4] = 50, r[5] = 40;
			break;
		case 806:
			r[5] = 40
		}
		if(t > 1497966263) return r;
		if(805 === e && (r[2] = 60), t > 1481905199) return r;
		if(801 === e && (r[2] = 60), t > 1413512071) return r;
		switch (e) {
		case 784:
			r[4] = 50, r[7] = 50;
			break;
		case 799:
			r[3] = 25, r[4] = 50, r[7] = 50;
			break;
		case 803:
			r[7] = 50
		}
		if(t > 1339533420) return r;
		switch (e) {
		case 768:
			r[5] = 75;
			break;
		case 775:
			r[5] = 75;
			break;
		case 782:
			r[5] = 75, r[6] = 75;
			break;
		case 784:
			r[5] = 75;
			break;
		case 799:
			r[5] = 75, r[6] = 50;
			break;
		case 800:
			r[5] = 75, r[4] = 50;
			break;
		case 802:
			r[5] = 75;
			break;
		case 803:
			r[5] = 75;
			break;
		case 801:
			r[5] = 50;
			break;
		case 804:
			r[5] = 75, r[2] = 65, r[4] = 70, r[7] = 70
		}
		if(t > 1301377140) return r;
		switch (e) {
		case 798:
			r[3] = 50;
			break;
		case 800:
			r[2] = 50, r[7] = 50;
			break;
		case 801:
			r[2] = 75, r[7] = 75
		}
		return r
	}

	function s(e) {
		return 1322439660 > e ? 6 : 1329172860 > e ? 7 : 8
	}

	function r(e, t, a, s) {
		function r(a, s) {
			var r = !0;
			d.push("<tr>");
			for(var c = a; s >= c; ++c) o(h[c], t[c], e[c]), r &= !u(h[c]) || t[c];
			p(a, s), d.push("</tr>"), r || n(a, s)
		}

		function n(s, r) {
			d.push("<tr>");
			for(var n = s; r >= n; ++n) c(h[n], t[n], e[n], a[n]);
			p(s, r), d.push("</tr>")
		}

		function o(e, t, a) {
			d.push("<td"), t && u(e) && d.push(' class="maxed"'), d.push(">"), d.push(e), d.push(": "), d.push(a), d.push("</td>")
		}

		function c(e, t, a, s) {
			d.push('<td class="to-max">'), !t && u(e) && (d.push(s - a), ("HP" == e || "MP" == e) && (d.push(" ("), d.push(Math.ceil((s - a) / 5)), d.push(")")), d.push(" to max")), d.push("</td>")
		}

		function p(e, t) {
			for(i = 0; i < 3 - (t - e + 1); ++i) d.push("<td></td>")
		}

		function u(e) {
			switch (s) {
			case 8:
				return !0;
			case 7:
				return "MP" != e;
			case 6:
				return "MP" != e && "HP" != e
			}
		}
		var h = ["HP", "MP", "ATT", "DEF", "SPD", "VIT", "WIS", "DEX"],
			d = ['<table class="stats-table">'];
		return r(0, 1), r(2, 4), r(5, 7), d.push("</table>"), d.join("")
	}
	$("#" + e + " td:nth-child(" + t + ") span")
		.each(function () {
			var e = $(this),
				t = e.data("stats"),
				n = new Date(e.data("died-on"))
				.getTime() / 1e3,
				o = a(e.data("class"), n),
				c = [!1, !1, !1, !1, !1, !1, !1],
				i = 0,
				p = s(n);
			$.each(o, function (e, a) {
					i += (c[e] = a == t[e]) ? 1 : 0
				}), e.html(i + "/" + p + '<i class="glyphicon glyphicon-info-sign"></i>'), e.popover({
					html: !0,
					content: r(t, c, o, p),
					title: "Base stats",
					trigger: "manual",
					template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
				}), e.parent()
				.hover(function () {
					e.popover("show")
				}, function () {
					e.popover("hide")
				})
		})
}

function renderFameBonusesPopover(e, t) {
	function a(e) {
		var t = ['<table class="stats-table bonus-table"><thead><tr><th>Bonus</th><th>Fame</th></tr></thead><tbody>'],
			a = 0,
			r = 0;
		return $.each(s, function (s, n) {
			e[s] && (a++, r += e[s], t.push("<tr><td>"), t.push(n), t.push("</td><td>"), t.push(e[s]), t.push("</td></tr>"))
		}), 0 == a ? "No bonuses" : (a > 1 && (t.push('<tr class="total"><td>Sum</td><td>'), t.push(r), t.push("</td>")), t.push("</tbody></table>"), t.join(""))
	}
	var s = ["Accurate", "Ancestor", "Boots on the Ground", "Cartographer", "Friend of the Cubes", "Doer of Deeds", "Explorer", "First Born", "Enemy of the Gods", "Slayer of the Gods", "Leader of Men", "Legacy Builder", "Mundane", "Oryx Slayer", "Pacifist", "Sharpshooter", "Sniper", "Team Player", "Thirsty", "Tunnel Rat", "Well Equipped"];
	$("#" + e + " td:nth-child(" + t + ") span")
		.each(function () {
			var e = $(this);
			e.append('<i class="glyphicon glyphicon-info-sign"></i>'), e.popover({
					html: !0,
					content: a(e.data("bonuses")),
					title: "Bonuses",
					trigger: "manual",
					template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
				}), e.parent()
				.hover(function () {
					e.popover("show")
				}, function () {
					e.popover("hide")
				})
		})
}