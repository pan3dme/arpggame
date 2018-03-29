var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var ui;
    (function (ui) {
        var base;
        (function (base) {
            var UIGridRentangle = (function (_super) {
                __extends(UIGridRentangle, _super);
                function UIGridRentangle() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.ogw = 0;
                    _this.ogh = 0;
                    return _this;
                }
                return UIGridRentangle;
            }(engine.ui.base.UIRectangle));
            base.UIGridRentangle = UIGridRentangle;
        })(base = ui.base || (ui.base = {}));
    })(ui = engine.ui || (engine.ui = {}));
})(engine || (engine = {}));
//# sourceMappingURL=UIGridRectangle.js.map