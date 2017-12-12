module popbuy {


    export class PopBuyModule extends Module {
        public getModuleName(): string {
            return "PopBuyModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new PopBuyProcessor()];
        }
    }
    export class PopBuyEvent extends BaseEvent {
        public static SHOW_POPBUY_PANEL: string = "SHOW_POPBUY_PANEL";
        public static HIDE_POPBUY_PANEL: string = "HIDE_POPBUY_PANEL";
        
        public resoureItem: Array<Array<number>>;  
        public cutNum: number;
        public SubmitFun: Function; //回调函数;
        public Type: number; //类型;
        public Info1:string = "次数剩余";
        public Info2:string = "";



    }
    export class PopBuyProcessor extends BaseProcessor {

        public getName(): string {
            return "PopBuyProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof PopBuyEvent) {
                var evt: PopBuyEvent = <PopBuyEvent>$event;
                if (evt.type == PopBuyEvent.SHOW_POPBUY_PANEL) {
                    if ($event.resoureItem.length > 0) {
                        this.showPanel($event);
                    } else {
                        msgtip.MsgTipManager.outStr("[ff0000]今日次数已用完", 99);
                    }
                }
                if (this.exchangepPanel) {
                    if (evt.type == PopBuyEvent.HIDE_POPBUY_PANEL) {
                        this.hidePanel()
                    }
                
                }

            }
     
        }
        private hidePanel(): void {
            this.exchangepPanel.hide()

        }
        private exchangepPanel: PopBuyPanel
        private showPanel($event : PopBuyEvent): void {
            if (!this.exchangepPanel) {
                this.exchangepPanel = new PopBuyPanel();
            }
            this.exchangepPanel.load(() => {
                UIManager.getInstance().addUIContainer(this.exchangepPanel);
                this.exchangepPanel.refresh($event)

            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new PopBuyEvent(PopBuyEvent.SHOW_POPBUY_PANEL),
                new PopBuyEvent(PopBuyEvent.HIDE_POPBUY_PANEL),
            ];
        }

    }


}