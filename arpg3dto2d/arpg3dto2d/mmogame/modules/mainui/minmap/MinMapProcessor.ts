module minmap {

    export class MinMapModule extends Module {
        public getModuleName(): string {
            return "MinMapModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new MinMapProcessor()];
        }
    }

    export class MinMapProcessor extends BaseProcessor {
        public getName(): string {
            return "MapProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {

            if ($event instanceof EngineEvent) {
                var $comandEvent: EngineEvent = <EngineEvent>$event;
                if ($comandEvent.type == EngineEvent.ENTER_SCENE_EVENT) {
                   // if (GuidData.map.showAreaById(AreaType.toprightmap_4)) {  
                    this.showUi();
                    this._mapPanel.refresh()
                   
                }
            }
            if ($event instanceof mainUi.MainUiEvent) {
                var $mainUIEvent: mainUi.MainUiEvent = <mainUi.MainUiEvent>$event;
                if ($mainUIEvent.type == mainUi.MainUiEvent.SHOW_MAINUI_EVENT) {
                    this.showUi();
                } else if ($mainUIEvent.type == mainUi.MainUiEvent.HIDE_MAINUI_EVENT) {
                    this.hideUi();
                }
            }

        }
        private showUi(): void
        {
         
                if (!this._mapPanel) {
                    this._mapPanel = new MinMapPanel();
                }
                if (GuidData.map.showAreaById(AreaType.toprightmap_4)) {
                    UIManager.getInstance().addUIContainer(this._mapPanel);
                }
        }
        private hideUi(): void
        {
            if (this._mapPanel) {
                UIManager.getInstance().removeUIContainer(this._mapPanel);
            }
        }

        private _mapPanel: MinMapPanel;
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT),
                new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT),
                new EngineEvent(EngineEvent.ENTER_SCENE_EVENT),
            ];
        }





    }

}
