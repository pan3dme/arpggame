module email {
    export class MailModule extends Module {
        public getModuleName(): string {
            return "MailModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new MailProcessor()];
        }
    }
    export class MailEvent extends BaseEvent {
        public static SHOW_MAIL_PANEL_EVENT: string = "SHOW_MAIL_PANEL_EVENT";//显示翅膀面板
        public static MAIL_CHG_EVENT: string = "MAIL_CHG_EVENT";//显示翅膀面板
        public data: any;
    }

    export class MailProcessor extends BaseProcessor {
        private _mailPanel: MailPanel;

        public getName(): string {
            return "MailProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {

            if ($event instanceof MailEvent) {
                var $MailEvent: MailEvent = <MailEvent>$event;
                if ($MailEvent.type == MailEvent.SHOW_MAIL_PANEL_EVENT) {
                    this.showPanel();
                } else if ($MailEvent.type == MailEvent.MAIL_CHG_EVENT) {
                    this.mailChg($MailEvent.data);
                }
            } else if ($event instanceof EngineEvent) {
                if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                    this.refreshRedNode();
                }
            } else if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._mailPanel) {
                    this._mailPanel.dispose();
                    this._mailPanel = null;
                    console.log("释放面板 _mailPanel")
                }
            }


        }

        private showPanel(): void {
            if (!this._mailPanel) {
                this._mailPanel = new MailPanel();
            }

            this._mailPanel.load(() => {
                this._mailPanel.show();
            }, true);
        }

        private mailChg($type: number): void {
            if (this._mailPanel && this._mailPanel.hasStage) {
                this._mailPanel.mailChg($type);
            }
            this.refreshRedNode();
        }

        private refreshRedNode(): void {
            var node: RedPointNode ;
            var $data: Array<GiftBaseVo> = GuidData.giftPacks.getGiftDataItem();
            var hasNoRead:boolean = false;
            var hasItem:boolean = false;
            for (var i: number = 0; i < $data.length; i++) {
                if ($data[i].item != "") {

                    if(!$data[i].isGetItem){
                        hasNoRead = true;
                        hasItem = true;
                    }
                } else {
                    if(!$data[i].isRead){
                        hasNoRead = true;
                    }
                    
                }

            }
            node = RedPointManager.getInstance().getNodeByID(3)
            node.show = hasNoRead;
            node = RedPointManager.getInstance().getNodeByID(4)
            node.show = hasItem;
        }


        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new MailEvent(MailEvent.SHOW_MAIL_PANEL_EVENT),
                new MailEvent(MailEvent.MAIL_CHG_EVENT),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),

                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),

            ];
        }
    }

}