function statsTable(t, e, n, a, i) {
	function o(a, i) {
		var o = !0;
		f.push("<tr>");
		for(var l = a; i >= l; ++l) c(p[l], n[l], t[l], e[l]), o &= n[l];
		d(a, i), f.push("</tr>"), o || (r(a, i), s(a, i))
	}

	function r(a, o) {
		f.push("<tr>");
		for(var r = a; o >= r; ++r) l(n[r], t[r], e[r], i[r]);
		d(a, o), f.push("</tr>")
	}

	function s(i, o) {
		f.push("<tr>");
		for(var r = i; o >= r; ++r) u(p[r], n[r], t[r], e[r], a[r]);
		d(i, o), f.push("</tr>")
	}

	function c(t, e, n, a) {
		f.push("<td"), e && f.push(' class="maxed"'), f.push(">"), f.push(t), f.push(": "), f.push(n), 0 !== a && (f.push("("), a > 0 && f.push("+"), f.push(a), f.push(")")), f.push("</td>")
	}

	function l(t, e, n, a) {
		var i = e - n - a;
		f.push('<td class="from-avg' + (0 > i ? " below-avg" : " above-avg") + '">'), t || (0 == i ? f.push("average") : (i > 0 && f.push("+"), f.push(i), f.push(" from avg"))), f.push("</td>")
	}

	function u(t, e, n, a, i) {
		f.push('<td class="to-max">'), e || (f.push(i - n + a), ("HP" == t || "MP" == t) && (f.push(" ("), f.push(Math.ceil((i - n + a) / 5)), f.push(")")), f.push(" to max")), f.push("</td>")
	}

	function d(t, e) {
		for(var n = 0; 3 - (e - t + 1) > n; ++n) f.push("<td></td>")
	}
	var f = ['<table class="stats-table">'],
		p = ["HP", "MP", "ATT", "DEF", "SPD", "VIT", "WIS", "DEX"];
	return o(0, 1), f.push("</table>"), f.join("")
}

function renderStats(t) {
	$("#" + t + " .player-stats")
		.each(function () {
			var t = $(this),
				e = [0, 1, 2, 3, 4, 6, 7, 5],
				n = JSON.parse(t.attr("data-stats")),
				a = JSON.parse(t.attr("data-bonuses")),
				i = JSON.parse(t.attr("data-class")),
				o = JSON.parse(t.attr("data-level")),
				r = classInfoById[i],
				s = r[5],
				c = $.map(e, function (t) {
					return s[t]
				}),
				l = [!1, !1, !1, !1, !1, !1, !1, !1],
				u = 0,
				d = r[4],
				f = r[3],
				p = $.map(d, function (t, e) {
					return f[e] + t * (o - 1)
				}),
				p = $.map(e, function (t) {
					return p[t]
				});
			$.each(c, function (t, e) {
					var i = n[t] - a[t];
					i >= e && (n[t] = e + a[t], l[t] = !0, u += 1)
				}), u = "?", t.html(u + '/8 <i class="glyphicon glyphicon-info-sign"></i>'), t.popover({
					html: !0,
					content: statsTable(n, a, l, c, p),
					trigger: "manual",
					template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>'
				}), t.parent()
				.hover(function () {
					t.popover("show")
				}, function () {
					t.popover("hide")
				})
		})
}

function alternativesTable(t) {
	var e = '<table class="alternatives-table"><thead><tr><th>Server</th><th>Price</th><th>Quantity</th><th>Time Left</th></tr></thead><tbody>';
	return $.each(t, function (t, n) {
		e += "<tr>", $.each(n, function (t, n) {
			e += "<td>", 3 == t ? 2147483647 != n ? (e += "<", e += n + 1, e += " min") : e += "new" : e += n, e += "</td>"
		}), e += "</tr>"
	}), e += "</tbody></table>"
}

function renderAlternatives(t, e) {
	$("#" + t + " .cheapest-server")
		.each(function () {
			var t = $(this),
				e = JSON.parse(t.attr("data-alternatives"));
			e.length > 0 && (t.append(' <i class="glyphicon glyphicon-info-sign"></i>'), t.popover({
					html: !0,
					content: alternativesTable(e),
					trigger: "manual",
					title: "Other servers",
					placement: "left"
				}), t.parent()
				.hover(function () {
					t.popover("show")
				}, function () {
					t.popover("hide")
				}))
		})
}

