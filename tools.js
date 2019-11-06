var t = {};
var R = {};
R = {
    name: "utilscore",
    version: "0.0.45",
    description: "javascript \u5DE5\u5177\u51FD\u6570\u5305",
    main: "index.js",
    scripts: {
        test: "echo \"Error: no test specified\" && exit 1",
        start: "parcel index.js --no-source-maps",
        build: "parcel build main.js --out-dir ./ --out-file index.js --global  utilscore --no-source-maps --experimental-scope-hoisting"
    },
    repository: {
        type: "git",
        url: "https://github.com/cgxqd/utilscore"
    },
    keywords: ["utilscore", "core", "common", "commonJS", "common-js", "util", "utils", "lib", "libs", "javascript"],
    author: "cgx",
    license: "ISC",
    browserslist: ["last 2 Chrome versions"]
};
var k = {};
var a = {};

const g = $ => Object.prototype.toString.call($),
    V = $ => "[object Null]" == g($);

a.isNull = V;

const $ = $ => void 0 === $;

a.isUndefined = $;

const ya = $ => "boolean" == typeof $;

a.isBoolean = ya;

const P = $ => "number" == typeof $;

a.isNumber = P;

const o = $ => "string" == typeof $;

a.isString = o;

const T = $ => "[object Symbol]" == g($);

a.isSymbol = T;

const j = $ => "[object Object]" == g($);

a.isObject = j;

const X = $ => "[object RegExp]" == g($);

a.isRegExp = X;

const v = $ => "[object Array]" == g($);

a.isArray = v;

const ka = $ => "[object Function]" == g($);

a.isFunction = ka;

const oa = $ => g($).match(/\s([a-z]+)/i)[1].toLocaleLowerCase();

a.getType = oa;

const qa = $ => null == $ || (j($) ? !Object.keys($).length : v($) ? !$.length : o($) ? !$ : 0 == $.toString().length);

a.isEmpty = qa;

const s = e => {
    if (e instanceof Array) return e.map(e => s(e));

    if (j(e)) {
        let r = {};

        for (let $ in e) r[$] = s(e[$]);

        return r;
    }

    return e;
};

k.deepClone = s;

const Ba = (e, r, $) => [...e].sort((e, t) => r.reduce((r, o, c) => {
    if (0 === r) {
        const [a, n] = $ && "desc" === $[c] ? [t[o], e[o]] : [e[o], t[o]];
        r = a > n ? 1 : a < n ? -1 : 0;
    }

    return r;
}, 0));

k.orderBy = Ba;

const J = (e, r, $, t = []) => {
    for (var o = 0; o < $.length; o++) {
        var c = [...t];
        if (r == $[o][e]) return c;

        if (c.push({
                [e]: $[o][e],
                value: $[o].name
            }), $[o].children) {
            let t = J(e, r, $[o].children, c);
            if (t) return t;
        }
    }
};

k.findPathByLeafId = J;

const H = (e, r) => {
    for (var $ in r) e.hasOwnProperty($) ? j(r[$]) && j(e[$]) && H(e[$], r[$]) : e[$] = r[$];

    return e;
};

k.merge = H;

const G = (e, r, $ = null) => {
    if (($ = $ || r.match(/([\w]+)/g)) && $.length && e) {
        let t = e[$.splice(0, 1)];
        return G(t, r, $);
    }

    return e;
};

k.selector = G;
var c = {};

const D = function ($, t) {
    return $.filter(($, e, r) => r.findIndex(e => "function" == typeof t ? t.call(this, e) === t.call(this, $) : e[t] === $[t]) === e);
};

c.uniqueBy = D;

const u = $ => D($, $ => $);

c.unique = u;

const _ = ($, t) => $.find(e => e[t] === Math.max.apply(Math, $.map($ => $[t])));

c.maxNumBy = _;

const ga = ($, t) => $.find(e => e[t] === Math.min.apply(Math, $.map($ => $[t])));

c.minNumBy = ga;

const ha = $ => Math.max.apply(Math, $);

c.maxNum = ha;

const ja = $ => Math.min.apply(Math, $);

c.minNum = ja;

const A = $ => {
    let t = $.length;

    for (; t;) {
        let e = Math.floor(Math.random() * t--);
        [$[e], $[t]] = [$[t], $[e]];
    }

    return $;
};

c.shuffle = A;

const ma = ($ = [], t) => {
    let {
        children: e,
        pid: r,
        id: o
    } = Object.assign({
        children: "children",
        pid: "pid",
        id: "id"
    }, t);
    return $.filter(t => {
        var n = $.filter($ => $[r] === t[o]);
        return t[e] = n, 0 === t[r];
    });
};

