module homeui {
    export class HomeUiModule extends Module {
        public getModuleName(): string {
            return "HomeUiModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new HomeUiProcessor()];
        }
    }
    export class HomeUiEvent extends BaseEvent {
        public static SHOW_HOME_UI_PANEL: string = "SHOW_HOME_UI_PANEL";
        public static HIDE_HOME_UI_PANEL: string = "HIDE_HOME_UI_PANEL";
        public static REFRESH_HOME_UI_PANEL: string = "REFRESH_HOME_UI_PANEL";
    }
    export class HomeUiProcessor extends BaseProcessor {

        public getName(): string {
            return "HomeUiProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof HomeUiEvent) {
                var evt: HomeUiEvent = <HomeUiEvent>$event;
                if (evt.type == HomeUiEvent.SHOW_HOME_UI_PANEL) {
                    if (GuidData.map.showAreaById(AreaType.rightChange_6)) {
                        this.showPanel();
                    }
                  
                }
                if (evt.type == HomeUiEvent.HIDE_HOME_UI_PANEL) {
                    this.hidePanel();
                }
                if (evt.type == HomeUiEvent.REFRESH_HOME_UI_PANEL) {
                    if (this._homeUiPanel) {
                        this._homeUiPanel.homeSysPanel.refresh();
                    }
                }
            }
        }
        private hidePanel(): void {
            if (this._homeUiPanel) {
                UIManager.getInstance().removeUIContainer(this._homeUiPanel);
            }
        }
        private _homeUiPanel: HomeUiPanel;
        private showPanel(): void {
            if (!this._homeUiPanel) {
                this._homeUiPanel = new HomeUiPanel();
            }
            this._homeUiPanel.load(() => {
                UIManager.getInstance().addUIContainer(this._homeUiPanel);
            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new HomeUiEvent(HomeUiEvent.SHOW_HOME_UI_PANEL),
                new HomeUiEvent(HomeUiEvent.HIDE_HOME_UI_PANEL),
                new HomeUiEvent(HomeUiEvent.REFRESH_HOME_UI_PANEL),

            ];
        }

    }


}