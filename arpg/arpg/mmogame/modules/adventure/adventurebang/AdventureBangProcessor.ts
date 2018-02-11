module adventurebang {
    export class AdventureBangModule extends Module {
        public getModuleName(): string {
            return "AdventureBangModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new AdventureBangProcessor()];
        }
    }
    export class AdventureBangEvent extends BaseEvent {
        public static SHOW_ADVENTURE_BANG_PANEL: string = "SHOW_ADVENTURE_BANG_PANEL";
        public static HIDE_ADVENTURE_BANG_PANEL: string = "HIDE_ADVENTURE_BANG_PANEL";

    }
    export class AdventureBangProcessor extends BaseProcessor {

        public getName(): string {
            return "AdventureBangProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof AdventureBangEvent) {
                var evt: AdventureBangEvent = <AdventureBangEvent>$event;
                if (evt.type == AdventureBangEvent.SHOW_ADVENTURE_BANG_PANEL) {
                    this.showPanel();
                }
                if (this.adventureBangPanel) {
                    if (evt.type == AdventureBangEvent.HIDE_ADVENTURE_BANG_PANEL) {
                        this.hidePanel();
                    }
                }
            }

        }
        private hidePanel(): void {
            if (this.adventureBangPanel) {
                UIManager.getInstance().removeUIContainer(this.adventureBangPanel);
            }

        }
        private adventureBangPanel: AdventureBangPanel
        private showPanel(): void {
            if (!this.adventureBangPanel) {
                this.adventureBangPanel = new AdventureBangPanel();
            }
            this.adventureBangPanel.load(() => {
                UIManager.getInstance().addUIContainer(this.adventureBangPanel);
                this.adventureBangPanel.refresh();
            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new AdventureBangEvent(AdventureBangEvent.SHOW_ADVENTURE_BANG_PANEL),
                new AdventureBangEvent(AdventureBangEvent.HIDE_ADVENTURE_BANG_PANEL),
            ];
        }

    }


}