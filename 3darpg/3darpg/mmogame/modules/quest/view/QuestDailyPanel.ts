module quest {
    export class QuestDailyPanel extends WindowUi {

        private _bgRender: UIRenderComponent;
        private _publicbgRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _midRender: UIRenderComponent
        private _frameRender: FrameUIRender;
        public handlerFun: Function

        public dispose(): void {
            this._midRender.dispose();
            this._midRender = null;
            this._topRender.dispose();
            this._topRender = null;

            if (this.dailyQuestList) {
                this.dailyQuestList.dispose();
                this.dailyQuestList = null;
            }
            if (this._frameRender) {
                this._frameRender.dispose();
                this._frameRender = null;
            }
            super.dispose();
        }

        constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0
            this.middle = 0

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)

            this._publicbgRender = new UIRenderComponent;
            this.addRender(this._publicbgRender)

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender)

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

            this._topRender.uiAtlas = new UIAtlas();

        }

        public applyLoad(): void {
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            this._publicbgRender.uiAtlas = WindowUi.winUIAtlas;
            this._topRender.uiAtlas.setInfo("ui/uidata/quest/daily.xml", "ui/uidata/quest/daily.png", () => { this.loadConfigCom() }, "ui/uidata/quest/dailypc.png");
            // });
        }


        private _aryrewardall: Array<UICompenent>;
        private _aryreward: Array<UICompenent>;
        private btn: UICompenent
        private listindex: UICompenent
        private a_6: UICompenent
        private a_3: UICompenent
        public dailyQuestList: DailyQuestList;
        private loadConfigCom(): void {
            this._bgRender.uiAtlas = this._topRender.uiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;

            var renderLevel: UIRenderComponent = this._topRender;

            this.a_6 = this.addChild(<UICompenent>renderLevel.getComponent("a_6"));
            this.a_3 = this.addChild(<UICompenent>this._midRender.getComponent("a_3"));
            var a_4 = this.addChild(<UICompenent>this._midRender.getComponent("a_4"));
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, a_4.skinName, ColorType.colorb96d49 + "完成全部任务奖励", 16, TextAlign.CENTER, ColorType.Brown7a2f21)

            this.listindex = this.addChild(<UICompenent>renderLevel.getComponent("listindex"));
            // this.addUIList(["a_bg"], this._bgRender);
            this.addUIList(["a_2_1", "a_10", "a_9", "a_8", "a_11_1", "a_11_2", "a_5", "a_huawen", "a_btntxt"], this._midRender);

            this._aryrewardall = new Array
            this._aryreward = new Array
            for (var i = 0; i < 3; i++) {
                var prop1 = this.addChild(<UICompenent>renderLevel.getComponent("rewardAll_" + (i + 1)));
                prop1.addEventListener(InteractiveEvent.Up, this.propClik, this);
                this._aryrewardall.push(prop1);
                var prop2 = this.addChild(<UICompenent>renderLevel.getComponent("reward_" + (i + 1)));
                prop2.addEventListener(InteractiveEvent.Up, this.propClik, this);
                this._aryreward.push(prop2);
            }

            var cnew_right_bg_top = this.addChild(this._publicbgRender.getComponent("cnew_right_bg_top"));
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "b_right_bg_top", renderLevel);
            var cnew_right_bg_bottom = this.addChild(this._publicbgRender.getComponent("cnew_right_bg_bottom"));
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "b_right_bg_bottom", renderLevel);

            this.btn = this.addEvntButUp("cnew_btn1", this._publicbgRender);
            this.setSizeForPanelUiCopy(this.btn, "btn", renderLevel);

            this._publicbgRender.applyObjData();

            this.buildFram();
        }

        private effui: FrameTipCompenent;
        private buildFram(): void {
            if (!this._frameRender) {
                this._frameRender = new FrameUIRender();
                this.addRender(this._frameRender);
                this._frameRender.setImg(getEffectUIUrl("ef_fl"), 4, 4, ($ui: any) => {
                    this.effui = $ui;
                    this.effui.x = this.btn.x - 68
                    this.effui.y = this.btn.y - 18
                    this.effui.width = this.effui.baseRec.width * 2.2;
                    this.effui.height = this.effui.baseRec.height * 0.7;
                    this.effui.speed = 3;
                    this.applyLoadComplete();
                }, 1);
            } else {
                this.applyLoadComplete();
            }
        }

        public playEff($isvisiable: boolean): void {
            if (!this.effui) {
                return;
            }
            if ($isvisiable) {
                this.addChild(this.effui);
                this.effui.play();
            } else {
                this.removeChild(this.effui);
            }
        }


        private setUiSizeByName($ui: UICompenent, $name: string): void {
            var $temp: UICompenent = this._topRender.getComponent($name);
            $ui.x = $temp.x
            $ui.y = $temp.y
            $ui.width = $temp.width
            $ui.height = $temp.height
        }


        public close(): void {
            UIManager.getInstance().removeUIContainer(this);
            if (this.dailyQuestList) {
                this.dailyQuestList.hide();
            }
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.w_close:
                    this.close();
                    break;
                case this.btn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    var tempvo: tb.TB_quest_daily2 = tb.TB_quest_daily2.getTempVo(1);
                    var $iscomplete: boolean = GuidData.quest.getDailyQuestCompleteNum() >= QuestModel.getInstance().getQuestDailyVo().length;

                    console.log("===", GuidData.quest.getDailyQuestCompleteNum(), tempvo.finishQuestsNum[0], GuidData.quest.getDailyQuestSubmitState());
                    if (GuidData.quest.getDailyQuestCompleteNum() >= tempvo.finishQuestsNum[0] && !GuidData.quest.getDailyQuestSubmitState()) {
                        if (!$iscomplete) {
                            AlertUtil.show("您的任务还未全部完成，是否交付任务？", "提示", (a: any) => { this.backFun(a) },2,["是","否"])
                        } else {
                            this.submitfuc();
                        }
                    } else {
                        if (GuidData.quest.getDailyQuestSubmitState()) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您已提交过任务", 99);
                        } else {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "请至少完成" + tempvo.finishQuestsNum[0] + "个任务", 99);
                        }
                    }
                    break;

                default:
                    break;
            }
        }

        private backFun(a: any): void {
            if (a == 1) {
                this.submitfuc();
            }
        }

        private submitfuc(): void {
            NetManager.getInstance().protocolos.submit_quest_daily2();
        }


        private propClik(evt: InteractiveEvent): void {
            if (evt.target.data) {
                //查看奖励信息
                var aa: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_ID_EVENT);
                aa.id = evt.target.data;
                ModuleEventManager.dispatchEvent(aa);
            }
        }


        public resize(): void {
            super.resize();
            if (this.dailyQuestList) {
                this.dailyQuestList.left = this.listindex.parent.x / UIData.Scale + this.listindex.x
                this.dailyQuestList.top = this.listindex.parent.y / UIData.Scale + this.listindex.y
            }
        }
        /**
         * 
         */
        public refrish(): void {

            //左侧奖励绘制
            var tempvo: tb.TB_quest_daily2 = tb.TB_quest_daily2.getTempVo(1);
            //日常任务是否已经提交额外奖励领取
            var $issubmit: boolean = GuidData.quest.getDailyQuestSubmitState();

            // var $completenum: number = GuidData.quest.getDailyQuestCompleteNum();

            var $completenum: number = this.getMinrewardNum();
            //服务端的索引从1开始
            console.log("--$completenum--", $completenum);
            var $finish_rewardvo: tb.TB_quest_daily2_finish_reward = tb.TB_quest_daily2_finish_reward.getTempVo(tempvo.rewardsSelect[$completenum - 1]);

            // if ($completenum == 0) {
            //     $completenum = 1;
            // }
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_3.skinName, ColorType.colorb96d49 + "交付" + ColorType.color2daa35 + $completenum + ColorType.colorb96d49 + "个任务基础奖励", 16, TextAlign.CENTER, ColorType.Brown7a2f21)

            var $iscomplete: boolean = GuidData.quest.getDailyQuestCompleteNum() >= QuestModel.getInstance().getQuestDailyVo().length;

            //判断是否完成全部任务。拿当前完成任务数和总任务数比较
            //全部奖励
            for (var index = 0; index < tempvo.allFinishrewards.length; index++) {
                this.drawProp(this._aryrewardall[index], $issubmit, $iscomplete, tempvo.allFinishrewards[index]);
                if (tempvo.allFinishrewards.length == 1) {
                    LabelTextFont.clearLabel(this._topRender.uiAtlas, this._aryrewardall[1].skinName);
                }
            }
            //基础奖励
            for (var index = 0; index < $finish_rewardvo.rewards.length; index++) {
                this.drawProp(this._aryreward[index], $issubmit, true, $finish_rewardvo.rewards[index]);
                if ($finish_rewardvo.rewards.length == 1) {
                    LabelTextFont.clearLabel(this._topRender.uiAtlas, this._aryreward[1].skinName);
                }
            }

            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_6.skinName, ColorType.colorb96d49 + "任务完成情况：" + ColorType.Green2ca937 + this.getCompleteNum() + "/" + QuestModel.getInstance().getQuestDailyVo().length, 16, TextAlign.CENTER, ColorType.Brown7a2f21)


            this.drawBtn($issubmit);

            if (!this.dailyQuestList) {
                this.dailyQuestList = new DailyQuestList();
                this.dailyQuestList.init(this._topRender.uiAtlas);
            }
            this.dailyQuestList.show();
            console.log("--------------------------------------------",QuestModel.getInstance().getQuestDailyVo(),GuidData.quest.getDailyQuestCompleteNum(),GuidData.quest.getDailyQuestSubmitState());
            this.playEff($iscomplete && !GuidData.quest.getDailyQuestSubmitState());
            this.resize();


        }

        private getCompleteNum(): number {
            var aa = QuestModel.getInstance().getQuestDailyVo();
            var completenum: number = 0;
            for (var i = 0; i < aa.length; i++) {
                if (aa[i].questDataVo.taskState == SharedDef.QUEST_STATUS_END) {
                    completenum++;
                }
            }
            console.log("-completenum--", completenum);
            return completenum;
        }

        /**
         * 得到当前完成数目的预览数目。
         * 1.如果未提交时，显示预览情况
         * 2.如果已提交，显示提前时最接近档位情况 
         * 3.如果完成全部任务，则显示最大长度
         */
        private getMinrewardNum(): number {
            var completeNum: number = GuidData.quest.getDailyQuestCompleteNum();
            var $issubmit: boolean = GuidData.quest.getDailyQuestSubmitState();
            var tempvo: tb.TB_quest_daily2 = tb.TB_quest_daily2.getTempVo(1);
            for (var i = 0; i < tempvo.finishQuestsNum.length; i++) {
                if (completeNum < tempvo.finishQuestsNum[i]) {
                    if ($issubmit && i > 0) {
                        return tempvo.finishQuestsNum[i - 1]
                    } else {
                        return tempvo.finishQuestsNum[i]
                    }
                } else if (completeNum == tempvo.finishQuestsNum[tempvo.finishQuestsNum.length - 1]) {
                    return completeNum;
                }
            }
        }

        private drawBtn($issubmit: boolean): void {
            var tempvo: tb.TB_quest_daily2 = tb.TB_quest_daily2.getTempVo(1);
            var $skillrec: UIRectangle = this._topRender.uiAtlas.getRec(this.btn.skinName);
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skillrec.pixelWitdh, $skillrec.pixelHeight, false);
            var baseRec;
            if ($issubmit) {
                baseRec = this._topRender.uiAtlas.getRec("Btn2");
            } else {
                baseRec = this._topRender.uiAtlas.getRec("Btn1");
                var $completenum: number = GuidData.quest.getDailyQuestCompleteNum();
            }
            $ctx.drawImage(this._topRender.uiAtlas.useImg, baseRec.pixelX, baseRec.pixelY, baseRec.pixelWitdh, baseRec.pixelHeight, 0, 0, baseRec.pixelWitdh, baseRec.pixelHeight);
            if (!$issubmit && $completenum < tempvo.finishQuestsNum[0]) {
                UIManager.getInstance().makeCtxToGray($ctx, new Rectangle(0, 0, 130, 49));
            }
            //推送至显卡
            this._topRender.uiAtlas.updateCtx($ctx, $skillrec.pixelX, $skillrec.pixelY);
        }

        /**
         * $ui
         * $issubmit:是否已经提交
         * $iscomplete：是否已经完成
         * $ary：道具数据
         */
        private drawProp($ui: UICompenent, $issubmit: boolean, $iscomplete: boolean, $ary: Array<number>): void {
            $ui.data = $ary[0]

            IconManager.getInstance().getIcon(GameData.getIconCopyUrl($ary[0]),
                ($img: any) => {
                    var $skillrec: UIRectangle = this._topRender.uiAtlas.getRec($ui.skinName);
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skillrec.pixelWitdh, $skillrec.pixelHeight, false);
                    UiDraw.cxtDrawImg($ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    $ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);

                    // ArtFont.getInstance().writeFontToCtxRight($ctx, String(), ArtFont.num1, 64, 48, 5);
                    LabelTextFont.writeSingleLabelToCtxSetAnchor($ctx, ColorType.Whitefffce6 + Snum($ary[1]), 16, 64, 48, TextAlign.RIGHT);

                    if ($issubmit) {
                        UIManager.getInstance().makeCtxToGray($ctx, new Rectangle(0, 0, 68, 68));
                        if ($iscomplete) {
                            var baseRec: any = this._topRender.uiAtlas.getRec("Receive");
                            $ctx.drawImage(this._topRender.uiAtlas.useImg, baseRec.pixelX, baseRec.pixelY, baseRec.pixelWitdh, baseRec.pixelHeight, 0, 0, baseRec.pixelWitdh, baseRec.pixelHeight);
                        }
                    }

                    //推送至显卡
                    this._topRender.uiAtlas.updateCtx($ctx, $skillrec.pixelX, $skillrec.pixelY);
                });
        }
    }



    /**
     * 日常任务List
     */
    export class DailyQuestList extends EffectSlist {

        public constructor() {
            super();
            this.left = 315;
            this.top = 134;
            // this.setShowLevel(6);
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, DailyQuestListRender, 596, 345, 0, 91, 3, 512, 1024, 1, 6);
        }



        public getData($ary: Array<QuestTaskVo>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $ary.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }


        public resetData(): void {
            var questDayVo: Array<QuestTaskVo> = quest.QuestModel.getInstance().getQuestDailyVo();
            var $sListItemData: Array<SListItemData> = this.getData(questDayVo);
            this.refreshData($sListItemData);

            for (var i = 0; i < questDayVo.length; i++) {
                var vo: QuestTaskVo = questDayVo[i];
                var complete: boolean = vo.questDataVo.taskState == SharedDef.QUEST_STATUS_END;
                if (!complete) {
                    //未交付
                    var cansubmit: boolean;
                    if (vo.tb_quest.targetsPosition[0][0] == 6) {
                        cansubmit = GuidData.bag.getItemCount(vo.tb_quest.targetsPosition[0][vo.tb_quest.targetsPosition[0].length - 1]) >= vo.questDataVo.items[0].num;
                    } else {
                        cansubmit = vo.questDataVo.items[0].process >= vo.questDataVo.items[0].num;
                    }

                    if (cansubmit) {
                        // this.showEffect(0, this.getIdxX(this.getscrollX()) - 45, this.getIdxY(this.getscrollnum()) - 55, 1.4, 1.8);
                        this.showEffect(i, this.getIdxX(i) + 402, this.getIdxY(i) - 2, 1.5, 0.7);
                    } else {
                        this.hideEffect(i);
                    }
                }else{
                    this.hideEffect(i);
                }
            }
        }

        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                ModulePageManager.showResTittle([1, 2, 3]);
            }
            this.setEffectUrl("ef_fl", 4, 4, 6);
        }

        public effectComplte(): void {
            console.log("加载好了，回调");
            this.resetData();
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
            ModulePageManager.hideResTittle();
            this.hideEffect();
        }
    }

    export class DailyQuestListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private Bg: UICompenent;
        private Icon: UICompenent;
        private Info: UICompenent;
        private Reward0: UICompenent;
        private Reward1: UICompenent;
        private Btn1: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.Bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Bg", 0, 0, 596, 88, 10, 10);
            $container.addChild(this.Bg);
            this.Icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Icon", 11, 10, 68, 68);
            $container.addChild(this.Icon);

            this.Info = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Info", 87, 21, 162, 45);
            $container.addChild(this.Info);

            this.Reward0 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Reward0", 257, 8, 120, 35);
            $container.addChild(this.Reward0);
            this.Reward1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Reward1", 257, 35, 120, 35);
            $container.addChild(this.Reward1);

            this.Btn1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Btn1", 448, 21, 103, 43);
            $container.addChild(this.Btn1);
            this.Btn1.addEventListener(InteractiveEvent.Up, this.clickEvt, this);

        }

        private applyrender(): void {
            if (this.itdata && this.itdata.data) {
                if (!(this.itdata.id % 2)) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Bg.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
                }
                this.drawIcon();
                var vo: QuestTaskVo = this.itdata.data
                // this.drawinfo(vo.tb_quest.text[0][0], 14, ColorType.Brown7a2f21, 150);
                LabelTextFont.writeTextAutoVerticalCenter(this._baseRender.uiAtlas, this.Info.skinName, vo.tb_quest.text[0][0], 14, ColorType.Brown7a2f21, 150, "", true);
                var vo: QuestTaskVo = this.itdata.data
                for (var i = 0; i < vo.tb_quest.rewards[0].length; i++) {
                    var $reward: UICompenent = <UICompenent>this["Reward" + (i)]
                    UiDraw.drawRewardIconAndtxt($reward, vo.tb_quest.rewards[0][i], false, TextAlign.LEFT, 5);
                }

                this.getbtn();

            }
        }

        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            } else {
                this.setnull();
            }
        }

        private drawIcon(): void {
            var vo: QuestTaskVo = this.itdata.data
            var complete: boolean = vo.questDataVo.taskState == SharedDef.QUEST_STATUS_END;
            IconManager.getInstance().getIcon("ui/load/quest/dailyquest.png",
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Icon.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    //品质框
                    UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr(vo.tb_quest_daily2_set.quality), new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    //头像
                    ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);

                    var process: number;
                    if (vo.tb_quest.targetsPosition[0][0] == 6) {
                        if (complete) {
                            process = vo.questDataVo.items[0].num;
                        } else {
                            process = GuidData.bag.getItemCount(vo.tb_quest.targetsPosition[0][vo.tb_quest.targetsPosition[0].length - 1]);
                        }
                    } else {
                        process = vo.questDataVo.items[0].process;
                    }
                    LabelTextFont.writeSingleLabelToCtx(ctx, process + "/" + vo.questDataVo.items[0].num, 16, 0, 45, TextAlign.CENTER, ColorType.Whiteffffff, ColorType.colord27262e)

                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }


        private getbtn(): void {
            var vo: QuestTaskVo = this.itdata.data
            var complete: boolean = vo.questDataVo.taskState == SharedDef.QUEST_STATUS_END;


            if (complete) {
                //已交付
                this.drawbtn(this.Btn1, "Btn2");
            } else {
                //未交付
                var cansubmit: boolean;
                if (vo.tb_quest.targetsPosition[0][0] == 6) {
                    cansubmit = GuidData.bag.getItemCount(vo.tb_quest.targetsPosition[0][vo.tb_quest.targetsPosition[0].length - 1]) >= vo.questDataVo.items[0].num;
                } else {
                    cansubmit = vo.questDataVo.items[0].process >= vo.questDataVo.items[0].num;
                }

                var str: string;
                var btnname: string = "Btn4";
                if (cansubmit) {
                    //交付
                    str = "Txt4";
                } else if (vo.tb_quest.targetsPosition[0][0] == 1) {
                    //杀怪
                    str = "Txt1";
                } else if (vo.tb_quest.targetsPosition[0][0] == 6) {
                    //消耗道具
                    str = "Txt2";
                } else {
                    str = "Txt3";
                }
                this.drawbtn(this.Btn1, btnname, str);
            }
        }

        private drawbtn($ui: UICompenent, $key: string, $txt: string = ""): void {
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec($ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            var state: UIRectangle = this.parentTarget.baseAtlas.getRec($key);
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, state.pixelX, state.pixelY, state.pixelWitdh, state.pixelHeight, 0, 0, state.pixelWitdh, state.pixelHeight);

            if ($txt.length > 0) {
                var txtrect: UIRectangle = this.parentTarget.baseAtlas.getRec($txt);
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, txtrect.pixelX, txtrect.pixelY, txtrect.pixelWitdh, txtrect.pixelHeight, ($rec.pixelWitdh / 2) - (txtrect.pixelWitdh / 2), ($rec.pixelHeight / 2) - (txtrect.pixelHeight / 2), txtrect.pixelWitdh, txtrect.pixelHeight);
            }
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }


        private clickEvt(evt: InteractiveEvent): void {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            console.log("---clickEvt---");
            if (this.itdata && this.itdata.data) {
                var vo: QuestTaskVo = this.itdata.data
                var complete: boolean = vo.questDataVo.taskState == SharedDef.QUEST_STATUS_END;

                if (complete) {
                    //已交付
                    return;
                }

                if (GuidData.quest.getDailyQuestSubmitState()) {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您已提交过任务", 99);
                } else {
                    //未交付
                    var cansubmit: boolean;
                    if (vo.tb_quest.targetsPosition[0][0] == 6) {
                        cansubmit = GuidData.bag.getItemCount(vo.tb_quest.targetsPosition[0][vo.tb_quest.targetsPosition[0].length - 1]) >= vo.questDataVo.items[0].num;
                    } else {
                        cansubmit = vo.questDataVo.items[0].process >= vo.questDataVo.items[0].num;
                    }
                    //如果可交付

                    var str: string;
                    if (cansubmit) {
                        //交付
                        console.log("交付");
                        NetManager.getInstance().protocolos.pick_daily2_quest_reward(vo.questDataVo.indx);
                    } else {
                        var $clikQuestTaskVo: QuestTaskVo = new QuestTaskVo();
                        $clikQuestTaskVo.questDataVo = vo.questDataVo
                        var $item: Array<number> = vo.tb_quest.targetsPosition[0];
                        QuestModel.getInstance().meshQuestTargets($clikQuestTaskVo, $item);
                        ModuleEventManager.dispatchEvent(new quest.QuestEvent(quest.QuestEvent.HIDE_DAILY_QUEST_EVENT));
                    }
                }
            }
        }


        private setnull(): void {
            UiDraw.clearUI(this.Bg)
            UiDraw.clearUI(this.Icon)
            UiDraw.clearUI(this.Info)
            UiDraw.clearUI(this.Reward0)
            UiDraw.clearUI(this.Reward1)
            UiDraw.clearUI(this.Btn1)
        }
    }
}