module wing {
    export class WingModule extends Module {
        public getModuleName(): string {
            return "WingModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new WingProcessor()];
        }
    }
    export class WingEvent extends BaseEvent {
        public static SHOW_WING_PANEL_EVENT: string = "show_wing_panel_event";//显示翅膀面板
        public static WING_ID_CHANG_EVENT: string = "wing_id_chang_event";//翅膀ID变化
        public static WING_EXP_CHANG_EVENT: string = "wing_exp_chang_event";//翅膀经验变化
        public static WING_LEV_CHANG_EVENT: string = "wing_lev_chang_event";//翅膀强化等级变化

        public static EFF_EVENT: string = "EFF_EVENT";//飘字

        public data: any
    }

    export class WingProcessor extends BaseProcessor {
        private _wingPanel: WingPanel;

        public getName(): string {
            return "WingProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {

            if ($event instanceof WingEvent) {
                var $wingEvent: WingEvent = <WingEvent>$event;
                if ($wingEvent.type == WingEvent.SHOW_WING_PANEL_EVENT) {
                    this.showWingPanel($wingEvent.data);
                } else if ($wingEvent.type == WingEvent.WING_ID_CHANG_EVENT) {
                    if (this._wingPanel) {
                        this._wingPanel.wingIdChg();
                    }
                    this.refreshNode();
                } else if ($wingEvent.type == WingEvent.WING_EXP_CHANG_EVENT) {
                    if (this._wingPanel) {
                        this._wingPanel.wingExpChg();
                    }
                } else if ($wingEvent.type == WingEvent.WING_LEV_CHANG_EVENT) {
                    if (this._wingPanel) {
                        this._wingPanel.wingLevChg();
                    }
                } else if ($wingEvent.type == WingEvent.EFF_EVENT) {
                    if (this._wingPanel) {
                        this._wingPanel.showflyword($wingEvent.data);
                    }
                }
            } else if ($event.type == charbg.CharBgEvent.BGDATA_CHANGE_EVENT) {
                if (this._wingPanel && this._wingPanel.hasStage) {
                    this._wingPanel.refreshItem();
                }
                this.refreshNode();
            } else if ($event.type == EngineEvent.MONEY_CHANGE || $event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                this.refreshNode();
            } else if($event.type == EngineEvent.PLAYER_FIELD_LEVEL){
                this.sysOpen();
            }else if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._wingPanel) {
                    this._wingPanel.dispose();
                    this._wingPanel = null;
                    console.log("释放面板 _wingPanel")
                }
            }


        }

        private sysOpen():void{
            this.refreshNode();
            if(this._wingPanel){
                this._wingPanel.showTab1();
            }
        }

        private showWingPanel(idx: number): void {
            if (!this._wingPanel) {
                this._wingPanel = new WingPanel;
            }

            this._wingPanel.load(() => {
                var tabIdx: number = 0;
                if (idx > 0) {
                    tabIdx = idx - 1;
                }
                this._wingPanel.show(tabIdx);

             

            }, true);
        }

        private refreshNode(): void {
            if (!GuidData.grow) {
                return;
            }
            if (!GuidData.grow.getWingIsActive()) {
                return;
            }
            var targetData: any = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID());
            if (!targetData) {
                return;
            }

            var node: RedPointNode = RedPointManager.getInstance().getNodeByID(52);

            if (targetData.operate_type == 1) {
                if (GuidData.bag.getItemCount(targetData.item_cost[0][0]) >= targetData.item_cost[0][1] && hasEnoughRes(targetData.money_cost[0])) {
                    node.show = true;
                } else {
                    node.show = false;
                }
            } else if (targetData.operate_type == 0) {
                node.show = false;
            } else {
                node.show = hasEnoughRes(targetData.money_cost[0]);
            }

            if (GuidData.player.getsyspageopen(SharedDef.MODULE_WING,SharedDef.MODULE_WING_STRENGTH)) {
                node = RedPointManager.getInstance().getNodeByID(54);

                var nextQhData: any = TableData.getInstance().getData(TableData.tb_wings_strength, GuidData.grow.getWingQh() + 1);
                if (!nextQhData) {
                    node.show = false;
                    return;
                }

                if (GuidData.bag.getItemCount(nextQhData.item_cost[0][0]) >= nextQhData.item_cost[0][1] && hasEnoughRes(nextQhData.money_cost[0])) {
                    node.show = true;
                } else {
                    node.show = false;
                }
            }


        }


        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new WingEvent(WingEvent.SHOW_WING_PANEL_EVENT),
                new WingEvent(WingEvent.WING_ID_CHANG_EVENT),
                new WingEvent(WingEvent.WING_EXP_CHANG_EVENT),
                new WingEvent(WingEvent.WING_LEV_CHANG_EVENT),
                new WingEvent(WingEvent.EFF_EVENT),

                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),

            ];
        }
    }

}