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

    export class StateUpUIcompenent extends UICompenent{
        public constructor() {
            super();
        }

        public applyRenderSize(): void {
            if (!this.parent){
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
                this.renderData2[2] = this.tr.x +this.tr.width - this.tr.width * this._uvScale;
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
        private a_taskstate: UICompenent
        private a_btnname: UICompenent
        private a_info: UICompenent
        private a_taskicon: UICompenent
        private a_btn: UICompenent
        private a_pro: StateUpUIcompenent
        private a_protxt: UICompenent
        private a_curicon: UICompenent
        private a_nexticon: UICompenent
        private a_icons: UICompenent
        private a_names: UICompenent
        private a_forces: UICompenent
        private initData(): void {

            this.addChild(this.winmidRender.getComponent("a_leftbg"));
            var leftbg = this.addChild(this.winmidRender.getComponent("a_leftbg1"));
            leftbg.isU = true;
            this.winmidRender.applyObjData();

            this.addChild(this._baseRender.getComponent("a_title"))
            this.t_listindex1 = this.addChild(this._baseRender.getComponent("listindex"));
            this.a_taskstate = this.addChild(this._baseRender.getComponent("a_taskstate"));
            this.a_btnname = this.addChild(this._topRender.getComponent("a_btnname"));
            this.a_info = this.addChild(this._baseRender.getComponent("a_info"));
            this.a_taskicon = this.addChild(this._baseRender.getComponent("a_taskicon"));
            this.a_pro = <StateUpUIcompenent>this.addChild(this._testRender.getComponent("a_pro"));
            this.a_protxt = this.addChild(this._topRender.getComponent("a_protxt"));
            this.a_curicon = this.addChild(this._topRender.getComponent("a_curicon"));
            this.a_nexticon = this.addChild(this._topRender.getComponent("a_nexticon"));
            this.a_icons = this.addChild(this._topRender.getComponent("a_icons"));
            this.a_names = this.addChild(this._topRender.getComponent("a_names"));
            this.a_forces = this.addChild(this._topRender.getComponent("a_forces"));
            this.a_btn = this.addEvntButUp("a_btn", this._baseRender);

            this.addUIList(["a_probg", "a_infobg0", "a_infobg1", "a_bg"], this._bgRender);
            this.addUIList(["a_txt1", "a_txt0", "a_txt4", "a_txt2", "a_txt3", "a_forcebg"], this._baseRender);
        }

        public resize(): void {
            super.resize();
            if (this.achievementList) {
                this.achievementList.left = this.t_listindex1.parent.x / UIData.Scale + this.t_listindex1.x
                this.achievementList.top = this.t_listindex1.parent.y / UIData.Scale + this.t_listindex1.y
            }
        }

        private _effpoint:Vector2D;
        public setpoint($point:Vector2D){
            this._effpoint = $point;
        }

        /**
         * 特效
         */
        private expEff: FrameTipCompenent;
        public showExpEff(): void {
            console.log("up skill lev");
            if (!this._effRender) {
                this._effRender = new FrameUIRender();
                this.addRender(this._effRender);
                this._effRender.setImg(getEffectUIUrl("ui_cb"), 3, 4, ($ui: any) => {
                    this.expEff = $ui;
                    this.expEff.x = this.a_pro.x - 72;
                    this.expEff.y = this.a_pro.y - 55;
                    this.expEff.width = this.expEff.baseRec.width * 1.3;
                    //this.upLevEff.height = this.upLevEff.baseRec.height * 0.8;
                    this.expEff.speed = 5;
                    this.expEff.playOne(this);
                })
            }
            if (this.expEff) {
                this.expEff.playOne(this);
            }
        }

        public showBezierEff($num:number) {
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
            ArtFont.getInstance().writeFontToSkinNameCenter(this._baseRender.uiAtlas, "A_perlev", String(GuidData.player.getLevel()), ArtFont.num66);
            var tabdata = StateUpModel.getInstance().getRecommend();
            console.log("基本数据", tabdata)
            if (tabdata) {
                this.drawPic(this.a_icons, tabdata["id"]);
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_names.skinName, tabdata["name"], 16, TextAlign.CENTER, ColorType.Whiteffeec9);
                ArtFont.getInstance().writeFontToSkinNameCenter(this._baseRender.uiAtlas, this.a_forces.skinName, String(tabdata["force"]), ArtFont.num65);
            }
        }

        private _maxlevflag: boolean = false
        public chgLev() {
            var curlev: number = GuidData.player.getStateLev()
            this.drawPic(this.a_curicon, String(curlev));
            var $obj: any = TableData.getInstance().getData(TableData.tb_realmbreak_base, curlev + 1);
            if (!$obj) {
                this._maxlevflag = true;
                this.drawPic(this.a_nexticon, String(10000));
                this.chgExp();
            } else {
                this.drawPic(this.a_nexticon, String(curlev + 1));
            }
        }

        private drawPic($ui: UICompenent, $iconurl: string) {
            IconManager.getInstance().getIcon(getStateUpIconUrl($iconurl), ($img: any) => {
                var rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                TextureManager.getInstance().updateTexture($ui.uiRender.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
            });
        }

        public chgExp() {
            if (this._maxlevflag) {
                this.a_pro.uvScale = 1;
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_protxt.skinName, "已满级", 14, TextAlign.CENTER, ColorType.Whiteffffff);
            } else {
                var $obj: any = TableData.getInstance().getData(TableData.tb_realmbreak_base, GuidData.player.getStateLev());
                var raito: number = GuidData.player.getStateExp() / $obj["exp"]
                var str: string = GuidData.player.getStateExp() + "/" + $obj["exp"]
                this.a_pro.uvScale = raito;
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_protxt.skinName, str, 14, TextAlign.CENTER, ColorType.Whiteffffff);
            }
        }

        public opensystem() {
            if (!this._isopen) {
                if (GuidData.player.getsyspageopen(SharedDef.MODULE_EXP, SharedDef.MODULE_EXP_QUEST)) {
                    this._isopen = true;
                }
                if (this._isopen) {
                    this.refreshState();
                } else {
                    this.setUiListVisibleByItem([this.a_btn, this.a_btnname], false);
                    var $obj: any = TableData.getInstance().getData(TableData.tb_system_base, SharedDef.MODULE_EXP * 10 + SharedDef.MODULE_EXP_QUEST)
                    LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_taskstate.skinName, $obj["level"] + "级解锁", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                }

            }

        }

        public refreshState() {
            this.a_taskicon.x = 417
            this.a_taskstate.x = 489
            this.a_info.x = 496

            var $obj: any = TableData.getInstance().getData(TableData.tb_realmbreak_dailyquest_base, 1)
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_taskstate.skinName, "今日已完成任务：" + GuidData.player.getStateTaskNum() + "/" + $obj["daily_quest_count"], 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.setUiListVisibleByItem([this.a_btnname], true);
            if (GuidData.player.getStateTaskRecive() == 1) {
                this.setUiListVisibleByItem([this.a_btn], false);
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_btnname.skinName, "已完成", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            } else {
                if (GuidData.player.getStateTaskNum() >= $obj["daily_quest_count"]) {
                    LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_btnname.skinName, "领取", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                } else {
                    LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_btnname.skinName, "前往", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                }
                this.setUiListVisibleByItem([this.a_btn], true);
            }
        }

        private _isopen: boolean = false;
        public show($data: number): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.chgLev();
            this.chgExp();
            this.drawPersonLev();
            if (this._isopen) {
                this.refreshState();
            } else {
                this.opensystem();
            }
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
                case this.a_btn:
                    var $obj: any = TableData.getInstance().getData(TableData.tb_realmbreak_dailyquest_base, 1)
                    if (GuidData.player.getStateTaskNum() >= $obj["daily_quest_count"]) {
                        NetManager.getInstance().protocolos.pick_realmbreak_daily_reward();
                    } else {
                        ModulePageManager.openPanel(SharedDef.MODULE_EXP);
                    }
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
            this.setData($ary, AchievementRender, 601, 253, 0, 85, 3, 512, 512, 1, 5);
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
            var $sListItemData = this.getData(StateUpModel.getInstance().getTaskAry());
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
        private As_icon: UICompenent;
        private As_name: UICompenent;
        private As_probg: UICompenent;
        private As_reward0: UICompenent;
        private As_reward1: UICompenent;
        private As_btn: UICompenent;
        private btnAry: Array<UICompenent>
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.As_bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "As_bg", 0, 0, 601, 84, 51, 20);
            $container.addChild(this.As_bg);

            this.As_icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "As_icon", 16, 9, 68, 68);
            $container.addChild(this.As_icon);
            this.As_name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "As_name", 110, 22, 232, 20);
            $container.addChild(this.As_name);
            this.As_probg = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "As_probg", 93, 51, 257, 18);
            $container.addChild(this.As_probg);
            this.As_reward0 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "As_reward0", 368, 20, 48, 48);
            $container.addChild(this.As_reward0);
            this.As_reward1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "As_reward1", 420, 20, 48, 48);
            $container.addChild(this.As_reward1);

            this.btnAry = new Array
            this.btnAry.push(this.As_reward0);
            this.btnAry.push(this.As_reward1);

            this.As_btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "As_btn", 480, 21, 106, 46);
            $container.addChild(this.As_btn);
            this.As_btn.addEventListener(InteractiveEvent.Up, this.butClik, this);
        }

        private applyrender(): void {
            var vo: TaskCell = this.itdata.data;

            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.As_bg.skinName, UIData.publicUi, PuiData.STATEUP_LISTBG);

            this.drawIcon();
            //name
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.As_name.skinName, vo.tb_quest.questName, 16, TextAlign.LEFT, ColorType.Brown491207);

            this.drawProgress();

            var costItem: Array<Array<number>> = vo.tb_quest.rewards[0];
            for (var i = 0; i < 2; i++) {
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
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.As_probg.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            var progress_bg: UIRectangle = this.parentTarget.baseAtlas.getRec("Pro_bg")
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, progress_bg.pixelX, progress_bg.pixelY, progress_bg.pixelWitdh, progress_bg.pixelHeight, 0, 0, progress_bg.pixelWitdh, progress_bg.pixelHeight);

            var ratio: number = vo.qusdata.items[0].process / vo.qusdata.items[0].num;
            var ratiostr: string = vo.qusdata.items[0].process + "/" + vo.qusdata.items[0].num;
            var progress_bar: UIRectangle = this.parentTarget.baseAtlas.getRec("Pro")
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, progress_bar.pixelX + progress_bar.pixelWitdh - progress_bar.pixelWitdh * ratio, progress_bar.pixelY, progress_bar.pixelWitdh * ratio, progress_bar.pixelHeight, 7, 1, progress_bar.pixelWitdh * ratio, progress_bar.pixelHeight);

            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.Whitefffce6 + ratiostr, 14, 128, 0, TextAlign.CENTER);

            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }


        private drawIcon(): void {
            var vo: TaskCell = this.itdata.data;
            LoadManager.getInstance().load(Scene_data.fileRoot + "ui/load/achievementicon/1.png", LoadManager.IMG_TYPE,
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.As_icon.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    //头像
                    ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);

                    // ArtFont.getInstance().writeFontToCtxCenten(ctx, String(vo.data.achval), ArtFont.num1, 34, 45);

                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });

        }

        private butClik(evt: InteractiveEvent): void {
            var point:Vector2D = new Vector2D(evt.x, evt.y);
            if (!UIManager.getInstance().disMoveNnum(point, 10)) {
                return;
            }

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
                    ModuleEventManager.dispatchEvent(new StateUpEvent(StateUpEvent.HIDE_STATEUP_PANEL))
                }
            }
        }


        private setnull(): void {
            UiDraw.clearUI(this.As_bg);
            UiDraw.clearUI(this.As_icon);
            UiDraw.clearUI(this.As_name);
            UiDraw.clearUI(this.As_probg);
            UiDraw.clearUI(this.As_reward0);
            UiDraw.clearUI(this.As_reward1);
            UiDraw.clearUI(this.As_btn);
        }
    }
}