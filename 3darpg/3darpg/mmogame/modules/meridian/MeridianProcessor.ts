module meridian {
    export class MeridianEvent extends BaseEvent {
        public static SHOW_MERIDIAN_EVENT: string = "SHOW_MERIDIAN_EVENT"; //显示面板
        public static SHOW_MERIDIAN_BUY_EVENT: string = "SHOW_MERIDIAN_BUY_EVENT"; //显示面板
        public static REFRISH_MERIDIAL_PANEL: string = "REFRISH_MERIDIAL_PANEL"; //显示面板
        public static CHG_MERIDIAL_FORCE: string = "CHG_MERIDIAL_FORCE"; //战力变化
        public static REFRISH_MERIDIAL_LIST: string = "REFRISH_MERIDIAL_LIST"; //刷新list
    }
    export class MeridianModule extends Module {
        public getModuleName(): string {
            return "MeridianModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new MeridianProcessor()];
        }
    }
    export class MeridianProcessor extends BaseProcessor {
        public getName(): string {
            return "MeridianProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {

            if ($event instanceof MeridianEvent) {
                var $MeridianEvent: MeridianEvent = <MeridianEvent>$event;
                if ($MeridianEvent.type == MeridianEvent.SHOW_MERIDIAN_EVENT) {
                    this.showPanel();
                } else if ($MeridianEvent.type == MeridianEvent.SHOW_MERIDIAN_BUY_EVENT) {
                    this.showMeridianBuyPanel();
                } else if ($MeridianEvent.type == MeridianEvent.CHG_MERIDIAL_FORCE) {
                    if (this.meridianPanel && this.meridianPanel.hasStage) {
                        this.meridianPanel.setForce();
                    }
                } else if ($MeridianEvent.type == MeridianEvent.REFRISH_MERIDIAL_PANEL) {
                    if (this.meridianPanel && this.meridianPanel.hasStage) {
                        this.meridianPanel.refresh();
                    }
                    this.refreshNode();
                } else if ($MeridianEvent.type == MeridianEvent.REFRISH_MERIDIAL_LIST) {
                    if (this.meridianPanel && this.meridianPanel.meridianList && this.meridianPanel.meridianList.hasStage) {
                        this.meridianPanel.meridianList.resetData();
                    } 
                }

            } else if ($event instanceof EngineEvent) {
                if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT || $event.type == EngineEvent.MONEY_CHANGE || $event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                    this.refreshNode();
                }
            } else if ($event instanceof charbg.CharBgEvent) {
                if ($event.type == charbg.CharBgEvent.BGDATA_CHANGE_EVENT) {
                    // if(this._needItem){
                    //     if(this.isNeedItem((<charbg.CharBgEvent>$event).change)){
                    //         this.refreshNode();
                    //     }
                    // }else{
                        this.refreshNode();
                    // }
                    //背包变化,判断有无新增经脉丹
                    if (this.meridianBuyPanel && this.meridianBuyPanel.meridianBuyList && this.meridianBuyPanel.meridianBuyList.hasStage) {
                        this.meridianBuyPanel.meridianBuyList.refreshVo();
                    }
                }
            } else if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this.meridianPanel) {
                    this.meridianPanel.dispose();
                    this.meridianPanel = null;
                    console.log("释放面板 meridianPanel")
                } else if (panelEvent.panel == this.meridianBuyPanel) {
                    this.meridianBuyPanel.dispose();
                    this.meridianBuyPanel = null;
                    console.log("释放面板 meridianBuyPanel");
                }
            }
        }

        // private isNeedItem($chgary:Array<number>):boolean{
        //     if($chgary){
        //         for (let i = 0; i < $chgary.length; i++) {
        //             var hasflag = this._needItem.indexOf($chgary[i]);
        //             if(hasflag != -1){
        //                 return true;
        //             }
        //         }
        //     }
        //     return false;
        // }


        // private _needItem:Array<number>

        private meridianPanel: MeridianPanel
        private showPanel(): void {
            if (!this.meridianPanel) {
                this.meridianPanel = new MeridianPanel();
            }
            this.meridianPanel.load(() => {
                this.meridianPanel.show();
            }, false);
        }


        private meridianBuyPanel: MeridianBuyPanel
        private showMeridianBuyPanel(): void {
            if (!this.meridianBuyPanel) {
                this.meridianBuyPanel = new MeridianBuyPanel();
            }
            this.meridianBuyPanel.load(() => {
                this.meridianBuyPanel.show();
            }, false);
        }

        private refreshNode(): void {
            // if(!this._needItem){
            //     this._needItem = new Array
            // }

            if (GuidData.player.getsyspageopen(SharedDef.MODULE_TCM,SharedDef.MODULE_TCM_ALL)) {

                var $lev: number = GuidData.grow.getSpellIntFieldMeridianLevel(0);
                var $tupo: number = GuidData.grow.getSpellIntFieldMeridianLevel(1);
                var $exp: number = GuidData.grow.getSpellIntFieldMeridianExp();

                var aaary = tb.TB_meridian_info.getItem();
                if (aaary[aaary.length - 1].id <= $lev) {
                    RedPointManager.getInstance().getNodeByID(81).show = false;
                    RedPointManager.getInstance().getNodeByID(117).show = false;
                    return;
                }

                RedPointManager.getInstance().getNodeByID(117).show = false;
                var $aryvo: Array<tb.TB_meridian_item> = tb.TB_meridian_item.getItem();
                for (var index = 0; index < $aryvo.length; index++) {
                    // if(this._needItem.indexOf($aryvo[index].itemId) == -1){
                    //     this._needItem.push($aryvo[index].itemId);
                    // }
                    if (hasEnoughResItem([$aryvo[index].itemId, 1])) {
                        RedPointManager.getInstance().getNodeByID(117).show = true;
                        break;
                    }
                }

                var netxTb: tb.TB_meridian_info = tb.TB_meridian_info.getTempVo($lev + 1);
                var $tupoOrxiulian: boolean;
                if (netxTb.costMoney.length) {
                    $tupoOrxiulian = true;
                    // if(this._needItem.indexOf(netxTb.costMoney[0][0]) == -1){
                    //     this._needItem.push(netxTb.costMoney[0][0]);
                    // }
                } else {
                    $tupoOrxiulian = false;
                }

                if ($tupoOrxiulian) {
                    RedPointManager.getInstance().getNodeByID(81).show = hasEnoughRes(netxTb.costMoney[0]);
                    return;
                }
                RedPointManager.getInstance().getNodeByID(81).show = ($exp >= netxTb.costExp)
            }
        }


        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new MeridianEvent(MeridianEvent.SHOW_MERIDIAN_EVENT),
                new MeridianEvent(MeridianEvent.REFRISH_MERIDIAL_PANEL),
                new MeridianEvent(MeridianEvent.REFRISH_MERIDIAL_LIST),
                new MeridianEvent(MeridianEvent.CHG_MERIDIAL_FORCE),
                new MeridianEvent(MeridianEvent.SHOW_MERIDIAN_BUY_EVENT),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),

                new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }
    }

}
