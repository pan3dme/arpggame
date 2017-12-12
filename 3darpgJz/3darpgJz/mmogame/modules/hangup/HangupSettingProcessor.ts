module Hangup {
    export class HangupUiModel extends Module {
        public getModuleName(): string {
            return "HangupUiModel";
        }
        protected listProcessors(): Array<Processor> {
            return [new HangupSettingProcessor()];
        }
    }
    export class HangupUiEvent extends BaseEvent {
        //展示技能面板
        public static SHOW_HANGUPUI_EVENT: string = "SHOW_HANGUPUI_EVENT";
        //隐藏技能面板
        public static HIDE_HANGUPUI_EVENT: string = "HIDE_HANGUPUI_EVENT";

        public data:any;
    }

    export class HangupSettingProcessor extends BaseProcessor {
        private _hangupSettingUiPanel: HangupSettingUiPanel

        public getName(): string {
            return "HangupSettingProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof HangupUiEvent) {
                var $skillUIEvent: HangupUiEvent = <HangupUiEvent>$event;
                if ($skillUIEvent.type == HangupUiEvent.SHOW_HANGUPUI_EVENT) {
                    this.showUi();
                } else if ($skillUIEvent.type == HangupUiEvent.HIDE_HANGUPUI_EVENT) {
                    this.hideUi()
                }
            }

            if($event instanceof UIPanelEvent){
                var panelEvent:UIPanelEvent = <UIPanelEvent>$event;
                if(panelEvent.panel == this._hangupSettingUiPanel){
                    this._hangupSettingUiPanel.dispose();
                    this._hangupSettingUiPanel = null;
                    console.log("释放面板 _hangupSettingUiPanel")
                }
            }
        }

        private hideUi(): void {
            if (this._hangupSettingUiPanel) {
                this._hangupSettingUiPanel.hide();
            } 

        }
        private showUi(): void {
            if (!this._hangupSettingUiPanel) {
                this._hangupSettingUiPanel = new HangupSettingUiPanel();
            } 
            
            this._hangupSettingUiPanel.load(()=>{
                this._hangupSettingUiPanel.show();
            })
            
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new HangupUiEvent(HangupUiEvent.SHOW_HANGUPUI_EVENT),
                new HangupUiEvent(HangupUiEvent.HIDE_HANGUPUI_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                // new EngineEvent(EngineEvent.MONEY_TYPE_QI),
                // new EngineEvent(EngineEvent.MONEY_TYPE_SILVER),
            ];
        }
    }

}