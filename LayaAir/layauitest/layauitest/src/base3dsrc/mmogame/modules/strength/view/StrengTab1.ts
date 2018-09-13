module strengthgem {

    export class StrengTab1 extends UIVirtualContainer {
        private _publicRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _redPointRender: RedPointRender;
        private _effRender: FrameUIRender;

        public dispose(): void {
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
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._publicRender = new UIRenderComponent;
            this.addRender(this._publicRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);
        }

        public initUiAtlas($uiAtlas, $publicuiAtlas): void {
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        }

        private EuqUIAry: Array<UICompenent>
        private CostItemUIAry: Array<UICompenent>
        private BtnUIAry: Array<UICompenent>
        private t_curequ: UICompenent
        private t_curname: UICompenent
        private b_attr0: UICompenent
        private b_attr1: UICompenent
        private b_attr2: UICompenent
        private b_nextattr1: UICompenent
        private b_nextattr0: UICompenent
        private b_nextattr2: UICompenent
        private a_curlev: UICompenent
        private cnew_btn: UICompenent
        private a_maxlevinfo: UICompenent
        private b_okrare: UICompenent
        private e_item: UICompenent
        private b_okrare_txt: UICompenent
        private e_upicon: UICompenent
        private e_selbtn: SelectButton
        private initView(): void {
            var renderLevel = this._baseRender;

            this.EuqUIAry = new Array
            for (var i = 0; i < 10; i++) {
                var t_equ = this.addChild(this._topRender.getComponent("t_equ" + i));
                t_equ.addEventListener(InteractiveEvent.Down, this.equClick, this);
                this.EuqUIAry.push(t_equ);
                this._redPointRender.getRedPointUI(this, 92 + i, new Vector2D(t_equ.x + t_equ.width, t_equ.y));


            }

            this.t_curequ = this.addChild(renderLevel.getComponent("t_curequ"));
            this.t_curname = this.addChild(renderLevel.getComponent("t_curname"));

            this.CostItemUIAry = new Array
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costitem0")));
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costitem1")));
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costnum0")));
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costnum1")));

            this.addUIList(["t_costinfo", "e_bg3_3", "e_bg3_2", "e_bg3_1", "e_bg3_0"], this._baseRender);


            this.b_attr0 = this.addChild(renderLevel.getComponent("e_attr0"));
            this.b_attr1 = this.addChild(renderLevel.getComponent("e_attr1"));
            this.b_attr2 = this.addChild(renderLevel.getComponent("e_attr2"));
            this.e_item = this.addChild(renderLevel.getComponent("e_item"));
            this.b_nextattr1 = this.addChild(renderLevel.getComponent("e_nextattr1"));
            this.b_nextattr0 = this.addChild(renderLevel.getComponent("e_nextattr0"));
            this.b_nextattr2 = this.addChild(renderLevel.getComponent("e_nextattr2"));
            this.a_curlev = this.addChild(renderLevel.getComponent("a_curlev"));


            this.a_maxlevinfo = this.addChild(renderLevel.getComponent("a_maxlevinfo"));
            this.b_okrare = this.addChild(this._topRender.getComponent("b_okrare"));

            this.e_upicon = this.addChild(this._topRender.getComponent("e_upicon"));
            this.b_okrare_txt = this.addChild(this._topRender.getComponent("b_okrare_txt"));
            // this.e_selbtn = <SelectButton>this.addEvntBut("e_selbtn", this._topRender);
            this.e_selbtn = <SelectButton>this.addChild(this._topRender.getComponent("e_selbtn"));

            this.BtnUIAry = new Array
            this.BtnUIAry.push(this.addChild(renderLevel.getComponent("b_btntxt")));
            this.BtnUIAry.push(this.addChild(renderLevel.getComponent("b_txtbge")));
            this.BtnUIAry.push(this.b_okrare_txt);
            this.BtnUIAry.push(this.b_okrare);
            this.BtnUIAry.push(this.e_selbtn);
            this.BtnUIAry.push(this.e_upicon);
            this.cnew_btn = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.cnew_btn, "btnBg", renderLevel);
            this.BtnUIAry.push(this.cnew_btn);

            this._publicRender.applyObjData();

            this._btnRedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.cnew_btn.x + this.cnew_btn.width, this.cnew_btn.y));
        }
        private _btnRedPoint: RedPointCompenent

        public resize(): void {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            super.resize();
        }


        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            //初始化euq数据
            this.InitEqu();
            this.resize();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

        private InitEqu() {
            for (var i = 0; i < 10; i++) {
                this.EuqUIAry[i].data = NewStrengModel.getInstance().getrefiningvo(i + 1);
                //     this.EuqUIAry[i].data = NewStrengModel.getInstance().getGemvo(i + 1);
            }
            //模拟选中第一条数据
            var evt: InteractiveEvent = new InteractiveEvent(InteractiveEvent.Down);
            evt.target = this.EuqUIAry[0];
            this.equClick(evt);
        }

        /**
         * 某个部位数据变化时，刷新单个部位
         * @param  
         * @param  
         * @param  
         */
        public refreshPartChg($partid: number) {
            this.EuqUIAry[$partid - 1].data = NewStrengModel.getInstance().getrefiningvo($partid);
            this.drawEqu(this.EuqUIAry[$partid - 1], this.lastselect == ($partid - 1), StrengUtil.REFINING);
            if (this.lastselect == ($partid - 1)) {
                this.resetData(this.EuqUIAry[$partid - 1].data);
            }
        }


        private expEff: FrameTipCompenent;
        public showExpEff(): void {

            if (!this._effRender) {
                this._effRender = new FrameUIRender();
                this.addRender(this._effRender);
                this._effRender.setImg(getEffectUIUrl("ui_qh"), 4, 4, ($ui: any) => {
                    this.expEff = $ui;
                    this.expEff.x = this.t_curequ.x - 58;
                    this.expEff.y = this.t_curequ.y - 58;
                    this.expEff.width = this.expEff.baseRec.width * 1.5;
                    this.expEff.height = this.expEff.baseRec.height * 1.5;
                    this.expEff.speed = 3;
                    this.expEff.playOne(this);
                })
            }
            if (this.expEff) {
                this.expEff.playOne(this);
            }
        }

        public refreshEqu() {
            for (var i = 0; i < 10; i++) {
                this.drawEqu(this.EuqUIAry[i], this.lastselect == i, StrengUtil.REFINING);
            }
        }

        private drawEqu($ui: UICompenent, $select: boolean, $type: string) {
            var aa: RefiningVo = $ui.data
            var equData = GuidData.bag.getEquByPart(aa.partid);
            if (equData) {
                StrengUtil.setEquIcon($ui, geteqiconIconUrl(equData.entryData.icon), [aa.partlevstar[1]], $select, $type, equData.entryData.quality, equData.entryData.realmbreak_level);
            } else {
                StrengUtil.setEquNoIcon($ui, aa.partid, [aa.partlevstar[1]], $select, $type);
            }
        }

        public lastselect: number;
        protected equClick(evt: InteractiveEvent): void {
            for (var i = 0; i < this.EuqUIAry.length; i++) {
                if (this.EuqUIAry[i] == evt.target) {
                    //选中
                    this.lastselect = i;
                    this.drawEqu(this.EuqUIAry[i], true, StrengUtil.REFINING);
                } else {
                    //未选中
                    this.drawEqu(this.EuqUIAry[i], false, StrengUtil.REFINING);
                }
            }

            this.resetData(evt.target.data);
        }

        private _vo: RefiningVo
        public resetData($data: RefiningVo) {
            this.t_curequ.data = $data;
            this._vo = $data;
            this.drawEqu(this.t_curequ, false, StrengUtil.GENERAL);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.t_curname.skinName, StrengUtil.equProp[$data.partid - 1] + "部位", 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            this.drawResItem();

            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_curlev.skinName, "精炼等级：  +" + $data.partlevstar[1], 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            var chanceinfo: string = "";
            if ($data.nexttab) {
                chanceinfo += ColorType.Brown7a2f21 + "成功概率:  " + ColorType.color9a683f + ($data.nexttab.chance / 100) + "%"
                if ($data.nexttab.fail_to_star != $data.curtab.star) {
                    chanceinfo += ColorType.colorce0a00 + "(失败则降到+" + $data.nexttab.fail_to_star + ")"
                }
            } else {
                chanceinfo += "已达最高级"
            }

            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.e_item.skinName, chanceinfo, 14, TextAlign.CENTER, ColorType.Brown7a2f21);

            var textAlign:string
            // LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_attr1.skinName, "所有属性  +" + ColorType.color9a683f + $data.curtab.improve + "%", 14, TextAlign.RIGHT, ColorType.Brown7a2f21);
            if ($data.nexttab) {
                textAlign = TextAlign.RIGHT;
                this.drawAddValRight(this.b_nextattr0, $data.nexttab.star, TextAlign.LEFT);
                // this.drawAddValRight(this.b_nextattr1, $data.nexttab.improve + "%");
                UiDraw.drawAddValRight(this.b_nextattr1, $data.nexttab.props[0][1], false, TextAlign.LEFT);
                UiDraw.drawAddValRight(this.b_nextattr2, $data.nexttab.props[1][1], false, TextAlign.LEFT);
            } else {
                textAlign = TextAlign.CENTER;
                UiDraw.clearUI(this.b_nextattr0);
                UiDraw.clearUI(this.b_nextattr1);
                UiDraw.clearUI(this.b_nextattr2);
            }

            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_attr0.skinName, ColorType.Brown7a2f21 + "精炼等级   +" + ColorType.color9a683f + $data.partlevstar[1], 14, textAlign, ColorType.Brown7a2f21);
            UiDraw.drawAttVal(this.b_attr1, $data.curtab.props[0][0], $data.curtab.props[0][1], textAlign);
            UiDraw.drawAttVal(this.b_attr2, $data.curtab.props[1][0], $data.curtab.props[1][1], textAlign);

            this.b_attr0.x = $data.nexttab ? 399 : 458
            this.b_attr1.x = this.b_attr0.x
            this.b_attr2.x = this.b_attr0.x

            this.setUiListVisibleByItem([this.a_maxlevinfo], $data.state == 0);
            this.setUiListVisibleByItem(this.BtnUIAry, $data.state != 0);

            this.setResItem();

            //红点逻辑
            var refiningary: Array<RedPointNode> = RedPointManager.getInstance().getNodeByID(41).children;
            if (refiningary[$data.partid - 1].show) {
                this._btnRedPoint.preShow();
            } else {
                this._btnRedPoint.preHide();
            }
        }

        public setResItem() {
            var itemtab: tb.TB_equipdevelop_refine = this._vo.nexttab ? this._vo.nexttab : this._vo.curtab
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_okrare_txt.skinName, ColorType.Brown7a2f21 + "成功率" + ColorType.Green2ca937 + "+" + (itemtab.advance_chance / 100) + "%", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            var flag: number = GuidData.bag.getItemCount(itemtab.advance_cost[0][0])
            if (flag > 0) {
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_okrare.skinName, "剩余道具: " + flag, 14, TextAlign.CENTER, ColorType.Brown7a2f21,"",17);
            } else {
                UiDraw.drawRewardIconAndtxt(this.b_okrare, itemtab.advance_by_money[0], true, TextAlign.LEFT, 10);
            }
            IconManager.getInstance().drawItemIcon40(this.e_upicon, itemtab.advance_cost[0][0]);
        }

        private _canbuy: Array<boolean>;
        public drawResItem() {
            var flagary: Array<boolean> = new Array
            var itemtab: tb.TB_equipdevelop_refine = this._vo.nexttab ? this._vo.nexttab : this._vo.curtab
            for (var i = 0; i < 2; i++) {
                if (i < itemtab.cost.length) {
                    IconManager.getInstance().drawItemIcon40(this.CostItemUIAry[i], itemtab.cost[i][0]);
                    //绘制消耗资源图标，并把资源满足情况记录下来
                    flagary.push(UiDraw.drawResHasNumAndAllNum(this.CostItemUIAry[i + 2], itemtab.cost[i]));
                    //调整位置
                    this.CostItemUIAry[0].x = itemtab.cost.length == 1 ? 528 : 484
                    this.CostItemUIAry[2].x = itemtab.cost.length == 1 ? 516 : 463
                } else {
                    UiDraw.clearUI(this.CostItemUIAry[i + 2]);
                    UiDraw.clearUI(this.CostItemUIAry[i]);
                }
            }
            this._canbuy = flagary;
        }

        /**绘制增加属性 向右箭头 $align只接受左右对齐*/
        // private drawAddValRight($ui: UICompenent, $val: string): void {
        //     var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
        //     var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

        //     UiDraw.cxtDrawImg(ctx, PuiData.ARROW_RIGHT, new Rectangle(0, 3, 16, 12), UIData.publicUi);
        //     LabelTextFont.writeSingleLabelToCtx(ctx, $val, 14, 22, 0, TextAlign.LEFT, ColorType.Green2ca937);
        //     $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        // }

        public drawAddValRight($ui: UICompenent, $val: number, $align: string = TextAlign.RIGHT): void {
            // var addStr: string = "";
            if ($val >= 0) {
                // addStr = Snum($val);
                var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                UiDraw.cxtDrawImg(ctx, PuiData.ARROW_RIGHT, new Rectangle(0, 3, 16, 12), UIData.publicUi);
                var addStr: string = "+" + $val;
                var tx: number = 0;
                if ($align == TextAlign.LEFT) {
                    tx = 22;
                }
                LabelTextFont.writeSingleLabelToCtx(ctx, addStr, 14, tx, 0, $align, ColorType.Green2ca937);
                $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            } else {
                UiDraw.clearUI($ui);
            }
        }


        public butClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                // case this.e_selbtn:
                //     this.e_selbtn.selected = !this.e_selbtn.selected;
                //     break;
                case this.cnew_btn:
                    this.sendStreng(1);
                    break;
                default:
                    break;
            }
        }

        private _canclick: boolean = true;
        private sendStreng($num: number) {
            if (this._canclick) {
                this._canclick = false;
                TimeUtil.addTimeOut(btnClickTime, () => {
                    this._canclick = true;
                });
                var $canbuy: boolean;
                var $idx: number;
                var itemtab: tb.TB_equipdevelop_refine = this._vo.nexttab ? this._vo.nexttab : this._vo.curtab
                if (this._canbuy.length == 2) {
                    $canbuy = this._canbuy[0] && this._canbuy[1];
                    if (!$canbuy) {
                        $idx = this._canbuy[0] ? itemtab.cost[1][0] : itemtab.cost[0][0]
                    }
                } else {
                    $canbuy = this._canbuy[0]
                    if (!$canbuy) {
                        $idx = itemtab.cost[0][0]
                    }
                }


                if ($canbuy) {

                    var num: number = GuidData.bag.getItemCount(itemtab.advance_cost[0][0])
                    var type: number = -1;
                    if (!this.e_selbtn.selected) {
                        type = 0;
                    } else {
                        if (num > 0) {
                            type = 1;
                        } else {
                            if (GuidData.player.getResType(itemtab.advance_by_money[0][0]) >= itemtab.advance_by_money[0][1]) {
                                type = 2;
                            } else {
                                var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                                $aaa.data = itemtab.advance_by_money[0][0]
                                ModuleEventManager.dispatchEvent($aaa);
                                this.e_selbtn.selected = false;
                                return;
                            }
                        }
                    }

                    if (this._vo.curtab && this._vo.curtab.star >= 10) {
                        AlertUtil.show("精炼失败后装备精炼等级将掉为0级，是否继续？", "提示", (a: any) => {
                            if (a == 1) {
                                NetManager.getInstance().protocolos.equipdevelop_operate(SharedDef.EQUIPDEVELOP_TYPE_REFINE_STAR_LVUP, this._vo.partid, type, "", "");
                            }
                        }, 2, ["是", "否"])
                    }else{
                        NetManager.getInstance().protocolos.equipdevelop_operate(SharedDef.EQUIPDEVELOP_TYPE_REFINE_STAR_LVUP, this._vo.partid, type, "", "");
                    }
                    //console.log("--------type------------", type);
                } else {
                    // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                    var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                    $aaa.data = $idx
                    ModuleEventManager.dispatchEvent($aaa);
                }
            } else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
            }
        }
    }
}