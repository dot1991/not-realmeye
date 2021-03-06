function Sanitize() {
    var e, t;
    for (t = arguments[0] || {},
    this.config = {},
    this.config.elements = t.elements ? t.elements : [],
    this.config.attributes = t.attributes ? t.attributes : {},
    this.config.attributes[Sanitize.ALL] = this.config.attributes[Sanitize.ALL] ? this.config.attributes[Sanitize.ALL] : [],
    this.config.allow_comments = t.allow_comments ? t.allow_comments : !1,
    this.allowed_elements = {},
    this.config.protocols = t.protocols ? t.protocols : {},
    this.config.add_attributes = t.add_attributes ? t.add_attributes : {},
    this.dom = t.dom ? t.dom : document,
    e = 0; e < this.config.elements.length; e++)
        this.allowed_elements[this.config.elements[e]] = !0;
    if (this.config.remove_element_contents = {},
    this.config.remove_all_contents = !1,
    t.remove_contents)
        if (t.remove_contents instanceof Array)
            for (e = 0; e < t.remove_contents.length; e++)
                this.config.remove_element_contents[t.remove_contents[e]] = !0;
        else
            this.config.remove_all_contents = !0;
    this.transformers = t.transformers ? t.transformers : []
}
Sanitize.REGEX_PROTOCOL = /^([A-Za-z0-9\+\-\.\&\;\*\s]*?)(?:\:|&*0*58|&*x0*3a)/i,
Sanitize.RELATIVE = "__relative__",
Sanitize.prototype.clean_node = function(e) {
    function t(e, t) {
        var i;
        for (i = 0; i < t.length; i++)
            if (t[i] == e)
                return i;
        return -1
    }
    function n() {
        var e, t, i = [], n = {};
        for (e = 0; e < arguments.length; e++)
            if (arguments[e] && arguments[e].length)
                for (t = 0; t < arguments[e].length; t++)
                    n[arguments[e][t]] || (n[arguments[e][t]] = !0,
                    i.push(arguments[e][t]));
        return i
    }
    function o(e) {
        var t;
        switch (e.nodeType) {
        case 1:
            s.call(this, e);
            break;
        case 3:
            t = e.cloneNode(!1),
            this.current_element.appendChild(t);
            break;
        case 5:
            t = e.cloneNode(!1),
            this.current_element.appendChild(t);
            break;
        case 8:
            this.config.allow_comments && (t = e.cloneNode(!1),
            this.current_element.appendChild(t));
            break;
        default:
            console && console.log && console.log("unknown node type", e.nodeType)
        }
    }
    function s(e) {
        var i, s, l, a, h, c, d, m, _, u, f = r.call(this, e);
        if (e = f.node,
        l = e.nodeName.toLowerCase(),
        s = this.current_element,
        this.allowed_elements[l] || f.whitelist) {
            this.current_element = this.dom.createElement(e.nodeName),
            s.appendChild(this.current_element);
            var g = this.config.attributes;
            for (a = n(g[l], g.__ALL__, f.attr_whitelist),
            i = 0; i < a.length; i++)
                c = a[i],
                h = e.attributes[c],
                h && (u = !0,
                this.config.protocols[l] && this.config.protocols[l][c] && (m = this.config.protocols[l][c],
                _ = h.nodeValue.toLowerCase().match(Sanitize.REGEX_PROTOCOL),
                u = _ ? -1 != t(_[1], m) : -1 != t(Sanitize.RELATIVE, m)),
                u && (d = this.dom.createAttribute(c),
                d.value = h.nodeValue,
                this.current_element.setAttributeNode(d)));
            if (this.config.add_attributes[l])
                for (c in this.config.add_attributes[l])
                    d = this.dom.createAttribute(c),
                    d.value = this.config.add_attributes[l][c],
                    this.current_element.setAttributeNode(d)
        } else if (-1 != t(e, this.whitelist_nodes)) {
            for (this.current_element = e.cloneNode(!0); this.current_element.childNodes.length > 0; )
                this.current_element.removeChild(this.current_element.firstChild);
            s.appendChild(this.current_element)
        }
        if (!this.config.remove_all_contents && !this.config.remove_element_contents[l])
            for (i = 0; i < e.childNodes.length; i++)
                o.call(this, e.childNodes[i]);
        this.current_element.normalize && this.current_element.normalize(),
        this.current_element = s
    }
    function r(e) {
        var i, o, s, r = {
            attr_whitelist: [],
            node: e,
            whitelist: !1
        };
        for (i = 0; i < this.transformers.length; i++)
            if (s = this.transformers[i]({
                allowed_elements: this.allowed_elements,
                config: this.config,
                node: e,
                node_name: e.nodeName.toLowerCase(),
                whitelist_nodes: this.whitelist_nodes,
                dom: this.dom
            }),
            null != s) {
                if ("object" != typeof s)
                    throw new Error("transformer output must be an object or null");
                if (s.whitelist_nodes && s.whitelist_nodes instanceof Array)
                    for (o = 0; o < s.whitelist_nodes.length; o++)
                        -1 == t(s.whitelist_nodes[o], this.whitelist_nodes) && this.whitelist_nodes.push(s.whitelist_nodes[o]);
                r.whitelist = s.whitelist ? !0 : !1,
                s.attr_whitelist && (r.attr_whitelist = n(r.attr_whitelist, s.attr_whitelist)),
                r.node = s.node ? s.node : r.node
            }
        return r
    }
    var l = this.dom.createDocumentFragment();
    for (this.current_element = l,
    this.whitelist_nodes = [],
    i = 0; i < e.childNodes.length; i++)
        o.call(this, e.childNodes[i]);
    return l.normalize && l.normalize(),
    l
}
,
"undefined" != typeof module && (module.exports = Sanitize),
"function" == typeof define && define("sanitize", [], function() {
    return Sanitize
});
