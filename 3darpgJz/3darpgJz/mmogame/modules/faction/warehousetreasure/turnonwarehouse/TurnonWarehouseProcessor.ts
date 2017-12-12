module turnonwarehouse {
    export class TurnonWarehouseModule extends Module {
        public getModuleName(): string {
            return "TurnonWarehouseModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new TurnonWarehouseProcessor()];
        }
    }
    export class TurnonWarehouseEvent extends BaseEvent {
        public static SHOW_TURNON_WAREHOUSE_PANEL: string = "SHOW_TURNON_WAREHOUSE_PANEL";
        public static HIDE_TURNON_WAREHOUSE_PANEL: string = "HIDE_TURNON_WAREHOUSE_PANEL";
        public static FERISH_TURNON_WARHOUSE_DATA: string = "FERISH_TURNON_WARHOUSE_DATA";

    }
    export class TurnonWarehouseProcessor extends BaseProcessor {

        public getName(): string {
            return "TurnonWarehouseProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof TurnonWarehouseEvent) {
                var evt: TurnonWarehouseEvent = <TurnonWarehouseEvent>$event;
                if (evt.type == TurnonWarehouseEvent.SHOW_TURNON_WAREHOUSE_PANEL) {
                    this.showPanel();

                }
                if (this.turnonWarehousePanel) {
                    if (evt.type == TurnonWarehouseEvent.HIDE_TURNON_WAREHOUSE_PANEL) {
                        this.hidePanel()
                    }
                    if (evt.type == TurnonWarehouseEvent.FERISH_TURNON_WARHOUSE_DATA) {

                    }

                }

            }

            if ($event instanceof charbg.CharBgEvent) {
                if ($event.type == charbg.CharBgEvent.BGDATA_CHANGE_EVENT) {
                    if ($event.showType == BagData.TYPE_EQU_BG &&　this.turnonWarehousePanel) {
                        this.turnonWarehousePanel.refresh();
                    }
                }
            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this.turnonWarehousePanel) {
                    this.turnonWarehousePanel.dispose();
                    this.turnonWarehousePanel = null;
                    console.log("释放面板 turnonWarehousePanel")
                }
            }
        }
        private hidePanel(): void {

            this.turnonWarehousePanel.hide()
        }
        private turnonWarehousePanel: TurnonWarehousePanel
        private showPanel(): void {
            if (!this.turnonWarehousePanel) {
                this.turnonWarehousePanel = new TurnonWarehousePanel();
            }
            this.turnonWarehousePanel.load(() => {
                this.turnonWarehousePanel.show()
            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new TurnonWarehouseEvent(TurnonWarehouseEvent.SHOW_TURNON_WAREHOUSE_PANEL),
                new TurnonWarehouseEvent(TurnonWarehouseEvent.HIDE_TURNON_WAREHOUSE_PANEL),
                new TurnonWarehouseEvent(TurnonWarehouseEvent.FERISH_TURNON_WARHOUSE_DATA),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT)
            ];
        }

    }


}