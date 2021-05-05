function initializeReplyBox(e, i) {
	var t = $("#" + e);
	RealmEye.initializeEditor($("textarea", t), $("button", t), $("input[type=checkbox]", t), $(".preview .message-text", t), i)
}

function initializeEditMessageButton(e, i) {
	$("#" + e)
		.click(function () {
			var e = $("#edit-message-modal");
			RealmEye.initializeEditor($("textarea", e), $("button", e), $("input[type=checkbox]", e), $(".preview .message-text", e), i), e.modal("show")
		})
}
$(function () {
	$(".message-body.markdown")
		.each(function () {
			RealmEye.sanitize($(this))
		})
});