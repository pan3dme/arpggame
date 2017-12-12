module stronger {
    export class StrongerModule extends Module {
        public getModuleName(): string {
            return "StrongerModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new StrongerProcessor()];
        }
    }
    export class StrongerEvent extends BaseEvent {
        //展示面板
        public static SHOW_Stronger_EVENT: string = "SHOW_Stronger_EVENT";
        //隐藏面板
        public static HIDE_Stronger_EVENT: string = "HIDE_Stronger_EVENT";
        //选中Tab，打开相对应的面板事件
        public static SELECTTAB_Stronger_EVENT: string = "SELECTTAB_Stronger_EVENT";

        public data: any;

    }

    export class StrongerProcessor extends BaseProcessor {
        private _strongerUiPanel: StrongerUiPanel

        public getName(): string {
            return "WelfareProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof StrongerEvent) {
                var $givingUiEvent: StrongerEvent = <StrongerEvent>$event;
                if ($givingUiEvent.type == StrongerEvent.SHOW_Stronger_EVENT) {
                    this.showUi($givingUiEvent.data);
                } else if ($givingUiEvent.type == StrongerEvent.HIDE_Stronger_EVENT) {
                    this.hideUi()
                } else if ($givingUiEvent.type == StrongerEvent.SELECTTAB_Stronger_EVENT) {
                    this.selecttabpanel($givingUiEvent.data);
                }
            }

            if ($event instanceof EngineEvent) {
                var $engineEvent: EngineEvent = <EngineEvent>$event;
                if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                    //升级监听
                    this.receivelevelreward();
                }
            }

            if($event instanceof UIPanelEvent){
                var panelEvent:UIPanelEvent = <UIPanelEvent>$event;
                if(panelEvent.panel == this._strongerUiPanel){
                    this._strongerUiPanel.dispose();
                    this._strongerUiPanel = null;
                    console.log("释放面板 _strongerUiPanel")
                }
            }
        }


        private receivelevelreward(): void {
            // if (this._strongerUiPanel && this._strongerUiPanel.welfareLevel && this._strongerUiPanel.welfareLevel.hasStage) {
            //     this._welfareUiPanel.welfareLevel.resetData();
            //     this._welfareUiPanel.welfareTabList.refreshDataByNewData();
            // }
        }


        private selecttabpanel($data: any): void {
            if (this._strongerUiPanel && this._strongerUiPanel.hasStage) {
                this._strongerUiPanel.showStrongerList($data);
            }
        }

        private hideUi(): void {
            this._strongerUiPanel.hide();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        }

        private showUi($type:number): void {
            if (!this._strongerUiPanel) {
                this._strongerUiPanel = new StrongerUiPanel();
            }
            this._strongerUiPanel.load(() => {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));

                this._strongerUiPanel.show($type);
            })
        }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new StrongerEvent(StrongerEvent.SHOW_Stronger_EVENT),
                new StrongerEvent(StrongerEvent.HIDE_Stronger_EVENT),
                new StrongerEvent(StrongerEvent.SELECTTAB_Stronger_EVENT),

                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }

    }
}