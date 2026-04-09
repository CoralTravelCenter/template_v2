(function () {
    'use strict';

    const i = ["/endpoints/PackageTourHotelProduct/PriceSearchEncrypt", "/endpoints/OnlyHotelProduct/PriceSearchEncrypt"],
        c = {
            additionalFilters: [{type: 3, values: [{id: "1", value: "1"}], providers: []}, {
                type: 21,
                values: [{id: "2", value: "2"}],
                providers: []
            }]
        }, a = t => {
            if (typeof t != "string" || !t.trim()) return null;
            try {
                return JSON.parse(t)
            } catch {
                return null
            }
        }, l = (t, e) => {
            console.group("[elite-search-magic] encrypt"), console.log("Перехваченный payload:", t), console.log("Payload после подмены:", e), console.groupEnd();
        }, p = t => {
            const e = a(t);
            if (!e) return t;
            const r = {...e, additionalFilters: c.additionalFilters};
            return l(e, r), JSON.stringify(r)
        }, d = t => {
            try {
                return i.includes(new URL(t, location.origin).pathname)
            } catch {
                return typeof t == "string" && i.some(e => t.includes(e))
            }
        }, u = () => {
            const t = XMLHttpRequest.prototype.open, e = XMLHttpRequest.prototype.send;
            XMLHttpRequest.prototype.open = function (n, o, ...s) {
                return this.__eliteSearchMagic = {matched: typeof o == "string" && d(o)}, t.call(this, n, o, ...s)
            }, XMLHttpRequest.prototype.send = function (n) {
                var o;
                return (o = this.__eliteSearchMagic) != null && o.matched && typeof n == "string" && (n = p(n)), e.call(this, n)
            };
        };
    u();

})();