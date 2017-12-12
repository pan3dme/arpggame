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
var strengthgem;
(function (strengthgem) {
    var masterLevtipsPanel = /** @class */ (function (_super) {
        __extends(masterLevtipsPanel, _super);
        function masterLevtipsPanel() {
            var _this = _super.call(this) || this;
            _this.KeyByType = ["全身强化:  ", "全身精炼:  ", "全身镶嵌总和:  "];
            _this.KeyLevNameByType = ["级", "段", "级"];
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            // this._publicbgRender = new UIRenderComponent;
            // this.addRender(this._publicbgRender)
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._bgRender.uiAtlas = new UIAtlas();
            return _this;
        }
        masterLevtipsPanel.prototype.dispose = function () {
            this._midRender.dispose();
            this._midRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
            _super.prototype.dispose.call(this);
        };
        masterLevtipsPanel.prototype.applyLoad = function () {
            var _this = this;
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            //     this._publicbgRender.uiAtlas = $publicbgUiAtlas;
            this._bgRender.uiAtlas.setInfo("ui/uidata/streng/tips.xml", "ui/uidata/streng/tips.png", function () { _this.loadConfigCom(); });
            // });
        };
        masterLevtipsPanel.prototype.loadConfigCom = function () {
            this._midRender.uiAtlas = this._bgRender.uiAtlas;
            this.addUIList(["b_title", "b_bg0", "b_bg1"], this._bgRender);
            this.addUIList(["b_line", "b_arrow"], this._midRender);
            this.AttrCurAry = new Array;
            this.AttrNextAry = new Array;
            for (var i = 0; i < 11; i++) {
                this.AttrCurAry.push(this.addChild(this._midRender.getComponent("b_attr" + i)));
                this.AttrNextAry.push(this.addChild(this._midRender.getComponent("b_nattr" + i)));
            }
            this.b_tab0 = this.addEvntBut("b_tab0", this._bgRender);
            this.b_tab1 = this.addEvntBut("b_tab1", this._bgRender);
            this.b_tab2 = this.addEvntBut("b_tab2", this._bgRender);
            this.TabAry = new Array;
            this.TabAry.push(this.b_tab0);
            this.TabAry.push(this.b_tab1);
            this.TabAry.push(this.b_tab2);
            this.resize();
            this.applyLoadComplete();
        };
        masterLevtipsPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.e_close:
                    UIManager.getInstance().removeUIContainer(this);
                    break;
                case this.b_tab0:
                    this.setSelectTab(SharedDef.MODULE_MIX_STRENGTH);
                    break;
                case this.b_tab1:
                    this.setSelectTab(SharedDef.MODULE_MIX_POLISHED);
                    break;
                case this.b_tab2:
                    this.setSelectTab(SharedDef.MODULE_MIX_GEM);
                    break;
                default:
                    break;
            }
        };
        masterLevtipsPanel.prototype.setSelectTab = function ($value) {
            for (var i = 0; i < this.TabAry.length; i++) {
                if ((i + 1) == $value) {
                    this.TabAry[i].selected = true;
                }
                else {
                    this.TabAry[i].selected = false;
                }
            }
            this.drawPage($value);
        };
        masterLevtipsPanel.prototype.drawPage = function ($value) {
            var type = $value - 1;
            var lev = this._masterlevvo[type] == 0 ? 1 : this._masterlevvo[type];
            var ary = this.getTabAry($value);
            var curtab = ary[lev - 1];
            // console.log("---lev--", lev, curtab, ary);
            //下一级加成情况
            if (lev == ary.length) {
                //满级
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrNextAry[3].skinName, "已满级", 14, TextAlign.CENTER, ColorType.Brown7a2f21);
                UiDraw.clearUI(this.AttrNextAry[0]);
                UiDraw.clearUI(this.AttrNextAry[1]);
                UiDraw.clearUI(this.AttrNextAry[2]);
                UiDraw.clearUI(this.AttrNextAry[4]);
                UiDraw.clearUI(this.AttrNextAry[5]);
                UiDraw.clearUI(this.AttrNextAry[6]);
            }
            else if (lev < ary.length) {
                var tabvo;
                if (this._masterlevvo[type] == 0) {
                    tabvo = curtab;
                }
                else {
                    tabvo = ary[lev];
                }
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrNextAry[0].skinName, ColorType.color802626 + strengthgem.StrengUtil.KeyNameByType[type] + ":  " + ColorType.Green2ca937 + tabvo.level + "级", 14, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrNextAry[1].skinName, ColorType.color802626 + this.KeyByType[type] + ColorType.Green2ca937 + tabvo.need_lv[0] + this.KeyLevNameByType[type], 14, TextAlign.LEFT);
                for (var i = 0; i < this.AttrNextAry.length - 2; i++) {
                    if (i < tabvo.props.length) {
                        UiDraw.drawAttValAdd(this.AttrNextAry[i + 2], tabvo.props[i][0], tabvo.props[i][1]);
                    }
                    else {
                        UiDraw.clearUI(this.AttrNextAry[i + 2]);
                    }
                }
            }
            else {
                return;
            }
            //现有属性加成情况
            if (this._masterlevvo[type] > 0) {
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrCurAry[0].skinName, ColorType.color802626 + strengthgem.StrengUtil.KeyNameByType[type] + ":  " + ColorType.color9a683f + curtab.level + "级", 14, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrCurAry[1].skinName, ColorType.color802626 + this.KeyByType[type] + ColorType.color9a683f + curtab.need_lv[0] + this.KeyLevNameByType[type], 14, TextAlign.LEFT);
                for (var i = 0; i < this.AttrCurAry.length - 2; i++) {
                    if (i < curtab.props.length) {
                        this.drawAttrVal(this.AttrCurAry[i + 2], curtab.props[i][0], curtab.props[i][1]);
                    }
                    else {
                        UiDraw.clearUI(this.AttrCurAry[i + 2]);
                    }
                }
            }
            else {
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrCurAry[3].skinName, this.KeyByType[type] + curtab.need_lv[0] + this.KeyLevNameByType[type], 14, TextAlign.CENTER, ColorType.color802626);
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrCurAry[4].skinName, "即可获得属性提升", 14, TextAlign.CENTER, ColorType.color802626);
                UiDraw.clearUI(this.AttrCurAry[0]);
                UiDraw.clearUI(this.AttrCurAry[1]);
                UiDraw.clearUI(this.AttrCurAry[2]);
                UiDraw.clearUI(this.AttrCurAry[5]);
                UiDraw.clearUI(this.AttrCurAry[6]);
            }
        };
        masterLevtipsPanel.prototype.getTabAry = function ($type) {
            var comebackary = new Array;
            var ary = tb.TB_equipdevelop_bonus.get_TB_equipdevelop_bonus();
            for (var index = 0; index < ary.length; index++) {
                if (ary[index].type == $type) {
                    comebackary.push(ary[index]);
                }
            }
            return comebackary;
        };
        masterLevtipsPanel.prototype.show = function ($tabid) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this._masterlevvo = GuidData.grow.getMasterLevVo();
            this.setSelectTab($tabid);
        };
        masterLevtipsPanel.prototype.drawAttrVal = function ($ui, $att, $val) {
            var num = Math.floor($val / 100);
            LabelTextFont.writeSingleLabel($ui.uiRender.uiAtlas, $ui.skinName, ColorType.color802626 + getKeyProById($att) + ":    " + ColorType.color9a683f + "+" + Snum(num), 14, TextAlign.LEFT);
        };
        return masterLevtipsPanel;
    }(WindowMinUi));
    strengthgem.masterLevtipsPanel = masterLevtipsPanel;
})(strengthgem || (strengthgem = {}));
//# sourceMappingURL=masterLevtipsPanel.js.map