c.convert = ma;

const z = ($ = [], t = "children") => $.reduce(($, {
    [t]: e,
    ...r
}) => (e = e || [], $.concat([r], z(e))), []);

c.convertFlat = z;
var l = {};

const ra = (e, o = 2e3) => r(e, o, !0);

l.debounceStart = ra;

const wa = (e, o = 2e3) => r(e, o, !1);

l.debounceEnd = wa;

const r = (e, o, t = !1) => {
    let $ = null,
        u = !0;
    return t ? function () {
        clearTimeout($), u && (u = !1, e.call(this, arguments)), $ = setTimeout(() => u = !0, o);
    } : function () {
        let t = arguments;
        $ && clearTimeout($), $ = setTimeout(() => e.apply(this, t), o);
    };
};

l.debounce = r;

const Aa = (e, o) => {
    let t = null;
    return function () {
        let $ = arguments;
        t || (t = setTimeout(() => {
            t = null, e.apply(this, $);
        }, o));
    };
};

l.throttle = Aa;
var m = {};

const M = (r, t = {}) => r.replace(/:([a-zA-Z0-9_]{1,})/g, (e, o) => {
    let $ = encodeURIComponent(t[o]);
    return void 0 === $ && new Error(`URL ${r} not find ${o}`), $;
});

m.insertUrl = M;

const N = r => {
    if (j(r)) return Object.keys(r).map(t => `${t}=${encodeURIComponent(JSON.stringify(r[t]))}`).join("&");

    if (o(r)) {
        let t = {},
            e = r.match(/(([^&?]+)=([^&]*)?)/gi);
        return e && e.forEach(r => {
            let e = decodeURIComponent(r).split("=");

            try {
                t[e[0]] = JSON.parse(decodeURIComponent(e[1]));
            } catch (o) {
                try {
                    t[e[0]] = decodeURIComponent(e[1]);
                } catch (o) {
                    try {
                        t[e[0]] = JSON.parse(e[1]);
                    } catch (o) {
                        t[e[0]] = e[1];
                    }
                }
            }
        }), t;
    }
};

m.URLSearchParams = N;

