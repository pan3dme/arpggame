module chgfish {
    export class ChgfishModule extends Module {
        public getModuleName(): string {
            return "ChgfishModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new ChgfishProcessor()];
        }
    }
    export class ChgfishEvent extends BaseEvent {
        //展示面板
        public static SHOW_Chgfish_EVENT: string = "SHOW_Chgfish_EVENT";
        //隐藏面板
        public static HIDE_Chgfish_EVENT: string = "HIDE_Chgfish_EVENT";
        //刷新
        public static REFRESH_Chgfish_EVENT: string = "REFRESH_Chgfish_EVENT";

        public data: any;

    }

    export class ChgfishProcessor extends BaseProcessor {
        private _chgfishUiPanel: ChgfishUiPanel

        public getName(): string {
            return "ChgfishProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof ChgfishEvent) {
                var $givingUiEvent: ChgfishEvent = <ChgfishEvent>$event;
                if ($givingUiEvent.type == ChgfishEvent.SHOW_Chgfish_EVENT) {
                    this.showUi($givingUiEvent.data);
                } else if ($givingUiEvent.type == ChgfishEvent.HIDE_Chgfish_EVENT) {
                    this.hideUi()
                } else if ($givingUiEvent.type == ChgfishEvent.REFRESH_Chgfish_EVENT) {
                    if (this._chgfishUiPanel && this._chgfishUiPanel.fishTabList && this._chgfishUiPanel.fishTabList.hasStage) {
                        this._chgfishUiPanel.fishTabList.refreshDataByNewData();
                    }
                }
            }


            if ($event instanceof RedPointEvent) {
                var redPointEvent: RedPointEvent = <RedPointEvent>$event;
                if (redPointEvent.type == RedPointEvent.SHOW_REDPOINT_EVENT) {
                    ChgfishModel.getInstance().addItem(redPointEvent.node);
                } else if (redPointEvent.type == RedPointEvent.HIDE_REDPOINT_EVENT) {
                    ChgfishModel.getInstance().removeItem(redPointEvent.node);
                }
            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._chgfishUiPanel) {
                    this._chgfishUiPanel.dispose();
                    this._chgfishUiPanel = null;
                    console.log("释放面板 _chgfishUiPanel")
                }
            }
        }

        private hideUi(): void {
            this._chgfishUiPanel.hide();
        }

        private showUi($ui: FrameCompenent): void {
            if (!this._chgfishUiPanel) {
                this._chgfishUiPanel = new ChgfishUiPanel();
            }
            this._chgfishUiPanel.load(() => {
                //停止绘制前面的ui
                this._chgfishUiPanel.show($ui);
            })
        }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new ChgfishEvent(ChgfishEvent.SHOW_Chgfish_EVENT),
                new ChgfishEvent(ChgfishEvent.HIDE_Chgfish_EVENT),
                new ChgfishEvent(ChgfishEvent.REFRESH_Chgfish_EVENT),

                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new RedPointEvent(RedPointEvent.SHOW_REDPOINT_EVENT),
                new RedPointEvent(RedPointEvent.HIDE_REDPOINT_EVENT),
            ];
        }

    }
}