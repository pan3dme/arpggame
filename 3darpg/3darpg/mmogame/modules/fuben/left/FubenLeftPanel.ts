module fb {
    export class FubenLeftPanel extends UIConatiner {
        private uiAtlasComplet: boolean = false;
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        public constructor() {
            super();
            this.interfaceUI = true
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.left = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);

            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this._midRender.uiAtlas = new UIAtlas;
            this._midRender.uiAtlas.setInfo("ui/uidata/fuben/left/fubenleft.xml", "ui/uidata/fuben/left/fubenleft.png", () => { this.loadConfigCom() });

            this.upDataFun = (t: number) => { this.update(t) }
        }

        private upDataFun: Function


        private a_tittle_name: UICompenent;
        private a_reward_name: UICompenent;
        private a_reward_more: UICompenent;
        private a_reward_icon_0: UICompenent;
        private a_reward_icon_1: UICompenent;
        private a_reward_icon_2: UICompenent;

        private a_top_bg: UICompenent
        private a_mid_bg: UICompenent
        private a_bottom_bg: UICompenent

        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;

            this.a_top_bg = this.addChild(this._bottomRender.getComponent("a_top_bg"));
            this.a_mid_bg = this.addChild(this._bottomRender.getComponent("a_mid_bg"));
            this.a_bottom_bg = this.addChild(this._bottomRender.getComponent("a_bottom_bg"));

            this.a_tittle_name = this.addChild(this._topRender.getComponent("a_tittle_name"));
            this.a_reward_name = this.addChild(this._topRender.getComponent("a_reward_name"));
            this.a_reward_icon_0 = this.addChild(this._topRender.getComponent("a_reward_icon_0"));
            this.a_reward_icon_1 = this.addChild(this._topRender.getComponent("a_reward_icon_1"));
            this.a_reward_icon_2 = this.addChild(this._topRender.getComponent("a_reward_icon_2"));
            this.a_reward_more = this._topRender.getComponent("a_reward_more");
            this.a_reward_more.addEventListener(InteractiveEvent.Down, this.moreClick, this);
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_reward_more.skinName, ColorType.Yellowffe9b4 + "奖励详情", 14 * 1.5, TextAlign.CENTER);

            this.a_mid_bg.addEventListener(InteractiveEvent.Down, this.midClick, this);


            this.uiAtlasComplet = true;
            this.refresh();

        }
        private moreClick($e: InteractiveEvent): void {
            ModuleEventManager.dispatchEvent(new sboss.SbossEvent(sboss.SbossEvent.WBOSS_MORE_REWARD));
        }
        private midClick($e: InteractiveEvent): void { }
        private hideOrShow: boolean = true;
        private rewardData: any;
        public refresh(): void {
            if (this.uiAtlasComplet) {
                //var $str: string = GuidData.map.getMapStrGeneralId();
                //if ($str) {
                //var $arr: Array<string> = $str.split(":");
                console.log(GuidData.map.tbMapVo.inst_sub_type);
                switch (GuidData.map.tbMapVo.inst_sub_type) {
                    case SharedDef.INSTANCE_SUB_TYPE_WORLD_BOSS:
                        this.rewardData = FuBenModel.getInstance().getWorldBossReward();
                        this.enterVipFuben(this.rewardData);
                        break;
                    case SharedDef.INSTANCE_SUB_TYPE_VIP:
                        break;
                    case SharedDef.INSTANCE_SUB_TYPE_PRIVATE_BOSS:
                        this.rewardData = FuBenModel.getInstance().getPersonBossRewad();
                        this.enterVipFuben(this.rewardData);
                        break;
                    case SharedDef.INSTANCE_SUB_TYPE_TRIAL:
                        this.rewardData = FuBenModel.getInstance().getTowerReawrd();
                        this.enterVipFuben(this.rewardData);
                        break;
                    case SharedDef.INSTANCE_SUB_TYPE_RES:
                        this.rewardData = FuBenModel.getInstance().getResFubenRewad();
                        this.enterVipFuben(this.rewardData);
                        break;
                    case SharedDef.INSTANCE_SUB_TYPE_KUAFU_GROUP:  //组队副本
                        this.rewardData = FuBenModel.getInstance().getTbGroupReward();
                        this.enterVipFuben(this.rewardData);
                        break;

                    case SharedDef.INSTANCE_SUB_TYPE_FACTION_BOSSDEFENSE: //家族BOSS
                        this.rewardData = FuBenModel.getInstance().getFactionLeadRewad();
                        this.enterVipFuben(this.rewardData)
                        break;
                    case SharedDef.INSTANCE_SUB_TYPE_FACTION_TOWER:
                        this.rewardData = FuBenModel.getInstance().getFactionTripReward();
                        this.enterVipFuben(this.rewardData);

                        break;
                    default:
                        this.rewardData = { name: "", reward: [] };
                        this.enterVipFuben(this.rewardData);
                        break;
                }
                //}
                TimeUtil.addFrameTick(this.upDataFun);
            }
        }
        private refresnum: number = 0;
        private hasMoreReward: boolean = false;
        private enterVipFuben(rewardObj: any): void {
            this.hasMoreReward = rewardObj.morereward;
            //this.hasMoreReward = true;
            var $reward: Array<Array<number>> = rewardObj.reward;
            var $endTm: number = GuidData.map.getMapIntFieldQuestEndTm();
            this.endTime = GameInstance.getGameEndMillisecond($endTm) / 1000

            for (var i: number = 0; i < 3; i++) {
                var $ui: UICompenent = this["a_reward_icon_" + i];
                $ui.y = 255;
                if ($reward[i]) {
                    IconManager.getInstance().drawItemIcon40($ui, $reward[i][0], $reward[i][1]);
                    $ui.x = 12 + i * 60;
                } else {
                    $ui.x = -200;
                }
            }

            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_reward_name.skinName, ColorType.Yellowffe9b4 + rewardObj.name, 14 * 1.5, TextAlign.LEFT);

            this.refreshQuestList();

            //var floorID: number = GuidData.map.getFloorNum();
            var nameStr: string = tb.TB_map.getTB_map(GuidData.map.getMapID()).name;
            if (rewardObj.lev) {
                nameStr += "[第" + rewardObj.lev + "关]";
            }

            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_tittle_name.skinName, ColorType.Yellowffd500 + nameStr, 14 * 1.5, TextAlign.LEFT);
        }
        public refreshQuestList(): void {
            if (this.uiAtlasComplet) {
                this.clearFrameItem();
                var $arrQuest: Array<any> = GuidData.map.getMapIntFieldQuests();//任务 
                var $arrProcess: Array<any> = GuidData.map.getMapIntFieldQuestProcess();//进度

                this.refresnum = GuidData.map.getMapWaveAllCount();
                if (this.refresnum > 0) {
                    var $jinduStr: string
                    if (this.refresnum == 0) {
                        $jinduStr = ColorType.Yellowffe9b4 + "通关条件";
                    } else {
                        $jinduStr = ColorType.Yellowffe9b4 + "通关条件("
                        if (GuidData.map.getMapWaveCount() < this.refresnum) {
                            $jinduStr += GuidData.map.getMapWaveCount() + "/" + this.refresnum;
                        } else {
                            $jinduStr += "已达成";
                        }
                        $jinduStr += ")";
                    }

                    var $ui: FrameCompenent = this.getEmptyFrameUi();
                    this.drawFrontToFrame($ui, $jinduStr);
                }
                for (var i: number = 0; i < $arrQuest.length; i++) {
                    if ($arrQuest[i]) {
                        var $creatureVo: tb.TB_creature_template;
                        if ($arrQuest[i].creatureId != 0) {
                            $creatureVo = tb.TB_creature_template.get_TB_creature_template($arrQuest[i].creatureId);
                        }
                        var $tb_quest_vip_instance: tb.TB_quest_vip_instance = tb.TB_quest_vip_instance.get_TB_quest_vip_instance($arrQuest[i].questType)
                        var str: string = $tb_quest_vip_instance.texst;
                        if ($creatureVo) {
                            str = str.replace("{name}", $creatureVo.name);
                        } else {
                            str = str.replace("{name}", "小怪");
                        }
                        str = str.replace("{process}", $arrProcess[i]);
                        str = str.replace("{targets}", String($arrQuest[i].num));
                        var $color: string = $arrProcess[i] >= $arrQuest[i].num ? ColorType.Green56da35 : ColorType.Brownd8d49c;
                        var $ui: FrameCompenent = this.getEmptyFrameUi();
                        $ui.x = 20;
                        this.drawFrontToFrame($ui, $color + str);
                    }
                }
                this.timeUiFrame = this.getEmptyFrameUi();

                var $th: number = this.useFrameItem.length * 22;
                $th += 5;
                this.a_reward_name.y = this.getBasyTy() + $th;
                $th += 25;
                if (this.rewardData && this.rewardData.reward.length) {
                    for (var i: number = 0; i < 3; i++) {
                        var $rewardicon: UICompenent = this["a_reward_icon_" + i];
                        $rewardicon.y = this.getBasyTy() + $th;
                    }
                    $th += 60;
                }

                if (this.hasMoreReward) {
                    this.addChild(this.a_reward_more);
                    this.a_reward_more.y = this.getBasyTy() + $th;
                    $th += 30;
                } else {
                    this.removeChild(this.a_reward_more);
                }

                this.a_bottom_bg.y = this.getBasyTy() + $th;
                this.a_mid_bg.height = this.a_bottom_bg.y - this.a_top_bg.y - this.a_top_bg.height;

                this.lastTxtNum = 0;
            }
        }
        private getBasyTy(): number {
            return this.a_top_bg.y + 25
        }
        private timeUiFrame: FrameCompenent
        private drawFrontToFrame($ui: FrameCompenent, $str: string): void {
            var $toRect: Rectangle = $ui.getSkinCtxRect()
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, $str, 14 * 1.5, 0, 0, TextAlign.LEFT);
            $ui.drawToCtx(this._topRender.uiAtlas, $ctx);
        }
        private useFrameItem: Array<FrameCompenent> = new Array()
        private getEmptyFrameUi(): FrameCompenent {
            var $ui: FrameCompenent = <FrameCompenent>this.addChild(this._topRender.getComponent("a_task_frame"));
            $ui.goToAndStop(this.useFrameItem.length);

            $ui.y = this.getBasyTy() + this.useFrameItem.length * 22;
            this.useFrameItem.push($ui)
            return $ui;
        }
        private clearFrameItem(): void {
            while (this.useFrameItem.length) {
                this.removeChild(this.useFrameItem.pop());
            }

        }
        private endTime: number
        private lastTxtNum: number = 0
        public update(t): void {
          
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this.upDataFun);
            } else {
                if (this.uiAtlasComplet) {
                    var timeNum: number = Math.floor(this.endTime - TimeUtil.getTimer() / 1000);
                    if (timeNum >= 0 && this.lastTxtNum != timeNum) {
                        this.lastTxtNum = timeNum;
                        var $color: string = timeNum > 10 ? ColorType.Green56da35 : ColorType.Reddb4051;
                        this.drawFrontToFrame(this.timeUiFrame, ColorType.Yellowffe9b4 + "剩余时间:" + $color + getScencdStr(timeNum));
                    }
                }
                if (GuidData.map && !GuidData.map.showAreaById(AreaType.fubenLeftPane_20)) {
                    this.hide()
                }
            }
        }
        private hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }
    }
}