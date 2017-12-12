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
var store;
(function (store) {
    var RechargePanel = /** @class */ (function (_super) {
        __extends(RechargePanel, _super);
        function RechargePanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            // this._bgRender = new UIRenderComponent;
            // this.addRender(this._bgRender)
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        // private _bgRender: UIRenderComponent;
        RechargePanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
        };
        RechargePanel.prototype.initUiAtlas = function ($uiAtlas) {
            // this._bgRender.uiAtlas = $uiAtlas;
            this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        RechargePanel.prototype.initView = function () {
            var renderLevel = this._baseRender;
            this._b_btn_vip = this.addEvntButUp("b_btn_vip", this._topRender);
            this._helpbtn = this.addEvntButUp("a_6", this._topRender);
            this._refreshbtn = this.addEvntButUp("a_7", this._topRender);
            this.addUIList(["a_11_0", "a_11_1", "a_11_2", "a_11_5", "a_11_4", "a_11_3"], this._topRender);
            this.addUIList(["a_9"], this._baseRender);
            this.addChild(this._bottomRender.getComponent("c_bg"));
            this.addChild(this._bottomRender.getComponent("c_bg1"));
            this.addUIList(["a_3_1", "a_5_1", "a_4_1", "a_3_2", "a_5_2", "a_4_2", "c_huawen"], this._bottomRender);
            for (var i = 0; i < 6; i++) {
                var ui = this.addChild(this._baseRender.getComponent("a_8_" + i));
                this.copyUI(ui, "a_8_" + i);
                this.addChild(this._topRender.getComponent("c_title" + i));
            }
            this.probar = this.addChild(this._topRender.getComponent("a_10"));
            this.c_numtxt = this.addChild(this._topRender.getComponent("c_numtxt"));
            this.currentviplev = this.addChild(this._baseRender.getComponent("a_38"));
            this.vipLevNum = this.addChild(this._topRender.getComponent("a_54"));
            this.nextviplev = this.addChild(this._topRender.getComponent("a_2"));
            var tabvo = tb.TB_shop_chongzhi.getTB_shop_chongzhi();
            for (var i = 0; i < tabvo.length; i++) {
                var a = this.addChild(this._topRender.getComponent("a_" + (32 + i)));
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, a.skinName, "￥" + tabvo[i].yuanbao, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
            this.resize();
        };
        RechargePanel.prototype.copyUI = function ($Ui, uikey) {
            var copyui = this.addChild(this._baseRender.getComponent(uikey));
            copyui.isU = true;
            copyui.x = $Ui.x - $Ui.width;
        };
        RechargePanel.prototype.resetData = function () {
            ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.vipLevNum.skinName, String(GuidData.player.getVipLevel()), ArtFont.num58, TextAlign.LEFT);
            var $tabvo1 = tb.TB_vip_base.get_TB_vip_baseById(GuidData.player.getVipLevel() + 1);
            if (GuidData.player.getVipLevel() != 0) {
                var $tabvo = tb.TB_vip_base.get_TB_vip_baseById(GuidData.player.getVipLevel());
                var $rate = (GuidData.player.getChongZhiSum() - $tabvo.chongzhi) / ($tabvo1.chongzhi - $tabvo.chongzhi);
                this.probar.uvScale = $rate < 0 ? 0 : $rate;
            }
            else {
                var $rate = GuidData.player.getChongZhiSum() / $tabvo1.chongzhi;
                this.probar.uvScale = $rate < 0 ? 0 : $rate;
            }
            var othermoney = $tabvo1.chongzhi - GuidData.player.getChongZhiSum();
            console.log("充值数---", GuidData.player.getChongZhiSum());
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_numtxt.skinName, GuidData.player.getChongZhiSum() + "/" + $tabvo1.chongzhi, 12, TextAlign.CENTER, ColorType.color4b0808);
            this.drawNextVip(othermoney);
        };
        RechargePanel.prototype.drawNextVip = function (othermoney) {
            var b = String(GuidData.player.getVipLevel() + 1);
            var str = ColorType.Brown7a2f21 + "再充值" + ColorType.Green2ca937 + othermoney + ColorType.Brown7a2f21 + "元即可成为" + ColorType.colorff7200 + "VIP" + b;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.nextviplev.skinName, str, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        RechargePanel.prototype.drawVip = function ($uiatlas, $key, $num, $tx, $ty) {
            if ($tx === void 0) { $tx = 0; }
            if ($ty === void 0) { $ty = 0; }
            var $goldtxtrec = $uiatlas.getRec($key);
            var $ctx = UIManager.getInstance().getContext2D($goldtxtrec.pixelWitdh, $goldtxtrec.pixelHeight, false);
            UiDraw.cxtDrawImg($ctx, PuiData.A_V, new Rectangle($tx, 0, 22, 19), UIData.publicUi);
            ArtFont.getInstance().writeFontToCtxLeft($ctx, String($num), ArtFont.BigYellow, $tx + 24, $ty);
            //推送至显卡
            $uiatlas.updateCtx($ctx, $goldtxtrec.pixelX, $goldtxtrec.pixelY);
        };
        RechargePanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.resetData();
        };
        RechargePanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        RechargePanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        RechargePanel.prototype.butClik = function (evt) {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this._b_btn_vip:
                    ModulePageManager.openPanel(SharedDef.MODULE_VIP);
                    break;
                default:
                    break;
            }
        };
        return RechargePanel;
    }(UIConatiner));
    store.RechargePanel = RechargePanel;
})(store || (store = {}));
//# sourceMappingURL=RechargePanel.js.map