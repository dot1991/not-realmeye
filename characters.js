function drawCharacters() {
	function t() {
		function t(t) {
			function a(t, a, r) {
				t.drawImage(
					e,
					u,
					l + a * c,
					c,
					c,
					r * c,
					0,
					c,
					c)
			}

			function r(e, r) {
				b2ctx.globalCompositeOperation = "source-over",
					b1ctx.clearRect(0, 0, c, c),
					b2ctx.clearRect(0, 0, c, c),
					a(b2ctx, r, 0), o(e),
					b2ctx.globalCompositeOperation = "source-in",
					b2ctx.fillRect(0, 0, c, c),
					a(b1ctx, r + 1, 0),
					b1ctx.drawImage(buffer2, 0, 0, c, c, 0, 0, c, c),
					ctx.drawImage(buffer1, 0, 0, c, c, t.offset * c, 0, c, c)
			}

			function o(t) {
				if(!n[t]) {
					16777216 > t && (t <<= 20);
					var a = t >> 24,
						r = 16777215 & t;
					1 === a ? n[t] = "#" + ("00000" + r.toString(16))
						.slice(-6) : (i = i || document.createElement("canvas"), d = d || i.getContext("2d"), i.width = i.height = a, d.clearRect(0, 0, a, a), d.drawImage(e, r * a, sheetOffsets[a], a, a, 0, 0, a, a), n[t] = d.createPattern(i, "repeat"), n[t].setTransform(new DOMMatrix([1, 0, 0, 1, 5, 5])))
				}
				b2ctx.fillStyle = n[t]
			}
			if(t.data["class"]) {
				var i, d, f = classInfoById[t.data["class"]],
					h = _.detect(f[6], function (e) {
						return e[0] == t.data.skin
					}) || f[6][0],
					u = h[2] % s * c,
					l = 6 * Math.floor(h[2] / s) * c;
				a(ctx, 0, t.offset), t.data.dye1 && r(t.data.dye1, 1), t.data.dye2 && r(t.data.dye2, 3)
			}
		}
		var a = 0,
			c = 50,
			s = Math.floor(655.34);
			r = {}, n = {},
		characters = document.createElement("canvas"), ctx = characters.getContext("2d"), buffer1 = document.createElement("canvas"), b1ctx = buffer1.getContext("2d"), buffer2 = document.createElement("canvas"), b2ctx = buffer2.getContext("2d"), $(".character")
			.each(function () {
				var t = $(this)
					.data(),
					e = _.map(["class", "skin", "dye1", "dye2"], function (e) {
						return t[e]
					})
					.join(".");
				r[e] ? r[e].elements.push(this) : (r[e] = {
					data: t,
					offset: a,
					elements: [this]
				}, a++)
			}), characters.height = buffer1.height = buffer1.width = buffer2.height = buffer1.width = c, characters.width = c * a, _.each(r, function (e) {
				t(e)
			});
		var o = [];

		o.push(
			"<style>" +
			".character { " +
			"background-image: url("),
			o.push(characters.toDataURL()),
			o.push(")}"),
			_.each(r, function (t) {
				/* css:
				#eachID {
					background-position: (-c * t.offset)px @ !important
				}
				 */
				_.each(t.elements, function (e) {
					o.push("#"),
						o.push(e.id),
						o.push("{background-position:"), o.push(-c * t.offset), o.push("px 0 !important}\n")
				})
			}),
			o.push("</style>"),
			$("head").append(o.join(""))
	}
	var e = new Image;
	e.onload = t, e.src = sheetSrc
}

function makePortraitPopovers(t) {
	$("#" + t + " .character")
		.each(function () {
			var t = $(this),
				e = classInfoById[parseInt(t.data("class"))],
				a = parseInt(t.data("skin")),
				r = _.detect(e[6], function (t) {
					return t[0] == a
				});
			t.popover({
				html: !0,
				content: makeCharacterDyeTable(t),
				placement: function (t, e) {
					var a = $(e)
						.offset()
						.top - $(window)
						.scrollTop();
					return 200 > a ? "bottom" : "top"
				},
				trigger: "hover",
				title: e[1] + " - " + r[1]
			})
		})
}

function makeCharacterDyeTable(t) {
	function e(t) {
		"0" != t && (a += items[t] ? '<tr><td><span class="item" data-item="' + t + '"></span></td><td>' + items[t][0] + "</td></tr>" : '<tr><td><span class="item" data-item="-1"></span></td><td>This dye is not available in the game anymore</td></tr>')
	}
	var a = '<table class="character-dyes">',
		r = t.data("class"),
		n = t.data("accessory-dye-id"),
		c = t.data("clothing-dye-id"),
		s = parseInt(t.data("count")),
		o = classInfoById[r];
	return e(n), e(c), a += '<tr><td colspan="2">', a += 1 == s ? "The only " + o[1] + " with this outfit." : 2 == s ? "There is another " + o[1] + " with this outfit." : "There are " + (s - 1) + " other " + o[2] + " with this outfit.", a += "</td></tr>", a += "</table>", a = $(a), makeItemsIn(a), a
}

function pluralOfClass(t) {
	return "Huntress" == t ? "Huntresses" : t + "s"
}