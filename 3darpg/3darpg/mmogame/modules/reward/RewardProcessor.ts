module reward {
    export class RewardEvent extends BaseEvent {
        public static SHOW_FUBEN_EVENT: string = "SHOW_FUBEN_EVENT"; //显示面板


    }
    export class RewardModule extends Module {
        public getModuleName(): string {
            return "RewardModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new RewardProcessor()];
        }
    }

    export class RewardProcessor extends BaseProcessor {
        public getName(): string {
            return "RewardProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {

            if ($event instanceof RewardEvent) {
       
            }
            if ($event instanceof EngineEvent) {

            }
            if($event instanceof UIPanelEvent){
                var panelEvent:UIPanelEvent = <UIPanelEvent>$event;
                if(panelEvent.panel == this._rewardPanel){
                    this._rewardPanel.dispose();
                    this._rewardPanel = null;
                    console.log("释放面板 _rewardPanel")
                }
            }
        }
 
        private _rewardPanel: RewardPanel
        private showPanel($vo: s2c_sweep_instance_reward): void {
            if (!this._rewardPanel) {
                this._rewardPanel = new RewardPanel();
                this._rewardPanel.rewardVo = $vo
            } else {
                this._rewardPanel.rewardVo = $vo
                this._rewardPanel.refresh()
            }
            this._rewardPanel.load(() => {
                UIManager.getInstance().addUIContainer(this._rewardPanel);
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
            })
        }
       
        private smsgSweepInstanceReward($byte: ByteArray): void {
            var vo: s2c_sweep_instance_reward = new s2c_sweep_instance_reward();
            console.log(vo)
            s2c_sweep_instance_reward.read(vo, $byte);
            this.showPanel(vo);
            // var $inst_sub_type: number = vo.inst_sub_type
            // var $waitTime:number=1
            // switch ($inst_sub_type) {
            //     case SharedDef.INSTANCE_SUB_TYPE_VIP:
            //         $waitTime = 2
            //         break;
            //     case SharedDef.INSTANCE_SUB_TYPE_TRIAL:
            //         $waitTime = 1000
            //         break;
            //     default:
            //         break
            // }
            // TimeUtil.addTimeOut($waitTime, () => {
            //     this.showPanel(vo);
            // });
        
        }
        
        public getHanderMap(): Object {
            var obj: Object = new Object;
            obj[Protocols.SMSG_SWEEP_INSTANCE_REWARD] = ($byte: ByteArray) => { this.smsgSweepInstanceReward($byte) };
            return obj;
        }
        

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }

    }
}