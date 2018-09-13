var engine;
(function (engine) {
    var base;
    (function (base) {
        var GC = (function () {
            function GC() {
            }
            GC.prototype.destory = function () {
            };
            return GC;
        }());
        base.GC = GC;
    })(base = engine.base || (engine.base = {}));
})(engine || (engine = {}));
//# sourceMappingURL=GC.js.map