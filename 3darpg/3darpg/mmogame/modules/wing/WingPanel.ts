module wing {

    export class WingPanel extends WindowUi {

        private _baseRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
        private _redPointRender: RedPointRender;
        private _effRender: FrameUIRender;

        public _baseUiAtlas: UIAtlas;

        public dispose(): void {
            super.dispose();
            this._baseRender.dispose();
            this._baseRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
            
            if (this.qianghuaPanel) {
                this.qianghuaPanel.dispose();
                this.qianghuaPanel = null;
            }
            if (this.jinjiePanel) {
                this.jinjiePanel.dispose();
                this.jinjiePanel = null;
            }
            if (this.showDisPlay) {
                this.showDisPlay.destory();
                this.showDisPlay = null;
            }

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

            this._bgRender = new UIRenderComponent();
            this.addRender(this._bgRender);

            this._baseRender = new UIRenderComponent();
            this.addRender(this._baseRender);

            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);

            this._baseUiAtlas = new UIAtlas();


        }

        protected butClik(evt: InteractiveEvent): void {
            if (evt.target == this.w_close) {
                this.hide();
            }
        }

        public applyLoad(): void {
            this._baseUiAtlas.setInfo("ui/uidata/wing/wing.xml", "ui/uidata/wing/wing.png", () => { this.loadConfigCom() });
        }

        private loadConfigCom(): void {
            this.applyLoadComplete();

            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;

            this.addPersonChar();

            this.initBaseUI();


            this.resize();




    

        }

        private showDisPlay: Person2DChar;
        private addPersonChar(): void {
            var $person2DChar: Person2DChar = new Person2DChar();
            $person2DChar.needUIUrl = false;
            this._bgRender.addModel($person2DChar);
            this.showDisPlay = $person2DChar

        }

        public resize(): void {
            super.resize();
            if (this.showDisPlay) {
                this.showDisPlay.resize();
                this.showDisPlay.scale = 6.5 * UIData.Scale;
                this.showDisPlay.x = 100 * UIData.Scale;
                this.showDisPlay.y = -45 * UIData.Scale;
            }

        }

        private wingName: UICompenent;
        private wingStarAry: Array<FrameCompenent>;
        private wingExp: UICompenent;
        private wingExPer: UICompenent;


        private tab0: SelectButton;
        private tab1: SelectButton;
        private tab0dis:UICompenent;
        private tab1dis:UICompenent;
        private jinjiePanel: WingJinjiePanel;
        private qianghuaPanel: WingQianghuaPanel;

        private tab0RedPoint: RedPointCompenent;
        private tab1RedPoint: RedPointCompenent;
        private btnRedPoint: RedPointCompenent;

        private mainBtn: UICompenent;

        private titleBg: UICompenent;
        private zLlab: UICompenent;
        private wingZl: UICompenent;
        private UnlockAry: Array<UICompenent>
        private initBaseUI(): void {
            // this.addUIList(["t_bg1", "t_bg2", "t_bg3"], this.winmidRender);

            var cnew_right_bg_top = this.addChild(this.winmidRender.getComponent("cnew_right_bg_top"));
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "t_bg1", this._bgRender);
            var cnew_right_bg_bottom = this.addChild(this.winmidRender.getComponent("cnew_right_bg_bottom"));
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "t_bg2", this._bgRender);

            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "t_bg3", this._bgRender);

            this.winmidRender.applyObjData();

            this.addChild(this._bgRender.getComponent("a_rolebg"));
            var huawenbg = this.addChild(this._bgRender.getComponent("a_huawenbg"));
            var huawenbg1 = this.addChild(this._bgRender.getComponent("a_huawenbg"));
            huawenbg1.isU = true;
            huawenbg1.x = huawenbg.x - huawenbg.width

            this.addUIList(["t_main_title", "a_namebg"], this._bgRender);

            this.titleBg = this.addChild(this._bgRender.getComponent("t_title_bg"));
            this.zLlab = this.addChild(this._baseRender.getComponent("t_zl_lab"));

            this.mainBtn = this._bgRender.getComponent("t_btn_bg");
            this.mainBtn.addEventListener(InteractiveEvent.Up, this.applyClick, this);
            this.addChild(this.mainBtn);

            this.addChild(this._baseRender.getComponent("t_bg5"));

            this.UnlockAry = new Array

            this.UnlockAry.push(this._bgRender.getComponent("t_bg4"));
            this.wingExPer = this._bgRender.getComponent("t_pre");
            this.UnlockAry.push(this.wingExPer);

            this.wingName = this._baseRender.getComponent("t_name");
            this.addChild(this.wingName);

            this.wingZl = this._baseRender.getComponent("t_zl");
            this.addChild(this.wingZl);

            this.wingStarAry = new Array;
            for (var i: number = 0; i < 10; i++) {
                var star: FrameCompenent = <FrameCompenent>this._baseRender.getComponent("t_star" + i);
                // this.addChild(star);
                // star.goToAndStop(1);
                // this.addChild(star);
                this.wingStarAry.push(star);
            }

            this.wingExp = this._baseRender.getComponent("t_exp");
            this.UnlockAry.push(this.wingExp);

            this.tab0 = <SelectButton>this._bgRender.getComponent("t_tab0");
            this.addChild(this.tab0);
            this.tab0.addEventListener(InteractiveEvent.Down, this.tabClick, this);

            this.tab1 = <SelectButton>this._bgRender.getComponent("t_tab1");
            //this.addChild(this.tab1);
            this.tab1.addEventListener(InteractiveEvent.Down, this.tabClick, this);
            
            this.tab1dis = this._bgRender.getComponent("t_tab_qiang_dis");
            this.showTab1();

            this.jinjiePanel = new WingJinjiePanel();
            this.jinjiePanel.parentPanel = this;
            this.jinjiePanel.setUiAtlas(this._baseUiAtlas);

            this.qianghuaPanel = new WingQianghuaPanel();
            this.qianghuaPanel.parentPanel = this;
            this.qianghuaPanel.setUiAtlas(this._baseUiAtlas);


            this.tab0RedPoint = this._redPointRender.getRedPointUI(this, 51, new Vector2D(this.tab0.x + this.tab0.width - 5, this.tab0.y));
            this.tab1RedPoint = this._redPointRender.getRedPointUI(this, 53, new Vector2D(this.tab1.x + this.tab1.width - 5, this.tab1.y));
            this.btnRedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.mainBtn.x + this.mainBtn.width, this.mainBtn.y));

            this.drawBaseWingInfo();


        }

        public showTab1():void{
            var $tb_system_basestrength: tb.TB_system_base = tb.TB_system_base.getTempVo(Number(SharedDef.MODULE_WING * 10 + SharedDef.MODULE_WING_STRENGTH));
            if ($tb_system_basestrength.level <= GuidData.player.getLevel()) {
                this.addChild(this.tab1);
                this.removeChild(this.tab1dis);
            }else{
                this.removeChild(this.tab1);
                this.addChild(this.tab1dis);
            }
        }

        private _curTab: number = 0;

        // public setIdxBgPos(idx: number): void {
        // if (idx == 0) {
        // this.titleBg.y = this.titleBg.baseRec.y;

        // this.zLlab.x = this.zLlab.baseRec.x;
        // this.zLlab.y = this.zLlab.baseRec.y;

        // this.wingZl.x = this.wingZl.baseRec.x;
        // this.wingZl.y = this.wingZl.baseRec.y;
        // } else {
        //     this.titleBg.y = 78;

        //     this.zLlab.x = 293;
        //     this.zLlab.y = 93;

        //     this.wingZl.x = 348;
        //     this.wingZl.y = 93;
        // }
        // }
        private _canclick: boolean = true;
        private applyClick($e: InteractiveEvent): void {
            UIManager.popClikNameFun("t_btn_bg");
            UiTweenScale.getInstance().changeButSize($e.target)
     
            if (this._canclick) {
                this._canclick = false;
                TimeUtil.addTimeOut(btnClickTime, () => {
                    this._canclick = true;
                });
                if (this._currentIdx == 0) {
                    this.jinjiePanel.applyClick();
                } else {
                    this.qianghuaPanel.applyClick();
                }
            } else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
            }
        }

        public showBtnBg(tf: boolean): void {
            if (tf) {
                this.addChild(this.mainBtn);
            } else {
                this.removeChild(this.mainBtn);
            }
        }

        private tabClick($e: InteractiveEvent): void {
            switch ($e.target) {
                case this.tab0:
                    this.setSelectIdx(0);
                    break;
                case this.tab1:
                    this.setSelectIdx(1);
                    break;
            }
        }
        private _currentIdx: number = 0;
        private setSelectIdx(idx: number): void {
            this._curTab = idx;
            this.setUiListVisibleByItem(this.UnlockAry, this._curTab == 0 && GuidData.grow.getWingIsActive());
            this.setUiListVisibleByItem(this.wingStarAry, this._curTab == 0 && GuidData.grow.getWingIsActive());
            if (idx == 0) {
                this.tab0.selected = true;
                this.tab1.selected = false;
                UIManager.getInstance().addUIContainer(this.jinjiePanel);
                UIManager.getInstance().removeUIContainer(this.qianghuaPanel);
                this.jinjiePanel.drawInfo();
                this._currentIdx = 0;
                this.btnRedPoint.bindNode(52);
                // this.setIdxBgPos(0);
            } else if (idx == 1) {
                if (!GuidData.grow.getWingIsActive()) {
                    this.tab0.selected = true;
                    this.tab1.selected = false;
                    this._currentIdx = 0;
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "请先激活神羽", 99);
                    return;
                }
                this.tab0.selected = false;
                this.tab1.selected = true;
                UIManager.getInstance().removeUIContainer(this.jinjiePanel);
                UIManager.getInstance().addUIContainer(this.qianghuaPanel);
                this.qianghuaPanel.drawInfo();
                this._currentIdx = 1;
                this.btnRedPoint.bindNode(54);
                // this.setIdxBgPos(1);
            }

            var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
            $scenePange.data = SharedDef.MODULE_WING
            ModuleEventManager.dispatchEvent($scenePange);
        }
        private drawUnActiveInfo(): void {
            var targetData: any = TableData.getInstance().getData(TableData.tb_wings_bless, 100);
            var wingInfo: any = TableData.getInstance().getData(TableData.tb_wings_base, targetData.rank);

            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.wingName.skinName, wingInfo.name, 16, TextAlign.LEFT, ColorType.Brown6a4936);
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.wingTitleJie.skinName, targetData.rank + "阶", 16, TextAlign.LEFT, ColorType.Coffeeff9200);
        }
        private curWingID: number = -1;
        private drawBaseWingInfo(): void {
            // this.setUiListVisibleByItem(this.UnlockAry,GuidData.grow.getWingIsActive());
            // this.setUiListVisibleByItem(this.wingStarAry,GuidData.grow.getWingIsActive());
            // if (!GuidData.grow.getWingIsActive()) {
            //     this.drawUnActiveInfo();
            //     return;
            // }
            this.setSelectIdx(this._curTab);
            var wingID: number = GuidData.grow.getWingID();
            if (wingID == 0) {
                wingID = 100;
            }
            var targetData: any = TableData.getInstance().getData(TableData.tb_wings_bless, wingID);
            var wingInfo: any = TableData.getInstance().getData(TableData.tb_wings_base, targetData.rank);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.wingName.skinName, getChiNum(wingInfo.id) + "阶  " + wingInfo.name + "   +" + GuidData.grow.getWingQh(), 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            if (this.curWingID != wingInfo.id) {
                // LoadManager.getInstance().load(Scene_data.fileRoot + "/ui/load/wing/" + wingInfo.id + ".png", LoadManager.IMG_TYPE, ($img) => {
                //     var $rec: UIRectangle = this._baseUiAtlas.getRec(this.wingName.skinName);

                //     var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                //     ctx.drawImage($img, 0, 0, $rec.pixelWitdh, $rec.pixelHeight, 0, 0, $rec.pixelWitdh, $rec.pixelHeight);
                //     this._baseUiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                // })

                this.showDisPlay.setAvatar(wingInfo.model);

                this.curWingID = wingInfo.id;
            }

            // if (GuidData.grow.getWingIsActive()) {
            //     ArtFont.getInstance().writeFontToSkinNameCenter(this._baseUiAtlas, this.wingZl.skinName, Snum(GuidData.player.getWingForce()), ArtFont.num56)
            // } else {
            // }
            ArtFont.getInstance().writeFontToSkinNameCenter(this._baseUiAtlas, this.wingZl.skinName, Snum(getForceByAtt(targetData.attr_id, targetData.attr_value)), ArtFont.num56)


            var starStr: string = "";
            for (var i: number = 0; i < this.wingStarAry.length; i++) {
                if (targetData.star > i) {
                    this.wingStarAry[i].goToAndStop(0);
                } else {
                    this.wingStarAry[i].goToAndStop(1);
                }
            }
            // LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.wingStar.skinName, starStr, 16, TextAlign.CENTER, ColorType.Redce0a00);
            this.drawExp();
        }


        private drawExp(): void {
            var str:string = "已满级"
            var ratio:number = 1;
            var targetData: any = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID());
            var nextData: any = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID() + 1);
            if (nextData) {
                str = GuidData.grow.getWingExp() + "/" + targetData.need_exp;
                ratio = GuidData.grow.getWingExp() / targetData.need_exp;
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.wingExp.skinName, str, 14, TextAlign.CENTER, ColorType.Whiteffffff, "", 0, 0, true);
            this.wingExPer.uvScale = ratio;
        }

        public show(idx: number = 0): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            SceneManager.getInstance().render = false;
            if (this.tab0) {
                this.setSelectIdx(idx);
            }
            var evt: mainUi.MainUiEvent = new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT);
            ModuleEventManager.dispatchEvent(evt);

      
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            UIManager.getInstance().removeUIContainer(this.jinjiePanel);
            UIManager.getInstance().removeUIContainer(this.qianghuaPanel);
            SceneManager.getInstance().render = true;
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            super.hide();
        }

        public wingIdChg(): void {
            if (!this._baseRender.uiAtlas) {
                return;
            }
            this.drawBaseWingInfo();
            this.jinjiePanel.drawInfo();
        }

        public wingExpChg(): void {
            if (!this._baseRender.uiAtlas) {
                return;
            }
            this.drawExp();
            this.jinjiePanel.drawIconNum();
            this.showExpEff();
        }

        private expEff: FrameTipCompenent;
        public showExpEff(): void {
            console.log("up skill lev");
            if (!this._effRender) {
                this._effRender = new FrameUIRender();
                this.addRender(this._effRender);
                this._effRender.setImg(getEffectUIUrl("ui_cb"), 3, 4, ($ui: any) => {
                    this.expEff = $ui;
                    this.expEff.x = 70;
                    this.expEff.y = 422;
                    this.expEff.width = this.expEff.baseRec.width * 1.5;
                    //this.upLevEff.height = this.upLevEff.baseRec.height * 0.8;
                    this.expEff.speed = 5;
                    this.expEff.playOne(this);
                })
            }
            if (this.expEff) {
                this.expEff.playOne(this);
            }
        }

        public wingLevChg(): void {
            if (!this._baseRender.uiAtlas) {
                return;
            }
            this.drawBaseWingInfo();
            this.qianghuaPanel.drawInfo();
        }

        public showflyword($str:string): void {
            var v21d: Vector2D = new Vector2D(this.wingExPer.parent.x + this.wingExPer.width, this.wingExPer.y);
            var v2d: Vector2D = UiTweenVo.getPosByPanel(v21d, { width: UIData.designWidth, height: UIData.designHeight})
            // var v2d: Vector2D = UiTweenVo.getPosByPanel(new Vector2D(204, 473), { width: 960, height: 540 })
            v2d.x = v2d.x * UIData.Scale;
            v2d.y = v2d.y * UIData.Scale;
            msgtip.MsgTipManager.outStr(ColorType.Yellowedce7e+"祝福值+"+$str, msgtip.PopMsgVo.type8, v2d);
        }

        public refreshItem(): void {
            if (this.jinjiePanel.hasStage) {
                this.jinjiePanel.drawIconNum();
            } else if (this.qianghuaPanel.hasStage) {
                this.qianghuaPanel.drawIconNum();
            }
        }


    }

    export class WingJinjiePanel extends UIConatiner {
        private _baseRender: UIRenderComponent;
        //private _redPointRender: RedPointRender;
        public parentPanel: WingPanel;

        public _baseUiAtlas: UIAtlas;

        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._baseRender = new UIRenderComponent();
            this.addRender(this._baseRender);

            //this._redPointRender = new RedPointRender();
            //this.addRender(this._redPointRender);

        }

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
        }

        private _propAry: Array<UICompenent>;
        private _valAry: Array<UICompenent>;
        private _icon1: UICompenent;
        private _icon2: UICompenent;
        private _iconLab1: UICompenent;
        private _iconLab2: UICompenent;
        private _btn: FrameCompenent;
        private _jihuoLab: UICompenent;
        private _jinjieLab: UICompenent;
        private _title0: UICompenent;
        private _title1: UICompenent;
        private a_limit: UICompenent;

        public setUiAtlas($uiatlas: UIAtlas): void {
            this._baseUiAtlas = $uiatlas;
            this._baseRender.uiAtlas = $uiatlas;

            this.addUIList(["t_line"], this._baseRender);

            this._title1 = this._baseRender.getComponent("t_lab0");
            this._title0 = this._baseRender.getComponent("t_top_title0");

            this._propAry = new Array;
            this._valAry = new Array;

            for (var i: number = 0; i < 7; i++) {
                var lab: UICompenent = this._baseRender.getComponent("t_lab" + (i + 1));
                this.addChild(lab);
                this._propAry.push(lab);

                var val: UICompenent = this._baseRender.getComponent("t_val" + (i + 1));
                this.addChild(val);
                this._valAry.push(val);

            }

            this._icon1 = this._baseRender.getComponent("t_icon1");
            this._icon2 = this._baseRender.getComponent("t_icon2");

            this._iconLab1 = this._baseRender.getComponent("t_icon_lab1");

            this._iconLab2 = this._baseRender.getComponent("t_icon_lab2");

            this._jinjieLab = this._baseRender.getComponent("t_sj_lab");

            this.a_limit = this._baseRender.getComponent("a_limit");

            this._btn = <FrameCompenent>this._baseRender.getComponent("t_btn");
            this.addChild(this._btn);
            //this._btn.addEventListener(InteractiveEvent.Down, this.applyClick, this);
            this._btn.goToAndStop(1);

            //this._redPointRender.getRedPointUI(this, 52, new Vector2D(this._btn.x + this._btn.width, this._btn.y));

            this._jihuoLab = this._baseRender.getComponent("t_jihuo_lab");
            //this.addChild(this._jihuoLab);

            this.drawInfo();
        }

        public applyClick(): void {
            if (GuidData.grow.getWingIsActive()) {

                var targetData: any = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID());
                if (targetData.operate_type == 1) {
                    if (this._itemNeedNum > this._itemAllNum) {
                        //msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "道具不足", 99);
                        var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                        $aaa.data = this._itemID;
                        ModuleEventManager.dispatchEvent($aaa);
                        return;
                    }

                    if (this._costVal > GuidData.player.getResType(this._costType)) {
                        //msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + getResName(this._costType) + "不足", 99);
                        var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                        $aaa.data = this._costType;
                        ModuleEventManager.dispatchEvent($aaa);
                        return;
                    }
                    NetManager.getInstance().protocolos.wings_bless();
                } else {
                    if (this._costVal > GuidData.player.getResType(this._costType)) {
                        //msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + getResName(this._costType) + "不足", 99);
                        var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                        $aaa.data = this._costType;
                        ModuleEventManager.dispatchEvent($aaa);
                        return;
                    }
                    NetManager.getInstance().protocolos.wings_rankup();
                }

            } else {
                NetManager.getInstance().protocolos.wings_active();
            }
        }

        public drawInfo(): void {

            if (GuidData.grow.getWingIsActive()) {
                this.drawBase();
            } else {
                this.drawUnActive();
                this.parentPanel.showBtnBg(true);
            }


        }

        private drawUnActive(): void {
            if (!this._jihuoLab.parent) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._jihuoLab.skinName, "激活后即可拥有一阶外观", 16, TextAlign.LEFT, ColorType.Orange853d07);
                this.addChild(this._jihuoLab);

                this.addChild(this._title0);
            }
            this._btn.goToAndStop(0);

            var targetData: any = TableData.getInstance().getData(TableData.tb_wings_bless, 100);
            //属性
            var targetForce: number = getForceByAtt(targetData.attr_id, targetData.attr_value);

            for (var i: number = 0; i < this._propAry.length; i++) {
                //getKeyProById()
                // var keyStr: string = "";
                // if (targetData.attr_id[i]) {
                //     keyStr = ColorType.Orange7a2f21 + getKeyProById(targetData.attr_id[i]) + "   " + ColorType.Orange853d07 + Snum(targetData.attr_value[i]);
                // }

                // LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._propAry[i].skinName, keyStr, 14, TextAlign.LEFT);
                UiDraw.drawAttVal(this._propAry[i], targetData.attr_id[i], targetData.attr_value[i]);
            }

        }

        private drawBase(): void {
            if (this._jihuoLab && this._jihuoLab.parent) {
                this.removeChild(this._jihuoLab);
                this._jihuoLab = null;
                this.removeChild(this._title0);
            }

            if (!this._title1.parent) {
                this.addChild(this._title1);
            }


            var targetData: any = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID());
            var nextData: any = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID() + 1);

            if (targetData.operate_type == 1) {
                this._btn.goToAndStop(1);
                this.removeChild(this.a_limit);
                if (!this._icon1.parent) {
                    this.addChild(this._icon1);
                    this.addChild(this._icon2);
                    this.addChild(this._iconLab1);
                    this.addChild(this._iconLab2);
                    this.removeChild(this._jinjieLab);
                }
                this.parentPanel.showBtnBg(true);
            } else if (targetData.operate_type == 2) {
                this.removeChild(this._icon1);
                this.removeChild(this._icon2);
                this.removeChild(this._iconLab1);
                this.removeChild(this._iconLab2);
                this.addChild(this._jinjieLab);
                this.removeChild(this.a_limit);
                this._btn.goToAndStop(2);
                this.parentPanel.showBtnBg(true);
            } else if (targetData.operate_type == 0) {
                this.removeChild(this._icon1);
                this.removeChild(this._icon2);
                this.removeChild(this._iconLab1);
                this.removeChild(this._iconLab2);
                this.removeChild(this._jinjieLab);
                this.removeChild(this._btn);
                this.addChild(this.a_limit);
                this.parentPanel.showBtnBg(false);
            }


            for (var i: number = 0; i < this._propAry.length; i++) {
                UiDraw.drawAttVal(this._propAry[i], targetData.attr_id[i], targetData.attr_value[i]);


                var addStr: string = ""
                if (nextData && nextData.attr_value[i]) {
                    UiDraw.drawAddValTop(this._valAry[i], nextData.attr_value[i] - targetData.attr_value[i]);
                } else {
                    LabelTextFont.clearLabel(this._baseUiAtlas, this._valAry[i].skinName);
                }
            }

            if (targetData.operate_type == 1) {
                IconManager.getInstance().drawItemIcon40(this._icon1, targetData.item_cost[0][0]);
                IconManager.getInstance().drawItemIcon40(this._icon2, targetData.money_cost[0][0]);
                this.drawIconNum();
            } else if (targetData.operate_type == 2) {
                this.drawCost(this._jinjieLab.skinName);
            }

        }
        private _itemNeedNum: number;
        private _itemAllNum: number;
        private _itemID:number;
        public drawIconNum(): void {
            var targetData: any = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID());
            if (!targetData) {
                return;
            }
            if (targetData.length == 0) {
                return;
            }
            if (targetData.item_cost.length == 0) {
                return;
            }
            this._itemNeedNum = targetData.item_cost[0][1];
            this._itemAllNum = GuidData.bag.getItemCount(targetData.item_cost[0][0]);
            this._costVal = targetData.money_cost[0][1];
            this._costType = targetData.money_cost[0][0];
            this._itemID = targetData.item_cost[0][0];
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas,this._icon1.skinName,)
            UiDraw.drawResHasNumAndAllNum(this._iconLab1, targetData.item_cost[0])
            UiDraw.drawResHasNumAndAllNum(this._iconLab2, targetData.money_cost[0])

            // var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this._iconLab1.skinName);
            // var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            // UiDraw.cxtDrawImg(ctx, PuiData.TXTBG, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);


            // var str: string = this._itemAllNum + "/" + this._itemNeedNum;
            // LabelTextFont.writeSingleLabelToCtx(ctx, str, 16, $rec.pixelWitdh - ctx.measureText(str).width - 15, 5, TextAlign.LEFT, ColorType.Orange7a2f21, "", true);
            // this._baseUiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);

        }
        private _costVal: number;
        private _costType: number;
        public drawCost(skin: string): void {
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(skin);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            UiDraw.cxtDrawImg(ctx, PuiData.TXTBG, new Rectangle(0, 10, $rec.pixelWitdh, $rec.pixelHeight - 10), UIData.publicUi);
            var targetData: any = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID());
            UiDraw.cxtDrawImg(ctx, UIuitl.getInstance().costtype(targetData.money_cost[0][0]), new Rectangle(5, 0, 35, 35), UIData.publicUi);

            this._costVal = targetData.money_cost[0][1];
            this._costType = targetData.money_cost[0][0];

            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.Orange7a2f21 + String(targetData.money_cost[0][1]), 16, $rec.pixelWitdh - 5, 13, TextAlign.RIGHT);
            this._baseUiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }


    }

    export class WingQianghuaPanel extends UIConatiner {
        private _baseRender: UIRenderComponent;
        public parentPanel: WingPanel;

        public _baseUiAtlas: UIAtlas;

        public constructor() {
            super();

            this.width = 960;
            this.height = 540;
            this.center = 0;
            this.middle = 0;

            this._baseRender = new UIRenderComponent();
            this.addRender(this._baseRender);

        }

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
        }

        private _propAry: Array<UICompenent>;
        private _valAry: Array<UICompenent>;
        private _icon1: UICompenent;
        private _icon2: UICompenent;
        private _iconLab1: UICompenent;
        private _iconLab2: UICompenent;
        private _btn: FrameCompenent;

        private _qhLab1: UICompenent;
        private _qhLab2: UICompenent;
        private _qhLab3: UICompenent;

        private _qhVal1: UICompenent;
        private _qhVal2: UICompenent;
        private _qhVal3: UICompenent;

        private _qhLev: UICompenent;
        private _qhNextLev: UICompenent;
        private a_arrow: UICompenent;
        private aA_limit: UICompenent;

        public setUiAtlas($uiatlas: UIAtlas): void {
            this._baseUiAtlas = $uiatlas;
            this._baseRender.uiAtlas = $uiatlas;

            this.addUIList(["t_top_title2", "t_line2"], this._baseRender)

            this._qhLev = this._baseRender.getComponent("t_qianghua_lev");
            this.addChild(this._qhLev);
            this._qhNextLev = this._baseRender.getComponent("t_qianghua_nextlev");
            this.addChild(this._qhNextLev);
            this.a_arrow = this._baseRender.getComponent("a_arrow");
            this.addChild(this.a_arrow);
            this.aA_limit = this._baseRender.getComponent("a_limit");

            this._propAry = new Array;
            this._valAry = new Array;

            for (var i: number = 0; i < 7; i++) {
                var lab: UICompenent = this._baseRender.getComponent("t_lab" + (i + 1) + "_qh");
                this.addChild(lab);
                this._propAry.push(lab);

                var val: UICompenent = this._baseRender.getComponent("t_val" + (i + 1) + "_qh");
                this.addChild(val);
                this._valAry.push(val);
            }

            this._icon1 = this._baseRender.getComponent("t_icon1_qh");
            this.addChild(this._icon1);

            this._icon2 = this._baseRender.getComponent("t_icon2_qh");
            this.addChild(this._icon2);

            this._iconLab1 = this._baseRender.getComponent("t_icon_lab1_qh");
            this.addChild(this._iconLab1);

            this._iconLab2 = this._baseRender.getComponent("t_icon_lab2_qh");
            this.addChild(this._iconLab2);

            this._btn = <FrameCompenent>this._baseRender.getComponent("t_btn_qh");
            //this._btn.addEventListener(InteractiveEvent.Down, this.btnClick, this);
            this.addChild(this._btn);
            this._btn.goToAndStop(3);

            //this._qhLab1 = this._baseRender.getComponent("t_qianghua_lab1");
            //this.addChild(this._qhLab1);

            //this._qhLab2 = this._baseRender.getComponent("t_qianghua_lab2");
            //this.addChild(this._qhLab2);

            this._qhLab3 = this._baseRender.getComponent("t_qianghua_lab3");
            this.addChild(this._qhLab3);

            //this._qhVal1 = this._baseRender.getComponent("t_qianghua_val1");
            //this.addChild(this._qhVal1);

            //this._qhVal2 = this._baseRender.getComponent("t_qianghua_val2");
            //this.addChild(this._qhVal2);

            this._qhVal3 = this._baseRender.getComponent("t_qianghua_val3");
            this.addChild(this._qhVal3);

            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._qhLab1.skinName, "当前强化加成:", 14, TextAlign.LEFT, ColorType.Orange7a2f21);
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._qhLab2.skinName, "下级强化加成:", 14, TextAlign.LEFT, ColorType.Orange7a2f21);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._qhLab3.skinName, "当前成功率:", 14, TextAlign.LEFT, ColorType.Orange7a2f21);


            this.drawInfo();
        }


        public applyClick(): void {
            if (this._itemNeedNum > this._itemAllNum) {
                //msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "道具不足", 99);
                var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                $aaa.data = this._itemID;
                ModuleEventManager.dispatchEvent($aaa);
                return;
            }

            if (this._costVal > GuidData.player.getResType(this._costType)) {
                //msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + getResName(this._costType) + "不足", 99);
                var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                $aaa.data = this._costType;
                ModuleEventManager.dispatchEvent($aaa);
                return;
            }
            NetManager.getInstance().protocolos.wings_strength();
        }

        public drawInfo(): void {

            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._qhLev.skinName, ColorType.Orange7a2f21 + "强化:" + ColorType.Orange9a683f + GuidData.grow.getWingQh(), 16, TextAlign.LEFT);

            var targetData: any = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID());
            if (!targetData) {
                return;
            }

            var curQuData: any = TableData.getInstance().getData(TableData.tb_wings_strength, GuidData.grow.getWingQh());
            var nextQhData: any = TableData.getInstance().getData(TableData.tb_wings_strength, GuidData.grow.getWingQh() + 1);
            //尚未处理 nextQhData = null 的情况
            // if(!curQuData){
            //     return;
            // }

            for (var i: number = 0; i < this._propAry.length; i++) {
                //var keyStr: string = "";
                var addStr: string = "";
                if (targetData.attr_id[i]) {
                    // var impove: number = 0;
                    // if (curQuData) {
                    //     impove = curQuData.improve;
                    // }
                    if (curQuData) {
                        UiDraw.drawAttVal(this._propAry[i], curQuData.attr_id[i], curQuData.attr_value[i]);
                        if(nextQhData){
                            UiDraw.drawAddValRight(this._valAry[i], nextQhData.attr_value[i]);
                        }else{
                            // UiDraw.drawAddValRight(this._valAry[i], 0);
                            UiDraw.clearUI(this._valAry[i]);
                        }                        
                    } else if (nextQhData) {
                        UiDraw.drawAttVal(this._propAry[i], nextQhData.attr_id[i], 0);
                        UiDraw.drawAddValRight(this._valAry[i], nextQhData.attr_value[i]);
                    }


                } else {
                    UiDraw.clearUI(this._propAry[i]);
                    UiDraw.clearUI(this._valAry[i]);
                }
            }

            if (nextQhData) {
                //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._qhVal1.skinName, (curQuData ? float2int(curQuData.improve / 100) : 0) + "%", 14, TextAlign.RIGHT, ColorType.color4392ff);
                //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._qhVal2.skinName, (nextQhData ? float2int(nextQhData.improve / 100) : 0) + "%", 14, TextAlign.RIGHT, ColorType.color4392ff);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._qhVal3.skinName, (nextQhData ? float2int(nextQhData.possibility / 100) : 0) + "%", 14, TextAlign.RIGHT, ColorType.color4392ff);


                IconManager.getInstance().drawItemIcon40(this._icon1, nextQhData.item_cost[0][0]);
                IconManager.getInstance().drawItemIcon40(this._icon2, nextQhData.money_cost[0][0]);

                this.drawIconNum();
                //this.drawCost(this._iconLab2.skinName);
                this.parentPanel.showBtnBg(true);

                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._qhNextLev.skinName, ColorType.Orange7a2f21 + "强化:" + ColorType.Orange9a683f + (GuidData.grow.getWingQh() + 1), 16, TextAlign.RIGHT);

            } else {
                this.removeChild(this._qhVal1);



                this.removeChild(this._qhVal2);
                this.removeChild(this._qhVal3);
                this.removeChild(this._icon1);
                this.removeChild(this._icon2);
                this.removeChild(this._iconLab1);
                this.removeChild(this._iconLab2);
                this.removeChild(this._qhLab1);
                this.removeChild(this._qhLab2);
                this.removeChild(this._qhLab3);
                this.removeChild(this._btn);
                this.removeChild(this._qhNextLev);
                this.removeChild(this.a_arrow);
                this.parentPanel.showBtnBg(false);
                this.addChild(this.aA_limit);
            }




        }
        private _itemNeedNum: number;
        private _itemAllNum: number;
        private _itemID:number;

        public drawIconNum(): void {
            var nextQhData: any = TableData.getInstance().getData(TableData.tb_wings_strength, GuidData.grow.getWingQh() + 1);
            if (!nextQhData) {
                return;
            }
            this._itemNeedNum = nextQhData.item_cost[0][1];
            this._itemAllNum = GuidData.bag.getItemCount(nextQhData.item_cost[0][0]);
            this._itemID = nextQhData.item_cost[0][0];
            this._costType = nextQhData.money_cost[0][0];
            this._costVal = nextQhData.money_cost[0][1];

            UiDraw.drawResHasNumAndAllNum(this._iconLab1, nextQhData.item_cost[0]);
            UiDraw.drawResHasNumAndAllNum(this._iconLab2, nextQhData.money_cost[0]);
        }
        private _costVal: number;
        private _costType: number;
        public drawCost(skin: string): void {
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(skin);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            UiDraw.cxtDrawImg(ctx, PuiData.TXTBG, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);
            var nextQhData: any = TableData.getInstance().getData(TableData.tb_wings_strength, GuidData.grow.getWingQh() + 1);
            UiDraw.drawCost(ctx, 5, 2, nextQhData.money_cost[0][0]);

            this._costVal = nextQhData.money_cost[0][1];
            this._costType = nextQhData.money_cost[0][0];

            var str: string = "" + nextQhData.money_cost[0][1];
            LabelTextFont.writeSingleLabelToCtx(ctx, str, 16, $rec.pixelWitdh - ctx.measureText(str).width - 15, 5, TextAlign.LEFT, ColorType.Orange7a2f21, "", true);
            this._baseUiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }


    }


}