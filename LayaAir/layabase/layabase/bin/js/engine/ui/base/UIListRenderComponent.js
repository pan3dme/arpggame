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
            var UIListRenderComponent = (function (_super) {
                __extends(UIListRenderComponent, _super);
                function UIListRenderComponent() {
                    return _super.call(this) || this;
                }
                UIListRenderComponent.prototype.createList = function () {
                    var list = new List;
                    list.uiRender = this;
                    return list;
                };
                UIListRenderComponent.prototype.createGridList = function () {
                    var list = new GridList;
                    list.uiRender = this;
                    return list;
                };
                return UIListRenderComponent;
            }(engine.ui.base.UIRenderComponent));
            base.UIListRenderComponent = UIListRenderComponent;
        })(base = ui.base || (ui.base = {}));
    })(ui = engine.ui || (engine.ui = {}));
})(engine || (engine = {}));
//# sourceMappingURL=UIListRenderComponent.js.map