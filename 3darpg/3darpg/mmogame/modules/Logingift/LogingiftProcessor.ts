module logingift {
    export class LogingiftModule extends Module {
        public getModuleName(): string {
            return "LogingiftModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new LogingiftProcessor()];
        }
    }
    export class LogingiftEvent extends BaseEvent {
        //展示面板
        public static SHOW_Logingift_EVENT: string = "SHOW_Logingift_EVENT";
        //隐藏面板
        public static HIDE_Logingift_EVENT: string = "HIDE_Logingift_EVENT";
        //领取状态变化
        public static REFRESH_Logingift_EVENT: string = "REFRESH_Logingift_EVENT";

        public data: any;

    }

    export class LogingiftProcessor extends BaseProcessor {
        private _logingiftUiPanel: LogingiftUiPanel

        public getName(): string {
            return "LogingiftProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof LogingiftEvent) {
                var $givingUiEvent: LogingiftEvent = <LogingiftEvent>$event;
                if ($givingUiEvent.type == LogingiftEvent.SHOW_Logingift_EVENT) {
                    this.showUi($givingUiEvent.data);
                } else if ($givingUiEvent.type == LogingiftEvent.REFRESH_Logingift_EVENT) {
                    this.refresh();
                } else if ($givingUiEvent.type == LogingiftEvent.HIDE_Logingift_EVENT) {
                    this.hideUi()
                }
            }


            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._logingiftUiPanel) {
                    this._logingiftUiPanel.dispose();
                    this._logingiftUiPanel = null;
                    console.log("释放面板 _logingiftUiPanel")
                }
            }
        }

        private refresh(): void {
            if (this._logingiftUiPanel && 　this._logingiftUiPanel.hasStage) {
                this._logingiftUiPanel.resetData();
            }
            if (this._logingiftUiPanel && 　this._logingiftUiPanel.logingiftList && this._logingiftUiPanel.logingiftList.hasStage) {
                this._logingiftUiPanel.logingiftList.refreshDataByNewData();
            }
        }

        private hideUi(): void {
            this._logingiftUiPanel.hide();
            SceneManager.getInstance().render = true;
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));

        }
        private showUi($type: number): void {
            if (!this._logingiftUiPanel) {
                this._logingiftUiPanel = new LogingiftUiPanel();
            }
            this._logingiftUiPanel.load(() => {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));

                this._logingiftUiPanel.show();
            })

        }

        // public getHanderMap(): Object {
        //     var obj: Object = new Object;
        //     obj[Protocols.SMSG_WELFARE_REWARDLIST_GETBACK] = ($byte: ByteArray) => { this.getbackResultList($byte) };

        //     return obj;
        // }


        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new LogingiftEvent(LogingiftEvent.SHOW_Logingift_EVENT),
                new LogingiftEvent(LogingiftEvent.HIDE_Logingift_EVENT),
                new LogingiftEvent(LogingiftEvent.REFRESH_Logingift_EVENT),

                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),

            ];
        }

    }
}