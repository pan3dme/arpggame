module selectserver {
    export class SelectServerModule extends Module {
        public getModuleName(): string {
            return "SelectServerModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new SelectServerProcessor()];
        }
    }
    export class SelectServerEvent extends BaseEvent {
        //选中一级标签页
        public static SELECT_TAB_EVENT: string = "SELECT_TAB_EVENT";
        //展示进入游戏面板
        public static SHOW_JOINGAME_EVENT: string = "SHOW_JOINGAME_EVENT";
        //隐藏进入游戏面板
        public static HIDE_JOINGAME_EVENT: string = "HIDE_JOINGAME_EVENT";

        //展示选服面板
        public static OPEN_SELECTSERVER_EVENT: string = "OPEN_SELECTSERVER_EVENT";
        //隐藏选服面板
        public static HIDE_SELECTSERVER_EVENT: string = "HIDE_SELECTSERVER_EVENT";
        //展示公告面板
        public static OPEN_GG_EVENT: string = "OPEN_GG_EVENT";
        //隐藏公告面板
        public static HIDE_GG_EVENT: string = "HIDE_GG_EVENT";

        public data: any;

    }

    export class SelectServerProcessor extends BaseProcessor {
        private _selectServerUiPanel: SelectServerUiPanel

        public getName(): string {
            return "SelectServerProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof SelectServerEvent) {
                var $givingUiEvent: SelectServerEvent = <SelectServerEvent>$event;
                if ($givingUiEvent.type == SelectServerEvent.OPEN_SELECTSERVER_EVENT) {
                    this.showUiss();
                } else if ($givingUiEvent.type == SelectServerEvent.HIDE_SELECTSERVER_EVENT) {
                    this.hideUiss()
                } else if ($givingUiEvent.type == SelectServerEvent.OPEN_GG_EVENT) {
                    this.showUigg();
                } else if ($givingUiEvent.type == SelectServerEvent.HIDE_GG_EVENT) {
                    this.hideUigg()
                } else if ($givingUiEvent.type == SelectServerEvent.SELECT_TAB_EVENT) {
                    this.selecttab($givingUiEvent.data);
                } else if ($givingUiEvent.type == SelectServerEvent.SHOW_JOINGAME_EVENT) {
                    this.showjoingameUi();
                } else if ($givingUiEvent.type == SelectServerEvent.HIDE_JOINGAME_EVENT) {
                    this.hidejoingameUi();
                }
            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._selectServerUiPanel) {
                    this._selectServerUiPanel.dispose();
                    this._selectServerUiPanel = null;
                    console.log("释放面板 _selectServerUiPanel")
                }
                if (panelEvent.panel == this._joinGameUiPanel) {
                    this._joinGameUiPanel.dispose();
                    this._joinGameUiPanel = null;
                    console.log("释放面板 _joinGameUiPanel")
                }
            }
        }

        private selecttab($data:Array<ServerVo>) {
            if (this._selectServerUiPanel && this._selectServerUiPanel.ssxuanfu && this._selectServerUiPanel.ssxuanfu.hasStage) {
                this._selectServerUiPanel.ssxuanfu.refreshData($data);
            }
        }

        private hideUiss(): void {
            if (this._selectServerUiPanel) {
                this._selectServerUiPanel.hidess();
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            }
        }
        private showUiss(): void {
            if (!this._selectServerUiPanel) {
                this._selectServerUiPanel = new SelectServerUiPanel();
            }
            this._selectServerUiPanel.load(() => {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));

                this._selectServerUiPanel.showss();
            })
        }
        private hideUigg(): void {
            if (this._selectServerUiPanel) {
                this._selectServerUiPanel.hidegg();
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            }
        }
        private showUigg(): void {
            if (!this._selectServerUiPanel) {
                this._selectServerUiPanel = new SelectServerUiPanel();
            }
            this._selectServerUiPanel.load(() => {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));

                this._selectServerUiPanel.showgg();
            })
        }

        private hidejoingameUi(): void {
            // this._selectServerUiPanel.hide();
            // this._selectServerUiPanel.hidegg();
            if (this._joinGameUiPanel) {
                this._joinGameUiPanel.hide();
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            }
        }
        private _joinGameUiPanel:JoinGameUiPanel;
        private showjoingameUi(): void {
            if (!this._joinGameUiPanel) {
                this._joinGameUiPanel = new JoinGameUiPanel();
            }
            this._joinGameUiPanel.load(() => {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));

                this._joinGameUiPanel.show();
            })
        }


        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new SelectServerEvent(SelectServerEvent.OPEN_SELECTSERVER_EVENT),
                new SelectServerEvent(SelectServerEvent.HIDE_SELECTSERVER_EVENT),
                new SelectServerEvent(SelectServerEvent.OPEN_GG_EVENT),
                new SelectServerEvent(SelectServerEvent.HIDE_GG_EVENT),
                new SelectServerEvent(SelectServerEvent.SELECT_TAB_EVENT),
                new SelectServerEvent(SelectServerEvent.SHOW_JOINGAME_EVENT),
                new SelectServerEvent(SelectServerEvent.HIDE_JOINGAME_EVENT),

                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }
    }

}