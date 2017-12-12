var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var welfare;
(function (welfare) {
    var PopVipPanel = /** @class */ (function (_super) {
        __extends(PopVipPanel, _super);
        function PopVipPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._publicbgRender1 = new UIRenderComponent;
            _this.addRender(_this._publicbgRender1);
            _this._publicbgRender2 = new UIRenderComponent;
            _this.addRender(_this._publicbgRender2);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            return _this;
            // this._topRender = new UIRenderComponent;
            // this.addRender(this._topRender)
        }
        PopVipPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            // this._publicbgRender1.dispose();
            // this._publicbgRender1 = null;
            // this._publicbgRender2.dispose();
            // this._publicbgRender2 = null;
        };
        PopVipPanel.prototype.initUiAtlas = function ($uiAtlas, $publicbguiAtlas) {
            this._publicbgRender1.uiAtlas = $publicbguiAtlas;
            this._publicbgRender2.uiAtlas = $publicbguiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            // this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        PopVipPanel.prototype.initView = function () {
            // this.but_qr = this.addEvntButUp("but_1", this._publicbgRender2);
            // this.but_qr.x = 317
            // this.but_qr.y = 331
            // this.but_qx = this.addEvntButUp("but_1", this._publicbgRender2);
            // this.but_qx.x = 497
            // this.but_qx.y = 331
            // var qx = this.addChild(<UICompenent>this._publicbgRender2.getComponent("qx"));
            // qx.x = 533
            // qx.y = 344
            var renderLevel = this._baseRender;
            // this.addUIList(["a_38", "a_45", "a_40", "a_42", "a_44_1"], renderLevel);
        };
        PopVipPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        PopVipPanel.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        };
        PopVipPanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        PopVipPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.but_qr:
                    //购买vip
                    ModuleEventManager.dispatchEvent(new welfare.WelfareEvent(welfare.WelfareEvent.HIDE_Welfare_EVENT));
                    ModulePageManager.openPanel(SharedDef.MODULE_MALL, [2]);
                case this.but_qx:
                    this.hide();
                    break;
                default:
                    break;
            }
        };
        return PopVipPanel;
    }(UIConatiner));
    welfare.PopVipPanel = PopVipPanel;
})(welfare || (welfare = {}));
//# sourceMappingURL=PopVipPanel.js.map