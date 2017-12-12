module strengthgem {

    export class StrengTab3 extends UIVirtualContainer {
        private _publicRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _effRender: FrameUIRender;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
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
            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
        }

        public initUiAtlas($uiAtlas, $publicuiAtlas): void {
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._bgRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        }

        private EuqUIAry: Array<UICompenent>
        private CostItemUIAry: Array<UICompenent>
        private BtnUI0Ary: Array<UICompenent>
        private BtnUI1Ary: Array<UICompenent>
        private Attr0Ary: Array<UICompenent>
        private Attr1Ary: Array<UICompenent>
        private ProbgAry: Array<UICompenent>
        private Probg1Ary: Array<UICompenent>
        private ProAry: Array<UICompenent>
        private Pro1Ary: Array<UICompenent>
        private AttrnameAry: Array<UICompenent>
        private AttrnameAry_n: Array<UICompenent>
        private t_curequ: UICompenent
        private t_curname: UICompenent
        private btn0: UICompenent
        private btn1: UICompenent
        private btn2: UICompenent
        private d_force0: UICompenent
        private d_force1: UICompenent
        private d_bg3_1: UICompenent
        private d_forceArrow: FrameCompenent
        private initView(): void {
            var renderLevel = this._baseRender;

            this.EuqUIAry = new Array
            for (var i = 0; i < 10; i++) {
                var t_equ = this.addChild(this._topRender.getComponent("t_equ" + i));
                t_equ.addEventListener(InteractiveEvent.Up, this.equClick, this);
                this.EuqUIAry.push(t_equ);
            }

            this.t_curequ = this.addChild(renderLevel.getComponent("t_curequ"));
            this.t_curname = this.addChild(renderLevel.getComponent("t_curname"));
            this.d_bg3_1 = this.addChild(this._bgRender.getComponent("d_bg3_1"));

            this.addUIList(["t_costinfo", "d_bg3_0", "d_arrow"], this._bgRender);

            this.BtnUI0Ary = new Array
            this.btn0 = this.addEvntButUp("cnew_btn2", this._publicRender);
            this.setSizeForPanelUiCopy(this.btn0, "d_btn0", renderLevel);
            this.BtnUI0Ary.push(this.btn0);
            this.BtnUI0Ary.push(renderLevel.getComponent("d_btntxt0"));

            this.BtnUI1Ary = new Array
            this.btn1 = this.addEvntButUp("cnew_btn2", this._publicRender);
            this.setSizeForPanelUiCopy(this.btn1, "d_btn1", renderLevel);
            this.BtnUI1Ary.push(this.btn1);
            this.btn2 = this.addEvntButUp("cnew_btn2", this._publicRender);
            this.setSizeForPanelUiCopy(this.btn2, "d_btn2", renderLevel);
            this.BtnUI1Ary.push(this.btn2);
            this.BtnUI1Ary.push(renderLevel.getComponent("d_btntxt1"));
            this.BtnUI1Ary.push(renderLevel.getComponent("d_btntxt2"));


            this.d_force0 = this.addChild(renderLevel.getComponent("d_force0"));
            this.d_force1 = this.addChild(renderLevel.getComponent("d_force1"));
            this.d_forceArrow = <FrameCompenent>this._topRender.getComponent("d_forceArrow");

            this.Attr0Ary = new Array
            this.Attr1Ary = new Array
            this.ProbgAry = new Array
            this.Probg1Ary = new Array
            this.ProAry = new Array
            this.Pro1Ary = new Array
            this.AttrnameAry = new Array
            this.AttrnameAry_n = new Array
            for (var j = 0; j < 6; j++) {
                this.Attr0Ary.push(this.addChild(this._topRender.getComponent("d_attr" + j)));
                this.Attr1Ary.push(this.addChild(this._topRender.getComponent("d_nattr" + j)));

                this.ProbgAry.push(this.addChild(this._bgRender.getComponent("d_probg" + j)));
                this.ProAry.push(this.addChild(this._baseRender.getComponent("d_pro" + j)));
                this.Probg1Ary.push(this.addChild(this._bgRender.getComponent("d_nprobg" + j)));
                this.Pro1Ary.push(this.addChild(this._baseRender.getComponent("d_npro" + j)));
                this.AttrnameAry.push(this.addChild(this._baseRender.getComponent("d_attrname" + j)));
                this.AttrnameAry_n.push(this.addChild(this._baseRender.getComponent("d_nattrname" + j)));
            }

            this.CostItemUIAry = new Array
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costitem0")));
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costitem1")));
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costnum0")));
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costnum1")));

            this._publicRender.applyObjData();
        }

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
            if (this.canshowAlert()) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }

        public refreshEqu() {
            for (var i = 0; i < 10; i++) {
                this.drawEqu(this.EuqUIAry[i], this._lastselect == i, StrengUtil.GENERAL);
            }
        }

        private InitEqu() {
            for (var i = 0; i < 10; i++) {
                //部位id
                this.EuqUIAry[i].data = i + 1;
            }

            var vo = this.getCurWashVo();
            var selectid: number = vo ? vo.partid - 1 : 0;
            //模拟选中第一条数据
            var evt: InteractiveEvent = new InteractiveEvent(InteractiveEvent.Up);
            evt.target = this.EuqUIAry[selectid];
            this.equClick(evt);
        }

        /**
         * 返回当前部位上有洗练过的装备数据
         */
        private getCurWashVo(): WashVo {
            var washinfo: string = GuidData.grow.getWashVo();
            if (washinfo.length > 0) {
                var washvo: WashVo = StrengUtil.parseStr(washinfo);
                var equData = GuidData.bag.getEquByPart(washvo.partid);//该部位的当前装备数据
                if (equData && equData.guid == washvo.guid) {
                    //如果当前部位的装备没有变化，则显示
                    return washvo;
                }
            }
            return null;
        }

        private _equid: number
        private drawEqu($ui: UICompenent, $select: boolean, $type: string) {
            var aa: number = $ui.data
            var equData = GuidData.bag.getEquByPart(aa);
            var stateary: Array<number> = [];
            if ($select) {
                if (equData) {
                    this._equid = equData.entryData.id
                } else {
                    this._equid = null
                }
            }
            if (equData) {
                StrengUtil.setEquIcon($ui, geteqiconIconUrl(equData.entryData.icon), stateary, $select, $type, equData.entryData.quality, equData.entryData.level);
            } else {

                StrengUtil.setEquNoIcon($ui, aa, stateary, $select, $type);
            }
        }

        private _lastselect: number;
        protected equClick(evt: InteractiveEvent): void {
            if (this.canshowAlert()) {
                for (var i = 0; i < this.EuqUIAry.length; i++) {
                    if (this.EuqUIAry[i] == evt.target) {
                        //选中
                        this._lastselect = i;
                        this.drawEqu(this.EuqUIAry[i], true, StrengUtil.GENERAL);
                    } else {
                        //未选中
                        this.drawEqu(this.EuqUIAry[i], false, StrengUtil.GENERAL);
                    }
                }

                this.resetData(evt.target.data);
            }
        }

        private _vo: number
        private _canbuyary: Array<boolean>
        public resetData($partid: number) {
            this.t_curequ.data = $partid;
            this._vo = $partid;
            this.drawEqu(this.t_curequ, false, StrengUtil.GENERAL);

            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.t_curname.skinName, StrengUtil.equProp[$partid - 1] + "部位", 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            this.drawResItem();

            this.drawBtn();
            this.drawAttr();
            this.drawNewAttr();
        }

        //是否需要弹出提示框
        public canshowAlert(): boolean {
            var vo = this.getCurWashVo();
            console.log(this._vo, vo);
            if (this._vo && vo && vo.partid == this._vo) {
                AlertUtil.show("你有未保存的新属性，是否保存？", "提示", (a: any) => {
                    if (a == 1) {
                        this.sendwash(SharedDef.EQUIPDEVELOP_TYPE_WASHATTRS_SAVE);
                    } else {
                        console.log("--取消");
                        NetManager.getInstance().protocolos.equipdevelop_operate(SharedDef.EQUIPDEVELOP_TYPE_WASHATTRS_DEL, 0, 0, "", "");
                    }
                },2,["是","否"])
                return false;
            } else {
                return true;
            }
        }

        public drawBtn() {
            var vo = this.getCurWashVo();
            var flag = vo && vo.partid == this._lastselect + 1;
            this.setUiListVisibleByItem(this.BtnUI1Ary, flag);
            this.setUiListVisibleByItem(this.BtnUI0Ary, !flag);
        }

        public drawNewAttr() {
            this.setUiListVisibleByItem(this.Pro1Ary, false);
            this.setUiListVisibleByItem(this.Probg1Ary, false);
            this.setUiListVisibleByItem(this.AttrnameAry_n, false);
            this.setUiListVisibleByItem([this.d_forceArrow], false);
            var vo = this.getCurWashVo();
            if (vo && vo.partid == this._lastselect + 1) {
                this.Attr1Ary[1].x = 629
                var att_id: Array<number> = new Array
                var att_val: Array<number> = new Array
                for (var i = 0; i < this.Attr1Ary.length; i++) {
                    if (i < vo.attrary.length) {
                        this.setUiListVisibleByItem([this.Pro1Ary[i], this.Probg1Ary[i], this.AttrnameAry_n[i]], true);
                        var attid: number = vo.attrary[i][0];
                        var cur = Math.floor(vo.attrary[i][1] / 100)

                        var nminmaxAry: Array<number> = StrengUtil.getMinMax(this._equid, attid);
                        var lim = Math.floor(nminmaxAry[1] / 100)
                        var max = Math.floor(nminmaxAry[2] / 100)
                        var raio = (cur - lim) / (max - lim)
                        console.log("------raio-------",raio);
                        att_id.push(attid);
                        att_val.push(vo.attrary[i][1]);
                        this.Pro1Ary[i].uvScale = raio
                        // this.drawNewAttrVal(this.Attr1Ary[i], vo.attrary[i][0], vo.attrary[i][1], getColorQua(vo.attrary[i][2]));
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.AttrnameAry_n[i].skinName, ColorType.Orange7a2f21 + this.getKeyProByIdaaa(attid), 14, TextAlign.LEFT, ColorType.Brown7a2f21);
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.Attr1Ary[i].skinName, Snum(cur) + "/" + Snum(max), 14, TextAlign.CENTER, ColorType.Brown7a2f21);
                    } else {
                        UiDraw.clearUI(this.Attr1Ary[i]);
                    }
                }
                var force: number = getForceByAtt(att_id, att_val);
                var str: string = ColorType.Brown7a2f21 + "战力： ";
                if (this._lastforce > force) {
                    this.setUiListVisibleByItem([this.d_forceArrow], true);
                    this.d_forceArrow.goToAndStop(1);
                    str += ColorType.colorce0a00 + force
                } else if (this._lastforce < force) {
                    this.setUiListVisibleByItem([this.d_forceArrow], true);
                    this.d_forceArrow.goToAndStop(0);
                    str += ColorType.color2daa35 + force
                } else {
                    str += ColorType.Brown7a2f21 + force
                }
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.d_force1.skinName, str, 14, TextAlign.CENTER, ColorType.Brown7a2f21);
            } else {
                this.Attr1Ary[1].x = 598
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.Attr1Ary[1].skinName, "点击按钮开始洗炼", 14, TextAlign.CENTER, ColorType.Brown7a2f21);
                UiDraw.clearUI(this.d_force1);
                UiDraw.clearUI(this.Attr1Ary[0]);
                UiDraw.clearUI(this.Attr1Ary[2]);
                UiDraw.clearUI(this.Attr1Ary[3]);
                UiDraw.clearUI(this.Attr1Ary[4]);
                UiDraw.clearUI(this.Attr1Ary[5]);
            }
        }

        private _lastforce: number
        public drawAttr() {
            this.setUiListVisibleByItem(this.ProAry, false);
            this.setUiListVisibleByItem(this.ProbgAry, false);
            this.setUiListVisibleByItem(this.AttrnameAry, false);
            var equData = GuidData.bag.getEquByPart(this._vo);
            if (equData) {
                //一位数组、间隔3
                this.Attr0Ary[1].x = 416
                var ary = equData.data.AttrData;
                var len: number = ary.length / 3;
                var att_id: Array<number> = new Array
                var att_val: Array<number> = new Array
                for (var i = 0; i < this.Attr0Ary.length; i++) {


                    if (i < len) {
                        this.setUiListVisibleByItem([this.ProAry[i], this.ProbgAry[i], this.AttrnameAry[i]], true);
                        var attid: number = ary[i * 3]
                        var cur = Math.floor(ary[i * 3 + 1] / 100)

                        var minmaxary: Array<number> = StrengUtil.getMinMax(this._equid, attid);
                        var lim = Math.floor(minmaxary[1] / 100)
                        var max = Math.floor(minmaxary[2] / 100)
                        var raio = (cur - lim) / (max - lim)
                        att_id.push(attid);
                        att_val.push(ary[i * 3 + 1]);
                        this.ProAry[i].uvScale = raio
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.AttrnameAry[i].skinName, ColorType.Orange7a2f21 + this.getKeyProByIdaaa(attid), 14, TextAlign.CENTER, ColorType.Brown7a2f21);
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.Attr0Ary[i].skinName, Snum(cur) + "/" + Snum(max), 14, TextAlign.CENTER, ColorType.Brown7a2f21);

                        // this.drawNewAttrVal(this.Attr0Ary[i], ary[i * 3], ary[i * 3 + 1], getColorQua(ary[i * 3 + 2]));

                        // var lev: number = ary[i * 3 + 2];
                        // this.drawLineTxt(this._t_add_attList[i].skinName, getKeyProById(ary[i * 3]), "+" + ary[i * 3 + 1], lev, lev);
                    } else {
                        UiDraw.clearUI(this.Attr0Ary[i]);
                    }
                }
                var force: number = getForceByAtt(att_id, att_val);
                this._lastforce = force;
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.d_force0.skinName, "战力： " + force, 14, TextAlign.CENTER, ColorType.Brown7a2f21);
            } else {
                this.Attr0Ary[1].x = 381
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.Attr0Ary[1].skinName, "请穿戴相应装备", 14, TextAlign.CENTER, ColorType.Brown7a2f21);
                UiDraw.clearUI(this.d_force0);
                UiDraw.clearUI(this.Attr0Ary[0]);
                UiDraw.clearUI(this.Attr0Ary[2]);
                UiDraw.clearUI(this.Attr0Ary[3]);
                UiDraw.clearUI(this.Attr0Ary[4]);
                UiDraw.clearUI(this.Attr0Ary[5]);
            }
        }

        private keyPropaa: Array<string> = [
            "生       命", "攻       击", "防       御", "命       中", "闪       避", "暴       击", "抗       暴", "攻       速", "移       速", "破       防", "忽视闪避", "生命值回复", "伤害加深", "伤害减免", "反弹伤害"//15个
            , "吸       血", "回复效率", "暴暴击击", "抗       暴", "暴击伤害", "暴伤减免", "命中率", "闪避率", "眩       晕", "定       身", "沉       默", "混       乱", "魅       惑", "控制增强", "控制减免"//15个
            , "防       御"
        ];

        private getKeyProByIdaaa($id: number): string {
            return this.keyPropaa[$id - 1];
        }

        /**属性 - value */
        private drawNewAttrVal($ui: UICompenent, $att: number, $val: number, color: string): void {
            var keyStr: string = "";
            if (typeof ($att) == "undefined") {
                UiDraw.clearUI($ui);
                return;
            }
            var num = Math.floor($val / 100);
            keyStr = ColorType.Orange7a2f21 + this.getKeyProByIdaaa($att) + ":  " + color + Snum(num);
            LabelTextFont.writeSingleLabel($ui.uiRender.uiAtlas, $ui.skinName, keyStr, 14, TextAlign.LEFT);
        }

        private _costary: Array<Array<number>>
        private setcostary($que: number) {
            var itemtab: tb.TB_equipdevelop_washattrs = tb.TB_equipdevelop_washattrs.get_TB_equipdevelop_washattrsById(this._vo, $que);
            this._costary = itemtab.cost
        }

        private _canbuy: Array<boolean>;
        public drawResItem() {
            var flagary: Array<boolean> = new Array
            var equData = GuidData.bag.getEquByPart(this._vo);
            var que: number = equData ? equData.entryData.quality : 0;
            this.setcostary(que);
            for (var i = 0; i < 2; i++) {
                if (i < this._costary.length) {
                    IconManager.getInstance().drawItemIcon40(this.CostItemUIAry[i], this._costary[i][0]);
                    //绘制消耗资源图标，并把资源满足情况记录下来
                    flagary.push(UiDraw.drawResHasNumAndAllNum(this.CostItemUIAry[i + 2], this._costary[i]));
                    //调整位置
                    this.CostItemUIAry[0].x = this._costary.length == 1 ? 528 : 494
                    this.CostItemUIAry[2].x = this._costary.length == 1 ? 516 : 482
                } else {
                    UiDraw.clearUI(this.CostItemUIAry[i + 2]);
                    UiDraw.clearUI(this.CostItemUIAry[i]);
                }
            }
            this._canbuy = flagary;
        }

        private expEff: FrameTipCompenent;
        public showExpEff(): void {

            if (!this._effRender) {
                this._effRender = new FrameUIRender();
                this.addRender(this._effRender);
                this._effRender.setImg(getEffectUIUrl("ui_xl"), 4, 4, ($ui: any) => {
                    this.expEff = $ui;
                    this.expEff.x = this.d_bg3_1.x - 58;
                    this.expEff.y = this.d_bg3_1.y - 70;
                    this.expEff.width = this.expEff.baseRec.width * 1.2;
                    // this.expEff.height = this.expEff.baseRec.height * 0.8;
                    this.expEff.speed = 3;
                    this.expEff.playOne(this);
                })
            }
            if (this.expEff) {
                this.expEff.playOne(this);
            }
        }

        private _canclick: boolean = true;
        public butClik(evt: InteractiveEvent): void {
            if (this._canclick) {
                UiTweenScale.getInstance().changeButSize(evt.target);
                this._canclick = false;
                TimeUtil.addTimeOut(btnClickTime, () => {
                    this._canclick = true;
                });
                switch (evt.target) {
                    case this.btn0:
                    case this.btn1:
                        this.sendwash(SharedDef.EQUIPDEVELOP_TYPE_WASHATTRS_WASH);
                        break;
                    case this.btn2:
                        this.sendwash(SharedDef.EQUIPDEVELOP_TYPE_WASHATTRS_SAVE);
                        break;
                    default:
                        break;
                }
            } else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
            }
        }

        private sendwash($type: number) {
            var equData = GuidData.bag.getEquByPart(this._vo);
            if (equData) {
                var $canbuy: boolean = true;
                var $idx: number;
                if ($type == SharedDef.EQUIPDEVELOP_TYPE_WASHATTRS_WASH) {
                    if (this._canbuy.length == 2) {
                        $canbuy = this._canbuy[0] && this._canbuy[1];
                        if (!$canbuy) {
                            $idx = this._canbuy[0] ? this._costary[1][0] : this._costary[0][0]
                        }
                    } else {
                        $canbuy = this._canbuy[0]
                        if (!$canbuy) {
                            $idx = this._costary[0][0]
                        }
                    }
                }

                if ($canbuy) {
                    if ($type == SharedDef.EQUIPDEVELOP_TYPE_WASHATTRS_WASH) {
                        this.showExpEff();
                    }
                    NetManager.getInstance().protocolos.equipdevelop_operate($type, 0, 0, equData.guid, "");
                } else {
                    // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                    var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                    $aaa.data = $idx
                    ModuleEventManager.dispatchEvent($aaa);
                }
            } else {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "请穿戴上装备再洗炼", 99);
            }
        }
    }
}