module gift {


    export class GiftModule extends Module {
        public getModuleName(): string {
            return "GiftModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new GiftProcessor()];
        }
    }
    export class GiftEvent extends BaseEvent {
        public static SHOW_GIFT_PANEL: string = "SHOW_GIFT_PANEL";
        public static HIDE_GIFT_PANEL: string = "HIDE_GIFT_PANEL";

        public static REFRISH_CHANGE_CELL_DATA: string = "REFRISH_CHANGE_CELL_DATA";
        


    }
    export class GiftProcessor extends BaseProcessor {

        public getName(): string {
            return "GiftProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof GiftEvent) {
                var evt: GiftEvent = <GiftEvent>$event;
                if (evt.type == GiftEvent.SHOW_GIFT_PANEL) {
           
                    this.showPanel();
              
                }
                if (this.giftPanel) {
                    if (evt.type == GiftEvent.HIDE_GIFT_PANEL) {
                        this.hidePanel()
                    }
                    if (evt.type == GiftEvent.REFRISH_CHANGE_CELL_DATA) {
                        this.giftPanel.refreshCellData()
                    }
                
                }

            }else if ($event instanceof charbg.CharBgEvent) {
                if (this.giftPanel && this.giftPanel.hasStage) {
                 //   this.giftPanel.refresh();
                }
            }
     
        }
        private hidePanel(): void {
            this.giftPanel.hide()

        }
        private giftPanel: GiftPanel
        private showPanel(): void {
            if (!this.giftPanel) {
                this.giftPanel = new GiftPanel();
            }
            this.giftPanel.load(() => {
                UIManager.getInstance().addUIContainer(this.giftPanel);
                this.giftPanel.refresh();
                var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
                $scenePange.data = SharedDef.MODULE_FACTION
                ModuleEventManager.dispatchEvent($scenePange);


            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new GiftEvent(GiftEvent.SHOW_GIFT_PANEL),
                new GiftEvent(GiftEvent.HIDE_GIFT_PANEL),
                new GiftEvent(GiftEvent.REFRISH_CHANGE_CELL_DATA),
                new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT),
            ];
        }

    }


}