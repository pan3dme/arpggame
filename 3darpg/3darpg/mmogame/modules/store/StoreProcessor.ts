module store {
    export class StoreModule extends Module {
        public getModuleName(): string {
            return "StoreModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new StoreProcessor()];
        }
    }
    export class StoreEvent extends BaseEvent {
        //展示面板
        public static SHOW_Store_EVENT: string = "SHOW_Store_EVENT";
        //隐藏面板
        public static HIDE_Store_EVENT: string = "HIDE_Store_EVENT";
        //购买数目发生变化事件
        public static STORE_NUM_EVENT: string = "STORE_NUM_EVENT";
        //选中物品事件
        public static SELECT_PROP_EVENT: string = "SELECT_PROP_EVENT";
        //选中页签事件
        public static SELECT_TAB_EVENT: string = "SELECT_TAB_EVENT";

        public data: any;

    }

    export class StoreProcessor extends BaseProcessor {
        private _storeUiPanel: StoreUiPanel

        public getName(): string {
            return "StoreProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof StoreEvent) {
                var $givingUiEvent: StoreEvent = <StoreEvent>$event;
                if ($givingUiEvent.type == StoreEvent.SHOW_Store_EVENT) {
                    this.showUi($givingUiEvent.data);
                } else if ($givingUiEvent.type == StoreEvent.HIDE_Store_EVENT) {
                    this.hideUi()
                } else if ($givingUiEvent.type == StoreEvent.STORE_NUM_EVENT) {
                    this.refreshData()
                } else if ($givingUiEvent.type == StoreEvent.SELECT_PROP_EVENT) {
                    this.selectedProp($givingUiEvent.data);
                } else if ($givingUiEvent.type == StoreEvent.SELECT_TAB_EVENT) {
                    this.selectTab($givingUiEvent.data);
                }
            }


            if ($event instanceof EngineEvent) {
                var $engineEvent: EngineEvent = <EngineEvent>$event;
                if ($engineEvent.type == EngineEvent.MONEY_CHANGE) {
                    if (this._storeUiPanel && this._storeUiPanel.shopMallPanel && this._storeUiPanel.shop && this._storeUiPanel.shop.hasStage) {
                        this._storeUiPanel.shop.setOwnMoney()
                        TimeUtil.addTimeOut(10, () => {
                            this._storeUiPanel.shop.resetlimNum();
                        });
                    }
                }
            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._storeUiPanel) {
                    this._storeUiPanel.dispose();
                    this._storeUiPanel = null;
                    console.log("释放面板 _storeUiPanel")
                }
            }
        }

        private selectTab($typeid: number) {
            if (this._storeUiPanel && this._storeUiPanel.shop) {
                this._storeUiPanel.shop.show($typeid);
            }
        }

        private selectedProp($data): void {
            if (this._storeUiPanel && this._storeUiPanel.shop && this._storeUiPanel.shop.hasStage) {
                this._storeUiPanel.shop.resetData($data);
            }
        }

        private refreshData(): void {
            //数目变化时，刷新数据
            if (this._storeUiPanel && this._storeUiPanel.shop) {
                this._storeUiPanel.shop.shoplist.refreshDataByNewData();
            }
            // if (this._storeUiPanel && this._storeUiPanel.shopMallPanel && this._storeUiPanel.shop && this._storeUiPanel.shop.hasStage) {
            //     this._storeUiPanel.shop.resetlimNum();
            // }
        }

        private hideUi(): void {
            this._storeUiPanel.hide();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));

        }
        private showUi($type: Array<number> = null): void {
            console.log("--打开商城--参数", $type);
            if (!this._storeUiPanel) {
                this._storeUiPanel = new StoreUiPanel();
            }
            this._storeUiPanel.load(() => {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));

                this._storeUiPanel.show($type);
            })
        }


        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new StoreEvent(StoreEvent.SHOW_Store_EVENT),
                new StoreEvent(StoreEvent.HIDE_Store_EVENT),
                new StoreEvent(StoreEvent.STORE_NUM_EVENT),
                new StoreEvent(StoreEvent.SELECT_PROP_EVENT),
                new StoreEvent(StoreEvent.SELECT_TAB_EVENT),

                new EngineEvent(EngineEvent.MONEY_CHANGE),

                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }
    }

}