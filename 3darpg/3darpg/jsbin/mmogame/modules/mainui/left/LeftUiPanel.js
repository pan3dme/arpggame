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
var leftui;
(function (leftui) {
    var LeftUiPanel = /** @class */ (function (_super) {
        __extends(LeftUiPanel, _super);
        function LeftUiPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.openOrClose = true;
            _this.tempLeft = 0;
            _this.interfaceUI = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.left = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._midRender.uiAtlas = new UIAtlas;
            _this.leftUiQuestPanel = new leftui.LeftUiQuestPanel();
            return _this;
            // this.leftHangUpPanel = new LeftHangUpPanel();
        }
        LeftUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this.leftUiQuestPanel.loadAtlas(function () {
                //this.leftHangUpPanel.loadAtlas(() => {
                //    this._midRender.uiAtlas.setInfo("ui/uidata/mainui/left/left.xml", "ui/uidata/mainui/left/left.png", () => { this.loadConfigCom() });
                //})
                _this._midRender.uiAtlas.setInfo("ui/uidata/mainui/left/left.xml", "ui/uidata/mainui/left/left.png", function () { _this.loadConfigCom(); });
            });
        };
        LeftUiPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this.addChild(this._bottomRender.getComponent("a_bg"));
            this.a_state2_tab1 = this.addEvntBut("a_state2_tab1", this._midRender);
            this.a_state2_tab0 = this.addEvntBut("a_state2_tab0", this._midRender);
            this.a_hide_but = this.addEvntBut("a_hide_but", this._midRender);
            this.a_hide_but.left = 6;
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
            mainUi.MainUiModel.mainUiLoadFinish();
        };
        LeftUiPanel.prototype.refresh = function () {
            if (GuidData.map.showAreaById(AreaType.topleftpalce_2)) {
                this.left = 0;
                this.setUiListVisibleByItem([this.a_hide_but], true);
            }
            else {
                this.left = -1000;
                this.setUiListVisibleByItem([this.a_hide_but], false);
                return;
            }
            this.setUiListVisibleByItem([this.a_state2_tab1], GuidData.player.isOpenSystemById(SharedDef.MODULE_EXP));
            // a_state2_tab1
            this.a_hide_but.isU = !this.openOrClose;
            if (!this.openOrClose) {
                this.pxleft = -300;
            }
            else {
                this.pxleft = 0;
            }
            this.selectTab(leftui.TaskListUi.showType);
            this.leftUiQuestPanel.show();
        };
        LeftUiPanel.prototype.selectTab = function ($type) {
            leftui.TaskListUi.showType = $type;
            if ($type == 0) {
                this.a_state2_tab0.selected = true;
                this.a_state2_tab1.selected = false;
                this.leftUiQuestPanel.refreshType(leftui.TaskListUi.showType);
                //   this.leftHangUpPanel.hide()
            }
            else {
                this.a_state2_tab1.selected = true;
                this.a_state2_tab0.selected = false;
                this.leftUiQuestPanel.refreshType(leftui.TaskListUi.showType);
                //     this.leftHangUpPanel.show()
            }
        };
        LeftUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_state2_tab0:
                    this.selectTab(0);
                    break;
                case this.a_state2_tab1:
                    this.selectTab(1);
                    break;
                case this.a_hide_but:
                    this.openOrClose = !this.openOrClose;
                    if (!this.openOrClose) {
                        TweenMoveTo(this, 0.2, { pxleft: -300 });
                    }
                    else {
                        TweenMoveTo(this, 0.2, { pxleft: 0 });
                    }
                    this.a_hide_but.isU = !this.openOrClose;
                    this._midRender.applyObjData();
                    break;
                default:
                    break;
            }
        };
        Object.defineProperty(LeftUiPanel.prototype, "pxleft", {
            get: function () {
                return this.tempLeft;
            },
            set: function (value) {
                this.tempLeft = value;
                this.left = this.tempLeft;
                this.leftUiQuestPanel.left = value;
                this.leftUiQuestPanel.resize();
                //this.leftHangUpPanel.left = value + 40;
                //this.leftHangUpPanel.resize();
                this.resize();
            },
            enumerable: true,
            configurable: true
        });
        LeftUiPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.refresh();
        };
        LeftUiPanel.prototype.hide = function () {
            this.leftUiQuestPanel.hide();
            //  this.leftHangUpPanel.hide();
            UIManager.getInstance().removeUIContainer(this);
        };
        return LeftUiPanel;
    }(UIPanel));
    leftui.LeftUiPanel = LeftUiPanel;
})(leftui || (leftui = {}));
//# sourceMappingURL=LeftUiPanel.js.map