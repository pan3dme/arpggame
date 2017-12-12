module sboss {

    export class SbossModule extends Module {
        public getModuleName(): string {
            return "SbossModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new SbossProcessor()];
        }
    }
    export class SbossEvent extends BaseEvent {
        public static SHOW_SBOSS_PANEL: string = "SHOW_SBOSS_PANEL";
        public static HIDE_SBOSS_PANEL: string = "HIDE_SBOSS_PANEL";

        public static SELECT_MESH_BOSS_ID: string = "SELECT_MESH_BOSS_ID";
        public static REFRISH_LIST_DATA: string = "REFRISH_LIST_DATA";
        public static REFRISH_SBOSS_PANEL: string = "REFRISH_SBOSS_PANEL";
        public static WBOSS_STATE_CHG: string = "WBOSS_STATE_CHG";
        public static WBOSS_MORE_REWARD: string = "WBOSS_MORE_REWARD";
        public static PBOSS_REFRISH_PANEL: string = "PBOSS_REFRISH_PANEL";
        public static SET_LASTID: string = "SET_LASTID";

        public selectMeshBossVo: MeshBossVo

        public data: any;
    }
    export class SbossProcessor extends BaseProcessor {

        public getName(): string {
            return "SbossProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof SbossEvent) {
                var $SbossEvent: SbossEvent = <SbossEvent>$event;
                if ($SbossEvent.type == SbossEvent.SHOW_SBOSS_PANEL) {
                    this.showPanel($SbossEvent.data);
                } else if ($SbossEvent.type == SbossEvent.SET_LASTID) {
                    this._lastId = 0;
                }
                if (this.sbossPanel && this.sbossPanel.hasStage) {
                    if ($SbossEvent.type == SbossEvent.SELECT_MESH_BOSS_ID) {
                        this.sbossPanel.smassBossPanel.selectMeshBossByVo($SbossEvent.selectMeshBossVo)
                    } else if ($SbossEvent.type == SbossEvent.REFRISH_LIST_DATA) {
                        this.sbossPanel.smassBossPanel.refrishListData()
                    } else if ($SbossEvent.type == SbossEvent.REFRISH_SBOSS_PANEL) {
                        this.sbossPanel.smassBossPanel.refristhPanel()
                    } else if ($SbossEvent.type == SbossEvent.WBOSS_STATE_CHG) {
                        this.wbossChg();
                    } else if ($SbossEvent.type == SbossEvent.PBOSS_REFRISH_PANEL) {
                        this.sbossPanel.personBossPanel.selectMeshBossByVo($SbossEvent.data)
                        // } else if ($SbossEvent.type == SbossEvent.PBOSS_REDPOINT_CHG) {
                        //     console.log("-------------------红点处理--------------------");
                        //     this.processRedPoint();
                    }
                }

                if ($SbossEvent.type == SbossEvent.WBOSS_MORE_REWARD) {
                    this.showBossReward();
                }
            } else if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                //红点初始化
                this.initRedNode();
            }

            // if ($event instanceof UIPanelEvent) {
            //     var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
            //     if (panelEvent.panel == this._activityUiPanel) {
            //         this._activityUiPanel.dispose();
            //         this._activityUiPanel = null;
            //         console.log("释放面板 _activityUiPanel")
            //     }
            // }

        }

        private _nodeInit: boolean = false;
        private initRedNode(): void {
            if (this._nodeInit) {
                return;
            }
            var pnode119: RedPointNode = RedPointManager.getInstance().getNodeByID(119);
            var $arr119: Array<SListItemData> = SbossModel.getInstance().getPersonBossItemData();
            for (var i: number = 0; i < $arr119.length; i++) {
                var node: RedPointNode = new RedPointNode();
                node.data = $arr119[i].data;
                pnode119.addChild(node);
            }

            this._nodeInit = true;

            this.initQuestFlag();
            this.initTrainingQuestFlag();
            this.setNewDateTime();

            TimeUtil.addTimeTick(1000, () => { this.gameTimeTick() });
        }

        private _newdateTime: number
        private setNewDateTime() {
            var $ts: number = GameInstance.getServerNow();
            var $play: Date = new Date($ts * 1000);
            $play.setDate($play.getDate() + 1);
            $play.setHours(0);
            $play.setMinutes(0);
            $play.setSeconds(0);
            $play.setMilliseconds(0);
            this._newdateTime = $play.getTime();
            console.log("---------$play----------",$play);
        }

        private compareTime(): boolean {
            //服务器当前标准时间
            var $ts: number = GameInstance.getServerNow();
            var $sever: Date = new Date($ts * 1000);

            //越过时间
            var $endt: number = $sever.getTime() - this._newdateTime
            if ($endt >= 0) {
                this.setNewDateTime();
                return true;
            }
            //未到达指定时间
            return false;
        }

        /**
         * 初始化日常任务状态位
         */
        private initQuestFlag() {
            if (this.showquestPanel) {
                return;
            }
            this.showquestPanel = new Array
            for (var i = 0; i < 6; i++) {
                this.showquestPanel.push(false);
            }
            var aaa: Array<quest.QuestTaskVo> = quest.QuestModel.getInstance().getQuestDailyVo();
            if (aaa && aaa.length > 0) {
                for (var i = 0; i < aaa.length; i++) {
                    var complete: boolean = aaa[i].questDataVo.taskState == SharedDef.QUEST_STATUS_END;
                    if (!complete) {
                        var cansubmit: boolean;
                        if (aaa[i].tb_quest.targetsPosition[0][0] == 6) {
                            cansubmit = GuidData.bag.getItemCount(aaa[i].tb_quest.targetsPosition[0][aaa[i].tb_quest.targetsPosition[0].length - 1]) >= aaa[i].questDataVo.items[0].num;
                        } else {
                            cansubmit = aaa[i].questDataVo.items[0].process >= aaa[i].questDataVo.items[0].num;
                        }

                        if (cansubmit) {
                            //可交付
                            this.showquestPanel[aaa[i].index] = true;
                        }
                    }
                }
            }
        }

        /**
         * 初始化历练任务状态位
         */
        private initTrainingQuestFlag() {
            if (this.showTrainingquestPanel) {
                return;
            }
            var bbb: Array<training.TaskVo> = training.TrainingModel.getInstance().getTaskvo();
            this.showTrainingquestPanel = new Array
            for (var i = 0; i < bbb.length; i++) {
                this.showTrainingquestPanel.push(false);
            }
            if (bbb && bbb.length > 0) {
                for (var i = 0; i < bbb.length; i++) {
                    var vo: training.TaskVo = bbb[i]
                    if (vo.questData != null && vo.questData.taskState != SharedDef.QUEST_STATUS_END) {
                        if (GuidData.player.getResType(vo.tab_adventure.upres[0]) >= vo.tab_adventure.upres[1]) {
                            //可交付
                            this.showTrainingquestPanel[vo.questData.indx] = true;
                        }
                    }
                }
            }
        }

        private gameTimeTick(): void {
            this.processRedPoint();
            this.questPanel();
            this.bossTips();
            this.TrainingquestPanel();
            if(this.compareTime()){
                //0点重置
                var $ts: number = GameInstance.getServerNow();
                var $sever: Date = new Date($ts * 1000);
                console.log("--------------------------------------------------------------------","-----0点重置-----",$sever);
                this.reset0();
            }
        }

        private reset0(){
            for (let i = 0; i < this.showquestPanel.length; i++) {
                this.showquestPanel[i] = false;
            }
            for (let j = 0; j < this.showTrainingquestPanel.length; j++) {
                this.showTrainingquestPanel[j] = false;
            }
        }

        private getBossName($bossEntry: number): string {
            var $tb_Vo: tb.TB_creature_template = tb.TB_creature_template.get_TB_creature_template($bossEntry)
            return $tb_Vo.name;
        }

        private _lastId: number = 0;
        private bossTips() {
            var $tbDataArr: Array<SListItemData> = SbossModel.getInstance().getItemData();
            for (var i = $tbDataArr.length - 1; i >= 0; i--) {
                var meshbossvo: MeshBossVo = $tbDataArr[i].data
                if (GuidData.player.getLevel() >= meshbossvo.tb.permitLevel) {
                    var $tm: number = GameInstance.getGameSecond(meshbossvo.time);
                    // console.log("----全民Boss----", meshbossvo.tb.id, $tm);
                    if (!meshbossvo.flag && $tm <= 0) {
                        meshbossvo.flag = true;
                        //boss刷新
                        var curid: number = meshbossvo.tb.id * 100;
                        if (this._lastId < curid && GameData.configData.getopen_prompting_sboss(i)) {
                            var $evt = new topui.TopUiEvent(topui.TopUiEvent.REFRESH_TOP_PANDA_TIP);
                            $evt.data = ColorType.Brown7a2f21 + "全民BOSS:" + ColorType.Redd92200 + this.getBossName(meshbossvo.tb.bossEntry) + ColorType.Brown7a2f21 + "可挑战了！"
                            ModuleEventManager.dispatchEvent($evt);
                            this._lastId = curid
                        }
                        return;
                    }
                }
            }

            var $tbDataArr1: Array<SListItemData> = SbossModel.getInstance().getPersonBossItemData();
            for (var j = $tbDataArr1.length - 1; j >= 0; j--) {
                var personvo: PersonBossVo = $tbDataArr1[j].data
                if (personvo.openstate) {
                    var $tm: number = GameInstance.getGameSecond(personvo.times);
                    // console.log("----个人Boss----", personvo.tabbossinfo.id, $tm, this._lastId);
                    if (!personvo.flag && $tm <= 0) {
                        personvo.flag = true;
                        //boss刷新
                        var curid: number = personvo.tabbossinfo.id;
                        if (this._lastId < curid && GameData.configData.getopen_prompting_pboss(i)) {
                            var $evt = new topui.TopUiEvent(topui.TopUiEvent.REFRESH_TOP_PANDA_TIP);
                            $evt.data = ColorType.Brown7a2f21 + "个人BOSS:" + ColorType.Redd92200 + this.getBossName(personvo.tabbossinfo.bossEntry) + ColorType.Brown7a2f21 + "可挑战了！"
                            ModuleEventManager.dispatchEvent($evt);
                            this._lastId = curid
                        }
                        return;
                    }
                }
            }
        }

        private showquestPanel: Array<boolean>;
        private questPanel() {
            var aaa: Array<quest.QuestTaskVo> = quest.QuestModel.getInstance().getQuestDailyVo();
            if (aaa && aaa.length > 0) {
                for (var i = 0; i < aaa.length; i++) {
                    var complete: boolean = aaa[i].questDataVo.taskState == SharedDef.QUEST_STATUS_END;
                    if (!complete) {
                        var cansubmit: boolean;
                        if (aaa[i].tb_quest.targetsPosition[0][0] == 6) {
                            cansubmit = GuidData.bag.getItemCount(aaa[i].tb_quest.targetsPosition[0][aaa[i].tb_quest.targetsPosition[0].length - 1]) >= aaa[i].questDataVo.items[0].num;
                        } else {
                            cansubmit = aaa[i].questDataVo.items[0].process >= aaa[i].questDataVo.items[0].num;
                        }

                        if (cansubmit && !this.showquestPanel[aaa[i].index]) {
                            //可交付
                            ModulePageManager.openPanel(SharedDef.MODULE_DAILY_TASKS);
                            this.showquestPanel[aaa[i].index] = true;
                            break;
                        }
                    }
                }
            }
        }

        private showTrainingquestPanel: Array<boolean>;
        private TrainingquestPanel() {
            var bbb: Array<training.TaskVo> = training.TrainingModel.getInstance().getTaskvo();
            if (bbb && bbb.length > 0) {
                for (var i = 0; i < bbb.length; i++) {
                    var vo: training.TaskVo = bbb[i]
                    if (vo.questData != null && vo.questData.taskState != SharedDef.QUEST_STATUS_END) {
                        if (GuidData.player.getResType(vo.tab_adventure.upres[0]) >= vo.tab_adventure.upres[1]) {
                            //可交付
                            if (!this.showTrainingquestPanel[vo.questData.indx]) {
                                ModulePageManager.openPanel(SharedDef.MODULE_EXP, SharedDef.MODULE_EXP_QUEST);
                                this.showTrainingquestPanel[vo.questData.indx] = true;
                                break;
                            }
                        }
                    }
                }
            }
        }

        private processRedPoint(): void {
            //福利红点变化
            ModuleEventManager.dispatchEvent(new welfare.WelfareEvent(welfare.WelfareEvent.CHG_REDPOINT));
            //个人boss和全民boss红点变化
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_BOSS, SharedDef.MODULE_BOSS_PERSON_BOSS)) {
                var $arr119: Array<SListItemData> = SbossModel.getInstance().getPersonBossItemData();
                var ary119: Array<RedPointNode> = RedPointManager.getInstance().getNodeByID(119).children;
                for (var j: number = 0; j < ary119.length; j++) {
                    ary119[j].data = $arr119[j].data;
                    var aa: PersonBossVo = $arr119[j].data;
                    ary119[j].show = aa.openstate && aa.hasTims() > 0
                }
            }
            //我要变弱红点变化
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_FISH, SharedDef.MODULE_FISH_ALL)) {
                var node123: RedPointNode = RedPointManager.getInstance().getNodeByID(123);
                var redary: Array<RedPointNode> = chgfish.ChgfishModel.getInstance().getList();
                node123.show = redary.length > 0;
            }
        }


        private hidePanel(): void {
            this.sbossPanel.hide()

        }
        private sbossPanel: SbossPanel
        private showPanel($data: any): void {
            if (!this.sbossPanel) {
                this.sbossPanel = new SbossPanel();
            }
            this.sbossPanel.load(() => {
                if (!$data) {
                    $data = this._lastId < 100 ? SharedDef.MODULE_BOSS_PERSON_BOSS : SharedDef.MODULE_BOSS_RISK_BOSS;
                }
                this.sbossPanel.show($data);
            }, false);
        }

        private _rewardPanel: WbossRewardPanel;
        private showBossReward(): void {
            if (!this._rewardPanel) {
                this._rewardPanel = new WbossRewardPanel();
            }
            this._rewardPanel.load(() => {
                this._rewardPanel.show();
            })
        }

        private wbossChg(): void {
            if (this.sbossPanel && this.sbossPanel.hasStage) {
                this.sbossPanel.wbossChg();
            }
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new SbossEvent(SbossEvent.SHOW_SBOSS_PANEL),
                new SbossEvent(SbossEvent.HIDE_SBOSS_PANEL),
                new SbossEvent(SbossEvent.SELECT_MESH_BOSS_ID),
                new SbossEvent(SbossEvent.REFRISH_LIST_DATA),
                new SbossEvent(SbossEvent.REFRISH_SBOSS_PANEL),
                new SbossEvent(SbossEvent.WBOSS_STATE_CHG),
                new SbossEvent(SbossEvent.WBOSS_MORE_REWARD),
                // new SbossEvent(SbossEvent.PBOSS_REDPOINT_CHG),
                new SbossEvent(SbossEvent.PBOSS_REFRISH_PANEL),
                new SbossEvent(SbossEvent.SET_LASTID),

                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }
        public smsgMassBossInfoRet($byte: ByteArray): void {

            if (this.sbossPanel && this.sbossPanel.hasStage) {
                var $personnum: number = $byte.readUint32()
                var $bloodnum: number = $byte.readByte()
                console.log($personnum, $bloodnum)
                this.sbossPanel.smassBossPanel.setMassBossInfoRet($personnum, $bloodnum)
            }
        }
        //private sbossRandPanel: SbossRandPanel
        private _rankPanle: WindowRankPanel;
        public smsgMassBossRandResult($byte: ByteArray): void {
            var $data: s2c_mass_boss_rank_result = new s2c_mass_boss_rank_result();
            s2c_mass_boss_rank_result.read($data, $byte);
            //console.log($data)
            // if (!this.sbossRandPanel) {
            //     this.sbossRandPanel = new SbossRandPanel();
            // }
            // this.sbossRandPanel.load(() => {
            //     this.sbossRandPanel.setRandData($data);
            // }, false);

            if (!this._rankPanle) {
                this._rankPanle = new WindowRankPanel();
            }
            var list: Array<WindowRankVo> = new Array;
            for (var i: number = 0; i < $data.info.length; i++) {

                var $obj: WindowRankVo = new WindowRankVo();
                $obj.rank = String(i + 1);
                $obj.name = getBaseName($data.info[i].name);
                $obj.val = (float2int($data.info[i].value * 100) / 100) + "%";
                list.push($obj);

            }


            this._rankPanle.load(() => {
                this._rankPanle.show(["排名", "玩家名字", "伤害"], list, "");
            })

        }


        public getHanderMap(): Object {

            var obj: Object = new Object;
            obj[Protocols.SMSG_MASS_BOSS_INFO_RET] = ($byte: ByteArray) => { this.smsgMassBossInfoRet($byte) };
            obj[Protocols.SMSG_MASS_BOSS_RANK_RESULT] = ($byte: ByteArray) => { this.smsgMassBossRandResult($byte) };
            return obj;
        }

    }


}