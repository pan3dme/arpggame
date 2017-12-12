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
var faction;
(function (faction) {
    var ApplyFactionUiPanel = /** @class */ (function (_super) {
        __extends(ApplyFactionUiPanel, _super);
        function ApplyFactionUiPanel() {
            var _this = _super.call(this, 0) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._publicbgRender = new UIRenderComponent;
            _this.addRender(_this._publicbgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._baseRender.uiAtlas = new UIAtlas();
            return _this;
        }
        ApplyFactionUiPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this.applybuildpanel.dispose();
            this.applybuildpanel = null;
            this.applyzhaomupanel.dispose();
            this.applyzhaomupanel = null;
            _super.prototype.dispose.call(this);
        };
        ApplyFactionUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._publicbgRender.uiAtlas = WindowUi.winUIAtlas;
            this._baseRender.uiAtlas.setInfo("ui/uidata/faction/newfaction/joinfaction.xml", "ui/uidata/faction/newfaction/joinfaction.png", function () { _this.loadConfigCom(); }, "ui/uidata/faction/factionpc.png");
        };
        ApplyFactionUiPanel.prototype.loadConfigCom = function () {
            this.winmidRender.uiAtlas = this._publicbgRender.uiAtlas;
            var renderLevel = this._baseRender;
            this.applybuildpanel = new faction.ApplyBuildPanel();
            this.applybuildpanel.initUiAtlas(renderLevel.uiAtlas, this._publicbgRender.uiAtlas);
            this.applyzhaomupanel = new faction.ApplyZhaomuPanel();
            this.applyzhaomupanel.initUiAtlas(renderLevel.uiAtlas, this._publicbgRender.uiAtlas);
            this.tab_zhao = this.addEvntBut("tab_zhao", renderLevel);
            this.tab_chuang = this.addEvntBut("tab_chuang", renderLevel);
            // UIuitl.getInstance().drawCostUI(renderLevel.uiAtlas,xxx.skinName,[104,100],"#853d07",90,20);
            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", renderLevel);
            this.BaseUiAry = new Array;
            var cnew_right_bg_top = this.addChild(this.winmidRender.getComponent("cnew_right_bg_top"));
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "b_right_bg_top", renderLevel);
            var cnew_right_bg_bottom = this.addChild(this.winmidRender.getComponent("cnew_right_bg_bottom"));
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "b_right_bg_bottom", renderLevel);
            this.BaseUiAry.push(cnew_right_bg_top);
            this.BaseUiAry.push(cnew_right_bg_bottom);
            this.addUIList(["title", "b_newbg"], this._baseRender);
            this.winmidRender.applyObjData();
            this.applyLoadComplete();
        };
        ApplyFactionUiPanel.prototype.selecttype = function ($value) {
            if ($value == 0) {
                this.tab_zhao.selected = true;
                this.tab_chuang.selected = false;
                this.applybuildpanel.hide();
                this.applyzhaomupanel.show();
            }
            else {
                this.tab_chuang.selected = true;
                this.tab_zhao.selected = false;
                this.applybuildpanel.show();
                this.applyzhaomupanel.hide();
            }
            var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
            if ($value == 0) {
                $scenePange.data = SharedDef.MODULE_FACTION;
            }
            ModuleEventManager.dispatchEvent($scenePange);
        };
        ApplyFactionUiPanel.prototype.show = function (value) {
            if (value === void 0) { value = 0; }
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.selecttype(0);
        };
        ApplyFactionUiPanel.prototype.hide = function () {
            this.applybuildpanel.hide();
            this.applyzhaomupanel.hide();
            UIManager.getInstance().removeUIContainer(this);
            _super.prototype.hide.call(this);
        };
        ApplyFactionUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        ApplyFactionUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.tab_chuang:
                    this.selecttype(1);
                    break;
                case this.tab_zhao:
                    this.selecttype(0);
                    break;
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.HIDE_APPLYFACTIONUI_EVENT));
                    break;
                default:
                    break;
            }
        };
        return ApplyFactionUiPanel;
    }(WindowUi));
    faction.ApplyFactionUiPanel = ApplyFactionUiPanel;
})(faction || (faction = {}));
//# sourceMappingURL=ApplyFactionUiPanel.js.map