function initializeGuildServerActivityGraph(t, i) {
	nv.addGraph(function () {
		var r = nv.models.multiBarHorizontalChart()
			.x(function (t) {
				return t.server
			})
			.y(function (t) {
				return t.activity
			})
			.margin({
				top: 20,
				right: 20,
				bottom: 20,
				left: 90
			})
			.tooltips(!1)
			.showValues(!0)
			.showControls(!1);
		return r.yAxis.tickFormat(d3.format(",.2f")), d3.select("#" + t + " svg")
			.datum([{
				key: "Server Activity (%)",
				values: i
			}])
			.transition()
			.duration(500)
			.call(r), r
	})
}