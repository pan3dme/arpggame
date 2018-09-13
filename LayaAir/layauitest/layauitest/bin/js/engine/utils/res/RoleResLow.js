var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var utils;
    (function (utils) {
        var res;
        (function (res) {
            var RoleResLow = (function (_super) {
                __extends(RoleResLow, _super);
                function RoleResLow() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return RoleResLow;
            }(engine.utils.res.RoleRes));
            res.RoleResLow = RoleResLow;
        })(res = utils.res || (utils.res = {}));
    })(utils = engine.utils || (engine.utils = {}));
})(engine || (engine = {}));
//# sourceMappingURL=RoleResLow.js.map