module offlinereward {
    export class OfflineRewardModule extends Module {
        public getModuleName(): string {
            return "OfflineRewardModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new OfflineRewardProcessor()];
        }
    }
    export class OfflineRewardEvent extends BaseEvent {
        public static SHOW_OFFLINE_REWARD_PANEL: string = "SHOW_OFFLINE_REWARD_PANEL";
        public static HIDE_OFFLINE_REWARD_PANEL: string = "HIDE_OFFLINE_REWARD_PANEL";
        public data: s2c_offline_reward_result;

    }
    export class OfflineRewardProcessor extends BaseProcessor {

        public getName(): string {
            return "OfflineRewardProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof OfflineRewardEvent) {
                var evt: OfflineRewardEvent = <OfflineRewardEvent>$event;
                if (evt.type == OfflineRewardEvent.SHOW_OFFLINE_REWARD_PANEL) {
                    this.showPanel(evt.data);
                }
                if (this.offlineRewardPanel) {
                    if (evt.type == OfflineRewardEvent.HIDE_OFFLINE_REWARD_PANEL) {
                        this.hidePanel()
                    }
                }
            }


        }
        private hidePanel(): void {
            if (this.offlineRewardPanel) {
                UIManager.getInstance().removeUIContainer(this.offlineRewardPanel);
            }

        }
        private offlineRewardPanel: OfflineRewardPanel
        private showPanel($data: s2c_offline_reward_result): void {
            if (!this.offlineRewardPanel) {
                this.offlineRewardPanel = new OfflineRewardPanel();
            }
            this.offlineRewardPanel.load(() => {
                UIManager.getInstance().addUIContainer(this.offlineRewardPanel);
                this.offlineRewardPanel.refresh($data);
            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new OfflineRewardEvent(OfflineRewardEvent.SHOW_OFFLINE_REWARD_PANEL),
                new OfflineRewardEvent(OfflineRewardEvent.HIDE_OFFLINE_REWARD_PANEL),


            ];
        }

    }


}