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
var BossHpPanel = /** @class */ (function (_super) {
    __extends(BossHpPanel, _super);
    function BossHpPanel() {
        var _this = _super.call(this) || this;
        _this.uiAtlasComplet = false;
        _this.hpcur = 1;
        _this.hptabelNum = 2;
        _this.interfaceUI = true;
        _this.width = UIData.designWidth;
        _this.height = UIData.designHeight;
        _this.center = 0;
        _this.top = 0;
        _this._bottomRender = new UIRenderComponent();
        _this.addRender(_this._bottomRender);
        _this._midRender = new UIRenderComponent();
        _this.addRender(_this._midRender);
        _this._topRender = new UIRenderComponent();
        _this.addRender(_this._topRender);
        return _this;
    }
    BossHpPanel.prototype.applyLoad = function () {
        var _this = this;
        this._topRender.uiAtlas = new UIAtlas;
        this._topRender.uiAtlas.setInfo("ui/uidata/boss/bosshp/bosshp.xml", "ui/uidata/boss/bosshp/bosshp.png", function () { _this.loadConfigCom(); });
    };
    BossHpPanel.prototype.loadConfigCom = function () {
        this._bottomRender.uiAtlas = this._topRender.uiAtlas;
        this._midRender.uiAtlas = this._topRender.uiAtlas;
        this.addChild(this._bottomRender.getComponent("a_hp_bg"));
        this.a_boss_name = this.addChild(this._topRender.getComponent("a_boss_name"));
        this.a_boss_lev = this.addChild(this._topRender.getComponent("a_boss_lev"));
        this.a_rank_but = this.addEvntBut("a_rank_but", this._topRender);
        this.a_hp_loop_num = this.addChild(this._topRender.getComponent("a_hp_loop_num"));
        this.a_hp_loop_num.goToAndStop(5);
        this.a_hp_loop_x = this.addChild(this._topRender.getComponent("a_hp_loop_x"));
        this.a_mide_hp_bg = this.addChild(this._bottomRender.getComponent("a_hp_bar"));
        this.a_hp_bar = this.addChild(this._midRender.getComponent("a_hp_bar"));
        this.uiAtlasComplet = true;
        this.applyLoadComplete();
        this.refresh();
    };
    BossHpPanel.prototype.butClik = function (evt) {
        if (evt.target == this.a_rank_but) {
            var $bossEvent = new boss.BossEvent(boss.BossEvent.SHOW_OFTENRANK_PANEL);
            $bossEvent.data = true;
            ModuleEventManager.dispatchEvent($bossEvent);
        }
    };
    BossHpPanel.prototype.initUnitData = function ($unit) {
        LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_boss_name.skinName, ColorType.Yellowffe9b4 + $unit.getName(), 15);
        LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_boss_lev.skinName, ColorType.Yellowffe9b4 + " Lv:" + $unit.getLevel(), 15);
        this.showRankBut(false);
        //this.setHp(1,0)
    };
    BossHpPanel.prototype.setHp = function (value, id) {
        this.hpcur = value;
        if (tb.TB_creature_template.get_TB_creature_template(id)) {
            this.hptabelNum = tb.TB_creature_template.get_TB_creature_template(id).hp_num;
        }
        this.refresh();
    };
    BossHpPanel.prototype.showRankBut = function (value) {
        this.setUiListVisibleByItem([this.a_rank_but], value);
    };
    BossHpPanel.prototype.refresh = function () {
        if (this.uiAtlasComplet) {
            var hpNum = Math.ceil(this.hpcur * this.hptabelNum);
            hpNum = Math.max(0, hpNum);
            hpNum = Math.min(this.hptabelNum, hpNum);
            this.a_hp_loop_num.goToAndStop(hpNum);
            var kn = this.hptabelNum - hpNum;
            this.a_hp_bar.goToAndStop((kn % 5));
            this.a_mide_hp_bg.goToAndStop((kn + 1) % 5);
            if (this.hpcur < (1 / this.hptabelNum)) {
                this.a_mide_hp_bg.goToAndStop(5);
            }
            if (this.hpcur <= 0) {
                this.a_hp_bar.goToAndStop(5);
                return;
            }
            var sc = (this.hpcur - ((this.hptabelNum - 1) - kn) / this.hptabelNum) / (1 / this.hptabelNum);
            sc = Math.max(sc, 0.001);
            sc = Math.min(sc, 1);
            if (sc < this.a_hp_bar.uvScale) {
                TweenMoveTo(this.a_hp_bar, 0.1, { uvScale: sc });
            }
            else {
                this.a_hp_bar.uvScale = sc;
            }
        }
    };
    return BossHpPanel;
}(UIPanel));
//# sourceMappingURL=BossHpPanel.js.map