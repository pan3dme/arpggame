module duihuan {


    export class DuiHuanModule extends Module {
        public getModuleName(): string {
            return "DuiHuanModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new DuiHuanProcessor()];
        }
    }
    export class DuiHuanEvent extends BaseEvent {
        public static SHOW_DUIHUAN_PANEL: string = "SHOW_DUIHUAN_PANEL";
        public static HIDE_DUIHUAN_PANEL: string = "HIDE_DUIHUAN_PANEL";
        
        public MaxSelectNum: number;  //区间值;
        public SubmitFun: Function; //回调函数;
        public UnitPrice: number;//使用单价;
        public UseResType: number; //使用类型;
        public tittleid: number;

    }
    export class DuiHuanProcessor extends BaseProcessor {

        public getName(): string {
            return "DuiHuanProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof DuiHuanEvent) {
                var evt: DuiHuanEvent = <DuiHuanEvent>$event;
                if (evt.type == DuiHuanEvent.SHOW_DUIHUAN_PANEL) {
                    if ($event.MaxSelectNum > 0) {
                        this.showPanel($event);
                    } else {
                        msgtip.MsgTipManager.outStr("[ff0000]今日次数已用完", 99);
                    }
                }
                if (this.exchangepPanel) {
                    if (evt.type == DuiHuanEvent.HIDE_DUIHUAN_PANEL) {
                        this.hidePanel()
                    }
                
                }

            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this.exchangepPanel) {
                    this.exchangepPanel.dispose();
                    this.exchangepPanel = null;
                    console.log("释放面板 exchangepPanel")
                }
            }
     
        }
        private hidePanel(): void {
            this.exchangepPanel.hide()

        }
        private exchangepPanel: DuiHuanPanel
        private showPanel($event : DuiHuanEvent): void {
            if (!this.exchangepPanel) {
                this.exchangepPanel = new DuiHuanPanel();
            }
            this.exchangepPanel.load(() => {
                UIManager.getInstance().addUIContainer(this.exchangepPanel);
                this.exchangepPanel.refresh($event)

            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new DuiHuanEvent(DuiHuanEvent.SHOW_DUIHUAN_PANEL),
                new DuiHuanEvent(DuiHuanEvent.HIDE_DUIHUAN_PANEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }

    }


}