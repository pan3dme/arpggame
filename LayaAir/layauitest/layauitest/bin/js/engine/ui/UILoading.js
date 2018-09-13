var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var ui;
    (function (ui_1) {
        var UILoading = (function (_super) {
            __extends(UILoading, _super);
            function UILoading() {
                var _this = _super.call(this) || this;
                _this.width = UIData.designWidth;
                _this.height = UIData.designHeight;
                _this.center = 0;
                _this.middle = 0;
                _this.initData();
                return _this;
            }
            UILoading.getInstance = function () {
                if (!this._instance) {
                    this._instance = new UILoading();
                }
                return this._instance;
            };
            UILoading.prototype.initData = function () {
                var _this = this;
                //var render:UIRenderComponent = new UIRenderComponent();
                this.atls = new UIAtlas();
                this.atls.configData = new Array;
                this.atls.configData.push(this.atls.getObject("load", 0, 0, 256, 256, 256, 256, 4, 4));
                this.atls.loadImgUrl("ui/load/ui_loding.png", function () { _this.loadCom(); });
            };
            UILoading.prototype.loadCom = function () {
                this._render = new UIRenderComponent();
                this._render.uiAtlas = this.atls;
                var ui = this._render.createFrame("load");
                this.addChild(ui);
                ui.speed = 1;
                ui.width = 100;
                ui.height = 100;
                ui.x = (UIData.designWidth - ui.width) / 2;
                ui.y = (UIData.designHeight - ui.height) / 2;
                this.addRender(this._render);
            };
            UILoading.prototype.show = function () {
                ui_1.UIManager.getInstance().addUIContainer(this);
            };
            UILoading.prototype.hide = function () {
                ui_1.UIManager.getInstance().removeUIContainer(this);
            };
            return UILoading;
        }(engine.ui.base.UIConatiner));
        ui_1.UILoading = UILoading;
    })(ui = engine.ui || (engine.ui = {}));
})(engine || (engine = {}));
//# sourceMappingURL=UILoading.js.map