module refill {
    export class RefillModule extends Module {
        public getModuleName(): string {
            return "RefillModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new RefillProcessor()];
        }
    }
    export class RefillEvent extends BaseEvent {
        //展示面板
        public static SHOW_Refill_EVENT: string = "SHOW_Refill_EVENT";
        //隐藏面板
        public static HIDE_Refill_EVENT: string = "HIDE_Refill_EVENT";
        //主面板弹窗提示
        public static POP_Refill_EVENT: string = "POP_Refill_EVENT";

        public data: any;

    }

    export class RefillProcessor extends BaseProcessor {
        private _refillUiPanel: RefillUiPanel

        public getName(): string {
            return "RefillProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof RefillEvent) {
                var $givingUiEvent: RefillEvent = <RefillEvent>$event;
                if ($givingUiEvent.type == RefillEvent.SHOW_Refill_EVENT) {
                    this.showUi();
                } else if ($givingUiEvent.type == RefillEvent.POP_Refill_EVENT) {
                    this.poppanel($event.data);
                } else if ($givingUiEvent.type == RefillEvent.HIDE_Refill_EVENT) {
                    this.hideUi();
                }
            }


            if ($event instanceof EngineEvent) {
                var $engineEvent: EngineEvent = <EngineEvent>$event;
                if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                    if (!GuidData.quest.IsReceiveShouChongReward()) {
                        var $obj: any = TableData.getInstance().getTableByName(TableData.tb_refill_main_poppanel_level);
                        for (var $key in $obj.data) {
                            if ($obj.data[$key]["lev"] == GuidData.player.getLevel()) {
                                ModuleEventManager.dispatchEvent(new topui.TopUiEvent(topui.TopUiEvent.SHOW_REFILL_POP_PANDA));
                            }
                        }
                    }
                }
            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._refillUiPanel) {
                    this._refillUiPanel.dispose();
                    this._refillUiPanel = null;
                    //console.log("释放面板 _RefillUiPanel")
                }
                if (panelEvent.panel == this.popTipspanel) {
                    this.popTipspanel.dispose();
                    this.popTipspanel = null;
                    //console.log("释放面板 popTipspanel")
                }
            }
        }


        private popTipspanel:PopPanel
        private poppanel($data:topui.TopIconVo){
            if (!this.popTipspanel) {
                this.popTipspanel = new PopPanel();
            }
            this.popTipspanel.load(() => {
                this.popTipspanel.show($data);
            },false);
        }

        private hideUi(): void {
            if(this._refillUiPanel && this._refillUiPanel.hasStage){
                this._refillUiPanel.hide();
                SceneManager.getInstance().render = true;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            }
        }
        private showUi(): void {
            if (!this._refillUiPanel) {
                this._refillUiPanel = new RefillUiPanel();
            }
            this._refillUiPanel.load(() => {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));

                this._refillUiPanel.show();
            })
        }


        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new RefillEvent(RefillEvent.SHOW_Refill_EVENT),
                new RefillEvent(RefillEvent.HIDE_Refill_EVENT),
                new RefillEvent(RefillEvent.POP_Refill_EVENT),

                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),

                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }
    }

}