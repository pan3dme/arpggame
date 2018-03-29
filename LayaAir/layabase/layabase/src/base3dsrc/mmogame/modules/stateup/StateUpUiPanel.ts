module stateup {

    export class stateupUIRenderComponent extends UIRenderComponent {
        public constructor() {
            super();
        }
        public creatBaseComponent($skinName: string): StateUpUIcompenent {
            var ui: StateUpUIcompenent = new StateUpUIcompenent();
            ui.skinName = $skinName;
            var rec: UIRectangle = this.uiAtlas.getRec($skinName);

            ui.tr.setRec(rec);
            ui.width = rec.pixelWitdh;
            ui.height = rec.pixelHeight;

            ui.uiRender = this;
            return ui;
        }
    }

    export class StateUpUIcompenent extends UICompenent {
        public constructor() {
            super();
        }

        public applyRenderSize(): void {
            if (!this.parent) {
                return;
            }

            this.renderX = this.absoluteX / Scene_data.stageWidth;
            this.renderY = this.absoluteY / Scene_data.stageHeight;

            this.renderWidth = this.absoluteWidth / Scene_data.stageWidth;
            this.renderHeight = this.absoluteHeight / Scene_data.stageHeight;


            if (this._uvScale >= 0) {
                //this.renderX + this.renderWidth * this.scale - this.renderWidth * this.scale * this._uvScale;
                this.renderData[0] = this.renderX;
                this.renderData[1] = this.renderY;
                this.renderData[2] = this.renderWidth * this.scale * this._uvScale;
                this.renderData[3] = this.renderHeight * this.scale;

                //this.tr.x +this.tr.width - this.tr.width * this._uvScale
                this.renderData2[0] = this.tr.width * this._uvScale;
                this.renderData2[1] = this.tr.height;
                this.renderData2[2] = this.tr.x + this.tr.width - this.tr.width * this._uvScale;
                this.renderData2[3] = this.tr.y;
            } else {
                var $vt: number = Math.abs(this._uvScale);
                this.renderData[0] = this.renderX + this.renderWidth * (1 - $vt);
                this.renderData[1] = this.renderY;
                this.renderData[2] = this.renderWidth * this.scale * $vt;
                this.renderData[3] = this.renderHeight * this.scale;

                this.renderData2[0] = this.tr.width * $vt;
                this.renderData2[1] = this.tr.height;
                this.renderData2[2] = this.tr.x + (this.tr.width * (1 - $vt));
                this.renderData2[3] = this.tr.y;
            }


            this.uiRender.makeRenderDataVc(this.vcId)

            // 
        }
    }

    export class StateUpUiPanel extends WindowUi {
        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _testRender: stateupUIRenderComponent;
        private _topRender: UIRenderComponent;
        private _effRender: FrameUIRender;
        // private _redPointRender: RedPointRender;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._testRender.dispose();
            this._testRender = null;
            this._topRender.dispose();
            this._topRender = null;
            // this._redPointRender.dispose();
            // this._redPointRender = null;
            if (this.achievementList) {
                this.achievementList.dispose();
                this.achievementList = null;
            }

            if (this._effRender) {
                this._effRender.dispose();
                this._effRender = null;
            }



            super.dispose();
        }

        public achievementList: AchievementList;
        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._testRender = new stateupUIRenderComponent;
            this.addRender(this._testRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
            // this._redPointRender = new RedPointRender;
            // this.addRender(this._redPointRender);



            this._bgRender.uiAtlas = new UIAtlas;

        }

        public applyLoad(): void {
            this._bgRender.uiAtlas.setInfo("ui/uidata/stateup/stateup.xml", "ui/uidata/stateup/stateup.png", () => { this.loadConfigCom() }, "ui/uidata/stateup/stateuppc.png");
        }

        private loadConfigCom(): void {
            this._baseRender.uiAtlas = this._bgRender.uiAtlas;
            this._topRender.uiAtlas = this._bgRender.uiAtlas;
            this.winmidRender.uiAtlas = this._bgRender.uiAtlas;
            this._testRender.uiAtlas = this._bgRender.uiAtlas;
            this.initData();
            this.resize();

            this.applyLoadComplete();
        }

        private t_listindex1: UICompenent
        private a_pro: StateUpUIcompenent
        private a_protxt: UICompenent
        private a_curicon: UICompenent
        private a_nexticon: UICompenent
        private a_names: UICompenent
        private a_forces: UICompenent
        private b_unlock: UICompenent
        private b_openlev: UICompenent
        private b_gz: UICompenent
        private infoAry: Array<UICompenent>
        private initData(): void {

            this.addChild(this._baseRender.getComponent("a_title"))
            this.t_listindex1 = this.addChild(this._baseRender.getComponent("listindex"));
            this.a_pro = <StateUpUIcompenent>this.addChild(this._testRender.getComponent("a_pro"));
            this.a_protxt = this.addChild(this._topRender.getComponent("a_protxt"));
            this.a_curicon = this.addChild(this._baseRender.getComponent("a_curicon"));
            this.a_nexticon = this.addChild(this._baseRender.getComponent("a_nexticon"));
            this.addChild(this._topRender.getComponent("a_icons"));
            this.b_unlock = this._topRender.getComponent("b_unlock");
            this.b_openlev = this.addChild(this._topRender.getComponent("b_openlev"));
            this.a_names = this.addChild(this._topRender.getComponent("a_names"));
            this.a_forces = this.addChild(this._topRender.getComponent("a_forces"));
            this.b_gz = this.addEvntButUp("b_gz", this._topRender);

            this.addUIList(["a_probg", "a_infobg0", "a_infobg1",  "b_bg0", "b_bg1"], this._bgRender);
            this.addUIList(["a_txt1", "a_txt0", "a_forcebg"], this._baseRender);

            this.infoAry = new Array
            for (let i = 0; i < 3; i++) {
                this.infoAry.push(this.addChild(this._bgRender.getComponent("b_infobg" + i)));
                this.infoAry.push(this.addChild(this._baseRender.getComponent("b_info" + i)));
            }
        }

        public resize(): void {
            super.resize();
            if (this.achievementList) {
                this.achievementList.left = this.t_listindex1.parent.x / UIData.Scale + this.t_listindex1.x
                this.achievementList.top = this.t_listindex1.parent.y / UIData.Scale + this.t_listindex1.y
            }
        }

        private _effpoint: Vector2D;
        public setpoint($point: Vector2D) {
            this._effpoint = $point;
        }

        /**
         * 特效
         */
        private expEff: FrameTipCompenent;
        public showExpEff(): void {
            //console.log("up skill lev");
            if (!this._effRender) {
                this._effRender = new FrameUIRender();
                this.addRender(this._effRender);
                this._effRender.setImg(getEffectUIUrl("ui_cb"), 3, 4, ($ui: any) => {
                    this.expEff = $ui;
                    this.expEff.x = this.a_pro.x - 95;
                    this.expEff.y = this.a_pro.y - 55;
                    this.expEff.width = this.expEff.baseRec.width * 1.4;
                    //this.upLevEff.height = this.upLevEff.baseRec.height * 0.8;
                    this.expEff.speed = 5;
                    this.expEff.playOne(this);
                })
            }
            if (this.expEff) {
                this.expEff.playOne(this);
            }
        }

        public showBezierEff($num: number) {
            for (var i: number = 0; i < Math.min($num, 15); i++) {
                var $data: msgtip.MsgEffectsMoveData = new msgtip.MsgEffectsMoveData()
                var $pos: Vector2D = UiTweenVo.getPosByPanel(this._effpoint, { width: UIData.designWidth, height: UIData.designHeight, center: 0, middle: 0 })
                $data.startTM = TimeUtil.getTimer() + random(200)
                $data.endTM = $data.startTM + 500;
                $data.pos = $pos;
                $data.bezierPos = new Vector2D($pos.x + Math.random() * 400 - 200, $pos.y + Math.random() * 400 - 200);
                var $toPos: Vector2D = UiTweenVo.getPosByPanel(new Vector2D(this.a_protxt.x, this.a_protxt.y), { width: UIData.designWidth, height: UIData.designHeight, center: 0, middle: 0 })
                $data.toPos = $toPos
                $data.MONEY_TYPE = 107;
                var $MsgTipEvent: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_EFFECTS_DATA)
                $MsgTipEvent.data = $data;
                ModuleEventManager.dispatchEvent($MsgTipEvent);
            }
        }

        public showflyword($str: string): void {
            var v21d: Vector2D = new Vector2D(this.a_pro.parent.x + this.a_pro.width, this.a_pro.y);
            var v2d: Vector2D = UiTweenVo.getPosByPanel(v21d, { width: UIData.designWidth, height: UIData.designHeight })
            // var v2d: Vector2D = UiTweenVo.getPosByPanel(new Vector2D(204, 473), { width: 960, height: 540 })
            v2d.x = v2d.x * UIData.Scale;
            v2d.y = v2d.y * UIData.Scale;

            msgtip.MsgTipManager.outStr($str, msgtip.PopMsgVo.type8, v2d);
        }


        public drawPersonLev() {
            // var tabdata = StateUpModel.getInstance().getRecommend();
            var tabdata = TableData.getInstance().getData(TableData.tb_realmbreak_base, GuidData.player.getStateLev() + 1);
            if(!tabdata){
                tabdata = TableData.getInstance().getData(TableData.tb_realmbreak_base, GuidData.player.getStateLev());
            }
            //console.log("基本数据", tabdata)
            if (tabdata) {
                UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this._baseRender.uiAtlas, this.a_names.skinName, "stateuplev" + tabdata["id"]);
                ArtFont.getInstance().writeFontToSkinName(this._baseRender.uiAtlas, this.a_forces.skinName, String(tabdata["force"]), ArtFont.num65, TextAlign.LEFT);

                var arystr: Array<string>;
                var $v: number = Math.floor((GuidData.player.getCharType() - 1) / 2);
                if ($v == 0) {
                    arystr = tabdata["detail1"][0]
                }
                if ($v == 1) {
                    arystr = tabdata["detail2"][0]
                }
                if ($v == 2) {
                    arystr = tabdata["detail3"][0]
                }

                for (let i = 0; i < 3; i++) {
                    if (i < arystr.length) {
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.infoAry[i * 2 + 1].skinName, arystr[i], 16, TextAlign.LEFT);
                    }
                    this.setUiListVisibleByItem([this.infoAry[i * 2], this.infoAry[i * 2 + 1]], i < arystr.length);
                }
            }
        }

        private _maxlevflag: boolean = false
        public chgLev() {
            var curlev: number = GuidData.player.getStateLev()
            UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this._baseRender.uiAtlas, this.a_curicon.skinName, "uplev" + curlev);

            var $obj: any = TableData.getInstance().getData(TableData.tb_realmbreak_base, curlev + 1);
            if (!$obj) {
                this._maxlevflag = true;
                UiDraw.clearUI(this.a_nexticon);
                this.setUiListVisibleByItem([this.b_unlock], true);
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_openlev.skinName, "未完待续", 14, TextAlign.CENTER, ColorType.White9A683F);
                this.chgExp();
            } else {
                UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this._baseRender.uiAtlas, this.a_nexticon.skinName, "uplev" + (curlev + 1));
                this.setUiListVisibleByItem([this.b_unlock], GuidData.player.getLevel() < $obj["level"]);
                if (GuidData.player.getLevel() < $obj["level"]) {
                    LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_openlev.skinName, $obj["level"] + "级解锁", 14, TextAlign.CENTER, ColorType.White9A683F);
                } else {
                    UiDraw.clearUI(this.b_openlev);
                }
            }
        }

        public chgExp() {
            // if (this._maxlevflag) {
            //     this.a_pro.uvScale = 1;
            //     LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_protxt.skinName, "已满级", 14, TextAlign.CENTER, ColorType.Whiteffffff);
            // } else {
            var $obj: any = TableData.getInstance().getData(TableData.tb_realmbreak_base, GuidData.player.getStateLev());
            var raito: number = GuidData.player.getStateExp() / $obj["exp"]
            var str: string = ColorType.Whiteffffff + GuidData.player.getStateExp() + "/" + $obj["exp"]
            if (raito > 1) {
                raito = 1;
                str = ColorType.Coffeefee87b + GuidData.player.getStateExp() + ColorType.Whiteffffff + "/" + $obj["exp"]
            }
            this.a_pro.uvScale = raito;
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_protxt.skinName, str, 14, TextAlign.CENTER, ColorType.Whiteffffff);
            // }
        }


        public show($data: number): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.chgLev();
            this.chgExp();
            this.drawPersonLev();
            if (!this.achievementList) {
                this.achievementList = new AchievementList();
                this.achievementList.init(this._baseRender.uiAtlas);
            }
            this.achievementList.show();

            this.resize();
        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            ModulePageManager.hideResTittle();
            if (this.achievementList) {
                this.achievementList.hide();
            }
        }


        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new StateUpEvent(StateUpEvent.HIDE_STATEUP_PANEL))
                    break;
                case this.b_gz:
                    ModuleEventManager.dispatchEvent(new StateUpEvent(StateUpEvent.SHOW_GZ_PANEL))
                    break;
                default:
                    break;
            }
        }
    }


    /**
     * RightList
     */
    export class AchievementList extends SList {

        public constructor() {
            super();
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, AchievementRender, 601, 345, 0, 62, 5, 1024, 512, 1, 8);
        }

        public getData(aa: Array<TaskCell>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < aa.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = aa[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        public refreshDraw() {
            var taskary: Array<TaskCell> = StateUpModel.getInstance().getTaskAry();
            SharedDef
            var ary1: Array<TaskCell> = new Array//已完成
            var ary2: Array<TaskCell> = new Array//未完成
            for (let i = 0; i < taskary.length; i++) {
                if (taskary[i].qusdata.taskState == SharedDef.QUEST_STATUS_COMPLETE) {
                    ary1.push(taskary[i]);
                } else if (taskary[i].qusdata.taskState != SharedDef.QUEST_STATUS_UNAVAILABLE) {
                    ary2.push(taskary[i]);
                }
            }

            if (ary1.length > 1) {
                ary1.sort(
                    function (a: TaskCell, b: TaskCell): number {
                        return a.tb_quest.id - b.tb_quest.id
                    }
                )
            }
            if (ary2.length > 1) {
                ary2.sort(
                    function (c: TaskCell, d: TaskCell): number {
                        return c.tb_quest.id - d.tb_quest.id
                    }
                )
            }

            taskary = ary1.concat(ary2);

            var $sListItemData = this.getData(taskary);
            this.refreshData($sListItemData);
        }

        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshDraw();
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class AchievementRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private As_bg: UICompenent;
        private As_name: UICompenent;
        private As_probg: UICompenent;
        private As_reward0: UICompenent;
        private As_btn: UICompenent;
        private btnAry: Array<UICompenent>
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.As_bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "As_bg", 0, 0, 601, 62, 51, 20);
            $container.addChild(this.As_bg);

            this.As_name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "As_name", 34, 13, 232, 20);
            $container.addChild(this.As_name);
            this.As_probg = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "As_probg", 29, 35, 368, 18);
            $container.addChild(this.As_probg);
            this.As_reward0 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "As_reward0", 419, 9, 48, 48);
            $container.addChild(this.As_reward0);

            this.btnAry = new Array
            this.btnAry.push(this.As_reward0);

            this.As_btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "As_btn", 479, 10, 106, 46);
            $container.addChild(this.As_btn);
            this.As_btn.addEventListener(InteractiveEvent.Up, this.butClik, this);
        }

        private applyrender(): void {
            var vo: TaskCell = this.itdata.data;

            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.As_bg.skinName, UIData.publicUi, PuiData.STATEUP_LISTBG);

            //name
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.As_name.skinName, vo.tb_quest.questName, 16, TextAlign.LEFT, ColorType.Brown491207);

            this.drawProgress();

            var costItem: Array<Array<number>> = vo.tb_quest.rewards[0];
            for (var i = 0; i < this.btnAry.length; i++) {
                if (i < costItem.length) {
                    IconManager.getInstance().drawItemIcon40(this.btnAry[i], costItem[i][0], costItem[i][1]);
                } else {
                    IconManager.getInstance().clearItemEvent(this.btnAry[i]);
                    UiDraw.clearUI(this.btnAry[i]);
                }
            }

            this.drawBtn();
        }

        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            } else {
                this.setnull();
            }
        }


        private drawBtn(): void {
            var vo: TaskCell = this.itdata.data;
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.As_btn.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            var btnrect: UIRectangle;
            if (vo.qusdata.taskState == SharedDef.QUEST_STATUS_COMPLETE) {
                btnrect = this.parentTarget.baseAtlas.getRec("Receive");
            } else {
                btnrect = this.parentTarget.baseAtlas.getRec("Go");
            }
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, btnrect.pixelX, btnrect.pixelY, btnrect.pixelWitdh, btnrect.pixelHeight, 0, 0, btnrect.pixelWitdh, btnrect.pixelHeight);

            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }


        private drawProgress(): void {
            var vo: TaskCell = this.itdata.data;
            //console.log("---vo.qusdata---", vo);
            if (vo.qusdata.items.length > 0) {
                var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.As_probg.skinName);
                var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                var progress_bg: UIRectangle = this.parentTarget.baseAtlas.getRec("Pro_bg")
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, progress_bg.pixelX, progress_bg.pixelY, progress_bg.pixelWitdh, progress_bg.pixelHeight, 0, 0, progress_bg.pixelWitdh, progress_bg.pixelHeight);

                var ratio: number = vo.qusdata.items[0].process / vo.qusdata.items[0].num;
                var ratiostr: string = vo.qusdata.items[0].process + "/" + vo.qusdata.items[0].num;

                if (ratio > 0) {
                    var progress_bar: UIRectangle = this.parentTarget.baseAtlas.getRec("Pro")
                    var posx: number = progress_bar.pixelX + progress_bar.pixelWitdh - (progress_bar.pixelWitdh * ratio);
                    ctx.drawImage(this.parentTarget.baseAtlas.useImg, posx, progress_bar.pixelY, progress_bar.pixelWitdh * ratio, progress_bar.pixelHeight, 7, 1, progress_bar.pixelWitdh * ratio, progress_bar.pixelHeight);
                }

                LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.Whitefffce6 + ratiostr, 14, $rec.pixelWitdh / 2, 0, TextAlign.CENTER);

                this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            }
        }



        private butClik(evt: InteractiveEvent): void {
            var point: Vector2D = new Vector2D(evt.x, evt.y);
            if (!UIManager.getInstance().disMoveNnum(point, 10)) {
                return;
            }
            UIManager.popClikNameFun("As_btn");
            if (this.itdata && this.itdata.data) {
                var vo: TaskCell = this.itdata.data;
                if (vo.qusdata.taskState == SharedDef.QUEST_STATUS_COMPLETE) {
                    //领取
                    var $evt = new stateup.StateUpEvent(stateup.StateUpEvent.CLICK_EVT);
                    $evt.data = point;
                    ModuleEventManager.dispatchEvent($evt);
                    NetManager.getInstance().protocolos.pick_quest_realmbreak(vo.qusdata.indx);
                } else {
                    //前往
                    var $taskVo: quest.QuestTaskVo = new quest.QuestTaskVo();
                    $taskVo.questDataVo = vo.qusdata
                    quest.QuestModel.getInstance().meshQuestTargets($taskVo, vo.tb_quest.targetsPosition[0]);
                    // ModuleEventManager.dispatchEvent(new StateUpEvent(StateUpEvent.HIDE_STATEUP_PANEL))
                }
            }
        }


        private setnull(): void {
            UiDraw.clearUI(this.As_bg);
            UiDraw.clearUI(this.As_name);
            UiDraw.clearUI(this.As_probg);
            UiDraw.clearUI(this.As_reward0);
            UiDraw.clearUI(this.As_btn);

            IconManager.getInstance().clearItemEvent(this.As_reward0);
        }
    }
}