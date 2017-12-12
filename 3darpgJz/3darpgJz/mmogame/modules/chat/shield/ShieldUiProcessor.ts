module shieldui {
    export class ShieldUiModule extends Module {
        public getModuleName(): string {
            return "ShieldUiModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new ShieldUiProcessor()];
        }
    }
    export class ShieldUiEvent extends BaseEvent {
        public static SHOW_SHIELD_UI_PANEL: string = "SHOW_SHIELD_UI_PANEL";
        public static HIDE_SHIELD_UI_PANEL: string = "HIDE_SHIELD_UI_PANEL";
        public static PLAYER_STRING_FIELD_BLOCK: string = "PLAYER_STRING_FIELD_BLOCK";
    }
    export class ShieldUiProcessor extends BaseProcessor {

        public getName(): string {
            return "ShieldUiProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof ShieldUiEvent) {
                var evt: ShieldUiEvent = <ShieldUiEvent>$event;
                if (evt.type == ShieldUiEvent.SHOW_SHIELD_UI_PANEL) {
                    this.showPanel();
                }
                if (evt.type == ShieldUiEvent.HIDE_SHIELD_UI_PANEL) {
                    this.hidePanel();
                }
                if (evt.type == ShieldUiEvent.PLAYER_STRING_FIELD_BLOCK) {
                    console.log("PLAYER_STRING_FIELD_BLOCK")
                    if (this.shieldUiPanel) {
                        this.shieldUiPanel.refresh();
                    }
                }
            }
        }
        private hidePanel(): void {
            if (this.shieldUiPanel) {
                this.shieldUiPanel.close();
            }

        }
        private shieldUiPanel: ShieldUiPanel
        private showPanel(): void {

            if (!this.shieldUiPanel) {
                this.shieldUiPanel = new ShieldUiPanel();
            }
            this.shieldUiPanel.load(() => {
                UIManager.getInstance().addUIContainer(this.shieldUiPanel);
                this.shieldUiPanel.refresh();
            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new ShieldUiEvent(ShieldUiEvent.SHOW_SHIELD_UI_PANEL),
                new ShieldUiEvent(ShieldUiEvent.HIDE_SHIELD_UI_PANEL),
                new ShieldUiEvent(ShieldUiEvent.PLAYER_STRING_FIELD_BLOCK),

            ];
        }

    }


}