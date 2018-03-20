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
    var PopBuqianPanel = /** @class */ (function (_super) {
        __extends(PopBuqianPanel, _super);
        function PopBuqianPanel() {
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
        PopBuqianPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            // this._publicbgRender1.dispose();
            // this._publicbgRender1 = null;
            // this._publicbgRender2.dispose();
            // this._publicbgRender2 = null;
        };
        PopBuqianPanel.prototype.initUiAtlas = function ($uiAtlas, $publicbguiAtlas) {
            this._publicbgRender1.uiAtlas = $publicbguiAtlas;
            this._publicbgRender2.uiAtlas = $publicbguiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            // this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        PopBuqianPanel.prototype.initView = function () {
            this.bg_2_1 = this.addEvntBut("baseBg", this._publicbgRender1);
            var guiBg0 = this.addChild(this._publicbgRender1.getComponent("guiBg0"));
            guiBg0.x = 270;
            guiBg0.y = 113;
            guiBg0.width = 399;
            guiBg0.height = 322;
            var guiBg1 = this.addChild(this._publicbgRender1.getComponent("guiBg1"));
            guiBg1.x = 279;
            guiBg1.y = 166;
            guiBg1.width = 381;
            guiBg1.height = 236;
            this._publicbgRender1.applyObjData();
            var titleBg = this.addChild(this._publicbgRender2.getComponent("titleBg"));
            titleBg.x = 377;
            titleBg.y = 125;
            titleBg.width = 196;
            this.b_close_1 = this.addEvntButUp("b_close", this._publicbgRender2);
            this.b_close_1.x = 621;
            this.b_close_1.y = 120;
            this.but_qx = this.addEvntButUp("but_1", this._publicbgRender2);
            this.but_qx.x = 317;
            this.but_qx.y = 331;
            this.but_qr = this.addEvntButUp("but_1", this._publicbgRender2);
            this.but_qr.x = 497;
            this.but_qr.y = 331;
            var renderLevel = this._baseRender;
            this.addUIList(["a_43", "a_44", "a_42", "a_41", "a_39", "a_40"], renderLevel);
            this.viplev = this.addChild(renderLevel.getComponent("a_46"));
        };
        PopBuqianPanel.prototype.resize = function () {
            this.bg_2_1.top = 0;
            this.bg_2_1.left = 0;
            this.bg_2_1.y = 0;
            this.bg_2_1.x = 0;
            this.bg_2_1.height = Scene_data.stageHeight / UIData.Scale;
            this.bg_2_1.width = Scene_data.stageWidth / UIData.Scale;
            _super.prototype.resize.call(this);
        };
        PopBuqianPanel.prototype.show = function ($data) {
            this._vo = $data;
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            ArtFont.getInstance().writeFontToSkinNameCenter(this._baseRender.uiAtlas, this.viplev.skinName, String(this._vo.data.vip), ArtFont.num3, 5);
            ArtFont.getInstance().writeFontToSkinNameCenter(this._baseRender.uiAtlas, "A_47", String(this._vo.data.times), ArtFont.num7, 5);
        };
        PopBuqianPanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        PopBuqianPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.but_qr:
                    ModuleEventManager.dispatchEvent(new welfare.WelfareEvent(welfare.WelfareEvent.HIDE_Welfare_EVENT));
                    ModulePageManager.openPanel(SharedDef.MODULE_MALL, [2]);
                    this.hide();
                    break;
                case this.b_close_1:
                    this.hide();
                    break;
                case this.but_qx:
                    if (this._vo.state == 2) {
                        NetManager.getInstance().protocolos.welfare_checkin();
                    }
                    else {
                        NetManager.getInstance().protocolos.welfare_checkin_getback(this._vo.data.id);
                    }
                    this.hide();
                    break;
                case this.bg_2_1:
                    break;
                default:
                    break;
            }
        };
        return PopBuqianPanel;
    }(UIConatiner));
    welfare.PopBuqianPanel = PopBuqianPanel;
})(welfare || (welfare = {}));
//# sourceMappingURL=PopBuqianPanel.js.map