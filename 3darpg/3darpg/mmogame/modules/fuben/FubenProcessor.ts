module fb {
    export class FubenEvent extends BaseEvent {
        public static SHOW_FUBEN_EVENT: string = "SHOW_FUBEN_EVENT"; //显示面板
        //public static FUBEN_REFRESH: string = "FUBEN_REFRESH";
        public static FUBEN_RANKING_DATA_EVENT: string = "FUBEN_RANKING_DATA_EVENT";

        public static FUBEN_SHOW_FINISH_PANEL_EVENT: string = "FUBEN_SHOW_FINISH_PANEL_EVENT";

        public static FUBEN_SHOW_REWARD_EVENT: string = "FUBEN_SHOW_REWARD_EVENT";
        public static FUBEN_SHOW_FAIL_EVENT: string = "FUBEN_SHOW_FAIL_EVENT";



        public static FUBEN_SHOW_LEFT_PANEL_EVENT: string = "FUBEN_SHOW_LEFT_PANEL_EVENT";


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
            return [new FubenProcessor()];
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
                }
   
                if ($fubenEvent.type == FubenEvent.REFRESH_FUBEN_SCENE_LEFT_QUEST) {
                    if (this.fubenLeftPanel) {
                        this.fubenLeftPanel.refreshQuestList()
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

        }
        private fubenRewardPanel: FubenRewardPanel
        private showFubenRewardPanel($vo: s2c_send_instance_result ): void {
            
            if(!this.fubenRewardPanel){
                this.fubenRewardPanel = new fb.FubenRewardPanel();
            }
            this.fubenRewardPanel.load(() => {
                this.fubenRewardPanel.show($vo);
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
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                
            ];
        }

        private smsgSendInstanceResult($byte: ByteArray): void {
            var $vo: s2c_send_instance_result = new s2c_send_instance_result();
            s2c_send_instance_result.read($vo, $byte);

            console.log($vo)

            if ($vo.state == MapInfo.STATE_249 && $vo.type != 15 && $vo.type != 7) {
                this.showFubenFailPanel();
            } else {
                this.showFubenRewardPanel($vo);

            }
        
           



        }
        public getHanderMap(): Object {
            var obj: Object = new Object;
            obj[Protocols.SMSG_SEND_INSTANCE_RESULT] = ($byte: ByteArray) => { this.smsgSendInstanceResult($byte) };
            return obj;
            
        }

     




    }

}
