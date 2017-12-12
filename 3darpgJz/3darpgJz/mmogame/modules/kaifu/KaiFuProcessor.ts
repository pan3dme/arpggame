module kaifu {
    export class KaiFuModule extends Module {
        public getModuleName(): string {
            return "KaiFuModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new MailProcessor()];
        }
    }
    export class KaiFuEvent extends BaseEvent {
        public static SHOW_KAIFU_PANEL_EVENT: string = "SHOW_KAIFU_PANEL_EVENT";//显示翅膀面板
        //public static MAIL_CHG_EVENT: string = "MAIL_CHG_EVENT";//显示翅膀面板
        public static KAIFU_CHOUJING_CHG_EVENT: string = "KAIFU_CHOUJING_CHG_EVENT";
        public data: any;
    }

    export class MailProcessor extends BaseProcessor {
        private _kaifuPanel: KaiFuActivePanel;

        public getName(): string {
            return "KaiFuProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {

            if ($event instanceof KaiFuEvent) {
                var $KaiFuEvent: KaiFuEvent = <KaiFuEvent>$event;
                if ($KaiFuEvent.type == KaiFuEvent.SHOW_KAIFU_PANEL_EVENT) {
                    this.showPanel();
                }
                // else if($KaiFuEvent.type == KaiFuEvent.MAIL_CHG_EVENT){
                //     this.mailChg($KaiFuEvent.data);
                // }
            } else if($event instanceof ActiveEvent){
                if ($event.type == ActiveEvent.ACTIVE_GLOBEL_CHOUJIANG_EVENT) {
                    this.choujiangChg();
                }else if($event.type == ActiveEvent.ACTIVE_PLAYER_CHANGE_EVENT){
                    this.playerDataChg();
                }
            }else if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._kaifuPanel) {
                    this._kaifuPanel.dispose();
                    this._kaifuPanel = null;
                    console.log("释放面板 _mailPanel")
                }
            }
        }

        private choujiangChg(): void {
            if (this._kaifuPanel && this._kaifuPanel.hasStage) {
                this._kaifuPanel.choujiangChg();
            }
        }

        private playerDataChg(): void {
            if (this._kaifuPanel && this._kaifuPanel.hasStage) {
                this._kaifuPanel.playerDataChg();
            }
        }


        private showPanel(): void {
            var ary: Array<number> = GuidData.globelValue.getKaiFuActiveList();

            if (!this._kaifuPanel) {
                this._kaifuPanel = new KaiFuActivePanel();
            }

            this._kaifuPanel.load(() => {
                this._kaifuPanel.show(ary);
            }, true);
        }

        private dayTargetList($byte:ByteArray):void{
           var saosrl:s2c_activity_opt_show_rank_list = new s2c_activity_opt_show_rank_list();
           s2c_activity_opt_show_rank_list.read(saosrl,$byte);
           if (this._kaifuPanel && this._kaifuPanel.hasStage) {
                this._kaifuPanel.dayTargetList(saosrl);
            }
        }

        public getHanderMap(): Object {
            var obj: Object = new Object;
            obj[Protocols.SMSG_ACTIVITY_OPT_SHOW_RANK_LIST] = ($byte: ByteArray) => { this.dayTargetList($byte) };
            return obj;
        }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new KaiFuEvent(KaiFuEvent.SHOW_KAIFU_PANEL_EVENT),
                new KaiFuEvent(KaiFuEvent.KAIFU_CHOUJING_CHG_EVENT),
                new ActiveEvent(ActiveEvent.ACTIVE_GLOBEL_CHOUJIANG_EVENT),
                new ActiveEvent(ActiveEvent.ACTIVE_PLAYER_CHANGE_EVENT),

                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),

            ];
        }
    }

}
/**活动事件 */
class ActiveEvent extends BaseEvent {
    public static ACTIVE_PLAYER_CHANGE_EVENT: string = "ACTIVE_PLAYER_CHANGE_EVENT";//角色活动数据变化
    public static ACTIVE_GLOBEL_CHOUJIANG_EVENT: string = "ACTIVE_GLOBEL_CHOUJIANG_EVENT";//活动抽奖数据变化
}
