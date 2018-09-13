module adventurebossnotice {
    export class AdventureBossNoticeModule extends Module {
        public getModuleName(): string {
            return "AdventureBossNoticeModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new AdventureBossNoticeProcessor()];
        }
    }
    export class AdventureBossNoticeEvent extends BaseEvent {
        public static SHOW_Adventure_Notice_UI_PANEL: string = "SHOW_Adventure_Notice_UI_PANEL";
        public static HIDE_Adventure_Notice_UI_PANEL: string = "HIDE_Adventure_Notice_UI_PANEL";

    }
    export class AdventureBossNoticeProcessor extends BaseProcessor {

        public getName(): string {
            return "AdventureBossNoticeProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof AdventureBossNoticeEvent) {
                var evt: AdventureBossNoticeEvent = <AdventureBossNoticeEvent>$event;
                if (evt.type == AdventureBossNoticeEvent.SHOW_Adventure_Notice_UI_PANEL) {
                    if (GuidData.map.isAdventureScene()) {
                        this.showPanel();
                    } else {
                        this.hidePanel();
                    }
                }
                if (this.adventurePanel) {
                    if (evt.type == AdventureBossNoticeEvent.HIDE_Adventure_Notice_UI_PANEL) {
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
        private adventurePanel: AdventureBossNoticePanel
        private showPanel(): void {
            if (!this.adventurePanel) {
                this.adventurePanel = new AdventureBossNoticePanel();
            }
            this.adventurePanel.load(() => {
                this.adventurePanel.show();
                //var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
                //$scenePange.data = 901
                //ModuleEventManager.dispatchEvent($scenePange);

            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new AdventureBossNoticeEvent(AdventureBossNoticeEvent.SHOW_Adventure_Notice_UI_PANEL),
                new AdventureBossNoticeEvent(AdventureBossNoticeEvent.HIDE_Adventure_Notice_UI_PANEL),
            ];
        }

    }


}