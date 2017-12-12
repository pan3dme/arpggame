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
    var StrengTab1 = /** @class */ (function (_super) {
        __extends(StrengTab1, _super);
        function StrengTab1() {
            var _this = _super.call(this) || this;
            _this._canclick = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._publicRender = new UIRenderComponent;
            _this.addRender(_this._publicRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._redPointRender = new RedPointRender;
            _this.addRender(_this._redPointRender);
            return _this;
        }
        StrengTab1.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;
            if (this._effRender) {
                this._effRender.dispose();
                this._effRender = null;
            }
        };
        StrengTab1.prototype.initUiAtlas = function ($uiAtlas, $publicuiAtlas) {
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        StrengTab1.prototype.initView = function () {
            var renderLevel = this._baseRender;
            this.EuqUIAry = new Array;
            this.StarUIAry = new Array;
            for (var i = 0; i < 10; i++) {
                var t_equ = this.addChild(this._topRender.getComponent("t_equ" + i));
                t_equ.addEventListener(InteractiveEvent.Down, this.equClick, this);
                this.EuqUIAry.push(t_equ);
                this._redPointRender.getRedPointUI(this, 92 + i, new Vector2D(t_equ.x + t_equ.width, t_equ.y));
                this.StarUIAry.push(this.addChild(this._topRender.getComponent("b_star" + i)));
            }
            this.t_curequ = this.addChild(renderLevel.getComponent("t_curequ"));
            this.t_curname = this.addChild(renderLevel.getComponent("t_curname"));
            this.CostItemUIAry = new Array;
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costitem0")));
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costitem1")));
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costnum0")));
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costnum1")));
            this.addUIList(["t_costinfo", "b_bg3_2", "b_bg3_1", "b_bg3_0"], this._baseRender);
            this.b_attr0 = this.addChild(renderLevel.getComponent("b_attr0"));
            this.b_attr1 = this.addChild(renderLevel.getComponent("b_attr1"));
            this.b_attr2 = this.addChild(renderLevel.getComponent("b_attr2"));
            this.b_nextattr1 = this.addChild(renderLevel.getComponent("b_nextattr1"));
            this.b_nextattr0 = this.addChild(renderLevel.getComponent("b_nextattr0"));
            this.b_nextattr2 = this.addChild(renderLevel.getComponent("b_nextattr2"));
            this.a_curlev = this.addChild(renderLevel.getComponent("a_curlev"));
            this.a_maxlevinfo = this.addChild(renderLevel.getComponent("a_maxlevinfo"));
            this.b_okrare = this.addChild(renderLevel.getComponent("b_okrare"));
            this.BtnUIAry = new Array;
            this.BtnUIAry.push(this.addChild(renderLevel.getComponent("b_btntxt")));
            this.BtnUIAry.push(this.addChild(renderLevel.getComponent("b_info1")));
            this.BtnUIAry.push(this.addChild(renderLevel.getComponent("b_txtbg")));
            this.BtnUIAry.push(this.addChild(this._topRender.getComponent("b_okrare_txt")));
            this.BtnUIAry.push(this.b_okrare);
            this.cnew_btn = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.cnew_btn, "btnBg", renderLevel);
            this.BtnUIAry.push(this.cnew_btn);
            this._publicRender.applyObjData();
            this._btnRedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.cnew_btn.x + this.cnew_btn.width, this.cnew_btn.y));
        };
        StrengTab1.prototype.resize = function () {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            _super.prototype.resize.call(this);
        };
        StrengTab1.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            //初始化euq数据
            this.InitEqu();
            this.resize();
        };
        StrengTab1.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        StrengTab1.prototype.InitEqu = function () {
            for (var i = 0; i < 10; i++) {
                this.EuqUIAry[i].data = strengthgem.NewStrengModel.getInstance().getrefiningvo(i + 1);
                //     this.EuqUIAry[i].data = NewStrengModel.getInstance().getGemvo(i + 1);
            }
            //模拟选中第一条数据
            var evt = new InteractiveEvent(InteractiveEvent.Down);
            evt.target = this.EuqUIAry[0];
            this.equClick(evt);
        };
        /**
         * 某个部位数据变化时，刷新单个部位
         * @param
         * @param
         * @param
         */
        StrengTab1.prototype.refreshPartChg = function ($partid) {
            this.EuqUIAry[$partid - 1].data = strengthgem.NewStrengModel.getInstance().getrefiningvo($partid);
            this.drawEqu(this.EuqUIAry[$partid - 1], this.lastselect == ($partid - 1), strengthgem.StrengUtil.REFINING);
            if (this.lastselect == ($partid - 1)) {
                this.resetData(this.EuqUIAry[$partid - 1].data);
            }
        };
        StrengTab1.prototype.showExpEff = function () {
            var _this = this;
            if (!this._effRender) {
                this._effRender = new FrameUIRender();
                this.addRender(this._effRender);
                this._effRender.setImg(getEffectUIUrl("ui_qh"), 4, 4, function ($ui) {
                    _this.expEff = $ui;
                    _this.expEff.x = _this.t_curequ.x - 58;
                    _this.expEff.y = _this.t_curequ.y - 58;
                    _this.expEff.width = _this.expEff.baseRec.width * 1.5;
                    _this.expEff.height = _this.expEff.baseRec.height * 1.5;
                    _this.expEff.speed = 3;
                    _this.expEff.playOne(_this);
                });
            }
            if (this.expEff) {
                this.expEff.playOne(this);
            }
        };
        StrengTab1.prototype.refreshEqu = function () {
            for (var i = 0; i < 10; i++) {
                this.drawEqu(this.EuqUIAry[i], this.lastselect == i, strengthgem.StrengUtil.REFINING);
            }
        };
        StrengTab1.prototype.drawEqu = function ($ui, $select, $type) {
            var aa = $ui.data;
            var equData = GuidData.bag.getEquByPart(aa.partid);
            if (equData) {
                strengthgem.StrengUtil.setEquIcon($ui, geteqiconIconUrl(equData.entryData.icon), aa.partlevstar, $select, $type, equData.entryData.quality, equData.entryData.level);
            }
            else {
                strengthgem.StrengUtil.setEquNoIcon($ui, aa.partid, aa.partlevstar, $select, $type);
            }
        };
        StrengTab1.prototype.equClick = function (evt) {
            for (var i = 0; i < this.EuqUIAry.length; i++) {
                if (this.EuqUIAry[i] == evt.target) {
                    //选中
                    this.lastselect = i;
                    this.drawEqu(this.EuqUIAry[i], true, strengthgem.StrengUtil.REFINING);
                }
                else {
                    //未选中
                    this.drawEqu(this.EuqUIAry[i], false, strengthgem.StrengUtil.REFINING);
                }
            }
            this.resetData(evt.target.data);
        };
        StrengTab1.prototype.resetData = function ($data) {
            this.t_curequ.data = $data;
            this._vo = $data;
            this.drawEqu(this.t_curequ, false, strengthgem.StrengUtil.GENERAL);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.t_curname.skinName, strengthgem.StrengUtil.equProp[$data.partid - 1] + "部位", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.drawResItem();
            for (var i = 0; i < 10; i++) {
                if ($data.partlevstar[1] > i) {
                    this.StarUIAry[i].goToAndStop(0);
                }
                else {
                    this.StarUIAry[i].goToAndStop(1);
                }
            }
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_curlev.skinName, "精炼等级：  " + $data.partlevstar[0] + "段" + $data.partlevstar[1] + "星", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_attr0.skinName, "精炼等级   " + ColorType.color9a683f + $data.partlevstar[0] + "段" + $data.partlevstar[1] + "星", 14, TextAlign.RIGHT, ColorType.Brown7a2f21);
            UiDraw.drawAttVal(this.b_attr1, $data.curtab.props[0][0], $data.curtab.props[0][1], TextAlign.RIGHT);
            UiDraw.drawAttVal(this.b_attr2, $data.curtab.props[1][0], $data.curtab.props[1][1], TextAlign.RIGHT);
            // LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_attr1.skinName, "所有属性  +" + ColorType.color9a683f + $data.curtab.improve + "%", 14, TextAlign.RIGHT, ColorType.Brown7a2f21);
            if ($data.nexttab) {
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_okrare.skinName, $data.nexttab.chance + "%", 16, TextAlign.CENTER, ColorType.colorce0a00);
                this.drawAddValRight(this.b_nextattr0, ColorType.color9a683f + $data.nexttab.rank + "段" + $data.nexttab.star + "星");
                // this.drawAddValRight(this.b_nextattr1, $data.nexttab.improve + "%");
                UiDraw.drawAddValRight(this.b_nextattr1, $data.nexttab.props[0][1], false, TextAlign.LEFT);
                UiDraw.drawAddValRight(this.b_nextattr2, $data.nexttab.props[1][1], false, TextAlign.LEFT);
            }
            else {
                UiDraw.clearUI(this.b_nextattr0);
                UiDraw.clearUI(this.b_nextattr1);
                UiDraw.clearUI(this.b_nextattr2);
            }
            this.b_attr0.x = $data.nexttab ? 379 : 433;
            this.b_attr1.x = this.b_attr0.x;
            this.b_attr2.x = this.b_attr0.x;
            this.setUiListVisibleByItem([this.a_maxlevinfo], $data.state == 0);
            this.setUiListVisibleByItem(this.BtnUIAry, $data.state != 0);
            //红点逻辑
            var refiningary = RedPointManager.getInstance().getNodeByID(41).children;
            if (refiningary[$data.partid - 1].show) {
                this._btnRedPoint.preShow();
            }
            else {
                this._btnRedPoint.preHide();
            }
        };
        StrengTab1.prototype.drawResItem = function () {
            var flagary = new Array;
            var itemtab = this._vo.nexttab ? this._vo.nexttab : this._vo.curtab;
            for (var i = 0; i < 2; i++) {
                if (i < itemtab.cost.length) {
                    IconManager.getInstance().drawItemIcon40(this.CostItemUIAry[i], itemtab.cost[i][0]);
                    //绘制消耗资源图标，并把资源满足情况记录下来
                    flagary.push(UiDraw.drawResHasNumAndAllNum(this.CostItemUIAry[i + 2], itemtab.cost[i]));
                    //调整位置
                    this.CostItemUIAry[0].x = itemtab.cost.length == 1 ? 528 : 484;
                    this.CostItemUIAry[2].x = itemtab.cost.length == 1 ? 516 : 463;
                }
                else {
                    UiDraw.clearUI(this.CostItemUIAry[i + 2]);
                    UiDraw.clearUI(this.CostItemUIAry[i]);
                }
            }
            this._canbuy = flagary;
        };
        /**绘制增加属性 向右箭头 $align只接受左右对齐*/
        StrengTab1.prototype.drawAddValRight = function ($ui, $val) {
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.ARROW_RIGHT, new Rectangle(0, 3, 16, 12), UIData.publicUi);
            LabelTextFont.writeSingleLabelToCtx(ctx, $val, 14, 22, 0, TextAlign.LEFT, ColorType.Green2ca937);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        StrengTab1.prototype.butClik = function (evt) {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                // case this.b_detailsbtn:
                //     var equData = GuidData.bag.getEquByPart(this._vo.partid);
                //     if (equData) {
                //         var $evttt = new StrengthGemEvent(StrengthGemEvent.SHOW_REFINING_TIPS_EVENT);
                //         // $evttt.data = [this._vo.partid, (this._vo.curtab.improve / 100)];
                //         $evttt.data = [this._vo.partid, 1];
                //         ModuleEventManager.dispatchEvent($evttt);
                //     } else {
                //         msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "请穿戴上相应装备后查看", 99);
                //     }
                //     break;
                case this.cnew_btn:
                    this.sendStreng(1);
                    break;
                default:
                    break;
            }
        };
        StrengTab1.prototype.sendStreng = function ($num) {
            var _this = this;
            if (this._canclick) {
                this._canclick = false;
                TimeUtil.addTimeOut(btnClickTime, function () {
                    _this._canclick = true;
                });
                var $canbuy;
                var $idx;
                var itemtab = this._vo.nexttab ? this._vo.nexttab : this._vo.curtab;
                if (this._canbuy.length == 2) {
                    $canbuy = this._canbuy[0] && this._canbuy[1];
                    if (!$canbuy) {
                        $idx = this._canbuy[0] ? itemtab.cost[1][0] : itemtab.cost[0][0];
                    }
                }
                else {
                    $canbuy = this._canbuy[0];
                    if (!$canbuy) {
                        $idx = itemtab.cost[0][0];
                    }
                }
                if ($canbuy) {
                    var type;
                    if (this._vo.curtab.lvup_type == 1) {
                        type = SharedDef.EQUIPDEVELOP_TYPE_REFINE_STAR_LVUP;
                    }
                    else if (this._vo.curtab.lvup_type == 2) {
                        type = SharedDef.EQUIPDEVELOP_TYPE_REFINE_RANK_LVUP;
                    }
                    NetManager.getInstance().protocolos.equipdevelop_operate(type, this._vo.partid, 1, "", "");
                }
                else {
                    // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                    var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                    $aaa.data = $idx;
                    ModuleEventManager.dispatchEvent($aaa);
                }
            }
            else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
            }
        };
        return StrengTab1;
    }(UIVirtualContainer));
    strengthgem.StrengTab1 = StrengTab1;
})(strengthgem || (strengthgem = {}));
//# sourceMappingURL=StrengTab1.js.map