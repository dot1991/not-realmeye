CodeMirror.defineMode("rsdl", function() {
    return {
        startState: function() {
            return {
                lastToken: null,
                afterSeparator: !0
            }
        },
        token: function(r, e) {
            function a() {
                return r.eol() || /\s/.test(r.peek())
            }
            if (r.eatWhile(/\s/))
                return e.afterSeparator = !0,
                null;
            if (!e.afterSeparator) {
                {
                    r.match(/[^\s]+/)
                }
                return e.afterSeparator = r.eol(),
                e.lastToken = null,
                "error"
            }
            return r.match(/\/\/.*$/) ? (e.lastToken = r.current(),
            e.afterSeparator = !0,
            "comment") : "alpha" === e.lastToken && r.match(/#[0-9a-fA-F]{1,2}/) && a ? "atom" : r.match(/#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})/) ? (e.lastToken = r.current(),
            e.afterSeparator = r.eol(),
            a() ? "atom" : "error") : r.match(/background|star|guildRank|lastChar|allChars|name|line1|line2|line3|guild|lastSeen|lastServer|playerLink|fame|exp|created/) ? (e.lastToken = r.current(),
            e.afterSeparator = r.eol(),
            a() ? "def" : "error") : r.match(/alpha|outline|small|flip|tl|tr|t|l|c|r|bl|br|b/) ? (e.lastToken = r.current(),
            e.afterSeparator = r.eol(),
            a() ? "tag" : "error") : "background" === e.lastToken ? r.match(/[0-9A-Za-z]{7}|[0-9A-Za-z]{5}/) && a() ? (e.lastToken = r.current(),
            e.afterSeparator = r.eol(),
            "string") : (e.lastToken = null,
            e.afterSeparator = r.eol(),
            "error") : r.match(/-?\d+/) ? (e.lastToken = r.current(),
            e.afterSeparator = r.eol(),
            a() ? "number" : "error") : r.match(/[^\s]+/) ? (e.lastToken = null,
            e.afterSeparator = r.eol(),
            "error") : void 0
        }
    }
});
