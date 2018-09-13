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
var kuafu;
(function (kuafu) {
    var KuaFu3v3Panel = /** @class */ (function (_super) {
        __extends(KuaFu3v3Panel, _super);
        function KuaFu3v3Panel() {
            var _this = _super.call(this) || this;
            _this._selIdx = SharedDef.MODULE_ARENA_DOUJIANTAI;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._baseUiAtlas = new UIAtlas();
            _this._arenaQualifying = new kuafu.ArenaQualifying();
            _this._arenaDjPanel = new kuafu.ArenaDjPanel();
            return _this;
            //this._tripPanel = new FactionTripPanel();
        }
        KuaFu3v3Panel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            _super.prototype.dispose.call(this);
        };
        KuaFu3v3Panel.prototype.butClik = function (evt) {
            if (evt.target == this.w_close) {
                this.hide();
            }
            else if (evt.target == this.tab1dis) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.tab1dis.data.level + "级后解锁", 99);
            }
        };
        KuaFu3v3Panel.prototype.applyLoad = function () {
            var _this = this;
            this._baseUiAtlas.setInfo("ui/uidata/kuafu/3v3.xml", "ui/uidata/kuafu/3v3.png", function () { _this.loadConfigCom(); });
        };
        KuaFu3v3Panel.prototype.loadConfigCom = function () {
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._topRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = this._baseUiAtlas;
            this.initUI();
            //this._arenaDjPanel.setUIAtlas(this._baseUiAtlas, this.winmidRender);
            //this._arenaQualifying.setUIAtlas(this._baseUiAtlas, this.winmidRender);
            //this.setIdx(0);
            console.log("---初始化结束");
            this.resize();
            this.applyLoadComplete();
        };
        KuaFu3v3Panel.prototype.djData = function ($ary) {
            console.log("---斗剑台排行---", $ary);
            if (this._arenaDjPanel && this._arenaDjPanel) {
                this._arenaDjPanel.setListData($ary);
            }
        };
        KuaFu3v3Panel.prototype.qualifyDataChg = function () {
            if (this._arenaQualifying && this._arenaQualifying.hasStage) {
                this._arenaQualifying.dataChg();
            }
        };
        KuaFu3v3Panel.prototype.qualifyRankChg = function ($rank) {
            if (this._arenaQualifying && this._arenaQualifying.hasStage) {
                this._arenaQualifying.drawRank($rank);
            }
        };
        KuaFu3v3Panel.prototype.djRewardChg = function () {
            if (this._arenaDjPanel && this._arenaDjPanel.hasStage) {
                this._arenaDjPanel.djRewardChg();
            }
        };
        KuaFu3v3Panel.prototype.initUI = function () {
            this.addUIList(["t_ce_bg"], this.winmidRender);
            this.addUIList(["t_ce_line"], this._topRender);
            //this.addChild(this._baseRender.getComponent("t_win_title"));
            this.aryTab = new Array;
            for (var i = 0; i < 2; i++) {
                var a = this.addEvntBut("t_tab" + i, this._baseRender);
                a.data = SharedDef.MODULE_ARENA_DOUJIANTAI + i * 3;
                a.addEventListener(InteractiveEvent.Up, this.tabClick, this);
                this.aryTab.push(a);
            }
            //this.tab1dis = this._baseRender.getComponent("t_tab1_dis");
            //this.tab1dis.addEventListener(InteractiveEvent.Up, this.butClik, this);
        };
        KuaFu3v3Panel.prototype.showTab1 = function () {
            if (this.tab1dis.parent) {
                this.refreshOpenLev(this.aryTab[1]);
            }
        };
        KuaFu3v3Panel.prototype.refreshOpenLev = function ($tab) {
            var $page = $tab.data;
            if ($page == SharedDef.MODULE_ARENA_DOUJIANTAI) {
                this.setUiListVisibleByItem([$tab], true);
                return;
            }
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_ARENA, $page)) {
                this.setUiListVisibleByItem([$tab], true);
                this.setUiListVisibleByItem([this.tab1dis], false);
            }
            else {
                var $tb_system_base = tb.TB_system_base.getTempVo(Number(SharedDef.MODULE_ARENA * 10 + $page));
                this.setUiListVisibleByItem([$tab], false);
                this.setUiListVisibleByItem([this.tab1dis], true);
                this.tab1dis.data = $tb_system_base;
                this.tab1dis.y = $tab.y;
            }
        };
        KuaFu3v3Panel.prototype.tabClick = function ($e) {
            this.setIdx($e.target.data);
        };
        KuaFu3v3Panel.prototype.setIdx = function ($idx) {
            if ($idx == SharedDef.MODULE_ARENA_DOUJIANTAI) {
                this.aryTab[0].selected = true;
                this.aryTab[1].selected = false;
                this._arenaDjPanel.show();
                this._arenaQualifying.hide();
            }
            else if ($idx == SharedDef.MODULE_ARENA_RANK) {
                this.aryTab[0].selected = false;
                this.aryTab[1].selected = true;
                this._arenaDjPanel.hide();
                this._arenaQualifying.show();
            }
            this._selIdx = $idx;
        };
        KuaFu3v3Panel.prototype.getTabidx = function ($aryTab, $curTab) {
            return $aryTab.indexOf($curTab);
        };
        KuaFu3v3Panel.prototype.show = function ($tabary, $seltab) {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            for (var i = 0; i < this.aryTab.length; i++) {
                var $idx = this.getTabidx($tabary, Number(this.aryTab[i].data));
                if ($idx != -1) {
                    this.aryTab[i].y = $idx * 95 + 95;
                    this.refreshOpenLev(this.aryTab[i]);
                }
                else {
                    this.setUiListVisibleByItem([this.aryTab[i], this.tab1dis], false);
                }
            }
            if (this._baseRender.uiAtlas) {
                this.setIdx($seltab);
            }
        };
        KuaFu3v3Panel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this._selIdx == SharedDef.MODULE_ARENA_DOUJIANTAI) {
                this._arenaDjPanel.hide();
            }
            else if (this._selIdx == SharedDef.MODULE_ARENA_RANK) {
                this._arenaQualifying.hide();
            }
            SceneManager.getInstance().render = true;
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            _super.prototype.hide.call(this);
        };
        KuaFu3v3Panel.prototype.leadDataChg = function () {
        };
        KuaFu3v3Panel.prototype.tripDataChg = function () {
        };
        KuaFu3v3Panel.prototype.djChg = function () {
            if (this._arenaDjPanel && this._arenaDjPanel.hasStage) {
                this._arenaDjPanel.dataChg();
            }
        };
        return KuaFu3v3Panel;
    }(WindowUi));
    kuafu.KuaFu3v3Panel = KuaFu3v3Panel;
})(kuafu || (kuafu = {}));
//# sourceMappingURL=KuaFu3v3Panel.js.map