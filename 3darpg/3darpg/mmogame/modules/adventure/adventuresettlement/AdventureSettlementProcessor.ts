module adventuresettlement {
    export class AdventureSettlementModule extends Module {
        public getModuleName(): string {
            return "AdventureSettlementModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new AdventureSettlementProcessor()];
        }
    }
    export class AdventureSettlementEvent extends BaseEvent {
        public static SHOW_ADVENTURE_SETTLEMENT_UI_PANEL: string = "SHOW_ADVENTURE_SETTLEMENT_UI_PANEL";
        public static HIDE_ADVENTURE_SETTLEMENT_UI_PANEL: string = "HIDE_ADVENTURE_SETTLEMENT_UI_PANEL";

    }
    export class AdventureSettlementProcessor extends BaseProcessor {

        public getName(): string {
            return "AdventureSettlementProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof AdventureSettlementEvent) {
                var evt: AdventureSettlementEvent = <AdventureSettlementEvent>$event;
                if (evt.type == AdventureSettlementEvent.SHOW_ADVENTURE_SETTLEMENT_UI_PANEL) {
                    if (GuidData.map.isAdventureScene()) {
                        this.showPanel();
                        ModuleEventManager.dispatchEvent(new adventureinfo.AdventurInfoEvent(adventureinfo.AdventurInfoEvent.ADVENTURE_BOSS_PROCESS_FINISH))

        
                    } else {
                        this.hidePanel();
                    }
                }
                if (this.adventurePanel) {
                    if (evt.type == AdventureSettlementEvent.HIDE_ADVENTURE_SETTLEMENT_UI_PANEL) {
                        this.hidePanel()
                    }
           
                }
            }


        }
        private hidePanel(): void {
            if (this.adventurePanel) {
                this.adventurePanel.hide();
            }

        }
        private adventurePanel: AdventureSettlementPanel
        private showPanel(): void {
            if (!this.adventurePanel) {
                this.adventurePanel = new AdventureSettlementPanel();
            }
            var $time: number = GameInstance.getGameSecond(GuidData.map.getMapIntFieldEndTM())
            this.adventurePanel.endTime = TimeUtil.getTimer() + $time * 1000;//结束时间
            console.log("结束时间", $time)
            this.adventurePanel.load(() => {
                this.adventurePanel.show();
            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new AdventureSettlementEvent(AdventureSettlementEvent.SHOW_ADVENTURE_SETTLEMENT_UI_PANEL),
                new AdventureSettlementEvent(AdventureSettlementEvent.HIDE_ADVENTURE_SETTLEMENT_UI_PANEL),


            ];
        }

    }


}