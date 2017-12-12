module warehousetreasure {
    export class WarehouseTreasureModule extends Module {
        public getModuleName(): string {
            return "WarehouseTreasureModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new WarehouseTreasureProcessor()];
        }
    }
    export class WarehouseEvent extends BaseEvent {
        public static SHOW_WAREHOUSE_PANEL: string = "SHOW_WAREHOUSE_PANEL";
        public static HIDE_WAREHOUSE_PANEL: string = "HIDE_WAREHOUSE_PANEL";

        public static WAREHOUSE_LOG_REFRESH: string = "WAREHOUSE_LOG_REFRESH";
        public static WAREHOUSE_BAG_REFRESH: string = "WAREHOUSE_BAG_REFRESH";
        public static TREASURE_LOG_REFRESH: string = "TREASURE_LOG_REFRESH";



        public static TREASURE_NUM_REFRESH: string = "TREASURE_NUM_REFRESH";



    }
    export class WarehouseTreasureProcessor extends BaseProcessor {

        public getName(): string {
            return "WarehouseTreasureProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof WarehouseEvent) {
                var evt: WarehouseEvent = <WarehouseEvent>$event;
                if (evt.type == WarehouseEvent.SHOW_WAREHOUSE_PANEL) {
                    this.showPanel();
                }
                if (this.warehousePanel) {
                    if (evt.type == WarehouseEvent.HIDE_WAREHOUSE_PANEL) {
                        this.hidePanel()
                    }
                    if (evt.type == WarehouseEvent.WAREHOUSE_BAG_REFRESH) {
                        this.warehousePanel.refreshWareBagList();
                    }
                    if (evt.type == WarehouseEvent.WAREHOUSE_LOG_REFRESH) {
                        this.warehousePanel.refreshLog();
                    }
                    if (evt.type == WarehouseEvent.TREASURE_LOG_REFRESH) {
                        this.warehousePanel.refreshLog();
                    }
                    if (evt.type == WarehouseEvent.TREASURE_NUM_REFRESH) {
                        this.warehousePanel.treasurePanel.refrishDuiHuanTxt()

                        this.warehousePanel.treasurePanel.setdonationByYuanBaoTimes();
                        this.warehousePanel.treasurePanel.setdonationByYinBiTimes();
                    }
                }

            }
            if ($event instanceof EngineEvent) {
                if ($event.type == EngineEvent.MONEY_CHANGE) {
                    if (this.warehousePanel && this.warehousePanel.treasurePanel && this.warehousePanel.treasurePanel.hasStage){
                        this.warehousePanel.treasurePanel.refrishDuiHuanTxt()
                    }
                    if (this.warehousePanel && this.warehousePanel && this.warehousePanel.hasStage){
                        this.warehousePanel.refreshWareBagList();
                    }
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this.warehousePanel) {
                    this.warehousePanel.dispose();
                    this.warehousePanel = null;
                    console.log("释放面板 warehousePanel")
                }
            }

        }
        private hidePanel(): void {
            this.warehousePanel.hide()

        }
        private warehousePanel: WarehouseTreasurePanel
        private showPanel(): void {
            if (GuidData.faction) {
                if (!this.warehousePanel) {
                    this.warehousePanel = new WarehouseTreasurePanel();
                }
                this.warehousePanel.load(() => {
                    UIManager.getInstance().addUIContainer(this.warehousePanel);
                    ModulePageManager.showResTittle([1, 2, 3]);
                    this.warehousePanel.refresh();
                }, false);
            } else {
                ModulePageManager.openPanel(SharedDef.MODULE_FACTION);
            }
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new WarehouseEvent(WarehouseEvent.SHOW_WAREHOUSE_PANEL),
                new WarehouseEvent(WarehouseEvent.HIDE_WAREHOUSE_PANEL),
                new WarehouseEvent(WarehouseEvent.WAREHOUSE_BAG_REFRESH),
                new WarehouseEvent(WarehouseEvent.WAREHOUSE_LOG_REFRESH),
                new WarehouseEvent(WarehouseEvent.TREASURE_LOG_REFRESH),
                new WarehouseEvent(WarehouseEvent.TREASURE_NUM_REFRESH),

                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),

            ];
        }

    }


}