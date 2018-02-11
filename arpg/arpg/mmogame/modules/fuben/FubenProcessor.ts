module fb {
    export class FubenEvent extends BaseEvent {
        public static SHOW_FUBEN_EVENT: string = "SHOW_FUBEN_EVENT"; //显示面板
        //public static FUBEN_REFRESH: string = "FUBEN_REFRESH";
        public static FUBEN_RANKING_DATA_EVENT: string = "FUBEN_RANKING_DATA_EVENT";

        public static FUBEN_SHOW_FINISH_PANEL_EVENT: string = "FUBEN_SHOW_FINISH_PANEL_EVENT";

        public static FUBEN_SHOW_REWARD_EVENT: string = "FUBEN_SHOW_REWARD_EVENT";
        public static FUBEN_SHOW_FAIL_EVENT: string = "FUBEN_SHOW_FAIL_EVENT";



        public static FUBEN_SHOW_LEFT_PANEL_EVENT: string = "FUBEN_SHOW_LEFT_PANEL_EVENT";

        public static FUBEN_EXP_SHOW_LEFT_PANEL_EVENT: string = "FUBEN_EXP_SHOW_LEFT_PANEL_EVENT";
        public static FUBEN_FACTION_SHOW_LEFT_PANEL_EVENT: string = "FUBEN_FACTION_SHOW_LEFT_PANEL_EVENT";
        public static FUBEN_EXP_DATA_CHG_EVENT:string = "fuben_exp_data_chg_event";
        public static FUBEN_FACTION_DATA_CHG_EVENT:string = "FUBEN_FACTION_DATA_CHG_EVENT";
        public static FUBEN_BOSS_SHOW_LEFT_PANEL_EVENT: string = "FUBEN_BOSS_SHOW_LEFT_PANEL_EVENT";


        public static REFRESH_FUBEN_SCENE_LEFT_QUEST: string = "REFRESH_FUBEN_SCENE_LEFT_QUEST";

        public list: Array<GuidObject>
        public selfTrialLevel: number;
        
        public static FUBEN_TRIAL_RANK_LIST_QUERY_RESULT: string = "FUBEN_TRIAL_RANK_LIST_QUERY_RESULT"; // 更新到试练塔排行数据
        public data: any

    }
    export class FubenModule extends Module {
        public getModuleName(): string {
            return "FubenModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new FubenProcessor()
                    ,new ExpProcessor()];
        }
    }

    export class FubenProcessor extends BaseProcessor {
        public getName(): string {
            return "FubenProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {

            if ($event instanceof FubenEvent) {
                var $fubenEvent: FubenEvent = <FubenEvent>$event;
                if ($fubenEvent.type == FubenEvent.FUBEN_SHOW_LEFT_PANEL_EVENT) {
                    this.showFubenLeftPanel()
                }else if ($fubenEvent.type == FubenEvent.FUBEN_EXP_SHOW_LEFT_PANEL_EVENT) {
                    this.showExpFubenLeftPanel();
                    this.showFubenRightPanel();
                }else if ($fubenEvent.type == FubenEvent.FUBEN_BOSS_SHOW_LEFT_PANEL_EVENT) {
                    this.showFubenLeftBossPanel();
                }else if ($fubenEvent.type == FubenEvent.FUBEN_FACTION_SHOW_LEFT_PANEL_EVENT) {
                    this.showFactionFubenLeftPanel();
                }else if ($fubenEvent.type == FubenEvent.FUBEN_EXP_DATA_CHG_EVENT) {
                    if (this.expFubenLeftPanel) {
                        this.expFubenLeftPanel.refreshQuestList()
                    }
                }else if ($fubenEvent.type == FubenEvent.FUBEN_FACTION_DATA_CHG_EVENT) {
                    if (this.factionFubenLeftPanel) {
                        this.factionFubenLeftPanel.refresh();
                    }
                }else if ($fubenEvent.type == FubenEvent.REFRESH_FUBEN_SCENE_LEFT_QUEST) {
                    if (this.fubenLeftPanel) {
                        this.fubenLeftPanel.refreshQuestList()
                    }
                }
            }else if ($event instanceof topui.TopUiEvent) {//
                if ($event.type == topui.TopUiEvent.REFRESH_TOP_LEFT_BUFF) {
                    if(this.expFubenLeftPanel && this.expFubenLeftPanel.hasStage){
                        this.expFubenLeftPanel.refreshQuestList();
                    }
                }
            }


        }
        private fubenLeftPanel: FubenLeftPanel
        private showFubenLeftPanel(): void
        {
            if (!this.fubenLeftPanel) {
                this.fubenLeftPanel = new FubenLeftPanel()
            }
            UIManager.getInstance().addUIContainer(this.fubenLeftPanel);
            this.fubenLeftPanel.refresh()
            
            var stim: number = GameInstance.getGameSecond(GuidData.map.getMapIntFieldStartTm()) * 1000;
            if(stim > 0){
                PopTimeOutUtil.show(PopTimeOutUtil.SHUGUAI, stim);
            }
        }

        private fubenBossLeftPanel: FubenLeftBossPanel
        private showFubenLeftBossPanel(): void
        {
            if (!this.fubenBossLeftPanel) {
                this.fubenBossLeftPanel = new FubenLeftBossPanel()
            }
            UIManager.getInstance().addUIContainer(this.fubenBossLeftPanel);
            this.fubenBossLeftPanel.refresh();

        }

        private expFubenLeftPanel: FubenLeftTeamPanel
        private showExpFubenLeftPanel(): void
        {
            if (!this.expFubenLeftPanel) {
                this.expFubenLeftPanel = new FubenLeftTeamPanel()
            }
            UIManager.getInstance().addUIContainer(this.expFubenLeftPanel);
            this.expFubenLeftPanel.refresh();

            var stim: number = GameInstance.getGameSecond(GuidData.map.getMapIntFieldStartTm()) * 1000;
            if(stim > 0){
                PopTimeOutUtil.show(PopTimeOutUtil.SHUGUAI, stim,()=>{
                    AotuSkillManager.getInstance().aotuBattle = true;
                    var endtime:number = GameInstance.getGameSecond(GuidData.map.getMapIntFieldQuestEndTm()) * 1000;
                    PopTimeOutUtil.show(PopTimeOutUtil.END, endtime);
                });
            }else{
                AotuSkillManager.getInstance().aotuBattle = true;
                var endtime:number = GameInstance.getGameSecond(GuidData.map.getMapIntFieldQuestEndTm()) * 1000;
                PopTimeOutUtil.show(PopTimeOutUtil.END, endtime);
            }

        }

        private factionFubenLeftPanel: FubenLeftFactionPanel
        private showFactionFubenLeftPanel(): void
        {
            if (!this.factionFubenLeftPanel) {
                this.factionFubenLeftPanel = new FubenLeftFactionPanel()
            }
            UIManager.getInstance().addUIContainer(this.factionFubenLeftPanel);
            this.factionFubenLeftPanel.reset();
            this.factionFubenLeftPanel.refresh();
            
            var stim: number = GameInstance.getGameSecond(GuidData.map.getMapIntFieldStartTm()) * 1000;
            if(stim > 0){
                PopTimeOutUtil.show(PopTimeOutUtil.PLAYGO, stim,()=>{
                    AotuSkillManager.getInstance().aotuBattle = true;
                    var endtime:number = GameInstance.getGameSecond(GuidData.map.getMapIntFieldQuestEndTm()) * 1000;
                    PopTimeOutUtil.show(PopTimeOutUtil.END, endtime);
                });
            }else{
                AotuSkillManager.getInstance().aotuBattle = true;
                var endtime:number = GameInstance.getGameSecond(GuidData.map.getMapIntFieldQuestEndTm()) * 1000;
                PopTimeOutUtil.show(PopTimeOutUtil.END, endtime);
            }

        }

        private fubenRightPanel: FubenRightPanel
        private showFubenRightPanel(): void
        {
            if (!this.fubenRightPanel) {
                this.fubenRightPanel = new FubenRightPanel()
            }
            UIManager.getInstance().addUIContainer(this.fubenRightPanel);

        }

        private fubenRewardPanel: FubenRewardPanel
        private showFubenRewardPanel($vo: s2c_send_instance_result ): void {
            
            if(!this.fubenRewardPanel){
                this.fubenRewardPanel = new fb.FubenRewardPanel();
            }

            TimeUtil.addTimeOut(3000,()=>{
                this.fubenRewardPanel.load(() => {
                    this.fubenRewardPanel.show($vo);
                })
            })
            
        }
        private fubenFailPanel: FubenFailPanel
        private showFubenFailPanel(): void {
            this.fubenFailPanel = new FubenFailPanel()
            this.fubenFailPanel.load(() => {
                this.fubenFailPanel.show();
            })
        }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new FubenEvent(FubenEvent.FUBEN_SHOW_LEFT_PANEL_EVENT),
                new FubenEvent(FubenEvent.REFRESH_FUBEN_SCENE_LEFT_QUEST),

                new FubenEvent(FubenEvent.FUBEN_SHOW_REWARD_EVENT),
                new FubenEvent(FubenEvent.FUBEN_SHOW_FAIL_EVENT),
                new FubenEvent(FubenEvent.FUBEN_EXP_SHOW_LEFT_PANEL_EVENT),
                new FubenEvent(FubenEvent.FUBEN_EXP_DATA_CHG_EVENT),
                new FubenEvent(FubenEvent.FUBEN_FACTION_DATA_CHG_EVENT),
                new FubenEvent(FubenEvent.FUBEN_FACTION_SHOW_LEFT_PANEL_EVENT),
                new FubenEvent(FubenEvent.FUBEN_BOSS_SHOW_LEFT_PANEL_EVENT),
                new topui.TopUiEvent(topui.TopUiEvent.REFRESH_TOP_LEFT_BUFF),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                
            ];
        }

        private smsgSendInstanceResult($byte: ByteArray): void {
            var $vo: s2c_send_instance_result = new s2c_send_instance_result();
            s2c_send_instance_result.read($vo, $byte);

            //console.log($vo)

            if ($vo.state == MapInfo.STATE_249 && $vo.type != 15 && $vo.type != 7) {
                this.showFubenFailPanel();
            } else {
                this.showFubenRewardPanel($vo);

            }
        
           



        }

        private teamTest($byte: ByteArray): void {
            var $vo:s2c_check_for_group_enter = new s2c_check_for_group_enter();
            s2c_check_for_group_enter.read($vo, $byte);
            AlertUtil.show("","");

            AlertUtil.show("组队？"
                , "提示", (a: any) => {
                    NetManager.getInstance().protocolos.select_group_enter(a);
                },2,["确定","取消"])
            //select_group_enter
            //
            //console.log($vo)

            
  

        }
        public getHanderMap(): Object {
            var obj: Object = new Object;
            obj[Protocols.SMSG_SEND_INSTANCE_RESULT] = ($byte: ByteArray) => { this.smsgSendInstanceResult($byte) };
            obj[Protocols.SMSG_CHECK_FOR_GROUP_ENTER] = ($byte: ByteArray) => { this.teamTest($byte) };
            return obj;
            
        }

     




    }

}
