module strengthgem {

    export class StrengTab2 extends UIVirtualContainer {
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
        private BtnUIAry: Array<UICompenent>
        private UnlockUIAry: Array<UICompenent>
        private GemUIIconAry: Array<UICompenent>
        private GemUILevAry: Array<UICompenent>
        private GemUIattrAry: Array<UICompenent>
        private GemUICostAry: Array<UICompenent>
        private GemUIHasAry: Array<UICompenent>

        private GemUIattrAry_n: Array<UICompenent>
        private GemUILevAry_n: Array<UICompenent>
        private GemUIArrowAry: Array<UICompenent>
        private t_curequ: UICompenent
        private t_curname: UICompenent
        private btn0: UICompenent
        private btn1: UICompenent
        private btn2: UICompenent
        private initView(): void {
            var renderLevel = this._baseRender;

            this.EuqUIAry = new Array
            for (var i = 0; i < 10; i++) {
                var t_equ = this.addChild(this._topRender.getComponent("t_equ" + i));
                t_equ.addEventListener(InteractiveEvent.Down, this.equClick, this);
                this.EuqUIAry.push(t_equ);
                this._redPointRender.getRedPointUI(this, 102 + i, new Vector2D(t_equ.x + t_equ.width, t_equ.y));
            }

            this.t_curequ = this.addChild(renderLevel.getComponent("t_curequ"));
            this.t_curname = this.addChild(renderLevel.getComponent("t_curname"));

            this.BtnUIAry = new Array
            this.btn0 = this.addEvntButUp("cnew_btn2", this._publicRender);
            this.setSizeForPanelUiCopy(this.btn0, "c_btn0", renderLevel);
            this.btn1 = this.addEvntButUp("cnew_btn2", this._publicRender);
            this.setSizeForPanelUiCopy(this.btn1, "c_btn1", renderLevel);
            this.btn2 = this.addEvntButUp("cnew_btn2", this._publicRender);
            this.setSizeForPanelUiCopy(this.btn2, "c_btn2", renderLevel);
            this.BtnUIAry.push(this.btn0);
            this.BtnUIAry.push(this.btn1);
            this.BtnUIAry.push(this.btn2);

            this.GemUIIconAry = new Array
            this.GemUIattrAry = new Array
            this.GemUICostAry = new Array
            this.GemUIHasAry = new Array
            this.GemUILevAry = new Array
            this.UnlockUIAry = new Array
            this.GemUIattrAry_n = new Array
            this.GemUILevAry_n = new Array
            this.GemUIArrowAry = new Array
            for (var j = 0; j < 3; j++) {
                this.UnlockUIAry.push(renderLevel.getComponent("c_unlockinfo" + j));
                this.BtnUIAry.push(this.addChild(renderLevel.getComponent("c_btntxt" + j)));
                this.GemUIIconAry.push(this.addChild(this._topRender.getComponent("c_grm" + j)));
                this.GemUILevAry.push(this.addChild(this._topRender.getComponent("c_gemlev" + j)));
                this.GemUIattrAry.push(this.addChild(this._topRender.getComponent("c_attr" + j)));
                this.GemUICostAry.push(this.addChild(this._topRender.getComponent("c_cost" + j)));
                this.GemUIHasAry.push(this.addChild(this._topRender.getComponent("c_has" + j)));

                this.GemUILevAry_n.push(this.addChild(this._topRender.getComponent("c_nlev" + j)));
                this.GemUIattrAry_n.push(this.addChild(this._topRender.getComponent("c_nattr" + j)));
                this.GemUIArrowAry.push(this._topRender.getComponent("c_arrow" + j));
                //画背景
                var cnew_bg_yellow = this.addChild(this._publicRender.getComponent("cnew_bg_yellow"));
                this.setSizeForPanelUiCopy(cnew_bg_yellow, "c_yellowbg" + j, this._topRender);
            }

            this._publicRender.applyObjData();

            this._redbtnary = new Array
            this._redbtnary.push(this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.btn0.x + this.btn0.width, this.btn0.y)));
            this._redbtnary.push(this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.btn1.x + this.btn1.width, this.btn1.y)));
            this._redbtnary.push(this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.btn2.x + this.btn2.width, this.btn2.y)));
        }
        private _redbtnary: Array<RedPointCompenent>

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
                this.EuqUIAry[i].data = NewStrengModel.getInstance().getGemvo(i + 1);
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
            this.EuqUIAry[$partid - 1].data = NewStrengModel.getInstance().getGemvo($partid);
            this.drawEqu(this.EuqUIAry[$partid - 1], this.lastselect == ($partid - 1), StrengUtil.GEM);
            if (this.lastselect == ($partid - 1)) {
                this.resetData(this.EuqUIAry[$partid - 1].data);
            }

            this.showExpEff();
        }

        public refreshEqu() {
            for (var i = 0; i < 10; i++) {
                this.drawEqu(this.EuqUIAry[i], this.lastselect == i, StrengUtil.GEM);
            }
        }

        private expEff: FrameTipCompenent;
        public showExpEff(): void {

            if (!this._effRender) {
                this._effRender = new FrameUIRender();
                this.addRender(this._effRender);
                this._effRender.setImg(getEffectUIUrl("ui_qh"), 4, 4, ($ui: any) => {
                    this.expEff = $ui;
                    this.seteffsize();
                    this.expEff.speed = 3;
                    this.expEff.playOne(this);
                })
            }
            if (this.expEff) {
                this.seteffsize();
                this.expEff.playOne(this);
            }
        }

        private seteffsize() {
            console.log("this._clickId==============", this._clickId);
            var $index = this._clickId - 1;
            if ($index >= 0 && $index < this.GemUIIconAry.length) {
                this.expEff.x = this.GemUIIconAry[$index].x - 58;
                this.expEff.y = this.GemUIIconAry[$index].y - 58;
                this.expEff.width = this.expEff.baseRec.width * 1.5;
                this.expEff.height = this.expEff.baseRec.height * 1.5;
            }
        }

        private drawEqu($ui: UICompenent, $select: boolean, $type: string) {
            var aa: Array<GemVo> = $ui.data
            var equData = GuidData.bag.getEquByPart(aa[0].partid);
            var stateary: Array<number> = [aa[0].state, aa[1].state, aa[2].state];
            if (equData) {
                StrengUtil.setEquIcon($ui, geteqiconIconUrl(equData.entryData.icon), stateary, $select, $type, equData.entryData.quality, equData.entryData.level);
            } else {
                StrengUtil.setEquNoIcon($ui, aa[0].partid, stateary, $select, $type);
            }
        }

        public lastselect: number;
        protected equClick(evt: InteractiveEvent): void {
            for (var i = 0; i < this.EuqUIAry.length; i++) {
                if (this.EuqUIAry[i] == evt.target) {
                    //选中
                    this.lastselect = i;
                    this.drawEqu(this.EuqUIAry[i], true, StrengUtil.GEM);
                } else {
                    //未选中
                    this.drawEqu(this.EuqUIAry[i], false, StrengUtil.GEM);
                }
            }

            this.resetData(evt.target.data);
        }

        private _vo: Array<GemVo>
        private _canbuyary: Array<boolean>
        public resetData($data: Array<GemVo>) {
            this.t_curequ.data = $data;
            this._vo = $data;
            this.drawEqu(this.t_curequ, false, StrengUtil.GENERAL);

            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.t_curname.skinName, StrengUtil.equProp[$data[0].partid - 1] + "部位", 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            this.setUiListVisibleByItem(this.GemUIArrowAry, false);
            var flagary = new Array
            for (var i = 0; i < 3; i++) {
                if (i < this._vo.length) {
                    // this.drawPic(, );
                    IconManager.getInstance().drawItemIcon60(this.GemUIIconAry[i], this._vo[i].curtab.cost[0][0]);

                    if (this._vo[i].state != 2) {
                        var lev = this._vo[i].gemlev == 0 ? 1 : this._vo[i].gemlev;
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.GemUILevAry[i].skinName, ColorType.Orange7a2f21 + "等级:  " + ColorType.color9a683f + lev, 14, TextAlign.LEFT, ColorType.Brown7a2f21);
                        UiDraw.drawAttVal(this.GemUIattrAry[i], this._vo[i].curtab.props[0][0], this._vo[i].curtab.props[0][1], TextAlign.LEFT, true);

                        var tabvo = this._vo[i].nexttab ? this._vo[i].nexttab : this._vo[i].curtab
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.GemUICostAry[i].skinName, ColorType.Orange7a2f21 + "消耗:  " + ColorType.color9a683f + tabvo.cost[0][1] + "个" + GameData.getPropName(tabvo.cost[0][0]), 14, TextAlign.LEFT, ColorType.Brown7a2f21);
                        flagary.push(UiDraw.drawResHasNumAndAllNum(this.GemUIHasAry[i], tabvo.cost[0], "拥有:"));

                        if (this._vo[i].state == 3) {
                            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.GemUILevAry_n[i].skinName, ColorType.Orange7a2f21 + "等级:  " + ColorType.color9a683f + (lev + 1), 14, TextAlign.LEFT, ColorType.Brown7a2f21);
                            // UiDraw.drawAttVal(this.GemUIattrAry_n[i], tabvo.props[0][0], tabvo.props[0][1], TextAlign.LEFT, true);
                            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.GemUIattrAry_n[i].skinName, ColorType.Green2ca937 + "+" + Snum(Math.floor(tabvo.props[0][1] / 100)), 14, TextAlign.LEFT);
                            this.setUiListVisibleByItem([this.GemUIArrowAry[i]], true);
                        } else {
                            UiDraw.clearUI(this.GemUILevAry_n[i]);
                            UiDraw.clearUI(this.GemUIattrAry_n[i]);
                        }
                    } else {
                        // UiDraw.clearUI(this.GemUILevAry[i]);
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.GemUILevAry[i].skinName, ColorType.Orange7a2f21 + "等级:  " + ColorType.color9a683f + 1, 14, TextAlign.LEFT, ColorType.Brown7a2f21);
                        UiDraw.drawAttVal(this.GemUIattrAry[i], this._vo[i].curtab.props[0][0], this._vo[i].curtab.props[0][1], TextAlign.LEFT, true);
                        UiDraw.clearUI(this.GemUICostAry[i]);
                        UiDraw.clearUI(this.GemUIHasAry[i]);
                        UiDraw.clearUI(this.GemUILevAry_n[i]);
                        UiDraw.clearUI(this.GemUIattrAry_n[i]);
                    }
                    this.drawBtn(this._vo[i], i);
                } else {
                    UiDraw.clearUI(this.GemUIIconAry[i]);
                    UiDraw.clearUI(this.GemUIattrAry[i]);
                    UiDraw.clearUI(this.GemUICostAry[i]);
                    UiDraw.clearUI(this.GemUIHasAry[i]);
                    UiDraw.clearUI(this.GemUILevAry[i]);
                    UiDraw.clearUI(this.UnlockUIAry[i]);
                    UiDraw.clearUI(this.BtnUIAry[i]);
                    UiDraw.clearUI(this.BtnUIAry[i + 3]);
                    UiDraw.clearUI(this.GemUILevAry_n[i]);
                    UiDraw.clearUI(this.GemUIattrAry_n[i]);
                }
            }
            this._canbuyary = flagary;


            //红点逻辑
            var gemary: Array<RedPointNode> = RedPointManager.getInstance().getNodeByID(44).children;
            if (gemary[$data[0].partid - 1].show) {
                for (var index = 0; index < $data.length; index++) {
                    this._redbtnary[index].preHide();
                    if ($data[index].state == 1 || $data[index].state == 3) {
                        var gemvo = $data[index].nexttab ? $data[index].nexttab : $data[index].curtab
                        var flagarygem: Array<boolean> = new Array;
                        for (var j = 0; j < gemvo.cost.length; j++) {
                            flagarygem.push(hasEnoughResItem(gemvo.cost[j]));
                        }
                        var aaa: boolean = true;
                        for (var flagid = 0; flagid < flagarygem.length; flagid++) {
                            if (!flagarygem[flagid]) {
                                aaa = false;
                                flagid = flagarygem.length;
                            }
                        }
                        if (aaa) {
                            this._redbtnary[index].preShow();
                            console.log("---红点zhanshi--", this._redbtnary[index]);
                        }
                    }
                }
            } else {
                this._redbtnary[0].preHide();
                this._redbtnary[1].preHide();
                this._redbtnary[2].preHide();
            }
        }

        private drawPic($ui: UICompenent, $data: GemVo) {
            IconManager.getInstance().getIcon(getgemIconUrl($data.gemid),
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec($ui.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    //头像
                    ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }

        private drawBtn($data: GemVo, $index: number) {
            this.setUiListVisibleByItem([this.UnlockUIAry[$index]], $data.state == 2 || $data.state == 4);
            this.setUiListVisibleByItem([this.BtnUIAry[$index], this.BtnUIAry[$index + 3]], $data.state == 1 || $data.state == 3);
            if ($data.state == 1) {
                (<FrameCompenent>this.BtnUIAry[$index + 3]).goToAndStop(1);
            } else if ($data.state == 2) {
                var tab_gem_part = tb.TB_equipdevelop_gem_part.get_TB_equipdevelop_gem_partById($data.partid);
                for (var i = 0; i < tab_gem_part.gem_array.length; i++) {
                    if (tab_gem_part.unlock_refine_lv[i] > NewStrengModel.getInstance().getrefiningvo($data.partid).partlevstar[0]) {
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.UnlockUIAry[$index].skinName, StrengUtil.equProp[$data.partid - 1] + "部位精炼达到" + (tab_gem_part.unlock_refine_lv[i] + 1) + "段解锁", 14, TextAlign.RIGHT, ColorType.Brown7a2f21);
                        break;
                    }
                    if (tab_gem_part.unlock_strength_lv[i] > NewStrengModel.getInstance().getstrengvo($data.partid).partlev) {
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.UnlockUIAry[$index].skinName, StrengUtil.equProp[$data.partid - 1] + "部位强化+" + tab_gem_part.unlock_strength_lv[i] + "解锁", 14, TextAlign.RIGHT, ColorType.Brown7a2f21);
                        break;
                    }
                }
            } else if ($data.state == 3) {
                (<FrameCompenent>this.BtnUIAry[$index + 3]).goToAndStop(0);
            } else {
                UiDraw.clearUI(this.GemUICostAry[$index]);
                UiDraw.clearUI(this.GemUIHasAry[$index]);
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.UnlockUIAry[$index].skinName, "已满级", 14, TextAlign.RIGHT, ColorType.Brown7a2f21);
            }
        }


        /**绘制增加属性 向右箭头 $align只接受左右对齐*/
        private drawAddValRight($ui: UICompenent, $val: string): void {
            var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            UiDraw.cxtDrawImg(ctx, PuiData.ARROW_RIGHT, new Rectangle(0, 3, 16, 12), UIData.publicUi);
            LabelTextFont.writeSingleLabelToCtx(ctx, $val, 14, 22, 0, TextAlign.LEFT, ColorType.Green2ca937);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        private _canclick: boolean = true;
        public butClik(evt: InteractiveEvent): void {
            if (this._canclick) {
                UiTweenScale.getInstance().changeButSize(evt.target);
                this._canclick = false;
                TimeUtil.addTimeOut(btnClickTime, () => {
                    this._clickId = -1;
                    this._canclick = true;
                });
                switch (evt.target) {
                    case this.btn0:
                        this.senduplevgem(this._vo[0], this._canbuyary[0], 0);
                        break;
                    case this.btn1:
                        this.senduplevgem(this._vo[1], this._canbuyary[1], 1);
                        break;
                    case this.btn2:
                        this.senduplevgem(this._vo[2], this._canbuyary[2], 2);
                        break;
                    default:
                        break;
                }
            } else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
            }
        }

        private _clickId: number;
        private senduplevgem($vo: GemVo, canbuy: boolean, $idx: number) {
            if (canbuy) {
                var type
                if ($vo.state == 1) {
                    type = SharedDef.EQUIPDEVELOP_TYPE_GEM_ACTIVE
                } else if ($vo.state == 3) {
                    type = SharedDef.EQUIPDEVELOP_TYPE_GEM_LVUP
                }
                this._clickId = $vo.index;
                NetManager.getInstance().protocolos.equipdevelop_operate(type, $vo.partid, $vo.index, "", "");
            } else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                var tabvo = this._vo[$idx].nexttab ? this._vo[$idx].nexttab : this._vo[$idx].curtab
                var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                $aaa.data = tabvo.cost[0][0]
                ModuleEventManager.dispatchEvent($aaa);
            }
        }
    }
}