function linkForItem(t) {
	var e = items[t] || items[-1];
	return 0 != e[1] && 10 != e[1] && 26 != e[1] || 3180 == t ? "/wiki/" + e[0].toLowerCase()
		.replace(/[\'\ ]/g, "-")
		.replace(/[^a-z0-9-]/g, "") : null
}

function renderItems(t) {
	makeItemsIn($("#" + t))
		.each(function () {
			$(this)
				.wrap(function () {
					var t = linkForItem($(this)
						.attr("data-item"));
					return null == t ? !1 : '<a href="' + t + '" target="_blank"/>'
				})
		})
}

function makeItemsIn(t) {
	return $(".item", t)
		.each(function () {
			makeItem($(this))
		})
}

function renderItemTable(t) {
	return ['<table class="stats-table"><tbody><tr><td>Fame Bonus:</td><td>', t[5], "%</td></tr><tr><td>Feed Power:</td><td>", t[6], "</td></tr></tbody></table>"].join("")
}

function makeItem(t) {
	var e = items[t.attr("data-item")] || items[-1],
		n = 10 == e[1] || 0 == e[1] || 26 == e[1] ? "" : -1 == e[2] ? " UT" : " T" + e[2];
	e[7] && t.prepend('<span class="token-amount">' + e[7] + "</span>"), t.css("background-position", "-" + e[3] + "px -" + e[4] + "px")
		.popover({
			title: e[0] + n,
			trigger: "hover",
			container: "body",
			placement: function (t, e) {
				var n = $(e)
					.offset()
					.top - $(window)
					.scrollTop();
				return 110 > n ? "bottom" : "top"
			},
			html: !0,
			content: renderItemTable(e)
		})
}

function renderPets(t) {
	$("#" + t + " .pet")
		.each(function () {
			var t = $(this),
				e = items[t.attr("data-item")];
			e && t.css("background-position", "-" + e[1] + "px -" + e[2] + "px")
				.attr("title", e[0])
		})
}

function renderArticle(t, e) {
	renderItems(t), $("#" + t + " td:nth-child(" + e + ") .item")
		.each(function () {
			var t = $(this),
				e = items[t.attr("data-item")] || items[-1],
				n = t.closest("td")
				.next();
			n.text(e[0])
		})
}

function renderNumeric(t, e, n) {
	var a = $("#" + t + " td:nth-child(" + e + ")"),
		i = a.map(function () {
			for(var t = $(this); t.children()
				.length;) t = $(t.children()[0]);
			return t
		});
	i.text(function (t, e) {
		return $(this)
			.closest("td")
			.data("value", e), formatNumber(e)
	}), n || a.hover(function () {
		showDiffs($(this))
	}, function () {
		hideDiffs($(this))
	})
}

function showDiffs(t) {
	var e = t.data("value");
	siblingsDo(t, 25, function (t, n) {
		if("" != n) {
			var a = n - e,
				i = '<span class="diff"><span';
			0 > a ? i += ' class="diff-smaller">-' : a > 0 && (i += ' class="diff-bigger">+'), a % 1 != 0 && (a = a.toFixed(1)), i += formatNumber(Math.abs(a)), i += "</span>", this.append(i)
		}
	})
}

function hideDiffs(t) {
	siblingsDo(t, 25, function () {
		$(".diff", this)
			.remove()
	})
}

function siblingsDo(t, e, n) {
	siblingsSelectedDo(t, e, function (t) {
		return t.prev()
	}, n), siblingsSelectedDo(t, e, function (t) {
		return t.next()
	}, n)
}

function siblingsSelectedDo(t, e, n, a) {
	for(var i = t.parent(), o = t.index(), r = 0; e > r && (i = n(i), i.length); ++r) {
		var s = i.find("td:nth-child(" + (o + 1) + ")"),
			c = s.data("value");
		a.call(s, r + 1, c)
	}
}

function formatNumber(t) {
	var e = /(\d+)(\d{3})/;
	for(t += ""; e.test(t);) t = t.replace(e, "$1â€‰$2");
	return t
}

function formatTimeLeft(t, e) {
	$("#" + t + " td:nth-child(" + e + ")")
		.text(function (t, e) {
			var n = parseInt(e);
			return 2147483647 == n ? "new" : 0 == n ? "<1 minute" : "<" + (n + 1) + " minutes"
		})
}

function makeSortable(t, e) {
	$("#" + t)
		.tablesorter({
			headers: e
		})
}

function bookmarkPlayer(t) {
	bookmarkName(t, "players")
}

function bookmarkGuild(t) {
	bookmarkName(t, "guilds")
}

function bookmarkName(t, e) {
	if(storage) {
		var n = storage[e];
		n = n ? JSON.parse(n) : [];
		var a = $.inArray(t, n); - 1 != a && n.splice(a, 1), n.unshift(t), n.splice(200, n.length - 200), storage[e] = JSON.stringify(n)
	}
}

function colorForRank(t) {
	var e;
	return $.each(window.rankBoundaries, function (n, a) {
		return a >= t ? (e = window.rankColors[n], !1) : void 0
	}), e || window.rankColors[window.rankColors.length - 1]
}

function renderDonationPopover(t, e) {
	function n(t) {
		i += '<span class="timeago" title="' + e[t] + '"></span>'
	}
	var a, i, o = $("#" + t + " img"),
		r = o.parent()
		.prev()
		.text(),
		s = o.attr("src"),
		c = s.slice(0, -1 * "crown-place.png".length) + "crown.png";
	if(e.length) {
		a = "Thanks " + r + "!", i = "<span>" + r + " donated ", n(0);
		for(var l = 1; l < e.length - 1; ++l) i += ", ", n(l);
		e.length > 1 && (i += " and ", n(e.length - 1)), i += "</span>", i = $(i), $(".timeago", i)
			.timeago()
	} else a = r + " hasn't donated yet.", i = "Click on the crown to donate", o.hover(function () {
		$(this)
			.attr("src", c)
	}, function () {
		$(this)
			.attr("src", s)
	});
	o.popover({
		html: !0,
		title: a,
		content: i,
		trigger: "hover"
	})
}

function addSearch(t, e, n) {
	var a, i = $("#" + t);
	storage && (a = storage[n], a && (a = JSON.parse(storage[n]))), i.typeahead({
			highlight: !0
		}, {
			displayKey: function (t) {
				return t
			},
			source: function (t, e) {
				e(typeaheadFilter(t, a))
			}
		})
		.on("typeahead:selected", function (t, n) {
			window.location.pathname = e + "/" + encodeURIComponent(n)
		})
		.keypress(function (t) {
			13 == t.which && (window.location.pathname = e + "/" + encodeURIComponent($(i)
				.val()))
		})
}

function addPlayerSearch(t) {
	addSearch(t, "/player", "players")
}

function addGuildSearch(t) {
	addSearch(t, "/guild", "guilds")
}

function initializeSearch(t, e) {
	function n(t) {
		window.location.pathname = "/" + ("Player" == l ? "player" : "guild") + "/" + encodeURIComponent(t)
	}
	var a = $("#" + e),
		i = $("#" + t),
		o = ($(".player-guild-toggle-panel", i), $("input[type=text]", i)),
		r = $("label", i),
		s = ($(".btn-group", i), $(".auth-panel")),
		c = !0,
		l = "Player",
		u = {
			Player: [],
			Guild: []
		};
	storage && (u.Player = JSON.parse(storage.players || "[]"), u.Guild = JSON.parse(storage.guilds || "[]")), a.click(function () {
			s.animate({
				opacity: 0
			}, "fast", null, function () {
				s.hide()
			}), a.animate({
				opacity: 0
			}, "fast", null, function () {
				a.hide(), i.show(), i.animate({
					opacity: 1
				}, "fast"), o.focus()
			}), o.attr("placeholder", l + " search"), c = !0
		}), o.focus(function () {
			c = !0, o.attr("placeholder", l + " search")
		})
		.blur(function () {
			c && i.animate({
				opacity: 0
			}, "fast", null, function () {
				i.hide(), a.show(), a.animate({
					opacity: 1
				}, "fast"), s.show(), s.animate({
					opacity: 1
				}, "fast")
			})
		})
		.typeahead({
			highlight: !0
		}, {
			displayKey: function (t) {
				return t
			},
			source: function (t, e) {
				e(typeaheadFilter(t, u[l]))
			}
		})
		.on("typeahead:selected", function (t, e) {
			return n(e), !0
		})
		.keypress(function (t) {
			13 == t.which && (window.location.pathname = "/" + l.toLowerCase() + "/" + encodeURIComponent(o.val()))
		}), r.mousedown(function () {
			c = !1
		})
		.click(function () {
			l = $(this)
				.text(), o.trigger("focus")
		})
		.button()
}

function typeaheadFilter(t, e, n) {
	n = n || 9;
	var a = [],
		i = filterQuery(t),
		o = i.toLowerCase();
	e && $.each(e, function (t, e) {
		var t = e.toLowerCase()
			.indexOf(o); - 1 != t && (a[t] ? a[t].push(e) : a[t] = [e])
	});
	var r = [i];
	return $.each(a, function (t, e) {
		e && (r.length > n || (e.sort(), $.each(e, function (t, e) {
			r.length > n || r.push(e)
		})))
	}), r
}

function filterQuery(t) {
	return t.replace(/^\s+|\s+$/g, "")
		.replace(/ +/g, " ")
}

function indicateSelectedItem() {
	$(window.location.hash)
		.parent()
		.css("border-left", "3px solid #777")
}

function makeChooserRedirector(t, e) {
	$("#" + t)
		.change(function () {
			window.location.pathname = e + $(this)
				.val()
		})
}

function addAnchorsInDescription(t, e) {
	var n = new RegExp("(https?:\\/\\/)?(www\\.)?(youtube\\.com|youtu\\.be|imgur\\.com|i\\.imgur\\.com|puu\\.sh|twitch\\.tv|reddit\\.com|redd\\.it|github\\.com|community\\.kabam\\.com|realmeye\\.com|bluenosersguide\\.weebly\\.com|pfiffel\\.com|kitsu\\.io)(\\/[\\w\\/\\.\\?=&;_-]+)?" + (e ? "|" + e : ""), "gi"),
		a = $("#" + t);
	$(".description-line", a)
		.each(function () {
			$(this)
				.html($(this)
					.html()
					.replace(n, function (t) {
						var e = t;
						/^https?:\/\//.test(t) || (e = "http://" + t);
						var n = /realmeye\.com/.test(t) ? ' rel="nofollow"' : ' rel="nofollow external"';
						return '<a href="' + encodeURI(e) + '"' + n + ">" + t + "</a>"
					}))
		})
}

function renderMail(t) {
	$("#" + t)
		.attr("href", $.map([109, 97, 105, 108, 116, 111, 58, 105, 110, 102, 111, 64, 114, 101, 97, 108, 109, 101, 121, 101, 46, 99, 111, 109], function (t) {
				return String.fromCharCode(t)
			})
			.join(""))
}

function initializeLoginButton(t) {
	$("#" + t)
		.click(function () {
			$(this)
				.button("loading")
		})
}

function initializeLogin(t, e) {
	var n = $("#" + t),
		a = $("button", n),
		i = !1,
		o = $("form", n);
	a.click(function () {
			o.trigger("submit")
		}), $("input")
		.keypress(function (t) {
			13 == t.which && (t.preventDefault(), o.trigger("submit"))
		}), o.submit(function (t) {
			if(a.button("loading"), i) return !0;
			var n = $(":input[name=username]", o)
				.val(),
				r = $(":input[name=password]", o)
				.val(),
				s = $(":input[name=bindToIp]", o)
				.is(":checked") ? "t" : "f";
			return n && r ? (callSpec(e, {
					username: n,
					password: r,
					bindToIp: s
				})
				.done(function (t, e, n) {
					"OK" == t ? (i = !0, o.submit()) : (a.button("reset"), $("#wrong-password .alert-danger")
						.text("Invalid username or password!"), $("#wrong-password")
						.removeClass("hide"))
				})
				.fail(function () {
					a.button("reset"), $("#wrong-password .alert-danger")
						.text("An error occured. Please try again!"), $("#wrong-password")
						.removeClass("hide")
				}), void t.preventDefault()) : (a.button("reset"), !1)
		})
}

function initializeLogout(t) {
	$("#" + t)
		.click(function (t) {
			var e = window.location.pathname;
			$.ajax({
					type: "POST",
					url: "/logout"
				})
				.done(function (t) {
					var n = e.indexOf("#"); - 1 != n && (e = e.slice(0, n)), window.location.href = e
				})
		})
}

function initializeEditDescription(t, e) {
	var n = $("#" + t + " > button"),
		a = $("#" + t + " .modal");
	n.click(function () {
			a.modal("show")
		}), $("button", a)
		.click(function () {
			var t = {};
			$.each(["line1", "line2", "line3"], function () {
				t[this] = $("input[name=" + this + "]", a)
					.val()
			}), callSpecAndReload(e, t)
		})
}

function initializeClickHandlerWithAction(t, e) {
	$("#" + t)
		.click(function () {
			callSpecAndReload(e)
		})
}

function petAbilityTable(t, e, n, a, i) {
	function o(t, e) {
		r.push("<tr><td>"), r.push(t), r.push("</td><td>"), r.push(formatNumber(e)), r.push("</td></tr>")
	}
	var r = ['<table class="stats-table pet-ability-stats-table">'];
	return o("Level:", t), o("Points:", n), t != e && (o('<abbr title="Feed power needed for Next Level">Next</abbr>:', a + " fp"), o('<abbr title="Feed power needed for Max Level(' + e + ')">Max</abbr>:', i + " fp")), r.push("</table>"), r.join("")
}

function renderPetAbilityPopover(t, e, n) {
	$("#" + t + " td:nth-child(" + e + ") .pet-ability")
		.each(function () {
			var t = $(this),
				e = t.data("pet-ability");
			t.html(e[1] + ' <i class="glyphicon glyphicon-info-sign"></i>'), t.popover({
				title: e[0],
				html: !0,
				content: petAbilityTable(e[1], e[2], e[3], e[4], e[5]),
				trigger: "click"
			})
		})
}

function completeData(t) {
	var e = document.cookie.match(/session=([0-9a-zA-Z]+)/);
	return e && e[1] && (t.session = e[1]), t
}

function callSpec(t, e) {
	return $.extend(t.data, e), completeData(t.data), $.ajax(t)
}

function callSpecAndReload(t, e, n) {
	var a = window.location.href;
	callSpec(t, e)
		.done(function (t) {
			if(!n || n(t)) {
				var e = a.indexOf("#"); - 1 != e && (a = a.slice(0, e)), window.location.href = a
			}
		})
}

function initializeCookieConsentBanner(t) {
	$("#" + t + " .btn-primary")
		.click(function () {
			var e = new Date;
			e.setYear(e.getFullYear() + 1), document.cookie = "gdprCookiePolicyAccepted=true;path=/;expires=" + e.toUTCString(), /gdprCookiePolicyAccepted=true/.test(document.cookie) || (alert("Your browser does not allow us to store this data for a longer time in a cookie. Your choice will only be in effect during this browsing session."), document.cookie = "gdprCookiePolicyAccepted=true;path=/"), $("#" + t)
				.remove()
		})
}

function convertToLocalTime(t) {
	t.text(function (t, e) {
		if(!e) return "";
		var n = new Date(e);
		return [n.getFullYear(), "-", padWithZeros(n.getMonth() + 1, 2), "-", padWithZeros(n.getDate(), 2), " ", padWithZeros(n.getHours(), 2), ":", padWithZeros(n.getMinutes(), 2)].join("")
	})
}

function convertElementByIdToLocalTime(t) {
	convertToLocalTime($("#" + t))
}

function convertColumnToLocalTime(t, e) {
	convertToLocalTime($("#" + t + " td:nth-child(" + e + ")"))
}

function padWithZeros(t, e) {
	return t += "", t.length >= e ? t : new Array(e - t.length + 1)
		.join("0") + t
}

function initializeAlertCloseButton(t, e) {
	$("#" + t)
		.click(function () {
			document.cookie = "closedAlertVersion=" + e + ";path=/;expires=Wed, 01 Jan 2037 00:00:00 GMT; Secure; SameSite=Strict"
		})
}
$.fn.blindLeftIn = function (t, e, n) {
	return this.animate({
		marginLeft: 0
	}, $.speed(t, e, n))
}, $.fn.blindLeftOut = function (t, e, n) {
	return this.animate({
		marginLeft: -this.outerWidth()
	}, $.speed(t, e, n))
}, window.storage = !1;
var fail, uid;
try {
	uid = new Date, (window.storage = window.localStorage)
		.setItem(uid, uid), fail = storage.getItem(uid) != uid, storage.removeItem(uid), fail && (window.storage = !1)
} catch (e) {}
window.console || (window.console = {
	log: function () {}
}), $.timeago.settings.allowFuture = !0, window.classInfoById = {};
for(var i = 0; i < classInfos.length; ++i) classInfoById[classInfos[i][0]] = classInfos[i];
window.rankBoundaries = [];
for(var n = window.classInfos.length, i = n - 1; 5 * n >= i; i += n) window.rankBoundaries.push(i);
window.rankBoundaries.push(5 * window.classInfos.length), window.rankColors = ["light-blue", "blue", "red", "orange", "yellow", "white"], $.tablesorter.addParser({
	id: "guildRank",
	is: function (t) {
		return !1
	},
	format: function (t) {
		switch (t) {
		case "Founder":
			return 5;
		case "Leader":
			return 4;
		case "Officer":
			return 3;
		case "Member":
			return 2;
		case "Initiate":
			return 1;
		default:
			return 0
		}
	},
	type: "numeric"
}), $.tablesorter.addParser({
	id: "petRarity",
	is: function (t) {
		return !1
	},
	format: function (t) {
		switch (t) {
		case "Divine":
			return 5;
		case "Legendary":
			return 4;
		case "Rare":
			return 3;
		case "Uncommon":
			return 2;
		case "Common":
			return 1;
		default:
			return 0
		}
	},
	type: "numeric"
}), $.tablesorter.addParser({
	id: "accountCreated",
	is: function (t) {
		return !1
	},
	format: function (t, e, n) {
		return $("span", n)
			.data("rank")
	},
	type: "numeric"
}), $.tablesorter.addParser({
	id: "guildStarDistribution",
	is: function (t) {
		return !1
	},
	format: function (t, e, n) {
		return $(".guild-star-distribution", n)
			.data("sorter")
	},
	type: "numeric"
}), $(function () {
	function t() {
		$(".table-responsive")
			.each(function () {
				var t = !!$(".scroll-alert", this)
					.length;
				this.scrollWidth > this.clientWidth ? t || $("table", this)
					.before('<small style="margin-left: 4px" class="label label-default scroll-alert">Scroll the table horizontally to see all columns!</small>') : t && $(".scroll-alert", this)
					.remove()
			})
	}
	$("span.numeric")
		.text(function (t, e) {
			return formatNumber(e)
		}), $("span.timeago")
		.timeago(), $("ul.dropdown-menu [data-toggle=dropdown]")
		.on("click", function (t) {
			t.preventDefault(), t.stopPropagation(), $("ul.dropdown-menu [data-toggle=dropdown]")
				.parent()
				.removeClass("open"), $(this)
				.parent()
				.addClass("open")
		}), $(window)
		.on("resize", t), t()
}), window.RealmEye = {
	converter: function () {
		return this.converterObject || (this.converterObject = new Showdown.converter)
	},
	sanitizer: function () {
		return this.sanitizerObject || (this.sanitizerObject = new Sanitize(Sanitize.Config.RELAXED))
	},
	sanitize: function (t, e) {
		var n = this.converter()
			.makeHtml(e || t.text()),
			a = $("<div>" + n + "</div>"),
			i = this.sanitizer()
			.clean_node(a[0]);
		t.empty()
			.append(i)
	},
	initializeEditor: function (t, e, n, a, i, o) {
		function r() {
			n.is(":checked") ? (a.addClass("markdown"), RealmEye.sanitize(a, t.val())) : (a.removeClass("markdown"), a.text(t.val()))
		}
		t.data("ajaxSpec") !== i && (t.data("ajaxSpec", i), t.off(), e.off(), n.off(), i.data.body && t.val(i.data.body), n.prop("checked", "t" == i.data.markdown), n.change(r), t.on("input propertychange", r), e.click(function () {
			e.attr("disabled", "disabled")
				.addClass("disabled")
				.off();
			var a = {
				body: t.val(),
				markdown: n.is(":checked") ? "t" : "f"
			};
			o && o(a), callSpecAndReload(i, a)
		}), r())
	}
};