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

        public static SHOW_POPVIPBUY_PANEL: string = "SHOW_POPVIPBUY_PANEL";
        public static HIDE_POPVIPBUY_PANEL: string = "HIDE_POPVIPBUY_PANEL";

        public resoureItem: Array<Array<number>>;
        public cutNum: number;
        public SubmitFun: Function; //回调函数;
        public Type: number; //类型;
        public Info1: string = "次数剩余";
        public Info2: string = "";
        public data: any;



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
                        msgtip.MsgTipManager.outStr("[ff0000]今日购买次数已达上限", 99);
                    }
                }
                if (this.exchangepPanel) {
                    if (evt.type == PopBuyEvent.HIDE_POPBUY_PANEL) {
                        this.hidePanel()
                    }

                }
                if (evt.type == PopBuyEvent.SHOW_POPVIPBUY_PANEL) {
                    if ($event.resoureItem.length > 0) {
                        this.showVipPanel($event);
                    } else {
                        var $obj: any = TableData.getInstance().getData(TableData.tb_vip_base, GuidData.player.getVipLevel() + 1);
                        if ($obj) {
                            var num: number = $obj["groupExpBuyTimes"] - GuidData.instanceData.getExpBuyNum();
                            msgtip.MsgTipManager.outStr("[ff0000]当前vip可购买等级已达上限，提升1个vip等级后，今日还可购买" + num + "次", 99);
                        } else {
                            msgtip.MsgTipManager.outStr("[ff0000]今日购买次数已达上限", 99);
                        }
                    }
                }
                if (this.vipPanel) {
                    if (evt.type == PopBuyEvent.HIDE_POPVIPBUY_PANEL) {
                        this.hideVipPanel()
                    }

                }

            }

        }
        private hideVipPanel(): void {
            this.vipPanel.hide()
        }
        private vipPanel: PopVipBuyPanel
        private showVipPanel($event: PopBuyEvent): void {
            if (!this.vipPanel) {
                this.vipPanel = new PopVipBuyPanel();
            }
            this.vipPanel.load(() => {
                UIManager.getInstance().addUIContainer(this.vipPanel);
                this.vipPanel.refresh($event)

            }, false);
        }


        private hidePanel(): void {
            this.exchangepPanel.hide()

        }
        private exchangepPanel: PopBuyPanel
        private showPanel($event: PopBuyEvent): void {
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
                new PopBuyEvent(PopBuyEvent.SHOW_POPVIPBUY_PANEL),
                new PopBuyEvent(PopBuyEvent.HIDE_POPVIPBUY_PANEL),
            ];
        }

    }


}