const O = r => {
    try {
        let [e, o, $, n, a, s, c, p, i, h, l] = /((http:|https:)\/\/(([\w.\-]+)(\:(\d+))?))([\w\/\-]+)?((\?[^#]+)(.+)?)?/gi.exec(r);
        return {
            hash: l,
            host: n,
            hostname: a,
            href: e,
            origin: o,
            pathname: p,
            port: c,
            protocol: $,
            search: h
        };
    } catch (t) {
        console.error(`Raises a SYNTAX ERROR exception as 'about:blank/${r}' is not valid`);
    }
};

m.Url = O;
var b = {};

const y = (t, $) => Math.floor(Math.random() * ($ - t + 1)) + t;

b.randomNum = y;

const Fa = (t, $ = 0) => Number(`${Math.round(`${t}e${$}`)}e-${$}`);

b.round = Fa;

const S = t => E(t, t => t);

b.sum = S;

const E = (t, $) => t.map("function" == typeof $ ? $ : t => t[$]).reduce((t, $) => x(t, $), 0);

b.sumBy = E;

const U = (t, $ = "") => t.toLocaleString("en-US").replace(/^/, $);

b.toDecimalMark = U;

const x = (t, $) => {
    var r, e, o;

    try {
        r = t.toString().split(".")[1].length;
    } catch (c) {
        r = 0;
    }

    try {
        e = $.toString().split(".")[1].length;
    } catch (c) {
        e = 0;
    }

    return o = Math.pow(10, Math.max(r, e)), (i(t, o) + i($, o)) / o;
};

b.addNum = x;

const W = (t, $) => {
    var r, e, o;

    try {
        r = t.toString().split(".")[1].length;
    } catch (c) {
        r = 0;
    }

    try {
        e = $.toString().split(".")[1].length;
    } catch (c) {
        e = 0;
    }

    return o = Math.pow(10, Math.max(r, e)), (i(t, o) - i($, o)) / o;
};

b.subNum = W;

const i = (t, $) => {
    var r = 0,
        e = t.toString(),
        o = $.toString();

    try {
        r += e.split(".")[1].length;
    } catch (c) {}

    try {
        r += o.split(".")[1].length;
    } catch (c) {}

    return Number(e.replace(".", "")) * Number(o.replace(".", "")) / Math.pow(10, r);
};

b.mulNum = i;

const Y = (t, $) => {
    var r,
        e,
        o = 0,
        c = 0;

    try {
        o = t.toString().split(".")[1].length;
    } catch (p) {}

    try {
        c = $.toString().split(".")[1].length;
    } catch (p) {}

    return r = Number(t.toString().replace(".", "")), e = Number($.toString().replace(".", "")), i(r / e, Math.pow(10, c - o));
};

b.divNum = Y;

const Z = (t, $) => {
    for (var r = []; r.length < $ - 1;) {
        let e = Math.ceil(t / ($ - r.length - 1)),
            o = Math.floor(y(.2 * e, .8 * e));
        r.push(o), t -= o;
    }

    return r.push(t), A(r);
};

b.getrandom = Z;
var d = {};

const p = ($, t = 0, e = 0, r = "*") => {
    let a = new RegExp(`^(.{${t}})(.{${e - t}})(.${e >= $.length ? "?" : "+"})$`);
    return $.replace(a, ($, t, e, a) => t + e.replace(/./g, r) + a);
};

d.mask = p;

const aa = ($, t = 0, e = "*") => p($, 0, t, e);

d.maskLeft = aa;

const ba = ($, t = 0, e = "*") => {
    let r = $.length;
    return p($, t > r ? 0 : r - t, r, e);
};

d.maskRight = ba;

const ca = () => {
    let $ = (1048575 * Math.random() | 0).toString(16);
    return "#" + (6 !== $.length ? (15 * Math.random() | 0).toString(16) + $ : $);
};

d.randomHexColorCode = ca;

const da = ($, t = null) => {
    let e = {},
        r = [],
        a = $.split("");
    return (r = v(t) ? u(t) : o(t) ? t.split(" ") : u(a)).map(t => {
        var r = new RegExp("([`~!@#$^&*()=|{}':;',\\[\\].<>/?~\uFF01@#\uFFE5\u2026\u2026&*\uFF08\uFF09\u2014\u2014|{}\u3010\u3011\u2018\uFF1B\uFF1A\u201D\u201C'\u3002\uFF0C\u3001\uFF1F])", "g");
        let a = t.replace(r, "\\$1"),
            o = $.match(new RegExp(a, "g"));
        e[t] = o ? e[t] = o.length : 0;
    }), e;
};

d.getCounts = da;

const ea = ($, t) => {
    var e,
        r,
        a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
        o = [];
    if (t = t || a.length, $)
        for (e = 0; e < $; e++) o[e] = a[0 | Math.random() * t];
    else
        for (o[8] = o[13] = o[18] = o[23] = "-", o[14] = "4", e = 0; e < 36; e++) o[e] || (r = 0 | 16 * Math.random(), o[e] = a[19 == e ? 3 & r | 8 : r]);
    return o.join("");
};

d.uuid = ea;

const fa = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function ($) {
    var t = 16 * Math.random() | 0;
    return ("x" == $ ? t : 3 & t | 8).toString(16);
});

d.guid = fa;
var h = {};

const B = (e = "") => {
    console.error(`缺少参数${e}`);
};

h.requered = B;

const ia = (e, r) => {
    let o = new Date(e),
        t = ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"],
        $ = new Date(+o + 288e5).toISOString().substr(0, 19).replace(/[a-z]/i, " "),
        [a, p, n, x, l, j, A] = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g.exec($);

    var V = (e, r) => e.slice(0, r.length);

    return r.replace(/(Y{1,4})/g, e => V(p, e)).replace(/(M{1,2})/g, e => V(n, e)).replace(/(D{1,2})/g, e => V(x, e)).replace(/(h{1,2})/g, e => V(l, e)).replace(/(m{1,2})/g, e => V(j, e)).replace(/(s{1,2})/g, e => V(A, e)).replace(/(W{1})/g, e => t[o.getDay()]).replace(/(Q{1})/g, e => Math.floor((o.getMonth() + 3) / 3));
};

h.formatTime = ia;

const C = e => {
    return e > 86400 ? Math.floor(e / 3600 / 24) + "d" + Math.floor(e / 3600 % 24) + "h" + Math.floor(e % 3600 / 60) + "m" + e % 60 + "s" : e > 3600 ? Math.floor(e / 3600) + "h" + Math.floor(e % 3600 / 60) + "m" + e % 60 + "s" : e > 60 ? Math.floor(e / 60) + "m" + e % 60 + "s" : e % 60 + "s";
};

h.formatHMS = C;

const n = e => void 0 === e ? n(Date.now()) : Math.floor(new Date(e).getTime() / 1e3);

h.unix = n;

const la = (e = B()) => {
    let r = n(e) - n();
    return C(r);
};

h.countDown = la;
var w = {};

const na = e => "\u2605\u2605\u2605\u2605\u2605\u2606\u2606\u2606\u2606\u2606".slice(5 - e, 10 - e);

w.getRate = na;
var F = {};
const pa = {
    error: "",
    check: function (r, e) {
        for (var t = 0; t < e.length; t++) {
            if (!e[t].checkType) return !0;
            if (!e[t].name) return !0;
            if (!e[t].errorMsg) return !0;
            if (!r[e[t].name]) return this.error = e[t].errorMsg, !1;

            switch (e[t].checkType) {
                case "string":
                    if (!new RegExp("^.{" + e[t].checkRule + "}$").test(r[e[t].name])) return this.error = e[t].errorMsg, !1;
                    break;

                case "int":
                    if (!new RegExp("^(-[1-9]|[1-9])[0-9]{" + e[t].checkRule + "}$").test(r[e[t].name])) return this.error = e[t].errorMsg, !1;
                    break;

                case "between":
                    if (!this.isNumber(r[e[t].name])) return this.error = e[t].errorMsg, !1;
                    if ((s = e[t].checkRule.split(","))[0] = Number(s[0]), s[1] = Number(s[1]), r[e[t].name] > s[1] || r[e[t].name] < s[0]) return this.error = e[t].errorMsg, !1;
                    break;

                case "betweenD":
                    if (!/^-?[1-9][0-9]?$/.test(r[e[t].name])) return this.error = e[t].errorMsg, !1;
                    if ((s = e[t].checkRule.split(","))[0] = Number(s[0]), s[1] = Number(s[1]), r[e[t].name] > s[1] || r[e[t].name] < s[0]) return this.error = e[t].errorMsg, !1;
                    break;

                case "betweenF":
                    var s;
                    if (!/^-?[0-9][0-9]?.+[0-9]+$/.test(r[e[t].name])) return this.error = e[t].errorMsg, !1;
                    if ((s = e[t].checkRule.split(","))[0] = Number(s[0]), s[1] = Number(s[1]), r[e[t].name] > s[1] || r[e[t].name] < s[0]) return this.error = e[t].errorMsg, !1;
                    break;

                case "same":
                    if (r[e[t].name] != e[t].checkRule) return this.error = e[t].errorMsg, !1;
                    break;

                case "notsame":
                    if (r[e[t].name] == e[t].checkRule) return this.error = e[t].errorMsg, !1;
                    break;

                case "email":
                    if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(r[e[t].name])) return this.error = e[t].errorMsg, !1;
                    break;

                case "phoneno":
                    if (!/^1[0-9]{10,10}$/.test(r[e[t].name])) return this.error = e[t].errorMsg, !1;
                    break;

                case "zipcode":
                    if (!/^[0-9]{6}$/.test(r[e[t].name])) return this.error = e[t].errorMsg, !1;
                    break;

                case "reg":
                    if (!new RegExp(e[t].checkRule).test(r[e[t].name])) return this.error = e[t].errorMsg, !1;
                    break;

                case "in":
                    if (!e[t].checkRule.some(s => s === r[e[t].name])) return this.error = e[t].errorMsg, !1;
                    break;

                case "notnull":
                    if (null == r[e[t].name] || r[e[t].name].length < 1) return this.error = e[t].errorMsg, !1;
            }
        }

        return !0;
    },
    isNumber: function (r) {
        return /^-?[1-9][0-9]?.?[0-9]*$/.test(r);
    }
};
F.graceChecker = pa;
var q = {};

const f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    sa = (r = "") => {
        let e,
            t,
            o,
            $,
            C,
            a,
            d,
            n = "",
            c = 0;

        for (r = ua(r); c < r.length;) $ = (e = r.charCodeAt(c++)) >> 2, C = (3 & e) << 4 | (t = r.charCodeAt(c++)) >> 4, a = (15 & t) << 2 | (o = r.charCodeAt(c++)) >> 6, d = 63 & o, isNaN(t) ? a = d = 64 : isNaN(o) && (d = 64), n = n + f.charAt($) + f.charAt(C) + f.charAt(a) + f.charAt(d);

        return n;
    };

q.encode = sa;

const ta = (r = "") => {
    let e,
        t,
        o,
        $,
        C,
        a,
        d,
        n = "",
        c = 0;

    for (r = r.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < r.length;) e = ($ = f.indexOf(r.charAt(c++))) << 2 | (C = f.indexOf(r.charAt(c++))) >> 4, t = (15 & C) << 4 | (a = f.indexOf(r.charAt(c++))) >> 2, o = (3 & a) << 6 | (d = f.indexOf(r.charAt(c++))), n += String.fromCharCode(e), 64 !== a && (n += String.fromCharCode(t)), 64 !== d && (n += String.fromCharCode(o));

    return n = va(n);
};

function ua(r) {
    r = r.replace(/\r\n/g, "\n");
    let e = "";

    for (let t = 0; t < r.length; t++) {
        let o = r.charCodeAt(t);
        o < 128 ? e += String.fromCharCode(o) : o > 127 && o < 2048 ? (e += String.fromCharCode(o >> 6 | 192), e += String.fromCharCode(63 & o | 128)) : (e += String.fromCharCode(o >> 12 | 224), e += String.fromCharCode(o >> 6 & 63 | 128), e += String.fromCharCode(63 & o | 128));
    }

    return e;
}

function va(r) {
    let e = "",
        t = 0,
        o = 0,
        $ = 0,
        C = 0;

    for (; t < r.length;)(o = r.charCodeAt(t)) < 128 ? (e += String.fromCharCode(o), t++) : o > 191 && o < 224 ? ($ = r.charCodeAt(t + 1), e += String.fromCharCode((31 & o) << 6 | 63 & $), t += 2) : ($ = r.charCodeAt(t + 1), C = r.charCodeAt(t + 2), e += String.fromCharCode((15 & o) << 12 | (63 & $) << 6 | 63 & C), t += 3);

    return e;
}

q.decode = ta;
var I = {};
const xa = class {
    constructor() {
        this.subs = {};
    }

    on(s, t) {
        (this.subs[s] || (this.subs[s] = [])).push(t);
    }

    once(s, t) {
        this.on(s, (...e) => {
            t(...e), this.off(s, t);
        });
    }

    emit(s, ...t) {
        this.subs[s] && this.subs[s].forEach(s => {
            s(...t);
        });
    }

    off(s, t) {
        if (this.subs[s]) {
            let e = this.subs[s].findIndex(s => s === t);
            this.subs[s].splice(e, 1), this.subs[s].length || delete this.subs[s];
        }
    }

    allOff(s) {
        s && this.subs[s] ? delete this.subs[s] : this.subs = {};
    }

};
I.EventEmitter = xa;
var e = {};

const za = e => new Promise((t, o) => {
    let a = new FileReader();
    a.readAsDataURL(e), a.onload = () => {
        t(a.result);
    }, a.onerror = e => {
        o(e);
    };
});

e.blobToDataURL = za;

const K = e => {
    let t = e.split(","),
        o = t[0].match(/:(.*?);/)[1],
        a = atob(t[1]),
        r = a.length,
        $ = new Uint8Array(r);

    for (; r--;) $[r] = a.charCodeAt(r);

    return new Blob([$], {
        type: o
    });
};

e.dataURLtoBlob = K;

const L = e => new Promise((t, o) => {
    let a = document.createElement("canvas"),
        r = a.getContext("2d"),
        $ = new Image();
    $.crossOrigin = "Anonymous", $.onload = function () {
        a.height = $.height, a.width = $.width, r.drawImage($, 0, 0);
        var e = a.toDataURL("image/jpg");
        t(e), a = null;
    }, $.onerror = e => o(e), $.src = e;
});

e.getImgToBase64 = L;

const Ca = async e => {
    let t = await L(e);
    return await K(t);
};

e.getImgToBlob = Ca;

const Da = (e, t, o = "text/plain") => {
    var a = document.createElement("a"),
        r = new Blob([t], {
            type: o
        });
    a.href = URL.createObjectURL(r), a.download = e, a.addEventListener("click", e => e.stopImmediatePropagation()), document.body.appendChild(a), a.click(), document.body.removeChild(a);
};

e.downloadFile = Da;

const Ea = e => {
    var t = document.createElement("input");
    t.setAttribute("value", e), document.body.appendChild(t), t.select(), document.execCommand("copy"), document.body.removeChild(t);
};

e.setClipboardData = Ea;
var Q = {
    ...k,
    ...c,
    ...h,
    ...l,
    ...d,
    ...b,
    ...a,
    ...m,
    ...w,
    ...F,
    ...q,
    ...I,
    ...e,
    version: R.version
};
t = Q;
export default t;

// if ( typeof module !== "undefined") {
//     module.exports = t;
// } else if (typeof define === "function" && define.amd) {
//     define(function () {
//         return t;
//     });
// } else {
//     this["utilscore"] = t;
// }