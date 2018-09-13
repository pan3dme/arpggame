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
            var UIVirtualContainer = (function (_super) {
                __extends(UIVirtualContainer, _super);
                function UIVirtualContainer() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.visible = true;
                    return _this;
                }
                return UIVirtualContainer;
            }(engine.ui.base.UIConatiner));
            base.UIVirtualContainer = UIVirtualContainer;
        })(base = ui.base || (ui.base = {}));
    })(ui = engine.ui || (engine.ui = {}));
})(engine || (engine = {}));
//# sourceMappingURL=UIVirtualContainer.js.map