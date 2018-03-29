module setingui {
    export class SetingUiModule extends Module {
        public getModuleName(): string {
            return "SetingUiModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new SetingUiProcessor()];
        }
    }
    export class SetingUiEvent extends BaseEvent {
        public static SHOW_SETING_UI_PANEL: string = "SHOW_SETING_UI_PANEL";
        public static HIDE_SETING_UI_PANEL: string = "HIDE_SETING_UI_PANEL";
    }
    export class SetingUiProcessor extends BaseProcessor {

        public getName(): string {
            return "SetingUiProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof SetingUiEvent) {
                var evt: SetingUiEvent = <SetingUiEvent>$event;
                if (evt.type == SetingUiEvent.SHOW_SETING_UI_PANEL) {
                    this.showPanel()
                }
                if (evt.type == SetingUiEvent.HIDE_SETING_UI_PANEL) {
                    this.hidePanel()
                }
            }
        }
        private hidePanel(): void {
            if (this.setingUiPanel) {
                UIManager.getInstance().removeUIContainer(this.setingUiPanel);
            }

        }
        private setingUiPanel: SetingUiPanel
        private showPanel(): void {

            if (!this.setingUiPanel) {
                this.setingUiPanel = new SetingUiPanel();
            }
            this.setingUiPanel.load(() => {
                UIManager.getInstance().addUIContainer(this.setingUiPanel);
                this.setingUiPanel.refresh()
            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new SetingUiEvent(SetingUiEvent.SHOW_SETING_UI_PANEL),
                new SetingUiEvent(SetingUiEvent.HIDE_SETING_UI_PANEL),

            ];
        }

    }


}