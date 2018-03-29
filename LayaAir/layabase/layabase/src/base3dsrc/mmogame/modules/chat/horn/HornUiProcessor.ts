module hornui {
    export class HornUiModule extends Module {
        public getModuleName(): string {
            return "HornUiModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new HornUiProcessor()];
        }
    }
    export class HornUiEvent extends BaseEvent {
        public static SHOW_HORN_UI_PANEL: string = "SHOW_HORN_UI_PANEL";
        public static HIDE_HORN_UI_PANEL: string = "HIDE_HORN_UI_PANEL";
    }
    export class HornUiProcessor extends BaseProcessor {

        public getName(): string {
            return "HornUiProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof HornUiEvent) {
                var evt: HornUiEvent = <HornUiEvent>$event;
                if (evt.type == HornUiEvent.SHOW_HORN_UI_PANEL) {
                    this.showPanel()
                }
                if (evt.type == HornUiEvent.HIDE_HORN_UI_PANEL) {
                    this.hidePanel()
                }
            }
        }
        private hidePanel(): void {
            if (this.hornUiPanel) {
                UIManager.getInstance().removeUIContainer(this.hornUiPanel);
            }

        }
        private hornUiPanel: HornUiPanel
        private showPanel(): void {
   
            if (!this.hornUiPanel) {
                this.hornUiPanel = new HornUiPanel();
            }
            this.hornUiPanel.load(() => {
                UIManager.getInstance().addUIContainer(this.hornUiPanel);
            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new HornUiEvent(HornUiEvent.SHOW_HORN_UI_PANEL),
                new HornUiEvent(HornUiEvent.HIDE_HORN_UI_PANEL),

            ];
        }

    }


}