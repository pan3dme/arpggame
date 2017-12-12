module strengthgem {

    export class StrengTab0 extends UIVirtualContainer {
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
        private a_attr0: UICompenent
        private a_attr1: UICompenent
        private a_nextattr1: UICompenent
        private a_nextattr0: UICompenent
        private a_curlev: UICompenent
        private cnew_btn0: UICompenent
        private cnew_btn1: UICompenent
        private a_maxlevinfo: UICompenent
        private initView(): void {
            var renderLevel = this._baseRender;

            this.EuqUIAry = new Array
            for (var i = 0; i < 10; i++) {
                var t_equ = this.addChild(this._topRender.getComponent("t_equ" + i));
                t_equ.addEventListener(InteractiveEvent.Down, this.equClick, this);
                this.EuqUIAry.push(t_equ);
                this._redPointRender.getRedPointUI(this, 82 + i, new Vector2D(t_equ.x + t_equ.width, t_equ.y));
            }

            this.t_curequ = this.addChild(renderLevel.getComponent("t_curequ"));
            this.t_curname = this.addChild(renderLevel.getComponent("t_curname"));

            this.CostItemUIAry = new Array
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costitem0")));
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costitem1")));
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costnum0")));
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costnum1")));

            this.addUIList(["t_costinfo", "a_info", "t_bg3_1", "t_bg3_0"], this._baseRender);

            this.a_attr0 = this.addChild(renderLevel.getComponent("a_attr0"));
            this.a_attr1 = this.addChild(renderLevel.getComponent("a_attr1"));
            this.a_nextattr1 = this.addChild(renderLevel.getComponent("a_nextattr1"));
            this.a_nextattr0 = this.addChild(renderLevel.getComponent("a_nextattr0"));
            this.a_curlev = this.addChild(renderLevel.getComponent("a_curlev"));


            this.a_maxlevinfo = this.addChild(renderLevel.getComponent("a_maxlevinfo"));

            this.BtnUIAry = new Array
            this.BtnUIAry.push(this.addChild(renderLevel.getComponent("a_btntxt1")));
            this.BtnUIAry.push(this.addChild(renderLevel.getComponent("a_btntxt2")));
            this.cnew_btn0 = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.cnew_btn0, "btnBg0", renderLevel);

            this.cnew_btn1 = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.cnew_btn1, "btnBg1", renderLevel);
            this.BtnUIAry.push(this.cnew_btn0);
            this.BtnUIAry.push(this.cnew_btn1);

            this._publicRender.applyObjData();


            this._btn1RedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.cnew_btn0.x + this.cnew_btn0.width, this.cnew_btn0.y));
            this._btn0RedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.cnew_btn1.x + this.cnew_btn1.width, this.cnew_btn1.y));
        }
        private _btn0RedPoint: RedPointCompenent
        private _btn1RedPoint: RedPointCompenent

        public resize(): void {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            super.resize();
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
                this.EuqUIAry[i].data = NewStrengModel.getInstance().getstrengvo(i + 1);
                // } else if ($value == 1) {
                //     this.EuqUIAry[i].data = NewStrengModel.getInstance().getrefiningvo(i + 1);
                // } else if ($value == 2) {
                //     this.EuqUIAry[i].data = NewStrengModel.getInstance().getGemvo(i + 1);
                // } else {

                // }
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
            this.EuqUIAry[$partid - 1].data = NewStrengModel.getInstance().getstrengvo($partid);
            this.drawEqu(this.EuqUIAry[$partid - 1], this.lastselect == ($partid - 1), StrengUtil.STRENG);
            if (this.lastselect == ($partid - 1)) {
                this.resetData(this.EuqUIAry[$partid - 1].data);
            }
        }

        public refreshEqu() {
            for (var i = 0; i < 10; i++) {
                this.drawEqu(this.EuqUIAry[i], this.lastselect == i, StrengUtil.STRENG);
            }
        }

        private drawEqu($ui: UICompenent, $select: boolean, $type: string) {
            var aa: StrengVo = $ui.data
            var equData = GuidData.bag.getEquByPart(aa.partid);
            if (equData) {
                StrengUtil.setEquIcon($ui, geteqiconIconUrl(equData.entryData.icon), [aa.partlev], $select, $type, equData.entryData.quality, equData.entryData.level);
            } else {
                StrengUtil.setEquNoIcon($ui, aa.partid, [aa.partlev], $select, $type);
            }
        }

        public lastselect: number;
        protected equClick(evt: InteractiveEvent): void {
            for (var i = 0; i < this.EuqUIAry.length; i++) {
                if (this.EuqUIAry[i] == evt.target) {
                    //选中
                    this.lastselect = i;
                    this.drawEqu(this.EuqUIAry[i], true, StrengUtil.STRENG);
                } else {
                    //未选中
                    this.drawEqu(this.EuqUIAry[i], false, StrengUtil.STRENG);
                }
            }

            this.resetData(evt.target.data);
        }

        private _vo: StrengVo
        public resetData($data: StrengVo) {
            this.t_curequ.data = $data;
            this._vo = $data;
            this.drawEqu(this.t_curequ, false, StrengUtil.GENERAL);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.t_curname.skinName, StrengUtil.equProp[$data.partid - 1] + "部位", 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            this.drawResItem();

            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_curlev.skinName, "强化等级  +" + $data.partlev, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_attr0.skinName, "强化等级  +" + $data.partlev, 14, TextAlign.RIGHT, ColorType.Brown7a2f21);
            UiDraw.drawAttVal(this.a_attr1, $data.curtab.props[0][0], $data.curtab.props[0][1], TextAlign.RIGHT);
            if ($data.nexttab) {
                this.drawAddValRight(this.a_nextattr0, $data.partlev + 1, TextAlign.LEFT);
                UiDraw.drawAddValRight(this.a_nextattr1, $data.nexttab.props[0][1], false, TextAlign.LEFT);
            } else {
                UiDraw.clearUI(this.a_nextattr0);
                UiDraw.clearUI(this.a_nextattr1);
            }
            this.a_attr0.x = $data.nexttab ? 393 : 430
            this.a_attr1.x = this.a_attr0.x

            this.setUiListVisibleByItem([this.a_maxlevinfo], $data.state == 0);
            this.setUiListVisibleByItem(this.BtnUIAry, $data.state != 0);

            //红点逻辑
            var strengary: Array<RedPointNode> = RedPointManager.getInstance().getNodeByID(38).children;
            if (strengary[$data.partid - 1].show) {
                // var itemtab: tb.TB_equipdevelop_strength = $data.nexttab ? $data.nexttab : $data.curtab

                // var flagarystreng: Array<boolean> = new Array;
                // for (var j = 0; j < itemtab.cost.length; j++) {
                //     flagarystreng.push(hasEnoughResItem([itemtab.cost[j][0], itemtab.cost[j][1] * 5]));
                // }
                // var aaa: boolean = true;
                // for (var flagid = 0; flagid < flagarystreng.length; flagid++) {
                //     if (!flagarystreng[flagid]) {
                //         aaa = false;
                //         break;
                //     }
                // }
                // this._btn0RedPoint.preShow();
                // if (aaa) {
                //     this._btn1RedPoint.preShow();
                // } else {
                //     this._btn1RedPoint.preHide();
                // }
                this._btn0RedPoint.preShow();
                this._btn1RedPoint.preShow();
            } else {
                this._btn0RedPoint.preHide();
                this._btn1RedPoint.preHide();
            }
        }

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

        private _canbuy: Array<boolean>;
        public drawResItem() {
            var flagary: Array<boolean> = new Array
            var itemtab: tb.TB_equipdevelop_strength = this._vo.nexttab ? this._vo.nexttab : this._vo.curtab
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


        private _canclick: boolean = true;
        // if(this._canclick) {
        //     this._canclick = false;
        //     TimeUtil.addTimeOut(500, () => {
        //         this._canclick = true;
        //     });
        // }else{
        //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
        // }
        public butClik(evt: InteractiveEvent): void {
            if (this._canclick) {
                UiTweenScale.getInstance().changeButSize(evt.target);
                this._canclick = false;
                TimeUtil.addTimeOut(btnClickTime, () => {
                    this._canclick = true;
                });
                switch (evt.target) {
                    case this.cnew_btn0:
                        // if (this._vo.partlev >= GuidData.player.getLevel()) {
                        //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "不可超过人物等级", 99);
                        //     return;
                        // }
                        var bbb: boolean = false;
                        var minLev: number = 1000;
                        var flagPart: number;
                        for (var i: number = 0; i < 10; i++) {
                            var strengVo: StrengVo = NewStrengModel.getInstance().getstrengvo(i + 1);
                            if (strengVo.state == 1 && strengVo.partlev < GuidData.player.getLevel()) {
                                var itemtab: tb.TB_equipdevelop_strength = strengVo.nexttab ? strengVo.nexttab : strengVo.curtab
                                var flagarystreng: Array<boolean> = new Array;
                                for (var j = 0; j < itemtab.cost.length; j++) {
                                    flagarystreng.push(hasEnoughResItem(itemtab.cost[j]));
                                }
                                var cansend: boolean = true;
                                for (var flagid = 0; flagid < flagarystreng.length; flagid++) {
                                    if (!flagarystreng[flagid]) {
                                        cansend = false;
                                        break;
                                    }
                                }
                                bbb = cansend;
                                if (bbb) {
                                    break;
                                }

                                //记录下最小等级的部位
                                if (minLev > strengVo.partlev) {
                                    minLev = strengVo.partlev;
                                    flagPart = i;
                                }
                            }
                        }
                        if (bbb) {
                            NetManager.getInstance().protocolos.equipdevelop_operate(SharedDef.EQUIPDEVELOP_TYPE_STRENGTH_ALL, 0, 0, "", "");
                        } else {
                            // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                            if(minLev == 1000){
                                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "不可超过人物等级", 99);
                                return;
                            }
                            var strengVo1: StrengVo = NewStrengModel.getInstance().getstrengvo(flagPart + 1);
                            var itemtab1: tb.TB_equipdevelop_strength = strengVo1.nexttab ? strengVo1.nexttab : strengVo1.curtab
                            var $idx = hasEnoughResItem(itemtab1.cost[0]) ? itemtab1.cost[1][0] : itemtab1.cost[0][0]

                            var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                            $aaa.data = $idx
                            ModuleEventManager.dispatchEvent($aaa);
                        }
                        UIManager.popClikNameFun("cnew_btn1");
                        break;
                    case this.cnew_btn1:
                        // if (GuidData.player.getResType(this._vo.curtab.cost[0][0]) >= this._vo.curtab.cost[0][1])){
                        if (this._vo.partlev >= GuidData.player.getLevel()) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "不可超过人物等级", 99);
                            return;
                        }
                        this.sendStreng(1);
                        // }
                        UIManager.popClikNameFun("cnew_btn1");
                        break;
                    default:
                        break;
                }
            } else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
            }
        }

        private sendStreng($num: number) {
            var $canbuy: boolean;
            var $idx: number;
            var itemtab: tb.TB_equipdevelop_strength = this._vo.nexttab ? this._vo.nexttab : this._vo.curtab
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
                // var type: number = $num == 1 ? SharedDef.EQUIPDEVELOP_TYPE_STRENGTH_LVUP : SharedDef.EQUIPDEVELOP_TYPE_STRENGTH_ALL
                NetManager.getInstance().protocolos.equipdevelop_operate(SharedDef.EQUIPDEVELOP_TYPE_STRENGTH_LVUP, this._vo.partid, $num, "", "");
            } else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                $aaa.data = $idx
                ModuleEventManager.dispatchEvent($aaa);
            }
        }
    }
}